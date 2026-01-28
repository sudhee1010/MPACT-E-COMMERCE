import mongoose from "mongoose";

const distributorEnquirySchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },

    businessType: {
      type: String,
      enum: [
        "Retailer",
        "Wholesaler",
        "Distributor",
        "Manufacturer",
        "Shop Owner",
        "Other",
      ],
      required: true,
    },

    city: { type: String, required: true },
    email: { type: String, required: true },
    remarks: { type: String },

    status: {
      type: String,
      enum: ["pending", "contacted", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "DistributorEnquiry",
  distributorEnquirySchema
);
