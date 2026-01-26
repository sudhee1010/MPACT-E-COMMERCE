// import express from "express";
// import {
//   createCoupon,
//   getCoupons,
//   applyCoupon,getCouponAnalytics
// } from "../controllers/couponController.js";

// import { protect } from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/adminMiddleware.js";

// const router = express.Router();

// // Admin
// router.post("/", protect, isAdmin, createCoupon);
// router.get("/", protect, isAdmin, getCoupons);
// router.get(
//   "/analytics",
//   protect,
//   isAdmin,
//   getCouponAnalytics
// );

// // User
// router.post("/apply", protect, applyCoupon);

// export default router;




import express from "express";
import {
  createCoupon,
  getCoupons,
  applyCoupon,
  applyCouponOnOrder,
  getCouponAnalytics
} from "../controllers/couponController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* ADMIN */
router.post("/", protect, isAdmin, createCoupon);
router.get("/", protect, isAdmin, getCoupons);
router.get("/analytics", protect, isAdmin, getCouponAnalytics);

/* USER */
router.post("/apply", protect, applyCoupon); // cart flow (optional)
router.post("/apply-on-order", protect, applyCouponOnOrder); // 🔥 DIRECT BUY

export default router;