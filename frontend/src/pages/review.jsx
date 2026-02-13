// import { useState } from "react";

// export default function Reviews() {
//   const [open, setOpen] = useState(false);
//   const [rating, setRating] = useState(5);
//   const [review, setReview] = useState("");

//   /* ================= SUBMIT REVIEW (BACKEND READY) ================= */
//   const submitReview = async () => {
//     const payload = {
//       productId: "PROTEIN_WAFERS_10",
//       rating,
//       review,
//     };

//     console.log("SEND TO BACKEND 👉", payload);

//     // await fetch("/api/reviews", {
//     //   method: "POST",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify(payload),
//     // });

//     setOpen(false);
//     setReview("");
//     setRating(5);
//   };

//   return (
//     <>
//       <style>{`
//         * {
//           box-sizing: border-box;
//         }

//         body {
//           background: #1e1e1e;
//           color: #fff;
//           font-family: Inter, sans-serif;
//         }

//         .reviews-page {
//           padding: 100px 80px;
//         }

//         .reviews-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 40px;
//         }

//         .reviews-title {
//           font-size: 22px;
//           font-weight: 700;
//         }

//         .stars {
//           color: #ffd400;
//           margin-top: 6px;
//         }

//         .header-actions {
//           display: flex;
//           gap: 14px;
//         }

//         .btn {
//           padding: 10px 16px;
//           border-radius: 6px;
//           border: 1px solid #ffd400;
//           background: transparent;
//           color: #ffd400;
//           font-weight: 600;
//           cursor: pointer;
//         }

//         .btn.primary {
//           background: #ffd400;
//           color: #000;
//         }

//         /* ================= MODAL ================= */
//         .overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,0.7);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 999;
//         }

//         .modal {
//           width: 760px;
//           background: #2b2b2b;
//           border-radius: 14px;
//           padding: 32px;
//           border: 1px solid #ffd400;
//         }

//         .modal-title {
//           text-align: center;
//           font-weight: 700;
//           margin-bottom: 20px;
//         }

//         .user-row {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           margin-bottom: 20px;
//         }

//         .avatar {
//           width: 36px;
//           height: 36px;
//           border-radius: 50%;
//           background: #2ecc71;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: 700;
//         }

//         .rating-row {
//           text-align: center;
//           margin-bottom: 20px;
//         }

//         .rating-row span {
//           font-size: 28px;
//           cursor: pointer;
//           color: #ffd400;
//           margin: 0 4px;
//         }

//         textarea {
//           width: 100%;
//           height: 120px;
//           background: transparent;
//           border: 1px solid #ffd400;
//           border-radius: 8px;
//           padding: 12px;
//           color: #fff;
//           resize: none;
//           margin-bottom: 20px;
//         }

//         .upload {
//           text-align: center;
//           margin-bottom: 20px;
//         }

//         .upload button {
//           background: #3a3a2a;
//           border: none;
//           padding: 10px 16px;
//           color: #ffd400;
//           border-radius: 20px;
//           cursor: pointer;
//         }

//         .modal-actions {
//           display: flex;
//           justify-content: flex-end;
//           gap: 10px;
//         }
//       `}</style>

//       {/* ================= PAGE ================= */}
//       <div className="reviews-page">
//         <div className="reviews-header">
//           <div>
//             <div className="reviews-title">REVIEWS (111)</div>
//             <div className="stars">★★★★★</div>
//           </div>

//           <div className="header-actions">
//             <button className="btn primary" onClick={() => setOpen(true)}>
//               WRITE A REVIEW
//             </button>
//             <button className="btn">TOP RATED</button>
//           </div>
//         </div>
//       </div>

//       {/* ================= MODAL ================= */}
//       {open && (
//         <div className="overlay">
//           <div className="modal">
//             <div className="modal-title">
//               PROTEIN WAFERS – VARIETY PACK OF 10
//             </div>

