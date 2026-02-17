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



import { useEffect, useRef, useState } from "react";
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
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const cardsRef = useRef([]);
  const textRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

  // 🔹 GSAP animation (runs only after videos load)
  useEffect(() => {
    if (!videos.length) return;

    const ctx = gsap.context(() => {
      const split = new SplitType(textRef.current, { types: "words" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: true,
          pin: true,
        },
      });

      tl.fromTo(
        split.words,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 0.12, stagger: 0.12 },
        0
      );

      // 🔹 Use appropriate presets based on screen size
      const displayVideos = isMobile ? videos.slice(0, 3) : videos;
      const presets = isMobile ? mobilePositionPresets : positionPresets;

      cardsRef.current.forEach((card, i) => {
        if (card && i < displayVideos.length) {
          const pos = presets[i % presets.length];
          gsap.set(card, pos);
        }
      });

      tl.fromTo(
        cardsRef.current.filter(card => card !== null),
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.12 },
        0.15
      );

      tl.fromTo(
        circleRef.current,
        { width: isMobile ? "20vw" : "12vw", height: isMobile ? "20vw" : "12vw", borderRadius: "50%" },
        { width: "150vw", height: "150vw", borderRadius: "75vw" },
        0.35
      );
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [videos, isMobile]);

  if (loading) return null;

  // 🔹 Show only 3 videos on mobile
  const displayVideos = isMobile ? videos.slice(0, 3) : videos;

  return (
    <>
      <style>{`
        .video-section {
          height: 100vh;
          background: #000;
          position: relative;
          overflow: hidden;
        }
        .bg-text {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12vw;
          font-weight: 900;
          color: rgba(250,204,21,.95);
          pointer-events: none;
          text-align: center;
          padding: 0 20px;
        }
        .circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          background: rgba(250,204,21,.95);
        }
        .video-card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 220px;
          aspect-ratio: 9/16;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,.45);
        }
        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 768px) {
          .bg-text {
            font-size: 16vw;
          }
          .video-card {
            width: 160px;
          }
        }
      `}</style>

      <section ref={sectionRef} className="video-section">
        <h2 ref={textRef} className="bg-text">
          WHAT'S EVERYONE TALKING
        </h2>

        <div ref={circleRef} className="circle" />

        {displayVideos.map((v, i) => (
          <div
            key={v._id}
            ref={el => (cardsRef.current[i] = el)}
            className="video-card"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <video src={v.videoUrl} muted autoPlay loop playsInline />
          </div>
        ))}
      </section>
    </>
  );
}

