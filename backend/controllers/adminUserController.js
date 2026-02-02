// import User from "../models/User.js";

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (error) {
//     console.error("Get All Users Error:", error);
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// };




import User from "../models/User.js";
import Order from "../models/Order.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "customer" }).select("-password");
    
    // Get order statistics for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({ user: user._id });
        const ordersCount = orders.length;
        const totalSpent = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        
        return {
          ...user.toObject(),
          orders: ordersCount,
          totalSpent: totalSpent
        };
      })
    );
    
    res.json(usersWithStats);
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
