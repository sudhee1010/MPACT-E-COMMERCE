// // import express from "express";
// // import {
// //   addReview,
// //   getProductReviews,
// //   approveReview
// // } from "../controllers/reviewController.js";

// // import { protect } from "../middlewares/authMiddleware.js";
// // import { isAdmin } from "../middlewares/adminMiddleware.js";
// // import reviewUpload from "../middlewares/reviewUploadMiddleware.js";
// // const router = express.Router();

// // // User
// // // router.post("/:productId", protect, addReview);
// // router.post(
// //   "/:productId",
// //   protect,
// //   reviewUpload.array("images", 3), // max 3 images
// //   addReview
// // );

// // // Public
// // router.get("/:productId", getProductReviews);

// // // Admin
// // router.put("/:id/approve", protect, isAdmin, approveReview);
// // // Admin
// // router.put("/:id/approve", protect, isAdmin, approveReview);

// // // NEW
// // router.delete("/:id", protect, isAdmin, deleteReview);

// // // Admin fetch reviews by product (search)
// // router.get("/admin/all", protect, isAdmin, getReviewsByProductForAdmin);


// // export default router;


// import express from "express";
// import {
//   addReview,
//   getProductReviews,
//   approveReview,
//   deleteReview,
//   getReviewsByProductForAdmin
// } from "../controllers/reviewController.js";

// import { protect } from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/adminMiddleware.js";
// import reviewUpload from "../middlewares/reviewUploadMiddleware.js";

// const router = express.Router();

// /* ==============================
//    ADMIN ROUTES (Place FIRST)
// ============================== */

// // Admin fetch reviews by product (search)
// router.get("/admin/all", protect, isAdmin, getReviewsByProductForAdmin);

// // Approve review
// router.put("/:id/approve", protect, isAdmin, approveReview);

// // Delete review
// router.delete("/:id", protect, isAdmin, deleteReview);


// /* ==============================
//    USER ROUTES
// ============================== */

// // Add review
// router.post(
//   "/:productId",
//   protect,
//   reviewUpload.array("images", 3),
//   addReview
// );


// /* ==============================
//    PUBLIC ROUTE
// ============================== */

// // Get approved reviews of product
// router.get("/:productId", getProductReviews);

// export default router;


// import express from "express";
// import {
//   addReview,
//   getProductReviews,
//   approveReview,
//   rejectReview,
//   deleteReview,
//   getReviewsByProductForAdmin
// } from "../controllers/reviewController.js";

// import { protect } from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/adminMiddleware.js";
// import reviewUpload from "../middlewares/reviewUploadMiddleware.js";

// const router = express.Router();

// /* ==============================
//    ADMIN ROUTES (ALWAYS FIRST)
// ============================== */

// router.get("/admin/all", protect, isAdmin, getReviewsByProductForAdmin);

// router.put("/:id/approve", protect, isAdmin, approveReview);

// router.put("/:id/reject", protect, isAdmin, rejectReview);

// router.delete("/:id", protect, isAdmin, deleteReview);

// /* ==============================
//    USER ROUTES
// ============================== */

// router.post(
//   "/:productId",
//   protect,
//   reviewUpload.array("images", 3),
//   addReview
// );

// /* ==============================
//    PUBLIC ROUTE
// ============================== */

// router.get("/:productId", getProductReviews);

// export default router;


import express from "express";
import {
  addReview,
  getProductReviews,
  approveReview,
  rejectReview,
  deleteReview,
  getReviewsByProductForAdmin,
  getAllReviewsForAdmin,
} from "../controllers/reviewController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import reviewUpload from "../middlewares/reviewUploadMiddleware.js";

const router = express.Router();

/* ==============================
   ADMIN ROUTES (ALWAYS FIRST)
============================== */

// Get all reviews (with optional filtering)
router.get("/admin/all", protect, isAdmin, getAllReviewsForAdmin);

// Get reviews by product (with search)
router.get("/admin/product", protect, isAdmin, getReviewsByProductForAdmin);

// Approve review
router.put("/:id/approve", protect, isAdmin, approveReview);

// Reject review
router.put("/:id/reject", protect, isAdmin, rejectReview);

// Delete review
router.delete("/:id", protect, isAdmin, deleteReview);

/* ==============================
   USER ROUTES
============================== */

// Add review with images
router.post(
  "/:productId",
  protect,
  reviewUpload.array("images", 3),
  addReview
);

/* ==============================
   PUBLIC ROUTE
============================== */

// Get approved reviews for a product
router.get("/:productId", getProductReviews);

export default router;