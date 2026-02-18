// // // import { useEffect, useRef } from "react";
// // // import { gsap } from "gsap";
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // import SplitType from "split-type";

// // // gsap.registerPlugin(ScrollTrigger);

// // // const videos = [
// // //   { id: 1, src: "https://www.youtube.com/shorts/3Y-Ndhb5DJI", x: -260, y: -40, rotate: -8, scale: 0.95 },
// // //   { id: 2, src: "/videos/v2.mp4", x: -130, y: -80, rotate: -4, scale: 1 },
// // //   { id: 3, src: "/videos/v3.mp4", x: 0, y: -20, rotate: 0, scale: 1.05 },
// // //   { id: 4, src: "/videos/v4.mp4", x: 130, y: 60, rotate: 4, scale: 1 },
// // //   { id: 5, src: "/videos/v5.mp4", x: 260, y: 20, rotate: 8, scale: 0.95 },
// // // ];

// // // export default function VideoShowcaseSection() {
// // //   const sectionRef = useRef(null);
// // //   const circleRef = useRef(null);
// // //   const cardsRef = useRef([]);
// // //   const textRef = useRef(null);

// // //   useEffect(() => {
// // //     const ctx = gsap.context(() => {
// // //       const split = new SplitType(textRef.current, { types: "words" });

// // //       const tl = gsap.timeline({
// // //         scrollTrigger: {
// // //           trigger: sectionRef.current,
// // //           start: "top top",
// // //           end: "+=250%",
// // //           scrub: true,
// // //           pin: true,
// // //         },
// // //       });

// // //       tl.fromTo(
// // //         split.words,
// // //         { x: -80, opacity: 0 },
// // //         { x: 0, opacity: 0.12, stagger: 0.12 },
// // //         0
// // //       );

// // //       cardsRef.current.forEach((card, i) => {
// // //         gsap.set(card, {
// // //           x: videos[i].x,
// // //           y: videos[i].y,
// // //           rotation: videos[i].rotate,
// // //           scale: videos[i].scale,
// // //         });
// // //       });

// // //       tl.fromTo(
// // //         cardsRef.current,
// // //         { opacity: 0, y: 60 },
// // //         { opacity: 1, y: 0, stagger: 0.12 },
// // //         0.15
// // //       );

// // //       tl.fromTo(
// // //         circleRef.current,
// // //         { width: "12vw", height: "12vw", borderRadius: "50%" },
// // //         { width: "150vw", height: "150vw", borderRadius: "75vw" },
// // //         0.35
// // //       );
// // //     }, sectionRef);

// // //     return () => ctx.revert();
// // //   }, []);

// // //   return (
// // //     <>
// // //       <style>{`
// // //         .video-section {
// // //           height: 100vh;
// // //           background: #000;
// // //           position: relative;
// // //           overflow: hidden;
// // //         }
// // //         .bg-text {
// // //           position: absolute;
// // //           inset: 0;
// // //           display: flex;
// // //           justify-content: center;
// // //           align-items: center;
// // //           font-size: 12vw;
// // //           font-weight: 900;
// // //           color: rgba(250,204,21,.95);
// // //           pointer-events: none;
// // //         }
// // //         .circle {
// // //           position: absolute;
// // //           top: 50%;
// // //           left: 50%;
// // //           transform: translate(-50%,-50%);
// // //           background: rgba(250,204,21,.95);
// // //         }
// // //         .video-card {
// // //           position: absolute;
// // //           top: 50%;
// // //           left: 50%;
// // //           width: 220px;
// // //           aspect-ratio: 9/16;
// // //           border-radius: 20px;
// // //           overflow: hidden;
// // //           box-shadow: 0 40px 80px rgba(0,0,0,.45);
// // //         }
// // //         video {
// // //           width: 100%;
// // //           height: 100%;
// // //           object-fit: cover;
// // //         }
// // //       `}</style>

// // //       <section ref={sectionRef} className="video-section">
// // //         <h2 ref={textRef} className="bg-text">
// // //           WHAT’S EVERYONE TALKING
// // //         </h2>

// // //         <div ref={circleRef} className="circle" />

// // //         {videos.map((v, i) => (
// // //           <div
// // //             key={v.id}
// // //             ref={el => (cardsRef.current[i] = el)}
// // //             className="video-card"
// // //             style={{ transform: "translate(-50%, -50%)" }}
// // //           >
// // //             <video src={v.src} muted playsInline />
// // //           </div>
// // //         ))}
// // //       </section>
// // //     </>
// // //   );
// // // }




// // import { useEffect, useRef, useState } from "react";
// // import axios from "axios";
// // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import SplitType from "split-type";

// // gsap.registerPlugin(ScrollTrigger);

// // const positionPresets = [
// //   { x: -260, y: -40, rotate: -8, scale: 0.95 },
// //   { x: -130, y: -80, rotate: -4, scale: 1 },
// //   { x: 0, y: -20, rotate: 0, scale: 1.05 },
// //   { x: 130, y: 60, rotate: 4, scale: 1 },
// //   { x: 260, y: 20, rotate: 8, scale: 0.95 },
// // ];

// // export default function VideoShowcaseSection() {
// //   const sectionRef = useRef(null);
// //   const circleRef = useRef(null);
// //   const cardsRef = useRef([]);
// //   const textRef = useRef(null);

// //   const [videos, setVideos] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // 🔹 Fetch videos from backend
// //   useEffect(() => {
// //     const fetchVideos = async () => {
// //       try {
// //         const res = await axios.get("https://mpact-e-backend.onrender.com/api/videos");
// //         setVideos(res.data || []);
// //       } catch (err) {
// //         console.error("Failed to load videos");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchVideos();
// //   }, []);

// //   // 🔹 GSAP animation (runs only after videos load)
// //   useEffect(() => {
// //     if (!videos.length) return;

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
// //         const pos = positionPresets[i % positionPresets.length];
// //         gsap.set(card, pos);
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

// //      ScrollTrigger.refresh();

// //     return () => ctx.revert();
// //   }, [videos]);

// //   if (loading) return null;

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
// //             key={v._id}
// //             ref={el => (cardsRef.current[i] = el)}
// //             className="video-card"
// //             style={{ transform: "translate(-50%, -50%)" }}
// //           >
// //             <video src={v.videoUrl} muted autoPlay loop playsInline />
// //           </div>
// //         ))}
// //       </section>
// //     </>
// //   );
// // }



// // import { useEffect, useRef, useState } from "react";
// // import axios from "axios";
// // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import SplitType from "split-type";
// // import api from "../api/axios";

// // gsap.registerPlugin(ScrollTrigger);

// // const positionPresets = [
// //   { x: -260, y: -40, rotate: -8, scale: 0.95 },
// //   { x: -130, y: -80, rotate: -4, scale: 1 },
// //   { x: 0, y: -20, rotate: 0, scale: 1.05 },
// //   { x: 130, y: 60, rotate: 4, scale: 1 },
// //   { x: 260, y: 20, rotate: 8, scale: 0.95 },
// // ];

// // const mobilePositionPresets = [
// //   { x: -100, y: -60, rotate: -6, scale: 0.9 },
// //   { x: 0, y: 0, rotate: 0, scale: 1 },
// //   { x: 100, y: -60, rotate: 6, scale: 0.9 },
// // ];

// // export default function VideoShowcaseSection() {
// //   const sectionRef = useRef(null);
// //   const circleRef = useRef(null);
// //   const cardsRef = useRef([]);
// //   const textRef = useRef(null);

// //   const [videos, setVideos] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isMobile, setIsMobile] = useState(false);

// //   // 🔹 Detect mobile view
// //   useEffect(() => {
// //     const checkMobile = () => {
// //       setIsMobile(window.innerWidth <= 768);
// //     };
    
// //     checkMobile();
// //     window.addEventListener("resize", checkMobile);
// //     return () => window.removeEventListener("resize", checkMobile);
// //   }, []);

// //   // 🔹 Fetch videos from backend
// //   useEffect(() => {
// //     const fetchVideos = async () => {
// //       try {
// //         const res = await api.get("/api/videos");
// //         setVideos(res.data || []);
// //       } catch (err) {
// //         console.error("Failed to load videos");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchVideos();
// //   }, []);

// //   // 🔹 GSAP animation (runs only after videos load)
// //   useEffect(() => {
// //     if (!videos.length) return;

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

// //       // 🔹 Use appropriate presets based on screen size
// //       const displayVideos = isMobile ? videos.slice(0, 3) : videos;
// //       const presets = isMobile ? mobilePositionPresets : positionPresets;

