// routes/videoHomeRoutes.js - Backend API Routes for Carousel Videos

import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import VideoHome model
import VideoHome from "../models/VideoHome.js";

const router = express.Router();

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "..", "uploads", "videos");
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "video-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter to accept only videos
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp4|mov|avi|webm|mkv|mpg|mpeg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype.startsWith("video/");

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: fileFilter,
});

// ==================== ROUTES ====================

/**
 * @route   GET /api/videohome
 * @desc    Get all videos (active videos first, then by order)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    // Get all videos, sorted by isActive (active first), then by order, then by createdAt
    const videos = await VideoHome.find()
      .sort({ isActive: -1, order: 1, createdAt: -1 });
    
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ 
      message: "Failed to fetch videos", 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/videohome/active
 * @desc    Get only active videos (for frontend display)
 * @access  Public
 */
router.get("/active", async (req, res) => {
  try {
    const videos = await VideoHome.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching active videos:", error);
    res.status(500).json({ 
      message: "Failed to fetch active videos", 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/videohome/:id
 * @desc    Get single video by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const video = await VideoHome.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    
    res.status(200).json(video);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ 
      message: "Failed to fetch video", 
      error: error.message 
    });
  }
});

/**
 * @route   POST /api/videohome/upload
 * @desc    Upload video file
 * @access  Private (add authentication middleware if needed)
 */
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    // Construct video URL for access
    // For production, use your domain
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.BASE_URL 
      // : `http://localhost:${process.env.PORT || 5000}`;
      : "https://mpact-e-backend.onrender.com";
    
    const videoUrl = `${baseUrl}/uploads/videos/${req.file.filename}`;

    res.status(200).json({
      message: "Video uploaded successfully",
      videoUrl: videoUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ 
      message: "Failed to upload video", 
      error: error.message 
    });
  }
});

/**
 * @route   POST /api/videohome
 * @desc    Create new video entry
 * @access  Private (add authentication middleware if needed)
 */
router.post("/", async (req, res) => {
  try {
    const { 
      videoUrl, 
      productName, 
      productId, 
      currentPrice, 
      originalPrice, 
      discount,
      isActive,
      order
    } = req.body;

    // Validation
    if (!videoUrl || !productName || !productId || !currentPrice) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ["videoUrl", "productName", "productId", "currentPrice"]
      });
    }

    // Get the highest order number for new video
    const lastVideo = await VideoHome.findOne().sort({ order: -1 });
    const nextOrder = lastVideo ? lastVideo.order + 1 : 0;

    // Create new video
    const newVideo = new VideoHome({
      videoUrl,
      productName,
      productId: productId.toLowerCase(),
      currentPrice: parseFloat(currentPrice),
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      discount: discount ? parseInt(discount) : null,
      isActive: isActive !== undefined ? isActive : true,
      order: order !== undefined ? order : nextOrder,
    });

    const savedVideo = await newVideo.save();
    
    res.status(201).json({
      message: "Video created successfully",
      video: savedVideo
    });
  } catch (error) {
    console.error("Error creating video:", error);
    res.status(500).json({ 
      message: "Failed to create video", 
      error: error.message 
    });
  }
});

/**
 * @route   PUT /api/videohome/:id
 * @desc    Update video by ID
 * @access  Private (add authentication middleware if needed)
 */
router.put("/:id", async (req, res) => {
  try {
    const { 
      videoUrl, 
      productName, 
      productId, 
      currentPrice, 
      originalPrice, 
      discount,
      isActive,
      order
    } = req.body;

    // Find video first to check if exists
    const video = await VideoHome.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Update fields
    if (videoUrl !== undefined) video.videoUrl = videoUrl;
    if (productName !== undefined) video.productName = productName;
    if (productId !== undefined) video.productId = productId.toLowerCase();
    if (currentPrice !== undefined) video.currentPrice = parseFloat(currentPrice);
    if (originalPrice !== undefined) video.originalPrice = originalPrice ? parseFloat(originalPrice) : null;
    if (discount !== undefined) video.discount = discount ? parseInt(discount) : null;
    if (isActive !== undefined) video.isActive = isActive;
    if (order !== undefined) video.order = order;

    const updatedVideo = await video.save();

    res.status(200).json({
      message: "Video updated successfully",
      video: updatedVideo
    });
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({ 
      message: "Failed to update video", 
      error: error.message 
    });
  }
});

