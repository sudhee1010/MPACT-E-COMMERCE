
// import React, { useState, useMemo, useEffect } from "react";
// import Footer from "../components/Footer";
// import { Heart } from "lucide-react";
// import { useSearchParams } from "react-router-dom";
// // import axios from "axios";
// import api from "../api/axios";
// import { addToCartApi } from "../api/cartApi";
// import toast from "react-hot-toast";
// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// /* ================= COMPONENT ================= */

// export default function ProductPage() {
//   const [sortOption, setSortOption] = useState("Featured");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
//   const [selectedRatings, setSelectedRatings] = useState([]);
//   const [inStock, setInStock] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categoryId, setCategoryId] = useState(null);
//   const [wishlistIds, setWishlistIds] = useState(new Set());

//   const [searchParams] = useSearchParams();
//   const categoryName = decodeURIComponent(searchParams.get("category"));
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const { refreshCart, setOpenSideCart } = useCart();
//   const requireLogin = () => {
//     setShowLoginModal(true);
//   };

//   const [openSections, setOpenSections] = useState({
//     categories: true,
//     price: true,
//     rating: true,
//     availability: true,
//   });

//   const filteredAndSortedData = useMemo(() => {
//     let result = [...products];

//     if (searchQuery) {
//       result = result.filter((p) =>
//         p.name.toLowerCase().includes(searchQuery.toLowerCase()),
//       );
//     }

//     result = result.filter(
//       (p) => p.price >= priceRange.min && p.price <= priceRange.max,
//     );

//     if (selectedRatings.length > 0) {
//       const minRating = Math.min(...selectedRatings);
//       result = result.filter((p) => (p.rating || 0) >= minRating);
//     }

//     if (inStock) {
//       result = result.filter((p) => p.countInStock > 0);
//     }

//     switch (sortOption) {
//       case "Price: Low to High":
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case "Price: High to Low":
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case "Highest Rated":
//         result.sort((a, b) => b.rating - a.rating);
//         break;
//       case "Best Discount":
//         result.sort(
//           (a, b) => b.originalPrice - b.price - (a.originalPrice - a.price),
//         );
//         break;
//       case "Name: A to Z":
//         result.sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       default:
//         break;
//     }

//     return result;
//   }, [
//     products,
//     searchQuery,
//     sortOption,
//     selectedCategories,
//     priceRange,
//     selectedRatings,
//     inStock,
//   ]);

//   useEffect(() => {
//     const fetchCategoryId = async () => {
//       try {
//         const { data } = await api.get("/api/categories");
//         const matched = data.find((cat) => cat.name === categoryName);
//         if (matched) {
//           setCategoryId(matched._id);
//         }
//       } catch (err) {
//         console.error("Failed to fetch category", err);
//       }
//     };

//     if (categoryName) fetchCategoryId();
//   }, [categoryName]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const { data } = await api.get("/api/products", {
//           params: { category: categoryId },
//         });
//         setProducts(data.products || []);
//       } catch (err) {
//         console.error("Failed to fetch products", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (categoryId) fetchProducts();
//   }, [categoryId]);

//   useEffect(() => {
//     api
//       .get("/api/wishlist")
//       .then((res) => {
//         const ids = new Set(res.data.wishlist.map((p) => p._id));
//         setWishlistIds(ids);
//       })
//       .catch((err) => {
//         if (err.response?.status === 401) {
//           setWishlistIds(new Set());
//         }
//       });
//   }, []);

//   const toggleWishlist = async (productId) => {
//     try {
//       await api.post("/api/wishlist/toggle", { productId });
//       setWishlistIds((prev) => {
//         const updated = new Set(prev);
//         updated.has(productId)
//           ? updated.delete(productId)
//           : updated.add(productId);
//         return updated;
//       });
//     } catch (err) {
//       if (err.response?.status === 401) {
//         requireLogin();
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   const moveToCart = async (productId) => {
//     try {
//       await api.post("/api/wishlist/move-to-cart", { productId });
//       setWishlistIds((prev) => {
//         const updated = new Set(prev);
//         updated.delete(productId);
//         return updated;
//       });
//     } catch (err) {
//       if (err.response?.status === 401) {
//         requireLogin();
//       }
//     }
//   };

//   const toggleCategory = (category) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((c) => c !== category)
//         : [...prev, category],
//     );
//   };

//   const toggleRating = (rating) => {
//     setSelectedRatings((prev) =>
//       prev.includes(rating)
//         ? prev.filter((r) => r !== rating)
//         : [...prev, rating],
//     );
//   };

//   const clearAllFilters = () => {
//     setSelectedCategories([]);
//     setPriceRange({ min: 0, max: 5000 });
//     setSelectedRatings([]);
//     setInStock(false);
//     setSearchQuery("");
//   };

//   const closeFilterSidebar = () => {
//     const el = document.querySelector(".filterSidebar");
//     if (el) {
//       el.classList.add("closing");
//       setTimeout(() => setShowFilters(false), 300);
//     } else {
//       setShowFilters(false);
//     }
//   };

//   return (
//     <>
//       <div className="page">
//         {/* ================= FILTER SIDEBAR ================= */}
//         {showFilters && (
//           <div className="filterOverlay" onClick={closeFilterSidebar} />
//         )}
//         {showFilters && (
//           <div className="filterSidebar">
//             <div className="filterHeader">
//               <h2>Filter</h2>
//               <button className="closeBtn" onClick={closeFilterSidebar}>
//                 ✕
//               </button>
//             </div>

//             <button className="clearAllBtn" onClick={clearAllFilters}>
//               Clear All Filters
//             </button>

//             {/* Price */}
//             <div className="filterSection">
//               <button
//                 className="filterSectionHeader"
//                 onClick={() =>
//                   setOpenSections((p) => ({ ...p, price: !p.price }))
//                 }
//               >
//                 <span>Price</span>
//                 <span className="arrow">{openSections.price ? "–" : "+"}</span>
//               </button>

//               {openSections.price && (
//                 <div className="filterContent">
//                   <div className="priceInputRow">
//                     <input
//                       type="number"
//                       placeholder="0"
//                       value={priceRange.min}
//                       onChange={(e) =>
//                         setPriceRange({
//                           ...priceRange,
//                           min: Number(e.target.value),
//                         })
//                       }
//                       className="priceInput"
//                     />
//                     <span>-</span>
//                     <input
//                       type="number"
//                       placeholder="5000"
//                       value={priceRange.max}
//                       onChange={(e) =>
//                         setPriceRange({
//                           ...priceRange,
//                           max: Number(e.target.value),
//                         })
//                       }
//                       className="priceInput"
//                     />
//                   </div>

//                   <input
//                     type="range"
//                     min="0"
//                     max="5000"
//                     value={priceRange.max}
//                     onChange={(e) =>
//                       setPriceRange({
//                         ...priceRange,
//                         max: Number(e.target.value),
//                       })
//                     }
//                     className="priceSlider"
//                     style={{
//                       background: `linear-gradient(90deg, #ffeb00 ${Math.round(
//                         (priceRange.max / 5000) * 100,
//                       )}%, #000 ${Math.round((priceRange.max / 5000) * 100)}%)`,
//                     }}
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Customer Rating */}
//             <div className="filterSection">
//               <button
//                 className="filterSectionHeader"
//                 onClick={() =>
//                   setOpenSections((p) => ({ ...p, rating: !p.rating }))
//                 }
//               >
//                 <span>Customer Rating</span>
//                 <span className="arrow">{openSections.rating ? "–" : "+"}</span>
//               </button>

//               {openSections.rating && (
//                 <div className="filterContent">
//                   {[4, 3, 2, 1].map((rating) => (
//                     <label key={rating} className="checkboxLabel">
//                       <input
//                         type="checkbox"
//                         checked={selectedRatings.includes(rating)}
//                         onChange={() => toggleRating(rating)}
//                       />
//                       <span>{rating}★ & above</span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Availability */}
//             <div className="filterSection">
//               <button
//                 className="filterSectionHeader"
//                 onClick={() =>
//                   setOpenSections((p) => ({
//                     ...p,
//                     availability: !p.availability,
//                   }))
//                 }
//               >
//                 <span>Availability</span>
//                 <span className="arrow">
//                   {openSections.availability ? "–" : "+"}
//                 </span>
//               </button>

