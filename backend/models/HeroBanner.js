
import mongoose from "mongoose";

const heroBannerSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, default: null },
      public_id: { type: String, default: null }
    },

    video: {
      url: { type: String, default: null },
      public_id: { type: String, default: null }
    },

    // "image" or "video"
    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image"
    },

    title: {
      type: String
    },

    isActive: {
      type: Boolean,
      default: true
    },

    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("HeroBanner", heroBannerSchema);