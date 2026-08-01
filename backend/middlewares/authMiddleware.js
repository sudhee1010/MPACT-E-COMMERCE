import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  console.log("========== AUTH DEBUG ==========");
  console.log("Origin:", req.headers.origin);
  console.log("Cookie Header:", req.headers.cookie);
  console.log("Parsed Cookies:", req.cookies);

  try {
    const token = req.cookies.token;

    console.log("Token:", token);

    if (!token) {
      console.log("❌ No token found");
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.isEmailVerified) {
      console.log("❌ Email not verified");
      return res
        .status(403)
        .json({ message: "Please verify your email first" });
    }

    req.user = user;
    console.log("✅ Authenticated:", user.email);

    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};