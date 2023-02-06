import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// const authAdmin = (req, res, next) => {
//   const token = req.header("auth-token");
//   console.log(token);

//   try {
//     const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
//     const adminId = decodedToken.adminId;
//     req.user = { adminId };
//     // console.log(req.user);
//     next();
//   } catch (error) {
//     res.status(401).json({
//       error: "Access Denied...!",
//     });
//   }
// };

export const isAuth = (passport) => {
  return passport.authenticate("jwt", { session: false });
};

// export default isAuth;
