const Image = require("../models/Image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelpers");
const fs = require("fs");

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
    const images = await Image.find({});

    if (images) {
      res.status(200).json({
        success: true,
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

module.exports = {
  uploadImageController,
  fetchImagesController,
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
