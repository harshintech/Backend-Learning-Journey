//Here we save image in uploads folder with some codition like one image and size less than 5 mb and also check file type and we store locally we not pass on cloudinary here

const multer = require("multer");
const path = require("path");

//set out multer storage
const storage = multer.diskStorage({
  //cb means callback function
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      //this create unique file name and upload on given path
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//file filter function
const checkFileFilter = (req, file, cb) => {
  //this check file image type or not
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not a image ! please upload only image"));
  }
};

//multer middleware
module.exports = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB file size limit
  },
});

//Also export like this
// 3️⃣ Final upload handler (multer instance)
// const uploadHandler = multer({
//   storage,
//   fileFilter: checkFileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// });

// 4️⃣ Export this instance
// module.exports = uploadHandler;

// | Concept                                 | What’s Happening                             |
// | --------------------------------------- | -------------------------------------------- |
// | `module.exports = multer(...)`          | You export a **configured multer instance**  |
// | `const uploadMiddleware = require(...)` | You **import and name it** whatever you want |
// | `.single("image")`                      | You call a method on that instance           |

// Frontend Image -> FormData (field: "image")
//         |
//         v
// uploadMiddleware.single("image") [Multer]
//         |
//         v
// ✔ Store image in uploads/
// ✔ Rename image
// ✔ Check image type
// ✔ Check image size
//         |
//         v
// req.file (image info)
