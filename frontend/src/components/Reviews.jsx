// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { Trash2, Search, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";

// export default function AdminReviews() {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [viewingImage, setViewingImage] = useState(null);

//   // Modal states
//   const [showModal, setShowModal] = useState(false);
//   const [modalConfig, setModalConfig] = useState({
//     type: "", // 'success', 'error', 'confirm'
//     title: "",
//     message: "",
//     onConfirm: null,
//   });

//   useEffect(() => {
//     fetchProducts();
//     fetchAllReviews();
//   }, []);

//   useEffect(() => {
//     if (selectedProduct) {
//       fetchReviewsByProduct();
//     } else {
//       fetchAllReviews();
//     }
//   }, [selectedProduct, page]);

//   const fetchProducts = async () => {
//     try {
//       const { data } = await api.get("/api/products?limit=1000");
//       setProducts(data.products || []);
//     } catch {
//       showNotification("error", "Error", "Failed to load products");
//     }
//   };

//   const fetchAllReviews = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get(
//         `/api/reviews/admin/all?page=${page}&limit=10`
//       );

//       setReviews(data.reviews || []);
//       setPages(data.pages || 1);
//       setAnalytics(data.analytics || null);
//     } catch {
//       showNotification("error", "Error", "Failed to fetch reviews");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchReviewsByProduct = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get(
//         `/api/reviews/admin/product?keyword=${selectedProduct}&page=${page}&limit=10`
//       );

//       setReviews(data.reviews || []);
//       setPages(data.pages || 1);
//       setAnalytics(data.analytics || null);
//     } catch {
//       showNotification("error", "Error", "Failed to fetch reviews");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showNotification = (type, title, message) => {
//     setModalConfig({ type, title, message, onConfirm: null });
//     setShowModal(true);
//   };

//   const showConfirmDialog = (title, message, onConfirm) => {
//     setModalConfig({ type: "confirm", title, message, onConfirm });
//     setShowModal(true);
//   };

//   const deleteHandler = async (id) => {
//     showConfirmDialog(
//       "Delete Review",
//       "Are you sure you want to delete this review? This action cannot be undone.",
//       async () => {
//         try {
//           await api.delete(`/api/reviews/${id}`);
//           showNotification("success", "Success", "Review deleted successfully");

//           if (selectedProduct) {
//             fetchReviewsByProduct();
//           } else {
//             fetchAllReviews();
//           }
//         } catch {
//           showNotification("error", "Error", "Failed to delete review");
//         }
//       }
//     );
//   };

//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const chartData =
//     analytics?.distribution?.map((count, index) => ({
//       rating: `${index + 1}★`,
//       count,
//     })) || [];

//   const COLORS = ["#ef4444", "#f97316", "#facc15", "#84cc16", "#22c55e"];

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10">
//       {/* Page Header */}
//       <div className="mb-10">
//         <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 uppercase tracking-wider font-mono">
//           Review Management
//         </h1>
//         <p className="text-gray-400 text-base md:text-lg">
//           View and manage customer reviews across all products
//         </p>
//       </div>

//       {/* Analytics Section */}
//       {analytics && (
//         <div className="mb-10">
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
//             {/* Total Reviews */}
//             <div className="bg-gradient-to-br from-[#1a1a1a] to-[#262626] border-2 border-yellow-400 rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/30">
//               <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
//                 Total Reviews
//               </p>
//               <h3 className="text-5xl font-bold text-yellow-400 font-mono">
//                 {analytics.total}
//               </h3>
//             </div>

//             {/* Average Rating */}
//             <div className="bg-gradient-to-br from-[#1a1a1a] to-[#262626] border-2 border-yellow-400 rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/30">
//               <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
//                 Average Rating
//               </p>
//               <h3 className="text-5xl font-bold text-yellow-400 font-mono">
//                 {analytics.average} ⭐
//               </h3>
//             </div>

//             {/* Selected Product Info */}
//             <div className="bg-gradient-to-br from-[#1a1a1a] to-[#262626] border-2 border-yellow-400 rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/30">
//               <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
//                 Viewing
//               </p>
//               <h3 className="text-2xl font-bold text-green-400 font-mono">
//                 {selectedProduct ? products.find(p => p._id === selectedProduct)?.name : "All Products"}
//               </h3>
//             </div>
//           </div>

