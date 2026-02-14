// // import Review from "../models/Review.js";
// // import Order from "../models/Order.js";
// // import Product from "../models/Product.js";


// // export const addReview = async (req, res) => {
// //   try {
// //     const { rating, comment } = req.body;
// //     const productId = req.params.productId;

// //     // 1️⃣ Check if user purchased product
// //     const hasPurchased = await Order.findOne({
// //       user: req.user._id,
// //       "orderItems.product": productId,
// //       orderStatus: { $in: ["delivered", "confirmed"] },
// //     });

// //     if (!hasPurchased) {
// //       return res.status(400).json({
// //         message: "You can review only purchased products",
// //       });
// //     }

// //     // 2️⃣ Prevent duplicate review
// //     const alreadyReviewed = await Review.findOne({
// //       user: req.user._id,
// //       product: productId,
// //     });

// //     if (alreadyReviewed) {
// //       return res.status(400).json({
// //         message: "You have already reviewed this product",
// //       });
// //     }

// //     // 3️⃣ Handle uploaded images (optional)
// //     const images = req.files
// //       ? req.files.map((file) => ({
// //           url: file.path,
// //           public_id: file.filename,
// //         }))
// //       : [];

// //     // 4️⃣ Create review
// //     const review = await Review.create({
// //       user: req.user._id,
// //       product: productId,
// //       rating,
// //       comment,
// //       images,
// //     });

// //     res.status(201).json(review);

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Failed to add review" });
// //   }
// // };

// // export const getProductReviews = async (req, res) => {
// //   const reviews = await Review.find({
// //     product: req.params.productId,
// //     isApproved: true
// //   }).populate("user", "name");

// //   res.json(reviews);
// // };


// // export const approveReview = async (req, res) => {
// //   const review = await Review.findById(req.params.id);

// //   if (!review) {
// //     return res.status(404).json({ message: "Review not found" });
// //   }

// //   review.isApproved = true;
// //   await review.save();

// //   // 4️⃣ Recalculate product rating
// //   const reviews = await Review.find({
// //     product: review.product,
// //     isApproved: true
// //   });

// //   const product = await Product.findById(review.product);

// //   product.numReviews = reviews.length;
// //   product.rating =
// //     reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

// //   await product.save();

// //   res.json({ message: "Review approved" });
// // };

// // // DELETE REVIEW (Admin)
// // export const deleteReview = async (req, res) => {
// //   try {
// //     const review = await Review.findById(req.params.id);

// //     if (!review) {
// //       return res.status(404).json({ message: "Review not found" });
// //     }

// //     const productId = review.product;

// //     // Delete review
// //     await review.deleteOne();

// //     // Recalculate rating after delete
// //     const reviews = await Review.find({
// //       product: productId,
// //       isApproved: true,
// //     });

// //     const product = await Product.findById(productId);

// //     if (reviews.length === 0) {
// //       product.numReviews = 0;
// //       product.rating = 0;
// //     } else {
// //       product.numReviews = reviews.length;
// //       product.rating =
// //         reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
// //     }

// //     await product.save();

// //     res.json({ message: "Review deleted successfully" });

// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Failed to delete review" });
// //   }
// // };

// // // ADMIN: Get reviews with search + filter + pagination
// // export const getReviewsByProductForAdmin = async (req, res) => {
// //   try {
// //     const { keyword, status, page = 1, limit = 10 } = req.query;

// //     const pageNumber = Number(page);
// //     const pageSize = Number(limit);

// //     /* ================= FILTER ================= */
// //     let filter = {};

// //     // Filter by productId (IMPORTANT)
// //     if (keyword) {
// //       filter.product = keyword;
// //     }

// //     // Filter by approval status
// //     if (status === "approved") {
// //       filter.isApproved = true;
// //     }

// //     if (status === "pending") {
// //       filter.isApproved = false;
// //     }

// //     /* ================= FETCH REVIEWS ================= */
// //     const totalFiltered = await Review.countDocuments(filter);

// //     const reviews = await Review.find(filter)
// //       .populate("user", "name")
// //       .populate("product", "name")
// //       .sort({ createdAt: -1 })
// //       .skip((pageNumber - 1) * pageSize)
// //       .limit(pageSize);

// //     const pages = Math.ceil(totalFiltered / pageSize);

// //     /* ================= ANALYTICS (NOT FILTERED BY STATUS) ================= */

// //     let analyticsFilter = {};

// //     if (keyword) {
// //       analyticsFilter.product = keyword;
// //     }

// //     const total = await Review.countDocuments(analyticsFilter);

// //     const approved = await Review.countDocuments({
// //       ...analyticsFilter,
// //       isApproved: true,
// //     });

// //     const pending = await Review.countDocuments({
// //       ...analyticsFilter,
// //       isApproved: false,
// //     });

