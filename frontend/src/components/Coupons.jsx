// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, Percent, Copy } from 'lucide-react';
// import { Button } from '../components/ui/Button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
// import { Label } from '../components/ui/Label';
// import { Input } from '../components/ui/Input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';

// const initialCoupons = [
//   { id: 'CPN001', code: 'SUMMER50', discount: 50, type: 'Percentage', usageLimit: 100, used: 45, expiryDate: '2026-08-31', status: 'Active' },
//   { id: 'CPN002', code: 'WELCOME10', discount: 10, type: 'Fixed', usageLimit: 500, used: 234, expiryDate: '2026-12-31', status: 'Active' },
//   { id: 'CPN003', code: 'FLASH25', discount: 25, type: 'Percentage', usageLimit: 50, used: 50, expiryDate: '2025-12-31', status: 'Expired' },
//   { id: 'CPN004', code: 'NEWYEAR2026', discount: 30, type: 'Percentage', usageLimit: 200, used: 87, expiryDate: '2026-01-31', status: 'Active' },
// ];

// export function Coupons() {
//   const [coupons, setCoupons] = useState(initialCoupons);
//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [editingCoupon, setEditingCoupon] = useState(null);
//   const [formData, setFormData] = useState({
//     code: '',
//     discount: '',
//     type: 'Percentage',
//     usageLimit: '',
//     expiryDate: '',
//   });

//   const handleAdd = () => {
//     const newCoupon = {
//       id: `CPN${String(coupons.length + 1).padStart(3, '0')}`,
//       code: formData.code,
//       discount: parseFloat(formData.discount),
//       type: formData.type,
//       usageLimit: parseInt(formData.usageLimit),
//       used: 0,
//       expiryDate: formData.expiryDate,
//       status: 'Active',
//     };
//     setCoupons([...coupons, newCoupon]);
//     resetForm();
//     setIsAddOpen(false);
//   };

//   const handleEdit = () => {
//     if (!editingCoupon) return;
//     setCoupons(coupons.map(c => c.id === editingCoupon.id ? {
//       ...c,
//       code: formData.code,
//       discount: parseFloat(formData.discount),
//       type: formData.type,
//       usageLimit: parseInt(formData.usageLimit),
//       expiryDate: formData.expiryDate,
//     } : c));
//     resetForm();
//     setEditingCoupon(null);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this coupon?')) {
//       setCoupons(coupons.filter(c => c.id !== id));
//     }
//   };

//   const resetForm = () => {
//     setFormData({ code: '', discount: '', type: 'Percentage', usageLimit: '', expiryDate: '' });
//   };

//   const openEditDialog = (coupon) => {
//     setEditingCoupon(coupon);
//     setFormData({
//       code: coupon.code,
//       discount: String(coupon.discount),
//       type: coupon.type,
//       usageLimit: String(coupon.usageLimit),
//       expiryDate: coupon.expiryDate,
//     });
//   };

//   const copyCouponCode = (code) => {
//     navigator.clipboard.writeText(code);
//     alert(`Coupon code "${code}" copied to clipboard!`);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-white">Discount Coupons</h2>
//         <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
//           <DialogTrigger asChild>
//             <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
//               <Plus size={20} className="mr-2" />
//               Create Coupon
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md">
//             <DialogHeader>
//               <DialogTitle className="text-white">Create New Coupon</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4 py-4">
//               <div>
//                 <Label className="text-gray-300">Coupon Code</Label>
//                 <Input
//                   value={formData.code}
//                   onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
//                   placeholder="e.g., SUMMER50"
//                   className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label className="text-gray-300">Discount</Label>
//                   <Input
//                     type="number"
//                     value={formData.discount}
//                     onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
//                     placeholder="0"
//                     className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
//                   />
//                 </div>
//                 <div>
//                   <Label className="text-gray-300">Type</Label>
//                   <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
//                     <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent className="bg-[#2a2a2a] border-gray-700">
//                       <SelectItem value="Percentage" className="text-white">Percentage</SelectItem>
//                       <SelectItem value="Fixed" className="text-white">Fixed</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div>
//                 <Label className="text-gray-300">Usage Limit</Label>
//                 <Input
//                   type="number"
//                   value={formData.usageLimit}
//                   onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
//                   placeholder="100"
//                   className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
//                 />
//               </div>
//               <div>
//                 <Label className="text-gray-300">Expiry Date</Label>
//                 <Input
//                   type="date"
//                   value={formData.expiryDate}
//                   onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
//                   className="bg-[#1a1a1a] border-gray-700 text-white"
//                 />
//               </div>
//               <Button onClick={handleAdd} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
//                 Create Coupon
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>

