import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .success-page {
          color: #fff;
          min-height: 100vh;
          padding: 120px 60px 60px;
        }

        /* ===== SUCCESS SECTION ===== */
        .success-box {
          text-align: center;
          margin-bottom: 80px;
        }

        .success-icon {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 4px solid #4caf50;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .success-icon svg {
          width: 48px;
          height: 48px;
          color: #4caf50;
        }

        .success-text {
          font-size: 22px;
          margin-bottom: 30px;
        }

        .success-actions {
          display: flex;
          justify-content: center;
          gap: 30px;
          
        }

        .success-actions button {
          background: #ffd400;
          color: #000;
          border: none;
          width:197px;
          height:52px;
          padding: 12px 32px;
          font-weight: 200;
          font-family: 'Jersey 25';
          font-size: 21px;
          cursor: pointer;
          text-transform: uppercase;
        }

        .success-actions button:hover {
          opacity: 0.9;
        }

        /* ===== EXPLORE SECTION ===== */
        .explore-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 30px;
          letter-spacing: 1px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .product-card {
          border: 1px solid #ffd400;
          padding: 14px;
          background: #1f1f1f;
          display: flex;
          flex-direction: column;
        }

        .product-img {
          background: #333;
          height: 180px;
          margin-bottom: 12px;
        }

        .product-title {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .product-price {
          font-size: 13px;
          margin-bottom: 10px;
          opacity: 0.8;
        }

        .product-card button {
          margin-top: auto;
          background: #ffd400;
          border: none;
          padding: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        .product-card button:hover {
          opacity: 0.9;
        }

        /* ===== LARGE DESKTOP / 4K ===== */
@media (min-width: 1400px) {
  .success-page {
    padding: 140px 120px 80px;
  }

  .success-text {
    font-size: 26px;
  }
}

/* ===== TABLET ===== */
@media (max-width: 900px) {
  .success-page {
    padding: 120px 40px 60px;
  }

  .success-actions {
    gap: 20px;
  }
}

/* ===== MOBILE ===== */
@media (max-width: 600px) {
  .success-page {
    padding: 100px 20px 40px;
  }

  .success-text {
    font-size: 18px;
  }

  .success-actions {
    flex-direction: column;
    gap: 16px;
  }

  .success-actions button {
    width: 100%;
    height: 48px;
    font-size: 18px;
  }

  .product-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* ===== SMALL MOBILE ===== */
@media (max-width: 360px) {
  .success-icon {
    width: 70px;
    height: 70px;
  }

  .success-icon svg {
    width: 36px;
    height: 36px;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }
}


      `}</style>

      <div className="success-page">
        {/* SUCCESS MESSAGE */}
        <div className="success-box">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="success-text">Order placed</div>

          <div className="success-actions">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/trackorder")}>Track Order</button>
          </div>
        </div>

        {/* EXPLORE MORE */}
        <div>
          <div className="explore-title">EXPLORE MORE</div>

          <div className="product-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div className="product-card" key={item}>
                <div className="product-img"></div>
                <div className="product-title">
                  Protein Wafers – Variety Pack of 10
                </div>
                <div className="product-price">₹ 2000</div>
                <button>BUY NOW</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
