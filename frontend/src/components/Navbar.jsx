import { Link } from "react-router-dom";
import { useState } from "react";
import SideCart from "./SideCart"; // adjust path if needed
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

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
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
    },
    modal: {
      backgroundColor: "#262626",
      padding: "2rem",
      borderRadius: "8px",
      border: "2px solid #facc15",
      width: "300px",
      textAlign: "center",
      color: "white",
    },
    loginBtn: {
      backgroundColor: "#facc15",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    cancelBtn: {
      backgroundColor: "transparent",
      border: "1px solid #facc15",
      color: "#facc15",
      padding: "0.5rem 1rem",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };


  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');

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

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 92px;
          background-color: #ffd400;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60px;
          z-index: 1000;
        }

        /* LOGO */
        .nav-logo {
          font-family: 'Jersey 25', sans-serif;
          font-size: 48px;
          letter-spacing: -0.04em;
          color: #000;
          text-decoration: none;
        }

        /* CENTER LINKS */
        .nav-links {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 48px;
        }

        .nav-links a {
          font-family: 'Jersey 25', sans-serif;
          font-size: 20px;
          color: #000;
          text-decoration: none;
        }

        .nav-links a:hover {
          opacity: 0.7;
        }

        /* RIGHT ICONS */
       .nav-icons {
          display: flex;
          align-items: center;          
          gap: 24px;
        }

        /* ALL ICONS (image-based) */
        .nav-icons img {
          width: 21px;
          height: 21px;
          display: block;               
          cursor: pointer;
        }

        /* HAMBURGER ICON */
        .hamburger {
          color: #000;
          font-size: 22px;
          line-height: 1;               
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* MOBILE MENU */
        .mobile-menu {
          position: fixed;
          top: 92px;
          left: 0;
          width: 100%;
          background: #ffd400;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          padding: 40px 0;
          transform: translateY(-120%);
          transition: transform 0.3s ease;
          z-index: 999;
        }

        .mobile-menu.open {
          transform: translateY(0);
        }

        .mobile-menu a {
          font-family: 'Jersey 25', sans-serif;
          font-size: 26px;
          color: #000;
          text-decoration: none;
        }

        .page-wrapper {
          padding-top: 92px;
        }

        .hamburger {
          display: none;
        }
          
        @media (max-width: 900px) {
          .nav-links {
            display: none;
          }

          .hamburger {
            display: block;
          }
        }

        @media (max-width: 600px) {
          .navbar {
            height: 72px;
            padding: 0 20px;
          }

          .nav-logo {
            font-size: 34px;
          }

          .mobile-menu {
            top: 72px;
          }

          .page-wrapper {
            padding-top: 72px;
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
          <Link to="/products">PRODUCTS</Link>
          <Link to="/about">ABOUT US</Link>
          <Link to="/blog">BLOG</Link>
          {/* <Link to="/wishlist" onClick={() => {
            if (user) navigate("/wishlist");
            else setShowLoginModal(true);
          }}>WISHLIST</Link> */}
          <Link
            to="/wishlist"
            onClick={(e) => {
              e.preventDefault();   // 🔥 STOP AUTO NAVIGATION

              if (user) navigate("/wishlist");
              else setShowLoginModal(true);
            }}
          >
            WISHLIST
          </Link>

          {/* <Link to="/profile" onClick={handleProfileClick}>PROFILE</Link> */}
          <Link
            to="/profile"
            onClick={(e) => {
              e.preventDefault();        // 🔥 STOP AUTO NAVIGATION
              handleProfileClick();     // 🔥 NOW RUN OUR LOGIC
            }}
          >
            PROFILE
          </Link>

        </div>

        {/* RIGHT ICONS */}
        <div className="nav-icons">
          <Link to="/seeMore">
            <img src="/icons/search.png" alt="Search" />
          </Link>


          <Link to="/signup">
            <img src="/icons/avatar.png" alt="User" />
          </Link>

          {/* CART ICON → SIDE CART */}
          <img
            src="/icons/bag.png"
            alt="Cart"
            onClick={() => setCartOpen(true)}
          />

          {/* HAMBURGER */}
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>PRODUCTS</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT US</Link>
        <Link to="/blog" onClick={() => setMenuOpen(false)}>BLOG</Link>
      </div>

      {/* ================= SIDE CART ================= */}
      <SideCart open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* ================= LOGIN REQUIRED MODAL ================= */}
      {showLoginModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3 style={{ marginBottom: "1rem", color: "#facc15" }}>
              Login Required
            </h3>
            <p style={{ marginBottom: "1.5rem" }}>
              Please login to view your profile.
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                style={modalStyles.loginBtn}
                onClick={() => {
                  setShowLoginModal(false);
                  navigate("/login");
                }}
              >
                Login
              </button>

              <button
                style={modalStyles.cancelBtn}
                onClick={() => setShowLoginModal(false)}
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
