import express from "express";
import {
  uploadVideo,
  getVideos,
  toggleVideoStatus,
  deleteVideo
} from "../controllers/videoController.js";

import upload from "../middlewares/uploadVideo.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Public (Home Page)
router.get("/", getVideos);

// Admin
router.post("/", upload.single("video"),protect,isAdmin, uploadVideo);
router.put("/:id/toggle",protect,isAdmin, toggleVideoStatus);
router.delete("/:id",protect,isAdmin, deleteVideo);

export default router;
