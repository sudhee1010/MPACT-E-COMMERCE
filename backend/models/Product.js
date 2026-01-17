// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     description: {
//       type: String,
//       required: true
//     },

//     price: {
//       type: Number,
//       required: true
//     },

//     images: [
//         {
//         url: {
//           type: String,
//           required: true
//         },
//         public_id: {
//           type: String,
//           required: true
//         }
//       }
//     ],

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true
//     },

//     stock: {
//       type: Number,
//       required: true,
//       default: 0
//     },

//     rating: {
//       type: Number,
//       default: 0
//     },

//     numReviews: {
//       type: Number,
//       default: 0
//     },

//     isActive: {
//       type: Boolean,
//       default: true
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Product", productSchema);


import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: false
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    images: [
      {
        url: String,
        public_id: String
      }
    ],
    highlights: [String],


    // 🔹 PRICING (IMPORTANT)
    originalPrice: {
      type: Number,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    discountPercent: {
      type: Number,
      default: 0
    },

    // 🔹 RATING & REVIEWS
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    numReviews: {
      type: Number,
      default: 0
    }
    ,
    isActive: {
      type: Boolean,
      default: true
    },
    countInStock: {
      type: Number,
      default: 0
    }

  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
