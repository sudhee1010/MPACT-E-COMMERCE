// // // // import { useEffect, useRef } from "react";
// // // // import { gsap } from "gsap";
// // // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // // import SplitType from "split-type";

// // // // gsap.registerPlugin(ScrollTrigger);

// // // // const videos = [
// // // //   { id: 1, src: "https://www.youtube.com/shorts/3Y-Ndhb5DJI", x: -260, y: -40, rotate: -8, scale: 0.95 },
// // // //   { id: 2, src: "/videos/v2.mp4", x: -130, y: -80, rotate: -4, scale: 1 },
// // // //   { id: 3, src: "/videos/v3.mp4", x: 0, y: -20, rotate: 0, scale: 1.05 },
// // // //   { id: 4, src: "/videos/v4.mp4", x: 130, y: 60, rotate: 4, scale: 1 },
// // // //   { id: 5, src: "/videos/v5.mp4", x: 260, y: 20, rotate: 8, scale: 0.95 },
// // // // ];

// // // // export default function VideoShowcaseSection() {
// // // //   const sectionRef = useRef(null);
// // // //   const circleRef = useRef(null);
// // // //   const cardsRef = useRef([]);
// // // //   const textRef = useRef(null);

// // // //   useEffect(() => {
// // // //     const ctx = gsap.context(() => {
// // // //       const split = new SplitType(textRef.current, { types: "words" });

// // // //       const tl = gsap.timeline({
// // // //         scrollTrigger: {
// // // //           trigger: sectionRef.current,
// // // //           start: "top top",
// // // //           end: "+=250%",
// // // //           scrub: true,
// // // //           pin: true,
// // // //         },
// // // //       });

// // // //       tl.fromTo(
// // // //         split.words,
// // // //         { x: -80, opacity: 0 },
// // // //         { x: 0, opacity: 0.12, stagger: 0.12 },
// // // //         0
// // // //       );

// // // //       cardsRef.current.forEach((card, i) => {
// // // //         gsap.set(card, {
// // // //           x: videos[i].x,
// // // //           y: videos[i].y,
// // // //           rotation: videos[i].rotate,
// // // //           scale: videos[i].scale,
// // // //         });
// // // //       });

// // // //       tl.fromTo(
// // // //         cardsRef.current,
// // // //         { opacity: 0, y: 60 },
// // // //         { opacity: 1, y: 0, stagger: 0.12 },
// // // //         0.15
// // // //       );

// // // //       tl.fromTo(
// // // //         circleRef.current,
// // // //         { width: "12vw", height: "12vw", borderRadius: "50%" },
// // // //         { width: "150vw", height: "150vw", borderRadius: "75vw" },
// // // //         0.35
// // // //       );
// // // //     }, sectionRef);

// // // //     return () => ctx.revert();
// // // //   }, []);

// // // //   return (
// // // //     <>
// // // //       <style>{`
// // // //         .video-section {
// // // //           height: 100vh;
// // // //           background: #000;
// // // //           position: relative;
// // // //           overflow: hidden;
// // // //         }
// // // //         .bg-text {
// // // //           position: absolute;
// // // //           inset: 0;
// // // //           display: flex;
// // // //           justify-content: center;
// // // //           align-items: center;
// // // //           font-size: 12vw;
// // // //           font-weight: 900;
// // // //           color: rgba(250,204,21,.95);
// // // //           pointer-events: none;
// // // //         }
// // // //         .circle {
// // // //           position: absolute;
// // // //           top: 50%;
// // // //           left: 50%;
// // // //           transform: translate(-50%,-50%);
// // // //           background: rgba(250,204,21,.95);
// // // //         }
// // // //         .video-card {
// // // //           position: absolute;
// // // //           top: 50%;
// // // //           left: 50%;
// // // //           width: 220px;
// // // //           aspect-ratio: 9/16;
// // // //           border-radius: 20px;
// // // //           overflow: hidden;
// // // //           box-shadow: 0 40px 80px rgba(0,0,0,.45);
// // // //         }
// // // //         video {
// // // //           width: 100%;
// // // //           height: 100%;
// // // //           object-fit: cover;
// // // //         }
// // // //       `}</style>

// // // //       <section ref={sectionRef} className="video-section">
// // // //         <h2 ref={textRef} className="bg-text">
// // // //           WHAT’S EVERYONE TALKING
// // // //         </h2>

// // // //         <div ref={circleRef} className="circle" />

// // // //         {videos.map((v, i) => (
// // // //           <div
// // // //             key={v.id}
// // // //             ref={el => (cardsRef.current[i] = el)}
// // // //             className="video-card"
// // // //             style={{ transform: "translate(-50%, -50%)" }}
// // // //           >
// // // //             <video src={v.src} muted playsInline />
// // // //           </div>
// // // //         ))}
// // // //       </section>
// // // //     </>
// // // //   );
// // // // }




// // // import { useEffect, useRef, useState } from "react";
// // // import axios from "axios";
// // // import { gsap } from "gsap";
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // import SplitType from "split-type";

// // // gsap.registerPlugin(ScrollTrigger);

// // // const positionPresets = [
// // //   { x: -260, y: -40, rotate: -8, scale: 0.95 },
// // //   { x: -130, y: -80, rotate: -4, scale: 1 },
// // //   { x: 0, y: -20, rotate: 0, scale: 1.05 },
// // //   { x: 130, y: 60, rotate: 4, scale: 1 },
// // //   { x: 260, y: 20, rotate: 8, scale: 0.95 },
// // // ];

// // // export default function VideoShowcaseSection() {
// // //   const sectionRef = useRef(null);
// // //   const circleRef = useRef(null);
// // //   const cardsRef = useRef([]);
// // //   const textRef = useRef(null);

// // //   const [videos, setVideos] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   // 🔹 Fetch videos from backend
// // //   useEffect(() => {
// // //     const fetchVideos = async () => {
// // //       try {
// // //         const res = await axios.get("https://mpact-e-backend.onrender.com/api/videos");
// // //         setVideos(res.data || []);
// // //       } catch (err) {
// // //         console.error("Failed to load videos");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchVideos();
// // //   }, []);

// // //   // 🔹 GSAP animation (runs only after videos load)
// // //   useEffect(() => {
// // //     if (!videos.length) return;

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
// // //         const pos = positionPresets[i % positionPresets.length];
// // //         gsap.set(card, pos);
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

// // //      ScrollTrigger.refresh();

// // //     return () => ctx.revert();
// // //   }, [videos]);

// // //   if (loading) return null;

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
// // //             key={v._id}
// // //             ref={el => (cardsRef.current[i] = el)}
// // //             className="video-card"
// // //             style={{ transform: "translate(-50%, -50%)" }}
// // //           >
// // //             <video src={v.videoUrl} muted autoPlay loop playsInline />
// // //           </div>
// // //         ))}
// // //       </section>
// // //     </>
// // //   );
// // // }



// // // import { useEffect, useRef, useState } from "react";
// // // import axios from "axios";
// // // import { gsap } from "gsap";
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // import SplitType from "split-type";
// // // import api from "../api/axios";

// // // gsap.registerPlugin(ScrollTrigger);

// // // const positionPresets = [
// // //   { x: -260, y: -40, rotate: -8, scale: 0.95 },
// // //   { x: -130, y: -80, rotate: -4, scale: 1 },
// // //   { x: 0, y: -20, rotate: 0, scale: 1.05 },
// // //   { x: 130, y: 60, rotate: 4, scale: 1 },
// // //   { x: 260, y: 20, rotate: 8, scale: 0.95 },
// // // ];

// // // const mobilePositionPresets = [
// // //   { x: -100, y: -60, rotate: -6, scale: 0.9 },
// // //   { x: 0, y: 0, rotate: 0, scale: 1 },
// // //   { x: 100, y: -60, rotate: 6, scale: 0.9 },
// // // ];

// // // export default function VideoShowcaseSection() {
// // //   const sectionRef = useRef(null);
// // //   const circleRef = useRef(null);
// // //   const cardsRef = useRef([]);
// // //   const textRef = useRef(null);

// // //   const [videos, setVideos] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [isMobile, setIsMobile] = useState(false);

// // //   // 🔹 Detect mobile view
// // //   useEffect(() => {
// // //     const checkMobile = () => {
// // //       setIsMobile(window.innerWidth <= 768);
// // //     };
    
// // //     checkMobile();
// // //     window.addEventListener("resize", checkMobile);
// // //     return () => window.removeEventListener("resize", checkMobile);
// // //   }, []);

// // //   // 🔹 Fetch videos from backend
// // //   useEffect(() => {
// // //     const fetchVideos = async () => {
// // //       try {
// // //         const res = await api.get("/api/videos");
// // //         setVideos(res.data || []);
// // //       } catch (err) {
// // //         console.error("Failed to load videos");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchVideos();
// // //   }, []);

// // //   // 🔹 GSAP animation (runs only after videos load)
// // //   useEffect(() => {
// // //     if (!videos.length) return;

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

// // //       // 🔹 Use appropriate presets based on screen size
// // //       const displayVideos = isMobile ? videos.slice(0, 3) : videos;
// // //       const presets = isMobile ? mobilePositionPresets : positionPresets;

// // //       cardsRef.current.forEach((card, i) => {
// // //         if (card && i < displayVideos.length) {
// // //           const pos = presets[i % presets.length];
// // //           gsap.set(card, pos);
// // //         }
// // //       });

// // //       tl.fromTo(
// // //         cardsRef.current.filter(card => card !== null),
// // //         { opacity: 0, y: 60 },
// // //         { opacity: 1, y: 0, stagger: 0.12 },
// // //         0.15
// // //       );

// // //       tl.fromTo(
// // //         circleRef.current,
// // //         { width: isMobile ? "20vw" : "12vw", height: isMobile ? "20vw" : "12vw", borderRadius: "50%" },
// // //         { width: "150vw", height: "150vw", borderRadius: "75vw" },
// // //         0.35
// // //       );
// // //     }, sectionRef);

// // //     ScrollTrigger.refresh();

// // //     return () => ctx.revert();
// // //   }, [videos, isMobile]);

// // //   if (loading) return null;

// // //   // 🔹 Show only 3 videos on mobile
// // //   const displayVideos = isMobile ? videos.slice(0, 3) : videos;

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
// // //           text-align: center;
// // //           padding: 0 20px;
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

// // //         @media (max-width: 768px) {
// // //           .bg-text {
// // //             font-size: 16vw;
// // //           }
// // //           .video-card {
// // //             width: 160px;
// // //           }
// // //         }
// // //       `}</style>

// // //       <section ref={sectionRef} className="video-section">
// // //         <h2 ref={textRef} className="bg-text">
// // //           WHAT'S EVERYONE TALKING
// // //         </h2>

// // //         <div ref={circleRef} className="circle" />

// // //         {displayVideos.map((v, i) => (
// // //           <div
// // //             key={v._id}
// // //             ref={el => (cardsRef.current[i] = el)}
// // //             className="video-card"
// // //             style={{ transform: "translate(-50%, -50%)" }}
// // //           >
// // //             <video src={v.videoUrl} muted autoPlay loop playsInline />
// // //           </div>
// // //         ))}
// // //       </section>
// // //     </>
// // //   );
// // // }
// // // VideoShowcaseSection.jsx
// // import React, { useEffect, useRef, useState } from "react";
// // import axios from "axios";
// // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import SplitType from "split-type";
// // import api from "../api/axios";

// // gsap.registerPlugin(ScrollTrigger);

// // // Enhanced position presets with tilts for different screen sizes - left to right layout
// // const positionPresets = {
// //   desktop: [
// //     { x: -600, y: 20, rotate: -8, scale: 0.9 },
// //     { x: -320, y: 10, rotate: -4, scale: 0.95 },
// //     { x: -40, y: 0, rotate: 0, scale: 1 },
// //     { x: 240, y: 10, rotate: 4, scale: 0.95 },
// //     { x: 520, y: 20, rotate: 8, scale: 0.9 },
// //   ],
// //   laptop: [
// //     { x: -480, y: 15, rotate: -7, scale: 0.85 },
// //     { x: -250, y: 8, rotate: -3.5, scale: 0.9 },
// //     { x: -20, y: 0, rotate: 0, scale: 0.95 },
// //     { x: 210, y: 8, rotate: 3.5, scale: 0.9 },
// //     { x: 440, y: 15, rotate: 7, scale: 0.85 },
// //   ],
// //   tablet: [
// //     { x: -350, y: 12, rotate: -6, scale: 0.8 },
// //     { x: -150, y: 6, rotate: -3, scale: 0.85 },
// //     { x: 50, y: 0, rotate: 0, scale: 0.9 },
// //     { x: 250, y: 6, rotate: 3, scale: 0.85 },
// //     { x: 450, y: 12, rotate: 6, scale: 0.8 },
// //   ],

// //   // ── MOBILE: final resting positions for the overlapping deck ──
// //   // All 3 cards land roughly in the same area so they visually overlap.
// //   // Slight x/y offsets + rotation give depth; z-index controls paint order.
// //   mobile: [
// //     { x: -18, y: -22, rotate: -10, scale: 1.0, zIndex: 8  },  // card 0 – behind, tilted left
// //     { x:   8, y:  12, rotate:  5,  scale: 1.0, zIndex: 10 },  // card 1 – middle
// //     { x:  22, y:  35, rotate:  14, scale: 1.0, zIndex: 12 },  // card 2 – front, tilted right
// //   ],
// //   mobileSmall: [
// //     { x: -15, y: -18, rotate: -10, scale: 1.0, zIndex: 8  },
// //     { x:   6, y:  10, rotate:  5,  scale: 1.0, zIndex: 10 },
// //     { x:  18, y:  28, rotate:  14, scale: 1.0, zIndex: 12 },
// //   ],
// // };

// // export default function VideoShowcaseSection() {
// //   // Refs for RoundVideo section (first)
// //   const roundSectionRef = useRef(null);
// //   const roundCircleRef  = useRef(null);
// //   const roundElementRef = useRef(null);
// //   const roundOverlayRef = useRef(null);
// //   const roundButtonRef  = useRef(null);
// //   const roundWrapRef    = useRef(null);

// //   // Refs for VideoShowcase section (second)
// //   const showcaseSectionRef  = useRef(null);
// //   const showcaseCircleRef   = useRef(null);
// //   const showcaseCardsRef    = useRef([]);
// //   const videoRefs           = useRef([]);
// //   const showcaseTitleRef    = useRef(null);
// //   const showcaseSubtitleRef = useRef(null);
// //   const productNameRef      = useRef(null);
// //   const productDetailsRef   = useRef(null);
// //   const namesContainerRef   = useRef(null);
// //   const exploreBtnRef       = useRef(null);

// //   const [videos, setVideos]                = useState([]);
// //   const [loading, setLoading]              = useState(true);
// //   const [screenSize, setScreenSize]        = useState("desktop");
// //   const [showVideoModal, setShowVideoModal] = useState(false);
// //   const [selectedVideo, setSelectedVideo]  = useState(null);
// //   const [hoveredIndex, setHoveredIndex]    = useState(null);

// //   const names = ["Andrew", "Bryan", "Chris", "Devante"];

// //   const isMobileView = (s) => s === "mobile" || s === "mobileSmall";

// //   // ── video hover ──
// //   const handleMouseEnter = (i) => { setHoveredIndex(i); videoRefs.current[i]?.play(); };
// //   const handleMouseLeave = (i) => { setHoveredIndex(null); videoRefs.current[i]?.pause(); };

// //   // ── modal ──
// //   const handleVideoClick = (v) => { setSelectedVideo(v); setShowVideoModal(true); };
// //   const closeModal = () => { setShowVideoModal(false); setSelectedVideo(null); };

// //   // ── screen size ──
// //   useEffect(() => {
// //     const detect = () => {
// //       const w = window.innerWidth;
// //       if      (w >= 1920) setScreenSize("desktop");
// //       else if (w >= 1366) setScreenSize("laptop");
// //       else if (w >= 1024) setScreenSize("laptop");
// //       else if (w >= 768)  setScreenSize("tablet");
// //       else if (w >= 480)  setScreenSize("mobile");
// //       else                setScreenSize("mobileSmall");
// //     };
// //     detect();
// //     window.addEventListener("resize", detect);
// //     return () => window.removeEventListener("resize", detect);
// //   }, []);

// //   // ── fetch ──
// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const res = await api.get("/api/videos");
// //         setVideos(res.data || []);
// //       } catch { console.error("Failed to load videos"); }
// //       finally { setLoading(false); }
// //     })();
// //   }, []);

// //   const getDisplayConfig = () => {
// //     const presets    = positionPresets[screenSize] || positionPresets.desktop;
// //     const videoCount = isMobileView(screenSize) ? 3 : presets.length;
// //     return { presets, videoCount };
// //   };

// //   // ── GSAP ──
// //   useEffect(() => {
// //     if (!videos.length) return;

// //     const ctx = gsap.context(() => {
// //       const { presets, videoCount } = getDisplayConfig();
// //       const displayVideos = videos.slice(0, videoCount);
// //       const mobile        = isMobileView(screenSize);

// //       /* ══════════════════════════════════════════════
// //          SECTION 1 – Round expanding circle (UNCHANGED)
// //       ══════════════════════════════════════════════ */
// //       ScrollTrigger.create({
// //         trigger:    roundWrapRef.current,
// //         start:      "top top",
// //         end:        "bottom bottom",
// //         pin:        roundCircleRef.current,
// //         pinSpacing: false,
// //         scrub:      0.5,
// //       });

// //       const circleSizes = {
// //         mobileSmall: { start: "35vw", end: "200vw" },
// //         mobile:      { start: "30vw", end: "180vw" },
// //         tablet:      { start: "15vw", end: "160vw" },
// //         laptop:      { start: "12vw", end: "150vw" },
// //         desktop:     { start: "10vw", end: "150vw" },
// //       }[screenSize] || { start: "10vw", end: "150vw" };

// //       gsap.fromTo(
// //         roundElementRef.current,
// //         { width: circleSizes.start, height: circleSizes.start, borderRadius: "50%", scale: 1, opacity: 1 },
// //         {
// //           width: circleSizes.end, height: circleSizes.end, borderRadius: "50%",
// //           scale: mobile ? 1.1 : 1.2, opacity: mobile ? 0.95 : 0.9, ease: "none",
// //           scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
// //         }
// //       );

// //       gsap.fromTo(
// //         roundOverlayRef.current,
// //         { opacity: mobile ? 0.2 : 0.3 },
// //         { opacity: mobile ? 0.7 : 0.8, ease: "none",
// //           scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8 } }
// //       );

// //       gsap.fromTo(
// //         roundButtonRef.current,
// //         { opacity: 1, scale: 1 },
// //         { opacity: 0, scale: mobile ? 1.3 : 1.5, ease: "none",
// //           scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: mobile ? "30% center" : "center center", scrub: 0.8 } }
// //       );

// //       /* ══════════════════════════════════════════════
// //          SECTION 2 – Video showcase
// //       ══════════════════════════════════════════════ */

// //       if (mobile) {
// //         /* ─────────────────────────────────────────────────────────────
// //            MOBILE – one-by-one scroll-driven card drop into a deck
// //            Each card has its OWN ScrollTrigger so it animates in
// //            separately as the user scrolls, then stays put (no pin).
// //            The section itself is pinned for the full scroll distance.
// //         ───────────────────────────────────────────────────────────── */

// //         // Total scroll distance for the pinned section
// //         const totalEnd = "+=280%";

// //         // Pin the section
// //         ScrollTrigger.create({
// //           trigger: showcaseSectionRef.current,
// //           start:   "top top",
// //           end:     totalEnd,
// //           pin:     true,
// //           scrub:   true,
// //         });

// //         // Yellow circle expands over first 40 % of the scroll
// //         gsap.fromTo(
// //           showcaseCircleRef.current,
// //           { width: "20vw", height: "20vw", borderRadius: "50%", opacity: 0.8 },
// //           {
// //             width: "220vw", height: "220vw", borderRadius: "110vw", opacity: 1,
// //             ease: "none",
// //             scrollTrigger: {
// //               trigger:        showcaseSectionRef.current,
// //               start:          "top top",
// //               end:            totalEnd,
// //               scrub:          true,
// //               containerAnimation: undefined,
// //             },
// //           }
// //         );

// //         // ── Set every card's initial state: hidden, centred, scaled down ──
// //         showcaseCardsRef.current.forEach((card, i) => {
// //           if (!card || i >= displayVideos.length) return;
// //           const pos = presets[i];
// //           gsap.set(card, {
// //             x:        0,
// //             y:        -60,          // start slightly above centre
// //             rotation: 0,
// //             scale:    0.6,
// //             opacity:  0,
// //             zIndex:   pos.zIndex ?? 10,
// //           });
// //         });

// //         /*
// //           Divide the scroll into 3 equal "slots" (one per card).
// //           Card 0 drops in during 0–33 %, card 1 during 33–66 %, card 2 during 66–100 %.
// //           We use a master timeline scrubbed to the section's scroll.
// //         */
// //         const masterTl = gsap.timeline();

// //         displayVideos.forEach((_, i) => {
// //           const card = showcaseCardsRef.current[i];
// //           if (!card) return;
// //           const pos       = presets[i];
// //           const slotStart = i * (1 / 3);         // 0, 0.33, 0.66
// //           const slotEnd   = slotStart + 1 / 3;   // 0.33, 0.66, 1.0

// //           // Each card animates in the first 60 % of its slot,
// //           // then stays static for the remainder.
// //           masterTl.fromTo(
// //             card,
// //             { x: 0, y: -60, rotation: 0, scale: 0.6, opacity: 0 },
// //             {
// //               x:        pos.x,
// //               y:        pos.y,
// //               rotation: pos.rotate,
// //               scale:    pos.scale,
// //               opacity:  1,
// //               ease:     "power3.out",
// //               duration: (slotEnd - slotStart) * 0.6, // 60 % of slot
// //             },
// //             slotStart  // insert at the slot's start position in the timeline
// //           );
// //         });

// //         ScrollTrigger.create({
// //           trigger:   showcaseSectionRef.current,
// //           start:     "top top",
// //           end:       totalEnd,
// //           scrub:     0.6,
// //           animation: masterTl,
// //         });

// //       } else {
// //         /* ─────────────────────────────────────────────────────────────
// //            DESKTOP / TABLET – original behaviour (UNCHANGED)
// //         ───────────────────────────────────────────────────────────── */
// //         const showcaseTl = gsap.timeline({
// //           scrollTrigger: {
// //             trigger: showcaseSectionRef.current,
// //             start:   "top top",
// //             end:     "+=220%",
// //             scrub:   true,
// //             pin:     true,
// //           },
// //         });

// //         showcaseTl.fromTo(
// //           showcaseCircleRef.current,
// //           { width: "12vw", height: "12vw", borderRadius: "50%", opacity: 0.8 },
// //           { width: "150vw", height: "150vw", borderRadius: "75vw", opacity: 1 },
// //           0
// //         );

// //         showcaseCardsRef.current.forEach((card, i) => {
// //           if (card && i < displayVideos.length) {
// //             const pos = presets[i % presets.length];
// //             gsap.set(card, { x: pos.x, y: pos.y, rotation: pos.rotate, scale: 0.3, opacity: 0 });
// //           }
// //         });

// //         showcaseTl.to(
// //           showcaseCardsRef.current.filter(Boolean),
// //           {
// //             opacity:  1,
// //             scale:    (i) => presets[i % presets.length].scale,
// //             rotation: (i) => presets[i % presets.length].rotate,
// //             stagger: 0.15, duration: 1.2, ease: "power2.out",
// //           },
// //           0.2
// //         );
// //       }

// //       // ── title, names, button (unchanged) ──
// //       const titleEls = [showcaseSubtitleRef, showcaseTitleRef, productNameRef, productDetailsRef]
// //         .map((r) => r.current).filter(Boolean);
// //       if (titleEls.length) {
// //         gsap.fromTo(titleEls, { y: 50, opacity: 0 }, {
// //           y: 0, opacity: 1, stagger: 0.1, duration: 1,
// //           scrollTrigger: { trigger: showcaseSectionRef.current, start: "top 30%", end: "top 10%", scrub: true },
// //         });
// //       }
// //       if (namesContainerRef.current) {
// //         gsap.fromTo([...namesContainerRef.current.children], { y: 30, opacity: 0 }, {
// //           y: 0, opacity: 1, stagger: 0.08, duration: 1,
// //           scrollTrigger: { trigger: showcaseSectionRef.current, start: "top 20%", end: "top 0%", scrub: true },
// //         });
// //       }
// //       if (exploreBtnRef.current) {
// //         gsap.fromTo(exploreBtnRef.current, { y: 30, opacity: 0, scale: 0.9 }, {
// //           y: 0, opacity: 1, scale: 1, duration: 1,
// //           scrollTrigger: { trigger: showcaseSectionRef.current, start: "top 15%", end: "top -5%", scrub: true },
// //         });
// //       }
// //     });

// //     ScrollTrigger.refresh();
// //     const onResize = () => setTimeout(() => ScrollTrigger.refresh(), 100);
// //     window.addEventListener("resize", onResize);
// //     return () => { ctx.revert(); window.removeEventListener("resize", onResize); };
// //   }, [videos, screenSize]);

// //   const handlePlayClick = (e) => {
// //     e.preventDefault();
// //     setSelectedVideo({ videoUrl: "https://www.youtube.com/embed/YFNSDdrElfc?si=iSaKNmIlM-sx7JSf?autoplay=1" });
// //     setShowVideoModal(true);
// //   };

// //   if (loading) return null;

// //   const { presets, videoCount } = getDisplayConfig();
// //   const displayVideos = videos.slice(0, videoCount);
// //   const mobile        = isMobileView(screenSize);

// //   return (
// //     <>
// //       <style>{`
// //         /* ===== BASE ===== */
// //         * { box-sizing: border-box; margin: 0; padding: 0; }

// //         /* ===== ROUND VIDEO SECTION (FIRST) ===== */
// //         .round-video-section {
// //           position: relative; background-color: #523122;
// //           overflow: hidden; width: 100%; z-index: 10;
// //         }
// //         .cont { position: relative; width: 100%; max-width: 100%; margin: 0 auto; }

// //         .sticky-circle_wrap { position: relative; width: 100%; height: clamp(120vh,180vh,250vh); }
// //         @media (min-width: 1920px) { .sticky-circle_wrap { height: 250vh; } }
// //         @media (max-width: 1366px) { .sticky-circle_wrap { height: 200vh; } }
// //         @media (max-width: 1024px) { .sticky-circle_wrap { height: 180vh; } }
// //         @media (max-width: 768px)  { .sticky-circle_wrap { height: 150vh; } }
// //         @media (max-width: 480px)  { .sticky-circle_wrap { height: 120vh; } }

// //         .sticky-circle {
// //           position: relative; display: flex; align-items: center;
// //           justify-content: center; width: 100%; height: 100vh; will-change: transform;
// //         }
// //         .sticky-circle_element {
// //           border-radius: 50%; overflow: hidden; position: relative;
// //           box-shadow: 0 0 min(30px,3vw) rgba(0,0,0,0.3);
// //           will-change: width,height,border-radius,scale,opacity;
// //           transition: box-shadow 0.3s ease;
// //           width: clamp(80px,10vw,200px); height: clamp(80px,10vw,200px);
// //         }
// //         .sticky-circle_element:hover { box-shadow: 0 0 min(50px,5vw) rgba(0,0,0,0.5); }
// //         @media (max-width: 768px) {
// //           .sticky-circle_element { width: clamp(100px,30vw,180px); height: clamp(100px,30vw,180px); }
// //         }
// //         @media (max-width: 480px) {
// //           .sticky-circle_element { width: clamp(120px,35vw,160px); height: clamp(120px,35vw,160px); }
// //         }

// //         .div-block-40 {
// //           position: absolute; inset: 0; background: rgba(0,0,0,0.3);
// //           z-index: 2; pointer-events: none; will-change: opacity;
// //         }
// //         .videoclass { width: 100%; height: 100%; position: relative; z-index: 1; }
// //         .videoclass video { width: 100%; height: 100%; object-fit: cover; display: block; }

// //         .lightbox-link {
// //           position: absolute; top: 50%; left: 50%;
// //           transform: translate(-50%,-50%); z-index: 10; text-decoration: none; cursor: pointer;
// //         }
// //         .light-button.absolute {
// //           border-radius: 50%; position: relative; display: flex;
// //           align-items: center; justify-content: center;
// //           transition: all 0.3s ease; will-change: opacity,scale;
// //           background: transparent; cursor: pointer;
// //           width: clamp(80px,12vw,200px); height: clamp(80px,12vw,200px);
// //         }
// //         @media (max-width: 768px) {
// //           .light-button.absolute { width: clamp(100px,25vw,180px); height: clamp(100px,25vw,180px); }
// //         }
// //         @media (max-width: 480px) {
// //           .light-button.absolute { width: clamp(120px,35vw,160px); height: clamp(120px,35vw,160px); }
// //         }
// //         .circular-bg {
// //           position: absolute; width: 100%; height: 100%;
// //           border-radius: 50%; background: rgba(0,0,0,0.7);
// //           z-index: 1; transition: background 0.3s ease;
// //         }
// //         .play-icon {
// //           z-index: 3; color: white; display: flex; align-items: center;
// //           justify-content: center; transition: transform 0.3s ease;
// //           width: clamp(20px,4vw,60px); height: clamp(20px,4vw,60px);
// //         }
// //         .play-icon::after { content: "▶"; font-size: clamp(16px,3vw,45px); }
// //         .circular-text-svg {
// //           width: 100%; height: 100%; position: absolute; z-index: 2;
// //           animation: rotateText 20s linear infinite;
// //         }
// //         @keyframes rotateText { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
// //         .circular-text-svg text {
// //           font-weight: 700; fill: rgba(255,255,255,0.9); text-transform: uppercase;
// //           letter-spacing: 0.15em; font-size: clamp(6px,1.2vw,16px);
// //         }
// //         @media (max-width: 480px) { .circular-text-svg text { font-size: clamp(8px,2.5vw,12px); } }
// //         .light-button.absolute:hover .play-icon::after { transform: scale(1.2); }
// //         .light-button.absolute:hover .circular-bg { background: rgba(0,0,0,0.85); }

// //         /* ===== VIDEO SHOWCASE SECTION (SECOND) ===== */
// //         .video-showcase-section {
// //           min-height: 100vh; background: #000; position: relative;
// //           overflow: hidden; z-index: 20; color: white;
// //         }
// //         .showcase-circle {
// //           position: absolute; top: 50%; left: 50%;
// //           transform: translate(-50%,-50%); background: #FFD700;
// //           z-index: 1; border-radius: 50%;
// //           will-change: width,height; opacity: 0.9;
// //         }

// //         /* ── Desktop / Tablet cards (UNCHANGED) ── */
// //         .video-card {
// //           position: absolute; top: 50%; left: 50%;
// //           border-radius: clamp(8px,1.5vw,16px); overflow: hidden;
// //           box-shadow: 0 20px 40px rgba(0,0,0,0.6); z-index: 10;
// //           border: 2px solid rgba(255,215,0,0.3);
// //           width: clamp(140px,18vw,280px); aspect-ratio: 9/16;
// //           cursor: pointer; transition: border-color 0.2s ease, transform 0.2s ease;
// //         }
// //         .video-card:hover {
// //           border-color: #FFD700;
// //           transform: translate(-50%,-50%) scale(1.02);
// //         }
// //         @media (min-width: 1920px) { .video-card { width: 280px; } }
// //         @media (max-width: 1366px) { .video-card { width: 240px; } }
// //         @media (max-width: 1024px) { .video-card { width: 200px; } }

// //         /* ══════════════════════════════════════
// //            MOBILE card styles — ONLY change here
// //            Large portrait cards that stack/overlap
// //         ══════════════════════════════════════ */
// //         @media (max-width: 767px) {
// //           .video-card {
// //             /* Significantly larger than before */
// //             width: clamp(200px, 68vw, 280px);
// //             border-radius: 18px;
// //             /* Deep shadow accentuates the stacked depth */
// //             box-shadow: 0 24px 56px rgba(0,0,0,0.85);
// //             border: 2px solid rgba(255,255,255,0.1);
// //             /* No hover scale — cards stay in GSAP-managed positions */
// //             transition: border-color 0.2s ease;
// //           }
// //           /* Disable the desktop hover scale on mobile */
// //           .video-card:hover {
// //             transform: translate(-50%,-50%);
// //             border-color: rgba(255,215,0,0.35);
// //           }
// //         }
// //         @media (max-width: 480px) {
// //           .video-card {
// //             width: clamp(185px, 72vw, 240px);
// //           }
// //         }

// //         .video-card video { width: 100%; height: 100%; object-fit: cover; }

// //         /* ── Text / UI (unchanged) ── */
// //         .showcase-content {
// //           position: relative; z-index: 5; height: 100vh; width: 100%;
// //           display: flex; flex-direction: column; justify-content: center;
// //           align-items: center; padding: 2rem; text-align: center;
// //         }
// //         .found-in-stores {
// //           font-size: clamp(1.2rem,2vw,1.8rem); font-weight: 600; color: #FFD700;
// //           text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 1rem;
// //           border-bottom: 2px solid #FFD700; padding-bottom: 0.5rem; display: inline-block;
// //         }
// //         .spylt-title {
// //           font-size: clamp(4rem,8vw,8rem); font-weight: 900; color: white;
// //           text-transform: uppercase; letter-spacing: 0.1em; line-height: 1;
// //           margin-bottom: 0.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
// //         }
// //         .product-name {
// //           font-size: clamp(1.5rem,3vw,2.5rem); font-weight: 700; color: white;
// //           text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.2; margin-bottom: 0.25rem;
// //         }
// //         .product-details {
// //           font-size: clamp(1.2rem,2.5vw,2rem); color: #FFD700;
// //           font-weight: 600; margin-top: 0.25rem; letter-spacing: 0.05em;
// //         }
// //         .names-section {
// //           display: flex; flex-wrap: wrap; justify-content: center;
// //           gap: clamp(1.5rem,4vw,4rem); margin: 2.5rem 0;
// //         }
// //         .name-item {
// //           font-size: clamp(1.3rem,2.5vw,2.2rem); font-weight: 700; color: white;
// //           text-transform: uppercase; letter-spacing: 0.1em;
// //           position: relative; padding: 0 0.5rem; cursor: default;
// //         }
// //         .name-item::after {
// //           content: ""; position: absolute; bottom: -5px; left: 0;
// //           width: 100%; height: 2px; background: #FFD700;
// //           transform: scaleX(0); transition: transform 0.3s ease;
// //         }
// //         .name-item:hover::after { transform: scaleX(1); }
// //         .explore-btn {
// //           background: transparent; border: 2px solid #FFD700; color: #FFD700;
// //           font-size: clamp(1.2rem,2vw,1.8rem); font-weight: 700; text-transform: uppercase;
// //           letter-spacing: 0.15em; padding: clamp(0.8rem,1.5vw,1.2rem) clamp(2.5rem,5vw,4rem);
// //           cursor: pointer; transition: all 0.3s ease; margin-top: 1.5rem;
// //           border-radius: 50px; text-decoration: none; display: inline-block;
// //         }
// //         .explore-btn:hover {
// //           background: #FFD700; color: #000;
// //           transform: translateY(-3px); box-shadow: 0 10px 20px rgba(255,215,0,0.3);
// //         }

