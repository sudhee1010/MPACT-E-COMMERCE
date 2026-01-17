// import User from "../models/User.js";

// export const getAllUsers = async (req, res) => {
//   const users = await User.find().select("-password");
//   res.json(users);
// };

import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
