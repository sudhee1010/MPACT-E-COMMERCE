// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const NAVBAR_HEIGHT = 72;

// export default function FeaturesSection() {
//   const sectionRef = useRef(null);
//   const titleRef = useRef(null);
//   const stripsRef = useRef([]);

//   useEffect(() => {
//   if (!sectionRef.current || !titleRef.current) return;

//   const originalText = titleRef.current.innerText;

//   const ctx = gsap.context(() => {
//     /* ================= TITLE SPLIT ================= */
//     const words = originalText.split(" ");

//     titleRef.current.innerHTML = words
//       .map(
//         (word) =>
//           `<span class="title-word">${word}&nbsp;</span>`
//       )
//       .join("");

//     const wordEls =
//       titleRef.current.querySelectorAll(".title-word");

//     /* ================= MASTER TIMELINE ================= */
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: `top top+=${NAVBAR_HEIGHT}`,
//         end: "+=1400",
//         scrub: true,
//         pin: true,
//         anticipatePin: 1,
//       },
//     });

//     /* ================= TITLE ANIMATION ================= */
//     tl.fromTo(
//       wordEls,
//       {
//         y: 80,
//         opacity: 0,
//         rotation: -8,
//         transformOrigin: "left center",
//       },
//       {
//         y: 0,
//         opacity: 1,
//         rotation: 0,
//         stagger: 0.15,
//         ease: "power4.out",
//         duration: 0.8,
//       }
//     );

//     /* ================= STRIP STACK ================= */
//     stripsRef.current.forEach((el, i) => {
//       if (!el) return;

//       const tiltIn = i % 2 === 0 ? -8 : 8;
//       const tiltFinal = i % 2 === 0 ? -4 : 4;

//       tl.fromTo(
//         el,
//         {
//           clipPath: "inset(0 50% 0 50%)",
//           opacity: 0,
//           y: 120,
//           rotation: tiltIn,
//         },
//         {
//           clipPath: "inset(0 0% 0 0%)",
//           opacity: 1,
//           y: 0,
//           rotation: tiltFinal,
//           ease: "power4.out",
//           duration: 0.9,
//         }
//       );
//     });
//   }, sectionRef);
//   /* ================= CLEANUP ================= */
//   return () => {
//     if (titleRef.current) {
//       titleRef.current.innerText = originalText;
//     }
//     ctx.revert();
//   };
// }, []);


// useEffect(() => {
//   if (!sectionRef.current) return;

//   const ctx = gsap.context(() => {
//     // timelines
//   }, sectionRef);

//   ScrollTrigger.refresh(); // ✅ ADD THIS

//   return () => {
//     ctx.revert();
//   };
// }, []);





//   return (
//     <>
//       <style>{`
// /* ================= SECTION ================= */

// .features {
//   height: calc(105vh - ${NAVBAR_HEIGHT}px);
//   background: #111;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   overflow: hidden;
//   padding: 0 16px;
// }

// .features-inner {
//   width: 100%;
//   max-width: 1100px;
//   text-align: center;
// }

// /* ================= TITLE ================= */

// .features-title {
//   font-size: clamp(2.6rem, 5.8vw, 4.5rem);
//   font-weight: 900;
//   color: #facc15;
//   margin-bottom: clamp(32px, 6vw, 56px);
//   margin-top: 20px;
//   line-height: 1.05;
//   overflow: hidden;
// }

// .title-word {
//   display: inline-block;
//   transform: translateY(80px);
//   opacity: 0;
// }

// /* ================= STRIPS ================= */

// .spylt-stack {
//   display: flex;
//   flex-direction: column;
//   gap: clamp(18px, 3.5vw, 32px);
//   align-items: center;
// }

