// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import SplitType from "split-type";

// gsap.registerPlugin(ScrollTrigger);

// export default function MotivationalSection() {
//   const sectionRef = useRef(null);
//   const fuelRef = useRef(null);
//   const splitsRef = useRef([]);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       /* ================= SPLIT TEXT ================= */
//       const lines = gsap.utils.toArray(".scrub-line", sectionRef.current);
//       const words = [];

//       lines.forEach((line) => {
//         const split = new SplitType(line, { types: "words" });
//         splitsRef.current.push(split);
//         words.push(...split.words);
//       });

//       /* ================= WORD SCRUB ================= */
//       gsap.set(words, {
//         opacity: 0.25,
//         color: "#6b7280",
//       });

//       gsap.to(words, {
//         opacity: 1.50,
//         color: "#facc15",
//         stagger: 0.6,
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 70%",
//           end: "bottom 50%",
//           scrub: true,
//         },
//       });


//       /* ================= FUEL UP (LEFT ➜ RIGHT / RIGHT ➜ LEFT) ================= */
//       gsap.fromTo(
//         fuelRef.current,
//         {
//           scaleX: 0,
//           transformOrigin: "left center",
//         },
//         {
//           scaleX: 1,
//           ease: "none",
//           scrollTrigger: {
//             trigger: fuelRef.current,
//             start: "top 70%",
//             end: "top 40%",
//             scrub: true,
//             onUpdate(self) {
//               gsap.set(fuelRef.current, {
//                 transformOrigin:
//                   self.direction === 1
//                     ? "left center"   // scrolling down
//                     : "right center", // scrolling up
//               });
//             },
//           },
//         }
//       );
//     }, sectionRef);

//     return () => {
//       splitsRef.current.forEach((s) => s.revert());
//       ctx.revert();
//     };
//   }, []);

//   return (
//     <>
//       <style>{`
// /* ================= BASE ================= */

// .motivation {
//   background: #000;
//   padding: clamp(90px, 10vw, 160px) 16px;
//   text-align: center;
//   overflow: hidden;
// }

// .motivation h2 {
//   font-size: clamp(2.6rem, 6vw, 7rem);
//   font-weight: 900;
//   line-height: 1.08;
//   color: #facc15;
//   max-width: 1400px;
//   margin: 0 auto;
// }

// .scrub-line {
//   display: block;
//   white-space: normal;
//   word-break: keep-all;
// }

// /* ================= FUEL ================= */

// .fuel {
//   display: inline-block;
//   background: #ffed23;
//   color: #333;
//   padding: clamp(12px, 2.8vw, 20px)
//            clamp(30px, 6vw, 50px);
//   border-radius: 16px;
//   font-size: clamp(2.2rem, 5vw, 5.2rem);
//   margin: clamp(28px, 6vw, 52px) 0;
//   transform: scaleX(0);
//   transform-origin: left center;
//   white-space: nowrap;
// }

// /* ================= LARGE SCREENS ================= */
// /* 1440px – 1920px */

// @media (min-width: 1440px) {
//   .motivation h2 {
//     max-width: 1600px;
//     line-height: 1.05;
//   }

//   .fuel {
//     border-radius: 18px;
//   }
// }

// /* ================= EXTRA LARGE / 4K ================= */

// @media (min-width: 1920px) {
//   .motivation {
//     padding: 180px 16px;
//   }

//   .motivation h2 {
//     font-size: 7.4rem;
//     max-width: 1800px;
//   }

//   .fuel {
//     font-size: 5.6rem;
//     padding: 22px 58px;
//     border-radius: 20px;
//   }
// }

// /* ================= TABLET ================= */

// @media (max-width: 1024px) {
//   .motivation h2 {
//     font-size: clamp(2.4rem, 6.5vw, 5.6rem);
//     line-height: 1.12;
//   }
// }

// /* ================= MOBILE ================= */

