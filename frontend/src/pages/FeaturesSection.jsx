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
          // Responsive scroll distance: shorter on mobile so it doesn't feel endless
          end: () => `+=${window.innerWidth <= 480 ? 1800 : window.innerWidth <= 768 ? 2400 : 3200}`,
          scrub: 1.4,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, // recalculates end on window resize
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
          background: #1b1b1b; /* Black background */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
        }

        /* ── Intro label ── */
        .spylt-intro-label {
          color: #FFD700; /* Yellow */
          font-family: 'Proxima Nova', Georgia, sans-serif;
          font-size: clamp(5px, 0.8vw, 17px);
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
          outline: clamp(2px, 0.3vw, 4px) solid #FFD700; /* Yellow outline */
          outline-offset: -1px;
          overflow: hidden;
          will-change: transform;
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

        /* ── Char clip wrapper ── */
        .spylt-char-wrap {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          padding-bottom: 0.1em;
          margin-bottom: -0.1em;
        }

        /* ── Individual char ── */
        .spylt-char {
          display: inline-block;
          will-change: transform, opacity;
        }

        /* ── Colour themes ── */
.spylt-box-1 { background: #000000; }
.spylt-box-1 .spylt-split-word { color: #ffd500; }

.spylt-box-2 { background: #000000; }
.spylt-box-2 .spylt-split-word { color: #ffd500; }

.spylt-box-3 { background: #ffd500; }
.spylt-box-3 .spylt-split-word { color: #000000; }

.spylt-box-4 { background: #ffd500; }
.spylt-box-4 .spylt-split-word { color: #000000; }

        /* ── Bottom label ── */
        .spylt-bottom-label {
          color: #FFD700; /* Yellow */
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
          color: rgba(255, 215, 0, 0.3); /* Yellow with opacity */
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
          background: rgba(255, 215, 0, 0.25); /* Yellow with opacity */
          animation: spyltPulse 1.6s ease-in-out infinite;
        }
        @keyframes spyltPulse {
          0%, 100% { opacity: 0.2; transform: scaleY(0.8); }
          50%       { opacity: 0.9; transform: scaleY(1.2); }
        }

        /* ══ RESPONSIVE ══ */
        @media (min-width: 1400px) {
          .spylt-split-word { font-size: clamp(75px, 5.5vw, 100px); }
        }
        @media (max-width: 1024px) {
          .spylt-split-word { font-size: clamp(24px, 7vw, 75px); }
          .spylt-heading-row { width: 94vw; }
        }
        @media (max-width: 768px) {
          .spylt-split-word {
            font-size: clamp(55px, 8vw, 60px);
            padding: 0.06em 0.22em 0.15em;
            letter-spacing: -0.015em;
          }
          .spylt-heading-row  { width: 96vw; }
          .spylt-intro-label  { font-size: clamp(12px, 1.8vw, 15px); top: 5%; }
          .spylt-bottom-label { font-size: clamp(12px, 1.8vw, 15px); bottom: 5%; }
        }

        /* ── Mobile: tighten spacing so section feels compact ── */
        @media (max-width: 480px) {
          .spylt-split-word {
            font-size: clamp(45px, 9vw, 44px);
            padding: 0.07em 0.18em 0.13em;
            letter-spacing: -0.01em;
          }
          .spylt-box-wrapper  { outline-width: 2px; }
          .spylt-heading-row  { width: 98vw; }
          .spylt-boxes-stack  { gap: 2px; margin-top: 0; }
          .spylt-intro-label  { font-size: 11px; top: 3%; line-height: 1.5; padding: 0 16px; }
          .spylt-bottom-label { font-size: 11px; bottom: 3%; }
          .spylt-scroll-hint  { bottom: 10px; }
        }

        @media (max-width: 360px) {
          .spylt-split-word {
            font-size: clamp(30px, 10vw, 36px);
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
        {/* <p className="spylt-intro-label" ref={introLabelRef}>
          Unlock the Advantages:<br />
          Explore the Key Benefits of Choosing Mpact
        </p> */}

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
        {/* <p className="spylt-bottom-label" ref={bottomLabelRef}>
          And much more...
        </p> */}

      </section>
    </>
  );
}