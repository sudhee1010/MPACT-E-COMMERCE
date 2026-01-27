import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        name: String,
        quantity: Number,
        price: Number,
        image: String
      }
    ],

    shippingAddress: {
      address: String,
      city: String,
      pincode: String,
      phone: String
    },

    paymentMethod: {
      type: String,
      default: "COD"
    },

    paymentStatus: {
      type: String,
      default: "pending" // pending | paid | failed | cancelled
    },

    orderStatus: {
      type: String,
      default: "placed" // placed | packed | shipped | delivered | cancelled
    },
    taxAmount: {
  type: Number,
  required: true
},

    totalAmount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
