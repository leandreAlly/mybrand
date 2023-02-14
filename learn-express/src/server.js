import http from "http";
import dotenv from "dotenv";

import { dbConnect } from "./services/mongo.js";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const startServer = async () => {
  await dbConnect();
  server.listen(port, () => {
    console.log(`server is running on port: ${port}`);
  });
};

startServer();
