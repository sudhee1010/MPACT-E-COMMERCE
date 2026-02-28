

// import { Link } from "react-router-dom";
// import { useState, useEffect, useRef, useCallback } from "react";
// import SideCart from "./SideCart";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { ShoppingCart, User, Home, Package, Info, BookOpen, Heart, Building2, Search, X } from "lucide-react";
// import toast from "react-hot-toast";
// import api from "../api/axios";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   // Desktop search
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [searchLoading, setSearchLoading] = useState(false);

//   // Mobile search bar (separate from hamburger menu)
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [mobileQuery, setMobileQuery] = useState("");
//   const [mobileSuggestions, setMobileSuggestions] = useState([]);
//   const [mobileSearchLoading, setMobileSearchLoading] = useState(false);

//   const searchRef = useRef(null);
//   const mobileSearchRef = useRef(null);
//   const mobileInputRef = useRef(null);
//   const debounceRef = useRef(null);
//   const mobileDebounceRef = useRef(null);

//   const { cartCount, setOpenSideCart } = useCart();

//   // LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN
//   useEffect(() => {
//     if (menuOpen) {
//       document.body.style.overflow = "hidden";
//       document.body.style.position = "fixed";
//       document.body.style.width = "100%";
//     } else {
//       document.body.style.overflow = "";
//       document.body.style.position = "";
//       document.body.style.width = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//       document.body.style.position = "";
//       document.body.style.width = "";
//     };
//   }, [menuOpen]);

//   // CLOSE ON ESCAPE
//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") {
//         setMenuOpen(false);
//         closeDesktopSearch();
//         closeMobileSearch();
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   // CLOSE DESKTOP SUGGESTIONS ON OUTSIDE CLICK
//   useEffect(() => {
//     const handler = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // CLOSE MOBILE SEARCH ON OUTSIDE CLICK
//   useEffect(() => {
//     const handler = (e) => {
//       if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
//         closeMobileSearch();
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // MOUSE PARALLAX
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const x = (e.clientX / window.innerWidth - 0.5) * 2;
//       const y = (e.clientY / window.innerHeight - 0.5) * 2;
//       setMousePos({ x, y });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // AUTO-FOCUS mobile input when search opens
//   useEffect(() => {
//     if (showMobileSearch && mobileInputRef.current) {
//       setTimeout(() => mobileInputRef.current?.focus(), 100);
//     }
//   }, [showMobileSearch]);

//   // ── DESKTOP SEARCH ──────────────────────────────────────────────
//   const fetchSuggestions = useCallback((query) => {
//     clearTimeout(debounceRef.current);
//     if (!query.trim()) { setSuggestions([]); setShowSuggestions(false); return; }
//     debounceRef.current = setTimeout(async () => {
//       setSearchLoading(true);
//       try {
//         const res = await api.get("/api/products", { params: { keyword: query, limit: 6 } });
//         const products = res.data.products || [];
//         setSuggestions(products);
//         setShowSuggestions(true);
//       } catch {
//         setSuggestions([]); setShowSuggestions(false);
//       } finally {
//         setSearchLoading(false);
//       }
//     }, 300);
//   }, []);

//   const handleDesktopQueryChange = (e) => {
//     setSearchQuery(e.target.value);
//     fetchSuggestions(e.target.value);
//   };

//   const handleSuggestionClick = (productId) => {
//     closeDesktopSearch();
//     navigate(`/productspec/${productId}`);
//   };

//   const closeDesktopSearch = () => {
//     setShowSearch(false);
//     setSearchQuery("");
//     setSuggestions([]);
//     setShowSuggestions(false);
//   };

//   // ── MOBILE SEARCH ────────────────────────────────────────────────
//   const fetchMobileSuggestions = useCallback((query) => {
//     clearTimeout(mobileDebounceRef.current);
//     if (!query.trim()) { setMobileSuggestions([]); return; }
//     mobileDebounceRef.current = setTimeout(async () => {
//       setMobileSearchLoading(true);
//       try {
//         const res = await api.get("/api/products", { params: { keyword: query, limit: 6 } });
//         setMobileSuggestions(res.data.products || []);
//       } catch {
//         setMobileSuggestions([]);
//       } finally {
//         setMobileSearchLoading(false);
//       }
//     }, 300);
//   }, []);

//   const handleMobileQueryChange = (e) => {
//     setMobileQuery(e.target.value);
//     fetchMobileSuggestions(e.target.value);
//   };

//   const closeMobileSearch = () => {
//     setShowMobileSearch(false);
//     setMobileQuery("");
//     setMobileSuggestions([]);
//   };

//   const handleMobileSuggestionClick = (productId) => {
//     closeMobileSearch();
//     navigate(`/productspec/${productId}`);
//   };

//   const handleSearchIconClick = () => {
//     // On mobile (hamburger visible), toggle mobile search bar
//     // On desktop, toggle desktop search input
//     const isMobile = window.innerWidth <= 1106;
//     if (isMobile) {
//       if (showMobileSearch) {
//         closeMobileSearch();
//       } else {
//         setMenuOpen(false); // close hamburger if open
//         setShowMobileSearch(true);
//       }
//     } else {
//       setShowSearch((prev) => { if (prev) closeDesktopSearch(); return !prev; });
//     }
//   };

//   // ── MISC ─────────────────────────────────────────────────────────
//   const handleProfileClick = () => {
//     if (user) navigate("/profile");
//     else setShowLoginModal(true);
//   };

//   const isActive = (path) => location.pathname === path;

//   const modalStyles = {
//     overlay: {
//       position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
//       backgroundColor: "rgba(0,0,0,0.75)", display: "flex",
//       alignItems: "center", justifyContent: "center", zIndex: 2000, backdropFilter: "blur(8px)",
//     },
//     modal: {
//       backgroundColor: "#1a1a1a", padding: "2.5rem", borderRadius: "20px",
//       border: "2px solid #ffd400", width: "340px", textAlign: "center",
//       color: "white", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
//     },
//     loginBtn: {
//       backgroundColor: "#ffd400", border: "none", padding: "0.75rem 1.75rem",
//       borderRadius: "12px", cursor: "pointer", fontWeight: "bold",
//       color: "#000", transition: "all 0.3s ease", fontSize: "15px",
//     },
//     cancelBtn: {
//       backgroundColor: "transparent", border: "2px solid #ffd400", color: "#ffd400",
//       padding: "0.75rem 1.75rem", borderRadius: "12px", cursor: "pointer",
//       transition: "all 0.3s ease", fontSize: "15px",
//     },
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');

//         :root { --navbar-height: 92px; }

//         * { margin: 0; padding: 0; box-sizing: border-box; }

//         html, body { scrollbar-width: none; -ms-overflow-style: none; }
//         html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; }

//         body {
//           background-color: rgba(24, 23, 23, 1);
//           color: #ffffff;
//           font-family: "Segoe UI", Arial, sans-serif;
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50%       { transform: translateY(-3px); }
//         }

//         @keyframes suggFadeIn {
//           from { opacity: 0; transform: translateY(-6px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes mobileSearchSlide {
//           from { opacity: 0; transform: translateY(-8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }

//         /* ── NAVBAR ─────────────────────────────────── */
//         .navbar {
//           position: fixed;
//           top: 0; left: 0;
//           width: 100%;
//           height: var(--navbar-height);
//           background: #ffd400;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 0 60px;
//           z-index: 1100;
//           overflow: visible;
//           box-shadow: 0 4px 20px rgba(255,212,0,0.3);
//         }

//         .nav-logo {
//           font-family: 'Jersey 25', sans-serif;
//           font-size: 48px;
//           letter-spacing: -0.04em;
//           color: #000;
//           text-decoration: none;
//           animation: float 3s ease-in-out infinite;
//           position: relative;
//           z-index: 1;
//         }

//         .nav-logo:hover { filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2)); }

//         /* ── TABBAR ─────────────────────────────────── */
//         .nav-tabbar {
//           position: absolute;
//           left: 50%;
//           transform: translateX(-50%);
//           background: transparent;
//           border-radius: 50px;
//           padding: 12px 24px;
//           display: flex;
//           gap: 8px;
//           z-index: 1;
//         }

//         .nav-tab {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 8px 16px;
//           cursor: pointer;
//           border-radius: 20px;
//           transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
//           position: relative;
//           min-width: 70px;
//           text-decoration: none;
//         }

//         .nav-tab-icon {
//           transition: all 0.4s cubic-bezier(0.68,-0.55,0.265,1.55);
//           margin-bottom: 4px;
//         }

//         .nav-tab-label {
//           font-family: 'Jersey 25', sans-serif;
//           font-size: 14px;
//           color: #000;
//           transition: all 0.3s ease;
//           white-space: nowrap;
//         }

//         .nav-tab.active { background: rgba(0,0,0,0.1); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
//         .nav-tab.active .nav-tab-label { font-weight: 700; }

//         .nav-tab::after {
//           content: '';
//           position: absolute;
//           bottom: -8px; left: 50%;
//           transform: translateX(-50%);
//           width: 0; height: 4px;
//           background: #000;
//           border-radius: 3px;
//           transition: width 0.3s ease;
//         }

//         .nav-tab.active::after { width: 50%; }

//         .nav-tab:hover .nav-tab-icon {
//           transform: translateY(-8px) scale(1.2);
//           filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
//         }

//         .nav-tab:not(.active):hover .nav-tab-label { font-weight: 600; }

//         /* ── NAV ICONS ──────────────────────────────── */
//         .nav-icons {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           position: relative;
//           z-index: 1200;
//         }

