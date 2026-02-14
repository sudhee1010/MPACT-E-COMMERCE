// StickyCircleSection.jsx
import React, { useEffect, useRef } from 'react';

const StickyCircleSection = () => {
  const sectionRef = useRef(null);
  const animationInitialized = useRef(false);
  const [showVideoModal, setShowVideoModal] = React.useState(false);

  const handlePlayClick = (e) => {
    e.preventDefault();
    setShowVideoModal(true);
  };

  const closeModal = () => {
    setShowVideoModal(false);
  };

  useEffect(() => {
    // Only initialize animation once
    if (animationInitialized.current) return;
    
    // Load GSAP and ScrollTrigger if not already loaded
    const loadScripts = async () => {
      if (!window.gsap) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js');
      }
      if (!window.ScrollTrigger) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js');
      }
      
      // Initialize animation after scripts are loaded
      initAnimation();
      animationInitialized.current = true;
    };

    loadScripts();

    return () => {
      // Clean up ScrollTrigger instances
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const initAnimation = () => {
    if (!window.gsap || !window.ScrollTrigger) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    // Register plugin
    gsap.registerPlugin(ScrollTrigger);

    // Get elements
    const stickyWrap = document.querySelector(".sticky-circle_wrap");
    const stickyElement = document.querySelector(".sticky-circle_element");
    const stickyCircle = document.querySelector(".sticky-circle");

    if (!stickyWrap || !stickyElement || !stickyCircle) return;

    // Kill any existing ScrollTriggers on these elements
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === stickyWrap) {
        trigger.kill();
      }
    });

    // Pin the sticky circle container
    ScrollTrigger.create({
      trigger: stickyWrap,
      start: "top top",
      end: "bottom bottom",
      pin: stickyCircle,
      pinSpacing: false,
      scrub: 0.5,
      markers: false, // Set to true for debugging
    });

    // Animate the video circle to enlarge on scroll
    gsap.fromTo(stickyElement,
      {
        width: "10vw",
        height: "10vw",
        borderRadius: "50%",
        scale: 1,
        opacity: 1,
        ease: "none"
      },
      {
        width: "150vw",
        height: "150vw",
        borderRadius: "50%",
        scale: 1.2,
        opacity: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: stickyWrap,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      }
    );

    // Animate the dark overlay
    const overlay = document.querySelector(".div-block-40");
    if (overlay) {
      gsap.fromTo(overlay,
        { opacity: 0.3 },
        {
          opacity: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: stickyWrap,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8
          }
        }
      );
    }

    // Animate the light button
    const lightButton = document.querySelector(".light-button.absolute");
    if (lightButton) {
      gsap.fromTo(lightButton,
        { opacity: 1, scale: 1 },
        {
          opacity: 0,
          scale: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: stickyWrap,
            start: "top top",
            end: "center center",
            scrub: 0.8
          }
        }
      );
    }

    // Refresh ScrollTrigger to ensure proper calculations
    ScrollTrigger.refresh();
  };

  return (
    <>
      <style>{`
        /* Sticky Circle Section Styles */
        .div-block-50 {
          position: relative;
          background-color: #523122;
          overflow: hidden;
          width: 100%;
        }

        .cont {
          position: relative;
          width: 100%;
        }

        .sticky-circle_wrap {
          position: relative;
          height: 200vh;
          width: 100%;
        }

        .sticky-circle {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100vh;
          will-change: transform;
        }

        .sticky-circle_element {
          width: 10vw;
          height: 10vw;
          border-radius: 20vw;
          overflow: hidden;
          position: relative;
          box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
          will-change: width, height, border-radius, scale, opacity;
          transition: box-shadow 0.3s ease;
        }

        .sticky-circle_element:hover {
          box-shadow: 0 0 70px rgba(0, 0, 0, 0.5);
        }

        .div-block-40 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          z-index: 2;
          pointer-events: none;
          will-change: opacity;
        }

        .videoclass {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 1;
        }

        .videoclass video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .lightbox-link {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          text-decoration: none;
          cursor: pointer;
        }

        /* Circular Play Button Styles */
        .light-button.absolute {
          width: 12vw;
          height: 12vw;
          border-radius: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          will-change: opacity, scale;
          background: transparent;
          cursor: pointer;
        }

        .circular-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          z-index: 1;
        }

        .play-icon {
          z-index: 3;
          font-size: 4vw;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 4vw;
          height: 4vw;
          transition: all 0.3s ease;
        }

        .play-icon::after {
          content: '▶';
          font-size: 3vw;
        }

        .circular-text-svg {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 2;
          animation: rotateText 20s linear infinite;
        }

        @keyframes rotateText {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .circular-text-svg text {
          font-weight: 700;
          fill: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .light-button.absolute:hover .play-icon::after {
          transform: scale(1.2);
        }

        .light-button.absolute:hover .circular-bg {
          background: rgba(0, 0, 0, 0.85);
        }

        /* Loading state */
        .loading-scripts {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 1.2vw;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .sticky-circle_element {
            width: 30vw;
            height: 30vw;
          }

          .light-button.absolute {
            width: 25vw;
            height: 25vw;
          }

          .play-icon {
            font-size: 8vw;
            width: 8vw;
            height: 8vw;
          }

          .play-icon::after {
            font-size: 6vw;
          }

          .circular-text-svg text {
            font-size: 2vw;
          }

          .sticky-circle_wrap {
            height: 150vh;
          }
        }

        /* Safari compatibility */
        @supports (-webkit-touch-callout: none) {
          .sticky-circle_element {
            transform: translateZ(0);
          }
          
          .videoclass video {
            transform: translateZ(0);
          }

          .light-button.absolute {
            transform: translateZ(0);
          }
        }

        /* Animation performance optimizations */
        .sticky-circle_element,
        .div-block-40,
        .light-button.absolute {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-perspective: 1000;
          perspective: 1000;
        }

        /* Custom scrollbar hiding */
        .sticky-circle_wrap::-webkit-scrollbar {
          display: none;
        }

        /* Modal Styles */
        .video-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .video-modal-content {
          position: relative;
          width: 90vw;
          max-width: 1200px;
          aspect-ratio: 16 / 9;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .video-modal-content iframe {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 8px;
        }

        .modal-close-btn {
          position: absolute;
          top: -50px;
          right: 0;
          background: white;
          color: #523122;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .modal-close-btn:hover {
          background: #523122;
          color: white;
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .video-modal-content {
            width: 95vw;
            max-width: 100%;
          }

          .modal-close-btn {
            top: 10px;
            right: 10px;
          }
        }
      `}</style>

      <div className="div-block-50" ref={sectionRef}>
        <div className="cont">
          <div className="sticky-circle_wrap">
            <div className="sticky-circle">
              <a 
                href="#" 
                className="lightbox-link w-inline-block w-lightbox"
                onClick={handlePlayClick}
              >
                <div className="light-button absolute">
                  <div className="circular-bg"></div>
                  
                  {/* Circular text SVG */}
                  <svg 
                    className="circular-text-svg" 
                    viewBox="0 0 200 200"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      zIndex: 2
                    }}
                  >
                    <defs>
                      <path 
                        id="circlePath" 
                        d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                        fill="none"
                      />
                    </defs>
                    <text style={{ fontSize: '14px', fontWeight: 700, fill: 'white', letterSpacing: '2px' }}>
                      <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                        PLAY VIDEO • PLAY VIDEO • PLAY VIDEO •
                      </textPath>
                    </text>
                  </svg>
                  
                  <div className="play-icon"></div>
                </div>
              </a>
              
              <div className="sticky-circle_element">
                <div className="div-block-40"></div>
                <div className="videoclass">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    poster="https://cdn.prod.website-files.com/669a8d6498ba88c08dfd2cd2%2F66ab8740f29f169f743966e6_669a8d6498ba88c08dfd2cd2_66a787ab53235ab6968a788f_on%20site-transcode-poster-00001.jpg"
                  >
                    <source 
                      src="Videos/Video2.mp4" 
                      type="video/mp4" 
                    />
                    <source 
                      src="https://cdn.prod.website-files.com/669a8d6498ba88c08dfd2cd2%2F66ab8740f29f169f743966e6_669a8d6498ba88c08dfd2cd2_66a787ab53235ab6968a788f_on%20site-transcode-transcode.webm" 
                      type="video/webm" 
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Video Modal */}
      {showVideoModal && (
        <div className="video-modal-overlay" onClick={closeModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              ×
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default StickyCircleSection;