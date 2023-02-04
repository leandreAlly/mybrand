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
import auth from "../middleware/auth.js";
const router = express();

router.get("/", getAllBlog);
router.post("/", auth, upload.single("picture"), isValid, postBlog);
router.get("/:id", getSingleBlog);
router.patch("/:id", auth, upload.single("picture"), isValid, updateBlog);
router.delete("/:id", auth, deleteBlog);

export default router;
