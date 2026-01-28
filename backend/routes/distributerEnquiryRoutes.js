import express from "express";
import {
  submitDistributorEnquiry,
  getDistributorEnquiries,
  updateDistributorStatus,
} from "../controllers/distributerEnquiryController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// 🔓 Public distributor enquiry
router.post("/distributor-enquiry", submitDistributorEnquiry);

// 🔐 Admin-only routes
router.get(
  "/distributor-enquiry",
  protect,
  isAdmin,
  getDistributorEnquiries
);

router.patch(
  "/distributor-enquiry/:id",
  protect,
  isAdmin,
  updateDistributorStatus
);

export default router;
