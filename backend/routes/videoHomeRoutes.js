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
    const uploadDir = "uploads/videos";
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
  const allowedTypes = /mp4|mov|avi|webm|mkv/;
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
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: fileFilter,
});

// ==================== ROUTES ====================

// @route   GET /api/videohome
// @desc    Get all videos
// @access  Public
router.get("/", async (req, res) => {
  try {
    const videos = await VideoHome.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ 
      message: "Failed to fetch videos", 
      error: error.message 
    });
  }
});

// @route   GET /api/videohome/:id
// @desc    Get single video by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const video = await VideoHome.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    
    res.json(video);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ 
      message: "Failed to fetch video", 
      error: error.message 
    });
  }
});

// @route   POST /api/videohome/upload
// @desc    Upload video file
// @access  Private (add authentication middleware if needed)
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    // Construct video URL (adjust based on your server setup)
    const videoUrl = `${req.protocol}://${req.get("host")}/uploads/videos/${req.file.filename}`;
    // Or for local development:
    // const videoUrl = `http://localhost:5000/uploads/videos/${req.file.filename}`;

    res.json({
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

// @route   POST /api/videohome
// @desc    Create new video entry
// @access  Private (add authentication middleware if needed)
router.post("/", async (req, res) => {
  try {
    const { 
      videoUrl, 
      productName, 
      productId, 
      currentPrice, 
      originalPrice, 
      discount 
    } = req.body;

    // Validation
    if (!videoUrl || !productName || !productId || !currentPrice) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ["videoUrl", "productName", "productId", "currentPrice"]
      });
    }

    // Create new video
    const newVideo = new VideoHome({
      videoUrl,
      productName,
      productId,
      currentPrice: parseFloat(currentPrice),
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      discount: discount ? parseInt(discount) : null,
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

// @route   PUT /api/videohome/:id
// @desc    Update video by ID
// @access  Private (add authentication middleware if needed)
router.put("/:id", async (req, res) => {
  try {
    const { 
      videoUrl, 
      productName, 
      productId, 
      currentPrice, 
      originalPrice, 
      discount 
    } = req.body;

    // Find and update video
    const updatedVideo = await VideoHome.findByIdAndUpdate(
      req.params.id,
      {
        videoUrl,
        productName,
        productId,
        currentPrice: parseFloat(currentPrice),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        discount: discount ? parseInt(discount) : null,
      },
      { new: true, runValidators: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json({
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

// @route   DELETE /api/videohome/:id
// @desc    Delete video by ID
// @access  Private (add authentication middleware if needed)
router.delete("/:id", async (req, res) => {
  try {
    const video = await VideoHome.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Optional: Delete the video file from storage
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
    
    res.json({ 
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

// @route   PATCH /api/videohome/:id/toggle
// @desc    Toggle video active status
// @access  Private
router.patch("/:id/toggle", async (req, res) => {
  try {
    const video = await VideoHome.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.isActive = !video.isActive;
    await video.save();

    res.json({
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

// @route   PATCH /api/videohome/reorder
// @desc    Reorder videos
// @access  Private
router.patch("/reorder", async (req, res) => {
  try {
    const { videoIds } = req.body;

    if (!Array.isArray(videoIds)) {
      return res.status(400).json({ message: "videoIds must be an array" });
    }

    // Update order for each video
    const updatePromises = videoIds.map((id, index) => 
      VideoHome.findByIdAndUpdate(id, { order: index })
    );

    await Promise.all(updatePromises);

    res.json({ message: "Videos reordered successfully" });
  } catch (error) {
    console.error("Error reordering videos:", error);
    res.status(500).json({ 
      message: "Failed to reorder videos", 
      error: error.message 
    });
  }
});

export default router;