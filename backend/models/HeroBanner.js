import mongoose from "mongoose";

const heroBannerSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true }
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
