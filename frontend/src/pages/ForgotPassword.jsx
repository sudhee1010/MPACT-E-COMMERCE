import { useState } from "react";
// import { Mail, Lock, KeyRound, ArrowLeft } from "lucide-react";
import { Phone, Lock, KeyRound, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#404040",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    position: "relative",
  },
  box: {
    width: "100%",
    maxWidth: "460px",
    border: "2px solid #facc15",
    borderRadius: "0.5rem",
    backgroundColor: "#262626",
    padding: "3rem 2.5rem",
  },
  backLink: {
    position: "absolute",
    top: "2rem",
    left: "2rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "white",
    textDecoration: "none",
    fontSize: "0.875rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#facc15",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  subtitle: {
    textAlign: "center",
    color: "#a3a3a3",
    fontSize: "0.875rem",
    marginBottom: "2rem",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    color: "white",
    fontSize: "0.875rem",
    marginBottom: "0.5rem",
    display: "block",
  },
  inputWrapper: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#737373",
  },
  input: {
    width: "100%",
    backgroundColor: "#404040",
    color: "white",
    border: "2px solid #facc15",
    borderRadius: "0.5rem",
    padding: "0.75rem 1rem 0.75rem 3rem",
    outline: "none",
    fontSize: "0.875rem",
  },
  button: {
    width: "100%",
    backgroundColor: "#facc15",
    color: "black",
    fontWeight: "600",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

const mediaStyles = `
  .input:focus { border-color: #fbbf24; }
  .btn:hover { background-color: #fbbf24; }
`;

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  // const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // STEP 1: SEND OTP
  const sendOtpHandler = async (e) => {
    e.preventDefault();
if (!phone) {
  return toast.error("Phone number is required");
}

if (phone.length !== 10) {
  return toast.error("Please enter a valid 10-digit WhatsApp number");
}
    try {
      setLoading(true);
      await api.post("/api/auth/forgot-password", { phone });
      toast.success("OTP sent to your registered WhatsApp number");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: RESET PASSWORD
  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      return toast.error("All fields required");
    }

    try {
      setLoading(true);
      await api.post("/api/auth/reset-password", {
        phone,
        otp,
        newPassword,
      });

      toast.success("Password reset successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{mediaStyles}</style>

      <div style={styles.container}>
        <Link to="/login" style={styles.backLink}>
          <ArrowLeft size={18} /> Back to Login
        </Link>

        <div style={styles.box}>
          <h1 style={styles.title}>Forgot Password</h1>
          <p style={styles.subtitle}>
            {step === 1
              ? "We’ll send an OTP to your registered WhatsApp number"
              : "Enter OTP & set new password"}
          </p>

          {step === 1 && (
            <form onSubmit={sendOtpHandler}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number</label>
                <div style={styles.inputWrapper}>
                  <Phone size={20} style={styles.icon} />
                  <input
  type="tel"
  placeholder="Enter your WhatsApp number"
  style={styles.input}
  className="input"
  value={phone}
  maxLength={10}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value);
  }}
/>
                </div>
              </div>

              <button
                type="submit"
                style={styles.button}
                className="btn"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={resetPasswordHandler}>
              <div style={styles.formGroup}>
                <label style={styles.label}>OTP</label>
                <div style={styles.inputWrapper}>
                  <KeyRound size={20} style={styles.icon} />
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    style={styles.input}
                    className="input"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>New Password</label>
                <div style={styles.inputWrapper}>
                  <Lock size={20} style={styles.icon} />
                  <input
                    type="password"
                    placeholder="New password"
                    style={styles.input}
                    className="input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={styles.button}
                className="btn"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}