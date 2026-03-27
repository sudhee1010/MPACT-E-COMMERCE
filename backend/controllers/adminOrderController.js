import Order from "../models/Order.js";
import sendEmail from "../utils/sendEmail.js";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import Inventory from "../models/Inventory.js";
import StockMovement from "../models/StockMovement.js";


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


    if (status === "delivered") {
      return res.status(400).json({
        message: "Use delivery endpoint to mark as delivered"
      });
    }

    const allowedStatuses = [
      "initiated",
      "placed",
      "packed",
      "shipped",
      "cancelled"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status"
      });
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
    // for (const item of order.orderItems) {
    //   const product = await Product.findById(item.product).session(session);

    //   if (!product) {
    //     throw new Error("Product not found");
    //   }

    //   if (product.countInStock < item.quantity) {
    //     throw new Error(`Insufficient stock for ${product.name}`);
    //   }

    //   product.countInStock -= item.quantity;
    //   await product.save({ session });
    // }

    /* ================= REDUCE STOCK ================= */
    for (const item of order.orderItems) {

      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.countInStock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      // ✅ Reduce product stock (your original logic)
      product.countInStock -= item.quantity;
      await product.save({ session });

      // ✅ Reduce inventory stock (NEW – synced logic)
      const inventory = await Inventory.findOne({
        product: item.product,
        warehouse: "Main Warehouse"
      }).session(session);

      if (inventory) {
        if (inventory.currentStock < item.quantity) {
          throw new Error(`Inventory mismatch for ${product.name}`);
        }

        inventory.currentStock -= item.quantity;
        await inventory.save({ session });

        await StockMovement.create([{
          product: item.product,
          warehouse: inventory.warehouse,
          type: "Out",
          quantity: -item.quantity,
          reason: `Order Delivered #${order._id}`
        }], { session });
      }
    }


    /* ================= UPDATE ORDER ================= */
    order.orderStatus = "delivered";
    order.paymentStatus = "paid";
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


export const approveReturn = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.orderStatus !== "return_requested") {
      return res.status(400).json({ message: "No return request found" });
    }

    // 🔁 Add stock back
    for (const item of order.orderItems) {
      // await Product.findByIdAndUpdate(item.product, {
      //   $inc: { countInStock: item.quantity }
      // });
      await Product.findByIdAndUpdate(item.product, {
        $inc: { countInStock: item.quantity }
      });

      await Inventory.findOneAndUpdate(
        { product: item.product, warehouse: "Main Warehouse" },
        { $inc: { currentStock: item.quantity } }
      );

      await StockMovement.create({
        product: item.product,
        warehouse: "Main Warehouse",
        type: "In",
        quantity: item.quantity,
        reason: `Return Approved #${order._id}`
      });

    }

    order.orderStatus = "returned";
    order.paymentStatus = "refunded";
    order.returnApproved = true;

    await order.save();

    res.json({ message: "Return approved", order });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const rejectReturn = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.orderStatus !== "return_requested") {
      return res.status(400).json({ message: "No return request found" });
    }

    order.orderStatus = "delivered";
    order.returnRejected = true;

    await order.save();

    res.json({ message: "Return rejected", order });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const markCODAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only COD allowed
    if (order.paymentMethod !== "COD") {
      return res.status(400).json({ message: "Not a COD order" });
    }

    if (order.paymentStatus === "paid") {
      return res.status(400).json({ message: "Already paid" });
    }

    order.paymentStatus = "paid";

    await order.save();

    res.json({
      message: "Payment marked as paid",
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


