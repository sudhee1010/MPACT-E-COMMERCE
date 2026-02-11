// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import { Trash2, CheckCircle, ChevronDown } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function AdminReviews() {
//   const [reviews, setReviews] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [keyword, setKeyword] = useState("");
//   const [debouncedKeyword, setDebouncedKeyword] = useState("");
//   const [status, setStatus] = useState("all");
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [productOpen, setProductOpen] = useState(false);
//   const [statusOpen, setStatusOpen] = useState(false);

//   /* ================= Debounce ================= */
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedKeyword(keyword);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [keyword]);

//   /* ================= Fetch Products ================= */
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // const { data } = await api.get("/api/products");
//         const { data } = await api.get("/api/products?limit=1000");

//         setProducts(data.products || []);
//       } catch {
//         toast.error("Failed to load products");
//       }
//     };
//     fetchProducts();
//   }, []);

//   /* ================= Fetch Reviews ================= */
//   const fetchReviews = async () => {
//     try {
//       setLoading(true);

//       const { data } = await api.get(
//         `/api/reviews/admin/all?keyword=${debouncedKeyword}&status=${status}&page=${page}`
//       );

//       setReviews(data.reviews || []);
//       setPages(data.pages || 1);
//       setAnalytics(data.analytics || null);
//     } catch {
//       toast.error("Failed to fetch reviews");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [debouncedKeyword, status, page]);

//   /* ================= Approve ================= */
//   const approveHandler = async (id) => {
//     try {
//       await api.put(`/api/reviews/${id}/approve`);
//       toast.success("Review Approved");
//       fetchReviews();
//     } catch {
//       toast.error("Failed to approve review");
//     }
//   };

//   /* ================= Delete ================= */
//   const deleteHandler = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this review?")) return;

//     try {
//       await api.delete(`/api/reviews/${id}`);
//       toast.success("Review Deleted");
//       fetchReviews();
//     } catch {
//       toast.error("Failed to delete review");
//     }
//   };

//   const chartData =
//     analytics?.distribution?.map((count, index) => ({
//       rating: `${index + 1}★`,
//       count,
//     })) || [];

//   return (
//     <div className="min-h-screen bg-[#1e1e1e] text-white p-10">
//       <h2 className="text-2xl font-bold mb-8">Review Analytics</h2>

//       {/* ================= Analytics Cards ================= */}
//       {analytics && (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//           <div className="bg-[#2b2b2b] border border-yellow-400 p-6 rounded-xl">
//             <p className="text-yellow-400">Total Reviews</p>
//             <h3 className="text-3xl font-bold mt-2">{analytics.total}</h3>
//           </div>

//           <div className="bg-[#2b2b2b] border border-yellow-400 p-6 rounded-xl">
//             <p className="text-yellow-400">Approved</p>
//             <h3 className="text-3xl font-bold mt-2 text-green-400">
//               {analytics.approved}
//             </h3>
//           </div>

//           <div className="bg-[#2b2b2b] border border-yellow-400 p-6 rounded-xl">
//             <p className="text-yellow-400">Pending</p>
//             <h3 className="text-3xl font-bold mt-2 text-yellow-400">
//               {analytics.pending}
//             </h3>
//           </div>

//           <div className="bg-[#2b2b2b] border border-yellow-400 p-6 rounded-xl">
//             <p className="text-yellow-400">Average Rating</p>
//             <h3 className="text-3xl font-bold mt-2">
//               {analytics.average} ⭐
//             </h3>
//           </div>
//         </div>
//       )}

//       {/* ================= Chart ================= */}
//       {analytics && (
//         <div className="bg-[#2b2b2b] p-6 rounded-xl mb-10">
//           <h4 className="text-yellow-400 mb-6 font-semibold">
//             Rating Distribution
//           </h4>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <XAxis dataKey="rating" stroke="#fff" />
//               <YAxis stroke="#fff" />
//               <Tooltip />
//               <Bar dataKey="count" fill="#facc15" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       )}

//       {/* ================= Custom Dropdowns ================= */}
//       <div className="flex gap-6 mb-10 relative">

//         {/* Product Dropdown */}
//         <div className="relative w-60">
//           <button
//             onClick={() => setProductOpen(!productOpen)}
//             className="w-full bg-[#2b2b2b] border border-yellow-400 px-4 py-2 rounded-lg flex justify-between items-center"
//           >
//             <span>
//               {keyword
//                 ? products.find((p) => p._id === keyword)?.name
//                 : "Select Product"}
//             </span>
//             <ChevronDown size={18} />
//           </button>

//           {productOpen && (
//             <div className="absolute z-50 mt-2 w-full bg-[#2b2b2b] border border-yellow-400 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//               <div
//                 onClick={() => {
//                   setKeyword("");
//                   setPage(1);
//                   setProductOpen(false);
//                 }}
//                 className="px-4 py-2 hover:bg-yellow-400 hover:text-black cursor-pointer"
//               >
//                 All Products
//               </div>

//               {products.map((p) => (
//                 <div
//                   key={p._id}
//                   onClick={() => {
//                     setKeyword(p._id);
//                     setPage(1);
//                     setProductOpen(false);
//                   }}
//                   className="px-4 py-2 hover:bg-yellow-400 hover:text-black cursor-pointer"
//                 >
//                   {p.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Status Dropdown */}
//         <div className="relative w-40">
//           <button
//             onClick={() => setStatusOpen(!statusOpen)}
//             className="w-full bg-[#2b2b2b] border border-yellow-400 px-4 py-2 rounded-lg flex justify-between items-center"
//           >
//             <span className="capitalize">{status}</span>
//             <ChevronDown size={18} />
//           </button>