//         .nav-icon-btn {
//           width: 46px; height: 46px;
//           border-radius: 50%;
//           background: rgba(0,0,0,0.08);
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer;
//           transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
//           position: relative;
//           flex-shrink: 0;
//         }

//         .nav-icon-btn:hover { background: rgba(0,0,0,0.15); transform: translateY(-3px) scale(1.1); }
//         .nav-icon-btn.active-search { background: rgba(0,0,0,0.18); }

//         /* ── DESKTOP SEARCH ─────────────────────────── */
//         .search-wrapper {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           position: relative;
//         }

//         .search-input-container {
//           transition: width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease;
//           width: 0;
//           opacity: 0;
//           pointer-events: none;
//           overflow: hidden;
//         }

//         .search-input-container.open {
//           width: 150px;
//           opacity: 1;
//           pointer-events: all;
//           overflow: visible;
//         }

//         .search-input {
//           width: 150px;
//           padding: 9px 14px;
//           border-radius: 24px;
//           border: 2px solid #000;
//           background: transparent;
//           font-family: 'Segoe UI', Arial, sans-serif;
//           font-size: 13px;
//           color: #000;
//           outline: none;
//           box-shadow: none;
//         }

//         .search-input::placeholder { color: rgba(0,0,0,0.45); }
//         .search-input:focus { border-color: #000; outline: none; box-shadow: none; }

//         /* ── DESKTOP SUGGESTIONS DROPDOWN ───────────── */
//         .search-suggestions {
//           position: absolute;
//           top: calc(100% + 52px);
//           right: 0;
//           width: 300px;
//           background: #1a1a1a;
//           border: 2px solid #ffd400;
//           border-radius: 16px;
//           overflow: hidden;
//           z-index: 2000;
//           animation: suggFadeIn 0.2s ease;
//           box-shadow: 0 12px 40px rgba(0,0,0,0.6);
//         }

//         /* ── MOBILE SEARCH BAR (below navbar) ───────── */
//         .mobile-search-bar {
//           display: none; /* hidden by default, shown via JS class */
//           position: fixed;
//           top: var(--navbar-height);
//           left: 0;
//           width: 100%;
//           background: #ffd400;
//           padding: 12px 16px;
//           z-index: 1090;
//           box-shadow: 0 4px 20px rgba(0,0,0,0.15);
//           flex-direction: column;
//           gap: 8px;
//           animation: mobileSearchSlide 0.25s ease;
//         }

//         .mobile-search-bar.visible {
//           display: flex;
//         }

//         .mobile-search-inner {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           background: rgba(0,0,0,0.08);
//           border-radius: 14px;
//           padding: 10px 16px;
//           border: 2px solid #000;
//         }

//         .mobile-search-inner input {
//           flex: 1;
//           border: none;
//           background: transparent;
//           font-size: 16px;
//           color: #000;
//           outline: none;
//           font-family: 'Segoe UI', Arial, sans-serif;
//         }

//         .mobile-search-inner input::placeholder { color: rgba(0,0,0,0.45); }

//         /* ── MOBILE SUGGESTIONS (below search bar) ─── */
//         .mobile-sugg-list {
//           background: #1a1a1a;
//           border: 2px solid #ffd400;
//           border-radius: 14px;
//           overflow: hidden;
//           animation: suggFadeIn 0.2s ease;
//           box-shadow: 0 8px 30px rgba(0,0,0,0.5);
//         }

//         /* ── SHARED SUGGESTION ITEM ─────────────────── */
//         .sugg-item {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 10px 14px;
//           cursor: pointer;
//           transition: background 0.15s ease;
//           border-bottom: 1px solid rgba(255,212,0,0.1);
//         }

//         .sugg-item:last-child { border-bottom: none; }
//         .sugg-item:hover, .sugg-item:active { background: rgba(255,212,0,0.1); }

//         .sugg-img {
//           width: 46px; height: 46px;
//           border-radius: 8px;
//           object-fit: cover;
//           border: 1px solid rgba(255,212,0,0.3);
//           flex-shrink: 0;
//         }

//         .sugg-info { flex: 1; min-width: 0; }

//         .sugg-name {
//           font-size: 13px;
//           font-weight: 600;
//           color: #fff;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         .sugg-price {
//           font-size: 12px;
//           color: #ffd400;
//           font-weight: 700;
//           margin-top: 2px;
//         }

//         .sugg-stock { font-size: 10px; margin-top: 2px; }
//         .sugg-stock.in  { color: #4caf50; }
//         .sugg-stock.out { color: #f44336; }
//         .sugg-arrow { color: #ffd400; font-size: 16px; flex-shrink: 0; }

//         .sugg-msg {
//           padding: 14px;
//           text-align: center;
//           color: #888;
//           font-size: 13px;
//         }

//         /* ── CART BADGE ─────────────────────────────── */
//         .cart-badge {
//           position: absolute;
//           top: -4px; right: -4px;
//           background: linear-gradient(135deg, #ff0000, #ff4444);
//           color: white;
//           border-radius: 50%;
//           padding: 3px 7px;
//           font-size: 11px; font-weight: bold;
//           min-width: 20px; text-align: center;
//           border: 2px solid #ffd400;
//           box-shadow: 0 2px 8px rgba(255,0,0,0.4);
//         }

//         /* ── HAMBURGER ──────────────────────────────── */
//         .hamburger {
//           display: none;
//           color: #000; font-size: 26px; line-height: 1;
//           cursor: pointer; padding: 10px; border-radius: 12px;
//           background: rgba(0,0,0,0.08);
//           transition: all 0.3s ease;
//         }

//         .hamburger:hover { background: rgba(0,0,0,0.15); }

//         /* ── MOBILE MENU (hamburger) ────────────────── */
//         .mobile-menu {
//           position: fixed;
//           top: var(--navbar-height); left: 0;
//           width: 100%;
//           background: #ffd400;
//           display: flex; flex-direction: column; align-items: center;
//           gap: 8px; padding: 20px;
//           transform: translateY(-120%);
//           transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
//           z-index: 1050;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.15);
//           max-height: calc(100vh - var(--navbar-height));
//           overflow-y: auto;
//         }

//         .mobile-menu.open { transform: translateY(0); }

//         .mobile-tab {
//           display: flex; align-items: center; gap: 16px;
//           padding: 14px 24px; width: 90%;
//           border-radius: 16px; cursor: pointer;
//           transition: all 0.3s ease; text-decoration: none;
//           background: rgba(0,0,0,0.07);
//         }

//         .mobile-tab.active { background: rgba(0,0,0,0.15); }
//         .mobile-tab:hover  { transform: translateX(8px); background: rgba(0,0,0,0.12); }

//         .mobile-tab-label {
//           font-family: 'Jersey 25', sans-serif;
//           font-size: 20px; color: #000;
//         }

//         .mobile-tab.active .mobile-tab-label { font-weight: 700; }

//         .page-wrapper { padding-top: var(--navbar-height); }

//         /* ── RESPONSIVE ─────────────────────────────── */
//         @media (max-width: 1106px) {
//           .nav-tabbar { display: none; }
//           .hamburger  { display: block; }
//           .nav-logo   { font-size: 40px; }
//           /* Hide desktop-only search elements */
//           .search-input-container,
//           .search-suggestions { display: none !important; }
//         }

//         @media (max-width: 600px) {
//           :root { --navbar-height: 72px; }
//           .navbar       { padding: 0 16px; }
//           .nav-logo     { font-size: 34px; }
//           .nav-icon-btn { width: 40px; height: 40px; }
//           .nav-icons    { gap: 8px; }
//         }
//       `}</style>

//       {/* ═══════════════ NAVBAR ═══════════════ */}
//       <nav className="navbar">
//         <Link
//           to="/"
//           className="nav-logo"
//           style={{ transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 3}px)`, transition: "transform 0.15s ease-out" }}
//         >
//           MPACT
//         </Link>

//         {/* TABS */}
//         <div
//           className="nav-tabbar"
//           style={{ transform: `translateX(-50%) translate(${mousePos.x * 3}px, ${mousePos.y * 2}px)`, transition: "transform 0.2s ease-out" }}
//         >
//           <Link to="/" className={`nav-tab ${isActive('/') ? 'active' : ''}`}>
//             <Home size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
//             <span className="nav-tab-label">Home</span>
//           </Link>
//           <Link to="/product" className={`nav-tab ${isActive('/product') ? 'active' : ''}`}>
//             <Package size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
//             <span className="nav-tab-label">Products</span>
//           </Link>
//           <Link to="/about" className={`nav-tab ${isActive('/about') ? 'active' : ''}`}>
//             <Info size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
//             <span className="nav-tab-label">About</span>
//           </Link>
//           <Link to="/blog" className={`nav-tab ${isActive('/blog') ? 'active' : ''}`}>
//             <BookOpen size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
//             <span className="nav-tab-label">Blog</span>
//           </Link>
//           <Link
//             to="/wishlist"
//             className={`nav-tab ${isActive('/wishlist') ? 'active' : ''}`}
//             onClick={(e) => { e.preventDefault(); if (user) navigate("/wishlist"); else setShowLoginModal(true); }}
//           >
//             <Heart size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
//             <span className="nav-tab-label">Wishlist</span>
//           </Link>
//           <Link to="/distributor" className={`nav-tab ${isActive('/distributor') ? 'active' : ''}`}>
//             <Building2 size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
//             <span className="nav-tab-label">Distributor</span>
//           </Link>
//         </div>

