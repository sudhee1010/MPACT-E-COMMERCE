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
    const [downloadingInvoice, setDownloadingInvoice] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const [returning, setReturning] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get(`/api/orders/${id}`);
                setOrder(res.data);
            } catch (err) {
                console.error("Failed to load order", err);
                toast.error("Failed to load order details");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    useEffect(() => {
        document.body.style.overflow = showCancelModal ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showCancelModal]);

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
                    try {
                        await api.post("/api/payment/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: order._id
                        });

                        const refreshed = await api.get(`/api/orders/${order._id}`);
                        setOrder(refreshed.data);
                        toast.success("Payment successful!");
                        navigate(`/orders/${order._id}`, { replace: true });
                    } catch (error) {
                        toast.error("Payment verification failed");
                    }
                },

                modal: {
                    ondismiss: function () {
                        setShowCancelModal(true);
                    }
                },

                theme: { color: "#facc15" },
                prefill: {
                    email: order.user?.email || "",
                    contact: order.shippingAddress?.phone || ""
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            console.error("Retry payment error:", error);

            if (error.response?.data?.message === "Order already paid") {
                toast.success("Order already paid");
                const refreshed = await api.get(`/api/orders/${order._id}`);
                setOrder(refreshed.data);
            } else {
                toast.error("Unable to retry payment");
            }
        } finally {
            setRetrying(false);
        }
    };

    const handleDownloadInvoice = async () => {
        if (downloadingInvoice) return;

        setDownloadingInvoice(true);

        try {
            const response = await api.get(`/api/invoice/${order._id}`, {
                responseType: "blob",
            });

            const blob = new Blob([response.data], {
                type: "application/pdf",
            });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `invoice-${order._id}.pdf`;
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Invoice downloaded successfully");

        } catch (error) {
            toast.error("Failed to download invoice");
        } finally {
            setDownloadingInvoice(false);
        }
    };

    const handleCancelOrder = async () => {
        if (cancelling) return;
        setCancelling(true);

        try {
            await api.put(`/api/orders/${order._id}/cancel`, {
                cancelledBy: "user"
            });
            const refreshed = await api.get(`/api/orders/${order._id}`);
            setOrder(refreshed.data);
            toast.success("Order cancelled successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Cancel failed");
        } finally {
            setCancelling(false);
        }
    };

    const handleReturnOrder = async () => {
        if (returning) return;
        setReturning(true);

        try {
            await api.put(`/api/orders/${order._id}/return`);
            const refreshed = await api.get(`/api/orders/${order._id}`);
            setOrder(refreshed.data);
            toast.success("Return request submitted successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Return request failed");
        } finally {
            setReturning(false);
        }
    };

    const refreshOrder = async () => {
        try {
            const res = await api.get(`/api/orders/${id}`);
            setOrder(res.data);
        } catch (error) {
            console.error("Failed to refresh order", error);
        }
    };

    if (loading) {
        return (
            <div className="order-page">
                <div className="loading-state">
                    <p>Loading order details...</p>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="order-page">
                <div className="error-state">
                    <h3>Order Not Found</h3>
                    <p>The order you're looking for doesn't exist.</p>
                    <button onClick={() => navigate("/orders")} className="back-btn">
                        ← Back to Orders
                    </button>
                </div>
            </div>
        );
    }

    const canCancel =
        order?.orderStatus !== "cancelled" &&
        order?.orderStatus !== "delivered" &&
        order?.orderStatus !== "returned" &&
        order?.paymentStatus !== "refunded" &&
        order?.orderStatus !== "shipped";

    const canReturn =
        order?.orderStatus === "delivered" &&
        !order?.isReturned &&
        order?.deliveredAt &&
        (new Date() - new Date(order.deliveredAt)) / (1000 * 60 * 60 * 24) <= 7;

    const canRetryPayment =
        order?.paymentStatus === "pending" &&
        order?.orderStatus === "initiated";

    return (
        <>
            <style>{`
                .order-page {
                    min-height: 100vh;
                    background: #1a1a1a;
                    color: white;
                    padding: 2rem 1rem;
                    // max-width: 1200px;
                    margin: 0 auto;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                @media (min-width: 768px) {
                    .order-page {
                        padding: 3rem 2rem;
                    }
                }

                .back-btn {
                    background: transparent;
                    border: 2px solid #facc15;
                    color: #facc15;
                    padding: 10px 16px;
                    border-radius: 8px;
                    cursor: pointer;
                    margin-bottom: 2rem;
                    font-weight: 600;
                    transition: all 0.2s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                }

                .back-btn:hover {
                    background: #facc15;
                    color: #000;
                }

                .order-header {
                    background: #2a2a2a;
                    border: 2px solid #facc15;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    display: grid;
                    gap: 1.5rem;
                }

                @media (min-width: 768px) {
                    .order-header {
                        grid-template-columns: 1fr auto;
                        align-items: start;
                    }
                }

                .order-id {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #facc15;
                    margin-bottom: 0.5rem;
                }

                .order-date {
                    color: #9ca3af;
                    font-size: 0.9rem;
                }

                .status-section {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .status-badges {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .status-badge {
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .payment-paid { background: #22c55e; color: white; }
                .payment-pending { background: #facc15; color: black; }
                .payment-refunded { background: #f97316; color: white; }
                .order-delivered { background: #22c55e; color: white; }
                .order-processing { background: #3b82f6; color: white; }
                .order-shipped { background: #8b5cf6; color: white; }
                .order-cancelled { background: #dc2626; color: white; }
                .order-returned { background: #f97316; color: white; }
                .order-initiated { background: #9ca3af; color: white; }

                .action-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .action-btn {
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    border: none;
                    transition: all 0.2s ease;
                    min-width: 140px;
                }

                .action-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .retry-btn {
                    background: #facc15;
                    color: black;
                }

                .retry-btn:hover:not(:disabled) {
                    background: #e5b800;
                }

                .cancel-btn {
                    background: #dc2626;
                    color: white;
                }

                .cancel-btn:hover:not(:disabled) {
                    background: #b91c1c;
                }

                .return-btn {
                    background: #f97316;
                    color: white;
                }

                .return-btn:hover:not(:disabled) {
                    background: #ea580c;
                }

                .invoice-btn {
                    background: #22c55e;
                    color: white;
                }

                .invoice-btn:hover:not(:disabled) {
                    background: #16a34a;
                }

                .section {
                    background: #2a2a2a;
                    border: 1px solid #374151;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                }

                .section-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #facc15;
                    margin-bottom: 1.5rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid #facc15;
                }

                .items-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .item-card {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    background: #1f1f1f;
                    border-radius: 8px;
                    border: 1px solid #374151;
                    transition: border-color 0.2s ease;
                }

                .item-card:hover {
                    border-color: #facc15;
                }

                .item-card img {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 8px;
                    border: 2px solid #facc15;
                }

                .item-info {
                    flex: 1;
                }

                .item-name {
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #f9fafb;
                }

                .item-meta {
                    display: flex;
                    gap: 1rem;
                    color: #9ca3af;
                    font-size: 0.9rem;
                }

                .price-summary {
                    background: #2a2a2a;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-top: 2rem;
                }

                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid #374151;
                }

                .summary-row:last-child {
                    border-bottom: none;
                }

                .total-row {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #facc15;
                    margin-top: 0.5rem;
                }

                .shipping-address {
                    line-height: 1.6;
                }

                .shipping-address p {
                    margin: 0.5rem 0;
                }

                .phone-number {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #facc15;
                    font-weight: 600;
                }

                .loading-state,
                .error-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 400px;
                    text-align: center;
                }

                .error-state h3 {
                    color: #facc15;
                    margin-bottom: 1rem;
                }

                .error-state p {
                    color: #9ca3af;
                    margin-bottom: 2rem;
                }

                /* Modal styles */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    padding: 1rem;
                }

                .modal-content {
                    background: #2a2a2a;
                    border: 2px solid #facc15;
                    border-radius: 12px;
                    padding: 2rem;
                    max-width: 400px;
                    width: 100%;
                    text-align: center;
                }

                .modal-title {
                    color: #facc15;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                }

                .modal-message {
                    color: #e5e7eb;
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .modal-button {
                    background: #facc15;
                    color: black;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }

                .modal-button:hover {
                    background: #e5b800;
                }

                @media (max-width: 640px) {
                    .item-card {
                        flex-direction: column;
                    }
                    
                    .item-card img {
                        width: 100%;
                        height: 200px;
                    }
                    
                    .action-buttons {
                        flex-direction: column;
                    }
                    
                    .action-btn {
                        width: 100%;
                    }
                }
            `}</style>

            <div className="order-page">
                <button 
    className="back-btn" 
    onClick={() => {
        navigate("/profile");
        // You can also store the active tab in localStorage or state
        localStorage.setItem("profileActiveTab", "orders");
    }}
    style={{ marginLeft: "10px" }}
>
    ← Back to Profile
</button>

                {/* Order Header */}
                <div className="order-header">
                    <div>
                        <h1 className="order-id">Order #{order._id}</h1>
                        <p className="order-date">
                            {new Date(order.createdAt).toLocaleString('en-IN', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>

                    <div className="status-section">
                        <div className="status-badges">
                            <span className={`status-badge payment-${order.paymentStatus}`}>
                                Payment: {order.paymentStatus.toUpperCase()}
                            </span>
                            <span className={`status-badge order-${order.orderStatus}`}>
                                Order: {order.orderStatus.toUpperCase()}
                            </span>
                        </div>

                        <div className="action-buttons">
                            {canRetryPayment && (
                                <button
                                    className="action-btn retry-btn"
                                    onClick={handleRetryPayment}
                                    disabled={retrying}
                                >
                                    {retrying ? "Opening..." : "Retry Payment"}
                                </button>
                            )}

                            {canCancel && (
                                <button
                                    className="action-btn cancel-btn"
                                    onClick={handleCancelOrder}
                                    disabled={cancelling}
                                >
                                    {cancelling ? "Cancelling..." : "Cancel Order"}
                                </button>
                            )}

                            {canReturn && (
                                <button
                                    className="action-btn return-btn"
                                    onClick={handleReturnOrder}
                                    disabled={returning}
                                >
                                    {returning ? "Processing..." : "Return Order"}
                                </button>
                            )}

                            {order.paymentStatus === "paid" && (
                                <button
                                    className="action-btn invoice-btn"
                                    onClick={handleDownloadInvoice}
                                    disabled={downloadingInvoice}
                                >
                                    {downloadingInvoice ? "Generating..." : "Download Invoice"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Ordered Items */}
                <div className="section">
                    <h2 className="section-title">Ordered Items</h2>
                    <div className="items-grid">
                        {order.orderItems.map((item) => (
                            <div className="item-card" key={item._id}>
                                <img
                                    src={item.image || "/images/Product1.png"}
                                    alt={item.name}
                                />
                                <div className="item-info">
                                    <h3 className="item-name">{item.name}</h3>
                                    <div className="item-meta">
                                        <span>Quantity: {item.quantity}</span>
                                        <span>Price: ₹{item.price.toFixed(2)}</span>
                                        <span>Total: ₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="section">
                    <h2 className="section-title">Shipping Address</h2>
                    <div className="shipping-address">
                        <p><strong>{order.shippingAddress.name || "Customer"}</strong></p>
                        <p>{order.shippingAddress.address}</p>
                        <p>
                            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                        </p>
                        <p className="phone-number">
                            📞 {order.shippingAddress.phone}
                        </p>
                    </div>
                </div>

                {/* Price Summary */}
                <div className="section">
                    <h2 className="section-title">Price Summary</h2>
                    <div className="price-summary">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{(order.totalAmount - order.taxAmount).toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax</span>
                            <span>₹{order.taxAmount.toFixed(2)}</span>
                        </div>
                        {order.shippingPrice > 0 && (
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>₹{order.shippingPrice.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="summary-row total-row">
                            <span>Total Amount</span>
                            <span>₹{order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Cancel Modal */}
                {showCancelModal && (
                    <div className="modal-overlay" onClick={() => setShowCancelModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3 className="modal-title">Payment Cancelled</h3>
                            <p className="modal-message">
                                You cancelled the payment. You can retry again anytime before the order expires.
                            </p>
                            <button
                                className="modal-button"
                                onClick={async () => {
                                    await refreshOrder();
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