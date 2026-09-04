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

// import Banner from "../models/Banner.js";
// import cloudinary from "../config/cloudinary.js";


// export const createBanner = async (req, res) => {
//   try {
//     const { title, subtitle, image, order, isActive } = req.body;

//     if (!image || !image.url || !image.public_id) {
//       return res.status(400).json({ message: "Banner image is required" });
//     }

//     const banner = await Banner.create({
//       title,
//       subtitle,
//       image,
//       order,
//       isActive,
//     });

//     res.status(201).json(banner);
//   } catch (error) {
//     console.error("Create Banner Error:", error);
//     res.status(500).json({ message: "Failed to create banner" });
//   }
// };


// export const getActiveBanners = async (req, res) => {
//   try {
//     const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
//     res.status(200).json(banners);
//   } catch (error) {
//     console.error("Get Banners Error:", error);
//     res.status(500).json({ message: "Failed to fetch banners" });
//   }
// };


// // export const updateBanner = async (req, res) => {
// //   try {
// //     const banner = await Banner.findById(req.params.id);

// //     if (!banner) {
// //       return res.status(404).json({ message: "Banner not found" });
// //     }

// //     const { title, subtitle, image, order, isActive } = req.body;

// //     // 🔥 Replace image if new one provided
// //     if (image && image.public_id) {
// //       if (banner.image?.public_id) {
// //         await cloudinary.uploader.destroy(banner.image.public_id);
// //       }
// //       banner.image = image;
// //     }

// //     // Update other fields safely
// //     banner.title = title ?? banner.title;
// //     banner.subtitle = subtitle ?? banner.subtitle;
// //     banner.order = order ?? banner.order;
// //     banner.isActive = isActive ?? banner.isActive;

// //     const updatedBanner = await banner.save();
// //     res.status(200).json(updatedBanner);
// //   } catch (error) {
// //     console.error("Update Banner Error:", error);
// //     res.status(500).json({ message: "Failed to update banner" });
// //   }
// // };

// export const updateBanner = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id);

//     if (!banner) return res.status(404).json({ message: "Banner not found" });

//     const { title, subtitle, order, isActive, image } = req.body;

//     // Only replace image if new image object is provided
//     if (image && image.url && image.public_id) {
//       // Delete old Cloudinary image
//       if (banner.image?.public_id) {
//         await cloudinary.uploader.destroy(banner.image.public_id);
//       }
//       banner.image = image;
//     }


//     // Update other fields
//     banner.title = title ?? banner.title;
//     banner.subtitle = subtitle ?? banner.subtitle;
//     banner.order = order ?? banner.order;
//     banner.isActive = isActive ?? banner.isActive;

//     const updatedBanner = await banner.save();
//     res.status(200).json(updatedBanner);
//   } catch (error) {
//     console.error("Update Banner Error:", error);
//     res.status(500).json({ message: error.message });

//   }
// };




// // export const deleteBanner = async (req, res) => {
// //   try {
// //     const banner = await Banner.findById(req.params.id);

// //     if (!banner) {
// //       return res.status(404).json({ message: "Banner not found" });
// //     }

// //     // 🔥 Remove image from Cloudinary
// //     if (banner.image?.public_id) {
// //       await cloudinary.uploader.destroy(banner.image.public_id);
// //     }

// //     await banner.deleteOne();

// //     res.status(200).json({ message: "Banner deleted successfully" });
// //   } catch (error) {
// //     console.error("Delete Banner Error:", error);
// //     res.status(500).json({ message: "Failed to delete banner" });
// //   }
// // };

// export const deleteBanner = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id);

//     if (!banner) {
//       return res.status(404).json({ message: "Banner not found" });
//     }

//     // Delete image from Cloudinary
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


// import Banner from "../models/Banner.js";
// import cloudinary from "../config/cloudinary.js";

// // CREATE OR UPDATE SINGLE BANNER
// export const createOrUpdateBanner = async (req, res) => {
//   try {
//     const title = req.body.title || "";
//     const subtitle = req.body.subtitle || "";

//     const existingBanner = await Banner.findOne();

//     // ❌ Only block if creating new banner AND no image
//     if (!existingBanner && !req.file) {
//       return res.status(400).json({ message: "Banner image is required" });
//     }

//     let image = existingBanner?.image;

//     // ✅ Replace image only if new one uploaded
//     if (req.file) {
//       if (existingBanner?.image?.public_id) {
//         await cloudinary.uploader.destroy(existingBanner.image.public_id);
//       }

//       image = {
//         url: req.file.path,
//         public_id: req.file.filename,
//       };
//     }

//     if (existingBanner) {
//       existingBanner.title = title;
//       existingBanner.subtitle = subtitle;
//       existingBanner.image = image;

