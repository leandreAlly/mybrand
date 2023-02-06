import express from "express";

import {
  getAllContactMessage,
  postContactMessage,
} from "../controllers/contact.controller.js";
// import isValid from "../middleware/contactValidate.js";
// import auth from "../middleware/auth.js";
import passport from "passport";
import { isAuth } from "../middleware/auth.js";

const router = express();

router.get("/", isAuth(passport), getAllContactMessage);
router.post("/", postContactMessage);

export default router;
