const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleWare = require("../middleware/upload-middleware");
const {
  uploadImageController,
  fetchImagesController,
} = require("../controllers/image-controllers");
const router = express.Router();

//upload image
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleWare.single("image"), // <-- multer processes file here, adds req.file
  uploadImageController // <-- your controller reads req.file
);

//to get all images
router.get("/get", authMiddleware, fetchImagesController);

//get all image
module.exports = router;
