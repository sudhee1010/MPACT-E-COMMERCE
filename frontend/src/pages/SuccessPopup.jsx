import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessPopup = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-icon">
          <CheckCircle size={64} />
        </div>

        <h2>Order placed</h2>
        <p>
          Thank you for your order! You will receive a confirmation email
          shortly.
        </p>

        <div className="popup-actions">
          <button
            className="popup-btn outline"
            onClick={() => navigate("/")}
          >
            HOME
          </button>

          <button
            className="popup-btn"
            onClick={() => navigate("/track-order")}
          >
            TRACK ORDER
          </button>
        </div>
      </div>
        {/* INTERNAL CSS */}
        <style>{`
        /* ================= SUCCESS POPUP ================= */

.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.popup-box {
  background: #2f2f2f;
  border-radius: 20px;
  padding: 40px 32px;
  max-width: 480px;
  width: 90%;
  text-align: center;
  border: 2px solid #facc15;
  animation: popupScale 0.35s ease;
}

.popup-icon {
  color: #22c55e;
  margin-bottom: 20px;
}

.popup-box h2 {
  font-size: 28px;
  margin-bottom: 12px;
}

.popup-box p {
  font-size: 15px;
  opacity: 0.9;
  margin-bottom: 28px;
}

.popup-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

.popup-btn {
  background: #facc15;
  color: black;
  border: none;
  border-radius: 12px;
  padding: 14px 22px;
  font-weight: bold;
  cursor: pointer;
  min-width: 140px;
}

.popup-btn.outline {
  background: transparent;
  border: 2px solid #facc15;
  color: #facc15;
}

@keyframes popupScale {
  from {
    transform: scale(0.85);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
        `}</style>
    </div>
  );
};

export default SuccessPopup;
