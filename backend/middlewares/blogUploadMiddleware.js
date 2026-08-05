import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, PNG, and WEBP images are allowed."));
    }
  },
});

export const handleBlogUpload = (singleFieldName) => {
  return (req, res, next) => {
    upload.single(singleFieldName)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              success: false,
              message: "Image size must be less than 5 MB.",
            });
          }
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }
        return res.status(400).json({
          success: false,
          message: err.message || "File upload failed.",
        });
      }
      next();
    });
  };
};

/**
 * Upload a buffer to Cloudinary and return the result.
 * Throws a proper Error (with .message) on failure so Express can surface it.
 */
export async function uploadToCloudinary(buffer, folder = "blog-covers") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => {
        if (err) {
          const message =
            (typeof err === "object" && err.message) ||
            (typeof err === "string" && err) ||
            JSON.stringify(err);
          return reject(new Error(`Cloudinary upload failed: ${message}`));
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

export default upload;

