import express from "express";
import {
  saveAddress,
  getMyAddress,
  getAllAddresses
} from "../controllers/addressController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// USER
router.post("/", protect, saveAddress);
router.get("/me", protect, getMyAddress);

// ADMIN
router.get("/admin/all", protect, isAdmin, getAllAddresses);

export default router;
