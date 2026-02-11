import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SideCart from "./SideCart"; // adjust path if needed
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, User } from "lucide-react";
import toast from "react-hot-toast";



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { cartCount, setOpenSideCart } = useCart();

  // Close on Escape only (don't lock body scroll for a compact dropdown menu)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);


  const handleProfileClick = () => {
    if (user) {
      // logged in → go to profile
      navigate("/profile");
    } else {
      // not logged in → open modal
      setShowLoginModal(true);
    }
  };



  const modalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
      backdropFilter: "blur(5px)",
    },
    modal: {
      backgroundColor: "#1a1a1a",
      padding: "2.5rem",
      borderRadius: "12px",
      border: "2px solid #ffd400",
      width: "320px",
      textAlign: "center",
      color: "white",
      boxShadow: "0 10px 40px rgba(255, 212, 0, 0.2)",
    },
    loginBtn: {
      backgroundColor: "#ffd400",
      border: "none",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "#000",
      transition: "all 0.3s ease",
    },
    cancelBtn: {
      backgroundColor: "transparent",
      border: "2px solid #ffd400",
      color: "#ffd400",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  };


  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');

        :root {
          --navbar-height: 92px;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none;
        }

        body {
          background-color: rgba(24, 23, 23, 1);
          color: #ffffff;
          font-family: "Segoe UI", Arial, sans-serif;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--navbar-height);
          background: linear-gradient(180deg, #000000 0%, #0a0a0a 100%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60px;
          z-index: 1100;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          border-bottom: 1px solid rgba(255, 212, 0, 0.15);
          animation: fadeInDown 0.6s ease;
        }

        /* LOGO */
        .nav-logo {
          font-family: 'Jersey 25', sans-serif;
          font-size: 48px;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #ffd400 0%, #ffed4e 50%, #ffd400 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
          transition: all 0.4s ease;
          filter: drop-shadow(0 0 8px rgba(255, 212, 0, 0.3));
          position: relative;
        }

        .nav-logo:hover {
          filter: drop-shadow(0 0 15px rgba(255, 212, 0, 0.6));
          transform: scale(1.05);
          letter-spacing: 0.02em;
        }

        /* CENTER LINKS */
        .nav-links {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: clamp(12px, 2vw, 20px);
        }

        .nav-links a {
          font-family: 'Jersey 25', sans-serif;
          font-size: 16px;
          color: #000000;
          text-decoration: none;
          white-space: nowrap;
          padding: 12px 24px;
          border-radius: 50px;
          background: linear-gradient(135deg, #ffd400 0%, #ffed4e 100%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 600;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(255, 212, 0, 0.2);
        }

        .nav-links a::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.6s ease;
        }

        .nav-links a:hover::before {
          left: 100%;
        }

        .nav-links a:hover {
          background: linear-gradient(135deg, #ffed4e 0%, #fff5a3 100%);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 6px 20px rgba(255, 212, 0, 0.5);
        }

        .nav-links a:active {
          transform: translateY(-1px) scale(1.02);
        }

        /* RIGHT ICONS */
        .nav-icons {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        /* ICON BUTTONS */
        .icon-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffd400 0%, #ffed4e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 2px 8px rgba(255, 212, 0, 0.2);
        }

        .icon-btn::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffd400, #ffed4e);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
          filter: blur(8px);
        }

        .icon-btn:hover::before {
          opacity: 0.6;
        }

        .icon-btn:hover {
          background: linear-gradient(135deg, #ffed4e 0%, #fff5a3 100%);
          transform: translateY(-3px) scale(1.15);
          box-shadow: 0 6px 20px rgba(255, 212, 0, 0.5);
        }

        .icon-btn:active {
          transform: translateY(-1px) scale(1.05);
        }

        /* CART BADGE */
        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
          color: white;
          border-radius: 50%;
          padding: 3px 7px;
          font-size: 11px;
          font-weight: bold;
          min-width: 20px;
          text-align: center;
          border: 2px solid #000000;
          box-shadow: 0 2px 8px rgba(255, 0, 0, 0.4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        /* HAMBURGER ICON */
        .hamburger {
          color: #000000;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffd400 0%, #ffed4e 100%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(255, 212, 0, 0.2);
        }

        .hamburger:hover {
          background: linear-gradient(135deg, #ffed4e 0%, #fff5a3 100%);
          transform: translateY(-3px) scale(1.15);
          box-shadow: 0 6px 20px rgba(255, 212, 0, 0.5);
        }

        .hamburger:active,
        .hamburger:focus {
          outline: none;
          transform: translateY(-1px) scale(1.05);
        }

        /* MOBILE MENU */
        .mobile-menu {
          position: fixed;
          top: var(--navbar-height);
          left: 0;
          width: 100%;
          height: auto;
          max-height: calc(80vh - var(--navbar-height));
          background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 24px 16px;
          transform: translateY(-120%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
          z-index: 1050;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          border-top: 1px solid rgba(255, 212, 0, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
        }

        .mobile-menu a {
          font-family: 'Jersey 25', sans-serif;
          font-size: 18px;
          color: #000000;
          text-decoration: none;
          width: auto;
          text-align: center;
          padding: 12px 32px;
          border-radius: 50px;
          background: linear-gradient(135deg, #ffd400 0%, #ffed4e 100%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(255, 212, 0, 0.2);
        }

        .mobile-menu a:hover {
          background: linear-gradient(135deg, #ffed4e 0%, #fff5a3 100%);
          transform: translateX(5px) scale(1.05);
          box-shadow: 0 4px 15px rgba(255, 212, 0, 0.5);
        }

        .mobile-menu a:active {
          transform: translateX(3px) scale(1.02);
        }

        /* PAGE OFFSET FIX */
        .page-wrapper {
          padding-top: var(--navbar-height);
        }

        .hamburger {
          display: none;
        }

        @media (max-width: 1106px) {
          .nav-links {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .nav-logo {
            font-size: 40px;
          }
        }

        @media (max-width: 600px) {
          :root {
            --navbar-height: 72px;
          }

          .navbar {
            padding: 0 16px;
          }

          .nav-logo {
            font-size: 34px;
          }

          .icon-btn {
            width: 38px;
            height: 38px;
          }

          .nav-icons {
            gap: 12px;
          }

          .mobile-menu {
            top: var(--navbar-height);
            height: auto;
            max-height: calc(80vh - var(--navbar-height));
            padding-top: 16px;
          }

          .page-wrapper {
            padding-top: var(--navbar-height);
          }
        }
      `}</style>

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        {/* LOGO */}
        <Link to="/" className="nav-logo">
          MPACT
        </Link>

        {/* DESKTOP LINKS */}
        <div className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/product">PRODUCTS</Link>
          <Link to="/about">ABOUT US</Link>
          <Link to="/blog">BLOG</Link>
          <Link
            to="/wishlist"
            onClick={(e) => {
              e.preventDefault();
              if (user) navigate("/wishlist");
              else setShowLoginModal(true);
            }}
          >
            WISHLIST
          </Link>
          <Link to="/distributor">DISTRIBUTOR</Link>
        </div>

        {/* RIGHT ICONS */}
        <div className="nav-icons">
          {/* USER/PROFILE ICON */}
          <div
            className="icon-btn"
            onClick={handleProfileClick}
            role="button"
            tabIndex={0}
            aria-label="User Profile"
          >
            <User size={22} color="#000000" strokeWidth={2.5} />
          </div>

          {/* CART ICON */}
          <div
            className="icon-btn"
            style={{ position: "relative" }}
            onClick={() => {
              if (!user) {
                setShowLoginModal(true);
                return;
              }

              if (cartCount === 0) {
                toast.error("Your cart is empty");
                return;
              }

              setOpenSideCart(true);
            }}
            role="button"
            tabIndex={0}
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={22} color="#000000" strokeWidth={2.5} />

            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </div>

          {/* HAMBURGER */}
          <div
            className="hamburger"
            role="button"
            tabIndex={0}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setMenuOpen(!menuOpen);
            }}
          >
            ☰
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-hidden={!menuOpen}
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
      >
        <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
        <Link to="/product" onClick={() => setMenuOpen(false)}>PRODUCTS</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT US</Link>
        <Link to="/blog" onClick={() => setMenuOpen(false)}>BLOG</Link>
        <Link 
          to="/wishlist" 
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            if (user) navigate("/wishlist");
            else setShowLoginModal(true);
          }}
        >
          WISHLIST
        </Link>
        <Link to="/distributor" onClick={() => setMenuOpen(false)}>DISTRIBUTOR</Link>
      </div>

      {/* ================= SIDE CART ================= */}
      {user && <SideCart />}

      {/* ================= LOGIN REQUIRED MODAL ================= */}
      {showLoginModal && (
        <div style={modalStyles.overlay} onClick={() => setShowLoginModal(false)}>
          <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: "1rem", color: "#ffd400", fontSize: "24px" }}>
              Login Required
            </h3>
            <p style={{ marginBottom: "1.5rem", color: "#ccc" }}>
              Please login to continue.
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                style={modalStyles.loginBtn}
                onClick={() => {
                  setShowLoginModal(false);
                  navigate("/login");
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.boxShadow = "0 5px 20px rgba(255, 212, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Login
              </button>

              <button
                style={modalStyles.cancelBtn}
                onClick={() => setShowLoginModal(false)}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 212, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}