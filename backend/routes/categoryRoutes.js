// import express from "express";
// import {
//   createCategory,
//   getCategories,
//   updateCategory,
//   deleteCategory
// } from "../controllers/categoryController.js";

// import { protect } from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/adminMiddleware.js";

// const router = express.Router();

// // Public
// router.get("/", getCategories);

// // Admin
// router.post("/", protect, isAdmin, createCategory);
// router.put("/:id", protect, isAdmin, updateCategory);
// router.delete("/:id", protect, isAdmin, deleteCategory);

// export default router;

import express from "express";
import {
  createCategory,
  getCategories,
  getAdminCategories,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus
} from "../controllers/categoryController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getCategories);
router.get("/admin", protect, isAdmin, getAdminCategories);

// Admin routes with image upload
router.post("/", 
  protect, 
  isAdmin, 
  upload.single('image'), 
  createCategory
);

router.put("/:id", 
  protect, 
  isAdmin, 
  upload.single('image'), 
  updateCategory
);

router.delete("/:id", protect, isAdmin, deleteCategory);
router.put("/:id/toggle-status", protect, isAdmin, toggleCategoryStatus);

export default router;
