import { useEffect, useState } from "react";
import logo from "../assets/mpact-logo.PNG"

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = "hidden";

    const updateProgress = () => {
      const totalImages = document.images.length;
      let loadedImages = 0;

      if (totalImages === 0) {
        setProgress(100);
        return;
      }

      const checkImages = () => {
        loadedImages++;
        const percent = Math.round((loadedImages / totalImages) * 100);
        setProgress(percent);
      };

      Array.from(document.images).forEach((img) => {
        if (img.complete) {
          checkImages();
        } else {
          img.addEventListener("load", checkImages);
          img.addEventListener("error", checkImages);
        }
      });
    };

    // Wait for full window load
    const handleLoad = () => {
      updateProgress();

      setTimeout(() => {
        setProgress(100);

        setTimeout(() => {
          setHide(true);

          setTimeout(() => {
            document.body.style.overflow = "auto"; // unlock scroll
            onFinish?.();
          }, 800);
        }, 400);
      }, 300);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      document.body.style.overflow = "auto";
    };
  }, [onFinish]);

  return (
    <div className={`loader ${hide ? "hide" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');

        .logo-container{
  animation: revealLogo 1s ease forwards;
  transform: scale(0.7);
  opacity: 0;
}

.loader-logo{
  width: 220px;
  object-fit: contain;
}

@keyframes revealLogo{
  to{
    transform: scale(1);
    opacity: 1;
  }
}

        .loader {
          position: fixed;
          inset: 0;
          background: #000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          transition: opacity 0.8s ease, visibility 0.8s ease;
        }

        .loader.hide {
          opacity: 0;
          visibility: hidden;
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
          height: 3px;
          background: #222;
          margin-top: 40px;
          overflow: hidden;
          border-radius: 2px;
        }

        .bar-fill {
          height: 100%;
          background: #ffd400;
          width: ${progress}%;
          transition: width 0.3s ease;
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
            .tagline{
            font-size:10px;
            letter-spacing: 4px;
            }
        }
      `}</style>

      {/* <div className="loader-text">
        {"MPACT".split("").map((c, i) => (
          <span key={i} style={{ "--i": i }}>
            {c}
          </span>
        ))}
      </div> */}
      <div className="logo-container">
        <img src={logo} alt="MPACT Logo" className="loader-logo" />
      </div>

      <div className="tagline">FUEL YOUR FITNESS WITH MPACT</div>

      <div className="bar">
        <div className="bar-fill" />
      </div>

      <div className="percent">{progress}%</div>
    </div>
  );
}