// //         /* ===== MODAL ===== */
// //         .video-modal-overlay {
// //           position: fixed; inset: 0; background: rgba(0,0,0,0.98);
// //           display: flex; align-items: center; justify-content: center;
// //           z-index: 1000; animation: fadeIn 0.3s ease; padding: clamp(10px,3vw,30px);
// //         }
// //         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// //         .video-modal-content {
// //           position: relative; width: 100%; max-width: min(1200px,90vw);
// //           aspect-ratio: 16/9; animation: slideUp 0.3s ease;
// //         }
// //         @keyframes slideUp {
// //           from { transform: translateY(min(30px,3vh)); opacity: 0; }
// //           to   { transform: translateY(0); opacity: 1; }
// //         }
// //         .video-modal-content iframe,
// //         .video-modal-content video {
// //           width: 100%; height: 100%; border: none; border-radius: clamp(4px,1vw,8px);
// //         }
// //         .modal-close-btn {
// //           position: absolute; top: clamp(-40px,-5vh,-30px); right: 0;
// //           background: white; color: #523122; border: none; border-radius: 50%;
// //           font-size: clamp(20px,3vw,24px); cursor: pointer; display: flex;
// //           align-items: center; justify-content: center; transition: all 0.3s ease;
// //           box-shadow: 0 2px 10px rgba(0,0,0,0.2);
// //           width: clamp(32px,5vw,44px); height: clamp(32px,5vw,44px);
// //         }
// //         .modal-close-btn:hover { background: #523122; color: white; transform: scale(1.1); }

// //         /* Landscape */
// //         @media (orientation: landscape) and (max-height: 600px) {
// //           .sticky-circle_wrap { height: 150vh; }
// //           .video-card { width: clamp(100px,12vh,160px); }
// //           .names-section { gap: 1.5rem; margin: 1rem 0; }
// //         }
// //         /* Safari */
// //         @supports (-webkit-touch-callout: none) {
// //           .sticky-circle_element, .video-card, .showcase-circle { transform: translateZ(0); }
// //         }
// //         /* Reduced motion */
// //         @media (prefers-reduced-motion: reduce) {
// //           .sticky-circle_element, .light-button.absolute, .div-block-40,
// //           .showcase-circle, .video-card, .circular-text-svg {
// //             transition: none !important; animation: none !important;
// //           }
// //         }
// //         /* Touch */
// //         @media (hover: none) and (pointer: coarse) {
// //           .video-card { border-color: rgba(255,215,0,0.3); }
// //           .explore-btn:hover { background: transparent; color: #FFD700; transform: none; box-shadow: none; }
// //         }
// //       `}</style>

// //       {/* ===== ROUND VIDEO SECTION (FIRST SECTION) ===== */}
// //       <div className="round-video-section" ref={roundSectionRef}>
// //         <div className="cont">
// //           <div className="sticky-circle_wrap" ref={roundWrapRef}>
// //             <div className="sticky-circle" ref={roundCircleRef}>
// //               <a
// //                 href="#"
// //                 className="lightbox-link w-inline-block w-lightbox"
// //                 onClick={handlePlayClick}
// //                 aria-label="Play video"
// //               >
// //                 <div className="light-button absolute" ref={roundButtonRef}>
// //                   <div className="circular-bg" />
// //                   <svg
// //                     className="circular-text-svg"
// //                     viewBox="0 0 200 200"
// //                     preserveAspectRatio="xMidYMid meet"
// //                     style={{ position: "absolute", width: "100%", height: "100%", zIndex: 2 }}
// //                   >
// //                     <defs>
// //                       <path
// //                         id="circlePath"
// //                         d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
// //                         fill="none"
// //                       />
// //                     </defs>
// //                     <text>
// //                       <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
// //                         PLAY VIDEO • PLAY VIDEO • PLAY VIDEO •
// //                       </textPath>
// //                     </text>
// //                   </svg>
// //                   <div className="play-icon" aria-hidden="true" />
// //                 </div>
// //               </a>

// //               <div className="sticky-circle_element" ref={roundElementRef}>
// //                 <div className="div-block-40" ref={roundOverlayRef} />
// //                 <div className="videoclass">
// //                   <video
// //                     autoPlay loop muted playsInline
// //                     poster="https://cdn.prod.website-files.com/669a8d6498ba88c08dfd2cd2%2F66ab8740f29f169f743966e6_669a8d6498ba88c08dfd2cd2_66a787ab53235ab6968a788f_on%20site-transcode-poster-00001.jpg"
// //                   >
// //                     <source src="Videos/Video2.mp4" type="video/mp4" />
// //                     <source
// //                       src="https://cdn.prod.website-files.com/669a8d6498ba88c08dfd2cd2%2F66ab8740f29f169f743966e6_669a8d6498ba88c08dfd2cd2_66a787ab53235ab6968a788f_on%20site-transcode-transcode.webm"
// //                       type="video/webm"
// //                     />
// //                     Your browser does not support the video tag.
// //                   </video>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ===== VIDEO SHOWCASE SECTION (SECOND SECTION) ===== */}
// //       <section ref={showcaseSectionRef} className="video-showcase-section">
// //         <div ref={showcaseCircleRef} className="showcase-circle" />

// //         {/* Commented out content as per original */}
// //         {/* <div className="showcase-content">
// //           <div ref={showcaseSubtitleRef} className="found-in-stores">FOUND IN STORES</div>
// //           <h1 ref={showcaseTitleRef} className="spylt-title">MPACT</h1>
// //           <div ref={productNameRef} className="product-name">CAFFEINATED VANILLA MILKSHAKE 20g</div>
// //           <div ref={productDetailsRef} className="product-details">90 00g</div>
// //           <div ref={namesContainerRef} className="names-section">
// //             {names.map((name, i) => <div key={i} className="name-item">{name}</div>)}
// //           </div>
// //           <button ref={exploreBtnRef} className="explore-btn">EXPLORE ALL</button>
// //         </div> */}

// //         {/*
// //           Cards:
// //           • Mobile  → Each card animates in one-by-one as the user scrolls,
// //                        landing in an overlapping deck. Card 0 first (back),
// //                        card 1 second (middle), card 2 last (front/top).
// //           • Desktop → Spread out horizontally as before (UNCHANGED).
// //         */}
// //         {displayVideos.map((v, i) => (
// //           <div
// //             key={v._id}
// //             ref={(el) => (showcaseCardsRef.current[i] = el)}
// //             className="video-card"
// //             onMouseEnter={() => handleMouseEnter(i)}
// //             onMouseLeave={() => handleMouseLeave(i)}
// //             onClick={() => handleVideoClick(v)}
// //             style={{ transform: "translate(-50%, -50%)" }}
// //           >
// //             <video
// //               ref={(el) => (videoRefs.current[i] = el)}
// //               src={v.videoUrl}
// //               muted
// //               playsInline
// //               loop={false}
// //             />
// //           </div>
// //         ))}
// //       </section>

// //       {/* ===== VIDEO MODAL ===== */}
// //       {showVideoModal && selectedVideo && (
// //         <div className="video-modal-overlay" onClick={closeModal}>
// //           <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
// //             <button className="modal-close-btn" onClick={closeModal} aria-label="Close video">
// //               ×
// //             </button>
// //             {selectedVideo.videoUrl.includes("youtube") || selectedVideo.videoUrl.includes("youtu.be") ? (
// //               <iframe
// //                 src={selectedVideo.videoUrl}
// //                 title="YouTube video player"
// //                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //                 allowFullScreen
// //               />
// //             ) : (
// //               <video src={selectedVideo.videoUrl} controls autoPlay playsInline />
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }





// // // VideoShowcaseSection.jsx
// // import React, { useEffect, useRef, useState } from "react";
// // import axios from "axios";
// // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import SplitType from "split-type";
// // import api from "../api/axios";

// // gsap.registerPlugin(ScrollTrigger);

// // // Enhanced position presets with tilts for different screen sizes - left to right layout
// // const positionPresets = {
// //   desktop: [
// //     { x: -600, y: 20, rotate: -8, scale: 0.9 },
// //     { x: -320, y: 10, rotate: -4, scale: 0.95 },
// //     { x: -40, y: 0, rotate: 0, scale: 1 },
// //     { x: 240, y: 10, rotate: 4, scale: 0.95 },
// //     { x: 520, y: 20, rotate: 8, scale: 0.9 },
// //   ],
// //   laptop: [
// //     { x: -480, y: 15, rotate: -7, scale: 0.85 },
// //     { x: -250, y: 8, rotate: -3.5, scale: 0.9 },
// //     { x: -20, y: 0, rotate: 0, scale: 0.95 },
// //     { x: 210, y: 8, rotate: 3.5, scale: 0.9 },
// //     { x: 440, y: 15, rotate: 7, scale: 0.85 },
// //   ],
// //   tablet: [
// //     { x: -350, y: 12, rotate: -6, scale: 0.8 },
// //     { x: -150, y: 6, rotate: -3, scale: 0.85 },
// //     { x: 50, y: 0, rotate: 0, scale: 0.9 },
// //     { x: 250, y: 6, rotate: 3, scale: 0.85 },
// //     { x: 450, y: 12, rotate: 6, scale: 0.8 },
// //   ],

// //   // ── MOBILE: final resting positions for the overlapping deck ──
// //   mobile: [
// //     { x: -25, y: -20, rotate: -10, scale: 1.0, zIndex: 8 },  // card 0 – behind, tilted left
// //     { x: 0, y: 5, rotate: 5, scale: 1.0, zIndex: 10 },       // card 1 – middle
// //     { x: 25, y: 30, rotate: 14, scale: 1.0, zIndex: 12 },    // card 2 – front, tilted right
// //   ],
// //   mobileSmall: [
// //     { x: -20, y: -15, rotate: -10, scale: 1.0, zIndex: 8 },
// //     { x: 0, y: 5, rotate: 5, scale: 1.0, zIndex: 10 },
// //     { x: 20, y: 25, rotate: 14, scale: 1.0, zIndex: 12 },
// //   ],
// // };

// // export default function VideoShowcaseSection() {
// //   // Refs for RoundVideo section (first)
// //   const roundSectionRef = useRef(null);
// //   const roundCircleRef = useRef(null);
// //   const roundElementRef = useRef(null);
// //   const roundOverlayRef = useRef(null);
// //   const roundButtonRef = useRef(null);
// //   const roundWrapRef = useRef(null);

// //   // Refs for VideoShowcase section (second)
// //   const showcaseSectionRef = useRef(null);
// //   const showcaseCircleRef = useRef(null);
// //   const showcaseCardsRef = useRef([]);
// //   const videoRefs = useRef([]);
// //   const showcaseTitleRef = useRef(null);
// //   const showcaseSubtitleRef = useRef(null);
// //   const productNameRef = useRef(null);
// //   const productDetailsRef = useRef(null);
// //   const namesContainerRef = useRef(null);
// //   const exploreBtnRef = useRef(null);

// //   const [videos, setVideos] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [screenSize, setScreenSize] = useState("desktop");
// //   const [showVideoModal, setShowVideoModal] = useState(false);
// //   const [selectedVideo, setSelectedVideo] = useState(null);
// //   const [hoveredIndex, setHoveredIndex] = useState(null);

// //   const names = ["Andrew", "Bryan", "Chris", "Devante"];

// //   const isMobileView = (s) => s === "mobile" || s === "mobileSmall";

// //   // ── video hover ──
// //   const handleMouseEnter = (i) => { setHoveredIndex(i); videoRefs.current[i]?.play(); };
// //   const handleMouseLeave = (i) => { setHoveredIndex(null); videoRefs.current[i]?.pause(); };

// //   // ── modal ──
// //   const handleVideoClick = (v) => { setSelectedVideo(v); setShowVideoModal(true); };
// //   const closeModal = () => { setShowVideoModal(false); setSelectedVideo(null); };

// //   // ── screen size ──
// //   useEffect(() => {
// //     const detect = () => {
// //       const w = window.innerWidth;
// //       if (w >= 1920) setScreenSize("desktop");
// //       else if (w >= 1366) setScreenSize("laptop");
// //       else if (w >= 1024) setScreenSize("laptop");
// //       else if (w >= 768) setScreenSize("tablet");
// //       else if (w >= 480) setScreenSize("mobile");
// //       else setScreenSize("mobileSmall");
// //     };
// //     detect();
// //     window.addEventListener("resize", detect);
// //     return () => window.removeEventListener("resize", detect);
// //   }, []);

// //   // ── fetch ──
// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const res = await api.get("/api/videos");
// //         setVideos(res.data || []);
// //       } catch { console.error("Failed to load videos"); }
// //       finally { setLoading(false); }
// //     })();
// //   }, []);

// //   const getDisplayConfig = () => {
// //     const presets = positionPresets[screenSize] || positionPresets.desktop;
// //     const videoCount = isMobileView(screenSize) ? 3 : presets.length;
// //     return { presets, videoCount };
// //   };

// //   // ── GSAP ──
// //   useEffect(() => {
// //     if (!videos.length) return;

// //     const ctx = gsap.context(() => {
// //       const { presets, videoCount } = getDisplayConfig();
// //       const displayVideos = videos.slice(0, videoCount);
// //       const mobile = isMobileView(screenSize);

// //       /* ══════════════════════════════════════════════
// //          SECTION 1 – Round expanding circle (UNCHANGED)
// //       ══════════════════════════════════════════════ */
// //       ScrollTrigger.create({
// //         trigger: roundWrapRef.current,
// //         start: "top top",
// //         end: "bottom bottom",
// //         pin: roundCircleRef.current,
// //         pinSpacing: false,
// //         scrub: 0.5,
// //       });

// //       const circleSizes = {
// //         mobileSmall: { start: "35vw", end: "200vw" },
// //         mobile: { start: "30vw", end: "180vw" },
// //         tablet: { start: "15vw", end: "160vw" },
// //         laptop: { start: "12vw", end: "150vw" },
// //         desktop: { start: "10vw", end: "150vw" },
// //       }[screenSize] || { start: "10vw", end: "150vw" };

// //       gsap.fromTo(
// //         roundElementRef.current,
// //         { width: circleSizes.start, height: circleSizes.start, borderRadius: "50%", scale: 1, opacity: 1 },
// //         {
// //           width: circleSizes.end, height: circleSizes.end, borderRadius: "50%",
// //           scale: mobile ? 1.1 : 1.2, opacity: mobile ? 0.95 : 0.9, ease: "none",
// //           scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
// //         }
// //       );

// //       gsap.fromTo(
// //         roundOverlayRef.current,
// //         { opacity: mobile ? 0.2 : 0.3 },
// //         {
// //           opacity: mobile ? 0.7 : 0.8, ease: "none",
// //           scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8 }
// //         }
// //       );

// //       gsap.fromTo(
// //         roundButtonRef.current,
// //         { opacity: 1, scale: 1 },
// //         {
// //           opacity: 0, scale: mobile ? 1.3 : 1.5, ease: "none",
// //           scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: mobile ? "30% center" : "center center", scrub: 0.8 }
// //         }
// //       );

// //       /* ══════════════════════════════════════════════
// //          SECTION 2 – Video showcase
// //       ══════════════════════════════════════════════ */

// //       if (mobile) {
// //         /* ─────────────────────────────────────────────────────────────
// //            MOBILE – one-by-one scroll-driven card drop into a deck
// //         ───────────────────────────────────────────────────────────── */

// //         // Total scroll distance for the pinned section
// //         const totalEnd = "+=280%";

// //         // Pin the section
// //         ScrollTrigger.create({
// //           trigger: showcaseSectionRef.current,
// //           start: "top top",
// //           end: totalEnd,
// //           pin: true,
// //           scrub: true,
// //         });

// //         // Yellow circle expands over first 40% of the scroll
// //         gsap.fromTo(
// //           showcaseCircleRef.current,
// //           { width: "20vw", height: "20vw", borderRadius: "50%", opacity: 0.8 },
// //           {
// //             width: "220vw", height: "220vw", borderRadius: "110vw", opacity: 1,
// //             ease: "none",
// //             scrollTrigger: {
// //               trigger: showcaseSectionRef.current,
// //               start: "top top",
// //               end: totalEnd,
// //               scrub: true,
// //               containerAnimation: undefined,
// //             },
// //           }
// //         );

// //         // ── Set every card's initial state: hidden, centred, scaled down ──
// //         showcaseCardsRef.current.forEach((card, i) => {
// //           if (!card || i >= displayVideos.length) return;
// //           const pos = presets[i];
// //           gsap.set(card, {
// //             x: 0,
// //             y: -60,          // start slightly above centre
// //             rotation: 0,
// //             scale: 0.6,
// //             opacity: 0,
// //             zIndex: pos.zIndex ?? 10,
// //           });
// //         });

// //         // Create master timeline for card animations
// //         const masterTl = gsap.timeline();

// //         displayVideos.forEach((_, i) => {
// //           const card = showcaseCardsRef.current[i];
// //           if (!card) return;
// //           const pos = presets[i];
// //           const slotStart = i * (1 / 3);         // 0, 0.33, 0.66
// //           const slotEnd = slotStart + 1 / 3;     // 0.33, 0.66, 1.0

// //           masterTl.fromTo(
// //             card,
// //             { x: 0, y: -60, rotation: 0, scale: 0.6, opacity: 0 },
// //             {
// //               x: pos.x,
// //               y: pos.y,
// //               rotation: pos.rotate,
// //               scale: pos.scale,
// //               opacity: 1,
// //               ease: "power3.out",
// //               duration: (slotEnd - slotStart) * 0.6,
// //             },
// //             slotStart
// //           );
// //         });

// //         ScrollTrigger.create({
// //           trigger: showcaseSectionRef.current,
// //           start: "top top",
// //           end: totalEnd,
// //           scrub: 0.6,
// //           animation: masterTl,
// //         });

// //       } else {
// //         /* ─────────────────────────────────────────────────────────────
// //            DESKTOP / TABLET – original behaviour (UNCHANGED)
// //         ───────────────────────────────────────────────────────────── */
// //         const showcaseTl = gsap.timeline({
// //           scrollTrigger: {
// //             trigger: showcaseSectionRef.current,
// //             start: "top top",
// //             end: "+=220%",
// //             scrub: true,
// //             pin: true,
// //           },
// //         });

// //         showcaseTl.fromTo(
// //           showcaseCircleRef.current,
// //           { width: "12vw", height: "12vw", borderRadius: "50%", opacity: 0.8 },
// //           { width: "150vw", height: "150vw", borderRadius: "75vw", opacity: 1 },
// //           0
// //         );

// //         showcaseCardsRef.current.forEach((card, i) => {
// //           if (card && i < displayVideos.length) {
// //             const pos = presets[i % presets.length];
// //             gsap.set(card, { x: pos.x, y: pos.y, rotation: pos.rotate, scale: 0.3, opacity: 0 });
// //           }
// //         });

// //         showcaseTl.to(
// //           showcaseCardsRef.current.filter(Boolean),
// //           {
// //             opacity: 1,
// //             scale: (i) => presets[i % presets.length].scale,
// //             rotation: (i) => presets[i % presets.length].rotate,
// //             stagger: 0.15, duration: 1.2, ease: "power2.out",
// //           },
// //           0.2
// //         );
// //       }

// //       // ── title, names, button (unchanged) ──
// //       const titleEls = [showcaseSubtitleRef, showcaseTitleRef, productNameRef, productDetailsRef]
// //         .map((r) => r.current).filter(Boolean);
// //       if (titleEls.length) {
// //         gsap.fromTo(titleEls, { y: 50, opacity: 0 }, {
// //           y: 0, opacity: 1, stagger: 0.1, duration: 1,
// //           scrollTrigger: { trigger: showcaseSectionRef.current, start: "top 30%", end: "top 10%", scrub: true },
// //         });
// //       }
// //       if (namesContainerRef.current) {
// //         gsap.fromTo([...namesContainerRef.current.children], { y: 30, opacity: 0 }, {
// //           y: 0, opacity: 1, stagger: 0.08, duration: 1,
// //           scrollTrigger: { trigger: showcaseSectionRef.current, start: "top 20%", end: "top 0%", scrub: true },
// //         });
// //       }
// //       if (exploreBtnRef.current) {
// //         gsap.fromTo(exploreBtnRef.current, { y: 30, opacity: 0, scale: 0.9 }, {
// //           y: 0, opacity: 1, scale: 1, duration: 1,
// //           scrollTrigger: { trigger: showcaseSectionRef.current, start: "top 15%", end: "top -5%", scrub: true },
// //         });
// //       }
// //     });

// //     ScrollTrigger.refresh();
// //     const onResize = () => setTimeout(() => ScrollTrigger.refresh(), 100);
// //     window.addEventListener("resize", onResize);
// //     return () => { ctx.revert(); window.removeEventListener("resize", onResize); };
// //   }, [videos, screenSize]);

// //   const handlePlayClick = (e) => {
// //     e.preventDefault();
// //     setSelectedVideo({ videoUrl: "https://www.youtube.com/embed/YFNSDdrElfc?si=iSaKNmIlM-sx7JSf?autoplay=1" });
// //     setShowVideoModal(true);
// //   };

// //   if (loading) return null;

// //   const { presets, videoCount } = getDisplayConfig();
// //   const displayVideos = videos.slice(0, videoCount);
// //   const mobile = isMobileView(screenSize);

// //   return (
// //     <>
// //       <style>{`
// //         /* ===== BASE ===== */
// //         * { box-sizing: border-box; margin: 0; padding: 0; }

// //         /* ===== ROUND VIDEO SECTION (FIRST) ===== */
// //         .round-video-section {
// //           position: relative; background-color: #523122;
// //           overflow: hidden; width: 100%; z-index: 10;
// //         }
// //         .cont { position: relative; width: 100%; max-width: 100%; margin: 0 auto; }

// //         .sticky-circle_wrap { 
// //           position: relative; 
// //           width: 100%; 
// //           height: clamp(120vh, 180vh, 250vh);
// //         }
// //         @media (min-width: 1920px) { .sticky-circle_wrap { height: 250vh; } }
// //         @media (max-width: 1366px) { .sticky-circle_wrap { height: 200vh; } }
// //         @media (max-width: 1024px) { .sticky-circle_wrap { height: 180vh; } }
// //         @media (max-width: 768px) { .sticky-circle_wrap { height: 150vh; } }
// //         @media (max-width: 480px) { .sticky-circle_wrap { height: 120vh; } }

// //         .sticky-circle {
// //           position: relative; display: flex; align-items: center;
// //           justify-content: center; width: 100%; height: 100vh; will-change: transform;
// //         }
// //         .sticky-circle_element {
// //           border-radius: 50%; overflow: hidden; position: relative;
// //           box-shadow: 0 0 min(30px,3vw) rgba(0,0,0,0.3);
// //           will-change: width,height,border-radius,scale,opacity;
// //           transition: box-shadow 0.3s ease;
// //           width: clamp(80px,10vw,200px); height: clamp(80px,10vw,200px);
// //         }
// //         .sticky-circle_element:hover { box-shadow: 0 0 min(50px,5vw) rgba(0,0,0,0.5); }
// //         @media (max-width: 768px) {
// //           .sticky-circle_element { width: clamp(100px,30vw,180px); height: clamp(100px,30vw,180px); }
// //         }
// //         @media (max-width: 480px) {
// //           .sticky-circle_element { width: clamp(120px,35vw,160px); height: clamp(120px,35vw,160px); }
// //         }

// //         .div-block-40 {
// //           position: absolute; inset: 0; background: rgba(0,0,0,0.3);
// //           z-index: 2; pointer-events: none; will-change: opacity;
// //         }
// //         .videoclass { width: 100%; height: 100%; position: relative; z-index: 1; }
// //         .videoclass video { width: 100%; height: 100%; object-fit: cover; display: block; }

// //         .lightbox-link {
// //           position: absolute; top: 50%; left: 50%;
// //           transform: translate(-50%,-50%); z-index: 10; text-decoration: none; cursor: pointer;
// //         }
// //         .light-button.absolute {
// //           border-radius: 50%; position: relative; display: flex;
// //           align-items: center; justify-content: center;
// //           transition: all 0.3s ease; will-change: opacity,scale;
// //           background: transparent; cursor: pointer;
// //           width: clamp(80px,12vw,200px); height: clamp(80px,12vw,200px);
// //         }
// //         @media (max-width: 768px) {
// //           .light-button.absolute { width: clamp(100px,25vw,180px); height: clamp(100px,25vw,180px); }
// //         }
// //         @media (max-width: 480px) {
// //           .light-button.absolute { width: clamp(120px,35vw,160px); height: clamp(120px,35vw,160px); }
// //         }
// //         .circular-bg {
// //           position: absolute; width: 100%; height: 100%;
// //           border-radius: 50%; background: rgba(0,0,0,0.7);
// //           z-index: 1; transition: background 0.3s ease;
// //         }
// //         .play-icon {
// //           z-index: 3; color: white; display: flex; align-items: center;
// //           justify-content: center; transition: transform 0.3s ease;
// //           width: clamp(20px,4vw,60px); height: clamp(20px,4vw,60px);
// //         }
// //         .play-icon::after { content: "▶"; font-size: clamp(16px,3vw,45px); }
// //         .circular-text-svg {
// //           width: 100%; height: 100%; position: absolute; z-index: 2;
// //           animation: rotateText 20s linear infinite;
// //         }
// //         @keyframes rotateText { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
// //         .circular-text-svg text {
// //           font-weight: 700; fill: rgba(255,255,255,0.9); text-transform: uppercase;
// //           letter-spacing: 0.15em; font-size: clamp(6px,1.2vw,16px);
// //         }
// //         @media (max-width: 480px) { .circular-text-svg text { font-size: clamp(8px,2.5vw,12px); } }
// //         .light-button.absolute:hover .play-icon::after { transform: scale(1.2); }
// //         .light-button.absolute:hover .circular-bg { background: rgba(0,0,0,0.85); }

// //         /* ===== VIDEO SHOWCASE SECTION (SECOND) ===== */
// //         .video-showcase-section {
// //           min-height: 100vh; background: #000; position: relative;
// //           overflow: hidden; z-index: 20; color: white;
// //         }
// //         .showcase-circle {
// //           position: absolute; top: 50%; left: 50%;
// //           transform: translate(-50%,-50%); background: #FFD700;
// //           z-index: 1; border-radius: 50%;
// //           will-change: width,height; opacity: 0.9;
// //         }

// //         /* ── Desktop / Tablet cards (UNCHANGED) ── */
// //         .video-card {
// //           position: absolute; top: 50%; left: 50%;
// //           border-radius: clamp(8px,1.5vw,16px); overflow: hidden;
// //           box-shadow: 0 20px 40px rgba(0,0,0,0.6); z-index: 10;
// //           border: 2px solid rgba(255,215,0,0.3);
// //           width: clamp(140px,18vw,280px); aspect-ratio: 9/16;
// //           cursor: pointer; transition: border-color 0.2s ease;
// //         }
        
// //         /* Desktop hover effect */
// //         @media (min-width: 768px) {
// //           .video-card:hover {
// //             border-color: #FFD700;
// //             transform: translate(-50%,-50%) scale(1.02);
// //           }
// //         }
        
// //         @media (min-width: 1920px) { .video-card { width: 280px; } }
// //         @media (max-width: 1366px) { .video-card { width: 240px; } }
// //         @media (max-width: 1024px) { .video-card { width: 200px; } }

// //         /* ══════════════════════════════════════
// //            MOBILE CARD STYLES - FULLY RESPONSIVE
// //         ══════════════════════════════════════ */
// //         @media (max-width: 767px) {
// //           .video-card {
// //             /* Responsive width based on screen size */
// //             width: clamp(180px, 55vw, 260px);
// //             border-radius: clamp(12px, 4vw, 20px);
// //             box-shadow: 0 20px 40px rgba(0,0,0,0.8);
// //             border: 2px solid rgba(255,215,0,0.25);
// //             /* Remove transform transition to avoid conflicts with GSAP */
// //             transition: border-color 0.2s ease;
// //             /* Ensure cards stay within viewport */
// //             max-width: calc(100vw - 40px);
// //           }
          
// //           /* Smaller phones */
// //           @media (max-width: 480px) {
// //             .video-card {
// //               width: clamp(160px, 65vw, 220px);
// //             }
// //           }
          
// //           /* Very small phones */
// //           @media (max-width: 360px) {
// //             .video-card {
// //               width: clamp(140px, 70vw, 200px);
// //             }
// //           }
          
// //           /* Landscape orientation */
// //           @media (orientation: landscape) and (max-height: 600px) {
// //             .video-card {
// //               width: clamp(120px, 35vh, 180px);
// //             }
// //           }
          
// //           /* Disable hover transform on mobile */
// //           .video-card:hover {
// //             transform: translate(-50%,-50%);
// //             border-color: rgba(255,215,0,0.4);
// //           }
// //         }

// //         .video-card video { 
// //           width: 100%; 
// //           height: 100%; 
// //           object-fit: cover;
// //           pointer-events: none; /* Prevents video from interfering with clicks */
// //         }

// //         /* ── Text / UI (unchanged but with responsive improvements) ── */
// //         .showcase-content {
// //           position: relative; z-index: 5; height: 100vh; width: 100%;
// //           display: flex; flex-direction: column; justify-content: center;
// //           align-items: center; padding: clamp(1rem, 3vw, 2rem); text-align: center;
// //           pointer-events: none; /* Allows clicks to pass through to cards */
// //         }
        
// //         .found-in-stores {
// //           font-size: clamp(1rem, 2vw, 1.8rem); font-weight: 600; color: #FFD700;
// //           text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: clamp(0.5rem, 1.5vw, 1rem);
// //           border-bottom: 2px solid #FFD700; padding-bottom: 0.5rem; display: inline-block;
// //         }
// //         .spylt-title {
// //           font-size: clamp(2.5rem, 8vw, 8rem); font-weight: 900; color: white;
// //           text-transform: uppercase; letter-spacing: 0.1em; line-height: 1;
// //           margin-bottom: clamp(0.25rem, 1vw, 0.5rem); text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
// //         }
// //         .product-name {
// //           font-size: clamp(1rem, 3vw, 2.5rem); font-weight: 700; color: white;
// //           text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.2; 
// //           margin-bottom: 0.25rem; padding: 0 clamp(0.5rem, 2vw, 1rem);
// //         }
// //         .product-details {
// //           font-size: clamp(0.9rem, 2.5vw, 2rem); color: #FFD700;
// //           font-weight: 600; margin-top: 0.25rem; letter-spacing: 0.05em;
// //         }
// //         .names-section {
// //           display: flex; flex-wrap: wrap; justify-content: center;
// //           gap: clamp(1rem, 4vw, 4rem); margin: clamp(1rem, 3vw, 2.5rem) 0;
// //           padding: 0 clamp(0.5rem, 2vw, 1rem);
// //         }
// //         .name-item {
// //           font-size: clamp(1rem, 2.5vw, 2.2rem); font-weight: 700; color: white;
// //           text-transform: uppercase; letter-spacing: 0.1em;
// //           position: relative; padding: 0 0.5rem; cursor: default;
// //           white-space: nowrap;
// //         }
// //         @media (max-width: 480px) {
// //           .name-item {
// //             font-size: clamp(0.9rem, 4vw, 1.3rem);
// //           }
// //           .names-section {
// //             gap: clamp(0.75rem, 3vw, 1.5rem);
// //           }
// //         }
        
// //         .name-item::after {
// //           content: ""; position: absolute; bottom: -5px; left: 0;
// //           width: 100%; height: 2px; background: #FFD700;
// //           transform: scaleX(0); transition: transform 0.3s ease;
// //         }
// //         .name-item:hover::after { transform: scaleX(1); }
        
// //         .explore-btn {
// //           background: transparent; border: 2px solid #FFD700; color: #FFD700;
// //           font-size: clamp(1rem, 2vw, 1.8rem); font-weight: 700; text-transform: uppercase;
// //           letter-spacing: 0.15em; padding: clamp(0.5rem, 1.5vw, 1.2rem) clamp(1.5rem, 5vw, 4rem);
// //           cursor: pointer; transition: all 0.3s ease; margin-top: clamp(0.75rem, 2vw, 1.5rem);
// //           border-radius: 50px; text-decoration: none; display: inline-block;
// //           pointer-events: auto; /* Re-enable pointer events for button */
// //         }
// //         .explore-btn:hover {
// //           background: #FFD700; color: #000;
// //           transform: translateY(-3px); box-shadow: 0 10px 20px rgba(255,215,0,0.3);
// //         }
// //         @media (max-width: 480px) {
// //           .explore-btn {
// //             font-size: clamp(0.9rem, 4vw, 1.2rem);
// //             padding: 0.5rem 1.5rem;
// //           }
// //         }

// //         /* ===== MODAL ===== */
// //         .video-modal-overlay {
// //           position: fixed; inset: 0; background: rgba(0,0,0,0.98);
// //           display: flex; align-items: center; justify-content: center;
// //           z-index: 1000; animation: fadeIn 0.3s ease; padding: clamp(10px,3vw,30px);
// //         }
// //         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// //         .video-modal-content {
// //           position: relative; width: 100%; max-width: min(1200px,90vw);
// //           aspect-ratio: 16/9; animation: slideUp 0.3s ease;
// //         }
// //         @keyframes slideUp {
// //           from { transform: translateY(min(30px,3vh)); opacity: 0; }
// //           to { transform: translateY(0); opacity: 1; }
// //         }
// //         .video-modal-content iframe,
// //         .video-modal-content video {
// //           width: 100%; height: 100%; border: none; border-radius: clamp(4px,1vw,8px);
// //         }
// //         .modal-close-btn {
// //           position: absolute; top: clamp(-40px,-5vh,-30px); right: 0;
// //           background: white; color: #523122; border: none; border-radius: 50%;
// //           font-size: clamp(20px,3vw,24px); cursor: pointer; display: flex;
// //           align-items: center; justify-content: center; transition: all 0.3s ease;
// //           box-shadow: 0 2px 10px rgba(0,0,0,0.2);
// //           width: clamp(32px,5vw,44px); height: clamp(32px,5vw,44px);
// //         }
// //         .modal-close-btn:hover { background: #523122; color: white; transform: scale(1.1); }

// //         /* Landscape orientation improvements */
// //         @media (orientation: landscape) and (max-height: 600px) {
// //           .sticky-circle_wrap { height: 150vh; }
// //           .showcase-content {
// //             padding: 0.5rem;
// //           }
// //           .names-section {
// //             margin: 0.5rem 0;
// //             gap: 1rem;
// //           }
// //           .explore-btn {
// //             margin-top: 0.5rem;
// //             padding: 0.4rem 1.5rem;
// //           }
// //         }

// //         /* Safari performance optimization */
// //         @supports (-webkit-touch-callout: none) {
// //           .sticky-circle_element, .video-card, .showcase-circle { 
// //             transform: translateZ(0); 
// //           }
// //         }