// //     const ratingData = await Review.find(analyticsFilter).select("rating");

// //     const average =
// //       ratingData.length > 0
// //         ? (
// //             ratingData.reduce((acc, r) => acc + r.rating, 0) /
// //             ratingData.length
// //           ).toFixed(1)
// //         : 0;

// //     // Rating distribution (1★ to 5★)
// //     const distribution = [0, 0, 0, 0, 0];

// //     ratingData.forEach((r) => {
// //       if (r.rating >= 1 && r.rating <= 5) {
// //         distribution[r.rating - 1]++;
// //       }
// //     });

// //     /* ================= RESPONSE ================= */

// //     res.json({
// //       reviews,
// //       page: pageNumber,
// //       pages,
// //       analytics: {
// //         total,
// //         approved,
// //         pending,
// //         average,
// //         distribution,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Admin review fetch error:", error);
// //     res.status(500).json({ message: error.message });
// //   }
// // };



// import Review from "../models/Review.js";
// import Order from "../models/Order.js";
// import Product from "../models/Product.js";

// /* ================= ADD REVIEW ================= */

// export const addReview = async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
//     const productId = req.params.productId;

//     const hasPurchased = await Order.findOne({
//       user: req.user._id,
//       "orderItems.product": productId,
//       orderStatus: { $in: ["delivered", "confirmed"] },
//     });

//     if (!hasPurchased) {
//       return res.status(400).json({
//         message: "You can review only purchased products",
//       });
//     }

//     const alreadyReviewed = await Review.findOne({
//       user: req.user._id,
//       product: productId,
//     });

//     if (alreadyReviewed) {
//       return res.status(400).json({
//         message: "You have already reviewed this product",
//       });
//     }

//     const images = req.files
//       ? req.files.map((file) => ({
//           url: file.path,
//           public_id: file.filename,
//         }))
//       : [];

//     const review = await Review.create({
//       user: req.user._id,
//       product: productId,
//       rating,
//       comment,
//       images,
//     });

//     res.status(201).json(review);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to add review" });
//   }
// };

// /* ================= GET APPROVED REVIEWS ================= */

// export const getProductReviews = async (req, res) => {
//   const reviews = await Review.find({
//     product: req.params.productId,
//     isApproved: true,
//   }).populate("user", "name");

//   res.json(reviews);
// };

// /* ================= APPROVE REVIEW ================= */

// export const approveReview = async (req, res) => {
//   try {
//     const review = await Review.findById(req.params.id);

//     if (!review) {
//       return res.status(404).json({ message: "Review not found" });
//     }

//     review.isApproved = true;
//     await review.save();

//     await recalculateProductRating(review.product);

//     res.json({ message: "Review approved successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ================= REJECT REVIEW ================= */

// export const rejectReview = async (req, res) => {
//   try {
//     const review = await Review.findById(req.params.id);

//     if (!review) {
//       return res.status(404).json({ message: "Review not found" });
//     }

//     review.isApproved = false;
//     await review.save();

//     await recalculateProductRating(review.product);

//     res.json({ message: "Review rejected successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ================= DELETE REVIEW ================= */

// export const deleteReview = async (req, res) => {
//   try {
//     const review = await Review.findById(req.params.id);

//     if (!review) {
//       return res.status(404).json({ message: "Review not found" });
//     }

//     const productId = review.product;

//     await review.deleteOne();

//     await recalculateProductRating(productId);

//     res.json({ message: "Review deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to delete review" });
//   }
// };

// /* ================= ADMIN FETCH ================= */
// export const getReviewsByProductForAdmin = async (req, res) => {
//   try {
//     const { keyword, status, page = 1, limit = 10 } = req.query;

//     const pageNumber = Number(page);
//     const pageSize = Number(limit);

//     let filter = {};

//     if (keyword && mongoose.Types.ObjectId.isValid(keyword)) {
//       filter.product = keyword;
//     }

//     if (status === "approved") filter.isApproved = true;
//     if (status === "pending") filter.isApproved = false;

//     const totalFiltered = await Review.countDocuments(filter);

//     const reviews = await Review.find(filter)
//       .populate("user", "name")
//       .populate("product", "name")
//       .sort({ createdAt: -1 })
//       .skip((pageNumber - 1) * pageSize)
//       .limit(pageSize);

//     const pages = Math.ceil(totalFiltered / pageSize);

//     let analyticsFilter = {};

//     if (keyword && mongoose.Types.ObjectId.isValid(keyword)) {
//       analyticsFilter.product = keyword;
//     }

//     const total = await Review.countDocuments(analyticsFilter);
//     const approved = await Review.countDocuments({
//       ...analyticsFilter,
//       isApproved: true,
//     });
//     const pending = await Review.countDocuments({
//       ...analyticsFilter,
//       isApproved: false,
//     });

