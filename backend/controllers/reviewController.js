import Review from "../models/Review.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const productId = req.params.productId;

  // 1️⃣ Check if user purchased product
  const hasPurchased = await Order.findOne({
    user: req.user._id,
    "orderItems.product": productId,
    orderStatus: { $in: ["delivered", "confirmed"] }
  });

  if (!hasPurchased) {
    return res.status(400).json({
      message: "You can review only purchased products"
    });
  }

  // 2️⃣ Create review
  const review = await Review.create({
    user: req.user._id,
    product: productId,
    rating,
    comment
  });

  res.status(201).json(review);
};


export const getProductReviews = async (req, res) => {
  const reviews = await Review.find({
    product: req.params.productId,
    isApproved: true
  }).populate("user", "name");

  res.json(reviews);
};


export const approveReview = async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  review.isApproved = true;
  await review.save();

  // 4️⃣ Recalculate product rating
  const reviews = await Review.find({
    product: review.product,
    isApproved: true
  });

  const product = await Product.findById(review.product);

  product.numReviews = reviews.length;
  product.rating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  await product.save();

  res.json({ message: "Review approved" });
};
