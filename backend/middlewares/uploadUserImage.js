import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const userStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce-users",
    allowed_formats: ["jpg", "png", "jpeg"],
      transformation: [{ width: 300, height: 300, crop: "fill" }],
    public_id: (req, file) => `user_${req.user._id}_${Date.now()}`
  }
});

const uploadUserImage = multer({ storage: userStorage });

export default uploadUserImage;
