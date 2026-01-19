import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import uploadRoutes from "./routes/uploadRouter.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import heroBannerRoutes from "./routes/heroBannerRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import blogCategoryRoutes from "./routes/blogCategoryRoutes.js";
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();
connectDB();


// Middlewares
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,    
  })
);
app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/users",userRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/hero-banners", heroBannerRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});