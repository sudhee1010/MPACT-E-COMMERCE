import { useEffect, useState } from "react";

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setHide(true);
            setTimeout(onFinish, 1000);
          }, 600);
          return 100;
        }
        return p + 1;
      });
    }, 18);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className={`loader ${hide ? "hide" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Khand:wght@600;700&display=swap');

        .loader {
          position: fixed;
          inset: 0;
          background: #000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          transition: opacity 0.8s ease;
        }

        .loader.hide {
          opacity: 0;
          pointer-events: none;
        }

        .loader-text {
          font-family: 'Jersey 25', sans-serif;
          font-size: 90px;
          font-weight: 700;
          letter-spacing: 12px;
          color: #ffd400;
          display: flex;
        }

        .loader-text span {
          opacity: 0;
          transform: scale(0.6);
          animation: reveal 0.8s ease forwards;
          animation-delay: calc(var(--i) * 0.08s);
        }

        @keyframes reveal {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .tagline {
          margin-top: 18px;
          font-size: 14px;
          letter-spacing: 6px;
          color: #aaa;
          text-transform: uppercase;
        }

        .bar {
          width: 280px;
          height: 2px;
          background: #222;
          margin-top: 40px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: #ffd400;
          width: ${progress}%;
          transition: width 0.15s linear;
        }

        .percent {
          margin-top: 14px;
          font-size: 12px;
          letter-spacing: 4px;
          color: #777;
        }

        @media (max-width: 768px) {
          .loader-text {
            font-size: 56px;
            letter-spacing: 6px;
          }
        }
      `}</style>

      <div className="loader-text">
        {"MPACT".split("").map((c, i) => (
          <span key={i} style={{ "--i": i }}>
            {c}
          </span>
        ))}
      </div>

      <div className="tagline">BUILD • PUSH • DOMINATE</div>

      <div className="bar">
        <div className="bar-fill" />
      </div>

      <div className="percent">{progress}%</div>
    </div>
  );
}
