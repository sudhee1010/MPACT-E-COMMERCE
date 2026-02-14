// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import {
//   Upload,
//   X,
//   Image as ImageIcon,
//   Trash2,
//   Smartphone,
//   Monitor,
// } from "lucide-react";
// import { Button } from "../components/ui/Button";
// import { Input } from "../components/ui/Input";
// import { Textarea } from "../components/ui/Textarea";

// export function AdsBanner() {
//   const [title, setTitle] = useState("");
//   const [subtitle, setSubtitle] = useState("");
//   const [imageFile, setImageFile] = useState(null); // NEW IMAGE ONLY
//   const [preview, setPreview] = useState(""); // existing or new image
//   const [saving, setSaving] = useState(false);
//   const [view, setView] = useState("desktop"); // desktop | mobile
//   const [loading, setLoading] = useState(true);

//   // 🔹 Load existing banner
//   useEffect(() => {
//     const fetchBanner = async () => {
//       try {
//         const res = await api.get("/api/banners");
//         if (res.data) {
//           setTitle(res.data.title || "");
//           setSubtitle(res.data.subtitle || "");
//           setPreview(res.data.image?.url || "");
//         }
//       } catch (err) {
//         toast.error("Failed to load banner");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBanner();
//   }, []);

//   // 🔹 Image select
//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setImageFile(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   // 🔹 Save / Update banner
//   const handleSubmit = async () => {
//     // ❌ Only block if NO existing image AND NO new image
//     if (!preview && !imageFile) {
//       toast.error("Banner image is required");
//       return;
//     }

//     try {
//       setSaving(true);

//       const data = new FormData();
//       data.append("title", title);
//       data.append("subtitle", subtitle);

//       // 🔥 Image optional on update
//       if (imageFile) {
//         data.append("image", imageFile);
//       }

//       await api.post("/api/banners", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Banner saved successfully");
//       setImageFile(null); // reset after save
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to save banner"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   // 🔹 Delete banner
//   const handleDelete = async () => {
//     if (!window.confirm("Delete homepage banner?")) return;

//     try {
//       await api.delete("/api/banners");
//       setTitle("");
//       setSubtitle("");
//       setPreview("");
//       setImageFile(null);
//       toast.success("Banner deleted");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to delete banner"
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-10 text-gray-400">
//         Loading banner...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto bg-[#1b1b1b] rounded-xl border border-yellow-400/20 p-8 space-y-6 overflow-y-auto scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>

//       {/* Header */}
//       <div className="flex items-center justify-between border-b border-yellow-400/20 pb-4">
//         <div className="flex items-center gap-3">
//           <ImageIcon className="text-yellow-400" size={26} />
//           <h2 className="text-2xl font-bold text-white">
//             Homepage Banner
//           </h2>
//         </div>

//         {/* Preview Toggle */}
//         <div className="flex gap-2">
//           <Button
//             size="sm"
//             onClick={() => setView("desktop")}
//             className={view === "desktop" ? "bg-yellow-400 text-black" : ""}
//             variant="outline"
//           >
//             <Monitor size={16} />
//           </Button>
//           <Button
//             size="sm"
//             onClick={() => setView("mobile")}
//             className={view === "mobile" ? "bg-yellow-400 text-black" : ""}
//             variant="outline"
//           >
//             <Smartphone size={16} />
//           </Button>
//         </div>
//       </div>

//       {/* Title */}
//       <Input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Banner title"
//         className="bg-black border-gray-700 text-white"
//       />

//       {/* Subtitle */}
//       <Textarea
//         value={subtitle}
//         onChange={(e) => setSubtitle(e.target.value)}
//         placeholder="Banner subtitle"
//         className="bg-black border-gray-700 text-white min-h-[90px]"
//       />

//       {/* Image Upload + Preview */}
//       <div className="space-y-2">
//         {preview ? (
//           <div
//             className={`relative overflow-hidden rounded-lg border border-gray-700 mx-auto ${
//               view === "mobile"
//                 ? "max-w-[380px] h-[420px]"
//                 : "h-[360px]"
//             }`}
//           >
//             <img
//               src={preview}
//               className="w-full h-full object-cover"
//               alt="Banner preview"
//             />

//             {/* Live Text Overlay */}
//             <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
//               <h3 className="text-white text-2xl font-bold">
//                 {title || "Banner Title"}
//               </h3>
//               <p className="text-gray-200 text-sm mt-2">
//                 {subtitle || "Banner subtitle goes here"}
//               </p>
//             </div>

//             {/* Remove image (only frontend state) */}
//             <button
//               onClick={() => {
//                 setPreview("");
//                 setImageFile(null);
//               }}
//               className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full hover:bg-red-600"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         ) : (
//           <label className="flex flex-col items-center justify-center h-56 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-yellow-400 transition">
//             <Upload className="text-gray-400 mb-2" />
//             <span className="text-sm text-gray-400">
//               Click to upload banner image
//             </span>
//             <span className="text-xs text-gray-500 mt-1">
//               1920 × 600 recommended
//             </span>
//             <input
//               hidden
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//           </label>
//         )}
//       </div>

