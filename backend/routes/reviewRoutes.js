// import express from "express";
// import {
//   addReview,
//   getProductReviews,
//   approveReview
// } from "../controllers/reviewController.js";

// import { protect } from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/adminMiddleware.js";
// import reviewUpload from "../middlewares/reviewUploadMiddleware.js";
// const router = express.Router();

// // User
// // router.post("/:productId", protect, addReview);
// router.post(
//   "/:productId",
//   protect,
//   reviewUpload.array("images", 3), // max 3 images
//   addReview
// );

// // Public
// router.get("/:productId", getProductReviews);

// // Admin
// router.put("/:id/approve", protect, isAdmin, approveReview);
// // Admin
// router.put("/:id/approve", protect, isAdmin, approveReview);

// // NEW
// router.delete("/:id", protect, isAdmin, deleteReview);

// // Admin fetch reviews by product (search)
// router.get("/admin/all", protect, isAdmin, getReviewsByProductForAdmin);


// export default router;


import express from "express";
import {
  addReview,
  getProductReviews,
  approveReview,
  deleteReview,
  getReviewsByProductForAdmin
} from "../controllers/reviewController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import reviewUpload from "../middlewares/reviewUploadMiddleware.js";

const router = express.Router();

/* ==============================
   ADMIN ROUTES (Place FIRST)
============================== */

// Admin fetch reviews by product (search)
router.get("/admin/all", protect, isAdmin, getReviewsByProductForAdmin);

// Approve review
router.put("/:id/approve", protect, isAdmin, approveReview);

// Delete review
router.delete("/:id", protect, isAdmin, deleteReview);


/* ==============================
   USER ROUTES
============================== */

// Add review
router.post(
  "/:productId",
  protect,
  reviewUpload.array("images", 3),
  addReview
);


/* ==============================
   PUBLIC ROUTE
============================== */

// Get approved reviews of product
router.get("/:productId", getProductReviews);

export default router;
