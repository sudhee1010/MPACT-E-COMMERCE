import express from "express";
import {
  getInventory,
  addStock,
  adjustStock,
  getStockMovements,
  getLowStockItems,
  getOutOfStockItems,
  getInventoryAlerts,
  deleteInventory
} from "../controllers/inventoryController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getInventory);
router.get("/movements", protect, isAdmin, getStockMovements);
router.post("/add", protect, isAdmin, addStock);
router.post("/adjust", protect, isAdmin, adjustStock);
router.get("/low-stock", protect, isAdmin, getLowStockItems);
router.get("/out-of-stock", protect, isAdmin, getOutOfStockItems);
router.get("/alerts", protect, isAdmin, getInventoryAlerts);
router.delete("/:id",protect, isAdmin, deleteInventory);



export default router;