//             <div className="user-row">
//               <div className="avatar">J</div>
//               <div>
//                 <div>John</div>
//                 <small>Posting publicly along this site</small>
//               </div>
//             </div>

//             <div className="rating-row">
//               {[1,2,3,4,5].map((s) => (
//                 <span
//                   key={s}
//                   onClick={() => setRating(s)}
//                 >
//                   {s <= rating ? "★" : "☆"}
//                 </span>
//               ))}
//             </div>

//             <textarea
//               placeholder="Write your review..."
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//             />

//             <div className="upload">
//               <button>📷 Add Photos & images</button>
//             </div>

//             <div className="modal-actions">
//               <button className="btn" onClick={() => setOpen(false)}>
//                 Cancel
//               </button>
//               <button className="btn primary" onClick={submitReview}>
//                 Post
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }




import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Star, Upload, X, Send } from "lucide-react";

export default function UserReviews() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/api/products/${productId}`);
      setProduct(data);
    } catch (error) {
      toast.error("Failed to load product");
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/api/reviews/${productId}`);
      setReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    // Create previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    // Revoke URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const submitReview = async () => {
    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("comment", comment);

      images.forEach((image) => {
        formData.append("images", image);
      });

      const { data } = await api.post(`/api/reviews/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(data.message || "Review submitted successfully!");

      // Reset form
      setShowReviewModal(false);
      setRating(5);
      setComment("");
      setImages([]);
      setImagePreviews([]);

      // Refresh reviews (though new review won't show until approved)
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');

        .reviews-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
          padding: 120px 5%;
          font-family: 'Outfit', sans-serif;
          color: #fff;
        }

        .reviews-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 50px;
          padding-bottom: 30px;
          border-bottom: 2px solid #facc15;
        }

        .product-info h1 {
          font-size: 32px;
          font-weight: 700;
          color: #facc15;
          margin-bottom: 10px;
        }

        .rating-summary {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .rating-number {
          font-size: 48px;
          font-weight: 700;
          color: #facc15;
        }

        .rating-stars {
          color: #facc15;
          font-size: 24px;
        }

        .review-count {
          color: #888;
          font-size: 14px;
        }

        .write-review-btn {
          padding: 15px 30px;
          background: linear-gradient(135deg, #facc15 0%, #fbbf24 100%);
          color: #000;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(250, 204, 21, 0.3);
        }

        .write-review-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(250, 204, 21, 0.5);
        }

        .reviews-grid {
          display: grid;
          gap: 30px;
        }

        .review-card {
          background: #262626;
          border: 1px solid #3a3a3a;
          border-radius: 16px;
          padding: 30px;
          transition: all 0.3s ease;
        }

        .review-card:hover {
          border-color: #facc15;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(250, 204, 21, 0.2);
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 15px;
        }

        .reviewer-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .reviewer-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #facc15 0%, #fbbf24 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 20px;
          color: #000;
        }

        .reviewer-name {
          font-weight: 600;
          font-size: 18px;
        }

        .review-date {
          color: #888;
          font-size: 14px;
        }

        .review-rating {
          color: #facc15;
          font-size: 18px;
        }

        .review-comment {
          color: #ddd;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .review-images {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .review-image {
          width: 120px;
          height: 120px;
          border-radius: 12px;
          object-fit: cover;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid #3a3a3a;
        }

        .review-image:hover {
          transform: scale(1.05);
          border-color: #facc15;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .modal {
          width: 90%;
          max-width: 700px;
          background: #1a1a1a;
          border: 2px solid #facc15;
          border-radius: 20px;
          padding: 40px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-title {
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          color: #facc15;
          margin-bottom: 30px;
        }

        .rating-selector {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 30px;
        }

        .star-btn {
          background: none;
          border: none;
          color: #facc15;
          font-size: 36px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .star-btn:hover {
          transform: scale(1.2);
        }

        .star-btn.inactive {
          color: #3a3a3a;
        }

        .comment-textarea {
          width: 100%;
          min-height: 150px;
          background: #262626;
          border: 2px solid #3a3a3a;
          border-radius: 12px;
          padding: 20px;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          resize: vertical;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .comment-textarea:focus {
          outline: none;
          border-color: #facc15;
        }

        .image-upload-section {
          margin-bottom: 30px;
        }

        .upload-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: #262626;
          border: 2px dashed #facc15;
          border-radius: 12px;
          color: #facc15;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .upload-btn:hover {
          background: #2a2a2a;
        }

        .image-previews {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .preview-item {
          position: relative;
          width: 100px;
          height: 100px;
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          border: 2px solid #facc15;
        }

        .remove-image-btn {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 24px;
          height: 24px;
          background: #ef4444;
          border: none;
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-actions {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
        }

        .modal-btn {
          padding: 15px 30px;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-btn.cancel {
          background: #262626;
          color: #fff;
          border: 2px solid #3a3a3a;
        }

        .modal-btn.submit {
          background: linear-gradient(135deg, #facc15 0%, #fbbf24 100%);
          color: #000;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .modal-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .no-reviews {
          text-align: center;
          padding: 60px 20px;
          color: #888;
          font-size: 18px;
        }

        .loading {
          text-align: center;
          padding: 60px 20px;
          color: #facc15;
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .reviews-header {
            flex-direction: column;
            gap: 30px;
            align-items: flex-start;
          }

          .rating-summary {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="reviews-container">
        <div className="reviews-header">
          <div className="product-info">
            <h1>{product?.name || "Product Reviews"}</h1>
            <div className="rating-summary">
              <div className="rating-number">
                {product?.rating?.toFixed(1) || "0.0"}
              </div>
              <div>
                <div className="rating-stars">
                  {"★".repeat(Math.round(product?.rating || 0))}
                  {"☆".repeat(5 - Math.round(product?.rating || 0))}
                </div>
                <div className="review-count">
                  {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                </div>
              </div>
            </div>
          </div>

          <button
            className="write-review-btn"
            onClick={() => setShowReviewModal(true)}
          >
            Write a Review
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="no-reviews">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review._id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <div className="reviewer-name">
                        {review.user?.name || "Anonymous"}
                      </div>
                      <div className="review-date">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="review-rating">
                    {"★".repeat(review.rating)}
                  </div>
                </div>

                <p className="review-comment">{review.comment}</p>

                {review.images && review.images.length > 0 && (
                  <div className="review-images">
                    {review.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img.url}
                        alt={`Review ${idx + 1}`}
                        className="review-image"
                        onClick={() => window.open(img.url, "_blank")}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-title">Write Your Review</h2>

            <div className="rating-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`star-btn ${star > rating ? "inactive" : ""}`}
                  onClick={() => setRating(star)}
                >
                  <Star fill={star <= rating ? "#facc15" : "none"} />
                </button>
              ))}
            </div>

            <textarea
              className="comment-textarea"
              placeholder="Share your experience with this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="image-upload-section">
              <label className="upload-btn">
                <Upload size={20} />
                <span>Add Photos (max 3)</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  style={{ display: "none" }}
                />
              </label>

              {imagePreviews.length > 0 && (
                <div className="image-previews">
                  {imagePreviews.map((preview, idx) => (
                    <div key={idx} className="preview-item">
                      <img
                        src={preview}
                        alt={`Preview ${idx + 1}`}
                        className="preview-image"
                      />
                      <button
                        className="remove-image-btn"
                        onClick={() => removeImage(idx)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                className="modal-btn cancel"
                onClick={() => {
                  setShowReviewModal(false);
                  setRating(5);
                  setComment("");
                  setImages([]);
                  setImagePreviews([]);
                }}
              >
                Cancel
              </button>
              <button
                className="modal-btn submit"
                onClick={submitReview}
                disabled={submitting}
              >
                <Send size={20} />
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}