import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import { Heart } from "lucide-react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  // const [quantities, setQuantities] = useState({});
  const [wishlist, setWishlist] = useState([]);;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  // const isLoggedIn = Boolean(localStorage.getItem("token"));
  const navigate = useNavigate();


  /* ================= FETCH CATEGORIES ================= */
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         "http://localhost:5000/api/categories"
  //       );
  //       setCategories(data);
  //     } catch (err) {
  //       setError("Failed to load categories");
  //     }
  //   };
  //   fetchCategories();
  // }, []);
  useEffect(() => {
    api
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setError("Failed to load categories"));
  }, []);

  /* ================= FETCH PRODUCTS PER CATEGORY ================= */
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);

  //       const results = await Promise.all(
  //         categories.map((cat) =>
  //           axios.get("http://localhost:5000/api/products", {
  //             params: { category: cat._id },
  //           })
  //         )
  //       );

  //       const grouped = {};
  //       categories.forEach((cat, index) => {
  //         grouped[cat.name] = results[index].data.products || [];
  //       });

  //       setProductsByCategory(grouped);
  //     } catch (err) {
  //       setError("Failed to load products");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (categories.length) fetchProducts();
  // }, [categories]);


  useEffect(() => {
    if (!categories.length) return;

    Promise.all(
      categories.map((cat) =>
        api.get("/api/products", {
          params: { category: cat._id },
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
      .catch(() => setError("Failed to load products"));
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

  /* ================= UI ================= */
  // if (loading) {
  //   return (
  //     <>
  //       <p style={{ textAlign: "center", marginTop: 100, color: "#ffeb00" }}>
  //         Loading products...
  //       </p>
  //     </>
  //   );
  // }

  // if (error) {
  //   return (
  //     <>
  //       <p style={{ textAlign: "center", marginTop: 100, color: "red" }}>
  //         {error}
  //       </p>
  //     </>
  //   );
  // }

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: 100, color: "#ffeb00" }}>
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", marginTop: 100, color: "red" }}>
        {error}
      </p>
    );
  }
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
  color: #ffffff;
  font-size: clamp(18px, 2.2vw, 24px);
  margin-bottom: 20px;
  padding-left: 180px;
  max-width: 1401px;
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
  height: 635.17px;
  background: #151515;
  border: 1.34px solid #ffeb00;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 20px;
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
  width: 100%;
  height: 48px;
  font-size: 15px;
  font-family: "Jersey 25", cursive;
  font-weight: 800;
  border-radius: 8px;
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

/* ================= SEE MORE ================= */
.see-more {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  max-width: 1401px;
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
  border-radius: 8px;
  transition: all 0.25s ease;
}

.see-more button:hover {
  background: #ffeb00;
  color: #000;
  transform: translateX(4px);
}

/* ================= RESPONSIVE ================= */
@media (max-width: 1024px) {
  .section-title {
    padding-left: 0;
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

      <div className="page-wrapper">
        <div className="products-page">
          <h1 className="page-title">FIND OUR PRODUCTS</h1>

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
                      <button
                        className="add-to-cart-btn"
                        onClick={() => navigate("/cart")}
                      >
                        🛒 Add to Cart
                      </button>

                      <Link
                        to={`/productspec/${product._id}`}
                        className="action-link"
                      >
                        <button className="buy-btn">BUY NOW</button>
                      </Link>
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
  );
}