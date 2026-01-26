import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,returnOrder
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/cancel", protect, cancelOrder);
router.put("/:id/return", protect, returnOrder);



export default router;
