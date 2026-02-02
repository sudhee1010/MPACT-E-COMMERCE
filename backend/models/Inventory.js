import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    sku: {
      type: String,
      required: true
    },

    warehouse: {
      type: String,
      enum: ["Main Warehouse", "Secondary Warehouse"],
      required: true
    },

    currentStock: {
      type: Number,
      default: 0
    },

    minStock: {
      type: Number,
      default: 0
    },

    maxStock: {
      type: Number,
      default: 0
    },

    unitCost: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", inventorySchema);
