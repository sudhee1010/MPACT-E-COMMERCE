import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Heart } from "lucide-react";
import Footer from "../components/Footer";

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  // const [quantities, setQuantities] = useState({});
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(data);
      } catch (err) {
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  /* ================= FETCH PRODUCTS PER CATEGORY ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const results = await Promise.all(
          categories.map((cat) =>
            axios.get("http://localhost:5000/api/products", {
              params: { category: cat._id },
            })
          )
        );

        const grouped = {};
        categories.forEach((cat, index) => {
          grouped[cat.name] = results[index].data.products || [];
        });

        setProductsByCategory(grouped);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    if (categories.length) fetchProducts();
  }, [categories]);

  /* ================= FAVORITE HANDLER ================= */
  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  /* ================= UI ================= */
  if (loading) {
    return (
      <>
        <p style={{ textAlign: "center", marginTop: 100, color: "#ffeb00" }}>
          Loading products...
        </p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <p style={{ textAlign: "center", marginTop: 100, color: "red" }}>
          {error}
        </p>
      </>
    );
  }

  return (
    <>
      <style>{`
  .page-wrapper {
    padding-top: 35px;
  }

  .products-page {
    max-width: 1800px;
    margin: auto;
    padding: clamp(16px, 4vw, 60px);
    min-height: 100vh;
  }

  .page-title {
  text-align: center;
  font-family: 'Jersey 25', cursive;
  font-size: clamp(32px, 6vw, 72px);
  font-weight: 400;
  margin: 24px 0 40px;
  color: black;
  -webkit-text-stroke: 2px #ffeb00;
  }

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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
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
  position: relative;
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
  line-height: 1.2;
}

.discount-text {
  display: inline-block;
  margin-left: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #4caf50;
}


/* ================= ACTION BUTTONS ================= */
.action-buttons {
  display: flex;
  gap: 8px;
  padding: 12px;
  margin-top: auto;
}

/* Link wrapper */
.action-link {
  flex: 1;
  display: flex;
  text-decoration: none;
}

/* Buttons */
.add-to-cart-btn,
.buy-btn {
  width: 100%;
  height: 48px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  font-family: "Jersey 25", cursive;
  font-weight: 800;
  transition: background 0.25s ease, color 0.25s ease, border 0.25s ease;
}

/* Add to cart */
.add-to-cart-btn {
  background: transparent;
  color: #ffffff;
  border: 2px solid #ffeb00;
  border-radius: 8px;
}

/* Buy now */
.buy-btn {
  background: #ffeb00;
  color: #000;
  border: 2px solid #ffeb00;
  border-radius: 8px;
}

/* Add to Cart hover (outline → filled) */
.add-to-cart-btn:hover {
  background: #ffeb00;
  color: #000;
}

/* Buy Now hover (slightly brighter) */
.buy-btn:hover {
  background: gold;
  color: #000;
}

/* ================= MOBILE FIX ================= */
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

  .see-more {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    max-width: 1401px;
  }

  .see-more button {
    background-color: #ffeb00;
    border: none;
    padding: 10px 20px;
    font-weight: bold;
    cursor: pointer;
  }

  /* ================= MOBILE & TABLET FIXS ================= */
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
  .section-title {
    font-size: 18px;
    margin-bottom: 16px;
  }

  .see-more button {
    width: auto;
    padding: 10px 24px;
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
                      className={`discount-badge ${
                        product.discountPercent ? "show" : "hide"
                      }`}
                    >
                      {product.discountPercent
                        ? `${product.discountPercent}% OFF`
                        : ""}
                    </div>

                    <button
                      className={`favorite-btn ${
                        favorites[product._id] ? "active" : ""
                      }`}
                      onClick={() => toggleFavorite(product._id)}
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
                      <Link to="/cart" className="action-link">
                        <button className="add-to-cart-btn">
                          🛒&nbsp; Add to Cart
                        </button>
                      </Link>
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

              <div className="see-more">
                <Link to={`/seemore?category=${categoryName}`}>
                  <button>SEE MORE →</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
