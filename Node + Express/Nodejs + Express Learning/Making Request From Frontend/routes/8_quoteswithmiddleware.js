import express from "express";
const router = express.Router();
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";

//Get All Post
router.get("/", getPosts);

//Get One Post with id
router.get("/:id", getPost);

//Create new Post
router.post("/", createPost);

//Update Post
router.put("/:id", updatePost);

//Delete Post
router.delete("/:id", deletePost);

export default router;
