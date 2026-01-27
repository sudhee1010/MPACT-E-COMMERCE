import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// 🔁 Utility function
// const calculateTotal = (items) =>
//   items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const calculateTotal = (items) =>
  items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );



// ✅ Get logged-in user's cart
// export const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id }).populate(
//       "items.product",
//       "name price originalPrice discountPercent images"
//     );

//     if (cart) {
//       cart.items.forEach(item => {
//         if (item.product?.price) {
//           item.price = item.product.price;
//         }

//         if (item.product?.originalPrice) {
//           item.originalPrice = item.product.originalPrice;
//         } else {
//           item.originalPrice = item.product.price;
//         }
//       });



//       cart.totalPrice = calculateTotal(cart.items);
//       await cart.save();
//     }

//     res.json(cart || { items: [], totalPrice: 0 });
//   } catch (error) {
//     console.error("Get Cart Error:", error);
//     res.status(500).json({ message: "Failed to fetch cart" });
//   }
// };


export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price originalPrice discountPercent images"
    );

    if (cart) {
      cart.items.forEach(item => {
        if (item.product?.price) item.price = item.product.price;
        item.originalPrice = item.product.originalPrice || item.product.price;
      });

      cart.totalPrice = calculateTotal(cart.items);
      await cart.save();
    }

    const TAX_RATE = 0.05;
    const taxAmount = cart ? cart.totalPrice * TAX_RATE : 0;
    const totalWithTax = (cart?.totalPrice || 0) + taxAmount;

    res.json({
      items: cart?.items || [],
      totalPrice: cart?.totalPrice || 0,
      taxAmount,
      totalWithTax
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};



// ✅ Add to cart

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // 🔹 Get product
    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not available" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    // 🔹 SAFE originalPrice fallback
    const originalPrice = product.originalPrice || product.price;

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;

      // 🔥 ALWAYS refresh prices
      existingItem.price = product.price;
      existingItem.originalPrice = originalPrice;

    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        originalPrice: originalPrice
      });
    }

    cart.totalPrice = calculateTotal(cart.items);
    cart.appliedCoupon = null;

    await cart.save();

    // res.json(cart);

    // 🔥 RE-FETCH POPULATED CART
    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price originalPrice discountPercent images"
    );

    res.json(updatedCart);

  } catch (error) {
    console.error("Add To Cart Error:", error);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
};



// ✅ Update quantity
// export const updateCartItem = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;

//     const cart = await Cart.findOne({ user: req.user._id });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const item = cart.items.find(
//       (item) => item.product.toString() === productId
//     );

//     if (!item) return res.status(404).json({ message: "Item not found" });

//     // item.quantity = quantity;
//     if (quantity < 1) {
//       cart.items = cart.items.filter(
//         (i) => i.product.toString() !== productId
//       );
//     } else {
//       item.quantity = quantity;
//     }

//     cart.totalPrice = calculateTotal(cart.items);
//     cart.appliedCoupon = null;
//     await cart.save();

//     res.json(cart);
//   } catch (error) {
//     console.error("Update Cart Item Error:", error);
//     res.status(500).json({ message: "Failed to update cart item" });
//   }
// };

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    // If quantity becomes 0 → remove item
    if (quantity < 1) {
      cart.items = cart.items.filter(
        (i) => i.product.toString() !== productId
      );
    } else {
      item.quantity = quantity;

      // 🔥 Refresh prices always
      item.price = product.price;
      item.originalPrice = product.originalPrice || product.price;
    }

    cart.totalPrice = calculateTotal(cart.items);
    cart.appliedCoupon = null;

    await cart.save();

    // 🔥 RE-FETCH POPULATED CART
    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price originalPrice discountPercent images"
    );

    res.json(updatedCart);
  } catch (error) {
    console.error("Update Cart Item Error:", error);
    res.status(500).json({ message: "Failed to update cart item" });
  }
};



// ✅ Remove item
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    cart.totalPrice = calculateTotal(cart.items);
    cart.appliedCoupon = null;
    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price originalPrice discountPercent images"
    );

    res.json(updatedCart);
  } catch (error) {
    console.error("Remove Cart Item Error:", error);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
};




export const removeCoupon = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.appliedCoupon = null;
    cart.totalPrice = calculateTotal(cart.items);
    await cart.save();

    res.json({ message: "Coupon removed", cart });
  } catch (error) {
    console.error("Remove Coupon Error:", error);
    res.status(500).json({ message: "Failed to remove coupon" });
  }
};

