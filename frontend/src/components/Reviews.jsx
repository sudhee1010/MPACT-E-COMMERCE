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

import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  CheckCircle,
  XCircle,
  Trash2,
  Search,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
  const [statusFilter, setStatusFilter] = useState("all");
  const [reviews, setReviews] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [viewingImage, setViewingImage] = useState(null);

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
  }, [selectedProduct, statusFilter, page]);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/api/products?limit=1000");
      setProducts(data.products || []);
    } catch {
      toast.error("Failed to load products");
    }
  };

  const fetchAllReviews = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/api/reviews/admin/all?status=${statusFilter}&page=${page}&limit=10`
      );

      setReviews(data.reviews || []);
      setPages(data.pages || 1);
      setAnalytics(data.analytics || null);
    } catch {
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewsByProduct = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/api/reviews/admin/product?keyword=${selectedProduct}&status=${statusFilter}&page=${page}&limit=10`
      );

      setReviews(data.reviews || []);
      setPages(data.pages || 1);
      setAnalytics(data.analytics || null);
    } catch {
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (type, id) => {
    const confirmMessages = {
      approve: "Are you sure you want to approve this review?",
      reject: "Are you sure you want to reject this review?",
      delete:
        "Are you sure you want to delete this review? This cannot be undone.",
    };

    if (!window.confirm(confirmMessages[type])) return;

    try {
      if (type === "approve") {
        await api.put(`/api/reviews/${id}/approve`);
        toast.success("Review approved");
      } else if (type === "reject") {
        await api.put(`/api/reviews/${id}/reject`);
        toast.success("Review rejected");
      } else if (type === "delete") {
        await api.delete(`/api/reviews/${id}`);
        toast.success("Review deleted");
      }

      if (selectedProduct) {
        fetchReviewsByProduct();
      } else {
        fetchAllReviews();
      }
    } catch {
      toast.error("Action failed");
    }
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
          Manage and moderate customer reviews across all products
        </p>
      </div>

      {/* Analytics Section */}
      {analytics && (
        <div className="mb-10">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {/* Total Reviews */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#262626] border-2 border-yellow-400 rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/30">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                Total Reviews
              </p>
              <h3 className="text-5xl font-bold text-yellow-400 font-mono">
                {analytics.total}
              </h3>
            </div>

            {/* Approved */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#262626] border-2 border-yellow-400 rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/30">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                Approved
              </p>
              <h3 className="text-5xl font-bold text-green-400 font-mono">
                {analytics.approved}
              </h3>
            </div>

            {/* Pending */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#262626] border-2 border-yellow-400 rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/30">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                Pending
              </p>
              <h3 className="text-5xl font-bold text-orange-400 font-mono">
                {analytics.pending}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
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

          {/* Status Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs uppercase tracking-wider">
              Status Filter
            </label>
            <select
              className="w-full px-4 py-3 bg-[#262626] border-2 border-[#3a3a3a] rounded-xl text-white cursor-pointer focus:outline-none focus:border-yellow-400 transition-colors"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">All Reviews</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Clear Filters */}
          {(selectedProduct || statusFilter !== "all") && (
            <button
              className="px-6 py-3 bg-[#262626] border-2 border-red-500 rounded-xl text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all"
              onClick={() => {
                setSelectedProduct("");
                setStatusFilter("all");
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

                  {/* Status & Rating */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold uppercase ${
                        review.isApproved
                          ? "bg-green-500 text-black"
                          : "bg-orange-500 text-black"
                      }`}
                    >
                      {review.isApproved ? "Approved" : "Pending"}
                    </span>
                    <div className="text-yellow-400 text-xl">
                      {"★".repeat(review.rating)}
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
                  {!review.isApproved && (
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-600 transition-all"
                      onClick={() => handleAction("approve", review._id)}
                    >
                      <CheckCircle size={18} />
                      Approve
                    </button>
                  )}

                  {review.isApproved && (
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-black font-semibold rounded-xl hover:bg-orange-600 transition-all"
                      onClick={() => handleAction("reject", review._id)}
                    >
                      <XCircle size={18} />
                      Reject
                    </button>
                  )}

                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
                    onClick={() => handleAction("delete", review._id)}
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                className="px-5 py-3 bg-[#262626] border-2 border-[#3a3a3a] rounded-xl text-white font-semibold hover:border-yellow-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                    page === p
                      ? "bg-yellow-400 text-black border-2 border-yellow-400"
                      : "bg-[#262626] text-white border-2 border-[#3a3a3a] hover:border-yellow-400"
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}

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
    </div>
  );
}