import crypto from "crypto";
import razorpay from "../utils/razorpay.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Coupon from "../models/Coupon.js";
import sendEmail from "../utils/sendEmail.js";


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

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.totalAmount * 100), // paise
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

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !orderId
    ) {
      return res.status(400).json({ message: "Invalid payment data" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

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
    order.paymentStatus = "paid";
    order.orderStatus = "placed";
    // order.isVisible = true;
    order.paymentResult = {
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature
    };

    await order.save();


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
    console.error("Verify payment error:", error);
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
