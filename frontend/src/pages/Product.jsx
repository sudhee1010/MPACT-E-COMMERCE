// import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { Heart } from "lucide-react";
// import Footer from "../components/Footer";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { addToCartApi } from "../api/cartApi";
// import toast from "react-hot-toast";
// import { useCart } from "../context/CartContext";
// import OfferScrollBar from "../components/OfferScrollBar";

// /* ================= CAROUSEL HOOK ================= */
// function useProductCarousel(images = []) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const intervalRef = useRef(null);

//   const startCarousel = () => {
//     if (images.length <= 1) return;
//     setIsHovered(true);
//     intervalRef.current = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % images.length);
//     }, 3000);
//   };

//   const stopCarousel = () => {
//     setIsHovered(false);
//     clearInterval(intervalRef.current);
//     intervalRef.current = null;
//     setActiveIndex(0);
//   };

//   useEffect(() => {
//     return () => clearInterval(intervalRef.current);
//   }, []);

//   return { activeIndex, isHovered, startCarousel, stopCarousel };
// }

// /* ================= PRODUCT CARD WITH CAROUSEL ================= */
// function ProductCard({ product, wishlist, toggleWishlist, handleAddToCart, navigate }) {
//   const images = product.images?.length > 0 ? product.images : [{ url: "/images/Product1.png" }];
//   const { activeIndex, isHovered, startCarousel, stopCarousel } = useProductCarousel(images);

//   return (
//     <div
//       className="product-card"
//       key={product._id}
//       onClick={() => navigate(`/productspec/${product._id}`)}
//       onMouseEnter={startCarousel}
//       onMouseLeave={stopCarousel}
//     >
//       <div
//         className={`discount-badge ${product.discountPercent ? "show" : "hide"
//           }`}
//       >
//         {product.discountPercent
//           ? `${product.discountPercent}% OFF`
//           : ""}
//       </div>

//       {/* ❤️ WISHLIST */}
//       <button
//         className={`favorite-btn ${wishlist.includes(product._id) ? "active" : ""
//           }`}
//         onClick={(e) => {
//           e.stopPropagation();
//           toggleWishlist(product._id);
//         }}
//       >
//         <Heart />
//       </button>

//       <div className="product-image-container">
//         {/* Carousel dots — only show when multiple images exist and card is hovered */}
//         {images.length > 1 && isHovered && (
//           <div className="carousel-dots">
//             {images.map((_, i) => (
//               <span
//                 key={i}
//                 className={`carousel-dot ${i === activeIndex ? "active" : ""}`}
//               />
//             ))}
//           </div>
//         )}

//         <img
//           src={images[activeIndex]?.url || "/images/Product1.png"}
//           alt={product.name}
//           className={isHovered && images.length > 1 ? "carousel-transition" : ""}
//         />
//       </div>

//       <div className="product-title">{product.name}</div>

//       <div className="specs">
//         {product.highlights?.map((spec, i) => (
//           <span className="spec" key={i}>
//             {spec}
//           </span>
//         ))}
//       </div>

//       {/* Description - Hidden on mobile via CSS */}
//       <p
//         style={{
//           fontSize: "10px",
//           color: "#9ca3af",
//           marginBottom: "0.5rem",
//           padding: "0 12px",
//         }}
//       >
//         {product.description}
//       </p>

//       <div className="rating">
//         {"★".repeat(Math.round(product.rating || 0))}
//         {"☆".repeat(5 - Math.round(product.rating || 0))}
//       </div>
//       <div className="reviews">({product.numReviews || 0})</div>
//       {product.originalPrice && (
//         <div className="price-box">
//           <span className="old-price">
//             ₹{product.originalPrice}
//           </span>
//         </div>
//       )}
//       <div className="price">₹{product.price}</div>

//       <div className="action-buttons">
//         {product.countInStock > 0 ? (
//           <>
//             <button
//               className="add-to-cart-btn"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleAddToCart(product._id);
//               }}
//             >
//               🛒 Add to Cart
//             </button>

