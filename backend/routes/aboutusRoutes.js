import express from "express";
import {
  getAbout,
  updateHeroTitle,
  addHighlight,
  deleteHighlight,
  addVideo,
  deleteVideo,
  updateKnowMore,
  deleteKnowMoreImage
} from "../controllers/aboutusController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import uploadVideo from "../middlewares/uploadVideo.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getAbout);

/* ADMIN */

router.put("/hero-title", protect, isAdmin, updateHeroTitle);
router.post("/highlight", protect, isAdmin, addHighlight);
router.delete("/highlight/:id", protect, isAdmin, deleteHighlight);

router.post("/video", protect, isAdmin, uploadVideo.single("video"), addVideo);
router.delete("/video/:id", protect, isAdmin, deleteVideo);

router.put(
  "/know-more",
  protect,
  isAdmin,
  upload.single("image"),
  updateKnowMore
);

router.delete(
  "/know-more/image",
  protect,
  isAdmin,
  deleteKnowMoreImage
);

export default router;
