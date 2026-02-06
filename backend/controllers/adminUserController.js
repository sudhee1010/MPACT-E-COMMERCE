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


export const banUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { banReason } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!banReason || banReason.trim() === "") {
      return res.status(400).json({ message: "Ban reason is required" });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isBanned) {
      return res.status(400).json({ message: "User is already banned" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isBanned: true,
        banReason: banReason
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: `User ${updatedUser.name} has been banned successfully`,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isBanned: updatedUser.isBanned,
        banReason: updatedUser.banReason
      }
    });
  } catch (error) {
    console.error("Ban User Error:", error);
    res.status(500).json({ message: "Failed to ban user" });
  }
};

export const unbanUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isBanned) {
      return res.status(400).json({ message: "User is not banned" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isBanned: false,
        banReason: ""
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: `User ${updatedUser.name} has been unbanned successfully`,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isBanned: updatedUser.isBanned,
        banReason: updatedUser.banReason
      }
    });
  } catch (error) {
    console.error("Unban User Error:", error);
    res.status(500).json({ message: "Failed to unban user" });
  }
};
