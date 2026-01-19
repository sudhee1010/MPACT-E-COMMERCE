import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function WishlistPage() {
  const BASE_URL = "http://localhost:5000/api";
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem("token");

  /* ================= FETCH WISHLIST ================= */
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${BASE_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setWishlist(res.data.wishlist || []);
      })
      .catch(() => {});
  }, [token]);

  /* ================= MOVE TO CART ================= */
  const moveToCart = async (productId) => {
    await axios.post(
      `${BASE_URL}/wishlist/move-to-cart`,
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // remove from UI after success
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
  };

  return (
    <>
      <div className="wishlist-page">
        <main className="main-content">
          <div className="content-wrapper">
            {/* TITLE */}
            <div className="title-section">
              <h1 className="title-heading">
                <Heart
                  className="title-heart"
                  size={48}
                  fill="#facc15"
                  color="#facc15"
                />
                <span>MY WISHLIST</span>
              </h1>
              <p className="subtitle">
                Your favorite products saved for later ({wishlist.length} items)
              </p>
            </div>

            {/* EMPTY STATE */}
            {wishlist.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon-wrapper">
                  <Heart size={80} color="#4b5563" />
                </div>

                <h2 className="empty-title">Your wishlist is empty</h2>

                <p className="empty-description">
                  Save your favorite products here and shop them later
                </p>

                <Link to="/">
                  <button className="shop-button">START SHOPPING</button>
                </Link>
              </div>
            )}

            {/* WISHLIST ITEMS */}
            {wishlist.length > 0 && (
              <div style={{ display: "grid", gap: "24px" }}>
                {wishlist.map((product) => (
                  <div
                    key={product._id}
                    style={{
                      border: "2px solid #facc15",
                      borderRadius: "12px",
                      padding: "16px",
                      background: "#111827",
                      color: "#fff",
                    }}
                  >
                    <img
                      src={product.images?.[0]?.url}
                      alt={product.name}
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "12px",
                      }}
                    />

                    <h3>{product.name}</h3>
                    <p style={{ color: "#22c55e", fontWeight: "700" }}>
                      ₹{product.price}
                    </p>

                    <button
                      className="shop-button"
                      onClick={() => moveToCart(product._id)}
                      style={{ marginTop: "12px" }}
                    >
                      🛒 MOVE TO CART
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}


// import React from 'react';
// import { Search, User, ShoppingBag, Heart } from 'lucide-react';

// export default function WishlistPage() {
//     const BASE_URL = "http://localhost:5000/api";

// const moveToCart = async (productId) => {
//   const token = localStorage.getItem("token");

//   await axios.post(
//     `${BASE_URL}/wishlist/move-to-cart`,
//     { productId },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

//   setWishlist((prev) => prev.filter((item) => item._id !== productId));
// };

//   return (
//     <>
//       <style>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         body {
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
//             'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
//             sans-serif;
//           -webkit-font-smoothing: antialiased;
//           -moz-osx-font-smoothing: grayscale;
//         }

//         .wishlist-page {
//           min-height: 100vh;
//           background-color: #1f2937;
//         }

//         /* Header Styles */
//         .header {
//           background-color: #facc15;
//           padding: 0 1rem;
//         }

//         .header-container {
//           max-width: 1280px;
//           margin: 0 auto;
//         }

//         .header-top {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           height: 4rem;
//         }

//         .logo {
//           font-size: 1.5rem;
//           font-weight: 900;
//           color: #000;
//           letter-spacing: -0.025em;
//           text-decoration: none;
//         }

//         .nav-desktop {
//           display: none;
//           align-items: center;
//           gap: 2rem;
//         }

//         .nav-desktop a {
//           color: #000;
//           font-weight: 700;
//           text-decoration: none;
//           transition: color 0.2s;
//           font-size: 0.875rem;
//         }

//         .nav-desktop a:hover {
//           color: #374151;
//         }

//         .header-icons {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//         }

//         .icon-button {
//           background: none;
//           border: none;
//           color: #000;
//           cursor: pointer;
//           transition: color 0.2s;
//           padding: 0.25rem;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .icon-button:hover {
//           color: #374151;
//         }

//         .nav-mobile {
//           display: flex;
//           flex-wrap: wrap;
//           justify-content: center;
//           gap: 1rem;
//           padding-bottom: 1rem;
//         }

//         .nav-mobile a {
//           color: #000;
//           font-weight: 700;
//           text-decoration: none;
//           font-size: 0.875rem;
//           transition: color 0.2s;
//         }

//         .nav-mobile a:hover {
//           color: #374151;
//         }

//         /* Main Content Styles */
//         .main-content {
//           padding: 3rem 1rem;
//         }

//         .content-wrapper {
//           max-width: 56rem;
//           margin: 0 auto;
//           text-align: center;
//         }

//         .title-section {
//           margin-bottom: 3rem;
//         }

//         .title-heading {
//           font-size: 1.875rem;
//           font-weight: 900;
//           color: #fff;
//           margin-bottom: 1rem;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-wrap: wrap;
//           gap: 0.5rem;
//         }

//         .title-heart {
//           flex-shrink: 0;
//         }

//         .subtitle {
//           color: #d1d5db;
//           font-size: 0.75rem;
//         }

//         .empty-state {
//           margin-top: 3rem;
//         }

//         .empty-icon-wrapper {
//           margin-bottom: 2rem;
//           display: flex;
//           justify-content: center;
//         }

//         .empty-title {
//           font-size: 1.125rem;
//           font-weight: 700;
//           color: #fff;
//           margin-bottom: 1rem;
//         }

//         .empty-description {
//           color: #9ca3af;
//           font-size: 0.75rem;
//           margin-bottom: 2rem;
//           padding: 0 1rem;
//         }

//         .shop-button {
//           background-color: #facc15;
//           color: #000;
//           font-weight: 700;
//           padding: 0.625rem 1.5rem;
//           border: none;
//           border-radius: 0.375rem;
//           cursor: pointer;
//           font-size: 0.8125rem;
//           transition: background-color 0.2s;
//           display: inline-block;
//           text-decoration: none;
//         }

//         .shop-button:hover {
//           background-color: #eab308;
//         }

//         /* Tablet Styles - 640px and up */
//         @media (min-width: 640px) {
//           .header {
//             padding: 0 1.5rem;
//           }

//           .header-top {
//             height: 5rem;
//           }

//           .logo {
//             font-size: 2rem;
//           }

//           .header-icons {
//             gap: 1rem;
//           }

//           .nav-mobile a {
//             font-size: 1rem;
//           }

//           .main-content {
//             padding: 4rem 1.5rem;
//           }

//           .title-heading {
//             font-size: 2.25rem;
//             margin-bottom: 1.5rem;
//             gap: 0.75rem;
//           }

//           .subtitle {
//             font-size: 0.875rem;
//           }

//           .empty-state {
//             margin-top: 4rem;
//           }

//           .empty-icon-wrapper {
//             margin-bottom: 2.5rem;
//           }

//           .empty-title {
//             font-size: 1.375rem;
//             margin-bottom: 1.5rem;
//           }

//           .empty-description {
//             font-size: 0.875rem;
//             margin-bottom: 2.5rem;
//           }

//           .shop-button {
//             padding: 0.875rem 2rem;
//             font-size: 0.9375rem;
//           }
//         }

//         /* Desktop Styles - 1024px and up */
//         @media (min-width: 1024px) {
//           .header {
//             padding: 0 2rem;
//           }

//           .logo {
//             font-size: 2.25rem;
//           }

//           .nav-desktop {
//             display: flex;
//           }

//           .nav-desktop a {
//             font-size: 1rem;
//           }

//           .nav-mobile {
//             display: none;
//           }

//           .main-content {
//             padding: 5rem 2rem;
//           }

//           .title-heading {
//             font-size: 3rem;
//             gap: 1rem;
//           }

//           .subtitle {
//             font-size: 1.1rem;
//           }

//           .empty-state {
//             margin-top: 10rem;
//           }

//           .empty-icon-wrapper {
//             margin-bottom: 2rem;
//           }

//           .empty-title {
//             font-size: 1.625rem;
//           }

//           .empty-description {
//             font-size: 1.125rem;
//             margin-bottom: 3rem;
//           }

//           .shop-button {
//             padding: 0.875rem 2.5rem;
//             font-size: 1rem;
//           }
//         }

//         /* Extra Large Styles - 1280px and up */
//         @media (min-width: 1280px) {
//           .title-heading {
//             font-size: 3.75rem;
//           }
//         }

//         /* Small Mobile - below 480px */
//         @media (max-width: 479px) {
//           .header-top {
//             height: 3.5rem;
//           }

//           .logo {
//             font-size: 1.25rem;
//           }

//           .header-icons {
//             gap: 0.5rem;
//           }

//           .nav-mobile {
//             gap: 0.75rem;
//             font-size: 0.75rem;
//           }

//           .nav-mobile a {
//             font-size: 0.75rem;
//           }

//           .main-content {
//             padding: 2rem 1rem;
//           }

//           .title-heading {
//             font-size: 1.5rem;
//             gap: 0.5rem;
//           }

//           .subtitle {
//             font-size: 0.6875rem;
//           }

//           .empty-title {
//             font-size: 3rem;
//           }

//           .empty-description {
//             font-size: 1rem;
//           }

//           .shop-button {
//             padding: 0.5rem 1.25rem;
//             font-size: 0.75rem;
//           }
//         }
//       `}</style>

//       <div className="wishlist-page">
//         {/* Main Content */}
//         <main className="main-content">
//           <div className="content-wrapper">
//             {/* Title */}
//             <div className="title-section">
//               <h1 className="title-heading">
//                 <Heart className="title-heart" size={48} fill="#facc15" color="#facc15" />
//                 <span>MY WISHLIST</span>
//               </h1>
//               <p className="subtitle">
//                 Your favorite products saved for later (0 items)
//               </p>
//             </div>

//             {/* Empty State */}
//             <div className="empty-state">
//               <div className="empty-icon-wrapper">
//                 <Heart size={80} color="#4b5563" />
//               </div>

//               <h2 className="empty-title">Your wishlist is empty</h2>

//               <p className="empty-description">
//                 Save your favorite products here and shop them later
//               </p>

//               <button className="shop-button">
//                 START SHOPPING
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }


