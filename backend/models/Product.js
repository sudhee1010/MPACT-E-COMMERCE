import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: false
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    images: [
      {
        url: String,
        public_id: String
      }
    ],
    highlights: [String],


    // 🔹 PRICING (IMPORTANT)
    originalPrice: {
      type: Number,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    discountPercent: {
      type: Number,
      default: 0
    },

    // 🔹 RATING & REVIEWS
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    numReviews: {
      type: Number,
      default: 0
    }
    ,
    isActive: {
      type: Boolean,
      default: true
    },
    countInStock: {
      type: Number,
      default: 0
    }

  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
