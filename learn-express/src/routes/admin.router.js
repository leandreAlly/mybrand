import express from "express";

import { adminSignUp, adminLogin } from "../controllers/admin.controller.js";
import isValid from "../middleware/Validate.js";

const router = express();

router.post("/signup", adminSignUp);
router.post("/login", isValid("login"), adminLogin);

export default router;
