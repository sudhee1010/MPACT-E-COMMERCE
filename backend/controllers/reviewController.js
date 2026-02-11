import Review from "../models/Review.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";


export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;

    // 1️⃣ Check if user purchased product
    const hasPurchased = await Order.findOne({
      user: req.user._id,
      "orderItems.product": productId,
      orderStatus: { $in: ["delivered", "confirmed"] },
    });

    if (!hasPurchased) {
      return res.status(400).json({
        message: "You can review only purchased products",
      });
    }

    // 2️⃣ Prevent duplicate review
    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      product: productId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You have already reviewed this product",
      });
    }

    // 3️⃣ Handle uploaded images (optional)
    const images = req.files
      ? req.files.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }))
      : [];

    // 4️⃣ Create review
    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
      images,
    });

    res.status(201).json(review);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add review" });
  }
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

// DELETE REVIEW (Admin)
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const productId = review.product;

    // Delete review
    await review.deleteOne();

    // Recalculate rating after delete
    const reviews = await Review.find({
      product: productId,
      isApproved: true,
    });

    const product = await Product.findById(productId);

    if (reviews.length === 0) {
      product.numReviews = 0;
      product.rating = 0;
    } else {
      product.numReviews = reviews.length;
      product.rating =
        reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    }

    await product.save();

    res.json({ message: "Review deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete review" });
  }
};

// ADMIN: Get reviews with search + filter + pagination
export const getReviewsByProductForAdmin = async (req, res) => {
  try {
    const pageSize = 5;
    const page = Number(req.query.page) || 1;
    const keyword = req.query.keyword || "";
    const status = req.query.status || "all";

    // Find product by search keyword
    const product = await Product.findOne({
      name: { $regex: keyword, $options: "i" }
    });

    if (!product) {
      return res.json({
        reviews: [],
        page: 1,
        pages: 1
      });
    }

    let filter = { product: product._id };

    if (status === "approved") filter.isApproved = true;
    if (status === "pending") filter.isApproved = false;

    const count = await Review.countDocuments(filter);

    const reviews = await Review.find(filter)
      .populate("user", "name email")
      .populate("product", "name")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({
      reviews,
      page,
      pages: Math.ceil(count / pageSize)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
