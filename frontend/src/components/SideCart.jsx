import { useEffect, useState } from "react";
import { updateCartItemApi, removeCartItemApi } from "../api/cartApi";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart } from "lucide-react";

export default function SideCart() {
  const {
    cartItems,
    setCartItems,
    refreshCart,
    openSideCart,
    setOpenSideCart,
    cartMeta,
  } = useCart();

  const [navbarHeight, setNavbarHeight] = useState(80);
  const [stockErrors, setStockErrors] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // ── GUEST CART STATE ──
  const [guestCartItems, setGuestCartItems] = useState([]);

  // ── Load guest cart whenever openSideCart or user changes ──
  useEffect(() => {
    if (!user) {
      const stored = JSON.parse(localStorage.getItem("guestCart")) || [];
      setGuestCartItems(stored);
    }
  }, [user, openSideCart]);

  // ── Sync guest cart instantly when same-tab updates fire the custom event ──
  useEffect(() => {
    if (user) return;

    const handleCartUpdate = () => {
      const stored = JSON.parse(localStorage.getItem("guestCart")) || [];
      setGuestCartItems(stored);
    };

    window.addEventListener("guestCartUpdated", handleCartUpdate);
    return () => window.removeEventListener("guestCartUpdated", handleCartUpdate);
  }, [user]);

  // ── UNIFIED DISPLAY ITEMS ──
  const displayItems = user ? cartItems : guestCartItems;

  // ── GUEST CART HANDLERS ──
  const guestIncreaseQty = (productId) => {
    const item = guestCartItems.find((i) => i.productId === productId);
    if (item && item.quantity >= item.product.countInStock) return;

    const updated = guestCartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setGuestCartItems(updated);
    localStorage.setItem("guestCart", JSON.stringify(updated));
  };

  const guestDecreaseQty = (productId, currentQty) => {
    let updated;
    if (currentQty <= 1) {
      updated = guestCartItems.filter((item) => item.productId !== productId);
    } else {
      updated = guestCartItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
    setGuestCartItems(updated);
    localStorage.setItem("guestCart", JSON.stringify(updated));
    if (!updated.length) setOpenSideCart(false);
  };

  const guestRemoveItem = (productId) => {
    const updated = guestCartItems.filter(
      (item) => item.productId !== productId
    );
    setGuestCartItems(updated);
    localStorage.setItem("guestCart", JSON.stringify(updated));
    if (!updated.length) setOpenSideCart(false);
  };

  // ── Dynamically measure the full header height ──
  useEffect(() => {
    const measureNavbar = () => {
      const candidates = [
        "[class*='header-wrapper']",
        "[class*='HeaderWrapper']",
        "[class*='site-header']",
        "[class*='SiteHeader']",
        "header",
        "nav",
        ".navbar",
        "[class*='navbar']",
      ];

      let best = null;
      for (const sel of candidates) {
        const el = document.querySelector(sel);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (!best || rect.bottom > best) {
            best = rect.bottom;
          }
        }
      }

      if (best !== null && best > 0) {
        setNavbarHeight(best);
      }
    };

    measureNavbar();
    window.addEventListener("resize", measureNavbar);
    window.addEventListener("scroll", measureNavbar, { passive: true });
    return () => {
      window.removeEventListener("resize", measureNavbar);
      window.removeEventListener("scroll", measureNavbar);
    };
  }, []);

  // ── LOGGED-IN CART HANDLERS ──
  const increaseQty = async (productId, currentQty, stock) => {
    if (currentQty >= stock) {
      setStockErrors((prev) => ({
        ...prev,
        [productId]: "Max stock reached",
      }));
      return;
    }

    setStockErrors((prev) => ({ ...prev, [productId]: null }));

    try {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

      await updateCartItemApi(productId, currentQty + 1);
      refreshCart();
    } catch (err) {
      console.log("Increase qty error:", err);

      if (
        err.response?.data?.message?.includes("stock") ||
        err.response?.data?.error?.includes("stock") ||
        err.response?.data?.message?.includes("available") ||
        err.response?.data?.error?.includes("available")
      ) {
        setStockErrors((prev) => ({
          ...prev,
          [productId]: "max stock reached",
        }));
      }

      refreshCart();
    }
  };

  const handleProceed = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setOpenSideCart(false);
    navigate("/cart");
  };

  const decreaseQty = async (productId, currentQty) => {
    try {
      if (currentQty <= 1) {
        const res = await removeCartItemApi(productId);
        setCartItems(res.data.items);
        setStockErrors((prev) => {
          const updated = { ...prev };
          delete updated[productId];
          return updated;
        });
        refreshCart();
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );

      setStockErrors((prev) => ({ ...prev, [productId]: null }));

      await updateCartItemApi(productId, currentQty - 1);
      refreshCart();
    } catch (err) {
      console.error("Decrease qty error:", err.message);
      refreshCart();
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await removeCartItemApi(productId);
      setCartItems(res.data.items);

      setStockErrors((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });

      refreshCart();
    } catch (err) {
      console.error("Remove item error:", err.message);
    }
  };

  const isMaxStock = (productId, currentQty) => {
    const item = cartItems.find((item) => item.product._id === productId);
    if (!item) return false;
    if (stockErrors[productId]) return true;
    return currentQty >= item.product.countInStock;
  };

  // ── UNIFIED PRICE CALCULATIONS ──
  const totalMRP = user
    ? cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
    : guestCartItems.reduce(
        (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
        0
      );

  const totalPrice = user
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : guestCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount = totalMRP - totalPrice;

  const GUEST_TAX_RATE = 0.05;
  const taxAmount = user
    ? cartMeta?.taxAmount || 0
    : totalPrice * GUEST_TAX_RATE;

  const totalWithTax = user
    ? cartMeta?.totalWithTax || totalPrice
    : totalPrice + taxAmount;

  // ── SIDE EFFECTS ──
  useEffect(() => {
    if (openSideCart) {
      if (user) refreshCart();
    }
  }, [openSideCart]);

  useEffect(() => {
    if (openSideCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openSideCart]);

  const isEmpty = user ? cartItems.length === 0 : guestCartItems.length === 0;

  return (
    <>
      <style>{`
        .overlay {
          position: fixed;
          top: ${navbarHeight}px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,.6);
          z-index: 1099;
          opacity: ${openSideCart ? "1" : "0"};
          pointer-events: ${openSideCart ? "auto" : "none"};
          transition: opacity 0.3s ease;
        }

        .sidecart {
          position: fixed;
          top: ${navbarHeight}px;
          bottom: 0;
          right: 0;
          width: 350px;
          max-width: 100%;
          background: #2a2a2a;
          transform: translateX(${openSideCart ? "0" : "100%"});
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1100;
          display: flex;
          flex-direction: column;
          overscroll-behavior: contain;
        }

        .sc-header {
          background: #ffeb00;
          color: #000;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 900;
          flex-shrink: 0;
        }

        .sc-close-btn {
          cursor: pointer;
          font-size: 24px;
          line-height: 1;
          background: none;
          border: none;
          color: #000;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          transition: transform 0.2s;
        }

        .sc-close-btn:hover {
          transform: scale(1.1);
        }

        .sc-body {
          padding: 14px;
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .sc-body::-webkit-scrollbar {
          display: none;
        }

        .sc-empty-cart {
          text-align: center;
          color: #ffeb00;
          padding: 40px 20px;
          font-size: 16px;
        }

        .sc-item {
          border: 2px solid #ffeb00;
          border-radius: 12px;
          padding: 6px;
          display: flex;
          gap: 16px;
          position: relative;
          background: #333;
          flex-shrink: 0;
        }

        .sc-item img {
          width: 90px;
          height: 120px;
          object-fit: cover;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .sc-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }

        .sc-item-details h4 {
          margin: 0;
          font-size: 16px;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .sc-item-details p {
          margin: 0;
          color: #ffeb00;
          font-weight: bold;
        }

        .sc-item-details del {
          color: #999;
          margin-left: 8px;
        }

        .sc-stock-warning {
          font-size: 12px;
          width: fit-content;
          color: #ff6b6b;
          background: rgba(255, 107, 107, 0.15);
          padding: 6px 8px;
          border-radius: 4px;
          border-left: 3px solid #ff6b6b;
          margin-top: 4px;
          font-weight: 500;
        }

        .sc-qty {
          display: flex;
          border: 1px solid #ffeb00;
          width: fit-content;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 8px;
        }

        .sc-qty button {
          width: 35px;
          height: 35px;
          background: none;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 18px;
          transition: background 0.2s;
        }

        .sc-qty button:hover:not(:disabled) {
          background: rgba(255, 235, 0, 0.2);
        }

        .sc-qty button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          color: #999;
          background: rgba(255, 0, 0, 0.1);
        }

        .sc-qty span {
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          border-left: 1px solid #ffeb00;
          border-right: 1px solid #ffeb00;
        }

        .sc-remove {
          position: absolute;
          right: 16px;
          bottom: 16px;
          color: #ff4444;
          cursor: pointer;
          font-size: 13px;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .sc-remove:hover {
          color: #ff6666;
        }

        .sc-price-box {
          border-top: 2px solid #ffeb00;
          padding: 10px 14px;
          background: #222;
          flex-shrink: 0;
        }

        .sc-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
          color: #fff;
          font-size: 15px;
        }

        .sc-row:last-child {
          margin-bottom: 0;
          font-size: 18px;
          font-weight: bold;
          padding-top: 4px;
          border-top: 1px solid #444;
        }

        .sc-green {
          color: #00c853;
          font-weight: bold;
        }

        .sc-footer {
          padding: 14px;
          background: #2a2a2a;
          flex-shrink: 0;
        }

        .sc-footer a {
          display: block;
          background: #ffeb00;
          color: #000;
          padding: 8px;
          text-align: center;
          font-weight: 900;
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .sc-footer a:hover {
          background: #ffed33;
        }

        /* ── Modal ── */
        .sc-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
        }

        .sc-login-modal {
          background: #151515;
          border: 2px solid #ffeb00;
          border-radius: 20px;
          padding: 32px;
          width: 90%;
          max-width: 420px;
          text-align: center;
          animation: scPopIn 0.3s ease;
        }

        .sc-login-modal h2 {
          color: #ffeb00;
          font-family: "Jersey 25", cursive;
          font-size: 32px;
          margin-bottom: 12px;
        }

        .sc-login-modal p {
          color: #ffffff;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .sc-modal-actions {
          display: flex;
          gap: 12px;
        }

        .sc-modal-btn {
          flex: 1;
          height: 48px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
          border: 2px solid #ffeb00;
          font-family: "Jersey 25", sans-serif;
        }

        .sc-modal-btn-login {
          background: #ffeb00;
          color: #000;
        }

        .sc-modal-btn-cancel {
          background: transparent;
          color: #fff;
        }

        @keyframes scPopIn {
          from { transform: scale(0.85); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }

        /* ── Mobile: full-width panel ── */
        @media (max-width: 768px) {
          .sidecart {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .sc-header {
            height: 50px;
            padding: 0 16px;
            font-size: 14px;
          }

          .sc-close-btn {
            width: 40px;
            height: 40px;
            font-size: 24px;
          }

          .sc-body {
            padding: 12px;
          }

          .sc-item {
            padding: 12px;
            gap: 10px;
          }

          .sc-item img {
            width: 60px;
            height: 80px;
          }

          .sc-item-details h4 {
            font-size: 13px;
          }

          .sc-item-details p {
            font-size: 13px;
          }

          .sc-stock-warning {
            font-size: 11px;
          }

          .sc-qty button {
            width: 30px;
            height: 30px;
          }

          .sc-qty span {
            min-width: 30px;
            font-size: 13px;
          }

          .sc-remove {
            top: 12px;
            bottom: auto;
            right: 12px;
            font-size: 12px;
            padding: 4px 8px;
            background: #ff4444;
            color: white;
            border-radius: 4px;
            text-decoration: none;
            height: 30px;
            display: flex;
            align-items: center;
          }

          .sc-remove:hover {
            background: #ff6666;
            color: white;
          }

          .sc-price-box {
            padding: 12px;
          }

          .sc-row {
            font-size: 13px;
          }

          .sc-row:last-child {
            font-size: 15px;
          }

          .sc-footer {
            padding: 12px;
          }

          .sc-modal-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 360px) {
          .sc-item img {
            width: 50px;
            height: 70px;
          }

          .sc-item-details h4 {
            font-size: 12px;
          }

          .sc-qty button {
            width: 28px;
            height: 28px;
            font-size: 14px;
          }

          .sc-qty span {
            min-width: 28px;
          }
        }

        /* ================= RESPONSIVE CART ICON ================= */
        .cart-icon {
          display: inline;
          vertical-align: middle;
          flex-shrink: 0;
        }
        
        .cart-icon-header {
          margin-right: clamp(6px, 2vw, 12px);
        }

        /* Desktop */
        @media (min-width: 1025px) {
          .cart-icon-header {
            width: 20px;
            height: 20px;
            margin-right: 8px;
          }
        }

        /* Tablet (768px - 1024px) */
        @media (max-width: 1024px) and (min-width: 769px) {
          .cart-icon-header {
            width: 18px;
            height: 18px;
            margin-right: 6px;
          }
        }

        /* Mobile (max 768px) */
        @media (max-width: 768px) {
          .cart-icon-header {
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
        }

        /* Small phones (max 480px) */
        @media (max-width: 480px) {
          .cart-icon-header {
            width: 14px;
            height: 14px;
            margin-right: 4px;
          }
        }
      `}</style>

      <div className="overlay" onClick={() => setOpenSideCart(false)} />

      <div className="sidecart">
        <div className="sc-header">
          <span><ShoppingCart className="cart-icon cart-icon-header" />MY CART ({displayItems.length})</span>
          <button
            className="sc-close-btn"
            onClick={() => setOpenSideCart(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="sc-body">
          {isEmpty && (
            <div className="sc-empty-cart">Your cart is empty</div>
          )}

          {/* ── LOGGED-IN USER CART ITEMS ── */}
          {user &&
            cartItems.map((item) => (
              <div
                className="sc-item"
                key={item.product._id}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/productspec/${item.product._id}`);
                  setOpenSideCart(false);
                }}
              >
                <img
                  src={item.product.images?.[0]?.url || "/images/Product1.png"}
                  alt={item.product.name}
                />

                <div className="sc-item-details">
                  <h4>{item.product.name}</h4>

                  <p>
                    ₹{item.price}{" "}
                    {item.originalPrice && item.originalPrice !== item.price && (
                      <del>₹{item.originalPrice}</del>
                    )}
                  </p>

                  {item.quantity >= item.product?.countInStock && (
                    <div className="sc-stock-warning">
                      📦 Max stock reached ({item.product.countInStock} available)
                    </div>
                  )}

                  <div className="sc-qty">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        decreaseQty(item.product._id, item.quantity);
                      }}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        increaseQty(
                          item.product._id,
                          item.quantity,
                          item.product.countInStock
                        );
                      }}
                      disabled={isMaxStock(item.product._id, item.quantity)}
                      aria-label="Increase quantity"
                      title={
                        isMaxStock(item.product._id, item.quantity)
                          ? stockErrors[item.product._id] || "Maximum stock reached"
                          : "Add one more"
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <span
                  className="sc-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.product._id);
                  }}
                >
                  Remove
                </span>
              </div>
            ))}

          {/* ── GUEST CART ITEMS ── */}
          {!user &&
            guestCartItems.map((item) => (
              <div className="sc-item" key={item.productId}>
                <img
                  src={item.product?.images?.[0]?.url || "/images/Product1.png"}
                  alt={item.product?.name}
                />

                <div className="sc-item-details">
                  <h4>{item.product?.name}</h4>

                  <p>
                    ₹{item.price}{" "}
                    {item.originalPrice && item.originalPrice !== item.price && (
                      <del>₹{item.originalPrice}</del>
                    )}
                  </p>

                  {item.quantity >= item.product?.countInStock && (
                    <div className="sc-stock-warning">
                      📦 Max stock reached ({item.product.countInStock} available)
                    </div>
                  )}

                  <div className="sc-qty">
                    <button
                      onClick={() => guestDecreaseQty(item.productId, item.quantity)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => guestIncreaseQty(item.productId)}
                      disabled={item.quantity >= item.product?.countInStock}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <span
                  className="sc-remove"
                  onClick={() => guestRemoveItem(item.productId)}
                >
                  Remove
                </span>
              </div>
            ))}
        </div>

        {!isEmpty && (
          <>
            <div className="sc-price-box">
              <div className="sc-row">
                <span>Price (MRP)</span>
                <span>₹{totalMRP}</span>
              </div>

              {discount > 0 && (
                <div className="sc-row sc-green">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="sc-row">
                <span>Tax</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>

              <div className="sc-row sc-green">
                <span>Total</span>
                <span>₹{totalWithTax.toFixed(2)}</span>
              </div>
            </div>

            <div className="sc-footer">
              <button
                onClick={handleProceed}
                style={{
                  width: "100%",
                  background: "#ffeb00",
                  color: "#000",
                  padding: "12px",
                  fontWeight: "900",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "'Jersey 25', sans-serif",
                }}
              >
                PLACE ORDER
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── LOGIN MODAL ── */}
      {showLoginModal && (
        <div
          className="sc-modal-overlay"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="sc-login-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Login Required</h2>
            <p>Please login to place your order.</p>

            <div className="sc-modal-actions">
              <button
                className="sc-modal-btn sc-modal-btn-login"
                onClick={() => {
                  setShowLoginModal(false);
                  setOpenSideCart(false);
                  navigate("/login");
                }}
              >
                LOGIN
              </button>

              <button
                className="sc-modal-btn sc-modal-btn-cancel"
                onClick={() => setShowLoginModal(false)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}