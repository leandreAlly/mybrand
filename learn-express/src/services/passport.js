import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = (admin) => {
  const expiresIn = "1d";
  const payload = {
    name: admin.name,
    email: admin.email,
    adminId: admin._id,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: expiresIn });
};
