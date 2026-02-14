import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function VideoCarouselSection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(4);
  const [scrollY, setScrollY] = useState(0);

  // Fetch videos from backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/videohome");
        setVideos(res.data || []);
      } catch (err) {
        console.error("Failed to load videos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate cards per view based on screen size
  const getCardsPerView = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    if (window.innerWidth <= 1400) return 3;
    return 4;
  };

  useEffect(() => {
    setCardsPerView(getCardsPerView());
    
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset cardsRef when videos change
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, videos.length);
  }, [videos]);

  // GSAP animations
  useEffect(() => {
    if (!videos.length) return;

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        ".carousel-title",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // Animate title underline
      gsap.fromTo(
        ".title-underline",
        { width: 0 },
        { width: 120, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );

      // Animate subtitle
      gsap.fromTo(
        ".carousel-subtitle",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );

      // Stagger animate cards
      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            delay: 0.5,
            ease: "power3.out",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [videos]);

  // Update carousel position
  const updateCarousel = (index) => {
    if (!trackRef.current || !cardsRef.current[0]) return;
    
    const cardWidth = cardsRef.current[0].offsetWidth;
    const gap = 24;
    const offset = -(index * (cardWidth + gap));
    
    gsap.to(trackRef.current, {
      x: offset,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  // Reset carousel position when cardsPerView changes
  useEffect(() => {
    setCurrentIndex(0);
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: 0,
        duration: 0.3,
      });
    }
  }, [cardsPerView]);

  // Update carousel when index changes
  useEffect(() => {
    updateCarousel(currentIndex);
  }, [currentIndex]);

  const moveCarousel = (direction) => {
    const maxIndex = Math.max(0, videos.length - cardsPerView);
    const newIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToProductSpec = (productId) => {
    // Navigate to product details page using the actual product ID
    navigate(`/productspec/${productId}`);
  };

  if (loading) return null;
  if (!videos.length) return null;

  const maxIndex = Math.max(0, videos.length - cardsPerView);

  return (
    <>
      <style>{`
        .video-carousel-section {
          position: relative;
          padding: 80px 0 100px;
          background: #262626;
          overflow: hidden;
        }

        .video-carousel-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(250,204,21,0.3), transparent);
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
          z-index: 2;
        }

        .carousel-title {
          font-size: 56px;
          font-weight: 900;
          color: #facc15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .title-underline {
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, #facc15, #FFED4E);
          margin: 0 auto 20px;
          border-radius: 2px;
        }

        .carousel-subtitle {
          font-size: 18px;
          color: #CCCCCC;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .cart-message {
          text-align: center;
          margin-bottom: 20px;
          font-weight: bold;
          color: #4ade80;
          font-size: 16px;
        }

        .carousel-container {
          position: relative;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 60px;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .carousel-container {
            padding: 0 40px;
          }
        }

        .carousel-wrapper {
          overflow: hidden;
          position: relative;
        }

        .carousel-track {
          display: flex;
          gap: 24px;
          padding: 20px 0;
          will-change: transform;
        }

        .product-card {
          flex: 0 0 calc((100% - 72px) / 4);
          min-width: 280px;
          display: flex;
          flex-direction: column;
          height: 100%;
          background: linear-gradient(to bottom, rgba(120,53,15,0.4), #171717);
          border: 2px solid rgba(133,77,14,0.5);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.4s ease;
          cursor: pointer;
          transform: translateY(60px);
          opacity: 0;
        }

        .product-card.visible {
          transform: translateY(0);
          opacity: 1;
        }

        .product-card:hover {
          border-color: #facc15;
          box-shadow: 0 8px 20px rgba(250, 204, 21, 0.1);
        }

        @media (max-width: 1400px) {
          .product-card {
            flex: 0 0 calc((100% - 48px) / 3);
          }
        }

        @media (max-width: 1024px) {
          .product-card {
            flex: 0 0 calc((100% - 24px) / 2);
          }
        }

        @media (max-width: 768px) {
          .product-card {
            flex: 0 0 calc(100% - 40px);
            min-width: 280px;
          }
        }

        .video-container {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
          background: #000;
        }

        @media (max-width: 768px) {
          .video-container {
            height: 240px;
          }
        }

        .video-container video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .video-container video {
          transform: scale(1.1);
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-card:hover .video-overlay {
          opacity: 1;
        }

        .play-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #facc15;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(0);
          transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .product-card:hover .play-icon {
          transform: scale(1);
        }

        .play-icon::after {
          content: '';
          width: 0;
          height: 0;
          border-left: 18px solid #000;
          border-top: 12px solid transparent;
          border-bottom: 12px solid transparent;
          margin-left: 4px;
        }

        .product-info {
          padding: 16px;
          background: #171717;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .product-name {
          font-size: 16px;
          font-weight: 900;
          color: white;
          margin-bottom: 8px;
          text-transform: uppercase;
          text-align: center;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 44px;
        }

        .price-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .current-price {
          font-size: 24px;
          font-weight: 900;
          color: white;
        }

        .original-price {
          font-size: 16px;
          color: #6b7280;
          text-decoration: line-through;
        }

        .discount-badge {
          background: #facc15;
          color: black;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cta-button {
          width: 100%;
          padding: 12px 24px;
          background: #facc15;
          color: black;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          margin-top: auto;
        }

        .cta-button:hover {
          background: #eab308;
          transform: scale(1.05);
        }

        .cta-button.out-of-stock {
          background: #2a2a2a;
          color: #9ca3af;
          border: 1px solid #555;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .cta-button.out-of-stock:hover {
          transform: none;
          background: #2a2a2a;
        }

        .carousel-controls {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 48px;
        }

        .carousel-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #2a2a2a;
          border: 2px solid #facc15;
          color: #facc15;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-size: 28px;
          font-weight: 300;
          line-height: 1;
        }

        .carousel-btn:hover:not(:disabled) {
          background: #facc15;
          color: #000;
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(250, 204, 21, 0.4);
        }

        .carousel-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          border-color: #666666;
          color: #666666;
          transform: none;
        }

        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 32px;
        }

        .indicator {
          width: 40px;
          height: 6px;
          background: #2a2a2a;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .indicator:hover {
          background: #facc15;
          opacity: 0.5;
        }

        .indicator.active {
          background: #facc15;
          width: 60px;
          opacity: 1;
        }

        @media (max-width: 768px) {
          .video-carousel-section {
            padding: 60px 0 80px;
          }

          .section-header {
            margin-bottom: 40px;
          }

          .carousel-title {
            font-size: 36px;
          }

          .carousel-controls {
            margin-top: 32px;
            gap: 16px;
          }

          .carousel-btn {
            width: 48px;
            height: 48px;
            font-size: 24px;
          }

          .carousel-indicators {
            gap: 8px;
          }

          .indicator {
            width: 30px;
            height: 4px;
          }

          .indicator.active {
            width: 45px;
          }
        }

        @media (max-width: 480px) {
          .carousel-container {
            padding: 0 20px;
          }

          .product-card {
            min-width: 260px;
          }

          .product-info {
            padding: 12px;
          }

          .current-price {
            font-size: 20px;
          }

          .product-name {
            font-size: 14px;
          }
        }
      `}</style>

      <section ref={sectionRef} className="video-carousel-section">
        {/* Background Decorations */}
        <div className="bg-decoration circle-decoration-1"></div>
        <div className="bg-decoration circle-decoration-2"></div>

        {/* Carousel Container */}
        <div className="carousel-container">
          <div className="carousel-wrapper">
            <div ref={trackRef} className="carousel-track">
              {videos.map((video, index) => (
                <div
                  key={video._id || index}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                    if (el) {
                      setTimeout(() => {
                        if (scrollY > 500) {
                          el.classList.add('visible');
                        }
                      }, 100);
                    }
                  }}
                  className="product-card"
                  onClick={() => goToProductSpec(video.productId)}
                  style={{
                    transform: scrollY > 500 ? 'translateY(0)' : 'translateY(60px)',
                    opacity: scrollY > 500 ? 1 : 0
                  }}
                >
                  <div className="video-container">
                    <video
                      src={video.videoUrl}
                      muted
                      autoPlay
                      loop
                      playsInline
                      poster={video.thumbnailUrl}
                    />
                    <div className="video-overlay">
                      <div className="play-icon"></div>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">
                      {video.productName || "SuperYou Product"}
                    </h3>
                    
                    <div className="price-section">
                      <span className="current-price">
                        ₹ {video.currentPrice || "439"}
                      </span>
                      {video.originalPrice && (
                        <span className="original-price">
                          ₹{video.originalPrice}
                        </span>
                      )}
                    </div>

                    {video.discount && (
                      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                        <span className="discount-badge">
                          {video.discount}% OFF
                        </span>
                      </div>
                    )}

                    <button
                      className={`cta-button ${video.countInStock <= 0 ? 'out-of-stock' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (video.countInStock > 0) {
                          goToProductSpec(video.productId);
                        }
                      }}
                      disabled={video.countInStock <= 0}
                    >
                      {video.countInStock > 0 ? 'VIEW PRODUCT' : 'OUT OF STOCK'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          {videos.length > cardsPerView && (
            <>
              <div className="carousel-controls">
                <button
                  className="carousel-btn"
                  onClick={() => moveCarousel(-1)}
                  disabled={currentIndex === 0}
                  aria-label="Previous slide"
                >
                  ‹
                </button>
                <button
                  className="carousel-btn"
                  onClick={() => moveCarousel(1)}
                  disabled={currentIndex >= maxIndex}
                  aria-label="Next slide"
                >
                  ›
                </button>
              </div>

              {/* Carousel Indicators */}
              <div className="carousel-indicators">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <div
                    key={index}
                    className={`indicator ${index === currentIndex ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          </div>
      </section>
    </>
  );
}