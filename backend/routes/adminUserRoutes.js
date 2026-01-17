import express from "express";
import { getAllUsers } from "../controllers/adminUserController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getAllUsers);

export default router;
