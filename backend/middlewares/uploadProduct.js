import multer from "multer";
import { createCloudflareStorage } from "./cloudflareStorage.js";

const storage = createCloudflareStorage({
  folder: "ecommerce-products",
  key: (_req, file) =>
    `ecommerce-products/${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`
});

const uploadProduct = multer({ storage });

export default uploadProduct;