// //         /* Reduced motion */
// //         @media (prefers-reduced-motion: reduce) {
// //           .sticky-circle_element, .light-button.absolute, .div-block-40,
// //           .showcase-circle, .video-card, .circular-text-svg {
// //             transition: none !important; animation: none !important;
// //           }
// //         }

// //         /* Touch device optimizations */
// //         @media (hover: none) and (pointer: coarse) {
// //           .video-card { border-color: rgba(255,215,0,0.3); }
// //           .explore-btn:hover { 
// //             background: transparent; 
// //             color: #FFD700; 
// //             transform: none; 
// //             box-shadow: none; 
// //           }
// //           .name-item::after {
// //             display: none; /* Remove hover effect on touch devices */
// //           }
// //         }

// //         /* Ensure cards are clickable on mobile */
// //         @media (max-width: 767px) {
// //           .video-card {
// //             cursor: pointer;
// //             -webkit-tap-highlight-color: rgba(255,215,0,0.3);
// //           }
// //           .video-card:active {
// //             border-color: #FFD700;
// //           }
// //         }
// //       `}</style>

// //       {/* ===== ROUND VIDEO SECTION (FIRST SECTION) ===== */}
// //       <div className="round-video-section" ref={roundSectionRef}>
// //         <div className="cont">
// //           <div className="sticky-circle_wrap" ref={roundWrapRef}>
// //             <div className="sticky-circle" ref={roundCircleRef}>
// //               <a
// //                 href="#"
// //                 className="lightbox-link w-inline-block w-lightbox"
// //                 onClick={handlePlayClick}
// //                 aria-label="Play video"
// //               >
// //                 <div className="light-button absolute" ref={roundButtonRef}>
// //                   <div className="circular-bg" />
// //                   <svg
// //                     className="circular-text-svg"
// //                     viewBox="0 0 200 200"
// //                     preserveAspectRatio="xMidYMid meet"
// //                     style={{ position: "absolute", width: "100%", height: "100%", zIndex: 2 }}
// //                   >
// //                     <defs>
// //                       <path
// //                         id="circlePath"
// //                         d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
// //                         fill="none"
// //                       />
// //                     </defs>
// //                     <text>
// //                       <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
// //                         PLAY VIDEO • PLAY VIDEO • PLAY VIDEO •
// //                       </textPath>
// //                     </text>
// //                   </svg>
// //                   <div className="play-icon" aria-hidden="true" />
// //                 </div>
// //               </a>

// //               <div className="sticky-circle_element" ref={roundElementRef}>
// //                 <div className="div-block-40" ref={roundOverlayRef} />
// //                 <div className="videoclass">
// //                   <video
// //                     autoPlay loop muted playsInline
// //                     poster="https://cdn.prod.website-files.com/669a8d6498ba88c08dfd2cd2%2F66ab8740f29f169f743966e6_669a8d6498ba88c08dfd2cd2_66a787ab53235ab6968a788f_on%20site-transcode-poster-00001.jpg"
// //                   >
// //                     <source src="Videos/Video2.mp4" type="video/mp4" />
// //                     <source
// //                       src="https://cdn.prod.website-files.com/669a8d6498ba88c08dfd2cd2%2F66ab8740f29f169f743966e6_669a8d6498ba88c08dfd2cd2_66a787ab53235ab6968a788f_on%20site-transcode-transcode.webm"
// //                       type="video/webm"
// //                     />
// //                     Your browser does not support the video tag.
// //                   </video>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ===== VIDEO SHOWCASE SECTION (SECOND SECTION) ===== */}
// //       <section ref={showcaseSectionRef} className="video-showcase-section">
// //         <div ref={showcaseCircleRef} className="showcase-circle" />

// //         {/* Commented out content as per original */}
// //         {/* <div className="showcase-content">
// //           <div ref={showcaseSubtitleRef} className="found-in-stores">FOUND IN STORES</div>
// //           <h1 ref={showcaseTitleRef} className="spylt-title">MPACT</h1>
// //           <div ref={productNameRef} className="product-name">CAFFEINATED VANILLA MILKSHAKE 20g</div>
// //           <div ref={productDetailsRef} className="product-details">90 00g</div>
// //           <div ref={namesContainerRef} className="names-section">
// //             {names.map((name, i) => <div key={i} className="name-item">{name}</div>)}
// //           </div>
// //           <button ref={exploreBtnRef} className="explore-btn">EXPLORE ALL</button>
// //         </div> */}

// //         {displayVideos.map((v, i) => (
// //           <div
// //             key={v._id}
// //             ref={(el) => (showcaseCardsRef.current[i] = el)}
// //             className="video-card"
// //             onMouseEnter={() => !mobile && handleMouseEnter(i)}
// //             onMouseLeave={() => !mobile && handleMouseLeave(i)}
// //             onClick={() => handleVideoClick(v)}
// //             style={{ 
// //               transform: "translate(-50%, -50%)",
// //               zIndex: mobile && presets[i] ? presets[i].zIndex : 10
// //             }}
// //           >
// //             <video
// //               ref={(el) => (videoRefs.current[i] = el)}
// //               src={v.videoUrl}
// //               muted
// //               playsInline
// //               loop={false}
// //               preload="metadata"
// //             />
// //           </div>
// //         ))}
// //       </section>

// //       {/* ===== VIDEO MODAL ===== */}
// //       {showVideoModal && selectedVideo && (
// //         <div className="video-modal-overlay" onClick={closeModal}>
// //           <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
// //             <button className="modal-close-btn" onClick={closeModal} aria-label="Close video">
// //               ×
// //             </button>
// //             {selectedVideo.videoUrl.includes("youtube") || selectedVideo.videoUrl.includes("youtu.be") ? (
// //               <iframe
// //                 src={selectedVideo.videoUrl}
// //                 title="YouTube video player"
// //                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //                 allowFullScreen
// //               />
// //             ) : (
// //               <video src={selectedVideo.videoUrl} controls autoPlay playsInline />
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }


// // // VideoShowcaseSection.jsx
// // import React, { useEffect, useRef, useState } from "react";
// // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import api from "../api/axios";

// // gsap.registerPlugin(ScrollTrigger);

// // /* ─────────────────────────────────────────────────────────────────────────────
// //    FAN LAYOUT — cards centred closer together so they're always in the
// //    viewport. Smaller x-spread than before.
// //    Desktop: 7 cards   Tablet: 7 cards   Mobile: 3 cards (overlapping deck)
// // ───────────────────────────────────────────────────────────────────────────── */
// // const FAN_PRESETS = {
// //   // Desktop: larger scale, raised higher (y values shifted up ~10vh)
// //   desktop: [
// //     { x: -32, y: -8, rotate: -20, scale: 0.92, zIndex: 4 },
// //     { x: -21, y: -11, rotate: -12, scale: 0.96, zIndex: 5 },
// //     { x: -10, y: -13, rotate: -5, scale: 1.02, zIndex: 6 },
// //     { x: 0,   y: -15, rotate: 0,  scale: 1.08, zIndex: 7 },
// //     { x: 10,  y: -13, rotate: 5,  scale: 1.02, zIndex: 6 },
// //     { x: 21,  y: -11, rotate: 12, scale: 0.96, zIndex: 5 },
// //     { x: 32,  y: -8,  rotate: 20, scale: 0.92, zIndex: 4 },
// //   ],
// //   laptop: [
// //     { x: -30, y: -7, rotate: -19, scale: 0.90, zIndex: 4 },
// //     { x: -20, y: -10, rotate: -11, scale: 0.95, zIndex: 5 },
// //     { x: -9,  y: -12, rotate: -4, scale: 1.00, zIndex: 6 },
// //     { x: 0,   y: -14, rotate: 0,  scale: 1.05, zIndex: 7 },
// //     { x: 9,   y: -12, rotate: 4,  scale: 1.00, zIndex: 6 },
// //     { x: 20,  y: -10, rotate: 11, scale: 0.95, zIndex: 5 },
// //     { x: 30,  y: -7,  rotate: 19, scale: 0.90, zIndex: 4 },
// //   ],
// //   tablet: [
// //     { x: -28, y: -4, rotate: -18, scale: 0.84, zIndex: 4 },
// //     { x: -18, y: -7, rotate: -10, scale: 0.90, zIndex: 5 },
// //     { x: -8,  y: -9, rotate: -4,  scale: 0.96, zIndex: 6 },
// //     { x: 0,   y: -11, rotate: 0,  scale: 1.01, zIndex: 7 },
// //     { x: 8,   y: -9,  rotate: 4,  scale: 0.96, zIndex: 6 },
// //     { x: 18,  y: -7,  rotate: 10, scale: 0.90, zIndex: 5 },
// //     { x: 28,  y: -4,  rotate: 18, scale: 0.84, zIndex: 4 },
// //   ],
// //   // Mobile: ALL videos, one-by-one centred stack
// //   mobile: [
// //     { x: 0, y: 0, rotate: -6, scale: 1.0, zIndex: 4 },
// //     { x: 0, y: 0, rotate:  4, scale: 1.0, zIndex: 5 },
// //     { x: 0, y: 0, rotate: -8, scale: 1.0, zIndex: 6 },
// //     { x: 0, y: 0, rotate:  6, scale: 1.0, zIndex: 7 },
// //     { x: 0, y: 0, rotate: -4, scale: 1.0, zIndex: 8 },
// //     { x: 0, y: 0, rotate:  7, scale: 1.0, zIndex: 9 },
// //     { x: 0, y: 0, rotate:  0, scale: 1.0, zIndex: 10 },
// //   ],
// //   mobileSmall: [
// //     { x: 0, y: 0, rotate: -6, scale: 1.0, zIndex: 4 },
// //     { x: 0, y: 0, rotate:  4, scale: 1.0, zIndex: 5 },
// //     { x: 0, y: 0, rotate: -8, scale: 1.0, zIndex: 6 },
// //     { x: 0, y: 0, rotate:  6, scale: 1.0, zIndex: 7 },
// //     { x: 0, y: 0, rotate: -4, scale: 1.0, zIndex: 8 },
// //     { x: 0, y: 0, rotate:  7, scale: 1.0, zIndex: 9 },
// //     { x: 0, y: 0, rotate:  0, scale: 1.0, zIndex: 10 },
// //   ],
// // };

// // const isMob = (s) => s === "mobile" || s === "mobileSmall";

// // /* ═══════════════════════════════════════════════════════════════════════════ */
// // export default function VideoShowcaseSection() {

// //   /* ── Section 1 refs ── */
// //   const roundSectionRef  = useRef(null);
// //   const roundCircleRef   = useRef(null);
// //   const roundElementRef  = useRef(null);
// //   const roundOverlayRef  = useRef(null);
// //   const roundButtonRef   = useRef(null);
// //   const roundWrapRef     = useRef(null);

// //   /* ── Section 3 refs ── */
// //   const socialSectionRef  = useRef(null);
// //   const socialWrapperRef  = useRef(null);
// //   const socialStickyRef   = useRef(null);
// //   const cardRefs          = useRef([]);
// //   const videoRefs         = useRef([]);

// //   /* ── State ── */
// //   const [videos,     setVideos]     = useState([]);
// //   const [loading,    setLoading]    = useState(true);
// //   const [screenSize, setScreenSize] = useState("desktop");
// //   const [modal,      setModal]      = useState(null);

// //   /* ── Screen size ── */
// //   useEffect(() => {
// //     const detect = () => {
// //       const w = window.innerWidth;
// //       if (w >= 1366)      setScreenSize("desktop");
// //       else if (w >= 1024) setScreenSize("laptop");
// //       else if (w >= 768)  setScreenSize("tablet");
// //       else if (w >= 480)  setScreenSize("mobile");
// //       else                setScreenSize("mobileSmall");
// //     };
// //     detect();
// //     window.addEventListener("resize", detect);
// //     return () => window.removeEventListener("resize", detect);
// //   }, []);

// //   /* ── Fetch API videos ── */
// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const res = await api.get("/api/videos");
// //         setVideos(res.data || []);
// //       } catch { console.error("Failed to load videos"); }
// //       finally   { setLoading(false); }
// //     })();
// //   }, []);

// //   /* ── GSAP ── */
// //   useEffect(() => {
// //     if (!videos.length) return;

// //     const mobile   = isMob(screenSize);
// //     const presets  = FAN_PRESETS[screenSize] || FAN_PRESETS.desktop;
// //     const videoCount = Math.min(videos.length, presets.length);
// //     const dispVids   = videos.slice(0, videoCount);

// //     const ctx = gsap.context(() => {

// //       /* ════════════════════════════════════════
// //          S1 – Expanding circle video (unchanged)
// //       ════════════════════════════════════════ */
// //       if (mobile) {
// //         ScrollTrigger.create({
// //           trigger: roundWrapRef.current, start: "top top", end: "bottom bottom",
// //           pin: roundCircleRef.current, pinSpacing: false,
// //         });
// //         gsap.set(roundElementRef.current, { width: "100vw", height: "100vh", borderRadius: "0%", scale: 1, opacity: 1 });
// //         gsap.set(roundOverlayRef.current, { opacity: 0.5 });
// //         gsap.set(roundButtonRef.current,  { opacity: 1, scale: 1 });
// //       } else {
// //         const sizes = {
// //           tablet:  { s: "15vw", e: "160vw" },
// //           laptop:  { s: "12vw", e: "150vw" },
// //           desktop: { s: "10vw", e: "150vw" },
// //         }[screenSize] || { s: "10vw", e: "150vw" };

// //         ScrollTrigger.create({
// //           trigger: roundWrapRef.current, start: "top top", end: "bottom bottom",
// //           pin: roundCircleRef.current, pinSpacing: false, scrub: 0.5,
// //         });
// //         gsap.fromTo(roundElementRef.current,
// //           { width: sizes.s, height: sizes.s, borderRadius: "50%", scale: 1, opacity: 1 },
// //           {
// //             width: sizes.e, height: sizes.e, borderRadius: "50%", scale: 1.2, opacity: 0.9, ease: "none",
// //             scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true }
// //           }
// //         );
// //         gsap.fromTo(roundOverlayRef.current, { opacity: 0.3 },
// //           {
// //             opacity: 0.8, ease: "none",
// //             scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8 }
// //           }
// //         );
// //         gsap.fromTo(roundButtonRef.current, { opacity: 1, scale: 1 },
// //           {
// //             opacity: 0, scale: 1.5, ease: "none",
// //             scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "center center", scrub: 0.8 }
// //           }
// //         );
// //       }

// //       /* ════════════════════════════════════════
// //          S3 – Combined social + API fan section
// //          FIX: Use xPercent/yPercent=-50 for centering instead of CSS translate.
// //          This is the key fix for iOS Safari — GSAP controls ALL transforms,
// //          so CSS translate(-50%,-50%) never conflicts with GSAP's x/y.
// //       ════════════════════════════════════════ */
// //       if (!socialSectionRef.current || !cardRefs.current.length) return;

// //       ScrollTrigger.create({
// //         trigger:    socialWrapperRef.current,
// //         start:      "top top",
// //         end:        "bottom bottom",
// //         pin:        socialStickyRef.current,
// //         pinSpacing: false,
// //       });

// //       /* 
// //         KEY iOS FIX:
// //         - Remove translate(-50%,-50%) from CSS entirely (done in styles below)
// //         - Set cards at left:50% top:50% in CSS (just the anchor point)
// //         - Use xPercent:-50 / yPercent:-50 in GSAP to handle centering
// //         - Then x/y vw/vh offsets for fan spread work correctly on all browsers
// //       */
// //       cardRefs.current.forEach((card, i) => {
// //         if (!card) return;
// //         gsap.set(card, {
// //           xPercent: -50,          // ← replaces CSS translate(-50%)
// //           yPercent: -50,          // ← replaces CSS translate(-50%)
// //           x: 0,
// //           y: "85vh",              // start below viewport
// //           rotation: 0,
// //           scale: 0.35,
// //           opacity: 0,
// //           zIndex: i + 1,
// //         });
// //       });

// //       const slotW   = 1 / videoCount;
// //       const animDur = slotW * 0.7;
// //       const s3Tl    = gsap.timeline();

// //       dispVids.forEach((_, i) => {
// //         const card = cardRefs.current[i];
// //         if (!card) return;
// //         const pos    = presets[i % presets.length];
// //         const tStart = i * slotW;

// //         s3Tl.to(card,
// //           {
// //             xPercent: -50,          // keep centering offset
// //             yPercent: -50,          // keep centering offset
// //             x:        `${pos.x}vw`,
// //             y:        `${pos.y}vh`,
// //             rotation: pos.rotate,
// //             scale:    pos.scale,
// //             opacity:  1,
// //             ease:     "power3.out",
// //             duration: animDur,
// //           },
// //           tStart
// //         );
// //       });

// //       ScrollTrigger.create({
// //         trigger:   socialWrapperRef.current,
// //         start:     "top top",
// //         end:       "bottom bottom",
// //         scrub:     1,
// //         animation: s3Tl,
// //       });

// //       /* Parallax on big background text lines */
// //       const textLines = socialSectionRef.current.querySelectorAll(".sf-bg-line");
// //       textLines.forEach((line, i) => {
// //         gsap.fromTo(line,
// //           { xPercent: i % 2 === 0 ? -10 : 10 },
// //           {
// //             xPercent: i % 2 === 0 ? 10 : -10,
// //             ease: "none",
// //             scrollTrigger: {
// //               trigger: socialSectionRef.current,
// //               start: "top bottom", end: "bottom top",
// //               scrub: 2,
// //             },
// //           }
// //         );
// //       });
// //     });

// //     ScrollTrigger.refresh();
// //     const onResize = () => setTimeout(() => ScrollTrigger.refresh(), 100);
// //     window.addEventListener("resize", onResize);
// //     return () => { ctx.revert(); window.removeEventListener("resize", onResize); };
// //   }, [videos, screenSize]);

// //   /* ── Derived ── */
// //   const mobile     = isMob(screenSize);
// //   const presets    = FAN_PRESETS[screenSize] || FAN_PRESETS.desktop;
// //   const videoCount = Math.min(videos.length, presets.length);
// //   const dispVids   = videos.slice(0, videoCount);

// //   if (loading) return null;

// //   /* ═══════════════════════════════════════════════════════════════════════ */
// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;700;900&display=swap');
// //         *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

// //         /* ─────────────────────────────────────
// //            S1 – Round expanding video (unchanged)
// //         ───────────────────────────────────── */
// //         .s1 { position:relative; background:#523122; overflow:hidden; width:100%; z-index:10; }
// //         .s1-wrap { position:relative; width:100%; height:200vh; }
// //         @media(max-width:768px){ .s1-wrap{ height:130vh; } }

// //         .s1-sticky { position:relative; display:flex; align-items:center;
// //                      justify-content:center; width:100%; height:100vh; }

// //         .s1-circle { border-radius:50%; overflow:hidden; position:relative;
// //                      will-change:width,height,scale; transition:box-shadow .3s;
// //                      box-shadow:0 0 40px rgba(0,0,0,0.45);
// //                      width:clamp(80px,10vw,180px); height:clamp(80px,10vw,180px); }
// //         @media(max-width:767px){
// //           .s1-circle{ width:100vw!important; height:100vh!important; border-radius:0!important; }
// //         }
// //         .s1-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.3);
// //                       z-index:2; pointer-events:none; }
// //         .s1-vid-wrap { width:100%; height:100%; position:relative; z-index:1; }
// //         .s1-vid-wrap video { width:100%; height:100%; object-fit:cover; display:block; }

// //         .s1-play-link { position:absolute; top:50%; left:50%;
// //                         transform:translate(-50%,-50%); z-index:10;
// //                         cursor:pointer; text-decoration:none; }
// //         .s1-play-btn  { border-radius:50%; position:relative; display:flex;
// //                         align-items:center; justify-content:center; background:transparent;
// //                         cursor:pointer; will-change:opacity,scale;
// //                         width:clamp(80px,12vw,180px); height:clamp(80px,12vw,180px); }
// //         .s1-play-bg   { position:absolute; inset:0; border-radius:50%;
// //                         background:rgba(0,0,0,0.65); z-index:1; transition:background .3s; }
// //         .s1-play-btn:hover .s1-play-bg { background:rgba(0,0,0,0.85); }
// //         .s1-play-icon { z-index:3; color:#fff; font-size:clamp(16px,3vw,42px); }
// //         .s1-play-icon::after { content:"▶"; }
// //         .s1-svg-ring  { width:100%; height:100%; position:absolute; z-index:2;
// //                         animation:s1spin 18s linear infinite; }
// //         @keyframes s1spin { to{ transform:rotate(360deg); } }
// //         .s1-svg-ring text { font-family:'Antonio',sans-serif; font-weight:700;
// //                             fill:rgba(255,255,255,0.9); letter-spacing:.15em;
// //                             font-size:clamp(6px,1.1vw,14px); }

// //         /* ─────────────────────────────────────
// //            S3 – Social feedback + API videos
// //         ───────────────────────────────────── */
// //         .s3-outer  { background:#222123; position:relative; z-index:20; overflow:visible; }

// //         .s3-driver {
// //           background:#ffd500; width:100%;
// //           height: var(--s3-driver-height, 500vh);
// //           display:flex; flex-direction:column; align-items:center;
// //           position:relative; overflow:visible;
// //         }
// //         @media(max-width:767px){ .s3-driver{ --s3-driver-height: 190vh; } }

// //         /* Pinned 100vh viewport */
// //         .s3-sticky { position:sticky; top:0; width:100%; height:100vh;
// //                      z-index:4; overflow:hidden; }

// //         /* ── Fan cards ──
// //            KEY iOS FIX:
// //            - NO transform: translate(-50%,-50%) here — GSAP handles ALL transforms
// //            - position: absolute; top:50%; left:50% sets the anchor point
// //            - GSAP's xPercent:-50 / yPercent:-50 handles centering
// //            - This prevents iOS Safari from having conflicting transform matrices
// //         ── */
// //         .s3-card {
// //           position: absolute;
// //           top: 65%;
// //           left: 50%;
// //           /* ⚠️  NO transform here — GSAP owns all transforms on this element */
// //           border: 0.38vw solid #ffd500;
// //           border-radius: 2vw;
// //           overflow: hidden;
// //           width: clamp(160px, 18vw, 280px);
// //           aspect-ratio: 9/16;
// //           cursor: pointer;
// //           will-change: transform, opacity;
// //           box-shadow: 0 20px 40px rgba(0,0,0,0.52);
// //           background: #111;
// //           /* Force GPU layer — helps iOS rendering */
// //           -webkit-transform: translateZ(0);
// //           transform: translateZ(0);
// //         }
// //         .s3-card:hover { box-shadow:0 28px 56px rgba(0,0,0,0.7); }
// //         .s3-card video { width:100%; height:100%; object-fit:cover;
// //                          pointer-events:none; display:block; }

// //         /* Responsive card sizing */
// //         @media(max-width:1366px){ .s3-card{ width:clamp(150px,17vw,260px); } }
// //         @media(max-width:1225px){ .s3-card{ width:clamp(150px,17vw,260px); } }
// //         @media(max-width:1024px){ .s3-card{ width:clamp(160px,16vw,240px); } }

// //         @media(max-width:991px){
// //           .s3-card{
// //             width: 55vw;
// //             height: 98vw;
// //             border-width: 4px;
// //             border-radius: 16px;
// //           }
// //         }
// //         @media(max-width:821px){
// //           .s3-card{
// //             width: 55vw;
// //             height: 90vw;
// //             border-width: 3px;
// //           }
// //         }
// //         @media(max-width:767px){
// //           .s3-card{
// //             width: 68vw;
// //             height: 121vw;
// //             border-width: 3px;
// //           }
// //         }
// //         @media(max-width:541px){
// //           .s3-card{
// //             width: 68vw;
// //             height: 101vw;
// //             border-width: 3px;
// //             border-radius: 16px;
// //           }
// //         }
// //         @media(max-width:479px){
// //           .s3-card{
// //             width: 68vw;
// //             height: 121vw;
// //             border-width: 3px;
// //             border-radius: 16px;
// //           }
// //         }
// //         @media(max-width:413px){
// //           .s3-card{
// //             width: 68vw;
// //             height: 121vw;
// //             border-width: 3px;
// //             border-radius: 16px;
// //           }
// //         }
// //         @media(max-width:375px){
// //           .s3-card{
// //             width: 68vw;
// //             height: 121vw;
// //             border-width: 3px;
// //             border-radius: 16px;
// //           }
// //         }

// //         /* Explore All button */
// //         .s3-cta {
// //           position:absolute; bottom:4.5vh; left:50%; transform:translateX(-50%);
// //           z-index:20; background:#523121;
// //           font-family:'Antonio',sans-serif; font-size:clamp(.88rem,1.1vw,1.15rem);
// //           font-weight:700; text-transform:uppercase; letter-spacing:.13em;
// //           padding:.75em 3em; border-radius:100vw; text-decoration:none;
// //           color:#ffd500;
// //           box-shadow:0 6px 20px rgba(227,164,88,.35); white-space:nowrap;
// //           transition:background .3s, transform .2s;
// //         }
// //         .s3-cta:hover {
// //           background:#523122; color:#ffd500;
// //           transform:translateX(-50%) scale(1.04);
// //         }
// //         @media(max-width:991px){
// //           .s3-cta{ padding:.65em 2.2em; font-size:clamp(.8rem,3vw,1rem); }
// //         }

// //         /* Big parallax background text */
// //         .s3-bg-wrap {
// //           position:absolute; top:0; left:0; right:0; padding-top:5vw;
// //           display:flex; flex-direction:column; align-items:center;
// //           pointer-events:none; overflow:hidden; z-index:2;
// //         }
// //         .sf-bg-line {
// //           font-family:'Antonio',sans-serif; font-size:13.5vw; font-weight:700;
// //           line-height:1.05; letter-spacing:-.4vw; text-transform:uppercase;
// //           color:#222123; will-change:transform; user-select:none;
// //         }
// //         .sf-bg-line.orange { color:#523121; }
// //         .sf-bg-line.right  { text-align:right; width:100%; }

// //         /* ─────────────────────────────────────
// //            Shared modal
// //         ───────────────────────────────────── */
// //         .vmodal-bg {
// //           position:fixed; inset:0; background:rgba(0,0,0,0.97);
// //           display:flex; align-items:center; justify-content:center;
// //           z-index:9999; padding:clamp(10px,3vw,30px);
// //           animation:vmFadeIn .25s ease;
// //         }
// //         @keyframes vmFadeIn { from{opacity:0} to{opacity:1} }
// //         .vmodal-box {
// //           position:relative; width:100%;
// //           max-width:min(800px,92vw);
// //           aspect-ratio:9/16;
// //           animation:vmSlide .28s ease;
// //         }
// //         @keyframes vmSlide {
// //           from{ transform:translateY(22px); opacity:0 }
// //           to  { transform:translateY(0);    opacity:1 }
// //         }
// //         .vmodal-box video {
// //           width:100%; height:100%; border:none; border-radius:12px;
// //         }
// //         .vmodal-close {
// //           position:absolute; top:-46px; right:0;
// //           background:#fff; color:#523122; border:none; border-radius:50%;
// //           font-size:22px; cursor:pointer;
// //           width:40px; height:40px; display:flex; align-items:center; justify-content:center;
// //           transition:all .25s; box-shadow:0 2px 12px rgba(0,0,0,0.25);
// //         }
// //         .vmodal-close:hover { background:#523122; color:#fff; transform:scale(1.12); }

// //         /* ─────────────────────────────────────
// //            Accessibility & performance
// //         ───────────────────────────────────── */
// //         @media(prefers-reduced-motion:reduce){
// //           .s1-svg-ring{ animation:none!important; }
// //           .s3-card, .s1-circle{ transition:none!important; animation:none!important; }
// //         }
// //         @media(hover:none) and (pointer:coarse){
// //           .s3-card:hover, .s3-cta:hover{ transform:none; box-shadow:none; }
// //         }
// //       `}</style>

// //       {/* ══════════════════════════════════════════════════════════════
// //           SECTION 1 – Round expanding circle video (unchanged)
// //       ══════════════════════════════════════════════════════════════ */}
// //       <div className="s1" ref={roundSectionRef}>
// //         <div className="s1-wrap" ref={roundWrapRef}>
// //           <div className="s1-sticky" ref={roundCircleRef}>

// //             {/* Circular "PLAY VIDEO" button */}
// //             <a
// //               href="#"
// //               className="s1-play-link"
// //               onClick={(e) => {
// //                 e.preventDefault();
// //                 setModal({ src: "https://www.youtube.com/embed/YFNSDdrElfc?autoplay=1" });
// //               }}
// //               aria-label="Play full video"
// //             >
// //               <div className="s1-play-btn" ref={roundButtonRef}>
// //                 <div className="s1-play-bg" />
// //                 <svg className="s1-svg-ring" viewBox="0 0 200 200">
// //                   <defs>
// //                     <path id="rp"
// //                       d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
// //                       fill="none" />
// //                   </defs>
// //                   <text>
// //                     <textPath href="#rp" startOffset="50%" textAnchor="middle">
// //                       PLAY VIDEO • PLAY VIDEO • PLAY VIDEO •
// //                     </textPath>
// //                   </text>
// //                 </svg>
// //                 <span className="s1-play-icon" aria-hidden="true" />
// //               </div>
// //             </a>

// //             {/* The circle that expands on scroll */}
// //             <div className="s1-circle" ref={roundElementRef}>
// //               <div className="s1-overlay" ref={roundOverlayRef} />
// //               <div className="s1-vid-wrap">
// //                 <video autoPlay loop muted playsInline
// //                   poster="images/product1.png "
// //                 >
// //                   <source src="Videos/Video2.mp4" type="video/mp4" />
                  
// //                 </video>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ══════════════════════════════════════════════════════════════
// //           SECTION 3 – Social feedback + API videos combined
// //       ══════════════════════════════════════════════════════════════ */}
// //       <div className="s3-outer" ref={socialSectionRef}>

// //         {/* Tall scroll driver */}
// //         <div className="s3-driver" ref={socialWrapperRef}>

// //           {/* Pinned 100vh sticky viewport */}
// //           <div className="s3-sticky" ref={socialStickyRef}>

// //             {/* Big parallax background text */}
// //             <div className="s3-bg-wrap">
// //               <span className="sf-bg-line">What's</span>
// //               <span className="sf-bg-line orange">everyone</span>
// //               <span className="sf-bg-line right">talking</span>
// //             </div>

// //             {/* API video cards */}
// //             {dispVids.map((v, i) => (
// //               <div
// //                 key={v._id}
// //                 ref={(el) => (cardRefs.current[i] = el)}
// //                 className="s3-card"
// //                 onClick={() => setModal({ src: v.videoUrl })}
// //                 onMouseEnter={() => !mobile && videoRefs.current[i]?.play()}
// //                 onMouseLeave={() => !mobile && videoRefs.current[i]?.pause()}
// //               >
// //                 <video
// //                   ref={(el) => (videoRefs.current[i] = el)}
// //                   src={v.videoUrl}
// //                   muted playsInline loop={false} preload="metadata"
// //                 />
// //               </div>
// //             ))}

// //             {/* Explore All */}
// //             <a href="/product" className="s3-cta">Explore All</a>

// //           </div>{/* /sticky */}
// //         </div>{/* /driver */}

// //       </div>

// //       {/* ══════════════════════════════════════════════════════════════
// //           MODAL
// //       ══════════════════════════════════════════════════════════════ */}
// //       {modal && (
// //         <div className="vmodal-bg" onClick={() => setModal(null)}>
// //           <div className="vmodal-box" onClick={(e) => e.stopPropagation()}>
// //             <button className="vmodal-close" onClick={() => setModal(null)} aria-label="Close">×</button>
// //             <video src={modal.src} controls autoPlay playsInline />
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }




// // // VideoShowcaseSection.jsx
// // import React, { useEffect, useRef, useState } from "react";
// // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import Lottie from "lottie-react"; // npm install lottie-react
// // import api from "../api/axios";

// // gsap.registerPlugin(ScrollTrigger);


