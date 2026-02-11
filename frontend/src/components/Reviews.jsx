import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Trash2, CheckCircle } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function AdminReviews() {
    const [reviews, setReviews] = useState([]);
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [debouncedKeyword, setDebouncedKeyword] = useState("");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);

    /* ================= Debounce ================= */
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedKeyword(keyword);
        }, 500);
        return () => clearTimeout(timer);
    }, [keyword]);

    /* ================= Fetch Products ================= */
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get("/api/products");
                setProducts(data.products || []);
            } catch {
                toast.error("Failed to load products");
            }
        };
        fetchProducts();
    }, []);

    /* ================= Fetch Reviews ================= */
    const fetchReviews = async () => {
        try {
            setLoading(true);

            const { data } = await api.get(
                `/api/reviews/admin/all?keyword=${debouncedKeyword}&status=${status}&page=${page}`
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

    useEffect(() => {
        fetchReviews();
    }, [debouncedKeyword, status, page]);

    /* ================= Approve ================= */
    const approveHandler = async (id) => {
        try {
            await api.put(`/api/reviews/${id}/approve`);
            toast.success("Review Approved");
            fetchReviews();
        } catch {
            toast.error("Failed to approve review");
        }
    };

    /* ================= Delete ================= */
    const deleteHandler = async (id) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        try {
            await api.delete(`/api/reviews/${id}`);
            toast.success("Review Deleted");
            fetchReviews();
        } catch {
            toast.error("Failed to delete review");
        }
    };

    const chartData =
        analytics?.distribution?.map((count, index) => ({
            rating: `${index + 1}★`,
            count,
        })) || [];

    return (
        <div className="min-h-screen bg-[#1e1e1e] text-white p-10">
            <h2 className="text-2xl font-bold mb-8">Review Analytics</h2>

            {/* ================= Analytics Cards ================= */}
            {analytics && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-[#2b2b2b] border border-yellow-400 p-6 rounded-xl">
                        <p className="text-yellow-400">Total Reviews</p>
                        <h3 className="text-3xl font-bold mt-2">{analytics.total}</h3>
                    </div>

                    <div className="bg-[#2b2b2b] border border-yellow-400 p-6 rounded-xl">
                        <p className="text-yellow-400">Approved</p>
                        <h3 className="text-3xl font-bold mt-2 text-green-400">
                            {analytics.approved}
                        </h3>
                    </div>

                    <div className="bg-[#2b2b2b] border border-yellow-400 p-6 rounded-xl">
                        <p className="text-yellow-400">Pending</p>
                        <h3 className="text-3xl font-bold mt-2 text-yellow-400">
                            {analytics.pending}
                        </h3>
                    </div>

                    <div className="bg-[#2b2b2b] border border-yellow-400 p-6 rounded-xl">
                        <p className="text-yellow-400">Average Rating</p>
                        <h3 className="text-3xl font-bold mt-2">
                            {analytics.average} ⭐
                        </h3>
                    </div>
                </div>
            )}

            {/* ================= Chart ================= */}
            {analytics && (
                <div className="bg-[#2b2b2b] p-6 rounded-xl mb-10">
                    <h4 className="text-yellow-400 mb-6 font-semibold">
                        Rating Distribution
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="rating" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip />
                            <Bar dataKey="count" fill="#facc15" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* ================= Filters ================= */}
            <div className="flex flex-wrap gap-4 mb-8">
                <select
                    value={keyword}
                    onChange={(e) => {
                        setPage(1);
                        setKeyword(e.target.value);
                    }}
                    className="bg-transparent border border-yellow-400 px-4 py-2 rounded-md text-white"
                >
                    <option value="">Select Product</option>
                    {products.map((p) => (
                        <option key={p._id} value={p.name}>
                            {p.name}
                        </option>
                    ))}
                </select>

                <select
                    value={status}
                    onChange={(e) => {
                        setPage(1);
                        setStatus(e.target.value);
                    }}
                    className="bg-transparent border border-yellow-400 px-4 py-2 rounded-md text-white"
                >
                    <option value="all">All</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            {/* ================= Loading ================= */}
            {loading && (
                <div className="text-yellow-400 text-center py-10">
                    Loading reviews...
                </div>
            )}

            {/* ================= Empty ================= */}
            {!loading && reviews.length === 0 && (
                <div className="text-center text-gray-400 py-10">
                    No reviews found.
                </div>
            )}

            {/* ================= Table ================= */}
            {!loading && reviews.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full bg-[#2b2b2b] rounded-xl overflow-hidden">
                        <thead className="bg-[#3a3a2a] text-yellow-400">
                            <tr>
                                <th className="p-4 text-left">Product</th>
                                <th className="p-4 text-left">User</th>
                                <th className="p-4 text-left">Rating</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((r) => (
                                <tr
                                    key={r._id}
                                    className="border-t border-gray-700 hover:bg-[#333]"
                                >
                                    <td className="p-4">{r.product?.name}</td>
                                    <td className="p-4">{r.user?.name}</td>
                                    <td className="p-4">{"★".repeat(r.rating)}</td>
                                    <td className="p-4">
                                        {r.isApproved ? (
                                            <span className="text-green-400 font-semibold">
                                                Approved
                                            </span>
                                        ) : (
                                            <span className="text-yellow-400 font-semibold">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 flex gap-3">
                                        {!r.isApproved && (
                                            <CheckCircle
                                                className="cursor-pointer text-green-400 hover:scale-110 transition"
                                                size={20}
                                                onClick={() => approveHandler(r._id)}
                                            />
                                        )}
                                        <Trash2
                                            className="cursor-pointer text-red-500 hover:scale-110 transition"
                                            size={20}
                                            onClick={() => deleteHandler(r._id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ================= Pagination ================= */}
            {pages > 1 && (
                <div className="flex gap-2 mt-8">
                    {[...Array(pages).keys()].map((x) => (
                        <button
                            key={x + 1}
                            onClick={() => setPage(x + 1)}
                            className={`px-4 py-2 border border-yellow-400 rounded-md ${page === x + 1
                                    ? "bg-yellow-400 text-black font-semibold"
                                    : "text-yellow-400"
                                }`}
                        >
                            {x + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
