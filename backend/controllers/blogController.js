import Blog from "../models/Blog.js";
import slugify from "slugify";

/* CREATE BLOG (ADMIN) */
export const createBlog = async (req, res) => {
  const {
    title,
    description,
    content,
    category,
    tags,
    readTime,
    isFeatured,
  } = req.body;

  const blog = await Blog.create({
    title,
    slug: slugify(title, { lower: true }),
    description,
    content,
    category,
    tags: tags ? tags.split(",") : [],
    readTime,
    isFeatured,
    coverImage: req.file?.path,
  });

  res.status(201).json(blog);
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
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
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
