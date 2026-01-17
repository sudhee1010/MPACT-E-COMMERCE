// import Banner from "../models/Banner.js";

// // ✅ Get all active banners (for homepage carousel)
// export const getActiveBanners = async (req, res) => {
//   try {
//     const banners = await Banner.find({ isActive: true })
//       .sort({ order: 1 });

//     res.status(200).json(banners);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch banners",
//       error: error.message,
//     });
//   }
// };

// // ✅ Add new banner (Admin)
// export const createBanner = async (req, res) => {
//   try {
//     const banner = new Banner(req.body);
//     await banner.save();

//     res.status(201).json(banner);
//   } catch (error) {
//     res.status(400).json({
//       message: "Failed to create banner",
//       error: error.message,
//     });
//   }
// };

// // ✅ Update banner
// export const updateBanner = async (req, res) => {
//   try {
//     const updated = await Banner.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.status(200).json(updated);
//   } catch (error) {
//     res.status(400).json({
//       message: "Failed to update banner",
//       error: error.message,
//     });
//   }
// };

// // ✅ Delete banner
// export const deleteBanner = async (req, res) => {
//   try {
//     await Banner.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Banner deleted" });
//   } catch (error) {
//     res.status(400).json({
//       message: "Failed to delete banner",
//       error: error.message,
//     });
//   }
// };

import Banner from "../models/Banner.js";
import cloudinary from "../config/cloudinary.js";


export const createBanner = async (req, res) => {
  try {
    const { title, subtitle, image, order, isActive } = req.body;

    if (!image || !image.url || !image.public_id) {
      return res.status(400).json({ message: "Banner image is required" });
    }

    const banner = await Banner.create({
      title,
      subtitle,
      image,
      order,
      isActive,
    });

    res.status(201).json(banner);
  } catch (error) {
    console.error("Create Banner Error:", error);
    res.status(500).json({ message: "Failed to create banner" });
  }
};


export const getActiveBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json(banners);
  } catch (error) {
    console.error("Get Banners Error:", error);
    res.status(500).json({ message: "Failed to fetch banners" });
  }
};


// export const updateBanner = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id);

//     if (!banner) {
//       return res.status(404).json({ message: "Banner not found" });
//     }

//     const { title, subtitle, image, order, isActive } = req.body;

//     // 🔥 Replace image if new one provided
//     if (image && image.public_id) {
//       if (banner.image?.public_id) {
//         await cloudinary.uploader.destroy(banner.image.public_id);
//       }
//       banner.image = image;
//     }

//     // Update other fields safely
//     banner.title = title ?? banner.title;
//     banner.subtitle = subtitle ?? banner.subtitle;
//     banner.order = order ?? banner.order;
//     banner.isActive = isActive ?? banner.isActive;

//     const updatedBanner = await banner.save();
//     res.status(200).json(updatedBanner);
//   } catch (error) {
//     console.error("Update Banner Error:", error);
//     res.status(500).json({ message: "Failed to update banner" });
//   }
// };

export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) return res.status(404).json({ message: "Banner not found" });

    const { title, subtitle, order, isActive, image } = req.body;

    // Only replace image if new image object is provided
    if (image && image.url && image.public_id) {
      // Delete old Cloudinary image
      if (banner.image?.public_id) {
        await cloudinary.uploader.destroy(banner.image.public_id);
      }
      banner.image = image;
    }


    // Update other fields
    banner.title = title ?? banner.title;
    banner.subtitle = subtitle ?? banner.subtitle;
    banner.order = order ?? banner.order;
    banner.isActive = isActive ?? banner.isActive;

    const updatedBanner = await banner.save();
    res.status(200).json(updatedBanner);
  } catch (error) {
    console.error("Update Banner Error:", error);
    res.status(500).json({ message: error.message });

  }
};




// export const deleteBanner = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id);

//     if (!banner) {
//       return res.status(404).json({ message: "Banner not found" });
//     }

//     // 🔥 Remove image from Cloudinary
//     if (banner.image?.public_id) {
//       await cloudinary.uploader.destroy(banner.image.public_id);
//     }

//     await banner.deleteOne();

//     res.status(200).json({ message: "Banner deleted successfully" });
//   } catch (error) {
//     console.error("Delete Banner Error:", error);
//     res.status(500).json({ message: "Failed to delete banner" });
//   }
// };

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // Delete image from Cloudinary
    if (banner.image?.public_id) {
      await cloudinary.uploader.destroy(banner.image.public_id);
    }

    await banner.deleteOne();

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Delete Banner Error:", error);
    res.status(500).json({ message: "Failed to delete banner" });
  }
};
