import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const reportStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "reports",
    resource_type: "raw",
    allowed_formats: ["pdf", "csv", "xls", "xlsx"]
  }
});

const uploadReport = multer({
  storage: reportStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export default uploadReport;
