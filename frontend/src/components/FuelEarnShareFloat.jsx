import React, { useState } from "react";
import { Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FuelEarnShareFloat = () => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/fuel-earn-share")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "25px",
        left: "20px",
        zIndex: 999,
        cursor: "pointer",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* Icon Button (Always Visible) */}
      <div
        style={{
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #facc15, #eab308)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 15px rgba(250, 204, 21, 0.8)",
          animation: "pulse 2s infinite",
          flexShrink: 0,
          zIndex: 2
        }}
      >
        <Gift size={24} color="black" />
      </div>

      {/* Expanding Text (Opens to Right) */}
      <div
        style={{
          backgroundColor: "#facc15",
          color: "black",
          fontWeight: "bold",
          borderRadius: "0 25px 25px 0",
          whiteSpace: "nowrap",
          overflow: "hidden",
          height: "45px",
          display: "flex",
          alignItems: "center",
          marginLeft: "10px", // slight overlap behind circle
          paddingLeft: hovered ? "20px" : "0px",
          paddingRight: hovered ? "18px" : "0px",
          width: hovered ? "170px" : "0px",
          opacity: hovered ? 1 : 0,
          transition: "all 0.35s ease"
        }}
      >
        Fuel • Earn • Share
      </div>

      {/* Pulse Animation */}
      <style>
        {`
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(250, 204, 21, 0); }
            100% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0); }
          }
        `}
      </style>
    </div>
  );
};

export default FuelEarnShareFloat;