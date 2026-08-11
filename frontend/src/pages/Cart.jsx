import React, { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import {
  updateCartItemApi,
  removeCartItemApi,
} from "../api/cartApi";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cartItems,
    setCartItems,
    refreshCart,
    cartMeta
  } = useCart();

  // const packingCharges = 20;

  // 🔥 PRICE CALCULATIONS (SAME AS SIDECART)
  const totalMRP = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = totalMRP - totalPrice;

  // Derive tax rate from cartMeta so tax & total stay in sync with optimistic UI updates
  const taxRate =
    cartMeta.totalWithTax && cartMeta.taxAmount && cartMeta.totalWithTax !== cartMeta.taxAmount
      ? cartMeta.taxAmount / (cartMeta.totalWithTax - cartMeta.taxAmount)
      : 0;

  const taxAmount = totalPrice * taxRate;
  const finalAmount = totalPrice + taxAmount;

  const isCartEmpty = cartItems.length === 0;

  // 🔥 LOAD CART WHEN PAGE OPENS
  useEffect(() => {
    refreshCart();
  }, []);

  // 🔥 UPDATE QUANTITY (SYNC WITH CONTEXT)
  const updateQty = async (productId, quantity) => {
    try {
      if (quantity < 1) {
        const res = await removeCartItemApi(productId);
        setCartItems(res.data.items);
        return;
      }

      // Optimistic UI update
      setCartItems(prev =>
        prev.map(item =>
          item.product._id === productId
            ? { ...item, quantity }
            : item
        )
      );

      await updateCartItemApi(productId, quantity);

    } catch (err) {
      console.log("Update qty error:", err);
      refreshCart(); // rollback
    }
  };

  // 🔥 REMOVE ITEM
  const removeItem = async (productId) => {
    try {
      const res = await removeCartItemApi(productId);
      setCartItems(res.data.items);
    } catch (err) {
      console.log("Remove item error:", err);
    }
  };

  return (
    <>
      <style>{`
      body{background:#1b1b1b;color:#fff}

      .cart-page{max-width:1600px;margin:auto;padding:40px}
      h1{color:#ffeb00;margin-bottom:30px}

      .layout{display:grid;grid-template-columns:2fr 1fr;gap:40px}

      .item-card{
        border:2px solid #ffeb00;
        border-radius:12px;
        padding:24px;
        display:flex;
        gap:24px;
        margin-bottom:30px;
        position:relative;
        background:#262626;
      }

      .delete{
        position:absolute;top:16px;right:16px;
        cursor:pointer;font-size:18px;color:#ff4d4d
      }

      .img{
        width:160px;height:200px;
        border-radius:10px;
        overflow:hidden;
        background:#111;
        flex-shrink:0;
      }

      .img img{width:100%;height:100%;object-fit:cover}

      .details{flex:1}
      .details h3{font-size:16px;margin-bottom:10px}

      .price{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
      .price del{color:#aaa}
      .price span{font-weight:700;font-size:16px}
      .off{color:#00c853;font-size:13px}

      .qty-row{
        display:flex;
        align-items:center;
        gap:12px;
        margin-top:14px;
        flex-wrap:wrap;
      }

      .qty-box{
        display:flex;
        align-items:center;
        border:2px solid #ffeb00;
        border-radius:6px;
        overflow:hidden;
        height:36px;
      }

      .qty-box button{
        width:36px;
        height:36px;
        background:none;
        border:none;
        color:#ffeb00;
        font-size:20px;
        cursor:pointer;
      }

      .qty-box span{
        width:36px;
        text-align:center;
        font-weight:700;
      }

      .price-box{
        border:2px solid #ffeb00;
        border-radius:12px;
        padding:24px;
        background:#262626;
        height:fit-content;
      }

      .row{display:flex;justify-content:space-between;margin-bottom:14px}
      .green{color:#00c853;font-weight:700}

      .save{
        border:1px solid #ffeb00;
        padding:10px;
        text-align:center;
        margin:16px 0;
      }

      .order-btn{
        width:100%;
        padding:14px;
        background:#ffeb00;
        border:none;
        color:black;
        font-weight:800;
        cursor:pointer;
        font-size:16px;
        border-radius:4px;
        transition: opacity 0.2s, cursor 0.2s;
      }

      .order-btn:disabled{
        opacity:0.4;
        cursor:not-allowed;
        background:#ffeb00;
      }

      .empty-cart{
        text-align:center;
        padding:60px 20px;
        color:#aaa;
        font-size:18px;
      }

      /* ── RESPONSIVE ── */

      /* Tablet: ~768px–1024px */
      @media (max-width:1024px){
        .cart-page{padding:24px 20px}
        .layout{grid-template-columns:1fr;gap:24px}
        .price-box{position:static}
      }

      /* Mobile: up to 600px */
      @media (max-width:600px){
        .cart-page{padding:16px 12px}
        h1{font-size:22px;margin-bottom:20px}

        .item-card{
          flex-direction:row;
          gap:14px;
          padding:14px 14px 14px 14px;
        }

        .img{
          width:90px;
          height:115px;
          border-radius:8px;
        }

        .details h3{font-size:13px;margin-bottom:8px;padding-right:28px}

        .price span{font-size:14px}
        .price del{font-size:12px}
        .off{font-size:11px}

        .qty-row{gap:8px;margin-top:10px}
        .qty-box{height:32px}
        .qty-box button{width:30px;height:32px;font-size:18px}
        .qty-box span{width:28px;font-size:14px}

        .delete{top:10px;right:10px;font-size:16px}

        .price-box{padding:18px 16px}
        .price-box h2{font-size:16px;margin-bottom:14px}
        .row{font-size:14px}

        .save{font-size:13px;padding:8px}
        .order-btn{padding:12px;font-size:15px}
      }

      @media (max-width:360px){
        .item-card{gap:10px;padding:12px}
        .img{width:75px;height:96px}
        .details h3{font-size:12px}
      }
      `}</style>

      <div className="cart-page">
        <h1>SHOPPING CART</h1>

        <div className="layout">
          <div>
            {cartItems.length === 0 ? (
              <div className="empty-cart">Your cart is empty.</div>
            ) : (
              cartItems.map((item) => (
                <div className="item-card" key={item.product._id}>
                  <div className="delete" onClick={() => removeItem(item.product._id)}>
                    🗑
                  </div>

                  <div className="img">
                    <img
                      src={item.product.images?.[0]?.url || "/images/Product1.png"}
                      alt={item.product.name}
                    />
                  </div>

                  <div className="details">
                    <h3>{item.product.name}</h3>

                    <div className="price">
                      <del>₹{item.originalPrice}</del>
                      <span>₹{item.price}</span>
                      <span className="off">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </span>
                    </div>

                    <div className="qty-row">
                      <span>Quantity:</span>
                      <div className="qty-box">
                        <button onClick={() => updateQty(item.product._id, item.quantity - 1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQty(item.product._id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="price-box">
            <h2>PRICE DETAILS</h2>

            <div className="row">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{totalMRP}</span>
            </div>

            <div className="row green">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>

            {/* <div className="row">
              <span>Packing & other charges</span>
              <span>₹{packingCharges}</span>
            </div> */}

            <div className="row">
              <span>Tax</span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>

            <div className="row">
              <span>Shipping charge</span>
              <span>{isCartEmpty ? "₹0" : "₹40"}</span>
            </div>

            <hr />

            <div className="row green">
              <span>Total Amount</span>
              <span>₹{(isCartEmpty ? 0 : (finalAmount || 0) + 40).toFixed(2)}</span>
            </div>

            <div className="save">
              You will save ₹{discount} on this order
            </div>

            <Link to={isCartEmpty ? "#" : "/checkout"} onClick={e => isCartEmpty && e.preventDefault()}>
              <button className="order-btn" disabled={isCartEmpty}>
                PLACE ORDER
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}