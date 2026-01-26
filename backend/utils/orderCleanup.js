import cron from "node-cron";
import Order from "../models/Order.js";

export const startOrderCleanupJob = () => {
  cron.schedule("*/5 * * * *", async () => {
    try {
      const result = await Order.updateMany(
        {
          paymentStatus: "pending",
          createdAt: { $lt: new Date(Date.now() - 15 * 60 * 1000) }
        },
        {
          orderStatus: "cancelled",
          paymentStatus: "expired",
          cancelledBy: "system",
          // isVisible: false
        }
      );

      if (result.modifiedCount > 0) {
        console.log(`🧹 Auto-cancelled ${result.modifiedCount} expired orders`);
      }
    } catch (error) {
      console.error("Order cleanup failed:", error);
    }
  });
};
