import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    description: {
      type: String
    },
    videoUrl: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
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

export default mongoose.model("Video", videoSchema);
