// import crypto from "crypto";
// import razorpay from "../utils/razorpay.js";
// import Order from "../models/Order.js";
// import Cart from "../models/Cart.js";


// // ✅ Create Razorpay order
// export const createPaymentOrder = async (req, res) => {
//   try {
//     // console.log("👉 createPaymentOrder hit");
//     // console.log("Request body:", req.body);

//     const { orderId } = req.body;

//     if (!orderId) {
//       return res.status(400).json({ message: "Order ID is required" });
//     }

//     // ✅ Declare order FIRST
//     const order = await Order.findById(orderId);
//     // console.log("Fetched order:", order);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     if (order.paymentStatus === "paid") {
//       return res.status(400).json({ message: "Order already paid" });
//     }

//     if (!order.totalAmount || order.totalAmount <= 0) {
//       return res.status(400).json({ message: "Invalid order amount" });
//     }

//     console.log("Creating Razorpay order for:", order.totalAmount);

//     const razorpayOrder = await razorpay.orders.create({
//       amount: Math.round(order.totalAmount * 100), // paise
//       currency: "INR",
//       receipt: `order_${order._id}`
//     });

//     console.log("Razorpay order created:", razorpayOrder);

//     res.status(200).json({
//       razorpayOrderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       key: process.env.RAZORPAY_KEY_ID
//     });

//   } catch (error) {
//     console.error("❌ Create payment order error:", error);
//     res.status(500).json({
//       message: "Failed to create payment order",
//       error: error.message
//     });
//   }
// };


// // ✅ Verify payment


// export const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderId
//     } = req.body;

//     if (
//       !razorpay_order_id ||
//       !razorpay_payment_id ||
//       !razorpay_signature ||
//       !orderId
//     ) {
//       return res.status(400).json({ message: "Invalid payment data" });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ message: "Payment verification failed" });
//     }

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Prevent duplicate verification
//     if (order.paymentStatus === "paid") {
//       return res.status(400).json({ message: "Order already paid" });
//     }

//     // ✅ Update order
//     order.paymentStatus = "paid";
//     order.orderStatus = "placed";
//     order.isVisible = true;
//     order.paymentResult = {
//       razorpayOrderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id,
//       razorpaySignature: razorpay_signature
//     };

//     await order.save();

//     // 🧹 Clear cart ONLY after payment success
//     const cart = await Cart.findOne({ user: order.user });
//     if (cart) {
//       cart.items = [];
//       cart.totalPrice = 0;
//       cart.appliedCoupon = null;
//       await cart.save();
//     }

//     res.status(200).json({
//       message: "Payment successful",
//       order
//     });
//   } catch (error) {
//     console.error("Verify payment error:", error);
//     res.status(500).json({
//       message: "Payment verification error",
//       error: error.message
//     });
//   }
// };



// export const cancelPayment = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (!order) return res.status(404).json({ message: "Order not found" });

//     if (order.paymentStatus === "paid") {
//       return res.status(400).json({ message: "Cannot cancel a paid order" });
//     }

//     order.paymentStatus = "cancelled";
//     order.orderStatus = "cancelled";
//     order.cancelledBy = "system";
//     order.isVisible = false;

//     await order.save();
//     res.json({ message: "Order cancelled", order });
//   } catch (error) {
//     console.error("Cancel payment error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };



// // DEV ONLY – MOCK PAYMENT (NO RAZORPAY REQUIRED)
// // export const mockPaymentSuccess = async (req, res) => {
// //   try {
// //     const { orderId } = req.body;

// //     if (!orderId) {
// //       return res.status(400).json({ message: "Order ID is required" });
// //     }

// //     const order = await Order.findById(orderId);
// //     if (!order) {
// //       return res.status(404).json({ message: "Order not found" });
// //     }

// //     order.paymentStatus = "paid";
// //     order.orderStatus = "placed";
// //     order.paymentMethod = "mock";

// //     await order.save();

// //     res.status(200).json({
// //       message: "Mock payment successful",
// //       order
// //     });
// //   } catch (error) {
// //     console.error("Mock payment error:", error);
// //     res.status(500).json({
// //       message: "Mock payment failed",
// //       error: error.message
// //     });
// //   }
// // };





import crypto from "crypto";
import razorpay from "../utils/razorpay.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Coupon from "../models/Coupon.js";

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

    if (order.paymentStatus === "paid") {
      return res.status(400).json({ message: "Order already paid" });
    }

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

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔐 Prevent duplicate verification
    if (order.paymentStatus === "paid") {
      return res.status(400).json({ message: "Order already paid" });
    }

    /* ================= UPDATE ORDER ================= */
    order.paymentStatus = "paid";
    order.orderStatus = "placed";
    order.isVisible = true;
    order.paymentResult = {
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature
    };

    await order.save();

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

            if (!rule.usedBy.some(id => id.toString() === order.user.toString())) {
              rule.usedBy.push(order.user);
            }
          }
        }

        // Global user lock
        if (
          !coupon.usersUsed.some(id => id.toString() === order.user.toString())
        ) {
          coupon.usersUsed.push(order.user);
        }

        coupon.usedCount += 1;

        await coupon.save();
      }
    }

    /* ================= CLEAR CART ================= */
    const cart = await Cart.findOne({ user: order.user });
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

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.paymentStatus === "paid") {
      return res.status(400).json({ message: "Cannot cancel a paid order" });
    }

    order.paymentStatus = "cancelled";
    order.orderStatus = "cancelled";
    order.cancelledBy = "system";
    order.isVisible = false;

    await order.save();
    res.json({ message: "Order cancelled", order });

  } catch (error) {
    console.error("Cancel payment error:", error);
    res.status(500).json({ message: error.message });
  }
};

