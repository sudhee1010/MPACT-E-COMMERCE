import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Copy } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

export function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // const [applyType, setApplyType] = useState("all");
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    maxRedemptions: "",
    expiryDate: "",
    isActive: true
  });

  /* ================= FETCH ================= */
  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/coupons");
      setCoupons(data);
    } catch {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/api/products?limit=1000");

      // 🔒 SAFETY: never show deleted products
      const activeProducts = (data.products || []).filter(
        (p) => p.isActive !== false
      );

      setProducts(activeProducts);
    } catch {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchCoupons();
    fetchProducts();
  }, []);

  /* ================= CREATE / UPDATE ================= */
  const submitCoupon = async () => {
    try {
      const payload = {
        ...form,
        code: form.code.toUpperCase(),
        maxRedemptions: Number(form.maxRedemptions),
        applicableProducts:
          selectedProducts.length > 0
            ? selectedProducts.map((id) => ({
              product: id,
              usageLimit: 999999
            }))
            : []
      };

      if (editing) {
        await api.put(`/api/coupons/${editing._id}`, payload);
        toast.success("Coupon updated successfully");
      } else {
        await api.post("/api/coupons", payload);
        toast.success("Coupon created successfully");
      }

      reset();
      fetchCoupons();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  /* ================= DELETE ================= */
  const requestDelete = (coupon) => {
    setCouponToDelete(coupon);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`/api/coupons/${couponToDelete._id}`);
      toast.success("Coupon deleted successfully");
      fetchCoupons();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
      setCouponToDelete(null);
    }
  };

  /* ================= HELPERS ================= */
  const reset = () => {
    setOpen(false);
    setEditing(null);
    // setApplyType("all");
    setSelectedProducts([]);
    setForm({
      code: "",
      discountType: "percentage",
      discountValue: "",
      maxRedemptions: "",
      expiryDate: "",
      isActive: true
    });
  };

  const isExpired = (date) => new Date(date) < new Date();

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon copied");
  };

  const toggleRow = (id) => {
  setExpandedRows((prev) => ({
    ...prev,
    [id]: !prev[id]
  }));
};

  /* ================= UI ================= */
  return (
    <div className="p-6 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-wide">Coupons</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
        >
          <Plus size={18} /> Create Coupon
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#1f1f1f] rounded-lg overflow-x-auto border border-yellow-400/20">
        <table className="w-full">
          <thead className="bg-[#111]">
            <tr className="text-sm text-gray-400">
              <th className="p-3 text-left">Code</th>
              <th>Discount</th>
              <th>Usage</th>
              <th>Products</th>
              <th>Expiry</th>
              <th>Status</th>
              <th className="text-right pr-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((c) => (
              <tr
                key={c._id}
                className="border-b border-gray-800 hover:bg-gray-800/40 transition"
              >
                <td className="p-3 flex items-center gap-2 font-mono text-yellow-400">
                  {c.code}
                  <Copy
                    size={14}
                    onClick={() => copyCode(c.code)}
                    className="cursor-pointer opacity-70 hover:opacity-100"
                  />
                </td>

                <td>
                  {c.discountType === "percentage"
                    ? `${c.discountValue}%`
                    : `₹${c.discountValue}`}
                </td>

                <td>
                  {c.usedCount}/{c.maxRedemptions || "∞"}
                  <div className="w-24 bg-gray-700 h-2 rounded mt-1">
                    <div
                      className="bg-yellow-400 h-2 rounded"
                      style={{
                        width: c.maxRedemptions
                          ? `${(c.usedCount / c.maxRedemptions) * 100}%`
                          : "100%"
                      }}
                    />
                  </div>
                </td>

                <td className="text-sm text-gray-400 max-w-[260px] align-top">
                  {c.applicableProducts?.length ? (
                    <div>
                      <button
                        onClick={() => toggleRow(c._id)}
                        className="text-yellow-400 text-xs font-medium flex items-center gap-1 hover:underline"
                      >
                        {c.applicableProducts.length} Products
                        <span className="text-[10px]">
                          {expandedRows[c._id] ? "▲" : "▼"}
                        </span>
                      </button>

                      {expandedRows[c._id] && (
                        <div className="mt-2 max-h-28 overflow-y-auto pr-2 border-l border-yellow-400/30 pl-2">
                          {c.applicableProducts.map((p, index) => (
                            <div
                              key={index}
                              className="text-xs py-1 border-b border-gray-800 last:border-none"
                            >
                              • {p.product?.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500 italic">All Products</span>
                  )}
                </td>

                <td className="text-sm">
                  {new Date(c.expiryDate).toLocaleDateString()}
                </td>

                <td>
                  {isExpired(c.expiryDate) ? (
                    <span className="text-red-400 font-medium">Expired</span>
                  ) : (
                    <span className="text-green-400 font-medium">Active</span>
                  )}
                </td>

                <td className="flex justify-end gap-3 p-3">
                  <Edit
                    size={18}
                    className="text-yellow-400 cursor-pointer hover:scale-110 transition"
                    onClick={() => {
                      setEditing(c);

                      if (c.applicableProducts?.length) {
                        setSelectedProducts(
                          c.applicableProducts.map((p) => p.product?._id)
                        );
                      } else {
                        setSelectedProducts([]);
                      }
                      setForm({
                        code: c.code,
                        discountType: c.discountType,
                        discountValue: c.discountValue,
                        maxRedemptions: c.maxRedemptions,
                        expiryDate: c.expiryDate.split("T")[0],
                        isActive: c.isActive
                      });

                      setOpen(true);
                    }}
                  />

                  <Trash2
                    size={18}
                    className="text-red-400 cursor-pointer hover:scale-110 transition"
                    onClick={() => requestDelete(c)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && (
        <p className="mt-4 text-gray-400 text-sm">Loading coupons…</p>
      )}

      {/* CREATE / EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1f1f1f] w-full max-w-lg mx-4 rounded-xl overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold">
                {editing ? "Edit Coupon" : "Create Coupon"}
              </h2>
            </div>

            <div className="px-6 py-4 max-h-[70vh] overflow-y-auto space-y-3">
              <input
                placeholder="Coupon Code"
                value={form.code}
                onChange={(e) =>
                  setForm({ ...form, code: e.target.value })
                }
                className="w-full p-2 bg-black border rounded"
              />

              <select
                value={form.discountType}
                onChange={(e) =>
                  setForm({ ...form, discountType: e.target.value })
                }
                className="w-full p-2 bg-black border rounded"
              >
                <option value="percentage">Percentage</option>
                <option value="flat">Flat</option>
              </select>

              <input
                type="number"
                placeholder="Discount Value"
                value={form.discountValue}
                onChange={(e) =>
                  setForm({ ...form, discountValue: e.target.value })
                }
                className="w-full p-2 bg-black border rounded"
              />

              <input
                type="number"
                placeholder="Usage Limit (0 = unlimited)"
                value={form.maxRedemptions}
                onChange={(e) =>
                  setForm({ ...form, maxRedemptions: e.target.value })
                }
                className="w-full p-2 bg-black border rounded"
              />

              <input
                type="date"
                value={form.expiryDate}
                onChange={(e) =>
                  setForm({ ...form, expiryDate: e.target.value })
                }
                className="w-full p-2 bg-black border rounded"
              />

              {/* <div>
                <label className="text-sm text-gray-300">
                  Apply Coupon To
                </label>
                <select
                  value={applyType}
                  onChange={(e) => {
                    setApplyType(e.target.value);
                    setSelectedProducts([]);
                  }}
                  className="w-full p-2 bg-black border rounded mt-1"
                >
                  <option value="all">All Products</option>
                  <option value="multiple">Specific Products</option>
                </select>
              </div>

              {applyType === "multiple" && (
                <select
                  multiple
                  value={selectedProducts}
                  onChange={(e) =>
                    setSelectedProducts(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                  className="w-full p-2 bg-black border rounded h-40"
                >
                  <option value="">Select product</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              )} */}

              <div>
                <label className="text-sm text-gray-300">
                  Select Products (Leave empty for ALL products)
                </label>

                <select
                  multiple
                  value={selectedProducts}
                  onChange={(e) =>
                    setSelectedProducts(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                  className="w-full p-2 bg-black border rounded mt-1 h-40"
                >
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <p className="text-xs text-gray-400 mt-1">
                  Hold Ctrl (Windows) or Cmd (Mac) to select multiple products
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={submitCoupon}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded font-medium w-full"
                >
                  {editing ? "Update Coupon" : "Create Coupon"}
                </button>

                <button
                  onClick={reset}
                  className="border py-2 rounded w-full hover:bg-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1f1f1f] rounded-xl w-full max-w-sm mx-4 p-6 shadow-2xl">
            <h3 className="text-lg font-semibold mb-2">
              Delete Coupon
            </h3>

            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete{" "}
              <span className="text-yellow-400 font-mono">
                {couponToDelete?.code}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 rounded border hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-black disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
