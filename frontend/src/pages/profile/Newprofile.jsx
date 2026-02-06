import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Package,
  Heart,
  Settings,
  Edit,
  Camera,
  Eye,
  EyeOff,
} from "lucide-react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addToCartApi } from "../../api/cartApi";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Debounce for smoother transitions
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/auth/profile");
        setUser(res.data);
        setFormData({
          name: res.data.name || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
        });
      } catch (error) {
        toast.error("Please login to continue");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const fetchMyOrders = async () => {
    try {
      setOrdersLoading(true);
      const res = await api.get("/api/orders/my-orders");
      setOrders(res.data);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      setWishlistLoading(true);
      const res = await api.get("/api/wishlist");
      setWishlist(res.data.wishlist);
    } catch (error) {
      toast.error("Failed to load wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCartApi(productId, 1);
      await api.delete(`/api/wishlist/${productId}`);
      fetchWishlist();
      toast.success("Added to cart 🛒");
      navigate("/cart");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Please login to add to cart",
      );
      navigate("/login");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      setUploading(true);

      const res = await api.put("/api/auth/upload-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(res.data.user);
      toast.success("Profile image updated!");
      setPreviewImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
      setPreviewImage(null);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "5rem" }}>
        Loading profile...
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background-color: #323232;
          color: #ffffff;
          overflow-x: hidden;
        }

        /* Container */
        .profile-container {
          min-height: 100vh;
          background-color: #323232;
          padding-top: 92px;
          transition: padding-top 0.3s ease;
        }

        @media (max-width: 600px) {
          .profile-container {
            padding-top: 72px;
          }
        }

        /* Main Content */
        .profile-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2rem;
          transition: padding 0.3s ease;
        }

        /* Profile Header Card */
        .profile-card {
          border: 2px solid #facc15;
          border-radius: 0.75rem;
          margin: 0 auto 2.5rem;
          padding: 2rem;
          background-color: #3a3a3a;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        /* Profile Header Layout */
        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
          flex-wrap: wrap;
          transition: gap 0.3s ease;
        }

        .profile-info {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          flex: 1;
          min-width: 0;
          transition: gap 0.3s ease;
        }

        /* Avatar Section */
        .avatar-container {
          position: relative;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .avatar {
          width: 120px;
          height: 120px;
          background-color: #facc15;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 3px solid rgba(250, 204, 21, 0.3);
          transition: all 0.3s ease;
        }

        .avatar:hover {
          transform: scale(1.02);
          box-shadow: 0 0 0 4px rgba(250, 204, 21, 0.1);
        }

        .avatar-icon {
          color: #1f2937;
          width: 56px;
          height: 56px;
          transition: transform 0.3s ease;
        }

        .camera-btn {
          position: absolute;
          bottom: 6px;
          right: 6px;
          background-color: #facc15;
          border: none;
          border-radius: 50%;
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .camera-btn:hover {
          background-color: #fde047;
          transform: scale(1.1) rotate(5deg);
        }

        .camera-btn:active {
          transform: scale(0.95);
        }

        .camera-icon {
          color: #1f2937;
          width: 18px;
          height: 18px;
          transition: transform 0.3s ease;
        }

        /* Profile Details */
        .profile-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          flex: 1;
        }

        .profile-name {
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          font-size: 1.75rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          letter-spacing: -0.025em;
          transition: font-size 0.3s ease;
        }

        .profile-email {
          color: #d1d5db;
          margin-bottom: 0.5rem;
          font-size: 1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: font-size 0.3s ease;
        }

        .profile-member {
          color: #9ca3af;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: font-size 0.3s ease;
        }

        /* Edit Button */
        .edit-btn {
          background-color: #facc15;
          color: #1f2937;
          padding: 0.875rem 1.75rem;
          border-radius: 0.5rem;
          border: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.625rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          height: fit-content;
          flex-shrink: 0;
          font-size: 0.95rem;
          box-shadow: 0 2px 8px rgba(250, 204, 21, 0.3);
        }

        .edit-btn:hover {
          background-color: #fde047;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(250, 204, 21, 0.4);
        }

        .edit-btn:active {
          transform: translateY(0);
        }

        /* Tabs */
        .tabs-container {
          display: flex;
          gap: 1rem;
          margin: 0 auto 2rem;
          padding: 0;
          max-width: 1200px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 0.75rem;
          transition: margin 0.3s ease;
        }

        .tabs-container::-webkit-scrollbar {
          display: none;
          height: 4px;
        }

        .tabs-container:hover::-webkit-scrollbar {
          display: block;
        }

        .tabs-container::-webkit-scrollbar-track {
          background: rgba(250, 204, 21, 0.1);
          border-radius: 2px;
        }

        .tabs-container::-webkit-scrollbar-thumb {
          background: rgba(250, 204, 21, 0.5);
          border-radius: 2px;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: fit-content;
          white-space: nowrap;
          font-size: 0.95rem;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .tab-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background-color: #facc15;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .tab-btn:hover::after {
          width: 80%;
        }

        .tab-btn.active {
          background-color: #facc15;
          color: #1f2937;
          border-color: #facc15;
          box-shadow: 0 4px 12px rgba(250, 204, 21, 0.3);
          transform: translateY(-2px);
        }

        .tab-btn.active::after {
          width: 0;
        }

        .tab-btn.inactive {
          background-color: transparent;
          color: white;
          border: 2px solid rgba(250, 204, 21, 0.3);
        }

        .tab-btn.inactive:hover {
          background-color: rgba(250, 204, 21, 0.1);
          color: #fde047;
          border-color: rgba(250, 204, 21, 0.5);
          transform: translateY(-1px);
        }

        /* Form Sections */
        .form-section {
          border: 2px solid #facc15;
          border-radius: 0.75rem;
          margin: 0 auto 2.5rem;
          padding: 2rem;
          background-color: #3a3a3a;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #facc15;
          margin-bottom: 2rem;
          letter-spacing: -0.025em;
          transition: font-size 0.3s ease;
        }

        /* Form Grid */
        .form-grid {
          display: grid;
          gap: 1.5rem;
          width: 100%;
          transition: gap 0.3s ease;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          color: white;
          font-weight: 600;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: font-size 0.3s ease;
        }

        .form-input, .form-textarea {
          background-color: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(250, 204, 21, 0.3);
          border-radius: 0.5rem;
          padding: 1rem;
          color: #ffffff;
          font-size: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          font-family: inherit;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #facc15;
          box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.1);
          background-color: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
        }

        .form-textarea {
          resize: none;
          min-height: 120px;
          line-height: 1.5;
        }

        .form-input.dim, .form-textarea.dim {
          opacity: 0.6;
          pointer-events: none;
          border-color: rgba(250, 204, 21, 0.1);
        }

        .form-input:disabled, .form-textarea:disabled {
          color: #9ca3af;
          cursor: not-allowed;
          opacity: 0.5;
        }

        /* Orders Section */
        .order-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .order-card {
          border: 2px solid #facc15;
          border-radius: 0.75rem;
          padding: 1.75rem;
          background-color: #3a3a3a;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        }

        .order-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(250, 204, 21, 0.15);
        }

        .order-content {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .order-image {
          width: 70px;
          height: 70px;
          border-radius: 0.5rem;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .order-image:hover {
          transform: scale(1.05);
        }

        .order-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .order-id {
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.025em;
        }

        .order-date, .order-items {
          color: #d1d5db;
          font-size: 0.9rem;
          margin: 0;
        }

        .order-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .status-badge {
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.3s ease;
          min-width: 120px;
          text-align: center;
        }

        .status-badge.delivered {
          background-color: #10b981;
          color: white;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
        }

        .status-badge.transit {
          background-color: #3b82f6;
          color: white;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .view-details-btn {
          background-color: #facc15;
          color: #1f2937;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          font-size: 0.95rem;
          box-shadow: 0 2px 8px rgba(250, 204, 21, 0.3);
        }

        .view-details-btn:hover {
          background-color: #fde047;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(250, 204, 21, 0.4);
        }

        .view-details-btn:active {
          transform: translateY(0);
        }

        .order-price {
          color: #facc15;
          font-size: 1.375rem;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.025em;
        }

        /* Wishlist */
        .wishlist-grid {
          display: grid;
          gap: 1.75rem;
          transition: grid-template-columns 0.3s ease;
        }

        .wishlist-card {
          border: 2px solid #facc15;
          border-radius: 0.75rem;
          overflow: hidden;
          background-color: #3a3a3a;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .wishlist-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(250, 204, 21, 0.2);
        }

        .wishlist-image-container {
          width: 100%;
          height: 220px;
          overflow: hidden;
          position: relative;
        }

        .wishlist-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .wishlist-card:hover .wishlist-image {
          transform: scale(1.05);
        }

        .wishlist-content {
          padding: 1.5rem;
        }

        .wishlist-product-name {
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.875rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          letter-spacing: -0.025em;
        }

        .wishlist-price {
          color: #facc15;
          font-size: 1.375rem;
          font-weight: 700;
          margin: 0 0 1.25rem 0;
          letter-spacing: -0.025em;
        }

        .wishlist-actions {
          display: flex;
          gap: 0.875rem;
          align-items: center;
        }

        .add-to-cart-btn {
          flex: 1;
          background-color: #facc15;
          color: #1f2937;
          padding: 0.875rem 1.25rem;
          border-radius: 0.5rem;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0.95rem;
          box-shadow: 0 2px 8px rgba(250, 204, 21, 0.3);
        }

        .add-to-cart-btn:hover {
          background-color: #fde047;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(250, 204, 21, 0.4);
        }

        .add-to-cart-btn:active {
          transform: translateY(0);
        }

        .add-to-cart-btn-disabled {
          flex: 1;
          background-color: #52525b;
          color: #9ca3af;
          padding: 0.875rem 1.25rem;
          border-radius: 0.5rem;
          border: none;
          font-weight: 600;
          cursor: not-allowed;
          font-size: 0.95rem;
        }

        .remove-btn {
          background-color: #dc2626;
          color: white;
          width: 44px;
          height: 44px;
          border-radius: 0.5rem;
          border: none;
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
        }

        .remove-btn:hover {
          background-color: #b91c1c;
          transform: scale(1.1);
        }

        .remove-btn:active {
          transform: scale(0.95);
        }

        /* Settings */
        .settings-container {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .settings-card {
          border: 2px solid #facc15;
          border-radius: 0.75rem;
          padding: 1.75rem;
          background-color: #3a3a3a;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .settings-card:hover {
          box-shadow: 0 8px 24px rgba(250, 204, 21, 0.15);
        }

        .settings-card-danger {
          border: 2px solid #dc2626;
          border-radius: 0.75rem;
          padding: 1.75rem;
          background-color: #3a3a3a;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .settings-card-danger:hover {
          box-shadow: 0 8px 24px rgba(220, 38, 38, 0.15);
        }

        .settings-section-title {
          color: white;
          font-size: 1.375rem;
          font-weight: 700;
          margin: 0 0 0.75rem 0;
          letter-spacing: -0.025em;
        }

        .settings-section-title-danger {
          color: #dc2626;
          font-size: 1.375rem;
          font-weight: 700;
          margin: 0 0 0.75rem 0;
          letter-spacing: -0.025em;
        }

        .settings-description {
          color: #9ca3af;
          font-size: 0.95rem;
          margin: 0 0 1.75rem 0;
          line-height: 1.6;
        }

        .update-password-btn, .delete-account-btn {
          padding: 0.875rem 1.75rem;
          border-radius: 0.5rem;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          font-size: 0.95rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .update-password-btn {
          background-color: #facc15;
          color: #1f2937;
        }

        .update-password-btn:hover {
          background-color: #fde047;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(250, 204, 21, 0.4);
        }

        .update-password-btn:active {
          transform: translateY(0);
        }

        .delete-account-btn {
          background-color: #dc2626;
          color: white;
        }

        .delete-account-btn:hover {
          background-color: #b91c1c;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
        }

        .delete-account-btn:active {
          transform: translateY(0);
        }

        .logout-btn {
          background-color: transparent;
          color: white;
          padding: 1rem 1.5rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          justify-content: center;
          margin-top: 1rem;
        }

        .logout-btn:hover {
          color: #facc15;
          border-color: #facc15;
          background-color: rgba(250, 204, 21, 0.1);
          transform: translateY(-2px);
        }

        .logout-btn:active {
          transform: translateY(0);
        }

        /* Empty State */
        .empty-state {
          color: #d1d5db;
          text-align: center;
          padding: 3rem 1rem;
          font-size: 1.1rem;
          line-height: 1.6;
          border-radius: 0.75rem;
          background-color: rgba(255, 255, 255, 0.03);
          border: 2px dashed rgba(250, 204, 21, 0.2);
          transition: all 0.3s ease;
        }

        .empty-state:hover {
          border-color: rgba(250, 204, 21, 0.4);
          background-color: rgba(255, 255, 255, 0.05);
        }

        /* Loading States */
        .loading-container {
          position: relative;
        }

        .loading-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(250, 204, 21, 0.8);
          border-radius: 50%;
          color: #1f2937;
          font-weight: 700;
          font-size: 0.875rem;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        /* Responsive Breakpoints with Smooth Transitions */
        @media (max-width: 1400px) {
          .profile-main {
            padding: 1.75rem;
          }
          
          .profile-card, .form-section {
            padding: 1.75rem;
          }
          
          .wishlist-grid {
            gap: 1.5rem;
          }
        }

        @media (max-width: 1200px) {
          .profile-main {
            padding: 1.5rem;
          }
          
          .profile-card, .form-section {
            padding: 1.5rem;
            margin-bottom: 2rem;
          }
          
          .wishlist-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .avatar {
            width: 110px;
            height: 110px;
          }
          
          .avatar-icon {
            width: 52px;
            height: 52px;
          }
          
          .profile-name {
            font-size: 1.6rem;
          }
        }

        @media (max-width: 1024px) {
          .profile-main {
            padding: 1.25rem;
          }
          
          .profile-card, .form-section {
            padding: 1.5rem;
            border-radius: 0.625rem;
          }
          
          .profile-header {
            gap: 1.5rem;
          }
          
          .profile-info {
            gap: 1.5rem;
          }
          
          .avatar {
            width: 100px;
            height: 100px;
          }
          
          .camera-btn {
            width: 36px;
            height: 36px;
          }
          
          .form-title {
            font-size: 1.375rem;
          }
          
          .tabs-container {
            gap: 0.875rem;
            margin-bottom: 1.75rem;
          }
        }

        @media (max-width: 900px) {
          .profile-container {
            padding-top: 84px;
          }
          
          .profile-main {
            padding: 1.5rem;
          }
          
          .profile-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1.5rem;
          }
          
          .profile-info {
            flex-direction: row;
            align-items: center;
            gap: 1.25rem;
          }
          
          .edit-btn {
            width: 100%;
            justify-content: center;
          }
          
          .form-grid {
            gap: 1.25rem;
          }
          
          .order-card {
            padding: 1.5rem;
          }
          
          .wishlist-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
        }

        @media (max-width: 768px) {
          .profile-container {
            padding-top: 76px;
          }
          
          .profile-main {
            padding: 1.25rem;
          }
          
          .profile-card, .form-section {
            padding: 1.5rem;
            margin-bottom: 1.75rem;
          }
          
          .profile-info {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.5rem;
          }
          
          .profile-details {
            align-items: center;
            text-align: center;
          }
          
          .avatar {
            width: 100px;
            height: 100px;
          }
          
          .avatar-icon {
            width: 48px;
            height: 48px;
          }
          
          .profile-name {
            font-size: 1.5rem;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .tabs-container {
            margin-bottom: 1.5rem;
          }
          
          .tab-btn {
            padding: 0.75rem 1rem;
          }
          
          .order-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          
          .view-details-btn, .order-price {
            width: 100%;
            text-align: center;
          }
          
          .wishlist-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .profile-container {
            padding-top: 72px;
          }
          
          .profile-main {
            padding: 1rem;
          }
          
          .profile-card, .form-section {
            padding: 1.25rem;
            margin-bottom: 1.5rem;
            border-radius: 0.5rem;
          }
          
          .profile-name {
            font-size: 1.375rem;
          }
          
          .profile-email {
            font-size: 0.95rem;
          }
          
          .avatar {
            width: 90px;
            height: 90px;
          }
          
          .avatar-icon {
            width: 44px;
            height: 44px;
          }
          
          .camera-btn {
            width: 34px;
            height: 34px;
          }
          
          .camera-icon {
            width: 16px;
            height: 16px;
          }
          
          .wishlist-image-container {
            height: 200px;
          }
          
          .form-title {
            font-size: 1.25rem;
          }
          
          .settings-card, .settings-card-danger {
            padding: 1.25rem;
          }
          
          .status-badge {
            align-self: flex-start;
            min-width: 110px;
          }
          
          .edit-btn, .update-password-btn, .delete-account-btn, .view-details-btn, .add-to-cart-btn {
            padding: 0.75rem 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .profile-container {
            padding-top: 68px;
          }
          
          .profile-main {
            padding: 0.875rem;
          }
          
          .profile-card, .form-section {
            padding: 1rem;
            margin-bottom: 1.25rem;
          }
          
          .avatar {
            width: 80px;
            height: 80px;
          }
          
          .avatar-icon {
            width: 40px;
            height: 40px;
          }
          
          .camera-btn {
            width: 32px;
            height: 32px;
            padding: 0.4rem;
          }
          
          .camera-icon {
            width: 14px;
            height: 14px;
          }
          
          .profile-name {
            font-size: 1.25rem;
          }
          
          .profile-email {
            font-size: 0.9rem;
          }
          
          .profile-member {
            font-size: 0.8125rem;
          }
          
          .tab-btn {
            padding: 0.625rem 0.875rem;
            font-size: 0.875rem;
            gap: 0.5rem;
          }
          
          .order-content {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .wishlist-product-name {
            font-size: 1rem;
          }
          
          .wishlist-price {
            font-size: 1.25rem;
          }
          
          .form-input, .form-textarea {
            padding: 0.875rem;
            font-size: 0.95rem;
          }
          
          .empty-state {
            font-size: 1rem;
            padding: 2rem 1rem;
          }
        }

        @media (max-width: 360px) {
          .profile-main {
            padding: 0.75rem;
          }
          
          .profile-card, .form-section {
            padding: 0.875rem;
          }
          
          .avatar {
            width: 70px;
            height: 70px;
          }
          
          .profile-name {
            font-size: 1.125rem;
          }
          
          .tab-btn {
            padding: 0.5rem;
            font-size: 0.8125rem;
          }
          
          .update-password-btn, .delete-account-btn, .view-details-btn, .add-to-cart-btn {
            padding: 0.625rem 1rem;
            font-size: 0.875rem;
          }
          
          .remove-btn {
            width: 40px;
            height: 40px;
          }
          
          .order-image {
            width: 60px;
            height: 60px;
          }
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1rem;
          animation: fadeIn 0.3s ease;
          backdrop-filter: blur(4px);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: linear-gradient(145deg, #3a3a3a, #323232);
          padding: 2rem;
          border-radius: 1rem;
          width: 100%;
          max-width: 400px;
          border: 2px solid #facc15;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-danger {
          border-color: #dc2626;
        }

        .modal-title {
          color: white;
          margin-bottom: 1.25rem;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .modal-text {
          color: #d1d5db;
          margin-bottom: 2rem;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .modal-buttons {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        @media (max-width: 480px) {
          .modal-content {
            padding: 1.5rem;
            border-radius: 0.75rem;
          }
          
          .modal-title {
            font-size: 1.25rem;
          }
          
          .modal-buttons {
            flex-direction: column;
          }
          
          .modal-buttons button {
            width: 100%;
          }
        }
      `}</style>

      <div className="profile-container">
        <main className="profile-main">
          {/* Profile Header */}
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-info">
                <div className="avatar-container">
                  <div className="avatar">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                          opacity: uploading ? 0.6 : 1,
                        }}
                      />
                    ) : user.profileImage?.url ? (
                      <img
                        src={user.profileImage.url}
                        alt="Profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <User className="avatar-icon" />
                    )}

                    {uploading && (
                      <div className="loading-overlay">
                        Uploading...
                      </div>
                    )}
                  </div>

                  <button
                    className="camera-btn"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Camera className="camera-icon" />
                  </button>

                  <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="profile-details">
                  <h1 className="profile-name">{user.name}</h1>
                  <p className="profile-email">{user.email}</p>
                  {user.address && (
                    <p className="profile-email">{user.address}</p>
                  )}
                  <p className="profile-member">
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <button
                className="edit-btn"
                onClick={async () => {
                  if (isEditing) {
                    try {
                      const res = await api.put(
                        "/api/auth/update-profile",
                        formData,
                      );

                      toast.success("Profile updated successfully");

                      setUser(res.data.user);
                      setFormData({
                        name: res.data.user.name || "",
                        phone: res.data.user.phone || "",
                        address: res.data.user.address || "",
                      });
                      setIsEditing(false);
                    } catch (err) {
                      toast.error(
                        err.response?.data?.message ||
                          "Failed to update profile",
                      );
                    }
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
                <Edit size={20} />
                {isEditing ? "Save Profile" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-container">
            <button
              onClick={() => setActiveTab("profile")}
              className={`tab-btn ${activeTab === "profile" ? "active" : "inactive"}`}
            >
              <User size={20} />
              Profile
            </button>

            <button
              onClick={() => {
                setActiveTab("orders");
                fetchMyOrders();
              }}
              className={`tab-btn ${activeTab === "orders" ? "active" : "inactive"}`}
            >
              <Package size={20} />
              Orders
            </button>

            <button
              onClick={() => {
                setActiveTab("wishlist");
                fetchWishlist();
              }}
              className={`tab-btn ${activeTab === "wishlist" ? "active" : "inactive"}`}
            >
              <Heart size={20} />
              Wishlist
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`tab-btn ${activeTab === "settings" ? "active" : "inactive"}`}
            >
              <Settings size={20} />
              Settings
            </button>
          </div>

          {/* Personal Information */}
          {activeTab === "profile" && (
            <div className="form-section">
              <h2 className="form-title">Personal Information</h2>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    className={`form-input ${!isEditing ? "dim" : ""}`}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    value={user.email}
                    placeholder="Enter your Email"
                    className={`form-input ${!isEditing ? "dim" : ""}`}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder=""
                    className={`form-input ${!isEditing ? "dim" : ""}`}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Member Since</label>
                  <input
                    type="text"
                    value={new Date(user.createdAt).toLocaleDateString()}
                    placeholder=""
                    disabled
                    className={`form-input ${!isEditing ? "dim" : ""}`}
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Shipping Address</label>
                  <textarea
                    rows="3"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Update your address"
                    className={`form-textarea ${!isEditing ? "dim" : ""}`}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div className="form-section">
              <h2 className="form-title">Order History</h2>

              {ordersLoading ? (
                <p className="empty-state">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="empty-state">
                  You haven't placed any orders yet.
                </p>
              ) : (
                <div className="order-list">
                  {orders.map((order) => (
                    <div className="order-card" key={order._id}>
                      <div className="order-content">
                        <div
                          style={{
                            display: "flex",
                            gap: "12px",
                            flexWrap: "wrap",
                          }}
                        >
                          {order.orderItems.map((item, idx) => (
                            <div key={idx} style={{ textAlign: "center" }}>
                              <img
                                src={
                                  item.image?.url ||
                                  item.image ||
                                  "/images/Product1.png"
                                }
                                alt={item.name}
                                className="order-image"
                              />
                              <p
                                style={{
                                  fontSize: "12px",
                                  marginTop: "6px",
                                  color: "#d1d5db",
                                }}
                              >
                                {item.name}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="order-details">
                          <p className="order-date">
                            Ordered on{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <p className="order-items">
                            {order.orderItems.length} item(s)
                          </p>
                        </div>
                      </div>

                      <div className="order-actions">
                        <span
                          className={`status-badge ${
                            order.paymentStatus === "pending"
                              ? "transit"
                              : order.orderStatus === "delivered"
                                ? "delivered"
                                : "transit"
                          }`}
                        >
                          {order.paymentStatus === "pending"
                            ? "Payment Pending"
                            : order.orderStatus}
                        </span>

                        <button
                          className="view-details-btn"
                          onClick={() => navigate(`/orders/${order._id}`)}
                        >
                          View Details
                        </button>

                        {order.paymentStatus === "pending" &&
                          order.isVisible && (
                            <button
                              className="view-details-btn"
                              onClick={() => navigate(`/orders/${order._id}`)}
                            >
                              Retry Payment
                            </button>
                          )}

                        <p className="order-price">₹{order.totalAmount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wishlist */}
          {activeTab === "wishlist" && (
            <div className="form-section">
              <h2 className="form-title">My Wishlist</h2>

              {wishlistLoading ? (
                <p className="empty-state">Loading wishlist...</p>
              ) : wishlist.length === 0 ? (
                <p className="empty-state">Your wishlist is empty.</p>
              ) : (
                <div className="wishlist-grid">
                  {wishlist.map((item) => (
                    <div className="wishlist-card" key={item._id}>
                      <div className="wishlist-image-container">
                        <img
                          src={item.images?.[0]?.url}
                          alt={item.name}
                          className="wishlist-image"
                        />
                      </div>

                      <div className="wishlist-content">
                        <h3 className="wishlist-product-name">{item.name}</h3>
                        <p className="wishlist-price">₹{item.price}</p>

                        <div className="wishlist-actions">
                          {item.countInStock > 0 ? (
                            <button
                              className="add-to-cart-btn"
                              onClick={() => handleAddToCart(item._id)}
                            >
                              Add to Cart
                            </button>
                          ) : (
                            <button
                              className="add-to-cart-btn-disabled"
                              disabled
                            >
                              Out of Stock
                            </button>
                          )}

                          <button
                            className="remove-btn"
                            onClick={async () => {
                              try {
                                await api.delete(`/api/wishlist/${item._id}`);
                                toast.success("Removed from wishlist");
                                fetchWishlist();
                              } catch {
                                toast.error("Failed to remove item");
                              }
                            }}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <div className="form-section">
              <h2 className="form-title">Account Settings</h2>

              <div className="settings-container">
                <div className="settings-card">
                  <h3 className="settings-section-title">Change Password</h3>
                  <p className="settings-description">
                    Update your password to keep your account secure
                  </p>
                  <button
                    className="update-password-btn"
                    onClick={() => {
                      setCurrentPassword("");
                      setNewPassword("");
                      setShowCurrentPassword(false);
                      setShowNewPassword(false);
                      setShowPasswordModal(true);
                    }}
                  >
                    Update Password
                  </button>
                </div>

                <div className="settings-card-danger">
                  <h3 className="settings-section-title-danger">
                    Delete Account
                  </h3>
                  <p className="settings-description">
                    Permanently delete your account and all associated data
                  </p>
                  <button
                    className="delete-account-btn"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Account
                  </button>
                </div>

                <button className="logout-btn" onClick={logout}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Update Password</h3>

            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="form-input"
                style={{ paddingRight: "50px" }}
              />

              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#facc15",
                  fontSize: "1.2rem",
                  transition: "transform 0.2s ease",
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}
              >
                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-input"
                style={{ paddingRight: "50px" }}
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#facc15",
                  fontSize: "1.2rem",
                  transition: "transform 0.2s ease",
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div style={{ position: "relative", marginBottom: "2rem" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                style={{ paddingRight: "50px" }}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#facc15",
                  fontSize: "1.2rem",
                  transition: "transform 0.2s ease",
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="modal-buttons">
              <button
                className="delete-account-btn"
                onClick={() => {
                  setShowPasswordModal(false);
                  setShowCurrentPassword(false);
                  setShowNewPassword(false);
                  setShowConfirmPassword(false);
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
              >
                Cancel
              </button>

              <button
                className="update-password-btn"
                onClick={async () => {
                  if (newPassword !== confirmPassword) {
                    toast.error(
                      "New password and confirm password do not match",
                    );
                    return;
                  }

                  try {
                    await api.put("/api/auth/update-password", {
                      currentPassword,
                      newPassword,
                    });

                    toast.success("Password updated successfully");
                    setShowPasswordModal(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setShowCurrentPassword(false);
                    setShowNewPassword(false);
                    setShowConfirmPassword(false);
                  } catch (err) {
                    toast.error(
                      err.response?.data?.message ||
                        "Failed to update password",
                    );
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content modal-danger">
            <h3 className="modal-title">Delete Account</h3>
            <p className="modal-text">
              Are you sure you want to permanently delete your account? This
              action <b>cannot be undone</b>.
            </p>

            <div className="modal-buttons">
              <button
                className="update-password-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="delete-account-btn"
                onClick={async () => {
                  try {
                    await api.delete("/api/auth/delete-me");
                    toast.success("Account deleted successfully");
                    navigate("/signup");
                  } catch {
                    toast.error("Failed to delete account");
                  }
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}