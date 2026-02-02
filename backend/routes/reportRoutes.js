import express from "express";
import {
  getReportSummary,
  getMonthlyReports,
  uploadReport,        // ✅ controller
  exportReportCSV,
  getUploadedReports,
  deleteReport
} from "../controllers/reportController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

// 🔴 rename middleware to avoid conflict
import uploadReportMiddleware from "../middlewares/uploadReport.js";

const router = express.Router();

router.get("/summary", protect, isAdmin, getReportSummary);
router.get("/monthly", protect, isAdmin, getMonthlyReports);
router.get("/export/csv", protect, isAdmin, exportReportCSV);
router.get("/uploads", protect, isAdmin, getUploadedReports);

router.post(
  "/upload",
  protect,
  isAdmin,
  uploadReportMiddleware.single("file"), // ✅ middleware
  uploadReport                            // ✅ controller
);

router.delete("/:id", protect, isAdmin, deleteReport);

export default router;
