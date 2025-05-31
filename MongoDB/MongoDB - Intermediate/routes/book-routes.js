const express = require("express");

const {
  createAuthor,
  createBook,
  getBookWithAuthor,
} = require("../controllers/book-controllers");

const router = express.Router();

router.post("/author", createAuthor);
router.post("/book", createBook);
router.post("/book/:id", getBookWithAuthor);

module.exports = router;
