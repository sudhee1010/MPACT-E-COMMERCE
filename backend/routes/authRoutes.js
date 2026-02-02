import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import uploadUserImage from "../middlewares/uploadUserImage.js";
import {
  registerUser,
  loginUser,
  sendOTP,
  verifyOTP, forgotPassword,
  resetPassword, sendPhoneOTP,
  verifyPhoneOTP,googleLogin,
  registerAdmin,logoutUser,getCustomerProfile,updatePassword,deleteMe,updateCustomerProfile, uploadProfileImage
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/register-admin",protect, isAdmin, registerAdmin);
router.post("/login", loginUser);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/phone/send-otp", sendPhoneOTP);
router.post("/phone/verify-otp", verifyPhoneOTP);
router.post("/google-login", googleLogin);
router.post("/logout", logoutUser);
router.get("/profile", protect, getCustomerProfile);
router.put("/update-password", protect, updatePassword);
router.delete("/delete-me", protect, deleteMe);
router.put("/update-profile", protect, updateCustomerProfile);
router.put("/upload-profile-image", protect, uploadUserImage.single("profileImage"), uploadProfileImage);




export default router;