//       {/* Actions */}
//       <div className="flex justify-between items-center pt-4 border-t border-gray-700">
//         <Button
//           onClick={handleSubmit}
//           disabled={saving}
//           className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-10"
//         >
//           {saving ? "Saving..." : "Save Banner"}
//         </Button>

//         {preview && (
//           <Button
//             onClick={handleDelete}
//             variant="outline"
//             className="border-red-600 text-red-400 hover:bg-red-600/20"
//           >
//             <Trash2 size={18} />
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  Upload,
  X,
  Image as ImageIcon,
  Trash2,
  Plus,
  GripVertical,
  ExternalLink,
  Tag,
  Sparkles,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";

export function AdsBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state for new/edit banner
  const [currentBanner, setCurrentBanner] = useState({
    _id: null,
    title: "",
    subtitle: "",
    link: "",
    discount: "",
    isNew: false,
    imageFile: null,
    preview: "",
  });

  const [saving, setSaving] = useState(false);

  // 🔹 Load all banners
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/banners");
      const data = res.data;

      // Handle both single banner and array
      if (Array.isArray(data)) {
        setBanners(data);
      } else if (data) {
        setBanners([data]);
      } else {
        setBanners([]);
      }
    } catch (err) {
      toast.error("Failed to load banners");
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Reset form
  const resetForm = () => {
    setCurrentBanner({
      _id: null,
      title: "",
      subtitle: "",
      link: "",
      discount: "",
      isNew: false,
      imageFile: null,
      preview: "",
    });
    setShowAddForm(false);
  };

  // 🔹 Edit banner
  const handleEdit = (banner) => {
    setCurrentBanner({
      _id: banner._id,
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      link: banner.link || "",
      discount: banner.discount || "",
      isNew: banner.isNew || false,
      imageFile: null,
      preview: banner.image?.url || "",
    });
    setShowAddForm(true);
  };

  // 🔹 Image select
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCurrentBanner((prev) => ({
      ...prev,
      imageFile: file,
      preview: URL.createObjectURL(file),
    }));
  };

  // 🔹 Save banner (Create or Update)
  const handleSubmit = async () => {
    if (!currentBanner.preview && !currentBanner.imageFile) {
      toast.error("Banner image is required");
      return;
    }

    if (!currentBanner.title.trim()) {
      toast.error("Banner title is required");
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();
      data.append("title", currentBanner.title);
      data.append("subtitle", currentBanner.subtitle);
      data.append("link", currentBanner.link);
      data.append("discount", currentBanner.discount);
      data.append("isNew", currentBanner.isNew);

      if (currentBanner.imageFile) {
        data.append("image", currentBanner.imageFile);
      }

      if (currentBanner._id) {
        // Update existing
        await api.put(`/api/banners/${currentBanner._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Banner updated successfully");
      } else {
        // Create new
        await api.post("/api/banners", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Banner created successfully");
      }

      fetchBanners();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save banner");
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Delete banner
  const handleDelete = async (bannerId) => {
    if (!window.confirm("Delete this banner?")) return;

    try {
      await api.delete(`/api/banners/${bannerId}`);
      toast.success("Banner deleted");
      fetchBanners();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete banner");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-400">
        Loading banners...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#1b1b1b] rounded-xl border border-yellow-400/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImageIcon className="text-yellow-400" size={28} />
            <div>
              <h2 className="text-2xl font-bold text-white">
                Homepage Ad Banners
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Manage auto-scrolling carousel banners ({banners.length} active)
              </p>
            </div>
          </div>

          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
          >
            <Plus size={18} />
            Add Banner
          </Button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-[#1b1b1b] rounded-xl border border-yellow-400/20 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-yellow-400/20 pb-4">
            <h3 className="text-xl font-bold text-white">
              {currentBanner._id ? "Edit Banner" : "Add New Banner"}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <Input
              value={currentBanner.title}
              onChange={(e) =>
                setCurrentBanner((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              placeholder="e.g., Premium Whey Protein"
              className="bg-black border-gray-700 text-white"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subtitle
            </label>
            <Textarea
              value={currentBanner.subtitle}
              onChange={(e) =>
                setCurrentBanner((prev) => ({
                  ...prev,
                  subtitle: e.target.value,
                }))
              }
              placeholder="e.g., Build muscle faster with our best-selling protein"
              className="bg-black border-gray-700 text-white min-h-[80px]"
            />
          </div>

          {/* Link & Discount Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Link */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <ExternalLink size={14} className="inline mr-1" />
                Link URL
              </label>
              <Input
                value={currentBanner.link}
                onChange={(e) =>
                  setCurrentBanner((prev) => ({
                    ...prev,
                    link: e.target.value,
                  }))
                }
                placeholder="/products/whey-protein"
                className="bg-black border-gray-700 text-white"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Tag size={14} className="inline mr-1" />
                Discount (%)
              </label>
              <Input
                type="number"
                value={currentBanner.discount}
                onChange={(e) =>
                  setCurrentBanner((prev) => ({
                    ...prev,
                    discount: e.target.value,
                  }))
                }
                placeholder="50"
                className="bg-black border-gray-700 text-white"
              />
            </div>
          </div>

          {/* NEW Badge Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isNew"
              checked={currentBanner.isNew}
              onChange={(e) =>
                setCurrentBanner((prev) => ({
                  ...prev,
                  isNew: e.target.checked,
                }))
              }
              className="w-4 h-4 rounded border-gray-700 bg-black text-yellow-400 focus:ring-yellow-400"
            />
            <label htmlFor="isNew" className="text-sm text-gray-300">
              <Sparkles size={14} className="inline mr-1 text-green-400" />
              Mark as NEW product
            </label>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Banner Image * (800×400px recommended)
            </label>

            {currentBanner.preview ? (
              <div className="relative rounded-lg border border-gray-700 overflow-hidden">
                {/* Preview Card - Flipkart Style */}
                <div className="bg-white rounded-lg overflow-hidden max-w-md">
                  {/* Image */}
                  <div className="relative h-48">
                    <img
                      src={currentBanner.preview}
                      className="w-full h-full object-cover"
                      alt="Banner preview"
                    />

                    {/* Badges */}
                    {currentBanner.discount && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded text-xs font-bold shadow-lg">
                        {currentBanner.discount}% OFF
                      </div>
                    )}

                    {currentBanner.isNew && !currentBanner.discount && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded text-xs font-bold shadow-lg">
                        NEW
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 bg-white">
                    <h3 className="text-gray-900 font-semibold text-base mb-1">
                      {currentBanner.title || "Banner Title"}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {currentBanner.subtitle || "Banner subtitle"}
                    </p>
                    <span className="text-blue-600 text-sm font-semibold">
                      Shop Now →
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() =>
                    setCurrentBanner((prev) => ({
                      ...prev,
                      preview: "",
                      imageFile: null,
                    }))
                  }
                  className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full hover:bg-red-600 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-yellow-400 transition">
                <Upload className="text-gray-400 mb-2" size={32} />
                <span className="text-sm text-gray-400">
                  Click to upload banner image
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Recommended: 800×400px
                </span>
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <Button onClick={resetForm} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8"
            >
              {saving
                ? "Saving..."
                : currentBanner._id
                ? "Update Banner"
                : "Create Banner"}
            </Button>
          </div>
        </div>
      )}

      {/* Banners List */}
      <div className="bg-[#1b1b1b] rounded-xl border border-yellow-400/20 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Active Banners</h3>

        {banners.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto text-gray-600 mb-3" size={48} />
            <p className="text-gray-400">No banners yet</p>
            <p className="text-gray-500 text-sm mt-1">
              Click "Add Banner" to create your first ad
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {banners.map((banner, index) => (
              <div
                key={banner._id || index}
                className="bg-black/40 border border-gray-700 rounded-lg p-4 hover:border-yellow-400/40 transition"
              >
                <div className="flex gap-4">
                  {/* Drag Handle */}
                  <div className="flex items-center text-gray-600">
                    <GripVertical size={20} />
                  </div>

                  {/* Image Thumbnail */}
                  <div className="relative w-32 h-20 rounded overflow-hidden flex-shrink-0 bg-gray-800">
                    <img
                      src={banner.image?.url}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                    {banner.discount && (
                      <div className="absolute top-1 left-1 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                        {banner.discount}% OFF
                      </div>
                    )}
                    {banner.isNew && (
                      <div className="absolute top-1 right-1 bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                        NEW
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-base mb-1 truncate">
                      {banner.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                      {banner.subtitle}
                    </p>
                    {banner.link && (
                      <a
                        href={banner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 text-xs hover:underline flex items-center gap-1"
                      >
                        <ExternalLink size={12} />
                        {banner.link}
                      </a>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(banner)}
                      className="border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(banner._id)}
                      className="border-red-600 text-red-400 hover:bg-red-600/20"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        {banners.length > 0 && (
          <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
            <h4 className="text-yellow-400 font-semibold text-sm mb-2 flex items-center gap-2">
              <Sparkles size={16} />
              Pro Tips
            </h4>
            <ul className="text-gray-300 text-xs space-y-1">
              <li>• Banners auto-scroll every 3 seconds on the homepage</li>
              <li>• Recommended: 4-6 banners for best user experience</li>
              <li>• Use high-quality images (800×400px) for clarity</li>
              <li>• Add links to drive traffic to specific products</li>
              <li>• Update banners weekly to keep content fresh</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}