// // /* ═══════════════════════════════════════════════════════════════════════════
// //    LOTTIE DRIP ANIMATION — embedded inline, no external file needed
// // ═══════════════════════════════════════════════════════════════════════════ */
// // const DRIP_ANIMATION = {"v":"5.12.1","fr":30,"ip":0,"op":76,"w":315,"h":317,"nm":"!!bttn_hover","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 4","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[152.75,163.25,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.838,"y":0.882},"o":{"x":0.333,"y":0},"t":0,"s":[{"i":[[11,-0.75],[9,-4],[-12.609,-0.287],[-7.188,2.312]],"o":[[-11,0.75],[4.5,-2.375],[8.25,0.188],[1.919,-0.617]],"v":[[77.75,23.25],[45.25,30.375],[76.875,30.188],[101.938,28.938]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.619,"y":0.502},"t":29,"s":[{"i":[[11,-0.75],[9,-4],[-14.125,2.312],[-12.812,4.062]],"o":[[-11,0.75],[22.875,4.875],[12.503,-2.047],[1.921,-0.609]],"v":[[77.75,23.25],[45.25,30.375],[74.375,50.688],[102.812,27.312]],"c":true}]},{"t":44,"s":[{"i":[[11,-0.75],[9,-4],[-12.17,3.313],[-11.938,4.062]],"o":[[-11,0.75],[14.625,0.25],[11.25,-3.062],[3.101,-1.055]],"v":[[77.75,23.25],[45.25,30.875],[75.625,48.812],[102.688,26.812]],"c":true}]}]},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.478431372549,0.313725490196,0.160784313725,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":137,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"Shape Layer 3","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[136.404,202.688,0],"ix":2,"l":2},"a":{"a":0,"k":[38.654,39.688,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.68,"y":0.495},"o":{"x":0.373,"y":0},"t":16,"s":[{"i":[[13.625,0.25],[0.898,-3.253],[-9.49,-0.463],[-5.899,-0.329],[-3.102,-0.039],[-7.938,-0.375],[-2,0]],"o":[[-13.625,-0.25],[-1,3.625],[11.781,0.575],[4.5,0.251],[4.937,0.062],[4.755,0.225],[2,0]],"v":[[20.125,26.5],[2.125,27.875],[20.032,29.487],[37.625,29.874],[48.813,29.75],[66.25,30.375],[72.5,27.25]],"c":true}]},{"i":{"x":0.612,"y":1},"o":{"x":0.3,"y":0.474},"t":31,"s":[{"i":[[13.625,0.25],[0.091,-3.374],[-9.49,-0.463],[-5.868,-0.691],[-1.92,-2.437],[-5.098,8.855],[-2,0]],"o":[[-13.625,-0.25],[-0.163,6.041],[11.781,0.575],[4.25,0.5],[3.25,4.125],[2.375,-4.125],[2,0]],"v":[[20.125,26.5],[2.125,28.625],[20.094,35.05],[38,33.374],[46.375,40.875],[66.125,38.375],[72.5,27.25]],"c":true}]},{"i":{"x":0.612,"y":1},"o":{"x":0.333,"y":0},"t":46,"s":[{"i":[[13.625,0.25],[0.151,-3.372],[-9.49,-0.463],[-5.437,-2.312],[0.698,-3.023],[3.25,19.25],[-2,0]],"o":[[-13.625,-0.25],[7.375,0.5],[11.781,0.575],[3.239,1.378],[-3,13],[-2.463,-14.586],[2,0]],"v":[[20.125,26.5],[1.125,34.75],[20.969,42.8],[43.75,40.875],[47.5,54.75],[63,54],[72.5,27.25]],"c":true}]},{"t":59,"s":[{"i":[[13.625,0.25],[-3.37,0.193],[-9.49,-0.463],[-5.437,-2.312],[0.211,-3.095],[1.341,18.583],[-2,0]],"o":[[-13.625,-0.25],[8.75,-0.5],[11.781,0.575],[3.239,1.378],[-0.75,11],[-0.875,-12.125],[2,0]],"v":[[20.125,26.5],[1.5,32.375],[21.344,40.925],[43,38.75],[45.5,52],[64.125,50.125],[72.5,27.25]],"c":true}]}]},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.478431372549,0.313725490196,0.160784313725,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":153,"st":16,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"Shape Layer 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[183,234.377,0],"ix":2,"l":2},"a":{"a":0,"k":[-69.5,74.627,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.667,"y":0.32},"o":{"x":0.333,"y":0},"t":7,"s":[{"i":[[0,0.316],[6.837,0.024],[-0.25,-0.601],[-3.691,-0.402],[-7.5,0.016],[-4.866,0.411]],"o":[[-1.5,-0.395],[-7.929,-0.028],[3.25,0.506],[3.846,0.419],[5.771,-0.012],[5.115,-0.432]],"v":[[-44.375,31.881],[-69.125,31.739],[-95.375,31.976],[-85.721,33.336],[-70.5,33.984],[-54.509,33.201]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0.68},"t":20.154,"s":[{"i":[[0,2.5],[6.837,0.19],[-0.25,-4.75],[-3.691,-3.179],[-7.5,0.125],[-4.866,3.25]],"o":[[-1.5,-3.125],[-7.929,-0.221],[3.25,4],[3.846,3.312],[5.771,-0.096],[5.115,-3.416]],"v":[[-44.125,32.125],[-68.875,31],[-95.125,32.875],[-85.471,43.625],[-70.25,48.75],[-54.259,42.562]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":34.77,"s":[{"i":[[0,2.5],[6.837,0.19],[-0.25,-4.75],[0.125,-8.875],[-12.875,-0.25],[-0.25,8.125]],"o":[[-1.375,-6.75],[-7.929,-0.221],[10.75,6.25],[-0.127,9.003],[12.133,0.236],[0.388,-12.625]],"v":[[-50.375,34],[-68.875,31],[-89.875,33],[-74.375,52.125],[-70.5,75.75],[-65.875,51.625]],"c":true}]},{"t":56,"s":[{"i":[[0,2.5],[6.837,0.19],[-0.25,-4.75],[0.375,-7.25],[-12.5,-0.25],[0.164,4.872]],"o":[[-1.375,-6.75],[-7.929,-0.221],[10.75,6.25],[-0.375,7.25],[12.5,0.25],[-0.375,-11.125]],"v":[[-50.375,34],[-68.875,31],[-89.875,33],[-74.375,50.625],[-70.5,69.75],[-65.875,50.125]],"c":true}]}]},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.478431372549,0.313725490196,0.160784313725,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":144,"st":7,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[84,235.877,0],"ix":2,"l":2},"a":{"a":0,"k":[-69.5,74.627,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":15,"s":[{"i":[[-6.75,1.388],[18,-0.5],[-3.278,-0.492],[-9,-0.179],[-3.5,0.587]],"o":[[-12.25,-1.776],[8.375,3.849],[4,0.601],[7.346,0.146],[3.5,-0.587]],"v":[[-23.75,27.526],[-96.375,28.651],[-80.875,31.617],[-60.25,32.604],[-40.5,31.028]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":20.2,"s":[{"i":[[-6.75,1.388],[18,-0.5],[-3.278,-0.492],[-9,-0.179],[-3.5,0.587]],"o":[[-12.25,-1.776],[8.375,3.849],[4,0.601],[7.346,0.146],[3.5,-0.587]],"v":[[-23.875,30.776],[-96.375,28.651],[-81,34.117],[-60.125,35.729],[-40.5,33.778]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":34.5,"s":[{"i":[[-6.75,6.25],[18,-2.25],[-3.278,-2.217],[-9,-0.805],[-3.5,2.645]],"o":[[-12.25,-8],[8.883,8.702],[4,2.706],[7.346,0.657],[3.5,-2.645]],"v":[[-23.75,29],[-96.75,27.25],[-80.875,44.044],[-60,51.305],[-40.375,42.52]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":54,"s":[{"i":[[-7.5,-0.25],[18.75,-4.5],[-0.375,-17.419],[-13.5,0.195],[0.073,10.144]],"o":[[-12.25,-8],[8.75,12.25],[0.181,8.402],[14.375,-0.208],[-0.125,-17.27]],"v":[[-49.125,34.625],[-94.75,28.25],[-72.375,60.544],[-67.625,88.805],[-62.625,60.27]],"c":true}]},{"t":74,"s":[{"i":[[-8.625,-2],[18.75,-4.5],[-0.25,-14.669],[-15.5,0.195],[0.51,10.132]],"o":[[-12.25,-8],[8.883,8.702],[0.143,8.402],[15.5,-0.195],[-0.75,-14.895]],"v":[[-49.125,35],[-93.25,29.625],[-74,59.169],[-67.5,83.805],[-60.5,58.395]],"c":true}]}]},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":0,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[0.478431372549,0.313725490196,0.160784313725,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":161,"st":24,"ct":1,"bm":0}],"markers":[],"props":{}};
// // /* ─────────────────────────────────────────────────────────────────────────────
// //    FAN LAYOUT
// // ───────────────────────────────────────────────────────────────────────────── */
// // const FAN_PRESETS = {
// //   desktop: [
// //     { x: -32, y: -8,  rotate: -20, scale: 0.92, zIndex: 4 },
// //     { x: -21, y: -11, rotate: -12, scale: 0.96, zIndex: 5 },
// //     { x: -10, y: -13, rotate: -5,  scale: 1.02, zIndex: 6 },
// //     { x: 0,   y: -15, rotate: 0,   scale: 1.08, zIndex: 7 },
// //     { x: 10,  y: -13, rotate: 5,   scale: 1.02, zIndex: 6 },
// //     { x: 21,  y: -11, rotate: 12,  scale: 0.96, zIndex: 5 },
// //     { x: 32,  y: -8,  rotate: 20,  scale: 0.92, zIndex: 4 },
// //   ],
// //   laptop: [
// //     { x: -30, y: -7,  rotate: -19, scale: 0.90, zIndex: 4 },
// //     { x: -20, y: -10, rotate: -11, scale: 0.95, zIndex: 5 },
// //     { x: -9,  y: -12, rotate: -4,  scale: 1.00, zIndex: 6 },
// //     { x: 0,   y: -14, rotate: 0,   scale: 1.05, zIndex: 7 },
// //     { x: 9,   y: -12, rotate: 4,   scale: 1.00, zIndex: 6 },
// //     { x: 20,  y: -10, rotate: 11,  scale: 0.95, zIndex: 5 },
// //     { x: 30,  y: -7,  rotate: 19,  scale: 0.90, zIndex: 4 },
// //   ],
// //   tablet: [
// //     { x: -28, y: -4,  rotate: -18, scale: 0.84, zIndex: 4 },
// //     { x: -18, y: -7,  rotate: -10, scale: 0.90, zIndex: 5 },
// //     { x: -8,  y: -9,  rotate: -4,  scale: 0.96, zIndex: 6 },
// //     { x: 0,   y: -11, rotate: 0,   scale: 1.01, zIndex: 7 },
// //     { x: 8,   y: -9,  rotate: 4,   scale: 0.96, zIndex: 6 },
// //     { x: 18,  y: -7,  rotate: 10,  scale: 0.90, zIndex: 5 },
// //     { x: 28,  y: -4,  rotate: 18,  scale: 0.84, zIndex: 4 },
// //   ],
// //   mobile: [
// //     { x: 0, y: 0, rotate: -6, scale: 1.0, zIndex: 4  },
// //     { x: 0, y: 0, rotate:  4, scale: 1.0, zIndex: 5  },
// //     { x: 0, y: 0, rotate: -8, scale: 1.0, zIndex: 6  },
// //     { x: 0, y: 0, rotate:  6, scale: 1.0, zIndex: 7  },
// //     { x: 0, y: 0, rotate: -4, scale: 1.0, zIndex: 8  },
// //     { x: 0, y: 0, rotate:  7, scale: 1.0, zIndex: 9  },
// //     { x: 0, y: 0, rotate:  0, scale: 1.0, zIndex: 10 },
// //   ],
// //   mobileSmall: [
// //     { x: 0, y: 0, rotate: -6, scale: 1.0, zIndex: 4  },
// //     { x: 0, y: 0, rotate:  4, scale: 1.0, zIndex: 5  },
// //     { x: 0, y: 0, rotate: -8, scale: 1.0, zIndex: 6  },
// //     { x: 0, y: 0, rotate:  6, scale: 1.0, zIndex: 7  },
// //     { x: 0, y: 0, rotate: -4, scale: 1.0, zIndex: 8  },
// //     { x: 0, y: 0, rotate:  7, scale: 1.0, zIndex: 9  },
// //     { x: 0, y: 0, rotate:  0, scale: 1.0, zIndex: 10 },
// //   ],
// // };

// // const isMob = (s) => s === "mobile" || s === "mobileSmall";

// // /* ═══════════════════════════════════════════════════════════════════════════ */
// // export default function VideoShowcaseSection() {

// //   /* ── Section 1 refs ── */
// //   const roundSectionRef = useRef(null);
// //   const roundCircleRef  = useRef(null);
// //   const roundElementRef = useRef(null);
// //   const roundOverlayRef = useRef(null);
// //   const roundButtonRef  = useRef(null);
// //   const roundWrapRef    = useRef(null);

// //   /* ── Section 3 refs ── */
// //   const socialSectionRef = useRef(null);
// //   const socialWrapperRef = useRef(null);
// //   const socialStickyRef  = useRef(null);
// //   const cardRefs         = useRef([]);
// //   const videoRefs        = useRef([]);

// //   /* ── Lottie ref ── */
// //   const lottieRef = useRef(null);

// //   /* ── State ── */
// //   const [videos,     setVideos]     = useState([]);
// //   const [loading,    setLoading]    = useState(true);
// //   const [screenSize, setScreenSize] = useState("desktop");
// //   const [modal,      setModal]      = useState(null);

// //   /* ── Screen-size detection ── */
// //   useEffect(() => {
// //     const detect = () => {
// //       const w = window.innerWidth;
// //       if (w >= 1366)      setScreenSize("desktop");
// //       else if (w >= 1024) setScreenSize("laptop");
// //       else if (w >= 768)  setScreenSize("tablet");
// //       else if (w >= 480)  setScreenSize("mobile");
// //       else                setScreenSize("mobileSmall");
// //     };
// //     detect();
// //     window.addEventListener("resize", detect);
// //     return () => window.removeEventListener("resize", detect);
// //   }, []);

// //   /* ── Fetch videos ── */
// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const res = await api.get("/api/videos");
// //         setVideos(res.data || []);
// //       } catch { console.error("Failed to load videos"); }
// //       finally   { setLoading(false); }
// //     })();
// //   }, []);

// //   /* ── Hover handlers for drip button ── */
// //   const handleButtonEnter = () => {
// //     if (!lottieRef.current) return;
// //     lottieRef.current.goToAndPlay(0, true); // always restart from frame 0 on enter
// //   };

// //   const handleButtonLeave = () => {
// //     if (!lottieRef.current) return;
// //     lottieRef.current.stop(); // stop and reset to frame 0
// //   };

// //   /* ── GSAP ── */
// //   useEffect(() => {
// //     if (!videos.length) return;

// //     const mobile     = isMob(screenSize);
// //     const presets    = FAN_PRESETS[screenSize] || FAN_PRESETS.desktop;
// //     const videoCount = Math.min(videos.length, presets.length);
// //     const dispVids   = videos.slice(0, videoCount);

// //     const ctx = gsap.context(() => {

// //       /* ── S1 – Expanding circle ── */
// //       if (mobile) {
// //         ScrollTrigger.create({
// //           trigger: roundWrapRef.current, start: "top top", end: "bottom bottom",
// //           pin: roundCircleRef.current, pinSpacing: false,
// //         });
// //         gsap.set(roundElementRef.current, { width: "100vw", height: "100vh", borderRadius: "0%", scale: 1, opacity: 1 });
// //         gsap.set(roundOverlayRef.current, { opacity: 0.5 });
// //         gsap.set(roundButtonRef.current,  { opacity: 1, scale: 1 });
// //       } else {
// //         const sizes = {
// //           tablet:  { s: "15vw", e: "160vw" },
// //           laptop:  { s: "12vw", e: "150vw" },
// //           desktop: { s: "10vw", e: "150vw" },
// //         }[screenSize] || { s: "10vw", e: "150vw" };

// //         ScrollTrigger.create({
// //           trigger: roundWrapRef.current, start: "top top", end: "bottom bottom",
// //           pin: roundCircleRef.current, pinSpacing: false, scrub: 0.5,
// //         });
// //         gsap.fromTo(roundElementRef.current,
// //           { width: sizes.s, height: sizes.s, borderRadius: "50%", scale: 1, opacity: 1 },
// //           {
// //             width: sizes.e, height: sizes.e, borderRadius: "50%", scale: 1.2, opacity: 0.9, ease: "none",
// //             scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true }
// //           }
// //         );
// //         gsap.fromTo(roundOverlayRef.current, { opacity: 0.3 },
// //           {
// //             opacity: 0.8, ease: "none",
// //             scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8 }
// //           }
// //         );
// //         gsap.fromTo(roundButtonRef.current, { opacity: 1, scale: 1 },
// //           {
// //             opacity: 0, scale: 1.5, ease: "none",
// //             scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "center center", scrub: 0.8 }
// //           }
// //         );
// //       }

// //       /* ── S3 – Fan cards ── */
// //       if (!socialSectionRef.current || !cardRefs.current.length) return;

// //       ScrollTrigger.create({
// //         trigger:    socialWrapperRef.current,
// //         start:      "top top",
// //         end:        "bottom bottom",
// //         pin:        socialStickyRef.current,
// //         pinSpacing: false,
// //       });

// //       cardRefs.current.forEach((card, i) => {
// //         if (!card) return;
// //         gsap.set(card, {
// //           xPercent: -50, yPercent: -50,
// //           x: 0, y: "85vh",
// //           rotation: 0, scale: 0.35, opacity: 0,
// //           zIndex: i + 1,
// //         });
// //       });

// //       const slotW   = 1 / videoCount;
// //       const animDur = slotW * 0.7;
// //       const s3Tl    = gsap.timeline();

// //       dispVids.forEach((_, i) => {
// //         const card = cardRefs.current[i];
// //         if (!card) return;
// //         const pos    = presets[i % presets.length];
// //         const tStart = i * slotW;
// //         s3Tl.to(card, {
// //           xPercent: -50, yPercent: -50,
// //           x: `${pos.x}vw`, y: `${pos.y}vh`,
// //           rotation: pos.rotate, scale: pos.scale, opacity: 1,
// //           ease: "power3.out", duration: animDur,
// //         }, tStart);
// //       });

// //       ScrollTrigger.create({
// //         trigger: socialWrapperRef.current, start: "top top", end: "bottom bottom",
// //         scrub: 1, animation: s3Tl,
// //       });

// //       /* Parallax text */
// //       const textLines = socialSectionRef.current.querySelectorAll(".sf-bg-line");
// //       textLines.forEach((line, i) => {
// //         gsap.fromTo(line,
// //           { xPercent: i % 2 === 0 ? -10 : 10 },
// //           {
// //             xPercent: i % 2 === 0 ? 10 : -10, ease: "none",
// //             scrollTrigger: {
// //               trigger: socialSectionRef.current,
// //               start: "top bottom", end: "bottom top", scrub: 2,
// //             },
// //           }
// //         );
// //       });
// //     });

// //     ScrollTrigger.refresh();
// //     const onResize = () => setTimeout(() => ScrollTrigger.refresh(), 100);
// //     window.addEventListener("resize", onResize);
// //     return () => { ctx.revert(); window.removeEventListener("resize", onResize); };
// //   }, [videos, screenSize]);

// //   /* ── Derived ── */
// //   const mobile     = isMob(screenSize);
// //   const presets    = FAN_PRESETS[screenSize] || FAN_PRESETS.desktop;
// //   const videoCount = Math.min(videos.length, presets.length);
// //   const dispVids   = videos.slice(0, videoCount);

// //   if (loading) return null;

// //   /* ═══════════════════════════════════════════════════════════════════════ */
// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;700;900&display=swap');
// //         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

// //         /* ─── S1 – Round expanding video ─── */
// //         .s1 { position: relative; background: #523122; overflow: hidden; width: 100%; z-index: 10; }
// //         .s1-wrap { position: relative; width: 100%; height: 200vh; }
// //         @media(max-width:768px){ .s1-wrap { height: 130vh; } }
// //         .s1-sticky { position: relative; display: flex; align-items: center;
// //                      justify-content: center; width: 100%; height: 100vh; }
// //         .s1-circle { border-radius: 50%; overflow: hidden; position: relative;
// //                      will-change: width, height, scale; transition: box-shadow .3s;
// //                      box-shadow: 0 0 40px rgba(0,0,0,0.45);
// //                      width: clamp(80px,10vw,180px); height: clamp(80px,10vw,180px); }
// //         @media(max-width:767px){
// //           .s1-circle { width: 100vw !important; height: 100vh !important; border-radius: 0 !important; }
// //         }
// //         .s1-overlay  { position: absolute; inset: 0; background: rgba(0,0,0,0.3); z-index: 2; pointer-events: none; }
// //         .s1-vid-wrap { width: 100%; height: 100%; position: relative; z-index: 1; }
// //         .s1-vid-wrap video { width: 100%; height: 100%; object-fit: cover; display: block; }
// //         .s1-play-link { position: absolute; top: 50%; left: 50%;
// //                         transform: translate(-50%,-50%); z-index: 10; cursor: pointer; text-decoration: none; }
// //         .s1-play-btn  { border-radius: 50%; position: relative; display: flex;
// //                         align-items: center; justify-content: center; background: transparent;
// //                         cursor: pointer; will-change: opacity, scale;
// //                         width: clamp(80px,12vw,180px); height: clamp(80px,12vw,180px); }
// //         .s1-play-bg   { position: absolute; inset: 0; border-radius: 50%;
// //                         background: rgba(0,0,0,0.65); z-index: 1; transition: background .3s; }
// //         .s1-play-btn:hover .s1-play-bg { background: rgba(0,0,0,0.85); }
// //         .s1-play-icon { z-index: 3; color: #fff; font-size: clamp(16px,3vw,42px); }
// //         .s1-play-icon::after { content: "▶"; }
// //         .s1-svg-ring  { width: 100%; height: 100%; position: absolute; z-index: 2;
// //                         animation: s1spin 18s linear infinite; }
// //         @keyframes s1spin { to { transform: rotate(360deg); } }
// //         .s1-svg-ring text { font-family: 'Antonio', sans-serif; font-weight: 700;
// //                             fill: rgba(255,255,255,0.9); letter-spacing: .15em;
// //                             font-size: clamp(6px,1.1vw,14px); }

// //         /* ─── S3 – Social + API videos ─── */
// //         .s3-outer  { background: #222123; position: relative; z-index: 20; overflow: visible; }
// //         .s3-driver {
// //           background: #ffd500; width: 100%;
// //           height: var(--s3-driver-height, 500vh);
// //           display: flex; flex-direction: column; align-items: center;
// //           position: relative; overflow: visible;
// //         }
// //         @media(max-width:767px){ .s3-driver { --s3-driver-height: 190vh; } }
// //         .s3-sticky { position: sticky; top: 0; width: 100%; height: 100vh; z-index: 4; overflow: hidden; }

// //         /* ─── Fan cards ─── */
// //         .s3-card {
// //           position: absolute; top: 65%; left: 50%;
// //           border: 0.30vw solid #ffd500; border-radius: 2vw;
// //           overflow: hidden; width: clamp(160px,18vw,280px);
// //           aspect-ratio: 9/16; cursor: pointer;
// //           will-change: transform, opacity;
// //           box-shadow: 0 20px 40px rgba(0,0,0,0.52); background: #111;
// //           -webkit-transform: translateZ(0); transform: translateZ(0);
// //         }
// //         .s3-card:hover { box-shadow: 0 28px 56px rgba(0,0,0,0.7); }
// //         .s3-card video { width: 100%; height: 100%; object-fit: cover; pointer-events: none; display: block; }
// //         @media(max-width:1366px){ .s3-card { width: clamp(150px,17vw,260px); } }
// //         @media(max-width:1024px){ .s3-card { width: clamp(160px,16vw,240px); } }
// //         @media(max-width:991px){
// //           .s3-card { top: 42%; width: 55vw; height: 98vw; border-width: 4px; border-radius: 16px; }
// //         }
// //         @media(max-width:821px){ .s3-card { width: 55vw; height: 90vw; border-width: 3px; } }
// //         @media(max-width:767px){ .s3-card { width: 68vw; height: 121vw; border-width: 3px; } }
// //         @media(max-width:541px){ .s3-card { width: 68vw; height: 101vw; border-width: 3px; border-radius: 16px; } }
// //         @media(max-width:479px){ .s3-card { width: 68vw; height: 121vw; border-width: 3px; border-radius: 16px; } }

// //         /* ─────────────────────────────────────────────────────────────────
// //            Explore All — Lottie drip button (hover-only on desktop)
// //         ───────────────────────────────────────────────────────────────── */
// //         .s3-cta-wrap {
// //           position: absolute;
// //           bottom: 5.5vh;
// //           left: 50%;
// //           transform: translateX(-50%);
// //           z-index: 20;
// //         }

// //         .liquid-button-wrapper {
// //           position: relative;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           width: fit-content;
// //         }

// //         /* Lottie layer — invisible by default, shown on hover via JS play */
// //         .lottie-animation-2 {
// //           z-index: 1;
// //           perspective-origin: 50% 0;
// //           transform-origin: 50% 0;
// //           width: 12.5vw;
// //           height: 12.5vw;
// //           position: absolute;
// //           top: -4.5vw;
// //           right: 0;
// //           bottom: 0;
// //           left: 0;
// //           pointer-events: none;
// //           /* Hidden at rest — Lottie starts at frame 0 which is the clean state */
// //         }

// //         /* Pill */
// //         .liquid-button {
// //           position: relative;
// //           z-index: 2;
// //           display: inline-flex;
// //           align-items: center;
// //           justify-content: center;
// //           background: #7a5029;
// //           border-radius: 100vw;
// //           padding: .75em 3em;
// //           text-decoration: none;
// //           cursor: pointer;
// //           transition: background .3s;
// //           white-space: nowrap;
// //         }
// //         .liquid-button:hover { background: ##ffd500; }

// //         .button-text {
// //           position: relative;
// //           z-index: 2;
// //           letter-spacing: -.01vw;
// //           font-family: Antonio, sans-serif;
// //           font-size: clamp(.88rem, 1.1vw, 1.15rem);
// //           font-weight: 700;
// //           text-transform: uppercase;
// //           color: #ffd500;
// //           white-space: nowrap;
// //         }

// //         /* Hide Lottie entirely on mobile — no hover on touch devices */
// //         @media(max-width:767px){
// //           .lottie-animation-2 { display: none; }
// //         }
// //         @media(max-width:991px){
// //           .liquid-button { padding: .65em 2.2em; }
// //           .lottie-animation-2 { width: 20vw; height: 20vw; top: -7vw; }
// //         }

// //         /* ─── Big parallax text ─── */
// //         .s3-bg-wrap {
// //           position: absolute; top: 0; left: 0; right: 0; padding-top: 5vw;
// //           display: flex; flex-direction: column; align-items: center;
// //           pointer-events: none; overflow: hidden; z-index: 2;
// //         }
// //         .sf-bg-line {
// //           font-family: 'Antonio', sans-serif; font-size: 13.5vw; font-weight: 700;
// //           line-height: 1.05; letter-spacing: -.4vw; text-transform: uppercase;
// //           color: #222123; will-change: transform; user-select: none;
// //         }
// //         .sf-bg-line.orange { color: #523121; }
// //         .sf-bg-line.right  { text-align: right; width: 100%; }

// //         /* ─── Modal ─── */
// //         .vmodal-bg {
// //           position: fixed; inset: 0; background: rgba(0,0,0,0.97);
// //           display: flex; align-items: center; justify-content: center;
// //           z-index: 9999; padding: clamp(10px,3vw,30px); animation: vmFadeIn .25s ease;
// //         }
// //         @keyframes vmFadeIn { from { opacity: 0 } to { opacity: 1 } }
// //         .vmodal-box {
// //           position: relative; width: 100%; max-width: min(800px,92vw);
// //           aspect-ratio: 9/16; animation: vmSlide .28s ease;
// //         }
// //         @keyframes vmSlide {
// //           from { transform: translateY(22px); opacity: 0 }
// //           to   { transform: translateY(0);    opacity: 1 }
// //         }
// //         .vmodal-box video { width: 100%; height: 100%; border: none; border-radius: 12px; }
// //         .vmodal-close {
// //           position: absolute; top: -46px; right: 0;
// //           background: #fff; color: #523122; border: none; border-radius: 50%;
// //           font-size: 22px; cursor: pointer; width: 40px; height: 40px;
// //           display: flex; align-items: center; justify-content: center;
// //           transition: all .25s; box-shadow: 0 2px 12px rgba(0,0,0,0.25);
// //         }
// //         .vmodal-close:hover { background: #523122; color: #fff; transform: scale(1.12); }

// //         /* ─── Accessibility ─── */
// //         @media(prefers-reduced-motion:reduce){
// //           .s1-svg-ring { animation: none !important; }
// //           .s3-card, .s1-circle { transition: none !important; animation: none !important; }
// //         }
// //         @media(hover:none) and (pointer:coarse){
// //           .s3-card:hover, .liquid-button:hover { transform: none; box-shadow: none; }
// //         }
// //       `}</style>

// //       {/* ══════════════════════════════════════════════════════════════
// //           SECTION 1 – Round expanding circle video
// //       ══════════════════════════════════════════════════════════════ */}
// //       <div className="s1" ref={roundSectionRef}>
// //         <div className="s1-wrap" ref={roundWrapRef}>
// //           <div className="s1-sticky" ref={roundCircleRef}>
// //             <a
// //               href="#"
// //               className="s1-play-link"
// //               onClick={(e) => {
// //                 e.preventDefault();
// //                 setModal({ src: "https://www.youtube.com/embed/YFNSDdrElfc?autoplay=1" });
// //               }}
// //               aria-label="Play full video"
// //             >
// //               <div className="s1-play-btn" ref={roundButtonRef}>
// //                 <div className="s1-play-bg" />
// //                 <svg className="s1-svg-ring" viewBox="0 0 200 200">
// //                   <defs>
// //                     <path id="rp"
// //                       d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
// //                       fill="none" />
// //                   </defs>
// //                   <text>
// //                     <textPath href="#rp" startOffset="50%" textAnchor="middle">
// //                       PLAY VIDEO • PLAY VIDEO • PLAY VIDEO •
// //                     </textPath>
// //                   </text>
// //                 </svg>
// //                 <span className="s1-play-icon" aria-hidden="true" />
// //               </div>
// //             </a>
// //             <div className="s1-circle" ref={roundElementRef}>
// //               <div className="s1-overlay" ref={roundOverlayRef} />
// //               <div className="s1-vid-wrap">
// //                 <video autoPlay loop muted playsInline poster="images/product1.png">
// //                   <source src="Videos/Video2.mp4" type="video/mp4" />
// //                 </video>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ══════════════════════════════════════════════════════════════
// //           SECTION 3 – Social feedback + API videos combined
// //       ══════════════════════════════════════════════════════════════ */}
// //       <div className="s3-outer" ref={socialSectionRef}>
// //         <div className="s3-driver" ref={socialWrapperRef}>
// //           <div className="s3-sticky" ref={socialStickyRef}>

// //             {/* Parallax background text */}
// //             <div className="s3-bg-wrap">
// //               <span className="sf-bg-line">What's</span>
// //               <span className="sf-bg-line orange">everyone</span>
// //               <span className="sf-bg-line right">talking</span>
// //             </div>

// //             {/* API video cards */}
// //             {dispVids.map((v, i) => (
// //               <div
// //                 key={v._id}
// //                 ref={(el) => (cardRefs.current[i] = el)}
// //                 className="s3-card"
// //                 onClick={() => setModal({ src: v.videoUrl })}
// //                 onMouseEnter={() => !mobile && videoRefs.current[i]?.play()}
// //                 onMouseLeave={() => !mobile && videoRefs.current[i]?.pause()}
// //               >
// //                 <video
// //                   ref={(el) => (videoRefs.current[i] = el)}
// //                   src={v.videoUrl}
// //                   muted playsInline loop={false} preload="metadata"
// //                 />
// //               </div>
// //             ))}

// //             {/* ══════════════════════════════════════════════════════
// //                 Explore All — drip plays only on hover (desktop)
// //                 onMouseEnter → goToAndPlay(0)
// //                 onMouseLeave → stop() resets to frame 0
// //             ══════════════════════════════════════════════════════ */}
// //             <div className="s3-cta-wrap">
// //               <div
// //                 className="liquid-button-wrapper"
// //                 onMouseEnter={handleButtonEnter}
// //                 onMouseLeave={handleButtonLeave}
// //               >
// //                 {/* Lottie drip layer — hidden on mobile via CSS */}
// //                 <div className="lottie-animation-2">
// //                   <Lottie
// //                     lottieRef={lottieRef}
// //                     animationData={DRIP_ANIMATION}
// //                     loop={false}
// //                     autoplay={false}
// //                     style={{ width: "100%", height: "100%" }}
// //                   />
// //                 </div>

// //                 {/* Pill link */}
// //                 <a href="/product" className="liquid-button">
// //                   <div className="button-text">explore all</div>
// //                 </a>
// //               </div>
// //             </div>

// //           </div>{/* /sticky */}
// //         </div>{/* /driver */}
// //       </div>

// //       {/* ══════════════════════════════════════════════════════════════
// //           MODAL
// //       ══════════════════════════════════════════════════════════════ */}
// //       {modal && (
// //         <div className="vmodal-bg" onClick={() => setModal(null)}>
// //           <div className="vmodal-box" onClick={(e) => e.stopPropagation()}>
// //             <button className="vmodal-close" onClick={() => setModal(null)} aria-label="Close">×</button>
// //             <video src={modal.src} controls autoPlay playsInline />
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // // VideoShowcaseSection.jsx
// // import React, { useEffect, useRef, useState } from "react";
// // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import Lottie from "lottie-react"; // npm install lottie-react
// // import api from "../api/axios";

// // gsap.registerPlugin(ScrollTrigger);


// // /* ═══════════════════════════════════════════════════════════════════════════
// //    LOTTIE DRIP ANIMATION — embedded inline, no external file needed
// // ═══════════════════════════════════════════════════════════════════════════ */
// // const DRIP_ANIMATION = { "v": "5.12.1", "fr": 30, "ip": 0, "op": 76, "w": 315, "h": 317, "nm": "!!bttn_hover", "ddd": 0, "assets": [], "layers": [{ "ddd": 0, "ind": 2, "ty": 4, "nm": "Shape Layer 4", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [152.75, 163.25, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [0, 0, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.838, "y": 0.882 }, "o": { "x": 0.333, "y": 0 }, "t": 0, "s": [{ "i": [[11, -0.75], [9, -4], [-12.609, -0.287], [-7.188, 2.312]], "o": [[-11, 0.75], [4.5, -2.375], [8.25, 0.188], [1.919, -0.617]], "v": [[77.75, 23.25], [45.25, 30.375], [76.875, 30.188], [101.938, 28.938]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.619, "y": 0.502 }, "t": 29, "s": [{ "i": [[11, -0.75], [9, -4], [-14.125, 2.312], [-12.812, 4.062]], "o": [[-11, 0.75], [22.875, 4.875], [12.503, -2.047], [1.921, -0.609]], "v": [[77.75, 23.25], [45.25, 30.375], [74.375, 50.688], [102.812, 27.312]], "c": true }] }, { "t": 44, "s": [{ "i": [[11, -0.75], [9, -4], [-12.17, 3.313], [-11.938, 4.062]], "o": [[-11, 0.75], [14.625, 0.25], [11.25, -3.062], [3.101, -1.055]], "v": [[77.75, 23.25], [45.25, 30.875], [75.625, 48.812], [102.688, 26.812]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 137, "st": 0, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 3, "ty": 4, "nm": "Shape Layer 3", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [136.404, 202.688, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [38.654, 39.688, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.68, "y": 0.495 }, "o": { "x": 0.373, "y": 0 }, "t": 16, "s": [{ "i": [[13.625, 0.25], [0.898, -3.253], [-9.49, -0.463], [-5.899, -0.329], [-3.102, -0.039], [-7.938, -0.375], [-2, 0]], "o": [[-13.625, -0.25], [-1, 3.625], [11.781, 0.575], [4.5, 0.251], [4.937, 0.062], [4.755, 0.225], [2, 0]], "v": [[20.125, 26.5], [2.125, 27.875], [20.032, 29.487], [37.625, 29.874], [48.813, 29.75], [66.25, 30.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.3, "y": 0.474 }, "t": 31, "s": [{ "i": [[13.625, 0.25], [0.091, -3.374], [-9.49, -0.463], [-5.868, -0.691], [-1.92, -2.437], [-5.098, 8.855], [-2, 0]], "o": [[-13.625, -0.25], [-0.163, 6.041], [11.781, 0.575], [4.25, 0.5], [3.25, 4.125], [2.375, -4.125], [2, 0]], "v": [[20.125, 26.5], [2.125, 28.625], [20.094, 35.05], [38, 33.374], [46.375, 40.875], [66.125, 38.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 46, "s": [{ "i": [[13.625, 0.25], [0.151, -3.372], [-9.49, -0.463], [-5.437, -2.312], [0.698, -3.023], [3.25, 19.25], [-2, 0]], "o": [[-13.625, -0.25], [7.375, 0.5], [11.781, 0.575], [3.239, 1.378], [-3, 13], [-2.463, -14.586], [2, 0]], "v": [[20.125, 26.5], [1.125, 34.75], [20.969, 42.8], [43.75, 40.875], [47.5, 54.75], [63, 54], [72.5, 27.25]], "c": true }] }, { "t": 59, "s": [{ "i": [[13.625, 0.25], [-3.37, 0.193], [-9.49, -0.463], [-5.437, -2.312], [0.211, -3.095], [1.341, 18.583], [-2, 0]], "o": [[-13.625, -0.25], [8.75, -0.5], [11.781, 0.575], [3.239, 1.378], [-0.75, 11], [-0.875, -12.125], [2, 0]], "v": [[20.125, 26.5], [1.5, 32.375], [21.344, 40.925], [43, 38.75], [45.5, 52], [64.125, 50.125], [72.5, 27.25]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 153, "st": 16, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 4, "ty": 4, "nm": "Shape Layer 2", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [183, 234.377, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.667, "y": 0.32 }, "o": { "x": 0.333, "y": 0 }, "t": 7, "s": [{ "i": [[0, 0.316], [6.837, 0.024], [-0.25, -0.601], [-3.691, -0.402], [-7.5, 0.016], [-4.866, 0.411]], "o": [[-1.5, -0.395], [-7.929, -0.028], [3.25, 0.506], [3.846, 0.419], [5.771, -0.012], [5.115, -0.432]], "v": [[-44.375, 31.881], [-69.125, 31.739], [-95.375, 31.976], [-85.721, 33.336], [-70.5, 33.984], [-54.509, 33.201]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0.68 }, "t": 20.154, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [-3.691, -3.179], [-7.5, 0.125], [-4.866, 3.25]], "o": [[-1.5, -3.125], [-7.929, -0.221], [3.25, 4], [3.846, 3.312], [5.771, -0.096], [5.115, -3.416]], "v": [[-44.125, 32.125], [-68.875, 31], [-95.125, 32.875], [-85.471, 43.625], [-70.25, 48.75], [-54.259, 42.562]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 34.77, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.125, -8.875], [-12.875, -0.25], [-0.25, 8.125]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.127, 9.003], [12.133, 0.236], [0.388, -12.625]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 52.125], [-70.5, 75.75], [-65.875, 51.625]], "c": true }] }, { "t": 56, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.375, -7.25], [-12.5, -0.25], [0.164, 4.872]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.375, 7.25], [12.5, 0.25], [-0.375, -11.125]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 50.625], [-70.5, 69.75], [-65.875, 50.125]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 144, "st": 7, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 5, "ty": 4, "nm": "Shape Layer 1", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [84, 235.877, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.333, "y": 0 }, "t": 15, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.75, 27.526], [-96.375, 28.651], [-80.875, 31.617], [-60.25, 32.604], [-40.5, 31.028]], "c": true }] }, { "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "t": 20.2, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.875, 30.776], [-96.375, 28.651], [-81, 34.117], [-60.125, 35.729], [-40.5, 33.778]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.167, "y": 0.167 }, "t": 34.5, "s": [{ "i": [[-6.75, 6.25], [18, -2.25], [-3.278, -2.217], [-9, -0.805], [-3.5, 2.645]], "o": [[-12.25, -8], [8.883, 8.702], [4, 2.706], [7.346, 0.657], [3.5, -2.645]], "v": [[-23.75, 29], [-96.75, 27.25], [-80.875, 44.044], [-60, 51.305], [-40.375, 42.52]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 54, "s": [{ "i": [[-7.5, -0.25], [18.75, -4.5], [-0.375, -17.419], [-13.5, 0.195], [0.073, 10.144]], "o": [[-12.25, -8], [8.75, 12.25], [0.181, 8.402], [14.375, -0.208], [-0.125, -17.27]], "v": [[-49.125, 34.625], [-94.75, 28.25], [-72.375, 60.544], [-67.625, 88.805], [-62.625, 60.27]], "c": true }] }, { "t": 74, "s": [{ "i": [[-8.625, -2], [18.75, -4.5], [-0.25, -14.669], [-15.5, 0.195], [0.51, 10.132]], "o": [[-12.25, -8], [8.883, 8.702], [0.143, 8.402], [15.5, -0.195], [-0.75, -14.895]], "v": [[-49.125, 35], [-93.25, 29.625], [-74, 59.169], [-67.5, 83.805], [-60.5, 58.395]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 161, "st": 24, "ct": 1, "bm": 0 }], "markers": [], "props": {} };