//               {openSections.availability && (
//                 <div className="filterContent">
//                   <label className="checkboxLabel">
//                     <input
//                       type="checkbox"
//                       checked={inStock}
//                       onChange={() => setInStock(!inStock)}
//                     />
//                     <span>In Stock</span>
//                   </label>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* ================= MAIN CONTENT ================= */}
//         <div className={`mainContent ${showFilters ? "withSidebar" : ""}`}>
//           {/* ================= TOP SECTION ================= */}
//           <div className="topSection">
//             <h1 className="topTitle">{categoryName}</h1>

//             <div className="topControls">
//               <div className="left">
//                 <h2>ALL PRODUCTS</h2>
//                 <p>
//                   Showing {filteredAndSortedData.length} of {products.length}{" "}
//                   products
//                 </p>

//                 <div className="actionsRow">
//                   <button
//                     className="filterBtn"
//                     onClick={() => setShowFilters(!showFilters)}
//                   >
//                     <FilterIcon />
//                     Filters
//                   </button>

//                   <select
//                     className="sort"
//                     value={sortOption}
//                     onChange={(e) => setSortOption(e.target.value)}
//                   >
//                     <option>Featured</option>
//                     <option>Price: Low to High</option>
//                     <option>Price: High to Low</option>
//                     <option>Highest Rated</option>
//                     <option>Best Discount</option>
//                     <option>Name: A to Z</option>
//                   </select>

//                   <span className="count">
//                     {filteredAndSortedData.length} products
//                   </span>
//                 </div>
//               </div>

//               <div className="right">
//                 <div className="searchBox">
//                   <SearchIcon />
//                   <input
//                     placeholder="Search products..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {showLoginModal && (
//             <div
//               className="modal-overlay"
//               onClick={() => setShowLoginModal(false)}
//             >
//               <div className="login-modal" onClick={(e) => e.stopPropagation()}>
//                 <h2>Login Required</h2>
//                 <p>Please login to continue.</p>

//                 <div className="modal-actions">
//                   <Link to="/login" style={{ flex: 1 }}>
//                     <button className="login-btn">LOGIN</button>
//                   </Link>