// //       cardsRef.current.forEach((card, i) => {
// //         if (card && i < displayVideos.length) {
// //           const pos = presets[i % presets.length];
// //           gsap.set(card, pos);
// //         }
// //       });

// //       tl.fromTo(
// //         cardsRef.current.filter(card => card !== null),
// //         { opacity: 0, y: 60 },
// //         { opacity: 1, y: 0, stagger: 0.12 },
// //         0.15
// //       );

// //       tl.fromTo(
// //         circleRef.current,
// //         { width: isMobile ? "20vw" : "12vw", height: isMobile ? "20vw" : "12vw", borderRadius: "50%" },
// //         { width: "150vw", height: "150vw", borderRadius: "75vw" },
// //         0.35
// //       );
// //     }, sectionRef);

// //     ScrollTrigger.refresh();

// //     return () => ctx.revert();
// //   }, [videos, isMobile]);

// //   if (loading) return null;

// //   // 🔹 Show only 3 videos on mobile
// //   const displayVideos = isMobile ? videos.slice(0, 3) : videos;

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
// //           text-align: center;
// //           padding: 0 20px;
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

// //         @media (max-width: 768px) {
// //           .bg-text {
// //             font-size: 16vw;
// //           }
// //           .video-card {
// //             width: 160px;
// //           }
// //         }
// //       `}</style>

// //       <section ref={sectionRef} className="video-section">
// //         <h2 ref={textRef} className="bg-text">
// //           WHAT'S EVERYONE TALKING
// //         </h2>

// //         <div ref={circleRef} className="circle" />

// //         {displayVideos.map((v, i) => (
// //           <div
// //             key={v._id}
// //             ref={el => (cardsRef.current[i] = el)}
// //             className="video-card"
// //             style={{ transform: "translate(-50%, -50%)" }}
// //           >
// //             <video src={v.videoUrl} muted autoPlay loop playsInline />
// //           </div>
// //         ))}
// //       </section>
// //     </>
// //   );
// // }
// // VideoShowcaseSection.jsx
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import SplitType from "split-type";
// import api from "../api/axios";

// gsap.registerPlugin(ScrollTrigger);

// // Enhanced position presets with tilts for different screen sizes - left to right layout
// const positionPresets = {
//   desktop: [
//     { x: -600, y: 20, rotate: -8, scale: 0.9 },
//     { x: -320, y: 10, rotate: -4, scale: 0.95 },
//     { x: -40, y: 0, rotate: 0, scale: 1 },
//     { x: 240, y: 10, rotate: 4, scale: 0.95 },
//     { x: 520, y: 20, rotate: 8, scale: 0.9 },
//   ],
//   laptop: [
//     { x: -480, y: 15, rotate: -7, scale: 0.85 },
//     { x: -250, y: 8, rotate: -3.5, scale: 0.9 },
//     { x: -20, y: 0, rotate: 0, scale: 0.95 },
//     { x: 210, y: 8, rotate: 3.5, scale: 0.9 },
//     { x: 440, y: 15, rotate: 7, scale: 0.85 },
//   ],
//   tablet: [
//     { x: -350, y: 12, rotate: -6, scale: 0.8 },
//     { x: -150, y: 6, rotate: -3, scale: 0.85 },
//     { x: 50, y: 0, rotate: 0, scale: 0.9 },
//     { x: 250, y: 6, rotate: 3, scale: 0.85 },
//     { x: 450, y: 12, rotate: 6, scale: 0.8 },
//   ],

//   // ── MOBILE: final resting positions for the overlapping deck ──
//   // All 3 cards land roughly in the same area so they visually overlap.
//   // Slight x/y offsets + rotation give depth; z-index controls paint order.
//   mobile: [
//     { x: -18, y: -22, rotate: -10, scale: 1.0, zIndex: 8  },  // card 0 – behind, tilted left
//     { x:   8, y:  12, rotate:  5,  scale: 1.0, zIndex: 10 },  // card 1 – middle
//     { x:  22, y:  35, rotate:  14, scale: 1.0, zIndex: 12 },  // card 2 – front, tilted right
//   ],
//   mobileSmall: [
//     { x: -15, y: -18, rotate: -10, scale: 1.0, zIndex: 8  },
//     { x:   6, y:  10, rotate:  5,  scale: 1.0, zIndex: 10 },
//     { x:  18, y:  28, rotate:  14, scale: 1.0, zIndex: 12 },
//   ],
// };

// export default function VideoShowcaseSection() {
//   // Refs for RoundVideo section (first)
//   const roundSectionRef = useRef(null);
//   const roundCircleRef  = useRef(null);
//   const roundElementRef = useRef(null);
//   const roundOverlayRef = useRef(null);
//   const roundButtonRef  = useRef(null);
//   const roundWrapRef    = useRef(null);

//   // Refs for VideoShowcase section (second)
//   const showcaseSectionRef  = useRef(null);
//   const showcaseCircleRef   = useRef(null);
//   const showcaseCardsRef    = useRef([]);
//   const videoRefs           = useRef([]);
//   const showcaseTitleRef    = useRef(null);
//   const showcaseSubtitleRef = useRef(null);
//   const productNameRef      = useRef(null);
//   const productDetailsRef   = useRef(null);
//   const namesContainerRef   = useRef(null);
//   const exploreBtnRef       = useRef(null);

//   const [videos, setVideos]                = useState([]);
//   const [loading, setLoading]              = useState(true);
//   const [screenSize, setScreenSize]        = useState("desktop");
//   const [showVideoModal, setShowVideoModal] = useState(false);
//   const [selectedVideo, setSelectedVideo]  = useState(null);
//   const [hoveredIndex, setHoveredIndex]    = useState(null);

//   const names = ["Andrew", "Bryan", "Chris", "Devante"];

//   const isMobileView = (s) => s === "mobile" || s === "mobileSmall";

//   // ── video hover ──
//   const handleMouseEnter = (i) => { setHoveredIndex(i); videoRefs.current[i]?.play(); };
//   const handleMouseLeave = (i) => { setHoveredIndex(null); videoRefs.current[i]?.pause(); };

//   // ── modal ──
//   const handleVideoClick = (v) => { setSelectedVideo(v); setShowVideoModal(true); };
//   const closeModal = () => { setShowVideoModal(false); setSelectedVideo(null); };

//   // ── screen size ──
//   useEffect(() => {
//     const detect = () => {
//       const w = window.innerWidth;
//       if      (w >= 1920) setScreenSize("desktop");
//       else if (w >= 1366) setScreenSize("laptop");
//       else if (w >= 1024) setScreenSize("laptop");
//       else if (w >= 768)  setScreenSize("tablet");
//       else if (w >= 480)  setScreenSize("mobile");
//       else                setScreenSize("mobileSmall");
//     };
//     detect();
//     window.addEventListener("resize", detect);
//     return () => window.removeEventListener("resize", detect);
//   }, []);

//   // ── fetch ──
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await api.get("/api/videos");
//         setVideos(res.data || []);
//       } catch { console.error("Failed to load videos"); }
//       finally { setLoading(false); }
//     })();
//   }, []);

//   const getDisplayConfig = () => {
//     const presets    = positionPresets[screenSize] || positionPresets.desktop;
//     const videoCount = isMobileView(screenSize) ? 3 : presets.length;
//     return { presets, videoCount };
//   };

//   // ── GSAP ──
//   useEffect(() => {
//     if (!videos.length) return;

//     const ctx = gsap.context(() => {
//       const { presets, videoCount } = getDisplayConfig();
//       const displayVideos = videos.slice(0, videoCount);
//       const mobile        = isMobileView(screenSize);

//       /* ══════════════════════════════════════════════
//          SECTION 1 – Round expanding circle (UNCHANGED)
//       ══════════════════════════════════════════════ */
//       ScrollTrigger.create({
//         trigger:    roundWrapRef.current,
//         start:      "top top",
//         end:        "bottom bottom",
//         pin:        roundCircleRef.current,
//         pinSpacing: false,
//         scrub:      0.5,
//       });

//       const circleSizes = {
//         mobileSmall: { start: "35vw", end: "200vw" },
//         mobile:      { start: "30vw", end: "180vw" },
//         tablet:      { start: "15vw", end: "160vw" },
//         laptop:      { start: "12vw", end: "150vw" },
//         desktop:     { start: "10vw", end: "150vw" },
//       }[screenSize] || { start: "10vw", end: "150vw" };

