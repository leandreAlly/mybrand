import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "My Blog Api" });
});

export default app;