// // /* ─────────────────────────────────────────────────────────────────────────────
// //    iOS DETECTION HELPER
// //    Covers: iPhone, iPod, iPad (incl. iPad Pro which reports MacIntel)
// // ───────────────────────────────────────────────────────────────────────────── */
// // const detectIOS = () =>
// //   /iPad|iPhone|iPod/.test(navigator.userAgent) ||
// //   (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

// // /* ─────────────────────────────────────────────────────────────────────────────
// //    FAN LAYOUT
// // ───────────────────────────────────────────────────────────────────────────── */
// // const FAN_PRESETS = {
// //   desktop: [
// //     { x: -32, y: -8, rotate: -20, scale: 0.92, zIndex: 4 },
// //     { x: -21, y: -11, rotate: -12, scale: 0.96, zIndex: 5 },
// //     { x: -10, y: -13, rotate: -5, scale: 1.02, zIndex: 6 },
// //     { x: 0, y: -15, rotate: 0, scale: 1.08, zIndex: 7 },
// //     { x: 10, y: -13, rotate: 5, scale: 1.02, zIndex: 6 },
// //     { x: 21, y: -11, rotate: 12, scale: 0.96, zIndex: 5 },
// //     { x: 32, y: -8, rotate: 20, scale: 0.92, zIndex: 4 },
// //   ],
// //   laptop: [
// //     { x: -30, y: -7, rotate: -19, scale: 0.90, zIndex: 4 },
// //     { x: -20, y: -10, rotate: -11, scale: 0.95, zIndex: 5 },
// //     { x: -9, y: -12, rotate: -4, scale: 1.00, zIndex: 6 },
// //     { x: 0, y: -14, rotate: 0, scale: 1.05, zIndex: 7 },
// //     { x: 9, y: -12, rotate: 4, scale: 1.00, zIndex: 6 },
// //     { x: 20, y: -10, rotate: 11, scale: 0.95, zIndex: 5 },
// //     { x: 30, y: -7, rotate: 19, scale: 0.90, zIndex: 4 },
// //   ],
// //   tablet: [
// //     { x: -28, y: -4, rotate: -18, scale: 0.84, zIndex: 4 },
// //     { x: -18, y: -7, rotate: -10, scale: 0.90, zIndex: 5 },
// //     { x: -8, y: -9, rotate: -4, scale: 0.96, zIndex: 6 },
// //     { x: 0, y: -11, rotate: 0, scale: 1.01, zIndex: 7 },
// //     { x: 8, y: -9, rotate: 4, scale: 0.96, zIndex: 6 },
// //     { x: 18, y: -7, rotate: 10, scale: 0.90, zIndex: 5 },
// //     { x: 28, y: -4, rotate: 18, scale: 0.84, zIndex: 4 },
// //   ],
// //   mobile: [
// //     { x: 0, y: 0, rotate: -6, scale: 1.0, zIndex: 4 },
// //     { x: 0, y: 0, rotate: 4, scale: 1.0, zIndex: 5 },
// //     { x: 0, y: 0, rotate: -8, scale: 1.0, zIndex: 6 },
// //     { x: 0, y: 0, rotate: 6, scale: 1.0, zIndex: 7 },
// //     { x: 0, y: 0, rotate: -4, scale: 1.0, zIndex: 8 },
// //     { x: 0, y: 0, rotate: 7, scale: 1.0, zIndex: 9 },
// //     { x: 0, y: 0, rotate: 0, scale: 1.0, zIndex: 10 },
// //   ],
// //   mobileSmall: [
// //     { x: 0, y: 0, rotate: -6, scale: 1.0, zIndex: 4 },
// //     { x: 0, y: 0, rotate: 4, scale: 1.0, zIndex: 5 },
// //     { x: 0, y: 0, rotate: -8, scale: 1.0, zIndex: 6 },
// //     { x: 0, y: 0, rotate: 6, scale: 1.0, zIndex: 7 },
// //     { x: 0, y: 0, rotate: -4, scale: 1.0, zIndex: 8 },
// //     { x: 0, y: 0, rotate: 7, scale: 1.0, zIndex: 9 },
// //     { x: 0, y: 0, rotate: 0, scale: 1.0, zIndex: 10 },
// //   ],
// // };

// // // ✅ FIX: iPad (768–1024 incl. iPad Pro at exactly 1024px) treated like mobile
// // const isMob = (s) => s === "mobile" || s === "mobileSmall" || s === "tablet" || s === "laptop";

// // /* ═══════════════════════════════════════════════════════════════════════════ */
// // export default function VideoShowcaseSection() {

// //   /* ── Section 1 refs ── */
// //   const roundSectionRef = useRef(null);
// //   const roundCircleRef = useRef(null);
// //   const roundElementRef = useRef(null);
// //   const roundOverlayRef = useRef(null);
// //   const roundButtonRef = useRef(null);
// //   const roundWrapRef = useRef(null);

// //   /* ── Section 3 refs ── */
// //   const socialSectionRef = useRef(null);
// //   const socialWrapperRef = useRef(null);
// //   const socialStickyRef = useRef(null);
// //   const cardRefs = useRef([]);
// //   const videoRefs = useRef([]);

// //   /* ── Lottie ref ── */
// //   const lottieRef = useRef(null);

// //   /* ── State ── */
// //   const [videos, setVideos] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [screenSize, setScreenSize] = useState("desktop");
// //   const [modal, setModal] = useState(null);

// //   /* ── ✅ NEW: iOS detection state ── */
// //   const [iosDevice, setIosDevice] = useState(false);

// //   /* ── Detect iOS on mount (client-side only) ── */
// //   useEffect(() => {
// //     setIosDevice(detectIOS());
// //   }, []);

// //   /* ── Screen-size detection ── */
// //   useEffect(() => {
// //     const detect = () => {
// //       const w = window.innerWidth;
// //       if (w >= 1366) setScreenSize("desktop");
// //       else if (w >= 1025) setScreenSize("laptop");
// //       else if (w >= 768) setScreenSize("tablet");
// //       else if (w >= 480) setScreenSize("mobile");
// //       else setScreenSize("mobileSmall");
// //     };
// //     detect();
// //     window.addEventListener("resize", detect);
// //     return () => window.removeEventListener("resize", detect);
// //   }, []);

// //   /* ── Fetch videos ── */
// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const res = await api.get("/api/videos");
// //         setVideos(res.data || []);
// //       } catch { console.error("Failed to load videos"); }
// //       finally { setLoading(false); }
// //     })();
// //   }, []);

// //   /* ── Hover handlers for drip button ── */
// //   const handleButtonEnter = () => {
// //     if (!lottieRef.current) return;
// //     lottieRef.current.goToAndPlay(0, true);
// //   };

// //   const handleButtonLeave = () => {
// //     if (!lottieRef.current) return;
// //     lottieRef.current.stop();
// //   };

// //   /* ── GSAP ── */
// //   useEffect(() => {
// //     if (!videos.length) return;

// //     const mobile = isMob(screenSize);
// //     const presets = FAN_PRESETS[screenSize] || FAN_PRESETS.desktop;
// //     const videoCount = Math.min(videos.length, presets.length);
// //     const dispVids = videos.slice(0, videoCount);

// //     const ctx = gsap.context(() => {

// //       /* ── S1 – Expanding circle ── */
// //       if (mobile) {
// //         ScrollTrigger.create({
// //           trigger: roundWrapRef.current, start: "top top", end: "bottom bottom",
// //           pin: roundCircleRef.current, pinSpacing: false,
// //         });
// //         gsap.set(roundElementRef.current, {
// //           width: "100vw", height: "100vh",
// //           borderRadius: "0%", scale: 1, opacity: 1,
// //         });
// //         gsap.set(roundOverlayRef.current, { opacity: 0.5 });
// //         gsap.set(roundButtonRef.current, { opacity: 1, scale: 1 });
// //       } else {
// //         const sizes = {
// //           laptop: { s: "12vw", e: "150vw" },
// //           desktop: { s: "10vw", e: "150vw" },
// //         }[screenSize] || { s: "10vw", e: "150vw" };

// //         ScrollTrigger.create({
// //           trigger: roundWrapRef.current, start: "top top", end: "bottom bottom",
// //           pin: roundCircleRef.current, pinSpacing: false, scrub: 0.5,
// //         });
// //         gsap.fromTo(roundElementRef.current,
// //           { width: sizes.s, height: sizes.s, borderRadius: "50%", scale: 1, opacity: 1 },
// //           {
// //             width: sizes.e, height: sizes.e, borderRadius: "50%", scale: 1.2, opacity: 0.9, ease: "none",
// //             scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true }
// //           }
// //         );
// //         gsap.fromTo(roundOverlayRef.current, { opacity: 0.3 },
// //           {
// //             opacity: 0.8, ease: "none",
// //             scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8 }
// //           }
// //         );
// //         gsap.fromTo(roundButtonRef.current, { opacity: 1, scale: 1 },
// //           {
// //             opacity: 0, scale: 1.5, ease: "none",
// //             scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "center center", scrub: 0.8 }
// //           }
// //         );
// //       }

// //       /* ── S3 – Fan cards ── */
// //       if (!socialSectionRef.current || !cardRefs.current.length) return;

// //       ScrollTrigger.create({
// //         trigger: socialWrapperRef.current,
// //         start: "top top", end: "bottom bottom",
// //         pin: socialStickyRef.current, pinSpacing: false,
// //       });

// //       cardRefs.current.forEach((card, i) => {
// //         if (!card) return;
// //         gsap.set(card, {
// //           xPercent: -50, yPercent: -50,
// //           x: 0, y: "85vh",
// //           rotation: 0, scale: 0.35, opacity: 0,
// //           zIndex: i + 1,
// //         });
// //       });

// //       const slotW = 1 / videoCount;
// //       const animDur = slotW * 0.7;
// //       const s3Tl = gsap.timeline();

// //       dispVids.forEach((_, i) => {
// //         const card = cardRefs.current[i];
// //         if (!card) return;
// //         const pos = presets[i % presets.length];
// //         const tStart = i * slotW;

// //         s3Tl.to(card, {
// //           xPercent: -50, yPercent: -50,
// //           x: `${pos.x}vw`, y: `${pos.y}vh`,
// //           rotation: pos.rotate, scale: pos.scale, opacity: 1,
// //           ease: "power3.out", duration: animDur,
// //           // ✅ iOS FIX: force play once card becomes visible in GSAP animation
// //           onComplete: () => {
// //             if (iosDevice) {
// //               const vid = videoRefs.current[i];
// //               if (vid) {
// //                 vid.muted = true;
// //                 vid.play().catch(() => {});
// //               }
// //             }
// //           },
// //         }, tStart);
// //       });

// //       ScrollTrigger.create({
// //         trigger: socialWrapperRef.current, start: "top top", end: "bottom bottom",
// //         scrub: 1, animation: s3Tl,
// //       });

// //       // ✅ iOS FIX: Backup trigger — fires when section enters viewport
// //       // Catches cases where GSAP onComplete runs before iOS allows play
// //       if (iosDevice) {
// //         ScrollTrigger.create({
// //           trigger: socialWrapperRef.current,
// //           start: "top 80%",
// //           once: true,
// //           onEnter: () => {
// //             videoRefs.current.forEach((vid) => {
// //               if (vid) {
// //                 vid.muted = true;
// //                 vid.play().catch(() => {});
// //               }
// //             });
// //           },
// //         });
// //       }

// //       /* Parallax text */
// //       const textLines = socialSectionRef.current.querySelectorAll(".sf-bg-line");
// //       textLines.forEach((line, i) => {
// //         gsap.fromTo(line,
// //           { xPercent: i % 2 === 0 ? -10 : 10 },
// //           {
// //             xPercent: i % 2 === 0 ? 10 : -10, ease: "none",
// //             scrollTrigger: {
// //               trigger: socialSectionRef.current,
// //               start: "top bottom", end: "bottom top", scrub: 2,
// //             },
// //           }
// //         );
// //       });
// //     });

// //     ScrollTrigger.refresh();
// //     const onResize = () => setTimeout(() => ScrollTrigger.refresh(), 100);
// //     window.addEventListener("resize", onResize);
// //     return () => { ctx.revert(); window.removeEventListener("resize", onResize); };

// //   // ✅ Added iosDevice to dependency array so GSAP re-runs after iOS is detected
// //   }, [videos, screenSize, iosDevice]);

// //   /* ── Derived ── */
// //   const mobile = isMob(screenSize);
// //   const presets = FAN_PRESETS[screenSize] || FAN_PRESETS.desktop;
// //   const videoCount = Math.min(videos.length, presets.length);
// //   const dispVids = videos.slice(0, videoCount);

// //   if (loading) return null;

// //   /* ═══════════════════════════════════════════════════════════════════════ */
// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;700;900&display=swap');
// //         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

// //         /* ─── S1 – Round expanding video ─── */
// //         .s1 { position: relative; background: #523122; overflow: hidden; width: 100%; z-index: 10; }
// //         .s1-wrap { position: relative; width: 100%; height: 200vh; }
// //         @media(max-width:1024px){ .s1-wrap { height: 130vh; } }

// //         .s1-sticky { position: relative; display: flex; align-items: center;
// //                      justify-content: center; width: 100%; height: 100vh; }
// //         .s1-circle { border-radius: 50%; overflow: hidden; position: relative;
// //                      will-change: width, height, scale; transition: box-shadow .3s;
// //                      box-shadow: 0 0 40px rgba(0,0,0,0.45);
// //                      width: clamp(80px,10vw,180px); height: clamp(80px,10vw,180px); }
// //         @media(max-width:1024px){
// //           .s1-circle { width: 100vw !important; height: 100vh !important; border-radius: 0 !important; }
// //         }

// //         .s1-overlay  { position: absolute; inset: 0; background: rgba(0,0,0,0.3); z-index: 2; pointer-events: none; }
// //         .s1-vid-wrap { width: 100%; height: 100%; position: relative; z-index: 1; }
// //         .s1-vid-wrap video { width: 100%; height: 100%; object-fit: cover; display: block; }
// //         .s1-play-link { position: absolute; top: 50%; left: 50%;
// //                         transform: translate(-50%,-50%); z-index: 10; cursor: pointer; text-decoration: none; }
// //         .s1-play-btn  { border-radius: 50%; position: relative; display: flex;
// //                         align-items: center; justify-content: center; background: transparent;
// //                         cursor: pointer; will-change: opacity, scale;
// //                         width: clamp(80px,12vw,180px); height: clamp(80px,12vw,180px); }
// //         .s1-play-bg   { position: absolute; inset: 0; border-radius: 50%;
// //                         background: rgba(0,0,0,0.65); z-index: 1; transition: background .3s; }
// //         .s1-play-btn:hover .s1-play-bg { background: rgba(0,0,0,0.85); }
// //         .s1-play-icon { z-index: 3; color: #fff; font-size: clamp(16px,3vw,42px); }
// //         .s1-play-icon::after { content: "▶"; }
// //         .s1-svg-ring  { width: 100%; height: 100%; position: absolute; z-index: 2;
// //                         animation: s1spin 18s linear infinite; }
// //         @keyframes s1spin { to { transform: rotate(360deg); } }
// //         .s1-svg-ring text { font-family: 'Antonio', sans-serif; font-weight: 700;
// //                             fill: rgba(255,255,255,0.9); letter-spacing: .15em;
// //                             font-size: clamp(12px,1.1vw,14px); }
// //         @media(max-width:767px){ .s1-svg-ring text { font-size: 20px; } }

// //         /* ─── S3 – Social + API videos ─── */
// //         .s3-outer  { background: #222123; position: relative; z-index: 20; overflow: visible; }
// //         .s3-driver {
// //           background: #ffd500; width: 100%;
// //           height: var(--s3-driver-height, 500vh);
// //           display: flex; flex-direction: column; align-items: center;
// //           position: relative; overflow: visible;
// //         }
// //         @media(max-width:767px){ .s3-driver { --s3-driver-height: 190vh; } }
// //         .s3-sticky { position: sticky; top: 0; width: 100%; height: 100vh; z-index: 4; overflow: hidden; }

// //         /* ─── Fan cards ─── */
// //         .s3-card {
// //           position: absolute; top: 69%; left: 50%;
// //           border: 0.30vw solid #ffd500; border-radius: 2vw;
// //           overflow: hidden; width: clamp(160px,18vw,280px);
// //           aspect-ratio: 9/16; cursor: pointer;
// //           will-change: transform, opacity;
// //           box-shadow: 0 20px 40px rgba(0,0,0,0.52); background: #111;
// //           -webkit-transform: translateZ(0); transform: translateZ(0);
// //         }
// //         .s3-card:hover { box-shadow: 0 28px 56px rgba(0,0,0,0.7); }
// //         .s3-card video { width: 100%; height: 100%; object-fit: cover; pointer-events: none; display: block; }
// //         @media(max-width:1366px){ .s3-card { width: clamp(150px,17vw,260px); } }
// //         @media(max-width:1024px){ .s3-card { width: clamp(160px,16vw,240px); } }
// //         @media(max-width:991px){
// //           .s3-card { top: 42%; width: 55vw; height: 98vw; border-width: 4px; border-radius: 16px; }
// //         }
// //         @media(max-width:821px){ .s3-card { width: 55vw; height: 90vw; border-width: 3px; } }
// //         @media(max-width:767px){ .s3-card { width: 68vw; height: 121vw; border-width: 3px; } }
// //         @media(max-width:541px){ .s3-card { width: 68vw; height: 101vw; border-width: 3px; border-radius: 16px; } }
// //         @media(max-width:479px){ .s3-card { width: 68vw; height: 121vw; border-width: 3px; border-radius: 16px; } }

// //         /* ─── Explore All — Lottie drip button ─── */
// //         .s3-cta-wrap {
// //           position: absolute; bottom: 5.5vh; left: 50%;
// //           transform: translateX(-50%); z-index: 20;
// //         }
// //         .liquid-button-wrapper {
// //           position: relative; display: flex;
// //           align-items: center; justify-content: center; width: fit-content;
// //         }
// //         .lottie-animation-2 {
// //           z-index: 1; perspective-origin: 50% 0; transform-origin: 50% 0;
// //           width: 12.5vw; height: 12.5vw; position: absolute;
// //           top: -4.5vw; right: 0; bottom: 0; left: 0; pointer-events: none;
// //         }
// //         .liquid-button {
// //           position: relative; z-index: 2; display: inline-flex;
// //           align-items: center; justify-content: center;
// //           background: #80542c; border-radius: 100vw; padding: .75em 3em;
// //           text-decoration: none; cursor: pointer; transition: background .3s; white-space: nowrap;
// //         }
// //         .liquid-button:hover { background: #7a5029; }
// //         .button-text {
// //           position: relative; z-index: 2; letter-spacing: -.01vw;
// //           font-family: Antonio, sans-serif; font-size: clamp(.88rem, 1.1vw, 1.15rem);
// //           font-weight: 700; text-transform: uppercase; color: #ffd500; white-space: nowrap;
// //         }
// //         @media(max-width:1024px){ .lottie-animation-2 { display: none; } }
// //         @media(max-width:991px){ .liquid-button { padding: .65em 2.2em; } }

// //         /* ─── Big parallax text ─── */
// //         .s3-bg-wrap {
// //           position: absolute; top: 0; left: 0; right: 0; padding-top: 5vw;
// //           display: flex; flex-direction: column; align-items: center;
// //           pointer-events: none; overflow: hidden; z-index: 2;
// //         }
// //         .sf-bg-line {
// //           font-family: 'Antonio', sans-serif; font-size: 13.5vw; font-weight: 700;
// //           line-height: 1.05; letter-spacing: -.4vw; text-transform: uppercase;
// //           color: #222123; will-change: transform; user-select: none;
// //         }
// //         .sf-bg-line.orange { color: #523121; }
// //         .sf-bg-line.right  { text-align: right; width: 100%; }

// //         /* ─── Modal ─── */
// //         .vmodal-bg {
// //           position: fixed; inset: 0; background: rgba(0,0,0,0.97);
// //           display: flex; align-items: center; justify-content: center;
// //           z-index: 9999; padding: clamp(10px,3vw,30px); animation: vmFadeIn .25s ease;
// //         }
// //         @keyframes vmFadeIn { from { opacity: 0 } to { opacity: 1 } }
// //         .vmodal-box {
// //           position: relative; width: 100%; max-width: min(800px,92vw);
// //           aspect-ratio: 9/16; animation: vmSlide .28s ease;
// //         }
// //         @keyframes vmSlide {
// //           from { transform: translateY(22px); opacity: 0 }
// //           to   { transform: translateY(0);    opacity: 1 }
// //         }
// //         .vmodal-box video { width: 100%; height: 100%; border: none; border-radius: 12px; }
// //         .vmodal-close {
// //           position: absolute; top: -46px; right: 0;
// //           background: #fff; color: #523122; border: none; border-radius: 50%;
// //           font-size: 22px; cursor: pointer; width: 40px; height: 40px;
// //           display: flex; align-items: center; justify-content: center;
// //           transition: all .25s; box-shadow: 0 2px 12px rgba(0,0,0,0.25);
// //         }
// //         .vmodal-close:hover { background: #523122; color: #fff; transform: scale(1.12); }

// //         /* ─── Accessibility ─── */
// //         @media(prefers-reduced-motion:reduce){
// //           .s1-svg-ring { animation: none !important; }
// //           .s3-card, .s1-circle { transition: none !important; animation: none !important; }
// //         }
// //         @media(hover:none) and (pointer:coarse){
// //           .s3-card:hover, .liquid-button:hover { transform: none; box-shadow: none; }
// //         }
// //       `}</style>

// //       {/* ══════════════════════════════════════════════════════════════
// //           SECTION 1 – Round expanding circle video
// //       ══════════════════════════════════════════════════════════════ */}
// //       <div className="s1" ref={roundSectionRef}>
// //         <div className="s1-wrap" ref={roundWrapRef}>
// //           <div className="s1-sticky" ref={roundCircleRef}>
// //             <a
// //               href="#"
// //               className="s1-play-link"
// //               onClick={(e) => {
// //                 e.preventDefault();
// //                 setModal({ src: "Videos/Video2.mp4" });
// //               }}
// //               aria-label="Play full video"
// //             >
// //               <div className="s1-play-btn" ref={roundButtonRef}>
// //                 <div className="s1-play-bg" />
// //                 <svg className="s1-svg-ring" viewBox="0 0 200 200">
// //                   <defs>
// //                     <path id="rp"
// //                       d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
// //                       fill="none" />
// //                   </defs>
// //                   <text>
// //                     <textPath href="#rp" startOffset="50%" textAnchor="middle">
// //                       PLAY VIDEO • PLAY VIDEO • PLAY VIDEO •
// //                     </textPath>
// //                   </text>
// //                 </svg>
// //                 <span className="s1-play-icon" aria-hidden="true" />
// //               </div>
// //             </a>
// //             <div className="s1-circle" ref={roundElementRef}>
// //               <div className="s1-overlay" ref={roundOverlayRef} />
// //               <div className="s1-vid-wrap">
// //                 {/*
// //                   ✅ iOS FIX: autoPlay + muted + playsInline is the required combination
// //                   for Safari on iPhone/iPad to autoplay without black screen.
// //                   This was already correct here — keeping as-is.
// //                 */}
// //                 <video autoPlay loop muted playsInline poster="images/product1.png">
// //                   <source src="Videos/Video2.mp4" type="video/mp4" />
// //                 </video>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ══════════════════════════════════════════════════════════════
// //           SECTION 3 – Social feedback + API videos combined
// //       ══════════════════════════════════════════════════════════════ */}
// //       <div className="s3-outer" ref={socialSectionRef}>
// //         <div className="s3-driver" ref={socialWrapperRef}>
// //           <div className="s3-sticky" ref={socialStickyRef}>

// //             {/* Parallax background text */}
// //             <div className="s3-bg-wrap">
// //               <span className="sf-bg-line">What's</span>
// //               <span className="sf-bg-line orange">everyone</span>
// //               <span className="sf-bg-line right">talking</span>
// //             </div>

// //             {/* API video cards */}
// //             {dispVids.map((v, i) => (
// //               <div
// //                 key={v._id}
// //                 ref={(el) => (cardRefs.current[i] = el)}
// //                 className="s3-card"
// //                 onClick={() => setModal({ src: v.videoUrl })}
// //                 onMouseEnter={() => !mobile && videoRefs.current[i]?.play()}
// //                 onMouseLeave={() => !mobile && videoRefs.current[i]?.pause()}
// //               >
// //                 <video
// //                   ref={(el) => (videoRefs.current[i] = el)}
// //                   src={v.videoUrl}
// //                   muted
// //                   playsInline
// //                   preload="metadata"
// //                   /*
// //                     ✅ iOS FIX:
// //                     - autoPlay={iosDevice}  → only autoplay on iPhone/iPad, not desktop
// //                     - loop={iosDevice}      → loop on iOS (keeps playing); desktop pauses on hover-out
// //                     - Desktop keeps existing hover-to-play behaviour unchanged
// //                   */
// //                   autoPlay={iosDevice}
// //                   loop={iosDevice}
// //                 />
// //               </div>
// //             ))}

// //             {/* ══════════════════════════════════════════════════════
// //                 Explore All — drip plays only on hover (desktop/laptop)
// //             ══════════════════════════════════════════════════════ */}
// //             <div className="s3-cta-wrap">
// //               <div
// //                 className="liquid-button-wrapper"
// //                 onMouseEnter={handleButtonEnter}
// //                 onMouseLeave={handleButtonLeave}
// //               >
// //                 {/* Lottie drip layer — hidden on tablet + mobile via CSS */}
// //                 <div className="lottie-animation-2">
// //                   <Lottie
// //                     lottieRef={lottieRef}
// //                     animationData={DRIP_ANIMATION}
// //                     loop={false}
// //                     autoplay={false}
// //                     style={{ width: "100%", height: "100%" }}
// //                   />
// //                 </div>

// //                 {/* Pill link */}
// //                 <a href="/product" className="liquid-button">
// //                   <div className="button-text">explore all</div>
// //                 </a>
// //               </div>
// //             </div>

// //           </div>{/* /sticky */}
// //         </div>{/* /driver */}
// //       </div>

// //       {/* ══════════════════════════════════════════════════════════════
// //           MODAL
// //       ══════════════════════════════════════════════════════════════ */}
// //       {modal && (
// //         <div className="vmodal-bg" onClick={() => setModal(null)}>
// //           <div className="vmodal-box" onClick={(e) => e.stopPropagation()}>
// //             <button className="vmodal-close" onClick={() => setModal(null)} aria-label="Close">×</button>
// //             {/*
// //               ✅ iOS FIX:
// //               - muted={iosDevice} → iOS requires muted for autoPlay; user can unmute via controls
// //               - playsInline → prevents fullscreen takeover on iPhone
// //               - controls → always shown so user can play/pause/unmute
// //             */}
// //             <video
// //               src={modal.src}
// //               controls
// //               autoPlay
// //               playsInline
// //               muted={iosDevice}
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // VideoShowcaseSection.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lottie from "lottie-react"; // npm install lottie-react
// import api from "../api/axios";

// gsap.registerPlugin(ScrollTrigger);


// /* ═══════════════════════════════════════════════════════════════════════════
//    LOTTIE DRIP ANIMATION — embedded inline, no external file needed
// ═══════════════════════════════════════════════════════════════════════════ */
// const DRIP_ANIMATION = { "v": "5.12.1", "fr": 30, "ip": 0, "op": 76, "w": 315, "h": 317, "nm": "!!bttn_hover", "ddd": 0, "assets": [], "layers": [{ "ddd": 0, "ind": 2, "ty": 4, "nm": "Shape Layer 4", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [152.75, 163.25, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [0, 0, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.838, "y": 0.882 }, "o": { "x": 0.333, "y": 0 }, "t": 0, "s": [{ "i": [[11, -0.75], [9, -4], [-12.609, -0.287], [-7.188, 2.312]], "o": [[-11, 0.75], [4.5, -2.375], [8.25, 0.188], [1.919, -0.617]], "v": [[77.75, 23.25], [45.25, 30.375], [76.875, 30.188], [101.938, 28.938]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.619, "y": 0.502 }, "t": 29, "s": [{ "i": [[11, -0.75], [9, -4], [-14.125, 2.312], [-12.812, 4.062]], "o": [[-11, 0.75], [22.875, 4.875], [12.503, -2.047], [1.921, -0.609]], "v": [[77.75, 23.25], [45.25, 30.375], [74.375, 50.688], [102.812, 27.312]], "c": true }] }, { "t": 44, "s": [{ "i": [[11, -0.75], [9, -4], [-12.17, 3.313], [-11.938, 4.062]], "o": [[-11, 0.75], [14.625, 0.25], [11.25, -3.062], [3.101, -1.055]], "v": [[77.75, 23.25], [45.25, 30.875], [75.625, 48.812], [102.688, 26.812]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 137, "st": 0, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 3, "ty": 4, "nm": "Shape Layer 3", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [136.404, 202.688, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [38.654, 39.688, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.68, "y": 0.495 }, "o": { "x": 0.373, "y": 0 }, "t": 16, "s": [{ "i": [[13.625, 0.25], [0.898, -3.253], [-9.49, -0.463], [-5.899, -0.329], [-3.102, -0.039], [-7.938, -0.375], [-2, 0]], "o": [[-13.625, -0.25], [-1, 3.625], [11.781, 0.575], [4.5, 0.251], [4.937, 0.062], [4.755, 0.225], [2, 0]], "v": [[20.125, 26.5], [2.125, 27.875], [20.032, 29.487], [37.625, 29.874], [48.813, 29.75], [66.25, 30.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.3, "y": 0.474 }, "t": 31, "s": [{ "i": [[13.625, 0.25], [0.091, -3.374], [-9.49, -0.463], [-5.868, -0.691], [-1.92, -2.437], [-5.098, 8.855], [-2, 0]], "o": [[-13.625, -0.25], [-0.163, 6.041], [11.781, 0.575], [4.25, 0.5], [3.25, 4.125], [2.375, -4.125], [2, 0]], "v": [[20.125, 26.5], [2.125, 28.625], [20.094, 35.05], [38, 33.374], [46.375, 40.875], [66.125, 38.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 46, "s": [{ "i": [[13.625, 0.25], [0.151, -3.372], [-9.49, -0.463], [-5.437, -2.312], [0.698, -3.023], [3.25, 19.25], [-2, 0]], "o": [[-13.625, -0.25], [7.375, 0.5], [11.781, 0.575], [3.239, 1.378], [-3, 13], [-2.463, -14.586], [2, 0]], "v": [[20.125, 26.5], [1.125, 34.75], [20.969, 42.8], [43.75, 40.875], [47.5, 54.75], [63, 54], [72.5, 27.25]], "c": true }] }, { "t": 59, "s": [{ "i": [[13.625, 0.25], [-3.37, 0.193], [-9.49, -0.463], [-5.437, -2.312], [0.211, -3.095], [1.341, 18.583], [-2, 0]], "o": [[-13.625, -0.25], [8.75, -0.5], [11.781, 0.575], [3.239, 1.378], [-0.75, 11], [-0.875, -12.125], [2, 0]], "v": [[20.125, 26.5], [1.5, 32.375], [21.344, 40.925], [43, 38.75], [45.5, 52], [64.125, 50.125], [72.5, 27.25]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 153, "st": 16, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 4, "ty": 4, "nm": "Shape Layer 2", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [183, 234.377, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.667, "y": 0.32 }, "o": { "x": 0.333, "y": 0 }, "t": 7, "s": [{ "i": [[0, 0.316], [6.837, 0.024], [-0.25, -0.601], [-3.691, -0.402], [-7.5, 0.016], [-4.866, 0.411]], "o": [[-1.5, -0.395], [-7.929, -0.028], [3.25, 0.506], [3.846, 0.419], [5.771, -0.012], [5.115, -0.432]], "v": [[-44.375, 31.881], [-69.125, 31.739], [-95.375, 31.976], [-85.721, 33.336], [-70.5, 33.984], [-54.509, 33.201]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0.68 }, "t": 20.154, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [-3.691, -3.179], [-7.5, 0.125], [-4.866, 3.25]], "o": [[-1.5, -3.125], [-7.929, -0.221], [3.25, 4], [3.846, 3.312], [5.771, -0.096], [5.115, -3.416]], "v": [[-44.125, 32.125], [-68.875, 31], [-95.125, 32.875], [-85.471, 43.625], [-70.25, 48.75], [-54.259, 42.562]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 34.77, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.125, -8.875], [-12.875, -0.25], [-0.25, 8.125]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.127, 9.003], [12.133, 0.236], [0.388, -12.625]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 52.125], [-70.5, 75.75], [-65.875, 51.625]], "c": true }] }, { "t": 56, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.375, -7.25], [-12.5, -0.25], [0.164, 4.872]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.375, 7.25], [12.5, 0.25], [-0.375, -11.125]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 50.625], [-70.5, 69.75], [-65.875, 50.125]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 144, "st": 7, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 5, "ty": 4, "nm": "Shape Layer 1", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [84, 235.877, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.333, "y": 0 }, "t": 15, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.75, 27.526], [-96.375, 28.651], [-80.875, 31.617], [-60.25, 32.604], [-40.5, 31.028]], "c": true }] }, { "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "t": 20.2, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.875, 30.776], [-96.375, 28.651], [-81, 34.117], [-60.125, 35.729], [-40.5, 33.778]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.167, "y": 0.167 }, "t": 34.5, "s": [{ "i": [[-6.75, 6.25], [18, -2.25], [-3.278, -2.217], [-9, -0.805], [-3.5, 2.645]], "o": [[-12.25, -8], [8.883, 8.702], [4, 2.706], [7.346, 0.657], [3.5, -2.645]], "v": [[-23.75, 29], [-96.75, 27.25], [-80.875, 44.044], [-60, 51.305], [-40.375, 42.52]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 54, "s": [{ "i": [[-7.5, -0.25], [18.75, -4.5], [-0.375, -17.419], [-13.5, 0.195], [0.073, 10.144]], "o": [[-12.25, -8], [8.75, 12.25], [0.181, 8.402], [14.375, -0.208], [-0.125, -17.27]], "v": [[-49.125, 34.625], [-94.75, 28.25], [-72.375, 60.544], [-67.625, 88.805], [-62.625, 60.27]], "c": true }] }, { "t": 74, "s": [{ "i": [[-8.625, -2], [18.75, -4.5], [-0.25, -14.669], [-15.5, 0.195], [0.51, 10.132]], "o": [[-12.25, -8], [8.883, 8.702], [0.143, 8.402], [15.5, -0.195], [-0.75, -14.895]], "v": [[-49.125, 35], [-93.25, 29.625], [-74, 59.169], [-67.5, 83.805], [-60.5, 58.395]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 161, "st": 24, "ct": 1, "bm": 0 }], "markers": [], "props": {} };

