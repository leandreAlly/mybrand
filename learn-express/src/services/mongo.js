import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL;

mongoose.connection.once("open", () => {
  console.log("Database connected");
});

mongoose.connection.on("open", () => {
  // console.log("error happen! ");
});

const dbConnect = async () => {
  await mongoose.set("strictQuery", false).connect(DB_URL);
};

const dbDisconnect = async () => {
  await mongoose.disconnect();
};

export { dbConnect, dbDisconnect };
