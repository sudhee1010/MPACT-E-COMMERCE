import Order from "../models/Order.js";
import sendEmail from "../utils/sendEmail.js";
import mongoose from "mongoose";
import Product from "../models/Product.js";


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



export const markOrderDelivered = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(req.params.id).session(session);

    if (!order) {
      throw new Error("Order not found");
    }

    // ✅ Guards
    if (order.paymentStatus !== "paid") {
      throw new Error("Order is not paid");
    }

    if (order.orderStatus === "delivered") {
      throw new Error("Order already delivered");
    }

    if (order.isStockReduced) {
      throw new Error("Stock already updated for this order");
    }

    /* ================= REDUCE STOCK ================= */
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.countInStock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      product.countInStock -= item.quantity;
      await product.save({ session });
    }

    /* ================= UPDATE ORDER ================= */
    order.orderStatus = "delivered";
    order.deliveredAt = new Date();
    order.isStockReduced = true;

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({
      message: "Order delivered & stock updated successfully",
      order
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      message: error.message
    });
  }
};


