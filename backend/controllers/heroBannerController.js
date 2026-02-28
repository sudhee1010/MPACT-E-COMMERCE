// import HeroBanner from "../models/HeroBanner.js";
// import cloudinary from "../config/cloudinary.js";

// /**
//  * @desc    Get active hero banners (Public)
//  * @route   GET /api/hero-banners
//  */
// // export const getHeroBanners = async (req, res, next) => {
// //   try {
// //     const banners = await HeroBanner.find({ isActive: true })
// //       .sort({ order: 1, createdAt: -1 });

// //     res.status(200).json(banners);
// //   } catch (error) {
// //     next(error);
// //   }
// // };



// // GET /api/hero-banners (PUBLIC)
// export const getHeroBanners = async (req, res, next) => {
//   try {
//     const banners = await HeroBanner.find({ isActive: true })
//       .sort({ order: 1, createdAt: 1 });

//     res.status(200).json(banners);
//   } catch (error) {
//     next(error);
//   }
// };


// // GET /api/hero-banners/admin
// export const getAllHeroBannersAdmin = async (req, res, next) => {
//   try {
//     const banners = await HeroBanner.find().sort({ order: 1, createdAt: 1 });
//     res.status(200).json(banners);
//   } catch (error) {
//     next(error);
//   }
// };



// /**
//  * @desc    Create hero banner (Admin)
//  * @route   POST /api/hero-banners
//  */
// export const createHeroBanner = async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Image required" });
//     }

//     const banner = await HeroBanner.create({
//       image: {
//         url: req.file.path,
//         public_id: req.file.filename
//       },
//       order: req.body.order || 0,
//       isActive: true
//     });

//     res.status(201).json(banner);
//   } catch (error) {
//     next(error);
//   }
// };


// /**
//  * @desc    Update hero banner (Admin)
//  * @route   PUT /api/hero-banners/:id
//  */
// export const updateHeroBanner = async (req, res, next) => {
//   try {
//     const banner = await HeroBanner.findById(req.params.id);

//     if (!banner) {
//       return res.status(404).json({ message: "Banner not found" });
//     }

//     if (req.body.isActive !== undefined)
//       banner.isActive = req.body.isActive;

//     if (req.body.order !== undefined)
//       banner.order = req.body.order;

//     if (req.body.title !== undefined)
//       banner.title = req.body.title;

//     await banner.save();

//     res.status(200).json(banner);
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * @desc    Delete hero banner (Admin)
//  * @route   DELETE /api/hero-banners/:id
//  */
// export const deleteHeroBanner = async (req, res, next) => {
//   try {
//     const banner = await HeroBanner.findById(req.params.id);

//     if (!banner) {
//       return res.status(404).json({ message: "Banner not found" });
//     }

//     if (banner.image?.public_id) {
//       await cloudinary.uploader.destroy(banner.image.public_id);
//     }

//     await banner.deleteOne();

//     res.status(200).json({ message: "Banner deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

import HeroBanner from "../models/HeroBanner.js";
import cloudinary from "../config/cloudinary.js";

/**
 * @desc    Get active hero banners (Public)
 * @route   GET /api/hero-banners
 */
export const getHeroBanners = async (req, res, next) => {
  try {
    const banners = await HeroBanner.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 });

    res.status(200).json(banners);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Get all hero banners (Admin)
 * @route   GET /api/hero-banners/admin
 */
export const getAllHeroBannersAdmin = async (req, res, next) => {
  try {
    const banners = await HeroBanner.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json(banners);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Create hero banner with image OR video (Admin)
 * @route   POST /api/hero-banners/create-hero
 */
export const createHeroBanner = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image or video file required" });
    }

    // Cloudinary returns resource_type in req.file when using multer-storage-cloudinary
    // We detect based on which upload middleware was used (passed via route)
    // or by checking the mimetype of the uploaded file
    const isVideo =
      req.file.mimetype?.startsWith("video/") ||
      req.uploadType === "video";

    let bannerData = {
      order: req.body.order || 0,
      isActive: true
    };

    if (isVideo) {
      bannerData.mediaType = "video";
      bannerData.video = {
        url: req.file.path,
        public_id: req.file.filename
      };
      bannerData.image = { url: null, public_id: null };
    } else {
      bannerData.mediaType = "image";
      bannerData.image = {
        url: req.file.path,
        public_id: req.file.filename
      };
      bannerData.video = { url: null, public_id: null };
    }

    const banner = await HeroBanner.create(bannerData);

    res.status(201).json(banner);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Update hero banner (Admin)
 * @route   PUT /api/hero-banners/:id
 */
export const updateHeroBanner = async (req, res, next) => {
  try {
    const banner = await HeroBanner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    if (req.body.isActive !== undefined)
      banner.isActive = req.body.isActive;

    if (req.body.order !== undefined)
      banner.order = req.body.order;

    if (req.body.title !== undefined)
      banner.title = req.body.title;

    await banner.save();

    res.status(200).json(banner);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Delete hero banner (Admin)
 * @route   DELETE /api/hero-banners/:id
 */
export const deleteHeroBanner = async (req, res, next) => {
  try {
    const banner = await HeroBanner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // Delete image from Cloudinary if exists
    if (banner.image?.public_id) {
      await cloudinary.uploader.destroy(banner.image.public_id, {
        resource_type: "image"
      });
    }

    // Delete video from Cloudinary if exists
    if (banner.video?.public_id) {
      await cloudinary.uploader.destroy(banner.video.public_id, {
        resource_type: "video"
      });
    }

    await banner.deleteOne();

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    next(error);
  }
};