/**
 * @route   DELETE /api/videohome/:id
 * @desc    Delete video by ID
 * @access  Private (add authentication middleware if needed)
 */
router.delete("/:id", async (req, res) => {
  try {
    const video = await VideoHome.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Optional: Delete the video file from storage if it's a local file
    if (video.videoUrl && video.videoUrl.includes("/uploads/videos/")) {
      const filename = video.videoUrl.split("/").pop();
      const filePath = path.join(__dirname, "..", "uploads", "videos", filename);
      
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
          console.log(`Deleted file: ${filename}`);
        } catch (err) {
          console.error(`Failed to delete file: ${filename}`, err);
        }
      }
    }

    await VideoHome.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ 
      message: "Video deleted successfully",
      deletedId: req.params.id
    });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ 
      message: "Failed to delete video", 
      error: error.message 
    });
  }
});

/**
 * @route   PATCH /api/videohome/:id/toggle
 * @desc    Toggle video active status
 * @access  Private
 */
router.patch("/:id/toggle", async (req, res) => {
  try {
    const video = await VideoHome.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.isActive = !video.isActive;
    await video.save();

    res.status(200).json({
      message: `Video ${video.isActive ? 'activated' : 'deactivated'} successfully`,
      video
    });
  } catch (error) {
    console.error("Error toggling video status:", error);
    res.status(500).json({ 
      message: "Failed to toggle video status", 
      error: error.message 
    });
  }
});

/**
 * @route   PATCH /api/videohome/reorder
 * @desc    Reorder videos (bulk update)
 * @access  Private
 */
router.patch("/reorder", async (req, res) => {
  try {
    const { videoOrders } = req.body; // Expecting [{ id: "videoId", order: 1 }, ...]

    if (!Array.isArray(videoOrders)) {
      return res.status(400).json({ message: "videoOrders must be an array" });
    }

    // Update order for each video
    const updatePromises = videoOrders.map(({ id, order }) => 
      VideoHome.findByIdAndUpdate(id, { order: order })
    );

    await Promise.all(updatePromises);

    res.status(200).json({ 
      message: "Videos reordered successfully",
      count: videoOrders.length
    });
  } catch (error) {
    console.error("Error reordering videos:", error);
    res.status(500).json({ 
      message: "Failed to reorder videos", 
      error: error.message 
    });
  }
});

/**
 * @route   DELETE /api/videohome
 * @desc    Delete multiple videos by IDs
 * @access  Private
 */
router.delete("/", async (req, res) => {
  try {
    const { videoIds } = req.body;

    if (!Array.isArray(videoIds) || videoIds.length === 0) {
      return res.status(400).json({ message: "videoIds array is required" });
    }

    // Delete all videos in the array
    const result = await VideoHome.deleteMany({ _id: { $in: videoIds } });

    res.status(200).json({
      message: `${result.deletedCount} videos deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Error deleting videos:", error);
    res.status(500).json({ 
      message: "Failed to delete videos", 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/videohome/product/:productId
 * @desc    Get videos by product ID
 * @access  Public
 */
router.get("/product/:productId", async (req, res) => {
  try {
    const videos = await VideoHome.find({ 
      productId: req.params.productId.toLowerCase(),
      isActive: true 
    }).sort({ order: 1, createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos by product:", error);
    res.status(500).json({ 
      message: "Failed to fetch videos by product", 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/videohome/stats/count
 * @desc    Get video statistics
 * @access  Private
 */
router.get("/stats/count", async (req, res) => {
  try {
    const totalVideos = await VideoHome.countDocuments();
    const activeVideos = await VideoHome.countDocuments({ isActive: true });
    const inactiveVideos = await VideoHome.countDocuments({ isActive: false });

    res.status(200).json({
      total: totalVideos,
      active: activeVideos,
      inactive: inactiveVideos
    });
  } catch (error) {
    console.error("Error fetching video stats:", error);
    res.status(500).json({ 
      message: "Failed to fetch video statistics", 
      error: error.message 
    });
  }
});

export default router;