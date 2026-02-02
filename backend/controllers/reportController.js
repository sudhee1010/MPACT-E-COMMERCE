import Order from "../models/Order.js";
import User from "../models/User.js";
import Report from "../models/Report.js";
import cloudinary from "../config/cloudinary.js";
import { Parser } from "json2csv";

/**
 * SUMMARY CARDS
 */
export const getReportSummary = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const salesAgg = await Order.aggregate([
      { $match: { orderStatus: "delivered" } },
      { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } }
    ]);

    const totalSales = salesAgg[0]?.totalSales || 0;
    const avgOrderValue = totalOrders ? totalSales / totalOrders : 0;

    const newCustomers = await User.countDocuments({
      role: "customer",
      createdAt: { $gte: new Date(new Date().setDate(1)) }
    });

    res.json({ totalSales, totalOrders, avgOrderValue, newCustomers });
  } catch {
    res.status(500).json({ message: "Failed to fetch summary" });
  }
};

/**
 * MONTHLY REPORT (Charts + Table)
 */
export const getMonthlyReports = async (req, res) => {
  try {
    const data = await Order.aggregate([
      { $match: { orderStatus: "delivered" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          sales: { $sum: "$totalAmount" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const formatted = data.map((item, index) => {
      const prev = data[index - 1];
      const growth = prev ? ((item.sales - prev.sales) / prev.sales) * 100 : 0;

      return {
        month: months[item._id - 1],
        sales: item.sales,
        orders: item.orders,
        avgOrder: item.sales / item.orders,
        growth: Number(growth.toFixed(1))
      };
    });

    res.json(formatted);
  } catch {
    res.status(500).json({ message: "Failed to fetch monthly report" });
  }
};

/**
 * UPLOAD REPORT FILE
 */
export const uploadReport = async (req, res) => {
  try {
    const report = await Report.create({
      title: req.file.originalname,
      file: {
        url: req.file.path,
        public_id: req.file.filename
      },
      uploadedBy: req.user._id
    });

    res.json({ message: "Report uploaded", report });
  } catch {
    res.status(500).json({ message: "Upload failed" });
  }
};

/**
 * LIST UPLOADED REPORTS
 */
export const getUploadedReports = async (req, res) => {
  const reports = await Report.find().populate("uploadedBy", "name");
  res.json(reports);
};

/**
 * DELETE REPORT
 */
export const deleteReport = async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) return res.status(404).json({ message: "Not found" });

  await cloudinary.uploader.destroy(report.file.public_id, {
    resource_type: "raw"
  });

  await report.deleteOne();
  res.json({ message: "Report deleted" });
};

/**
 * EXPORT CSV
 */
export const exportReportCSV = async (req, res) => {
  const orders = await Order.find({ orderStatus: "delivered" }).select(
    "totalAmount createdAt"
  );

  const parser = new Parser({ fields: ["createdAt", "totalAmount"] });
  const csv = parser.parse(orders);

  res.header("Content-Type", "text/csv");
  res.attachment("sales-report.csv");
  res.send(csv);
};