// .spylt-strip {
//   padding: clamp(16px, 3vw, 28px)
//            clamp(28px, 6vw, 62px);
//   font-size: clamp(1.4rem, 3.2vw, 2.125rem);
//   font-weight: 700;
//   transform-origin: center;
//   border-radius: 0px;
//   letter-spacing: 0.06em;
//   text-transform: uppercase;
//   white-space: nowrap;
//   box-shadow: 0 30px 70px rgba(0,0,0,0.6);
//   clip-path: inset(0 50% 0 50%);
//   opacity: 0;
//   will-change: transform, clip-path, opacity;
// }

// /* ================= COLORS ================= */

// .spylt-strip:nth-child(1) {
//   background: #FACC15;
//   color: #000;
// }

// .spylt-strip:nth-child(2) {
//   background: #F97316;
//   color: #fff;
// }

// .spylt-strip:nth-child(3) {
//   background: #DC2626;
//   color: #fff;
// }

// .spylt-strip:nth-child(4) {
//   background: #FACC15;
//   color: #000;
// }

// /* ================= LARGE DESKTOP ================= */
// /* 1440px – 1920px */

// @media (min-width: 1440px) {
//   .features-inner {
//     max-width: 1300px;
//   }

//   .features-title {
//     line-height: 1.02;
//   }
// }

// /* ================= ULTRA WIDE / 4K ================= */

// @media (min-width: 1920px) {
//   .features {
//     padding: 0 32px;
//   }

//   .features-inner {
//     max-width: 1500px;
//   }

//   .features-title {
//     font-size: 5rem;
//   }

//   .spylt-strip {
//     font-size: 2.4rem;
//     padding: 32px 72px;
//   }
// }

// /* ================= TABLET ================= */

// @media (max-width: 1024px) {
//   .features-title {
//     font-size: clamp(2.2rem, 6vw, 3.5rem);
//     line-height: 1.1;
//   }
// }

// /* ================= MOBILE ================= */

// @media (max-width: 640px) {
//   .features {
//     height: auto;
//     padding: 72px 12px;
//   }

//   .features-title {
//     margin-bottom: 36px;
//   }

//   .spylt-strip {
//     white-space: normal;
//     text-align: center;
//   }
// }

// /* ================= SMALL MOBILE ================= */

// @media (max-width: 420px) {
//   .features-title {
//     font-size: 2rem;
//   }

//   .spylt-strip {
//     font-size: 1.2rem;
//     padding: 14px 22px;
//     letter-spacing: 0.04em;
//   }
// }
// `}</style>


//       <section ref={sectionRef} className="features">
//         <div className="features-inner">
//           <h2 ref={titleRef} className="features-title">
//             BUILT FOR MODERN ENERGY
//           </h2>

//           <div className="spylt-stack">
//             {[
//               "Shelf Stable",
//               "Protein + Caffeine",
//               "Infinitely Recyclable",
//               "Lactose Free",
//             ].map((text, i) => (
//               <div
//                 key={i}
//                 className="spylt-strip"
//                 ref={(el) => (stripsRef.current[i] = el)}
//               >
//                 {text}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const NAVBAR_HEIGHT = 72;

// export default function FeaturesSection() {
//   const sectionRef = useRef(null);
//   const titleRef = useRef(null);
//   const stripsRef = useRef([]);

//   useEffect(() => {
//   if (!sectionRef.current || !titleRef.current) return;

//   const originalText = titleRef.current.innerText;

//   const ctx = gsap.context(() => {
//     /* ================= TITLE SPLIT ================= */
//     const words = originalText.split(" ");

//     titleRef.current.innerHTML = words
//       .map(
//         (word) =>
//           `<span class="title-word">${word}&nbsp;</span>`
//       )
//       .join("");

//     const wordEls =
//       titleRef.current.querySelectorAll(".title-word");

//     /* ================= MASTER TIMELINE ================= */
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: `top top+=${NAVBAR_HEIGHT}`,
//         end: "+=1400",
//         scrub: true,
//         pin: true,
//         anticipatePin: 1,
//       },
//     });

