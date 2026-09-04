import multer from "multer";
import { createCloudflareStorage } from "./cloudflareStorage.js";

const storage = createCloudflareStorage({ folder: "banners" });

const bannerUpload = multer({ storage });
export default bannerUpload;