//         <Dialog open={!!editingCoupon} onOpenChange={(open) => !open && setEditingCoupon(null)}>
//           <DialogContent className="bg-[#2a2a2a] border-gray-700 text-white max-w-md">
//             <DialogHeader>
//               <DialogTitle className="text-white">Edit Coupon</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4 py-4">
//               <div>
//                 <Label className="text-gray-300">Coupon Code</Label>
//                 <Input
//                   value={formData.code}
//                   onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
//                   placeholder="e.g., SUMMER50"
//                   className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label className="text-gray-300">Discount</Label>
//                   <Input
//                     type="number"
//                     value={formData.discount}
//                     onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
//                     placeholder="0"
//                     className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
//                   />
//                 </div>
//                 <div>
//                   <Label className="text-gray-300">Type</Label>
//                   <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
//                     <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent className="bg-[#2a2a2a] border-gray-700">
//                       <SelectItem value="Percentage" className="text-white">Percentage</SelectItem>
//                       <SelectItem value="Fixed" className="text-white">Fixed</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div>
//                 <Label className="text-gray-300">Usage Limit</Label>
//                 <Input
//                   type="number"
//                   value={formData.usageLimit}
//                   onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
//                   placeholder="100"
//                   className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
//                 />
//               </div>
//               <div>
//                 <Label className="text-gray-300">Expiry Date</Label>
//                 <Input
//                   type="date"
//                   value={formData.expiryDate}
//                   onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
//                   className="bg-[#1a1a1a] border-gray-700 text-white"
//                 />
//               </div>
//               <Button onClick={handleEdit} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
//                 Update Coupon
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-[#1a1a1a] border-b border-gray-700">
//               <tr>
//                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Code</th>
//                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Discount</th>
//                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Usage</th>
//                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Expiry Date</th>
//                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
//                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {coupons.map((coupon) => (
//                 <tr key={coupon.id} className="border-b border-gray-800 hover:bg-gray-800/50">
//                   <td className="py-3 px-4">
//                     <div className="flex items-center gap-2">
//                       <span className="font-mono font-semibold text-yellow-400">{coupon.code}</span>
//                       <button
//                         onClick={() => copyCouponCode(coupon.code)}
//                         className="p-1 text-gray-400 hover:text-yellow-400 transition-colors"
//                       >
//                         <Copy size={14} />
//                       </button>
//                     </div>
//                   </td>
//                   <td className="py-3 px-4">
//                     <span className="text-white font-medium">
//                       {coupon.type === 'Percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
//                     </span>
//                     <span className="text-xs text-gray-400 ml-1">{coupon.type}</span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex items-center gap-2">
//                       <span className="text-white">{coupon.used}/{coupon.usageLimit}</span>
//                       <div className="w-20 bg-gray-700 rounded-full h-2">
//                         <div
//                           className="bg-yellow-400 h-2 rounded-full"
//                           style={{ width: `${(coupon.used / coupon.usageLimit) * 100}%` }}
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-3 px-4 text-sm text-gray-400">{coupon.expiryDate}</td>
//                   <td className="py-3 px-4">
//                     <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
//                       coupon.status === 'Active'
//                         ? 'bg-green-900/50 text-green-400 border border-green-700'
//                         : coupon.status === 'Expired'
//                         ? 'bg-red-900/50 text-red-400 border border-red-700'
//                         : 'bg-gray-900/50 text-gray-400 border border-gray-700'
//                     }`}>
//                       {coupon.status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => openEditDialog(coupon)}
//                         className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-md transition-colors"
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(coupon.id)}
//                         className="p-2 text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }














// import React, { useEffect, useState } from "react";
// import { Plus, Edit, Trash2, Copy } from "lucide-react";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// export function Coupons() {
//   const [coupons, setCoupons] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [applyType, setApplyType] = useState("all"); // all | single
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [couponToDelete, setCouponToDelete] = useState(null);

//   const [form, setForm] = useState({
//     code: "",
//     discountType: "percentage",
//     discountValue: "",
//     maxRedemptions: "",
//     expiryDate: "",
//     isActive: true
//   });

//   /* ================= FETCH ================= */
//   const fetchCoupons = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get("/api/coupons");
//       setCoupons(data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load coupons");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const fetchProducts = async () => {
//     try {
//       const { data } = await api.get("/api/products?limit=1000");
//       setProducts(data.products); // ✅ IMPORTANT
//     } catch (err) {
//       console.error("Failed to fetch products", err);
//     }
//   };


//   useEffect(() => {
//     fetchCoupons();
//     fetchProducts(); // ✅ ADD THIS

//   }, []);

//   /* ================= CREATE / UPDATE ================= */
//   const submitCoupon = async () => {
//     try {
//       const payload = {
//         ...form,
//         code: form.code.toUpperCase(),
//         maxRedemptions: Number(form.maxRedemptions),
//         applicableProducts:
//           applyType === "single" && selectedProduct
//             ? [{ product: selectedProduct, usageLimit: 999999 }]
//             : []
//       };


//       if (editing) {
//         await api.put(`/api/coupons/${editing._id}`, payload);
//         toast.success("Coupon updated successfully");
//       } else {
//         await api.post("/api/coupons", payload);
//         toast.success("Coupon created successfully");
//       }


//       reset();
//       fetchCoupons();
//     } catch (err) {
//       alert(err.response?.data?.message || "Action failed");
//     }
//   };

//   const requestDelete = (coupon) => {
//     setCouponToDelete(coupon);
//     setConfirmOpen(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await api.delete(`/api/coupons/${couponToDelete._id}`);
//       toast.success("Coupon deleted successfully");
//       fetchCoupons();

//     } catch (err) {
//       alert("Delete failed");
//     } finally {
//       setConfirmOpen(false);
//       setCouponToDelete(null);
//     }
//   };

//   /* ================= HELPERS ================= */
//   const reset = () => {
//     setOpen(false);
//     setEditing(null);
//     setApplyType("all");        // ✅ ADD
//     setSelectedProduct("");
//     setForm({
//       code: "",
//       discountType: "percentage",
//       discountValue: "",
//       maxRedemptions: "",
//       expiryDate: "",
//       isActive: true
//     });
//   };

//   const isExpired = (date) => new Date(date) < new Date();

//   const copyCode = (code) => {
//     navigator.clipboard.writeText(code);
//     alert("Coupon copied!");
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="p-6 text-white">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">Coupons</h1>

