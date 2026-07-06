import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { addToCartApi } from "../api/cartApi";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const { refreshCart, setOpenSideCart } = useCart();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= FETCH WISHLIST ================= */
  useEffect(() => {
    setLoading(true);
    api
      .get("/api/wishlist")
      .then((res) => {
        setWishlist(res.data.wishlist || []);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setWishlist([]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  const handleAddToCart = async (productId) => {
    try {
      await addToCartApi(productId, 1);
      await api.post("/api/wishlist/toggle", { productId });
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      await refreshCart();
      setOpenSideCart(true);
      toast.success("Product moved to cart");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Please login to add to cart"
      );
    }
  };


  /* ================= REMOVE FROM WISHLIST ================= */
  const removeFromWishlist = async (productId) => {
    try {
      await api.post("/api/wishlist/toggle", { productId });
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) { }
  };

  return (
    <>
      <style>{`
        /* ================= RESET ================= */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* ================= PAGE WRAPPER ================= */
        .wishlist-page {
          min-height: 100vh;
          background: #1b1b1b;
          padding-top: 35px;
        }

        /* ================= MAIN LAYOUT ================= */
        .main-content {
          max-width: 1800px;
          margin: auto;
          padding: clamp(16px, 4vw, 60px);
        }

        .content-wrapper {
          width: 100%;
        }

        /* ================= TITLE ================= */
        .title-heading {
          text-align: center;
          font-family: "Jersey 25", cursive;
          font-size: clamp(32px, 6vw, 72px);
          font-weight: 400;
          margin: 24px 0 10px;
          color: black;
          -webkit-text-stroke: 2px #ffeb00;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
        }

        .subtitle {
          text-align: center;
          color: #d1d5db;
          margin-bottom: 40px;
        }

        /* ================= EMPTY STATE ================= */
        .empty-state {
          margin-top: 100px;
          text-align: center;
          color: #9ca3af;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
        }

        .empty-state svg {
          margin-bottom: 24px;
          opacity: 0.7;
        }

        .empty-state h2 {
          margin: 0 0 16px 0;
          color: #ffffff;
          font-size: 1.75rem;
          font-weight: 600;
          line-height: 1.2;
        }

        .empty-state p {
          margin: 0;
          color: #9ca3af;
          font-size: 1.125rem;
          max-width: 500px;
          line-height: 1.6;
          text-align: center;
        }

        @media (max-width: 768px) {
          .empty-state {
            margin-top: 60px;
            padding: 0 16px;
          }
          .empty-state svg {
            margin-bottom: 20px;
          }
          .empty-state h2 {
            font-size: 1.5rem;
            margin-bottom: 12px;
          }
          .empty-state p {
            font-size: 1rem;
            max-width: 400px;
          }
        }

        @media (max-width: 480px) {
          .empty-state {
            margin-top: 40px;
          }
          .empty-state svg {
            width: 60px;
            height: 60px;
            margin-bottom: 16px;
          }
          .empty-state h2 {
            font-size: 1.25rem;
            margin-bottom: 10px;
          }
          .empty-state p {
            font-size: 0.875rem;
            max-width: 300px;
          }
        }

        /* ================= PRODUCT GRID ================= */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 291.51px));
          gap: 18px;
          justify-content: center;
          max-width: 1380px;
          margin: 30px auto;
          padding: 0 8px;
        }

        /* ================= PRODUCT CARD ================= */
        .product-card {
          width: 100%;
          height: auto;
          min-height: 600px;
          background: #151515;
          border: 1.34px solid #ffeb00;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          cursor: pointer;
        }

        .product-card:hover {
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
          transform: translateY(-6px);
        }

        /* ================= DISCOUNT BADGE ================= */
        .discount-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #ff0000;
          color: #ffffff;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: 800;
          border-radius: 8px;
          z-index: 2;
        }

        .discount-badge.hide {
          visibility: hidden;
        }

        .discount-badge.show {
          visibility: visible;
        }

        /* ================= WISHLIST HEART ================= */
        .favorite-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 40px;
          height: 40px;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid #ffeb00;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 3;
          transition: all 0.3s ease;
        }

        .favorite-btn svg {
          width: 20px;
          height: 20px;
          stroke: #ffeb00;
          fill: none;
        }

        .favorite-btn.active {
          background: #ffeb00;
        }

        .favorite-btn.active svg {
          fill: #ff0000;
          stroke: #ff0000;
        }

        .favorite-btn:hover {
          transform: scale(1.1);
          background: rgba(255, 235, 0, 0.2);
        }

        /* ================= IMAGE ================= */
        .product-image-container {
          width: 100%;
          height: 360px;
          overflow: hidden;
        }

        .product-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .product-card:hover img {
          transform: scale(1.06);
        }

        /* ================= TITLE ================= */
        .product-title {
          font-size: 14px;
          font-weight: 800;
          line-height: 1.3;
          color: #ffffff;
          padding: 12px 12px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ================= SPECS ================= */
        .specs {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 6px 12px;
        }

        .spec {
          font-size: 10px;
          border: 1px solid #ffeb00;
          padding: 3px 6px;
          border-radius: 4px;
          color: #ffeb00;
          white-space: nowrap;
        }

        /* ================= RATING ================= */
        .rating {
          color: #ffeb00;
          font-size: 12px;
          font-weight: 600;
          padding: 0 12px;
        }

        .reviews {
          color: #aaa;
          font-size: 12px;
          padding: 0 12px;
        }

        /* ================= PRICE ================= */
        .price-box {
          padding: 6px 12px 0;
        }

        .old-price {
          font-size: 12px;
          color: #888;
          text-decoration: line-through;
        }

        .price {
          padding: 0 12px;
          font-size: 20px;
          color: #4caf50;
          font-weight: 800;
          margin-top: auto;
        }

        /* ================= ACTION BUTTON ================= */
        .action-buttons {
          padding: 12px;
          margin-top: auto;
        }

        .add-to-cart-btn {
          width: 100%;
          height: 48px;
          background: transparent;
          color: #ffffff;
          border: 2px solid #ffeb00;
          border-radius: 8px;
          font-family: "Jersey 25", cursive;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease;
        }

        .add-to-cart-btn:hover {
          background: #ffeb00;
          color: #000;
        }

        /* ================= OUT OF STOCK BUTTON ================= */
        .add-to-cart-btn-disabled {
          width: 100%;
          height: 48px;
          background: #2a2a2a;
          color: #9ca3af;
          border: 2px solid #555;
          border-radius: 8px;
          font-family: "Jersey 25", cursive;
          font-size: 15px;
          font-weight: 800;
          cursor: not-allowed;
          opacity: 0.7;
        }

        /* ================= LUXURY LOADER ================= */
        .loader-overlay {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at center, #1a1a1a, #000);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .luxury-loader {
          position: relative;
          text-align: center;
          color: #ffeb00;
        }

        .ring {
          width: 120px;
          height: 120px;
          border: 3px solid transparent;
          border-top: 3px solid #ffeb00;
          border-right: 3px solid #ffeb00;
          border-radius: 50%;
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          animation: spin 1.5s linear infinite;
          filter: drop-shadow(0 0 10px #ffeb00);
        }

        .heart-wrapper {
          color: #ffeb00;
          animation: heartbeat 1.4s infinite ease-in-out;
          filter: drop-shadow(0 0 15px #ffeb00);
        }

        .shimmer-text {
          margin-top: 40px;
          font-family: "Jersey 25", cursive;
          font-size: 26px;
          letter-spacing: 2px;
          background: linear-gradient(90deg, #ffeb00 25%, #ffffff 50%, #ffeb00 75%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2s linear infinite;
        }

        @keyframes spin {
          100% { transform: translateX(-50%) rotate(360deg); }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.25); }
        }

        @keyframes shimmer {
          100% { background-position: 200% center; }
        }

        /* ================= RESPONSIVE: Large tablets / small desktops (1024px–1324px) ================= */
        @media (max-width: 1324px) and (min-width: 1025px) {
          .main-content {
            padding: 32px;
          }

          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 16px;
            max-width: 1200px;
          }

          .product-card {
            min-height: 550px;
          }

          .product-image-container {
            height: 280px;
          }

          .product-title {
            font-size: 13px;
          }

          .price {
            font-size: 18px;
          }

          .add-to-cart-btn,
          .add-to-cart-btn-disabled {
            height: 44px;
            font-size: 14px;
          }
        }

        /* ================= RESPONSIVE: Tablets (max 1024px) ================= */
        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 16px;
          }

          .product-card {
            min-height: 550px;
          }

          .product-image-container {
            height: 280px;
          }
        }

        /* ================= RESPONSIVE: Small tablets / large phones (max 768px) ================= */
        @media (max-width: 768px) {
          .main-content {
            padding: 16px;
          }

          .title-heading {
            margin: 16px 0 10px;
            -webkit-text-stroke: 1.5px #ffeb00;
          }

          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            padding: 0 4px;
            margin: 20px auto;
          }

          .product-card {
            min-height: 400px;
            border-radius: 16px;
          }

          .product-image-container {
            height: 180px;
          }

          .discount-badge {
            top: 8px;
            left: 8px;
            padding: 4px 8px;
            font-size: 11px;
            border-radius: 6px;
          }

          .favorite-btn {
            width: 32px;
            height: 32px;
            top: 8px;
            right: 8px;
          }

          .favorite-btn svg {
            width: 16px;
            height: 16px;
          }

          .product-title {
            font-size: 12px;
            padding: 8px 8px 0;
          }

          /* Hide specs on mobile */
          .specs {
            display: none;
          }

          .rating {
            font-size: 10px;
            padding: 0 8px;
          }

          .reviews {
            font-size: 10px;
            padding: 0 8px;
          }

          .price-box {
            padding: 4px 8px 0;
          }

          .old-price {
            font-size: 10px;
          }

          .price {
            padding: 0 8px;
            font-size: 16px;
          }

          .action-buttons {
            padding: 8px;
            gap: 6px;
          }

          .add-to-cart-btn,
          .add-to-cart-btn-disabled {
            height: 36px;
            font-size: 11px;
            border-radius: 6px;
          }
        }

        /* ================= RESPONSIVE: Small phones (max 480px) ================= */
        @media (max-width: 480px) {
          .main-content {
            padding: 12px;
          }

          .title-heading {
            -webkit-text-stroke: 1px #ffeb00;
          }

          .product-grid {
            gap: 8px;
            padding: 0 4px;
          }

          .product-card {
            min-height: 340px;
            border-radius: 12px;
            border-width: 1px;
          }

          .product-image-container {
            height: 150px;
          }

          .discount-badge {
            padding: 3px 6px;
            font-size: 9px;
            border-radius: 4px;
          }

          .favorite-btn {
            width: 28px;
            height: 28px;
          }

          .favorite-btn svg {
            width: 14px;
            height: 14px;
          }

          .product-title {
            font-size: 11px;
            padding: 6px 6px 0;
          }

          .rating {
            font-size: 9px;
            padding: 0 6px;
          }

          .reviews {
            font-size: 9px;
            padding: 0 6px;
          }

          .price {
            padding: 0 6px;
            font-size: 14px;
          }

          .action-buttons {
            padding: 6px;
          }

          .add-to-cart-btn,
          .add-to-cart-btn-disabled {
            height: 32px;
            font-size: 10px;
            border-radius: 5px;
          }
        }

        /* ================= RESPONSIVE: Very small phones (max 360px) ================= */
        @media (max-width: 360px) {
          .product-card {
            min-height: 300px;
          }

          .product-image-container {
            height: 130px;
          }

          .product-title {
            font-size: 10px;
            padding: 4px 4px 0;
          }

          .price {
            font-size: 12px;
          }

          .add-to-cart-btn,
          .add-to-cart-btn-disabled {
            height: 28px;
            font-size: 9px;
          }

          .rating, .reviews {
            font-size: 8px;
            padding: 0 4px;
          }
        }

        /* ================= RESPONSIVE CART ICON ================= */
        .cart-icon {
          display: inline;
          vertical-align: middle;
          flex-shrink: 0;
        }
        
        .cart-icon-btn {
          margin-right: clamp(4px, 2vw, 8px);
        }

        /* Desktop */
        @media (min-width: 1025px) {
          .cart-icon-btn {
            width: 18px;
            height: 18px;
            margin-right: 6px;
          }
        }

        /* Tablet (768px - 1024px) */
        @media (max-width: 1024px) and (min-width: 769px) {
          .cart-icon-btn {
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
        }

        /* Mobile (max 768px) */
        @media (max-width: 768px) {
          .cart-icon-btn {
            width: 14px;
            height: 14px;
            margin-right: 4px;
          }
        }

        /* Small phones (max 480px) */
        @media (max-width: 480px) {
          .cart-icon-btn {
            width: 12px;
            height: 12px;
            margin-right: 3px;
          }
        }
      `}</style>

      <div className="wishlist-page">
        <main className="main-content">
          <div className="content-wrapper">
            {/* TITLE */}
            <h1 className="title-heading">
              <Heart size={40} fill="#facc15" color="#facc15" />
              MY WISHLIST
            </h1>

            <p className="subtitle">
              Your favorite products saved for later ({wishlist.length} items)
            </p>

            {/* EMPTY STATE */}
            {wishlist.length === 0 && (
              <div className="empty-state">
                <Heart size={80} color="#4b5563" />
                <h2>Your wishlist is empty</h2>
                <p>Save your favorite products here and shop them later</p>
              </div>
            )}

            {/* WISHLIST GRID */}
            {wishlist.length > 0 && (
              <div className="product-grid" style={{ marginTop: "32px" }}>
                {wishlist.map((product) => (
                  <div
                    className="product-card"
                    key={product._id}
                    onClick={() => navigate(`/productspec/${product._id}`)}
                  >
                    {/* DISCOUNT */}
                    <div
                      className={`discount-badge ${product.discountPercent ? "show" : "hide"
                        }`}
                    >
                      {product.discountPercent
                        ? `${product.discountPercent}% OFF`
                        : ""}
                    </div>

                    {/* ❤️ REMOVE */}
                    <button
                      className="favorite-btn active"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(product._id);
                      }}
                    >
                      <Heart />
                    </button>

                    {/* IMAGE */}
                    <div className="product-image-container">
                      <img
                        src={product.images?.[0]?.url || "/images/Product1.png"}
                        alt={product.name}
                      />
                    </div>

                    {/* TITLE */}
                    <div className="product-title">{product.name}</div>

                    {/* TAGS */}
                    <div className="specs">
                      {product.highlights?.map((spec, i) => (
                        <span className="spec" key={i}>
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="rating">
                      {"★".repeat(Math.round(product.rating || 0))}
                      {"☆".repeat(5 - Math.round(product.rating || 0))}
                    </div>

                    <div className="reviews">({product.numReviews || 0})</div>

                    {product.originalPrice && (
                      <div className="price-box">
                        <span className="old-price">
                          ₹{product.originalPrice}
                        </span>
                      </div>
                    )}

                    {/* PRICE */}
                    <div className="price">₹{product.price}</div>

                    {/* ACTION */}
                    <div className="action-buttons">
                      {product.countInStock > 0 ? (
                        <button
                          className="add-to-cart-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product._id);
                          }}
                        >
                          <ShoppingCart className="cart-icon cart-icon-btn" /> MOVE TO CART
                        </button>
                      ) : (
                        <button
                          className="add-to-cart-btn-disabled"
                          disabled
                        >
                          OUT OF STOCK
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {loading && (
        <div className="loader-overlay">
          <div className="luxury-loader">
            <div className="ring"></div>
            <div className="heart-wrapper">
              <Heart size={60} />
            </div>
            <h2 className="shimmer-text">Loading your wishlist...</h2>
          </div>
        </div>
      )}
    </>
  );
}
