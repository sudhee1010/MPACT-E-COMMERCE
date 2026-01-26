// import React, { useEffect, useState } from "react";
// // import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import api from "../api/axios";
// import { getOrderByIdApi } from "../api/ordersApi";
// import toast from "react-hot-toast";



// const Pay = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   // const { orderId } = location.state || {};
//   const orderId = location.state?.orderId;

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const isDirectBuy = order?.orderType === "direct";



//   // if (!order) return <p>No order found</p>;
//   // const orderId = order._id;

//   // const [orders, setOrders] = useState(null);
//   // const [loading, setLoading] = useState(true);


//   // 🔥 Fetch order securely via cookies
//   useEffect(() => {
//     if (!orderId) return;

//     const fetchOrder = async () => {
//       try {
//         const res = await getOrderByIdApi(orderId);
//         setOrder(res.data);
//       } catch (err) {
//         console.error("Failed to fetch order:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   useEffect(() => {
//     document.body.style.overflow = showCancelModal ? "hidden" : "auto";
//   }, [showCancelModal]);

//   useEffect(() => {
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);




//   // const orderId = "6969f5cb465325fad07f5950"; 

//   const handlePay = async () => {
//     try {
//       // 1️⃣ Create Razorpay order (backend)
//       const { data } = await api.post(
//         "/api/payment/create-order",
//         { orderId });
//       //   headers: {
//       //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NDhkOGI0Nzc5MGJiYzAxOWQwYTE4ZiIsImlhdCI6MTc2ODU1MTczMiwiZXhwIjoxNzY5MTU2NTMyfQ.rWTP7f38JEalc0h41AVZnXuT5Ubj7icMvQktLmVbzZw`
//       //   }
//       // }
//       // );

//       const options = {
//         key: data.key,
//         amount: data.amount,
//         currency: data.currency,
//         name: "MPACT",
//         description: "Order Payment",
//         order_id: data.razorpayOrderId,

//         handler: async function (response) {
//           // 2️⃣ Verify payment (backend)
//           await api.post(
//             "/api/payment/verify",
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               orderId
//             }
//           );

//           // alert("Payment successful");
//           // navigate("/success");
//           navigate("/order-success", { state: { orderId } });
//         },

//         modal: {
//           ondismiss: function () {
//             document.body.style.overflow = "auto";  
//             setShowCancelModal(true);
//           }
//         },

