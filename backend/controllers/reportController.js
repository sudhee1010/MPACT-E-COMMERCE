// import Order from "../models/Order.js";
// import User from "../models/User.js";
// import Report from "../models/Report.js";
// import cloudinary from "../config/cloudinary.js";
// import { Parser } from "json2csv";

// /**
//  * SUMMARY CARDS
//  */
// export const getReportSummary = async (req, res) => {
//   try {
//     const totalOrders = await Order.countDocuments();

//     const salesAgg = await Order.aggregate([
//       { $match: { orderStatus: "delivered" } },
//       { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } }
//     ]);

//     const totalSales = salesAgg[0]?.totalSales || 0;
//     const avgOrderValue = totalOrders ? totalSales / totalOrders : 0;

//     const newCustomers = await User.countDocuments({
//       role: "customer",
//       createdAt: { $gte: new Date(new Date().setDate(1)) }
//     });

//     res.json({ totalSales, totalOrders, avgOrderValue, newCustomers });
//   } catch {
//     res.status(500).json({ message: "Failed to fetch summary" });
//   }
// };

// /**
//  * MONTHLY REPORT (Charts + Table)
//  */
// export const getMonthlyReports = async (req, res) => {
//   try {
//     const data = await Order.aggregate([
//       { $match: { orderStatus: "delivered" } },
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           sales: { $sum: "$totalAmount" },
//           orders: { $sum: 1 }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

//     const formatted = data.map((item, index) => {
//       const prev = data[index - 1];
//       const growth = prev ? ((item.sales - prev.sales) / prev.sales) * 100 : 0;

//       return {
//         month: months[item._id - 1],
//         sales: item.sales,
//         orders: item.orders,
//         avgOrder: item.sales / item.orders,
//         growth: Number(growth.toFixed(1))
//       };
//     });

//     res.json(formatted);
//   } catch {
//     res.status(500).json({ message: "Failed to fetch monthly report" });
//   }
// };

// /**
//  * UPLOAD REPORT FILE
//  */
// export const uploadReport = async (req, res) => {
//   try {
//     const report = await Report.create({
//       title: req.file.originalname,
//       file: {
//         url: req.file.path,
//         public_id: req.file.filename
//       },
//       uploadedBy: req.user._id
//     });

//     res.json({ message: "Report uploaded", report });
//   } catch {
//     res.status(500).json({ message: "Upload failed" });
//   }
// };

// /**
//  * LIST UPLOADED REPORTS
//  */
// export const getUploadedReports = async (req, res) => {
//   const reports = await Report.find().populate("uploadedBy", "name");
//   res.json(reports);
// };

// /**
//  * DELETE REPORT
//  */
// export const deleteReport = async (req, res) => {
//   const report = await Report.findById(req.params.id);
//   if (!report) return res.status(404).json({ message: "Not found" });

//   await cloudinary.uploader.destroy(report.file.public_id, {
//     resource_type: "raw"
//   });

//   await report.deleteOne();
//   res.json({ message: "Report deleted" });
// };

// /**
//  * EXPORT CSV
//  */
// export const exportReportCSV = async (req, res) => {
//   const orders = await Order.find({ orderStatus: "delivered" }).select(
//     "totalAmount createdAt"
//   );

//   const parser = new Parser({ fields: ["createdAt", "totalAmount"] });
//   const csv = parser.parse(orders);

//   res.header("Content-Type", "text/csv");
//   res.attachment("sales-report.csv");
//   res.send(csv);
// };




import Order from "../models/Order.js";
import User from "../models/User.js";
import Report from "../models/Report.js";
import cloudinary from "../config/cloudinary.js";
import { Parser } from "json2csv";

/* =========================================================
   SUMMARY CARDS
========================================================= */
export const getReportSummary = async (req, res) => {
  try {
    // Only count delivered orders
    const totalOrders = await Order.countDocuments({
      orderStatus: "delivered"
    });

    const salesAgg = await Order.aggregate([
      { $match: { orderStatus: "delivered" } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalSales = salesAgg[0]?.totalSales || 0;
    const avgOrderValue = totalOrders > 0
      ? totalSales / totalOrders
      : 0;

    // Start of current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const newCustomers = await User.countDocuments({
      role: "customer",
      createdAt: { $gte: startOfMonth }
    });

    res.json({
      totalSales,
      totalOrders,
      avgOrderValue,
      newCustomers
    });

  } catch (error) {
    console.error("Summary Error:", error);
    res.status(500).json({ message: "Failed to fetch summary" });
  }
};

/* =========================================================
   MONTHLY REPORT (Charts + Table)
========================================================= */
export const getMonthlyReports = async (req, res) => {
  try {
    const data = await Order.aggregate([
      { $match: { orderStatus: "delivered" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          sales: { $sum: "$totalAmount" },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const formatted = data.map((item, index) => {
      const prev = data[index - 1];

      const growth =
        prev && prev.sales > 0
          ? ((item.sales - prev.sales) / prev.sales) * 100
          : 0;

      return {
        month: `${months[item._id.month - 1]} ${item._id.year}`,
        sales: item.sales,
        orders: item.orders,
        avgOrder: item.orders > 0
          ? item.sales / item.orders
          : 0,
        growth: Number(growth.toFixed(1))
      };
    });

    res.json(formatted);

  } catch (error) {
    console.error("Monthly Report Error:", error);
    res.status(500).json({ message: "Failed to fetch monthly report" });
  }
};

/* =========================================================
   UPLOAD REPORT FILE
========================================================= */
export const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const report = await Report.create({
      title: req.file.originalname,
      file: {
        url: req.file.path,
        public_id: req.file.filename
      },
      uploadedBy: req.user._id
    });

    res.json({
      message: "Report uploaded successfully",
      report
    });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};

/* =========================================================
   LIST UPLOADED REPORTS
========================================================= */
export const getUploadedReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 });

    res.json(reports);

  } catch (error) {
    console.error("Fetch Uploads Error:", error);
    res.status(500).json({ message: "Failed to fetch uploaded reports" });
  }
};

/* =========================================================
   DELETE REPORT
========================================================= */
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report)
      return res.status(404).json({ message: "Report not found" });

    await cloudinary.uploader.destroy(report.file.public_id, {
      resource_type: "raw"
    });

    await report.deleteOne();

    res.json({ message: "Report deleted successfully" });

  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Failed to delete report" });
  }
};

/* =========================================================
   EXPORT CSV
========================================================= */
export const exportReportCSV = async (req, res) => {
  try {
    const orders = await Order.find({
      orderStatus: "delivered"
    }).select("totalAmount createdAt");

    const formatted = orders.map(order => ({
      date: order.createdAt.toISOString().split("T")[0],
      totalAmount: order.totalAmount
    }));

    const parser = new Parser({
      fields: ["date", "totalAmount"]
    });

    const csv = parser.parse(formatted);

    res.header("Content-Type", "text/csv");
    res.attachment("sales-report.csv");
    res.send(csv);

  } catch (error) {
    console.error("CSV Export Error:", error);
    res.status(500).json({ message: "Failed to export CSV" });
  }
};

