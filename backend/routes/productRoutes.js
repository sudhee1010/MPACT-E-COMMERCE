// import express from "express";
// import { protect } from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/adminMiddleware.js";

// const router = express.Router();

// router.post("/", protect, isAdmin, (req, res) => {
//   res.json({ message: "Product created (admin only)" });
// });

// export default router;



import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import upload from "../middlewares/uploadMiddleware.js";
import {deleteProductImage, updateProductImage} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, isAdmin, createProduct);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

router.delete("/:productId/image/:imageId",protect,isAdmin,deleteProductImage);


router.put("/:productId/image/:imageId", protect, isAdmin, upload.single("image"),updateProductImage);


export default router;

