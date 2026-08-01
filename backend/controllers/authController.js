import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { generateOTP } from "../utils/sendOTP.js";
import sendEmail from "../utils/sendEmail.js";
import { verifyGoogleToken } from "../utils/googleVerify.js";
import cloudinary from "../config/cloudinary.js";
import { generateSecureOTP } from "../utils/otpHelper.js";
import { formatPhoneNumber } from "../utils/formatPhoneNumber.js";
import { sendWhatsappOTP } from "../utils/sendWhatsappOTP.js";
/* ===========================
   EMAIL REGISTER LOGIN
=========================== */


// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     let user = await User.findOne({ email });

//     const otp = generateOTP();

//     /* USER ALREADY EXISTS */

//     if (user) {

//       // If already verified → block signup
//       if (user.isEmailVerified) {
//         return res.status(400).json({ message: "User already exists" });
//       }

//       // If NOT verified → update OTP and resend
//       user.otp = otp.toString();
//       user.otpExpiry = Date.now() + 10 * 60 * 1000;
//       await user.save();

//       await sendEmail({
//         to: email,
//         subject: "Your OTP Code",
//         text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
//       });

//       return res.json({
//         message: "User already registered but not verified. OTP resent.",
//       });
//     }

//     /* NEW USER */

//     const hashedPassword = await bcrypt.hash(password, 10);

//     user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       isEmailVerified: false,
//       role: "customer",
//       otp: otp.toString(),
//       otpExpiry: Date.now() + 10 * 60 * 1000,
//     });

//     await sendEmail({
//       to: email,
//       subject: "Your OTP Code",
//       text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
//     });

