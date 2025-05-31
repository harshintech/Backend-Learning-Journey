const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book Title is Required"],
    trim: true,
    maxLength: [100, "Book title can not be more than 100 characters"],
  },
  author: {
    type: String,
    required: [true, "Author name is Required"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Publication year is required"],
    min: [1000, "Year Must be at least 1000"],
    max: [new Date().getFullYear(), "Year cannot be in the future"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", BookSchema); // we directly export module here with create schema
