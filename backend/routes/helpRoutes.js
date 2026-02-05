import express from "express";
import {
  createTicket,
  getMyTickets,
  getAllTickets,
  updateTicket
} from "../controllers/helpController.js";

import { protect} from "../middlewares/authMiddleware.js";
import { isAdmin} from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* USER */
router.post("/", protect, createTicket);
router.get("/my", protect, getMyTickets);

/* ADMIN */
router.get("/", protect, isAdmin, getAllTickets);
router.put("/:id", protect, isAdmin, updateTicket);

export default router;
