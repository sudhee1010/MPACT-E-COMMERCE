import express from "express";
import {
  createCoupon,
  getCoupons,
  applyCoupon,getCouponAnalytics
} from "../controllers/couponController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Admin
router.post("/", protect, isAdmin, createCoupon);
router.get("/", protect, isAdmin, getCoupons);
router.get(
  "/analytics",
  protect,
  isAdmin,
  getCouponAnalytics
);

// User
router.post("/apply", protect, applyCoupon);

export default router;