//       gsap.fromTo(
//         roundElementRef.current,
//         { width: circleSizes.start, height: circleSizes.start, borderRadius: "50%", scale: 1, opacity: 1 },
//         {
//           width: circleSizes.end, height: circleSizes.end, borderRadius: "50%",
//           scale: mobile ? 1.1 : 1.2, opacity: mobile ? 0.95 : 0.9, ease: "none",
//           scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
//         }
//       );

//       gsap.fromTo(
//         roundOverlayRef.current,
//         { opacity: mobile ? 0.2 : 0.3 },
//         { opacity: mobile ? 0.7 : 0.8, ease: "none",
//           scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8 } }
//       );

//       gsap.fromTo(
//         roundButtonRef.current,
//         { opacity: 1, scale: 1 },
//         { opacity: 0, scale: mobile ? 1.3 : 1.5, ease: "none",
//           scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: mobile ? "30% center" : "center center", scrub: 0.8 } }
//       );

//       /* ══════════════════════════════════════════════
//          SECTION 2 – Video showcase
//       ══════════════════════════════════════════════ */

//       if (mobile) {
//         /* ─────────────────────────────────────────────────────────────
//            MOBILE – one-by-one scroll-driven card drop into a deck
//            Each card has its OWN ScrollTrigger so it animates in
//            separately as the user scrolls, then stays put (no pin).
//            The section itself is pinned for the full scroll distance.
//         ───────────────────────────────────────────────────────────── */

//         // Total scroll distance for the pinned section
//         const totalEnd = "+=280%";

//         // Pin the section
//         ScrollTrigger.create({
//           trigger: showcaseSectionRef.current,
//           start:   "top top",
//           end:     totalEnd,
//           pin:     true,
//           scrub:   true,
//         });

//         // Yellow circle expands over first 40 % of the scroll
//         gsap.fromTo(
//           showcaseCircleRef.current,
//           { width: "20vw", height: "20vw", borderRadius: "50%", opacity: 0.8 },
//           {
//             width: "220vw", height: "220vw", borderRadius: "110vw", opacity: 1,
//             ease: "none",
//             scrollTrigger: {
//               trigger:        showcaseSectionRef.current,
//               start:          "top top",
//               end:            totalEnd,
//               scrub:          true,
//               containerAnimation: undefined,
//             },
//           }
//         );

//         // ── Set every card's initial state: hidden, centred, scaled down ──
//         showcaseCardsRef.current.forEach((card, i) => {
//           if (!card || i >= displayVideos.length) return;
//           const pos = presets[i];
//           gsap.set(card, {
//             x:        0,
//             y:        -60,          // start slightly above centre
//             rotation: 0,
//             scale:    0.6,
//             opacity:  0,
//             zIndex:   pos.zIndex ?? 10,
//           });
//         });

//         /*
//           Divide the scroll into 3 equal "slots" (one per card).
//           Card 0 drops in during 0–33 %, card 1 during 33–66 %, card 2 during 66–100 %.
//           We use a master timeline scrubbed to the section's scroll.
//         */
//         const masterTl = gsap.timeline();

//         displayVideos.forEach((_, i) => {
//           const card = showcaseCardsRef.current[i];
//           if (!card) return;
//           const pos       = presets[i];
//           const slotStart = i * (1 / 3);         // 0, 0.33, 0.66
//           const slotEnd   = slotStart + 1 / 3;   // 0.33, 0.66, 1.0

//           // Each card animates in the first 60 % of its slot,
//           // then stays static for the remainder.
//           masterTl.fromTo(
//             card,
//             { x: 0, y: -60, rotation: 0, scale: 0.6, opacity: 0 },
//             {
//               x:        pos.x,
//               y:        pos.y,
//               rotation: pos.rotate,
//               scale:    pos.scale,
//               opacity:  1,
//               ease:     "power3.out",
//               duration: (slotEnd - slotStart) * 0.6, // 60 % of slot
//             },
//             slotStart  // insert at the slot's start position in the timeline
//           );
//         });

//         ScrollTrigger.create({
//           trigger:   showcaseSectionRef.current,
//           start:     "top top",
//           end:       totalEnd,
//           scrub:     0.6,
//           animation: masterTl,
//         });

//       } else {
//         /* ─────────────────────────────────────────────────────────────
//            DESKTOP / TABLET – original behaviour (UNCHANGED)
//         ───────────────────────────────────────────────────────────── */
//         const showcaseTl = gsap.timeline({
//           scrollTrigger: {
//             trigger: showcaseSectionRef.current,
//             start:   "top top",
//             end:     "+=220%",
//             scrub:   true,
//             pin:     true,
//           },
//         });

//         showcaseTl.fromTo(
//           showcaseCircleRef.current,
//           { width: "12vw", height: "12vw", borderRadius: "50%", opacity: 0.8 },
//           { width: "150vw", height: "150vw", borderRadius: "75vw", opacity: 1 },
//           0
//         );

//         showcaseCardsRef.current.forEach((card, i) => {
//           if (card && i < displayVideos.length) {
//             const pos = presets[i % presets.length];
//             gsap.set(card, { x: pos.x, y: pos.y, rotation: pos.rotate, scale: 0.3, opacity: 0 });
//           }
//         });

//         showcaseTl.to(
//           showcaseCardsRef.current.filter(Boolean),
//           {
//             opacity:  1,
//             scale:    (i) => presets[i % presets.length].scale,
//             rotation: (i) => presets[i % presets.length].rotate,
//             stagger: 0.15, duration: 1.2, ease: "power2.out",
//           },
//           0.2
//         );
//       }

//       // ── title, names, button (unchanged) ──
//       const titleEls = [showcaseSubtitleRef, showcaseTitleRef, productNameRef, productDetailsRef]
//         .map((r) => r.current).filter(Boolean);
//       if (titleEls.length) {
//         gsap.fromTo(titleEls, { y: 50, opacity: 0 }, {
//           y: 0, opacity: 1, stagger: 0.1, duration: 1,
//           scrollTrigger: { trigger: showcaseSectionRef.current, start: "top 30%", end: "top 10%", scrub: true },
//         });
//       }
//       if (namesContainerRef.current) {
//         gsap.fromTo([...namesContainerRef.current.children], { y: 30, opacity: 0 }, {
//           y: 0, opacity: 1, stagger: 0.08, duration: 1,
//           scrollTrigger: { trigger: showcaseSectionRef.current, start: "top 20%", end: "top 0%", scrub: true },
//         });
//       }
//       if (exploreBtnRef.current) {
//         gsap.fromTo(exploreBtnRef.current, { y: 30, opacity: 0, scale: 0.9 }, {
//           y: 0, opacity: 1, scale: 1, duration: 1,
//           scrollTrigger: { trigger: showcaseSectionRef.current, start: "top 15%", end: "top -5%", scrub: true },
//         });
//       }
//     });

//     ScrollTrigger.refresh();
//     const onResize = () => setTimeout(() => ScrollTrigger.refresh(), 100);
//     window.addEventListener("resize", onResize);
//     return () => { ctx.revert(); window.removeEventListener("resize", onResize); };
//   }, [videos, screenSize]);

//   const handlePlayClick = (e) => {
//     e.preventDefault();
//     setSelectedVideo({ videoUrl: "https://www.youtube.com/embed/YFNSDdrElfc?si=iSaKNmIlM-sx7JSf?autoplay=1" });
//     setShowVideoModal(true);
//   };

//   if (loading) return null;

//   const { presets, videoCount } = getDisplayConfig();
//   const displayVideos = videos.slice(0, videoCount);
//   const mobile        = isMobileView(screenSize);

//   return (
//     <>
//       <style>{`
//         /* ===== BASE ===== */
//         * { box-sizing: border-box; margin: 0; padding: 0; }

//         /* ===== ROUND VIDEO SECTION (FIRST) ===== */
//         .round-video-section {
//           position: relative; background-color: #523122;
//           overflow: hidden; width: 100%; z-index: 10;
//         }
//         .cont { position: relative; width: 100%; max-width: 100%; margin: 0 auto; }

//         .sticky-circle_wrap { position: relative; width: 100%; height: clamp(120vh,180vh,250vh); }
//         @media (min-width: 1920px) { .sticky-circle_wrap { height: 250vh; } }
//         @media (max-width: 1366px) { .sticky-circle_wrap { height: 200vh; } }
//         @media (max-width: 1024px) { .sticky-circle_wrap { height: 180vh; } }
//         @media (max-width: 768px)  { .sticky-circle_wrap { height: 150vh; } }
//         @media (max-width: 480px)  { .sticky-circle_wrap { height: 120vh; } }

