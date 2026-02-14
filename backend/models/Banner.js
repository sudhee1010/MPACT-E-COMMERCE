// import mongoose from "mongoose";

// const bannerSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       trim: true,
//     },
//     subtitle: {
//       type: String,
//       trim: true,
//     },
//     image: {
//       type: String,
//       required: true, // Cloudinary / S3 / local URL
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     order: {
//       type: Number,
//       default: 0, // for carousel sequence
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Banner", bannerSchema);

// import mongoose from "mongoose";

// const bannerSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       trim: true,
//     },

//     subtitle: {
//       type: String,
//       trim: true,
//     },

//     image: {
//       url: {
//         type: String,
//         required: true,
//       },
//       public_id: {
//         type: String,
//         required: true,
//       },
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },

//     order: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Banner", bannerSchema);



import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      trim: true,
    },

    link: {
      type: String,
      trim: true,
    },

    discount: {
      type: Number,
      min: 0,
      max: 100,
    },

    isNew: {
      type: Boolean,
      default: false,
    },

    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);