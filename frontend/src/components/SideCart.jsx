import { useState } from "react";
import { Link } from "react-router-dom";

export default function SideCart({ open, onClose }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "PROTEIN WAFERS – CHOCOLATE DELIGHT",
      price: 2000,
      oldPrice: 2999,
      qty: 1,
      image: "/images/product1.png",
      specs: ["NO PRESERVATIVES", "NO GLUCOSE ADDED", "JAGGERY BASED"],
    },
  ]);

  const packingCharge = 20;

  const increaseQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalMRP = cartItems.reduce(
    (sum, item) => sum + item.oldPrice * item.qty,
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const discount = totalMRP - totalPrice;
  const finalAmount = totalPrice + packingCharge;

  return (
    <>
      <style>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.6);
          z-index: 999;
          display: ${open ? "block" : "none"};
        }

        .sidecart {
          position: fixed;
          top: 0;
          right: 0;
          width: 520px;
          max-width: 100%;
          height: 100vh;
          background: #2a2a2a;
          transform: translateX(${open ? "0" : "100%"});
          transition: .35s;
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }

        .header {
          background: #ffeb00;
          color: #000;
          padding: 18px 22px;
          display: flex;
          justify-content: space-between;
          font-weight: 900;
        }

        .body {
          padding: 24px;
          flex: 1;
          overflow-y: auto;
        }

        .item {
          border: 2px solid #ffeb00;
          border-radius: 12px;
          padding: 18px;
          display: flex;
          gap: 16px;
          position: relative;
        }

        .item img {
          width: 90px;
          height: 120px;
          object-fit: cover;
          border-radius: 10px;
        }

        .spec {
          border: 1px solid #ffeb00;
          padding: 3px 7px;
          font-size: 10px;
          border-radius: 4px;
          color: #ffeb00;
          margin-right: 5px;
        }

        .qty {
          display: flex;
          border: 1px solid #ffeb00;
          width: fit-content;
          margin-top: 10px;
        }

        .qty button {
          width: 30px;
          background: none;
          color: #fff;
          border: none;
          cursor: pointer;
        }

        .remove {
          position: absolute;
          right: 16px;
          bottom: 16px;
          color: red;
          cursor: pointer;
        }

        .priceBox {
          border-top: 2px solid #ffeb00;
          padding: 20px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .green {
          color: #00c853;
          font-weight: bold;
        }

        .footer {
          padding: 18px;
        }

        .footer a {
          display: block;
          background: #ffeb00;
          color: #000;
          padding: 16px;
          text-align: center;
          font-weight: 900;
          text-decoration: none;
        }
      `}</style>

      <div className="overlay" onClick={onClose} />

      <div className="sidecart">
        <div className="header">
          <span>🛒 MY CART ({cartItems.length})</span>
          <span style={{ cursor: "pointer" }} onClick={onClose}>✕</span>
        </div>

        <div className="body">
          {cartItems.length === 0 && <p>Your cart is empty</p>}

          {cartItems.map(item => (
            <div className="item" key={item.id}>
              <img src={item.image} alt="" />

              <div>
                <h4>{item.title}</h4>

                <div>
                  {item.specs.map((s, i) => (
                    <span className="spec" key={i}>{s}</span>
                  ))}
                </div>

                <p>
                  ₹{item.price} <del>₹{item.oldPrice}</del>
                </p>

                <div className="qty">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>

              <span className="remove" onClick={() => removeItem(item.id)}>
                Remove
              </span>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <>
            <div className="priceBox">
              <div className="row">
                <span>Price</span>
                <span>₹{totalMRP}</span>
              </div>

              <div className="row green">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>

              <div className="row">
                <span>Packing</span>
                <span>₹{packingCharge}</span>
              </div>

              <div className="row green">
                <span>Total</span>
                <span>₹{finalAmount}</span>
              </div>
            </div>

            <div className="footer">
              <Link to="/cart" onClick={onClose}>
                PLACE ORDER
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
