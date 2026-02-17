// import express from "express";
// import {
//   createBanner,
//   getActiveBanners,
//   updateBanner,
//   deleteBanner
// } from "../controllers/bannerController.js";
// import { protect } from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/adminMiddleware.js";

// const router = express.Router();

// // Public
// router.get("/", getActiveBanners);

// // Admin
// router.post("/", protect, isAdmin, createBanner);
// router.put("/:id", protect, isAdmin, updateBanner);
// router.delete("/:id", protect, isAdmin, deleteBanner);

// export default router;


// import express from "express";
// import {
//   createOrUpdateBanner,
//   getActiveBanner,
//   deleteBanner,
// } from "../controllers/bannerController.js";
// import { protect } from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/adminMiddleware.js";
// import bannerUpload from "../middlewares/bannerUpload.js";

// const router = express.Router();

// // PUBLIC
// router.get("/", getActiveBanner);

// // ADMIN
// router.post(
//   "/",
//   protect,
//   isAdmin,
//   bannerUpload.single("image"),
//   createOrUpdateBanner
// );

// router.delete("/", protect, isAdmin, deleteBanner);

// export default router;



import express from "express";
import {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  reorderBanners,
} from "../controllers/bannerController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import bannerUpload from "../middlewares/bannerUpload.js";

const router = express.Router();

// ========================================
// PUBLIC ROUTES
// ========================================

// GET all active banners (for homepage carousel)
router.get("/", getAllBanners);

// ========================================
// ADMIN ROUTES
// ========================================

// CREATE new banner
router.post(
  "/",
  protect,
  isAdmin,
  bannerUpload.single("image"),
  createBanner
);

// UPDATE banner by ID
router.put(
  "/:id",
  protect,
  isAdmin,
  bannerUpload.single("image"),
  updateBanner
);

// DELETE banner by ID
router.delete("/:id", protect, isAdmin, deleteBanner);

// REORDER banners (optional but useful)
router.post("/reorder", protect, isAdmin, reorderBanners);

export default router;