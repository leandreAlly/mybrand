import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuth = (passport) => {
  return passport.authenticate("jwt", { session: false });
};
