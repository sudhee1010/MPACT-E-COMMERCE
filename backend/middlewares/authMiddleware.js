// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     // 1️⃣ Read token from HTTP-only cookie
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ message: "Not authorized, no token" });
//     }

//     // 2️⃣ Verify JWT
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 3️⃣ Attach user to request (exclude password)
//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     // 4️⃣ Continue
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Not authorized, token invalid" });
//   }
// };





import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // 1️⃣ Read token from HTTP-only cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 2️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Attach user to request (exclude password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔐 IMPORTANT: Check email verification
    if (!user.isEmailVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

