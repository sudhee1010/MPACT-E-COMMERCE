// models/Video.js - MongoDB Schema for Carousel Videos

import mongoose from "mongoose";

const videohomeSchema = new mongoose.Schema(
  {
    videoUrl: {
      type: String,
      required: true,
      trim: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: null,
      min: 0,
    },
    discount: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
videohomeSchema.index({ productId: 1 });
videohomeSchema.index({ isActive: 1 });
videohomeSchema.index({ order: 1 });

export default mongoose.model("VideoHome", videohomeSchema);