//           {statusOpen && (
//             <div className="absolute z-50 mt-2 w-full bg-[#2b2b2b] border border-yellow-400 rounded-lg shadow-lg">
//               {["all", "approved", "pending"].map((s) => (
//                 <div
//                   key={s}
//                   onClick={() => {
//                     setStatus(s);
//                     setPage(1);
//                     setStatusOpen(false);
//                   }}
//                   className="px-4 py-2 hover:bg-yellow-400 hover:text-black cursor-pointer capitalize"
//                 >
//                   {s}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ================= Loading ================= */}
//       {loading && (
//         <div className="text-yellow-400 text-center py-10">
//           Loading reviews...
//         </div>
//       )}

//       {/* ================= Empty ================= */}
//       {!loading && reviews.length === 0 && (
//         <div className="text-center text-gray-400 py-10">
//           No reviews found.
//         </div>
//       )}

//       {/* ================= Table ================= */}
//       {!loading && reviews.length > 0 && (
//         <div className="overflow-x-auto">
//           <table className="w-full bg-[#2b2b2b] rounded-xl overflow-hidden">
//             <thead className="bg-[#3a3a2a] text-yellow-400">
//               <tr>
//                 <th className="p-4 text-left">Product</th>
//                 <th className="p-4 text-left">User</th>
//                 <th className="p-4 text-left">Rating</th>
//                 <th className="p-4 text-left">Status</th>
//                 <th className="p-4 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reviews.map((r) => (
//                 <tr
//                   key={r._id}
//                   className="border-t border-gray-700 hover:bg-[#333]"
//                 >
//                   <td className="p-4">{r.product?.name}</td>
//                   <td className="p-4">{r.user?.name}</td>
//                   <td className="p-4">{"★".repeat(r.rating)}</td>
//                   <td className="p-4">
//                     {r.isApproved ? (
//                       <span className="text-green-400 font-semibold">
//                         Approved
//                       </span>
//                     ) : (
//                       <span className="text-yellow-400 font-semibold">
//                         Pending
//                       </span>
//                     )}
//                   </td>
//                   <td className="p-4 flex gap-3">
//                     {!r.isApproved && (
//                       <CheckCircle
//                         className="cursor-pointer text-green-400 hover:scale-110 transition"
//                         size={20}
//                         onClick={() => approveHandler(r._id)}
//                       />
//                     )}
//                     <Trash2
//                       className="cursor-pointer text-red-500 hover:scale-110 transition"
//                       size={20}
//                       onClick={() => deleteHandler(r._id)}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


import mongoose from "mongoose";
import Review from "../models/Review.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

/* ================= ADD REVIEW ================= */

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;

    // Check purchase
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

    const images = req.files
      ? req.files.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }))
      : [];

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
      images,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error("Add review error:", err);
    res.status(500).json({ message: "Failed to add review" });
  }
};

/* ================= GET APPROVED REVIEWS ================= */

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      isApproved: true,
    }).populate("user", "name");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= APPROVE REVIEW ================= */

export const approveReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.isApproved = true;
    await review.save();

    await recalculateProductRating(review.product);

    res.json({ message: "Review approved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= REJECT REVIEW ================= */

export const rejectReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.isApproved = false;
    await review.save();

    await recalculateProductRating(review.product);

    res.json({ message: "Review rejected successfully" });
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
    console.error("Delete review error:", error);
    res.status(500).json({ message: "Failed to delete review" });
  }
};

/* ================= ADMIN FETCH ================= */

export const getReviewsByProductForAdmin = async (req, res) => {
  try {
    const { keyword, status, page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    let filter = {};

    // SAFE PRODUCT FILTER
    if (keyword && mongoose.Types.ObjectId.isValid(keyword)) {
      filter.product = keyword;
    }

    // STATUS FILTER
    if (status === "approved") filter.isApproved = true;
    if (status === "pending") filter.isApproved = false;

    const totalFiltered = await Review.countDocuments(filter);

    const reviews = await Review.find(filter)
      .populate("user", "name")
      .populate("product", "name")
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const pages = Math.ceil(totalFiltered / pageSize);

    /* ===== ANALYTICS ===== */

    let analyticsFilter = {};

    if (keyword && mongoose.Types.ObjectId.isValid(keyword)) {
      analyticsFilter.product = keyword;
    }

    const total = await Review.countDocuments(analyticsFilter);

    const approved = await Review.countDocuments({
      ...analyticsFilter,
      isApproved: true,
    });

    const pending = await Review.countDocuments({
      ...analyticsFilter,
      isApproved: false,
    });

    const ratingData = await Review.find(analyticsFilter).select("rating");

    const average =
      ratingData.length > 0
        ? (
            ratingData.reduce((acc, r) => acc + r.rating, 0) /
            ratingData.length
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
        approved,
        pending,
        average,
        distribution,
      },
    });
  } catch (error) {
    console.error("Admin review fetch error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= HELPER FUNCTION ================= */

const recalculateProductRating = async (productId) => {
  const reviews = await Review.find({
    product: productId,
    isApproved: true,
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
