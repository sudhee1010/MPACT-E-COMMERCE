import multer from "multer";
import cloudinary from "../config/cloudinary.js";

// ─── Use memoryStorage so we can handle the upload ourselves ─────────────────
// This avoids multer-storage-cloudinary swallowing Cloudinary errors as plain
// objects (non-Error instances) that turn into "[object Object]" in logs.
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}. Allowed: jpg, png, webp`));
    }
  },
});

/**
 * Upload a buffer to Cloudinary and return the result.
 * Throws a proper Error (with .message) on failure so Express can surface it.
 */
export async function uploadToCloudinary(buffer, folder = "blog-covers") {
  return new Promise((resolve, reject) => {
    console.log("Cloudinary Config:", cloudinary.config());
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => {
        if (err) {
          // Cloudinary returns plain objects, not Error instances.
          // Wrap them so err.message works everywhere.
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