//                   <button
//                     className="cancel-btn"
//                     onClick={() => setShowLoginModal(false)}
//                   >
//                     CANCEL
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {loading ? (
//             <p style={{ textAlign: "center", marginTop: 100 }}>
//               Loading products...
//             </p>
//           ) : (
//             <div className="products">
//               {filteredAndSortedData.map((p) => (
//                 <ProductCard
//                   key={p._id}
//                   product={p}
//                   wishlistIds={wishlistIds}
//                   toggleWishlist={toggleWishlist}
//                   requireLogin={requireLogin}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ================= INTERNAL CSS ================= */}
//       <style jsx>{`
//         *,
//         *::before,
//         *::after {
//           box-sizing: border-box;
//         }

//         body {
//           margin: 0;
//           background: rgba(24, 23, 23, 1);
//           font-family: Inter, system-ui, sans-serif;
//         }

//         .page {
//           background: rgba(24, 23, 23, 1);
//           color: #fff;
//           min-height: 100vh;
//           display: flex;
//           position: relative;
//           overflow-x: hidden;
//         }

//         /* ================= FILTER SIDEBAR ================= */

//         .filterOverlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.55);
//           z-index: 900;
//           cursor: pointer;
//         }

//         .filterSidebar {
//           position: fixed;
//           left: 0;
//           top: 90px;
//           bottom: 0;
//           width: 300px;
//           background: #1e1e1e;
//           color: #ffeb00;
//           overflow-y: auto;
//           -webkit-overflow-scrolling: touch;
//           z-index: 1000;
//           padding: 20px 20px 120px 20px;
//           animation: slideIn 0.3s ease;
//           scrollbar-width: thin;
//           scrollbar-color: rgba(255, 235, 0, 0.25) transparent;
//           border-right: 1px solid rgba(255, 235, 0, 0.15);
//         }

//         .filterSidebar::-webkit-scrollbar {
//           width: 6px;
//         }

//         .filterSidebar::-webkit-scrollbar-thumb {
//           background: rgba(255, 235, 0, 0.2);
//           border-radius: 6px;
//         }

//         @keyframes slideIn {
//           from {
//             transform: translateX(-100%);
//           }
//           to {
//             transform: translateX(0);
//           }
//         }

//         @keyframes slideOut {
//           from {
//             transform: translateX(0);
//           }
//           to {
//             transform: translateX(-100%);
//           }
//         }

//         .filterSidebar.closing {
//           animation: slideOut 0.3s ease forwards;
//         }

//         .filterHeader {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }

//         .filterHeader h2 {
//           font-size: 26px;
//           font-weight: 700;
//           margin: 0;
//         }

//         .closeBtn {
//           background: none;
//           border: 1px solid rgba(255, 235, 0, 0.4);
//           font-size: 18px;
//           cursor: pointer;
//           color: #ffeb00;
//           padding: 0;
//           width: 34px;
//           height: 34px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: background 0.2s ease;
//           flex-shrink: 0;
//         }

//         .closeBtn:hover {
//           background: rgba(255, 235, 0, 0.15);
//         }

//         .clearAllBtn {
//           width: 100%;
//           background: transparent;
//           border: 2px solid #ffeb00;
//           color: #ffeb00;
//           padding: 10px 12px;
//           font-weight: 700;
//           cursor: pointer;
//           margin-bottom: 20px;
//           text-decoration: underline;
//           font-size: 14px;
//           border-radius: 4px;
//           transition: background 0.2s ease;
//         }

//         .clearAllBtn:hover {
//           background: rgba(255, 235, 0, 0.1);
//         }

//         .filterSection {
//           margin-bottom: 16px;
//           border-bottom: 1px solid rgba(255, 235, 0, 0.1);
//           padding-bottom: 14px;
//         }

//         .filterSectionHeader {
//           width: 100%;
//           background: none;
//           border: none;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           font-size: 16px;
//           font-weight: 700;
//           padding: 8px 0;
//           cursor: pointer;
//           color: #ffeb00;
//         }

//         .arrow {
//           font-size: 14px;
//           font-weight: 400;
//         }

//         .filterContent {
//           padding: 8px 0;
//         }

//         .checkboxLabel {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           margin-bottom: 10px;
//           cursor: pointer;
//           font-size: 14px;
//         }

//         .checkboxLabel input[type="checkbox"] {
//           width: 18px;
//           height: 18px;
//           cursor: pointer;
//           accent-color: #ffeb00;
//           flex-shrink: 0;
//         }

//         .priceInputRow {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           margin-bottom: 12px;
//         }

//         .priceInput {
//           flex: 1;
//           padding: 8px;
//           border: 2px solid #ffeb00;
//           background: transparent;
//           color: #ffeb00;
//           font-size: 13px;
//           font-weight: 600;
//           min-width: 0;
//           border-radius: 4px;
//           width: 100%;
//         }

//         .priceSlider {
//           width: 100%;
//           height: 6px;
//           border-radius: 10px;
//           background: #000;
//           outline: none;
//           -webkit-appearance: none;
//           cursor: pointer;
//         }

//         .priceSlider::-webkit-slider-thumb {
//           -webkit-appearance: none;
//           appearance: none;
//           width: 18px;
//           height: 18px;
//           background: #ffeb00;
//           cursor: pointer;
//           border-radius: 50%;
//           border: none;
//         }

//         .priceSlider::-moz-range-thumb {
//           width: 18px;
//           height: 18px;
//           background: #ffeb00;
//           cursor: pointer;
//           border-radius: 50%;
//           border: none;
//         }

//         /* ================= ACTION BUTTONS ================= */
//         .action-buttons {
//           display: flex;
//           gap: 8px;
//           padding: 10px;
//           margin-top: auto;
//         }

//         .action-link {
//           flex: 1;
//           display: flex;
//           text-decoration: none;
//         }

//         .add-to-cart-btn,
//         .buy-btn {
//           flex: 1;
//           width: 100%;
//           height: 42px;
//           font-size: 13px;
//           font-family: "Jersey 25", cursive;
//           font-weight: 800;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.25s ease;
//           white-space: nowrap;
//         }

//         .add-to-cart-btn {
//           background: transparent;
//           color: #fff;
//           border: 2px solid #ffeb00;
//         }

//         .add-to-cart-btn:hover {
//           background: #ffeb00;
//           color: #000;
//         }

//         .buy-btn {
//           background: #ffeb00;
//           color: #000;
//           border: 2px solid #ffeb00;
//         }

//         .buy-btn:hover {
//           background: gold;
//         }

//         .add-to-cart-btn-disabled {
//           height: 42px;
//           background: #2a2a2a;
//           color: #9ca3af;
//           border: 2px solid #555;
//           border-radius: 6px;
//           font-family: "Jersey 25", cursive;
//           font-size: 13px;
//           font-weight: 800;
//           cursor: not-allowed;
//           opacity: 0.7;
//           width: 100%;
//         }

//         .stock-warning {
//           font-size: 11px;
//           width: fit-content;
//           max-width: 100%;
//           color: #ff6b6b;
//           background: rgba(255, 107, 107, 0.12);
//           padding: 4px 7px;
//           border-radius: 4px;
//           border-left: 3px solid #ff6b6b;
//           margin: 4px 0;
//           font-weight: 500;
//           line-height: 1.3;
//         }

//         /* ================= MAIN CONTENT ================= */

//         .mainContent {
//           flex: 1;
//           min-width: 0;
//           transition: margin-left 0.3s ease;
//         }

//         .mainContent.withSidebar {
//           margin-left: 300px;
//         }

//         /* ================= TOP SECTION ================= */

//         .topSection {
//           background: rgba(24, 23, 23, 1);
//           padding: 40px 0 24px;
//           color: #fff;
//         }

//         .topTitle {
//           font-family: "Jersey 25", cursive;
//           font-size: clamp(32px, 5vw, 68px);
//           font-weight: 400;
//           text-align: center;
//           margin: 0 0 32px 0;
//           padding: 0 16px;
//         }

//         .topControls {
//           max-width: 1260px;
//           margin: auto;
//           padding: 0 20px;
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-end;
//           gap: 16px;
//           flex-wrap: wrap;
//         }

//         .topControls .left {
//           flex: 1 1 auto;
//           min-width: 0;
//         }

//         .topControls .left h2 {
//           font-family: "Jersey 25", cursive;
//           color: #ffeb00;
//           font-size: 26px;
//           margin: 0 0 4px 0;
//         }

//         .topControls .left p {
//           font-size: 13px;
//           color: #9fb3c8;
//           margin: 0 0 12px 0;
//         }

//         .actionsRow {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           flex-wrap: nowrap;
//         }

//         .filterBtn {
//           background: #ffeb00;
//           color: #000;
//           border: none;
//           padding: 10px 14px;
//           border-radius: 6px;
//           font-weight: 700;
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           cursor: pointer;
//           font-family: "Jersey 25", cursive;
//           font-size: 14px;
//           transition: all 0.3s ease;
//           white-space: nowrap;
//           flex-shrink: 0;
//         }

//         .filterBtn:hover {
//           background: #ffd700;
//         }

//         .sort {
//           background: #1e1e1e;
//           border: 2px solid #ffeb00;
//           color: #fff;
//           padding: 9px 12px;
//           border-radius: 6px;
//           font-family: "Jersey 25", cursive;
//           font-size: 13px;
//           cursor: pointer;
//           flex-shrink: 1;
//           min-width: 0;
//           max-width: 180px;
//         }

//         .sort option {
//           background: #151515;
//           color: #fff;
//         }

//         .count {
//           font-size: 13px;
//           color: #9fb3c8;
//           white-space: nowrap;
//           flex-shrink: 0;
//         }

//         .topControls .right {
//           display: flex;
//           align-items: center;
//           flex-shrink: 0;
//           flex-basis: auto;
//         }

//         .searchBox {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           border: 2px solid #ffeb00;
//           padding: 9px 12px;
//           border-radius: 6px;
//           width: 260px;
//           background: #1a1a1a;
//         }

//         .searchBox input {
//           background: transparent;
//           border: none;
//           outline: none;
//           color: #fff;
//           width: 100%;
//           font-size: 14px;
//           min-width: 0;
//         }

//         .searchBox input::placeholder {
//           color: #666;
//         }

//         /* ================= PRODUCTS GRID ================= */

//         .products {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
//           gap: 18px;
//           max-width: 1380px;
//           margin: 28px auto;
//           padding: 0 20px;
//         }

//         /* ===== CARD ===== */
//         .card {
//           background: #151515;
//           border: 1.34px solid #ffeb00;
//           border-radius: 8px;
//           display: flex;
//           flex-direction: column;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           overflow: hidden;
//           width: 100%;
//         }

//         .card:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 24px rgba(255, 235, 0, 0.12);
//         }

//         .imageWrap {
//           position: relative;
//           width: 100%;
//           padding-top: 75%; /* 4:3 aspect ratio */
//           overflow: hidden;
//         }

//         .imageWrap img {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.4s ease;
//         }

//         .card:hover .imageWrap img {
//           transform: scale(1.06);
//         }

//         .discount {
//           position: absolute;
//           top: 10px;
//           left: 10px;
//           background: #ff0000;
//           color: white;
//           padding: 4px 10px;
//           font-size: 12px;
//           font-weight: 800;
//           border-radius: 6px;
//           z-index: 1;
//           letter-spacing: 0.5px;
//         }

//         .fav {
//           position: absolute;
//           top: 10px;
//           right: 10px;
//           width: 36px;
//           height: 36px;
//           background: rgba(0, 0, 0, 0.7);
//           border: 1px solid #ffeb00;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           z-index: 10;
//         }

//         .fav:hover {
//           background: rgba(255, 235, 0, 0.2);
//           transform: scale(1.1);
//         }

//         .fav svg {
//           width: 18px;
//           height: 18px;
//           fill: none;
//           stroke: #ffeb00;
//           stroke-width: 2;
//         }

//         .fav.active {
//           background: #ffeb00;
//         }

//         .fav.active svg {
//           fill: #ff0000;
//           stroke: #ff0000;
//         }

//         .fav:not(.active) svg {
//           fill: none;
//           stroke: #ffeb00;
//         }

//         .info {
//           padding: 12px;
//           display: flex;
//           flex-direction: column;
//           gap: 6px;
//           flex: 1;
//         }

//         .info h3 {
//           font-size: 13px;
//           font-weight: 700;
//           line-height: 1.35;
//           margin: 0;
//           color: #fff;
//         }

//         .specs {
//           display: flex;
//           gap: 5px;
//           flex-wrap: wrap;
//         }

//         .specs span {
//           font-size: 10px;
//           border: 1px solid #ffeb00;
//           padding: 2px 5px;
//           border-radius: 4px;
//           color: #ffeb00;
//           white-space: nowrap;
//         }

//         .rating {
//           color: #ffeb00;
//           font-size: 11px;
//           font-weight: 600;
//         }

//         .rating span {
//           color: #888;
//           margin-left: 4px;
//           font-size: 11px;
//         }

//         .price {
//           font-size: 12px;
//           color: #888;
//           line-height: 1.3;
//           margin: 0;
//         }

//         .price strong {
//           color: #ffeb00;
//           font-size: 17px;
//           display: block;
//           margin-top: 2px;
//         }

//         .price .off {
//           color: #4caf50;
//           font-size: 11px;
//           font-weight: 600;
//         }

//         .qty {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           margin-top: 2px;
//         }

//         .qty button {
//           width: 28px;
//           height: 28px;
//           border-radius: 4px;
//           border: 1px solid #ffeb00;
//           background: transparent;
//           color: #ffeb00;
//           cursor: pointer;
//           font-weight: 700;
//           font-size: 14px;
//           transition: all 0.2s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//         }

//         .qty button:hover:not(:disabled) {
//           background: rgba(255, 235, 0, 0.15);
//         }

//         .qty button:disabled {
//           opacity: 0.4;
//           cursor: not-allowed;
//           color: #999;
//           background: rgba(255, 0, 0, 0.08);
//           border-color: #555;
//         }

//         .qty span {
//           min-width: 28px;
//           text-align: center;
//           color: #fff;
//           font-size: 14px;
//           font-weight: 600;
//         }

//         /* ================= MODAL ================= */

//         .modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.88);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 9999;
//           padding: 16px;
//         }

//         .login-modal {
//           background: radial-gradient(circle at top, #1c1c1c, #0f0f0f);
//           border: 3px solid #ffeb00;
//           border-radius: 20px;
//           padding: 32px 32px;
//           width: 100%;
//           max-width: 520px;
//           text-align: center;
//           box-shadow: 0 0 30px rgba(255, 235, 0, 0.25);
//           animation: popIn 0.25s ease-out;
//         }

//         .login-modal h2 {
//           color: #ffeb00;
//           font-family: "Jersey 25", cursive;
//           font-size: clamp(24px, 4vw, 34px);
//           margin: 0 0 10px 0;
//           letter-spacing: 1px;
//         }

//         .login-modal p {
//           color: #ffffff;
//           font-size: 15px;
//           margin: 0 0 24px 0;
//           opacity: 0.9;
//         }

//         .modal-actions {
//           display: flex;
//           gap: 14px;
//           justify-content: center;
//         }

//         .modal-actions button {
//           flex: 1;
//           height: 50px;
//           border-radius: 10px;
//           font-family: "Jersey 25", cursive;
//           font-size: 15px;
//           letter-spacing: 1px;
//           cursor: pointer;
//           transition: all 0.25s ease;
//           border: none;
//         }

//         .modal-actions .login-btn {
//           background: #ffeb00;
//           width: 100%;
//           color: #000;
//           border: none;
//           box-shadow: 0 4px 12px rgba(255, 235, 0, 0.35);
//         }

//         .modal-actions .login-btn:hover {
//           background: #ffd700;
//           transform: translateY(-2px);
//         }

//         .modal-actions .cancel-btn {
//           background: transparent;
//           color: #fff;
//           border: 2px solid #ffeb00 !important;
//         }

//         .modal-actions .cancel-btn:hover {
//           background: rgba(255, 235, 0, 0.12);
//         }

//         @keyframes popIn {
//           from {
//             transform: scale(0.88);
//             opacity: 0;
//           }
//           to {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }

//         /* ================= RESPONSIVE OVERRIDES ================= */

//         /* -------- Tablets portrait (768px–1024px) -------- */
//         @media (max-width: 1024px) {
//           .topControls {
//             flex-direction: column;
//             align-items: stretch;
//             gap: 12px;
//             padding: 0 16px;
//           }

//           .topControls .right {
//             width: 100%;
//           }

//           .searchBox {
//             width: 100%;
//             min-width: unset;
//           }

//           .actionsRow {
//             justify-content: flex-start;
//           }

//           .sort {
//             max-width: 220px;
//           }
//         }

//         /* -------- Tablets portrait (601px–767px) -------- */
//         @media (min-width: 601px) and (max-width: 767px) {
//           .mainContent.withSidebar {
//             margin-left: 0;
//           }

//           .filterSidebar {
//             width: 280px;
//           }

//           .products {
//             grid-template-columns: repeat(2, 1fr);
//             gap: 14px;
//             padding: 0 16px;
//           }

//           .topControls {
//             padding: 0 16px;
//           }

//           .actionsRow {
//             flex-wrap: nowrap;
//             overflow-x: auto;
//           }

//           .sort {
//             max-width: 160px;
//           }

//           .count {
//             display: none;
//           }
//         }

//         /* -------- Mobile (≤600px) -------- */
//         @media (max-width: 600px) {
//           .page {
//             flex-direction: column;
//           }

//           .mainContent.withSidebar {
//             margin-left: 0;
//           }

//           .filterSidebar {
//             width: 100%;
//             top: 0;
//             padding: 16px 16px 120px 16px;
//           }

//           .topSection {
//             padding: 16px 0 12px;
//           }

//           .topTitle {
//             font-size: clamp(20px, 6vw, 28px);
//             margin-bottom: 12px;
//           }

//           .topControls {
//             flex-direction: column;
//             align-items: stretch;
//             gap: 10px;
//             padding: 0 12px;
//           }

//           .topControls .left h2 {
//             font-size: 16px;
//           }

//           .topControls .left p {
//             font-size: 12px;
//             margin-bottom: 8px;
//           }

//           /* actionsRow: Filter btn | Sort select | stretch */
//           .actionsRow {
//             display: flex;
//             flex-wrap: nowrap;
//             align-items: center;
//             gap: 8px;
//           }

//           .filterBtn {
//             padding: 8px 10px;
//             font-size: 12px;
//             gap: 4px;
//             flex-shrink: 0;
//           }

//           .sort {
//             flex: 1 1 auto;
//             padding: 8px 6px;
//             font-size: 12px;
//             max-width: unset;
//             min-width: 0;
//           }

//           .count {
//             display: none;
//           }

//           .topControls .right {
//             width: 100%;
//           }

//           .searchBox {
//             width: 100%;
//             min-width: unset;
//             padding: 8px 12px;
//           }

//           .searchBox input {
//             font-size: 13px;
//           }

//           /* 2-column grid on mobile */
//           .products {
//             grid-template-columns: repeat(2, 1fr);
//             gap: 10px;
//             padding: 0 10px;
//             margin: 14px auto;
//           }

//           .imageWrap {
//             padding-top: 80%;
//           }

//           .discount {
//             font-size: 9px;
//             padding: 3px 6px;
//             border-radius: 4px;
//             top: 6px;
//             left: 6px;
//           }

//           .fav {
//             width: 28px;
//             height: 28px;
//             top: 6px;
//             right: 6px;
//           }

//           .fav svg {
//             width: 14px;
//             height: 14px;
//           }

//           .info {
//             padding: 8px;
//             gap: 4px;
//           }

//           .info h3 {
//             font-size: 11px;
//             line-height: 1.25;
//             display: -webkit-box;
//             -webkit-line-clamp: 2;
//             -webkit-box-orient: vertical;
//             overflow: hidden;
//           }

//           .specs {
//             display: none;
//           }

//           .rating {
//             font-size: 9px;
//           }

//           .rating span {
//             font-size: 9px;
//           }

//           .price {
//             font-size: 10px;
//           }

//           .price strong {
//             font-size: 13px;
//           }

//           .stock-warning {
//             font-size: 9px;
//             padding: 3px 5px;
//             line-height: 1.2;
//           }

//           .qty {
//             gap: 5px;
//             margin-top: 2px;
//           }

//           .qty button {
//             width: 22px;
//             height: 22px;
//             font-size: 12px;
//           }

//           .qty span {
//             min-width: 18px;
//             font-size: 12px;
//           }

//           .action-buttons {
//             padding: 6px 8px 8px;
//             gap: 5px;
//           }

//           .add-to-cart-btn,
//           .buy-btn {
//             height: 32px;
//             font-size: 10px;
//             border-radius: 5px;
//             padding: 0 4px;
//           }

//           .add-to-cart-btn-disabled {
//             height: 32px;
//             font-size: 10px;
//           }

//           .priceInputRow {
//             flex-direction: row;
//             gap: 6px;
//           }

//           .modal-actions {
//             flex-direction: column;
//             gap: 10px;
//           }

//           .modal-actions button {
//             height: 46px;
//             width: 100%;
//           }

//           .login-modal {
//             padding: 24px 18px;
//             border-radius: 16px;
//           }
//         }

//         /* -------- Very small phones (≤360px) -------- */
//         @media (max-width: 360px) {
//           .topTitle {
//             font-size: 20px;
//           }

//           .topControls {
//             padding: 0 10px;
//           }

//           .actionsRow {
//             gap: 6px;
//           }

//           .filterBtn {
//             padding: 7px 8px;
//             font-size: 11px;
//           }

//           .sort {
//             font-size: 11px;
//             padding: 7px 4px;
//           }

//           .products {
//             grid-template-columns: repeat(2, 1fr);
//             gap: 8px;
//             padding: 0 8px;
//           }

//           .imageWrap {
//             padding-top: 85%;
//           }

//           .info {
//             padding: 6px;
//             gap: 3px;
//           }

//           .info h3 {
//             font-size: 10px;
//           }

//           .price strong {
//             font-size: 12px;
//           }

//           .qty button {
//             width: 20px;
//             height: 20px;
//             font-size: 11px;
//           }

//           .qty span {
//             font-size: 11px;
//             min-width: 14px;
//           }

//           .action-buttons {
//             padding: 5px 6px 6px;
//             gap: 4px;
//           }

//           .add-to-cart-btn,
//           .buy-btn {
//             height: 28px;
//             font-size: 9px;
//           }
//         }
//           .card {
//   cursor: pointer;
// }
//   .card {
//   cursor: pointer;
// }
//       `}</style>

//       <Footer />
//     </>
//   );
// }

// /* ================= CARD ================= */

// const ProductCard = ({
//   product,
//   wishlistIds,
//   toggleWishlist,
//   requireLogin,
// }) => {
//   const [qty, setQty] = useState(1);
//   const [stockError, setStockError] = useState(null);
//   const { refreshCart, setOpenSideCart } = useCart();
//   const navigate = useNavigate();
//   // const [showLoginModal, setShowLoginModal] = useState(false);

//   const handleAddToCart = async (productId) => {
//     try {
//       await addToCartApi(productId, qty);
//       toast.success("Product added to cart 🛒");
//       await refreshCart();
//       setOpenSideCart(true);
//     } catch (error) {
//       if (error.response?.status === 401) {
//         requireLogin();
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   const isMaxStock = (currentQty) => {
//     return currentQty >= product.countInStock;
//   };

//   const increaseQty = () => {
//     if (qty >= product.countInStock) {
//       setStockError("Max stock reached");
//       return;
//     }
//     setStockError(null);
//     setQty((prev) => prev + 1);
//   };

//   const decreaseQty = () => {
//     if (qty <= 1) {
//       setQty(1);
//       return;
//     }
//     setStockError(null);
//     setQty((prev) => prev - 1);
//   };

//   return (
//     <div
//       className="card"
//       onClick={() => navigate(`/productspec/${product._id}`)}
//     >
//       <div className="imageWrap">
//         {product.discountPercent > 0 && (
//           <span className="discount">{product.discountPercent}% OFF</span>
//         )}

//         <img
//           src={product.images?.[0]?.url || "/images/Product1.png"}
//           alt={product.name}
//           loading="lazy"
//         />

//         <button
//           className={`fav ${wishlistIds.has(product._id) ? "active" : ""}`}
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleWishlist(product._id);
//           }}
//           aria-label={
//             wishlistIds.has(product._id)
//               ? "Remove from wishlist"
//               : "Add to wishlist"
//           }
//         >
//           <Heart />
//         </button>
//       </div>

//       <div className="info">
//         <h3>{product.name}</h3>

//         <div className="specs">
//           {product.highlights?.map((spec, i) => (
//             <span className="spec" key={i}>
//               {spec}
//             </span>
//           ))}
//         </div>

//         <div className="rating">
//           {"★".repeat(Math.round(product.rating || 0))}
//           {"☆".repeat(5 - Math.round(product.rating || 0))}
//           <span>({product.numReviews || 0})</span>
//         </div>

//         <div className="price">
//           {product.originalPrice && <del>₹{product.originalPrice}</del>}
//           <strong>₹{product.price}</strong>
//         </div>

//         {stockError && (
//           <div className="stock-warning">⚠️ {stockError}</div>
//         )}

//         {!stockError && isMaxStock(qty) && (
//           <div className="stock-warning">
//             📦 Max ({product.countInStock})
//           </div>
//         )}

//         <div className="qty">
//           <button onClick={(e) => {
//             e.stopPropagation();
//             decreaseQty();
//           }} aria-label="Decrease quantity">−</button>
//           <span>{qty}</span>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               increaseQty();
//             }}
//             disabled={isMaxStock(qty)}
//             aria-label="Increase quantity"
//             title={
//               isMaxStock(qty)
//                 ? stockError || "Maximum stock reached"
//                 : "Add one more"
//             }
//           >
//             +
//           </button>
//         </div>

//         <div className="action-buttons">
//           {product.countInStock > 0 ? (
//             <>
//               <button
//                 className="add-to-cart-btn"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleAddToCart(product._id);
//                 }}
//               >
//                 🛒 Add to Cart
//               </button>

//               <Link
//                 to={`/productspec/${product._id}`}
//                 className="action-link"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <button className="buy-btn">BUY NOW</button>
//               </Link>
//             </>
//           ) : (
//             <button
//               className="add-to-cart-btn-disabled"
//               disabled
//               style={{ width: "100%" }}
//             >
//               OUT OF STOCK
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= ICONS ================= */

// const FilterIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <line x1="4" y1="6" x2="20" y2="6" />
//     <line x1="7" y1="12" x2="17" y2="12" />
//     <line x1="10" y1="18" x2="14" y2="18" />
//   </svg>
// );

// const SearchIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#9fb3c8"
//     strokeWidth="2"
//   >
//     <circle cx="11" cy="11" r="7" />
//     <line x1="21" y1="21" x2="16.65" y2="16.65" />
//   </svg>
// );



import React, { useState, useMemo, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import { Heart } from "lucide-react";
import { useSearchParams } from "react-router-dom";
// import axios from "axios";
import api from "../api/axios";
import { addToCartApi } from "../api/cartApi";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/* ================= COMPONENT ================= */

export default function ProductPage() {
  const [sortOption, setSortOption] = useState("Featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [inStock, setInStock] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(null);
  const [wishlistIds, setWishlistIds] = useState(new Set());

  const [searchParams] = useSearchParams();
  const categoryName = decodeURIComponent(searchParams.get("category"));
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { refreshCart, setOpenSideCart } = useCart();
  const requireLogin = () => {
    setShowLoginModal(true);
  };

  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    rating: true,
    availability: true,
  });

  const filteredAndSortedData = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max,
    );

    if (selectedRatings.length > 0) {
      const minRating = Math.min(...selectedRatings);
      result = result.filter((p) => (p.rating || 0) >= minRating);
    }

    if (inStock) {
      result = result.filter((p) => p.countInStock > 0);
    }

    switch (sortOption) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Highest Rated":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "Best Discount":
        result.sort(
          (a, b) => b.originalPrice - b.price - (a.originalPrice - a.price),
        );
        break;
      case "Name: A to Z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [
    products,
    searchQuery,
    sortOption,
    selectedCategories,
    priceRange,
    selectedRatings,
    inStock,
  ]);

  useEffect(() => {
    const fetchCategoryId = async () => {
      try {
        const { data } = await api.get("/api/categories");
        const matched = data.find((cat) => cat.name === categoryName);
        if (matched) {
          setCategoryId(matched._id);
        }
      } catch (err) {
        console.error("Failed to fetch category", err);
      }
    };

    if (categoryName) fetchCategoryId();
  }, [categoryName]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/api/products", {
          params: { category: categoryId },
        });
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchProducts();
  }, [categoryId]);

  useEffect(() => {
    api
      .get("/api/wishlist")
      .then((res) => {
        const ids = new Set(res.data.wishlist.map((p) => p._id));
        setWishlistIds(ids);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setWishlistIds(new Set());
        }
      });
  }, []);

  const toggleWishlist = async (productId) => {
    try {
      await api.post("/api/wishlist/toggle", { productId });
      setWishlistIds((prev) => {
        const updated = new Set(prev);
        updated.has(productId)
          ? updated.delete(productId)
          : updated.add(productId);
        return updated;
      });
    } catch (err) {
      if (err.response?.status === 401) {
        requireLogin();
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const moveToCart = async (productId) => {
    try {
      await api.post("/api/wishlist/move-to-cart", { productId });
      setWishlistIds((prev) => {
        const updated = new Set(prev);
        updated.delete(productId);
        return updated;
      });
    } catch (err) {
      if (err.response?.status === 401) {
        requireLogin();
      }
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleRating = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating],
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 5000 });
    setSelectedRatings([]);
    setInStock(false);
    setSearchQuery("");
  };

  const closeFilterSidebar = () => {
    const el = document.querySelector(".filterSidebar");
    if (el) {
      el.classList.add("closing");
      setTimeout(() => setShowFilters(false), 300);
    } else {
      setShowFilters(false);
    }
  };

  return (
    <>
      <div className="page">
        {/* ================= FILTER SIDEBAR ================= */}
        {showFilters && (
          <div className="filterOverlay" onClick={closeFilterSidebar} />
        )}
        {showFilters && (
          <div className="filterSidebar">
            <div className="filterHeader">
              <h2>Filter</h2>
              <button className="closeBtn" onClick={closeFilterSidebar}>
                ✕
              </button>
            </div>

            <button className="clearAllBtn" onClick={clearAllFilters}>
              Clear All Filters
            </button>

            {/* Price */}
            <div className="filterSection">
              <button
                className="filterSectionHeader"
                onClick={() =>
                  setOpenSections((p) => ({ ...p, price: !p.price }))
                }
              >
                <span>Price</span>
                <span className="arrow">{openSections.price ? "–" : "+"}</span>
              </button>

              {openSections.price && (
                <div className="filterContent">
                  <div className="priceInputRow">
                    <input
                      type="number"
                      placeholder="0"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: Number(e.target.value),
                        })
                      }
                      className="priceInput"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="5000"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: Number(e.target.value),
                        })
                      }
                      className="priceInput"
                    />
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: Number(e.target.value),
                      })
                    }
                    className="priceSlider"
                    style={{
                      background: `linear-gradient(90deg, #ffeb00 ${Math.round(
                        (priceRange.max / 5000) * 100,
                      )}%, #000 ${Math.round((priceRange.max / 5000) * 100)}%)`,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Customer Rating */}
            <div className="filterSection">
              <button
                className="filterSectionHeader"
                onClick={() =>
                  setOpenSections((p) => ({ ...p, rating: !p.rating }))
                }
              >
                <span>Customer Rating</span>
                <span className="arrow">{openSections.rating ? "–" : "+"}</span>
              </button>

              {openSections.rating && (
                <div className="filterContent">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="checkboxLabel">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => toggleRating(rating)}
                      />
                      <span>{rating}★ & above</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="filterSection">
              <button
                className="filterSectionHeader"
                onClick={() =>
                  setOpenSections((p) => ({
                    ...p,
                    availability: !p.availability,
                  }))
                }
              >
                <span>Availability</span>
                <span className="arrow">
                  {openSections.availability ? "–" : "+"}
                </span>
              </button>

              {openSections.availability && (
                <div className="filterContent">
                  <label className="checkboxLabel">
                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={() => setInStock(!inStock)}
                    />
                    <span>In Stock</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= MAIN CONTENT ================= */}
        <div className={`mainContent ${showFilters ? "withSidebar" : ""}`}>
          {/* ================= TOP SECTION ================= */}
          <div className="topSection">
            <h1 className="topTitle">{categoryName}</h1>

            <div className="topControls">
              <div className="left">
                <h2>ALL PRODUCTS</h2>
                <p>
                  Showing {filteredAndSortedData.length} of {products.length}{" "}
                  products
                </p>

                <div className="actionsRow">
                  <button
                    className="filterBtn"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <FilterIcon />
                    Filters
                  </button>

                  <select
                    className="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Highest Rated</option>
                    <option>Best Discount</option>
                    <option>Name: A to Z</option>
                  </select>

                  <span className="count">
                    {filteredAndSortedData.length} products
                  </span>
                </div>
              </div>

              <div className="right">
                <div className="searchBox">
                  <SearchIcon />
                  <input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {showLoginModal && (
            <div
              className="modal-overlay"
              onClick={() => setShowLoginModal(false)}
            >
              <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Login Required</h2>
                <p>Please login to continue.</p>

                <div className="modal-actions">
                  <Link to="/login" style={{ flex: 1 }}>
                    <button className="login-btn">LOGIN</button>
                  </Link>

                  <button
                    className="cancel-btn"
                    onClick={() => setShowLoginModal(false)}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <p style={{ textAlign: "center", marginTop: 100 }}>
              Loading products...
            </p>
          ) : (
            <div className="products">
              {filteredAndSortedData.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  wishlistIds={wishlistIds}
                  toggleWishlist={toggleWishlist}
                  requireLogin={requireLogin}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= INTERNAL CSS ================= */}
      <style jsx>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: rgba(24, 23, 23, 1);
          font-family: Inter, system-ui, sans-serif;
        }

        .page {
          background: rgba(24, 23, 23, 1);
          color: #fff;
          min-height: 100vh;
          display: flex;
          position: relative;
          overflow-x: hidden;
        }

        /* ================= FILTER SIDEBAR ================= */

        .filterOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          z-index: 900;
          cursor: pointer;
        }

        .filterSidebar {
          position: fixed;
          left: 0;
          top: 90px;
          bottom: 0;
          width: 300px;
          background: #1e1e1e;
          color: #ffeb00;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          z-index: 1000;
          padding: 20px 20px 120px 20px;
          animation: slideIn 0.3s ease;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 235, 0, 0.25) transparent;
          border-right: 1px solid rgba(255, 235, 0, 0.15);
        }

        .filterSidebar::-webkit-scrollbar {
          width: 6px;
        }

        .filterSidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 235, 0, 0.2);
          border-radius: 6px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        .filterSidebar.closing {
          animation: slideOut 0.3s ease forwards;
        }

        .filterHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .filterHeader h2 {
          font-size: 26px;
          font-weight: 700;
          margin: 0;
        }

        .closeBtn {
          background: none;
          border: 1px solid rgba(255, 235, 0, 0.4);
          font-size: 18px;
          cursor: pointer;
          color: #ffeb00;
          padding: 0;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
          flex-shrink: 0;
        }

        .closeBtn:hover {
          background: rgba(255, 235, 0, 0.15);
        }

        .clearAllBtn {
          width: 100%;
          background: transparent;
          border: 2px solid #ffeb00;
          color: #ffeb00;
          padding: 10px 12px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 20px;
          text-decoration: underline;
          font-size: 14px;
          border-radius: 4px;
          transition: background 0.2s ease;
        }

        .clearAllBtn:hover {
          background: rgba(255, 235, 0, 0.1);
        }

        .filterSection {
          margin-bottom: 16px;
          border-bottom: 1px solid rgba(255, 235, 0, 0.1);
          padding-bottom: 14px;
        }

        .filterSectionHeader {
          width: 100%;
          background: none;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          font-weight: 700;
          padding: 8px 0;
          cursor: pointer;
          color: #ffeb00;
        }

        .arrow {
          font-size: 14px;
          font-weight: 400;
        }

        .filterContent {
          padding: 8px 0;
        }

        .checkboxLabel {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          font-size: 14px;
        }

        .checkboxLabel input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #ffeb00;
          flex-shrink: 0;
        }

        .priceInputRow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .priceInput {
          flex: 1;
          padding: 8px;
          border: 2px solid #ffeb00;
          background: transparent;
          color: #ffeb00;
          font-size: 13px;
          font-weight: 600;
          min-width: 0;
          border-radius: 4px;
          width: 100%;
        }

        .priceSlider {
          width: 100%;
          height: 6px;
          border-radius: 10px;
          background: #000;
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
        }

        .priceSlider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          background: #ffeb00;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }

        .priceSlider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: #ffeb00;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }

        /* ================= ACTION BUTTONS ================= */
        .action-buttons {
          display: flex;
          gap: 8px;
          padding: 10px;
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
          width: 100%;
          height: 42px;
          font-size: 13px;
          font-family: "Jersey 25", cursive;
          font-weight: 800;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
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
          height: 42px;
          background: #2a2a2a;
          color: #9ca3af;
          border: 2px solid #555;
          border-radius: 6px;
          font-family: "Jersey 25", cursive;
          font-size: 13px;
          font-weight: 800;
          cursor: not-allowed;
          opacity: 0.7;
          width: 100%;
        }

        .stock-warning {
          font-size: 11px;
          width: fit-content;
          max-width: 100%;
          color: #ff6b6b;
          background: rgba(255, 107, 107, 0.12);
          padding: 4px 7px;
          border-radius: 4px;
          border-left: 3px solid #ff6b6b;
          margin: 4px 0;
          font-weight: 500;
          line-height: 1.3;
        }

        /* ================= MAIN CONTENT ================= */

        .mainContent {
          flex: 1;
          min-width: 0;
          transition: margin-left 0.3s ease;
        }

        .mainContent.withSidebar {
          margin-left: 300px;
        }

        /* ================= TOP SECTION ================= */

        .topSection {
          background: rgba(24, 23, 23, 1);
          padding: 40px 0 24px;
          color: #fff;
        }

        .topTitle {
          font-family: "Jersey 25", cursive;
          font-size: clamp(32px, 5vw, 68px);
          font-weight: 400;
          text-align: center;
          margin: 0 0 32px 0;
          padding: 0 16px;
        }

        .topControls {
          max-width: 1260px;
          margin: auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
          flex-wrap: wrap;
        }

        .topControls .left {
          flex: 1 1 auto;
          min-width: 0;
        }

        .topControls .left h2 {
          font-family: "Jersey 25", cursive;
          color: #ffeb00;
          font-size: 26px;
          margin: 0 0 4px 0;
        }

        .topControls .left p {
          font-size: 13px;
          color: #9fb3c8;
          margin: 0 0 12px 0;
        }

        .actionsRow {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: nowrap;
        }

        .filterBtn {
          background: #ffeb00;
          color: #000;
          border: none;
          padding: 10px 14px;
          border-radius: 6px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          font-family: "Jersey 25", cursive;
          font-size: 14px;
          transition: all 0.3s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .filterBtn:hover {
          background: #ffd700;
        }

        .sort {
          background: #1e1e1e;
          border: 2px solid #ffeb00;
          color: #fff;
          padding: 9px 12px;
          border-radius: 6px;
          font-family: "Jersey 25", cursive;
          font-size: 13px;
          cursor: pointer;
          flex-shrink: 1;
          min-width: 0;
          max-width: 180px;
        }

        .sort option {
          background: #151515;
          color: #fff;
        }

        .count {
          font-size: 13px;
          color: #9fb3c8;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .topControls .right {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          flex-basis: auto;
        }

        .searchBox {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 2px solid #ffeb00;
          padding: 9px 12px;
          border-radius: 6px;
          width: 260px;
          background: #1a1a1a;
        }

        .searchBox input {
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          width: 100%;
          font-size: 14px;
          min-width: 0;
        }

        .searchBox input::placeholder {
          color: #666;
        }

        /* ================= PRODUCTS GRID ================= */

        .products {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 18px;
          max-width: 1380px;
          margin: 28px auto;
          padding: 0 20px;
        }

        /* ===== CARD ===== */
        .card {
          background: #151515;
          border: 1.34px solid #ffeb00;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
          width: 100%;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(255, 235, 0, 0.12);
        }

        .imageWrap {
          position: relative;
          width: 100%;
          padding-top: 75%; /* 4:3 aspect ratio */
          overflow: hidden;
        }

        .imageWrap img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .card:hover .imageWrap img {
          transform: scale(1.06);
        }

        .discount {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #ff0000;
          color: white;
          padding: 4px 10px;
          font-size: 12px;
          font-weight: 800;
          border-radius: 6px;
          z-index: 1;
          letter-spacing: 0.5px;
        }

        .fav {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 36px;
          height: 36px;
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

        .fav:hover {
          background: rgba(255, 235, 0, 0.2);
          transform: scale(1.1);
        }

        .fav svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: #ffeb00;
          stroke-width: 2;
        }

        .fav.active {
          background: #ffeb00;
        }

        .fav.active svg {
          fill: #ff0000;
          stroke: #ff0000;
        }

        .fav:not(.active) svg {
          fill: none;
          stroke: #ffeb00;
        }

        .info {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .info h3 {
          font-size: 13px;
          font-weight: 700;
          line-height: 1.35;
          margin: 0;
          color: #fff;
        }

        .specs {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }

        .specs span {
          font-size: 10px;
          border: 1px solid #ffeb00;
          padding: 2px 5px;
          border-radius: 4px;
          color: #ffeb00;
          white-space: nowrap;
        }

        .rating {
          color: #ffeb00;
          font-size: 11px;
          font-weight: 600;
        }

        .rating span {
          color: #888;
          margin-left: 4px;
          font-size: 11px;
        }

        .price {
          font-size: 12px;
          color: #888;
          line-height: 1.3;
          margin: 0;
        }

        .price strong {
          color: #ffeb00;
          font-size: 17px;
          display: block;
          margin-top: 2px;
        }

        .price .off {
          color: #4caf50;
          font-size: 11px;
          font-weight: 600;
        }

        .qty {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
        }

        .qty button {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid #ffeb00;
          background: transparent;
          color: #ffeb00;
          cursor: pointer;
          font-weight: 700;
          font-size: 14px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .qty button:hover:not(:disabled) {
          background: rgba(255, 235, 0, 0.15);
        }

        .qty button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          color: #999;
          background: rgba(255, 0, 0, 0.08);
          border-color: #555;
        }

        .qty span {
          min-width: 28px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
        }

        /* ================= MODAL ================= */

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
        }

        .login-modal {
          background: radial-gradient(circle at top, #1c1c1c, #0f0f0f);
          border: 3px solid #ffeb00;
          border-radius: 20px;
          padding: 32px 32px;
          width: 100%;
          max-width: 520px;
          text-align: center;
          box-shadow: 0 0 30px rgba(255, 235, 0, 0.25);
          animation: popIn 0.25s ease-out;
        }

        .login-modal h2 {
          color: #ffeb00;
          font-family: "Jersey 25", cursive;
          font-size: clamp(24px, 4vw, 34px);
          margin: 0 0 10px 0;
          letter-spacing: 1px;
        }

        .login-modal p {
          color: #ffffff;
          font-size: 15px;
          margin: 0 0 24px 0;
          opacity: 0.9;
        }

        .modal-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
        }

        .modal-actions button {
          flex: 1;
          height: 50px;
          border-radius: 10px;
          font-family: "Jersey 25", cursive;
          font-size: 15px;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.25s ease;
          border: none;
        }

        .modal-actions .login-btn {
          background: #ffeb00;
          width: 100%;
          color: #000;
          border: none;
          box-shadow: 0 4px 12px rgba(255, 235, 0, 0.35);
        }

        .modal-actions .login-btn:hover {
          background: #ffd700;
          transform: translateY(-2px);
        }

        .modal-actions .cancel-btn {
          background: transparent;
          color: #fff;
          border: 2px solid #ffeb00 !important;
        }

        .modal-actions .cancel-btn:hover {
          background: rgba(255, 235, 0, 0.12);
        }

        @keyframes popIn {
          from {
            transform: scale(0.88);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* ================= CAROUSEL DOTS ================= */

        .carousel-dots {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 5px;
          z-index: 5;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .imageWrap:hover .carousel-dots {
          opacity: 1;
        }

        .carousel-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.45);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease;
          flex-shrink: 0;
        }

        .carousel-dot.active {
          background: #ffeb00;
          transform: scale(1.35);
        }

        /* ================= RESPONSIVE OVERRIDES ================= */

        /* -------- Tablets portrait (768px–1024px) -------- */
        @media (max-width: 1024px) {
          .topControls {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding: 0 16px;
          }

          .topControls .right {
            width: 100%;
          }

          .searchBox {
            width: 100%;
            min-width: unset;
          }

          .actionsRow {
            justify-content: flex-start;
          }

          .sort {
            max-width: 220px;
          }
        }

        /* -------- Tablets portrait (601px–767px) -------- */
        @media (min-width: 601px) and (max-width: 767px) {
          .mainContent.withSidebar {
            margin-left: 0;
          }

          .filterSidebar {
            width: 280px;
          }

          .products {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
            padding: 0 16px;
          }

          .topControls {
            padding: 0 16px;
          }

          .actionsRow {
            flex-wrap: nowrap;
            overflow-x: auto;
          }

          .sort {
            max-width: 160px;
          }

          .count {
            display: none;
          }
        }

        /* -------- Mobile (≤600px) -------- */
        @media (max-width: 600px) {
          .page {
            flex-direction: column;
          }

          .mainContent.withSidebar {
            margin-left: 0;
          }

          .filterSidebar {
            width: 100%;
            top: 0;
            padding: 16px 16px 120px 16px;
          }

          .topSection {
            padding: 16px 0 12px;
          }

          .topTitle {
            font-size: clamp(20px, 6vw, 28px);
            margin-bottom: 12px;
          }

          .topControls {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            padding: 0 12px;
          }

          .topControls .left h2 {
            font-size: 16px;
          }

          .topControls .left p {
            font-size: 12px;
            margin-bottom: 8px;
          }

          /* actionsRow: Filter btn | Sort select | stretch */
          .actionsRow {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            gap: 8px;
          }

          .filterBtn {
            padding: 8px 10px;
            font-size: 12px;
            gap: 4px;
            flex-shrink: 0;
          }

          .sort {
            flex: 1 1 auto;
            padding: 8px 6px;
            font-size: 12px;
            max-width: unset;
            min-width: 0;
          }

          .count {
            display: none;
          }

          .topControls .right {
            width: 100%;
          }

          .searchBox {
            width: 100%;
            min-width: unset;
            padding: 8px 12px;
          }

          .searchBox input {
            font-size: 13px;
          }

          /* 2-column grid on mobile */
          .products {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            padding: 0 10px;
            margin: 14px auto;
          }

          .imageWrap {
            padding-top: 80%;
          }

          .discount {
            font-size: 9px;
            padding: 3px 6px;
            border-radius: 4px;
            top: 6px;
            left: 6px;
          }

          .fav {
            width: 28px;
            height: 28px;
            top: 6px;
            right: 6px;
          }

          .fav svg {
            width: 14px;
            height: 14px;
          }

          .info {
            padding: 8px;
            gap: 4px;
          }

          .info h3 {
            font-size: 11px;
            line-height: 1.25;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .specs {
            display: none;
          }

          .rating {
            font-size: 9px;
          }

          .rating span {
            font-size: 9px;
          }

          .price {
            font-size: 10px;
          }

          .price strong {
            font-size: 13px;
          }

          .stock-warning {
            font-size: 9px;
            padding: 3px 5px;
            line-height: 1.2;
          }

          .qty {
            gap: 5px;
            margin-top: 2px;
          }

          .qty button {
            width: 22px;
            height: 22px;
            font-size: 12px;
          }

          .qty span {
            min-width: 18px;
            font-size: 12px;
          }

          .action-buttons {
            padding: 6px 8px 8px;
            gap: 5px;
          }

          .add-to-cart-btn,
          .buy-btn {
            height: 32px;
            font-size: 10px;
            border-radius: 5px;
            padding: 0 4px;
          }

          .add-to-cart-btn-disabled {
            height: 32px;
            font-size: 10px;
          }

          .priceInputRow {
            flex-direction: row;
            gap: 6px;
          }

          .modal-actions {
            flex-direction: column;
            gap: 10px;
          }

          .modal-actions button {
            height: 46px;
            width: 100%;
          }

          .login-modal {
            padding: 24px 18px;
            border-radius: 16px;
          }
        }

        /* -------- Very small phones (≤360px) -------- */
        @media (max-width: 360px) {
          .topTitle {
            font-size: 20px;
          }

          .topControls {
            padding: 0 10px;
          }

          .actionsRow {
            gap: 6px;
          }

          .filterBtn {
            padding: 7px 8px;
            font-size: 11px;
          }

          .sort {
            font-size: 11px;
            padding: 7px 4px;
          }

          .products {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            padding: 0 8px;
          }

          .imageWrap {
            padding-top: 85%;
          }

          .info {
            padding: 6px;
            gap: 3px;
          }

          .info h3 {
            font-size: 10px;
          }

          .price strong {
            font-size: 12px;
          }

          .qty button {
            width: 20px;
            height: 20px;
            font-size: 11px;
          }

          .qty span {
            font-size: 11px;
            min-width: 14px;
          }

          .action-buttons {
            padding: 5px 6px 6px;
            gap: 4px;
          }

          .add-to-cart-btn,
          .buy-btn {
            height: 28px;
            font-size: 9px;
          }
        }
          .card {
  cursor: pointer;
}
  .card {
  cursor: pointer;
}
      `}</style>

      <Footer />
    </>
  );
}

/* ================= CARD ================= */

const ProductCard = ({
  product,
  wishlistIds,
  toggleWishlist,
  requireLogin,
}) => {
  const [qty, setQty] = useState(1);
  const [stockError, setStockError] = useState(null);
  const { refreshCart, setOpenSideCart } = useCart();
  const navigate = useNavigate();
  // const [showLoginModal, setShowLoginModal] = useState(false);

  // ── Carousel state (new) ──────────────────────────────────────────────────
  const images = product.images?.length > 0 ? product.images : [{ url: "/images/Product1.png" }];
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef(null);

  // Auto-advance every 3 s while the card is hovered and there are multiple images
  useEffect(() => {
    if (!isHovered || images.length <= 1) return;
    carouselRef.current = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(carouselRef.current);
  }, [isHovered, images.length]);

  // Reset to first image when cursor leaves
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCarouselIndex(0);
    clearInterval(carouselRef.current);
  };
  // ─────────────────────────────────────────────────────────────────────────

  const handleAddToCart = async (productId) => {
    try {
      await addToCartApi(productId, qty);
      toast.success("Product added to cart 🛒");
      await refreshCart();
      setOpenSideCart(true);
    } catch (error) {
      if (error.response?.status === 401) {
        requireLogin();
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const isMaxStock = (currentQty) => {
    return currentQty >= product.countInStock;
  };

  const increaseQty = () => {
    if (qty >= product.countInStock) {
      setStockError("Max stock reached");
      return;
    }
    setStockError(null);
    setQty((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (qty <= 1) {
      setQty(1);
      return;
    }
    setStockError(null);
    setQty((prev) => prev - 1);
  };

  return (
    <div
      className="card"
      onClick={() => navigate(`/productspec/${product._id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="imageWrap">
        {product.discountPercent > 0 && (
          <span className="discount">{product.discountPercent}% OFF</span>
        )}

        {/* ── Carousel image (replaces the original single <img>) ── */}
        <img
          src={images[carouselIndex]?.url || "/images/Product1.png"}
          alt={product.name}
          loading="lazy"
          style={{ transition: "opacity 0.4s ease, transform 0.4s ease" }}
        />

        {/* ── Dot indicators (only shown when there are multiple images) ── */}
        {images.length > 1 && (
          <div className="carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === carouselIndex ? " active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIndex(i);
                  // restart the 3-s timer from this dot
                  clearInterval(carouselRef.current);
                  if (isHovered) {
                    carouselRef.current = setInterval(() => {
                      setCarouselIndex((prev) => (prev + 1) % images.length);
                    }, 3000);
                  }
                }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
        {/* ─────────────────────────────────────────────────────────── */}

        <button
          className={`fav ${wishlistIds.has(product._id) ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product._id);
          }}
          aria-label={
            wishlistIds.has(product._id)
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <Heart />
        </button>
      </div>

      <div className="info">
        <h3>{product.name}</h3>

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
          <span>({product.numReviews || 0})</span>
        </div>

        <div className="price">
          {product.originalPrice && <del>₹{product.originalPrice}</del>}
          <strong>₹{product.price}</strong>
        </div>

        {stockError && (
          <div className="stock-warning">⚠️ {stockError}</div>
        )}

        {!stockError && isMaxStock(qty) && (
          <div className="stock-warning">
            📦 Max ({product.countInStock})
          </div>
        )}

        <div className="qty">
          <button onClick={(e) => {
            e.stopPropagation();
            decreaseQty();
          }} aria-label="Decrease quantity">−</button>
          <span>{qty}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              increaseQty();
            }}
            disabled={isMaxStock(qty)}
            aria-label="Increase quantity"
            title={
              isMaxStock(qty)
                ? stockError || "Maximum stock reached"
                : "Add one more"
            }
          >
            +
          </button>
        </div>

        <div className="action-buttons">
          {product.countInStock > 0 ? (
            <>
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product._id);
                }}
              >
                🛒 Add to Cart
              </button>

              <Link
                to={`/productspec/${product._id}`}
                className="action-link"
                onClick={(e) => e.stopPropagation()}
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
    </div>
  );
};

/* ================= ICONS ================= */

const FilterIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="7" y1="12" x2="17" y2="12" />
    <line x1="10" y1="18" x2="14" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9fb3c8"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);