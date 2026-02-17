// // import { useEffect, useRef } from "react";
// // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import SplitType from "split-type";

// // gsap.registerPlugin(ScrollTrigger);

// // const videos = [
// //   { id: 1, src: "https://www.youtube.com/shorts/3Y-Ndhb5DJI", x: -260, y: -40, rotate: -8, scale: 0.95 },
// //   { id: 2, src: "/videos/v2.mp4", x: -130, y: -80, rotate: -4, scale: 1 },
// //   { id: 3, src: "/videos/v3.mp4", x: 0, y: -20, rotate: 0, scale: 1.05 },
// //   { id: 4, src: "/videos/v4.mp4", x: 130, y: 60, rotate: 4, scale: 1 },
// //   { id: 5, src: "/videos/v5.mp4", x: 260, y: 20, rotate: 8, scale: 0.95 },
// // ];

// // export default function VideoShowcaseSection() {
// //   const sectionRef = useRef(null);
// //   const circleRef = useRef(null);
// //   const cardsRef = useRef([]);
// //   const textRef = useRef(null);

// //   useEffect(() => {
// //     const ctx = gsap.context(() => {
// //       const split = new SplitType(textRef.current, { types: "words" });

// //       const tl = gsap.timeline({
// //         scrollTrigger: {
// //           trigger: sectionRef.current,
// //           start: "top top",
// //           end: "+=250%",
// //           scrub: true,
// //           pin: true,
// //         },
// //       });

// //       tl.fromTo(
// //         split.words,
// //         { x: -80, opacity: 0 },
// //         { x: 0, opacity: 0.12, stagger: 0.12 },
// //         0
// //       );

// //       cardsRef.current.forEach((card, i) => {
// //         gsap.set(card, {
// //           x: videos[i].x,
// //           y: videos[i].y,
// //           rotation: videos[i].rotate,
// //           scale: videos[i].scale,
// //         });
// //       });

// //       tl.fromTo(
// //         cardsRef.current,
// //         { opacity: 0, y: 60 },
// //         { opacity: 1, y: 0, stagger: 0.12 },
// //         0.15
// //       );

// //       tl.fromTo(
// //         circleRef.current,
// //         { width: "12vw", height: "12vw", borderRadius: "50%" },
// //         { width: "150vw", height: "150vw", borderRadius: "75vw" },
// //         0.35
// //       );
// //     }, sectionRef);

// //     return () => ctx.revert();
// //   }, []);

// //   return (
// //     <>
// //       <style>{`
// //         .video-section {
// //           height: 100vh;
// //           background: #000;
// //           position: relative;
// //           overflow: hidden;
// //         }
// //         .bg-text {
// //           position: absolute;
// //           inset: 0;
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //           font-size: 12vw;
// //           font-weight: 900;
// //           color: rgba(250,204,21,.95);
// //           pointer-events: none;
// //         }
// //         .circle {
// //           position: absolute;
// //           top: 50%;
// //           left: 50%;
// //           transform: translate(-50%,-50%);
// //           background: rgba(250,204,21,.95);
// //         }
// //         .video-card {
// //           position: absolute;
// //           top: 50%;
// //           left: 50%;
// //           width: 220px;
// //           aspect-ratio: 9/16;
// //           border-radius: 20px;
// //           overflow: hidden;
// //           box-shadow: 0 40px 80px rgba(0,0,0,.45);
// //         }
// //         video {
// //           width: 100%;
// //           height: 100%;
// //           object-fit: cover;
// //         }
// //       `}</style>

// //       <section ref={sectionRef} className="video-section">
// //         <h2 ref={textRef} className="bg-text">
// //           WHAT’S EVERYONE TALKING
// //         </h2>

// //         <div ref={circleRef} className="circle" />

// //         {videos.map((v, i) => (
// //           <div
// //             key={v.id}
// //             ref={el => (cardsRef.current[i] = el)}
// //             className="video-card"
// //             style={{ transform: "translate(-50%, -50%)" }}
// //           >
// //             <video src={v.src} muted playsInline />
// //           </div>
// //         ))}
// //       </section>
// //     </>
// //   );
// // }




// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import SplitType from "split-type";

// gsap.registerPlugin(ScrollTrigger);

