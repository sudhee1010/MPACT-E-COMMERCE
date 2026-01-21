import React, { useState, useEffect } from 'react';
import { User, Package, Heart, Settings, Edit, Search, UserCircle, ShoppingCart, Camera, Eye, EyeOff } from 'lucide-react';
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
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



  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/auth/profile");
        setUser(res.data);
        setFormData({
          name: res.data.name || "",
          phone: res.data.phone || "",
          address: res.data.address || ""
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

  //fetching orders
  const fetchMyOrders = async () => {
    try {
      setOrdersLoading(true);
      const res = await api.get("/api/orders/my-orders");
      setOrders(res.data);   // assuming backend returns array
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
      setWishlist(res.data.wishlist);   // assuming backend returns wishlist array
    } catch (error) {
      toast.error("Failed to load wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };




  if (loading) {
    return <div style={{ color: "white", textAlign: "center", marginTop: "5rem" }}>
      Loading profile...
    </div>;
  }

  if (!user) return null;



  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .profile-header {
            flex-direction: column;
            text-align: center;
          }
          .profile-info {
            flex-direction: column;
            align-items: center;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
          .tab-text-full {
            display: none;
          }
          .tab-text-short {
            display: inline;
          }
        }

        @media (min-width: 769px) {
          .nav-links {
            display: flex;
          }
          .profile-header {
            flex-direction: row;
            align-items: start;
          }
          .profile-info {
            flex-direction: row;
            align-items: start;
          }
          .form-grid {
            grid-template-columns: 1fr 1fr;
          }
          .tab-text-full {
            display: inline;
          }
          .tab-text-short {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .header-container {
            padding: 1rem;
          }
          .main-content {
            padding: 1rem;
          }
          .profile-card {
            padding: 1.5rem;
          }
          .form-section {
            padding: 1.5rem;
          }
          .profile-name {
            font-size: 1.5rem;
          }
          .avatar {
            width: 96px;
            height: 96px;
          }
          .avatar-icon {
            width: 40px;
            height: 40px;
          }
        }

        @media (min-width: 641px) {
          .header-container {
            padding: 1rem 2rem;
          }
          .main-content {
            padding: 2rem;
          }
          .profile-card {
            padding: 2rem;
          }
          .form-section {
            padding: 2rem;
          }
          .profile-name {
            font-size: 1.875rem;
          }
          .avatar {
            width: 128px;
            height: 128px;
          }
          .avatar-icon {
            width: 48px;
            height: 48px;
          }
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .container {
          min-height: 100vh;
          background-color: #323232;
        }

        .header {
          background-color: #facc15;
          position: relative;
        }

        .header-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-size: 2rem;
          font-weight: bold;
          color: #1f2937;
          letter-spacing: -0.025em;
        }

        .nav-links {
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          color: #1f2937;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #374151;
        }

        .header-icons {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .icon-btn {
          background: none;
          border: none;
          color: #1f2937;
          cursor: pointer;
          padding: 0.5rem;
          transition: color 0.2s;
        }

        .icon-btn:hover {
          color: #374151;
        }

        .main-content {
          max-width: 1280px;
          margin: 0 auto;
        }

        .profile-card {
          border: 2px solid #facc15;
          border-radius: 0.5rem;
          margin-bottom: 2rem;
          margin-top:1.3rem;
          margin-left:1rem;
          margin-right:1rem;
          margin-top:1rem;
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .profile-info {
          display: flex;
          gap: 1.5rem;
        }

        .avatar-container {
          position: relative;
        }

        .avatar {
          background-color: #facc15;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-icon {
          color: #1f2937;
        }

        .camera-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          background-color: #facc15;
          border:none;
          border-radius: 50%;
          padding: 0.5rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .camera-btn:hover {
          background-color: #fde047;
        }

        .camera-icon {
          color: #1f2937;
          width: 16px;
          height: 16px;
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top:1.5rem;
        }

        .profile-name {
          font-weight: bold;
          color: white;
          margin-bottom: 0.5rem;
        }

        .profile-email {
          color: #d1d5db;
          margin-bottom: 0.25rem;
          font-size:0.865rem;
        }

        .profile-member {
          color: #9ca3af;
          font-size: 0.8rem;
        
        }

        .edit-btn {
          background-color: #facc15;
          color: #1f2937;
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          border: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: background-color 0.2s;
          white-space: nowrap;
          height: fit-content;
        }

        .edit-btn:hover {
          background-color: #fde047;
        }

        .tabs-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          margin-left:1rem;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1rem;
          border-radius: 0.375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background-color: #facc15;
          color: #1f2937;
          border: none;
        }

        .tab-btn.inactive {
          background-color: transparent;
          color: white;
          border: 2px solid #facc15;
        }

        .tab-btn.inactive:hover {
          background-color: #facc15;
          color: #1f2937;
        }

        .form-section {
          border: 2px solid #facc15;
          border-radius: 0.5rem;
          margin-left:1rem;
          margin-right:1rem;
          padding:1rem;
          max-width:1200px;
        }

        .form-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: #facc15;
          margin-bottom: 1.5rem;

        }

        .form-grid {
          display: grid;
          gap: 1rem;
          max-width:1100px;
          margin-left:1rem;
          margin-bottom:1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          color: white;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size:0.875rem;
        }

        .form-input {
          background-color: transparent;
          border: 2px solid #facc15;
          border-radius: 0.375rem;
          padding: 0.75rem 1rem;
          color: #d1d5db;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .form-input.dim {
          opacity: 0.4;
          pointer-events: none;
        }

        .form-input:focus {
          outline: none;
          border-color: #fde047;
        }

        .form-input:disabled {
          color: #9ca3af;
          cursor: not-allowed;
        }

        .form-textarea {
          background-color: transparent;
          border: 2px solid #facc15;
          border-radius: 0.375rem;
          padding: 0.75rem 1rem;
          color: #d1d5db;
          font-size: 1rem;
          resize: none;
          font-family: inherit;
          transition: all 0.2s;
        }

        .form-textarea.dim {
          opacity: 0.4;
          pointer-events: none;
        }

        .form-textarea:focus {
          outline: none;
          border-color: #fde047;
        }

        .empty-state {
          color: #d1d5db;
        }
          .order-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card {
  border: 2px solid #facc15;
  border-radius: 0.5rem;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap:1rem;
  flex-wrap: wrap;
}

.order-content {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex: 1;
}

.order-image {
  width: 80px;
  height: 80px;
  border-radius: 0.5rem;
  object-fit: cover;
}

.order-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.order-id {
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.order-date {
  color: #9ca3af;
  font-size: 0.875rem;
  margin: 0;
}

.order-items {
  color: #d1d5db;
  font-size: 0.875rem;
  margin: 0;
}

.order-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-badge.delivered {
  background-color: #10b981;
  color: white;
}

.status-badge.transit {
  background-color: #3b82f6;
  color: white;
}

.view-details-btn {
  background-color: #facc15;
  color: #1f2937;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.view-details-btn:hover {
  background-color: #fde047;
}

.order-price {
  color: #facc15;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}

@media (max-width: 768px) {
  .order-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .order-actions {
    width: 100%;
    justify-content: space-between;
  }

  .order-image {
    width: 60px;
    height: 60px;
  }
}
.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.wishlist-card {
  border: 2px solid #facc15;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #3e3e44;
}

.wishlist-image-container {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.wishlist-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wishlist-content {
  padding: 1.5rem;
}

.wishlist-product-name {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.wishlist-price {
  color: #facc15;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
}

.wishlist-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.add-to-cart-btn {
  flex: 1;
  background-color: #facc15;
  color: #1f2937;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-to-cart-btn:hover {
  background-color: #fde047;
}

.add-to-cart-btn-disabled {
  flex: 1;
  background-color: #52525b;
  color: #9ca3af;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 600;
  cursor: not-allowed;
}

.remove-btn {
  background-color: #dc2626;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 0.375rem;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background-color: #b91c1c;
}

@media (max-width: 1024px) {
  .wishlist-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .wishlist-grid {
    grid-template-columns: 1fr;
  }
}
  .settings-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.settings-card {
  border: 2px solid #facc15;
  border-radius: 0.5rem;
  padding: 2rem;
  background-color: #52525b;
}

.settings-card-danger {
  border: 2px solid #dc2626;
  border-radius: 0.5rem;
  padding: 2rem;
  background-color: #52525b;
}

.settings-section-title {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.settings-section-title-danger {
  color: #dc2626;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.settings-description {
  color: #9ca3af;
  font-size: 0.875rem;
  margin: 0 0 1.5rem 0;
}

.update-password-btn {
  background-color: #facc15;
  color: #1f2937;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.update-password-btn:hover {
  background-color: #fde047;
}

.notification-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notification-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.notification-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #facc15;
}

.notification-label {
  color: white;
  font-weight: 600;
  font-size: 1rem;
}

.delete-account-btn {
  background-color: #dc2626;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-account-btn:hover {
  background-color: #b91c1c;
}

.logout-btn {
  background-color: transparent;
  color: white;
  padding: 1rem;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
}

.logout-btn:hover {
  color: #facc15;
}

.logout-btn span {
  font-size: 1.25rem;
}

      `}</style>

      <div className="container">
        {/* Main Content */}
        <main className="main-content">
          {/* Profile Header */}
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-info">
                <div className="avatar-container">
                  <div className="avatar">
                    <User className="avatar-icon" />
                  </div>
                  <button className="camera-btn">
                    <Camera className="camera-icon" />
                  </button>
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

              {/* <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
                <Edit size={18} />
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </button> */}
              <button
                className="edit-btn"
                onClick={async () => {
                  if (isEditing) {
                    // SAVE PROFILE
                    try {
                      const res = await api.put("/api/auth/update-profile", formData);

                      toast.success("Profile updated successfully");

                      setUser(res.data.user);
                      setFormData({
                        name: res.data.user.name || "",
                        phone: res.data.user.phone || "",
                        address: res.data.user.address || "",
                      });
                      setIsEditing(false);

                    } catch (err) {
                      toast.error(err.response?.data?.message || "Failed to update profile");
                    }
                  } else {
                    // ENTER EDIT MODE
                    setIsEditing(true);
                  }
                }}
              >
                <Edit size={18} />
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </button>

            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-container">
            <button
              onClick={() => setActiveTab('profile')}
              className={`tab-btn ${activeTab === 'profile' ? 'active' : 'inactive'}`}
            >
              <User size={18} />
              <span className="tab-text-full">Profile Info</span>
              <span className="tab-text-short">Profile</span>
            </button>

            {/* <button
              onClick={() => setActiveTab('orders')}
              className={`tab-btn ${activeTab === 'orders' ? 'active' : 'inactive'}`}
            > */}
            <button
              onClick={() => {
                setActiveTab('orders');
                fetchMyOrders();
              }}
              className={`tab-btn ${activeTab === 'orders' ? 'active' : 'inactive'}`}
            >

              <Package size={18} />
              <span className="tab-text-full">My Orders</span>
              <span className="tab-text-short">Orders</span>
            </button>

            {/* <button
              onClick={() => setActiveTab('wishlist')}
              className={`tab-btn ${activeTab === 'wishlist' ? 'active' : 'inactive'}`}
            > */}
            <button
              onClick={() => {
                setActiveTab('wishlist');
                fetchWishlist();
              }}
              className={`tab-btn ${activeTab === 'wishlist' ? 'active' : 'inactive'}`}
            >

              <Heart size={18} />
              Wishlist
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`tab-btn ${activeTab === 'settings' ? 'active' : 'inactive'}`}
            >
              <Settings size={18} />
              Settings
            </button>
          </div>

          {/* Personal Information Form */}
          {activeTab === 'profile' && (
            <div className="form-section">
              <h2 className="form-title">Personal Information</h2>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className={`form-input ${!isEditing ? 'dim' : ''}`}
                    disabled={!isEditing}

                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    value={user.email}
                    placeholder="Enter your Email"
                    className={`form-input ${!isEditing ? 'dim' : ''}`}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder=""
                    className={`form-input ${!isEditing ? 'dim' : ''}`}
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
                    className={`form-input ${!isEditing ? 'dim' : ''}`}
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Shipping Address</label>
                  <textarea
                    rows="3"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Update your address"
                    className={`form-textarea ${!isEditing ? 'dim' : ''}`}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          )}


          {activeTab === 'orders' && (
            <div className="form-section">
              <h2 className="form-title">Order History</h2>

              {ordersLoading ? (
                <p className="empty-state">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="empty-state">You have no orders.</p>
              ) : (
                <div className="order-list">
                  {orders.map((order) => (
                    <div className="order-card" key={order._id}>
                      <div className="order-content">
                        <img
                          src={order.items[0]?.product?.image}
                          alt="Product"
                          className="order-image"
                        />

                        <div className="order-details">
                          <h3 className="order-id">#{order._id}</h3>
                          <p className="order-date">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <p className="order-items">{order.items.length} items</p>
                        </div>
                      </div>

                      <div className="order-actions">
                        <span className={`status-badge ${order.status === "Delivered" ? "delivered" : "transit"}`}>
                          {order.status}
                        </span>
                        <button className="view-details-btn">View Details</button>
                        <p className="order-price">₹{order.totalPrice}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}



          {activeTab === 'wishlist' && (
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
                            <button className="add-to-cart-btn">
                              Add to Cart
                            </button>
                          ) : (
                            <button className="add-to-cart-btn-disabled" disabled>
                              Out of Stock
                            </button>
                          )}

                          <button
                            className="remove-btn"
                            onClick={async () => {
                              try {
                                await api.delete(`/api/wishlist/${item._id}`);
                                toast.success("Removed from wishlist");
                                fetchWishlist(); // refresh list
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




          {activeTab === 'settings' && (
            <div className="form-section">
              <h2 className="form-title">Account Settings</h2>

              <div className="settings-container">
                {/* Change Password Section */}
                <div className="settings-card">
                  <h3 className="settings-section-title">Change Password</h3>
                  <p className="settings-description">Update your password to keep your account secure</p>
                  {/* <button className="update-password-btn">Update Password</button> */}
                  <button
                    className="update-password-btn"
                    // onClick={() => setShowPasswordModal(true)}
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

                {/* Email Notifications Section */}
                {/* <div className="settings-card">
                  <h3 className="settings-section-title">Email Notifications</h3>

                  <div className="notification-options">
                    <label className="notification-item">
                      <input type="checkbox" defaultChecked className="notification-checkbox" />
                      <span className="notification-label">Order updates</span>
                    </label>

                    <label className="notification-item">
                      <input type="checkbox" defaultChecked className="notification-checkbox" />
                      <span className="notification-label">Promotional emails</span>
                    </label>

                    <label className="notification-item">
                      <input type="checkbox" className="notification-checkbox" />
                      <span className="notification-label">Newsletter</span>
                    </label>
                  </div>
                </div> */}

                {/* Delete Account Section */}
                <div className="settings-card-danger">
                  <h3 className="settings-section-title-danger">Delete Account</h3>
                  <p className="settings-description">Permanently delete your account and all associated data</p>
                  {/* <button className="delete-account-btn">Delete Account</button> */}
                  <button
                    className="delete-account-btn"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Account
                  </button>


                </div>
                {/* Log Out */}
                <button
                  className="logout-btn"
                  onClick={async () => {
                    try {
                      await api.post("/api/auth/logout"); // backend clears cookie
                      toast.success("Logged out successfully");
                      navigate("/");
                    } catch {
                      toast.error("Logout failed");
                    }
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

      {showPasswordModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "#3e3e44",
            padding: "2rem",
            borderRadius: "8px",
            width: "350px",
            border: "2px solid #facc15"
          }}>
            <h3 style={{ color: "white", marginBottom: "1rem" }}>Update Password</h3>

            {/* <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="form-input"
              style={{ marginBottom: "1rem" }}
            /> */}
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="form-input"
                style={{ paddingRight: "40px" }}
              />

              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#facc15",
                  fontSize: "1.1rem"
                }}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>


            {/* <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input"
              style={{ marginBottom: "1rem" }}
            /> */}
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-input"
                style={{ paddingRight: "40px" }}
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#facc15",
                  fontSize: "1.1rem"
                }}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                style={{ paddingRight: "40px" }}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#facc15",
                  fontSize: "1.1rem"
                }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>



            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                type="button"
                className="update-password-btn"
                onClick={async () => {
                  if (newPassword !== confirmPassword) {
                    toast.error("New password and confirm password do not match");
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
                    toast.error(err.response?.data?.message || "Failed to update password");
                  }
                }}
              >
                Save
              </button>


              <button
                type="button"
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


            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "#3e3e44",
            padding: "2rem",
            borderRadius: "10px",
            width: "380px",
            border: "2px solid #dc2626"
          }}>
            <h3 style={{ color: "#dc2626", marginBottom: "0.75rem" }}>
              Delete Account
            </h3>

            <p style={{ color: "#d1d5db", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
              Are you sure you want to permanently delete your account?
              This action <b>cannot be undone</b>.
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
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
                    navigate("/signup"); // or home
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