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
import passport from "passport";
import { isAuth } from "../middleware/auth.js";

const router = express();

router.get("/", getAllBlog);

router.post(
  "/",
  isAuth(passport),
  upload.single("picture"),
  isValid("blog"),
  postBlog
);
router.get("/:id", getSingleBlog);

router.patch(
  "/:id",
  isAuth(passport),
  upload.single("picture"),
  isValid("blog"),
  updateBlog
);
router.delete("/:id", isAuth(passport), deleteBlog);

export default router;