//           {/* Chart */}
//           <div className="bg-[#1a1a1a] border-2 border-[#262626] rounded-2xl p-8">
//             <h3 className="text-lg font-bold text-yellow-400 mb-6 uppercase tracking-wider font-mono">
//               Rating Distribution
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={chartData}>
//                 <XAxis dataKey="rating" stroke="#888" />
//                 <YAxis stroke="#888" />
//                 <Tooltip
//                   contentStyle={{
//                     background: "#262626",
//                     border: "2px solid #facc15",
//                     borderRadius: "12px",
//                   }}
//                 />
//                 <Bar dataKey="count" radius={[8, 8, 0, 0]}>
//                   {chartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}

//       {/* Filters Section */}
//       <div className="bg-[#1a1a1a] border-2 border-[#262626] rounded-2xl p-6 md:p-8 mb-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
//           {/* Product Search */}
//           <div className="flex flex-col gap-2">
//             <label className="text-gray-400 text-xs uppercase tracking-wider">
//               Search Product
//             </label>
//             <div className="relative">
//               <Search
//                 size={20}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 type="text"
//                 className="w-full pl-12 pr-4 py-3 bg-[#262626] border-2 border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
//                 placeholder="Type to search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             {searchQuery && filteredProducts.length > 0 && (
//               <select
//                 className="w-full px-4 py-3 bg-[#262626] border-2 border-[#3a3a3a] rounded-xl text-white cursor-pointer focus:outline-none focus:border-yellow-400 transition-colors"
//                 value={selectedProduct}
//                 onChange={(e) => {
//                   setSelectedProduct(e.target.value);
//                   setPage(1);
//                 }}
//               >
//                 <option value="">All Products</option>
//                 {filteredProducts.map((p) => (
//                   <option key={p._id} value={p._id}>
//                     {p.name}
//                   </option>
//                 ))}
//               </select>
//             )}
//           </div>

//           {/* Clear Filters */}
//           {selectedProduct && (
//             <button
//               className="px-6 py-3 bg-[#262626] border-2 border-red-500 rounded-xl text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all"
//               onClick={() => {
//                 setSelectedProduct("");
//                 setSearchQuery("");
//                 setPage(1);
//               }}
//             >
//               Clear Filters
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Reviews Grid */}
//       {loading ? (
//         <div className="text-center py-20">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
//           <p className="text-yellow-400 mt-4 text-lg">Loading reviews...</p>
//         </div>
//       ) : reviews.length === 0 ? (
//         <div className="text-center py-20 text-gray-400 text-lg">
//           No reviews found
//         </div>
//       ) : (
//         <>
//           <div className="space-y-6">
//             {reviews.map((review) => (
//               <div
//                 key={review._id}
//                 className="bg-[#1a1a1a] border-2 border-[#262626] rounded-2xl p-6 md:p-8 hover:border-yellow-400 transition-all"
//               >
//                 {/* Review Header */}
//                 <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-5 pb-5 border-b border-[#262626]">
//                   <div className="flex-1">
//                     {/* Product Name */}
//                     <h3 className="text-xl font-bold text-yellow-400 mb-3">
//                       {review.product?.name || "Product"}
//                     </h3>

//                     {/* Reviewer Details */}
//                     <div className="flex items-center gap-4">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center font-bold text-black text-lg">
//                         {review.user?.name?.charAt(0).toUpperCase() || "U"}
//                       </div>
//                       <div>
//                         <p className="font-semibold text-white">
//                           {review.user?.name || "Anonymous"}
//                         </p>
//                         <p className="text-sm text-gray-400">
//                           {new Date(review.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Rating */}
//                   <div className="flex items-center gap-3">
//                     <div className="text-yellow-400 text-xl">
//                       {"★".repeat(review.rating)}
//                       {"☆".repeat(5 - review.rating)}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Review Content */}
//                 <div className="mb-5">
//                   <p className="text-gray-300 leading-relaxed text-base">
//                     {review.comment}
//                   </p>
//                 </div>

