import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SideCart from "./SideCart";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, User, Home, Package, Info, BookOpen, Heart, Building2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
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
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

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

        :root { --navbar-height: 92px; }

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

        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        @keyframes rotateGradient {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* NAVBAR — single position: fixed, NO position:relative override */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--navbar-height);
          background: #ffd400;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60px;
          z-index: 1100;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(255,212,0,0.3), 0 0 60px rgba(255,212,0,0.1);
          animation: slideDown 0.6s ease;
        }

        .navbar::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: rotateGradient 15s linear infinite;
          pointer-events: none;
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
        .nav-tab:active .nav-tab-icon { transform: translateY(-4px) scale(1.1); }

        .nav-icons {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .nav-icon-btn {
          width: 46px; height: 46px;
          border-radius: 50%;
          background: rgba(0,0,0,0.08);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          position: relative;
        }

        .nav-icon-btn:hover { background: rgba(0,0,0,0.15); transform: translateY(-3px) scale(1.1); }

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

        .hamburger {
          display: none;
          color: #000; font-size: 26px; line-height: 1;
          cursor: pointer; padding: 10px; border-radius: 12px;
          background: rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }

        .hamburger:hover { background: rgba(0,0,0,0.15); }

        .mobile-menu {
          position: fixed;
          top: var(--navbar-height); left: 0;
          width: 100%;
          background: #ffd400;
          display: flex; flex-direction: column; align-items: center;
          gap: 8px; padding: 20px;
          transform: translateY(-120%);
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
          z-index: 1050;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .mobile-menu.open { transform: translateY(0); }

        .mobile-tab {
          display: flex; align-items: center; gap: 16px;
          padding: 14px 24px; width: 90%;
          border-radius: 16px; cursor: pointer;
          transition: all 0.3s ease; text-decoration: none;
          background: rgba(0,0,0,0.07);
        }

        .mobile-tab.active { background: rgba(0,0,0,0.15); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .mobile-tab:hover  { transform: translateX(8px); background: rgba(0,0,0,0.12); }

        .mobile-tab-label {
          font-family: 'Jersey 25', sans-serif;
          font-size: 20px; color: #000;
        }

        .mobile-tab.active .mobile-tab-label { font-weight: 700; }

        .page-wrapper { padding-top: var(--navbar-height); }

        @media (max-width: 1106px) {
          .nav-tabbar { display: none; }
          .hamburger  { display: block; }
          .nav-logo   { font-size: 40px; }
        }

        @media (max-width: 600px) {
          :root { --navbar-height: 72px; }
          .navbar       { padding: 0 16px; }
          .nav-logo     { font-size: 34px; }
          .nav-icon-btn { width: 40px; height: 40px; }
          .nav-icons    { gap: 8px; }
        }
      `}</style>

      <nav className="navbar">
        <Link
          to="/"
          className="nav-logo"
          style={{ transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 3}px)`, transition: "transform 0.15s ease-out" }}
        >
          MPACT
        </Link>

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

        <div
          className="nav-icons"
          style={{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 3}px)`, transition: "transform 0.15s ease-out" }}
        >
          <div className="nav-icon-btn" onClick={handleProfileClick} role="button" tabIndex={0}>
            <User size={22} color="#000" strokeWidth={2.5} />
          </div>
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
          <div className="hamburger" role="button" tabIndex={0} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </div>
        </div>
      </nav>

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

      {showLoginModal && (
        <div style={modalStyles.overlay} onClick={() => setShowLoginModal(false)}>
          <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: "1rem", color: "#ffd400", fontSize: "26px", fontWeight: "bold" }}>Login Required</h3>
            <p style={{ marginBottom: "1.5rem", color: "#ccc", fontSize: "15px" }}>Please login to continue with your action.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                style={modalStyles.loginBtn}
                onClick={() => { setShowLoginModal(false); navigate("/login"); }}
                onMouseEnter={(e) => { e.target.style.transform="scale(1.05)"; e.target.style.boxShadow="0 6px 20px rgba(255,212,0,0.4)"; }}
                onMouseLeave={(e) => { e.target.style.transform="scale(1)"; e.target.style.boxShadow="none"; }}
              >Login</button>
              <button
                style={modalStyles.cancelBtn}
                onClick={() => setShowLoginModal(false)}
                onMouseEnter={(e) => { e.target.style.background="rgba(255,212,0,0.15)"; }}
                onMouseLeave={(e) => { e.target.style.background="transparent"; }}
              >Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}