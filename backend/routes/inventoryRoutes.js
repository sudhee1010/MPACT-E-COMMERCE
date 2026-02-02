import express from "express";
import {
  getInventory,
  addStock,
  adjustStock,
  getStockMovements
} from "../controllers/inventoryController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getInventory);
router.get("/movements", protect, isAdmin, getStockMovements);
router.post("/add", protect, isAdmin, addStock);
router.post("/adjust", protect, isAdmin, adjustStock);

export default router;
