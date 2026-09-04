import multer from "multer";
import { createCloudflareStorage } from "./cloudflareStorage.js";

const storage = createCloudflareStorage({ folder: "review-images" });

const reviewUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB per image
  }
});

export default reviewUpload;
