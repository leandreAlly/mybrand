import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateToken } from "../services/passport.js";

dotenv.config();

// Signup for admin
const adminSignUp = async (req, res) => {
  try {
    const emailExist = await Admin.findOne({ email: req.body.email });

    if (emailExist) {
      return res.status(400).json({ message: "Email already Exist" });
    }
    // Harsh in the inserted password
    const harshPassword = await bcrypt.hash(req.body.password, 10);
    console.log(harshPassword);

    const admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: harshPassword,
    });

    await admin.save();
    return res.status(201).json({ message: "Successfully registered " });
  } catch (error) {
    res.status(500).json({ error: "something Went wrong...!" });
  }
};

const adminLogin = async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    return res.status(404).json({ message: "Wrong credintial" });
  }
  const adminPassword = await bcrypt.compare(req.body.password, admin.password);

  if (!adminPassword) {
    return res.status(401).json({
      status: false,
      message: "Incorect password or email..!",
    });
  }

  const token = generateToken(admin);

  res.status(200).header("auth-token", token).json({
    status: true,
    adminId: admin._id,
    token: token,
    message: "Access granted..!",
  });
};

export { adminSignUp, adminLogin };
