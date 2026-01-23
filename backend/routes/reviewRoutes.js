import express from "express";
import {
  addReview,
  getProductReviews,
  approveReview
} from "../controllers/reviewController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import reviewUpload from "../middlewares/reviewUploadMiddleware.js";
const router = express.Router();

// User
// router.post("/:productId", protect, addReview);
router.post(
  "/:productId",
  protect,
  reviewUpload.array("images", 3), // max 3 images
  addReview
);

// Public
router.get("/:productId", getProductReviews);

// Admin
router.put("/:id/approve", protect, isAdmin, approveReview);

export default router;
