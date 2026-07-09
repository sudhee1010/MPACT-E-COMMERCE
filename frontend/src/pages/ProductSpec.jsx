import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import toast from "react-hot-toast";
import { Package, CheckCircle, XCircle, AlertCircle, ShoppingCart } from "lucide-react";
import { addToCartApi } from "../api/cartApi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewImages, setReviewImages] = useState([]);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [showTopRated, setShowTopRated] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { refreshCart, setOpenSideCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Custom Modal State
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "", // 'success', 'error', 'warning'
    title: "",
    message: "",
  });

  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await api.get(`/products/${id}`);

        setProduct(data);
        setActiveImage(data.images?.[0]?.url);
      } catch (err) {
        console.error("Product fetch failed:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product || !product.category) return;

    const fetchRelatedProducts = async () => {
      try {
        const res = await api.get(
          `/products?category=${product.category._id || product.category}&limit=4`,
        );

        const filtered = res.data.products.filter((p) => p._id !== product._id);

        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Failed to load related products", err);
      }
    };

    fetchRelatedProducts();
  }, [product]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);

        const { data } = await api.get(`/reviews/${product._id}`);

        setReviews(data);
      } catch (err) {
        console.error("Failed to load reviews", err);
      } finally {
        setReviewsLoading(false);
      }
    };

    if (product?._id) fetchReviews();
  }, [product]);

  const showNotification = (type, title, message) => {
    setModalConfig({ type, title, message });
    setShowCustomModal(true);
  };

  const handleAddToCart = async (productId) => {
    try {

      // ✅ IF USER LOGGED IN → SERVER CART
      if (user && user._id) {
        await addToCartApi(productId, qty);
        await refreshCart();
        setOpenSideCart(true);

        showNotification("success", "Success!", "Product added to cart");
        return;
      }

      // ✅ GUEST CART → LOCAL STORAGE
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

      const existing = guestCart.find((item) => item.productId === productId);

      if (existing) {
        existing.quantity += qty;
        if (!existing.product) existing.product = product; // ← backfill if missing
      } else {
        guestCart.push({
          productId,
          product: product,        // ← full product object
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: qty
        });
      }
      localStorage.setItem("guestCart", JSON.stringify(guestCart));

      setOpenSideCart(true);

      showNotification(
        "success",
        "Added to Cart",
        "Product added to cart"
      );

   } catch (error) {
  if (product?.countInStock === 0) {
    showNotification("error", "Out of Stock", "This product is currently out of stock");
  } else {
    showNotification("error", "Error", "Something went wrong");
  }
}
  };


  const handleBuyNow = () => {
    if (loading) return;

    if (!user || !user._id) {
    navigate("/login");
    return;
    }

    navigate("/checkout", {
      state: {
        directBuy: true,
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0]?.url,
          qty: qty,
        },
      },
    });
  };

  const submitReviewHandler = async () => {
    try {
      setSubmittingReview(true);

      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("comment", comment);

      reviewImages.forEach((img) => {
        formData.append("images", img);
      });

      const { data } = await api.post(`/reviews/${product._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      showNotification(
        "success",
        "Review Submitted!",
        "Your review has been posted successfully and is now visible to everyone."
      );

      setShowReviewPopup(false);
      setRating(0);
      setComment("");
      setReviewImages([]);

      // Refresh reviews
      const reviewsRes = await api.get(`/reviews/${product._id}`);
      setReviews(reviewsRes.data);

      // Refresh product to update rating
      const productRes = await api.get(`/products/${id}`);
      setProduct(productRes.data);
    } catch (error) {
      const message = error.response?.data?.message;

      if (message === "You can review only purchased products") {
        showNotification(
          "warning",
          "Purchase Required",
          "You can only review products you have purchased and received."
        );
      } else {
        showNotification("error", "Error", message || "Failed to submit review");
      }
    } finally {
      setSubmittingReview(false);
    }
  };

  const styles = {
    container: {
      background: "#1b1b1b",
      color: "#fff",
    },
    productSection: {
      maxWidth: 1400,
      margin: "0 auto",
      padding: "60px 40px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 60,
    },
    mainImageContainer: {
      border: "2px solid #ffe600",
      borderRadius: 13,
      overflow: "hidden",
      background: "#fff",
      width: "100%",
      height: 560,
    },
    mainImage: {
      width: "100%",
      height: "100%",
      objectFit: "fill",
      display: "block",
    },
    thumbnailsContainer: {
      marginTop: 16,
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 12,
      width: "100%",
    },
    thumbnailBox: {
      border: "2px solid transparent",
      borderRadius: 10,
      overflow: "hidden",
      background: "#2b2b2b",
      cursor: "pointer",
      transition:
        "transform 0.25s ease, border 0.25s ease, box-shadow 0.25s ease",
    },
    thumbnailBoxActive: {
      borderColor: "#ffe600",
    },
    thumbnailImage: {
      width: "100%",
      height: 130,
      objectFit: "cover",
      display: "block",
    },
    detailsContainer: {
      maxWidth: 520,
    },
    title: {
      fontFamily: "'Bebas Neue', cursive",
      letterSpacing: 2,
      fontSize: 44,
      lineHeight: "1.1",
      marginBottom: 16,
      textTransform: "uppercase",
    },
    ratingContainer: {
      display: "flex",
      gap: 10,
      marginBottom: 26,
    },
    stars: {
      color: "#ffc107",
      fontSize: 18,
    },
    reviewCount: {
      color: "#ccc",
      fontSize: 14,
    },
    priceContainer: {
      display: "flex",
      gap: 14,
      alignItems: "baseline",
      marginBottom: 30,
    },
    price: {
      fontSize: 36,
      fontWeight: 800,
    },
    oldPrice: {
      color: "#777",
      textDecoration: "line-through",
    },
    discount: {
      color: "#00ff66",
      fontWeight: 700,
    },
    tagsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(3, max-content)",
      gap: 14,
      marginBottom: 34,
    },
    tag: {
      border: "1.5px solid #ffe600",
      padding: "10px 16px",
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: "nowrap",
    },
    quantityContainer: {
      marginBottom: 34,
    },
    quantityLabel: {
      fontSize: 14,
      marginBottom: 10,
      color: "#fff",
    },
    quantityBox: {
      display: "flex",
      alignItems: "center",
      border: "2px solid #ffe600",
      borderRadius: 12,
      overflow: "hidden",
      height: 52,
      background: "#1b1b1b",
      width: "fit-content",
    },
    quantityButton: {
      width: 56,
      height: "100%",
      background: "transparent",
      border: "none",
      color: "#fff",
      fontSize: 22,
      cursor: "pointer",
      transition: "all 0.25s ease",
    },
    quantityButtonLeft: {
      borderRight: "1px solid #ffe600",
    },
    quantityValue: {
      width: 56,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      fontWeight: 700,
      color: "#fff",
      borderRight: "1px solid #ffe600",
    },
    actionButtons: {
      display: "flex",
      gap: 16,
    },

    addToCartButton: {
      flex: 1,
      height: 67,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      background: "#1b1b1b",
      color: "#fff",
      padding: "0 20px",
      fontSize: 23,
      fontWeight: 900,
      borderRadius: 11,
      border: "2px solid #ffeb00",
      cursor: "pointer",
      textTransform: "uppercase",
      letterSpacing: "1px",
      transition: "all 0.25s ease",
      fontFamily: "'Bebas Neue', cursive",
      textDecoration: "none",
      boxSizing: "border-box",
    },

    buyNowButton: {
      flex: 1,
      height: 67,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#ffeb00",
      color: "#000",
      padding: "0 20px",
      fontSize: 23,
      fontWeight: 900,
      borderRadius: 11,
      border: "2px solid #ffeb00",
      cursor: "pointer",
      textTransform: "uppercase",
      letterSpacing: "1px",
      transition: "all 0.25s ease",
      fontFamily: "'Bebas Neue', cursive",
      textDecoration: "none",
      boxSizing: "border-box",
    },

    cartIcon: {
      width: 26,
      height: 26,
    },
    recommendedSection: {
      padding: "20px 0",
    },

    recommendedTitle: {
      marginBottom: 12,
      fontWeight: 700,
      textAlign: "left",
      marginLeft: 185,
    },

    recommendedGrid: {
      display: "flex",
      gap: 24,
      padding: "0 40px",
      justifyContent: "center",
      alignItems: "center",
    },

    recommendedItem: {
      width: 212,
      height: 212,
      borderRadius: 8,
      border: "2px solid #ffe600",
      overflow: "hidden",
      background: "#2b2b2b",
      flexShrink: 0,
      transition: "transform 0.35s ease",
    },

    recommendedImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.35s ease",
    },

    /* ================= MODAL ================= */
    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "16px",
    },

    loginModal: {
      background: "#151515",
      border: "2px solid #ffeb00",
      borderRadius: 20,
      padding: 32,
      width: "90%",
      maxWidth: 420,
      textAlign: "center",
      animation: "popIn 0.3s ease",
    },

    loginTitle: {
      color: "#ffeb00",
      fontFamily: "'Jersey 25', cursive",
      fontSize: 32,
      marginBottom: 12,
    },

    loginText: {
      color: "#ffffff",
      fontSize: 14,
      marginBottom: 24,
    },

    modalActions: {
      display: "flex",
      gap: 12,
    },

    modalButton: {
      flex: 1,
      height: 48,
      fontSize: 16,
      fontWeight: 700,
      borderRadius: 10,
      cursor: "pointer",
      border: "2px solid #ffeb00",
      fontFamily: "'Bebas Neue', cursive", letterSpacing: "1px",
    },

    loginButton: {
      background: "#ffeb00",
      color: "#000",
    },

    cancelButton: {
      background: "transparent",
      color: "#fff",
    },

    /* ================= REVIEWS SECTION ================= */

    reviewsSection: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "20px 40px",
      color: "#fff",
    },

    reviewsHeader: {
      marginBottom: 12,
      fontWeight: 700,
      textAlign: "left",
    },

    reviewsButtons: {
      display: "flex",
      gap: 16,
      marginTop: 10,
      marginLeft: "auto",
      alignItems: "center",
    },

    writeReviewButton: {
      background: "#ffe600",
      width: 190,
      height: 52,
      fontWeight: "bold",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      transition: "transform 0.2s ease",
      fontFamily: "'Bebas Neue', cursive",
      letterSpacing: "1px",
      fontSize: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    topRatedButton: {
      background: "transparent",
      border: "2px solid #ffe600",
      color: "#ffffff",
      width: 170,
      height: 52,
      borderRadius: 8,
      cursor: "pointer",
      transition: "transform 0.2s ease",
      fontFamily: "'Bebas Neue', cursive",
      letterSpacing: "1px",
      fontSize: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    popupOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "16px",
    },
    popupContent: {
      width: "100%",
      maxWidth: 900,
      background: "#3a3a3a",
      borderRadius: 26,
      border: "2px solid #ffe600",
      padding: "clamp(20px, 4vw, 50px)",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      minHeight: 0,
      maxHeight: "calc(100vh - 32px)",
      overflowY: "auto",
    },
    popupTitle: {
      fontFamily: "'Bebas Neue', cursive",
      textAlign: "center",
      letterSpacing: 2,
      marginBottom: "clamp(16px, 3vh, 32px)",
      fontSize: "clamp(18px, 3vw, 28px)",
    },
    popupUser: {
      display: "flex",
      gap: 16,
      alignItems: "center",
      marginBottom: "clamp(16px, 3vh, 32px)",
    },
    popupAvatar: {
      width: 46,
      height: 46,
      borderRadius: "50%",
      background: "#1db954",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      fontWeight: "bold",
      flexShrink: 0,
    },
    popupUserName: {
      fontSize: 18,
    },
    popupUserSubtext: {
      fontSize: 14,
      opacity: 0.8,
    },
    popupStars: {
      display: "flex",
      justifyContent: "center",
      gap: "clamp(12px, 3vw, 30px)",
      marginBottom: "clamp(16px, 3vh, 32px)",
      flexWrap: "wrap",
    },
    popupStar: {
      fontSize: "clamp(30px, 6vw, 46px)",
      color: "#ffc107",
    },
    popupTextareaContainer: {
      border: "2px solid #ffe600",
      borderRadius: 20,
      padding: "clamp(16px, 3vw, 24px)",
      marginBottom: "clamp(20px, 4vw, 30px)",
    },
    popupTextarea: {
      width: "100%",
      minHeight: 120,
      maxHeight: 220,
      background: "transparent",
      border: "none",
      outline: "none",
      resize: "vertical",
      color: "#ddd",
      fontSize: "clamp(14px, 2.5vw, 15px)",
      lineHeight: 1.7,
    },
    popupAddPhoto: {
      textAlign: "center",
      marginBottom: "clamp(16px, 3vh, 24px)",
    },
    popupAddPhotoButton: {
      background: "#4a4a2f",
      color: "#fff",
      border: "none",
      padding: "12px 26px",
      borderRadius: 30,
      cursor: "pointer",
      fontSize: "clamp(14px, 2.5vw, 15px)",
    },
    popupActions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 16,
      flexWrap: "wrap",
      marginTop: "12px",
    },
    popupButton: {
      background: "#ffe600",
      color: "#000",
      border: "none",
      padding: "12px 26px",
      fontWeight: 700,
      borderRadius: 8,
      cursor: "pointer",
      minWidth: 120,
    },
    popupPostButton: {
      background: "#ffe600",
      color: "#000",
      border: "none",
      padding: "12px 30px",
      fontWeight: 700,
      borderRadius: 8,
      cursor: "pointer",
      minWidth: 120,
    },
    reviewsGrid: {
      display: "grid",
      gridTemplateColumns: "1.3fr 1fr",
      gap: 10,
    },
    reviewsLeftColumn: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    reviewCardWithImage: {
      border: "1px solid #ffe600",
      borderRadius: 16,
      padding: 16,
      background: "#1b1b1b",
      width: "100%",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },

    reviewHeader: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "8px",
    },

    reviewAvatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#22c55e",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      color: "#000",
      flexShrink: 0,
    },

    reviewUserName: {
      fontSize: "14px",
      fontWeight: 600,
      color: "#fff",
    },
    reviewImage: {
      width: "100%",
      borderRadius: 10,
      marginBottom: 12,
      maxHeight: 200,
      objectFit: "cover",
    },

    reviewStars: {
      color: "#ffe600",
      fontSize: 18,
      marginBottom: 8,
    },
    reviewText: {
      color: "#ddd",
      fontSize: 15,
      lineHeight: "1.5",
    },
    reviewsRightColumn: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    reviewCardText: {
      border: "1px solid #ffe600",
      borderRadius: 12,
      padding: 20,
      background: "#1b1b1b",
      width: "100%",
      boxSizing: "border-box",
    },
    rangeSection: {
      padding: "64px 0",
      background: "#1b1b1b",
    },
    rangeTitle: {
      fontFamily: "'Bebas Neue', cursive",
      fontSize: 56,
      fontWeight: 900,
      textTransform: "uppercase",
      color: "#ffe600",
      maxWidth: 2100,
      margin: "0 auto 56px",
      textAlign: "center",
      letterSpacing: "1px",
      lineHeight: "1.00",
    },
    rangeGrid: {
      maxWidth: 1380,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 291.51px))",
      gap: 18,
      padding: "0 8px",
      justifyContent: "center",
      alignItems: "stretch",
    },
    rangeCard: {
      background: "#3a3a3a",
      border: "2px solid #ffe600",
      borderRadius: 14,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      height: 500,
      transition: "transform 0.35s ease, box-shadow 0.35s ease",
      willChange: "transform",
    },
    rangeCardImage: {
      height: 330,
      overflow: "hidden",
    },
    rangeCardImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    rangeCardContent: {
      padding: "18px 18px 16px",
    },
    rangeCardTitle: {
      fontWeight: 900,
      fontSize: 12,
      letterSpacing: "0.6px",
      marginBottom: 6,
      textTransform: "uppercase",
      color: "#fff",
      lineHeight: "16px",
    },
    rangeCardSubtitle: {
      fontSize: 12,
      marginBottom: 10,
      opacity: 0.85,
      color: "#fff",
    },
    rangeCardPrice: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 14,
      color: "#fff",
    },
    rangeCardPriceMain: {
      fontWeight: 800,
      fontSize: 14,
    },
    rangeCardPriceOld: {
      textDecoration: "line-through",
      color: "#9a9a9a",
      fontSize: 13,
    },
    rangeCardButton: {
      width: "100%",
      height: 42,
      background: "#ffe600",
      color: "#000",
      border: "none",
      fontWeight: 900,
      cursor: "pointer",
      borderRadius: 8,
      fontSize: 14,
      letterSpacing: "0.5px",
    },

    highlightsTitle: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 14,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      color: "#fff",
    },

    highlightsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: 14,
      marginBottom: 34,
    },

    descriptionContainer: {
      marginBottom: 34,
      padding: "16px 0",
      borderTop: "1px solid rgba(255, 230, 0, 0.2)",
      borderBottom: "1px solid rgba(255, 230, 0, 0.2)",
    },

    descriptionTitle: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 12,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      color: "#ffe600",
    },

    descriptionText: {
      fontSize: 14,
      lineHeight: 1.6,
      color: "#ddd",
      margin: 0,
      whiteSpace: "pre-line", // This preserves line breaks
    },

    highlightTag: {
      border: "2px solid #ffe600",
      padding: "10px 18px",
      borderRadius: 10,
      fontSize: 12,
      fontWeight: 700,
      whiteSpace: "nowrap",
      color: "#fff",
      textTransform: "uppercase",
    },

    priceBlock: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 20,
    },

    currentPrice: {
      fontSize: 28,
      fontWeight: 800,
      color: "#fff",
    },

    originalPrice: {
      fontSize: 16,
      color: "#aaa",
      textDecoration: "line-through",
    },

    discountText: {
      fontSize: 14,
      fontWeight: 700,
      color: "#00ff88",
    },
  };

  const images = Array.isArray(product?.images)
    ? product.images.map((img) => img.url)
    : [];

  const filteredReviews = showTopRated
    ? reviews.filter((r) => r.rating >= 4)
    : reviews;

  const imageReviews = filteredReviews.filter((r) => r.images?.length > 0);
  const textReviews = filteredReviews.filter(
    (r) => !r.images || r.images.length === 0,
  );

  return (
    <>
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
        
        /* ================= LUXURY LOADER ================= */
        .loader-overlay {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at center, #1a1a1a, #000);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .luxury-loader {
          position: relative;
          text-align: center;
          color: #ffeb00;
        }

        .ring {
          width: 120px;
          height: 120px;
          border: 3px solid transparent;
          border-top: 3px solid #ffeb00;
          border-right: 3px solid #ffeb00;
          border-radius: 50%;
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          animation: spin 1.5s linear infinite;
          filter: drop-shadow(0 0 10px #ffeb00);
        }

        .icon-wrapper {
          color: #ffeb00;
          animation: floatPulse 1.6s infinite ease-in-out;
          filter: drop-shadow(0 0 18px #ffeb00);
        }

        .shimmer-text {
          margin-top: 40px;
          font-family: "Jersey 25", cursive;
          font-size: 26px;
          letter-spacing: 2px;
          background: linear-gradient(
            90deg,
            #ffeb00 25%,
            #ffffff 50%,
            #ffeb00 75%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2s linear infinite;
        }

        @keyframes spin {
          100% {
            transform: translateX(-50%) rotate(360deg);
          }
        }

        @keyframes floatPulse {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.15);
          }
        }

        @keyframes shimmer {
          100% {
            background-position: 200% center;
          }
        }

        /* ================= ERROR BOX ================= */
        .error-box {
          background: #151515;
          border: 2px solid #ffeb00;
          border-radius: 20px;
          padding: 40px 30px;
          text-align: center;
          width: 90%;
          max-width: 420px;
          animation: popIn 0.3s ease;
          box-shadow: 0 0 25px rgba(255, 235, 0, 0.15);
        }

        .error-icon {
          font-size: 48px;
          margin-bottom: 16px;
          color: #ffeb00;
          animation: shake 0.6s ease;
        }

        .error-box h2 {
          font-family: "Jersey 25", cursive;
          font-size: 28px;
          color: #ffeb00;
          margin-bottom: 12px;
          letter-spacing: 1px;
        }

        .error-box p {
          font-size: 14px;
          color: #ffffff;
          margin-bottom: 24px;
          opacity: 0.85;
        }

        .retry-btn {
          height: 46px;
          width: 100%;
          background: transparent;
          border: 2px solid #ffeb00;
          color: #ffeb00;
          font-family: "Jersey 25", cursive;
          font-size: 15px;
          font-weight: 800;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .retry-btn:hover {
          background: #ffeb00;
          color: #000;
          transform: translateY(-2px);
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
        }

        @keyframes popIn {
          from {
            transform: scale(0.85);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @media (max-width: 768px) {
          .product-section {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            padding: 30px 20px !important;
            margin-left: 0 !important;
          }
          
          .main-image-container {
            height: 300px !important;
            margin-left: 0 !important;
          }
          
          .main-image {
            height: 300px !important;
          }
          
          .thumbnails-container {
            margin-left: 0 !important;
            grid-template-columns: repeat(4, 1fr) !important;
          }
          
          .thumbnail-image {
            height: 80px !important;
          }
          
          .details-container {
            max-width: 100% !important;
          }
          
          .title {
            font-size: 28px !important;
          }
          
          .current-price {
            font-size: 24px !important;
          }
          
          .action-buttons {
            flex-direction: column !important;
          }
          
          .action-buttons button {
            width: 100% !important;
            font-size: 18px !important;
          }
          
          .reviews-section {
            padding: 20px 20px !important;
          }
          
          .reviews-header {
            margin-left: 0 !important;
          }
          
          .reviews-grid {
            grid-template-columns: 1fr !important;
          }
          
          .range-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
            padding: 0 4px !important;
          }
          
          .range-title {
            font-size: 32px !important;
          }
          
          .reviews-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
          
          .reviews-buttons button {
            width: 100% !important;
          }
          
          .popup-content {
            padding: 20px !important;
            max-height: calc(100vh - 32px) !important;
          }
        }
        
        @media (max-width: 480px) {
          .range-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
            padding: 0 8px !important;
          }
        }

        /* ================= RESPONSIVE CART ICON ================= */
        .cart-icon {
          display: inline;
          vertical-align: middle;
          flex-shrink: 0;
        }
        
        .cart-icon-btn {
          margin-right: clamp(4px, 2vw, 8px);
        }

        /* Desktop */
        @media (min-width: 1025px) {
          .cart-icon-btn {
            width: 18px;
            height: 18px;
            margin-right: 6px;
          }
        }

        /* Tablet (768px - 1024px) */
        @media (max-width: 1024px) and (min-width: 769px) {
          .cart-icon-btn {
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
        }

        /* Mobile (max 768px) */
        @media (max-width: 768px) {
          .cart-icon-btn {
            width: 14px;
            height: 14px;
            margin-right: 4px;
          }
        }

        /* Small phones (max 480px) */
        @media (max-width: 480px) {
          .cart-icon-btn {
            width: 12px;
            height: 12px;
            margin-right: 3px;
          }
        }
      `}</style>

      {loading && (
        <div className="loader-overlay">
          <div className="luxury-loader">
            <div className="ring"></div>
            <div className="icon-wrapper">
              <Package size={60} />
            </div>
            <h2 className="shimmer-text">Loading...</h2>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="loader-overlay">
          <div className="error-box">
            <div className="error-icon">⚠</div>
            <h2>Unable to Load Product</h2>
            <p>{error}</p>
            <button
              className="retry-btn"
              onClick={() => window.location.reload()}
            >
              RETRY
            </button>
          </div>
        </div>
      )}

      {!loading && !error && product && (
        <div style={styles.container}>
          <section style={styles.productSection} className="product-section">
            <div>
              <div style={styles.mainImageContainer} className="main-image-container">
                <img
                  src={activeImage || images[0] || "/images/Product1.png"}
                  alt={product.name}
                  style={styles.mainImage}
                  className="main-image"
                />
              </div>

              <div style={styles.thumbnailsContainer} className="thumbnails-container">
                {images.map((src, i) => (
                  <div
                    key={i}
                    style={{
                      ...styles.thumbnailBox,
                      ...(activeImage === src ? styles.thumbnailBoxActive : {}),
                      borderColor:
                        activeImage === src ? "#ffe600" : "transparent",
                    }}
                    onClick={() => setActiveImage(src)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#ffe600";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      if (activeImage !== src) {
                        e.currentTarget.style.borderColor = "transparent";
                      }
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <img
                      src={src}
                      alt={`thumb-${i}`}
                      style={styles.thumbnailImage}
                      className="thumbnail-image"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.detailsContainer} className="details-container">
              <h1 style={styles.title} className="title">{product.name}</h1>

              <div style={styles.ratingContainer}>
                <div style={styles.stars}></div>
                <span style={styles.numReviews}>
                  {"★".repeat(Math.round(product.rating || 0))}
                  {"☆".repeat(5 - Math.round(product.rating || 0))}
                  <span style={styles.reviewCount}>
                    | {product.numReviews || 0} Reviews
                  </span>
                </span>
              </div>

              <div style={styles.priceBlock}>
                <span style={styles.currentPrice} className="current-price">₹{product.price}</span>

                {product.originalPrice > product.price && (
                  <span style={styles.originalPrice}>
                    ₹{product.originalPrice}
                  </span>
                )}

                {product.discountPercent > 0 && (
                  <span style={styles.discountText}>
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>
              {/* // In the details section, add this after the highlightsContainer div */}
              <div>
                <div style={styles.highlightsContainer}>
                  {product.highlights?.map((item, i) => (
                    <span key={i} style={styles.highlightTag}>
                      {item}
                    </span>
                  ))}
                </div>

                {/* Add Description Section Here */}
                {product.description && (
                  <div style={styles.descriptionContainer}>
                    <h3 style={styles.descriptionTitle}>Description</h3>
                    <p style={styles.descriptionText}>{product.description}</p>
                  </div>
                )}
              </div>

              <div style={styles.quantityContainer}>
                <div style={styles.quantityLabel}>Quantity</div>

                <div style={styles.quantityBox}>
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#ffe600";
                      e.currentTarget.style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#fff";
                    }}
                    style={{
                      ...styles.quantityButton,
                      ...styles.quantityButtonLeft,
                    }}
                  >
                    −
                  </button>

                  <div style={styles.quantityValue}>{qty}</div>

                  <button
                    onClick={() => {
                      if (qty < product.countInStock) {
                        setQty(qty + 1);
                      } else {
                        showNotification("warning", "Stock Limit", `Only ${product.countInStock} items available`);
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#ffe600";
                      e.currentTarget.style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#fff";
                    }}
                    style={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
              </div>
             
<div style={styles.actionButtons} className="action-buttons">
  {product.countInStock > 0 ? (
    <>
      <button
        style={styles.addToCartButton}
        onClick={() => handleAddToCart(product._id)}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#ffe600";
          e.currentTarget.style.color = "#000";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#1b1b1b";
          e.currentTarget.style.color = "#fff";
        }}
      >
        <ShoppingCart className="cart-icon cart-icon-btn" /> ADD TO CART
      </button>

      <button
        style={{
          ...styles.buyNowButton,
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
        disabled={loading}
        onClick={handleBuyNow}
      >
        BUY NOW
      </button>
    </>
  ) : (
    <button
      disabled
      style={{
        ...styles.buyNowButton,
        flex: 2,
        background: "#2a2a2a",
        color: "#9ca3af",
        border: "1px solid #555",
        cursor: "not-allowed",
        opacity: 0.7,
        fontFamily: "'Bebas Neue', cursive",
        letterSpacing: "1px",
      }}
    >
      OUT OF STOCK
    </button>
  )}
</div>
            </div>
          </section>

          <section style={styles.reviewsSection} className="reviews-section">
            <section style={{ maxWidth: 1200, margin: "0 auto", padding: 40 }}>
              <div style={styles.reviewsHeader} className="reviews-header">
                <div>
                  <h2>Customer Reviews</h2>
                  <div style={{ color: "#ffe600" }}></div>
                </div>

                <div style={styles.reviewsButtons} className="reviews-buttons">
                  <button
                    onClick={() => setShowReviewPopup(true)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    style={styles.writeReviewButton}
                  >
                    WRITE A REVIEW
                  </button>

                  <button
                    onClick={() => setShowTopRated((prev) => !prev)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    style={{
                      ...styles.topRatedButton,
                      background: showTopRated ? "#ffe600" : "#4a4a2f",
                      color: showTopRated ? "#000" : "#fff",
                    }}
                  >
                    TOP RATED
                  </button>
                </div>
              </div>
            </section>

            {showReviewPopup && (
              <div
                onClick={() => setShowReviewPopup(false)}
                style={styles.popupOverlay}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={styles.popupContent}
                  className="popup-content"
                >
                  <div style={styles.popupUser}>
                    <div style={styles.popupUser}>
                      <div style={styles.popupAvatar}>
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={styles.popupUserName}>{user?.name}</div>
                        <div style={styles.popupUserSubtext}>
                          Posting publicly on this site
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.popupStars}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        style={{
                          ...styles.popupStar,
                          cursor: "pointer",
                          color: i <= rating ? "#ffc107" : "#555",
                        }}
                        onClick={() => setRating(i)}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <div style={styles.popupTextareaContainer}>
                    <textarea
                      placeholder="Write your review here..."
                      style={styles.popupTextarea}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>

                  <div style={styles.popupAddPhoto}>
                    <label style={styles.popupAddPhotoButton}>
                      📷 Add Photos & images
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => setReviewImages([...e.target.files])}
                      />
                    </label>

                    {reviewImages.length > 0 && (
                      <p style={{ color: "#aaa", marginTop: 8 }}>
                        {reviewImages.length} image(s) selected
                      </p>
                    )}
                  </div>

                  <div style={styles.popupActions}>
                    <button
                      onClick={() => setShowReviewPopup(false)}
                      style={styles.popupButton}
                    >
                      Cancel
                    </button>

                    <button
                      onClick={submitReviewHandler}
                      disabled={submittingReview}
                      style={styles.popupPostButton}
                    >
                      {submittingReview ? "Posting..." : "Post"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div style={styles.reviewsGrid} className="reviews-grid">
              <div style={styles.reviewsLeftColumn}>
                {reviewsLoading && <p>Loading reviews...</p>}

                {!reviewsLoading && reviews.length === 0 && (
                  <p>No reviews yet.</p>
                )}

                {imageReviews.map((review) => (
                  <div key={review._id} style={styles.reviewCardWithImage}>
                    <div style={styles.reviewHeader}>
                      <div style={styles.reviewAvatar}>
                        {review.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div style={styles.reviewUserName}>{review.user?.name}</div>
                    </div>

                    <img
                      src={review.images[0].url}
                      alt="Review"
                      style={styles.reviewImage}
                    />

                    <div style={styles.reviewStars}>
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>

                    <p style={styles.reviewText}>{review.comment}</p>
                  </div>
                ))}
              </div>
              <div style={styles.reviewsRightColumn}>
                {textReviews.map((review) => (
                  <div key={review._id} style={styles.reviewCardText}>
                    <div style={styles.reviewHeader}>
                      <div style={styles.reviewAvatar}>
                        {review.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div style={styles.reviewUserName}>{review.user?.name}</div>
                    </div>

                    <div style={styles.reviewStars}>
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>

                    <p style={styles.reviewText}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={styles.rangeSection}>
            <h1 style={styles.rangeTitle} className="range-title">Explore Our Range</h1>

            <div style={styles.rangeGrid} className="range-grid">
              {relatedProducts.map((item) => (
                <div
                  key={item._id}
                  style={{ ...styles.rangeCard, cursor: "pointer" }}
                  onClick={() => navigate(`/productspec/${item._id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 18px 36px rgba(0,0,0,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={styles.rangeCardImage}>
                    <img
                      src={item.images?.[0]?.url || "/images/chocolate.webp"}
                      alt={item.name}
                      style={styles.rangeCardImg}
                    />
                  </div>

                  <div style={styles.rangeCardContent}>
                    <div style={styles.rangeCardTitle}>{item.name}</div>

                    <div style={styles.rangeCardSubtitle}>
                      {item.countInStock} available
                    </div>

                    <div style={styles.rangeCardPrice}>
                      <span style={styles.rangeCardPriceMain}>
                        RS : {item.price}
                      </span>

                      <span style={styles.rangeCardPriceOld}>
                        RS : {item.originalPrice}
                      </span>
                    </div>

                    <button
                      style={styles.rangeCardButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/productspec/${item._id}`);
                      }}
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {showLoginModal && (
            <div style={styles.modalOverlay}>
              <div style={styles.loginModal}>
                <h2 style={styles.loginTitle}>Login Required</h2>
                <p style={styles.loginText}>Please login to continue.</p>

                <div style={styles.modalActions}>
                  <button
                    style={{ ...styles.modalButton, ...styles.loginButton }}
                    onClick={() => navigate("/login")}
                  >
                    LOGIN
                  </button>

                  <button
                    style={{ ...styles.modalButton, ...styles.cancelButton }}
                    onClick={() => setShowLoginModal(false)}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Custom Notification Modal */}
          {showCustomModal && (
            <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-[9999] p-4">
              <div className="bg-[#1a1a1a] border-2 border-yellow-400 rounded-2xl p-8 max-w-md w-full animate-[popIn_0.3s_ease]">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  {modalConfig.type === "success" && (
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                  )}
                  {modalConfig.type === "error" && (
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                      <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                  )}
                  {modalConfig.type === "warning" && (
                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-yellow-500" />
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-center text-yellow-400 mb-3 font-mono">
                  {modalConfig.title}
                </h3>

                {/* Message */}
                <p className="text-center text-gray-300 mb-6">
                  {modalConfig.message}
                </p>

                {/* OK Button */}
                <button
                  className="w-full px-6 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-500 transition-all"
                  onClick={() => {
                    setShowCustomModal(false);
                    setModalConfig({ type: "", title: "", message: "" });
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          )}

          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductPage;