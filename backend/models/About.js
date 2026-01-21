import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
  heroTitle: {
    type: String,
    required: true   // 🔥 admin must set this
  },

    highlights: [
      {
        text: String
      }
    ],

    videos: [
      {
        videoUrl: String
      }
    ],

    knowMore: {
  sectionTitle: {
    type: String
  },
  heading: {
    type: String
  },
  imageHeading: {
    type: String   // 🔥 TEXT INSIDE IMAGE (HUNGRY?)
  },
  description: {
    type: String
  },
  image: {
    type: String
  }
}

  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
