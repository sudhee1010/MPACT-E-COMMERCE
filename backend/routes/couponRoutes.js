import express from "express";
import {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  applyCouponOnOrder,
  getCouponAnalytics,
  validateCouponForFuel,
  validateCouponForCart
} from "../controllers/couponController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* ================= USER ================= */
router.post("/apply-on-order", protect, applyCouponOnOrder);
router.post("/validate-cart", protect, validateCouponForCart);

/* ================= ADMIN ================= */
router.post("/", protect, isAdmin, createCoupon);
router.get("/", protect, isAdmin, getCoupons);
router.get("/analytics", protect, isAdmin, getCouponAnalytics);
router.get("/:id", protect, isAdmin, getCouponById);
router.put("/:id", protect, isAdmin, updateCoupon);
router.delete("/:id", protect, isAdmin, deleteCoupon);
router.post("/validate-fuel", protect, validateCouponForFuel);

export default router;