//         {/* ICONS */}
//         <div
//           className="nav-icons"
//           style={{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 3}px)`, transition: "transform 0.15s ease-out" }}
//         >
//           {/* ── DESKTOP SEARCH ── */}
//           <div className="search-wrapper" ref={searchRef}>
//             <div className={`search-input-container ${showSearch ? "open" : ""}`}>
//               <input
//                 className="search-input"
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={handleDesktopQueryChange}
//                 onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
//                 autoFocus={showSearch}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" && suggestions.length > 0) handleSuggestionClick(suggestions[0]._id);
//                 }}
//               />
//             </div>

//             {/* SEARCH ICON — works for both desktop & mobile */}
//             <div
//               className={`nav-icon-btn ${showMobileSearch ? "active-search" : ""}`}
//               onClick={handleSearchIconClick}
//               role="button" tabIndex={0} title="Search"
//             >
//               <Search size={22} color="#000" strokeWidth={2.5} />
//             </div>

//             {/* DESKTOP DROPDOWN */}
//             {showSearch && (searchLoading || showSuggestions) && (
//               <div className="search-suggestions">
//                 {searchLoading ? (
//                   <div className="sugg-msg">Searching...</div>
//                 ) : suggestions.length === 0 ? (
//                   <div className="sugg-msg">No products found</div>
//                 ) : (
//                   suggestions.map((p) => (
//                     <div key={p._id} className="sugg-item" onClick={() => handleSuggestionClick(p._id)}>
//                       <img className="sugg-img" src={p.images?.[0]?.url || "/images/Product1.png"} alt={p.name} />
//                       <div className="sugg-info">
//                         <div className="sugg-name">{p.name}</div>
//                         <div className="sugg-price">₹{p.price}</div>
//                         <div className={`sugg-stock ${p.countInStock > 0 ? "in" : "out"}`}>
//                           {p.countInStock > 0 ? "In Stock" : "Out of Stock"}
//                         </div>
//                       </div>
//                       <span className="sugg-arrow">→</span>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
//           </div>

//           {/* PROFILE */}
//           <div className="nav-icon-btn" onClick={handleProfileClick} role="button" tabIndex={0}>
//             <User size={22} color="#000" strokeWidth={2.5} />
//           </div>

//           {/* CART */}
//           <div
//             className="nav-icon-btn"
//             onClick={() => {
//               if (!user) { setShowLoginModal(true); return; }
//               if (cartCount === 0) { toast.error("Your cart is empty"); return; }
//               setOpenSideCart(true);
//             }}
//             role="button" tabIndex={0}
//           >
//             <ShoppingCart size={22} color="#000" strokeWidth={2.5} />
//             {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
//           </div>

//           {/* HAMBURGER */}
//           <div className="hamburger" role="button" tabIndex={0} onClick={() => { setMenuOpen(!menuOpen); closeMobileSearch(); }}>
//             {menuOpen ? "✕" : "☰"}
//           </div>
//         </div>
//       </nav>

//       {/* ═══════════════ MOBILE SEARCH BAR (slides below navbar) ═══════════════ */}
//       <div className={`mobile-search-bar ${showMobileSearch ? "visible" : ""}`} ref={mobileSearchRef}>
//         <div className="mobile-search-inner">
//           <Search size={20} color="#000" strokeWidth={2} />
//           <input
//             ref={mobileInputRef}
//             type="text"
//             placeholder="Search products..."
//             value={mobileQuery}
//             onChange={handleMobileQueryChange}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && mobileSuggestions.length > 0) handleMobileSuggestionClick(mobileSuggestions[0]._id);
//             }}
//           />
//           {mobileQuery ? (
//             <X size={20} color="#000" style={{ cursor: "pointer", flexShrink: 0 }}
//               onClick={() => { setMobileQuery(""); setMobileSuggestions([]); mobileInputRef.current?.focus(); }} />
//           ) : (
//             <X size={20} color="#000" style={{ cursor: "pointer", flexShrink: 0, opacity: 0.5 }}
//               onClick={closeMobileSearch} />
//           )}
//         </div>

//         {/* MOBILE SUGGESTIONS */}
//         {(mobileSearchLoading || mobileSuggestions.length > 0) && (
//           <div className="mobile-sugg-list">
//             {mobileSearchLoading ? (
//               <div className="sugg-msg">Searching...</div>
//             ) : (
//               mobileSuggestions.map((p) => (
//                 <div key={p._id} className="sugg-item" onClick={() => handleMobileSuggestionClick(p._id)}>
//                   <img className="sugg-img" src={p.images?.[0]?.url || "/images/Product1.png"} alt={p.name} />
//                   <div className="sugg-info">
//                     <div className="sugg-name">{p.name}</div>
//                     <div className="sugg-price">₹{p.price}</div>
//                     <div className={`sugg-stock ${p.countInStock > 0 ? "in" : "out"}`}>
//                       {p.countInStock > 0 ? "In Stock" : "Out of Stock"}
//                     </div>
//                   </div>
//                   <span className="sugg-arrow">→</span>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>

//       {/* ═══════════════ MOBILE MENU (hamburger) ═══════════════ */}
//       <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
//         <Link to="/" className={`mobile-tab ${isActive('/') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
//           <Home size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Home</span>
//         </Link>
//         <Link to="/product" className={`mobile-tab ${isActive('/product') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
//           <Package size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Products</span>
//         </Link>
//         <Link to="/about" className={`mobile-tab ${isActive('/about') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
//           <Info size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">About Us</span>
//         </Link>
//         <Link to="/blog" className={`mobile-tab ${isActive('/blog') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
//           <BookOpen size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Blog</span>
//         </Link>
//         <Link
//           to="/wishlist"
//           className={`mobile-tab ${isActive('/wishlist') ? 'active' : ''}`}
//           onClick={(e) => { e.preventDefault(); setMenuOpen(false); if (user) navigate("/wishlist"); else setShowLoginModal(true); }}
//         >
//           <Heart size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Wishlist</span>
//         </Link>
//         <Link to="/distributor" className={`mobile-tab ${isActive('/distributor') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
//           <Building2 size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Distributor</span>
//         </Link>
//       </div>

//       {user && <SideCart />}

//       {/* LOGIN MODAL */}
//       {showLoginModal && (
//         <div style={modalStyles.overlay} onClick={() => setShowLoginModal(false)}>
//           <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
//             <h3 style={{ marginBottom: "1rem", color: "#ffd400", fontSize: "26px", fontWeight: "bold" }}>Login Required</h3>
//             <p style={{ marginBottom: "1.5rem", color: "#ccc", fontSize: "15px" }}>Please login to continue with your action.</p>
//             <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
//               <button
//                 style={modalStyles.loginBtn}
//                 onClick={() => { setShowLoginModal(false); navigate("/login"); }}
//                 onMouseEnter={(e) => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 6px 20px rgba(255,212,0,0.4)"; }}
//                 onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none"; }}
//               >Login</button>
//               <button
//                 style={modalStyles.cancelBtn}
//                 onClick={() => setShowLoginModal(false)}
//                 onMouseEnter={(e) => { e.target.style.background = "rgba(255,212,0,0.15)"; }}
//                 onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
//               >Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }





///
// import { Link } from "react-router-dom";
// import { useState, useEffect, useRef, useCallback } from "react";
// import SideCart from "./SideCart";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { ShoppingCart, User, Home, Package, Info, BookOpen, Heart, Building2, Search, X } from "lucide-react";
// import toast from "react-hot-toast";
// import api from "../api/axios";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   // Desktop search
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [searchLoading, setSearchLoading] = useState(false);

//   // Mobile search bar (separate from hamburger menu)
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [mobileQuery, setMobileQuery] = useState("");
//   const [mobileSuggestions, setMobileSuggestions] = useState([]);
//   const [mobileSearchLoading, setMobileSearchLoading] = useState(false);

//   const searchRef = useRef(null);
//   const mobileSearchRef = useRef(null);
//   const mobileInputRef = useRef(null);
//   const debounceRef = useRef(null);
//   const mobileDebounceRef = useRef(null);

//   const { cartCount, setOpenSideCart } = useCart();

//   // LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN
//   useEffect(() => {
//     if (menuOpen) {
//       document.body.style.overflow = "hidden";
//       document.body.style.position = "fixed";
//       document.body.style.width = "100%";
//     } else {
//       document.body.style.overflow = "";
//       document.body.style.position = "";
//       document.body.style.width = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//       document.body.style.position = "";
//       document.body.style.width = "";
//     };
//   }, [menuOpen]);

//   // CLOSE ON ESCAPE
//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") {
//         setMenuOpen(false);
//         closeDesktopSearch();
//         closeMobileSearch();
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   // CLOSE DESKTOP SUGGESTIONS ON OUTSIDE CLICK
//   useEffect(() => {
//     const handler = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // CLOSE MOBILE SEARCH ON OUTSIDE CLICK
//   useEffect(() => {
//     const handler = (e) => {
//       if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
//         closeMobileSearch();
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // MOUSE PARALLAX
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const x = (e.clientX / window.innerWidth - 0.5) * 2;
//       const y = (e.clientY / window.innerHeight - 0.5) * 2;
//       setMousePos({ x, y });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // AUTO-FOCUS mobile input when search opens
//   useEffect(() => {
//     if (showMobileSearch && mobileInputRef.current) {
//       setTimeout(() => mobileInputRef.current?.focus(), 100);
//     }
//   }, [showMobileSearch]);

//   // ── DESKTOP SEARCH ──────────────────────────────────────────────
//   const fetchSuggestions = useCallback((query) => {
//     clearTimeout(debounceRef.current);
//     if (!query.trim()) { setSuggestions([]); setShowSuggestions(false); return; }
//     debounceRef.current = setTimeout(async () => {
//       setSearchLoading(true);
//       try {
//         const res = await api.get("/api/products", { params: { keyword: query, limit: 6 } });
//         const products = res.data.products || [];
//         setSuggestions(products);
//         setShowSuggestions(true);
//       } catch {
//         setSuggestions([]); setShowSuggestions(false);
//       } finally {
//         setSearchLoading(false);
//       }
//     }, 300);
//   }, []);

