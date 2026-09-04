import multer from "multer";
import { createCloudflareStorage } from "./cloudflareStorage.js";

const userStorage = createCloudflareStorage({
  folder: "ecommerce-users",
  key: (req) => `ecommerce-users/user_${req.user._id}_${Date.now()}`
});

const uploadUserImage = multer({ storage: userStorage });

export default uploadUserImage;
