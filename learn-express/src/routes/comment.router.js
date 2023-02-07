import express from "express";

import {
  storeComment,
  getCommentsPerPost,
} from "../controllers/comment.controller.js";

const router = express();

router.post("/:id/comments", storeComment);
router.get("/:id/comments", getCommentsPerPost);

export default router;
