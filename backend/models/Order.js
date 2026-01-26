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
      // default: "pending" // pending | paid | failed | cancelled
      enum: ["pending", "paid", "failed", "cancelled", "refunded"],
      default: "pending"
    },

    paymentResult: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String
    },
    // isVisible: {
    //   type: Boolean,
    //   default: true
    // },


    orderStatus: {
      type: String,
      enum: ["placed", "packed", "shipped", "delivered", "cancelled"],
      default: "placed"
    },

    orderType: {
      type: String,
      enum: ["cart", "direct"],
      default: "cart"
    },

    cancelledBy: {
      type: String,
      enum: ["user", "system"],
      default: null
    },

    taxAmount: {
      type: Number,
      required: true
    },

    deliveredAt: Date,
    returnedAt: Date,
    isReturned: {
      type: Boolean,
      default: false
    },


    totalAmount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
