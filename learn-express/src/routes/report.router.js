import express from "express";
import adminReport from "../controllers/report.controller.js";

const router = express();

router.get("/", adminReport);

export default router;
