import express from "express";
import {
  createBlog,
  getBlogs,
  getFeaturedBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import { handleBlogUpload } from "../middlewares/blogUploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getBlogs);
router.get("/featured", getFeaturedBlogs);
router.get("/:slug", getBlogBySlug);

/* ADMIN */
router.post("/", protect, isAdmin, handleBlogUpload("coverImage"), createBlog);
router.put("/:id", protect, isAdmin, handleBlogUpload("coverImage"), updateBlog);
router.delete("/:id", protect, isAdmin, deleteBlog);

export default router;

