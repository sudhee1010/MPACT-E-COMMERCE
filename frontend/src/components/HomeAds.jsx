import { X } from "lucide-react";
import { useEffect, useState } from "react";

const adsData = [
  {
    id: 1,
    name: "Protein Bar",
    image: "/images/product1.png",
  },
  {
    id: 2,
    name: "Energy Drink",
    image: "/images/img2.png",
  },
  {
    id: 3,
    name: "Muscle Fuel",
    image: "/images/powder.jpg",
  },
];

// ✅ SAFE vertical slots (no overlap)
const verticalSlots = [120, 260, 400];

export default function HomeAds() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const initializedAds = adsData.map((ad, index) => {
      const side = Math.random() > 0.5 ? "left" : "right";

      return {
        ...ad,
        visible: true,
        position: {
          side,
          bottom: verticalSlots[index], // 👈 unique slot
          offset: 14,
        },
      };
    });

    setAds(initializedAds);
  }, []);

  const closeAd = (id) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id ? { ...ad, visible: false } : ad
      )
    );
  };

  return (
    <>
      {ads.map(
        (ad) =>
          ad.visible && (
            <div
              key={ad.id}
              className="home-ad-float"
              style={{
                bottom: `${ad.position.bottom}px`,
                [ad.position.side]: `${ad.position.offset}px`,
              }}
            >
              {/* CLOSE */}
              <button
                className="home-ad-close"
                onClick={() => closeAd(ad.id)}
              >
                <X size={14} />
              </button>

              {/* AD CARD */}
              <div className="home-ad-rect">
                <img src={ad.image} alt={ad.name} />
                <span>{ad.name}</span>
              </div>
            </div>
          )
      )}

      <style>{`
        .home-ad-float {
          position: fixed;
          z-index: 999;
          animation: fadeSlideIn 0.4s ease;
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .home-ad-close {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #111;
          color: white;
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0.85;
        }

        .home-ad-close:hover {
          opacity: 1;
        }

        .home-ad-rect {
  width: 260px;                /* ⬆️ MUCH wider */
  min-height: 90px;            /* ⬆️ taller */
  background: #1f1f1f;
  border-radius: 18px;
  padding: 16px;
  box-shadow: 0 16px 40px rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: transform 0.25s ease;
}

.home-ad-rect:hover {
  transform: translateY(-6px);
}

.home-ad-rect img {
  width: 64px;                 /* ⬆️ bigger image */
  height: 64px;
  object-fit: contain;
  background: #000;
  border-radius: 10px;
  padding: 6px;
}

.home-ad-rect span {
  font-size: 16px;             /* ⬆️ bigger text */
  font-weight: 700;
  color: #facc15;
  line-height: 1.3;
}

        @media (max-width: 600px) {
          .home-ad-rect {
            width: 135px;
          }
        }
      `}</style>
    </>
  );
}
