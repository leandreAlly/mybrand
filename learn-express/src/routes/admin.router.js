import express from "express";

import { adminSignUp, adminLogin } from "../controllers/admin.controller.js";

const router = express();

router.post("/signup", adminSignUp);
router.post("/login", adminLogin);

export default router;
