import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const INITIAL_CART = [
  {
    id: 1,
    title: "PROTEIN WAFERS – VARIETY PACK OF 10",
    oldPrice: 2999,
    price: 2000,
    rating: 5,
    reviews: 99,
    image: "/images/product1.png",
    qty: 1,
    specs: ["NO PRESERVATIVES", "JAGGERY BASED", "NO ADDED COLOURS"],
  },
  {
    id: 2,
    title: "PROTEIN WAFERS – VARIETY PACK OF 10",
    oldPrice: 2999,
    price: 2000,
    rating: 5,
    reviews: 99,
    image: "/images/product1.png",
    qty: 1,
    specs: ["NO PRESERVATIVES", "JAGGERY BASED", "NO ADDED COLOURS"],
  },
];

export default function Cart() {
  const [cart, setCart] = useState(INITIAL_CART);
  const packingCharges = 20;

  const { totalMRP, discount, finalAmount } = useMemo(() => {
    const mrp = cart.reduce((s, i) => s + i.oldPrice * i.qty, 0);
    const sell = cart.reduce((s, i) => s + i.price * i.qty, 0);
    return {
      totalMRP: mrp,
      discount: mrp - sell,
      finalAmount: sell + packingCharges,
    };
  }, [cart]);

  const incQty = (id) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));

  const decQty = (id) =>
    setCart((c) =>
      c.map((i) => (i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i))
    );

  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));

  return (
    <>
      <style>{`
      body{background:#2f2f2f;color:#fff}

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

      .specs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
      .spec{
        border:1px solid #ffeb00;
        padding:4px 8px;
        font-size:11px;
        border-radius:4px;
        color:#ffeb00
      }

      .rating{color:#ffeb00;font-size:13px;margin-bottom:10px}

      .price{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
      .price del{color:#aaa}
      .price span{font-weight:700;font-size:16px}
      .off{color:#00c853;font-size:13px}

      /* 🔥 FIXED QUANTITY */
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
        font-weight:800;
        cursor:pointer;
      }

      /* 📱 MOBILE */
      @media(max-width:900px){
        .layout{grid-template-columns:1fr}

        .item-card{
          flex-direction:column;
          align-items:center;
          text-align:center;
        }

        .details{text-align:center}
        .qty-row{justify-content:center}
        .price{justify-content:center}
      }

      @media(max-width:480px){
        .cart-page{padding:20px}
        .img{width:140px;height:180px}
        h1{font-size:22px}
      }
      `}</style>

      <div className="cart-page">
        <h1>SHOPPING CART</h1>

        <div className="layout">
          <div>
            {cart.map((item) => (
              <div className="item-card" key={item.id}>
                <div className="delete" onClick={() => removeItem(item.id)}>
                  🗑
                </div>

                <div className="img">
                  <img src={item.image} alt="" />
                </div>

                <div className="details">
                  <h3>{item.title}</h3>

                  <div className="specs">
                    {item.specs.map((s, i) => (
                      <span className="spec" key={i}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="rating">
                    {"★".repeat(item.rating)} | {item.reviews} Reviews
                  </div>

                  <div className="price">
                    <del>RS : {item.oldPrice}</del>
                    <span>RS : {item.price}</span>
                    <span className="off">25% OFF</span>
                  </div>

                  <div className="qty-row">
                    <span>Quantity:</span>
                    <div className="qty-box">
                      <button onClick={() => decQty(item.id)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => incQty(item.id)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="price-box">
            <h2>PRICE DETAILS</h2>

            <div className="row">
              <span>Price ({cart.length} items)</span>
              <span>₹{totalMRP}</span>
            </div>

            <div className="row green">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>

            <div className="row">
              <span>Packing & other charges</span>
              <span>₹{packingCharges}</span>
            </div>

            <hr />

            <div className="row green">
              <span>Total Amount</span>
              <span>₹{finalAmount}</span>
            </div>

            <div className="save">You will save ₹{discount} on this order</div>

            <Link to="/checkout">
              <button className="order-btn">PLACE ORDER</button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
