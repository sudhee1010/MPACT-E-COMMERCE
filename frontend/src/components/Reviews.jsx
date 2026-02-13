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
import { CheckCircle, XCircle, Trash2 } from "lucide-react";

export default function AdminReviews() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [reviews, setReviews] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= Fetch Products ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/products?limit=1000");
        setProducts(data.products || []);
      } catch {
        toast.error("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  /* ================= Fetch Reviews ================= */
  const fetchReviews = async (productId) => {
    if (!productId) return;

    try {
      setLoading(true);
      const { data } = await api.get(
        `/api/reviews/admin/all?keyword=${productId}`
      );

      setReviews(data.reviews || []);
      setAnalytics(data.analytics || null);
    } catch {
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      fetchReviews(selectedProduct);
    }
  }, [selectedProduct]);

  /* ================= Actions ================= */
  const handleAction = async (type, id) => {
    try {
      if (type === "approve")
        await api.put(`/api/reviews/${id}/approve`);

      if (type === "reject")
        await api.put(`/api/reviews/${id}/reject`);

      if (type === "delete")
        await api.delete(`/api/reviews/${id}`);

      toast.success(`Review ${type}d`);
      fetchReviews(selectedProduct);
    } catch {
      toast.error("Action failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white p-10">
      <h2 className="text-3xl font-bold mb-8 text-yellow-400">
        Product Reviews Management
      </h2>

      {/* ================= Product Selector ================= */}
      <div className="mb-10">
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="bg-[#2b2b2b] border border-yellow-400 px-4 py-3 rounded-lg w-80"
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* ================= Product Analytics ================= */}
      {analytics && (
        <div className="mb-10 bg-[#2b2b2b] p-6 rounded-xl border border-yellow-400">
          <h3 className="text-xl font-semibold mb-4">
            Analytics
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard label="Total Reviews" value={analytics.total} />
            <StatCard label="Approved" value={analytics.approved} />
            <StatCard label="Pending" value={analytics.pending} />
            <StatCard label="Average Rating" value={`${analytics.average} ⭐`} />
          </div>
        </div>
      )}

      {/* ================= Reviews ================= */}
      {loading && <p>Loading reviews...</p>}

      {!loading && selectedProduct && reviews.length === 0 && (
        <p className="text-gray-400">No reviews found for this product.</p>
      )}

      <div className="space-y-6">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-[#2b2b2b] p-6 rounded-xl border border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-lg font-semibold">
                  {r.user?.name}
                </h4>
                <p className="text-yellow-400">
                  {"★".repeat(r.rating)}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  r.isApproved
                    ? "bg-green-600"
                    : "bg-yellow-600"
                }`}
              >
                {r.isApproved ? "Approved" : "Pending"}
              </span>
            </div>

            <p className="text-gray-300 mb-4">
              {r.comment}
            </p>

            <div className="flex gap-4">
              {!r.isApproved && (
                <>
                  <button
                    onClick={() => handleAction("approve", r._id)}
                    className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle size={16} /> Approve
                  </button>

                  <button
                    onClick={() => handleAction("reject", r._id)}
                    className="flex items-center gap-2 bg-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-700"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                </>
              )}

              <button
                onClick={() => handleAction("delete", r._id)}
                className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= Stat Card ================= */
function StatCard({ label, value }) {
  return (
    <div className="bg-[#1f1f1f] p-4 rounded-lg border border-gray-700">
      <p className="text-gray-400 text-sm">{label}</p>
      <h4 className="text-xl font-bold mt-1">{value}</h4>
    </div>
  );
}

