// import React, { useState, useEffect } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import { Plus, Pencil, Trash2, Check, X, ToggleLeft, ToggleRight } from "lucide-react";

// export default function AdminTopOffer() {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newText, setNewText] = useState("");
//   const [newOrder, setNewOrder] = useState(0);
//   const [adding, setAdding] = useState(false);

//   // Inline edit state
//   const [editingId, setEditingId] = useState(null);
//   const [editText, setEditText] = useState("");
//   const [editOrder, setEditOrder] = useState(0);

//   const fetchOffers = async () => {
//     try {
//       const { data } = await api.get("/api/topoffers/admin");
//       setOffers(data);
//     } catch {
//       toast.error("Failed to fetch offers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchOffers(); }, []);

//   const handleAdd = async () => {
//     if (!newText.trim()) return toast.error("Offer text is required");
//     setAdding(true);
//     try {
//       await api.post("/api/topoffers", { text: newText.trim(), order: Number(newOrder) });
//       toast.success("Offer added");
//       setNewText("");
//       setNewOrder(0);
//       fetchOffers();
//     } catch {
//       toast.error("Failed to add offer");
//     } finally {
//       setAdding(false);
//     }
//   };

//   const handleToggleActive = async (offer) => {
//     try {
//       await api.put(`/api/topoffers/${offer._id}`, { isActive: !offer.isActive });
//       toast.success(`Offer ${!offer.isActive ? "activated" : "deactivated"}`);
//       fetchOffers();
//     } catch {
//       toast.error("Failed to update offer");
//     }
//   };

//   const startEdit = (offer) => {
//     setEditingId(offer._id);
//     setEditText(offer.text);
//     setEditOrder(offer.order);
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditText("");
//     setEditOrder(0);
//   };

//   const handleSaveEdit = async (id) => {
//     if (!editText.trim()) return toast.error("Offer text is required");
//     try {
//       await api.put(`/api/topoffers/${id}`, { text: editText.trim(), order: Number(editOrder) });
//       toast.success("Offer updated");
//       cancelEdit();
//       fetchOffers();
//     } catch {
//       toast.error("Failed to update offer");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this offer?")) return;
//     try {
//       await api.delete(`/api/topoffers/${id}`);
//       toast.success("Offer deleted");
//       fetchOffers();
//     } catch {
//       toast.error("Failed to delete offer");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] text-white p-6">
//       <h1 className="text-2xl font-bold text-yellow-400 mb-6">Top Offer Bar Management</h1>
//       <p className="text-gray-400 mb-8 text-sm">
//         Manage the promotional messages displayed in the top carousel bar on your storefront.
//         Only <span className="text-yellow-400 font-semibold">active</span> offers appear to customers.
//       </p>

//       {/* ADD NEW OFFER */}
//       <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6 mb-8">
//         <h2 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center gap-2">
//           <Plus size={20} /> Add New Offer
//         </h2>
//         <div className="flex flex-col md:flex-row gap-3">
//           <input
//             type="text"
//             placeholder='e.g. Get 10% off on all orders 🎉'
//             value={newText}
//             onChange={(e) => setNewText(e.target.value)}
//             onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
//             className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
//           />
//           <input
//             type="number"
//             placeholder="Order (0 = first)"
//             value={newOrder}
//             onChange={(e) => setNewOrder(e.target.value)}
//             className="w-full md:w-36 bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
//           />
//           <button
//             onClick={handleAdd}
//             disabled={adding}
//             className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-black font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
//           >
//             <Plus size={18} />
//             {adding ? "Adding..." : "Add Offer"}
//           </button>
//         </div>
//       </div>

//       {/* OFFERS LIST */}
//       <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl overflow-hidden">
//         <div className="p-4 border-b border-gray-800">
//           <h2 className="text-lg font-semibold text-white">All Offers ({offers.length})</h2>
//         </div>