//   const handleDesktopQueryChange = (e) => {
//     setSearchQuery(e.target.value);
//     fetchSuggestions(e.target.value);
//   };

//   const handleSuggestionClick = (productId) => {
//     closeDesktopSearch();
//     navigate(`/productspec/${productId}`);
//   };

//   const closeDesktopSearch = () => {
//     setShowSearch(false);
//     setSearchQuery("");
//     setSuggestions([]);
//     setShowSuggestions(false);
//   };

//   // ── MOBILE SEARCH ────────────────────────────────────────────────
//   const fetchMobileSuggestions = useCallback((query) => {
//     clearTimeout(mobileDebounceRef.current);
//     if (!query.trim()) { setMobileSuggestions([]); return; }
//     mobileDebounceRef.current = setTimeout(async () => {
//       setMobileSearchLoading(true);
//       try {
//         const res = await api.get("/api/products", { params: { keyword: query, limit: 6 } });
//         setMobileSuggestions(res.data.products || []);
//       } catch {
//         setMobileSuggestions([]);
//       } finally {
//         setMobileSearchLoading(false);
//       }
//     }, 300);
//   }, []);

//   const handleMobileQueryChange = (e) => {
//     setMobileQuery(e.target.value);
//     fetchMobileSuggestions(e.target.value);
//   };

//   const closeMobileSearch = () => {
//     setShowMobileSearch(false);
//     setMobileQuery("");
//     setMobileSuggestions([]);
//   };

//   const handleMobileSuggestionClick = (productId) => {
//     closeMobileSearch();
//     navigate(`/productspec/${productId}`);
//   };

//   const handleSearchIconClick = () => {
//     // On mobile (hamburger visible), toggle mobile search bar
//     // On desktop, toggle desktop search input
//     const isMobile = window.innerWidth <= 1106;
//     if (isMobile) {
//       if (showMobileSearch) {
//         closeMobileSearch();
//       } else {
//         setMenuOpen(false); // close hamburger if open
//         setShowMobileSearch(true);
//       }
//     } else {
//       setShowSearch((prev) => { if (prev) closeDesktopSearch(); return !prev; });
//     }
//   };

//   // ── MISC ─────────────────────────────────────────────────────────
//   const handleProfileClick = () => {
//     if (user) navigate("/profile");
//     else setShowLoginModal(true);
//   };

//   const isActive = (path) => location.pathname === path;

//   const modalStyles = {
//     overlay: {
//       position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
//       backgroundColor: "rgba(0,0,0,0.75)", display: "flex",
//       alignItems: "center", justifyContent: "center", zIndex: 2000, backdropFilter: "blur(8px)",
//     },
//     modal: {
//       backgroundColor: "#1a1a1a", padding: "2.5rem", borderRadius: "20px",
//       border: "2px solid #ffd400", width: "340px", textAlign: "center",
//       color: "white", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
//     },
//     loginBtn: {
//       backgroundColor: "#ffd400", border: "none", padding: "0.75rem 1.75rem",
//       borderRadius: "12px", cursor: "pointer", fontWeight: "bold",
//       color: "#000", transition: "all 0.3s ease", fontSize: "15px",
//     },
//     cancelBtn: {
//       backgroundColor: "transparent", border: "2px solid #ffd400", color: "#ffd400",
//       padding: "0.75rem 1.75rem", borderRadius: "12px", cursor: "pointer",
//       transition: "all 0.3s ease", fontSize: "15px",
//     },
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');

//         :root { --navbar-height: 92px; }

//         * { margin: 0; padding: 0; box-sizing: border-box; }

//         html, body { scrollbar-width: none; -ms-overflow-style: none; }
//         html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; }

//         body {
//           background-color: rgba(24, 23, 23, 1);
//           color: #ffffff;
//           font-family: "Segoe UI", Arial, sans-serif;
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50%       { transform: translateY(-3px); }
//         }

//         @keyframes suggFadeIn {
//           from { opacity: 0; transform: translateY(-6px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes mobileSearchSlide {
//           from { opacity: 0; transform: translateY(-8px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }

//         /* ── NAVBAR ─────────────────────────────────── */
//         .navbar {
//           position: fixed;
//           top: 0; left: 0;
//           width: 100%;
//           height: var(--navbar-height);
//           background: #ffd400;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 0 60px;
//           z-index: 1100;
//           overflow: visible;
//           box-shadow: 0 4px 20px rgba(255,212,0,0.3);
//         }

//         .nav-logo {
//           font-family: 'Jersey 25', sans-serif;
//           font-size: 48px;
//           letter-spacing: -0.04em;
//           color: #000;
//           text-decoration: none;
//           animation: float 3s ease-in-out infinite;
//           position: relative;
//           z-index: 1;
//         }

//         .nav-logo:hover { filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2)); }

//         /* ── TABBAR ─────────────────────────────────── */
//         .nav-tabbar {
//           position: absolute;
//           left: 50%;
//           transform: translateX(-50%);
//           background: transparent;
//           border-radius: 50px;
//           padding: 12px 24px;
//           display: flex;
//           gap: 8px;
//           z-index: 1;
//         }

//         .nav-tab {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 8px 16px;
//           cursor: pointer;
//           border-radius: 20px;
//           transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
//           position: relative;
//           min-width: 70px;
//           text-decoration: none;
//         }

//         .nav-tab-icon {
//           transition: all 0.4s cubic-bezier(0.68,-0.55,0.265,1.55);
//           margin-bottom: 4px;
//         }

//         .nav-tab-label {
//           font-family: 'Jersey 25', sans-serif;
//           font-size: 14px;
//           color: #000;
//           transition: all 0.3s ease;
//           white-space: nowrap;
//         }

//         .nav-tab.active { background: rgba(0,0,0,0.1); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
//         .nav-tab.active .nav-tab-label { font-weight: 700; }

//         .nav-tab::after {
//           content: '';
//           position: absolute;
//           bottom: -8px; left: 50%;
//           transform: translateX(-50%);
//           width: 0; height: 4px;
//           background: #000;
//           border-radius: 3px;
//           transition: width 0.3s ease;
//         }

//         .nav-tab.active::after { width: 50%; }

//         .nav-tab:hover .nav-tab-icon {
//           transform: translateY(-8px) scale(1.2);
//           filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
//         }

//         .nav-tab:not(.active):hover .nav-tab-label { font-weight: 600; }

//         /* ── NAV ICONS ──────────────────────────────── */
//         .nav-icons {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           position: relative;
//           z-index: 1200;
//         }

//         .nav-icon-btn {
//           width: 46px; height: 46px;
//           border-radius: 50%;
//           background: rgba(0,0,0,0.08);
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer;
//           transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
//           position: relative;
//           flex-shrink: 0;
//         }

//         .nav-icon-btn:hover { background: rgba(0,0,0,0.15); transform: translateY(-3px) scale(1.1); }
//         .nav-icon-btn.active-search { background: rgba(0,0,0,0.18); }

//         /* ── DESKTOP SEARCH ─────────────────────────── */
//         .search-wrapper {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           position: relative;
//         }

//         .search-input-container {
//           transition: width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease;
//           width: 0;
//           opacity: 0;
//           pointer-events: none;
//           overflow: hidden;
//         }

//         .search-input-container.open {
//           width: 150px;
//           opacity: 1;
//           pointer-events: all;
//           overflow: visible;
//         }

//         .search-input {
//           width: 150px;
//           padding: 9px 14px;
//           border-radius: 24px;
//           border: 2px solid #000;
//           background: transparent;
//           font-family: 'Segoe UI', Arial, sans-serif;
//           font-size: 13px;
//           color: #000;
//           outline: none;
//           box-shadow: none;
//         }

//         .search-input::placeholder { color: rgba(0,0,0,0.45); }
//         .search-input:focus { border-color: #000; outline: none; box-shadow: none; }

//         /* ── DESKTOP SUGGESTIONS DROPDOWN ───────────── */
//         .search-suggestions {
//           position: absolute;
//           top: calc(100% + 52px);
//           right: 0;
//           width: 300px;
//           background: #1a1a1a;
//           border: 2px solid #ffd400;
//           border-radius: 16px;
//           overflow-y: auto;
//           max-height: 360px;
//           z-index: 2000;
//           animation: suggFadeIn 0.2s ease;
//           box-shadow: 0 12px 40px rgba(0,0,0,0.6);
//           scrollbar-width: thin;
//           scrollbar-color: #ffd400 #1a1a1a;
//         }

//         .search-suggestions::-webkit-scrollbar { width: 4px; }
//         .search-suggestions::-webkit-scrollbar-track { background: #1a1a1a; border-radius: 0 16px 16px 0; }
//         .search-suggestions::-webkit-scrollbar-thumb { background: #ffd400; border-radius: 4px; }

//         /* ── MOBILE SEARCH BAR (below navbar) ───────── */
//         .mobile-search-bar {
//           display: none; /* hidden by default, shown via JS class */
//           position: fixed;
//           top: var(--navbar-height);
//           left: 0;
//           width: 100%;
//           background: #ffd400;
//           padding: 12px 16px;
//           z-index: 1090;
//           box-shadow: 0 4px 20px rgba(0,0,0,0.15);
//           flex-direction: column;
//           gap: 8px;
//           animation: mobileSearchSlide 0.25s ease;
//         }

//         .mobile-search-bar.visible {
//           display: flex;
//         }

