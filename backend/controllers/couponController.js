import Coupon from "../models/Coupon.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import { calculateCouponDiscount } from "../utils/couponUtils.js";

const SHIPPING_CHARGE = 40;

/* =========================================================
   CREATE COUPON (ADMIN)
========================================================= */
export const createCoupon = async (req, res) => {
  try {
    const exists = await Coupon.findOne({
      code: req.body.code.toUpperCase()
    });

    if (exists) {
      return res.status(400).json({ message: "Coupon already exists" });
    }

    const coupon = await Coupon.create({
      ...req.body,
      code: req.body.code.toUpperCase()
    });

    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================================
   APPLY COUPON ON ORDER (USER)
   RULES:
   - One coupon per order
   - One coupon per user (lifetime)
   - Applies to only ONE UNIT even if qty > 1
   - Global / Product / First-order only
========================================================= */
// export const applyCouponOnOrder = async (req, res) => {
//   try {
//     const { orderId, code } = req.body;

//     /* ===== FETCH ORDER ===== */
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     /* 🔒 ORDER LEVEL LOCK */
//     if (order.couponApplied) {
//       return res.status(400).json({
//         message: "Coupon already applied on this order"
//       });
//     }

//     /* ===== FETCH COUPON ===== */
//     const coupon = await Coupon.findOne({
//       code: code.toUpperCase(),
//       isActive: true,
//       expiryDate: { $gte: new Date() }
//     });

//     if (!coupon) {
//       return res.status(400).json({ message: "Invalid or expired coupon" });
//     }

//     /* 🔐 ONE-TIME PER USER */
//     if (
//       coupon.usersUsed.some(
//         (id) => id.toString() === req.user._id.toString()
//       )
//     ) {
//       return res.status(400).json({
//         message: "You have already used this coupon"
//       });
//     }

//     /* 🧠 FIRST ORDER ONLY */
//     if (coupon.isFirstOrderOnly) {
//       const previousOrder = await Order.findOne({ user: req.user._id, paymentStatus: "paid" });
//       if (previousOrder) {
//         return res.status(400).json({
//           message: "Coupon valid only for first order"
//         });
//       }
//     }

//     /* 🌍 GLOBAL USAGE LIMIT */
//     if (
//       coupon.maxRedemptions > 0 &&
//       coupon.usedCount >= coupon.maxRedemptions
//     ) {
//       return res.status(400).json({
//         message: "Coupon usage limit reached"
//       });
//     }

//     /* ===== CALCULATIONS ===== */
//     let subtotal = 0;
//     let discount = 0;
//     let applied = false;

//     for (const item of order.orderItems) {
//       subtotal += item.price * item.quantity;

//       if (applied) continue;

//       /* 🎯 PRODUCT SPECIFIC */
//       if (coupon.applicableProducts.length > 0) {
//         const allowed = coupon.applicableProducts.some(
//           (p) => p.product.toString() === item.product.toString()
//         );
//         if (!allowed) continue;
//       }

//       /* ✅ APPLY TO ONLY ONE UNIT */
//       const oneUnitPrice = item.price;

//       discount =
//         coupon.discountType === "percentage"
//           ? (oneUnitPrice * coupon.discountValue) / 100
//           : Math.min(coupon.discountValue, oneUnitPrice);

//       applied = true;
//     }

//     if (!applied) {
//       return res.status(400).json({
//         message: "Coupon not applicable to this order"
//       });
//     }

//     /* ===== FINAL TOTAL ===== */
//     const TAX_RATE = 0.05;
//     const taxableAmount = subtotal - discount;
//     const taxAmount = taxableAmount * TAX_RATE;
//     const totalAmount = taxableAmount + taxAmount;

//     /* ===== SAVE ORDER ===== */
//     order.subtotal = subtotal;
//     order.discount = discount;
//     order.taxAmount = taxAmount;
//     order.totalAmount = totalAmount;
//     order.couponApplied = true;

//     order.appliedCoupon = {
//       code: coupon.code,
//       discount
//     };

//     /* 🔐 GLOBAL LOCKS */
//     // coupon.usedCount += 1;
//     // coupon.usersUsed.push(req.user._id);

//     await order.save();
//     // await coupon.save();

//     res.json({
//       message: "Coupon applied successfully",
//       subtotal,
//       discount,
//       taxAmount,
//       totalAmount
//     });
//   } catch (error) {
//     console.error("Apply Coupon Error:", error);
//     res.status(500).json({ message: "Failed to apply coupon" });
//   }
// };


export const applyCouponOnOrder = async (req, res) => {
  try {
    const { orderId, code } = req.body;

    /* ── Fetch order ── */
    const order = await Order.findById(orderId);
    if (!order)
      return res.status(404).json({ message: "Order not found" });

    /* ── Fetch & validate coupon ── */
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
      expiryDate: { $gte: new Date() }
    });

    if (!coupon)
      return res.status(400).json({ message: "Invalid or expired coupon" });

    if (order.couponApplied && order.appliedCoupon?.code === coupon.code)
      return res.status(400).json({ message: "Coupon already applied" });

    /* ── User already used this coupon ── */
    if (coupon.usersUsed.some((id) => id.toString() === req.user._id.toString()))
      return res.status(400).json({ message: "You already used this coupon" });

    /* ── Global usage limit ── */
    if (coupon.maxRedemptions > 0 && coupon.usedCount >= coupon.maxRedemptions)
      return res.status(400).json({ message: "Coupon usage limit reached" });

    /* ── Calculate subtotal ── */
    const subtotal = order.orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    /* ── Calculate discount across ALL eligible items ──
       FIX: iterate every item, use price × quantity (not single unit),
       accumulate discount for each eligible product separately.
    ── */
    const { totalDiscount, appliedProducts, anyEligible } =
      await calculateCouponDiscount(
        coupon,
        order.orderItems,
        req.user._id.toString()
      );

    if (!anyEligible)
      return res.status(400).json({ message: "Coupon not applicable to any item in this order" });

    /* ── Final amounts ── */
    const TAX_RATE = 0.05;
    const taxableAmount = Math.max(subtotal - totalDiscount, 0);
    const taxAmount = Math.round(taxableAmount * TAX_RATE * 100) / 100;
    const totalAmount = Math.round((taxableAmount + taxAmount) * 100) / 100;

    /* ── Persist on order ── */
    order.subtotal = subtotal;
    order.discount = totalDiscount;
    order.taxAmount = taxAmount;
    order.shippingCharge = order.shippingCharge || SHIPPING_CHARGE;
    order.totalAmount = totalAmount + order.shippingCharge;
    order.couponApplied = true;
    order.appliedCoupon = {
      code: coupon.code,
      discount: totalDiscount
    };

    await order.save();

    res.json({
      message: "Coupon applied successfully",
      subtotal,
      discount: totalDiscount,
      appliedProducts,
      taxAmount,
      shippingCharge: order.shippingCharge,
      totalAmount: order.totalAmount
    });

  } catch (error) {
    console.error("Apply Coupon Error:", error);
    res.status(500).json({ message: "Coupon apply failed" });
  }
};

