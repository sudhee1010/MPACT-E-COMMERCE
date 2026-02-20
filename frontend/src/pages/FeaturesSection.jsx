import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAVBAR_HEIGHT = 72;

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stripsRef = useRef([]);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);
  const originalText = "BUILT FOR MODERN ENERGY";

  // Handle viewport height changes
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      /* ================= TITLE SPLIT ================= */
      const words = originalText.split(" ");

      titleRef.current.innerHTML = words
        .map(
          (word) =>
            `<span class="title-word">${word}&nbsp;</span>`
        )
        .join("");

      const wordEls = titleRef.current.querySelectorAll(".title-word");

      /* ================= DYNAMIC VALUES BASED ON VIEWPORT HEIGHT ================= */
      const isSmallHeight = viewportHeight < 700;
      const isVerySmallHeight = viewportHeight < 600;
      
      // Adjust animation values for small heights
      const titleYOffset = isVerySmallHeight ? 40 : (isSmallHeight ? 60 : 80);
      const stripYOffset = isVerySmallHeight ? 60 : (isSmallHeight ? 80 : 120);
      const titleStagger = isSmallHeight ? 0.1 : 0.15;
      const stripTilt = isSmallHeight ? 4 : 8;
      
      // Adjust scroll duration for small heights
      const scrollEnd = isVerySmallHeight ? "+=800" : (isSmallHeight ? "+=1100" : "+=1400");

      /* ================= MASTER TIMELINE ================= */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top top+=${NAVBAR_HEIGHT}`,
          end: scrollEnd,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true, // Recalculate on resize
        },
      });

      /* ================= TITLE ANIMATION ================= */
      tl.fromTo(
        wordEls,
        {
          y: titleYOffset,
          opacity: 0,
          rotation: isSmallHeight ? -4 : -8,
          transformOrigin: "left center",
        },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          stagger: titleStagger,
          ease: "power4.out",
          duration: 0.8,
        }
      );

      /* ================= STRIP STACK ================= */
      stripsRef.current.forEach((el, i) => {
        if (!el) return;

        const tiltIn = i % 2 === 0 ? -stripTilt : stripTilt;
        const tiltFinal = i % 2 === 0 ? -stripTilt/2 : stripTilt/2;

        tl.fromTo(
          el,
          {
            clipPath: "inset(0 50% 0 50%)",
            opacity: 0,
            y: stripYOffset,
            rotation: tiltIn,
          },
          {
            clipPath: "inset(0 0% 0 0%)",
            opacity: 1,
            y: 0,
            rotation: tiltFinal,
            ease: "power4.out",
            duration: 0.9,
          }
        );
      });
    }, sectionRef);

    return () => {
      if (titleRef.current) {
        titleRef.current.innerText = originalText;
      }
      ctx.revert();
    };
  }, [viewportHeight]); // Re-run when viewport height changes

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Empty timeline for refresh purposes
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <style>{`
/* ================= SECTION ================= */

.features {
  min-height: calc(100vh - ${NAVBAR_HEIGHT}px);
  height: auto;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: clamp(16px, 5vh, 32px) 16px;
}

.features-inner {
  width: 100%;
  max-width: 1100px;
  text-align: center;
  margin: auto;
}

/* ================= TITLE ================= */

.features-title {
  font-size: clamp(2rem, 5.8vw, 4.5rem);
  font-weight: 900;
  color: #facc15;
  margin-bottom: clamp(16px, 4vh, 56px);
  margin-top: clamp(10px, 2vh, 20px);
  line-height: 1.05;
  overflow: hidden;
}

.title-word {
  display: inline-block;
  transform: translateY(80px);
  opacity: 0;
}

/* ================= STRIPS ================= */

.spylt-stack {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 2.5vh, 32px);
  align-items: center;
  width: 100%;
}

.spylt-strip {
  padding: clamp(12px, 2.5vh, 28px)
           clamp(20px, 4vw, 62px);
  font-size: clamp(1.1rem, 2.8vw, 2.125rem);
  font-weight: 700;
  transform-origin: center;
  border-radius: 0px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 30px 70px rgba(0,0,0,0.6);
  clip-path: inset(0 50% 0 50%);
  opacity: 0;
  will-change: transform, clip-path, opacity;
  width: fit-content;
  max-width: 90vw;
}

/* ================= COLORS ================= */

.spylt-strip:nth-child(1) {
  background: #FACC15;
  color: #000;
}

