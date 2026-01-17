import express from "express";
import {
  toggleWishlist,
  getWishlist,
  removeFromWishlist,
  moveWishlistToCart,
  getWishlistCount
} from "../controllers/wishlistController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/toggle", protect, toggleWishlist);
router.get("/", protect, getWishlist);
router.post("/move-to-cart", protect, moveWishlistToCart);
router.get("/count", protect, getWishlistCount);
router.delete("/:productId", protect, removeFromWishlist);

export default router;
