 import express from "express";
 import { mockPaymentSuccess } from "../controllers/paymentController.js";
// import {
//   createPaymentOrder,
//   verifyPayment
// } from "../controllers/paymentController.js";
 import { protect } from "../middlewares/authMiddleware.js";

 const router = express.Router();

// router.post("/create-order", protect, createPaymentOrder);
// router.post("/verify", protect, verifyPayment);

// ✅ DEV ONLY – MOCK PAYMENT ROUTE
router.post("/mock-success", protect, mockPaymentSuccess);

export default router;
