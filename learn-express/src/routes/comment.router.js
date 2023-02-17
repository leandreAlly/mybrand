import express from "express";

import {
  storeComment,
  getCommentsPerPost,
  getAllComment,
} from "../controllers/comment.controller.js";
import isValid from "../middleware/Validate.js";

const router = express();
router.get("/all/comment", getAllComment);
router.post("/:id/comments", isValid("comment"), storeComment);
router.get("/:id/comments", getCommentsPerPost);

export default router;
