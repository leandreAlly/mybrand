import express from "express";

import {
  getAllBlog,
  postBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import upload from "../services/multer.js";
import isValid from "../middleware/Validate.js";
const router = express();

router.get("/", getAllBlog);
router.post("/", upload.single("picture"), isValid, postBlog);
router.get("/:id", getSingleBlog);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
