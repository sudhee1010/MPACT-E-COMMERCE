import { useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";


export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ======================
     SEND OTP
  ====================== */
  const sendOtp = async () => {
    if (!email) {
      toast.error("Please enter email");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/auth/send-otp", { email });
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     VERIFY OTP
  ====================== */
  const verifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/auth/verify-otp", { email, otp });
      toast.success("Email verified successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          <ShieldCheck size={28} /> Verify Email
        </h2>

        {step === 1 && (
          <>
            <div style={styles.inputGroup}>
              <Mail size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>

            <button onClick={sendOtp} style={styles.button} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={styles.input}
              />
            </div>

            <button onClick={verifyOtp} style={styles.button} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ======================
   STYLES
====================== */
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#404040",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#262626",
    padding: "2rem",
    borderRadius: "0.5rem",
    border: "2px solid #facc15",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    color: "#facc15",
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "#404040",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
    border: "2px solid #facc15",
  },
  input: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    width: "100%",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#facc15",
    border: "none",
    borderRadius: "0.5rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
