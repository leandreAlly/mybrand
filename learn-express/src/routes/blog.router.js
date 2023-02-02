import express from "express";

import {
  getAllBlog,
  postBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

const router = express();

router.get("/", getAllBlog);
router.post("/", postBlog);
router.get("/:id", getSingleBlog);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
