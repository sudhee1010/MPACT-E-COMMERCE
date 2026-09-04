// import express from "express";
// import {
//   getHeroBanners,
//   createHeroBanner,
//   updateHeroBanner,
//   deleteHeroBanner, getAllHeroBannersAdmin
// } from "../controllers/heroBannerController.js";

// import upload from "../middlewares/uploadMiddleware.js";
// import { protect } from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/adminMiddleware.js";

// const router = express.Router();

// router.get("/", getHeroBanners);
// router.get("/admin", protect, isAdmin, getAllHeroBannersAdmin);


// router.post(
//   "/create-hero",
//   protect,
//   isAdmin,
//   upload.single("image"),
//   createHeroBanner
// );

// router.put("/:id", protect, isAdmin, updateHeroBanner);
// router.delete("/:id", protect, isAdmin, deleteHeroBanner);

// export default router;

import express from "express";
import multer from "multer";
import { createCloudflareStorage } from "../middlewares/cloudflareStorage.js";
import {
  getHeroBanners,
  createHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
  getAllHeroBannersAdmin
} from "../controllers/heroBannerController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// ── Combined storage: handles both image and video in ONE multer pass ─────────
const combinedStorage = createCloudflareStorage({
  folder: "hero-banners",
  key: (_req, file) => {
    const folder = file.mimetype.startsWith("video/")
      ? "hero-banner-videos"
      : "hero-banners";
    return `${folder}/${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
  }
});

const combinedUpload = multer({ storage: combinedStorage });

// ─────────────────────────────────────────────────────────────────────────────

// Public
router.get("/", getHeroBanners);

// Admin
router.get("/admin", protect, isAdmin, getAllHeroBannersAdmin);

// Create — client sends field "image" for images, "video" for videos
router.post(
  "/create-hero",
  protect,
  isAdmin,
  combinedUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 }
  ]),
  (req, res, next) => {
    // Normalize into req.file + req.uploadType so controller stays clean
    if (req.files?.video?.[0]) {
      req.file = req.files.video[0];
      req.uploadType = "video";
    } else if (req.files?.image?.[0]) {
      req.file = req.files.image[0];
      req.uploadType = "image";
    }
    next();
  },
  createHeroBanner
);

router.put("/:id", protect, isAdmin, updateHeroBanner);
router.delete("/:id", protect, isAdmin, deleteHeroBanner);

export default router;