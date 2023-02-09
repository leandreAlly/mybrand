import express from "express";
import morgan from "morgan";
import apiRouter from "./routes/api.js";
import passport from "passport";
import { jwtStrategy } from "./config/passport.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// app.use(morgan("combined"));
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());
app.use("/api/v1", apiRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "My Blog Api" });
});

export default app;
