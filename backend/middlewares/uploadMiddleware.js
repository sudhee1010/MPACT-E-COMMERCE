import multer from "multer";
import { createCloudflareStorage } from "./cloudflareStorage.js";

const storage = createCloudflareStorage({ folder: "ecommerce-products" });

const upload = multer({ storage });

export default upload;