//         .mobile-search-inner {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           background: rgba(0,0,0,0.08);
//           border-radius: 14px;
//           padding: 10px 16px;
//           border: 2px solid #000;
//         }

//         .mobile-search-inner input {
//           flex: 1;
//           border: none;
//           background: transparent;
//           font-size: 16px;
//           color: #000;
//           outline: none;
//           font-family: 'Segoe UI', Arial, sans-serif;
//         }

//         .mobile-search-inner input::placeholder { color: rgba(0,0,0,0.45); }

//         /* ── MOBILE SUGGESTIONS (below search bar) ─── */
//         .mobile-sugg-list {
//           background: #1a1a1a;
//           border: 2px solid #ffd400;
//           border-radius: 14px;
//           overflow-y: auto;
//           max-height: 55vh;
//           animation: suggFadeIn 0.2s ease;
//           box-shadow: 0 8px 30px rgba(0,0,0,0.5);
//           scrollbar-width: thin;
//           scrollbar-color: #ffd400 #1a1a1a;
//         }

//         .mobile-sugg-list::-webkit-scrollbar { width: 4px; }
//         .mobile-sugg-list::-webkit-scrollbar-track { background: #1a1a1a; border-radius: 0 14px 14px 0; }
//         .mobile-sugg-list::-webkit-scrollbar-thumb { background: #ffd400; border-radius: 4px; }

//         /* ── SHARED SUGGESTION ITEM ─────────────────── */
//         .sugg-item {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 10px 14px;
//           cursor: pointer;
//           transition: background 0.15s ease;
//           border-bottom: 1px solid rgba(255,212,0,0.1);
//         }

//         .sugg-item:last-child { border-bottom: none; }
//         .sugg-item:hover, .sugg-item:active { background: rgba(255,212,0,0.1); }

//         .sugg-img {
//           width: 46px; height: 46px;
//           border-radius: 8px;
//           object-fit: cover;
//           border: 1px solid rgba(255,212,0,0.3);
//           flex-shrink: 0;
//         }

//         .sugg-info { flex: 1; min-width: 0; }

//         .sugg-name {
//           font-size: 13px;
//           font-weight: 600;
//           color: #fff;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         .sugg-price {
//           font-size: 12px;
//           color: #ffd400;
//           font-weight: 700;
//           margin-top: 2px;
//         }

//         .sugg-stock { font-size: 10px; margin-top: 2px; }
//         .sugg-stock.in  { color: #4caf50; }
//         .sugg-stock.out { color: #f44336; }
//         .sugg-arrow { color: #ffd400; font-size: 16px; flex-shrink: 0; }

//         .sugg-msg {
//           padding: 14px;
//           text-align: center;
//           color: #888;
//           font-size: 13px;
//         }

//         /* ── CART BADGE ─────────────────────────────── */
//         .cart-badge {
//           position: absolute;
//           top: -4px; right: -4px;
//           background: linear-gradient(135deg, #ff0000, #ff4444);
//           color: white;
//           border-radius: 50%;
//           padding: 3px 7px;
//           font-size: 11px; font-weight: bold;
//           min-width: 20px; text-align: center;
//           border: 2px solid #ffd400;
//           box-shadow: 0 2px 8px rgba(255,0,0,0.4);
//         }

//         /* ── HAMBURGER ──────────────────────────────── */
//         .hamburger {
//           display: none;
//           color: #000; font-size: 26px; line-height: 1;
//           cursor: pointer; padding: 10px; border-radius: 12px;
//           background: rgba(0,0,0,0.08);
//           transition: all 0.3s ease;
//         }

//         .hamburger:hover { background: rgba(0,0,0,0.15); }

//         /* ── MOBILE MENU (hamburger) ────────────────── */
//         .mobile-menu {
//           position: fixed;
//           top: var(--navbar-height); left: 0;
//           width: 100%;
//           background: #ffd400;
//           display: flex; flex-direction: column; align-items: center;
//           gap: 8px; padding: 20px;
//           transform: translateY(-120%);
//           transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
//           z-index: 1050;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.15);
//           max-height: calc(100vh - var(--navbar-height));
//           overflow-y: auto;
//         }

//         .mobile-menu.open { transform: translateY(0); }

//         .mobile-tab {
//           display: flex; align-items: center; gap: 16px;
//           padding: 14px 24px; width: 90%;
//           border-radius: 16px; cursor: pointer;
//           transition: all 0.3s ease; text-decoration: none;
//           background: rgba(0,0,0,0.07);
//         }

//         .mobile-tab.active { background: rgba(0,0,0,0.15); }
//         .mobile-tab:hover  { transform: translateX(8px); background: rgba(0,0,0,0.12); }

//         .mobile-tab-label {
//           font-family: 'Jersey 25', sans-serif;
//           font-size: 20px; color: #000;
//         }

//         .mobile-tab.active .mobile-tab-label { font-weight: 700; }

//         .page-wrapper { padding-top: var(--navbar-height); }

//         /* ── RESPONSIVE ─────────────────────────────── */
//         @media (max-width: 1106px) {
//           .nav-tabbar { display: none; }
//           .hamburger  { display: block; }
//           .nav-logo   { font-size: 40px; }
//           /* Hide desktop-only search elements */
//           .search-input-container,
//           .search-suggestions { display: none !important; }
//         }

//         @media (max-width: 600px) {
//           :root { --navbar-height: 72px; }
//           .navbar       { padding: 0 16px; }
//           .nav-logo     { font-size: 34px; }
//           .nav-icon-btn { width: 40px; height: 40px; }
//           .nav-icons    { gap: 8px; }
//         }
//       `}</style>

//       {/* ═══════════════ NAVBAR ═══════════════ */}
//       <nav className="navbar">
//         <Link
//           to="/"
//           className="nav-logo"
//           style={{ transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 3}px)`, transition: "transform 0.15s ease-out" }}
//         >
//           MPACT
//         </Link>

//         {/* TABS */}
//         <div
//           className="nav-tabbar"
//           style={{ transform: `translateX(-50%) translate(${mousePos.x * 3}px, ${mousePos.y * 2}px)`, transition: "transform 0.2s ease-out" }}
//         >
//           <Link to="/" className={`nav-tab ${isActive('/') ? 'active' : ''}`}>
//             <Home size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
//             <span className="nav-tab-label">Home</span>
//           </Link>
//           <Link to="/product" className={`nav-tab ${isActive('/product') ? 'active' : ''}`}>
//             <Package size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
//             <span className="nav-tab-label">Products</span>
//           </Link>
//           <Link to="/about" className={`nav-tab ${isActive('/about') ? 'active' : ''}`}>
//             <Info size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
//             <span className="nav-tab-label">About</span>
//           </Link>
//           <Link to="/blog" className={`nav-tab ${isActive('/blog') ? 'active' : ''}`}>
//             <BookOpen size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
//             <span className="nav-tab-label">Blog</span>
//           </Link>
//           <Link
//             to="/wishlist"
//             className={`nav-tab ${isActive('/wishlist') ? 'active' : ''}`}
//             onClick={(e) => { e.preventDefault(); if (user) navigate("/wishlist"); else setShowLoginModal(true); }}
//           >
//             <Heart size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
//             <span className="nav-tab-label">Wishlist</span>
//           </Link>
//           <Link to="/distributor" className={`nav-tab ${isActive('/distributor') ? 'active' : ''}`}>
//             <Building2 size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
//             <span className="nav-tab-label">Distributor</span>
//           </Link>
//         </div>

//         {/* ICONS */}
//         <div
//           className="nav-icons"
//           style={{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 3}px)`, transition: "transform 0.15s ease-out" }}
//         >
//           {/* ── DESKTOP SEARCH ── */}
//           <div className="search-wrapper" ref={searchRef}>
//             <div className={`search-input-container ${showSearch ? "open" : ""}`}>
//               <input
//                 className="search-input"
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={handleDesktopQueryChange}
//                 onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
//                 autoFocus={showSearch}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" && suggestions.length > 0) handleSuggestionClick(suggestions[0]._id);
//                 }}
//               />
//             </div>

//             {/* SEARCH ICON — works for both desktop & mobile */}
//             <div
//               className={`nav-icon-btn ${showMobileSearch ? "active-search" : ""}`}
//               onClick={handleSearchIconClick}
//               role="button" tabIndex={0} title="Search"
//             >
//               <Search size={22} color="#000" strokeWidth={2.5} />
//             </div>

//             {/* DESKTOP DROPDOWN */}
//             {showSearch && (searchLoading || showSuggestions) && (
//               <div className="search-suggestions">
//                 {searchLoading ? (
//                   <div className="sugg-msg">Searching...</div>
//                 ) : suggestions.length === 0 ? (
//                   <div className="sugg-msg">No products found</div>
//                 ) : (
//                   suggestions.map((p) => (
//                     <div key={p._id} className="sugg-item" onClick={() => handleSuggestionClick(p._id)}>
//                       <img className="sugg-img" src={p.images?.[0]?.url || "/images/Product1.png"} alt={p.name} />
//                       <div className="sugg-info">
//                         <div className="sugg-name">{p.name}</div>
//                         <div className="sugg-price">₹{p.price}</div>
//                         <div className={`sugg-stock ${p.countInStock > 0 ? "in" : "out"}`}>
//                           {p.countInStock > 0 ? "In Stock" : "Out of Stock"}
//                         </div>
//                       </div>
//                       <span className="sugg-arrow">→</span>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
//           </div>

//           {/* PROFILE */}
//           <div className="nav-icon-btn" onClick={handleProfileClick} role="button" tabIndex={0}>
//             <User size={22} color="#000" strokeWidth={2.5} />
//           </div>

