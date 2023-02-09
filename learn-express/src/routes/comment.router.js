import express from "express";

import {
  storeComment,
  getCommentsPerPost,
} from "../controllers/comment.controller.js";
import isValid from "../middleware/Validate.js";

const router = express();

router.post("/:id/comments", isValid("comment"), storeComment);
router.get("/:id/comments", getCommentsPerPost);

export default router;
