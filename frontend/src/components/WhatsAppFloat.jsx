import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  return (
    <div className="whatsapp-float">
      <a
        href="https://wa.me/919349412040?text=Hello%20I%20need%20support"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-link"
      >
        <span className="whatsapp-text">Chat with us!</span>
        <div className="whatsapp-icon">
          <FaWhatsapp size={28} />
        </div>
      </a>

      <style>{`
        .whatsapp-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 999;
        }

        .whatsapp-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        /* TEXT (HIDDEN BY DEFAULT) */
        .whatsapp-text {
          background: #25d366;
          color: white;
          padding: 10px 16px;
          border-radius: 20px;
          font-size: 14px;
        //   font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(10px);
          pointer-events: none;
          transition: all 0.25s ease;
        }

        /* ICON */
        .whatsapp-icon {
          width: 56px;
          height: 56px;
          background: #25d366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        /* SHOW TEXT ON HOVER */
        .whatsapp-link:hover .whatsapp-text {
          opacity: 1;
          transform: translateX(0);
        }

        .whatsapp-link:hover {
          transform: scale(1.05);
          transition: 0.25s ease;
        }
      `}</style>
    </div>
  );
}