//           {/* CART */}
//           <div
//             className="nav-icon-btn"
//             onClick={() => {
//               if (!user) { setShowLoginModal(true); return; }
//               if (cartCount === 0) { toast.error("Your cart is empty"); return; }
//               setOpenSideCart(true);
//             }}
//             role="button" tabIndex={0}
//           >
//             <ShoppingCart size={22} color="#000" strokeWidth={2.5} />
//             {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
//           </div>

//           {/* HAMBURGER */}
//           <div className="hamburger" role="button" tabIndex={0} onClick={() => { setMenuOpen(!menuOpen); closeMobileSearch(); }}>
//             {menuOpen ? "✕" : "☰"}
//           </div>
//         </div>
//       </nav>

//       {/* ═══════════════ MOBILE SEARCH BAR (slides below navbar) ═══════════════ */}
//       <div className={`mobile-search-bar ${showMobileSearch ? "visible" : ""}`} ref={mobileSearchRef}>
//         <div className="mobile-search-inner">
//           <Search size={20} color="#000" strokeWidth={2} />
//           <input
//             ref={mobileInputRef}
//             type="text"
//             placeholder="Search products..."
//             value={mobileQuery}
//             onChange={handleMobileQueryChange}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && mobileSuggestions.length > 0) handleMobileSuggestionClick(mobileSuggestions[0]._id);
//             }}
//           />
//           {mobileQuery ? (
//             <X size={20} color="#000" style={{ cursor: "pointer", flexShrink: 0 }}
//               onClick={() => { setMobileQuery(""); setMobileSuggestions([]); mobileInputRef.current?.focus(); }} />
//           ) : (
//             <X size={20} color="#000" style={{ cursor: "pointer", flexShrink: 0, opacity: 0.5 }}
//               onClick={closeMobileSearch} />
//           )}
//         </div>

//         {/* MOBILE SUGGESTIONS */}
//         {(mobileSearchLoading || mobileSuggestions.length > 0) && (
//           <div className="mobile-sugg-list">
//             {mobileSearchLoading ? (
//               <div className="sugg-msg">Searching...</div>
//             ) : (
//               mobileSuggestions.map((p) => (
//                 <div key={p._id} className="sugg-item" onClick={() => handleMobileSuggestionClick(p._id)}>
//                   <img className="sugg-img" src={p.images?.[0]?.url || "/images/Product1.png"} alt={p.name} />
//                   <div className="sugg-info">
//                     <div className="sugg-name">{p.name}</div>
//                     <div className="sugg-price">₹{p.price}</div>
//                     <div className={`sugg-stock ${p.countInStock > 0 ? "in" : "out"}`}>
//                       {p.countInStock > 0 ? "In Stock" : "Out of Stock"}
//                     </div>
//                   </div>
//                   <span className="sugg-arrow">→</span>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>

//       {/* ═══════════════ MOBILE MENU (hamburger) ═══════════════ */}
//       <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
//         <Link to="/" className={`mobile-tab ${isActive('/') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
//           <Home size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Home</span>
//         </Link>
//         <Link to="/product" className={`mobile-tab ${isActive('/product') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
//           <Package size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Products</span>
//         </Link>
//         <Link to="/about" className={`mobile-tab ${isActive('/about') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
//           <Info size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">About Us</span>
//         </Link>
//         <Link to="/blog" className={`mobile-tab ${isActive('/blog') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
//           <BookOpen size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Blog</span>
//         </Link>
//         <Link
//           to="/wishlist"
//           className={`mobile-tab ${isActive('/wishlist') ? 'active' : ''}`}
//           onClick={(e) => { e.preventDefault(); setMenuOpen(false); if (user) navigate("/wishlist"); else setShowLoginModal(true); }}
//         >
//           <Heart size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Wishlist</span>
//         </Link>
//         <Link to="/distributor" className={`mobile-tab ${isActive('/distributor') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
//           <Building2 size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Distributor</span>
//         </Link>
//       </div>

//       {user && <SideCart />}

