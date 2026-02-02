import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    warehouse: {
      type: String,
      enum: ["Main Warehouse", "Secondary Warehouse"],
      required: true
    },

    type: {
      type: String,
      enum: ["In", "Out", "Adjustment"],
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    reason: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("StockMovement", stockMovementSchema);
