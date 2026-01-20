import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    //   name: {
    //   type: String,
    //   required: function () {
    //     return !!this.email;
    //   }
    // },

    email: {
      type: String,
      unique: true,
      sparse: true,
      required: true
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      required: true
    },

    address: {
      type: String,
      default: ""
    },


    password: {
      type: String,
      select: false
    },

    isEmailVerified: {
      type: Boolean,
      default: false
    },

    isPhoneVerified: {
      type: Boolean,
      default: false
    },

    otp: String,
    otpExpiry: Date,

    role: {
      type: String,
      enum: ["customer", "admin"]
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ]

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