/* =========================================================
   COUPON ANALYTICS (ADMIN)
========================================================= */
export const getCouponAnalytics = async (req, res) => {
  const coupons = await Coupon.find()
    .populate("usersUsed", "name email")
    .populate("applicableProducts.product", "name")
    .populate("applicableProducts.usedBy", "name email");

  res.json(coupons);
};

/* =========================================================
   UPDATE COUPON USAGE LIMIT (ADMIN)
========================================================= */
// export const updateCouponUsageLimit = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { maxRedemptions, productLimits } = req.body;

//     const coupon = await Coupon.findById(id);
//     if (!coupon) {
//       return res.status(404).json({ message: "Coupon not found" });
//     }

//     if (typeof maxRedemptions === "number") {
//       coupon.maxRedemptions = maxRedemptions;
//     }

//     if (Array.isArray(productLimits)) {
//       productLimits.forEach(({ productId, usageLimit }) => {
//         const rule = coupon.applicableProducts.find(
//           (p) => p.product.toString() === productId.toString()
//         );

//         if (rule && typeof usageLimit === "number") {
//           rule.usageLimit = usageLimit;
//         }
//       });
//     }

//     await coupon.save();

//     res.json({
//       message: "Coupon usage limits updated successfully",
//       coupon
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

/* =========================================================
   GET ALL COUPONS (ADMIN)
========================================================= */
export const getCoupons = async (req, res) => {
  const coupons = await Coupon.find()
    .populate("applicableProducts.product", "name price")
    .sort({ createdAt: -1 });

  res.json(coupons);
};

