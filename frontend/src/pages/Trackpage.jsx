import React, { useState } from "react";
import { generateInvoice } from "../services/invoiceService";
import Footer from "../components/Footer";


export default function TrackOrder() {

  const orders = [
    {
      id: "3354654654526",
      product: "Snickers",
      variant: "Space Gray · 320g · 1TB",
      price: 2599,
      qty: 1,
      image: "/images/product.jpg",
      date: "Feb 16, 2022",
      statusStep: 1
    },
    {
      id: "9988776655443",
      product: "Protein Bar",
      variant: "Chocolate · 250g",
      price: 1999,
      qty: 2,
      image: "/images/product.jpg",
      date: "Mar 02, 2022",
      statusStep: 2
    },
    {
      id: "7766554433221",
      product: "Whey Isolate",
      variant: "Vanilla · 1kg",
      price: 3499,
      qty: 1,
      image: "/images/product.jpg",
      date: "Apr 10, 2022",
      statusStep: 3
    }
  ];

  const [openOrder, setOpenOrder] = useState(null);

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Khand:wght@600&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Khand:wght@700&display=swap");


        .orders-page {
          color: #fff;
          min-height: 100vh;
          padding: 120px 60px;
        }


        .orders-heading-outline {
        font-family: "Khand", sans-serif;
        font-size: 80px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;

        color: transparent;                     /* hollow text */
        -webkit-text-stroke: 4px #ffd400;        /* yellow outline */
        text-stroke: 4px #ffd400;

        margin-bottom: 40px;
        }


        /* ===== ORDER SUMMARY ===== */
        .order-summary {
          background: #111;
          padding: 18px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          margin-bottom: 20px;
        }

        .order-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .order-img {
          width: 56px;
          height: 56px;
          border-radius: 10px;
          overflow: hidden;
          background: #222;
          flex-shrink: 0;
        }

        .order-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .order-info {
          font-size: 14px;
        }

        .order-info span {
          display: block;
          margin-top: 4px;
          opacity: 0.7;
          font-size: 12px;
        }

        .order-price {
          text-align: right;
          font-size: 14px;
          font-weight: 600;
        }

        .order-price span {
          display: block;
          font-size: 12px;
          opacity: 0.7;
        }

        /* ===== DETAILS CARD ===== */
        .order-details {
          background: #1c1c1c;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 40px;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .order-header span {
          opacity: 0.7;
          font-size: 12px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .invoice-btn {
          background: transparent;
          border: 1px solid #666;
          color: #fff;
          padding: 8px 14px;
          font-size: 12px;
          border-radius: 6px;
          cursor: pointer;
        }

        .track-btn {
          background: #ffd400;
          color: #000;
          border: none;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 6px;
          cursor: pointer;
        }

        /* ===== TRACK BAR ===== */
        .track-bar {
          display: flex;
          justify-content: space-between;
          margin: 30px 0;
        }

        .track-step {
          flex: 1;
          text-align: center;
          font-size: 12px;
          position: relative;
          color: #777;
        }

        .track-step::before {
          content: "";
          position: absolute;
          top: 9px;
          left: -50%;
          width: 100%;
          height: 2px;
          background: #444;
        }

        .track-step:first-child::before {
          display: none;
        }

        .track-dot {
          width: 16px;
          height: 16px;
          background: #444;
          border-radius: 50%;
          margin: 0 auto 6px;
          position: relative;
          z-index: 1;
        }

        .track-step.active {
          color: #4caf50;
        }

        .track-step.active .track-dot {
          background: #4caf50;
        }

        /* ===== ITEM ROW ===== */
        .order-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-top: 1px solid #333;
          font-size: 14px;
        }

        .order-item span {
          display: block;
          font-size: 12px;
          opacity: 0.7;
        }

        /* ===== INFO GRID ===== */
        .order-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 30px;
          margin-top: 30px;
          font-size: 13px;
        }

        .order-info-grid h4 {
          margin-bottom: 8px;
        }

        .order-info-grid p {
          opacity: 0.7;
          line-height: 1.5;
        }

        .total {
          font-weight: 700;
          margin-top: 8px;
        }

        /* ===== LARGE DESKTOP / 4K ===== */
