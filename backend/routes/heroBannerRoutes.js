import express from "express";
import {
  getHeroBanners,
  createHeroBanner,
  updateHeroBanner,
  deleteHeroBanner
} from "../controllers/heroBannerController.js";

import upload from "../middlewares/uploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", getHeroBanners);

router.post(
  "/",
  protect,
  isAdmin,
  upload.single("image"),
  createHeroBanner
);

router.put("/:id", protect, isAdmin, updateHeroBanner);
router.delete("/:id", protect, isAdmin, deleteHeroBanner);

export default router;
