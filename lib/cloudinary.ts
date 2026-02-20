import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.Cloudinary_CLOUD_NAME,
  api_key: process.env.Cloudinary_API_KEY,
  api_secret: process.env.Cloudinary_API_SECRET,
});

export async function uploadImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: process.env.Clodinary_FOLDER || "portfolio",
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });

  return result.secure_url;
}

export async function deleteImage(url: string) {
  const parts = url.split("/");
  const folderAndFile = parts.slice(-2).join("/");
  const publicId = folderAndFile.replace(/\.[^/.]+$/, "");

  await cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
