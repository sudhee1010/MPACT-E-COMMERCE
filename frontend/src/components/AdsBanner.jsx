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
  Search,
} from "lucide-react";

// Simple Button component if you don't have one
const Button = ({ children, onClick, disabled, className, variant, size, ...props }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = variant === 'outline' 
    ? 'border border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400' 
    : 'bg-yellow-400 hover:bg-yellow-500 text-black';
  const sizeClasses = size === 'sm' ? 'px-3 py-1.5 text-sm' : '';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Simple Input component
const Input = ({ value, onChange, placeholder, className, type = "text", ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 ${className || ''}`}
      {...props}
    />
  );
};

// Simple Textarea component
const Textarea = ({ value, onChange, placeholder, className, ...props }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 resize-none ${className || ''}`}
      {...props}
    />
  );
};

export function AdsBanner() {
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Product search state
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

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
    productId: "",
    productName: "",
  });

  const [saving, setSaving] = useState(false);

  // API Base URL
  // const PRODUCTS_API_URL = "https://mpact-e-backend.onrender.com/api/products";

  // 🔹 Fetch ALL products
  const fetchAllProducts = async () => {
    try {
      setProductsLoading(true);
      
      let allProducts = [];
      let page = 1;
      let hasMore = true;
      
      while (hasMore && page <= 10) {
        try {
          const res = await api.get("/api/products", { 
            params: { 
              limit: 100,
              page: page
            },
            timeout: 10000
          });
          
          let pageProducts = [];
          if (Array.isArray(res.data)) {
            pageProducts = res.data;
            hasMore = res.data.length === 100;
          } else if (res.data && Array.isArray(res.data.products)) {
            pageProducts = res.data.products;
            hasMore = res.data.products.length === 100;
          } else if (res.data && Array.isArray(res.data.data)) {
            pageProducts = res.data.data;
            hasMore = res.data.data.length === 100;
          } else {
            hasMore = false;
          }
          
          allProducts = [...allProducts, ...pageProducts];
          page++;
        } catch (pageErr) {
          console.error(`Error fetching page ${page}:`, pageErr);
          hasMore = false;
        }
      }
      
      setProducts(allProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  // 🔹 Load all banners
  useEffect(() => {
    fetchBanners();
    fetchAllProducts();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/banners");
      const data = res.data;

      if (Array.isArray(data)) {
        setBanners(data);
      } else if (data) {
        setBanners([data]);
      } else {
        setBanners([]);
      }
    } catch (err) {
      console.error("Failed to load banners:", err);
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
      productId: "",
      productName: "",
    });
    setSearchTerm("");
    setShowDropdown(false);
    setShowAddForm(false);
  };

  // 🔹 Handle product selection
  const handleProductSelect = (product) => {
    if (!product) return;
    
    setCurrentBanner((prev) => ({
      ...prev,
      productId: product._id || product.id || "",
      productName: product.name || product.productName || product.title || "",
      link: product._id ? `/productspec/${product._id}` : "",
      title: product.name || product.productName || product.title || prev.title,
    }));
    setSearchTerm(product.name || product.productName || product.title || "");
    setShowDropdown(false);
  };

  // 🔹 Edit banner
  const handleEdit = (banner) => {
    let productId = "";
    let productName = "";
    
    if (banner.link && banner.link.includes('/products/')) {
      const productSlug = banner.link.split('/products/')[1];
      const matchedProduct = products.find(p => p._id === productSlug || p.id === productSlug);
      if (matchedProduct) {
        productId = matchedProduct._id || matchedProduct.id;
        productName = matchedProduct.name || matchedProduct.productName || matchedProduct.title;
      }
    }

    setCurrentBanner({
      _id: banner._id,
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      link: banner.link || "",
      discount: banner.discount || "",
      isNew: banner.isNew || false,
      imageFile: null,
      preview: banner.image?.url || "",
      productId: productId,
      productName: productName,
    });
    setSearchTerm(productName);
    setShowAddForm(true);
  };

  // 🔹 Image select
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setCurrentBanner((prev) => ({
      ...prev,
      imageFile: file,
      preview: URL.createObjectURL(file),
    }));
  };

  // 🔹 Save banner
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
      data.append("subtitle", currentBanner.subtitle || "");
      data.append("link", currentBanner.link || "");
      data.append("discount", currentBanner.discount || "0");
      data.append("isNew", currentBanner.isNew);
      data.append("productId", currentBanner.productId || "");

      if (currentBanner.imageFile) {
        data.append("image", currentBanner.imageFile);
      }

      if (currentBanner._id) {
        await api.put(`/api/banners/${currentBanner._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Banner updated successfully");
      } else {
        await api.post("/api/banners", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Banner created successfully");
      }

      fetchBanners();
      resetForm();
    } catch (error) {
      console.error("Save error:", error);
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
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete banner");
    }
  };

  // 🔹 Filter products based on search term
  const filteredProducts = Array.isArray(products) ? products.filter(product => {
    if (!product) return false;
    
    const searchLower = searchTerm.toLowerCase();
    const productName = (product.name || product.productName || product.title || "").toLowerCase();
    const productId = (product._id || product.id || "").toLowerCase();
    
    return productName.includes(searchLower) || productId.includes(searchLower);
  }).slice(0, 50) : [];

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-400">
        Loading banners...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
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
            <Plus size={18} className="mr-1" />
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

          {/* Product Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Product (Optional)
            </label>
            {!currentBanner.productId ? (
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    placeholder="Search products by name or ID..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    autoComplete="off"
                  />
                </div>
                {showDropdown && searchTerm && (
                  <div className="absolute z-10 top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-[#1a1a1a] border border-yellow-400 rounded-lg shadow-lg">
                    {productsLoading ? (
                      <div className="p-4 text-center text-gray-400">
                        Loading products...
                      </div>
                    ) : filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <div
                          key={product._id || product.id || Math.random()}
                          className="p-3 cursor-pointer hover:bg-gray-800 border-b border-gray-700 last:border-b-0"
                          onClick={() => handleProductSelect(product)}
                        >
                          <div className="font-medium text-white">
                            {product.name || product.productName || product.title || "Unnamed Product"}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            ID: {product._id || product.id || "N/A"}
                          </div>
                          <div className="text-sm text-yellow-400 mt-1">
                            ₹{product.price || product.currentPrice || "0"}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-400">
                        No products found
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#1a1a1a] border border-yellow-400 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-white">
                      {currentBanner.productName}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      ID: {currentBanner.productId}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-yellow-400 hover:text-yellow-300"
                    onClick={() => {
                      setCurrentBanner((prev) => ({
                        ...prev,
                        productId: "",
                        productName: "",
                        link: "",
                      }));
                      setSearchTerm("");
                      setShowDropdown(false);
                    }}
                  >
                    Change
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Link URL */}
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
              placeholder="/productspec/product-id or custom URL"
            />
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
              min="0"
              max="100"
            />
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
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Banner Image * (800×400px recommended)
            </label>

            {currentBanner.preview ? (
              <div className="relative rounded-lg border border-gray-700 overflow-hidden">
                <div className="bg-white rounded-lg overflow-hidden max-w-md">
                  <div className="relative h-48">
                    <img
                      src={currentBanner.preview}
                      className="w-full h-full object-cover"
                      alt="Banner preview"
                    />
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
                  Recommended: 800×400px (Max 5MB)
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
                  <div className="flex items-center text-gray-600">
                    <GripVertical size={20} />
                  </div>

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

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(banner)}
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
      </div>
    </div>
  );
}