// routes/videoHomeRoutes.js - Backend API Routes for Carousel Videos

import express from "express";

// ❌ Removed multer, path, fs
// ❌ Removed disk storage

// Import Cloudinary upload middleware
import upload from "../middlewares/uploadVideo.js";

// Import VideoHome model
import VideoHome from "../models/VideoHome.js";

const router = express.Router();


// ==================== ROUTES ====================

/**
 * @route   GET /api/videohome
 * @desc    Get all videos (active videos first, then by order)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
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

    if (!videoUrl || !productName || !productId || !currentPrice) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const lastVideo = await VideoHome.findOne().sort({ order: -1 });
    const nextOrder = lastVideo ? lastVideo.order + 1 : 0;

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
 * @route   GET /api/videohome/active
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
 * 🔥 UPDATED
 * @route   POST /api/videohome/upload
 * @desc    Upload video file (Cloudinary)
 */
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    // Cloudinary returns full hosted URL
    const videoUrl = req.file.path;

    res.status(200).json({
      message: "Video uploaded successfully",
      videoUrl,
      filename: req.file.filename,   // Cloudinary public_id
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

export default router;