// const positionPresets = [
//   { x: -260, y: -40, rotate: -8, scale: 0.95 },
//   { x: -130, y: -80, rotate: -4, scale: 1 },
//   { x: 0, y: -20, rotate: 0, scale: 1.05 },
//   { x: 130, y: 60, rotate: 4, scale: 1 },
//   { x: 260, y: 20, rotate: 8, scale: 0.95 },
// ];

// export default function VideoShowcaseSection() {
//   const sectionRef = useRef(null);
//   const circleRef = useRef(null);
//   const cardsRef = useRef([]);
//   const textRef = useRef(null);

//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Fetch videos from backend
//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const res = await axios.get("https://mpact-e-backend.onrender.com/api/videos");
//         setVideos(res.data || []);
//       } catch (err) {
//         console.error("Failed to load videos");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideos();
//   }, []);

//   // 🔹 GSAP animation (runs only after videos load)
//   useEffect(() => {
//     if (!videos.length) return;

//     const ctx = gsap.context(() => {
//       const split = new SplitType(textRef.current, { types: "words" });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=250%",
//           scrub: true,
//           pin: true,
//         },
//       });

//       tl.fromTo(
//         split.words,
//         { x: -80, opacity: 0 },
//         { x: 0, opacity: 0.12, stagger: 0.12 },
//         0
//       );

//       cardsRef.current.forEach((card, i) => {
//         const pos = positionPresets[i % positionPresets.length];
//         gsap.set(card, pos);
//       });

//       tl.fromTo(
//         cardsRef.current,
//         { opacity: 0, y: 60 },
//         { opacity: 1, y: 0, stagger: 0.12 },
//         0.15
//       );

//       tl.fromTo(
//         circleRef.current,
//         { width: "12vw", height: "12vw", borderRadius: "50%" },
//         { width: "150vw", height: "150vw", borderRadius: "75vw" },
//         0.35
//       );
//     }, sectionRef);

//      ScrollTrigger.refresh();

//     return () => ctx.revert();
//   }, [videos]);

//   if (loading) return null;

//   return (
//     <>
//       <style>{`
//         .video-section {
//           height: 100vh;
//           background: #000;
//           position: relative;
//           overflow: hidden;
//         }
//         .bg-text {
//           position: absolute;
//           inset: 0;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           font-size: 12vw;
//           font-weight: 900;
//           color: rgba(250,204,21,.95);
//           pointer-events: none;
//         }
//         .circle {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%,-50%);
//           background: rgba(250,204,21,.95);
//         }
//         .video-card {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           width: 220px;
//           aspect-ratio: 9/16;
//           border-radius: 20px;
//           overflow: hidden;
//           box-shadow: 0 40px 80px rgba(0,0,0,.45);
//         }
//         video {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
//       `}</style>

//       <section ref={sectionRef} className="video-section">
//         <h2 ref={textRef} className="bg-text">
//           WHAT’S EVERYONE TALKING
//         </h2>

//         <div ref={circleRef} className="circle" />

//         {videos.map((v, i) => (
//           <div
//             key={v._id}
//             ref={el => (cardsRef.current[i] = el)}
//             className="video-card"
//             style={{ transform: "translate(-50%, -50%)" }}
//           >
//             <video src={v.videoUrl} muted autoPlay loop playsInline />
//           </div>
//         ))}
//       </section>
//     </>
//   );
// }



// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import SplitType from "split-type";
// import api from "../api/axios";

// gsap.registerPlugin(ScrollTrigger);

// const positionPresets = [
//   { x: -260, y: -40, rotate: -8, scale: 0.95 },
//   { x: -130, y: -80, rotate: -4, scale: 1 },
//   { x: 0, y: -20, rotate: 0, scale: 1.05 },
//   { x: 130, y: 60, rotate: 4, scale: 1 },
//   { x: 260, y: 20, rotate: 8, scale: 0.95 },
// ];

// const mobilePositionPresets = [
//   { x: -100, y: -60, rotate: -6, scale: 0.9 },
//   { x: 0, y: 0, rotate: 0, scale: 1 },
//   { x: 100, y: -60, rotate: 6, scale: 0.9 },
// ];

// export default function VideoShowcaseSection() {
//   const sectionRef = useRef(null);
//   const circleRef = useRef(null);
//   const cardsRef = useRef([]);
//   const textRef = useRef(null);

