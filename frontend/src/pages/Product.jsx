import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { Heart } from "lucide-react";
import { Heart, Package } from "lucide-react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { addToCartApi } from "../api/cartApi";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import HighlightScrollBar from "../components/OfferScrollBar";


export default function Products() {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { refreshCart, setOpenSideCart } = useCart();

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    api
      .get("/api/categories")
      .then((res) => {
        // Only show active categories
        const activeCategories = res.data.filter(cat => cat.isActive);
        setCategories(activeCategories);
      })
      .catch(() => setError("Failed to load categories"));
  }, []);

  /* ================= FETCH PRODUCTS PER CATEGORY ================= */
  useEffect(() => {
    if (!categories.length) return;

    setLoading(true);
    Promise.all(
      categories.map((cat) =>
        api.get("/api/products", {
          params: {
            category: cat._id,
            page: 1,
            limit: 4 // Show only 4 products per category
          },
        })
      )
    )
      .then((results) => {
        const grouped = {};
        categories.forEach((cat, i) => {
          grouped[cat.name] = results[i].data.products || [];
        });
        setProductsByCategory(grouped);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, [categories]);

  /* ================= FETCH WISHLIST ================= */
  useEffect(() => {
    api
      .get("/api/wishlist")
      .then((res) => {
        setWishlist(res.data.wishlist.map((p) => p._id));
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          // user not logged in → silently ignore
        }
      });
  }, []);

  /* ================= ❤️ TOGGLE WISHLIST ================= */
  const toggleWishlist = async (productId) => {
    try {
      const res = await api.post("/api/wishlist/toggle", { productId });

      if (res.data.action === "added") {
        setWishlist((prev) => [...prev, productId]);
      } else {
        setWishlist((prev) => prev.filter((id) => id !== productId));
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setShowLoginModal(true);
      }
    }
  };

  // const handleAddToCart = async (productId) => {
  //   try {
  //     await addToCartApi(productId, 1);
  //     await refreshCart();
  //     setOpenSideCart(true);
  //     toast.success("Product added to cart 🛒");
  //   } catch (error) {
  //     toast.error(
  //       error.response?.data?.message || "Please login to add to cart",
  //     );
  //     {
  //       setShowLoginModal(true);
  //     }
  //   }
  // };

  const handleAddToCart = async (productId) => {
    try {
      await addToCartApi(productId, 1);
      await refreshCart();
      setOpenSideCart(true);
      toast.success("Product added to cart 🛒");
    } catch (error) {

      const status = error.response?.status;
      const message = error.response?.data?.message;

      // ✅ STOCK ERROR (400)
      if (status === 400) {
        toast.error(message || "Stock not available");
        return; // 🚫 STOP here, DO NOT open login modal
      }

      // ✅ LOGIN ERROR (401)
      if (status === 401) {
        toast.error("Please login to add to cart");
        setShowLoginModal(true);
        return;
      }

      // ✅ fallback
      toast.error("Something went wrong");
    }
  };


  // if (loading) {
  //   return (
  //     <p style={{ textAlign: "center", marginTop: 100, color: "#ffeb00" }}>
  //       Loading products...
  //     </p>
  //   );
  // }

  // if (loading) {
  //   return (
  //     <div className="loader-overlay">
  //       <div className="luxury-loader">
  //         <div className="ring"></div>

  //         <div className="icon-wrapper">
  //           <Package size={60} />
  //         </div>

  //         <h2 className="shimmer-text">Loading products...</h2>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="loader-overlay">
  //       <div className="error-box">
  //         <div className="error-icon">⚠</div>
  //         <h2>Unable to Load Products</h2>
  //         <p>{error}</p>

  //         <button
  //           className="retry-btn"
  //           onClick={() => window.location.reload()}
  //         >
  //           RETRY
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }


  // if (error) {
  //   return (
  //     <p style={{ textAlign: "center", marginTop: 100, color: "red" }}>
  //       {error}
  //     </p>
  //   );
  // }
  return (
    <>
      <style>{`
/* ================= PAGE LAYOUT ================= */
.page-wrapper {
  padding-top: 35px;
}

.products-page {
  max-width: 1800px;
  margin: auto;
  padding: clamp(16px, 4vw, 60px);
  min-height: 100vh;
}

/* ================= TITLE ================= */
.page-title {
  text-align: center;
  font-family: 'Jersey 25', cursive;
  font-size: clamp(32px, 6vw, 72px);
  font-weight: 400;
  margin: 24px 0 40px;
  color: black;
  -webkit-text-stroke: 2px #ffeb00;
}

/* ================= SECTION ================= */
.section {
  margin-bottom: 64px;
}

.section-title {
  font-family: "Jersey 25", cursive;
  font-size: clamp(36px, 6vw, 72px);
  font-weight: 200;

  max-width: 1240px;
  margin: 0 auto 16px;    
  padding: 0 8px;         
}


/* ================= PRODUCT GRID ================= */
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
  height: 600px;
  background: #151515;
  border: 1.34px solid #ffeb00;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
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
  color: white;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 800;
  border-radius: 8px;
  z-index: 1;
}

.discount-badge.hide {
  visibility: hidden;
}

.discount-badge.show {
  visibility: visible;
}

/* ================= FAVORITE BUTTON ================= */
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
  transition: all 0.3s ease;
  z-index: 10;
}

.favorite-btn:hover {
  background: rgba(255, 235, 0, 0.2);
  transform: scale(1.1);
}

.favorite-btn.active {
  background: #ffeb00;
}

.favorite-btn svg {
  width: 20px;
  height: 20px;
}

.favorite-btn.active svg {
  fill: #ff0000;
  stroke: #ff0000;
}

.favorite-btn:not(.active) svg {
  stroke: #ffeb00;
  fill: none;
}

/* ================= IMAGE ================= */
.product-image-container {
  width: 100%;
  height: 360px;
  overflow: hidden;
}

.product-card img {
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
}

/* ================= ACTION BUTTONS ================= */
.action-buttons {
  display: flex;
  gap: 8px;
  padding: 12px;
  margin-top: auto;
}

.action-link {
  flex: 1;
  display: flex;
  text-decoration: none;
}

.add-to-cart-btn,
.buy-btn {
  flex: 1;
  height: 48px;
  font-size: 15px;
  font-family: "Jersey 25", cursive;
  font-weight: 800;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.add-to-cart-btn {
  background: transparent;
  color: #fff;
  border: 2px solid #ffeb00;
}

.add-to-cart-btn:hover {
  background: #ffeb00;
  color: #000;
}

.buy-btn {
  background: #ffeb00;
  color: #000;
  border: 2px solid #ffeb00;
}

.buy-btn:hover {
  background: gold;
}
.add-to-cart-btn-disabled {
  height: 48px;
  background: #2a2a2a;
  color: #9ca3af;
  border: 2px solid #555;
  border-radius: 4px;
  font-family: "Jersey 25", cursive;
  font-size: 15px;
  font-weight: 800;
  cursor: not-allowed;
  opacity: 0.7;
}

/* ================= SEE MORE ================= */
.see-more {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  max-width: 1230px;
  margin-left: auto;
  margin-right: auto;
  padding-right: 8px;
}

.see-more a {
  text-decoration: none;
}

.see-more button {
  background: transparent;
  color: #ffeb00;
  border: 2px solid #ffeb00;
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 800;
  font-family: "Jersey 25", cursive;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.25s ease;
}

.see-more button:hover {
  background: #ffeb00;
  color: #000;
  transform: translatex(4px);
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

/* Rotating ring */
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

/* Center icon glow */
.icon-wrapper {
  color: #ffeb00;
  animation: floatPulse 1.6s infinite ease-in-out;
  filter: drop-shadow(0 0 18px #ffeb00);
}

/* Shimmer text */
.shimmer-text {
  margin-top: 40px;
  font-family: "Jersey 25", cursive;
  font-size: 26px;
  letter-spacing: 2px;
  background: linear-gradient(
    90deg,
    #ffeb00 25%,
    #ffffff 50%,
    #ffeb00 75%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 2s linear infinite;
}

/* Animations */
@keyframes spin {
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}

@keyframes floatPulse {
  0%, 100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1.15);
  }
}

@keyframes shimmer {
  100% {
    background-position: 200% center;
  }
}
/* ================= ERROR BOX ================= */
.error-box {
  background: #151515;
  border: 2px solid #ffeb00;
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  width: 90%;
  max-width: 420px;
  animation: popIn 0.3s ease;
  box-shadow: 0 0 25px rgba(255, 235, 0, 0.15);
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
  color: #ffeb00;
  animation: shake 0.6s ease;
}

.error-box h2 {
  font-family: "Jersey 25", cursive;
  font-size: 28px;
  color: #ffeb00;
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.error-box p {
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 24px;
  opacity: 0.85;
}

/* Retry Button */
.retry-btn {
  height: 46px;
  width: 100%;
  background: transparent;
  border: 2px solid #ffeb00;
  color: #ffeb00;
  font-family: "Jersey 25", cursive;
  font-size: 15px;
  font-weight: 800;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #ffeb00;
  color: #000;
  transform: translateY(-2px);
}

/* Animations */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
}

@keyframes popIn {
  from {
    transform: scale(0.85);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}


/* ================= RESPONSIVE ================= */
@media (max-width: 1024px) {
  .section-title {
    text-align: center;
  }

  .see-more {
    justify-content: center;
  }
}

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

  .see-more button {
    padding: 10px 26px;
    font-size: 13px;
  }
}


@media (max-width: 1324px) and (min-width: 1024px) {

  /* Page padding tighten */
  .products-page {
    padding: 32px;
  }

  /* Section title align + spacing */
  .section-title {
    max-width: 1100px;
    margin-bottom: 12px;
    text-align: left;
  }

  /* Product grid fix */
  .product-grid {
    grid-template-columns: repeat(auto-fill, 260px);
    gap: 16px;
    max-width: 1200px;
  }

  /* Card resize */
  .product-card {
    width: 260px;
    height: 600px;
  }

  /* Image height scale */
  .product-image-container {
    height: 320px;
  }

  /* Text tighten */
  .product-title {
    font-size: 13px;
  }

  .price {
    font-size: 18px;
  }

  /* Buttons scale */
  .add-to-cart-btn,
  .buy-btn {
    height: 44px;
    font-size: 14px;
  }

  /* See more align */
  .see-more {
    max-width: 1100px;
    padding-right: 0;
  }
}


/* ================= MODAL ================= */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.login-modal {
  background: #151515;
  border: 2px solid #ffeb00;
  border-radius: 20px;
  padding: 32px;
  width: 90%;
  max-width: 420px;
  text-align: center;
  animation: popIn 0.3s ease;
}

.login-modal h2 {
  color: #ffeb00;
  font-family: "Jersey 25", cursive;
  font-size: 32px;
  margin-bottom: 12px;
}

.login-modal p {
  color: #ffffff;
  font-size: 14px;
  margin-bottom: 24px;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-actions button {
  flex: 1;
  height: 48px;
}

@keyframes popIn {
  from {
    transform: scale(0.85);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
`}</style>
      {loading && (
        <div className="loader-overlay">
          <div className="luxury-loader">
            <div className="ring"></div>

            <div className="icon-wrapper">
              <Package size={60} />
            </div>

            <h2 className="shimmer-text">Loading products...</h2>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="loader-overlay">
          <div className="error-box">
            <div className="error-icon">⚠</div>
            <h2>Unable to Load Products</h2>
            <p>{error}</p>
            <button
              className="retry-btn"
              onClick={() => window.location.reload()}
            >
              RETRY
            </button>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>

          <div className="page-wrapper">
            <div className="products-page">
              <h1 className="page-title">FIND OUR PRODUCTS</h1>

              <HighlightScrollBar />

              {Object.keys(productsByCategory).map((categoryName) => (
                <div className="section" key={categoryName}>
                  <h2 className="section-title">{categoryName}</h2>

                  <div className="product-grid">
                    {productsByCategory[categoryName].slice(0, 4).map((product) => (
                      <div className="product-card" key={product._id}>
                        <div
                          className={`discount-badge ${product.discountPercent ? "show" : "hide"
                            }`}
                        >
                          {product.discountPercent
                            ? `${product.discountPercent}% OFF`
                            : ""}
                        </div>

                        {/* ❤️ WISHLIST */}
                        <button
                          className={`favorite-btn ${wishlist.includes(product._id) ? "active" : ""
                            }`}
                          onClick={() => toggleWishlist(product._id)}
                        >
                          <Heart />
                        </button>

                        <div className="product-image-container">
                          <img
                            src={product.images?.[0]?.url || "/images/Product1.png"}
                            alt={product.name}
                          />
                        </div>

                        <div className="product-title">{product.name}</div>

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
                        <div className="price">₹{product.price}</div>

                        <div className="action-buttons">
                          {product.countInStock > 0 ? (
                            <>
                              <button
                                className="add-to-cart-btn"
                                onClick={() => handleAddToCart(product._id)}
                              >
                                🛒 Add to Cart
                              </button>

                              <Link
                                to={`/productspec/${product._id}`}
                                className="action-link"
                              >
                                <button className="buy-btn">BUY NOW</button>
                              </Link>
                            </>
                          ) : (
                            <button
                              className="add-to-cart-btn-disabled"
                              disabled
                              style={{ width: "100%" }}
                            >
                              OUT OF STOCK
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* SEE MORE */}
                  <div className="see-more">
                    <Link to={`/seemore?category=${categoryName}`}>
                      <button>SEE MORE →</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🔐 LOGIN MODAL */}
          {showLoginModal && (
            <div className="modal-overlay">
              <div className="login-modal">
                <h2>Login Required</h2>
                <p>Please login to continue.</p>

                <div className="modal-actions">
                  <Link to="/login" className="action-link">
                    <button className="buy-btn">LOGIN</button>
                  </Link>

                  <button
                    className="add-to-cart-btn"
                    onClick={() => setShowLoginModal(false)}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          )}

          <Footer />
           </>
      )}
        </>
      );
}