// /* ─────────────────────────────────────────────────────────────────────────────
//    iOS DETECTION HELPER
//    Covers: iPhone, iPod, iPad (incl. iPad Pro which reports MacIntel)
// ───────────────────────────────────────────────────────────────────────────── */
// const detectIOS = () =>
//   /iPad|iPhone|iPod/.test(navigator.userAgent) ||
//   (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

// /* ─────────────────────────────────────────────────────────────────────────────
//    FAN LAYOUT
// ───────────────────────────────────────────────────────────────────────────── */
// const FAN_PRESETS = {
//   desktop: [
//     { x: -32, y: -8, rotate: -20, scale: 0.92, zIndex: 4 },
//     { x: -21, y: -11, rotate: -12, scale: 0.96, zIndex: 5 },
//     { x: -10, y: -13, rotate: -5, scale: 1.02, zIndex: 6 },
//     { x: 0, y: -15, rotate: 0, scale: 1.08, zIndex: 7 },
//     { x: 10, y: -13, rotate: 5, scale: 1.02, zIndex: 6 },
//     { x: 21, y: -11, rotate: 12, scale: 0.96, zIndex: 5 },
//     { x: 32, y: -8, rotate: 20, scale: 0.92, zIndex: 4 },
//   ],
//   laptop: [
//     { x: -30, y: -7, rotate: -19, scale: 0.90, zIndex: 4 },
//     { x: -20, y: -10, rotate: -11, scale: 0.95, zIndex: 5 },
//     { x: -9, y: -12, rotate: -4, scale: 1.00, zIndex: 6 },
//     { x: 0, y: -14, rotate: 0, scale: 1.05, zIndex: 7 },
//     { x: 9, y: -12, rotate: 4, scale: 1.00, zIndex: 6 },
//     { x: 20, y: -10, rotate: 11, scale: 0.95, zIndex: 5 },
//     { x: 30, y: -7, rotate: 19, scale: 0.90, zIndex: 4 },
//   ],
//   tablet: [
//     { x: -28, y: -4, rotate: -18, scale: 0.84, zIndex: 4 },
//     { x: -18, y: -7, rotate: -10, scale: 0.90, zIndex: 5 },
//     { x: -8, y: -9, rotate: -4, scale: 0.96, zIndex: 6 },
//     { x: 0, y: -11, rotate: 0, scale: 1.01, zIndex: 7 },
//     { x: 8, y: -9, rotate: 4, scale: 0.96, zIndex: 6 },
//     { x: 18, y: -7, rotate: 10, scale: 0.90, zIndex: 5 },
//     { x: 28, y: -4, rotate: 18, scale: 0.84, zIndex: 4 },
//   ],
//   mobile: [
//     { x: 0, y: 0, rotate: -6, scale: 1.0, zIndex: 4 },
//     { x: 0, y: 0, rotate: 4, scale: 1.0, zIndex: 5 },
//     { x: 0, y: 0, rotate: -8, scale: 1.0, zIndex: 6 },
//     { x: 0, y: 0, rotate: 6, scale: 1.0, zIndex: 7 },
//     { x: 0, y: 0, rotate: -4, scale: 1.0, zIndex: 8 },
//     { x: 0, y: 0, rotate: 7, scale: 1.0, zIndex: 9 },
//     { x: 0, y: 0, rotate: 0, scale: 1.0, zIndex: 10 },
//   ],
//   mobileSmall: [
//     { x: 0, y: 0, rotate: -6, scale: 1.0, zIndex: 4 },
//     { x: 0, y: 0, rotate: 4, scale: 1.0, zIndex: 5 },
//     { x: 0, y: 0, rotate: -8, scale: 1.0, zIndex: 6 },
//     { x: 0, y: 0, rotate: 6, scale: 1.0, zIndex: 7 },
//     { x: 0, y: 0, rotate: -4, scale: 1.0, zIndex: 8 },
//     { x: 0, y: 0, rotate: 7, scale: 1.0, zIndex: 9 },
//     { x: 0, y: 0, rotate: 0, scale: 1.0, zIndex: 10 },
//   ],
// };

// // ✅ FIX: iPad (768–1024 incl. iPad Pro at exactly 1024px) treated like mobile
// const isMob = (s) => s === "mobile" || s === "mobileSmall" || s === "tablet" || s === "laptop";

// /* ═══════════════════════════════════════════════════════════════════════════ */
// export default function VideoShowcaseSection() {

//   /* ── Section 1 refs ── */
//   const roundSectionRef = useRef(null);
//   const roundCircleRef = useRef(null);
//   const roundElementRef = useRef(null);
//   const roundOverlayRef = useRef(null);
//   const roundButtonRef = useRef(null);
//   const roundWrapRef = useRef(null);

//   /* ── Section 3 refs ── */
//   const socialSectionRef = useRef(null);
//   const socialWrapperRef = useRef(null);
//   const socialStickyRef = useRef(null);
//   const cardRefs = useRef([]);
//   const videoRefs = useRef([]);

//   /* ── Lottie ref ── */
//   const lottieRef = useRef(null);

//   /* ── State ── */
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [screenSize, setScreenSize] = useState("desktop");
//   const [modal, setModal] = useState(null);

//   /* ── ✅ NEW: iOS detection state ── */
//   const [iosDevice, setIosDevice] = useState(false);

//   /* ── Detect iOS on mount (client-side only) ── */
//   useEffect(() => {
//     setIosDevice(detectIOS());
//   }, []);

//   /* ── Screen-size detection ── */
//   useEffect(() => {
//     const detect = () => {
//       const w = window.innerWidth;
//       if (w >= 1366) setScreenSize("desktop");
//       else if (w >= 1025) setScreenSize("laptop");
//       else if (w >= 768) setScreenSize("tablet");
//       else if (w >= 480) setScreenSize("mobile");
//       else setScreenSize("mobileSmall");
//     };
//     detect();
//     window.addEventListener("resize", detect);
//     return () => window.removeEventListener("resize", detect);
//   }, []);

//   /* ── Fetch videos ── */
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await api.get("/api/videos");
//         setVideos(res.data || []);
//       } catch { console.error("Failed to load videos"); }
//       finally { setLoading(false); }
//     })();
//   }, []);

//   /* ── Hover handlers for drip button ── */
//   const handleButtonEnter = () => {
//     if (!lottieRef.current) return;
//     lottieRef.current.goToAndPlay(0, true);
//   };

//   const handleButtonLeave = () => {
//     if (!lottieRef.current) return;
//     lottieRef.current.stop();
//   };

//   /* ── GSAP ── */
//   useEffect(() => {
//     if (!videos.length) return;

//     const mobile = isMob(screenSize);
//     const presets = FAN_PRESETS[screenSize] || FAN_PRESETS.desktop;
//     const videoCount = Math.min(videos.length, presets.length);
//     const dispVids = videos.slice(0, videoCount);

//     const ctx = gsap.context(() => {

//       /* ── S1 – Expanding circle ── */
//       if (mobile) {
//         ScrollTrigger.create({
//           trigger: roundWrapRef.current, start: "top top", end: "bottom bottom",
//           pin: roundCircleRef.current, pinSpacing: false,
//         });
//         gsap.set(roundElementRef.current, {
//           width: "100vw", height: "100vh",
//           borderRadius: "0%", scale: 1, opacity: 1,
//         });
//         gsap.set(roundOverlayRef.current, { opacity: 0.5 });
//         gsap.set(roundButtonRef.current, { opacity: 1, scale: 1 });
//       } else {
//         const sizes = {
//           laptop: { s: "12vw", e: "150vw" },
//           desktop: { s: "10vw", e: "150vw" },
//         }[screenSize] || { s: "10vw", e: "150vw" };

//         ScrollTrigger.create({
//           trigger: roundWrapRef.current, start: "top top", end: "bottom bottom",
//           pin: roundCircleRef.current, pinSpacing: false, scrub: 0.5,
//         });
//         gsap.fromTo(roundElementRef.current,
//           { width: sizes.s, height: sizes.s, borderRadius: "50%", scale: 1, opacity: 1 },
//           {
//             width: sizes.e, height: sizes.e, borderRadius: "50%", scale: 1.2, opacity: 0.9, ease: "none",
//             scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true }
//           }
//         );
//         gsap.fromTo(roundOverlayRef.current, { opacity: 0.3 },
//           {
//             opacity: 0.8, ease: "none",
//             scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.8 }
//           }
//         );
//         gsap.fromTo(roundButtonRef.current, { opacity: 1, scale: 1 },
//           {
//             opacity: 0, scale: 1.5, ease: "none",
//             scrollTrigger: { trigger: roundWrapRef.current, start: "top top", end: "center center", scrub: 0.8 }
//           }
//         );
//       }

//       /* ── S3 – Fan cards ── */
//       if (!socialSectionRef.current || !cardRefs.current.length) return;

//       ScrollTrigger.create({
//         trigger: socialWrapperRef.current,
//         start: "top top", end: "bottom bottom",
//         pin: socialStickyRef.current, pinSpacing: false,
//       });

//       cardRefs.current.forEach((card, i) => {
//         if (!card) return;
//         gsap.set(card, {
//           xPercent: -50, yPercent: -50,
//           x: 0, y: "85vh",
//           rotation: 0, scale: 0.35, opacity: 0,
//           zIndex: i + 1,
//         });
//       });

//       const slotW = 1 / videoCount;
//       const animDur = slotW * 0.7;
//       const s3Tl = gsap.timeline();

//       dispVids.forEach((_, i) => {
//         const card = cardRefs.current[i];
//         if (!card) return;
//         const pos = presets[i % presets.length];
//         const tStart = i * slotW;

//         s3Tl.to(card, {
//           xPercent: -50, yPercent: -50,
//           x: `${pos.x}vw`, y: `${pos.y}vh`,
//           rotation: pos.rotate, scale: pos.scale, opacity: 1,
//           ease: "power3.out", duration: animDur,
//           // ✅ iOS FIX: force play once card becomes visible in GSAP animation
//           onComplete: () => {
//             if (iosDevice) {
//               const vid = videoRefs.current[i];
//               if (vid) {
//                 vid.muted = true;
//                 vid.play().catch(() => {});
//               }
//             }
//           },
//         }, tStart);
//       });

//       ScrollTrigger.create({
//         trigger: socialWrapperRef.current, start: "top top", end: "bottom bottom",
//         scrub: 1, animation: s3Tl,
//       });

//       // ✅ iOS FIX: Backup trigger — fires when section enters viewport
//       // Catches cases where GSAP onComplete runs before iOS allows play
//       if (iosDevice) {
//         ScrollTrigger.create({
//           trigger: socialWrapperRef.current,
//           start: "top 80%",
//           once: true,
//           onEnter: () => {
//             videoRefs.current.forEach((vid) => {
//               if (vid) {
//                 vid.muted = true;
//                 vid.play().catch(() => {});
//               }
//             });
//           },
//         });
//       }

//       /* Parallax text */
//       const textLines = socialSectionRef.current.querySelectorAll(".sf-bg-line");
//       textLines.forEach((line, i) => {
//         gsap.fromTo(line,
//           { xPercent: i % 2 === 0 ? -10 : 10 },
//           {
//             xPercent: i % 2 === 0 ? 10 : -10, ease: "none",
//             scrollTrigger: {
//               trigger: socialSectionRef.current,
//               start: "top bottom", end: "bottom top", scrub: 2,
//             },
//           }
//         );
//       });
//     });

//     ScrollTrigger.refresh();
//     const onResize = () => setTimeout(() => ScrollTrigger.refresh(), 100);
//     window.addEventListener("resize", onResize);
//     return () => { ctx.revert(); window.removeEventListener("resize", onResize); };

//   // ✅ Added iosDevice to dependency array so GSAP re-runs after iOS is detected
//   }, [videos, screenSize, iosDevice]);

//   /* ── Derived ── */
//   const mobile = isMob(screenSize);
//   const presets = FAN_PRESETS[screenSize] || FAN_PRESETS.desktop;
//   const videoCount = Math.min(videos.length, presets.length);
//   const dispVids = videos.slice(0, videoCount);

//   if (loading) return null;

//   /* ═══════════════════════════════════════════════════════════════════════ */
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;700;900&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         /* ─── S1 – Round expanding video ─── */
//         .s1 { position: relative; background: #523122; overflow: hidden; width: 100%; z-index: 10; }
//         .s1-wrap { position: relative; width: 100%; height: 200vh; }
//         @media(max-width:1024px){ .s1-wrap { height: 130vh; } }

//         .s1-sticky { position: relative; display: flex; align-items: center;
//                      justify-content: center; width: 100%; height: 100vh; }
//         .s1-circle { border-radius: 50%; overflow: hidden; position: relative;
//                      will-change: width, height, scale; transition: box-shadow .3s;
//                      box-shadow: 0 0 40px rgba(0,0,0,0.45);
//                      width: clamp(80px,10vw,180px); height: clamp(80px,10vw,180px); }
//         @media(max-width:1024px){
//           .s1-circle { width: 100vw !important; height: 100vh !important; border-radius: 0 !important; }
//         }

//         .s1-overlay  { position: absolute; inset: 0; background: rgba(0,0,0,0.3); z-index: 2; pointer-events: none; }
//         .s1-vid-wrap { width: 100%; height: 100%; position: relative; z-index: 1; }
//         .s1-vid-wrap video { width: 100%; height: 100%; object-fit: cover; display: block; }
//         .s1-play-link { position: absolute; top: 50%; left: 50%;
//                         transform: translate(-50%,-50%); z-index: 10; cursor: pointer; text-decoration: none; }
//         .s1-play-btn  { border-radius: 50%; position: relative; display: flex;
//                         align-items: center; justify-content: center; background: transparent;
//                         cursor: pointer; will-change: opacity, scale;
//                         width: clamp(80px,12vw,180px); height: clamp(80px,12vw,180px); }
//         .s1-play-bg   { position: absolute; inset: 0; border-radius: 50%;
//                         background: rgba(0,0,0,0.65); z-index: 1; transition: background .3s; }
//         .s1-play-btn:hover .s1-play-bg { background: rgba(0,0,0,0.85); }
//         .s1-play-icon { z-index: 3; color: #fff; font-size: clamp(16px,3vw,42px); }
//         .s1-play-icon::after { content: "▶"; }
//         .s1-svg-ring  { width: 100%; height: 100%; position: absolute; z-index: 2;
//                         animation: s1spin 18s linear infinite; }
//         @keyframes s1spin { to { transform: rotate(360deg); } }
//         .s1-svg-ring text { font-family: 'Antonio', sans-serif; font-weight: 700;
//                             fill: rgba(255,255,255,0.9); letter-spacing: .15em;
//                             font-size: clamp(12px,1.1vw,14px); }
//         @media(max-width:767px){ .s1-svg-ring text { font-size: 20px; } }

//         /* ─── S3 – Social + API videos ─── */
//         .s3-outer  { background: #222123; position: relative; z-index: 20; overflow: visible; }
//         .s3-driver {
//           background: #ffd500; width: 100%;
//           height: var(--s3-driver-height, 500vh);
//           display: flex; flex-direction: column; align-items: center;
//           position: relative; overflow: visible;
//         }
//         @media(max-width:767px){ .s3-driver { --s3-driver-height: 190vh; } }
//         .s3-sticky { position: sticky; top: 0; width: 100%; height: 100vh; z-index: 4; overflow: hidden; }

//         /* ─── Fan cards ─── */
//         .s3-card {
//           position: absolute; top: 70%; left: 50%;
//           border: 0.30vw solid #ffd500; border-radius: 2vw;
//           overflow: hidden; width: clamp(160px,18vw,280px);
//           aspect-ratio: 9/16; cursor: pointer;
//           will-change: transform, opacity;
//           box-shadow: 0 20px 40px rgba(0,0,0,0.52); background: #111;
//           -webkit-transform: translateZ(0); transform: translateZ(0);
//         }
//         .s3-card:hover { box-shadow: 0 28px 56px rgba(0,0,0,0.7); }
//         .s3-card video { width: 100%; height: 100%; object-fit: cover; pointer-events: none; display: block; }
//         @media(max-width:1366px){ .s3-card { width: clamp(150px,17vw,260px); } }
//         @media(max-width:1024px){ .s3-card { width: clamp(160px,16vw,240px); } }
//         @media(max-width:991px){
//           .s3-card { top: 42%; width: 55vw; height: 98vw; border-width: 4px; border-radius: 16px; }
//         }
//         @media(max-width:821px){ .s3-card { width: 55vw; height: 90vw; border-width: 3px; } }
//         @media(max-width:767px){ .s3-card { width: 68vw; height: 121vw; border-width: 3px; } }
//         @media(max-width:541px){ .s3-card { width: 68vw; height: 101vw; border-width: 3px; border-radius: 16px; } }
//         @media(max-width:479px){ .s3-card { width: 68vw; height: 121vw; border-width: 3px; border-radius: 16px; } }

//         /* ─── Explore All — Lottie drip button ─── */
//         .s3-cta-wrap {
//           position: absolute; bottom: 5.5vh; left: 50%;
//           transform: translateX(-50%); z-index: 20;
//         }
//         .liquid-button-wrapper {
//           position: relative; display: flex;
//           align-items: center; justify-content: center; width: fit-content;
//         }
//         .lottie-animation-2 {
//           z-index: 1; perspective-origin: 50% 0; transform-origin: 50% 0;
//           width: 12.5vw; height: 13.5vw; position: absolute;
//           top: -5.4vw; right: 0; bottom: 0; left: -2.2vw; pointer-events: none;
//         }
//         .liquid-button {
//           position: relative; z-index: 2; display: inline-flex;
//           align-items: center; justify-content: center;
//           background: #80542c; border-radius: 100vw; padding: .75em 3em;
//           text-decoration: none; cursor: pointer; transition: background .3s; white-space: nowrap;
//         }
//         .liquid-button:hover { background: #7a5029; }
//         .button-text {
//           position: relative; z-index: 2; letter-spacing: -.01vw;
//           font-family: Antonio, sans-serif; font-size: clamp(.88rem, 1.1vw, 1.15rem);
//           font-weight: 700; text-transform: uppercase; color: #ffd500; white-space: nowrap;
//         }
//         @media(max-width:1024px){ .lottie-animation-2 { display: none; } }
//         @media(max-width:991px){ .liquid-button { padding: .65em 2.2em; } }

//         /* ─── Big parallax text ─── */
//         .s3-bg-wrap {
//           position: absolute; top: 0; left: 0; right: 0; padding-top: 5vw;
//           display: flex; flex-direction: column; align-items: center;
//           pointer-events: none; overflow: hidden; z-index: 2;
//         }
//         .sf-bg-line {
//           font-family: 'Antonio', sans-serif; font-size: 13.5vw; font-weight: 700;
//           line-height: 1.05; letter-spacing: -.4vw; text-transform: uppercase;
//           color: #222123; will-change: transform; user-select: none;
//         }
//         .sf-bg-line.orange { color: #523121; }
//         .sf-bg-line.right  { text-align: right; width: 100%; }

//         /* ─── Modal ─── */
//         .vmodal-bg {
//           position: fixed; inset: 0; background: rgba(0,0,0,0.97);
//           display: flex; align-items: center; justify-content: center;
//           z-index: 9999; padding: clamp(10px,3vw,30px); animation: vmFadeIn .25s ease;
//         }
//         @keyframes vmFadeIn { from { opacity: 0 } to { opacity: 1 } }
//         .vmodal-box {
//           position: relative; width: 100%; max-width: min(800px,92vw);
//           aspect-ratio: 9/16; animation: vmSlide .28s ease;
//         }
//         @keyframes vmSlide {
//           from { transform: translateY(22px); opacity: 0 }
//           to   { transform: translateY(0);    opacity: 1 }
//         }
//         .vmodal-box video { width: 100%; height: 100%; border: none; border-radius: 12px; }
//         .vmodal-close {
//           position: absolute; top: -46px; right: 0;
//           background: #fff; color: #523122; border: none; border-radius: 50%;
//           font-size: 22px; cursor: pointer; width: 40px; height: 40px;
//           display: flex; align-items: center; justify-content: center;
//           transition: all .25s; box-shadow: 0 2px 12px rgba(0,0,0,0.25);
//         }
//         .vmodal-close:hover { background: #523122; color: #fff; transform: scale(1.12); }

//         /* ─── Accessibility ─── */
//         @media(prefers-reduced-motion:reduce){
//           .s1-svg-ring { animation: none !important; }
//           .s3-card, .s1-circle { transition: none !important; animation: none !important; }
//         }
//         @media(hover:none) and (pointer:coarse){
//           .s3-card:hover, .liquid-button:hover { transform: none; box-shadow: none; }
//         }
//       `}</style>

//       {/* ══════════════════════════════════════════════════════════════
//           SECTION 1 – Round expanding circle video
//       ══════════════════════════════════════════════════════════════ */}
//       <div className="s1" ref={roundSectionRef}>
//         <div className="s1-wrap" ref={roundWrapRef}>
//           <div className="s1-sticky" ref={roundCircleRef}>
//             <a
//               href="#"
//               className="s1-play-link"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setModal({ src: "Videos/Video2.mp4" });
//               }}
//               aria-label="Play full video"
//             >
//               <div className="s1-play-btn" ref={roundButtonRef}>
//                 <div className="s1-play-bg" />
//                 <svg className="s1-svg-ring" viewBox="0 0 200 200">
//                   <defs>
//                     <path id="rp"
//                       d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
//                       fill="none" />
//                   </defs>
//                   <text>
//                     <textPath href="#rp" startOffset="50%" textAnchor="middle">
//                       PLAY VIDEO • PLAY VIDEO • PLAY VIDEO •
//                     </textPath>
//                   </text>
//                 </svg>
//                 <span className="s1-play-icon" aria-hidden="true" />
//               </div>
//             </a>
//             <div className="s1-circle" ref={roundElementRef}>
//               <div className="s1-overlay" ref={roundOverlayRef} />
//               <div className="s1-vid-wrap">
//                 {/*
//                   ✅ iOS FIX: autoPlay + muted + playsInline is the required combination
//                   for Safari on iPhone/iPad to autoplay without black screen.
//                   This was already correct here — keeping as-is.
//                 */}
//                 <video autoPlay loop muted playsInline poster="images/product1.png">
//                   <source src="Videos/Video2.mp4" type="video/mp4" />
//                 </video>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ══════════════════════════════════════════════════════════════
//           SECTION 3 – Social feedback + API videos combined
//       ══════════════════════════════════════════════════════════════ */}
//       <div className="s3-outer" ref={socialSectionRef}>
//         <div className="s3-driver" ref={socialWrapperRef}>
//           <div className="s3-sticky" ref={socialStickyRef}>

//             {/* Parallax background text */}
//             <div className="s3-bg-wrap">
//               <span className="sf-bg-line">What's</span>
//               <span className="sf-bg-line orange">everyone</span>
//               <span className="sf-bg-line right">talking</span>
//             </div>

//             {/* API video cards */}
//             {dispVids.map((v, i) => (
//               <div
//                 key={v._id}
//                 ref={(el) => (cardRefs.current[i] = el)}
//                 className="s3-card"
//                 onClick={() => setModal({ src: v.videoUrl })}
//                 onMouseEnter={() => !mobile && videoRefs.current[i]?.play()}
//                 onMouseLeave={() => !mobile && videoRefs.current[i]?.pause()}
//               >
//                 <video
//                   ref={(el) => (videoRefs.current[i] = el)}
//                   src={v.videoUrl}
//                   muted
//                   playsInline
//                   preload="metadata"
//                   /*
//                     ✅ iOS FIX:
//                     - autoPlay={iosDevice}  → only autoplay on iPhone/iPad, not desktop
//                     - loop={iosDevice}      → loop on iOS (keeps playing); desktop pauses on hover-out
//                     - Desktop keeps existing hover-to-play behaviour unchanged
//                   */
//                   autoPlay={iosDevice}
//                   loop={iosDevice}
//                 />
//               </div>
//             ))}

//             {/* ══════════════════════════════════════════════════════
//                 Explore All — drip plays only on hover (desktop/laptop)
//             ══════════════════════════════════════════════════════ */}
//             <div className="s3-cta-wrap">
//               <div
//                 className="liquid-button-wrapper"
//                 onMouseEnter={handleButtonEnter}
//                 onMouseLeave={handleButtonLeave}
//               >
//                 {/* Lottie drip layer — hidden on tablet + mobile via CSS */}

//                 {/* Pill link */}
//                 <a href="/product" className="liquid-button">
//                   <div className="button-text">
//                 <div className="lottie-animation-2">
//                   <Lottie
//                     lottieRef={lottieRef}
//                     animationData={DRIP_ANIMATION}
//                     loop={false}
//                     autoplay={false}
//                     style={{ width: "100%", height: "100%" }}
//                   />
//                 </div>
                    
//                     explore all</div>
//                 </a>
//               </div>
//             </div>

//           </div>{/* /sticky */}
//         </div>{/* /driver */}
//       </div>

//       {/* ══════════════════════════════════════════════════════════════
//           MODAL
//       ══════════════════════════════════════════════════════════════ */}
//       {modal && (
//         <div className="vmodal-bg" onClick={() => setModal(null)}>
//           <div className="vmodal-box" onClick={(e) => e.stopPropagation()}>
//             <button className="vmodal-close" onClick={() => setModal(null)} aria-label="Close">×</button>
//             {/*
//               ✅ iOS FIX:
//               - muted={iosDevice} → iOS requires muted for autoPlay; user can unmute via controls
//               - playsInline → prevents fullscreen takeover on iPhone
//               - controls → always shown so user can play/pause/unmute
//             */}
//             <video
//               src={modal.src}
//               controls
//               autoPlay
//               playsInline
//               muted={iosDevice}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// // VideoShowcaseSection.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lottie from "lottie-react"; // npm install lottie-react
// import api from "../api/axios";

// gsap.registerPlugin(ScrollTrigger);


// /* ═══════════════════════════════════════════════════════════════════════════
//    LOTTIE DRIP ANIMATION — embedded inline, no external file needed
// ═══════════════════════════════════════════════════════════════════════════ */
// const DRIP_ANIMATION = { "v": "5.12.1", "fr": 30, "ip": 0, "op": 76, "w": 315, "h": 317, "nm": "!!bttn_hover", "ddd": 0, "assets": [], "layers": [{ "ddd": 0, "ind": 2, "ty": 4, "nm": "Shape Layer 4", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [152.75, 163.25, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [0, 0, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.838, "y": 0.882 }, "o": { "x": 0.333, "y": 0 }, "t": 0, "s": [{ "i": [[11, -0.75], [9, -4], [-12.609, -0.287], [-7.188, 2.312]], "o": [[-11, 0.75], [4.5, -2.375], [8.25, 0.188], [1.919, -0.617]], "v": [[77.75, 23.25], [45.25, 30.375], [76.875, 30.188], [101.938, 28.938]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.619, "y": 0.502 }, "t": 29, "s": [{ "i": [[11, -0.75], [9, -4], [-14.125, 2.312], [-12.812, 4.062]], "o": [[-11, 0.75], [22.875, 4.875], [12.503, -2.047], [1.921, -0.609]], "v": [[77.75, 23.25], [45.25, 30.375], [74.375, 50.688], [102.812, 27.312]], "c": true }] }, { "t": 44, "s": [{ "i": [[11, -0.75], [9, -4], [-12.17, 3.313], [-11.938, 4.062]], "o": [[-11, 0.75], [14.625, 0.25], [11.25, -3.062], [3.101, -1.055]], "v": [[77.75, 23.25], [45.25, 30.875], [75.625, 48.812], [102.688, 26.812]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 137, "st": 0, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 3, "ty": 4, "nm": "Shape Layer 3", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [136.404, 202.688, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [38.654, 39.688, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.68, "y": 0.495 }, "o": { "x": 0.373, "y": 0 }, "t": 16, "s": [{ "i": [[13.625, 0.25], [0.898, -3.253], [-9.49, -0.463], [-5.899, -0.329], [-3.102, -0.039], [-7.938, -0.375], [-2, 0]], "o": [[-13.625, -0.25], [-1, 3.625], [11.781, 0.575], [4.5, 0.251], [4.937, 0.062], [4.755, 0.225], [2, 0]], "v": [[20.125, 26.5], [2.125, 27.875], [20.032, 29.487], [37.625, 29.874], [48.813, 29.75], [66.25, 30.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.3, "y": 0.474 }, "t": 31, "s": [{ "i": [[13.625, 0.25], [0.091, -3.374], [-9.49, -0.463], [-5.868, -0.691], [-1.92, -2.437], [-5.098, 8.855], [-2, 0]], "o": [[-13.625, -0.25], [-0.163, 6.041], [11.781, 0.575], [4.25, 0.5], [3.25, 4.125], [2.375, -4.125], [2, 0]], "v": [[20.125, 26.5], [2.125, 28.625], [20.094, 35.05], [38, 33.374], [46.375, 40.875], [66.125, 38.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 46, "s": [{ "i": [[13.625, 0.25], [0.151, -3.372], [-9.49, -0.463], [-5.437, -2.312], [0.698, -3.023], [3.25, 19.25], [-2, 0]], "o": [[-13.625, -0.25], [7.375, 0.5], [11.781, 0.575], [3.239, 1.378], [-3, 13], [-2.463, -14.586], [2, 0]], "v": [[20.125, 26.5], [1.125, 34.75], [20.969, 42.8], [43.75, 40.875], [47.5, 54.75], [63, 54], [72.5, 27.25]], "c": true }] }, { "t": 59, "s": [{ "i": [[13.625, 0.25], [-3.37, 0.193], [-9.49, -0.463], [-5.437, -2.312], [0.211, -3.095], [1.341, 18.583], [-2, 0]], "o": [[-13.625, -0.25], [8.75, -0.5], [11.781, 0.575], [3.239, 1.378], [-0.75, 11], [-0.875, -12.125], [2, 0]], "v": [[20.125, 26.5], [1.5, 32.375], [21.344, 40.925], [43, 38.75], [45.5, 52], [64.125, 50.125], [72.5, 27.25]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 153, "st": 16, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 4, "ty": 4, "nm": "Shape Layer 2", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [183, 234.377, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.667, "y": 0.32 }, "o": { "x": 0.333, "y": 0 }, "t": 7, "s": [{ "i": [[0, 0.316], [6.837, 0.024], [-0.25, -0.601], [-3.691, -0.402], [-7.5, 0.016], [-4.866, 0.411]], "o": [[-1.5, -0.395], [-7.929, -0.028], [3.25, 0.506], [3.846, 0.419], [5.771, -0.012], [5.115, -0.432]], "v": [[-44.375, 31.881], [-69.125, 31.739], [-95.375, 31.976], [-85.721, 33.336], [-70.5, 33.984], [-54.509, 33.201]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0.68 }, "t": 20.154, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [-3.691, -3.179], [-7.5, 0.125], [-4.866, 3.25]], "o": [[-1.5, -3.125], [-7.929, -0.221], [3.25, 4], [3.846, 3.312], [5.771, -0.096], [5.115, -3.416]], "v": [[-44.125, 32.125], [-68.875, 31], [-95.125, 32.875], [-85.471, 43.625], [-70.25, 48.75], [-54.259, 42.562]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 34.77, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.125, -8.875], [-12.875, -0.25], [-0.25, 8.125]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.127, 9.003], [12.133, 0.236], [0.388, -12.625]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 52.125], [-70.5, 75.75], [-65.875, 51.625]], "c": true }] }, { "t": 56, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.375, -7.25], [-12.5, -0.25], [0.164, 4.872]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.375, 7.25], [12.5, 0.25], [-0.375, -11.125]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 50.625], [-70.5, 69.75], [-65.875, 50.125]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 144, "st": 7, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 5, "ty": 4, "nm": "Shape Layer 1", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [84, 235.877, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.333, "y": 0 }, "t": 15, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.75, 27.526], [-96.375, 28.651], [-80.875, 31.617], [-60.25, 32.604], [-40.5, 31.028]], "c": true }] }, { "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "t": 20.2, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.875, 30.776], [-96.375, 28.651], [-81, 34.117], [-60.125, 35.729], [-40.5, 33.778]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.167, "y": 0.167 }, "t": 34.5, "s": [{ "i": [[-6.75, 6.25], [18, -2.25], [-3.278, -2.217], [-9, -0.805], [-3.5, 2.645]], "o": [[-12.25, -8], [8.883, 8.702], [4, 2.706], [7.346, 0.657], [3.5, -2.645]], "v": [[-23.75, 29], [-96.75, 27.25], [-80.875, 44.044], [-60, 51.305], [-40.375, 42.52]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 54, "s": [{ "i": [[-7.5, -0.25], [18.75, -4.5], [-0.375, -17.419], [-13.5, 0.195], [0.073, 10.144]], "o": [[-12.25, -8], [8.75, 12.25], [0.181, 8.402], [14.375, -0.208], [-0.125, -17.27]], "v": [[-49.125, 34.625], [-94.75, 28.25], [-72.375, 60.544], [-67.625, 88.805], [-62.625, 60.27]], "c": true }] }, { "t": 74, "s": [{ "i": [[-8.625, -2], [18.75, -4.5], [-0.25, -14.669], [-15.5, 0.195], [0.51, 10.132]], "o": [[-12.25, -8], [8.883, 8.702], [0.143, 8.402], [15.5, -0.195], [-0.75, -14.895]], "v": [[-49.125, 35], [-93.25, 29.625], [-74, 59.169], [-67.5, 83.805], [-60.5, 58.395]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 161, "st": 24, "ct": 1, "bm": 0 }], "markers": [], "props": {} };

