import { useEffect, useState } from "react";
import api from "../api/axios";
import { Trash2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/api/reviews/admin/all?keyword=${keyword}&status=${status}&page=${page}`
      );

      setReviews(data.reviews);
      setPages(data.pages);
    } catch (error) {
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [keyword, status, page]);

  const approveHandler = async (id) => {
    try {
      await api.put(`/api/reviews/${id}/approve`);
      toast.success("Review Approved");
      fetchReviews(); // 🔥 auto refresh
    } catch {
      toast.error("Failed to approve");
    }
  };

  const deleteHandler = async (id) => {
    try {
      await api.delete(`/api/reviews/${id}`);
      toast.success("Review Deleted");
      fetchReviews(); // 🔥 auto refresh
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search product..."
          className="border px-3 py-2 rounded w-64"
          value={keyword}
          onChange={(e) => {
            setPage(1);
            setKeyword(e.target.value);
          }}
        />

        <select
          className="border px-3 py-2 rounded"
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Comment</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td className="border p-2">{review.product?.name}</td>
                <td className="border p-2">{review.user?.name}</td>
                <td className="border p-2">{review.rating} ⭐</td>
                <td className="border p-2">{review.comment}</td>
                <td className="border p-2">
                  {review.isApproved ? (
                    <span className="text-green-600 font-semibold">
                      Approved
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">
                      Pending
                    </span>
                  )}
                </td>
                <td className="border p-2 flex gap-2">
                  {!review.isApproved && (
                    <button
                      onClick={() => approveHandler(review._id)}
                      className="text-green-600"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}

                  <button
                    onClick={() => deleteHandler(review._id)}
                    className="text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        {[...Array(pages).keys()].map((x) => (
          <button
            key={x + 1}
            onClick={() => setPage(x + 1)}
            className={`px-3 py-1 border ${
              page === x + 1 ? "bg-black text-white" : ""
            }`}
          >
            {x + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
