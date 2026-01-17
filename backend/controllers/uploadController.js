// // Upload SINGLE product image
// export const uploadProductImage = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No image uploaded" });
//   }

//   res.status(200).json({
//     image: {
//       url: req.file.path,        // Cloudinary image URL
//       public_id: req.file.filename // Cloudinary public_id
//     }
//   });
// };

// // Upload MULTIPLE product images
// export const uploadMultipleProductImages = async (req, res) => {
//   if (!req.files || req.files.length === 0) {
//     return res.status(400).json({ message: "No images uploaded" });
//   }

//   const images = req.files.map(file => ({
//     url: file.path,          // Cloudinary image URL
//     public_id: file.filename // Cloudinary public_id
//   }));

//   res.status(200).json({
//     images
//   });
// };

// Upload SINGLE product image
export const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    res.status(200).json({
      image: {
        url: req.file.path,          // Cloudinary image URL
        public_id: req.file.filename // Cloudinary public_id
      }
    });
  } catch (error) {
    console.error("Upload Product Image Error:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
};

// Upload MULTIPLE product images
export const uploadMultipleProductImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const images = req.files.map(file => ({
      url: file.path,          // Cloudinary image URL
      public_id: file.filename // Cloudinary public_id
    }));

    res.status(200).json({
      images
    });
  } catch (error) {
    console.error("Upload Multiple Images Error:", error);
    res.status(500).json({ message: "Failed to upload images" });
  }
};
