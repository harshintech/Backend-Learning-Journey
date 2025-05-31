const Image = require("../models/Image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelpers");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadImageController = async (req, res) => {
  try {
    //check if file is missing in req in object
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is requires. please upload an image",
      });
    }

    //upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    //store the image url and public id along with the uploaded user id in database
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newlyUploadedImage.save();

    //delete the file from localStorage
    // fs.unlinkSync(req.file.path); //--> it's help to clean after all process

    res.status(201).json({
      sucess: true,
      message: "Image Uploaded successfully",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong ! please try again",
    });
  }
};

const fetchImagesController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; //pagination concept here include
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    const sortObj = {};
    sortObj[sortBy] = sortOrder;
    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

    if (images) {
      res.status(200).json({
        success: true,
        currentPage: page,
        totalPage: totalPages,
        totalImages: totalImages,
        data: images,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong ! please try again",
    });
  }
};

const deletImageController = async (req, res) => {
  try {
    const getCurrentIdOfImageToBeDeleted = req.params.id;
    const userId = req.userInfo.userId;

    const image = await Image.findById(getCurrentIdOfImageToBeDeleted);

    if (!image) {
      return res.status.json({
        success: false,
        message: "Image not found",
      });
    }

    //check if this image is uploaded by the current user who is trying to delete this image
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to delete this image because you haven't uploaded it",
      });
    }

    console.log("here i am done");
    //delete this image first from your cloudynary storage
    await cloudinary.uploader.destroy(image.publicId);

    //delete this image from your mongoDB database
    await Image.findByIdAndUpdate(getCurrentIdOfImageToBeDeleted);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong ! please try again",
    });
  }
};

module.exports = {
  uploadImageController,
  fetchImagesController,
  deletImageController,
};

// Where does req.file come from?
// You don’t save req.file yourself anywhere explicitly.

// req.file is automatically added by multer middleware when you use .single("image") in your route.

// How does it work exactly?
// When a client sends a multipart/form-data request with a file field named "image", multer intercepts that request.

// Multer processes the file upload — saves the file to your configured storage (local disk in your case).

// Multer then attaches the file information to the request object as req.file.

// What is inside req.file?
// It contains details like:

// req.file.path — the full path where the file was saved on your server

// req.file.originalname — original file name from the client

// req.file.mimetype — file type (like "image/png")

// req.file.size — file size

// and other metadata

// Summary:
// You don’t manually set or save req.file.

// Multer does that for you automatically.

// Your controller simply uses req.file because multer put it there.
