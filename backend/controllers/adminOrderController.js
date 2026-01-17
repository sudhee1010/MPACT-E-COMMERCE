// import Order from "../models/Order.js";
// import sendEmail from "../utils/sendEmail.js";

// // ✅ Admin: Get all orders
// export const getAllOrders = async (req, res) => {
//   try{
//   const orders = await Order.find().populate("user", "name email");
//   res.json(orders);
// } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Admin: Update order status
// export const updateOrderStatus = async (req, res) => {
//   try{
//   const order = await Order.findById(req.params.id);

//   if (!order) {
//     return res.status(404).json({ message: "Order not found" });
//   }

//   order.orderStatus = req.body.status;
//   await order.save();

//       // ✅ Send order status update email
//     await sendEmail({
//       to: order.user.email,
//       subject: "Order Status Updated",
//       text: `Your order (${order._id}) status has been updated to "${order.orderStatus}".`
//     });

//   res.json(order);
// }catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };




import Order from "../models/Order.js";
import sendEmail from "../utils/sendEmail.js";
import mongoose from "mongoose";

// ✅ Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // ✅ Prevent CastError
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id).populate("user", "email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    // ✅ Send order status update email
    await sendEmail({
      to: order.user.email,
      subject: "Order Status Updated",
      text: `Your order (${order._id}) status has been updated to "${order.orderStatus}".`
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
