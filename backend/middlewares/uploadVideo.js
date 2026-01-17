import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce-videos",
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "webm"]
  }
});

const uploadVideo = multer({ storage });

export default uploadVideo;
