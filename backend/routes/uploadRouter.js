// import express from "express";
// import upload from "../middlewares/uploadMiddleware.js";
// import { uploadProductImage } from "../controllers/uploadController.js";
// import { protect } from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/adminMiddleware.js";

// const router = express.Router();

// router.post(
//   "/product",
//   protect,
//   isAdmin,
//   upload.single("image"),
//   uploadProductImage
// );

// export default router;


import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import uploadProduct from "../middlewares/uploadProduct.js";
import { updateProductImage, deleteProductImage } from "../controllers/productController.js";

import {
  uploadProductImage,
  uploadMultipleProductImages
} from "../controllers/uploadController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Single image
router.post(
  "/product",
  protect,
  isAdmin,
  upload.single("image"),
  uploadProductImage
);
// UPDATE a single product image
router.put(
  "/:productId/images/:imageId",
  protect,
  isAdmin,
  uploadProduct.single("image"),
  updateProductImage
);

// DELETE a single product image
router.delete(
  "/:productId/images/:imageId",
  protect,
  isAdmin,
  deleteProductImage
);


// Multiple images
router.post(
  "/product/multiple",
  protect,
  isAdmin,
  upload.array("images", 5),
  uploadMultipleProductImages
);

export default router;
