import express from "express";
import { downloadInvoice, adminDownloadInvoice } from "../controllers/invoiceController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id", protect, downloadInvoice);
router.get("/admin/:id", protect, adminDownloadInvoice);

export default router;