//         theme: { color: "#facc15" }
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (err) {
//       console.error(err);
//       toast.error("Payment failed");
//     }
//   };

//   if (!orderId) return <p>No order found</p>;
//   if (loading) return <p>Loading order...</p>;
//   if (!order) return <p>Order not found</p>;

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2>ORDER SUMMARY</h2>

//         {/* <div style={styles.row}>
//           <span>Subtotal</span>
//           <span>₹2000</span>
//         </div> */}


//         <div style={styles.row}>
//           <span>Subtotal</span>
//           <span>₹{order.totalAmount - order.taxAmount}</span>
//         </div>

//         {/* <div style={{ ...styles.row, color: "#22c55e" }}>
//           <span>Discount</span>
//           <span>-₹200</span>
//         </div> */}

//         {/* <div style={styles.row}>
//           <span>Packing Charges</span>
//           <span>₹50</span>
//         </div> */}

//         <hr />

//         {/* <div style={styles.total}>
//           <span>Total</span>
//           <span>₹1850</span>
//         </div> */}


//         <div style={styles.row}>
//           <span>Tax</span>
//           <span>₹{order.taxAmount.toFixed(2)}</span>
//         </div>

//         <div style={styles.total}>
//           <span>Total</span>
//           <span>₹{order.totalAmount}</span>
//         </div>




//         <button style={styles.btn} onClick={handlePay}>
//           PROCEED TO PAY
//         </button>
//       </div>

//       {/* {showCancelModal && (
//         <div style={cancelStyles.overlay}>
//           <div style={cancelStyles.modal}>
//             <h3 style={{ color: "#facc15", marginBottom: "12px" }}>
//               Payment Cancelled
//             </h3>
//             <p style={{ marginBottom: "20px" }}>
//               You cancelled the payment. You can retry it from your cart page.
//             </p>

//             <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
//               <button
//                 style={cancelStyles.primary}
//                 onClick={() => {
//                   document.body.style.overflow = "auto";
//                   navigate("/cart")
//                 }}
//               >
//                 Go to cart
//               </button>

//               <button
//                 style={cancelStyles.secondary}
//                 onClick={() => {
//                   document.body.style.overflow = "auto";
//                   setShowCancelModal(false)
//                 }}
//               >
//                 Stay Here
//               </button>
//             </div>
//           </div>
//         </div>
//       )} */}


//       {showCancelModal && (
//         <div style={cancelStyles.overlay}>
//           <div style={cancelStyles.modal}>
//             <h3 style={{ color: "#facc15", marginBottom: "12px" }}>
//               Payment Cancelled
//             </h3>
//             <p style={{ marginBottom: "20px" }}>
//               You cancelled the payment. You can continue shopping or retry.
//             </p>

//             <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
//               <button
//                 style={cancelStyles.primary}
//                 onClick={() => {
//                   document.body.style.overflow = "auto";
//                   navigate(isDirectBuy ? "/" : "/cart");
//                 }}
//               >
//                 {isDirectBuy ? "Go to Home" : "Go to Cart"}
//               </button>

//               <button
//                 style={cancelStyles.secondary}
//                 onClick={() => {
//                   document.body.style.overflow = "auto";
//                   setShowCancelModal(false);
//                 }}
//               >
//                 Stay Here
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "#2f2f2f",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     color: "white"
//   },
//   card: {
//     width: "380px",
//     border: "2px solid #facc15",
//     borderRadius: "18px",
//     padding: "28px"
//   },
//   row: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "14px"
//   },
//   total: {
//     display: "flex",
//     justifyContent: "space-between",
//     fontSize: "20px",
//     fontWeight: "bold",
//     color: "#facc15",
//     marginBottom: "20px"
//   },
//   btn: {
//     width: "100%",
//     height: "48px",
//     background: "#facc15",
//     border: "none",
//     borderRadius: "12px",
//     fontWeight: "bold",
//     cursor: "pointer"
//   }
// };

// const cancelStyles = {
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 9999
//   },
//   modal: {
//     background: "#1f1f1f",
//     border: "2px solid #facc15",
//     borderRadius: "12px",
//     padding: "24px",
//     width: "320px",
//     textAlign: "center",
//     color: "white"
//   },
//   primary: {
//     background: "#facc15",
//     border: "none",
//     padding: "10px 16px",
//     borderRadius: "8px",
//     fontWeight: "bold",
//     cursor: "pointer"
//   },
//   secondary: {
//     background: "transparent",
//     border: "1px solid #facc15",
//     color: "#facc15",
//     padding: "10px 16px",
//     borderRadius: "8px",
//     cursor: "pointer"
//   }
// };


// export default Pay;







import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import api from "../api/axios";
import { getOrderByIdApi } from "../api/ordersApi";
import toast from "react-hot-toast";

const Pay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId: paramOrderId } = useParams();

  const orderId = location.state?.orderId || paramOrderId;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Coupon + calculation states
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const isDirectBuy = order?.orderType === "direct";

  /* ================= FETCH ORDER ================= */
  useEffect(() => {
    if (!orderId) {
      navigate("/");
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await getOrderByIdApi(orderId);
        setOrder(res.data);

        setDiscount(res.data.discount || 0);
        setTaxAmount(res.data.taxAmount || 0);
        setFinalAmount(res.data.totalAmount || 0);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  /* ================= BODY SCROLL LOCK ================= */
  useEffect(() => {
    document.body.style.overflow = showCancelModal ? "hidden" : "auto";
  }, [showCancelModal]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  /* ================= APPLY COUPON ================= */
  const applyCoupon = async () => {
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    setCouponError("");

    try {
      const { data } = await api.post("/api/coupons/apply-on-order", {
        orderId,
        code: couponCode.trim()
      });

      setDiscount(data.discount);
      setTaxAmount(data.taxAmount);
      setFinalAmount(data.totalAmount);
    } catch (err) {
      setCouponError(err.response?.data?.message || "Failed to apply coupon");

      setDiscount(order.discount || 0);
      setTaxAmount(order.taxAmount || 0);
      setFinalAmount(order.totalAmount || 0);
    } finally {
      setCouponLoading(false);
    }
  };

  /* ================= RAZORPAY PAYMENT ================= */
  const handlePay = async () => {
    try {
      const { data } = await api.post("/api/payment/create-order", { orderId });

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "MPACT",
        description: "Order Payment",
        order_id: data.razorpayOrderId,

        handler: async function (response) {
          await api.post("/api/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId
          });

          navigate("/order-success", { state: { orderId } });
        },

        modal: {
          ondismiss: function () {
            document.body.style.overflow = "auto";
            setShowCancelModal(true);
          }
        },

        theme: { color: "#facc15" }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };

  if (!orderId) return <p>No order found</p>;
  if (loading) return <p style={{ color: "white" }}>Loading...</p>;
  if (!order) return <p>Order not found</p>;

  const subtotal =
    order.subtotal ??
    order.orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

  /* ================= UI ================= */
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>ORDER SUMMARY</h2>

        <div style={styles.row}>
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        {/* COUPON INPUT */}
        <div style={styles.couponBox}>
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            disabled={discount > 0}
            onChange={(e) => setCouponCode(e.target.value)}
            style={{
              ...styles.couponInput,
              opacity: discount > 0 ? 0.6 : 1
            }}
          />
          <button
            style={styles.couponBtn}
            onClick={applyCoupon}
            disabled={couponLoading || discount > 0}
          >
            {discount > 0
              ? "Applied"
              : couponLoading
              ? "Applying..."
              : "Apply"}
          </button>
        </div>

        {couponError && <p style={styles.error}>{couponError}</p>}

        {discount > 0 && (
          <div style={{ ...styles.row, color: "#22c55e" }}>
            <span>Coupon Discount</span>
            <span>-₹{discount}</span>
          </div>
        )}

        <div style={styles.row}>
          <span>Tax</span>
          <span>₹{taxAmount.toFixed(2)}</span>
        </div>

        <hr />

        <div style={styles.total}>
          <span>Total</span>
          <span>₹{finalAmount.toFixed(2)}</span>
        </div>

        <button style={styles.btn} onClick={handlePay}>
          PROCEED TO PAY
        </button>
      </div>

      {/* CANCEL MODAL */}
      {showCancelModal && (
        <div style={cancelStyles.overlay}>
          <div style={cancelStyles.modal}>
            <h3 style={{ color: "#facc15" }}>Payment Cancelled</h3>
            <p>You cancelled the payment.</p>

            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <button
                style={cancelStyles.primary}
                onClick={() =>
                  navigate(isDirectBuy ? "/" : "/cart")
                }
              >
                {isDirectBuy ? "Go Home" : "Go to Cart"}
              </button>
              <button
                style={cancelStyles.secondary}
                onClick={() => setShowCancelModal(false)}
              >
                Stay here
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const styles = {
  page: {
    minHeight: "100vh",
    background: "#2f2f2f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  card: {
    width: "380px",
    border: "2px solid #facc15",
    borderRadius: "18px",
    padding: "28px"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "14px"
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#facc15",
    marginBottom: "20px"
  },
  btn: {
    width: "100%",
    height: "48px",
    background: "#facc15",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  couponBox: {
    display: "flex",
    gap: "8px",
    margin: "16px 0"
  },
  couponInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #facc15",
    background: "transparent",
    color: "white"
  },
  couponBtn: {
    background: "#facc15",
    border: "none",
    borderRadius: "8px",
    padding: "0 14px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  couponBadge: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    border: "1px solid #facc15",
    borderRadius: "999px",
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: "bold",
    color: "#facc15",
    background: "rgba(250,204,21,0.15)",
    marginBottom: "10px"
  },
  error: {
    color: "#ef4444",
    fontSize: "14px",
    marginBottom: "10px"
  }
};

const cancelStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  modal: {
    background: "#1f1f1f",
    border: "2px solid #facc15",
    borderRadius: "12px",
    padding: "24px",
    width: "320px",
    textAlign: "center",
    color: "white"
  },
  primary: {
    background: "#facc15",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  secondary: {
    background: "transparent",
    border: "1px solid #facc15",
    color: "#facc15",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default Pay;