//     /* ================= TITLE ANIMATION ================= */
//     tl.fromTo(
//       wordEls,
//       {
//         y: 80,
//         opacity: 0,
//         rotation: -8,
//         transformOrigin: "left center",
//       },
//       {
//         y: 0,
//         opacity: 1,
//         rotation: 0,
//         stagger: 0.15,
//         ease: "power4.out",
//         duration: 0.8,
//       }
//     );

//     /* ================= STRIP STACK ================= */
//     stripsRef.current.forEach((el, i) => {
//       if (!el) return;

//       const tiltIn = i % 2 === 0 ? -8 : 8;
//       const tiltFinal = i % 2 === 0 ? -4 : 4;

//       tl.fromTo(
//         el,
//         {
//           clipPath: "inset(0 50% 0 50%)",
//           opacity: 0,
//           y: 120,
//           rotation: tiltIn,
//         },
//         {
//           clipPath: "inset(0 0% 0 0%)",
//           opacity: 1,
//           y: 0,
//           rotation: tiltFinal,
//           ease: "power4.out",
//           duration: 0.9,
//         }
//       );
//     });
//   }, sectionRef);
//   /* ================= CLEANUP ================= */
//   return () => {
//     if (titleRef.current) {
//       titleRef.current.innerText = originalText;
//     }
//     ctx.revert();
//   };
// }, []);


// useEffect(() => {
//   if (!sectionRef.current) return;

//   const ctx = gsap.context(() => {
//     // timelines
//   }, sectionRef);

//   ScrollTrigger.refresh(); // ✅ ADD THIS

//   return () => {
//     ctx.revert();
//   };
// }, []);





//   return (
//     <>
//       <style>{`
// /* ================= SECTION ================= */

// .features {
//   height: calc(105vh - ${NAVBAR_HEIGHT}px);
//   background: #111;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   overflow: hidden;
//   padding: 0 16px;
// }

// .features-inner {
//   width: 100%;
//   max-width: 1100px;
//   text-align: center;
// }

// /* ================= TITLE ================= */

// .features-title {
//   font-size: clamp(2.3rem, 5.4vw, 4.2rem);
//   font-weight: 900;
//   color: #facc15;
//   margin-bottom: clamp(32px, 6vw, 56px);
//   margin-top: 30px;
//   line-height: 1.05;
//   overflow: hidden;
// }

// .title-word {
//   display: inline-block;
//   transform: translateY(80px);
//   opacity: 0;
// }

// /* ================= STRIPS ================= */

// .spylt-stack {
//   display: flex;
//   flex-direction: column;
//   gap: clamp(18px, 3.5vw, 32px);
//   align-items: center;
// }

// .spylt-strip {
//   padding: clamp(16px, 3vw, 28px)
//            clamp(28px, 6vw, 62px);
//   font-size: clamp(1.4rem, 3.2vw, 2.125rem);
//   font-weight: 700;
//   transform-origin: center;
//   border-radius: 0px;
//   letter-spacing: 0.06em;
//   text-transform: uppercase;
//   white-space: nowrap;
//   box-shadow: 0 30px 70px rgba(0,0,0,0.6);
//   clip-path: inset(0 50% 0 50%);
//   opacity: 0;
//   will-change: transform, clip-path, opacity;
// }

// /* ================= COLORS ================= */

// .spylt-strip:nth-child(1) {
//   background: #FACC15;
//   color: #000;
// }

// .spylt-strip:nth-child(2) {
//   background: #F97316;
//   color: #fff;
// }

// .spylt-strip:nth-child(3) {
//   background: #DC2626;
//   color: #fff;
// }

// .spylt-strip:nth-child(4) {
//   background: #FACC15;
//   color: #000;
// }

// /* ================= LARGE DESKTOP ================= */
// /* 1440px – 1920px */

// @media (min-width: 1440px) {
//   .features-inner {
//     max-width: 1300px;
//   }

