import crypto from "crypto";
import razorpay from "../utils/razorpay.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Coupon from "../models/Coupon.js";
import sendEmail from "../utils/sendEmail.js";
import { sendOrderConfirmation } from "../utils/sendWhatsappOTP.js";

// Hard-coded shipping charge (₹40). Not stored on the order document and
// not derived from the client - always computed here so it can't be
// tampered with, and always added exactly once per Razorpay order created.
const SHIPPING_CHARGE = 40;

/* =========================================================
   CREATE RAZORPAY ORDER
========================================================= */
export const createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔐 Ownership check

    console.log("AUTH CHECK →", {
      orderUser: order.user.toString(),
      reqUser: req.user?._id?.toString()
    });

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // 🚫 Payment state guard (MOST IMPORTANT)
    if (
      order.paymentStatus !== "pending" ||
      order.orderStatus !== "initiated"
    ) {
      return res.status(400).json({
        message: "Payment not allowed for this order state"
      });
    }

    // 💰 Amount validation
    if (!order.totalAmount || order.totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid order amount" });
    }

    // order.totalAmount is the coupon/tax-adjusted order total and never
    // includes shipping. Shipping is added here, once, on top of it -
    // req.body.shippingCharge (if the client sends one) is ignored so a
    // tampered request can't change what's actually charged.
    const amount = Number(order.totalAmount) + SHIPPING_CHARGE;

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise, includes shipping
      currency: "INR",
      receipt: `order_${order._id}`
    });

    res.status(200).json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error("Create payment order error:", error);
    res.status(500).json({
      message: "Failed to create payment order",
      error: error.message
    });
  }
};



