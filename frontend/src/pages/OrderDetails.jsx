import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [retrying, setRetrying] = useState(false);



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

    useEffect(() => {
        document.body.style.overflow = showCancelModal ? "hidden" : "auto";
    }, [showCancelModal]);



    // const handleRetryPayment = async () => {
    //     if (retrying) return;
    //     setRetrying(true);
    //     try {
    //         const { data } = await api.post("/api/payment/create-order", {
    //             orderId: order._id
    //         });

    //         const options = {
    //             key: data.key,
    //             amount: data.amount,
    //             currency: data.currency,
    //             name: "MPACT",
    //             description: "Retry Order Payment",
    //             order_id: data.razorpayOrderId,

    //             handler: async function (response) {
    //                 await api.post("/api/payment/verify", {
    //                     razorpay_order_id: response.razorpay_order_id,
    //                     razorpay_payment_id: response.razorpay_payment_id,
    //                     razorpay_signature: response.razorpay_signature,
    //                     orderId: order._id
    //                 });

    //                 // window.location.reload(); 
    //                 const refreshed = await api.get(`/api/orders/${order._id}`);
    //                 setOrder(refreshed.data);

    //             },

    //             modal: {
    //                 ondismiss: function () {
    //                     setShowCancelModal(true);
    //                 }
    //             },


    //             theme: { color: "#facc15" }
    //         };

    //         const razorpay = new window.Razorpay(options);
    //         razorpay.open();
    //     } catch (error) {
    //         console.error("Retry payment error:", error);
    //         toast.error("Unable to retry payment");
    //     }
    //     finally {
    //         setRetrying(false);
    //     }
    // };


    const handleRetryPayment = async () => {
        if (retrying) return;
        setRetrying(true);

        try {
            const { data } = await api.post("/api/payment/create-order", {
                orderId: order._id
            });

            if (!data.razorpayOrderId) {
                toast.error("Unable to initiate payment");
                return;
            }

            const options = {
                key: data.key,
                amount: data.amount,
                currency: data.currency,
                name: "MPACT",
                description: "Retry Order Payment",
                order_id: data.razorpayOrderId,

                handler: async function (response) {
                    await api.post("/api/payment/verify", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        orderId: order._id
                    });

                    const refreshed = await api.get(`/api/orders/${order._id}`);
                    setOrder(refreshed.data);
                    toast.success("Payment successful!");
                    navigate(`/orders/${order._id}`);
                },

                modal: {
                    ondismiss: function () {
                        setShowCancelModal(true);
                    }
                },

                theme: { color: "#facc15" }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            console.error("Retry payment error:", error);

            if (error.response?.data?.message === "Order already paid") {
                toast.success("Order already paid");
            } else {
                toast.error("Unable to retry payment");
            }
        } finally {
            setRetrying(false);
        }
    };


    if (loading) {
        return <p style={{ color: "white", textAlign: "center", marginTop: "4rem" }}>Loading order...</p>;
    }

    if (!order) {
        return <p style={{ color: "white", textAlign: "center", marginTop: "4rem" }}>Order not found</p>;
    }


    const canReturn =
        order?.orderStatus === "delivered" &&
        !order?.isReturned &&
        order?.deliveredAt &&
        (new Date() - new Date(order.deliveredAt)) / (1000 * 60 * 60 * 24) <= 7;



    const modalStyles = {
        overlay: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
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
            width: "300px",
            textAlign: "center",
            color: "white"
        },
        primary: {
            background: "#facc15",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
        }
    };


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

        // .badge {
        //   padding: 20px 14px;
        //   border-radius: 20px;
        //   font-size: 0.85rem;
        //   font-weight: bold;
        // }

        // .paid {
        //   background: #22c55e;
        //   color: black;
        // }

        // .pending {
        //   background: #facc15;
        //   color: black;
        // }

        //         .refunded {
//   background: #f97316;
//   color: black;
// }

// .returned {
//   background: #f97316;
//   color: black;
// }

// .cancelled { background: #dc2626; }
// .delivered { background: #22c55e; }
// .processing { background: #3b82f6; }



.status-text {
  font-weight: bold;
  font-size: 0.95rem;
  text-transform: uppercase;
}

.status-paid {
  color: #22c55e; /* green */
}

.status-pending {
  color: #facc15; /* yellow */
}

.status-refunded,
.status-returned {
  color: #f97316; /* orange */
}

.status-cancelled {
  color: #dc2626; /* red */
}

.status-processing {
  color: #3b82f6; /* blue */
}

