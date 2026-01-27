import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },

    discountType: {
      type: String,
      enum: ["percentage", "flat"],
      required: true
    },

    discountValue: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: function (v) {
          return this.discountType === "percentage" ? v <= 100 : true;
        },
        message: "Percentage discount cannot exceed 100"
      }
    },

    expiryDate: {
      type: Date,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    // 🌍 Global usage limit
    maxRedemptions: { type: Number, default: 0 },
    usedCount: { type: Number, default: 0 },

    // 👤 Users who already used this coupon
    usersUsed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // 🎯 Product specific rules
    applicableProducts: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },

        usageLimit: {
          type: Number,
          required: true
        },
         isFirstOrderOnly: {
        type: Boolean,
        default: false
      },

        usedBy: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
          }
        ]
      },
     
    ]
  },
  { timestamps: true }
);

couponSchema.index({ code: 1 });

export default mongoose.model("Coupon", couponSchema);
