import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      {/* ================= INTERNAL CSS ================= */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 92px;
          background-color: #3a3a3a;
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
          font-weight: 400;
          letter-spacing: -0.04em;
          color: #000;
          text-decoration: none;
           text-shadow:2px 2px 0 #ffee00,
    -2px -2px 0 #ffee00,
     2px -2px 0 #ffee00,
    -2px  2px 0 #ffee00,
     2px  2px 0 #ffee00,
    -3px  0px 0 #ffee00,
     3px  0px 0 #ffee00,
     0px -3px 0 #ffee00,
     0px  3px 0 #ffee00;
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
          font-weight: 400;
          color: #000;
          text-decoration: none;
        }

        .nav-links a:hover {
          opacity: 0.7;
        }

        /* RIGHT ICONS */
        .nav-icons {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .nav-icons img {
          width: 21px;
          height: 21px;
          cursor: pointer;
        }

        /* PAGE OFFSET FIX */
        .page-wrapper {
          padding-top: 92px;
        }
      `}</style>

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        {/* LOGO */}
        <Link to="/" className="nav-logo">
          MPACT
        </Link>

        {/* CENTER MENU */}
            {/* <div className="nav-links">
            <Link to="/">HOME</Link>
            <Link to="/products">PRODUCTS</Link>
            <Link to="/about">ABOUT US</Link>
            <Link to="/blog">BLOG</Link>
            <Link to="/blog">demo</Link>

            </div> */}

        {/* RIGHT ICONS */}
        <div className="nav-icons">
          <img src="/icons/search.png" alt="Search" />
          <img src="/icons/avatar.png" alt="User" />
          <img src="/icons/bag.png" alt="Cart" />
        </div>
      </nav>
    </>
  );
}
