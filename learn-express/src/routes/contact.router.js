import express from "express";

import {
  getAllContactMessage,
  postContactMessage,
} from "../controllers/contact.controller.js";
// import isValid from "../middleware/contactValidate.js";

const router = express();

router.get("/", getAllContactMessage);
router.post("/", postContactMessage);

export default router;
