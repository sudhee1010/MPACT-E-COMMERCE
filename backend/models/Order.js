// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },

//     orderItems: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true
//         },
//         name: String,
//         quantity: Number,
//         price: Number,
//         image: String
//       }
//     ],

//     shippingAddress: {
//       address: String,
//       city: String,
//       pincode: String,
//       phone: String
//     },

//     paymentMethod: {
//       type: String,
//       default: "COD"
//     },

//     paymentStatus: {
//       type: String,
//       // default: "pending" // pending | paid | failed | cancelled
//       enum: ["pending", "paid", "failed", "cancelled", "refunded"],
//       default: "pending"
//     },

//     paymentResult: {
//       razorpayOrderId: String,
//       razorpayPaymentId: String,
//       razorpaySignature: String
//     },
//     // isVisible: {
//     //   type: Boolean,
//     //   default: true
//     // },


//     orderStatus: {
//       type: String,
//       enum: ["placed", "packed", "shipped", "delivered", "cancelled"],
//       default: "placed"
//     },

//     orderType: {
//       type: String,
//       enum: ["cart", "direct"],
//       default: "cart"
//     },

//     cancelledBy: {
//       type: String,
//       enum: ["user", "system"],
//       default: null
//     },

//     taxAmount: {
//       type: Number,
//       required: true
//     },

//     deliveredAt: Date,
//     returnedAt: Date,
//     isReturned: {
//       type: Boolean,
//       default: false
//     },


//     totalAmount: {
//       type: Number,
//       required: true
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);


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
      enum: ["pending", "paid", "failed", "cancelled", "refunded"],
      default: "pending"
    },

    paymentResult: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String
    },

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

    /* ================== COUPON FIELDS (ADDED) ================== */

    subtotal: {
      type: Number,
      default: 0
    },

    discount: {
      type: Number,
      default: 0
    },

    appliedCoupon: {
      code: String,
      discount: Number
    },

    couponApplied: {
      type: Boolean,
      default: false
    },

    /* =========================================================== */

    taxAmount: {
      type: Number,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    },

    deliveredAt: Date,
    returnedAt: Date,

    isReturned: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
