import mongoose from "mongoose";

const topOfferSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
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
  { timestamps: true }
);

const TopOffer = mongoose.model("TopOffer", topOfferSchema);
export default TopOffer;