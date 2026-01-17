import express from "express";
import {
  addReview,
  getProductReviews,
  approveReview
} from "../controllers/reviewController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// User
router.post("/:productId", protect, addReview);

// Public
router.get("/:productId", getProductReviews);

// Admin
router.put("/:id/approve", protect, isAdmin, approveReview);

export default router;
