import multer from "multer";
import { uploadToCloudflare } from "../config/cloudflare.js";

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
 * Upload a buffer to Cloudflare R2 and return the result.
 * Throws a proper Error (with .message) on failure so Express can surface it.
 */
export async function uploadToCloudflareBuffer(buffer, folder = "blog-covers") {
  return uploadToCloudflare({
    buffer,
    key: `${folder}/${Date.now()}-blog-cover`,
    contentType: "image/jpeg"
  });
}

export default upload;

