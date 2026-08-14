import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import SideCart from "./SideCart";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, User, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import MpactLogo from "../assets/mpact-logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [promoIndex, setPromoIndex] = useState(0);
  const [promoMessages, setPromoMessages] = useState([]);
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

  // Mobile search bar
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileQuery, setMobileQuery] = useState("");
  const [mobileSuggestions, setMobileSuggestions] = useState([]);
  const [mobileSearchLoading, setMobileSearchLoading] = useState(false);

  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const mobileInputRef = useRef(null);
  const debounceRef = useRef(null);
  const mobileDebounceRef = useRef(null);

  // const { cartCount, setOpenSideCart } = useCart();
  const { cartCount, setOpenSideCart, refreshCart } = useCart();

  // ── LOGO MAGNETIC STATE ──────────────────────────────────────
  const [logoDrag, setLogoDrag] = useState({ x: 0, y: 0 });
  const [logoHovered, setLogoHovered] = useState(false);
  const logoRef = useRef(null);

  const MAX_OFFSET = 24;
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  // Determine if promo bar should be shown
  const hasPromo = promoMessages.length > 0;

  // ── SET CSS CUSTOM PROPERTY FOR HEADER HEIGHT ──────────────
  // This ensures any page content can use the correct header offset
  useEffect(() => {
    const root = document.documentElement;
    const navbarHeight = getComputedStyle(root).getPropertyValue('--navbar-height').trim() || '92px';
    const promoHeight = getComputedStyle(root).getPropertyValue('--promo-height').trim() || '36px';
    const safeTop = getComputedStyle(root).getPropertyValue('--safe-top').trim() || '0px';
    
    // Parse values to numbers (removing 'px')
    const parsePx = (val) => parseInt(val) || 0;
    const navbarPx = parsePx(navbarHeight);
    const promoPx = parsePx(promoHeight);
    const safePx = parsePx(safeTop);
    
    // Calculate total header height
    const totalHeight = hasPromo ? navbarPx + promoPx + safePx : navbarPx + safePx;
    
    // Set the CSS custom property for the header height
    root.style.setProperty('--header-total-height', totalHeight + 'px');
  }, [hasPromo]);

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

  // ── LOGO MAGNETIC: follows mouse position relative to logo center ──
  const logoHoveredRef = useRef(false);

  useEffect(() => {
    logoHoveredRef.current = logoHovered;
  }, [logoHovered]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!logoHoveredRef.current || !logoRef.current) return;
      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      setLogoDrag({
        x: clamp(dx * 0.4, -MAX_OFFSET, MAX_OFFSET),
        y: clamp(dy * 0.4, -MAX_OFFSET, MAX_OFFSET),
      });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []); // runs once — uses ref to check hover state

  // AUTO-FOCUS mobile input when search opens
  useEffect(() => {
    if (showMobileSearch && mobileInputRef.current) {
      setTimeout(() => mobileInputRef.current?.focus(), 100);
    }
  }, [showMobileSearch]);

  // FETCH PROMO MESSAGES FROM API
  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const { data } = await api.get("/api/topoffers");
        if (data && data.length > 0) {
          setPromoMessages(data.map((o) => o.text));
        }
      } catch {
        // Silently fail
      }
    };
    fetchPromos();
  }, []);

  // PROMO CAROUSEL (auto-advance every 6s)
  useEffect(() => {
    if (promoMessages.length === 0) return;
    const id = setInterval(() => {
      setPromoIndex((i) => (i + 1) % promoMessages.length);
    }, 6000);
    return () => clearInterval(id);
  }, [promoMessages]);

  const nextPromo = () => setPromoIndex((i) => (i + 1) % promoMessages.length);
  const prevPromo = () => setPromoIndex((i) => (i - 1 + promoMessages.length) % promoMessages.length);

  // DESKTOP SEARCH
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

  // MOBILE SEARCH
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
    const isMobile = window.innerWidth <= 1106;
    if (isMobile) {
      if (showMobileSearch) {
        closeMobileSearch();
      } else {
        setMenuOpen(false);
        setShowMobileSearch(true);
      }
    } else {
      setShowSearch((prev) => { if (prev) closeDesktopSearch(); return !prev; });
    }
  };

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
      padding: "16px",
    },
    modal: {
      backgroundColor: "#1a1a1a", padding: "2.5rem", borderRadius: "20px",
      border: "2px solid #ffd400", width: "340px", maxWidth: "100%", textAlign: "center",
      color: "white", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)", boxSizing: "border-box",
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
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');

        :root {
          --navbar-height: 92px;
          --promo-height: 36px;
          --safe-top: env(safe-area-inset-top, 0px);
          --safe-bottom: env(safe-area-inset-bottom, 0px);
          --safe-left: env(safe-area-inset-left, 0px);
          --safe-right: env(safe-area-inset-right, 0px);
          --header-total-height: calc(var(--navbar-height) + var(--safe-top));
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
        }

        html, body { scrollbar-width: none; -ms-overflow-style: none; overflow-x: hidden; max-width: 100%; }
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
        .promo-bar {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: calc(var(--promo-height) + var(--safe-top));
          padding-top: var(--safe-top);
          background: #111111;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1200;
          border-bottom: 1px solid rgba(255, 212, 0, 0.2);
          box-sizing: border-box;
        }
        .promo-inner {
          width: 100%;
          max-width: 1100px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 12px;
          animation: promoFade 0.25s ease;
          box-sizing: border-box;
        }
        .promo-text {
          color: #FFD700;
          text-decoration: none;
          font-weight: 700;
          letter-spacing: 1.5px;
          font-size: 14px;
          line-height: 1.2;
          fontFamily: "'Poppins', sans-serif";
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        .promo-arrow {
          background: transparent;
          border: none;
          color: #ffd400;
          height: 100%;
          width: 44px;
          min-width: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0.85;
          flex-shrink: 0;
        }
        .promo-arrow:hover { opacity: 1; }

        /* ── NAVBAR ─────────────────────────────────── */
        .navbar {
          position: fixed;
          top: calc(var(--promo-height) + var(--safe-top));
          left: 0;
          width: 100%;
          height: var(--navbar-height);
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60px;
          padding-left: calc(60px + var(--safe-left));
          padding-right: calc(60px + var(--safe-right));
          z-index: 1100;
          overflow: visible;
          box-shadow: 0 4px 24px rgba(255, 212, 0, 0.12);
          border-bottom: 1px solid rgba(255, 212, 0, 0.15);
          box-sizing: border-box;
        }

        /* When promo bar is hidden, navbar sits at top */
        .navbar.no-promo {
          top: var(--safe-top);
        }

        /* ── LOGO IMAGE ─────────────────────────────── */
        .nav-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nav-logo img {
          height: 120px;
          width: auto;
          object-fit: contain;
          transition: filter 0.3s ease;
          filter: drop-shadow(0 0 8px rgba(255, 212, 0, 0.3));
        }

        .nav-logo:hover img {
          filter: drop-shadow(0 0 16px rgba(255, 212, 0, 0.6));
        }

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
          max-width: 55vw;
          flex-wrap: nowrap;
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

        .nav-tab-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #ffd400;
          transition: all 0.3s ease;
          white-space: nowrap;
          letter-spacing: 1.5px;
        }

        .nav-tab.active .nav-tab-label { font-weight: 700; color: #ffffff; }

        .nav-tab::after {
          content: '';
          position: absolute;
          bottom: -8px; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 4px;
          background: #ffd400;
          border-radius: 3px;
          transition: width 0.3s ease;
          height: 5px;
        }

        .nav-tab.active::after { width: 50%; }

        .nav-tab:not(.active):hover .nav-tab-label {
          font-weight: 0;
          transform: scale(1.08);
          color: #ffffff;
        }

        /* ── NAV ICONS ──────────────────────────────── */
        .nav-icons {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1200;
          flex-shrink: 0;
        }

        .nav-icon-btn {
          width: 46px; height: 46px;
          border-radius: 50%;
          background: rgba(255, 212, 0, 0.08);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          flex-shrink: 0;
          border: 1px solid rgba(255, 212, 0, 0.15);
        }

        .nav-icon-btn:hover {
          background: rgba(255, 212, 0, 0.18);
          border-color: rgba(255, 212, 0, 0.4);
          transform: translateY(-3px) scale(1.1);
        }
        .nav-icon-btn.active-search {
          background: rgba(255, 212, 0, 0.18);
          border-color: #ffd400;
        }

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
          max-width: 30vw;
          padding: 9px 14px;
          border-radius: 24px;
          border: 2px solid #ffd400;
          background: rgba(255, 212, 0, 0.06);
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 13px;
          color: #ffd400;
          outline: none;
          box-shadow: none;
          box-sizing: border-box;
        }

        .search-input::placeholder { color: rgba(255, 212, 0, 0.45); }
        .search-input:focus { border-color: #ffd400; outline: none; box-shadow: 0 0 0 3px rgba(255,212,0,0.1); }

        /* ── DESKTOP SUGGESTIONS DROPDOWN ───────────── */
        .search-suggestions {
          position: absolute;
          top: calc(100% + 52px);
          right: 0;
          width: min(300px, 90vw);
          max-width: calc(100vw - 32px - var(--safe-left) - var(--safe-right));
          background: #1a1a1a;
          border: 2px solid #ffd400;
          border-radius: 16px;
          overflow-y: auto;
          max-height: min(360px, 60vh);
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
          display: none;
          position: fixed;
          top: calc(var(--navbar-height) + var(--safe-top));
          left: 0;
          width: 100%;
          background: #111111;
          padding: 12px 16px;
          padding-left: calc(16px + var(--safe-left));
          padding-right: calc(16px + var(--safe-right));
          z-index: 1090;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          flex-direction: column;
          gap: 8px;
          animation: mobileSearchSlide 0.25s ease;
          border-bottom: 1px solid rgba(255, 212, 0, 0.2);
          box-sizing: border-box;
        }

        /* When promo bar exists, mobile search sits below navbar + promo */
        .mobile-search-bar.has-promo {
          top: calc(var(--navbar-height) + var(--promo-height) + var(--safe-top));
        }

        .mobile-search-bar.visible { display: flex; }

        .mobile-search-inner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 212, 0, 0.06);
          border-radius: 14px;
          padding: 10px 16px;
          border: 2px solid #ffd400;
          box-sizing: border-box;
          width: 100%;
        }

        .mobile-search-inner input {
          flex: 1;
          min-width: 0;
          border: none;
          background: transparent;
          font-size: 16px;
          color: #ffd400;
          outline: none;
          font-family: 'Segoe UI', Arial, sans-serif;
        }

        .mobile-search-inner input::placeholder { color: rgba(255, 212, 0, 0.45); }

        /* ── MOBILE SUGGESTIONS ─────────────────────── */
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
          width: 100%;
          box-sizing: border-box;
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
          border: 2px solid #000;
          box-shadow: 0 2px 8px rgba(255,0,0,0.4);
        }

        /* ── HAMBURGER ──────────────────────────────── */
        .hamburger {
          display: none;
          color: #ffd400;
          font-size: 26px; line-height: 1;
          cursor: pointer; padding: 10px; border-radius: 12px;
          background: rgba(255, 212, 0, 0.08);
          border: 1px solid rgba(255, 212, 0, 0.2);
          transition: all 0.3s ease;
        }

        .hamburger:hover {
          background: rgba(255, 212, 0, 0.18);
          border-color: rgba(255, 212, 0, 0.5);
        }

        /* ── PAGE WRAPPER ───────────────────────────── */
        /* This provides a default offset for the page content */
        .page-wrapper {
          padding-top: var(--header-total-height);
        }

        /* ── RESPONSIVE ─────────────────────────────── */
        @media (max-width: 1106px) {
          .nav-tabbar { display: none; }
          .hamburger  { display: block; }
          .search-input-container,
          .search-suggestions { display: none !important; }
        }

        /* Tablets (portrait) */
        @media (max-width: 900px) {
          .navbar { padding: 0 32px; padding-left: calc(32px + var(--safe-left)); padding-right: calc(32px + var(--safe-right)); }
          .nav-logo img { height: 110px; }
        }

        @media (max-width: 768px) {
          .navbar { padding: 0 24px; padding-left: calc(24px + var(--safe-left)); padding-right: calc(24px + var(--safe-right)); }
          .nav-logo img { height: 130px; }
          .nav-icon-btn { width: 42px; height: 42px; }
          .nav-icons { gap: 8px; }
        }

        /* Large phones */
        @media (max-width: 600px) {
          :root { --navbar-height: 72px; --promo-height: 32px; }
          .navbar { padding: 0 16px; padding-left: calc(16px + var(--safe-left)); padding-right: calc(16px + var(--safe-right)); }
          .nav-logo img { height: 100px; }
          .nav-icon-btn { width: 38px; height: 38px; }
          .nav-icon-btn svg { width: 20px; height: 20px; }
          .nav-icons { gap: 6px; }
          .hamburger { font-size: 22px; padding: 8px; }
          .promo-text { font-size: 12px; letter-spacing: 1px; max-width: 65vw; }
          .promo-arrow { width: 32px; }
        }

        /* Standard phones (e.g. iPhone 12/13/14, Pixel) */
        @media (max-width: 480px) {
          :root { --navbar-height: 68px; --promo-height: 30px; }
          .navbar { padding: 0 14px; padding-left: calc(14px + var(--safe-left)); padding-right: calc(14px + var(--safe-right)); }
          .nav-logo img { height: 88px; }
          .nav-icon-btn { width: 36px; height: 36px; }
          .nav-icons { gap: 5px; }
          .mobile-search-bar { padding: 10px 14px; }
          .mobile-search-inner { padding: 8px 12px; }
          .mobile-search-inner input { font-size: 15px; }
          .mobile-tab { width: 100%; padding: 12px 18px; }
        }

        /* Small phones (e.g. iPhone SE, older Androids) */
        @media (max-width: 380px) {
          .navbar { padding: 0 12px; padding-left: calc(12px + var(--safe-left)); padding-right: calc(12px + var(--safe-right)); }
          .nav-logo img { height: 78px; }
          .nav-icon-btn { width: 34px; height: 34px; }
          .nav-icons { gap: 4px; }
          .promo-text { font-size: 11px; max-width: 55vw; }
          .promo-arrow { width: 26px; min-width: 26px; }
        }

        /* Very narrow / foldables closed (e.g. Galaxy Fold cover screen) */
        @media (max-width: 320px) {
          .navbar { padding: 0 8px; padding-left: calc(8px + var(--safe-left)); padding-right: calc(8px + var(--safe-right)); }
          .nav-logo img { height: 64px; }
          .nav-icon-btn { width: 30px; height: 30px; }
          .nav-icon-btn svg { width: 16px; height: 16px; }
          .nav-icons { gap: 3px; }
          .hamburger { font-size: 18px; padding: 6px; }
          .promo-text { font-size: 10px; max-width: 48vw; }
          .promo-arrow { width: 20px; min-width: 20px; }
        }

        /* Short viewports / landscape phones: keep menus scrollable & usable */
        @media (max-height: 480px) {
          .mobile-menu { max-height: calc(100vh - 56px); padding: 12px; gap: 4px; }
          .mobile-tab { padding: 10px 18px; }
          .mobile-sugg-list { max-height: 40vh; }
        }

        /* Ensure search dropdown never overflows small screens */
        @media (max-width: 400px) {
          .search-suggestions { right: -8px; }
        }
      `}</style>

      {/* PROMO BAR - conditionally rendered */}
      {hasPromo && (
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
      )}

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav className={`navbar ${!hasPromo ? 'no-promo' : ''}`}>

        {/* ── LOGO: grows on hover + follows mouse magnetically, springs back on leave ── */}
        <Link
          to="/"
          className="nav-logo"
          ref={logoRef}
          draggable={false}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => {
            setLogoHovered(false);
            setTimeout(() => setLogoDrag({ x: 0, y: 0 }), 10);
          }}
          style={{
            transform: `translate(
              ${mousePos.x * 6 + logoDrag.x}px,
              ${mousePos.y * 3 + logoDrag.y}px
            ) scale(${logoHovered ? 1.13 : 1})`,
            transition: logoHovered
              ? "transform 0.12s ease-out"
              : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <img src={MpactLogo} alt="MPACT" draggable={false} />
        </Link>

        {/* TABS */}
        <div
          className="nav-tabbar"
          style={{
            transform: `translateX(-50%) translate(${mousePos.x * 3}px, ${mousePos.y * 2}px)`,
            transition: "transform 0.2s ease-out"
          }}
        >
          <Link to="/" className={`nav-tab ${isActive('/') ? 'active' : ''}`}>
            <span className="nav-tab-label">HOME</span>
          </Link>
          <Link to="/product" className={`nav-tab ${isActive('/product') ? 'active' : ''}`}>
            <span className="nav-tab-label">PRODUCTS</span>
          </Link>
          <Link to="/about" className={`nav-tab ${isActive('/about') ? 'active' : ''}`}>
            <span className="nav-tab-label">ABOUT</span>
          </Link>
          <Link to="/blog" className={`nav-tab ${isActive('/blog') ? 'active' : ''}`}>
            <span className="nav-tab-label">BLOG</span>
          </Link>
          <Link
            to="/wishlist"
            className={`nav-tab ${isActive('/wishlist') ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); if (user) navigate("/wishlist"); else setShowLoginModal(true); }}
          >
            <span className="nav-tab-label">WISHLIST</span>
          </Link>
          <Link to="/distributor" className={`nav-tab ${isActive('/distributor') ? 'active' : ''}`}>
            <span className="nav-tab-label">DISTRIBUTOR</span>
          </Link>
        </div>

        {/* ICONS */}
        <div
          className="nav-icons"
          style={{
            transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 3}px)`,
            transition: "transform 0.15s ease-out"
          }}
        >
          {/* DESKTOP SEARCH */}
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

            {/* SEARCH ICON */}
            <div
              className={`nav-icon-btn ${showMobileSearch ? "active-search" : ""}`}
              onClick={handleSearchIconClick}
              role="button" tabIndex={0} title="Search"
            >
              <Search size={22} color="#ffd400" strokeWidth={2.5} />
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
            <User size={22} color="#ffd400" strokeWidth={2.5} />
          </div>

          {/* CART */}
          <div
            className="nav-icon-btn"
            onClick={() => {
              setOpenSideCart(true);
              refreshCart();
            }}
            role="button" tabIndex={0}
          >
            <ShoppingCart size={22} color="#ffd400" strokeWidth={2.5} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>

          {/* HAMBURGER */}
          <div
            className="hamburger"
            role="button" tabIndex={0}
            onClick={() => { setMenuOpen(!menuOpen); closeMobileSearch(); }}
          >
            {menuOpen ? "✕" : "☰"}
          </div>
        </div>
      </nav>

      {/* ═══════════════ MOBILE SEARCH BAR ═══════════════ */}
      <div className={`mobile-search-bar ${showMobileSearch ? "visible" : ""} ${hasPromo ? 'has-promo' : ''}`} ref={mobileSearchRef}>
        <div className="mobile-search-inner">
          <Search size={20} color="#ffd400" strokeWidth={2} />
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
            <X size={20} color="#ffd400" style={{ cursor: "pointer", flexShrink: 0 }}
              onClick={() => { setMobileQuery(""); setMobileSuggestions([]); mobileInputRef.current?.focus(); }} />
          ) : (
            <X size={20} color="#ffd400" style={{ cursor: "pointer", flexShrink: 0, opacity: 0.5 }}
              onClick={closeMobileSearch} />
          )}
        </div>

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

      <SideCart />

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div style={modalStyles.overlay} onClick={() => setShowLoginModal(false)}>
          <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: "1rem", color: "#ffd400", fontSize: "26px", fontWeight: "bold" }}>Login Required</h3>
            <p style={{ marginBottom: "1.5rem", color: "#ccc", fontSize: "15px" }}>Please login to continue with your action.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
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