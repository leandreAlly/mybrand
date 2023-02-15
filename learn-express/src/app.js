import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import apiRouter from "./routes/api.js";
import passport from "passport";
import { jwtStrategy } from "./config/passport.js";
import { serve, setup } from "swagger-ui-express";
import dotenv from "dotenv";
const swaggerDocument = require("../swagger.json");

dotenv.config();
const app = express();
const DB_URL = process.env.DB_URL;

mongoose
  .set("strictQuery", false)
  .connect(DB_URL)
  .then(() => {
    console.log("Database connected .......");
  })
  .catch((err) => {
    console.log("+++++++++", err);
  });

// app.use(morgan("combined"));
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "My Blog Api" });
});
app.use("/api/v1", apiRouter);
app.use("/api-docs", serve, setup(swaggerDocument));

export default app;