//       {/* LOGIN MODAL */}
//       {showLoginModal && (
//         <div style={modalStyles.overlay} onClick={() => setShowLoginModal(false)}>
//           <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
//             <h3 style={{ marginBottom: "1rem", color: "#ffd400", fontSize: "26px", fontWeight: "bold" }}>Login Required</h3>
//             <p style={{ marginBottom: "1.5rem", color: "#ccc", fontSize: "15px" }}>Please login to continue with your action.</p>
//             <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
//               <button
//                 style={modalStyles.loginBtn}
//                 onClick={() => { setShowLoginModal(false); navigate("/login"); }}
//                 onMouseEnter={(e) => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 6px 20px rgba(255,212,0,0.4)"; }}
//                 onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none"; }}
//               >Login</button>
//               <button
//                 style={modalStyles.cancelBtn}
//                 onClick={() => setShowLoginModal(false)}
//                 onMouseEnter={(e) => { e.target.style.background = "rgba(255,212,0,0.15)"; }}
//                 onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
//               >Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import SideCart from "./SideCart";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, User, Home, Package, Info, BookOpen, Heart, Building2, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [promoIndex, setPromoIndex] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Desktop search
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Mobile search bar (separate from hamburger menu)
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileQuery, setMobileQuery] = useState("");
  const [mobileSuggestions, setMobileSuggestions] = useState([]);
  const [mobileSearchLoading, setMobileSearchLoading] = useState(false);

  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const mobileInputRef = useRef(null);
  const debounceRef = useRef(null);
  const mobileDebounceRef = useRef(null);

  const { cartCount, setOpenSideCart } = useCart();

  // LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [menuOpen]);

  // CLOSE ON ESCAPE
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        closeDesktopSearch();
        closeMobileSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // CLOSE DESKTOP SUGGESTIONS ON OUTSIDE CLICK
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // CLOSE MOBILE SEARCH ON OUTSIDE CLICK
  useEffect(() => {
    const handler = (e) => {
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
        closeMobileSearch();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // MOUSE PARALLAX
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // AUTO-FOCUS mobile input when search opens
  useEffect(() => {
    if (showMobileSearch && mobileInputRef.current) {
      setTimeout(() => mobileInputRef.current?.focus(), 100);
    }
  }, [showMobileSearch]);

  // PROMO CAROUSEL (auto-advance every 6s)
  const promoMessages = [
    "Get 3% Additional Prepaid bonus 🥳",
    "Get up to 35% off on all orders 🥳",
  ];
  useEffect(() => {
    const id = setInterval(() => {
      setPromoIndex((i) => (i + 1) % promoMessages.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);
  const nextPromo = () => setPromoIndex((i) => (i + 1) % promoMessages.length);
  const prevPromo = () => setPromoIndex((i) => (i - 1 + promoMessages.length) % promoMessages.length);

  // ── DESKTOP SEARCH ──────────────────────────────────────────────
  const fetchSuggestions = useCallback((query) => {
    clearTimeout(debounceRef.current);
    if (!query.trim()) { setSuggestions([]); setShowSuggestions(false); return; }
    debounceRef.current = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await api.get("/api/products", { params: { keyword: query, limit: 6 } });
        const products = res.data.products || [];
        setSuggestions(products);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]); setShowSuggestions(false);
      } finally {
        setSearchLoading(false);
      }
    }, 300);
  }, []);

  const handleDesktopQueryChange = (e) => {
    setSearchQuery(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleSuggestionClick = (productId) => {
    closeDesktopSearch();
    navigate(`/productspec/${productId}`);
  };

  const closeDesktopSearch = () => {
    setShowSearch(false);
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // ── MOBILE SEARCH ────────────────────────────────────────────────
  const fetchMobileSuggestions = useCallback((query) => {
    clearTimeout(mobileDebounceRef.current);
    if (!query.trim()) { setMobileSuggestions([]); return; }
    mobileDebounceRef.current = setTimeout(async () => {
      setMobileSearchLoading(true);
      try {
        const res = await api.get("/api/products", { params: { keyword: query, limit: 6 } });
        setMobileSuggestions(res.data.products || []);
      } catch {
        setMobileSuggestions([]);
      } finally {
        setMobileSearchLoading(false);
      }
    }, 300);
  }, []);

  const handleMobileQueryChange = (e) => {
    setMobileQuery(e.target.value);
    fetchMobileSuggestions(e.target.value);
  };

  const closeMobileSearch = () => {
    setShowMobileSearch(false);
    setMobileQuery("");
    setMobileSuggestions([]);
  };

  const handleMobileSuggestionClick = (productId) => {
    closeMobileSearch();
    navigate(`/productspec/${productId}`);
  };

  const handleSearchIconClick = () => {
    // On mobile (hamburger visible), toggle mobile search bar
    // On desktop, toggle desktop search input
    const isMobile = window.innerWidth <= 1106;
    if (isMobile) {
      if (showMobileSearch) {
        closeMobileSearch();
      } else {
        setMenuOpen(false); // close hamburger if open
        setShowMobileSearch(true);
      }
    } else {
      setShowSearch((prev) => { if (prev) closeDesktopSearch(); return !prev; });
    }
  };

  // ── MISC ─────────────────────────────────────────────────────────
  const handleProfileClick = () => {
    if (user) navigate("/profile");
    else setShowLoginModal(true);
  };

  const isActive = (path) => location.pathname === path;

  const modalStyles = {
    overlay: {
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.75)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 2000, backdropFilter: "blur(8px)",
    },
    modal: {
      backgroundColor: "#1a1a1a", padding: "2.5rem", borderRadius: "20px",
      border: "2px solid #ffd400", width: "340px", textAlign: "center",
      color: "white", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
    },
    loginBtn: {
      backgroundColor: "#ffd400", border: "none", padding: "0.75rem 1.75rem",
      borderRadius: "12px", cursor: "pointer", fontWeight: "bold",
      color: "#000", transition: "all 0.3s ease", fontSize: "15px",
    },
    cancelBtn: {
      backgroundColor: "transparent", border: "2px solid #ffd400", color: "#ffd400",
      padding: "0.75rem 1.75rem", borderRadius: "12px", cursor: "pointer",
      transition: "all 0.3s ease", fontSize: "15px",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');

        :root { --navbar-height: 92px; --promo-height: 36px; }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        html, body { scrollbar-width: none; -ms-overflow-style: none; }
        html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; }

        body {
          background-color: rgba(24, 23, 23, 1);
          color: #ffffff;
          font-family: "Segoe UI", Arial, sans-serif;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-3px); }
        }

        @keyframes suggFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes mobileSearchSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes promoFade {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── PROMO BAR ───────────────────────────────── */
        .promo-bar{
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: var(--promo-height);
          background: #403e3c;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1200;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .promo-inner{
          width: 100%;
          max-width: 1100px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          animation: promoFade 0.25s ease;
        }
        .promo-text{
          color: #FFD700;;
          text-decoration: none;
          font-weight: 700;
          letter-spacing: 0.2px;
          font-size: 14px;
          line-height: 1;
        }
        .promo-arrow{
          background: transparent;
          border: none;
          color: #000;
          height: 100%;
          width: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0.85;
        }
        .promo-arrow:hover { opacity: 1; }

        /* ── NAVBAR ─────────────────────────────────── */
        .navbar {
          position: fixed;
          top: var(--promo-height); left: 0;
          width: 100%;
          height: var(--navbar-height);
          background: #ffd400;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60px;
          z-index: 1100;
          overflow: visible;
          box-shadow: 0 4px 20px rgba(255,212,0,0.3);
        }

        .nav-logo {
          font-family: 'Jersey 25', sans-serif;
          font-size: 48px;
          letter-spacing: -0.04em;
          color: #000;
          text-decoration: none;
          animation: float 3s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }

        .nav-logo:hover { filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2)); }

        /* ── TABBAR ─────────────────────────────────── */
        .nav-tabbar {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          background: transparent;
          border-radius: 50px;
          padding: 12px 24px;
          display: flex;
          gap: 8px;
          z-index: 1;
        }

        .nav-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8px 16px;
          cursor: pointer;
          border-radius: 20px;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          min-width: 70px;
          text-decoration: none;
        }

        .nav-tab-icon {
          transition: all 0.4s cubic-bezier(0.68,-0.55,0.265,1.55);
          margin-bottom: 4px;
        }

        .nav-tab-label {
          font-family: 'Jersey 25', sans-serif;
          font-size: 14px;
          color: #000;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .nav-tab.active { background: rgba(0,0,0,0.1); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .nav-tab.active .nav-tab-label { font-weight: 700; }

        .nav-tab::after {
          content: '';
          position: absolute;
          bottom: -8px; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 4px;
          background: #000;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .nav-tab.active::after { width: 50%; }

        .nav-tab:hover .nav-tab-icon {
          transform: translateY(-8px) scale(1.2);
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
        }

        .nav-tab:not(.active):hover .nav-tab-label { font-weight: 600; }

        /* ── NAV ICONS ──────────────────────────────── */
        .nav-icons {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1200;
        }

        .nav-icon-btn {
          width: 46px; height: 46px;
          border-radius: 50%;
          background: rgba(0,0,0,0.08);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          flex-shrink: 0;
        }

        .nav-icon-btn:hover { background: rgba(0,0,0,0.15); transform: translateY(-3px) scale(1.1); }
        .nav-icon-btn.active-search { background: rgba(0,0,0,0.18); }

        /* ── DESKTOP SEARCH ─────────────────────────── */
        .search-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .search-input-container {
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease;
          width: 0;
          opacity: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .search-input-container.open {
          width: 150px;
          opacity: 1;
          pointer-events: all;
          overflow: visible;
        }

        .search-input {
          width: 150px;
          padding: 9px 14px;
          border-radius: 24px;
          border: 2px solid #000;
          background: transparent;
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 13px;
          color: #000;
          outline: none;
          box-shadow: none;
        }

        .search-input::placeholder { color: rgba(0,0,0,0.45); }
        .search-input:focus { border-color: #000; outline: none; box-shadow: none; }

        /* ── DESKTOP SUGGESTIONS DROPDOWN ───────────── */
        .search-suggestions {
          position: absolute;
          top: calc(100% + 52px);
          right: 0;
          width: 300px;
          background: #1a1a1a;
          border: 2px solid #ffd400;
          border-radius: 16px;
          overflow-y: auto;
          max-height: 360px;
          z-index: 2000;
          animation: suggFadeIn 0.2s ease;
          box-shadow: 0 12px 40px rgba(0,0,0,0.6);
          scrollbar-width: thin;
          scrollbar-color: #ffd400 #1a1a1a;
        }

        .search-suggestions::-webkit-scrollbar { width: 4px; }
        .search-suggestions::-webkit-scrollbar-track { background: #1a1a1a; border-radius: 0 16px 16px 0; }
        .search-suggestions::-webkit-scrollbar-thumb { background: #ffd400; border-radius: 4px; }

        /* ── MOBILE SEARCH BAR (below navbar) ───────── */
        .mobile-search-bar {
          display: none; /* hidden by default, shown via JS class */
          position: fixed;
          top: calc(var(--navbar-height) + var(--promo-height));
          left: 0;
          width: 100%;
          background: #ffd400;
          padding: 12px 16px;
          z-index: 1090;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          flex-direction: column;
          gap: 8px;
          animation: mobileSearchSlide 0.25s ease;
        }

        .mobile-search-bar.visible {
          display: flex;
        }

        .mobile-search-inner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(0,0,0,0.08);
          border-radius: 14px;
          padding: 10px 16px;
          border: 2px solid #000;
        }

        .mobile-search-inner input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 16px;
          color: #000;
          outline: none;
          font-family: 'Segoe UI', Arial, sans-serif;
        }

        .mobile-search-inner input::placeholder { color: rgba(0,0,0,0.45); }

        /* ── MOBILE SUGGESTIONS (below search bar) ─── */
        .mobile-sugg-list {
          background: #1a1a1a;
          border: 2px solid #ffd400;
          border-radius: 14px;
          overflow-y: auto;
          max-height: 55vh;
          animation: suggFadeIn 0.2s ease;
          box-shadow: 0 8px 30px rgba(0,0,0,0.5);
          scrollbar-width: thin;
          scrollbar-color: #ffd400 #1a1a1a;
        }

        .mobile-sugg-list::-webkit-scrollbar { width: 4px; }
        .mobile-sugg-list::-webkit-scrollbar-track { background: #1a1a1a; border-radius: 0 14px 14px 0; }
        .mobile-sugg-list::-webkit-scrollbar-thumb { background: #ffd400; border-radius: 4px; }

        /* ── SHARED SUGGESTION ITEM ─────────────────── */
        .sugg-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          cursor: pointer;
          transition: background 0.15s ease;
          border-bottom: 1px solid rgba(255,212,0,0.1);
        }

        .sugg-item:last-child { border-bottom: none; }
        .sugg-item:hover, .sugg-item:active { background: rgba(255,212,0,0.1); }

        .sugg-img {
          width: 46px; height: 46px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid rgba(255,212,0,0.3);
          flex-shrink: 0;
        }

        .sugg-info { flex: 1; min-width: 0; }

        .sugg-name {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sugg-price {
          font-size: 12px;
          color: #ffd400;
          font-weight: 700;
          margin-top: 2px;
        }

        .sugg-stock { font-size: 10px; margin-top: 2px; }
        .sugg-stock.in  { color: #4caf50; }
        .sugg-stock.out { color: #f44336; }
        .sugg-arrow { color: #ffd400; font-size: 16px; flex-shrink: 0; }

        .sugg-msg {
          padding: 14px;
          text-align: center;
          color: #888;
          font-size: 13px;
        }

        /* ── CART BADGE ─────────────────────────────── */
        .cart-badge {
          position: absolute;
          top: -4px; right: -4px;
          background: linear-gradient(135deg, #ff0000, #ff4444);
          color: white;
          border-radius: 50%;
          padding: 3px 7px;
          font-size: 11px; font-weight: bold;
          min-width: 20px; text-align: center;
          border: 2px solid #ffd400;
          box-shadow: 0 2px 8px rgba(255,0,0,0.4);
        }

        /* ── HAMBURGER ──────────────────────────────── */
        .hamburger {
          display: none;
          color: #000; font-size: 26px; line-height: 1;
          cursor: pointer; padding: 10px; border-radius: 12px;
          background: rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }

        .hamburger:hover { background: rgba(0,0,0,0.15); }

        /* ── MOBILE MENU (hamburger) ────────────────── */
        .mobile-menu {
          position: fixed;
          top: calc(var(--navbar-height) + var(--promo-height)); left: 0;
          width: 100%;
          background: #ffd400;
          display: flex; flex-direction: column; align-items: center;
          gap: 8px; padding: 20px;
          transform: translateY(-120%);
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
          z-index: 1050;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          max-height: calc(100vh - var(--navbar-height));
          overflow-y: auto;
        }

        .mobile-menu.open { transform: translateY(0); }

        .mobile-tab {
          display: flex; align-items: center; gap: 16px;
          padding: 14px 24px; width: 90%;
          border-radius: 16px; cursor: pointer;
          transition: all 0.3s ease; text-decoration: none;
          background: rgba(0,0,0,0.07);
        }

        .mobile-tab.active { background: rgba(0,0,0,0.15); }
        .mobile-tab:hover  { transform: translateX(8px); background: rgba(0,0,0,0.12); }

        .mobile-tab-label {
          font-family: 'Jersey 25', sans-serif;
          font-size: 20px; color: #000;
        }

        .mobile-tab.active .mobile-tab-label { font-weight: 700; }

        .page-wrapper { padding-top: calc(var(--navbar-height) + var(--promo-height)); }

        /* ── RESPONSIVE ─────────────────────────────── */
        @media (max-width: 1106px) {
          .nav-tabbar { display: none; }
          .hamburger  { display: block; }
          .nav-logo   { font-size: 40px; }
          /* Hide desktop-only search elements */
          .search-input-container,
          .search-suggestions { display: none !important; }
        }

        @media (max-width: 600px) {
          :root { --navbar-height: 72px; --promo-height: 32px; }
          .navbar       { padding: 0 16px; }
          .nav-logo     { font-size: 34px; }
          .nav-icon-btn { width: 40px; height: 40px; }
          .nav-icons    { gap: 8px; }
        }
      `}</style>

      {/* PROMO BAR */}
      <div className="promo-bar">
        <div className="promo-inner">
          <button className="promo-arrow" aria-label="Previous" onClick={prevPromo}>
            <ChevronLeft size={18} />
          </button>
          <Link to="/product" className="promo-text">
            {promoMessages[promoIndex]} <span aria-hidden>→</span>
          </Link>
          <button className="promo-arrow" aria-label="Next" onClick={nextPromo}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav className="navbar">
        <Link
          to="/"
          className="nav-logo"
          style={{ transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 3}px)`, transition: "transform 0.15s ease-out" }}
        >
          MPACT
        </Link>

        {/* TABS */}
        <div
          className="nav-tabbar"
          style={{ transform: `translateX(-50%) translate(${mousePos.x * 3}px, ${mousePos.y * 2}px)`, transition: "transform 0.2s ease-out" }}
        >
          <Link to="/" className={`nav-tab ${isActive('/') ? 'active' : ''}`}>
            <Home size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
            <span className="nav-tab-label">Home</span>
          </Link>
          <Link to="/product" className={`nav-tab ${isActive('/product') ? 'active' : ''}`}>
            <Package size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
            <span className="nav-tab-label">Products</span>
          </Link>
          <Link to="/about" className={`nav-tab ${isActive('/about') ? 'active' : ''}`}>
            <Info size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
            <span className="nav-tab-label">About</span>
          </Link>
          <Link to="/blog" className={`nav-tab ${isActive('/blog') ? 'active' : ''}`}>
            <BookOpen size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
            <span className="nav-tab-label">Blog</span>
          </Link>
          <Link
            to="/wishlist"
            className={`nav-tab ${isActive('/wishlist') ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); if (user) navigate("/wishlist"); else setShowLoginModal(true); }}
          >
            <Heart size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
            <span className="nav-tab-label">Wishlist</span>
          </Link>
          <Link to="/distributor" className={`nav-tab ${isActive('/distributor') ? 'active' : ''}`}>
            <Building2 size={22} className="nav-tab-icon" color="#000" strokeWidth={2} />
            <span className="nav-tab-label">Distributor</span>
          </Link>
        </div>

        {/* ICONS */}
        <div
          className="nav-icons"
          style={{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 3}px)`, transition: "transform 0.15s ease-out" }}
        >
          {/* ── DESKTOP SEARCH ── */}
          <div className="search-wrapper" ref={searchRef}>
            <div className={`search-input-container ${showSearch ? "open" : ""}`}>
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleDesktopQueryChange}
                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                autoFocus={showSearch}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && suggestions.length > 0) handleSuggestionClick(suggestions[0]._id);
                }}
              />
            </div>

            {/* SEARCH ICON — works for both desktop & mobile */}
            <div
              className={`nav-icon-btn ${showMobileSearch ? "active-search" : ""}`}
              onClick={handleSearchIconClick}
              role="button" tabIndex={0} title="Search"
            >
              <Search size={22} color="#000" strokeWidth={2.5} />
            </div>

            {/* DESKTOP DROPDOWN */}
            {showSearch && (searchLoading || showSuggestions) && (
              <div className="search-suggestions">
                {searchLoading ? (
                  <div className="sugg-msg">Searching...</div>
                ) : suggestions.length === 0 ? (
                  <div className="sugg-msg">No products found</div>
                ) : (
                  suggestions.map((p) => (
                    <div key={p._id} className="sugg-item" onClick={() => handleSuggestionClick(p._id)}>
                      <img className="sugg-img" src={p.images?.[0]?.url || "/images/Product1.png"} alt={p.name} />
                      <div className="sugg-info">
                        <div className="sugg-name">{p.name}</div>
                        <div className="sugg-price">₹{p.price}</div>
                        <div className={`sugg-stock ${p.countInStock > 0 ? "in" : "out"}`}>
                          {p.countInStock > 0 ? "In Stock" : "Out of Stock"}
                        </div>
                      </div>
                      <span className="sugg-arrow">→</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* PROFILE */}
          <div className="nav-icon-btn" onClick={handleProfileClick} role="button" tabIndex={0}>
            <User size={22} color="#000" strokeWidth={2.5} />
          </div>

          {/* CART */}
          <div
            className="nav-icon-btn"
            onClick={() => {
              if (!user) { setShowLoginModal(true); return; }
              if (cartCount === 0) { toast.error("Your cart is empty"); return; }
              setOpenSideCart(true);
            }}
            role="button" tabIndex={0}
          >
            <ShoppingCart size={22} color="#000" strokeWidth={2.5} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>

          {/* HAMBURGER */}
          <div className="hamburger" role="button" tabIndex={0} onClick={() => { setMenuOpen(!menuOpen); closeMobileSearch(); }}>
            {menuOpen ? "✕" : "☰"}
          </div>
        </div>
      </nav>

      {/* ═══════════════ MOBILE SEARCH BAR (slides below navbar) ═══════════════ */}
      <div className={`mobile-search-bar ${showMobileSearch ? "visible" : ""}`} ref={mobileSearchRef}>
        <div className="mobile-search-inner">
          <Search size={20} color="#000" strokeWidth={2} />
          <input
            ref={mobileInputRef}
            type="text"
            placeholder="Search products..."
            value={mobileQuery}
            onChange={handleMobileQueryChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && mobileSuggestions.length > 0) handleMobileSuggestionClick(mobileSuggestions[0]._id);
            }}
          />
          {mobileQuery ? (
            <X size={20} color="#000" style={{ cursor: "pointer", flexShrink: 0 }}
              onClick={() => { setMobileQuery(""); setMobileSuggestions([]); mobileInputRef.current?.focus(); }} />
          ) : (
            <X size={20} color="#000" style={{ cursor: "pointer", flexShrink: 0, opacity: 0.5 }}
              onClick={closeMobileSearch} />
          )}
        </div>

        {/* MOBILE SUGGESTIONS */}
        {(mobileSearchLoading || mobileSuggestions.length > 0) && (
          <div className="mobile-sugg-list">
            {mobileSearchLoading ? (
              <div className="sugg-msg">Searching...</div>
            ) : (
              mobileSuggestions.map((p) => (
                <div key={p._id} className="sugg-item" onClick={() => handleMobileSuggestionClick(p._id)}>
                  <img className="sugg-img" src={p.images?.[0]?.url || "/images/Product1.png"} alt={p.name} />
                  <div className="sugg-info">
                    <div className="sugg-name">{p.name}</div>
                    <div className="sugg-price">₹{p.price}</div>
                    <div className={`sugg-stock ${p.countInStock > 0 ? "in" : "out"}`}>
                      {p.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>
                  <span className="sugg-arrow">→</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ═══════════════ MOBILE MENU (hamburger) ═══════════════ */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" className={`mobile-tab ${isActive('/') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
          <Home size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Home</span>
        </Link>
        <Link to="/product" className={`mobile-tab ${isActive('/product') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
          <Package size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Products</span>
        </Link>
        <Link to="/about" className={`mobile-tab ${isActive('/about') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
          <Info size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">About Us</span>
        </Link>
        <Link to="/blog" className={`mobile-tab ${isActive('/blog') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
          <BookOpen size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Blog</span>
        </Link>
        <Link
          to="/wishlist"
          className={`mobile-tab ${isActive('/wishlist') ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); setMenuOpen(false); if (user) navigate("/wishlist"); else setShowLoginModal(true); }}
        >
          <Heart size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Wishlist</span>
        </Link>
        <Link to="/distributor" className={`mobile-tab ${isActive('/distributor') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
          <Building2 size={22} color="#000" strokeWidth={2} /><span className="mobile-tab-label">Distributor</span>
        </Link>
      </div>

      {user && <SideCart />}

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div style={modalStyles.overlay} onClick={() => setShowLoginModal(false)}>
          <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: "1rem", color: "#ffd400", fontSize: "26px", fontWeight: "bold" }}>Login Required</h3>
            <p style={{ marginBottom: "1.5rem", color: "#ccc", fontSize: "15px" }}>Please login to continue with your action.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                style={modalStyles.loginBtn}
                onClick={() => { setShowLoginModal(false); navigate("/login"); }}
                onMouseEnter={(e) => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 6px 20px rgba(255,212,0,0.4)"; }}
                onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none"; }}
              >Login</button>
              <button
                style={modalStyles.cancelBtn}
                onClick={() => setShowLoginModal(false)}
                onMouseEnter={(e) => { e.target.style.background = "rgba(255,212,0,0.15)"; }}
                onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
              >Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}