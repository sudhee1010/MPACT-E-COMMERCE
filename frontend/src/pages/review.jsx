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
import { Star, Upload, X, Send, AlertCircle } from "lucide-react";

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
  
  // Error modal states
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    title: "",
    message: "",
    technicalDetails: ""
  });

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/api/products/${productId}`);
      setProduct(data);
      console.log("✅ Product loaded successfully:", data);
    } catch (error) {
      console.error("❌ Failed to load product:", error);
      toast.error("Failed to load product");
      showError(
        "Product Load Error",
        "Could not load product information. Please refresh the page.",
        error.response?.data?.message || error.message
      );
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/api/reviews/${productId}`);
      setReviews(data);
      console.log("✅ Reviews loaded successfully:", data.length, "reviews");
    } catch (error) {
      console.error("❌ Failed to load reviews:", error);
      // Don't show error for reviews - not critical
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    // Validation: Maximum 3 images
    if (images.length + files.length > 3) {
      toast.error("Maximum 3 images allowed");
      showError(
        "Image Limit Exceeded",
        "You can only upload up to 3 images per review.",
        `Attempted to upload ${images.length + files.length} images`
      );
      return;
    }

    // Validation: File size (5MB per image)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      toast.error("Some images are too large (max 5MB each)");
      showError(
        "File Size Error",
        "Each image must be less than 5MB.",
        `Oversized files: ${oversizedFiles.map(f => `${f.name} (${(f.size / 1024 / 1024).toFixed(2)}MB)`).join(", ")}`
      );
      return;
    }

    // Validation: File type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast.error("Invalid file type. Only JPG, PNG, and WEBP allowed");
      showError(
        "Invalid File Type",
        "Please upload only JPG, PNG, or WEBP images.",
        `Invalid files: ${invalidFiles.map(f => f.name).join(", ")}`
      );
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    // Create previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
    
    console.log("✅ Images selected:", files.length, "new images");
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    // Revoke URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);

    setImages(newImages);
    setImagePreviews(newPreviews);
    
    console.log("✅ Image removed, remaining:", newImages.length);
  };

  const showError = (title, message, technicalDetails) => {
    setErrorDetails({ title, message, technicalDetails });
    setShowErrorModal(true);
  };

  const submitReview = async () => {
    console.log("🚀 Starting review submission...");
    
    // Validation: Comment is required
    if (!comment.trim()) {
      toast.error("Please write a review");
      showError(
        "Missing Review Text",
        "Please write your review before submitting.",
        "Comment field is empty"
      );
      return;
    }

    // Validation: Comment length
    if (comment.trim().length < 10) {
      toast.error("Review is too short (minimum 10 characters)");
      showError(
        "Review Too Short",
        "Please write at least 10 characters in your review.",
        `Current length: ${comment.trim().length} characters`
      );
      return;
    }

    try {
      setSubmitting(true);
      console.log("📝 Review data:", {
        productId,
        rating,
        commentLength: comment.length,
        imagesCount: images.length
      });

      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("comment", comment);

      images.forEach((image, index) => {
        formData.append("images", image);
        console.log(`📎 Adding image ${index + 1}:`, image.name, `(${(image.size / 1024).toFixed(2)}KB)`);
      });

      console.log("🌐 Sending request to:", `/api/reviews/${productId}`);
      
      const { data } = await api.post(`/api/reviews/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Review submitted successfully:", data);
      toast.success(data.message || "Review submitted successfully! Waiting for approval.");

      // Reset form
      setShowReviewModal(false);
      setRating(5);
      setComment("");
      setImages([]);
      setImagePreviews([]);

      // Refresh reviews
      fetchReviews();
      
    } catch (error) {
      console.error("❌ Review submission failed:", error);
      
      // Handle different types of errors
      let errorTitle = "Submission Failed";
      let errorMessage = "Failed to submit review. Please try again.";
      let technicalDetails = "";

      if (error.response) {
        // Server responded with error
        const status = error.response.status;
        const serverMessage = error.response.data?.message || "Unknown server error";
        
        console.error("📛 Server error:", status, serverMessage);
        
        switch (status) {
          case 400:
            errorTitle = "Invalid Request";
            errorMessage = serverMessage;
            technicalDetails = `Status: 400 Bad Request\nReason: ${serverMessage}`;
            break;
          case 401:
            errorTitle = "Not Authenticated";
            errorMessage = "Please login to submit a review.";
            technicalDetails = "Status: 401 Unauthorized\nYou need to be logged in.";
            break;
          case 403:
            errorTitle = "Access Denied";
            errorMessage = serverMessage || "You don't have permission to review this product.";
            technicalDetails = `Status: 403 Forbidden\n${serverMessage}`;
            break;
          case 404:
            errorTitle = "Product Not Found";
            errorMessage = "This product does not exist or has been removed.";
            technicalDetails = "Status: 404 Not Found\nProduct ID: " + productId;
            break;
          case 413:
            errorTitle = "Files Too Large";
            errorMessage = "Your images are too large. Please use smaller files.";
            technicalDetails = "Status: 413 Payload Too Large\nMax size: 5MB per image";
            break;
          case 500:
            errorTitle = "Server Error";
            errorMessage = "Something went wrong on our end. Please try again later.";
            technicalDetails = `Status: 500 Internal Server Error\n${serverMessage}`;
            break;
          default:
            errorTitle = "Unexpected Error";
            errorMessage = serverMessage;
            technicalDetails = `Status: ${status}\n${serverMessage}`;
        }
        
        toast.error(errorMessage);
        
      } else if (error.request) {
        // Request was made but no response received
        console.error("📡 No response from server");
        errorTitle = "Network Error";
        errorMessage = "Could not reach the server. Please check your internet connection.";
        technicalDetails = "No response received from server\nCheck network connection";
        toast.error("Network error. Please check your connection.");
        
      } else {
        // Something else happened
        console.error("⚠️ Request setup error:", error.message);
        errorTitle = "Request Error";
        errorMessage = "Failed to send review. Please try again.";
        technicalDetails = error.message;
        toast.error("Failed to submit review");
      }

      showError(errorTitle, errorMessage, technicalDetails);
      
    } finally {
      setSubmitting(false);
      console.log("🏁 Review submission process completed");
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

        /* Modal Overlay */
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

        /* Review Modal */
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

        /* Error Modal */
        .error-modal {
          width: 90%;
          max-width: 600px;
          background: #1a1a1a;
          border: 2px solid #ef4444;
          border-radius: 20px;
          padding: 40px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .error-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .error-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #ef4444;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .error-title {
          font-size: 24px;
          font-weight: 700;
          color: #ef4444;
        }

        .error-message {
          color: #ddd;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 16px;
        }

        .error-details {
          background: #262626;
          border: 1px solid #3a3a3a;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .error-details-title {
          color: #888;
          font-size: 12px;
          text-transform: uppercase;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .error-details-content {
          color: #fff;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .error-close-btn {
          width: 100%;
          padding: 15px;
          background: #ef4444;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .error-close-btn:hover {
          background: #dc2626;
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
              placeholder="Share your experience with this product... (minimum 10 characters)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="image-upload-section">
              <label className="upload-btn">
                <Upload size={20} />
                <span>Add Photos (max 3, 5MB each)</span>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
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

      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal-overlay" onClick={() => setShowErrorModal(false)}>
          <div className="error-modal" onClick={(e) => e.stopPropagation()}>
            <div className="error-header">
              <div className="error-icon">
                <AlertCircle size={28} color="#fff" />
              </div>
              <h2 className="error-title">{errorDetails.title}</h2>
            </div>

            <p className="error-message">{errorDetails.message}</p>

            {errorDetails.technicalDetails && (
              <div className="error-details">
                <div className="error-details-title">Technical Details</div>
                <div className="error-details-content">
                  {errorDetails.technicalDetails}
                </div>
              </div>
            )}

            <button
              className="error-close-btn"
              onClick={() => setShowErrorModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}