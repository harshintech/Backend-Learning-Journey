const cloudinary = require("../config/cloudinary"); //---> First Check This How Setup Cloudinary

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Error while uploading to cloudinary", error);
    throw new Error("Error while uploading to cloudinary");
  }
};

module.exports = { uploadToCloudinary };



// Exactly, Harsh! Here’s the flow:

// Multer receives the image from frontend and saves it locally in your server’s uploads/ folder.

// Then you take that local saved file’s path (filePath) and upload it to Cloudinary using your uploadToCloudinary function.

// After successful upload, you can delete the local file because now the image is safely stored on Cloudinary’s cloud.

// You store Cloudinary’s URL and public ID in your database for later use.

//-------------------------------------------------------------------------------------------------------------

// Important properties in result (commonly used ones):

// public_id — Unique identifier of the uploaded file in your Cloudinary account.
// secure_url — The HTTPS URL where your uploaded image/video is accessible.
// url — Non-HTTPS URL (less secure, usually avoid).
// width and height — Dimensions of the uploaded image.
// format — File format like jpg, png, mp4, etc.
// created_at — Timestamp when the upload was completed.
// bytes — File size in bytes.
// resource_type — Type of the uploaded resource (image, video, raw).
