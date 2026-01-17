import express from "express";
import {
  getDashboardStats,
  getRecentOrders,
  getLowStockProducts
} from "../controllers/adminDashboardController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, isAdmin, getDashboardStats);
router.get("/orders/recent", protect, isAdmin, getRecentOrders);
router.get("/products/low-stock", protect, isAdmin, getLowStockProducts);

export default router;
