import express from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/blogCategoryController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";


const router = express.Router();

router.get("/", getAllCategories);
router.post("/", protect, isAdmin, createCategory);

export default router;