//   .features-title {
//     line-height: 1.02;
//   }
// }

// /* ================= ULTRA WIDE / 4K ================= */

// @media (min-width: 1920px) {
//   .features {
//     padding: 0 32px;
//   }

//   .features-inner {
//     max-width: 1500px;
//   }

//   .features-title {
//     font-size: 5rem;
//   }

//   .spylt-strip {
//     font-size: 2.4rem;
//     padding: 32px 72px;
//   }
// }

// /* ================= TABLET ================= */

// @media (max-width: 1024px) {
//   .features-title {
//     font-size: clamp(2.2rem, 6vw, 3.5rem);
//     line-height: 1.1;
//   }
// }

// /* ================= MOBILE ================= */

// @media (max-width: 640px) {
//   .features {
//     height: auto;
//     padding: 72px 12px;
//   }

//   .features-title {
//     margin-bottom: 36px;
//   }

//   .spylt-strip {
//     white-space: normal;
//     text-align: center;
//   }
// }

// /* ================= SMALL MOBILE ================= */

// @media (max-width: 420px) {
//   .features-title {
//     font-size: 2rem;
//   }

//   .spylt-strip {
//     font-size: 1.2rem;
//     padding: 14px 22px;
//     letter-spacing: 0.04em;
//   }
// }
// `}</style>


//       <section ref={sectionRef} className="features">
//         <div className="features-inner">
//           <h2 ref={titleRef} className="features-title">
//             BUILT FOR MODERN ENERGY
//           </h2>

//           <div className="spylt-stack">
//             {[
//               "Shelf Stable",
//               "Protein + Caffeine",
//               "Infinitely Recyclable",
//               "Lactose Free",
//             ].map((text, i) => (
//               <div
//                 key={i}
//                 className="spylt-strip"
//                 ref={(el) => (stripsRef.current[i] = el)}
//               >
//                 {text}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }





import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAVBAR_HEIGHT = 72;

const BOXES = [
  { id: "b1", cls: "box-1", rot: 3,  text: "Shelf Stable" },
  { id: "b3", cls: "box-3", rot: -1, text: "Protein + Caffeine" },
  { id: "b2", cls: "box-2", rot: 1,  text: "Infinitely Recyclable" },
  { id: "b4", cls: "box-4", rot: -5, text: "Lactose Free" },
];