//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);

//   // 🔹 Detect mobile view
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
    
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // 🔹 Fetch videos from backend
//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const res = await api.get("/api/videos");
//         setVideos(res.data || []);
//       } catch (err) {
//         console.error("Failed to load videos");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideos();
//   }, []);

//   // 🔹 GSAP animation (runs only after videos load)
//   useEffect(() => {
//     if (!videos.length) return;

//     const ctx = gsap.context(() => {
//       const split = new SplitType(textRef.current, { types: "words" });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=250%",
//           scrub: true,
//           pin: true,
//         },
//       });

//       tl.fromTo(
//         split.words,
//         { x: -80, opacity: 0 },
//         { x: 0, opacity: 0.12, stagger: 0.12 },
//         0
//       );

//       // 🔹 Use appropriate presets based on screen size
//       const displayVideos = isMobile ? videos.slice(0, 3) : videos;
//       const presets = isMobile ? mobilePositionPresets : positionPresets;

//       cardsRef.current.forEach((card, i) => {
//         if (card && i < displayVideos.length) {
//           const pos = presets[i % presets.length];
//           gsap.set(card, pos);
//         }
//       });

//       tl.fromTo(
//         cardsRef.current.filter(card => card !== null),
//         { opacity: 0, y: 60 },
//         { opacity: 1, y: 0, stagger: 0.12 },
//         0.15
//       );

//       tl.fromTo(
//         circleRef.current,
//         { width: isMobile ? "20vw" : "12vw", height: isMobile ? "20vw" : "12vw", borderRadius: "50%" },
//         { width: "150vw", height: "150vw", borderRadius: "75vw" },
//         0.35
//       );
//     }, sectionRef);

//     ScrollTrigger.refresh();

//     return () => ctx.revert();
//   }, [videos, isMobile]);

//   if (loading) return null;

//   // 🔹 Show only 3 videos on mobile
//   const displayVideos = isMobile ? videos.slice(0, 3) : videos;

//   return (
//     <>
//       <style>{`
//         .video-section {
//           height: 100vh;
//           background: #000;
//           position: relative;
//           overflow: hidden;
//         }
//         .bg-text {
//           position: absolute;
//           inset: 0;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           font-size: 12vw;
//           font-weight: 900;
//           color: rgba(250,204,21,.95);
//           pointer-events: none;
//           text-align: center;
//           padding: 0 20px;
//         }
//         .circle {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%,-50%);
//           background: rgba(250,204,21,.95);
//         }
//         .video-card {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           width: 220px;
//           aspect-ratio: 9/16;
//           border-radius: 20px;
//           overflow: hidden;
//           box-shadow: 0 40px 80px rgba(0,0,0,.45);
//         }
//         video {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         @media (max-width: 768px) {
//           .bg-text {
//             font-size: 16vw;
//           }
//           .video-card {
//             width: 160px;
//           }
//         }
//       `}</style>

//       <section ref={sectionRef} className="video-section">
//         <h2 ref={textRef} className="bg-text">
//           WHAT'S EVERYONE TALKING
//         </h2>

//         <div ref={circleRef} className="circle" />

//         {displayVideos.map((v, i) => (
//           <div
//             key={v._id}
//             ref={el => (cardsRef.current[i] = el)}
//             className="video-card"
//             style={{ transform: "translate(-50%, -50%)" }}
//           >
//             <video src={v.videoUrl} muted autoPlay loop playsInline />
//           </div>
//         ))}
//       </section>
//     </>
//   );
// }

// VideoShowcaseSection.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import api from "../api/axios";

gsap.registerPlugin(ScrollTrigger);

const positionPresets = [
  { x: -260, y: -40, rotate: -8, scale: 0.95 },
  { x: -130, y: -80, rotate: -4, scale: 1 },
  { x: 0, y: -20, rotate: 0, scale: 1.05 },
  { x: 130, y: 60, rotate: 4, scale: 1 },
  { x: 260, y: 20, rotate: 8, scale: 0.95 },
];

const mobilePositionPresets = [
  { x: -100, y: -60, rotate: -6, scale: 0.9 },
  { x: 0, y: 0, rotate: 0, scale: 1 },
  { x: 100, y: -60, rotate: 6, scale: 0.9 },
];

