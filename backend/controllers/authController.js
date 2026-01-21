import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { generateOTP } from "../utils/sendOTP.js";
import sendEmail from "../utils/sendEmail.js";
import { verifyGoogleToken } from "../utils/googleVerify.js";

/* ===========================
   EMAIL REGISTER LOGIN
=========================== */
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       isEmailVerified: false,
//       role:"customer"
//     });

//     res.status(201).json({
//       token: generateToken(user._id),user
//     });


//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const registerUser = async (req, res) => {
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
      isEmailVerified: false,
      role: "customer",
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Registered successfully. Please verify email.",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





/* ===========================
   EMAIL REGISTER ADMIN
=========================== */
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: true,
      role: "admin"
    });

    res.status(201).json({
      token: generateToken(user._id), user
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

//     if (!user.isEmailVerified) {
//       return res.status(403).json({ message: "Email not verified" });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.json({ token: generateToken(user._id),user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    // ✅ SET COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/* ===========================
   SEND EMAIL OTP
=========================== */
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();

    user.otp = otp.toString();
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail({
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   VERIFY EMAIL OTP
=========================== */
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      user.otp !== otp.toString() ||
      user.otpExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isEmailVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // res.json({
    //   message: "Email verified",
    //   token: generateToken(user._id)
    // });
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Email verified",
      user,
    });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   FORGOT PASSWORD
=========================== */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();
    user.otp = otp.toString();
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail({
      to: email,
      subject: "Password Reset OTP",
      text: `Your password reset OTP is ${otp}`
    });

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===========================
   RESET PASSWORD
=========================== */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (
      !user ||
      user.otp !== otp.toString() ||
      user.otpExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
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
        isPhoneVerified: false
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

    if (
      !user ||
      user.otp !== otp.toString() ||
      user.otpExpiry < Date.now()
    ) {
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
      token: generateToken(user._id)
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
        isEmailVerified: true
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
export const getCustomerProfile = async (req, res) => {
  try {
    // req.user comes from protect middleware
    const user = req.user;

    if (user.role !== "customer") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
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
    sameSite: "strict",
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
      sameSite: "strict",
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
        createdAt: updatedUser.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







