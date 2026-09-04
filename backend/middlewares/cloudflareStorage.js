import path from "node:path";
import { deleteFromCloudflare, uploadToCloudflare } from "../config/cloudflare.js";

const sanitize = (name) => name.replace(/[^a-zA-Z0-9._-]/g, "_");

export const createCloudflareStorage = ({ folder, key }) => ({
  _handleFile(req, file, callback) {
    const chunks = [];
    file.stream.on("data", (chunk) => chunks.push(chunk));
    file.stream.once("error", callback);
    file.stream.once("end", async () => {
      try {
        const buffer = Buffer.concat(chunks);
        const originalName = sanitize(file.originalname);
        const objectKey = key
          ? key(req, file)
          : path.posix.join(folder, `${Date.now()}-${originalName}`);
        const result = await uploadToCloudflare({
          buffer,
          key: objectKey,
          contentType: file.mimetype
        });

        callback(null, {
          destination: folder,
          filename: objectKey,
          path: result.url,
          size: buffer.length,
          key: objectKey,
          location: result.url
        });
      } catch (error) {
        callback(error);
      }
    });
  },

  _removeFile(_req, file, callback) {
    deleteFromCloudflare(file.key).then(() => callback()).catch(callback);
  }
});