.status-delivered {
  color: #22c55e;
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
                        {/* <span
                            className={`badge ${order.paymentStatus === "paid"
                                ? "paid"
                                : order.paymentStatus === "refunded"
                                    ? "refunded"
                                    : "pending"
                                }`}
                        >
                            {order.paymentStatus.toUpperCase()}
                        </span> */}

                        <span
                            className={`status-text ${order.paymentStatus === "paid"
                                    ? "status-paid"
                                    : order.paymentStatus === "refunded"
                                        ? "status-refunded"
                                        : "status-pending"
                                }`}
                        >
                            Payment: {order.paymentStatus}
                        </span>


                    </div>

                    {order.paymentStatus === "pending" && order.orderStatus === "initiated" && (
                        <button
                            disabled={retrying}
                            onClick={handleRetryPayment}
                            style={{
                                marginTop: "12px",
                                background: "#facc15",
                                color: "black",
                                border: "none",
                                padding: "10px 18px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                opacity: retrying ? 0.6 : 1,
                                cursor: retrying ? "not-allowed" : "pointer"
                            }}
                        >
                            {retrying ? "Opening..." : "Retry Payment"}
                        </button>
                    )}


                    {order.orderStatus !== "cancelled" &&
                        order.orderStatus !== "delivered" &&
                        order.paymentStatus !== "refunded" && (
                            <button
                                onClick={async () => {
                                    try {
                                        await api.put(`/api/orders/${order._id}/cancel`, {
                                            cancelledBy: "user"
                                        });
                                        const refreshed = await api.get(`/api/orders/${order._id}`);
                                        setOrder(refreshed.data);
                                        toast.success("Order cancelled successfully");
                                    } catch (err) {
                                        toast.error(err.response?.data?.message || "Cancel failed");
                                    }
                                }}
                                style={{
                                    background: "#dc2626",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 18px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    marginTop: "10px"
                                }}
                            >
                                Cancel Order
                            </button>
                        )}


                    {canReturn && (
                        <button
                            onClick={async () => {
                                try {
                                    await api.put(`/api/orders/${order._id}/return`);
                                    const refreshed = await api.get(`/api/orders/${order._id}`);
                                    setOrder(refreshed.data);
                                    toast.success("Order returned & refunded");
                                } catch (err) {
                                    toast.error(err.response?.data?.message || "Return failed");
                                }
                            }}
                            style={{
                                background: "#f97316",
                                color: "black",
                                border: "none",
                                padding: "10px 18px",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                marginTop: "10px"
                            }}
                        >
                            Return Order
                        </button>
                    )}



                    {/* <span
                        className="badge"
                        style={{
                            background:
                                order.orderStatus === "cancelled"
                                    ? "#dc2626"
                                    : order.orderStatus === "returned"
                                        ? "#f97316"
                                        : order.orderStatus === "delivered"
                                            ? "#22c55e"
                                            : "#3b82f6",
                            color: "white",
                            marginLeft: "10px"
                        }}
                    >
                        {order.orderStatus.toUpperCase()}

                    </span> */}

                    <span
                        className={`status-text status-${order.orderStatus}`}
                        style={{ marginLeft: "10px" }}
                    >
                        Order: {order.orderStatus}
                    </span>


                </div>


                {/* ITEMS */}
                <div className="section">
                    <h3>Ordered Items</h3>
                    <div className="items-grid">
                        {order.orderItems.map((item) => (
                            <div className="item-card" key={item._id}>
                                {/* <img src={item.image} alt={item.name} /> */}
                                <img
                                    src={item.image || "/images/Product1.png"}
                                    alt={item.name}
                                />

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
                        <span>Subtotal</span>
                        <span>₹{(order.totalAmount - order.taxAmount).toFixed(2)}</span>
                    </div>
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
                {showCancelModal && (
                    <div style={modalStyles.overlay}>
                        <div style={modalStyles.modal}>
                            <h3 style={{ color: "#facc15", marginBottom: "12px" }}>
                                Payment Cancelled
                            </h3>
                            <p style={{ marginBottom: "20px" }}>
                                You cancelled the payment. You can retry again anytime.
                            </p>
                            {/* <button
                                style={modalStyles.primary}
                                onClick={() => setShowCancelModal(false)}
                            >
                                OK
                            </button> */}
                            <button
                                style={modalStyles.primary}
                                onClick={async () => {
                                    const refreshed = await api.get(`/api/orders/${order._id}`);
                                    setOrder(refreshed.data);
                                    setShowCancelModal(false);
                                }}
                            >
                                OK
                            </button>

                        </div>
                    </div>
                )}


            </div>
        </>
    );
}