//     const ratingData = await Review.find(analyticsFilter).select("rating");

//     const average =
//       ratingData.length > 0
//         ? (
//             ratingData.reduce((acc, r) => acc + r.rating, 0) /
//             ratingData.length
//           ).toFixed(1)
//         : 0;

//     const distribution = [0, 0, 0, 0, 0];

//     ratingData.forEach((r) => {
//       distribution[r.rating - 1]++;
//     });

//     res.json({
//       reviews,
//       page: pageNumber,
//       pages,
//       analytics: {
//         total,
//         approved,
//         pending,
//         average,
//         distribution,
//       },
//     });
//   } catch (error) {
//     console.error("Admin review fetch error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };


import Review from "../models/Review.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

/* ================= HELPER: RECALCULATE RATING ================= */
const recalculateProductRating = async (productId) => {
  const reviews = await Review.find({
    product: productId,
  });

  const product = await Product.findById(productId);
  if (!product) return;

  if (reviews.length === 0) {
    product.numReviews = 0;
    product.rating = 0;
  } else {
    product.numReviews = reviews.length;
    product.rating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  }

  await product.save();
};

/* ================= ADD REVIEW ================= */
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;

    // Check if user purchased product
    const hasPurchased = await Order.findOne({
      user: req.user._id,
      "orderItems.product": productId,
      orderStatus: { $in: ["delivered", "confirmed"] },
    });

    if (!hasPurchased) {
      return res.status(400).json({
        message: "You can review only purchased products",
      });
    }

    // Prevent duplicate review
    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      product: productId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You have already reviewed this product",
      });
    }

    // Handle uploaded images
    const images = req.files
      ? req.files.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }))
      : [];

    // Create review
    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
      images,
    });

    // Recalculate product rating immediately
    await recalculateProductRating(productId);

    // Populate user and product info
    await review.populate("user", "name");
    await review.populate("product", "name");

    res.status(201).json({
      message: "Review submitted successfully!",
      review,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add review" });
  }
};

/* ================= GET ALL REVIEWS FOR A PRODUCT ================= */
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE REVIEW ================= */
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const productId = review.product;

    await review.deleteOne();

    await recalculateProductRating(productId);

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete review" });
  }
};

/* ================= ADMIN FETCH WITH SEARCH ================= */
export const getReviewsByProductForAdmin = async (req, res) => {
  try {
    const { keyword, page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    let filter = {};

    // Filter by productId if keyword is valid ObjectId
    if (keyword && mongoose.Types.ObjectId.isValid(keyword)) {
      filter.product = keyword;
    }

    const totalFiltered = await Review.countDocuments(filter);

    const reviews = await Review.find(filter)
      .populate("user", "name")
      .populate("product", "name")
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const pages = Math.ceil(totalFiltered / pageSize);

    // Analytics (not filtered by status)
    let analyticsFilter = {};
    if (keyword && mongoose.Types.ObjectId.isValid(keyword)) {
      analyticsFilter.product = keyword;
    }

    const total = await Review.countDocuments(analyticsFilter);

    const ratingData = await Review.find(analyticsFilter).select("rating");
    const average =
      ratingData.length > 0
        ? (
            ratingData.reduce((acc, r) => acc + r.rating, 0) / ratingData.length
          ).toFixed(1)
        : 0;

    // Rating distribution (1★ to 5★)
    const distribution = [0, 0, 0, 0, 0];
    ratingData.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        distribution[r.rating - 1]++;
      }
    });

    res.json({
      reviews,
      page: pageNumber,
      pages,
      analytics: {
        total,
        average,
        distribution,
      },
    });
  } catch (error) {
    console.error("Admin review fetch error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ALL REVIEWS FOR ADMIN (NO FILTER) ================= */
export const getAllReviewsForAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const totalFiltered = await Review.countDocuments();

    const reviews = await Review.find()
      .populate("user", "name")
      .populate("product", "name")
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const pages = Math.ceil(totalFiltered / pageSize);

    // Global analytics
    const total = await Review.countDocuments();

    const ratingData = await Review.find().select("rating");
    const average =
      ratingData.length > 0
        ? (
            ratingData.reduce((acc, r) => acc + r.rating, 0) / ratingData.length
          ).toFixed(1)
        : 0;

    const distribution = [0, 0, 0, 0, 0];
    ratingData.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        distribution[r.rating - 1]++;
      }
    });

    res.json({
      reviews,
      page: pageNumber,
      pages,
      analytics: {
        total,
        average,
        distribution,
      },
    });
  } catch (error) {
    console.error("Admin all reviews fetch error:", error);
    res.status(500).json({ message: error.message });
  }
};