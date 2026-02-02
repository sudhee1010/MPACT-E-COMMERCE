// import User from "../models/User.js";
// import Product from "../models/Product.js";
// import Order from "../models/Order.js";

// /**
//  * @desc    Get admin dashboard statistics
//  * @route   GET /api/admin/dashboard
//  * @access  Admin
//  */
// export const getDashboardStats = async (req, res) => {
//   // 1️⃣ Counts
//   const totalUsers = await User.countDocuments({ role: "customer" });
//   const totalProducts = await Product.countDocuments({ isActive: true });
//   const totalOrders = await Order.countDocuments();

//   // 2️⃣ Total Revenue (only paid / delivered orders)
//   const revenueResult = await Order.aggregate([
//     {
//       $match: {
//         orderStatus: "delivered"
//       }
//     },
//     {
//       $group: {
//         _id: null,
//         totalRevenue: { $sum: "$totalAmount" }
//       }
//     }
//   ]);

//   const totalRevenue =
//     revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

//   // 3️⃣ Order Status Breakdown
//   const orderStatusStats = await Order.aggregate([
//     {
//       $group: {
//         _id: "$orderStatus",
//         count: { $sum: 1 }
//       }
//     }
//   ]);

//   res.json({
//     totalUsers,
//     totalProducts,
//     totalOrders,
//     totalRevenue,
//     orderStatusStats
//   });
// };



// /**
//  * @desc    Get recent orders
//  * @route   GET /api/admin/orders/recent
//  * @access  Admin
//  */
// export const getRecentOrders = async (req, res) => {
//   const orders = await Order.find()
//     .populate("user", "name email")
//     .sort({ createdAt: -1 })
//     .limit(5);

//   res.json(orders);
// };






// /**
//  * @desc    Get low stock products
//  * @route   GET /api/admin/products/low-stock
//  * @access  Admin
//  */
// export const getLowStockProducts = async (req, res) => {
//   const products = await Product.find({
//     stock: { $lte: 5 },
//     isActive: true
//   }).select("name stock");

//   res.json(products);
// };

// import User from "../models/User.js";
// import Product from "../models/Product.js";
// import Order from "../models/Order.js";

// /**
//  * @desc    Get admin dashboard statistics
//  * @route   GET /api/admin/dashboard
//  * @access  Admin
//  */
// export const getDashboardStats = async (req, res) => {
//   try {
//     // 1️⃣ Counts
//     const totalUsers = await User.countDocuments({ role: "customer" });
//     const totalProducts = await Product.countDocuments({ isActive: true });
//     const totalOrders = await Order.countDocuments();

//     // 2️⃣ Total Revenue (only paid / delivered orders)
//     const revenueResult = await Order.aggregate([
//       {
//         $match: {
//           orderStatus: "delivered"
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           totalRevenue: { $sum: "$totalAmount" }
//         }
//       }
//     ]);

//     const totalRevenue =
//       revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

//     // 3️⃣ Order Status Breakdown
//     const orderStatusStats = await Order.aggregate([
//       {
//         $group: {
//           _id: "$orderStatus",
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     res.json({
//       totalUsers,
//       totalProducts,
//       totalOrders,
//       totalRevenue,
//       orderStatusStats
//     });
//   } catch (error) {
//     console.error("Admin Dashboard Stats Error:", error);
//     res.status(500).json({ message: "Failed to fetch dashboard statistics" });
//   }
// };

// /**
//  * @desc    Get recent orders
//  * @route   GET /api/admin/orders/recent
//  * @access  Admin
//  */
// export const getRecentOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("user", "name email")
//       .sort({ createdAt: -1 })
//       .limit(5);

//     res.json(orders);
//   } catch (error) {
//     console.error("Get Recent Orders Error:", error);
//     res.status(500).json({ message: "Failed to fetch recent orders" });
//   }
// };

// /**
//  * @desc    Get low stock products
//  * @route   GET /api/admin/products/low-stock
//  * @access  Admin
//  */
// export const getLowStockProducts = async (req, res) => {
//   try {
//     const products = await Product.find({
//       stock: { $lte: 5 },
//       isActive: true
//     }).select("name stock");

//     res.json(products);
//   } catch (error) {
//     console.error("Get Low Stock Products Error:", error);
//     res.status(500).json({ message: "Failed to fetch low stock products" });
//   }
// };







import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

/**
 * @route   GET /api/admin/dashboard
 */
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "customer" });
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();

    const revenue = await Order.aggregate([
      { $match: { orderStatus: "delivered" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: revenue[0]?.totalRevenue || 0
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard stats failed" });
  }
};

/**
 * @route   GET /api/admin/analytics/monthly
 */
export const getMonthlyAnalytics = async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          sales: { $sum: "$totalAmount" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const formatted = data.map(item => ({
      month: months[item._id - 1],
      sales: item.sales,
      orders: item.orders
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Analytics failed" });
  }
};

/**
 * @route   GET /api/admin/orders/recent
 */
export const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recent orders" });
  }
};


/**
 * @route   GET /api/admin/products/low-stock
 */
export const getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      countInStock: { $lte: 5 },
      isActive: true
    }).select("name countInStock");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Low stock fetch failed" });
  }
};
