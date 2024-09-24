import streamifier from "streamifier";
import multer from "multer";
import cloudinary from "../Utils/cloudinary";

const storage = multer.memoryStorage();

const upload = multer({ storage });

const uploadToCloudinary = async (fileBuffer: any) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      return reject(new Error("File buffer is missing."));
    }
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      (error: any, result: any) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export { upload, uploadToCloudinary };
