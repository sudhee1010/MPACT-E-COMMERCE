import express from "express";
import {
  createFaq,
  getFaqs,
  getAllFaqsAdmin,
  updateFaq,
  deleteFaq,
} from "../controllers/faqController.js";

const router = express.Router();

/* USER */
router.get("/", getFaqs);

/* ADMIN */
router.post("/", createFaq);
router.get("/admin", getAllFaqsAdmin);
router.put("/:id", updateFaq);
router.delete("/:id", deleteFaq);

export default router;
