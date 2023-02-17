import express from "express";
import passport from "passport";
import { isAuth } from "../middleware/auth.js";

import {
  storeComment,
  getCommentsPerPost,
  getAllComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import isValid from "../middleware/Validate.js";

const router = express();
router.get("/all/comment", getAllComment);
router.post("/:id/comments", isValid("comment"), storeComment);
router.get("/:id/comments", getCommentsPerPost);
router.delete("/all/:id/comment", isAuth(passport), deleteComment);

export default router;
