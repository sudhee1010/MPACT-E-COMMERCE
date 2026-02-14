import { useState, useEffect } from "react";
import axios from "axios";
import api from "../services/api";

export default function CarouselVideosAdmin() {
  const [videos, setVideos] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({
    videoUrl: "",
    productId: "",
    productName: "",
    currentPrice: "",
    originalPrice: "",
    discount: "",
    countInStock: "10",
  });

  // API Base URLs - Update these to match your backend
  const API_URL = "https://mpact-e-backend.onrender.com/api/videohome";
  const PRODUCTS_API_URL = "https://mpact-e-backend.onrender.com/api/products";

  // Fetch all videos
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      // Ensure we always set an array
      setVideos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
      alert("Failed to load videos");
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products from your main products collection
  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      // Use admin endpoint (includes all products) with a large limit.
      // We use the project's `api` instance so cookies/auth (if required) are included.
      const res = await api.get("/products/admin/all", { params: { limit: 10000 } });
      console.log("Products API response:", res.data); // Debug log

      // The backend returns { products, pageInfo }
      let productsData = [];
      if (res.data) {
        if (Array.isArray(res.data.products)) productsData = res.data.products;
        else if (Array.isArray(res.data.data)) productsData = res.data.data;
        else if (Array.isArray(res.data)) productsData = res.data;
      }

      setProducts(productsData || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle product selection from dropdown
  const handleProductSelect = (product) => {
    if (!product) return;
    
    setFormData({
      ...formData,
      productId: product._id || product.id || "",
      productName: product.name || product.productName || product.title || "",
      currentPrice: product.price?.toString() || product.currentPrice?.toString() || "0",
      originalPrice: product.originalPrice?.toString() || "",
      discount: product.discount?.toString() || "",
      countInStock: product.countInStock?.toString() || "10",
    });
    setSearchTerm(product.name || product.productName || product.title || "");
    setShowDropdown(false);
  };

  // Filter products based on search term - with safety check
  const filteredProducts = Array.isArray(products) ? products.filter(product => {
    if (!product) return false;
    
    const searchLower = searchTerm.toLowerCase();
    const productName = (product.name || product.productName || product.title || "").toLowerCase();
    const productId = (product._id || product.id || "").toLowerCase();
    
    return productName.includes(searchLower) || productId.includes(searchLower);
  }) : [];

  // Handle video file upload
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Please upload a valid video file");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert("Video file size must be less than 50MB");
      return;
    }

    try {
      setUploading(true);
      const uploadFormData = new FormData();
      uploadFormData.append("video", file);

      const res = await axios.post(
        `${API_URL}/upload`,
        uploadFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload Progress: ${percentCompleted}%`);
          },
        }
      );

      setFormData((prev) => ({
        ...prev,
        videoUrl: res.data.videoUrl || res.data.url || "",
      }));

      alert("Video uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload video: " + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  // Open modal for adding new video
  const openAddModal = () => {
    setEditingVideo(null);
    setFormData({
      videoUrl: "",
      productId: "",
      productName: "",
      currentPrice: "",
      originalPrice: "",
      discount: "",
      countInStock: "10",
    });
    setSearchTerm("");
    setShowDropdown(false);
    setShowModal(true);
  };

  // Open modal for editing video
  const openEditModal = (video) => {
    setEditingVideo(video);
    setFormData({
      videoUrl: video.videoUrl || "",
      productId: video.productId || "",
      productName: video.productName || "",
      currentPrice: video.currentPrice?.toString() || "",
      originalPrice: video.originalPrice?.toString() || "",
      discount: video.discount?.toString() || "",
      countInStock: video.countInStock?.toString() || "10",
    });
    setSearchTerm(video.productName || "");
    setShowDropdown(false);
    setShowModal(true);
  };

  // Submit form (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.videoUrl) {
      alert("Please upload a video");
      return;
    }

    if (!formData.productId) {
      alert("Please select a product");
      return;
    }

    try {
      if (editingVideo) {
        await axios.put(
          `${API_URL}/${editingVideo._id}`,
          formData
        );
        alert("Video updated successfully!");
      } else {
        await axios.post(API_URL, formData);
        alert("Video added successfully!");
      }

      setShowModal(false);
      fetchVideos();
    } catch (err) {
      console.error("Failed to save video:", err);
      alert("Failed to save video: " + (err.response?.data?.message || err.message));
    }
  };

  // Delete video
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("Video deleted successfully!");
      fetchVideos();
    } catch (err) {
      console.error("Failed to delete video:", err);
      alert("Failed to delete video: " + (err.response?.data?.message || err.message));
    }
  };

  // Debug function to test API
  const testProductsAPI = async () => {
    try {
      const res = await api.get("/products/admin/all", { params: { limit: 10000 } });
      console.log("Products API test - full response:", res);
      console.log("Products API test - data:", res.data);
      console.log("Products API test - data type:", typeof res.data);
      console.log("Products API test - is array:", Array.isArray(res.data.products) ? 'products array' : Array.isArray(res.data) ? 'data array' : 'not array');
      alert("Check console for API response details");
    } catch (err) {
      console.error("Products API test failed:", err);
      alert("API test failed: " + err.message);
    }
  };

  return (
    <>
      <style>{`
        .carousel-admin {
          background: #262626;
          min-height: 100vh;
          padding: 20px;
          color: #fff;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #2a2a2a;
        }

        .admin-title {
          font-size: 32px;
          font-weight: 900;
          color: #facc15;
          display: flex;
          align-items: center;
          gap: 12px;
          text-transform: uppercase;
        }

        .add-btn {
          background: #facc15;
          color: black;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: 900;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          text-transform: uppercase;
        }

        .add-btn:hover {
          background: #eab308;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(250, 204, 21, 0.3);
        }

        .test-btn {
          background: #3a3a3a;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: 900;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-left: 12px;
          border: 1px solid #facc15;
        }

        .test-btn:hover {
          background: #4a4a4a;
        }

        .videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
        }

        .video-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: linear-gradient(to bottom, rgba(120,53,15,0.4), #171717);
          border: 2px solid rgba(133,77,14,0.5);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .video-card:hover {
          transform: translateY(-4px);
          border-color: #facc15;
          box-shadow: 0 8px 24px rgba(250, 204, 21, 0.2);
        }

        .video-preview {
          position: relative;
          width: 100%;
          height: 200px;
          background: #000;
          overflow: hidden;
        }

        .video-preview video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .video-card:hover .video-preview video {
          transform: scale(1.1);
        }

        .video-info {
          padding: 20px;
          background: #171717;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .product-title {
          font-size: 18px;
          font-weight: 900;
          color: #fff;
          margin-bottom: 16px;
          text-transform: uppercase;
          text-align: center;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
        }

        .info-label {
          font-size: 12px;
          color: #999;
          margin-bottom: 4px;
        }

        .info-value {
          font-size: 16px;
          color: #facc15;
          font-weight: 700;
        }

        .product-link-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(250, 204, 21, 0.1);
          border: 1px solid #facc15;
          padding: 4px 12px;
          border-radius: 4px;
          color: #facc15;
          font-size: 12px;
          margin-top: 8px;
          width: fit-content;
        }

        .stock-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .stock-in {
          background: #4ade80;
          color: black;
        }

        .stock-out {
          background: #dc2626;
          color: white;
        }

        .card-actions {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .btn-edit,
        .btn-delete {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 4px;
          font-weight: 900;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          font-size: 14px;
        }

        .btn-edit {
          background: #facc15;
          color: black;
        }

        .btn-edit:hover {
          background: #eab308;
          transform: translateY(-2px);
        }

        .btn-delete {
          background: #dc2626;
          color: #fff;
        }

        .btn-delete:hover {
          background: #b91c1c;
          transform: translateY(-2px);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal {
          background: #262626;
          border-radius: 12px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          border: 2px solid #facc15;
        }

        .modal-header {
          padding: 24px;
          border-bottom: 2px solid #3a3a3a;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 900;
          color: #facc15;
          text-transform: uppercase;
        }

        .close-btn {
          background: none;
          border: none;
          color: #999;
          font-size: 28px;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .close-btn:hover {
          color: #fff;
        }

        .modal-body {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #facc15;
          font-weight: 900;
          font-size: 14px;
          text-transform: uppercase;
        }

        .required {
          color: #dc2626;
        }

        .form-input {
          width: 100%;
          padding: 12px;
          border-radius: 4px;
          border: 2px solid #3a3a3a;
          background: #1a1a1a;
          color: #fff;
          font-size: 14px;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #facc15;
        }

        .product-search {
          position: relative;
        }

        .search-input-wrapper {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
        }

        .search-input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border-radius: 4px;
          border: 2px solid #3a3a3a;
          background: #1a1a1a;
          color: #fff;
          font-size: 14px;
          transition: border-color 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #facc15;
        }

        .search-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          max-height: 300px;
          overflow-y: auto;
          background: #1a1a1a;
          border: 2px solid #facc15;
          border-top: none;
          border-radius: 0 0 4px 4px;
          z-index: 10;
          margin-top: 2px;
        }

        .search-item {
          padding: 12px;
          cursor: pointer;
          transition: background 0.3s ease;
          border-bottom: 1px solid #3a3a3a;
        }

        .search-item:hover {
          background: #2a2a2a;
        }

        .search-item:last-child {
          border-bottom: none;
        }

        .search-item-name {
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }

        .search-item-id {
          font-size: 12px;
          color: #999;
          margin-bottom: 4px;
        }

        .search-item-price {
          color: #facc15;
          font-size: 14px;
          font-weight: 700;
        }

        .selected-product {
          padding: 16px;
          background: #1a1a1a;
          border: 2px solid #facc15;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .selected-product-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .selected-product-name {
          font-weight: 700;
          color: #fff;
          font-size: 16px;
        }

        .selected-product-id {
          font-size: 12px;
          color: #999;
        }

        .selected-product-price {
          color: #facc15;
          font-weight: 700;
          font-size: 14px;
        }

        .change-product-btn {
          background: #3a3a3a;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .change-product-btn:hover {
          background: #4a4a4a;
        }

        .file-upload-wrapper {
          position: relative;
        }

        .file-upload-label {
          display: block;
          padding: 40px 20px;
          border: 2px dashed #facc15;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .file-upload-label:hover {
          background: rgba(250, 204, 21, 0.1);
        }

        .file-upload-input {
          display: none;
        }

        .upload-icon {
          font-size: 48px;
          color: #facc15;
          margin-bottom: 12px;
        }

        .upload-text {
          color: #999;
          font-size: 14px;
        }

        .uploading-text {
          color: #facc15;
          font-weight: 600;
        }

        .video-preview-container {
          width: 100%;
          border-radius: 4px;
          overflow: hidden;
          background: #000;
          margin-bottom: 12px;
        }

        .video-preview-container video {
          width: 100%;
          max-height: 200px;
          object-fit: cover;
        }

        .readonly-field {
          background: #2a2a2a !important;
          color: #999 !important;
          cursor: not-allowed;
        }

        .modal-footer {
          padding: 24px;
          border-top: 2px solid #3a3a3a;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .btn-cancel,
        .btn-submit {
          padding: 12px 24px;
          border: none;
          border-radius: 4px;
          font-weight: 900;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          font-size: 14px;
        }

        .btn-cancel {
          background: #3a3a3a;
          color: #fff;
        }

        .btn-cancel:hover {
          background: #4a4a4a;
        }

        .btn-submit {
          background: #facc15;
          color: black;
        }

        .btn-submit:hover {
          background: #eab308;
          transform: translateY(-2px);
        }

        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #999;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-state h3 {
          color: #fff;
          margin-bottom: 8px;
        }

        .loading {
          text-align: center;
          padding: 60px 20px;
          color: #facc15;
          font-size: 18px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .no-products-message {
          padding: 20px;
          text-align: center;
          color: #999;
          background: #1a1a1a;
          border: 1px solid #3a3a3a;
          border-radius: 4px;
          margin-top: 10px;
        }

        .api-debug-section {
          background: #1a1a1a;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
          border: 1px solid #facc15;
        }

        @media (max-width: 768px) {
          .videos-grid {
            grid-template-columns: 1fr;
          }

          .admin-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .add-btn {
            width: 100%;
            justify-content: center;
          }

          .admin-title {
            font-size: 24px;
          }

          .modal {
            max-width: 95%;
          }
        }
      `}</style>

      <div className="carousel-admin">
        <div className="admin-header">
          <h1 className="admin-title">
            <span>🎬</span> Video Carousel Management
          </h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="test-btn" onClick={testProductsAPI}>
              🔍 Test Products API
            </button>
            <button className="add-btn" onClick={openAddModal}>
              <span>+</span> Add Video to Product
            </button>
          </div>
        </div>

        {/* Debug info - remove in production */}
        <div className="api-debug-section">
          <details>
            <summary style={{ color: '#facc15', cursor: 'pointer', fontWeight: 'bold' }}>
              🛠️ Debug: Products API Status
            </summary>
            <div style={{ marginTop: '12px', color: '#ccc' }}>
              <p>Products loaded: {Array.isArray(products) ? products.length : 'Not an array'}</p>
              <p>Products type: {typeof products}</p>
              <p>Is array: {Array.isArray(products) ? 'Yes' : 'No'}</p>
              <p>Products loading: {productsLoading ? 'Yes' : 'No'}</p>
              {!Array.isArray(products) && (
                <p style={{ color: '#ff6b6b' }}>
                  ⚠️ Products is not an array. Check the API response format.
                </p>
              )}
            </div>
          </details>
        </div>

        {loading ? (
          <div className="loading">Loading videos...</div>
        ) : videos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📹</div>
            <h3>No product videos yet</h3>
            <p>Click "Add Video to Product" to get started</p>
          </div>
        ) : (
          <div className="videos-grid">
            {videos.map((video) => (
              <div key={video._id} className="video-card">
                <div className="video-preview">
                  <video src={video.videoUrl} muted loop />
                </div>
                <div className="video-info">
                  <h3 className="product-title">{video.productName}</h3>
                  
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Product ID</span>
                      <span className="info-value" style={{ fontSize: '12px' }}>
                        {video.productId?.substring(0, 8)}...
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Current Price</span>
                      <span className="info-value">₹{video.currentPrice}</span>
                    </div>
                    {video.originalPrice && (
                      <div className="info-item">
                        <span className="info-label">Original Price</span>
                        <span className="info-value">₹{video.originalPrice}</span>
                      </div>
                    )}
                    {video.discount && (
                      <div className="info-item">
                        <span className="info-label">Discount</span>
                        <span className="info-value">{video.discount}% OFF</span>
                      </div>
                    )}
                    <div className="info-item">
                      <span className="info-label">Stock Status</span>
                      <span className={`stock-badge ${parseInt(video.countInStock) > 0 ? 'stock-in' : 'stock-out'}`}>
                        {parseInt(video.countInStock) > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  <div className="product-link-badge">
                    <span>🔗</span>
                    <span>Linked to existing product</span>
                  </div>

                  <div className="card-actions">
                    <button
                      className="btn-edit"
                      onClick={() => openEditModal(video)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(video._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">
                  {editingVideo ? "Edit Product Video" : "Add Video to Product"}
                </h2>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {/* Video Upload Section */}
                  <div className="form-group">
                    <label className="form-label">
                      Product Video <span className="required">*</span>
                    </label>
                    {!formData.videoUrl ? (
                      <div className="file-upload-wrapper">
                        <label className="file-upload-label">
                          <input
                            type="file"
                            accept="video/*"
                            className="file-upload-input"
                            onChange={handleVideoUpload}
                            disabled={uploading}
                          />
                          <div className="upload-icon">📤</div>
                          <div className={uploading ? "uploading-text" : "upload-text"}>
                            {uploading ? "Uploading..." : "Click to upload video"}
                          </div>
                          <div className="upload-text" style={{ marginTop: "8px" }}>
                            MP4, WebM, or MOV (max 50MB)
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div>
                        <div className="video-preview-container">
                          <video
                            src={formData.videoUrl}
                            controls
                          />
                        </div>
                        <button
                          type="button"
                          className="btn-delete"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, videoUrl: "" }))
                          }
                          style={{ width: "100%" }}
                        >
                          Change Video
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Product Selection Section */}
                  <div className="form-group">
                    <label className="form-label">
                      Select Product <span className="required">*</span>
                    </label>
                    {!formData.productId ? (
                      <div className="product-search">
                        <div className="search-input-wrapper">
                          <span className="search-icon">🔍</span>
                          <input
                            type="text"
                            className="search-input"
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
                          <div className="search-dropdown">
                            {productsLoading ? (
                              <div className="no-products-message">
                                Loading products...
                              </div>
                            ) : filteredProducts.length > 0 ? (
                              filteredProducts.map((product) => (
                                <div
                                  key={product._id || product.id || Math.random()}
                                  className="search-item"
                                  onClick={() => handleProductSelect(product)}
                                >
                                  <div className="search-item-name">
                                    {product.name || product.productName || product.title || "Unnamed Product"}
                                  </div>
                                  <div className="search-item-id">
                                    ID: {product._id || product.id || "N/A"}
                                  </div>
                                  <div className="search-item-price">
                                    ₹{product.price || product.currentPrice || "0"}
                                    {product.originalPrice && (
                                      <span style={{ 
                                        color: "#999", 
                                        textDecoration: "line-through", 
                                        marginLeft: "8px",
                                        fontSize: "12px"
                                      }}>
                                        ₹{product.originalPrice}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="no-products-message">
                                {searchTerm ? "No products found" : "Type to search products"}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="selected-product">
                        <div className="selected-product-info">
                          <span className="selected-product-name">
                            {formData.productName}
                          </span>
                          <span className="selected-product-id">
                            ID: {formData.productId}
                          </span>
                          <span className="selected-product-price">
                            ₹{formData.currentPrice}
                            {formData.originalPrice && (
                              <span style={{ 
                                color: "#999", 
                                textDecoration: "line-through", 
                                marginLeft: "8px",
                                fontSize: "12px"
                              }}>
                                ₹{formData.originalPrice}
                              </span>
                            )}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="change-product-btn"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              productId: "",
                              productName: "",
                              currentPrice: "",
                              originalPrice: "",
                              discount: "",
                              countInStock: "10",
                            });
                            setSearchTerm("");
                            setShowDropdown(false);
                          }}
                        >
                          Change
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Auto-filled Product Details (Read-only) */}
                  {formData.productId && (
                    <>
                      <div className="form-group">
                        <label className="form-label">Product Name</label>
                        <input
                          type="text"
                          className="form-input readonly-field"
                          value={formData.productName}
                          readOnly
                          disabled
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Product ID</label>
                        <input
                          type="text"
                          className="form-input readonly-field"
                          value={formData.productId}
                          readOnly
                          disabled
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Current Price (₹)</label>
                        <input
                          type="text"
                          className="form-input readonly-field"
                          value={formData.currentPrice}
                          readOnly
                          disabled
                        />
                      </div>

                      {formData.originalPrice && (
                        <div className="form-group">
                          <label className="form-label">Original Price (₹)</label>
                          <input
                            type="text"
                            className="form-input readonly-field"
                            value={formData.originalPrice}
                            readOnly
                            disabled
                          />
                        </div>
                      )}

                      {formData.discount && (
                        <div className="form-group">
                          <label className="form-label">Discount (%)</label>
                          <input
                            type="text"
                            className="form-input readonly-field"
                            value={formData.discount}
                            readOnly
                            disabled
                          />
                        </div>
                      )}

                      <div className="form-group">
                        <label className="form-label">Stock Quantity</label>
                        <input
                          type="text"
                          className="form-input readonly-field"
                          value={formData.countInStock}
                          readOnly
                          disabled
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ color: '#4ade80' }}>
                          ✓ Product details automatically synced from main catalog
                        </label>
                      </div>
                    </>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={!formData.videoUrl || !formData.productId || uploading}
                  >
                    {uploading ? "Uploading..." : editingVideo ? "Update Video" : "Add Video"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}