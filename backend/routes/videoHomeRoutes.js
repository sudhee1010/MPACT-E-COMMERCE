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

/**
 * @route   POST /api/videohome
 * @desc    Create a new video entry
 * @access  Public (consider adding auth middleware)
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
 * @route   PUT /api/videohome/:id
 * @desc    Update an existing video entry
 * @access  Public (consider adding auth middleware)
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

    // Check if video exists
    const existingVideo = await VideoHome.findById(req.params.id);
    if (!existingVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Build update object with only provided fields
    const updateData = {};
    if (videoUrl !== undefined) updateData.videoUrl = videoUrl;
    if (productName !== undefined) updateData.productName = productName;
    if (productId !== undefined) updateData.productId = productId.toLowerCase();
    if (currentPrice !== undefined) updateData.currentPrice = parseFloat(currentPrice);
    if (originalPrice !== undefined) updateData.originalPrice = originalPrice ? parseFloat(originalPrice) : null;
    if (discount !== undefined) updateData.discount = discount ? parseInt(discount) : null;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (order !== undefined) updateData.order = parseInt(order);

    // If order is being updated, handle reordering
    if (order !== undefined && order !== existingVideo.order) {
      // If moving to a higher order number
      if (order > existingVideo.order) {
        await VideoHome.updateMany(
          { order: { $gt: existingVideo.order, $lte: order } },
          { $inc: { order: -1 } }
        );
      } 
      // If moving to a lower order number
      else if (order < existingVideo.order) {
        await VideoHome.updateMany(
          { order: { $gte: order, $lt: existingVideo.order } },
          { $inc: { order: 1 } }
        );
      }
    }

    const updatedVideo = await VideoHome.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

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
 * @desc    Delete a video entry
 * @access  Public (consider adding auth middleware)
 */
router.delete("/:id", async (req, res) => {
  try {
    const video = await VideoHome.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Delete the video from database
    await VideoHome.findByIdAndDelete(req.params.id);

    // Reorder remaining videos to maintain sequence
    await VideoHome.updateMany(
      { order: { $gt: video.order } },
      { $inc: { order: -1 } }
    );

    res.status(200).json({ 
      message: "Video deleted successfully",
      deletedVideo: video
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
 * @route   PATCH /api/videohome/:id/toggle-active
 * @desc    Toggle video active status
 * @access  Public (consider adding auth middleware)
 */
router.patch("/:id/toggle-active", async (req, res) => {
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
 * @route   POST /api/videohome/reorder
 * @desc    Reorder multiple videos at once
 * @access  Public (consider adding auth middleware)
 */
router.post("/reorder", async (req, res) => {
  try {
    const { videos } = req.body; // Expected format: [{ id, order }]

    if (!Array.isArray(videos)) {
      return res.status(400).json({ message: "Videos array is required" });
    }

    // Update each video's order
    const updatePromises = videos.map(({ id, order }) => 
      VideoHome.findByIdAndUpdate(id, { order }, { new: true })
    );

    const updatedVideos = await Promise.all(updatePromises);

    res.status(200).json({
      message: "Videos reordered successfully",
      videos: updatedVideos
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
 * @route   GET /api/videohome/active
 * @desc    Get all active videos
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
 * @desc    Get a single video by ID
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