/* =========================================================
   GET SINGLE COUPON (ADMIN)
========================================================= */
export const getCouponById = async (req, res) => {
  const coupon = await Coupon.findById(req.params.id)
    .populate("usersUsed", "name email")
    .populate("applicableProducts.product", "name price");

  if (!coupon) {
    return res.status(404).json({ message: "Coupon not found" });
  }

  res.json(coupon);
};

/* =========================================================
   UPDATE COUPON (ADMIN)
========================================================= */
export const updateCoupon = async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) {
    return res.status(404).json({ message: "Coupon not found" });
  }

  Object.assign(coupon, req.body);
  await coupon.save();

  res.json({ message: "Coupon updated", coupon });
};

/* =========================================================
   DELETE COUPON (ADMIN)
========================================================= */
export const deleteCoupon = async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) {
    return res.status(404).json({ message: "Coupon not found" });
  }

  await coupon.deleteOne();
  res.json({ message: "Coupon deleted successfully" });
};


/* =========================================================
   VALIDATE COUPON FOR FUEL PAGE (DISPLAY ONLY)
========================================================= */
export const validateCouponForFuel = async (req, res) => {
  try {
    const { code } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true
    }).populate("applicableProducts.product", "name price images _id");

    if (!coupon) {
      return res.status(404).json({ message: "Invalid coupon code" });
    }

    if (coupon.expiryDate < new Date()) {
      return res.status(400).json({ message: "Coupon expired" });
    }

    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: "Failed to validate coupon" });
  }
};

/* =========================================================
   VALIDATE COUPON AGAINST CART  (saves to cart.appliedCoupon)
   POST /api/coupons/validate-cart
   Body: { code: string }

   Returns the same shape as applyCouponOnOrder so the Pay page
   can display the discount before an Order document is created.
========================================================= */
export const validateCouponForCart = async (req, res) => {
  try {
    const { code } = req.body;

    /* ── Fetch cart ── */
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price _id"
    );

    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    /* ── Fetch & validate coupon ── */
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
      expiryDate: { $gte: new Date() }
    });

    if (!coupon)
      return res.status(400).json({ message: "Invalid or expired coupon" });

    /* ── User already used ── */
    if (coupon.usersUsed.some((id) => id.toString() === req.user._id.toString()))
      return res.status(400).json({ message: "You already used this coupon" });

    /* ── Global usage limit ── */
    if (coupon.maxRedemptions > 0 && coupon.usedCount >= coupon.maxRedemptions)
      return res.status(400).json({ message: "Coupon usage limit reached" });

    /* ── Build item list compatible with calculateCouponDiscount ── */
    const cartItemsForCalc = cart.items.map((item) => ({
      product: item.product._id || item.product,
      price: item.price || item.product?.price || 0,
      quantity: item.quantity || 1
    }));

    const subtotal = cartItemsForCalc.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    /* ── Calculate discount across ALL eligible cart items ── */
    const { totalDiscount, appliedProducts, anyEligible } =
      await calculateCouponDiscount(
        coupon,
        cartItemsForCalc,
        req.user._id.toString()
      );

    if (!anyEligible)
      return res.status(400).json({ message: "Coupon not applicable to any item in your cart" });

    /* ── Final amounts ── */
    const TAX_RATE = 0.05;
    const taxableAmount = Math.max(subtotal - totalDiscount, 0);
    const taxAmount = Math.round(taxableAmount * TAX_RATE * 100) / 100;
    const shippingCharge = SHIPPING_CHARGE;
    const totalAmount = Math.round((taxableAmount + taxAmount + shippingCharge) * 100) / 100;

    /* ── Persist coupon on cart so placeOrder can re-use it ── */
    cart.appliedCoupon = {
      code: coupon.code,
      discount: totalDiscount,
      products: appliedProducts
    };
    await cart.save();

    res.json({
      message: "Coupon applied to cart",
      subtotal,
      discount: totalDiscount,
      appliedProducts,
      taxAmount,
      shippingCharge,
      totalAmount
    });

  } catch (error) {
    console.error("Validate Cart Coupon Error:", error);
    res.status(500).json({ message: "Failed to validate coupon" });
  }
};