// Splits text into individually animatable char spans
function SplitText({ text }) {
  return (
    <span className="spylt-split-word" aria-label={text}>
      {text.split("").map((char, i) => (
        <span className="spylt-char-wrap" key={i} aria-hidden="true">
          <span className="spylt-char">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function FeaturesSection() {
  const sectionRef     = useRef(null);
  const introLabelRef  = useRef(null);
  const bottomLabelRef = useRef(null);
  const scrollHintRef  = useRef(null);
  const boxRefs        = useRef([]); // [{ wrapper, chars[] }]

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top top+=${NAVBAR_HEIGHT}`,
          end: "+=3200",
          scrub: 1.4,            // buttery smooth scrub
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (scrollHintRef.current) {
              scrollHintRef.current.style.opacity = self.progress < 0.02 ? "1" : "0";
            }
          },
        },
      });

      // ── Intro label ──
      tl.fromTo(
        introLabelRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.35, ease: "expo.out" },
        0
      );

      // ── Per-box: pill expands + letters rise from center outward ──
      boxRefs.current.forEach((refs, i) => {
        if (!refs) return;
        const { wrapper, chars } = refs;
        const rot      = BOXES[i].rot;
        const boxStart = 0.22 + i * 0.30;

        // Box pill width expands from 0 → full, from center
        tl.fromTo(
          wrapper,
          { scaleX: 0, rotate: rot, transformOrigin: "50% 50%" },
          { scaleX: 1, duration: 0.25, ease: "expo.inOut" },
          boxStart
        );

        // Letters: stagger from center outward, rising up with slight 3-D tilt
        const midIndex = (chars.length - 1) / 2;

        chars.forEach((charEl, ci) => {
          if (!charEl) return;
          const distFromCenter = Math.abs(ci - midIndex);
          // Center letters animate first, edge letters slightly after
          const charOffset = boxStart + 0.04 + distFromCenter * 0.014;

          tl.fromTo(
            charEl,
            { y: "105%", opacity: 0, rotateX: 50, transformOrigin: "bottom center" },
            { y: "0%",   opacity: 1, rotateX: 0,  duration: 0.30, ease: "expo.out" },
            charOffset
          );
        });
      });

      // ── Bottom label ──
      tl.fromTo(
        bottomLabelRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.3, ease: "expo.out" },
        0.22 + BOXES.length * 0.30 + 0.1
      );

    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@700&display=swap');

        @font-face {
          font-family: 'Proxima Nova';
          src: url("https://cdn.prod.website-files.com/669a8d6498ba88c08dfd2cd2/66a0fdb93a8b4eefc94a777b_Proxima%20Nova%20Regular.otf") format("opentype");
          font-weight: 400;
        }

        /* ── Section ── */
        .spylt-section {
          height: calc(115vh - ${NAVBAR_HEIGHT}px);
          height: calc(115dvh - ${NAVBAR_HEIGHT}px);
          width: 100%;
          background: #222123;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
        }

        /* ── Intro label ── */
        .spylt-intro-label {
          color: #faeade;
          font-family: 'Proxima Nova', Georgia, sans-serif;
          font-size: clamp(12px, 1.1vw, 17px);
          font-weight: 400;
          text-align: center;
          letter-spacing: 0.04em;
          position: absolute;
          top: 12%;
          opacity: 0;
          pointer-events: none;
          line-height: 1.6;
          padding: 0 24px;
          width: 100%;
          will-change: transform, opacity;
        }

        /* ── Box stack ── */
        .spylt-boxes-stack {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          position: relative;
          gap: clamp(4px, 0.8vw, 12px);
          margin-top: 10px;
        }

        .spylt-heading-row {
          width: 92vw;
          max-width: 1200px;
          display: flex;
          justify-content: center;
        }

        /* ── Pill wrapper ── */
        .spylt-box-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          outline: clamp(2px, 0.3vw, 4px) solid #3b393d;
          outline-offset: -1px;
          overflow: hidden;
          will-change: transform;
          /* perspective makes rotateX on chars feel 3-D */
          perspective: 500px;
        }

        /* ── Split word ── */
        .spylt-split-word {
          display: inline-flex;
          align-items: baseline;
          font-family: 'Antonio', sans-serif;
          font-weight: 700;
          font-size: clamp(22px, 7vw, 100px);
          line-height: 1.05;
          letter-spacing: -0.025em;
          text-transform: uppercase;
          padding: 0.05em 0.28em 0.16em;
          white-space: nowrap;
        }

        /* ── Char clip wrapper: hides char sliding in from below ── */
        .spylt-char-wrap {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          /* extra padding so descenders don't get clipped */
          padding-bottom: 0.1em;
          margin-bottom: -0.1em;
        }

        /* ── Individual char ── */
        .spylt-char {
          display: inline-block;
          will-change: transform, opacity;
        }

        /* ── Colour themes ── */
        .spylt-box-1 { background: #c88e64; }
        .spylt-box-1 .spylt-split-word { color: #faeade; }

        .spylt-box-2 { background: #7f3b2d; }
        .spylt-box-2 .spylt-split-word { color: #faeade; }

        .spylt-box-3 { background: #faeade; }
        .spylt-box-3 .spylt-split-word { color: #2e2d2f; }

        .spylt-box-4 { background: #fed775; }
        .spylt-box-4 .spylt-split-word { color: #2e2d2f; }

        /* ── Bottom label ── */
        .spylt-bottom-label {
          color: #faeade;
          font-family: 'Proxima Nova', Georgia, sans-serif;
          font-size: clamp(12px, 1.1vw, 17px);
          font-weight: 400;
          text-align: center;
          position: absolute;
          bottom: 7%;
          opacity: 0;
          pointer-events: none;
          letter-spacing: 0.04em;
          will-change: transform, opacity;
        }

        /* ── Scroll hint ── */
        .spylt-scroll-hint {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(250,234,222,0.3);
          font-family: 'Antonio', sans-serif;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          pointer-events: none;
          transition: opacity 0.4s ease;
          z-index: 10;
        }
        .spylt-scroll-hint .spylt-line {
          width: 1px;
          height: 26px;
          background: rgba(250,234,222,0.25);
          animation: spyltPulse 1.6s ease-in-out infinite;
        }
        @keyframes spyltPulse {
          0%, 100% { opacity: 0.2; transform: scaleY(0.8); }
          50%       { opacity: 0.9; transform: scaleY(1.2); }
        }

        /* ══ RESPONSIVE ══ */
        @media (min-width: 1400px) {
          .spylt-split-word { font-size: clamp(60px, 5.5vw, 100px); }
        }
        @media (max-width: 1024px) {
          .spylt-split-word { font-size: clamp(24px, 7vw, 75px); }
          .spylt-heading-row { width: 94vw; }
        }
        @media (max-width: 768px) {
          .spylt-split-word {
            font-size: clamp(20px, 8vw, 60px);
            padding: 0.06em 0.22em 0.15em;
            letter-spacing: -0.015em;
          }
          .spylt-heading-row  { width: 96vw; }
          .spylt-intro-label  { font-size: clamp(12px, 1.8vw, 15px); top: 5%; }
          .spylt-bottom-label { font-size: clamp(12px, 1.8vw, 15px); bottom: 5%; }
        }
        @media (max-width: 480px) {
          .spylt-split-word {
            font-size: clamp(18px, 9vw, 44px);
            padding: 0.07em 0.18em 0.13em;
            letter-spacing: -0.01em;
          }
          .spylt-box-wrapper  { outline-width: 2px; }
          .spylt-heading-row  { width: 98vw; }
          .spylt-boxes-stack  { gap: 3px; }
          .spylt-intro-label  { font-size: 12px; top: 4%; line-height: 1.7; padding: 0 16px; }
          .spylt-bottom-label { font-size: 12px; bottom: 4%; }
          .spylt-scroll-hint  { bottom: 14px; }
        }
        @media (max-width: 360px) {
          .spylt-split-word {
            font-size: clamp(15px, 10vw, 36px);
            padding: 0.07em 0.14em 0.12em;
          }
        }
      `}</style>

      <section ref={sectionRef} className="spylt-section">

        {/* Scroll hint */}
        <div className="spylt-scroll-hint" ref={scrollHintRef}>
          <span>scroll</span>
          <div className="spylt-line" />
        </div>

        {/* Intro subtitle */}
        <p className="spylt-intro-label" ref={introLabelRef}>
          Unlock the Advantages:<br />
          Explore the Key Benefits of Choosing SPYLT
        </p>

        {/* Letter-split boxes */}
        <div className="spylt-boxes-stack">
          {BOXES.map((box, i) => (
            <div className="spylt-heading-row" key={box.id}>
              <div
                className={`spylt-box-wrapper spylt-${box.cls}`}
                ref={(el) => {
                  if (!el) return;
                  const chars = Array.from(el.querySelectorAll(".spylt-char"));
                  boxRefs.current[i] = { wrapper: el, chars };
                }}
              >
                <SplitText text={box.text} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom label */}
        <p className="spylt-bottom-label" ref={bottomLabelRef}>
          And much more...
        </p>

      </section>
    </>
  );
}