@media (min-width: 1400px) {
  .orders-page {
    padding: 140px 120px;
  }

  .orders-heading-outline {
    font-size: 96px;
  }
}

/* ===== TABLET ===== */
@media (max-width: 900px) {
  .orders-page {
    padding: 120px 40px;
  }

  .orders-heading-outline {
    font-size: 60px;
    -webkit-text-stroke: 3px #ffd400;
  }

  .order-info-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* ===== MOBILE ===== */
@media (max-width: 600px) {
  .orders-page {
    padding: 100px 20px;
  }

  .orders-heading-outline {
    font-size: 44px;
    -webkit-text-stroke: 2px #ffd400;
  }

  .order-summary {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .order-price {
    text-align: left;
  }

  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .track-bar {
    flex-direction: column;
    gap: 20px;
  }

  .track-step::before {
    display: none;
  }

  .order-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .order-info-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

/* ===== SMALL MOBILE ===== */
@media (max-width: 360px) {
  .orders-heading-outline {
    font-size: 36px;
  }

  .order-info {
    font-size: 13px;
  }

  .order-price {
    font-size: 13px;
  }
}

      `}</style>

      <div className="orders-page">
        <h1 className="orders-heading-outline">ORDERS</h1>

        {orders.map((order, index) => (
          <div key={order.id}>

            {/* ===== SUMMARY CARD ===== */}
            <div
              className="order-summary"
              onClick={() =>
                setOpenOrder(openOrder === index ? null : index)
              }
            >
              <div className="order-left">
                <div className="order-img">
                  <img src={order.image} alt={order.product} />
                </div>
                <div className="order-info">
                  {order.product}
                  <span>{order.variant}</span>
                </div>
              </div>

              <div className="order-price">
                ₹{order.price}
                <span>Qty: {order.qty}</span>
              </div>
            </div>

            {/* ===== DETAILS ===== */}
            {openOrder === index && (
              <div className="order-details">
                <div className="order-header">
                  <div>
                    <b>Order ID:</b> {order.id} <br />
                    <span>Order date: {order.date}</span>
                  </div>

                  <div className="header-actions">
                    <button className="invoice-btn"onClick={() => generateInvoice(order)}>Invoice</button>
                    <button className="track-btn">Track order</button>
                  </div>
                </div>

                {/* TRACK BAR */}
                <div className="track-bar">
                  {[
                    "Order Confirmed",
                    "Shipped",
                    "Out For Delivery",
                    "Delivered",
                  ].map((step, i) => (
                    <div
                      key={i}
                      className={`track-step ${
                        i <= order.statusStep ? "active" : ""
                      }`}
                    >
                      <div className="track-dot" />
                      {step}
                    </div>
                  ))}
                </div>

                {/* ITEM */}
                <div className="order-item">
                  <div>
                    {order.product}
                    <span>{order.variant}</span>
                  </div>
                  <div>₹{order.price} × {order.qty}</div>
                </div>

                {/* INFO */}
                <div className="order-info-grid">
                  <div>
                    <h4>Payment</h4>
                    <p>Visa **** 4321</p>
                  </div>

                  <div>
                    <h4>Delivery</h4>
                    <p>
                      847 James Bridge Apt <br />
                      London, UK <br />
                      447-789-2311
                    </p>
                  </div>

                  <div>
                    <h4>Order Summary</h4>
                    <p>Subtotal: ₹{order.price * order.qty}</p>
                    <p>Delivery: ₹0</p>
                    <p>Tax: ₹281</p>
                    <p className="total">
                      Total: ₹{order.price * order.qty + 281}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