// @media (max-width: 640px) {
//   .motivation {
//     padding: 72px 12px;
//   }

//   .motivation h2 {
//     line-height: 1.15;
//   }

//   .fuel {
//     border-radius: 12px;
//   }
// }

// /* ================= SMALL MOBILE ================= */

// @media (max-width: 420px) {
//   .motivation h2 {
//     font-size: 2.2rem;
//   }

//   .fuel {
//     font-size: 1.9rem;
//     padding: 10px 22px;
//   }
// }
// `}</style>


//       <section ref={sectionRef} className="motivation">
//         <h2>
//           <div className="scrub-line">STIR UP YOUR</div>
//           <div className="scrub-line">FEARLESS PAST AND</div>

//           <div>
//             <span ref={fuelRef} className="fuel">
//               FUEL UP
//             </span>
//           </div>

//           <div className="scrub-line">YOUR FUTURE WITH EVERY</div>
//           <div className="scrub-line">GULP OF PERFECTION PROTEIN</div>
//         </h2>
//       </section>
//     </>
//   );
// }



// MotivationalSection.jsx - Single File Component
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const MotivationalSection = () => {
  const sectionRef = useRef(null);
  const textSplitRefs = useRef([]);
  const lettersSlideUpRef = useRef(null);
  const boxAnimationRef = useRef(null);
  const splitsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ================= SPLIT TEXT ================= */
      const lines = gsap.utils.toArray(".scrub-line", sectionRef.current);
      const words = [];

      lines.forEach((line) => {
        const split = new SplitType(line, { types: "words" });
        splitsRef.current.push(split);
        words.push(...split.words);
      });

      /* ================= WORD SCRUB ================= */
      gsap.set(words, { opacity: 0.25 });

      gsap.to(words, {
        opacity: 1,
        stagger: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
        },
      });

      /* ================= PARAGRAPH WORD SCRUB ================= */
      if (lettersSlideUpRef.current) {
        const paraSplit = new SplitType(lettersSlideUpRef.current, { types: "words" });
        splitsRef.current.push(paraSplit);

        gsap.set(paraSplit.words, { opacity: 0.25 });
        gsap.to(paraSplit.words, {
          opacity: 1,
          stagger: 0.6,
          scrollTrigger: {
            trigger: lettersSlideUpRef.current,
            start: "top 85%",
            end: "bottom 70%",
            scrub: true,
          },
        });
      }

      /* ================= FUEL UP BOX (original animation) ================= */
      gsap.set(boxAnimationRef.current, { transformOrigin: "left center", scaleX: 0, opacity: 0 });

      const fuelTl = gsap.timeline({ paused: true });
      fuelTl.to(boxAnimationRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      });

      ScrollTrigger.create({
        trigger: boxAnimationRef.current,
        start: "top bottom",
        onLeaveBack: () => { fuelTl.progress(0); fuelTl.pause(); }
      });
      ScrollTrigger.create({
        trigger: boxAnimationRef.current,
        start: "top 60%",
        onEnter: () => fuelTl.play()
      });

    }, sectionRef);

    return () => {
      splitsRef.current.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --black: #222123;
          --dark-brown: #020202;
          --milk: #fdd830;
          --middle-brown: #000000;
          --light-brown: #ffd500;
          --red: #0e0e0e;
          --white: white;
        }

        /* ── WRAPPER ── */
        .hero-anim-wrapper {
          z-index: 2;
          position: relative;
          overflow: visible;
          width: 100%;
        }

        /* ── SECTION ── */
        .section-2-wrapper {
          background-color: #000000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        /* ── INNER TEXT WRAPPER ── */
        .section-2_text-wrapper_1 {
          z-index: 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 10vw 0 10vw;
          position: relative;
        }

        /* ── GRID ── */
        .w-layout-grid {
          display: grid;
          grid-auto-columns: 1fr;
        }

        .grid-2 {
          grid-column-gap: 0px;
          grid-row-gap: 10px;
          grid-template-rows: auto auto auto auto auto;
          grid-template-columns: 1fr;
          width: 100%;
          padding-left: 10vw;
          padding-right: 10vw;
        }

        /* ── HEADINGS ── */
        .s2 {
          color: var(--milk);
          font-family: 'Antonio', 'Arial Black', 'Helvetica Bold', sans-serif;
          font-size: clamp(2.2rem, 7.9vw, 9rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin-top: -0.18em;
          padding: 0;
        }

        /* ── FUEL UP ROW ── */
        .div-block-16 {
          width: 100%;
          margin-top: -1.5vw;
          margin-bottom: 0;
          display: block;
        }

        .div-block-46 {
          display: flex;
          justify-content: center;
          align-self: center;
          align-items: center;
          min-height: 1px;
        }

        .div-block-45 {
          display: flex;
          flex-flow: row;
          justify-content: center;
          align-items: center;
          margin-left: 1vw;
        }

        /* ── FUEL UP BOX ── */
        .fuel-up_wrapper {
          z-index: 10;
          background-color: #000000;
          outline: clamp(2px, 0.5vw, 8px) solid #ffd500;
          outline-offset: 0px;
          display: inline-flex;
          flex: none;
          justify-content: center;
          align-items: center;
          padding: clamp(0.6rem, 1.2vw, 1rem) clamp(1.5rem, 4vw, 3rem);
          position: relative;
          transform: rotate(3deg);
        }

        .heading-1.faeade {
          color: #f7ed3a;
          font-family: 'Antonio', 'Arial Black', 'Helvetica Bold', sans-serif;
          font-weight: 700;
          font-size: clamp(2rem, 7.9vw, 9rem);
          line-height: 1.1;
          letter-spacing: -0.035em;
          white-space: nowrap;
          display: flex;
          flex: none;
          align-items: center;
          padding: 0 1.2vw 0.12em;
        }

        .heading-1.faeade._2 {
          color: #ffd500;
          letter-spacing: -0.04em;
          padding: 0 0.85vw 0.12em 0.8vw;
        }

        /* ── LINE 3 ── */
        .div-block-60 {
          display: flex;
        }

        /* ── PARAGRAPH ── */
        .div-block-95 {
          margin-top: 3vw;
          display: flex;
          justify-content: center;
          align-self: center;
          align-items: center;
        }

        .paragraph {
          font-family: 'Proxima Nova', 'Helvetica', 'Arial', sans-serif;
          font-size: clamp(13px, 1.04vw, 18px);
          font-weight: 400;
          line-height: 1.6;
          width: min(92vw, 580px);
          margin: 0 auto;
          text-align: center;
          color: var(--milk);
          letter-spacing: 0.01em;
        }

        /* ── WORD SPAN ── */
        .word {
          display: inline-block;
          white-space: pre-wrap;
        }

        /* ── NODE PLACEMENT ── */
        [id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb8d-8dfd2cdc"],
        [id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb90-8dfd2cdc"],
        [id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb93-8dfd2cdc"],
        [id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb94-8dfd2cdc"],
        [id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb95-8dfd2cdc"],
        [id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb99-8dfd2cdc"],
        [id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb9c-8dfd2cdc"] {
          place-self: center;
        }
        [id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb95-8dfd2cdc"] {
          place-self: center start;
        }

        /* ════════════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ════════════════════════════════════════ */

        /* ── 4K / Ultra-wide (1920px+) ── */
        @media screen and (min-width: 1920px) {
          .section-2_text-wrapper_1 { padding: 8vw 0; }
          .grid-2 { padding-left: 8vw; padding-right: 8vw; }
          .s2 { font-size: 8.2vw; letter-spacing: -0.05em; }
          .heading-1.faeade { font-size: 8.2vw; }
          .paragraph { font-size: 1.1vw; width: 24vw; }
        }

        /* ── Large desktop (1440px–1919px) ── */
        @media screen and (min-width: 1440px) and (max-width: 1919px) {
          .grid-2 { padding-left: 9vw; padding-right: 9vw; }
          .s2 { font-size: 7.9vw; }
        }

        /* ── Laptop / small desktop (1200px–1439px) ── */
        @media screen and (max-width: 1439px) and (min-width: 1200px) {
          .grid-2 { padding-left: 8vw; padding-right: 8vw; }
          .s2 { font-size: 8vw; }
        }

        /* ── Tablet landscape / small laptop (992px–1199px) ── */
        @media screen and (max-width: 1199px) and (min-width: 992px) {
          .grid-2 { padding-left: 5vw; padding-right: 5vw; }
          .s2 { font-size: 9vw; letter-spacing: -0.03em; }
          .heading-1.faeade { font-size: 9vw; }
          .div-block-16 { margin-top: -1vw; margin-bottom: -1.5vw; }
        }

        /* ── Tablet portrait (768px–991px) ── */
        @media screen and (max-width: 991px) {
          .section-2_text-wrapper_1 { padding: 14vw 0; }
          .grid-2 { padding-left: 4vw; padding-right: 4vw; }

          .s2 {
            text-align: center;
            font-size: clamp(2rem, 11vw, 6rem);
            line-height: 1.08;
            letter-spacing: -0.025em;
            margin-top: 0;
          }

          .div-block-16 { margin-top: -1vw; margin-bottom: 1vw; }

          .div-block-45 { margin-left: 0; justify-content: center; }

          .heading-1.faeade {
            font-size: clamp(1.8rem, 11vw, 6rem);
            line-height: 1.15;
            padding: 0 2vw 0.12em;
          }
          .heading-1.faeade._2 {
            font-size: clamp(1.8rem, 10.5vw, 5.8rem);
            padding: 0 1.5vw 0.12em;
          }

          .div-block-60 {
            justify-content: center;
            align-items: center;
            padding-left: 0;
            padding-right: 0;
          }

          .div-block-95 { margin-top: 5vw; }
          .paragraph { width: min(90vw, 540px); font-size: clamp(13px, 2vw, 18px); }
        }

        /* ── Large phone / small tablet (600px–767px) ── */
        @media screen and (max-width: 767px) {
          .section-2_text-wrapper_1 { padding: 12vw 0 10vw; }
          .grid-2 {
            padding-left: 4vw;
            padding-right: 4vw;
            row-gap: 6px;
          }

          .s2 {
            font-size: clamp(1.8rem, 10.5vw, 4rem);
            letter-spacing: -0.02em;
            line-height: 0.98;
          }

          .div-block-16 { margin-top: 0.5vw; margin-bottom: 0.5vw; }

          .heading-1.faeade {
            font-size: clamp(1.6rem, 10vw, 4rem);
            padding: 0 2.5vw 0.12em;
          }
          .heading-1.faeade._2 {
            font-size: clamp(1.6rem, 9.5vw, 3.8rem);
            padding: 0 2vw 0.12em;
          }

          .fuel-up_wrapper {
            outline-width: clamp(2px, 0.8vw, 5px);
          }

          .paragraph { width: min(90vw, 520px); font-size: 14px; line-height: 1.5; }
          .div-block-95 { margin-top: 4vw; }
        }

        /* ── Phone (480px–599px) ── */
        @media screen and (max-width: 599px) {
          .section-2_text-wrapper_1 { padding: 10vw 0 10vw; }
          .grid-2 {
            padding-left: 5%;
            padding-right: 5%;
            row-gap: 4px;
          }

          .s2 {
            font-size: clamp(1.6rem, 9.5vw, 3rem);
            letter-spacing: -0.015em;
            margin-top: 0.1em;
            line-height: 0.96;
          }

          .div-block-16 { margin-top: 0.25vw; margin-bottom: 0.25vw; }

          .heading-1.faeade {
            font-size: clamp(1.5rem, 9vw, 3rem);
            padding: 0 3vw 0.15em;
          }
          .heading-1.faeade._2 {
            font-size: clamp(1.5rem, 8.5vw, 3rem);
            padding: 0 2.5vw 0.15em;
          }

          .paragraph { width: min(92vw, 500px); font-size: 13.5px; line-height: 1.5; }
          .div-block-95 { margin-top: 4vw; }
        }

        /* ── Small phone – iPhone SE, Galaxy S8 (375px–479px) ── */
        @media screen and (max-width: 479px) {
          .section-2_text-wrapper_1 { padding: 10vw 0 10vw; }
          .grid-2 {
            padding-left: 4%;
            padding-right: 4%;
            row-gap: 3px;
          }

          .s2 {
            font-size: clamp(3.2rem, 9vw, 2.6rem);
            letter-spacing: -0.01em;
            line-height: 0.98;
          }

          .div-block-16 { margin-top: 0.2vw; margin-bottom: 0.2vw; }
          .div-block-45 { margin-left: 0; }

          .heading-1.faeade {
            font-size: clamp(1.4rem, 8.5vw, 2.6rem);
            padding: 0 3.5vw 0.18em;
          }
          .heading-1.faeade._2 {
            font-size: clamp(5.5rem, 8vw, 2.5rem);
            padding: 0 3vw 0.18em;
          }

          .fuel-up_wrapper { outline-width: 2px; }

          .paragraph { width: min(94vw, 480px); font-size: 13px; line-height: 1.5; }
          .div-block-95 { margin-top: 4vw; }
        }

        /* ── Extra small phone (max 374px) ── */
        @media screen and (max-width: 374px) {
          .s2 { font-size: 10.5vw; }
          .heading-1.faeade { font-size: 10vw; }
          .heading-1.faeade._2 { font-size: 10.5vw; }
          .paragraph { width: 92%; font-size: 12px; }
        }
      `}</style>

      <div className="hero-anim-wrapper" ref={sectionRef}>
        <div>
          <div className="section-2-wrapper">
            <div className="section-2_text-wrapper_1">
              <div className="w-layout-grid grid-2">

                <div id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb8d-8dfd2cdc">
                  <h1 className="s2 scrub-line" ref={el => textSplitRefs.current[0] = el}>
                    REAL INGREDIENTS
                  </h1>
                </div>

                <div id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb90-8dfd2cdc">
                  <h1 className="s2 scrub-line" ref={el => textSplitRefs.current[1] = el}>
                    CLEAN NUTRITION AND
                  </h1>
                </div>

                <div id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb93-8dfd2cdc" className="div-block-16">
                  <div id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb94-8dfd2cdc" className="div-block-46">
                    <div id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb95-8dfd2cdc" className="div-block-45">
                      <div className="fuel-up_wrapper" ref={boxAnimationRef}>
                        <h1 className="heading-1 faeade _2">MPACT</h1>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb99-8dfd2cdc" className="div-block-60">
                  <h1 className="s2 scrub-line" ref={el => textSplitRefs.current[2] = el}>
                    FUEL YOUR BODY WITH EVERY
                  </h1>
                </div>

                <div id="w-node-cbba1394-4c2d-b94f-4804-97ed68fafb9c-8dfd2cdc">
                  <h1 className="s2 scrub-line" ref={el => textSplitRefs.current[3] = el}>
                    SPOONFUL OF GOODNESS
                  </h1>
                </div>

              </div>
              <div className="div-block-95">
                <p
                  className="paragraph"
                  ref={lettersSlideUpRef}
                >
                  At MPACT, we keep it real. No added sugar, no preservatives, no artificial ingredients. Just premium peanuts, real ingredients and the perfect balance of protein and good fats to fuel your every rep, run and routine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MotivationalSection;
