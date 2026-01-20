import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAVBAR_HEIGHT = 72;

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stripsRef = useRef([]);

  useEffect(() => {
  if (!sectionRef.current || !titleRef.current) return;

  const originalText = titleRef.current.innerText;

  const ctx = gsap.context(() => {
    /* ================= TITLE SPLIT ================= */
    const words = originalText.split(" ");

    titleRef.current.innerHTML = words
      .map(
        (word) =>
          `<span class="title-word">${word}&nbsp;</span>`
      )
      .join("");

    const wordEls =
      titleRef.current.querySelectorAll(".title-word");

    /* ================= MASTER TIMELINE ================= */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: `top top+=${NAVBAR_HEIGHT}`,
        end: "+=1400",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    /* ================= TITLE ANIMATION ================= */
    tl.fromTo(
      wordEls,
      {
        y: 80,
        opacity: 0,
        rotation: -8,
        transformOrigin: "left center",
      },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        stagger: 0.15,
        ease: "power4.out",
        duration: 0.8,
      }
    );

    /* ================= STRIP STACK ================= */
    stripsRef.current.forEach((el, i) => {
      if (!el) return;

      const tiltIn = i % 2 === 0 ? -8 : 8;
      const tiltFinal = i % 2 === 0 ? -4 : 4;

      tl.fromTo(
        el,
        {
          clipPath: "inset(0 50% 0 50%)",
          opacity: 0,
          y: 120,
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
  /* ================= CLEANUP ================= */
  return () => {
    if (titleRef.current) {
      titleRef.current.innerText = originalText;
    }
    ctx.revert();
  };
}, []);


useEffect(() => {
  if (!sectionRef.current) return;

  const ctx = gsap.context(() => {
    // timelines
  }, sectionRef);

  ScrollTrigger.refresh(); // ✅ ADD THIS

  return () => {
    ctx.revert();
  };
}, []);





  return (
    <>
      <style>{`
/* ================= SECTION ================= */

.features {
  height: calc(100vh - ${NAVBAR_HEIGHT}px);
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 16px;
}

.features-inner {
  width: 100%;
  max-width: 1100px;
  text-align: center;
}

/* ================= TITLE ================= */

.features-title {
  font-size: clamp(2.6rem, 5.8vw, 4.5rem);
  font-weight: 900;
  color: #facc15;
  margin-bottom: clamp(32px, 6vw, 56px);
  margin-top: 20px;
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
  gap: clamp(18px, 3.5vw, 32px);
  align-items: center;
}

.spylt-strip {
  padding: clamp(16px, 3vw, 28px)
           clamp(28px, 6vw, 62px);
  font-size: clamp(1.4rem, 3.2vw, 2.125rem);
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

/* ================= LARGE DESKTOP ================= */
/* 1440px – 1920px */

@media (min-width: 1440px) {
  .features-inner {
    max-width: 1300px;
  }

  .features-title {
    line-height: 1.02;
  }
}

/* ================= ULTRA WIDE / 4K ================= */

@media (min-width: 1920px) {
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

@media (max-width: 1024px) {
  .features-title {
    font-size: clamp(2.2rem, 6vw, 3.5rem);
    line-height: 1.1;
  }
}

/* ================= MOBILE ================= */

@media (max-width: 640px) {
  .features {
    height: auto;
    padding: 72px 12px;
  }

  .features-title {
    margin-bottom: 36px;
  }

  .spylt-strip {
    white-space: normal;
    text-align: center;
  }
}

/* ================= SMALL MOBILE ================= */

@media (max-width: 420px) {
  .features-title {
    font-size: 2rem;
  }

  .spylt-strip {
    font-size: 1.2rem;
    padding: 14px 22px;
    letter-spacing: 0.04em;
  }
}
`}</style>


      <section ref={sectionRef} className="features">
        <div className="features-inner">
          <h2 ref={titleRef} className="features-title">
            BUILT FOR MODERN ENERGY
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

