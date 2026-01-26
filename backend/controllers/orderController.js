// import Order from "../models/Order.js";
// import Cart from "../models/Cart.js";
// import Coupon from "../models/Coupon.js";
// import sendEmail from "../utils/sendEmail.js";

// // ✅ PLACE ORDER (Checkout)


// export const placeOrder = async (req, res) => {
//   try {
//     const { shippingAddress, paymentMethod, orderItems: directOrderItems } = req.body;

//     let orderItems = [];
//     let finalAmount = 0;
//     let cart = null;
//     const orderType = directOrderItems?.length ? "direct" : "cart";

//     // ⚡ DIRECT BUY FLOW
//     if (orderType === "direct") {
//       orderItems = directOrderItems.map(item => ({
//         product: item.product,
//         name: item.name,
//         quantity: item.qty,
//         price: item.price,
//         image: item.image || ""
//       }));

//       finalAmount = orderItems.reduce(
//         (acc, item) => acc + item.price * item.quantity,
//         0
//       );
//     }
//     // 🛒 CART CHECKOUT FLOW
//     else {
//       cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

//       if (!cart || cart.items.length === 0) {
//         return res.status(400).json({ message: "Cart is empty" });
//       }

//       orderItems = cart.items.map(item => ({
//         product: item.product._id,
//         name: item.product.name,
//         quantity: item.quantity,
//         price: item.price,
//         image: item.product.images?.[0]?.url || ""
//       }));

//       finalAmount = cart.totalPrice;

//       if (cart.appliedCoupon) {
//         finalAmount = Math.max(cart.totalPrice - cart.appliedCoupon.discount, 0);
//       }
//     }

//     // 📊 TAX
//     const TAX_RATE = 0.05;
//     const taxAmount = finalAmount * TAX_RATE;
//     const grandTotal = finalAmount + taxAmount;

//     // 🔒 PREVENT DUPLICATE PENDING ORDERS
//     let existingPending = null;

//     if (orderType === "cart") {
//       existingPending = await Order.findOne({
//         user: req.user._id,
//         paymentStatus: "pending",
//         orderType: "cart"
//       });
//     } else {
//       existingPending = await Order.findOne({
//         user: req.user._id,
//         paymentStatus: "pending",
//         orderType: "direct"
//       });
//     }

//     if (existingPending) {
//       return res.status(200).json(existingPending);
//     }

//     // 📝 CREATE ORDER
//     const order = await Order.create({
//       user: req.user._id,
//       orderItems,
//       shippingAddress,
//       paymentMethod: paymentMethod || "Razorpay",
//       taxAmount,
//       totalAmount: grandTotal,
//       orderStatus: "placed",
//       paymentStatus: "pending",
//       orderType
//     });

//     res.status(201).json(order);

//   } catch (error) {
//     console.error("Place Order Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };





// // ✅ Get logged-in user's orders

// export const getMyOrders = async (req, res) => {
//   try {
//     console.log("USER ID:", req.user?._id);

//     const orders = await Order.find({ user: req.user._id })
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (error) {
//     console.error("🔥 Get My Orders Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };



// // ✅ Get single order
// export const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate(
//       "user",
//       "name email"
//     );

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// export const cancelOrder = async (req, res) => {
//   try {
//     const { cancelledBy } = req.body;

//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     if (order.orderStatus === "delivered") {
//       return res.status(400).json({ message: "Delivered orders cannot be cancelled" });
//     }

//     if (order.paymentStatus === "expired") {
//   return res.status(400).json({ message: "Order already expired" });
// }
//     order.orderStatus = "cancelled";
//     order.paymentStatus = order.paymentStatus === "paid" ? "refunded" : "cancelled";
//     order.cancelledBy = cancelledBy || "user";

//     await order.save();

//     res.json({ message: "Order cancelled successfully", order });
//   } catch (error) {
//     console.error("Cancel Order Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };







import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Coupon from "../models/Coupon.js";
import sendEmail from "../utils/sendEmail.js";

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
    const { shippingAddress, paymentMethod, orderItems: directOrderItems } = req.body;

    let orderItems = [];
    let subtotal = 0;
    let discount = 0;
    let cart = null;
    const orderType = directOrderItems?.length ? "direct" : "cart";

    /* ================= DIRECT BUY FLOW ================= */
    if (orderType === "direct") {
      orderItems = directOrderItems.map(item => ({
        product: item.product,
        name: item.name,
        quantity: item.qty,
        price: item.price,
        image: item.image || ""
      }));

      subtotal = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
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

      /* 🎟 COUPON DISCOUNT */
      if (cart.appliedCoupon) {
        discount = cart.appliedCoupon.discount || 0;

        const coupon = await Coupon.findOne({
          code: cart.appliedCoupon.code
        });

        // 🔐 Product-level usage tracking
        if (coupon && cart.appliedCoupon.products?.length) {
          for (const applied of cart.appliedCoupon.products) {
            const rule = coupon.applicableProducts.find(
              (r) => r.product.toString() === applied.product.toString()
            );

            if (rule) {
              if (!Array.isArray(rule.usedBy)) {
                rule.usedBy = [];
              }

              if (!rule.usedBy.some(id => id.toString() === req.user._id.toString())) {
                rule.usedBy.push(req.user._id);
              }
            }
          }
          await coupon.save();
        }
      }
    }

    /* ================= PRICE CALCULATION ================= */
    const taxableAmount = Math.max(subtotal - discount, 0);
    const TAX_RATE = 0.05;
    const taxAmount = taxableAmount * TAX_RATE;
    const totalAmount = taxableAmount + taxAmount;

    /* ================= PREVENT DUPLICATE PENDING ================= */
    const existingPending = await Order.findOne({
      user: req.user._id,
      paymentStatus: "pending",
      orderType
    });

    if (existingPending) {
      return res.status(200).json(existingPending);
    }

    /* ================= CREATE ORDER ================= */
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || "Razorpay",
      subtotal,
      discount,
      taxAmount,
      totalAmount,
      orderStatus: "placed",
      paymentStatus: "pending",
      orderType
    });

    /* ================= EMAIL ================= */
    await sendEmail({
      to: req.user.email,
      subject: "Order Placed Successfully",
      text: `Your order (${order._id}) has been placed successfully.

Subtotal: ₹${subtotal}
Discount: -₹${discount}
Tax: ₹${taxAmount.toFixed(2)}
Total: ₹${totalAmount.toFixed(2)}`
    });

    /* ================= CLEAR CART ================= */
    if (cart) {
      cart.items = [];
      cart.appliedCoupon = null;
      await cart.save();
    }

    res.status(201).json(order);

  } catch (error) {
    console.error("Place Order Error:", error);
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

