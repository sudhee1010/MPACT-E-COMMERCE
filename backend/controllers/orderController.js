import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Coupon from "../models/Coupon.js";
import sendEmail from "../utils/sendEmail.js";

// ✅ PLACE ORDER (Checkout)

export const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 🧾 Prepare order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.price,
      image: item.product.images[0]
    }));

    // 💰 Base final amount
    let finalAmount = cart.totalPrice;

    // 🎟 Apply coupon at checkout
    if (cart.appliedCoupon) {
      finalAmount = Math.max(cart.totalPrice - cart.appliedCoupon.discount, 0);

      const coupon = await Coupon.findOne({ code: cart.appliedCoupon.code });

      // 🔹 Product-level usage tracking
      if (coupon && cart.appliedCoupon.products?.length) {
        for (const applied of cart.appliedCoupon.products) {
          const rule = coupon.applicableProducts.find(
            (r) => r.product.toString() === applied.product.toString()
          );

          if (rule) {
            if (!Array.isArray(rule.usedBy)) {
              rule.usedBy = [];
            }

            // Avoid duplicate push
            if (!rule.usedBy.includes(req.user._id)) {
              rule.usedBy.push(req.user._id);
            }
          }
        }

        await coupon.save();
      }
    }

    // 📊 Tax
    const TAX_RATE = 0.05;
    const taxAmount = finalAmount * TAX_RATE;
    const grandTotal = finalAmount + taxAmount;

    // 📝 Create order
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxAmount,
      totalAmount: grandTotal,
      orderStatus: "placed",
      paymentStatus: "pending"
    });

    // 📩 Send email
    await sendEmail({
      to: req.user.email,
      subject: "Order Placed Successfully",
      text: `Your order (${order._id}) has been placed successfully.
Total: ₹${grandTotal} (including tax).`
    });


    // 🔹 Clear cart after order
    cart.items.splice(0, cart.items.length);   // clear array safely
    cart.markModified('items');                // force mongoose to detect change
    cart.totalPrice = 0;
    cart.appliedCoupon = null;
    await cart.save();


    res.status(201).json(order);
  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// ✅ Get logged-in user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
