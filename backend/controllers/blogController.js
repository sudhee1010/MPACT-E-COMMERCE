
import Blog from "../models/Blog.js";
import BlogCategory from "../models/BlogCategory.js";
import slugify from "slugify";
import { uploadToCloudinary } from "../middlewares/blogUploadMiddleware.js";

/* CREATE BLOG (ADMIN) */
// export const createBlog = async (req, res) => {
//   const {
//     title,
//     description,
//     content,
//     category,
//     tags,
//     readTime,
//     isFeatured,
//     author,
//   } = req.body;

//   const blog = await Blog.create({
//     title,
//     slug: slugify(title, { lower: true }),
//     description,
//     content,
//     category,
//     tags: tags ? tags.split(",") : [],
//     readTime,
//     isFeatured,
//     author:  author || "MPACT Team",
//     coverImage: req.file?.path,
//   });

//   res.status(201).json(blog);
// };

export const createBlog = async (req, res) => {
  try {
    console.log("========== CREATE BLOG ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file ? `${req.file.originalname} (${req.file.mimetype}, ${req.file.size} bytes)` : "none");
    console.log("USER:", req.user?._id, req.user?.role);

    const {
      title,
      description,
      content,
      category,
      tags,
      readTime,
      isFeatured,
      author,
    } = req.body;

    // ── Validate required fields early ───────────────────────────────────────
    if (!title) return res.status(400).json({ success: false, message: "title is required" });
    if (!description) return res.status(400).json({ success: false, message: "description is required" });
    if (!content) return res.status(400).json({ success: false, message: "content is required" });
    if (!category) return res.status(400).json({ success: false, message: "category is required" });
    if (!req.file) return res.status(400).json({ success: false, message: "coverImage is required" });

    // ── Upload image to Cloudinary ────────────────────────────────────────────
    console.log("Uploading image to Cloudinary...");
    const cloudResult = await uploadToCloudinary(req.file.buffer, "blog-covers");
    console.log("Cloudinary upload success:", cloudResult.secure_url);

    // ── Save blog to MongoDB ──────────────────────────────────────────────────
    const blog = await Blog.create({
      title,
      slug: slugify(title, { lower: true, strict: true }),
      description,
      content,
      category,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      readTime: readTime ? Number(readTime) : 5,
      isFeatured: isFeatured === true || isFeatured === "true",
      author: author || "MPACT Team",
      coverImage: cloudResult.secure_url,
    });

    console.log("Blog created:", blog._id);
    res.status(201).json(blog);

  } catch (err) {
    // Always log the real error object, never coerce it to string
    console.error("========== BLOG CREATE ERROR ==========");
    console.error(err);
    if (err.message) console.error("message:", err.message);
    if (err.stack) console.error("stack:", err.stack);

    // Handle Mongoose duplicate-slug error
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || "field";
      return res.status(400).json({
        success: false,
        message: `Duplicate value for ${field}. A blog with this title/slug already exists.`,
      });
    }

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    // Handle invalid ObjectId for category
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: `Invalid value for ${err.path}: "${err.value}". Expected a valid MongoDB ObjectId.`,
      });
    }

    res.status(500).json({
      success: false,
      message: err.message || "Failed to create blog",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};



/* GET BLOGS (ALL / CATEGORY / SEARCH) */
export const getBlogs = async (req, res) => {
  const { category, search } = req.query;

  let query = { isPublished: true };

  // Category filter
  if (category && category !== "all") {
    query.category = category;
  }

  // Search
  if (search) {
      
    // First, find categories that match the search term
    const matchingCategories = await BlogCategory.find({
      name: { $regex: search, $options: "i" }
    });
    
    const categoryIds = matchingCategories.map(cat => cat._id);

    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
      { category: { $in: categoryIds } },
    ];
  }

  const blogs = await Blog.find(query)
    .populate("category", "name slug")
    .sort({ createdAt: -1 });

  res.json(blogs);
};

/* FEATURED BLOGS */
export const getFeaturedBlogs = async (req, res) => {
  const blogs = await Blog.find({
    isFeatured: true,
    isPublished: true,
  })
    .populate("category", "name")
    .limit(5);

  res.json(blogs);
};

/* SINGLE BLOG (READ MORE PAGE) */
export const getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({
    slug: req.params.slug,
    isPublished: true,
  }).populate("category", "name");

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.json(blog);
};
/* UPDATE BLOG (ADMIN) */
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.title = req.body.title || blog.title;
    blog.slug = slugify(blog.title, { lower: true, strict: true });
    blog.description = req.body.description || blog.description;
    blog.content = req.body.content || blog.content;
    blog.category = req.body.category || blog.category;
    blog.tags = req.body.tags
      ? req.body.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : blog.tags;
    blog.readTime = req.body.readTime || blog.readTime;
    blog.isFeatured = req.body.isFeatured ?? blog.isFeatured;

    if (req.file) {
      console.log("Uploading updated cover image to Cloudinary...");
      const cloudResult = await uploadToCloudinary(req.file.buffer, "blog-covers");
      blog.coverImage = cloudResult.secure_url;
    }

    const updatedBlog = await blog.save();
    res.json(updatedBlog);

  } catch (err) {
    console.error("========== BLOG UPDATE ERROR ==========");
    console.error(err);
    if (err.message) console.error("message:", err.message);

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A blog with this title/slug already exists.",
      });
    }
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: `Invalid value for ${err.path}: "${err.value}".`,
      });
    }

    res.status(500).json({
      success: false,
      message: err.message || "Failed to update blog",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

/* DELETE BLOG (ADMIN) */
export const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  await blog.deleteOne();
  res.json({ message: "Blog deleted successfully" });
};
