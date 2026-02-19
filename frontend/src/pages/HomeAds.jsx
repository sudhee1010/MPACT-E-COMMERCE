import React, { useEffect, useState, useRef } from "react";
import api from "../api/axios";

export default function HomeAds() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  // 🔥 Fetch banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get("/api/banners");
        const data = res.data;

        if (!data) {
          setBanners([]);
          return;
        }

        let bannersArray = [];
        if (Array.isArray(data)) {
          bannersArray = data.filter(b => b?.image?.url);
        } else if (data?.image?.url) {
          bannersArray = [data];
        }

        setBanners(bannersArray);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // 🔄 Auto-scroll effect
  useEffect(() => {
    if (banners.length === 0 || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let isPaused = false;
    let intervalId;

    const autoScroll = () => {
      if (!container || isPaused) return;

      const cardWidth = 340 + 12; // card width + gap
      const maxScroll = container.scrollWidth - container.clientWidth;
      const nextPosition = container.scrollLeft + cardWidth;

      if (nextPosition >= maxScroll) {
        // Smooth scroll to start
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        container.scrollTo({
          left: nextPosition,
          behavior: 'smooth'
        });
      }
    };

    // Start auto-scroll every 3 seconds
    intervalId = setInterval(autoScroll, 3000);

    // Pause on hover
    const handleMouseEnter = () => {
      isPaused = true;
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };

    const handleMouseLeave = () => {
      isPaused = false;
      autoScrollIntervalRef.current = setInterval(autoScroll, 3000);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [banners]);

  if (loading || banners.length === 0) return null;

  return (
    <>
      <style>{`
        .home-ads-container {
          padding: 20px 0;
          background-color: #232323;
        }

        .home-ads-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding: 0 12px 16px 12px;
          scroll-behavior: smooth;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .home-ads-scroll::-webkit-scrollbar {
          display: none;
        }

        .home-ad-card {
          min-width: 340px;
          max-width: 400px;
          flex: 0 0 auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .home-ad-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }

        .home-ad-image-wrapper {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .home-ad-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .home-ad-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px;
        }

        .home-ad-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.3px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          z-index: 10;
        }

        .home-ad-badge.discount {
          background: linear-gradient(135deg, #ff3e6c 0%, #ff1744 100%);
          color: white;
        }

        .home-ad-badge.new {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .home-ad-title {
          font-size: 18px;
          font-weight: 700;
          color: white;
          margin: 0 0 6px 0;
          line-height: 1.3;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .home-ad-subtitle {
          font-size: 13px;
          color: rgba(255,255,255,0.95);
          margin: 0 0 12px 0;
          line-height: 1.4;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .home-ad-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #fbbf24;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
          transition: gap 0.2s;
        }

        .home-ad-link:hover {
          gap: 10px;
        }

        .home-ad-link svg {
          transition: transform 0.2s;
        }

        .home-ad-link:hover svg {
          transform: translateX(2px);
        }

        @media (max-width: 768px) {
          .home-ad-card {
            min-width: 280px;
          }

          .home-ad-image-wrapper {
            height: 160px;
          }

          .home-ad-title {
            font-size: 16px;
          }

          .home-ad-subtitle {
            font-size: 12px;
          }
        }
      `}</style>

      <section className="home-ads-container">
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="home-ads-scroll" ref={scrollContainerRef}>
            {banners.map((banner, index) => {
              const bannerId = banner._id || banner.image?.url || index;
              
              return (
                <div key={bannerId} className="home-ad-card">
                  <a
                    href={banner.link || "#"}
                    style={{ textDecoration: "none", display: "block" }}
                    onClick={(e) => {
                      if (!banner.link) e.preventDefault();
                    }}
                    target={banner.link?.startsWith('http') ? "_blank" : "_self"}
                    rel={banner.link?.startsWith('http') ? "noopener noreferrer" : ""}
                  >
                    <div className="home-ad-image-wrapper">
                      <img
                        src={banner.image?.url}
                        alt={banner.title || "Advertisement"}
                        className="home-ad-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                        }}
                      />
                      
                      {banner.discount && (
                        <div className="home-ad-badge discount">
                          {banner.discount}% OFF
                        </div>
                      )}

                      {banner.isNew && !banner.discount && (
                        <div className="home-ad-badge new">
                          NEW
                        </div>
                      )}

                      <div className="home-ad-overlay">
                        {banner.title && (
                          <h3 className="home-ad-title">
                            {banner.title}
                          </h3>
                        )}
                        
                        {banner.subtitle && (
                          <p className="home-ad-subtitle">
                            {banner.subtitle}
                          </p>
                        )}

                        {banner.link && (
                          <span className="home-ad-link">
                            <span>Shop Now</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}