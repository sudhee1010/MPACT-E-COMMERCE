import express from "express";
import {
  createBlog,
  getBlogs,
  getFeaturedBlogs,
  getBlogBySlug,
} from "../controllers/blogController.js";

import upload from "../middlewares/uploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";


const router = express.Router();

/* PUBLIC */
router.get("/", getBlogs);
router.get("/featured", getFeaturedBlogs);
router.get("/:slug", getBlogBySlug);


/* ADMIN */
router.post("/", protect, isAdmin, upload.single("coverImage"), createBlog);

export default router;
