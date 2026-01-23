// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";

// export default function OrderDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const res = await api.get(`/api/orders/${id}`);
//         setOrder(res.data);
//       } catch (err) {
//         console.error("Failed to load order", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [id]);

//   if (loading) return <p style={{ color: "white", textAlign: "center" }}>Loading order...</p>;
//   if (!order) return <p style={{ color: "white", textAlign: "center" }}>Order not found</p>;

//   return (
//     <div style={{ padding: "2rem", color: "white", background: "#2f2f2f", minHeight: "100vh" }}>
//       <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
//         ← Back
//       </button>

//       <h2>Order #{order._id}</h2>
//       <p>Status: {order.orderStatus}</p>
//       <p>Payment: {order.paymentStatus}</p>
//       <p>Date: {new Date(order.createdAt).toLocaleString()}</p>

//       <hr />

//       <h3>Items</h3>
//       {order.orderItems.map((item) => (
//         <div
//           key={item._id}
//           style={{
//             display: "flex",
//             gap: "1rem",
//             marginBottom: "1rem",
//             border: "1px solid #facc15",
//             padding: "1rem",
//             borderRadius: "8px"
//           }}
//         >
//           <img
//             src={item.image}
//             alt={item.name}
//             style={{ width: "80px", height: "80px", objectFit: "cover" }}
//           />
//           <div>
//             <h4>{item.name}</h4>
//             <p>Qty: {item.quantity}</p>
//             <p>Price: ₹{item.price}</p>
//           </div>
//         </div>
//       ))}

//       <hr />

//       <h3>Shipping Address</h3>
//       <p>{order.shippingAddress.address}</p>
//       <p>{order.shippingAddress.city} - {order.shippingAddress.pincode}</p>
//       <p>Phone: {order.shippingAddress.phone}</p>

//       <hr />

//       <h3>Price Summary</h3>
//       <p>Tax: ₹{order.taxAmount.toFixed(2)}</p>
//       <h2>Total: ₹{order.totalAmount}</h2>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/api/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Failed to load order", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return <p style={{ color: "white", textAlign: "center", marginTop: "4rem" }}>Loading order...</p>;
  }

  if (!order) {
    return <p style={{ color: "white", textAlign: "center", marginTop: "4rem" }}>Order not found</p>;
  }

  return (
    <>
      <style>{`
        .order-page {
          min-height: 100vh;
          background: #2f2f2f;
          color: white;
          padding: 2rem;
          max-width: 1200px;
          margin: auto;
        }

        .back-btn {
          background: transparent;
          border: 2px solid #facc15;
          color: #facc15;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 1.5rem;
        }

        .back-btn:hover {
          background: #facc15;
          color: black;
        }

        .order-header {
          border: 2px solid #facc15;
          border-radius: 14px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .badge {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: bold;
        }

        .paid {
          background: #22c55e;
          color: black;
        }

        .pending {
          background: #facc15;
          color: black;
        }

        .section {
          border: 2px solid #facc15;
          border-radius: 14px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .items-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .item-card {
          display: flex;
          gap: 1rem;
          border: 1px solid #facc15;
          padding: 1rem;
          border-radius: 10px;
          align-items: center;
        }

        .item-card img {
          width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: 8px;
          border: 2px solid #facc15;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .total {
          font-size: 1.4rem;
          font-weight: bold;
          color: #facc15;
        }

        @media (max-width: 600px) {
          .item-card {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="order-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Orders
        </button>

        {/* HEADER */}
        <div className="order-header">
          <div>
            <h2>Order #{order._id}</h2>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <span className={`badge ${order.paymentStatus === "paid" ? "paid" : "pending"}`}>
              {order.paymentStatus.toUpperCase()}
            </span>
          </div>
        </div>

        {/* ITEMS */}
        <div className="section">
          <h3>Ordered Items</h3>
          <div className="items-grid">
            {order.orderItems.map((item) => (
              <div className="item-card" key={item._id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SHIPPING */}
        <div className="section">
          <h3>Shipping Address</h3>
          <p>{order.shippingAddress.address}</p>
          <p>
            {order.shippingAddress.city} - {order.shippingAddress.pincode}
          </p>
          <p>📞 {order.shippingAddress.phone}</p>
        </div>

        {/* SUMMARY */}
        <div className="section">
          <h3>Price Summary</h3>
          <div className="price-row">
            <span>Tax</span>
            <span>₹{order.taxAmount.toFixed(2)}</span>
          </div>
          <hr />
          <div className="price-row total">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>
      </div>
    </>
  );
}

