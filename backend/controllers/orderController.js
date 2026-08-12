import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Coupon from "../models/Coupon.js";
import sendEmail from "../utils/sendEmail.js";
import Product from "../models/Product.js";
import { sendOrderConfirmation } from "../utils/sendWhatsappOTP.js";
import { calculateCouponDiscount } from "../utils/couponUtils.js";

// Hard-coded shipping charge (₹40), added once when the order's totalAmount
// is computed at creation time - not a separate DB field, not editable.
// Kept in sync with the SHIPPING_CHARGE used in paymentController.js.
const SHIPPING_CHARGE = 40;

/* =========================================================
   PLACE ORDER (CHECKOUT)
   Supports:
   - Cart Checkout
   - Direct Buy
   - Coupon
   - Tax
   - Prevent Duplicate Pending Orders
========================================================= */
export const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, orderItems: directOrderItems, couponCode } = req.body;

    console.log("====================================");
    console.log("PLACE ORDER START");
    console.log("====================================");
    console.log("Request User ID:", req.user?._id?.toString());
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
    console.log("Payment Method:", paymentMethod || "Razorpay");
    console.log("Order Type:", directOrderItems?.length ? "direct" : "cart");

    let orderItems = [];
    let subtotal = 0;
    let discount = 0;
    let appliedCouponObj = null;
    let cart = null;
    const orderType = directOrderItems?.length ? "direct" : "cart";

    /* ================= DIRECT BUY FLOW ================= */
    if (orderType === "direct") {
      orderItems = directOrderItems.map(item => ({
        product: item.product,
        name: item.name,
        quantity: item.qty || item.quantity || 1,
        price: item.price,
        image: item.image || ""
      }));

      subtotal = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      /* 🎟 COUPON DISCOUNT FOR DIRECT BUY */
      const codeToValidate = couponCode?.trim();
      if (codeToValidate) {
        const coupon = await Coupon.findOne({
          code: codeToValidate.toUpperCase(),
          isActive: true,
          expiryDate: { $gte: new Date() }
        });

        if (coupon) {
          const isUsed = coupon.usersUsed.some(id => id.toString() === req.user._id.toString());
          const limitReached = coupon.maxRedemptions > 0 && coupon.usedCount >= coupon.maxRedemptions;

          if (!isUsed && !limitReached) {
            const { totalDiscount, anyEligible } = await calculateCouponDiscount(
              coupon,
              orderItems,
              req.user._id.toString()
            );

            if (anyEligible) {
              discount = totalDiscount;
              appliedCouponObj = {
                code: coupon.code,
                discount: totalDiscount
              };
            }
          }
        }
      }
    }

    /* ================= CART CHECKOUT FLOW ================= */
    else {
      cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      orderItems = cart.items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
        image: item.product.images?.[0]?.url || ""
      }));

      subtotal = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      /* 🎟 COUPON DISCOUNT FOR CART CHECKOUT */
      const codeToValidate = couponCode?.trim() || cart.appliedCoupon?.code;
      if (codeToValidate) {
        const coupon = await Coupon.findOne({
          code: codeToValidate.toUpperCase(),
          isActive: true,
          expiryDate: { $gte: new Date() }
        });

        if (coupon) {
          const { totalDiscount, anyEligible } = await calculateCouponDiscount(
            coupon,
            orderItems,
            req.user._id.toString()
          );

          if (anyEligible) {
            discount = totalDiscount;
            appliedCouponObj = {
              code: coupon.code,
              discount: totalDiscount
            };
          }
        }
      }
    }

    /* ================= PRICE CALCULATION ================= */
    const taxableAmount = Math.max(subtotal - discount, 0);
    const TAX_RATE = 0.05;
    const taxAmount = Math.round(taxableAmount * TAX_RATE * 100) / 100;
    const shippingCharge = SHIPPING_CHARGE;
    const totalAmount = Math.round((taxableAmount + taxAmount + shippingCharge) * 100) / 100;

    /* ================= PREVENT DUPLICATE SAME-CART PENDING ================= */
    if (orderType === "cart" && cart) {
      const existingPending = await Order.findOne({
        user: req.user._id,
        paymentStatus: "pending",
        orderType: "cart",
        totalAmount,
        "orderItems.product": { $all: cart.items.map(i => i.product._id) }
      });

      if (existingPending) {
        return res.status(200).json(existingPending);
      }
    }


    /* ================= CREATE ORDER ================= */
    const isCod = (paymentMethod || "Razorpay").toLowerCase() === "cod";

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || "Razorpay",
      subtotal,
      discount,
      taxAmount,
      shippingCharge,
      totalAmount,
      couponApplied: discount > 0,
      appliedCoupon: appliedCouponObj,
      orderStatus: isCod ? "placed" : "initiated",
      paymentStatus: "pending",
      orderType
    });

    console.log("====================================");
    console.log("After Order.create()");
    console.log("Order ID:", String(order._id));
    console.log("Order Status:", order?.orderStatus);
    console.log("Payment Status:", order?.paymentStatus);
    console.log("====================================");

    /* ================= COD ORDER CONFIRMATION ================= */
    // For COD orders we can send the WhatsApp confirmation immediately after
    // the order document is successfully created. Razorpay confirmation is
    // deferred until payment verification succeeds inside paymentController.js.
    console.log("====================================");
    console.log("Before entering the COD block");
    console.log("====================================");

    if ((paymentMethod || "Razorpay").toLowerCase() === "cod") {
      console.log("====================================");
      console.log("COD condition matched");
      console.log("====================================");

      order.orderStatus = "placed";
      await order.save();

      /* ================= COD COUPON REDEEM ================= */
      const couponCodeToRedeem = order.appliedCoupon?.code || cart?.appliedCoupon?.code;
      if (couponCodeToRedeem) {
        const coupon = await Coupon.findOne({ code: couponCodeToRedeem.toUpperCase() });
        if (coupon) {
          if (!coupon.usersUsed.some((id) => id.toString() === req.user._id.toString())) {
            coupon.usersUsed.push(req.user._id);
          }
          coupon.usedCount = (coupon.usedCount || 0) + 1;
          for (const item of order.orderItems) {
            const rule = coupon.applicableProducts.find(
              (r) => r.product.toString() === item.product.toString()
            );
            if (rule) {
              if (!Array.isArray(rule.usedBy)) rule.usedBy = [];
              if (!rule.usedBy.some((id) => id.toString() === req.user._id.toString())) {
                rule.usedBy.push(req.user._id);
              }
            }
          }
          await coupon.save();
        }
      }

      /* ================= COD CLEAR CART ================= */
      if (cart) {
        cart.items = [];
        cart.totalPrice = 0;
        cart.appliedCoupon = null;
        await cart.save();
      }

      try {
        const orderWithDetails = await Order.findById(order._id)
          .populate("user", "name phone email")
          .populate("orderItems.product", "name")
          .populate("shippingAddress");

        await sendOrderConfirmation(orderWithDetails);
      } catch (error) {
        console.error("COD sendOrderConfirmation error:", error);
      }
    } else {
      console.log("====================================");
      console.log("COD condition skipped");
      console.log("====================================");
    }

    /* ================= EMAIL ================= */
    //     await sendEmail({
    //       to: req.user.email,
    //       subject: "Order Placed Successfully",
    //       text: `Your order (${order._id}) has been placed successfully.

    // Subtotal: ₹${subtotal}
    // Discount: -₹${discount}
    // Tax: ₹${taxAmount.toFixed(2)}
    // Total: ₹${totalAmount.toFixed(2)}`
    //     });

    /* ================= CLEAR CART ================= */
    // if (cart) {
    //   cart.items = [];
    //   cart.appliedCoupon = null;
    //   await cart.save();
    // }

    res.status(201).json(order);

  } catch (error) {
    console.error("====================================");
    console.error("FUNCTION NAME: placeOrder");
    console.error(error);
    console.error(error.stack);
    if (error.response) {
      console.error("STATUS:", error.response.status);
      console.error("DATA:", JSON.stringify(error.response.data, null, 2));
    }
    console.error("====================================");
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   GET LOGGED-IN USER ORDERS
========================================================= */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get My Orders Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   GET SINGLE ORDER BY ID (SECURE)
========================================================= */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔒 Only owner can view
    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    console.error("Get Order By Id Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   CANCEL ORDER
========================================================= */
export const cancelOrder = async (req, res) => {
  try {
    const { cancelledBy } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.orderStatus === "delivered") {
      return res.status(400).json({ message: "Delivered orders cannot be cancelled" });
    }

    if (order.paymentStatus === "expired") {
      return res.status(400).json({ message: "Order already expired" });
    }

    order.orderStatus = "cancelled";
    order.paymentStatus = order.paymentStatus === "paid" ? "refunded" : "cancelled";
    order.cancelledBy = cancelledBy || "user";

    await order.save();

    res.json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.error("Cancel Order Error:", error);
    res.status(500).json({ message: error.message });
  }
};





export const requestReturn = async (req, res) => {
  try {
    // const { reason } = req.body;
    const reason = req.body?.reason || null;


    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (order.orderStatus !== "delivered") {
      return res.status(400).json({ message: "Only delivered orders can be returned" });
    }

    if (order.orderStatus === "return_requested") {
      return res.status(400).json({ message: "Return already requested" });
    }

    const now = new Date();
    const diffDays =
      (now - new Date(order.deliveredAt)) / (1000 * 60 * 60 * 24);

    if (diffDays > 7) {
      return res.status(400).json({ message: "Return window expired" });
    }

    order.orderStatus = "return_requested";
    order.returnReason = reason;
    order.returnedAt = now;

    await order.save();

    res.json({ message: "Return request submitted", order });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePaymentMethod = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentMethod = paymentMethod;

    if (paymentMethod === "COD") {
      order.orderStatus = "placed";
      order.paymentStatus = "pending";

      /* 🎟 COD COUPON REDEEM */
      const couponCodeToRedeem = order.appliedCoupon?.code;
      if (couponCodeToRedeem) {
        const coupon = await Coupon.findOne({ code: couponCodeToRedeem.toUpperCase() });
        if (coupon) {
          if (!coupon.usersUsed.some((id) => id.toString() === req.user._id.toString())) {
            coupon.usersUsed.push(req.user._id);
          }
          coupon.usedCount = (coupon.usedCount || 0) + 1;
          for (const item of order.orderItems) {
            const rule = coupon.applicableProducts?.find(
              (r) => r.product.toString() === item.product.toString()
            );
            if (rule) {
              if (!Array.isArray(rule.usedBy)) rule.usedBy = [];
              if (!rule.usedBy.some((id) => id.toString() === req.user._id.toString())) {
                rule.usedBy.push(req.user._id);
              }
            }
          }
          await coupon.save();
        }
      }

      /* 🛒 CLEAR CART IF CART CHECKOUT */
      if (order.orderType !== "direct") {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
          cart.items = [];
          cart.totalPrice = 0;
          cart.appliedCoupon = null;
          await cart.save();
        }
      }

      /* 📱 SEND ORDER CONFIRMATION */
      try {
        const orderWithDetails = await Order.findById(order._id)
          .populate("user", "name phone email")
          .populate("orderItems.product", "name")
          .populate("shippingAddress");

        await sendOrderConfirmation(orderWithDetails);
      } catch (error) {
        console.error("Order confirmation send error:", error);
      }
    }

    await order.save();

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