export default function VideoShowcaseSection() {
  // Refs for RoundVideo section (first)
  const roundSectionRef = useRef(null);
  const roundCircleRef = useRef(null);
  const roundElementRef = useRef(null);
  const roundOverlayRef = useRef(null);
  const roundButtonRef = useRef(null);
  const roundWrapRef = useRef(null);

  // Refs for VideoShowcase section (second)
  const showcaseSectionRef = useRef(null);
  const showcaseCircleRef = useRef(null);
  const showcaseCardsRef = useRef([]);
  const showcaseTextRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // 🔹 Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 🔹 Fetch videos from backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get("/api/videos");
        setVideos(res.data || []);
      } catch (err) {
        console.error("Failed to load videos");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // 🔹 GSAP animations
  useEffect(() => {
    if (!videos.length) return;

    const ctx = gsap.context(() => {
      
      // ===== ROUND VIDEO SECTION ANIMATION (First Section) =====
      // Pin the sticky circle container - exact animation from roundvideo file
      ScrollTrigger.create({
        trigger: roundWrapRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: roundCircleRef.current,
        pinSpacing: false,
        scrub: 0.5,
      });

      // Animate the video circle to enlarge on scroll - exact from roundvideo
      gsap.fromTo(roundElementRef.current,
        {
          width: isMobile ? "30vw" : "10vw",
          height: isMobile ? "30vw" : "10vw",
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
            trigger: roundWrapRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        }
      );

      // Animate the dark overlay - exact from roundvideo
      if (roundOverlayRef.current) {
        gsap.fromTo(roundOverlayRef.current,
          { opacity: 0.3 },
          {
            opacity: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: roundWrapRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8
            }
          }
        );
      }

      // Animate the light button - exact from roundvideo
      if (roundButtonRef.current) {
        gsap.fromTo(roundButtonRef.current,
          { opacity: 1, scale: 1 },
          {
            opacity: 0,
            scale: 1.5,
            ease: "none",
            scrollTrigger: {
              trigger: roundWrapRef.current,
              start: "top top",
              end: "center center",
              scrub: 0.8
            }
          }
        );
      }

      // ===== VIDEO SHOWCASE SECTION ANIMATION (Second Section) =====
      // Split text for background animation
      if (showcaseTextRef.current) {
        const split = new SplitType(showcaseTextRef.current, { types: "words" });

        const showcaseTl = gsap.timeline({
          scrollTrigger: {
            trigger: showcaseSectionRef.current,
            start: "top top",
            end: "+=250%",
            scrub: true,
            pin: true,
          },
        });

        // Animate background text
        showcaseTl.fromTo(
          split.words,
          { x: -80, opacity: 0 },
          { x: 0, opacity: 0.12, stagger: 0.12 },
          0
        );

        // 🔹 Use appropriate presets based on screen size
        const displayVideos = isMobile ? videos.slice(0, 3) : videos;
        const presets = isMobile ? mobilePositionPresets : positionPresets;

        // Set initial positions for video cards
        showcaseCardsRef.current.forEach((card, i) => {
          if (card && i < displayVideos.length) {
            const pos = presets[i % presets.length];
            gsap.set(card, pos);
          }
        });

        // Animate video cards
        showcaseTl.fromTo(
          showcaseCardsRef.current.filter(card => card !== null),
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, stagger: 0.12 },
          0.15
        );

        // Animate the yellow circle
        showcaseTl.fromTo(
          showcaseCircleRef.current,
          { 
            width: isMobile ? "20vw" : "12vw", 
            height: isMobile ? "20vw" : "12vw", 
            borderRadius: "50%" 
          },
          { 
            width: "150vw", 
            height: "150vw", 
            borderRadius: "75vw" 
          },
          0.35
        );
      }
    });

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [videos, isMobile]);

  const handlePlayClick = (e) => {
    e.preventDefault();
    setShowVideoModal(true);
  };

  const closeModal = () => {
    setShowVideoModal(false);
  };

  if (loading) return null;

  // 🔹 Show only 3 videos on mobile
  const displayVideos = isMobile ? videos.slice(0, 3) : videos;

  return (
    <>
      <style>{`
        /* ===== ROUND VIDEO SECTION STYLES (First Section) ===== */
        .round-video-section {
          position: relative;
          background-color: #523122;
          overflow: hidden;
          width: 100%;
          z-index: 10;
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
          width: clamp(80px, 10vw, 150px);
          height: clamp(80px, 10vw, 150px);
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          box-shadow: 0 0 min(50px, 5vw) rgba(0, 0, 0, 0.3);
          will-change: width, height, border-radius, scale, opacity;
          transition: box-shadow 0.3s ease;
        }

        .sticky-circle_element:hover {
          box-shadow: 0 0 min(70px, 7vw) rgba(0, 0, 0, 0.5);
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
          width: clamp(80px, 12vw, 180px);
          height: clamp(80px, 12vw, 180px);
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
          transition: background 0.3s ease;
        }

        .play-icon {
          z-index: 3;
          font-size: clamp(20px, 4vw, 60px);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(20px, 4vw, 60px);
          height: clamp(20px, 4vw, 60px);
          transition: transform 0.3s ease;
        }

        .play-icon::after {
          content: '▶';
          font-size: clamp(16px, 3vw, 45px);
        }

        .circular-text-svg {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 2;
          animation: rotateText 20s linear infinite;
        }

        @keyframes rotateText {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .circular-text-svg text {
          font-weight: 700;
          fill: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: clamp(8px, 1.5vw, 16px);
        }

        .light-button.absolute:hover .play-icon::after {
          transform: scale(1.2);
        }

        .light-button.absolute:hover .circular-bg {
          background: rgba(0, 0, 0, 0.85);
        }

        /* ===== VIDEO SHOWCASE SECTION STYLES (Second Section) ===== */
        .video-showcase-section {
          min-height: 100vh;
          background: #000;
          position: relative;
          overflow: hidden;
          z-index: 20;
        }
        
        .bg-text {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: clamp(3rem, 12vw, 8rem);
          font-weight: 900;
          color: rgba(250,204,21,.95);
          pointer-events: none;
          text-align: center;
          padding: 0 20px;
          z-index: 5;
          text-transform: uppercase;
          line-height: 1.2;
        }
        
        .showcase-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          background: rgba(250,204,21,.95);
          z-index: 10;
          border-radius: 50%;
        }
        
        .video-card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: clamp(140px, 15vw, 220px);
          aspect-ratio: 9/16;
          border-radius: clamp(12px, 1.5vw, 20px);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,.45);
          z-index: 20;
          will-change: transform, opacity;
        }
        
        .video-card video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* ===== MODAL STYLES ===== */
        .video-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
          padding: clamp(10px, 3vw, 30px);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .video-modal-content {
          position: relative;
          width: 100%;
          max-width: min(1200px, 90vw);
          aspect-ratio: 16 / 9;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(min(50px, 5vh));
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
          border-radius: clamp(4px, 1vw, 8px);
        }

        .modal-close-btn {
          position: absolute;
          top: max(-50px, -5vh);
          right: 0;
          background: white;
          color: #523122;
          border: none;
          width: clamp(32px, 5vw, 40px);
          height: clamp(32px, 5vw, 40px);
          border-radius: 50%;
          font-size: clamp(20px, 3vw, 24px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .modal-close-btn:hover {
          background: #523122;
          color: white;
          transform: scale(1.1);
        }

        /* Animation performance optimizations */
        .sticky-circle_element,
        .div-block-40,
        .light-button.absolute,
        .video-card,
        .showcase-circle {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-perspective: 1000;
          perspective: 1000;
        }

        /* Responsive Styles */
        @media (max-width: 992px) {
          .sticky-circle_wrap {
            height: 180vh;
          }
          
          .bg-text {
            font-size: clamp(2.5rem, 10vw, 6rem);
          }
        }

        @media (max-width: 768px) {
          .sticky-circle_wrap {
            height: 150vh;
          }
          
          .sticky-circle_element {
            width: clamp(100px, 30vw, 200px);
            height: clamp(100px, 30vw, 200px);
          }

          .light-button.absolute {
            width: clamp(120px, 25vw, 180px);
            height: clamp(120px, 25vw, 180px);
          }

          .play-icon {
            font-size: clamp(30px, 8vw, 50px);
          }

          .play-icon::after {
            font-size: clamp(24px, 6vw, 40px);
          }

          .circular-text-svg text {
            font-size: clamp(10px, 2vw, 14px);
          }

          .bg-text {
            font-size: clamp(2rem, 8vw, 4rem);
          }

          .video-card {
            width: clamp(120px, 25vw, 160px);
          }
        }

        @media (max-width: 480px) {
          .sticky-circle_wrap {
            height: 120vh;
          }
          
          .sticky-circle_element {
            width: clamp(120px, 35vw, 180px);
            height: clamp(120px, 35vw, 180px);
          }

          .light-button.absolute {
            width: clamp(140px, 35vw, 180px);
            height: clamp(140px, 35vw, 180px);
          }

          .circular-text-svg {
            animation-duration: 15s;
          }

          .bg-text {
            font-size: clamp(1.5rem, 6vw, 3rem);
          }

          .video-card {
            width: clamp(100px, 30vw, 140px);
          }
        }

        /* Landscape mode */
        @media (orientation: landscape) and (max-height: 600px) {
          .sticky-circle_element {
            width: clamp(80px, 20vh, 150px);
            height: clamp(80px, 20vh, 150px);
          }

          .light-button.absolute {
            width: clamp(100px, 25vh, 180px);
            height: clamp(100px, 25vh, 180px);
          }

          .video-card {
            width: clamp(100px, 15vh, 160px);
          }
        }

        /* Safari compatibility */
        @supports (-webkit-touch-callout: none) {
          .sticky-circle_element,
          .video-card,
          .showcase-circle {
            transform: translateZ(0);
          }
        }

        /* Reduce motion preference */
        @media (prefers-reduced-motion: reduce) {
          .sticky-circle_element,
          .light-button.absolute,
          .div-block-40,
          .showcase-circle,
          .video-card,
          .circular-text-svg {
            transition: none !important;
            animation: none !important;
          }
          
          .video-modal-overlay,
          .video-modal-content {
            animation: none;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .light-button.absolute:hover .play-icon::after {
            transform: none;
          }
          
          .light-button.absolute:hover .circular-bg {
            background: rgba(0, 0, 0, 0.7);
          }
          
          .modal-close-btn {
            width: 44px;
            height: 44px;
          }
        }
      `}</style>

      {/* ===== ROUND VIDEO SECTION (First Section) ===== */}
      <div className="round-video-section" ref={roundSectionRef}>
        <div className="cont">
          <div className="sticky-circle_wrap" ref={roundWrapRef}>
            <div className="sticky-circle" ref={roundCircleRef}>
              <a 
                href="#" 
                className="lightbox-link w-inline-block w-lightbox"
                onClick={handlePlayClick}
                aria-label="Play video"
              >
                <div className="light-button absolute" ref={roundButtonRef}>
                  <div className="circular-bg"></div>
                  
                  {/* Circular text SVG */}
                  <svg 
                    className="circular-text-svg" 
                    viewBox="0 0 200 200"
                    preserveAspectRatio="xMidYMid meet"
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
                    <text>
                      <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                        PLAY VIDEO • PLAY VIDEO • PLAY VIDEO •
                      </textPath>
                    </text>
                  </svg>
                  
                  <div className="play-icon" aria-hidden="true"></div>
                </div>
              </a>
              
              <div className="sticky-circle_element" ref={roundElementRef}>
                <div className="div-block-40" ref={roundOverlayRef}></div>
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

      {/* ===== VIDEO SHOWCASE SECTION (Second Section) ===== */}
      <section ref={showcaseSectionRef} className="video-showcase-section">
        <h2 ref={showcaseTextRef} className="bg-text">
          WHAT'S EVERYONE TALKING
        </h2>

        <div ref={showcaseCircleRef} className="showcase-circle" />

        {displayVideos.map((v, i) => (
          <div
            key={v._id}
            ref={el => (showcaseCardsRef.current[i] = el)}
            className="video-card"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <video src={v.videoUrl} muted autoPlay loop playsInline />
          </div>
        ))}
      </section>

      {/* ===== VIDEO MODAL ===== */}
      {showVideoModal && (
        <div className="video-modal-overlay" onClick={closeModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close video">
              ×
            </button>
            <iframe
              src="https://www.youtube.com/embed/YFNSDdrElfc?si=iSaKNmIlM-sx7JSf?autoplay=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}