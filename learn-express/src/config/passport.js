import dotenv from "dotenv";
dotenv.config();
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET,
};

export const jwtStrategy = new JwtStrategy(options, (payload, done) => {
  return done(null, { adminId: payload.adminId });
});
