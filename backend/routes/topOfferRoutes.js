import express from "express";
import {
  getTopOffers,
  getAllTopOffersAdmin,
  createTopOffer,
  updateTopOffer,
  deleteTopOffer,
} from "../controllers/adminTopofferController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Public
router.get("/", getTopOffers);

// Admin-only
router.get("/admin", protect, isAdmin, getAllTopOffersAdmin);
router.post("/", protect, isAdmin, createTopOffer);
router.put("/:id", protect, isAdmin, updateTopOffer);
router.delete("/:id", protect, isAdmin, deleteTopOffer);


export default router;