// /* ─────────────────────────────────────────────────────────────────────────────
//    iOS / Android DETECTION HELPERS
// ───────────────────────────────────────────────────────────────────────────── */
// const detectIOS = () =>
//   /iPad|iPhone|iPod/.test(navigator.userAgent) ||
//   (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

// const detectAndroid = () => /Android/i.test(navigator.userAgent);

// const detectMobile = () => detectIOS() || detectAndroid() ||
//   /webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// /* ─────────────────────────────────────────────────────────────────────────────
//    FAN LAYOUT — tuned per breakpoint
// ───────────────────────────────────────────────────────────────────────────── */
// const FAN_PRESETS = {
//   desktop: [
//     { x: -32, y: -8,  rotate: -20, scale: 0.92, zIndex: 4 },
//     { x: -21, y: -11, rotate: -12, scale: 0.96, zIndex: 5 },
//     { x: -10, y: -13, rotate: -5,  scale: 1.02, zIndex: 6 },
//     { x:   0, y: -15, rotate:  0,  scale: 1.08, zIndex: 7 },
//     { x:  10, y: -13, rotate:  5,  scale: 1.02, zIndex: 6 },
//     { x:  21, y: -11, rotate: 12,  scale: 0.96, zIndex: 5 },
//     { x:  32, y:  -8, rotate: 20,  scale: 0.92, zIndex: 4 },
//   ],
//   laptop: [
//     { x: -30, y: -7,  rotate: -19, scale: 0.90, zIndex: 4 },
//     { x: -20, y: -10, rotate: -11, scale: 0.95, zIndex: 5 },
//     { x:  -9, y: -12, rotate:  -4, scale: 1.00, zIndex: 6 },
//     { x:   0, y: -14, rotate:   0, scale: 1.05, zIndex: 7 },
//     { x:   9, y: -12, rotate:   4, scale: 1.00, zIndex: 6 },
//     { x:  20, y: -10, rotate:  11, scale: 0.95, zIndex: 5 },
//     { x:  30, y:  -7, rotate:  19, scale: 0.90, zIndex: 4 },
//   ],
//   /* Tablet: tighter spread so cards don't overflow edges */
//   tablet: [
//     { x: -24, y: -3,  rotate: -16, scale: 0.82, zIndex: 4 },
//     { x: -16, y: -6,  rotate:  -9, scale: 0.88, zIndex: 5 },
//     { x:  -7, y:  -8, rotate:  -3, scale: 0.94, zIndex: 6 },
//     { x:   0, y: -10, rotate:   0, scale: 0.99, zIndex: 7 },
//     { x:   7, y:  -8, rotate:   3, scale: 0.94, zIndex: 6 },
//     { x:  16, y:  -6, rotate:   9, scale: 0.88, zIndex: 5 },
//     { x:  24, y:  -3, rotate:  16, scale: 0.82, zIndex: 4 },
//   ],
//   /* Mobile: single stacked card, slight rotation offsets */
//   mobile: [
//     { x: 0, y: 0, rotate: -6, scale: 1.0, zIndex: 4 },
//     { x: 0, y: 0, rotate:  4, scale: 1.0, zIndex: 5 },
//     { x: 0, y: 0, rotate: -8, scale: 1.0, zIndex: 6 },
//     { x: 0, y: 0, rotate:  6, scale: 1.0, zIndex: 7 },
//     { x: 0, y: 0, rotate: -4, scale: 1.0, zIndex: 8 },
//     { x: 0, y: 0, rotate:  7, scale: 1.0, zIndex: 9 },
//     { x: 0, y: 0, rotate:  0, scale: 1.0, zIndex: 10 },
//   ],
//   mobileSmall: [
//     { x: 0, y: 0, rotate: -6, scale: 1.0, zIndex: 4 },
//     { x: 0, y: 0, rotate:  4, scale: 1.0, zIndex: 5 },
//     { x: 0, y: 0, rotate: -8, scale: 1.0, zIndex: 6 },
//     { x: 0, y: 0, rotate:  6, scale: 1.0, zIndex: 7 },
//     { x: 0, y: 0, rotate: -4, scale: 1.0, zIndex: 8 },
//     { x: 0, y: 0, rotate:  7, scale: 1.0, zIndex: 9 },
//     { x: 0, y: 0, rotate:  0, scale: 1.0, zIndex: 10 },
//   ],
// };

// // isMob: includes tablet — all touch-primary screens skip hover
// const isMob = (s) =>
//   s === "mobile" || s === "mobileSmall" || s === "tablet" || s === "laptop";

// /* ═══════════════════════════════════════════════════════════════════════════ */
// export default function VideoShowcaseSection() {

//   /* ── Section 1 refs ── */
//   const roundSectionRef  = useRef(null);
//   const roundCircleRef   = useRef(null);
//   const roundElementRef  = useRef(null);
//   const roundOverlayRef  = useRef(null);
//   const roundButtonRef   = useRef(null);
//   const roundWrapRef     = useRef(null);

//   /* ── Section 3 refs ── */
//   const socialSectionRef = useRef(null);
//   const socialWrapperRef = useRef(null);
//   const socialStickyRef  = useRef(null);
//   const cardRefs         = useRef([]);
//   const videoRefs        = useRef([]);

//   /* ── Lottie ref ── */
//   const lottieRef = useRef(null);

//   /* ── State ── */
//   const [videos,     setVideos]     = useState([]);
//   const [loading,    setLoading]    = useState(true);
//   const [screenSize, setScreenSize] = useState("desktop");
//   const [modal,      setModal]      = useState(null);
//   const [iosDevice,  setIosDevice]  = useState(false);
//   const [androidDev, setAndroidDev] = useState(false);
//   const [isTouchDev, setIsTouchDev] = useState(false);

//   /* ── Detect device on mount ── */
//   useEffect(() => {
//     const ios     = detectIOS();
//     const android = detectAndroid();
//     setIosDevice(ios);
//     setAndroidDev(android);
//     setIsTouchDev(detectMobile());
//   }, []);

//   /* ── Screen-size detection (fine-grained) ── */
//   useEffect(() => {
//     const detect = () => {
//       const w = window.innerWidth;
//       if      (w >= 1366) setScreenSize("desktop");
//       else if (w >= 1025) setScreenSize("laptop");
//       else if (w >= 768)  setScreenSize("tablet");
//       else if (w >= 480)  setScreenSize("mobile");
//       else                setScreenSize("mobileSmall");
//     };
//     detect();
//     window.addEventListener("resize", detect);
//     return () => window.removeEventListener("resize", detect);
//   }, []);

//   /* ── Fetch videos ── */
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await api.get("/api/videos");
//         setVideos(res.data || []);
//       } catch { console.error("Failed to load videos"); }
//       finally   { setLoading(false); }
//     })();
//   }, []);

//   /* ── Hover handlers for drip button (desktop only) ── */
//   const handleButtonEnter = () => {
//     if (!lottieRef.current || isTouchDev) return;
//     lottieRef.current.goToAndPlay(0, true);
//   };
//   const handleButtonLeave = () => {
//     if (!lottieRef.current || isTouchDev) return;
//     lottieRef.current.stop();
//   };

//   /* ── GSAP ── */
//   useEffect(() => {
//     if (!videos.length) return;

//     const mobile   = isMob(screenSize);
//     const presets  = FAN_PRESETS[screenSize] || FAN_PRESETS.desktop;
//     const videoCount = Math.min(videos.length, presets.length);
//     const dispVids = videos.slice(0, videoCount);

//     const ctx = gsap.context(() => {

//       /* ── S1 – Expanding circle ── */
//       if (mobile) {
//         ScrollTrigger.create({
//           trigger: roundWrapRef.current,
//           start: "top top", end: "bottom bottom",
//           pin: roundCircleRef.current, pinSpacing: false,
//         });
//         gsap.set(roundElementRef.current, {
//           width: "100vw", height: "100vh",
//           borderRadius: "0%", scale: 1, opacity: 1,
//         });
//         gsap.set(roundOverlayRef.current, { opacity: 0.5 });
//         gsap.set(roundButtonRef.current,  { opacity: 1, scale: 1 });
//       } else {
//         const sizes = {
//           laptop:  { s: "12vw", e: "150vw" },
//           desktop: { s: "10vw", e: "150vw" },
//         }[screenSize] || { s: "10vw", e: "150vw" };

//         ScrollTrigger.create({
//           trigger: roundWrapRef.current,
//           start: "top top", end: "bottom bottom",
//           pin: roundCircleRef.current, pinSpacing: false, scrub: 0.5,
//         });
//         gsap.fromTo(roundElementRef.current,
//           { width: sizes.s, height: sizes.s, borderRadius: "50%", scale: 1, opacity: 1 },
//           {
//             width: sizes.e, height: sizes.e, borderRadius: "50%", scale: 1.2, opacity: 0.9,
//             ease: "none",
//             scrollTrigger: {
//               trigger: roundWrapRef.current,
//               start: "top top", end: "bottom bottom",
//               scrub: 0.8, invalidateOnRefresh: true,
//             },
//           }
//         );
//         gsap.fromTo(roundOverlayRef.current, { opacity: 0.3 },
//           {
//             opacity: 0.8, ease: "none",
//             scrollTrigger: {
//               trigger: roundWrapRef.current,
//               start: "top top", end: "bottom bottom", scrub: 0.8,
//             },
//           }
//         );
//         gsap.fromTo(roundButtonRef.current, { opacity: 1, scale: 1 },
//           {
//             opacity: 0, scale: 1.5, ease: "none",
//             scrollTrigger: {
//               trigger: roundWrapRef.current,
//               start: "top top", end: "center center", scrub: 0.8,
//             },
//           }
//         );
//       }

//       /* ── S3 – Fan cards ── */
//       if (!socialSectionRef.current || !cardRefs.current.length) return;

//       ScrollTrigger.create({
//         trigger: socialWrapperRef.current,
//         start: "top top", end: "bottom bottom",
//         pin: socialStickyRef.current, pinSpacing: false,
//       });

//       cardRefs.current.forEach((card, i) => {
//         if (!card) return;
//         gsap.set(card, {
//           xPercent: -50, yPercent: -50,
//           x: 0, y: "85vh",
//           rotation: 0, scale: 0.35, opacity: 0,
//           zIndex: i + 1,
//         });
//       });

//       const slotW   = 1 / videoCount;
//       const animDur = slotW * 0.7;
//       const s3Tl    = gsap.timeline();

//       dispVids.forEach((_, i) => {
//         const card = cardRefs.current[i];
//         if (!card) return;
//         const pos    = presets[i % presets.length];
//         const tStart = i * slotW;

//         s3Tl.to(card, {
//           xPercent: -50, yPercent: -50,
//           x: `${pos.x}vw`, y: `${pos.y}vh`,
//           rotation: pos.rotate, scale: pos.scale, opacity: 1,
//           ease: "power3.out", duration: animDur,
//           onComplete: () => {
//             /* iOS / Android: force play when card animates in */
//             if (iosDevice || androidDev) {
//               const vid = videoRefs.current[i];
//               if (vid) { vid.muted = true; vid.play().catch(() => {}); }
//             }
//           },
//         }, tStart);
//       });

//       ScrollTrigger.create({
//         trigger: socialWrapperRef.current,
//         start: "top top", end: "bottom bottom",
//         scrub: 1, animation: s3Tl,
//       });

//       /* Backup trigger for iOS/Android — fires when section enters viewport */
//       if (iosDevice || androidDev) {
//         ScrollTrigger.create({
//           trigger: socialWrapperRef.current,
//           start: "top 80%",
//           once: true,
//           onEnter: () => {
//             videoRefs.current.forEach((vid) => {
//               if (vid) { vid.muted = true; vid.play().catch(() => {}); }
//             });
//           },
//         });
//       }

//       /* Parallax text */
//       const textLines = socialSectionRef.current.querySelectorAll(".sf-bg-line");
//       textLines.forEach((line, i) => {
//         gsap.fromTo(line,
//           { xPercent: i % 2 === 0 ? -10 : 10 },
//           {
//             xPercent: i % 2 === 0 ? 10 : -10, ease: "none",
//             scrollTrigger: {
//               trigger: socialSectionRef.current,
//               start: "top bottom", end: "bottom top", scrub: 2,
//             },
//           }
//         );
//       });
//     });

//     ScrollTrigger.refresh();
//     const onResize = () => setTimeout(() => ScrollTrigger.refresh(), 100);
//     window.addEventListener("resize", onResize);
//     return () => { ctx.revert(); window.removeEventListener("resize", onResize); };

//   }, [videos, screenSize, iosDevice, androidDev]);

//   /* ── Derived ── */
//   const mobile     = isMob(screenSize);
//   const presets    = FAN_PRESETS[screenSize] || FAN_PRESETS.desktop;
//   const videoCount = Math.min(videos.length, presets.length);
//   const dispVids   = videos.slice(0, videoCount);

//   if (loading) return null;

//   /* ═══════════════════════════════════════════════════════════════════════ */
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;700;900&display=swap');

//         /* ── Reset ── */
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         /* ════════════════════════════════════════════════════════════
//            SECTION 1 – Round expanding circle video
//         ════════════════════════════════════════════════════════════ */
//         .s1 {
//           position: relative;
//           background: #523122;
//           overflow: hidden;
//           width: 100%;
//           z-index: 10;
//         }

//         /* Scroll-driver height — shorter on touch screens */
//         .s1-wrap {
//           position: relative;
//           width: 100%;
//           height: 200vh;
//         }
//         @media (max-width: 1024px) { .s1-wrap { height: 130vh; } }
//         @media (max-width: 767px)  { .s1-wrap { height: 120vh; } }
//         @media (max-width: 479px)  { .s1-wrap { height: 110vh; } }

//         /* Sticky viewport */
//         .s1-sticky {
//           position: relative;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 100%;
//           height: 100vh;
//           /* Safe-area insets (iPhone notch / Dynamic Island) */
//           padding-top: env(safe-area-inset-top);
//           padding-bottom: env(safe-area-inset-bottom);
//         }

//         /* Expanding circle */
//         .s1-circle {
//           border-radius: 50%;
//           overflow: hidden;
//           position: relative;
//           will-change: width, height, scale;
//           transition: box-shadow .3s;
//           box-shadow: 0 0 40px rgba(0,0,0,0.45);
//           /* Desktop initial size */
//           width: clamp(80px, 10vw, 180px);
//           height: clamp(80px, 10vw, 180px);
//         }

//         /* Mobile / tablet: full-screen rectangle */
//         @media (max-width: 1024px) {
//           .s1-circle {
//             width: 100vw !important;
//             height: 100vh !important;
//             border-radius: 0 !important;
//           }
//         }

//         .s1-overlay {
//           position: absolute;
//           inset: 0;
//           background: rgba(0,0,0,0.3);
//           z-index: 2;
//           pointer-events: none;
//         }

//         .s1-vid-wrap {
//           width: 100%;
//           height: 100%;
//           position: relative;
//           z-index: 1;
//         }
//         .s1-vid-wrap video {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           display: block;
//         }

//         /* Play button */
//         .s1-play-link {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           z-index: 10;
//           cursor: pointer;
//           text-decoration: none;
//           /* Larger tap target on mobile */
//           -webkit-tap-highlight-color: transparent;
//         }
//         .s1-play-btn {
//           border-radius: 50%;
//           position: relative;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: transparent;
//           cursor: pointer;
//           will-change: opacity, scale;
//           /* Responsive sizing with safe floor/ceiling */
//           width:  clamp(72px, 12vw, 180px);
//           height: clamp(72px, 12vw, 180px);
//           touch-action: manipulation;
//         }
//         /* Slightly larger on small phones */
//         @media (max-width: 479px) {
//           .s1-play-btn { width: 88px; height: 88px; }
//         }

//         .s1-play-bg {
//           position: absolute;
//           inset: 0;
//           border-radius: 50%;
//           background: rgba(0,0,0,0.65);
//           z-index: 1;
//           transition: background .3s;
//         }
//         .s1-play-btn:hover .s1-play-bg,
//         .s1-play-btn:active .s1-play-bg { background: rgba(0,0,0,0.85); }

//         .s1-play-icon {
//           z-index: 3;
//           color: #fff;
//           font-size: clamp(16px, 3vw, 42px);
//         }
//         .s1-play-icon::after { content: "▶"; }

//         /* Rotating text ring */
//         .s1-svg-ring {
//           width: 100%;
//           height: 100%;
//           position: absolute;
//           z-index: 2;
//           animation: s1spin 18s linear infinite;
//         }
//         @keyframes s1spin { to { transform: rotate(360deg); } }
//         .s1-svg-ring text {
//           font-family: 'Antonio', sans-serif;
//           font-weight: 700;
//           fill: rgba(255,255,255,0.9);
//           letter-spacing: .15em;
//           font-size: clamp(10px, 1.1vw, 14px);
//         }
//         @media (max-width: 767px) { .s1-svg-ring text { font-size: 18px; } }
//         @media (max-width: 479px) { .s1-svg-ring text { font-size: 15px; } }


//         /* ════════════════════════════════════════════════════════════
//            SECTION 3 – Social fan cards
//         ════════════════════════════════════════════════════════════ */
//         .s3-outer {
//           background: #222123;
//           position: relative;
//           z-index: 20;
//           overflow: visible;
//         }

//         /* Scroll driver */
//         .s3-driver {
//           background: #ffd500;
//           width: 100%;
//           height: var(--s3-driver-height, 500vh);
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           position: relative;
//           overflow: visible;
//         }
//         /* Progressive height reduction on smaller viewports */
//         @media (max-width: 1024px) { .s3-driver { --s3-driver-height: 400vh; } }
//         @media (max-width: 767px)  { .s3-driver { --s3-driver-height: 280vh; } }
//         @media (max-width: 479px)  { .s3-driver { --s3-driver-height: 220vh; } }
//         @media (max-width: 359px)  { .s3-driver { --s3-driver-height: 200vh; } }

//         /* Sticky viewport */
//         .s3-sticky {
//           position: sticky;
//           top: 0;
//           width: 100%;
//           height: 100vh;
//           z-index: 4;
//           overflow: hidden;
//           /* Safe area: notch / home indicator */
//           padding-bottom: env(safe-area-inset-bottom);
//         }

//         /* ── Fan cards ── */
//         .s3-card {
//           position: absolute;
//           top: 70%;
//           left: 50%;
//           border: 0.30vw solid #ffd500;
//           border-radius: 2vw;
//           overflow: hidden;
//           width: clamp(140px, 18vw, 280px);
//           aspect-ratio: 9/16;
//           cursor: pointer;
//           will-change: transform, opacity;
//           box-shadow: 0 20px 40px rgba(0,0,0,0.52);
//           background: #111;
//           /* GPU layer */
//           -webkit-transform: translateZ(0);
//           transform: translateZ(0);
//           /* Touch feedback */
//           -webkit-tap-highlight-color: transparent;
//           touch-action: manipulation;
//         }
//         .s3-card:active { opacity: 0.85; }

//         .s3-card video {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           pointer-events: none;
//           display: block;
//         }

//         /* ── Breakpoint-specific card sizing ── */

//         /* Large desktop (1366+): default above */

//         /* Laptop (1025–1365) */
//         @media (max-width: 1365px) and (min-width: 1025px) {
//           .s3-card { width: clamp(140px, 17vw, 260px); }
//         }

//         /* Tablet landscape (1024px, including iPad Pro) */
//         @media (max-width: 1024px) and (min-width: 821px) {
//           .s3-card {
//             top: 55%;
//             width: 43vw;
//             border-width: 3px;
//             border-radius: 14px;
//           }
//         }



// /* Nest Hub exact pixel override */
// @media (width: 1024px) and (height: 600px) {
//   .s3-card { top: 65%; width: 19vw; min-width: 76px; }
//   .sf-bg-line { font-size: 10.5vw; }
// }

//         /* Tablet portrait (768–820) */
//         @media (max-width: 820px) and (min-width: 768px) {
//           .s3-card {
//             top: 55%;
//             width: 49vw;
//             height: 80vw;
//             border-width: 4px;
//             border-radius: 16px;
//           }
//         }

//         /* Large mobile / phablet (541–767) */
//         @media (max-width: 767px) and (min-width: 541px) {
//           .s3-card {
//             top: 44%;
//             width: 62vw;
//             height: 110vw;
//             border-width: 3px;
//             border-radius: 14px;
//           }
//         }

//         /* Mobile (480–540) */
//         @media (max-width: 540px) and (min-width: 480px) {
//           .s3-card {
//             top: 54%;
//             width: 50vw;
//             // height: 100vw;
//             border-width: 3px;
//             border-radius: 14px;
//           }
//         }

//         /* Small mobile (360–479) */
//         @media (max-width: 479px) and (min-width: 360px) {
//           .s3-card {
//             top: 46%;
//             width: 50vw;
//             // height: 100vw;
//             border-width: 3px;
//             border-radius: 14px;
//           }
//         }

//         /* Very small phones (<360px, e.g. older iPhones / Galaxy A) */
//         @media (max-width: 359px) {
//           .s3-card {
//             top: 46%;
//             width: 74vw;
//             height: 132vw;
//             border-width: 2px;
//             border-radius: 12px;
//           }
//         }


//         /* ════════════════════════════════════════════════════════════
//            Explore All — Lottie drip button
//         ════════════════════════════════════════════════════════════ */
//         .s3-cta-wrap {
//           position: absolute;
//           bottom: 5.5vh;
//           left: 50%;
//           transform: translateX(-50%);
//           z-index: 20;
//           /* Ensure above all cards */
//           pointer-events: auto;
//         }
//         /* Give extra breathing room on very small phones */
//         @media (max-width: 479px) { .s3-cta-wrap { bottom: 4vh; } }

//         .liquid-button-wrapper {
//           position: relative;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: fit-content;
//         }

//         /* Drip Lottie layer — desktop/laptop only */
//         .lottie-animation-2 {
//           z-index: 1;
//           perspective-origin: 50% 0;
//           transform-origin: 50% 0;
//           width: 12.5vw;
//           height: 13.5vw;
//           position: absolute;
//           top: -5.9vw; right: 0; bottom: 0; left: -3.1vw;
//           pointer-events: none;
//         }
//         /* Hide Lottie drip on all touch-primary screens */
//         @media (max-width: 1024px) { .lottie-animation-2 { display: none; } }

//         /* Pill button */
//         .liquid-button {
//           position: relative;
//           z-index: 2;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           background: #80542c;
//           border-radius: 100vw;
//           padding: .75em 3em;
//           text-decoration: none;
//           cursor: pointer;
//           transition: background .3s;
//           white-space: nowrap;
//           -webkit-tap-highlight-color: transparent;
//           touch-action: manipulation;
//         }
//         .liquid-button:hover,
//         .liquid-button:active { background: #7a5029; }

//         /* Responsive padding */
//         @media (max-width: 991px)  { .liquid-button { padding: .7em 2.4em; } }
//         @media (max-width: 767px)  { .liquid-button { padding: .65em 2em; } }
//         @media (max-width: 479px)  { .liquid-button { padding: .6em 1.75em; } }

//         .button-text {
//           position: relative;
//           z-index: 2;
//           letter-spacing: -.01vw;
//           font-family: Antonio, sans-serif;
//           font-size: clamp(.8rem, 1.1vw, 1.15rem);
//           font-weight: 700;
//           text-transform: uppercase;
//           color: #ffd500;
//           white-space: nowrap;
//         }
//         /* Explicit floor for mobile */
//         @media (max-width: 767px)  { .button-text { font-size: clamp(.78rem, 3.5vw, .95rem); } }
//         @media (max-width: 479px)  { .button-text { font-size: .8rem; } }


//         /* ════════════════════════════════════════════════════════════
//            Parallax background text
//         ════════════════════════════════════════════════════════════ */
//         .s3-bg-wrap {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           padding-top: 5vw;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           pointer-events: none;
//           overflow: hidden;
//           z-index: 2;
//         }
//         .sf-bg-line {
//           font-family: 'Antonio', sans-serif;
//           font-size: 13.5vw;
//           font-weight: 700;
//           line-height: 1.05;
//           letter-spacing: -.4vw;
//           text-transform: uppercase;
//           color: #222123;
//           will-change: transform;
//           user-select: none;
//         }
//         .sf-bg-line.orange { color: #523121; }
//         .sf-bg-line.right  { text-align: right; width: 100%; }

//         /* Scale text down a touch on very small screens */
//         @media (max-width: 479px) {
//           .sf-bg-line { font-size: 15vw; letter-spacing: -.3vw; }
//         }


//         /* ════════════════════════════════════════════════════════════
//            MODAL
//         ════════════════════════════════════════════════════════════ */
//         .vmodal-bg {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,0.97);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 9999;
//           /* Respect safe areas (notch / home bar) */
//           padding: max(env(safe-area-inset-top), clamp(10px,3vw,30px))
//                    max(env(safe-area-inset-right), clamp(10px,3vw,30px))
//                    max(env(safe-area-inset-bottom), clamp(10px,3vw,30px))
//                    max(env(safe-area-inset-left), clamp(10px,3vw,30px));
//           animation: vmFadeIn .25s ease;
//           /* Prevent scroll bounce on iOS */
//           overscroll-behavior: contain;
//           -webkit-overflow-scrolling: touch;
//         }
//         @keyframes vmFadeIn { from { opacity: 0 } to { opacity: 1 } }

//         .vmodal-box {
//           position: relative;
//           width: 100%;
//           /* On portrait mobile fill more height */
//           max-width: min(480px, 92vw);
//           aspect-ratio: 9/16;
//           animation: vmSlide .28s ease;
//         }
//         /* Landscape on phone: shrink to fit */
//         @media (max-height: 500px) and (orientation: landscape) {
//           .vmodal-box {
//             max-width: unset;
//             height: 90vh;
//             width: auto;
//             aspect-ratio: 9/16;
//           }
//         }
//         @keyframes vmSlide {
//           from { transform: translateY(22px); opacity: 0 }
//           to   { transform: translateY(0);    opacity: 1 }
//         }

//         .vmodal-box video {
//           width: 100%;
//           height: 100%;
//           border: none;
//           border-radius: 12px;
//           /* Prevent fullscreen takeover on iOS */
//           -webkit-playsinline: true;
//         }

//         .vmodal-close {
//           position: absolute;
//           top: -46px;
//           right: 0;
//           background: #fff;
//           color: #523122;
//           border: none;
//           border-radius: 50%;
//           font-size: 22px;
//           cursor: pointer;
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: all .25s;
//           box-shadow: 0 2px 12px rgba(0,0,0,0.25);
//           /* Easier tap on mobile */
//           touch-action: manipulation;
//           -webkit-tap-highlight-color: transparent;
//         }
//         /* Slightly larger on small phones */
//         @media (max-width: 479px) {
//           .vmodal-close {
//             width: 44px;
//             height: 44px;
//             font-size: 24px;
//             top: -50px;
//           }
//         }
//         .vmodal-close:hover,
//         .vmodal-close:active {
//           background: #523122;
//           color: #fff;
//           transform: scale(1.12);
//         }


//         /* ════════════════════════════════════════════════════════════
//            Accessibility & performance
//         ════════════════════════════════════════════════════════════ */
//         @media (prefers-reduced-motion: reduce) {
//           .s1-svg-ring { animation: none !important; }
//           .s3-card, .s1-circle { transition: none !important; animation: none !important; }
//         }

//         /* Remove hover effects on touch devices */
//         @media (hover: none) and (pointer: coarse) {
//           .s3-card:hover,
//           .liquid-button:hover { transform: none; box-shadow: none; }
//         }

//         /* High-DPI / Retina: sharper borders */
//         @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
//           .s3-card { border-width: 0.5px; }
//           @media (max-width: 767px) { .s3-card { border-width: 1.5px; } }
//         }
//       `}</style>

//       {/* ════════════════════════════════════════════════════════════════
//           SECTION 1 – Round expanding circle video
//       ════════════════════════════════════════════════════════════════ */}
//       <div className="s1" ref={roundSectionRef}>
//         <div className="s1-wrap" ref={roundWrapRef}>
//           <div className="s1-sticky" ref={roundCircleRef}>
//             <a
//               href="#"
//               className="s1-play-link"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setModal({ src: "Videos/Video2.mp4" });
//               }}
//               aria-label="Play full video"
//             >
//               <div className="s1-play-btn" ref={roundButtonRef}>
//                 <div className="s1-play-bg" />
//                 <svg className="s1-svg-ring" viewBox="0 0 200 200">
//                   <defs>
//                     <path id="rp"
//                       d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
//                       fill="none" />
//                   </defs>
//                   <text>
//                     <textPath href="#rp" startOffset="50%" textAnchor="middle">
//                       PLAY VIDEO • PLAY VIDEO • PLAY VIDEO •
//                     </textPath>
//                   </text>
//                 </svg>
//                 <span className="s1-play-icon" aria-hidden="true" />
//               </div>
//             </a>

//             <div className="s1-circle" ref={roundElementRef}>
//               <div className="s1-overlay" ref={roundOverlayRef} />
//               <div className="s1-vid-wrap">
//                 <video
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                   poster="images/product1.png"
//                   /* Android: preload for smoother playback */
//                   preload={androidDev ? "auto" : "metadata"}
//                 >
//                   <source src="Videos/Video2.mp4" type="video/mp4" />
//                 </video>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ════════════════════════════════════════════════════════════════
//           SECTION 3 – Social feedback + API videos combined
//       ════════════════════════════════════════════════════════════════ */}
//       <div className="s3-outer" ref={socialSectionRef}>
//         <div className="s3-driver" ref={socialWrapperRef}>
//           <div className="s3-sticky" ref={socialStickyRef}>

//             {/* Parallax background text */}
//             <div className="s3-bg-wrap">
//               <span className="sf-bg-line">What's</span>
//               <span className="sf-bg-line orange">everyone</span>
//               <span className="sf-bg-line right">talking</span>
//             </div>

//             {/* API video fan cards */}
//             {dispVids.map((v, i) => (
//               <div
//                 key={v._id}
//                 ref={(el) => (cardRefs.current[i] = el)}
//                 className="s3-card"
//                 onClick={() => setModal({ src: v.videoUrl })}
//                 /* Hover-to-play only on non-touch screens */
//                 onMouseEnter={() => !mobile && videoRefs.current[i]?.play()}
//                 onMouseLeave={() => !mobile && videoRefs.current[i]?.pause()}
//               >
//                 <video
//                   ref={(el) => (videoRefs.current[i] = el)}
//                   src={v.videoUrl}
//                   muted
//                   playsInline
//                   preload="metadata"
//                   /* iOS & Android: autoplay + loop since no hover events */
//                   autoPlay={iosDevice || androidDev}
//                   loop={iosDevice || androidDev}
//                 />
//               </div>
//             ))}

//             {/* Explore All — Lottie drip button */}
//             <div className="s3-cta-wrap">
//               <div
//                 className="liquid-button-wrapper"
//                 onMouseEnter={handleButtonEnter}
//                 onMouseLeave={handleButtonLeave}
//               >
//                 <a href="/product" className="liquid-button">
//                   <div className="button-text">
//                   {/* Lottie drip — hidden on touch screens via CSS */}
//                   <div className="lottie-animation-2">
//                     <Lottie
//                       lottieRef={lottieRef}
//                       animationData={DRIP_ANIMATION}
//                       loop={false}
//                       autoplay={false}
//                       style={{ width: "100%", height: "100%" }}
//                     />
//                   </div>
                    
                    
//                     explore all</div>
//                 </a>
//               </div>
//             </div>

//           </div>{/* /sticky */}
//         </div>{/* /driver */}
//       </div>

//       {/* ════════════════════════════════════════════════════════════════
//           MODAL
//       ════════════════════════════════════════════════════════════════ */}
//       {modal && (
//         <div
//           className="vmodal-bg"
//           onClick={() => setModal(null)}
//           /* Prevent rubber-band scroll on iOS behind modal */
//           onTouchMove={(e) => e.preventDefault()}
//         >
//           <div className="vmodal-box" onClick={(e) => e.stopPropagation()}>
//             <button
//               className="vmodal-close"
//               onClick={() => setModal(null)}
//               aria-label="Close video"
//             >
//               ×
//             </button>
//             <video
//               src={modal.src}
//               controls
//               autoPlay
//               playsInline
//               /*
//                 iOS: muted required for autoPlay; user can unmute via controls
//                 Android: no muted needed — plays audio by default
//               */
//               muted={iosDevice}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



// VideoShowcaseSection.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react"; // npm install lottie-react
import api from "../api/axios";

gsap.registerPlugin(ScrollTrigger);


