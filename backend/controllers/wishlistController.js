import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// 🔁 Same utility logic as Cart
const calculateTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

/* ======================================
   ✅ TOGGLE WISHLIST (ADD / REMOVE)
====================================== */
export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const user = await User.findById(req.user._id);

    const exists = user.wishlist.some(
      (id) => id.toString() === productId
    );

    if (exists) {
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId
      );
    } else {
      user.wishlist.push(productId);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      action: exists ? "removed" : "added",
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error("Toggle Wishlist Error:", error);
    return res.status(500).json({ message: "Wishlist toggle failed" });
  }
};

/* ======================================
   ✅ GET USER WISHLIST
====================================== */
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "wishlist",
    );

    return res.status(200).json({
      success: true,
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error("Get Wishlist Error:", error);
    return res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

/* ======================================
   ✅ REMOVE ITEM FROM WISHLIST
====================================== */
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { wishlist: productId }
    });

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist"
    });
  } catch (error) {
    console.error("Remove Wishlist Error:", error);
    return res.status(500).json({ message: "Failed to remove wishlist item" });
  }
};

/* ======================================
   ⭐ MOVE WISHLIST → CART (FINAL)
====================================== */
export const moveWishlistToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // 1️⃣ Validate product
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not available" });
    }

    // 2️⃣ Get or create cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
        totalPrice: 0
      });
    }

    // 3️⃣ Add or increment item
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: 1,
        price: product.price
      });
    }

    // 4️⃣ Recalculate cart
    cart.totalPrice = calculateTotal(cart.items);
    cart.appliedCoupon = null;
    await cart.save();

    // 5️⃣ Remove from wishlist
    await User.findByIdAndUpdate(userId, {
      $pull: { wishlist: productId }
    });

    return res.status(200).json({
      success: true,
      message: "Moved from wishlist to cart",
      cart
    });
  } catch (error) {
    console.error("Move Wishlist To Cart Error:", error);
    return res.status(500).json({ message: "Failed to move item to cart" });

  
  }
};

/* ======================================
   ⭐ WISHLIST COUNT (BADGE)
====================================== */
export const getWishlistCount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("wishlist");

    return res.status(200).json({
      success: true,
      count: user.wishlist.length
    });
  } catch (error) {
    console.error("Wishlist Count Error:", error);
    return res.status(500).json({ message: "Failed to fetch wishlist count" });
  }
};
