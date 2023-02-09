import express from "express";

import { addLikes, likeCounter } from "../controllers/like.controller.js";
import router from "./comment.router.js";

router.post("/:id/likes", addLikes);
router.get("/:id/likes", likeCounter);

export default router;
