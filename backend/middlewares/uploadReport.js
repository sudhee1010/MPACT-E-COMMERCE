import multer from "multer";
import { createCloudflareStorage } from "./cloudflareStorage.js";

const reportStorage = createCloudflareStorage({ folder: "reports" });

const uploadReport = multer({
  storage: reportStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export default uploadReport;
