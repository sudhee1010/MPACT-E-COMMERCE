import { useState } from "react";

export default function Reviews() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  /* ================= SUBMIT REVIEW (BACKEND READY) ================= */
  const submitReview = async () => {
    const payload = {
      productId: "PROTEIN_WAFERS_10",
      rating,
      review,
    };

    console.log("SEND TO BACKEND 👉", payload);

    // await fetch("/api/reviews", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });

    setOpen(false);
    setReview("");
    setRating(5);
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          background: #1e1e1e;
          color: #fff;
          font-family: Inter, sans-serif;
        }

        .reviews-page {
          padding: 100px 80px;
        }

        .reviews-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .reviews-title {
          font-size: 22px;
          font-weight: 700;
        }

        .stars {
          color: #ffd400;
          margin-top: 6px;
        }

        .header-actions {
          display: flex;
          gap: 14px;
        }

        .btn {
          padding: 10px 16px;
          border-radius: 6px;
          border: 1px solid #ffd400;
          background: transparent;
          color: #ffd400;
          font-weight: 600;
          cursor: pointer;
        }

        .btn.primary {
          background: #ffd400;
          color: #000;
        }

        /* ================= MODAL ================= */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .modal {
          width: 760px;
          background: #2b2b2b;
          border-radius: 14px;
          padding: 32px;
          border: 1px solid #ffd400;
        }

        .modal-title {
          text-align: center;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .user-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #2ecc71;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .rating-row {
          text-align: center;
          margin-bottom: 20px;
        }

        .rating-row span {
          font-size: 28px;
          cursor: pointer;
          color: #ffd400;
          margin: 0 4px;
        }

        textarea {
          width: 100%;
          height: 120px;
          background: transparent;
          border: 1px solid #ffd400;
          border-radius: 8px;
          padding: 12px;
          color: #fff;
          resize: none;
          margin-bottom: 20px;
        }

        .upload {
          text-align: center;
          margin-bottom: 20px;
        }

        .upload button {
          background: #3a3a2a;
          border: none;
          padding: 10px 16px;
          color: #ffd400;
          border-radius: 20px;
          cursor: pointer;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
      `}</style>

      {/* ================= PAGE ================= */}
      <div className="reviews-page">
        <div className="reviews-header">
          <div>
            <div className="reviews-title">REVIEWS (111)</div>
            <div className="stars">★★★★★</div>
          </div>

          <div className="header-actions">
            <button className="btn primary" onClick={() => setOpen(true)}>
              WRITE A REVIEW
            </button>
            <button className="btn">TOP RATED</button>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-title">
              PROTEIN WAFERS – VARIETY PACK OF 10
            </div>

            <div className="user-row">
              <div className="avatar">J</div>
              <div>
                <div>John</div>
                <small>Posting publicly along this site</small>
              </div>
            </div>

            <div className="rating-row">
              {[1,2,3,4,5].map((s) => (
                <span
                  key={s}
                  onClick={() => setRating(s)}
                >
                  {s <= rating ? "★" : "☆"}
                </span>
              ))}
            </div>

            <textarea
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />

            <div className="upload">
              <button>📷 Add Photos & images</button>
            </div>

            <div className="modal-actions">
              <button className="btn" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="btn primary" onClick={submitReview}>
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
