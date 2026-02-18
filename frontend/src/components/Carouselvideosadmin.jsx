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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    videoUrl: "",
    productName: "",
    productId: "",
    currentPrice: "",
    originalPrice: "",
    discount: "",
  });

  // API Base URLs
  // const API_URL = "https://mpact-e-backend.onrender.com/api/videohome";
  // const PRODUCTS_API_URL = "https://mpact-e-backend.onrender.com/api/products";
  const API_URL = "https://mpact-e-backend.onrender.com/api/videohome";
  const PRODUCTS_API_URL = "https://mpact-e-backend.onrender.com/api/products";

  // Fetch all videos
  const fetchVideos = async () => {
    try {
      setLoading(true);
      console.log("Fetching videos from:", API_URL);
      const res = await axios.get(API_URL, { timeout: 10000 });
      console.log("Videos API response:", res.data);
      
      // Your backend returns array directly
      setVideos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch ALL products
  const fetchAllProducts = async () => {
    try {
      setProductsLoading(true);
      console.log("Fetching products from:", PRODUCTS_API_URL);
      
      let allProducts = [];
      let page = 1;
      let hasMore = true;
      
      while (hasMore && page <= 10) { // Limit to 10 pages max
        try {
          const res = await axios.get(PRODUCTS_API_URL, { 
            params: { 
              limit: 100,
              page: page
            },
            timeout: 10000
          });
          
          console.log(`Products page ${page} response:`, res.data);
          
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
      
      console.log(`Total products loaded: ${allProducts.length}`);
      setProducts(allProducts);
      setAllProductsLoaded(true);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    fetchAllProducts();
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
    
    // Calculate discount if original price exists
    let discount = '';
    if (product.originalPrice && product.price) {
      const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      discount = discountPercent.toString();
    }
    
    setFormData({
      ...formData,
      productId: product._id || product.id || "",
      productName: product.name || product.productName || product.title || "",
      currentPrice: product.price?.toString() || product.currentPrice?.toString() || "0",
      originalPrice: product.originalPrice?.toString() || "",
      discount: discount || product.discount?.toString() || "",
    });
    setSearchTerm(product.name || product.productName || product.title || "");
    setShowDropdown(false);
  };

  // Handle file selection
  const handleFileSelect = (e) => {
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

    setSelectedFile(file);
  };

  // Handle video file upload
  const handleVideoUpload = async () => {
    if (!selectedFile) {
      alert("Please select a video file");
      return;
    }

    try {
      setUploading(true);
      const uploadFormData = new FormData();
      uploadFormData.append("video", selectedFile);

      const res = await axios.post(
        `${API_URL}/upload`,
        uploadFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      setFormData((prev) => ({
        ...prev,
        videoUrl: res.data.videoUrl,
      }));
      setSelectedFile(null);
      setUploadProgress(0);
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
      productName: "",
      productId: "",
      currentPrice: "",
      originalPrice: "",
      discount: "",
    });
    setSelectedFile(null);
    setSearchTerm("");
    setShowDropdown(false);
    setShowModal(true);
  };

  // Open modal for editing video
  const openEditModal = (video) => {
    setEditingVideo(video);
    setFormData({
      videoUrl: video.videoUrl || "",
      productName: video.productName || "",
      productId: video.productId || "",
      currentPrice: video.currentPrice?.toString() || "",
      originalPrice: video.originalPrice?.toString() || "",
      discount: video.discount?.toString() || "",
    });
    setSelectedFile(null);
    setSearchTerm(video.productName || "");
    setShowDropdown(false);
    setShowModal(true);
  };

  // Submit form (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.videoUrl) {
      alert("Please upload a video first");
      return;
    }

    if (!formData.productId) {
      alert("Please select a product");
      return;
    }

    // Prepare data for backend
    const videoData = {
      videoUrl: formData.videoUrl,
      productName: formData.productName,
      productId: formData.productId,
      currentPrice: parseFloat(formData.currentPrice),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      discount: formData.discount ? parseInt(formData.discount) : null,
    };

    try {
      let response;
      if (editingVideo) {
        response = await axios.put(
          `${API_URL}/${editingVideo._id}`,
          videoData
        );
        console.log("Update response:", response.data);
        alert("Video updated successfully!");
      } else {
        response = await axios.post(API_URL, videoData);
        console.log("Create response:", response.data);
        alert("Video added successfully!");
      }

      setShowModal(false);
      fetchVideos(); // Refresh the list
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
      fetchVideos(); // Refresh the list
    } catch (err) {
      console.error("Failed to delete video:", err);
      alert("Failed to delete video: " + (err.response?.data?.message || err.message));
    }
  };

  // Toggle video active status
  const handleToggleActive = async (id, currentStatus) => {
    try {
      await axios.patch(`${API_URL}/${id}/toggle`);
      fetchVideos(); // Refresh the list
    } catch (err) {
      console.error("Failed to toggle video status:", err);
      alert("Failed to toggle video status");
    }
  };

  // Filter products based on search term
  const filteredProducts = Array.isArray(products) ? products.filter(product => {
    if (!product) return false;
    
    const searchLower = searchTerm.toLowerCase();
    const productName = (product.name || product.productName || product.title || "").toLowerCase();
    const productId = (product._id || product.id || "").toLowerCase();
    
    return productName.includes(searchLower) || productId.includes(searchLower);
  }).slice(0, 50) : [];

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
          position: relative;
        }

        .video-card:hover {
          transform: translateY(-4px);
          border-color: #facc15;
          box-shadow: 0 8px 24px rgba(250, 204, 21, 0.2);
        }

        .active-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 900;
          z-index: 10;
        }

        .active-badge.active {
          background: #4ade80;
          color: black;
        }

        .active-badge.inactive {
          background: #dc2626;
          color: white;
        }

        .video-preview {
          position: relative;
          width: 100%;
          height: 200px;
          background: #000;
          overflow: hidden;
        }

        .video-preview iframe,
        .video-preview video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: none;
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

        .card-actions {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .btn-edit,
        .btn-delete,
        .btn-toggle {
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
        }

        .btn-delete {
          background: #dc2626;
          color: #fff;
        }

        .btn-delete:hover {
          background: #b91c1c;
        }

        .btn-toggle {
          background: #3a3a3a;
          color: #fff;
        }

        .btn-toggle:hover {
          background: #4a4a4a;
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

        .upload-progress {
          margin-top: 10px;
          height: 4px;
          background: #3a3a3a;
          border-radius: 2px;
          overflow: hidden;
        }

        .upload-progress-bar {
          height: 100%;
          background: #facc15;
          transition: width 0.3s ease;
        }

        .upload-btn {
          width: 100%;
          padding: 12px;
          background: #facc15;
          color: black;
          border: none;
          border-radius: 4px;
          font-weight: 900;
          cursor: pointer;
          margin-top: 10px;
        }

        .upload-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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

        .video-preview-container {
          width: 100%;
          border-radius: 4px;
          overflow: hidden;
          background: #000;
          margin-bottom: 12px;
          position: relative;
          padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
        }

        .video-preview-container video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
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

        .api-debug-section {
          background: #1a1a1a;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
          border: 1px solid #facc15;
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
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="add-btn" onClick={openAddModal}>
              <span>+</span> Add Video to Product
            </button>
          </div>
        </div>

        {/* Debug info */}
        <div className="api-debug-section">
          <details open>
            <summary style={{ color: '#facc15', cursor: 'pointer', fontWeight: 'bold' }}>
              🛠️ Debug: API Status
            </summary>
            <div style={{ marginTop: '12px', color: '#ccc' }}>
              <p>Products loaded: {Array.isArray(products) ? products.length : 'Not an array'}</p>
              <p>Products type: {typeof products}</p>
              <p>Is array: {Array.isArray(products) ? 'Yes' : 'No'}</p>
              <p>Products loading: {productsLoading ? 'Yes' : 'No'}</p>
              <p>Videos loaded: {videos.length}</p>
              <p>Videos loading: {loading ? 'Yes' : 'No'}</p>
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
                <div className={`active-badge ${video.isActive ? 'active' : 'inactive'}`}>
                  {video.isActive ? 'ACTIVE' : 'INACTIVE'}
                </div>
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
                  </div>

                  <div className="card-actions">
                    <button
                      className="btn-edit"
                      onClick={() => openEditModal(video)}
                    >
                      ✏️ Edit
                    </button>
                    {/* <button
                      className="btn-toggle"
                      onClick={() => handleToggleActive(video._id, video.isActive)}
                    >
                      {video.isActive ? 'Deactivate' : 'Activate'}
                    </button> */}
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
                            onChange={handleFileSelect}
                            disabled={uploading}
                          />
                          <div className="upload-icon">📤</div>
                          <div className="upload-text">
                            {selectedFile ? selectedFile.name : "Click to select video"}
                          </div>
                          <div className="upload-text" style={{ marginTop: "8px" }}>
                            MP4, WebM, or MOV (max 50MB)
                          </div>
                        </label>
                        
                        {selectedFile && (
                          <>
                            {uploading && (
                              <div className="upload-progress">
                                <div 
                                  className="upload-progress-bar" 
                                  style={{ width: `${uploadProgress}%` }}
                                />
                              </div>
                            )}
                            <button
                              type="button"
                              className="upload-btn"
                              onClick={handleVideoUpload}
                              disabled={uploading}
                            >
                              {uploading ? `Uploading ${uploadProgress}%` : "Upload Video"}
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="video-preview-container">
                          <video src={formData.videoUrl} controls />
                        </div>
                        <button
                          type="button"
                          className="btn-delete"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, videoUrl: "" }));
                            setSelectedFile(null);
                          }}
                          style={{ width: "100%", marginTop: "10px" }}
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
                    disabled={!formData.videoUrl || !formData.productId}
                  >
                    {editingVideo ? "Update Video" : "Add Video"}
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