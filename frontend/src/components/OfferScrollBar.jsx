import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function HighlightScrollBar() {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    try {
      const { data } = await api.get("/api/aboutus");

      if (data?.highlights?.length > 0) {
        setHighlights(data.highlights);
      }
    } catch (error) {
      console.error("Highlight fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || highlights.length === 0) return null;

  return (
    <>
      <div className="highlight-banner">
        <div className="marquee">
          <div className="marquee-track">
            {[...highlights, ...highlights].map((item, index) => (
              <span key={index} className="marquee-item">
                {item.text}
                <span className="divider">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .highlight-banner {
          width: 100%;
          background: #ffed23;
          overflow: hidden;
          padding: 12px 0;
          position: relative;
          z-index: 995;
        }

        .marquee {
          overflow: hidden;
          white-space: nowrap;
        }

        .marquee-track {
          display: flex;
          gap: 50px;
          font-weight: 700;
          font-size: 14px;
          animation: scrollLeft 25s linear infinite;
        }

        .marquee-item {
          color: #111;
          display: flex;
          align-items: center;
        }

        .divider {
          margin-left: 20px;
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Pause on hover */
        .highlight-banner:hover .marquee-track {
          animation-play-state: paused;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .marquee-track {
            gap: 30px;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
}