//         {loading ? (
//           <div className="p-8 text-center text-gray-400">Loading...</div>
//         ) : offers.length === 0 ? (
//           <div className="p-8 text-center text-gray-500">
//             No offers yet. Add your first one above.
//           </div>
//         ) : (
//           <div className="divide-y divide-gray-800">
//             {offers.map((offer) => (
//               <div key={offer._id} className="p-4 flex flex-col md:flex-row md:items-center gap-3">
//                 {editingId === offer._id ? (
//                   /* EDIT MODE */
//                   <>
//                     <input
//                       type="text"
//                       value={editText}
//                       onChange={(e) => setEditText(e.target.value)}
//                       onKeyDown={(e) => { if (e.key === "Enter") handleSaveEdit(offer._id); if (e.key === "Escape") cancelEdit(); }}
//                       className="flex-1 bg-[#1a1a1a] border border-yellow-400 rounded-xl px-4 py-2 text-white focus:outline-none"
//                       autoFocus
//                     />
//                     <input
//                       type="number"
//                       value={editOrder}
//                       onChange={(e) => setEditOrder(e.target.value)}
//                       className="w-24 bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
//                     />
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleSaveEdit(offer._id)}
//                         className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-1"
//                       >
//                         <Check size={16} /> Save
//                       </button>
//                       <button
//                         onClick={cancelEdit}
//                         className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-1"
//                       >
//                         <X size={16} /> Cancel
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   /* VIEW MODE */
//                   <>
//                     <div className="flex-1">
//                       <p className={`text-sm font-medium ${offer.isActive ? "text-white" : "text-gray-500 line-through"}`}>
//                         {offer.text}
//                       </p>
//                       <p className="text-xs text-gray-600 mt-1">Order: {offer.order}</p>
//                     </div>

//                     <span className={`text-xs font-semibold px-3 py-1 rounded-full ${offer.isActive ? "bg-green-900 text-green-400" : "bg-gray-800 text-gray-500"}`}>
//                       {offer.isActive ? "Active" : "Inactive"}
//                     </span>

//                     <div className="flex items-center gap-2">
//                       {/* Toggle active */}
//                       <button
//                         onClick={() => handleToggleActive(offer)}
//                         title={offer.isActive ? "Deactivate" : "Activate"}
//                         className="p-2 rounded-xl hover:bg-gray-800 transition-colors"
//                       >
//                         {offer.isActive
//                           ? <ToggleRight size={22} className="text-yellow-400" />
//                           : <ToggleLeft size={22} className="text-gray-500" />}
//                       </button>

//                       {/* Edit */}
//                       <button
//                         onClick={() => startEdit(offer)}
//                         className="p-2 rounded-xl hover:bg-gray-800 transition-colors text-blue-400"
//                         title="Edit"
//                       >
//                         <Pencil size={18} />
//                       </button>

//                       {/* Delete */}
//                       <button
//                         onClick={() => handleDelete(offer._id)}
//                         className="p-2 rounded-xl hover:bg-gray-800 transition-colors text-red-400"
//                         title="Delete"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <p className="text-xs text-gray-600 mt-4 text-center">
//         Changes take effect immediately on the storefront.
//       </p>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Check, X, ToggleLeft, ToggleRight } from "lucide-react";

