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

// Enhanced position presets for different screen sizes
const positionPresets = {
  desktop: [
    { x: -280, y: -50, rotate: -10, scale: 0.92 },
    { x: -140, y: -90, rotate: -5, scale: 0.98 },
    { x: 0, y: -30, rotate: 0, scale: 1.05 },
    { x: 140, y: 50, rotate: 5, scale: 0.98 },
    { x: 280, y: 10, rotate: 10, scale: 0.92 },
  ],
  laptop: [
    { x: -220, y: -40, rotate: -8, scale: 0.93 },
    { x: -110, y: -70, rotate: -4, scale: 0.99 },
    { x: 0, y: -20, rotate: 0, scale: 1.05 },
    { x: 110, y: 50, rotate: 4, scale: 0.99 },
    { x: 220, y: 15, rotate: 8, scale: 0.93 },
  ],
  tablet: [
    { x: -150, y: -30, rotate: -6, scale: 0.94 },
    { x: -75, y: -50, rotate: -3, scale: 1 },
    { x: 0, y: -15, rotate: 0, scale: 1.04 },
    { x: 75, y: 35, rotate: 3, scale: 1 },
    { x: 150, y: 10, rotate: 6, scale: 0.94 },
  ],
  mobile: [
    { x: -90, y: -50, rotate: -5, scale: 0.9 },
    { x: 0, y: 0, rotate: 0, scale: 1 },
    { x: 90, y: -50, rotate: 5, scale: 0.9 },
  ],
  mobileSmall: [
    { x: -70, y: -40, rotate: -4, scale: 0.88 },
    { x: 0, y: 0, rotate: 0, scale: 1 },
    { x: 70, y: -40, rotate: 4, scale: 0.88 },
  ],
};

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
  const [screenSize, setScreenSize] = useState('desktop');
  const [showVideoModal, setShowVideoModal] = useState(false);

  // 🔹 Enhanced screen size detection
  useEffect(() => {
    const detectScreenSize = () => {
      const width = window.innerWidth;
      
      if (width >= 1920) setScreenSize('desktop');
      else if (width >= 1366 && width < 1920) setScreenSize('laptop');
      else if (width >= 1024 && width < 1366) setScreenSize('laptop');
      else if (width >= 768 && width < 1024) setScreenSize('tablet');
      else if (width >= 480 && width < 768) setScreenSize('mobile');
      else setScreenSize('mobileSmall');
    };
    
    detectScreenSize();
    window.addEventListener("resize", detectScreenSize);
    return () => window.removeEventListener("resize", detectScreenSize);
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

  // 🔹 Get appropriate presets and video count based on screen size
  const getDisplayConfig = () => {
    let presets = positionPresets[screenSize] || positionPresets.desktop;
    let videoCount = presets.length;
    
    // Adjust video count for different screens
    if (screenSize === 'mobile' || screenSize === 'mobileSmall') {
      videoCount = 3;
    }
    
    return { presets, videoCount };
  };

  // 🔹 GSAP animations
  useEffect(() => {
    if (!videos.length) return;

    const ctx = gsap.context(() => {
      const { presets, videoCount } = getDisplayConfig();
      const displayVideos = videos.slice(0, videoCount);
      
      // ===== ROUND VIDEO SECTION ANIMATION =====
      // Pin the sticky circle container
      ScrollTrigger.create({
        trigger: roundWrapRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: roundCircleRef.current,
        pinSpacing: false,
        scrub: 0.5,
      });

      // Responsive circle sizes
      const getCircleSizes = () => {
        switch(screenSize) {
          case 'mobileSmall': return { start: "35vw", end: "200vw" };
          case 'mobile': return { start: "30vw", end: "180vw" };
          case 'tablet': return { start: "15vw", end: "160vw" };
          case 'laptop': return { start: "12vw", end: "150vw" };
          default: return { start: "10vw", end: "150vw" };
        }
      };

      const circleSizes = getCircleSizes();

      // Animate the video circle to enlarge on scroll
      gsap.fromTo(roundElementRef.current,
        {
          width: circleSizes.start,
          height: circleSizes.start,
          borderRadius: "50%",
          scale: 1,
          opacity: 1,
          ease: "none"
        },
        {
          width: circleSizes.end,
          height: circleSizes.end,
          borderRadius: "50%",
          scale: screenSize.includes('mobile') ? 1.1 : 1.2,
          opacity: screenSize.includes('mobile') ? 0.95 : 0.9,
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

      // Animate the dark overlay
      if (roundOverlayRef.current) {
        gsap.fromTo(roundOverlayRef.current,
          { opacity: screenSize.includes('mobile') ? 0.2 : 0.3 },
          {
            opacity: screenSize.includes('mobile') ? 0.7 : 0.8,
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

      // Animate the light button
      if (roundButtonRef.current) {
        gsap.fromTo(roundButtonRef.current,
          { opacity: 1, scale: 1 },
          {
            opacity: 0,
            scale: screenSize.includes('mobile') ? 1.3 : 1.5,
            ease: "none",
            scrollTrigger: {
              trigger: roundWrapRef.current,
              start: "top top",
              end: screenSize.includes('mobile') ? "30% center" : "center center",
              scrub: 0.8
            }
          }
        );
      }

      // ===== VIDEO SHOWCASE SECTION ANIMATION =====
      if (showcaseTextRef.current) {
        const split = new SplitType(showcaseTextRef.current, { types: "words" });

        const showcaseTl = gsap.timeline({
          scrollTrigger: {
            trigger: showcaseSectionRef.current,
            start: "top top",
            end: screenSize.includes('mobile') ? "+=200%" : "+=250%",
            scrub: true,
            pin: true,
          },
        });

        // Responsive text animation
        const textStagger = screenSize.includes('mobile') ? 0.08 : 0.12;
        const textXOffset = screenSize.includes('mobile') ? -40 : -80;

        showcaseTl.fromTo(
          split.words,
          { x: textXOffset, opacity: 0 },
          { x: 0, opacity: 0.12, stagger: textStagger },
          0
        );

        // Set initial positions for video cards
        showcaseCardsRef.current.forEach((card, i) => {
          if (card && i < displayVideos.length) {
            const pos = presets[i % presets.length];
            gsap.set(card, pos);
          }
        });

        // Animate video cards with responsive stagger
        showcaseTl.fromTo(
          showcaseCardsRef.current.filter(card => card !== null),
          { opacity: 0, y: screenSize.includes('mobile') ? 40 : 60 },
          { opacity: 1, y: 0, stagger: screenSize.includes('mobile') ? 0.08 : 0.12 },
          0.15
        );

        // Responsive circle animation
        const circleStartSize = screenSize.includes('mobileSmall') ? "25vw" : 
                               screenSize.includes('mobile') ? "20vw" : 
                               screenSize.includes('tablet') ? "15vw" : "12vw";

        showcaseTl.fromTo(
          showcaseCircleRef.current,
          { 
            width: circleStartSize, 
            height: circleStartSize, 
            borderRadius: "50%" 
          },
          { 
            width: screenSize.includes('mobile') ? "200vw" : "150vw", 
            height: screenSize.includes('mobile') ? "200vw" : "150vw", 
            borderRadius: screenSize.includes('mobile') ? "100vw" : "75vw" 
          },
          screenSize.includes('mobile') ? 0.25 : 0.35
        );
      }
    });

    ScrollTrigger.refresh();

    // Refresh on resize
    const handleResize = () => {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [videos, screenSize]);

  const handlePlayClick = (e) => {
    e.preventDefault();
    setShowVideoModal(true);
  };

  const closeModal = () => {
    setShowVideoModal(false);
  };

  if (loading) return null;

  const { presets, videoCount } = getDisplayConfig();
  const displayVideos = videos.slice(0, videoCount);

  return (
    <>
      <style>{`
        /* ===== BASE STYLES ===== */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* ===== ROUND VIDEO SECTION STYLES ===== */
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
          max-width: 100%;
          margin: 0 auto;
        }

        .sticky-circle_wrap {
          position: relative;
          width: 100%;
        }

        /* Responsive heights */
        .sticky-circle_wrap {
          height: clamp(120vh, 180vh, 250vh);
        }

        @media (min-width: 1920px) {
          .sticky-circle_wrap { height: 250vh; }
        }
        @media (max-width: 1366px) {
          .sticky-circle_wrap { height: 200vh; }
        }
        @media (max-width: 1024px) {
          .sticky-circle_wrap { height: 180vh; }
        }
        @media (max-width: 768px) {
          .sticky-circle_wrap { height: 150vh; }
        }
        @media (max-width: 480px) {
          .sticky-circle_wrap { height: 120vh; }
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
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          box-shadow: 0 0 min(30px, 3vw) rgba(0, 0, 0, 0.3);
          will-change: width, height, border-radius, scale, opacity;
          transition: box-shadow 0.3s ease;
        }

        .sticky-circle_element:hover {
          box-shadow: 0 0 min(50px, 5vw) rgba(0, 0, 0, 0.5);
        }

        /* Responsive circle sizes */
        .sticky-circle_element {
          width: clamp(80px, 10vw, 200px);
          height: clamp(80px, 10vw, 200px);
        }

        @media (max-width: 768px) {
          .sticky-circle_element {
            width: clamp(100px, 30vw, 180px);
            height: clamp(100px, 30vw, 180px);
          }
        }

        @media (max-width: 480px) {
          .sticky-circle_element {
            width: clamp(120px, 35vw, 160px);
            height: clamp(120px, 35vw, 160px);
          }
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

        /* Responsive button sizes */
        .light-button.absolute {
          width: clamp(80px, 12vw, 200px);
          height: clamp(80px, 12vw, 200px);
        }

        @media (max-width: 768px) {
          .light-button.absolute {
            width: clamp(100px, 25vw, 180px);
            height: clamp(100px, 25vw, 180px);
          }
        }

        @media (max-width: 480px) {
          .light-button.absolute {
            width: clamp(120px, 35vw, 160px);
            height: clamp(120px, 35vw, 160px);
          }
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
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        /* Responsive play icon */
        .play-icon {
          width: clamp(20px, 4vw, 60px);
          height: clamp(20px, 4vw, 60px);
          font-size: clamp(20px, 4vw, 60px);
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

        /* Responsive SVG text */
        .circular-text-svg text {
          font-weight: 700;
          fill: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: clamp(6px, 1.2vw, 16px);
        }

        @media (max-width: 480px) {
          .circular-text-svg text {
            font-size: clamp(8px, 2.5vw, 12px);
          }
        }

        .light-button.absolute:hover .play-icon::after {
          transform: scale(1.2);
        }

        .light-button.absolute:hover .circular-bg {
          background: rgba(0, 0, 0, 0.85);
        }

        /* ===== VIDEO SHOWCASE SECTION STYLES ===== */
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
          font-weight: 900;
          color: rgba(250,204,21,.95);
          pointer-events: none;
          text-align: center;
          padding: 0 clamp(10px, 3vw, 30px);
          z-index: 5;
          text-transform: uppercase;
          line-height: 1.2;
          font-size: clamp(1.5rem, 8vw, 8rem);
        }

        /* Responsive text sizes */
        @media (min-width: 1920px) {
          .bg-text { font-size: 8rem; }
        }
        @media (max-width: 1366px) {
          .bg-text { font-size: 6rem; }
        }
        @media (max-width: 1024px) {
          .bg-text { font-size: 5rem; }
        }
        @media (max-width: 768px) {
          .bg-text { font-size: 3.5rem; }
        }
        @media (max-width: 480px) {
          .bg-text { font-size: 2.5rem; }
        }
        
        .showcase-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          background: rgba(250,204,21,.95);
          z-index: 10;
          border-radius: 50%;
          will-change: width, height;
        }
        
        .video-card {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: clamp(8px, 1.5vw, 20px);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,.45);
          z-index: 20;
          will-change: transform, opacity;
        }

        /* Responsive video card sizes */
        .video-card {
          width: clamp(100px, 15vw, 280px);
          aspect-ratio: 9/16;
        }

        @media (min-width: 1920px) {
          .video-card { width: 280px; }
        }
        @media (max-width: 1366px) {
          .video-card { width: 200px; }
        }
        @media (max-width: 1024px) {
          .video-card { width: 160px; }
        }
        @media (max-width: 768px) {
          .video-card { width: 130px; }
        }
        @media (max-width: 480px) {
          .video-card { width: 100px; }
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
          background: rgba(0, 0, 0, 0.98);
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
            transform: translateY(min(30px, 3vh));
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
          top: clamp(-40px, -5vh, -30px);
          right: 0;
          background: white;
          color: #523122;
          border: none;
          border-radius: 50%;
          font-size: clamp(20px, 3vw, 24px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        /* Responsive close button */
        .modal-close-btn {
          width: clamp(32px, 5vw, 44px);
          height: clamp(32px, 5vw, 44px);
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

        /* Landscape mode optimizations */
        @media (orientation: landscape) and (max-height: 600px) {
          .sticky-circle_wrap {
            height: 150vh;
          }
          
          .sticky-circle_element {
            width: clamp(60px, 15vh, 120px);
            height: clamp(60px, 15vh, 120px);
          }

          .light-button.absolute {
            width: clamp(70px, 18vh, 140px);
            height: clamp(70px, 18vh, 140px);
          }

          .video-card {
            width: clamp(80px, 12vh, 140px);
          }

          .bg-text {
            font-size: clamp(1.2rem, 8vh, 4rem);
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
          
          .video-card {
            box-shadow: 0 5px 15px rgba(0,0,0,.3);
          }
        }

        /* High-DPI screens */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .video-card {
            box-shadow: 0 15px 35px rgba(0,0,0,.5);
          }
        }

        /* Ultra-wide screens */
        @media (min-width: 2560px) {
          .video-card {
            width: 320px;
          }
          
          .bg-text {
            font-size: 10rem;
          }
          
          .sticky-circle_element {
            width: 200px;
            height: 200px;
          }
        }
      `}</style>

      {/* ===== ROUND VIDEO SECTION ===== */}
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

      {/* ===== VIDEO SHOWCASE SECTION ===== */}
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