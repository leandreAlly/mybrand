import express from "express";
import morgan from "morgan";
import apiRouter from "./routes/api.js";

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.use("/api/v1", apiRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "My Blog Api" });
});

export default app;
