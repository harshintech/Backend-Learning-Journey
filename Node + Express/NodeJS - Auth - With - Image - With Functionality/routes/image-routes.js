const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleWare = require("../middleware/upload-middleware");
const {
  uploadImageController,
  fetchImagesController,
  deletImageController,
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

//delete image route
router.delete("/:id", authMiddleware, adminMiddleware, deletImageController);

//get all image
module.exports = router;