/* ═══════════════════════════════════════════════════════════════════════════
   LOTTIE DRIP ANIMATION — embedded inline, no external file needed
═══════════════════════════════════════════════════════════════════════════ */
const DRIP_ANIMATION = { "v": "5.12.1", "fr": 30, "ip": 0, "op": 76, "w": 315, "h": 317, "nm": "!!bttn_hover", "ddd": 0, "assets": [], "layers": [{ "ddd": 0, "ind": 2, "ty": 4, "nm": "Shape Layer 4", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [152.75, 163.25, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [0, 0, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.838, "y": 0.882 }, "o": { "x": 0.333, "y": 0 }, "t": 0, "s": [{ "i": [[11, -0.75], [9, -4], [-12.609, -0.287], [-7.188, 2.312]], "o": [[-11, 0.75], [4.5, -2.375], [8.25, 0.188], [1.919, -0.617]], "v": [[77.75, 23.25], [45.25, 30.375], [76.875, 30.188], [101.938, 28.938]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.619, "y": 0.502 }, "t": 29, "s": [{ "i": [[11, -0.75], [9, -4], [-14.125, 2.312], [-12.812, 4.062]], "o": [[-11, 0.75], [22.875, 4.875], [12.503, -2.047], [1.921, -0.609]], "v": [[77.75, 23.25], [45.25, 30.375], [74.375, 50.688], [102.812, 27.312]], "c": true }] }, { "t": 44, "s": [{ "i": [[11, -0.75], [9, -4], [-12.17, 3.313], [-11.938, 4.062]], "o": [[-11, 0.75], [14.625, 0.25], [11.25, -3.062], [3.101, -1.055]], "v": [[77.75, 23.25], [45.25, 30.875], [75.625, 48.812], [102.688, 26.812]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 137, "st": 0, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 3, "ty": 4, "nm": "Shape Layer 3", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [136.404, 202.688, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [38.654, 39.688, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.68, "y": 0.495 }, "o": { "x": 0.373, "y": 0 }, "t": 16, "s": [{ "i": [[13.625, 0.25], [0.898, -3.253], [-9.49, -0.463], [-5.899, -0.329], [-3.102, -0.039], [-7.938, -0.375], [-2, 0]], "o": [[-13.625, -0.25], [-1, 3.625], [11.781, 0.575], [4.5, 0.251], [4.937, 0.062], [4.755, 0.225], [2, 0]], "v": [[20.125, 26.5], [2.125, 27.875], [20.032, 29.487], [37.625, 29.874], [48.813, 29.75], [66.25, 30.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.3, "y": 0.474 }, "t": 31, "s": [{ "i": [[13.625, 0.25], [0.091, -3.374], [-9.49, -0.463], [-5.868, -0.691], [-1.92, -2.437], [-5.098, 8.855], [-2, 0]], "o": [[-13.625, -0.25], [-0.163, 6.041], [11.781, 0.575], [4.25, 0.5], [3.25, 4.125], [2.375, -4.125], [2, 0]], "v": [[20.125, 26.5], [2.125, 28.625], [20.094, 35.05], [38, 33.374], [46.375, 40.875], [66.125, 38.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 46, "s": [{ "i": [[13.625, 0.25], [0.151, -3.372], [-9.49, -0.463], [-5.437, -2.312], [0.698, -3.023], [3.25, 19.25], [-2, 0]], "o": [[-13.625, -0.25], [7.375, 0.5], [11.781, 0.575], [3.239, 1.378], [-3, 13], [-2.463, -14.586], [2, 0]], "v": [[20.125, 26.5], [1.125, 34.75], [20.969, 42.8], [43.75, 40.875], [47.5, 54.75], [63, 54], [72.5, 27.25]], "c": true }] }, { "t": 59, "s": [{ "i": [[13.625, 0.25], [-3.37, 0.193], [-9.49, -0.463], [-5.437, -2.312], [0.211, -3.095], [1.341, 18.583], [-2, 0]], "o": [[-13.625, -0.25], [8.75, -0.5], [11.781, 0.575], [3.239, 1.378], [-0.75, 11], [-0.875, -12.125], [2, 0]], "v": [[20.125, 26.5], [1.5, 32.375], [21.344, 40.925], [43, 38.75], [45.5, 52], [64.125, 50.125], [72.5, 27.25]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 153, "st": 16, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 4, "ty": 4, "nm": "Shape Layer 2", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [183, 234.377, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.667, "y": 0.32 }, "o": { "x": 0.333, "y": 0 }, "t": 7, "s": [{ "i": [[0, 0.316], [6.837, 0.024], [-0.25, -0.601], [-3.691, -0.402], [-7.5, 0.016], [-4.866, 0.411]], "o": [[-1.5, -0.395], [-7.929, -0.028], [3.25, 0.506], [3.846, 0.419], [5.771, -0.012], [5.115, -0.432]], "v": [[-44.375, 31.881], [-69.125, 31.739], [-95.375, 31.976], [-85.721, 33.336], [-70.5, 33.984], [-54.509, 33.201]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0.68 }, "t": 20.154, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [-3.691, -3.179], [-7.5, 0.125], [-4.866, 3.25]], "o": [[-1.5, -3.125], [-7.929, -0.221], [3.25, 4], [3.846, 3.312], [5.771, -0.096], [5.115, -3.416]], "v": [[-44.125, 32.125], [-68.875, 31], [-95.125, 32.875], [-85.471, 43.625], [-70.25, 48.75], [-54.259, 42.562]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 34.77, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.125, -8.875], [-12.875, -0.25], [-0.25, 8.125]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.127, 9.003], [12.133, 0.236], [0.388, -12.625]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 52.125], [-70.5, 75.75], [-65.875, 51.625]], "c": true }] }, { "t": 56, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.375, -7.25], [-12.5, -0.25], [0.164, 4.872]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.375, 7.25], [12.5, 0.25], [-0.375, -11.125]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 50.625], [-70.5, 69.75], [-65.875, 50.125]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 144, "st": 7, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 5, "ty": 4, "nm": "Shape Layer 1", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [84, 235.877, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.333, "y": 0 }, "t": 15, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.75, 27.526], [-96.375, 28.651], [-80.875, 31.617], [-60.25, 32.604], [-40.5, 31.028]], "c": true }] }, { "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "t": 20.2, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.875, 30.776], [-96.375, 28.651], [-81, 34.117], [-60.125, 35.729], [-40.5, 33.778]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.167, "y": 0.167 }, "t": 34.5, "s": [{ "i": [[-6.75, 6.25], [18, -2.25], [-3.278, -2.217], [-9, -0.805], [-3.5, 2.645]], "o": [[-12.25, -8], [8.883, 8.702], [4, 2.706], [7.346, 0.657], [3.5, -2.645]], "v": [[-23.75, 29], [-96.75, 27.25], [-80.875, 44.044], [-60, 51.305], [-40.375, 42.52]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 54, "s": [{ "i": [[-7.5, -0.25], [18.75, -4.5], [-0.375, -17.419], [-13.5, 0.195], [0.073, 10.144]], "o": [[-12.25, -8], [8.75, 12.25], [0.181, 8.402], [14.375, -0.208], [-0.125, -17.27]], "v": [[-49.125, 34.625], [-94.75, 28.25], [-72.375, 60.544], [-67.625, 88.805], [-62.625, 60.27]], "c": true }] }, { "t": 74, "s": [{ "i": [[-8.625, -2], [18.75, -4.5], [-0.25, -14.669], [-15.5, 0.195], [0.51, 10.132]], "o": [[-12.25, -8], [8.883, 8.702], [0.143, 8.402], [15.5, -0.195], [-0.75, -14.895]], "v": [[-49.125, 35], [-93.25, 29.625], [-74, 59.169], [-67.5, 83.805], [-60.5, 58.395]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.478431372549, 0.313725490196, 0.160784313725, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 161, "st": 24, "ct": 1, "bm": 0 }], "markers": [], "props": {} };


/* ─────────────────────────────────────────────────────────────────────────────
   iOS / Android DETECTION HELPERS
───────────────────────────────────────────────────────────────────────────── */
const detectIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

const detectAndroid = () => /Android/i.test(navigator.userAgent);

const detectMobile = () => detectIOS() || detectAndroid() ||
  /webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

/* ─────────────────────────────────────────────────────────────────────────────
   FAN LAYOUT — tuned per breakpoint
───────────────────────────────────────────────────────────────────────────── */
const FAN_PRESETS = {
  desktop: [
    { x: -32, y: -8, rotate: -20, scale: 0.92, zIndex: 4 },
    { x: -21, y: -11, rotate: -12, scale: 0.96, zIndex: 5 },
    { x: -10, y: -13, rotate: -5, scale: 1.02, zIndex: 6 },
    { x: 0, y: -15, rotate: 0, scale: 1.08, zIndex: 7 },
    { x: 10, y: -13, rotate: 5, scale: 1.02, zIndex: 6 },
    { x: 21, y: -11, rotate: 12, scale: 0.96, zIndex: 5 },
    { x: 32, y: -8, rotate: 20, scale: 0.92, zIndex: 4 },
  ],
  laptop: [
    { x: -30, y: -7, rotate: -19, scale: 0.90, zIndex: 4 },
    { x: -20, y: -10, rotate: -11, scale: 0.95, zIndex: 5 },
    { x: -9, y: -12, rotate: -4, scale: 1.00, zIndex: 6 },
    { x: 0, y: -14, rotate: 0, scale: 1.05, zIndex: 7 },
    { x: 9, y: -12, rotate: 4, scale: 1.00, zIndex: 6 },
    { x: 20, y: -10, rotate: 11, scale: 0.95, zIndex: 5 },
    { x: 30, y: -7, rotate: 19, scale: 0.90, zIndex: 4 },
  ],
  /* Tablet: tighter spread so cards don't overflow edges */
  tablet: [
    { x: -24, y: -3, rotate: -16, scale: 0.82, zIndex: 4 },
    { x: -16, y: -6, rotate: -9, scale: 0.88, zIndex: 5 },
    { x: -7, y: -8, rotate: -3, scale: 0.94, zIndex: 6 },
    { x: 0, y: -10, rotate: 0, scale: 0.99, zIndex: 7 },
    { x: 7, y: -8, rotate: 3, scale: 0.94, zIndex: 6 },
    { x: 16, y: -6, rotate: 9, scale: 0.88, zIndex: 5 },
    { x: 24, y: -3, rotate: 16, scale: 0.82, zIndex: 4 },
  ],
  /* Mobile: single stacked card, slight rotation offsets */
  mobile: [
    { x: 0, y: 0, rotate: -6, scale: 1.0, zIndex: 4 },
    { x: 0, y: 0, rotate: 4, scale: 1.0, zIndex: 5 },
    { x: 0, y: 0, rotate: -8, scale: 1.0, zIndex: 6 },
    { x: 0, y: 0, rotate: 6, scale: 1.0, zIndex: 7 },
    { x: 0, y: 0, rotate: -4, scale: 1.0, zIndex: 8 },
    { x: 0, y: 0, rotate: 7, scale: 1.0, zIndex: 9 },
    { x: 0, y: 0, rotate: 0, scale: 1.0, zIndex: 10 },
  ],
  mobileSmall: [
    { x: 0, y: 0, rotate: -6, scale: 1.0, zIndex: 4 },
    { x: 0, y: 0, rotate: 4, scale: 1.0, zIndex: 5 },
    { x: 0, y: 0, rotate: -8, scale: 1.0, zIndex: 6 },
    { x: 0, y: 0, rotate: 6, scale: 1.0, zIndex: 7 },
    { x: 0, y: 0, rotate: -4, scale: 1.0, zIndex: 8 },
    { x: 0, y: 0, rotate: 7, scale: 1.0, zIndex: 9 },
    { x: 0, y: 0, rotate: 0, scale: 1.0, zIndex: 10 },
  ],
};

// isMob: includes tablet — all touch-primary screens skip hover
const isMob = (s) =>
  s === "mobile" || s === "mobileSmall" || s === "tablet" || s === "laptop";

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function VideoShowcaseSection() {

  /* ── Section 1 refs ── */
  const roundSectionRef = useRef(null);
  const roundCircleRef = useRef(null);
  const roundElementRef = useRef(null);
  const roundOverlayRef = useRef(null);
  const roundButtonRef = useRef(null);
  const roundWrapRef = useRef(null);

  /* ── Section 3 refs ── */
  const socialSectionRef = useRef(null);
  const socialWrapperRef = useRef(null);
  const socialStickyRef = useRef(null);
  const cardRefs = useRef([]);
  const videoRefs = useRef([]);

  /* ── Lottie ref ── */
  const lottieRef = useRef(null);

  /* ── State ── */
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState("desktop");
  const [modal, setModal] = useState(null);
  const [iosDevice, setIosDevice] = useState(false);
  const [androidDev, setAndroidDev] = useState(false);
  const [isTouchDev, setIsTouchDev] = useState(false);

  /* ── Detect device on mount ── */
  useEffect(() => {
    const ios = detectIOS();
    const android = detectAndroid();
    setIosDevice(ios);
    setAndroidDev(android);
    setIsTouchDev(detectMobile());
  }, []);

  /* ── Screen-size detection (fine-grained) ── */
  useEffect(() => {
    const detect = () => {
      const w = window.innerWidth;
      if (w >= 1366) setScreenSize("desktop");
      else if (w >= 1025) setScreenSize("laptop");
      else if (w >= 768) setScreenSize("tablet");
      else if (w >= 480) setScreenSize("mobile");
      else setScreenSize("mobileSmall");
    };
    detect();
    window.addEventListener("resize", detect);
    return () => window.removeEventListener("resize", detect);
  }, []);

  /* ── Fetch videos ── */
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/videos");
        setVideos(res.data || []);
      } catch { console.error("Failed to load videos"); }
      finally { setLoading(false); }
    })();
  }, []);

  /* ── Hover handlers for drip button (desktop only) ── */
  const handleButtonEnter = () => {
    if (!lottieRef.current || isTouchDev) return;
  lottieRef.current.setSpeed(3); 
  lottieRef.current.goToAndPlay(0, true);
};
  const handleButtonLeave = () => {
    if (!lottieRef.current || isTouchDev) return;
    lottieRef.current.stop();
  };

  /* ── GSAP ── */
  useEffect(() => {
    if (!videos.length) return;

    const mobile = isMob(screenSize);
    const presets = FAN_PRESETS[screenSize] || FAN_PRESETS.desktop;
    const videoCount = Math.min(videos.length, presets.length);
    const dispVids = videos.slice(0, videoCount);

    const ctx = gsap.context(() => {

      /* ── S1 – Expanding circle ── */
      if (mobile) {
        ScrollTrigger.create({
          trigger: roundWrapRef.current,
          start: "top top", end: "bottom bottom",
          pin: roundCircleRef.current, pinSpacing: false,
        });
        gsap.set(roundElementRef.current, {
          width: "100vw", height: "100vh",
          borderRadius: "0%", scale: 1, opacity: 1,
        });
        gsap.set(roundOverlayRef.current, { opacity: 0.5 });
        gsap.set(roundButtonRef.current, { opacity: 1, scale: 1 });
      } else {
        const sizes = {
          laptop: { s: "12vw", e: "150vw" },
          desktop: { s: "10vw", e: "150vw" },
        }[screenSize] || { s: "10vw", e: "150vw" };

        ScrollTrigger.create({
          trigger: roundWrapRef.current,
          start: "top top", end: "bottom bottom",
          pin: roundCircleRef.current, pinSpacing: false, scrub: 0.5,
        });
        gsap.fromTo(roundElementRef.current,
          { width: sizes.s, height: sizes.s, borderRadius: "50%", scale: 1, opacity: 1 },
          {
            width: sizes.e, height: sizes.e, borderRadius: "50%", scale: 1.2, opacity: 0.9,
            ease: "none",
            scrollTrigger: {
              trigger: roundWrapRef.current,
              start: "top top", end: "bottom bottom",
              scrub: 0.8, invalidateOnRefresh: true,
            },
          }
        );
        gsap.fromTo(roundOverlayRef.current, { opacity: 0.3 },
          {
            opacity: 0.8, ease: "none",
            scrollTrigger: {
              trigger: roundWrapRef.current,
              start: "top top", end: "bottom bottom", scrub: 0.8,
            },
          }
        );
        gsap.fromTo(roundButtonRef.current, { opacity: 1, scale: 1 },
          {
            opacity: 0, scale: 1.5, ease: "none",
            scrollTrigger: {
              trigger: roundWrapRef.current,
              start: "top top", end: "center center", scrub: 0.8,
            },
          }
        );
      }

      /* ── S3 – Fan cards ── */
      if (!socialSectionRef.current || !cardRefs.current.length) return;

      ScrollTrigger.create({
        trigger: socialWrapperRef.current,
        start: "top top", end: "bottom bottom",
        pin: socialStickyRef.current, pinSpacing: false,
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, {
          xPercent: -50, yPercent: -50,
          x: 0, y: "85vh",
          rotation: 0, scale: 0.35, opacity: 0,
          zIndex: i + 1,
        });
      });

      const slotW = 1 / videoCount;
      const animDur = slotW * 0.7;
      const s3Tl = gsap.timeline();

      dispVids.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        const pos = presets[i % presets.length];
        const tStart = i * slotW;

        s3Tl.to(card, {
          xPercent: -50, yPercent: -50,
          x: `${pos.x}vw`, y: `${pos.y}vh`,
          rotation: pos.rotate, scale: pos.scale, opacity: 1,
          ease: "power3.out", duration: animDur,
          onComplete: () => {
            /* iOS / Android: force play when card animates in */
            if (iosDevice || androidDev) {
              const vid = videoRefs.current[i];
              if (vid) { vid.muted = true; vid.play().catch(() => { }); }
            }
          },
        }, tStart);
      });

      ScrollTrigger.create({
        trigger: socialWrapperRef.current,
        start: "top top", end: "bottom bottom",
        scrub: 1, animation: s3Tl,
      });

      /* Backup trigger for iOS/Android — fires when section enters viewport */
      if (iosDevice || androidDev) {
        ScrollTrigger.create({
          trigger: socialWrapperRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            videoRefs.current.forEach((vid) => {
              if (vid) { vid.muted = true; vid.play().catch(() => { }); }
            });
          },
        });
      }

      /* Parallax text */
      const textLines = socialSectionRef.current.querySelectorAll(".sf-bg-line");
      textLines.forEach((line, i) => {
        gsap.fromTo(line,
          { xPercent: i % 2 === 0 ? -10 : 10 },
          {
            xPercent: i % 2 === 0 ? 10 : -10, ease: "none",
            scrollTrigger: {
              trigger: socialSectionRef.current,
              start: "top bottom", end: "bottom top", scrub: 2,
            },
          }
        );
      });
    });

    ScrollTrigger.refresh();
    const onResize = () => setTimeout(() => ScrollTrigger.refresh(), 100);
    window.addEventListener("resize", onResize);
    return () => { ctx.revert(); window.removeEventListener("resize", onResize); };

  }, [videos, screenSize, iosDevice, androidDev]);

  /* ── Derived ── */
  const mobile = isMob(screenSize);
  const presets = FAN_PRESETS[screenSize] || FAN_PRESETS.desktop;
  const videoCount = Math.min(videos.length, presets.length);
  const dispVids = videos.slice(0, videoCount);

  if (loading) return null;

  /* ═══════════════════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;700;900&display=swap');

        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ════════════════════════════════════════════════════════════
           SECTION 1 – Round expanding circle video
        ════════════════════════════════════════════════════════════ */
        .s1 {
          position: relative;
          background: #523122;
          overflow: hidden;
          width: 100%;
          z-index: 10;
        }

        /* Scroll-driver height — shorter on touch screens */
        .s1-wrap {
          position: relative;
          width: 100%;
          height: 200vh;
        }
        @media (max-width: 1024px) { .s1-wrap { height: 130vh; } }
        @media (max-width: 767px)  { .s1-wrap { height: 120vh; } }
        @media (max-width: 479px)  { .s1-wrap { height: 110vh; } }

        /* Sticky viewport */
        .s1-sticky {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100vh;
          /* Safe-area insets (iPhone notch / Dynamic Island) */
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
        }

        /* Expanding circle */
        .s1-circle {
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          will-change: width, height, scale;
          transition: box-shadow .3s;
          box-shadow: 0 0 40px rgba(0,0,0,0.45);
          /* Desktop initial size */
          width: clamp(80px, 10vw, 180px);
          height: clamp(80px, 10vw, 180px);
        }

        /* Mobile / tablet: full-screen rectangle */
        @media (max-width: 1024px) {
          .s1-circle {
            width: 100vw !important;
            height: 100vh !important;
            border-radius: 0 !important;
          }
        }

        .s1-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
          z-index: 2;
          pointer-events: none;
        }

        .s1-vid-wrap {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 1;
        }
        .s1-vid-wrap video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Play button */
        .s1-play-link {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          cursor: pointer;
          text-decoration: none;
          /* Larger tap target on mobile */
          -webkit-tap-highlight-color: transparent;
        }
        .s1-play-btn {
          border-radius: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          cursor: pointer;
          will-change: opacity, scale;
          /* Responsive sizing with safe floor/ceiling */
          width:  clamp(72px, 12vw, 180px);
          height: clamp(72px, 12vw, 180px);
          touch-action: manipulation;
        }
        /* Slightly larger on small phones */
        @media (max-width: 479px) {
          .s1-play-btn { width: 88px; height: 88px; }
        }

        .s1-play-bg {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(0,0,0,0.65);
          z-index: 1;
          transition: background .3s;
        }
        .s1-play-btn:hover .s1-play-bg,
        .s1-play-btn:active .s1-play-bg { background: rgba(0,0,0,0.85); }

        .s1-play-icon {
          z-index: 3;
          color: #fff;
          font-size: clamp(16px, 3vw, 42px);
        }
        .s1-play-icon::after { content: "▶"; }

        /* Rotating text ring */
        .s1-svg-ring {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 2;
          animation: s1spin 18s linear infinite;
        }
        @keyframes s1spin { to { transform: rotate(360deg); } }
        .s1-svg-ring text {
          font-family: 'Antonio', sans-serif;
          font-weight: 700;
          fill: rgba(255,255,255,0.9);
          letter-spacing: .15em;
          font-size: clamp(10px, 1.1vw, 14px);
        }
        @media (max-width: 767px) { .s1-svg-ring text { font-size: 18px; } }
        @media (max-width: 479px) { .s1-svg-ring text { font-size: 15px; } }


        /* ════════════════════════════════════════════════════════════
           SECTION 3 – Social fan cards
        ════════════════════════════════════════════════════════════ */
        .s3-outer {
          background: #222123;
          position: relative;
          z-index: 20;
          overflow: visible;
        }

        /* Scroll driver */
        .s3-driver {
          background: #ffd500;
          width: 100%;
          height: var(--s3-driver-height, 500vh);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: visible;
        }
        /* Progressive height reduction on smaller viewports */
        @media (max-width: 1024px) { .s3-driver { --s3-driver-height: 400vh; } }
        @media (max-width: 767px)  { .s3-driver { --s3-driver-height: 280vh; } }
        @media (max-width: 479px)  { .s3-driver { --s3-driver-height: 220vh; } }
        @media (max-width: 359px)  { .s3-driver { --s3-driver-height: 200vh; } }

        /* Sticky viewport */
        .s3-sticky {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          z-index: 4;
          overflow: hidden;
          /* Safe area: notch / home indicator */
          padding-bottom: env(safe-area-inset-bottom);
        }

        /* ── Fan cards ── */
        .s3-card {
          position: absolute;
          top: 70%;
          left: 50%;
          border: 0.30vw solid #ffd500;
          border-radius: 2vw;
          overflow: hidden;
          width: clamp(140px, 18vw, 280px);
          aspect-ratio: 9/16;
          cursor: pointer;
          will-change: transform, opacity;
          box-shadow: 0 20px 40px rgba(0,0,0,0.52);
          background: #111;
          /* GPU layer */
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          /* Touch feedback */
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .s3-card:active { opacity: 0.85; }

        .s3-card video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          display: block;
        }

        /* ── Breakpoint-specific card sizing ── */

        /* Large desktop (1366+): default above */

        /* Laptop (1025–1365) */
        @media (max-width: 1365px) and (min-width: 1025px) {
          .s3-card { width: clamp(140px, 17vw, 260px); }
        }

        /* Tablet landscape (1024px, including iPad Pro) */
        @media (max-width: 1024px) and (min-width: 821px) {
          .s3-card {
            top: 55%;
            width: 43vw;
            border-width: 3px;
            border-radius: 14px;
          }
        }



/* Nest Hub exact pixel override */
@media (width: 1024px) and (height: 600px) {
  .s3-card { top: 65%; width: 19vw; min-width: 76px; }
  .sf-bg-line { font-size: 10.5vw; }
}

        /* Tablet portrait (768–820) */
        @media (max-width: 820px) and (min-width: 768px) {
          .s3-card {
            top: 55%;
            width: 49vw;
            height: 80vw;
            border-width: 4px;
            border-radius: 16px;
          }
        }

        /* Large mobile / phablet (541–767) */
        @media (max-width: 767px) and (min-width: 541px) {
          .s3-card {
            top: 44%;
            width: 62vw;
            height: 110vw;
            border-width: 3px;
            border-radius: 14px;
          }
        }

        /* Mobile (480–540) */
        @media (max-width: 540px) and (min-width: 480px) {
          .s3-card {
            top: 54%;
            width: 50vw;
            // height: 100vw;
            border-width: 3px;
            border-radius: 14px;
          }
        }

        /* Small mobile (360–479) */
        @media (max-width: 479px) and (min-width: 360px) {
          .s3-card {
            top: 46%;
            width: 50vw;
            // height: 100vw;
            border-width: 3px;
            border-radius: 14px;
          }
        }

        /* Very small phones (<360px, e.g. older iPhones / Galaxy A) */
        @media (max-width: 359px) {
          .s3-card {
            top: 46%;
            width: 74vw;
            height: 132vw;
            border-width: 2px;
            border-radius: 12px;
          }
        }


        /* ════════════════════════════════════════════════════════════
           Explore All — Lottie drip button
        ════════════════════════════════════════════════════════════ */
        .s3-cta-wrap {
          position: absolute;
          bottom: 5.5vh;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          /* Ensure above all cards */
          pointer-events: auto;
        }
        /* Give extra breathing room on very small phones */
        @media (max-width: 479px) { .s3-cta-wrap { bottom: 4vh; } }

        .liquid-button-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
        }

        /* Drip Lottie layer — desktop/laptop only */
        .lottie-animation-2 {
  z-index: 1;
  perspective-origin: 50% 0;
  transform-origin: 50% 0;
  width: 12.5vw;
  height: 13.5vw;
  position: absolute;
  top: -5.9vw;
  right: 0;
  bottom: 0;
  left: -3.1vw;
  pointer-events: none;
}

/* Large screens */
@media (min-width: 1600px) {
  .lottie-animation-2 {
    width: 11vw;
    height: 12vw;
    top: -5vw;
    left: -2.5vw;
  }
}

/* Extra large screens */
@media (min-width: 1920px) {
  .lottie-animation-2 {
    width: 10vw;
    height: 10.7vw;
    top: -4.5vw;
    left: -2.5vw;
  }
}

/* Ultra wide screens up to 2238px */
@media (min-width: 2238px) {
  .lottie-animation-2 {
    width: 9vw;
    height: 10vw;
    top: -4.2vw;
    left: -2.5vw;
  }
}
       
        @media (max-width: 1024px) { .lottie-animation-2 { display: none; } }

        /* Pill button */
        .liquid-button {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #80542c;
          border-radius: 100vw;
          padding: .75em 3em;
          text-decoration: none;
          cursor: pointer;
          transition: background .3s;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .liquid-button:hover,
        .liquid-button:active { background: #7a5029; }

        /* Responsive padding */
        @media (max-width: 991px)  { .liquid-button { padding: .7em 2.4em; } }
        @media (max-width: 767px)  { .liquid-button { padding: .65em 2em; } }
        @media (max-width: 479px)  { .liquid-button { padding: .6em 1.75em; } }

        .button-text {
          position: relative;
          z-index: 2;
          letter-spacing: -.01vw;
          font-family: Antonio, sans-serif;
          font-size: clamp(.8rem, 1.1vw, 1.15rem);
          font-weight: 700;
          text-transform: uppercase;
          color: #ffd500;
          white-space: nowrap;
        }
        /* Explicit floor for mobile */
        @media (max-width: 767px)  { .button-text { font-size: clamp(.78rem, 3.5vw, .95rem); } }
        @media (max-width: 479px)  { .button-text { font-size: .8rem; } }


        /* ════════════════════════════════════════════════════════════
           Parallax background text
        ════════════════════════════════════════════════════════════ */
        .s3-bg-wrap {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding-top: 5vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
          overflow: hidden;
          z-index: 2;
        }
        .sf-bg-line {
          font-family: 'Antonio', sans-serif;
          font-size: 13.5vw;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -.4vw;
          text-transform: uppercase;
          color: #222123;
          will-change: transform;
          user-select: none;
        }
        .sf-bg-line.orange { color: #523121; }
        .sf-bg-line.right  { text-align: right; width: 100%; }

        /* Scale text down a touch on very small screens */
        @media (max-width: 479px) {
          .sf-bg-line { font-size: 15vw; letter-spacing: -.3vw; }
        }


        /* ════════════════════════════════════════════════════════════
           MODAL
        ════════════════════════════════════════════════════════════ */
        .vmodal-bg {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.97);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          /* Respect safe areas (notch / home bar) */
          padding: max(env(safe-area-inset-top), clamp(10px,3vw,30px))
                   max(env(safe-area-inset-right), clamp(10px,3vw,30px))
                   max(env(safe-area-inset-bottom), clamp(10px,3vw,30px))
                   max(env(safe-area-inset-left), clamp(10px,3vw,30px));
          animation: vmFadeIn .25s ease;
          /* Prevent scroll bounce on iOS */
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
        @keyframes vmFadeIn { from { opacity: 0 } to { opacity: 1 } }

        .vmodal-box {
          position: relative;
          width: 100%;
          /* On portrait mobile fill more height */
          max-width: min(480px, 92vw);
          aspect-ratio: 9/16;
          animation: vmSlide .28s ease;
        }
        /* Landscape on phone: shrink to fit */
        @media (max-height: 500px) and (orientation: landscape) {
          .vmodal-box {
            max-width: unset;
            height: 90vh;
            width: auto;
            aspect-ratio: 9/16;
          }
        }
        @keyframes vmSlide {
          from { transform: translateY(22px); opacity: 0 }
          to   { transform: translateY(0);    opacity: 1 }
        }

        .vmodal-box video {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 12px;
          /* Prevent fullscreen takeover on iOS */
          -webkit-playsinline: true;
        }

        .vmodal-close {
          position: absolute;
          top: -46px;
          right: 0;
          background: #fff;
          color: #523122;
          border: none;
          border-radius: 50%;
          font-size: 22px;
          cursor: pointer;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .25s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.25);
          /* Easier tap on mobile */
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        /* Slightly larger on small phones */
        @media (max-width: 479px) {
          .vmodal-close {
            width: 44px;
            height: 44px;
            font-size: 24px;
            top: -50px;
          }
        }
        .vmodal-close:hover,
        .vmodal-close:active {
          background: #523122;
          color: #fff;
          transform: scale(1.12);
        }


        /* ════════════════════════════════════════════════════════════
           Accessibility & performance
        ════════════════════════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .s1-svg-ring { animation: none !important; }
          .s3-card, .s1-circle { transition: none !important; animation: none !important; }
        }

        /* Remove hover effects on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .s3-card:hover,
          .liquid-button:hover { transform: none; box-shadow: none; }
        }

        /* High-DPI / Retina: sharper borders */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .s3-card { border-width: 0.5px; }
          @media (max-width: 767px) { .s3-card { border-width: 1.5px; } }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 1 – Round expanding circle video
      ════════════════════════════════════════════════════════════════ */}
      <div className="s1" ref={roundSectionRef}>
        <div className="s1-wrap" ref={roundWrapRef}>
          <div className="s1-sticky" ref={roundCircleRef}>
            <a
              href="#"
              className="s1-play-link"
              onClick={(e) => {
                e.preventDefault();
                setModal({ src: "Videos/Video2.mp4" });
              }}
              aria-label="Play full video"
            >
              <div className="s1-play-btn" ref={roundButtonRef}>
                <div className="s1-play-bg" />
                <svg className="s1-svg-ring" viewBox="0 0 200 200">
                  <defs>
                    <path id="rp"
                      d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
                      fill="none" />
                  </defs>
                  <text>
                    <textPath href="#rp" startOffset="50%" textAnchor="middle">
                      PLAY VIDEO • PLAY VIDEO • PLAY VIDEO •
                    </textPath>
                  </text>
                </svg>
                <span className="s1-play-icon" aria-hidden="true" />
              </div>
            </a>

            <div className="s1-circle" ref={roundElementRef}>
              <div className="s1-overlay" ref={roundOverlayRef} />
              <div className="s1-vid-wrap">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="images/product1.png"
                  /* Android: preload for smoother playback */
                  preload={androidDev ? "auto" : "metadata"}
                >
                  <source src="Videos/Video2.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3 – Social feedback + API videos combined
      ════════════════════════════════════════════════════════════════ */}
      <div className="s3-outer" ref={socialSectionRef}>
        <div className="s3-driver" ref={socialWrapperRef}>
          <div className="s3-sticky" ref={socialStickyRef}>

            {/* Parallax background text */}
            <div className="s3-bg-wrap">
              <span className="sf-bg-line">What's</span>
              <span className="sf-bg-line orange">everyone</span>
              <span className="sf-bg-line right">talking</span>
            </div>

            {/* API video fan cards */}
            {dispVids.map((v, i) => (
              <div
                key={v._id}
                ref={(el) => (cardRefs.current[i] = el)}
                className="s3-card"
                onClick={() => setModal({ src: v.videoUrl })}
                /* Hover-to-play only on non-touch screens */
                onMouseEnter={() => !mobile && videoRefs.current[i]?.play()}
                onMouseLeave={() => !mobile && videoRefs.current[i]?.pause()}
              >
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={v.videoUrl}
                  muted
                  playsInline
                  preload="metadata"
                  /* iOS & Android: autoplay + loop since no hover events */
                  autoPlay={iosDevice || androidDev}
                  loop={iosDevice || androidDev}
                />
              </div>
            ))}

            {/* Explore All — Lottie drip button */}
            <div className="s3-cta-wrap">
              <div
                className="liquid-button-wrapper"
                onMouseEnter={handleButtonEnter}
                onMouseLeave={handleButtonLeave}
              >
                <a href="/product" className="liquid-button">
                  <div className="button-text">
                    {/* Lottie drip — hidden on touch screens via CSS */}
                    <div className="lottie-animation-2">
                      <Lottie
  lottieRef={lottieRef}
  animationData={DRIP_ANIMATION}
  loop={false}
  autoplay={false}
  speed={5}
  style={{ width: "100%", height: "100%" }}
/>
                    </div>


                    explore all</div>
                </a>
              </div>
            </div>

          </div>{/* /sticky */}
        </div>{/* /driver */}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          MODAL
      ════════════════════════════════════════════════════════════════ */}
      {modal && (
        <div
          className="vmodal-bg"
          onClick={() => setModal(null)}
          /* Prevent rubber-band scroll on iOS behind modal */
          onTouchMove={(e) => e.preventDefault()}
        >
          <div className="vmodal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="vmodal-close"
              onClick={() => setModal(null)}
              aria-label="Close video"
            >
              ×
            </button>
            <video
              src={modal.src}
              controls
              autoPlay
              playsInline
              /*
                iOS: muted required for autoPlay; user can unmute via controls
                Android: no muted needed — plays audio by default
              */
              muted={iosDevice}
            />
          </div>
        </div>
      )}
    </>
  );
}