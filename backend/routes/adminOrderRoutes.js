import express from "express";
import {
  getAllOrders,
  updateOrderStatus, markOrderDelivered,approveReturn,rejectReturn,markCODAsPaid
} from "../controllers/adminOrderController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id/status", protect, isAdmin, updateOrderStatus);
router.put(
  "/orders/:id/deliver",
  protect,
  isAdmin,
  markOrderDelivered
);
router.put("/:id/approve-return", protect, isAdmin, approveReturn);
router.put("/:id/reject-return", protect, isAdmin, rejectReturn);
router.put("/:id/mark-paid", protect, isAdmin, markCODAsPaid);


export default router;
