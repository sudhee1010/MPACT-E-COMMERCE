import express from "express";
import {
  registerUser,
  loginUser,
  sendOTP,
  verifyOTP, forgotPassword,
  resetPassword, sendPhoneOTP,
  verifyPhoneOTP,googleLogin,
  registerAdmin
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/register-admin", registerAdmin);
router.post("/login", loginUser);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/phone/send-otp", sendPhoneOTP);
router.post("/phone/verify-otp", verifyPhoneOTP);
router.post("/google-login", googleLogin);

export default router;