.spylt-strip:nth-child(2) {
  background: #F97316;
  color: #fff;
}

.spylt-strip:nth-child(3) {
  background: #DC2626;
  color: #fff;
}

.spylt-strip:nth-child(4) {
  background: #FACC15;
  color: #000;
}

/* ================= SMALL HEIGHT DEVICES ================= */

@media (max-height: 700px) {
  .features {
    padding: 12px 16px;
    min-height: calc(100vh - ${NAVBAR_HEIGHT}px);
  }
  
  .features-title {
    font-size: clamp(1.8rem, 5vw, 3.5rem);
    margin-bottom: 16px;
    margin-top: 8px;
  }
  
  .spylt-stack {
    gap: 12px;
  }
  
  .spylt-strip {
    padding: 10px 28px;
    font-size: clamp(1rem, 2.4vw, 1.8rem);
  }
}

@media (max-height: 600px) {
  .features {
    padding: 8px 16px;
  }
  
  .features-title {
    font-size: clamp(1.5rem, 4.5vw, 2.8rem);
    margin-bottom: 12px;
  }
  
  .spylt-stack {
    gap: 8px;
  }
  
  .spylt-strip {
    padding: 8px 24px;
    font-size: clamp(0.9rem, 2.2vw, 1.5rem);
    box-shadow: 0 15px 30px rgba(0,0,0,0.5);
  }
}

@media (max-height: 500px) {
  .features {
    padding: 6px 16px;
  }
  
  .features-title {
    font-size: 1.4rem;
    margin-bottom: 8px;
  }
  
  .spylt-stack {
    gap: 6px;
  }
  
  .spylt-strip {
    padding: 6px 20px;
    font-size: 1rem;
    box-shadow: 0 10px 20px rgba(0,0,0,0.4);
  }
}

/* ================= LARGE DESKTOP ================= */

@media (min-width: 1440px) and (min-height: 800px) {
  .features-inner {
    max-width: 1300px;
  }

  .features-title {
    line-height: 1.02;
  }
}

/* ================= ULTRA WIDE / 4K ================= */

@media (min-width: 1920px) and (min-height: 1080px) {
  .features {
    padding: 0 32px;
  }

  .features-inner {
    max-width: 1500px;
  }

  .features-title {
    font-size: 5rem;
  }

  .spylt-strip {
    font-size: 2.4rem;
    padding: 32px 72px;
  }
}

/* ================= TABLET ================= */

@media (max-width: 1024px) and (min-height: 600px) {
  .features-title {
    font-size: clamp(2.2rem, 6vw, 3.5rem);
    line-height: 1.1;
  }
}

/* ================= MOBILE ================= */

@media (max-width: 640px), (max-height: 600px) {
  .features {
    height: auto;
    min-height: calc(100vh - ${NAVBAR_HEIGHT}px);
    padding: 40px 12px;
  }

  .features-title {
    margin-bottom: clamp(20px, 4vh, 36px);
  }

  .spylt-strip {
    white-space: normal;
    text-align: center;
    width: 60%;
    max-width: 400px;
  }
}

/* ================= SMALL MOBILE ================= */

@media (max-width: 420px) {
  .features-title {
    font-size: 1.8rem;
  }

  .spylt-strip {
    font-size: 1rem;
    padding: 12px 20px;
    letter-spacing: 0.04em;
  }
}

/* ================= LANDSCAPE MODE ================= */

@media (orientation: landscape) and (max-height: 500px) {
  .features {
    min-height: 100vh;
    padding: 20px 32px;
  }
  
  .features-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 40px;
    max-width: 1200px;
  }
  
  .features-title {
    flex: 1;
    font-size: 2rem;
    margin-bottom: 0;
    text-align: left;
  }
  
  .spylt-stack {
    flex: 1;
    gap: 8px;
  }
  
  .spylt-strip {
    font-size: 0.9rem;
    padding: 6px 16px;
    white-space: nowrap;
  }
}
`}</style>

      <section ref={sectionRef} className="features">
        <div className="features-inner">
          <h2 ref={titleRef} className="features-title">
            {originalText}
          </h2>

          <div className="spylt-stack">
            {[
              "Shelf Stable",
              "Protein + Caffeine",
              "Infinitely Recyclable",
              "Lactose Free",
            ].map((text, i) => (
              <div
                key={i}
                className="spylt-strip"
                ref={(el) => (stripsRef.current[i] = el)}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}