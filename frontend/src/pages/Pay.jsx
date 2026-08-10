import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import api from "../api/axios";
import { getOrderByIdApi } from "../api/ordersApi";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

// Hard-coded shipping charge (₹40). Not stored in DB, not editable in UI.
const SHIPPING_CHARGE = 40;

const Pay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId: paramOrderId } = useParams();

  const orderId = location.state?.orderId || paramOrderId;
  const shippingAddress = location.state?.shippingAddress;
  const directBuy = location.state?.directBuy;
  const directProduct = location.state?.product;

  const { cartItems, cartMeta, refreshCart } = useCart();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPayDisabled, setIsPayDisabled] = useState(false);
  const [isCodDisabled, setIsCodDisabled] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const currentIsDirectBuy = directBuy || order?.orderType === "direct";

  /* ================= FETCH ORDER SUMMARY ================= */
  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        if (orderId) {
          console.log("Selected Payment Method:", "Pending - order has already been created");
          console.log("Request Payload:", { orderId });

          const res = await getOrderByIdApi(orderId);
          setOrder(res.data);
          setCouponCode(res.data.appliedCoupon?.code || "");
          setDiscount(res.data.discount || 0);
          setTaxAmount(res.data.taxAmount || 0);
          setFinalAmount(res.data.totalAmount || 0);
          setCouponApplied(Boolean(res.data.discount));
          return;
        }

        if (!directBuy && cartItems.length > 0) {
          const currentSubtotal = cartItems.reduce(
            (sum, item) => sum + (item.price || item.product?.price || 0) * item.quantity,
            0
          );

          const taxRate =
            cartMeta.totalWithTax && cartMeta.taxAmount && cartMeta.totalWithTax !== cartMeta.taxAmount
              ? cartMeta.taxAmount / (cartMeta.totalWithTax - cartMeta.taxAmount)
              : 0;

          const draftTaxAmount = currentSubtotal * taxRate;

          setDiscount(0);
          setCouponApplied(false);
          setTaxAmount(draftTaxAmount);
          setFinalAmount(currentSubtotal + draftTaxAmount);
        } else if (directBuy && directProduct) {
          const directSubtotal = Number(directProduct.price || 0) * Number(directProduct.qty || 1);
          setDiscount(0);
          setCouponApplied(false);
          setTaxAmount(0);
          setFinalAmount(directSubtotal);
        }
      } catch (err) {
        console.error("Failed to fetch order summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderSummary();
  }, [orderId, cartItems, cartMeta, directBuy, directProduct]);

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
      let effectiveOrderId = order?._id || orderId;
      let currentOrder = order;

      if (!effectiveOrderId) {
        if (!shippingAddress) {
          throw new Error("Shipping address is required before applying a coupon.");
        }

        const orderPayload = {
          shippingAddress,
          paymentMethod: "Razorpay",
        };

        if (directBuy && directProduct) {
          orderPayload.orderItems = [
            {
              product: directProduct._id,
              name: directProduct.name,
              qty: directProduct.qty,
              price: directProduct.price,
              image: directProduct.image,
            },
          ];
        }

        const { data: createdOrder } = await api.post("/api/orders", orderPayload);
        currentOrder = createdOrder;
        effectiveOrderId = createdOrder._id;

        setOrder(createdOrder);
        setDiscount(createdOrder.discount || 0);
        setTaxAmount(createdOrder.taxAmount || 0);
        setFinalAmount(createdOrder.totalAmount || 0);
      }

      console.log("Applying coupon", {
        orderId: orderId || null,
        effectiveOrderId,
        shippingAddress: Boolean(shippingAddress),
      });

      // Note: the coupon endpoint only ever deals with subtotal/discount/tax.
      // Shipping is never sent here and never discounted - it's added purely
      // client-side for display (and server-side again for payment amount).
      const { data } = await api.post("/api/coupons/apply-on-order", {
        orderId: effectiveOrderId,
        code: couponCode.trim(),
      });

      const updatedOrder = {
        ...(currentOrder || {}),
        discount: data.discount,
        taxAmount: data.taxAmount,
        totalAmount: data.totalAmount,
        appliedCoupon: { code: couponCode.trim(), discount: data.discount },
      };

      setOrder(updatedOrder);
      setDiscount(data.discount);
      setTaxAmount(data.taxAmount);
      setFinalAmount(data.totalAmount);
      setCouponApplied(true);
    } catch (err) {
      setCouponError(err.response?.data?.message || err.message || "Failed to apply coupon");
      setCouponApplied(false);
      setDiscount(order?.discount || 0);
      setTaxAmount(order?.taxAmount || 0);
      setFinalAmount(order?.totalAmount || 0);
    } finally {
      setCouponLoading(false);
    }
  };

  /* ================= RAZORPAY PAYMENT ================= */
  const handlePay = async () => {
    if (isPayDisabled) return;

    try {
      setIsPayDisabled(true);
      let currentOrder = order;
      let createdOrderId = orderId || order?._id;

      if (!createdOrderId) {
        const orderPayload = {
          shippingAddress,
          paymentMethod: "Razorpay",
        };

        if (directBuy && directProduct) {
          orderPayload.orderItems = [
            {
              product: directProduct._id,
              name: directProduct.name,
              qty: directProduct.qty,
              price: directProduct.price,
              image: directProduct.image,
            },
          ];
        }

        console.log("Selected Payment Method:", "Razorpay");
        console.log("Request Payload:", orderPayload);

        const { data: orderData } = await api.post("/api/orders", orderPayload);
        currentOrder = orderData;
        createdOrderId = orderData._id;

        setOrder(orderData);
        setDiscount(orderData.discount || 0);
        setTaxAmount(orderData.taxAmount || 0);
        setFinalAmount(orderData.totalAmount || 0);
      }

      console.log("Selected Payment Method:", "Razorpay");
      console.log("Request Payload:", { orderId: createdOrderId, shippingCharge: SHIPPING_CHARGE });

      // Shipping charge is sent once, alongside the orderId. The backend is
      // responsible for adding it to order.totalAmount exactly once when it
      // builds the Razorpay order (see paymentController.js changes below).
      const { data } = await api.post("/api/payment/create-order", {
        orderId: createdOrderId,
        shippingCharge: SHIPPING_CHARGE,
      });

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "MPACT",
        description: "Order Payment",
        order_id: data.razorpayOrderId,

        handler: async function (response) {
          navigate("/order-success", { state: { orderId: createdOrderId } });

          try {
            console.log("Selected Payment Method:", "Razorpay");
            console.log("Request Payload:", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: createdOrderId,
            });

            await api.post("/api/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: createdOrderId,
            });
          } catch (err) {
            console.error("Verification failed:", err);
          }
        },

        modal: {
          ondismiss: function () {
            document.body.style.overflow = "auto";
            setShowCancelModal(true);
            setIsPayDisabled(false);
          },
        },

        theme: { color: "#facc15" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      setIsPayDisabled(false);
      toast.error("Payment failed");
    }
  };

  /* ================= COD ================= */
  const handleCOD = async () => {
    if (isCodDisabled) return;

    try {
      setIsCodDisabled(true);
      let createdOrderId = orderId || order?._id;
      let createdOrder = order;

      if (!createdOrderId) {
        const orderPayload = {
          shippingAddress,
          paymentMethod: "COD",
          // Backend adds SHIPPING_CHARGE when it computes the stored total -
          // see the /api/orders note below. Nothing to change here.
        };

        if (directBuy && directProduct) {
          orderPayload.orderItems = [
            {
              product: directProduct._id,
              name: directProduct.name,
              qty: directProduct.qty,
              price: directProduct.price,
              image: directProduct.image,
            },
          ];
        }

        console.log("Selected Payment Method:", "COD");
        console.log("Request Payload:", orderPayload);

        const { data } = await api.post("/api/orders", orderPayload);
        createdOrder = data;
        createdOrderId = data._id;
      }

      toast.success("Order placed successfully (Cash on Delivery)");
      navigate("/order-success", { state: { orderId: createdOrderId } });
    } catch (err) {
      console.error(err);
      setIsCodDisabled(false);
      toast.error("Failed to place order");
    }
  };

  if (loading) return <p style={{ color: "white", textAlign: "center", paddingTop: "40px" }}>Loading...</p>;

  const subtotal =
    order?.subtotal ??
    (currentIsDirectBuy
      ? (Number(directProduct?.price || 0) * Number(directProduct?.qty || 1))
      : cartItems.reduce((sum, item) => sum + (item.price || item.product?.price || 0) * item.quantity, 0));

  // Single source of truth for the displayed payable amount. finalAmount
  // itself is left untouched (it's still exactly what the backend returned
  // as order.totalAmount), so re-renders never compound the shipping charge.
  const totalWithShipping = useMemo(
    () => Number(finalAmount || 0) + SHIPPING_CHARGE,
    [finalAmount]
  );

  /* ================= UI ================= */
  return (
    <>
      {/* Injected responsive CSS */}
      <style>{`
        .pay-page {
          min-height: 100vh;
          background: #1b1b1b;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          padding: 16px;
          box-sizing: border-box;
        }

        .pay-card {
          width: 100%;
          max-width: 420px;
          border: 2px solid #facc15;
          border-radius: 18px;
          padding: 28px 24px;
          box-sizing: border-box;
        }

        .pay-card h2 {
          margin: 0 0 20px 0;
          font-size: clamp(16px, 4vw, 20px);
          letter-spacing: 1px;
          color: #facc15;
        }

        .pay-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 14px;
          font-size: clamp(13px, 3.5vw, 15px);
          gap: 8px;
        }

        .pay-total {
          display: flex;
          justify-content: space-between;
          font-size: clamp(16px, 4.5vw, 20px);
          font-weight: bold;
          color: #facc15;
          margin-bottom: 20px;
          gap: 8px;
        }

        .pay-coupon-box {
          display: flex;
          gap: 8px;
          margin: 16px 0;
          flex-wrap: nowrap;
        }

        .pay-coupon-input {
          flex: 1;
          min-width: 0;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #facc15;
          background: transparent;
          color: white;
          font-size: clamp(13px, 3.5vw, 15px);
          outline: none;
          box-sizing: border-box;
        }

        .pay-coupon-input::placeholder {
          color: #aaa;
          font-size: clamp(11px, 3vw, 14px);
        }

        .pay-coupon-btn {
          background: #facc15;
          border: none;
          border-radius: 8px;
          padding: 0 14px;
          cursor: pointer;
          font-weight: bold;
          color: black;
          font-size: clamp(12px, 3vw, 14px);
          white-space: nowrap;
          flex-shrink: 0;
          height: 42px;
        }

        .pay-coupon-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .pay-btn:disabled,
        .pay-cod-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .pay-error {
          color: #ef4444;
          font-size: clamp(12px, 3vw, 14px);
          margin-bottom: 10px;
        }

        .pay-discount-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 14px;
          color: #22c55e;
          font-size: clamp(13px, 3.5vw, 15px);
        }

        .pay-btn {
          width: 100%;
          height: 48px;
          background: #facc15;
          border: none;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          color: black;
          font-size: clamp(13px, 3.5vw, 15px);
          letter-spacing: 0.5px;
          transition: opacity 0.2s;
        }

        .pay-btn:hover {
          opacity: 0.9;
        }

        .pay-cod-btn {
          width: 100%;
          height: 48px;
          background: transparent;
          border: 2px solid #facc15;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          color: #facc15;
          margin-top: 10px;
          font-size: clamp(13px, 3.5vw, 15px);
          letter-spacing: 0.5px;
          transition: background 0.2s, color 0.2s;
        }

        .pay-cod-btn:hover {
          background: rgba(250, 204, 21, 0.1);
        }

        hr.pay-divider {
          border: none;
          border-top: 1px solid #444;
          margin: 8px 0 16px 0;
        }

        /* Cancel Modal */
        .pay-modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.65);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          padding: 16px;
          box-sizing: border-box;
        }

        .pay-modal {
          background: #1f1f1f;
          border: 2px solid #facc15;
          border-radius: 12px;
          padding: 28px 24px;
          width: 100%;
          max-width: 340px;
          text-align: center;
          color: white;
          box-sizing: border-box;
        }

        .pay-modal h3 {
          color: #facc15;
          margin: 0 0 10px 0;
          font-size: clamp(16px, 4vw, 19px);
        }

        .pay-modal p {
          font-size: clamp(13px, 3.5vw, 15px);
          color: #ccc;
          margin: 0;
        }

        .pay-modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .pay-modal-primary {
          background: #facc15;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          color: black;
          font-size: clamp(13px, 3.5vw, 14px);
          flex: 1;
          min-width: 110px;
        }

        .pay-modal-secondary {
          background: transparent;
          border: 1px solid #facc15;
          color: #facc15;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: clamp(13px, 3.5vw, 14px);
          flex: 1;
          min-width: 110px;
        }

        @media (max-width: 400px) {
          .pay-card {
            padding: 20px 16px;
            border-radius: 14px;
          }

          .pay-modal {
            padding: 22px 16px;
          }
        }
      `}</style>

      <div className="pay-page">
        <div className="pay-card">
          <h2>ORDER SUMMARY</h2>

          <div className="pay-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          {/* COUPON INPUT */}
          <div className="pay-coupon-box">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                if (couponApplied) {
                  setCouponApplied(false);
                }
                if (couponError) {
                  setCouponError("");
                }
              }}
              className="pay-coupon-input"
              style={{ opacity: couponLoading ? 0.6 : 1 }}
            />
            <button
              className="pay-coupon-btn"
              onClick={applyCoupon}
              disabled={couponLoading}
            >
              {couponLoading ? "Applying..." : "Apply"}
            </button>
          </div>

          {couponError && <p className="pay-error">{couponError}</p>}

          {couponApplied && (
            <div className="pay-discount-row">
              <span>Coupon Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}

          <div className="pay-row">
            <span>Tax</span>
            <span>₹{taxAmount.toFixed(2)}</span>
          </div>

          <div className="pay-row">
            <span>Shipping</span>
            <span>₹{SHIPPING_CHARGE.toFixed(2)}</span>
          </div>

          <hr className="pay-divider" />

          <div className="pay-total">
            <span>Total</span>
            <span>₹{totalWithShipping.toFixed(2)}</span>
          </div>

          <button className="pay-btn" onClick={handlePay} disabled={isPayDisabled}>
            PROCEED TO PAY
          </button>

          <button className="pay-cod-btn" onClick={handleCOD} disabled={isCodDisabled}>
            CASH ON DELIVERY
          </button>
        </div>

        {/* CANCEL MODAL */}
        {showCancelModal && (
          <div className="pay-modal-overlay">
            <div className="pay-modal">
              <h3>Payment Cancelled</h3>
              <p>You cancelled the payment. What would you like to do?</p>

              <div className="pay-modal-actions">
                <button
                  className="pay-modal-primary"
                  onClick={() => navigate(currentIsDirectBuy ? "/" : "/cart")}
                >
                  {currentIsDirectBuy ? "Go Home" : "Go to Cart"}
                </button>
                <button
                  className="pay-modal-secondary"
                  onClick={() => setShowCancelModal(false)}
                >
                  Stay here
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Pay;
