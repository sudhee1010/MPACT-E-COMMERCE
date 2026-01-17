import Coupon from "../models/Coupon.js";
import Cart from "../models/Cart.js";

/**
 * @desc    Create coupon (Admin)
 * @route   POST /api/coupons
 */
export const createCoupon = async (req, res) => {
  try {
    // Prevent duplicate coupon creation
    const exists = await Coupon.findOne({ code: req.body.code.toUpperCase() });
    if (exists) {
      return res.status(400).json({ message: "Coupon already exists" });
    }

    const coupon = await Coupon.create({
      ...req.body,
      code: req.body.code.toUpperCase()
    });

    res.status(201).json(coupon);
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get all coupons (Admin)
 * @route   GET /api/coupons
 */
export const getCoupons = async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.json(coupons);
};




/**
 * @desc    Apply coupon to cart products
 * @route   POST /api/coupons/apply
 * @access  User
 */
export const applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Coupon code is required" });
    }

    // 1️⃣ Fetch cart
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Prevent re-applying same coupon
    if (cart.appliedCoupon?.code === code.toUpperCase()) {
      return res.status(400).json({ message: "Coupon already applied to cart" });
    }

    // 3️⃣ Fetch coupon
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true
    });

    if (!coupon) {
      return res.status(400).json({ message: "Invalid coupon" });
    }

    // 4️⃣ Expiry validation
    if (coupon.expiryDate < new Date()) {
      return res.status(400).json({ message: "Coupon expired" });
    }

    let totalDiscount = 0;
    const appliedProducts = [];

    // 5️⃣ Apply discount per applicable product
    for (const item of cart.items) {
      const rule = coupon.applicableProducts.find(
        (p) => p.product.toString() === item.product._id.toString()
      );

      if (!rule) continue;

      // Ensure usedBy array exists
      if (!Array.isArray(rule.usedBy)) {
        rule.usedBy = [];
      }

      // Usage checks
      if (rule.usedBy.length >= rule.usageLimit) continue;
      if (rule.usedBy.includes(req.user._id)) continue;

      let discount = 0;

      if (coupon.discountType === "percentage") {
        discount = (item.price * coupon.discountValue) / 100;
      } else {
        discount = coupon.discountValue; // flat discount per allowed product
      }

      totalDiscount += discount;

      appliedProducts.push({
        product: item.product._id,
        discount
      });
    }

    // 6️⃣ No valid product matches
    if (totalDiscount === 0) {
      return res.status(400).json({ message: "Coupon not applicable to cart products" });
    }

    // 7️⃣ Store usage tracking
    for (const applied of appliedProducts) {
      const rule = coupon.applicableProducts.find(
        (r) => r.product.toString() === applied.product.toString()
      );

      if (rule) {
        if (!Array.isArray(rule.usedBy)) rule.usedBy = [];
        rule.usedBy.push(req.user._id);
      }
    }

    await coupon.save();

    // 8️⃣ Recalculate total (in case cart updated)
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // 9️⃣ Save coupon to cart
    cart.appliedCoupon = {
      code: coupon.code,
      discount: totalDiscount,
      products: appliedProducts
    };

    await cart.save();

    res.json({
      message: "Coupon applied successfully",
      originalAmount: totalAmount,
      discount: totalDiscount,
      finalAmount: totalAmount - totalDiscount,
      appliedProducts
    });

  } catch (error) {
    console.error("Apply Coupon Error:", error);
    res.status(500).json({ message: "Failed to apply coupon" });
  }
};


/**
 * @desc    Coupon analytics (Admin)
 * @route   GET /api/coupons/analytics
 */
export const getCouponAnalytics = async (req, res) => {
  const coupons = await Coupon.find()
    .populate("applicableProducts.usedBy", "name email")
    .select("code applicableProducts discountType discountValue");

  res.json(coupons);
};