//       const updated = await existingBanner.save();
//       return res.status(200).json(updated);
//     }

//     const banner = await Banner.create({
//       title,
//       subtitle,
//       image,
//       isActive: true,
//     });

//     res.status(201).json(banner);
//   } catch (error) {
//     console.error("Banner Error:", error);
//     res.status(500).json({ message: "Banner update failed" });
//   }
// };


// // GET ACTIVE BANNER (PUBLIC)
// export const getActiveBanner = async (req, res) => {
//   try {
//     const banner = await Banner.findOne({ isActive: true });
//     res.status(200).json(banner);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch banner" });
//   }
// };

// // DELETE BANNER (ADMIN)
// export const deleteBanner = async (req, res) => {
//   try {
//     const banner = await Banner.findOne();
//     if (!banner) return res.status(404).json({ message: "No banner found" });

//     if (banner.image?.public_id) {
//       await cloudinary.uploader.destroy(banner.image.public_id);
//     }

//     await banner.deleteOne();
//     res.status(200).json({ message: "Banner deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete banner" });
//   }
// };




import Banner from "../models/Banner.js";
import { deleteFromCloudflare } from "../config/cloudflare.js";

// ✅ GET ALL BANNERS (Public - for homepage carousel)
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.status(200).json(banners);
  } catch (error) {
    console.error("Get Banners Error:", error);
    res.status(500).json({ message: "Failed to fetch banners" });
  }
};

// ✅ CREATE NEW BANNER (Admin)
export const createBanner = async (req, res) => {
  try {
    const { title, subtitle, link, discount, isNew } = req.body;

    // Validate required fields
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Banner title is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Banner image is required" });
    }

    // Get the next order number
    const maxOrder = await Banner.findOne().sort({ order: -1 }).select('order');
    const nextOrder = maxOrder ? maxOrder.order + 1 : 0;

    // Create banner
    const banner = await Banner.create({
      title: title.trim(),
      subtitle: subtitle?.trim() || "",
      link: link?.trim() || "",
      discount: discount ? Number(discount) : 0,
      isNew: isNew === 'true' || isNew === true,
      image: {
        url: req.file.path,
        public_id: req.file.filename,
      },
      order: nextOrder,
      isActive: true,
    });

    res.status(201).json(banner);
  } catch (error) {
    console.error("Create Banner Error:", error);
    res.status(500).json({ 
      message: "Failed to create banner",
      error: error.message 
    });
  }
};

// ✅ UPDATE BANNER (Admin)
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, link, discount, isNew } = req.body;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // Validate title if provided
    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ message: "Banner title cannot be empty" });
    }

    // Update image if new one provided
    if (req.file) {
      // Delete old image from R2
      if (banner.image?.public_id) {
        try {
          await deleteFromCloudflare(banner.image.public_id);
        } catch (err) {
          console.error("Failed to delete old image:", err);
        }
      }

      banner.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    // Update other fields
    if (title !== undefined) banner.title = title.trim();
    if (subtitle !== undefined) banner.subtitle = subtitle.trim();
    if (link !== undefined) banner.link = link.trim();
    if (discount !== undefined) banner.discount = Number(discount);
    if (isNew !== undefined) banner.isNew = isNew === 'true' || isNew === true;

    const updatedBanner = await banner.save();
    res.status(200).json(updatedBanner);
  } catch (error) {
    console.error("Update Banner Error:", error);
    res.status(500).json({ 
      message: "Failed to update banner",
      error: error.message 
    });
  }
};

// ✅ DELETE BANNER (Admin)
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // Delete image from Cloudinary
    if (banner.image?.public_id) {
      try {
        await deleteFromCloudflare(banner.image.public_id);
      } catch (err) {
        console.error("Failed to delete image from R2:", err);
      }
    }

    await banner.deleteOne();

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Delete Banner Error:", error);
    res.status(500).json({ 
      message: "Failed to delete banner",
      error: error.message 
    });
  }
};

// ✅ REORDER BANNERS (Admin) - Optional but useful
export const reorderBanners = async (req, res) => {
  try {
    const { bannerIds } = req.body; // Array of banner IDs in new order

    if (!Array.isArray(bannerIds)) {
      return res.status(400).json({ message: "bannerIds must be an array" });
    }

    // Update order for each banner
    const updatePromises = bannerIds.map((bannerId, index) => 
      Banner.findByIdAndUpdate(bannerId, { order: index })
    );

    await Promise.all(updatePromises);

    res.status(200).json({ message: "Banners reordered successfully" });
  } catch (error) {
    console.error("Reorder Banners Error:", error);
    res.status(500).json({ 
      message: "Failed to reorder banners",
      error: error.message 
    });
  }
};