//                 {/* Review Images */}
//                 {review.images && review.images.length > 0 && (
//                   <div className="flex gap-4 flex-wrap mb-5">
//                     {review.images.map((img, idx) => (
//                       <div
//                         key={idx}
//                         className="relative w-32 h-32 rounded-xl overflow-hidden cursor-pointer border-2 border-[#262626] hover:border-yellow-400 transition-all group"
//                         onClick={() => setViewingImage(img.url)}
//                       >
//                         <img
//                           src={img.url}
//                           alt={`Review ${idx + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                         <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                           <Eye size={24} className="text-yellow-400" />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <button
//                     className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
//                     onClick={() => deleteHandler(review._id)}
//                   >
//                     <Trash2 size={18} />
//                     Delete Review
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           {pages > 1 && (
//             <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
//               <button
//                 className="px-5 py-3 bg-[#262626] border-2 border-[#3a3a3a] rounded-xl text-white font-semibold hover:border-yellow-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
//                 onClick={() => setPage((p) => Math.max(1, p - 1))}
//                 disabled={page === 1}
//               >
//                 <ChevronLeft size={18} />
//                 Previous
//               </button>

//               {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
//                 let pageNum;
//                 if (pages <= 5) {
//                   pageNum = i + 1;
//                 } else if (page <= 3) {
//                   pageNum = i + 1;
//                 } else if (page >= pages - 2) {
//                   pageNum = pages - 4 + i;
//                 } else {
//                   pageNum = page - 2 + i;
//                 }

//                 return (
//                   <button
//                     key={pageNum}
//                     className={`px-5 py-3 rounded-xl font-semibold transition-all ${
//                       page === pageNum
//                         ? "bg-yellow-400 text-black border-2 border-yellow-400"
//                         : "bg-[#262626] text-white border-2 border-[#3a3a3a] hover:border-yellow-400"
//                     }`}
//                     onClick={() => setPage(pageNum)}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}

//               <button
//                 className="px-5 py-3 bg-[#262626] border-2 border-[#3a3a3a] rounded-xl text-white font-semibold hover:border-yellow-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
//                 onClick={() => setPage((p) => Math.min(pages, p + 1))}
//                 disabled={page === pages}
//               >
//                 Next
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           )}
//         </>
//       )}

//       {/* Image Modal */}
//       {viewingImage && (
//         <div
//           className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-10"
//           onClick={() => setViewingImage(null)}
//         >
//           <img
//             src={viewingImage}
//             alt="Review"
//             className="max-w-full max-h-full rounded-2xl"
//           />
//           <button
//             className="absolute top-5 right-5 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform"
//             onClick={() => setViewingImage(null)}
//           >
//             <X size={24} />
//           </button>
//         </div>
//       )}

//       {/* Custom Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-[9999] p-4">
//           <div className="bg-[#1a1a1a] border-2 border-yellow-400 rounded-2xl p-8 max-w-md w-full animate-[popIn_0.3s_ease]">
//             {/* Icon */}
//             <div className="flex justify-center mb-4">
//               {modalConfig.type === "success" && (
//                 <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
//                   <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//               )}
//               {modalConfig.type === "error" && (
//                 <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
//                   <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </div>
//               )}
//               {modalConfig.type === "confirm" && (
//                 <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
//                   <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                   </svg>
//                 </div>
//               )}
//             </div>

//             {/* Title */}
//             <h3 className="text-2xl font-bold text-center text-yellow-400 mb-3 font-mono">
//               {modalConfig.title}
//             </h3>

//             {/* Message */}
//             <p className="text-center text-gray-300 mb-6">
//               {modalConfig.message}
//             </p>

