import express from "express";
import { getAllUsers,banUser,unbanUser } from "../controllers/adminUserController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getAllUsers);
router.post("/:userId/ban", protect, isAdmin, banUser);
router.post("/:userId/unban", protect, isAdmin, unbanUser);

export default router;