//             <Link
//               to={`/productspec/${product._id}`}
//               className="action-link"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button className="buy-btn">BUY</button>
//             </Link>
//           </>
//         ) : (
//           <button
//             className="add-to-cart-btn-disabled"
//             disabled
//             style={{ width: "100%" }}
//           >
//             OUT OF STOCK
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function Products() {
//   const [categories, setCategories] = useState([]);
//   const [productsByCategory, setProductsByCategory] = useState({});
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const navigate = useNavigate();
//   const { refreshCart, setOpenSideCart } = useCart();

//   /* ================= FETCH CATEGORIES ================= */
//   useEffect(() => {
//     api
//       .get("/api/categories")
//       .then((res) => {
//         // Only show active categories
//         const activeCategories = res.data.filter(cat => cat.isActive);
//         setCategories(activeCategories);
//       })
//       .catch(() => setError("Failed to load categories"));
//   }, []);

//   /* ================= FETCH PRODUCTS PER CATEGORY ================= */
//   useEffect(() => {
//     if (!categories.length) return;

//     setLoading(true);
//     Promise.all(
//       categories.map((cat) =>
//         api.get("/api/products", {
//           params: {
//             category: cat._id,
//             page: 1,
//             limit: 4 // Show only 4 products per category
//           },
//         })
//       )
//     )
//       .then((results) => {
//         const grouped = {};
//         categories.forEach((cat, i) => {
//           grouped[cat.name] = results[i].data.products || [];
//         });
//         setProductsByCategory(grouped);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load products");
//         setLoading(false);
//       });
//   }, [categories]);

//   /* ================= FETCH WISHLIST ================= */
//   useEffect(() => {
//     api
//       .get("/api/wishlist")
//       .then((res) => {
//         setWishlist(res.data.wishlist.map((p) => p._id));
//       })
//       .catch((err) => {
//         if (err.response?.status === 401) {
//           // user not logged in → silently ignore
//         }
//       });
//   }, []);

//   /* ================= ❤️ TOGGLE WISHLIST ================= */
//   const toggleWishlist = async (productId) => {
//     try {
//       const res = await api.post("/api/wishlist/toggle", { productId });

//       if (res.data.action === "added") {
//         setWishlist((prev) => [...prev, productId]);
//       } else {
//         setWishlist((prev) => prev.filter((id) => id !== productId));
//       }
//     } catch (err) {
//       if (err.response?.status === 401) {
//         setShowLoginModal(true);
//       }
//     }
//   };

//   const handleAddToCart = async (productId) => {
//     try {
//       await addToCartApi(productId, 1);
//       await refreshCart();
//       setOpenSideCart(true);
//       toast.success("Product added to cart 🛒");
//     } catch (error) {

//       const status = error.response?.status;
//       const message = error.response?.data?.message;

//       // ✅ STOCK ERROR (400)
//       if (status === 400) {
//         toast.error(message || "Stock not available");
//         return; // 🚫 STOP here, DO NOT open login modal
//       }

//       // ✅ LOGIN ERROR (401)
//       if (status === 401) {
//         toast.error("Please login to add to cart");
//         setShowLoginModal(true);
//         return;
//       }

//       // ✅ fallback
//       toast.error("Something went wrong");
//     }
//   };


//   if (loading) {
//     return (
//       <p style={{ textAlign: "center", marginTop: 100, color: "#ffeb00" }}>
//         Loading products...
//       </p>
//     );
//   }

//   if (error) {
//     return (
//       <p style={{ textAlign: "center", marginTop: 100, color: "red" }}>
//         {error}
//       </p>
//     );
//   }
//   return (
//     <>
//       <style>{`
// /* ================= PAGE LAYOUT ================= */
// .page-wrapper {
//   padding-top: 35px;
// }

// .products-page {
//   max-width: 1800px;
//   margin: auto;
//   padding: clamp(16px, 4vw, 60px);
//   min-height: 100vh;
// }

// /* ================= TITLE ================= */
// .page-title {
//   text-align: center;
//   font-family: 'Jersey 25', cursive;
//   font-size: clamp(32px, 6vw, 72px);
//   font-weight: 400;
//   margin: 24px 0 40px;
//   color: black;
//   -webkit-text-stroke: 2px #ffeb00;
// }

// /* ================= SECTION ================= */
// .section {
//   margin-bottom: 64px;
// }

// .section-title {
//   font-family: "Jersey 25", cursive;
//   font-size: clamp(36px, 6vw, 72px);
//   font-weight: 200;
//   max-width: 1240px;
//   margin: 0 auto 16px;    
//   padding: 0 8px;         
// }

// /* ================= PRODUCT GRID ================= */
// .product-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(280px, 291.51px));
//   gap: 18px;
//   justify-content: center;
//   max-width: 1380px;
//   margin: 30px auto;
//   padding: 0 8px;
// }

// /* ================= PRODUCT CARD ================= */
// .product-card {
//   width: 100%;
//   height: auto;
//   min-height: 600px;
//   background: #151515;
//   border: 1.34px solid #ffeb00;
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   border-radius: 20px;
//   overflow: hidden;
//   transition: box-shadow 0.3s ease;
// }

// .product-card:hover {
//   box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
// }

// /* ================= DISCOUNT BADGE ================= */
// .discount-badge {
//   position: absolute;
//   top: 12px;
//   left: 12px;
//   background: #ff0000;
//   color: white;
//   padding: 6px 12px;
//   font-size: 14px;
//   font-weight: 800;
//   border-radius: 8px;
//   z-index: 1;
// }

// .discount-badge.hide {
//   visibility: hidden;
// }

// .discount-badge.show {
//   visibility: visible;
// }

// /* ================= FAVORITE BUTTON ================= */
// .favorite-btn {
//   position: absolute;
//   top: 12px;
//   right: 12px;
//   width: 40px;
//   height: 40px;
//   background: rgba(0, 0, 0, 0.7);
//   border: 1px solid #ffeb00;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   z-index: 10;
// }

// .favorite-btn:hover {
//   background: rgba(255, 235, 0, 0.2);
//   transform: scale(1.1);
// }

// .favorite-btn.active {
//   background: #ffeb00;
// }

// .favorite-btn svg {
//   width: 20px;
//   height: 20px;
// }
//   .product-card {
//   cursor: pointer;
// }

// .product-card:hover {
//   transform: translateY(-6px);
//   transition: all 0.3s ease;
// }

// .favorite-btn.active svg {
//   fill: #ff0000;
//   stroke: #ff0000;
// }

// .favorite-btn:not(.active) svg {
//   stroke: #ffeb00;
//   fill: none;
// }

// /* ================= IMAGE ================= */
// .product-image-container {
//   width: 100%;
//   height: 360px;
//   overflow: hidden;
//   position: relative;
// }

// .product-card img {
//   width: 100%;
//   height: 100%;
//   object-fit: fill;
//   transition: transform 0.4s ease;
// }

// .product-card:hover img {
//   transform: scale(1.06);
// }

// /* ================= CAROUSEL ================= */
// .product-card img.carousel-transition {
//   animation: carouselFade 0.5s ease-in-out;
// }

// @keyframes carouselFade {
//   0%   { opacity: 0.4; transform: scale(1.04); }
//   100% { opacity: 1;   transform: scale(1.06); }
// }

// .carousel-dots {
//   position: absolute;
//   bottom: 8px;
//   left: 50%;
//   transform: translateX(-50%);
//   display: flex;
//   gap: 5px;
//   z-index: 5;
//   pointer-events: none;
// }

// .carousel-dot {
//   width: 6px;
//   height: 6px;
//   border-radius: 50%;
//   background: rgba(255, 255, 255, 0.45);
//   transition: background 0.3s ease, transform 0.3s ease;
// }

// .carousel-dot.active {
//   background: #ffeb00;
//   transform: scale(1.4);
// }

// /* ================= TITLE ================= */
// .product-title {
//   font-size: 14px;
//   font-weight: 800;
//   color: #ffffff;
//   padding: 12px 12px 0;
//   display: -webkit-box;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
//   line-height: 1.3;
// }

// /* ================= SPECS ================= */
// .specs {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 6px;
//   padding: 6px 12px;
// }

// .spec {
//   font-size: 10px;
//   border: 1px solid #ffeb00;
//   padding: 3px 6px;
//   border-radius: 4px;
//   color: #ffeb00;
//   white-space: nowrap;
// }

// /* ================= RATING ================= */
// .rating {
//   color: #ffeb00;
//   font-size: 12px;
//   font-weight: 600;
//   padding: 0 12px;
// }

// .reviews {
//   color: #aaa;
//   font-size: 12px;
//   padding: 0 12px;
// }

// /* ================= PRICE ================= */
// .price-box {
//   padding: 6px 12px 0;
// }

// .old-price {
//   font-size: 12px;
//   color: #888;
//   text-decoration: line-through;
// }

// .price {
//   padding: 0 12px;
//   font-size: 20px;
//   color: #4caf50;
//   font-weight: 800;
// }

// /* ================= ACTION BUTTONS ================= */
// .action-buttons {
//   display: flex;
//   gap: 8px;
//   padding: 12px;
//   margin-top: auto;
// }

// .action-link {
//   flex: 1;
//   display: flex;
//   text-decoration: none;
// }

// .add-to-cart-btn,
// .buy-btn {
//   flex: 1;
//   height: 48px;
//   font-size: 15px;
//   font-family: "Jersey 25", cursive;
//   font-weight: 800;
//   border-radius: 8px;
//   cursor: pointer;
//   transition: all 0.25s ease;
// }

// .add-to-cart-btn {
//   background: transparent;
//   color: #fff;
//   border: 2px solid #ffeb00;
// }

// .add-to-cart-btn:hover {
//   background: #ffeb00;
//   color: #000;
// }

// .buy-btn {
//   background: #ffeb00;
//   color: #000;
//   border: 2px solid #ffeb00;
// }

// .buy-btn:hover {
//   background: gold;
// }
// .add-to-cart-btn-disabled {
//   height: 48px;
//   background: #2a2a2a;
//   color: #9ca3af;
//   border: 2px solid #555;
//   border-radius: 8px;
//   font-family: "Jersey 25", cursive;
//   font-size: 15px;
//   font-weight: 800;
//   cursor: not-allowed;
//   opacity: 0.7;
// }

// /* ================= SEE MORE ================= */
// .see-more {
//   display: flex;
//   justify-content: flex-end;
//   margin-top: 24px;
//   max-width: 1230px;
//   margin-left: auto;
//   margin-right: auto;
//   padding-right: 8px;
// }

// .see-more a {
//   text-decoration: none;
// }

// .see-more button {
//   background: transparent;
//   color: #ffeb00;
//   border: 2px solid #ffeb00;
//   padding: 10px 22px;
//   font-size: 14px;
//   font-weight: 800;
//   font-family: "Jersey 25", cursive;
//   cursor: pointer;
//   border-radius: 8px;
//   transition: all 0.25s ease;
// }

// .see-more button:hover {
//   background: #ffeb00;
//   color: #000;
//   transform: translatex(4px);
// }

// .offer-full {
//   position: relative;
//   left: 50%;
//   right: 50%;
//   margin-left: -50vw;
//   margin-right: -50vw;
//   width: 100vw;
// }

// /* ================= MODAL ================= */
// .modal-overlay {
//   position: fixed;
//   inset: 0;
//   background: rgba(0, 0, 0, 0.85);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 9999;
//   padding: 16px;
// }

// .login-modal {
//   background: #151515;
//   border: 2px solid #ffeb00;
//   border-radius: 20px;
//   padding: 32px;
//   width: 90%;
//   max-width: 420px;
//   text-align: center;
//   animation: popIn 0.3s ease;
// }

// .login-modal h2 {
//   color: #ffeb00;
//   font-family: "Jersey 25", cursive;
//   font-size: 32px;
//   margin-bottom: 12px;
// }

// .login-modal p {
//   color: #ffffff;
//   font-size: 14px;
//   margin-bottom: 24px;
// }

// .modal-actions {
//   display: flex;
//   gap: 12px;
// }

// .modal-actions button,
// .modal-actions .buy-btn,
// .modal-actions .add-to-cart-btn {
//   flex: 1;
//   height: 48px;
// }

// @keyframes popIn {
//   from {
//     transform: scale(0.85);
//     opacity: 0;
//   }
//   to {
//     transform: scale(1);
//     opacity: 1;
//   }
// }

// /* ================= RESPONSIVE BREAKPOINTS ================= */

// /* Tablets (1024px and below) */
// @media (max-width: 1024px) {
//   .section-title {
//     text-align: center;
//   }

//   .see-more {
//     justify-content: center;
//   }

//   .product-grid {
//     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
//     gap: 16px;
//   }

//   .product-card {
//     min-height: 550px;
//   }

//   .product-image-container {
//     height: 280px;
//   }
// }

// /* Small tablets and large phones (768px and below) */
// @media (max-width: 768px) {
//   .products-page {
//     padding: 16px;
//   }

//   .page-title {
//     margin: 16px 0 24px;
//     -webkit-text-stroke: 1.5px #ffeb00;
//   }

//   .section {
//     margin-bottom: 40px;
//   }

//   .section-title {
//     font-size: clamp(28px, 5vw, 48px);
//     margin-bottom: 12px;
//   }

//   .product-grid {
//     grid-template-columns: repeat(2, 1fr);
//     gap: 12px;
//     padding: 0 4px;
//     margin: 20px auto;
//   }

//   .product-card {
//     min-height: 400px;
//     border-radius: 16px;
//   }

//   .product-image-container {
//     height: 180px;
//   }

//   .discount-badge {
//     top: 8px;
//     left: 8px;
//     padding: 4px 8px;
//     font-size: 11px;
//     border-radius: 6px;
//   }

//   .favorite-btn {
//     width: 32px;
//     height: 32px;
//     top: 8px;
//     right: 8px;
//   }

//   .favorite-btn svg {
//     width: 16px;
//     height: 16px;
//   }

//   .product-title {
//     font-size: 12px;
//     padding: 8px 8px 0;
//     -webkit-line-clamp: 2;
//   }

//   /* Hide specs on mobile to save space */
//   .specs {
//     display: none;
//   }

//   .rating {
//     font-size: 10px;
//     padding: 0 8px;
//   }

//   .reviews {
//     font-size: 10px;
//     padding: 0 8px;
//   }

//   .price-box {
//     padding: 4px 8px 0;
//   }

//   .old-price {
//     font-size: 10px;
//   }

//   .price {
//     padding: 0 8px;
//     font-size: 16px;
//   }

//   /* Hide description paragraph */
//   p[style*="font-size: 10px"] {
//     display: none !important;
//   }

//   .action-buttons {
//     padding: 8px;
//     gap: 6px;
//   }

//   .add-to-cart-btn,
//   .buy-btn {
//     height: 36px;
//     font-size: 11px;
//     border-radius: 6px;
//   }

//   .add-to-cart-btn-disabled {
//     height: 36px;
//     font-size: 11px;
//     border-radius: 6px;
//   }

//   .see-more {
//     margin-top: 16px;
//   }

//   .see-more button {
//     padding: 8px 18px;
//     font-size: 12px;
//   }
// }

// /* Small phones (480px and below) */
// @media (max-width: 480px) {
//   .products-page {
//     padding: 12px;
//   }

//   .page-title {
//     font-size: 28px;
//     margin: 12px 0 20px;
//     -webkit-text-stroke: 1px #ffeb00;
//   }

//   .section-title {
//     font-size: 24px;
//     margin-bottom: 8px;
//   }

//   .product-grid {
//     gap: 8px;
//     padding: 0 4px;
//   }

//   .product-card {
//     min-height: 340px;
//     border-radius: 12px;
//     border-width: 1px;
//   }

//   .product-image-container {
//     height: 150px;
//   }

//   .discount-badge {
//     padding: 3px 6px;
//     font-size: 9px;
//     border-radius: 4px;
//   }

//   .favorite-btn {
//     width: 28px;
//     height: 28px;
//   }

//   .favorite-btn svg {
//     width: 14px;
//     height: 14px;
//   }

//   .product-title {
//     font-size: 11px;
//     padding: 6px 6px 0;
//   }

//   .rating {
//     font-size: 9px;
//     padding: 0 6px;
//   }

//   .reviews {
//     font-size: 9px;
//     padding: 0 6px;
//   }

//   .price {
//     padding: 0 6px;
//     font-size: 14px;
//   }

//   .action-buttons {
//     padding: 6px;
//     gap: 4px;
//   }

//   .add-to-cart-btn,
//   .buy-btn {
//     height: 32px;
//     font-size: 10px;
//     border-radius: 5px;
//   }

//   .add-to-cart-btn-disabled {
//     height: 32px;
//     font-size: 10px;
//     border-radius: 5px;
//   }

//   .see-more button {
//     padding: 6px 14px;
//     font-size: 11px;
//   }

//   .modal-actions {
//     flex-direction: column;
//     gap: 8px;
//   }

//   .modal-actions button,
//   .modal-actions .buy-btn,
//   .modal-actions .add-to-cart-btn {
//     width: 100%;
//   }

//   .login-modal {
//     padding: 24px 16px;
//   }

//   .login-modal h2 {
//     font-size: 26px;
//   }

//   .login-modal p {
//     font-size: 13px;
//     margin-bottom: 20px;
//   }
// }

// /* Very small phones (360px and below) */
// @media (max-width: 360px) {
//   .product-card {
//     min-height: 300px;
//   }

//   .product-image-container {
//     height: 130px;
//   }

//   .product-title {
//     font-size: 10px;
//     padding: 4px 4px 0;
//   }

//   .price {
//     font-size: 12px;
//   }

//   .add-to-cart-btn,
//   .buy-btn {
//     height: 28px;
//     font-size: 9px;
//   }

//   .add-to-cart-btn-disabled {
//     height: 28px;
//     font-size: 9px;
//   }

//   .rating, .reviews {
//     font-size: 8px;
//     padding: 0 4px;
//   }
// }

// /* Large tablets and small desktops (1024px - 1324px) */
// @media (max-width: 1324px) and (min-width: 1025px) {
//   .products-page {
//     padding: 32px;
//   }

//   .section-title {
//     max-width: 1100px;
//     margin-bottom: 12px;
//     text-align: left;
//   }

//   .product-grid {
//     grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//     gap: 16px;
//     max-width: 1200px;
//   }

//   .product-card {
//     min-height: 550px;
//   }

//   .product-image-container {
//     height: 280px;
//   }

//   .product-title {
//     font-size: 13px;
//   }

//   .price {
//     font-size: 18px;
//   }

//   .add-to-cart-btn,
//   .buy-btn {
//     height: 44px;
//     font-size: 14px;
//   }

//   .see-more {
//     max-width: 1100px;
//     padding-right: 0;
//   }
// }
// `}</style>

//       <div className="page-wrapper">
//         <div className="products-page">
//           <h1 className="page-title">FIND OUR PRODUCTS</h1>

//           <div className="offer-full">
//             <OfferScrollBar />
//           </div>


//           {Object.keys(productsByCategory).map((categoryName) => (
//             <div className="section" key={categoryName}>
//               <h2 className="section-title">{categoryName}</h2>

//               <div className="product-grid">
//                 {productsByCategory[categoryName].slice(0, 4).map((product) => (
//                   <ProductCard
//                     key={product._id}
//                     product={product}
//                     wishlist={wishlist}
//                     toggleWishlist={toggleWishlist}
//                     handleAddToCart={handleAddToCart}
//                     navigate={navigate}
//                   />
//                 ))}
//               </div>
//               {/* SEE MORE */}
//               <div className="see-more">
//                 <Link to={`/seemore?category=${categoryName}`}>
//                   <button>SEE MORE →</button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>


//       {/* 🔐 LOGIN MODAL */}
//       {showLoginModal && (
//         <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
//           <div className="login-modal" onClick={(e) => e.stopPropagation()}>
//             <h2>Login Required</h2>
//             <p>Please login to continue.</p>

//             <div className="modal-actions">
//               <Link to="/login" className="action-link">
//                 <button className="buy-btn">LOGIN</button>
//               </Link>

//               <button
//                 className="add-to-cart-btn"
//                 onClick={() => setShowLoginModal(false)}
//               >
//                 CANCEL
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { addToCartApi } from "../api/cartApi";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import OfferScrollBar from "../components/OfferScrollBar";
import { useAuth } from "../context/AuthContext";

/* ================= CAROUSEL HOOK ================= */
function useProductCarousel(images = []) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const startCarousel = () => {
    setIsHovered(true);
    if (images.length > 1) {
      setActiveIndex(1);
    } else {
      setActiveIndex(0);
    }
  };

  const stopCarousel = () => {
    setIsHovered(false);
    setActiveIndex(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { activeIndex, isHovered, startCarousel, stopCarousel };
}

/* ================= PRODUCT CARD WITH CAROUSEL ================= */
function ProductCard({ product, wishlist, toggleWishlist, handleAddToCart, navigate }) {
  const images = product.images?.length > 0 ? product.images : [{ url: "/images/Product1.png" }];
  const { activeIndex, isHovered, startCarousel, stopCarousel } = useProductCarousel(images);

  return (
    <div
      className="product-card"
      key={product._id}
      onClick={() => navigate(`/productspec/${product._id}`)}
      onMouseEnter={startCarousel}
      onMouseLeave={stopCarousel}
    >
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
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product._id);
        }}
      >
        <Heart />
      </button>

      <div className="product-image-container">
        <img
          src={images[activeIndex]?.url || "/images/Product1.png"}
          alt={product.name}
          className={isHovered && images.length > 1 ? "carousel-transition" : ""}
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

      {/* Description - Hidden on mobile via CSS */}
      <p
        style={{
          fontSize: "13px",
          color: "#9ca3af",
          marginBottom: "0.5rem",
          padding: "0 12px",
        }}
      >
        {product.description}
      </p>

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
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
            >
              🛒 Add to Cart
            </button>

            <Link
              to={`/productspec/${product._id}`}
              className="action-link"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="buy-btn">BUY</button>
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
  );
}

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { refreshCart, setOpenSideCart } = useCart();
  const { user } = useAuth();

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

  //     const status = error.response?.status;
  //     const message = error.response?.data?.message;

  //     // ✅ STOCK ERROR (400)
  //     if (status === 400) {
  //       toast.error(message || "Stock not available");
  //       return; // 🚫 STOP here, DO NOT open login modal
  //     }

  //     // ✅ LOGIN ERROR (401)
  //     if (status === 401) {
  //       toast.error("Please login to add to cart");
  //       setShowLoginModal(true);
  //       return;
  //     }

  //     // ✅ fallback
  //     toast.error("Something went wrong");
  //   }
  // };

  const handleAddToCart = async (product) => {

    try {

      /* -------------------------
         GUEST USER CART
      -------------------------- */

      if (!user) {

        const guestCart =
          JSON.parse(localStorage.getItem("guestCart")) || [];

        const existingItem = guestCart.find(
          (item) => item.productId === product._id
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          // guestCart.push({
          //   productId: product._id,
          //   name: product.name,
          //   price: product.price,
          //   image: product.images?.[0]?.url,
          //   quantity: 1
          // });

          guestCart.push({
            productId: product._id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice || product.price,
            image: product.images?.[0]?.url,
            quantity: 1
          });
        }

        localStorage.setItem("guestCart", JSON.stringify(guestCart));


        setOpenSideCart(true);

        toast.success("Product added to cart 🛒");

        return;
      }

      /* -------------------------
         LOGGED USER CART
      -------------------------- */

      // await addToCartApi(productId, 1);
      await addToCartApi(product._id, 1);
      await refreshCart();

      setOpenSideCart(true);

      toast.success("Product added to cart 🛒");

    } catch (error) {

      const message = error.response?.data?.message;

      toast.error(message || "Something went wrong");

    }

  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: 100, color: "#ffeb00" }}>
        Loading...
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
  .product-card {
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-6px);
  transition: all 0.3s ease;
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
  position: relative;
}