//             {/* Buttons */}
//             <div className="flex gap-3">
//               {modalConfig.type === "confirm" ? (
//                 <>
//                   <button
//                     className="flex-1 px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 rounded-xl font-semibold hover:bg-yellow-400 hover:text-black transition-all"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="flex-1 px-6 py-3 bg-red-500 border-2 border-red-500 text-white rounded-xl font-semibold hover:bg-red-600 hover:border-red-600 transition-all"
//                     onClick={() => {
//                       setShowModal(false);
//                       if (modalConfig.onConfirm) modalConfig.onConfirm();
//                     }}
//                   >
//                     Confirm
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   className="w-full px-6 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-500 transition-all"
//                   onClick={() => setShowModal(false)}
//                 >
//                   OK
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes popIn {
//           from {
//             transform: scale(0.9);
//             opacity: 0;
//           }
//           to {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../api/axios";
import { Trash2, Search, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function AdminReviews() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [reviews, setReviews] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [viewingImage, setViewingImage] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "", // 'success', 'error', 'confirm'
    title: "",
    message: "",
    onConfirm: null,
  });

  useEffect(() => {
    fetchProducts();
    fetchAllReviews();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      fetchReviewsByProduct();
    } else {
      fetchAllReviews();
    }
  }, [selectedProduct, page]);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/api/products?limit=1000");
      setProducts(data.products || []);
    } catch {
      showNotification("error", "Error", "Failed to load products");
    }
  };

  const fetchAllReviews = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/api/reviews/admin/all?page=${page}&limit=10`
      );

      setReviews(data.reviews || []);
      setPages(data.pages || 1);
      setAnalytics(data.analytics || null);
    } catch {
      showNotification("error", "Error", "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewsByProduct = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/api/reviews/admin/product?keyword=${selectedProduct}&page=${page}&limit=10`
      );

      setReviews(data.reviews || []);
      setPages(data.pages || 1);
      setAnalytics(data.analytics || null);
    } catch {
      showNotification("error", "Error", "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, title, message) => {
    setModalConfig({ type, title, message, onConfirm: null });
    setShowModal(true);
  };

  const showConfirmDialog = (title, message, onConfirm) => {
    setModalConfig({ type: "confirm", title, message, onConfirm });
    setShowModal(true);
  };

  const deleteHandler = async (id) => {
    showConfirmDialog(
      "Delete Review",
      "Are you sure you want to delete this review? This action cannot be undone.",
      async () => {
        try {
          await api.delete(`/api/reviews/${id}`);
          showNotification("success", "Success", "Review deleted successfully");

          if (selectedProduct) {
            fetchReviewsByProduct();
          } else {
            fetchAllReviews();
          }
        } catch (error) {
          console.error("Delete error:", error);
          const message = error.response?.data?.message || "Failed to delete review";
          showNotification("error", "Error", message);
        }
      }
    );
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chartData =
    analytics?.distribution?.map((count, index) => ({
      rating: `${index + 1}★`,
      count,
    })) || [];

  const COLORS = ["#ef4444", "#f97316", "#facc15", "#84cc16", "#22c55e"];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 uppercase tracking-wider font-mono">
          Review Management
        </h1>
        <p className="text-gray-400 text-base md:text-lg">
          View and manage customer reviews across all products
        </p>
      </div>

      {/* Analytics Section */}
      {analytics && (
        <div className="mb-10">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {/* Total Reviews */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#262626] border-2 border-yellow-400 rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/30">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                Total Reviews
              </p>
              <h3 className="text-5xl font-bold text-yellow-400 font-mono">
                {analytics.total}
              </h3>
            </div>

            {/* Average Rating */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#262626] border-2 border-yellow-400 rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/30">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                Average Rating
              </p>
              <h3 className="text-5xl font-bold text-yellow-400 font-mono">
                {analytics.average} ⭐
              </h3>
            </div>

            {/* Selected Product Info */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#262626] border-2 border-yellow-400 rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/30">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                Viewing
              </p>
              <h3 className="text-2xl font-bold text-green-400 font-mono">
                {selectedProduct ? products.find(p => p._id === selectedProduct)?.name : "All Products"}
              </h3>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-[#1a1a1a] border-2 border-[#262626] rounded-2xl p-8">
            <h3 className="text-lg font-bold text-yellow-400 mb-6 uppercase tracking-wider font-mono">
              Rating Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="rating" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    background: "#262626",
                    border: "2px solid #facc15",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-[#1a1a1a] border-2 border-[#262626] rounded-2xl p-6 md:p-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
          {/* Product Search */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs uppercase tracking-wider">
              Search Product
            </label>
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 bg-[#262626] border-2 border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                placeholder="Type to search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery && filteredProducts.length > 0 && (
              <select
                className="w-full px-4 py-3 bg-[#262626] border-2 border-[#3a3a3a] rounded-xl text-white cursor-pointer focus:outline-none focus:border-yellow-400 transition-colors"
                value={selectedProduct}
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Products</option>
                {filteredProducts.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Clear Filters */}
          {selectedProduct && (
            <button
              className="px-6 py-3 bg-[#262626] border-2 border-red-500 rounded-xl text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all"
              onClick={() => {
                setSelectedProduct("");
                setSearchQuery("");
                setPage(1);
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          <p className="text-yellow-400 mt-4 text-lg">Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-lg">
          No reviews found
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1a1a1a] border-2 border-[#262626] rounded-2xl p-6 md:p-8 hover:border-yellow-400 transition-all"
              >
                {/* Review Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-5 pb-5 border-b border-[#262626]">
                  <div className="flex-1">
                    {/* Product Name */}
                    <h3 className="text-xl font-bold text-yellow-400 mb-3">
                      {review.product?.name || "Product"}
                    </h3>

                    {/* Reviewer Details */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center font-bold text-black text-lg">
                        {review.user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {review.user?.name || "Anonymous"}
                        </p>
                        <p className="text-sm text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-3">
                    <div className="text-yellow-400 text-xl">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-5">
                  <p className="text-gray-300 leading-relaxed text-base">
                    {review.comment}
                  </p>
                </div>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-4 flex-wrap mb-5">
                    {review.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-32 h-32 rounded-xl overflow-hidden cursor-pointer border-2 border-[#262626] hover:border-yellow-400 transition-all group"
                        onClick={() => setViewingImage(img.url)}
                      >
                        <img
                          src={img.url}
                          alt={`Review ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye size={24} className="text-yellow-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
                    onClick={() => deleteHandler(review._id)}
                  >
                    <Trash2 size={18} />
                    Delete Review
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
              <button
                className="px-5 py-3 bg-[#262626] border-2 border-[#3a3a3a] rounded-xl text-white font-semibold hover:border-yellow-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
                let pageNum;
                if (pages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= pages - 2) {
                  pageNum = pages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                      page === pageNum
                        ? "bg-yellow-400 text-black border-2 border-yellow-400"
                        : "bg-[#262626] text-white border-2 border-[#3a3a3a] hover:border-yellow-400"
                    }`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="px-5 py-3 bg-[#262626] border-2 border-[#3a3a3a] rounded-xl text-white font-semibold hover:border-yellow-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                disabled={page === pages}
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}

      {/* Image Modal */}
      {viewingImage && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-10"
          onClick={() => setViewingImage(null)}
        >
          <img
            src={viewingImage}
            alt="Review"
            className="max-w-full max-h-full rounded-2xl"
          />
          <button
            className="absolute top-5 right-5 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform"
            onClick={() => setViewingImage(null)}
          >
            <X size={24} />
          </button>
        </div>
      )}

      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-[9999] p-4">
          <div className="bg-[#1a1a1a] border-2 border-yellow-400 rounded-2xl p-8 max-w-md w-full animate-[popIn_0.3s_ease]">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              {modalConfig.type === "success" && (
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              {modalConfig.type === "error" && (
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              {modalConfig.type === "confirm" && (
                <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-center text-yellow-400 mb-3 font-mono">
              {modalConfig.title}
            </h3>

            {/* Message */}
            <p className="text-center text-gray-300 mb-6">
              {modalConfig.message}
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              {modalConfig.type === "confirm" ? (
                <>
                  <button
                    className="flex-1 px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 rounded-xl font-semibold hover:bg-yellow-400 hover:text-black transition-all"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 px-6 py-3 bg-red-500 border-2 border-red-500 text-white rounded-xl font-semibold hover:bg-red-600 hover:border-red-600 transition-all"
                    onClick={() => {
                      setShowModal(false);
                      if (modalConfig.onConfirm) modalConfig.onConfirm();
                    }}
                  >
                    Confirm
                  </button>
                </>
              ) : (
                <button
                  className="w-full px-6 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-500 transition-all"
                  onClick={() => setShowModal(false)}
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes popIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}