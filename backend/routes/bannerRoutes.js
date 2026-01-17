import express from "express";
import {
  createBanner,
  getActiveBanners,
  updateBanner,
  deleteBanner
} from "../controllers/bannerController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Public
router.get("/", getActiveBanners);

// Admin
router.post("/", protect, isAdmin, createBanner);
router.put("/:id", protect, isAdmin, updateBanner);
router.delete("/:id", protect, isAdmin, deleteBanner);

export default router;
