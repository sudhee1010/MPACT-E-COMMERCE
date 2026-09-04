import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const required = [
  "CLOUDFLARE_R2_ACCOUNT_ID",
  "CLOUDFLARE_R2_ACCESS_KEY_ID",
  "CLOUDFLARE_R2_SECRET_ACCESS_KEY",
  "CLOUDFLARE_R2_BUCKET_NAME",
  "CLOUDFLARE_R2_PUBLIC_URL"
];

const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.warn(`Missing Cloudflare R2 environment variables: ${missing.join(", ")}`);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || ""
  }
});

const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL?.replace(/\/$/, "");

export const uploadToCloudflare = async ({ buffer, key, contentType }) => {
  if (!publicUrl) {
    throw new Error("CLOUDFLARE_R2_PUBLIC_URL is required for uploads");
  }

  await client.send(new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType
  }));

  return {
    secure_url: `${publicUrl}/${key}`,
    public_id: key,
    url: `${publicUrl}/${key}`,
    key
  };
};

export const deleteFromCloudflare = async (key) => {
  if (!key) return;

  const objectKey = key.startsWith(`${publicUrl}/`)
    ? key.slice(publicUrl.length + 1)
    : key;

  await client.send(new DeleteObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: objectKey
  }));
};