/* =========================================================
   VERIFY PAYMENT
========================================================= */
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body;

    console.log("====================================");
    console.log("PAYMENT VERIFICATION START");
    console.log("====================================");
    console.log("Order ID:", orderId);
    console.log("Razorpay Order ID:", razorpay_order_id);
    console.log("Payment ID:", razorpay_payment_id);
    console.log("Request Body:", JSON.stringify(req.body, null, 2));

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !orderId
    ) {
      return res.status(400).json({ message: "Invalid payment data" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    console.log("====================================");
    console.log("Before signature verification");
    console.log("====================================");

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    console.log("====================================");
    console.log("After signature verification");
    console.log("Expected Signature:", expectedSignature);
    console.log("Received Signature:", razorpay_signature);
    console.log("====================================");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // const order = await Order.findById(orderId);
    const order = await Order.findById(orderId).populate("user", "email name");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (order.orderStatus === "cancelled") {
      return res.status(400).json({ message: "Order was cancelled" });
    }

    // 🔐 Prevent duplicate verification
    if (order.paymentStatus === "paid") {
      return res.status(400).json({ message: "Order already paid" });
    }

    /* ================= UPDATE ORDER ================= */
    console.log("====================================");
    console.log("Before updating order");
    console.log("====================================");

    order.paymentStatus = "paid";
    order.orderStatus = "placed";
    // order.isVisible = true;
    order.paymentResult = {
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature
    };

    await order.save();

    console.log("====================================");
    console.log("After updating order");
    console.log("Order Status:", order?.orderStatus);
    console.log("Payment Status:", order?.paymentStatus);
    console.log("====================================");

    /* ================= RAZORPAY ORDER CONFIRMATION ================= */
    // Only after successful payment verification do we send the order
    // confirmation WhatsApp, because a pending or failed order must not send
    // a confirmation message prematurely.
    try {
      console.log("====================================");
      console.log("Before populate()");
      console.log("====================================");

      const orderWithDetails = await Order.findById(order._id)
        .populate("user", "name phone email")
        .populate("orderItems.product", "name")
        .populate("shippingAddress");

      console.log("====================================");
      console.log("After populate()");
      console.log("Populated order:", JSON.stringify(orderWithDetails, null, 2));
      console.log("====================================");

      console.log("====================================");
      console.log("Before sendOrderConfirmation()");
      console.log("====================================");

      await sendOrderConfirmation(orderWithDetails);

      console.log("====================================");
      console.log("After sendOrderConfirmation()");
      console.log("PAYMENT VERIFIED");
      console.log("WhatsApp order confirmation completed.");
      console.log("====================================");
    } catch (error) {
      console.error("====================================");
      console.error("FUNCTION NAME: verifyPayment -> sendOrderConfirmation");
      console.error(error);
      console.error(error.stack);
      if (error.response) {
        console.error("STATUS:", error.response.status);
        console.error("DATA:", JSON.stringify(error.response.data, null, 2));
      }
      console.error("====================================");
    }

    /* ================= COUPON REDEEM ================= */

    if (order.appliedCoupon?.code) {

      const coupon = await Coupon.findOne({
        code: order.appliedCoupon.code
      });

      if (coupon) {

        const userId = order.user._id;

        /* USER ONE TIME COUPON */

        if (
          !coupon.usersUsed.some(
            id => id.toString() === userId.toString()
          )
        ) {
          coupon.usersUsed.push(userId);
        }

        /* GLOBAL COUNT */

        coupon.usedCount = (coupon.usedCount || 0) + 1;

        /* PRODUCT LEVEL LOCK */

        for (const item of order.orderItems) {

          const rule = coupon.applicableProducts.find(
            r => r.product.toString() === item.product.toString()
          );

          if (rule) {

            if (!Array.isArray(rule.usedBy))
              rule.usedBy = [];

            if (
              !rule.usedBy.some(
                id => id.toString() === userId.toString()
              )
            ) {
              rule.usedBy.push(userId);
            }

          }

        }

        await coupon.save();

      }

    }


    // 📧 Send email (must NOT break payment)
    try {
      if (order.user?.email) {
        await sendEmail({
          to: order.user.email,
          subject: "Order Confirmed",
          text: `Hi ${order.user.name || "Customer"},

Your order (${order._id}) has been successfully placed.
Total Paid: ₹${order.totalAmount}

Thank you for shopping with us!`
        });
      } else {
        console.warn("⚠️ Email skipped: user email missing");
      }
    } catch (emailError) {
      console.error("❌ Email failed:", emailError.message);
    }



    /* ================= COUPON LOCKING ================= */
    if (order.appliedCoupon?.code) {
      const coupon = await Coupon.findOne({
        code: order.appliedCoupon.code
      });

      if (coupon) {
        // Product-level lock
        for (const item of order.orderItems) {
          const rule = coupon.applicableProducts.find(
            (r) => r.product.toString() === item.product.toString()
          );

          if (rule) {
            if (!Array.isArray(rule.usedBy)) {
              rule.usedBy = [];
            }

            // if (!rule.usedBy.some(id => id.toString() === order.user.toString())) {
            //   rule.usedBy.push(order.user);
            // }
            const userId = order.user._id;

            if (!rule.usedBy.some(id => id.toString() === userId.toString())) {
              rule.usedBy.push(userId);
            }

          }
        }

        // Global user lock
        // if (
        //   !coupon.usersUsed.some(id => id.toString() === order.user.toString())
        // ) {
        //   coupon.usersUsed.push(order.user);
        // }
        if (!coupon.usersUsed.some(id => id.toString() === userId.toString())) {
          coupon.usersUsed.push(userId);
        }
        coupon.usedCount = (coupon.usedCount || 0) + 1;


        // coupon.usedCount += 1;

        await coupon.save();
      }
    }

    /* ================= CLEAR CART ================= */
    // const cart = await Cart.findOne({ user: order.user });
    const cart = await Cart.findOne({ user: order.user._id });
    if (cart) {
      cart.items = [];
      cart.totalPrice = 0;
      cart.appliedCoupon = null;
      await cart.save();
    }

    res.status(200).json({
      message: "Payment successful",
      order
    });

  } catch (error) {
    console.error("====================================");
    console.error("FUNCTION NAME: verifyPayment");
    console.error(error);
    console.error(error.stack);
    if (error.response) {
      console.error("STATUS:", error.response.status);
      console.error("DATA:", JSON.stringify(error.response.data, null, 2));
    }
    console.error("====================================");
    res.status(500).json({
      message: "Payment verification error",
      error: error.message
    });
  }
};

/* =========================================================
   CANCEL PAYMENT / ORDER
========================================================= */
export const cancelPayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔐 Authorization check
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ❌ Already cancelled
    if (order.orderStatus === "cancelled") {
      return res.status(400).json({ message: "Order already cancelled" });
    }

    // ❌ Paid orders cannot be cancelled here
    if (order.paymentStatus === "paid") {
      return res.status(400).json({ message: "Cannot cancel a paid order" });
    }

    // ✅ Cancel order
    order.paymentStatus = "cancelled";
    order.orderStatus = "cancelled";
    order.cancelledBy = "system"; // or "user" based on caller

    await order.save();

    return res.status(200).json({
      message: "Order cancelled successfully",
      order
    });

  } catch (error) {
    console.error("Cancel payment error:", error);
    return res.status(500).json({ message: error.message });
  }
};
