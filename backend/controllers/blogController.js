
import Blog from "../models/Blog.js";
import BlogCategory from "../models/BlogCategory.js";
import slugify from "slugify";
import { uploadToCloudflareBuffer } from "../middlewares/blogUploadMiddleware.js";

/* CREATE BLOG (ADMIN) */
export const createBlog = async (req, res) => {
  try {
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
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: "Title is required." });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ success: false, message: "Description is required." });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ success: false, message: "Category is required." });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: "Blog content is required." });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload a featured image." });
    }

    // ── Upload image to Cloudinary ────────────────────────────────────────────
    let cloudResult;
    try {
      cloudResult = await uploadToCloudflareBuffer(req.file.buffer, "blog-covers");
    } catch (uploadError) {
      return res.status(500).json({
        success: false,
        message: uploadError.message || "Cloudinary upload failed.",
      });
    }

    // ── Save blog to MongoDB ──────────────────────────────────────────────────
    let blog;
    try {
      blog = await Blog.create({
        title: title.trim(),
        slug: slugify(title.trim(), { lower: true, strict: true }),
        description: description.trim(),
        content: content.trim(),
        category: category.trim(),
        tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        readTime: readTime ? Number(readTime) : 5,
        isFeatured: isFeatured === true || isFeatured === "true",
        author: author ? author.trim() : "MPACT Team",
        coverImage: cloudResult.secure_url,
      });
    } catch (dbErr) {
      return res.status(500).json({
        success: false,
        message: "Failed to save blog.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      data: blog,
    });

  } catch (err) {
    console.error("========== BLOG CREATE ERROR ==========");
    console.error(err);

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
      message: err.message || "Something went wrong. Please try again.",
    });
  }
};

/* GET BLOGS (ALL / CATEGORY / SEARCH) */
export const getBlogs = async (req, res) => {
  try {
    const { category, search } = req.query;

    let query = { isPublished: true };

    // Category filter
    if (category && category !== "all") {
      query.category = category;
    }

    // Search
    if (search) {
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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to load blogs.",
    });
  }
};

/* FEATURED BLOGS */
export const getFeaturedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      isFeatured: true,
      isPublished: true,
    })
      .populate("category", "name")
      .limit(5);

    res.json(blogs);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to load featured blogs.",
    });
  }
};

/* SINGLE BLOG (READ MORE PAGE) */
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      isPublished: true,
    }).populate("category", "name");

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found." });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to load blog article.",
    });
  }
};

/* UPDATE BLOG (ADMIN) */
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found." });
    }

    const {
      title,
      description,
      content,
      category,
      tags,
      readTime,
      isFeatured,
    } = req.body;

    if (title !== undefined && (!title || !title.trim())) {
      return res.status(400).json({ success: false, message: "Title is required." });
    }
    if (description !== undefined && (!description || !description.trim())) {
      return res.status(400).json({ success: false, message: "Description is required." });
    }
    if (category !== undefined && (!category || !category.trim())) {
      return res.status(400).json({ success: false, message: "Category is required." });
    }
    if (content !== undefined && (!content || !content.trim())) {
      return res.status(400).json({ success: false, message: "Blog content is required." });
    }

    if (title) {
      blog.title = title.trim();
      blog.slug = slugify(blog.title, { lower: true, strict: true });
    }
    if (description) blog.description = description.trim();
    if (content) blog.content = content.trim();
    if (category) blog.category = category.trim();
    if (tags !== undefined) {
      blog.tags = tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
    }
    if (readTime !== undefined) blog.readTime = Number(readTime) || blog.readTime;
    if (isFeatured !== undefined) {
      blog.isFeatured = isFeatured === true || isFeatured === "true";
    }

    if (req.file) {
      try {
        const cloudResult = await uploadToCloudflareBuffer(req.file.buffer, "blog-covers");
        blog.coverImage = cloudResult.secure_url;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: uploadError.message || "Cloudinary upload failed.",
        });
      }
    }

    let updatedBlog;
    try {
      updatedBlog = await blog.save();
    } catch (saveErr) {
      return res.status(500).json({
        success: false,
        message: "Failed to save blog.",
      });
    }

    res.json({
      success: true,
      message: "Blog updated successfully.",
      data: updatedBlog,
    });

  } catch (err) {
    console.error("========== BLOG UPDATE ERROR ==========");
    console.error(err);

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
      message: err.message || "Something went wrong. Please try again.",
    });
  }
};

/* DELETE BLOG (ADMIN) */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found." });
    }

    await blog.deleteOne();
    res.json({ success: true, message: "Blog deleted successfully." });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again.",
    });
  }
};

