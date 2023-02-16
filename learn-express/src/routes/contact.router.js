import express from "express";

import {
  getAllContactMessage,
  postContactMessage,
  deleteMessage,
} from "../controllers/contact.controller.js";
import isValid from "../middleware/Validate.js";

import passport from "passport";
import { isAuth } from "../middleware/auth.js";

const router = express();

router.get("/", isAuth(passport), getAllContactMessage);
router.post("/", isValid("message"), postContactMessage);
router.delete("/:id", deleteMessage);
export default router;
