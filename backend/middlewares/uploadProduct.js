import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce-products",
    allowed_formats: ["jpg", "png", "jpeg"],

    // 🔥 This generates proper Cloudinary public_id
    public_id: (req, file) =>
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_")
  }
});

const uploadProduct = multer({ storage });

export default uploadProduct;