.product-card img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  transition: transform 0.4s ease;
}

.product-card:hover img {
  transform: scale(1.06);
}

/* ================= CAROUSEL ================= */
.product-card img.carousel-transition {
  animation: carouselFade 0.5s ease-in-out;
}

@keyframes carouselFade {
  0%   { opacity: 0.4; transform: scale(1.04); }
  100% { opacity: 1;   transform: scale(1.06); }
}

.carousel-dots {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  z-index: 5;
  pointer-events: none;
}

.carousel-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  transition: background 0.3s ease, transform 0.3s ease;
}

.carousel-dot.active {
  background: #ffeb00;
  transform: scale(1.4);
}

/* ================= TITLE ================= */
.product-title {
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
  padding: 12px 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
}

/* ================= SPECS ================= */
.specs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 6px 12px;
}

.spec {
  font-size: 12px;
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
  font-size: 15px;
  padding: 0 12px;
}

/* ================= PRICE ================= */
.price-box {
  padding: 6px 12px 0;
}

.old-price {
  font-size: 18px;
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
.add-to-cart-btn-disabled {
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
  border-radius: 8px;
  transition: all 0.25s ease;
}

.see-more button:hover {
  background: #ffeb00;
  color: #000;
  transform: translatex(4px);
}

.offer-full {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
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
  padding: 16px;
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

.modal-actions button,
.modal-actions .buy-btn,
.modal-actions .add-to-cart-btn {
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

/* ================= RESPONSIVE BREAKPOINTS ================= */

/* Tablets (1024px and below) */
@media (max-width: 1024px) {
  .section-title {
    text-align: center;
  }

  .see-more {
    justify-content: center;
  }

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

/* Small tablets and large phones (768px and below) */
@media (max-width: 768px) {
  .products-page {
    padding: 16px;
  }

  .page-title {
    margin: 16px 0 24px;
    -webkit-text-stroke: 1.5px #ffeb00;
  }

  .section {
    margin-bottom: 40px;
  }

  .section-title {
    font-size: clamp(28px, 5vw, 48px);
    margin-bottom: 12px;
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
    font-size: 15px;
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
    font-size: 15px;
    padding: 8px 8px 0;
    -webkit-line-clamp: 2;
  }

  /* Hide specs on mobile to save space */
  .specs {
    display: none;
  }

  .rating {
    font-size: 15px;
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
    font-size: 15px;
  }

  .price {
    padding: 0 8px;
    font-size: 18px;
  }

  /* Hide description paragraph */
  p[style*="font-size: 10px"] {
    display: none !important;
  }

  .action-buttons {
    padding: 8px;
    gap: 6px;
  }

  .add-to-cart-btn,
  .buy-btn {
    height: 36px;
    font-size: 11px;
    border-radius: 6px;
  }

  .add-to-cart-btn-disabled {
    height: 36px;
    font-size: 11px;
    border-radius: 6px;
  }

  .see-more {
    margin-top: 16px;
  }

  .see-more button {
    padding: 8px 18px;
    font-size: 12px;
  }
}

/* Small phones (480px and below) */
@media (max-width: 480px) {
  .products-page {
    padding: 12px;
  }

  .page-title {
    font-size: 28px;
    margin: 12px 0 20px;
    -webkit-text-stroke: 1px #ffeb00;
  }

  .section-title {
    font-size: 28px;
    margin-bottom: 8px;
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
    font-size: 12px;
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
    font-size: 15px;
    padding: 6px 6px 0;
  }

  .rating {
    font-size: 13px;
    padding: 0 6px;
  }

  .reviews {
    font-size: 12px;
    padding: 0 6px;
  }

  .price {
    padding: 0 6px;
    font-size: 17px;
  }

  .action-buttons {
    padding: 6px;
    gap: 4px;
  }

  .add-to-cart-btn,
  .buy-btn {
    height: 32px;
    font-size: 10px;
    border-radius: 5px;
  }

  .add-to-cart-btn-disabled {
    height: 32px;
    font-size: 10px;
    border-radius: 5px;
  }

  .see-more button {
    padding: 6px 14px;
    font-size: 11px;
  }

  .modal-actions {
    flex-direction: column;
    gap: 8px;
  }

  .modal-actions button,
  .modal-actions .buy-btn,
  .modal-actions .add-to-cart-btn {
    width: 100%;
  }

  .login-modal {
    padding: 24px 16px;
  }

  .login-modal h2 {
    font-size: 26px;
  }

  .login-modal p {
    font-size: 13px;
    margin-bottom: 20px;
  }
}

/* Very small phones (360px and below) */
@media (max-width: 360px) {
  .product-card {
    min-height: 300px;
  }

  .product-image-container {
    height: 130px;
  }

  .product-title {
    font-size: 12px;
    padding: 4px 4px 0;
  }

  .price {
    font-size: 15px;
  }

  .add-to-cart-btn,
  .buy-btn {
    height: 28px;
    font-size: 9px;
  }

  .add-to-cart-btn-disabled {
    height: 28px;
    font-size: 9px;
  }

  .rating, .reviews {
    font-size: 12px;
    padding: 0 4px;
  }
}

/* Large tablets and small desktops (1024px - 1324px) */
@media (max-width: 1324px) and (min-width: 1025px) {
  .products-page {
    padding: 32px;
  }

  .section-title {
    max-width: 1100px;
    margin-bottom: 12px;
    text-align: left;
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
  .buy-btn {
    height: 44px;
    font-size: 14px;
  }

  .see-more {
    max-width: 1100px;
    padding-right: 0;
  }
}
`}</style>

      <div className="page-wrapper">
        <div className="products-page">
          <h1 className="page-title">FIND OUR PRODUCTS</h1>

          <div className="offer-full">
            <OfferScrollBar />
          </div>


          {Object.keys(productsByCategory).map((categoryName) => (
            <div className="section" key={categoryName}>
              <h2 className="section-title">{categoryName}</h2>

              <div className="product-grid">
                {productsByCategory[categoryName].slice(0, 4).map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                    handleAddToCart={handleAddToCart}
                    navigate={navigate}
                  />
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
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
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