//     res.status(201).json({
//       message: "Registered successfully. OTP sent to email.",
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
const formattedPhone = formatPhoneNumber(phone);
    let user = await User.findOne({ email });

    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);

    if (user) {
      if (user.isEmailVerified) {
        return res.status(400).json({ message: "User already exists" });
      }

      user.otp = hashedOTP;
      user.otpExpiry = Date.now() + 10 * 60 * 1000;
      await user.save();

      // await sendEmail({
      //   to: email,
      //   subject: "Your OTP Code",
      //   text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
      // });
await sendWhatsappOTP({
  phone: formattedPhone,
  otp,
});
      return res.json({
        message: "User already registered but not verified. OTP resent.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
       phone: formattedPhone,
      isEmailVerified: false,
      role: "customer",
      otp: hashedOTP,
      otpExpiry: Date.now() + 10 * 60 * 1000,
    });

    // await sendEmail({
    //   to: email,
    //   subject: "Your OTP Code",
    //   text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    // });
    await sendWhatsappOTP({
     phone: formattedPhone,
    otp,
});

    res.status(201).json({
      message: "Registered successfully. OTP sent to email.",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


/* ===========================
   EMAIL REGISTER ADMIN
=========================== */
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      isEmailVerified: true,
      role: "admin",
    });

    // res.status(201).json({
    //   token: generateToken(user._id), user
    // });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "strict",
       secure: true,        // MUST be true in production
  sameSite: "None",    // MUST for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Admin registered",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   EMAIL LOGIN
=========================== */




// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email }).select("+password");
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // 🚫 BLOCK BANNED USER
//     if (user.isBanned) {
//       return res.status(403).json({
//         message: "Your account has been banned",
//         reason: user.banReason || "No reason provided",
//       });
//     }

//     // ❌ EMAIL NOT VERIFIED
//     if (!user.isEmailVerified) {
//       return res.status(403).json({ message: "Email not verified" });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = generateToken(user._id);

//     // ✅ SET COOKIE
//     res.cookie("token", token, {
//       httpOnly: true,
//       // secure: process.env.NODE_ENV === "production",
//       // sameSite: "strict",
//       // sameSite: "none",
//       sameSite: "lax",
//       secure: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     // ✅ SEND SAFE USER DATA ONLY
//     res.json({
//       message: "Login successful",
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         isBanned: user.isBanned,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Login failed" });
//   }
// };


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.isBanned) {
      return res.status(403).json({
        message: "Your account has been banned",
        reason: user.banReason || "No reason provided",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      // sameSite: "lax",
      // secure: process.env.NODE_ENV === "production",
       secure: true,        // MUST be true in production
  sameSite: "None",    // MUST for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isBanned: user.isBanned,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

/* ===========================
   SEND EMAIL OTP
=========================== */


// export const sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // ❌ prevent sending OTP if already verified
//     if (user.isEmailVerified) {
//       return res.status(400).json({ message: "Email already verified" });
//     }

//     // generate OTP
//     const otp = generateOTP();

//     // 🔐 hash OTP before saving
//     const hashedOTP = await bcrypt.hash(otp, 10);

//     user.otp = hashedOTP;
//     user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
//     await user.save();

//     // send email
//     await sendEmail({
//       to: email,
//       subject: "MPACT Email Verification OTP",
//       text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
//     });

//     res.json({ message: "OTP sent successfully" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };


export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    if (user.otpExpiry && user.otpExpiry > Date.now() - 60000) {
      return res.status(429).json({
        message: "Please wait before requesting another OTP"
      });
    }

    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail({
      to: email,
      subject: "MPACT Email Verification OTP",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
      // text:otp,
    });

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

/* ===========================
   VERIFY EMAIL OTP
=========================== */

// export const verifyOTP = async (req, res) => {
//   try {

//     const { email, otp } = req.body;

//     const user = await User.findOne({ email }).select("+otp");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!user.otp || user.otpExpiry < Date.now()) {
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     // ✅ compare hashed OTP
//     const isMatch = await bcrypt.compare(otp, user.otp);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     user.isEmailVerified = true;
//     user.otp = null;
//     user.otpExpiry = null;

//     await user.save();

//     const token = generateToken(user._id);

//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.json({
//       message: "Email verified successfully",
//       user
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


export const verifyOTP = async (req, res) => {
  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email }).select("+otp");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isEmailVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      // sameSite: "lax",
      // secure: process.env.NODE_ENV === "production",
       secure: true,        // MUST be true in production
  sameSite: "None",    // MUST for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Email verified successfully",
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   FORGOT PASSWORD
=========================== */
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const otp = generateOTP();
//     user.otp = otp.toString();
//     user.otpExpiry = Date.now() + 10 * 60 * 1000;
//     await user.save();

//     await sendEmail({
//       to: email,
//       subject: "Password Reset OTP",
//       text: `Your password reset OTP is ${otp}`,
//     });

//     res.json({ message: "OTP sent to email" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const forgotPassword = async (req, res) => {
  try {
    const { phone } = req.body;

const formattedPhone = formatPhoneNumber(phone);

const user = await User.findOne({
    phone: formattedPhone,
});
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendWhatsappOTP({
phone: formattedPhone,
      otp,
    });

    res.status(200).json({
      message: "Password reset OTP sent successfully.",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};


/* ===========================
   RESET PASSWORD
=========================== */
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     const user = await User.findOne({ email }).select("+password");

//     if (!user || user.otp !== otp.toString() || user.otpExpiry < Date.now()) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     user.password = await bcrypt.hash(newPassword, 10);
//     user.otp = null;
//     user.otpExpiry = null;
//     await user.save();

//     res.json({ message: "Password reset successful" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


export const resetPassword = async (req, res) => {
  try {

const { phone, otp, newPassword } = req.body;

// const { phone, otp, newPassword } = req.body;

const formattedPhone = formatPhoneNumber(phone);

const user = await User.findOne({
    phone: formattedPhone,
})
    .select("+password +otp");

    if (!user || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   PHONE OTP LOGIN
=========================== */
export const sendPhoneOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    let user = await User.findOne({ phone });
    const otp = generateOTP();

    if (!user) {
      user = await User.create({
        name: "Phone User",
        phone,
        otp: otp.toString(),
        otpExpiry: Date.now() + 10 * 60 * 1000,
        isPhoneVerified: false,
      });
    } else {
      user.otp = otp.toString();
      user.otpExpiry = Date.now() + 10 * 60 * 1000;
      await user.save();
    }

    console.log(`📱 OTP for ${phone}: ${otp}`);

    res.json({ message: "OTP sent to phone (mock)" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPhoneOTP = async (req, res) => {
  try {
    const { phone, otp, name, email } = req.body;

    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp.toString() || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isPhoneVerified = true;
    if (name) user.name = name;
    if (email) user.email = email;

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({
      message: "Phone login successful",
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Google token required" });
    }

    const payload = await verifyGoogleToken(token);

    const { email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        isEmailVerified: true,
      });
    }

    const tokens = generateToken(user._id);

    res.cookie("token", tokens, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Google login successful",
      user,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid Google token" });
  }
};

/* ===========================
   GET CUSTOMER PROFILE
=========================== */
// export const getCustomerProfile = async (req, res) => {
//   try {
//     // req.user comes from protect middleware
//     const user = req.user;

//     if (user.role !== "customer") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       address: user.address,
//       profileImage: user.profileImage || { url: "", public_id: "" },
//       role: user.role,
//       isEmailVerified: user.isEmailVerified,
//       isPhoneVerified: user.isPhoneVerified,
//       createdAt: user.createdAt,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getMyProfile = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      profileImage: user.profileImage || { url: "", public_id: "" },
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//LOGOUT USER
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    // sameSite: "lax",
    secure: true,
  });

  res.json({ message: "Logged out successfully" });
};

/* ===========================
   UPDATE PASSWORD (LOGGED USER)
=========================== */
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   DELETE MY ACCOUNT
=========================== */
export const deleteMe = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.clearCookie("token", {
      httpOnly: true,
      // sameSite: "strict",
      // sameSite: "none",
      sameSite: "lax",
      secure: true,
    });

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE CUSTOMER PROFILE
export const updateCustomerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 Delete old image from Cloudinary
    if (user.profileImage?.public_id) {
      await cloudinary.uploader.destroy(user.profileImage.public_id);
    }

    // Save new image
    user.profileImage = {
      url: req.file.path,
      public_id: req.file.filename,
    };

    await user.save();

    res.json({
      message: "Profile image updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Image upload failed" });
  }
};
