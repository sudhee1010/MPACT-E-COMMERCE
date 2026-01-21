import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // one editable address per user
    },

    addressType: {
      type: String,
      enum: ["Home", "Work"],
      default: "Home"
    },

    fullName: {
      type: String,
      required: true
    },

    phoneNumber: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    addressLine1: {
      type: String,
      required: true
    },

    addressLine2: {
      type: String
    },

    city: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    pincode: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Address", addressSchema);
