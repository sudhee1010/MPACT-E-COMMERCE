import Video from "../models/Video.js";
import cloudinary from "../config/cloudinary.js";

/**
 * @desc    Upload video (Admin)
 * @route   POST /api/videos
 * @access  Admin
 */
export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    const video = await Video.create({
      title: req.body.title,
      description: req.body.description,
      videoUrl: req.file.path,
      public_id: req.file.filename,
      order: req.body.order || 0
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get active videos (Home Page)
 * @route   GET /api/videos
 * @access  Public
 */
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Toggle video active status
 * @route   PUT /api/videos/:id/toggle
 * @access  Admin
 */
export const toggleVideoStatus = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.isActive = !video.isActive;
    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete video
 * @route   DELETE /api/videos/:id
 * @access  Admin
 */
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await cloudinary.uploader.destroy(video.public_id, {
      resource_type: "video"
    });

    await video.deleteOne();

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
