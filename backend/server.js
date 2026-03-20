import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";
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
import videoHomeRoutes from "./routes/videoHomeRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import blogCategoryRoutes from "./routes/blogCategoryRoutes.js";
import cookieParser from "cookie-parser";
import aboutusRoutes from "./routes/aboutusRoutes.js"
import addressRoutes from "./routes/addressRoutes.js";
import { cleanupUnverifiedUsers } from "./utils/cleanupUnverifiedUsers.js";
import { startOrderCleanupJob } from "./utils/orderCleanup.js";
import distributorEnquiryRoutes from "./routes/distributerEnquiryRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js"
import inventoryRoutes from "./routes/inventoryRoutes.js"
import reportRoutes from "./routes/reportRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import helpRoutes from "./routes/helpRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import topOfferRoutes from "./routes/topOfferRoutes.js";


dotenv.config();
const app = express();
connectDB();


// Middlewares
// app.use(cors());
app.set("trust proxy", 1);
app.use(
  cors({
    // origin: "https://mpact-e-commerce.onrender.com",
    // origin: ["https://mpact-e-commerce.onrender.com",
    // "http://13.48.193.184:3000"],
    // origin: "http://localhost:3000",
    // origin:"https://mpact-e-commerce-1-0222.onrender.com",
    origin: ["https://mpact-e-commerce-1-0222.onrender.com","https://mpact-e-commerce.onrender.com" ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
cron.schedule("*/30 * * * *", cleanupUnverifiedUsers);
startOrderCleanupJob();


// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes)
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
app.use("/api/videohome", videoHomeRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);
app.use("/api/aboutus", aboutusRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/distributor", distributorEnquiryRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/help", helpRoutes);
app.use("/api/subscribe", subscriberRoutes);
app.use("/api/topoffers", topOfferRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});