//         .sticky-circle {
//           position: relative; display: flex; align-items: center;
//           justify-content: center; width: 100%; height: 100vh; will-change: transform;
//         }
//         .sticky-circle_element {
//           border-radius: 50%; overflow: hidden; position: relative;
//           box-shadow: 0 0 min(30px,3vw) rgba(0,0,0,0.3);
//           will-change: width,height,border-radius,scale,opacity;
//           transition: box-shadow 0.3s ease;
//           width: clamp(80px,10vw,200px); height: clamp(80px,10vw,200px);
//         }
//         .sticky-circle_element:hover { box-shadow: 0 0 min(50px,5vw) rgba(0,0,0,0.5); }
//         @media (max-width: 768px) {
//           .sticky-circle_element { width: clamp(100px,30vw,180px); height: clamp(100px,30vw,180px); }
//         }
//         @media (max-width: 480px) {
//           .sticky-circle_element { width: clamp(120px,35vw,160px); height: clamp(120px,35vw,160px); }
//         }

//         .div-block-40 {
//           position: absolute; inset: 0; background: rgba(0,0,0,0.3);
//           z-index: 2; pointer-events: none; will-change: opacity;
//         }
//         .videoclass { width: 100%; height: 100%; position: relative; z-index: 1; }
//         .videoclass video { width: 100%; height: 100%; object-fit: cover; display: block; }

//         .lightbox-link {
//           position: absolute; top: 50%; left: 50%;
//           transform: translate(-50%,-50%); z-index: 10; text-decoration: none; cursor: pointer;
//         }
//         .light-button.absolute {
//           border-radius: 50%; position: relative; display: flex;
//           align-items: center; justify-content: center;
//           transition: all 0.3s ease; will-change: opacity,scale;
//           background: transparent; cursor: pointer;
//           width: clamp(80px,12vw,200px); height: clamp(80px,12vw,200px);
//         }
//         @media (max-width: 768px) {
//           .light-button.absolute { width: clamp(100px,25vw,180px); height: clamp(100px,25vw,180px); }
//         }
//         @media (max-width: 480px) {
//           .light-button.absolute { width: clamp(120px,35vw,160px); height: clamp(120px,35vw,160px); }
//         }
//         .circular-bg {
//           position: absolute; width: 100%; height: 100%;
//           border-radius: 50%; background: rgba(0,0,0,0.7);
//           z-index: 1; transition: background 0.3s ease;
//         }
//         .play-icon {
//           z-index: 3; color: white; display: flex; align-items: center;
//           justify-content: center; transition: transform 0.3s ease;
//           width: clamp(20px,4vw,60px); height: clamp(20px,4vw,60px);
//         }
//         .play-icon::after { content: "▶"; font-size: clamp(16px,3vw,45px); }
//         .circular-text-svg {
//           width: 100%; height: 100%; position: absolute; z-index: 2;
//           animation: rotateText 20s linear infinite;
//         }
//         @keyframes rotateText { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
//         .circular-text-svg text {
//           font-weight: 700; fill: rgba(255,255,255,0.9); text-transform: uppercase;
//           letter-spacing: 0.15em; font-size: clamp(6px,1.2vw,16px);
//         }
//         @media (max-width: 480px) { .circular-text-svg text { font-size: clamp(8px,2.5vw,12px); } }
//         .light-button.absolute:hover .play-icon::after { transform: scale(1.2); }
//         .light-button.absolute:hover .circular-bg { background: rgba(0,0,0,0.85); }

//         /* ===== VIDEO SHOWCASE SECTION (SECOND) ===== */
//         .video-showcase-section {
//           min-height: 100vh; background: #000; position: relative;
//           overflow: hidden; z-index: 20; color: white;
//         }
//         .showcase-circle {
//           position: absolute; top: 50%; left: 50%;
//           transform: translate(-50%,-50%); background: #FFD700;
//           z-index: 1; border-radius: 50%;
//           will-change: width,height; opacity: 0.9;
//         }

//         /* ── Desktop / Tablet cards (UNCHANGED) ── */
//         .video-card {
//           position: absolute; top: 50%; left: 50%;
//           border-radius: clamp(8px,1.5vw,16px); overflow: hidden;
//           box-shadow: 0 20px 40px rgba(0,0,0,0.6); z-index: 10;
//           border: 2px solid rgba(255,215,0,0.3);
//           width: clamp(140px,18vw,280px); aspect-ratio: 9/16;
//           cursor: pointer; transition: border-color 0.2s ease, transform 0.2s ease;
//         }
//         .video-card:hover {
//           border-color: #FFD700;
//           transform: translate(-50%,-50%) scale(1.02);
//         }
//         @media (min-width: 1920px) { .video-card { width: 280px; } }
//         @media (max-width: 1366px) { .video-card { width: 240px; } }
//         @media (max-width: 1024px) { .video-card { width: 200px; } }

//         /* ══════════════════════════════════════
//            MOBILE card styles — ONLY change here
//            Large portrait cards that stack/overlap
//         ══════════════════════════════════════ */
//         @media (max-width: 767px) {
//           .video-card {
//             /* Significantly larger than before */
//             width: clamp(200px, 68vw, 280px);
//             border-radius: 18px;
//             /* Deep shadow accentuates the stacked depth */
//             box-shadow: 0 24px 56px rgba(0,0,0,0.85);
//             border: 2px solid rgba(255,255,255,0.1);
//             /* No hover scale — cards stay in GSAP-managed positions */
//             transition: border-color 0.2s ease;
//           }
//           /* Disable the desktop hover scale on mobile */
//           .video-card:hover {
//             transform: translate(-50%,-50%);
//             border-color: rgba(255,215,0,0.35);
//           }
//         }
//         @media (max-width: 480px) {
//           .video-card {
//             width: clamp(185px, 72vw, 240px);
//           }
//         }

//         .video-card video { width: 100%; height: 100%; object-fit: cover; }

//         /* ── Text / UI (unchanged) ── */
//         .showcase-content {
//           position: relative; z-index: 5; height: 100vh; width: 100%;
//           display: flex; flex-direction: column; justify-content: center;
//           align-items: center; padding: 2rem; text-align: center;
//         }
//         .found-in-stores {
//           font-size: clamp(1.2rem,2vw,1.8rem); font-weight: 600; color: #FFD700;
//           text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 1rem;
//           border-bottom: 2px solid #FFD700; padding-bottom: 0.5rem; display: inline-block;
//         }
//         .spylt-title {
//           font-size: clamp(4rem,8vw,8rem); font-weight: 900; color: white;
//           text-transform: uppercase; letter-spacing: 0.1em; line-height: 1;
//           margin-bottom: 0.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
//         }
//         .product-name {
//           font-size: clamp(1.5rem,3vw,2.5rem); font-weight: 700; color: white;
//           text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.2; margin-bottom: 0.25rem;
//         }
//         .product-details {
//           font-size: clamp(1.2rem,2.5vw,2rem); color: #FFD700;
//           font-weight: 600; margin-top: 0.25rem; letter-spacing: 0.05em;
//         }
//         .names-section {
//           display: flex; flex-wrap: wrap; justify-content: center;
//           gap: clamp(1.5rem,4vw,4rem); margin: 2.5rem 0;
//         }
//         .name-item {
//           font-size: clamp(1.3rem,2.5vw,2.2rem); font-weight: 700; color: white;
//           text-transform: uppercase; letter-spacing: 0.1em;
//           position: relative; padding: 0 0.5rem; cursor: default;
//         }
//         .name-item::after {
//           content: ""; position: absolute; bottom: -5px; left: 0;
//           width: 100%; height: 2px; background: #FFD700;
//           transform: scaleX(0); transition: transform 0.3s ease;
//         }
//         .name-item:hover::after { transform: scaleX(1); }
//         .explore-btn {
//           background: transparent; border: 2px solid #FFD700; color: #FFD700;
//           font-size: clamp(1.2rem,2vw,1.8rem); font-weight: 700; text-transform: uppercase;
//           letter-spacing: 0.15em; padding: clamp(0.8rem,1.5vw,1.2rem) clamp(2.5rem,5vw,4rem);
//           cursor: pointer; transition: all 0.3s ease; margin-top: 1.5rem;
//           border-radius: 50px; text-decoration: none; display: inline-block;
//         }
//         .explore-btn:hover {
//           background: #FFD700; color: #000;
//           transform: translateY(-3px); box-shadow: 0 10px 20px rgba(255,215,0,0.3);
//         }

