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
        }

        .features-inner {
          width: 100%;
          max-width: 1100px;
          text-align: center;
        }

        /* ================= TITLE ================= */
        .features-title {
          font-size: 72px;
          font-weight: 900;
          color: #facc15;
          margin-bottom: 56px;
          margin-top:20px;
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
          gap: 32px;
          align-items: center;
        }

        .spylt-strip {
          padding: 28px 62px;
          font-size: 34px;
          font-weight: 500;
          transform-origin: center;
          border-radius: 6px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
          box-shadow: 0 30px 70px rgba(0,0,0,0.6);
          clip-path: inset(0 50% 0 50%);
          opacity: 0;
          will-change: transform, clip-path, opacity;
        }

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


        @media (max-width: 900px) {
          .features-title {
            font-size: 42px;
          }

          .spylt-strip {
            font-size: 34px;
            padding: 18px 36px;
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