export default function AdminTopOffer() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newText, setNewText] = useState("");
  const [newOrder, setNewOrder] = useState(0);
  const [adding, setAdding] = useState(false);

  // Inline edit state
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editOrder, setEditOrder] = useState(0);

  // DELETE MODAL STATE
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchOffers = async () => {
    try {
      const { data } = await api.get("/api/topoffers/admin");
      setOffers(data);
    } catch {
      toast.error("Failed to fetch offers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOffers(); }, []);

  const handleAdd = async () => {
    if (!newText.trim()) return toast.error("Offer text is required");
    setAdding(true);
    try {
      await api.post("/api/topoffers", { text: newText.trim(), order: Number(newOrder) });
      toast.success("Offer added");
      setNewText("");
      setNewOrder(0);
      fetchOffers();
    } catch {
      toast.error("Failed to add offer");
    } finally {
      setAdding(false);
    }
  };

  const handleToggleActive = async (offer) => {
    try {
      await api.put(`/api/topoffers/${offer._id}`, { isActive: !offer.isActive });
      toast.success(`Offer ${!offer.isActive ? "activated" : "deactivated"}`);
      fetchOffers();
    } catch {
      toast.error("Failed to update offer");
    }
  };

  const startEdit = (offer) => {
    setEditingId(offer._id);
    setEditText(offer.text);
    setEditOrder(offer.order);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditOrder(0);
  };

  const handleSaveEdit = async (id) => {
    if (!editText.trim()) return toast.error("Offer text is required");
    try {
      await api.put(`/api/topoffers/${id}`, { text: editText.trim(), order: Number(editOrder) });
      toast.success("Offer updated");
      cancelEdit();
      fetchOffers();
    } catch {
      toast.error("Failed to update offer");
    }
  };

  // OPEN DELETE MODAL
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // CONFIRM DELETE
  const confirmDelete = async () => {
    try {
      await api.delete(`/api/topoffers/${deleteId}`);
      toast.success("Offer deleted successfully");
      setShowDeleteModal(false);
      fetchOffers();
    } catch {
      toast.error("Failed to delete offer");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] text-white p-6">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">Top Offer Bar Management</h1>

      {/* ADD NEW OFFER */}
      <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center gap-2">
          <Plus size={20} /> Add New Offer
        </h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder='e.g. Get 10% off on all orders 🎉'
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
            className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
          />
          <input
            type="number"
            placeholder="Order (0 = first)"
            value={newOrder}
            onChange={(e) => setNewOrder(e.target.value)}
            className="w-full md:w-36 bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
          />
          <button
            onClick={handleAdd}
            disabled={adding}
            className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-black font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={18} />
            {adding ? "Adding..." : "Add Offer"}
          </button>
        </div>
      </div>

      {/* OFFERS LIST */}
      <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">All Offers ({offers.length})</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : offers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No offers yet. Add your first one above.
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {offers.map((offer) => (
              <div key={offer._id} className="p-4 flex flex-col md:flex-row md:items-center gap-3">
                {editingId === offer._id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleSaveEdit(offer._id); if (e.key === "Escape") cancelEdit(); }}
                      className="flex-1 bg-[#1a1a1a] border border-yellow-400 rounded-xl px-4 py-2 text-white focus:outline-none"
                      autoFocus
                    />
                    <input
                      type="number"
                      value={editOrder}
                      onChange={(e) => setEditOrder(e.target.value)}
                      className="w-24 bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(offer._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-1"
                      >
                        <Check size={16} /> Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl transition-colors flex items-center gap-1"
                      >
                        <X size={16} /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${offer.isActive ? "text-white" : "text-gray-500 line-through"}`}>
                        {offer.text}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Order: {offer.order}</p>
                    </div>

                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${offer.isActive ? "bg-green-900 text-green-400" : "bg-gray-800 text-gray-500"}`}>
                      {offer.isActive ? "Active" : "Inactive"}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleActive(offer)}
                        className="p-2 rounded-xl hover:bg-gray-800 transition-colors"
                      >
                        {offer.isActive
                          ? <ToggleRight size={22} className="text-yellow-400" />
                          : <ToggleLeft size={22} className="text-gray-500" />}
                      </button>

                      <button
                        onClick={() => startEdit(offer)}
                        className="p-2 rounded-xl hover:bg-gray-800 transition-colors text-blue-400"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDeleteClick(offer._id)}
                        className="p-2 rounded-xl hover:bg-gray-800 transition-colors text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DELETE CONFIRM MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 w-[350px] text-center">
            <h2 className="text-lg font-semibold text-white mb-3">Delete Offer</h2>
            <p className="text-gray-400 mb-6">Are you sure you want to delete this offer?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}