//         /* ===== MODAL ===== */
//         .video-modal-overlay {
//           position: fixed; inset: 0; background: rgba(0,0,0,0.98);
//           display: flex; align-items: center; justify-content: center;
//           z-index: 1000; animation: fadeIn 0.3s ease; padding: clamp(10px,3vw,30px);
//         }
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         .video-modal-content {
//           position: relative; width: 100%; max-width: min(1200px,90vw);
//           aspect-ratio: 16/9; animation: slideUp 0.3s ease;
//         }
//         @keyframes slideUp {
//           from { transform: translateY(min(30px,3vh)); opacity: 0; }
//           to   { transform: translateY(0); opacity: 1; }
//         }
//         .video-modal-content iframe,
//         .video-modal-content video {
//           width: 100%; height: 100%; border: none; border-radius: clamp(4px,1vw,8px);
//         }
//         .modal-close-btn {
//           position: absolute; top: clamp(-40px,-5vh,-30px); right: 0;
//           background: white; color: #523122; border: none; border-radius: 50%;
//           font-size: clamp(20px,3vw,24px); cursor: pointer; display: flex;
//           align-items: center; justify-content: center; transition: all 0.3s ease;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.2);
//           width: clamp(32px,5vw,44px); height: clamp(32px,5vw,44px);
//         }
//         .modal-close-btn:hover { background: #523122; color: white; transform: scale(1.1); }

//         /* Landscape */
//         @media (orientation: landscape) and (max-height: 600px) {
//           .sticky-circle_wrap { height: 150vh; }
//           .video-card { width: clamp(100px,12vh,160px); }
//           .names-section { gap: 1.5rem; margin: 1rem 0; }
//         }
//         /* Safari */
//         @supports (-webkit-touch-callout: none) {
//           .sticky-circle_element, .video-card, .showcase-circle { transform: translateZ(0); }
//         }
//         /* Reduced motion */
//         @media (prefers-reduced-motion: reduce) {
//           .sticky-circle_element, .light-button.absolute, .div-block-40,
//           .showcase-circle, .video-card, .circular-text-svg {
//             transition: none !important; animation: none !important;
//           }
//         }
//         /* Touch */
//         @media (hover: none) and (pointer: coarse) {
//           .video-card { border-color: rgba(255,215,0,0.3); }
//           .explore-btn:hover { background: transparent; color: #FFD700; transform: none; box-shadow: none; }
//         }
//       `}</style>

//       {/* ===== ROUND VIDEO SECTION (FIRST SECTION) ===== */}
//       <div className="round-video-section" ref={roundSectionRef}>
//         <div className="cont">
//           <div className="sticky-circle_wrap" ref={roundWrapRef}>
//             <div className="sticky-circle" ref={roundCircleRef}>
//               <a
//                 href="#"
//                 className="lightbox-link w-inline-block w-lightbox"
//                 onClick={handlePlayClick}
//                 aria-label="Play video"
//               >
//                 <div className="light-button absolute" ref={roundButtonRef}>
//                   <div className="circular-bg" />
//                   <svg
//                     className="circular-text-svg"
//                     viewBox="0 0 200 200"
//                     preserveAspectRatio="xMidYMid meet"
//                     style={{ position: "absolute", width: "100%", height: "100%", zIndex: 2 }}
//                   >
//                     <defs>
//                       <path
//                         id="circlePath"
//                         d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
//                         fill="none"
//                       />
//                     </defs>
//                     <text>
//                       <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
//                         PLAY VIDEO • PLAY VIDEO • PLAY VIDEO •
//                       </textPath>
//                     </text>
//                   </svg>
//                   <div className="play-icon" aria-hidden="true" />
//                 </div>
//               </a>

//               <div className="sticky-circle_element" ref={roundElementRef}>
//                 <div className="div-block-40" ref={roundOverlayRef} />
//                 <div className="videoclass">
//                   <video
//                     autoPlay loop muted playsInline
//                     poster="https://cdn.prod.website-files.com/669a8d6498ba88c08dfd2cd2%2F66ab8740f29f169f743966e6_669a8d6498ba88c08dfd2cd2_66a787ab53235ab6968a788f_on%20site-transcode-poster-00001.jpg"
//                   >
//                     <source src="Videos/Video2.mp4" type="video/mp4" />
//                     <source
//                       src="https://cdn.prod.website-files.com/669a8d6498ba88c08dfd2cd2%2F66ab8740f29f169f743966e6_669a8d6498ba88c08dfd2cd2_66a787ab53235ab6968a788f_on%20site-transcode-transcode.webm"
//                       type="video/webm"
//                     />
//                     Your browser does not support the video tag.
//                   </video>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ===== VIDEO SHOWCASE SECTION (SECOND SECTION) ===== */}
//       <section ref={showcaseSectionRef} className="video-showcase-section">
//         <div ref={showcaseCircleRef} className="showcase-circle" />

//         {/* Commented out content as per original */}
//         {/* <div className="showcase-content">
//           <div ref={showcaseSubtitleRef} className="found-in-stores">FOUND IN STORES</div>
//           <h1 ref={showcaseTitleRef} className="spylt-title">MPACT</h1>
//           <div ref={productNameRef} className="product-name">CAFFEINATED VANILLA MILKSHAKE 20g</div>
//           <div ref={productDetailsRef} className="product-details">90 00g</div>
//           <div ref={namesContainerRef} className="names-section">
//             {names.map((name, i) => <div key={i} className="name-item">{name}</div>)}
//           </div>
//           <button ref={exploreBtnRef} className="explore-btn">EXPLORE ALL</button>
//         </div> */}

//         {/*
//           Cards:
//           • Mobile  → Each card animates in one-by-one as the user scrolls,
//                        landing in an overlapping deck. Card 0 first (back),
//                        card 1 second (middle), card 2 last (front/top).
//           • Desktop → Spread out horizontally as before (UNCHANGED).
//         */}
//         {displayVideos.map((v, i) => (
//           <div
//             key={v._id}
//             ref={(el) => (showcaseCardsRef.current[i] = el)}
//             className="video-card"
//             onMouseEnter={() => handleMouseEnter(i)}
//             onMouseLeave={() => handleMouseLeave(i)}
//             onClick={() => handleVideoClick(v)}
//             style={{ transform: "translate(-50%, -50%)" }}
//           >
//             <video
//               ref={(el) => (videoRefs.current[i] = el)}
//               src={v.videoUrl}
//               muted
//               playsInline
//               loop={false}
//             />
//           </div>
//         ))}
//       </section>

//       {/* ===== VIDEO MODAL ===== */}
//       {showVideoModal && selectedVideo && (
//         <div className="video-modal-overlay" onClick={closeModal}>
//           <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="modal-close-btn" onClick={closeModal} aria-label="Close video">
//               ×
//             </button>
//             {selectedVideo.videoUrl.includes("youtube") || selectedVideo.videoUrl.includes("youtu.be") ? (
//               <iframe
//                 src={selectedVideo.videoUrl}
//                 title="YouTube video player"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             ) : (
//               <video src={selectedVideo.videoUrl} controls autoPlay playsInline />
//             )}
//           </div>
//         </div>
//       )}
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

// Enhanced position presets with tilts for different screen sizes - left to right layout
const positionPresets = {
  desktop: [
    { x: -600, y: 20, rotate: -8, scale: 0.9 },
    { x: -320, y: 10, rotate: -4, scale: 0.95 },
    { x: -40, y: 0, rotate: 0, scale: 1 },
    { x: 240, y: 10, rotate: 4, scale: 0.95 },
    { x: 520, y: 20, rotate: 8, scale: 0.9 },
  ],
  laptop: [
    { x: -480, y: 15, rotate: -7, scale: 0.85 },
    { x: -250, y: 8, rotate: -3.5, scale: 0.9 },
    { x: -20, y: 0, rotate: 0, scale: 0.95 },
    { x: 210, y: 8, rotate: 3.5, scale: 0.9 },
    { x: 440, y: 15, rotate: 7, scale: 0.85 },
  ],
  tablet: [
    { x: -350, y: 12, rotate: -6, scale: 0.8 },
    { x: -150, y: 6, rotate: -3, scale: 0.85 },
    { x: 50, y: 0, rotate: 0, scale: 0.9 },
    { x: 250, y: 6, rotate: 3, scale: 0.85 },
    { x: 450, y: 12, rotate: 6, scale: 0.8 },
  ],

  // ── MOBILE: final resting positions for the overlapping deck ──
  mobile: [
    { x: -25, y: -20, rotate: -10, scale: 1.0, zIndex: 8 },  // card 0 – behind, tilted left
    { x: 0, y: 5, rotate: 5, scale: 1.0, zIndex: 10 },       // card 1 – middle
    { x: 25, y: 30, rotate: 14, scale: 1.0, zIndex: 12 },    // card 2 – front, tilted right
  ],
  mobileSmall: [
    { x: -20, y: -15, rotate: -10, scale: 1.0, zIndex: 8 },
    { x: 0, y: 5, rotate: 5, scale: 1.0, zIndex: 10 },
    { x: 20, y: 25, rotate: 14, scale: 1.0, zIndex: 12 },
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
  const videoRefs = useRef([]);
  const showcaseTitleRef = useRef(null);
  const showcaseSubtitleRef = useRef(null);
  const productNameRef = useRef(null);
  const productDetailsRef = useRef(null);
  const namesContainerRef = useRef(null);
  const exploreBtnRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState("desktop");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const names = ["Andrew", "Bryan", "Chris", "Devante"];

  const isMobileView = (s) => s === "mobile" || s === "mobileSmall";

  // ── video hover ──
  const handleMouseEnter = (i) => { setHoveredIndex(i); videoRefs.current[i]?.play(); };
  const handleMouseLeave = (i) => { setHoveredIndex(null); videoRefs.current[i]?.pause(); };

  // ── modal ──
  const handleVideoClick = (v) => { setSelectedVideo(v); setShowVideoModal(true); };
  const closeModal = () => { setShowVideoModal(false); setSelectedVideo(null); };

  // ── screen size ──
  useEffect(() => {
    const detect = () => {
      const w = window.innerWidth;
      if (w >= 1920) setScreenSize("desktop");
      else if (w >= 1366) setScreenSize("laptop");
      else if (w >= 1024) setScreenSize("laptop");
      else if (w >= 768) setScreenSize("tablet");
      else if (w >= 480) setScreenSize("mobile");
      else setScreenSize("mobileSmall");
    };
    detect();
    window.addEventListener("resize", detect);
    return () => window.removeEventListener("resize", detect);
  }, []);

  // ── fetch ──
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/videos");
        setVideos(res.data || []);
      } catch { console.error("Failed to load videos"); }
      finally { setLoading(false); }
    })();
  }, []);

  const getDisplayConfig = () => {
    const presets = positionPresets[screenSize] || positionPresets.desktop;
    const videoCount = isMobileView(screenSize) ? 3 : presets.length;
    return { presets, videoCount };
  };

  // ── GSAP ──
  useEffect(() => {
    if (!videos.length) return;

    const ctx = gsap.context(() => {
      const { presets, videoCount } = getDisplayConfig();
      const displayVideos = videos.slice(0, videoCount);
      const mobile = isMobileView(screenSize);

      /* ══════════════════════════════════════════════
         SECTION 1 – Round expanding circle (UNCHANGED)
      ══════════════════════════════════════════════ */
      ScrollTrigger.create({
        trigger: roundWrapRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: roundCircleRef.current,
        pinSpacing: false,
        scrub: 0.5,
      });

      const circleSizes = {
        mobileSmall: { start: "35vw", end: "200vw" },
        mobile: { start: "30vw", end: "180vw" },
        tablet: { start: "15vw", end: "160vw" },
        laptop: { start: "12vw", end: "150vw" },
        desktop: { start: "10vw", end: "150vw" },
      }[screenSize] || { start: "10vw", end: "150vw" };

      gsap.fromTo(
        roundElementRef.current,
        { width: circleSizes.start, height: circleSizes.start, borderRadius: "50%", scale: 1, opacity: 1 },
        {
          width: circleSizes.end, height: circleSizes.end, borderRadius: "50%",
          scale: mobile ? 1.1 : 1.2, opacity: mobile ? 0.95 : 0.9, ease: "none",
          scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
        }
      );

      gsap.fromTo(
        roundOverlayRef.current,
        { opacity: mobile ? 0.2 : 0.3 },
        {
          opacity: mobile ? 0.7 : 0.8, ease: "none",
          scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8 }
        }
      );

      gsap.fromTo(
        roundButtonRef.current,
        { opacity: 1, scale: 1 },
        {
          opacity: 0, scale: mobile ? 1.3 : 1.5, ease: "none",
          scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: mobile ? "30% center" : "center center", scrub: 0.8 }
        }
      );

      /* ══════════════════════════════════════════════
         SECTION 2 – Video showcase
      ══════════════════════════════════════════════ */

      if (mobile) {
        /* ─────────────────────────────────────────────────────────────
           MOBILE – one-by-one scroll-driven card drop into a deck
        ───────────────────────────────────────────────────────────── */

        // Total scroll distance for the pinned section
        const totalEnd = "+=280%";

        // Pin the section
        ScrollTrigger.create({
          trigger: showcaseSectionRef.current,
          start: "top top",
          end: totalEnd,
          pin: true,
          scrub: true,
        });

        // Yellow circle expands over first 40% of the scroll
        gsap.fromTo(
          showcaseCircleRef.current,
          { width: "20vw", height: "20vw", borderRadius: "50%", opacity: 0.8 },
          {
            width: "220vw", height: "220vw", borderRadius: "110vw", opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: showcaseSectionRef.current,
              start: "top top",
              end: totalEnd,
              scrub: true,
              containerAnimation: undefined,
            },
          }
        );

        // ── Set every card's initial state: hidden, centred, scaled down ──
        showcaseCardsRef.current.forEach((card, i) => {
          if (!card || i >= displayVideos.length) return;
          const pos = presets[i];
          gsap.set(card, {
            x: 0,
            y: -60,          // start slightly above centre
            rotation: 0,
            scale: 0.6,
            opacity: 0,
            zIndex: pos.zIndex ?? 10,
          });
        });

        // Create master timeline for card animations
        const masterTl = gsap.timeline();

        displayVideos.forEach((_, i) => {
          const card = showcaseCardsRef.current[i];
          if (!card) return;
          const pos = presets[i];
          const slotStart = i * (1 / 3);         // 0, 0.33, 0.66
          const slotEnd = slotStart + 1 / 3;     // 0.33, 0.66, 1.0

          masterTl.fromTo(
            card,
            { x: 0, y: -60, rotation: 0, scale: 0.6, opacity: 0 },
            {
              x: pos.x,
              y: pos.y,
              rotation: pos.rotate,
              scale: pos.scale,
              opacity: 1,
              ease: "power3.out",
              duration: (slotEnd - slotStart) * 0.6,
            },
            slotStart
          );
        });

        ScrollTrigger.create({
          trigger: showcaseSectionRef.current,
          start: "top top",
          end: totalEnd,
          scrub: 0.6,
          animation: masterTl,
        });

      } else {
        /* ─────────────────────────────────────────────────────────────
           DESKTOP / TABLET – original behaviour (UNCHANGED)
        ───────────────────────────────────────────────────────────── */
        const showcaseTl = gsap.timeline({
          scrollTrigger: {
            trigger: showcaseSectionRef.current,
            start: "top top",
            end: "+=220%",
            scrub: true,
            pin: true,
          },
        });

        showcaseTl.fromTo(
          showcaseCircleRef.current,
          { width: "12vw", height: "12vw", borderRadius: "50%", opacity: 0.8 },
          { width: "150vw", height: "150vw", borderRadius: "75vw", opacity: 1 },
          0
        );

        showcaseCardsRef.current.forEach((card, i) => {
          if (card && i < displayVideos.length) {
            const pos = presets[i % presets.length];
            gsap.set(card, { x: pos.x, y: pos.y, rotation: pos.rotate, scale: 0.3, opacity: 0 });
          }
        });

        showcaseTl.to(
          showcaseCardsRef.current.filter(Boolean),
          {
            opacity: 1,
            scale: (i) => presets[i % presets.length].scale,
            rotation: (i) => presets[i % presets.length].rotate,
            stagger: 0.15, duration: 1.2, ease: "power2.out",
          },
          0.2
        );
      }

      // ── title, names, button (unchanged) ──
      const titleEls = [showcaseSubtitleRef, showcaseTitleRef, productNameRef, productDetailsRef]
        .map((r) => r.current).filter(Boolean);
      if (titleEls.length) {
        gsap.fromTo(titleEls, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.1, duration: 1,
          scrollTrigger: { trigger: showcaseSectionRef.current, start: "top 30%", end: "top 10%", scrub: true },
        });
      }
      if (namesContainerRef.current) {
        gsap.fromTo([...namesContainerRef.current.children], { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.08, duration: 1,
          scrollTrigger: { trigger: showcaseSectionRef.current, start: "top 20%", end: "top 0%", scrub: true },
        });
      }
      if (exploreBtnRef.current) {
        gsap.fromTo(exploreBtnRef.current, { y: 30, opacity: 0, scale: 0.9 }, {
          y: 0, opacity: 1, scale: 1, duration: 1,
          scrollTrigger: { trigger: showcaseSectionRef.current, start: "top 15%", end: "top -5%", scrub: true },
        });
      }
    });

    ScrollTrigger.refresh();
    const onResize = () => setTimeout(() => ScrollTrigger.refresh(), 100);
    window.addEventListener("resize", onResize);
    return () => { ctx.revert(); window.removeEventListener("resize", onResize); };
  }, [videos, screenSize]);

  const handlePlayClick = (e) => {
    e.preventDefault();
    setSelectedVideo({ videoUrl: "https://www.youtube.com/embed/YFNSDdrElfc?si=iSaKNmIlM-sx7JSf?autoplay=1" });
    setShowVideoModal(true);
  };

  if (loading) return null;

  const { presets, videoCount } = getDisplayConfig();
  const displayVideos = videos.slice(0, videoCount);
  const mobile = isMobileView(screenSize);

  return (
    <>
      <style>{`
        /* ===== BASE ===== */
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ===== ROUND VIDEO SECTION (FIRST) ===== */
        .round-video-section {
          position: relative; background-color: #523122;
          overflow: hidden; width: 100%; z-index: 10;
        }
        .cont { position: relative; width: 100%; max-width: 100%; margin: 0 auto; }

        .sticky-circle_wrap { 
          position: relative; 
          width: 100%; 
          height: clamp(120vh, 180vh, 250vh);
        }
        @media (min-width: 1920px) { .sticky-circle_wrap { height: 250vh; } }
        @media (max-width: 1366px) { .sticky-circle_wrap { height: 200vh; } }
        @media (max-width: 1024px) { .sticky-circle_wrap { height: 180vh; } }
        @media (max-width: 768px) { .sticky-circle_wrap { height: 150vh; } }
        @media (max-width: 480px) { .sticky-circle_wrap { height: 120vh; } }

        .sticky-circle {
          position: relative; display: flex; align-items: center;
          justify-content: center; width: 100%; height: 100vh; will-change: transform;
        }
        .sticky-circle_element {
          border-radius: 50%; overflow: hidden; position: relative;
          box-shadow: 0 0 min(30px,3vw) rgba(0,0,0,0.3);
          will-change: width,height,border-radius,scale,opacity;
          transition: box-shadow 0.3s ease;
          width: clamp(80px,10vw,200px); height: clamp(80px,10vw,200px);
        }
        .sticky-circle_element:hover { box-shadow: 0 0 min(50px,5vw) rgba(0,0,0,0.5); }
        @media (max-width: 768px) {
          .sticky-circle_element { width: clamp(100px,30vw,180px); height: clamp(100px,30vw,180px); }
        }
        @media (max-width: 480px) {
          .sticky-circle_element { width: clamp(120px,35vw,160px); height: clamp(120px,35vw,160px); }
        }

        .div-block-40 {
          position: absolute; inset: 0; background: rgba(0,0,0,0.3);
          z-index: 2; pointer-events: none; will-change: opacity;
        }
        .videoclass { width: 100%; height: 100%; position: relative; z-index: 1; }
        .videoclass video { width: 100%; height: 100%; object-fit: cover; display: block; }

        .lightbox-link {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%,-50%); z-index: 10; text-decoration: none; cursor: pointer;
        }
        .light-button.absolute {
          border-radius: 50%; position: relative; display: flex;
          align-items: center; justify-content: center;
          transition: all 0.3s ease; will-change: opacity,scale;
          background: transparent; cursor: pointer;
          width: clamp(80px,12vw,200px); height: clamp(80px,12vw,200px);
        }
        @media (max-width: 768px) {
          .light-button.absolute { width: clamp(100px,25vw,180px); height: clamp(100px,25vw,180px); }
        }
        @media (max-width: 480px) {
          .light-button.absolute { width: clamp(120px,35vw,160px); height: clamp(120px,35vw,160px); }
        }
        .circular-bg {
          position: absolute; width: 100%; height: 100%;
          border-radius: 50%; background: rgba(0,0,0,0.7);
          z-index: 1; transition: background 0.3s ease;
        }
        .play-icon {
          z-index: 3; color: white; display: flex; align-items: center;
          justify-content: center; transition: transform 0.3s ease;
          width: clamp(20px,4vw,60px); height: clamp(20px,4vw,60px);
        }
        .play-icon::after { content: "▶"; font-size: clamp(16px,3vw,45px); }
        .circular-text-svg {
          width: 100%; height: 100%; position: absolute; z-index: 2;
          animation: rotateText 20s linear infinite;
        }
        @keyframes rotateText { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .circular-text-svg text {
          font-weight: 700; fill: rgba(255,255,255,0.9); text-transform: uppercase;
          letter-spacing: 0.15em; font-size: clamp(6px,1.2vw,16px);
        }
        @media (max-width: 480px) { .circular-text-svg text { font-size: clamp(8px,2.5vw,12px); } }
        .light-button.absolute:hover .play-icon::after { transform: scale(1.2); }
        .light-button.absolute:hover .circular-bg { background: rgba(0,0,0,0.85); }

        /* ===== VIDEO SHOWCASE SECTION (SECOND) ===== */
        .video-showcase-section {
          min-height: 100vh; background: #000; position: relative;
          overflow: hidden; z-index: 20; color: white;
        }
        .showcase-circle {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%,-50%); background: #FFD700;
          z-index: 1; border-radius: 50%;
          will-change: width,height; opacity: 0.9;
        }

        /* ── Desktop / Tablet cards (UNCHANGED) ── */
        .video-card {
          position: absolute; top: 50%; left: 50%;
          border-radius: clamp(8px,1.5vw,16px); overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6); z-index: 10;
          border: 2px solid rgba(255,215,0,0.3);
          width: clamp(140px,18vw,280px); aspect-ratio: 9/16;
          cursor: pointer; transition: border-color 0.2s ease;
        }
        
        /* Desktop hover effect */
        @media (min-width: 768px) {
          .video-card:hover {
            border-color: #FFD700;
            transform: translate(-50%,-50%) scale(1.02);
          }
        }
        
        @media (min-width: 1920px) { .video-card { width: 280px; } }
        @media (max-width: 1366px) { .video-card { width: 240px; } }
        @media (max-width: 1024px) { .video-card { width: 200px; } }

        /* ══════════════════════════════════════
           MOBILE CARD STYLES - FULLY RESPONSIVE
        ══════════════════════════════════════ */
        @media (max-width: 767px) {
          .video-card {
            /* Responsive width based on screen size */
            width: clamp(180px, 55vw, 260px);
            border-radius: clamp(12px, 4vw, 20px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.8);
            border: 2px solid rgba(255,215,0,0.25);
            /* Remove transform transition to avoid conflicts with GSAP */
            transition: border-color 0.2s ease;
            /* Ensure cards stay within viewport */
            max-width: calc(100vw - 40px);
          }
          
          /* Smaller phones */
          @media (max-width: 480px) {
            .video-card {
              width: clamp(160px, 65vw, 220px);
            }
          }
          
          /* Very small phones */
          @media (max-width: 360px) {
            .video-card {
              width: clamp(140px, 70vw, 200px);
            }
          }
          
          /* Landscape orientation */
          @media (orientation: landscape) and (max-height: 600px) {
            .video-card {
              width: clamp(120px, 35vh, 180px);
            }
          }
          
          /* Disable hover transform on mobile */
          .video-card:hover {
            transform: translate(-50%,-50%);
            border-color: rgba(255,215,0,0.4);
          }
        }

        .video-card video { 
          width: 100%; 
          height: 100%; 
          object-fit: cover;
          pointer-events: none; /* Prevents video from interfering with clicks */
        }

        /* ── Text / UI (unchanged but with responsive improvements) ── */
        .showcase-content {
          position: relative; z-index: 5; height: 100vh; width: 100%;
          display: flex; flex-direction: column; justify-content: center;
          align-items: center; padding: clamp(1rem, 3vw, 2rem); text-align: center;
          pointer-events: none; /* Allows clicks to pass through to cards */
        }
        
        .found-in-stores {
          font-size: clamp(1rem, 2vw, 1.8rem); font-weight: 600; color: #FFD700;
          text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: clamp(0.5rem, 1.5vw, 1rem);
          border-bottom: 2px solid #FFD700; padding-bottom: 0.5rem; display: inline-block;
        }
        .spylt-title {
          font-size: clamp(2.5rem, 8vw, 8rem); font-weight: 900; color: white;
          text-transform: uppercase; letter-spacing: 0.1em; line-height: 1;
          margin-bottom: clamp(0.25rem, 1vw, 0.5rem); text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .product-name {
          font-size: clamp(1rem, 3vw, 2.5rem); font-weight: 700; color: white;
          text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.2; 
          margin-bottom: 0.25rem; padding: 0 clamp(0.5rem, 2vw, 1rem);
        }
        .product-details {
          font-size: clamp(0.9rem, 2.5vw, 2rem); color: #FFD700;
          font-weight: 600; margin-top: 0.25rem; letter-spacing: 0.05em;
        }
        .names-section {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: clamp(1rem, 4vw, 4rem); margin: clamp(1rem, 3vw, 2.5rem) 0;
          padding: 0 clamp(0.5rem, 2vw, 1rem);
        }
        .name-item {
          font-size: clamp(1rem, 2.5vw, 2.2rem); font-weight: 700; color: white;
          text-transform: uppercase; letter-spacing: 0.1em;
          position: relative; padding: 0 0.5rem; cursor: default;
          white-space: nowrap;
        }
        @media (max-width: 480px) {
          .name-item {
            font-size: clamp(0.9rem, 4vw, 1.3rem);
          }
          .names-section {
            gap: clamp(0.75rem, 3vw, 1.5rem);
          }
        }
        
        .name-item::after {
          content: ""; position: absolute; bottom: -5px; left: 0;
          width: 100%; height: 2px; background: #FFD700;
          transform: scaleX(0); transition: transform 0.3s ease;
        }
        .name-item:hover::after { transform: scaleX(1); }
        
        .explore-btn {
          background: transparent; border: 2px solid #FFD700; color: #FFD700;
          font-size: clamp(1rem, 2vw, 1.8rem); font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.15em; padding: clamp(0.5rem, 1.5vw, 1.2rem) clamp(1.5rem, 5vw, 4rem);
          cursor: pointer; transition: all 0.3s ease; margin-top: clamp(0.75rem, 2vw, 1.5rem);
          border-radius: 50px; text-decoration: none; display: inline-block;
          pointer-events: auto; /* Re-enable pointer events for button */
        }
        .explore-btn:hover {
          background: #FFD700; color: #000;
          transform: translateY(-3px); box-shadow: 0 10px 20px rgba(255,215,0,0.3);
        }
        @media (max-width: 480px) {
          .explore-btn {
            font-size: clamp(0.9rem, 4vw, 1.2rem);
            padding: 0.5rem 1.5rem;
          }
        }

        /* ===== MODAL ===== */
        .video-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.98);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; animation: fadeIn 0.3s ease; padding: clamp(10px,3vw,30px);
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .video-modal-content {
          position: relative; width: 100%; max-width: min(1200px,90vw);
          aspect-ratio: 16/9; animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
          from { transform: translateY(min(30px,3vh)); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .video-modal-content iframe,
        .video-modal-content video {
          width: 100%; height: 100%; border: none; border-radius: clamp(4px,1vw,8px);
        }
        .modal-close-btn {
          position: absolute; top: clamp(-40px,-5vh,-30px); right: 0;
          background: white; color: #523122; border: none; border-radius: 50%;
          font-size: clamp(20px,3vw,24px); cursor: pointer; display: flex;
          align-items: center; justify-content: center; transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          width: clamp(32px,5vw,44px); height: clamp(32px,5vw,44px);
        }
        .modal-close-btn:hover { background: #523122; color: white; transform: scale(1.1); }

        /* Landscape orientation improvements */
        @media (orientation: landscape) and (max-height: 600px) {
          .sticky-circle_wrap { height: 150vh; }
          .showcase-content {
            padding: 0.5rem;
          }
          .names-section {
            margin: 0.5rem 0;
            gap: 1rem;
          }
          .explore-btn {
            margin-top: 0.5rem;
            padding: 0.4rem 1.5rem;
          }
        }

        /* Safari performance optimization */
        @supports (-webkit-touch-callout: none) {
          .sticky-circle_element, .video-card, .showcase-circle { 
            transform: translateZ(0); 
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .sticky-circle_element, .light-button.absolute, .div-block-40,
          .showcase-circle, .video-card, .circular-text-svg {
            transition: none !important; animation: none !important;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .video-card { border-color: rgba(255,215,0,0.3); }
          .explore-btn:hover { 
            background: transparent; 
            color: #FFD700; 
            transform: none; 
            box-shadow: none; 
          }
          .name-item::after {
            display: none; /* Remove hover effect on touch devices */
          }
        }

        /* Ensure cards are clickable on mobile */
        @media (max-width: 767px) {
          .video-card {
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(255,215,0,0.3);
          }
          .video-card:active {
            border-color: #FFD700;
          }
        }
      `}</style>

      {/* ===== ROUND VIDEO SECTION (FIRST SECTION) ===== */}
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
                  <div className="circular-bg" />
                  <svg
                    className="circular-text-svg"
                    viewBox="0 0 200 200"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ position: "absolute", width: "100%", height: "100%", zIndex: 2 }}
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
                  <div className="play-icon" aria-hidden="true" />
                </div>
              </a>

              <div className="sticky-circle_element" ref={roundElementRef}>
                <div className="div-block-40" ref={roundOverlayRef} />
                <div className="videoclass">
                  <video
                    autoPlay loop muted playsInline
                    poster="https://cdn.prod.website-files.com/669a8d6498ba88c08dfd2cd2%2F66ab8740f29f169f743966e6_669a8d6498ba88c08dfd2cd2_66a787ab53235ab6968a788f_on%20site-transcode-poster-00001.jpg"
                  >
                    <source src="Videos/Video2.mp4" type="video/mp4" />
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

      {/* ===== VIDEO SHOWCASE SECTION (SECOND SECTION) ===== */}
      <section ref={showcaseSectionRef} className="video-showcase-section">
        <div ref={showcaseCircleRef} className="showcase-circle" />

        {/* Commented out content as per original */}
        {/* <div className="showcase-content">
          <div ref={showcaseSubtitleRef} className="found-in-stores">FOUND IN STORES</div>
          <h1 ref={showcaseTitleRef} className="spylt-title">MPACT</h1>
          <div ref={productNameRef} className="product-name">CAFFEINATED VANILLA MILKSHAKE 20g</div>
          <div ref={productDetailsRef} className="product-details">90 00g</div>
          <div ref={namesContainerRef} className="names-section">
            {names.map((name, i) => <div key={i} className="name-item">{name}</div>)}
          </div>
          <button ref={exploreBtnRef} className="explore-btn">EXPLORE ALL</button>
        </div> */}

        {displayVideos.map((v, i) => (
          <div
            key={v._id}
            ref={(el) => (showcaseCardsRef.current[i] = el)}
            className="video-card"
            onMouseEnter={() => !mobile && handleMouseEnter(i)}
            onMouseLeave={() => !mobile && handleMouseLeave(i)}
            onClick={() => handleVideoClick(v)}
            style={{ 
              transform: "translate(-50%, -50%)",
              zIndex: mobile && presets[i] ? presets[i].zIndex : 10
            }}
          >
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              src={v.videoUrl}
              muted
              playsInline
              loop={false}
              preload="metadata"
            />
          </div>
        ))}
      </section>

      {/* ===== VIDEO MODAL ===== */}
      {showVideoModal && selectedVideo && (
        <div className="video-modal-overlay" onClick={closeModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close video">
              ×
            </button>
            {selectedVideo.videoUrl.includes("youtube") || selectedVideo.videoUrl.includes("youtu.be") ? (
              <iframe
                src={selectedVideo.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={selectedVideo.videoUrl} controls autoPlay playsInline />
            )}
          </div>
        </div>
      )}
    </>
  );
}