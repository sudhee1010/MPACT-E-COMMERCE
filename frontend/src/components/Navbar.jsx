import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SideCart from "./SideCart"; // adjust path if needed
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [cartOpen, setCartOpen] = useState(false);
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

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--navbar-height);
          background-color: #ffd400;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60px;
          z-index: 1100;
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
          gap: clamp(20px, 3vw, 48px);
        }

        .nav-links a {
          font-family: 'Jersey 25', sans-serif;
          font-size: 20px;
          color: #000;
          text-decoration: none;
          white-space: nowrap;
        }

        .nav-links a:hover {
          opacity: 0.7;
        }

        /* RIGHT ICONS */
        .nav-icons {
          display: flex;
          align-items: center;
          gap: 18px;
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
          padding: 8px;
          border-radius: 6px;
        }

        .hamburger:active,
        .hamburger:focus {
          outline: none;
          opacity: 0.85;
        }

        /* MOBILE MENU */
        .mobile-menu {
          position: fixed;
          top: var(--navbar-height);
          left: 0;
          width: 100%;
          height: auto; /* fit-content behavior */
          max-height: calc(80vh - var(--navbar-height));
          background: #ffd400;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 12px 16px;
          transform: translateY(-120%);
          transition: transform 0.28s ease, opacity 0.18s ease;
          z-index: 1050;
          overflow-y: auto; /* only scroll inside when needed */
          -webkit-overflow-scrolling: touch;
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
        }

        .mobile-menu a {
          font-family: 'Jersey 25', sans-serif;
          font-size: 20px;
          color: #000;
          text-decoration: none;
          width: 100%;
          text-align: center;
          padding: 10px 8px;
          border-radius: 6px;
        }

        .mobile-menu a:active {
          opacity: 0.8;
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
            display: block;
          }

          /* slightly reduce logo on medium screens */
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

          .nav-icons img {
            width: 18px;
            height: 18px;
          }

          .mobile-menu {
            top: var(--navbar-height);
            height: auto;
            max-height: calc(80vh - var(--navbar-height));
            padding-top: 12px;
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
          {/* <Link
            to="/profile"
            onClick={(e) => {
              e.preventDefault();        // 🔥 STOP AUTO NAVIGATION
              handleProfileClick();     // 🔥 NOW RUN OUR LOGIC
            }}
          >
            PROFILE
          </Link> */}
          <Link to="/distributor">DISTRIBUTOR</Link>


        </div>

        {/* RIGHT ICONS */}
        <div className="nav-icons">
          {/* <Link to="/seeMore">
            <img src="/icons/search.png" alt="Search" />
          </Link> */}
          <Link
          to="/profile"
          onClick={(e) => {
            e.preventDefault();        // 🔥 STOP AUTO NAVIGATION
            handleProfileClick();     // 🔥 NOW RUN OUR LOGIC
          }}
        >
            <img src="/icons/avatar.png" alt="User" />
          </Link>


          {/* <Link to="/signup">
            <img src="/icons/avatar.png" alt="User" />
          </Link> */}

          {/* CART ICON → SIDE CART */}
          {/* <img
            src="/icons/bag.png"
            alt="Cart"
            onClick={() => setCartOpen(true)}
          /> */}

          {/* <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => {
              if (user) setOpenSideCart(true);
              else setShowLoginModal(true);
            }}
          > */}

          <div
            style={{ position: "relative", cursor: "pointer" }}
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
          >


            <ShoppingCart
              size={22}
              color="black"     // 🔥 GUARANTEED BLACK
              strokeWidth={2}
            />

            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-10px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 7px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  minWidth: "20px",
                  textAlign: "center"
                }}
              >
                {cartCount}
              </span>
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
        <Link to="/wishlist" onClick={() => setMenuOpen(false)}>WISHLIST</Link>
        <Link to="/distributor" onClick={() => setMenuOpen(false)}>DISTRIBUTOR</Link>

      </div>

      {/* ================= SIDE CART ================= */}
      {/* <SideCart open={cartOpen} onClose={() => setCartOpen(false)} /> */}
      {/* <SideCart /> */}
      {user && <SideCart />}


      {/* ================= LOGIN REQUIRED MODAL ================= */}
      {showLoginModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3 style={{ marginBottom: "1rem", color: "#facc15" }}>
              Login Required
            </h3>
            <p style={{ marginBottom: "1.5rem" }}>
              Please login to continue.
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