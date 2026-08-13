import crypto from "crypto";
import razorpay from "../utils/razorpay.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Coupon from "../models/Coupon.js";
import sendEmail from "../utils/sendEmail.js";
import { sendOrderConfirmation } from "../utils/sendWhatsappOTP.js";
import { calculateCouponDiscount } from "../utils/couponUtils.js";

const SHIPPING_CHARGE = 40;

/* =========================================================
   CREATE RAZORPAY ORDER
========================================================= */
export const createPaymentOrder = async (req, res) => {
  try {
    const { orderId, orderItems: directOrderItems, couponCode } = req.body;
    let totalAmount = 0;

    if (orderId) {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      if (order.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }
      totalAmount = Number(order.totalAmount);
    } else {
      let subtotal = 0;
      let discount = 0;
      let orderItems = [];

      if (directOrderItems?.length) {
        orderItems = directOrderItems.map((item) => ({
          product: item.product,
          quantity: item.qty || item.quantity || 1,
          price: item.price,
        }));
        subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      } else {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
        if (!cart || cart.items.length === 0) {
          return res.status(400).json({ message: "Cart is empty" });
        }
        orderItems = cart.items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
        }));
        subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      }

      const codeToValidate = couponCode?.trim();
      if (codeToValidate) {
        const coupon = await Coupon.findOne({
          code: codeToValidate.toUpperCase(),
          isActive: true,
          expiryDate: { $gte: new Date() },
        });
        if (coupon) {
          const { totalDiscount, anyEligible } = await calculateCouponDiscount(
            coupon,
            orderItems,
            req.user._id.toString()
          );
          if (anyEligible) discount = totalDiscount;
        }
      }

      const taxableAmount = Math.max(subtotal - discount, 0);
      const taxAmount = Math.round(taxableAmount * 0.05 * 100) / 100;
      totalAmount = Math.round((taxableAmount + taxAmount + SHIPPING_CHARGE) * 100) / 100;
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid order amount" });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    res.status(200).json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create payment order error:", error);
    res.status(500).json({
      message: "Failed to create payment order",
      error: error.message,
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
      orderId,
      shippingAddress,
      orderItems: directOrderItems,
      couponCode,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
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

    let order;

    // 1. If order already existed in DB
    if (orderId) {
      order = await Order.findById(orderId).populate("user", "email name");
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      if (order.user._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }
      order.paymentStatus = "paid";
      order.orderStatus = "placed";
      order.paymentResult = {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      };
      await order.save();
    } else {
      // 2. Create Order IN DB NOW AFTER VERIFIED PAYMENT
      let orderItems = [];
      let subtotal = 0;
      let discount = 0;
      let appliedCouponObj = null;
      const orderType = directOrderItems?.length ? "direct" : "cart";

      if (orderType === "direct") {
        orderItems = directOrderItems.map((item) => ({
          product: item.product,
          name: item.name,
          quantity: item.qty || item.quantity || 1,
          price: item.price,
          image: item.image || "",
        }));
        subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      } else {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
        if (!cart || cart.items.length === 0) {
          return res.status(400).json({ message: "Cart is empty" });
        }
        orderItems = cart.items.map((item) => ({
          product: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.price,
          image: item.product.images?.[0]?.url || "",
        }));
        subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }

      const codeToValidate = couponCode?.trim();
      if (codeToValidate) {
        const coupon = await Coupon.findOne({
          code: codeToValidate.toUpperCase(),
          isActive: true,
          expiryDate: { $gte: new Date() },
        });
        if (coupon) {
          const { totalDiscount, anyEligible } = await calculateCouponDiscount(
            coupon,
            orderItems,
            req.user._id.toString()
          );
          if (anyEligible) {
            discount = totalDiscount;
            appliedCouponObj = { code: coupon.code, discount: totalDiscount };
          }
        }
      }

      const taxableAmount = Math.max(subtotal - discount, 0);
      const taxAmount = Math.round(taxableAmount * 0.05 * 100) / 100;
      const shippingCharge = SHIPPING_CHARGE;
      const totalAmount = Math.round((taxableAmount + taxAmount + shippingCharge) * 100) / 100;

      order = await Order.create({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod: "Razorpay",
        subtotal,
        discount,
        taxAmount,
        shippingCharge,
        totalAmount,
        couponApplied: discount > 0,
        appliedCoupon: appliedCouponObj,
        orderStatus: "placed",
        paymentStatus: "paid",
        orderType,
        paymentResult: {
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
      });
    }

    /* ================= COUPON REDEEM ================= */
    if (order.appliedCoupon?.code) {
      const coupon = await Coupon.findOne({ code: order.appliedCoupon.code.toUpperCase() });
      if (coupon) {
        const userId = order.user._id || req.user._id;
        if (!coupon.usersUsed.some((id) => id.toString() === userId.toString())) {
          coupon.usersUsed.push(userId);
        }
        coupon.usedCount = (coupon.usedCount || 0) + 1;
        for (const item of order.orderItems) {
          const rule = coupon.applicableProducts?.find(
            (r) => r.product.toString() === item.product.toString()
          );
          if (rule) {
            if (!Array.isArray(rule.usedBy)) rule.usedBy = [];
            if (!rule.usedBy.some((id) => id.toString() === userId.toString())) {
              rule.usedBy.push(userId);
            }
          }
        }
        await coupon.save();
      }
    }

    /* ================= CLEAR CART ================= */
    if (order.orderType !== "direct") {
      const cart = await Cart.findOne({ user: req.user._id });
      if (cart) {
        cart.items = [];
        cart.totalPrice = 0;
        cart.appliedCoupon = null;
        await cart.save();
      }
    }

    /* ================= SEND CONFIRMATIONS ================= */
    try {
      const orderWithDetails = await Order.findById(order._id)
        .populate("user", "name phone email")
        .populate("orderItems.product", "name")
        .populate("shippingAddress");

      await sendOrderConfirmation(orderWithDetails);

      if (orderWithDetails?.user?.email) {
        await sendEmail({
          to: orderWithDetails.user.email,
          subject: "Order Confirmed",
          text: `Hi ${orderWithDetails.user.name || "Customer"},\n\nYour order (${order._id}) has been successfully placed.\nTotal Paid: ₹${order.totalAmount}\n\nThank you for shopping with us!`,
        });
      }
    } catch (msgErr) {
      console.error("Order notification error:", msgErr);
    }

    res.status(200).json({
      message: "Payment successful",
      order,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({
      message: "Payment verification error",
      error: error.message,
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
