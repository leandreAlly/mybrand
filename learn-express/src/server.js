// import http from "http";
import dotenv from "dotenv";

import { dbConnect } from "./services/mongo.js";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 3000;

// // const server = http.createServer(app);

// const startServer = async () => {
//   await dbConnect();
//   app.listen(process.env.PORT || 3000, () => {
//     console.log(`server is running on port: ${PORT}`);
//   });
// };

// startServer();
app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port} ...`);
});
