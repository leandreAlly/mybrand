import express from "express";

import {
  getAllBlog,
  postBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import isValid from "../middleware/blogValidate.js";
const router = express();

router.get("/", getAllBlog);
router.post("/", isValid, postBlog);
router.get("/:id", getSingleBlog);
router.patch("/:id", isValid, updateBlog);
router.delete("/:id", deleteBlog);

export default router;
