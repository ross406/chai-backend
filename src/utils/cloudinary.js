import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // Upload the file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detect the file type (image, video, etc.)
    });
    fs.unlinkSync(localFilePath, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
      } else {
        console.log("Local file deleted successfully");
      }
    });
    // console.log("File uploaded successfully:", uploadResult);
    return uploadResult; // Return the secure URL of the uploaded file
  } catch (error) {
    fs.unlink(localFilePath, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
      } else {
        console.log("Local file deleted successfully");
      }
    });

    console.error("Error uploading file to Cloudinary:", error);
    return null; // Return null in case of an error
  }
};

export { uploadOnCloudinary };
