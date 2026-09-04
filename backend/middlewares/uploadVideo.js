import multer from "multer";
import { createCloudflareStorage } from "./cloudflareStorage.js";

const storage = createCloudflareStorage({ folder: "ecommerce-videos" });

const uploadVideo = multer({ storage });

export default uploadVideo;
