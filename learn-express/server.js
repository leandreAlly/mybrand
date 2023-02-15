import http from "http";
import dotenv from "dotenv";

import { dbConnect } from "./src/services/mongo.js";
import app from "./src/app.js";

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
