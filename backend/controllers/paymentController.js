// import crypto from "crypto";
// import razorpay from "../utils/razorpay.js";
  import Order from "../models/Order.js";

// // ✅ Create Razorpay order
// export const createPaymentOrder = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     if (!orderId) {
//       return res.status(400).json({ message: "Order ID is required" });
//     }

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     const razorpayOrder = await razorpay.orders.create({
//       amount: order.totalAmount * 100, // paise
//       currency: "INR",
//       receipt: `order_${order._id}`
//     });

//     res.status(200).json({
//       razorpayOrderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       key: process.env.RAZORPAY_KEY_ID
//     });
//   } catch (error) {
//     console.error("Create payment order error:", error);
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

//     order.paymentStatus = "paid";
//     order.orderStatus = "placed";

//     await order.save();

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

// DEV ONLY – MOCK PAYMENT (NO RAZORPAY REQUIRED)
export const mockPaymentSuccess = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "placed";
    order.paymentMethod = "mock";

    await order.save();

    res.status(200).json({
      message: "Mock payment successful",
      order
    });
  } catch (error) {
    console.error("Mock payment error:", error);
    res.status(500).json({
      message: "Mock payment failed",
      error: error.message
    });
  }
};
