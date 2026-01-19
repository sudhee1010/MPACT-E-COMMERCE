import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  /* ================= FETCH WISHLIST ================= */
  useEffect(() => {
    api
      .get("/api/wishlist")
      .then((res) => {
        setWishlist(res.data.wishlist || []);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          // user not logged in → wishlist empty
          setWishlist([]);
        }
      });
  }, []);

    /* ================= MOVE WISHLIST → CART ================= */
  const moveToCart = async (productId) => {
    try {
      await api.post("/api/wishlist/move-to-cart", { productId });
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please login to move items to cart");
      }
    }
  };

  /* ================= REMOVE FROM WISHLIST ================= */
  const removeFromWishlist = async (productId) => {
    try {
      await api.post("/api/wishlist/toggle", { productId });
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {}
  };

  return (
    <>
      <style>{`
        // * {
        //   margin: 0;
        //   padding: 0;
        //   box-sizing: border-box;
        // }

        // body {
        //   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        //     'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        //     sans-serif;
        //   -webkit-font-smoothing: antialiased;
        //   -moz-osx-font-smoothing: grayscale;
        // }

        // .wishlist-page {
        //   min-height: 100vh;
        //   background-color: #1f2937;
        // }

        // /* Header Styles */
        // .header {
        //   background-color: #facc15;
        //   padding: 0 1rem;
        // }

        // .header-container {
        //   max-width: 1280px;
        //   margin: 0 auto;
        // }

        // .header-top {
        //   display: flex;
        //   align-items: center;
        //   justify-content: space-between;
        //   height: 4rem;
        // }

        // .logo {
        //   font-size: 1.5rem;
        //   font-weight: 900;
        //   color: #000;
        //   letter-spacing: -0.025em;
        //   text-decoration: none;
        // }

        // .nav-desktop {
        //   display: none;
        //   align-items: center;
        //   gap: 2rem;
        // }

        // .nav-desktop a {
        //   color: #000;
        //   font-weight: 700;
        //   text-decoration: none;
        //   transition: color 0.2s;
        //   font-size: 0.875rem;
        // }

        // .nav-desktop a:hover {
        //   color: #374151;
        // }

        // .header-icons {
        //   display: flex;
        //   align-items: center;
        //   gap: 0.75rem;
        // }

        // .icon-button {
        //   background: none;
        //   border: none;
        //   color: #000;
        //   cursor: pointer;
        //   transition: color 0.2s;
        //   padding: 0.25rem;
        //   display: flex;
        //   align-items: center;
        //   justify-content: center;
        // }

        // .icon-button:hover {
        //   color: #374151;
        // }

        // .nav-mobile {
        //   display: flex;
        //   flex-wrap: wrap;
        //   justify-content: center;
        //   gap: 1rem;
        //   padding-bottom: 1rem;
        // }

        // .nav-mobile a {
        //   color: #000;
        //   font-weight: 700;
        //   text-decoration: none;
        //   font-size: 0.875rem;
        //   transition: color 0.2s;
        // }

        // .nav-mobile a:hover {
        //   color: #374151;
        // }

        // /* Main Content Styles */
        // .main-content {
        //   padding: 3rem 1rem;
        // }

        // .content-wrapper {
        //   max-width: 56rem;
        //   margin: 0 auto;
        //   text-align: center;
        // }

        // .title-section {
        //   margin-bottom: 3rem;
        // }

        // .title-heading {
        //   font-size: 1.875rem;
        //   font-weight: 900;
        //   color: #fff;
        //   margin-bottom: 1rem;
        //   display: flex;
        //   align-items: center;
        //   justify-content: center;
        //   flex-wrap: wrap;
        //   gap: 0.5rem;
        // }

        // .title-heart {
        //   flex-shrink: 0;
        // }

        // .subtitle {
        //   color: #d1d5db;
        //   font-size: 0.75rem;
        // }

        // .empty-state {
        //   margin-top: 3rem;
        // }

        // .empty-icon-wrapper {
        //   margin-bottom: 2rem;
        //   display: flex;
        //   justify-content: center;
        // }

        // .empty-title {
        //   font-size: 1.125rem;
        //   font-weight: 700;
        //   color: #fff;
        //   margin-bottom: 1rem;
        // }

        // .empty-description {
        //   color: #9ca3af;
        //   font-size: 0.75rem;
        //   margin-bottom: 2rem;
        //   padding: 0 1rem;
        // }

        // .shop-button {
        //   background-color: #facc15;
        //   color: #000;
        //   font-weight: 700;
        //   padding: 0.625rem 1.5rem;
        //   border: none;
        //   border-radius: 0.375rem;
        //   cursor: pointer;
        //   font-size: 0.8125rem;
        //   transition: background-color 0.2s;
        //   display: inline-block;
        //   text-decoration: none;
        // }

        // .shop-button:hover {
        //   background-color: #eab308;
        // }

        // /* Tablet Styles - 640px and up */
        // @media (min-width: 640px) {
        //   .header {
        //     padding: 0 1.5rem;
        //   }

        //   .header-top {
        //     height: 5rem;
        //   }

        //   .logo {
        //     font-size: 2rem;
        //   }

        //   .header-icons {
        //     gap: 1rem;
        //   }

        //   .nav-mobile a {
        //     font-size: 1rem;
        //   }

        //   .main-content {
        //     padding: 4rem 1.5rem;
        //   }

        //   .title-heading {
        //     font-size: 2.25rem;
        //     margin-bottom: 1.5rem;
        //     gap: 0.75rem;
        //   }

        //   .subtitle {
        //     font-size: 0.875rem;
        //   }

        //   .empty-state {
        //     margin-top: 4rem;
        //   }

        //   .empty-icon-wrapper {
        //     margin-bottom: 2.5rem;
        //   }

        //   .empty-title {
        //     font-size: 1.375rem;
        //     margin-bottom: 1.5rem;
        //   }

        //   .empty-description {
        //     font-size: 0.875rem;
        //     margin-bottom: 2.5rem;
        //   }

        //   .shop-button {
        //     padding: 0.875rem 2rem;
        //     font-size: 0.9375rem;
        //   }
        // }

        // /* Desktop Styles - 1024px and up */
        // @media (min-width: 1024px) {
        //   .header {
        //     padding: 0 2rem;
        //   }

        //   .logo {
        //     font-size: 2.25rem;
        //   }

        //   .nav-desktop {
        //     display: flex;
        //   }

        //   .nav-desktop a {
        //     font-size: 1rem;
        //   }

        //   .nav-mobile {
        //     display: none;
        //   }

        //   .main-content {
        //     padding: 5rem 2rem;
        //   }

        //   .title-heading {
        //     font-size: 3rem;
        //     gap: 1rem;
        //   }

        //   .subtitle {
        //     font-size: 1.1rem;
        //   }

        //   .empty-state {
        //     margin-top: 10rem;
        //   }

        //   .empty-icon-wrapper {
        //     margin-bottom: 2rem;
        //   }

        //   .empty-title {
        //     font-size: 1.625rem;
        //   }

        //   .empty-description {
        //     font-size: 1.125rem;
        //     margin-bottom: 3rem;
        //   }

        //   .shop-button {
        //     padding: 0.875rem 2.5rem;
        //     font-size: 1rem;
        //   }
        // }

        // /* Extra Large Styles - 1280px and up */
        // @media (min-width: 1280px) {
        //   .title-heading {
        //     font-size: 3.75rem;
        //   }
        // }

        // /* Small Mobile - below 480px */
        // @media (max-width: 479px) {
        //   .header-top {
        //     height: 3.5rem;
        //   }

        //   .logo {
        //     font-size: 1.25rem;
        //   }

        //   .header-icons {
        //     gap: 0.5rem;
        //   }

        //   .nav-mobile {
        //     gap: 0.75rem;
        //     font-size: 0.75rem;
        //   }

        //   .nav-mobile a {
        //     font-size: 0.75rem;
        //   }

        //   .main-content {
        //     padding: 2rem 1rem;
        //   }

        //   .title-heading {
        //     font-size: 1.5rem;
        //     gap: 0.5rem;
        //   }

        //   .subtitle {
        //     font-size: 0.6875rem;
        //   }

        //   .empty-title {
        //     font-size: 3rem;
        //   }

        //   .empty-description {
        //     font-size: 1rem;
        //   }

        //   .shop-button {
        //     padding: 0.5rem 1.25rem;
        //     font-size: 0.75rem;
        //   }
        // }

        /* ================= RESET ================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ================= PAGE WRAPPER ================= */
.wishlist-page {
  min-height: 100vh;
  background: #2f2f2f;
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
}

.empty-state h2 {
  margin-top: 16px;
  color: #ffffff;
}

.empty-state p {
  margin-top: 8px;
}

/* ================= PRODUCT GRID (SAME AS PRODUCTS PAGE) ================= */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 291.51px);
  gap: 18px;
  justify-content: center;
  max-width: 1380px;
  margin: 30px auto;
  padding: 0 8px;
}

/* ================= PRODUCT CARD ================= */
.product-card {
  width: 291.51px;
  height: 635.17px;
  background: #151515;
  border: 1.34px solid #ffeb00;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
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

/* ================= MOBILE ================= */
@media (max-width: 480px) {
  .product-card {
    width: 100%;
  }

  .product-image-container {
    height: 300px;
  }

  .specs {
    max-height: 34px;
    overflow: hidden;
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
                  <div className="product-card" key={product._id}>
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
                      onClick={() => removeFromWishlist(product._id)}
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
                      <button
                        className="add-to-cart-btn"
                        onClick={() => moveToCart(product._id)}
                      >
                        🛒 MOVE TO CART
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      </>
      );}
   