//         <button
//           onClick={() => setOpen(true)}
//           className="bg-yellow-400 text-black px-4 py-2 rounded flex items-center gap-2"
//         >
//           <Plus size={18} /> Create Coupon
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto bg-[#1f1f1f] rounded">
//         <table className="w-full">
//           <thead className="bg-[#111]">
//             <tr>
//               <th className="p-3 text-left">Code</th>
//               <th>Discount</th>
//               <th>Usage</th>
//               <th>Products</th>
//               <th>Expiry</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {coupons.map((c) => (
//               <tr key={c._id} className="border-b border-gray-800">
//                 <td className="p-3 flex items-center gap-2 font-mono text-yellow-400">
//                   {c.code}
//                   <Copy
//                     size={14}
//                     onClick={() => copyCode(c.code)}
//                     className="cursor-pointer"
//                   />
//                 </td>

//                 <td>
//                   {c.discountType === "percentage"
//                     ? `${c.discountValue}%`
//                     : `₹${c.discountValue}`}
//                 </td>

//                 <td>
//                   {c.usedCount}/{c.maxRedemptions || "∞"}
//                   <div className="w-24 bg-gray-700 h-2 rounded mt-1">
//                     <div
//                       className="bg-yellow-400 h-2 rounded"
//                       style={{
//                         width: c.maxRedemptions
//                           ? `${(c.usedCount / c.maxRedemptions) * 100}%`
//                           : "100%"
//                       }}
//                     />
//                   </div>
//                 </td>

//                 <td className="text-sm text-gray-400 max-w-[200px]">
//                   {c.applicableProducts?.length
//                     ? c.applicableProducts
//                       .map((p) => p.product?.name)
//                       .join(", ")
//                     : "All Products"}
//                 </td>

//                 <td className="text-sm">
//                   {new Date(c.expiryDate).toLocaleDateString()}
//                 </td>

//                 <td>
//                   {isExpired(c.expiryDate) ? (
//                     <span className="text-red-400">Expired</span>
//                   ) : (
//                     <span className="text-green-400">Active</span>
//                   )}
//                 </td>

//                 <td className="flex gap-2 p-2">
//                   <Edit
//                     size={18}
//                     className="text-yellow-400 cursor-pointer"
//                     onClick={() => {
//                       setEditing(c);
//                       setForm({
//                         code: c.code,
//                         discountType: c.discountType,
//                         discountValue: c.discountValue,
//                         maxRedemptions: c.maxRedemptions,
//                         expiryDate: c.expiryDate.split("T")[0],
//                         isActive: c.isActive
//                       });
//                       setOpen(true);
//                     }}
//                   />

//                   {/* <Trash2
//                     size={18}
//                     className="text-red-400 cursor-pointer"
//                     onClick={() => deleteCoupon(c._id)}
//                   /> */}
//                   <Trash2
//                     onClick={() => requestDelete(c)}
//                     className="text-red-400 cursor-pointer"
//                   />

//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {loading && <p className="mt-4 text-gray-400">Loading…</p>}

//       {/* MODAL */}
//       {open && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-[#1f1f1f] w-full max-w-lg mx-4 rounded overflow-hidden">

//             {/* 🔒 HEADER (NON-SCROLLABLE) */}
//             <div className="px-6 py-4 border-b border-gray-700">
//               <h2 className="text-xl font-semibold text-white">
//                 {editing ? "Edit Coupon" : "Create Coupon"}
//               </h2>
//             </div>

//             {/* 📜 BODY (SCROLLABLE) */}
//             <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">

//               {/* ⬇️ MOVE **ALL YOUR INPUTS, SELECTS & BUTTONS HERE** ⬇️ */}

//               <input
//                 placeholder="Coupon Code"
//                 value={form.code}
//                 onChange={(e) => setForm({ ...form, code: e.target.value })}
//                 className="w-full mb-3 p-2 bg-black border"
//               />

//               <select
//                 value={form.discountType}
//                 onChange={(e) =>
//                   setForm({ ...form, discountType: e.target.value })
//                 }
//                 className="w-full mb-3 p-2 bg-black border"
//               >
//                 <option value="percentage">Percentage</option>
//                 <option value="flat">Flat</option>
//               </select>

//               <input
//                 type="number"
//                 placeholder="Discount Value"
//                 value={form.discountValue}
//                 onChange={(e) =>
//                   setForm({ ...form, discountValue: e.target.value })
//                 }
//                 className="w-full mb-3 p-2 bg-black border"
//               />

//               <input
//                 type="number"
//                 placeholder="Usage Limit (0 = unlimited)"
//                 value={form.maxRedemptions}
//                 onChange={(e) =>
//                   setForm({ ...form, maxRedemptions: e.target.value })
//                 }
//                 className="w-full mb-3 p-2 bg-black border"
//               />

//               <input
//                 type="date"
//                 value={form.expiryDate}
//                 onChange={(e) =>
//                   setForm({ ...form, expiryDate: e.target.value })
//                 }
//                 className="w-full mb-4 p-2 bg-black border"
//               />

//               <div className="mb-4">
//                 <label className="block text-sm mb-1 text-gray-300">
//                   Apply Coupon To
//                 </label>

//                 <select
//                   value={applyType}
//                   onChange={(e) => {
//                     setApplyType(e.target.value);
//                     setSelectedProduct("");
//                   }}
//                   className="w-full bg-black border border-gray-700 p-2 rounded"
//                 >
//                   <option value="all">All Products</option>
//                   <option value="single">One Specific Product</option>
//                 </select>
//               </div>

//               {applyType === "single" && (
//                 <div className="mb-4">
//                   <label className="block text-sm mb-1 text-gray-300">
//                     Select Product
//                   </label>

//                   <select
//                     value={selectedProduct}
//                     onChange={(e) => setSelectedProduct(e.target.value)}
//                     className="w-full bg-black border border-gray-700 p-2 rounded"
//                   >
//                     <option value="">Select a product</option>
//                     {products.map((p) => (
//                       <option key={p._id} value={p._id}>
//                         {p.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   onClick={submitCoupon}
//                   className="bg-yellow-400 text-black px-4 py-2 rounded w-full"
//                 >
//                   {editing ? "Update" : "Create"}
//                 </button>

//                 <button
//                   onClick={reset}
//                   className="border px-4 py-2 rounded w-full"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {confirmOpen && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-[#1f1f1f] rounded-lg w-full max-w-sm mx-4 p-6 shadow-xl">

//             <h3 className="text-lg font-semibold text-white mb-2">
//               Delete Coupon
//             </h3>

//             <p className="text-sm text-gray-400 mb-6">
//               Are you sure you want to delete
//               <span className="text-yellow-400 font-mono ml-1">
//                 {couponToDelete?.code}
//               </span>
//               ?
//             </p>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setConfirmOpen(false)}
//                 className="px-4 py-2 rounded border border-gray-600 text-gray-300 hover:bg-gray-800"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 rounded bg-red-500 text-black hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }



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

  const [applyType, setApplyType] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("");

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
          applyType === "single" && selectedProduct
            ? [{ product: selectedProduct, usageLimit: 999999 }]
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
    setApplyType("all");
    setSelectedProduct("");
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

                <td className="text-sm text-gray-400 max-w-[200px] truncate">
                  {c.applicableProducts?.length
                    ? c.applicableProducts
                        .map((p) => p.product?.name)
                        .join(", ")
                    : "All Products"}
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
                        setApplyType("single");
                        setSelectedProduct(
                          c.applicableProducts[0].product?._id
                        );
                      } else {
                        setApplyType("all");
                        setSelectedProduct("");
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

              <div>
                <label className="text-sm text-gray-300">
                  Apply Coupon To
                </label>
                <select
                  value={applyType}
                  onChange={(e) => {
                    setApplyType(e.target.value);
                    setSelectedProduct("");
                  }}
                  className="w-full p-2 bg-black border rounded mt-1"
                >
                  <option value="all">All Products</option>
                  <option value="single">One Specific Product</option>
                </select>
              </div>

              {applyType === "single" && (
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full p-2 bg-black border rounded"
                >
                  <option value="">Select product</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              )}

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
