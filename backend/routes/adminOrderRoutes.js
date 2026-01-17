import express from "express";
import {
  getAllOrders,
  updateOrderStatus
} from "../controllers/adminOrderController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id/status", protect, isAdmin, updateOrderStatus);

export default router;
