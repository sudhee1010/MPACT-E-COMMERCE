import User from "../models/User.js";

export const cleanupUnverifiedUsers = async () => {
  try {
    const result = await User.deleteMany({
      isEmailVerified: false,
      otpExpiry: { $lt: Date.now() }
    });

    console.log(`🧹 Deleted ${result.deletedCount} unverified users`);
  } catch (error) {
    console.error("Cleanup error:", error.message);
  }
};
