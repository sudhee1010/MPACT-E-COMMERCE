import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    description: { type: String, required: true },
    content: { type: String, required: true }, // HTML from editor

    coverImage: { type: String, required: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },

    tags: [String],
    author: { type: String, default: "MPACT Team" },
    readTime: { type: Number, default: 5 },

    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
