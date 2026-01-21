import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function MotivationalSection() {
  const sectionRef = useRef(null);
  const fuelRef = useRef(null);
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
      gsap.set(words, {
        opacity: 0.25,
        color: "#6b7280",
      });

      gsap.to(words, {
        opacity: 1.50,
        color: "#facc15",
        stagger: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: true,
        },
      });


      /* ================= FUEL UP (LEFT ➜ RIGHT / RIGHT ➜ LEFT) ================= */
      gsap.fromTo(
        fuelRef.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: fuelRef.current,
            start: "top 70%",
            end: "top 40%",
            scrub: true,
            onUpdate(self) {
              gsap.set(fuelRef.current, {
                transformOrigin:
                  self.direction === 1
                    ? "left center"   // scrolling down
                    : "right center", // scrolling up
              });
            },
          },
        }
      );
    }, sectionRef);

    return () => {
      splitsRef.current.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return (
    <>
      <style>{`
/* ================= BASE ================= */

.motivation {
  background: #000;
  padding: clamp(90px, 10vw, 160px) 16px;
  text-align: center;
  overflow: hidden;
}

.motivation h2 {
  font-size: clamp(2.6rem, 6vw, 7rem);
  font-weight: 900;
  line-height: 1.08;
  color: #facc15;
  max-width: 1400px;
  margin: 0 auto;
}

.scrub-line {
  display: block;
  white-space: normal;
  word-break: keep-all;
}

/* ================= FUEL ================= */

.fuel {
  display: inline-block;
  background: #ffed23;
  color: #333;
  padding: clamp(12px, 2.8vw, 20px)
           clamp(30px, 6vw, 50px);
  border-radius: 16px;
  font-size: clamp(2.2rem, 5vw, 5.2rem);
  margin: clamp(28px, 6vw, 52px) 0;
  transform: scaleX(0);
  transform-origin: left center;
  white-space: nowrap;
}

/* ================= LARGE SCREENS ================= */
/* 1440px – 1920px */

@media (min-width: 1440px) {
  .motivation h2 {
    max-width: 1600px;
    line-height: 1.05;
  }

  .fuel {
    border-radius: 18px;
  }
}

/* ================= EXTRA LARGE / 4K ================= */

@media (min-width: 1920px) {
  .motivation {
    padding: 180px 16px;
  }

  .motivation h2 {
    font-size: 7.4rem;
    max-width: 1800px;
  }

  .fuel {
    font-size: 5.6rem;
    padding: 22px 58px;
    border-radius: 20px;
  }
}

/* ================= TABLET ================= */

@media (max-width: 1024px) {
  .motivation h2 {
    font-size: clamp(2.4rem, 6.5vw, 5.6rem);
    line-height: 1.12;
  }
}

/* ================= MOBILE ================= */

@media (max-width: 640px) {
  .motivation {
    padding: 72px 12px;
  }

  .motivation h2 {
    line-height: 1.15;
  }

  .fuel {
    border-radius: 12px;
  }
}

/* ================= SMALL MOBILE ================= */

@media (max-width: 420px) {
  .motivation h2 {
    font-size: 2.2rem;
  }

  .fuel {
    font-size: 1.9rem;
    padding: 10px 22px;
  }
}
`}</style>


      <section ref={sectionRef} className="motivation">
        <h2>
          <div className="scrub-line">STIR UP YOUR</div>
          <div className="scrub-line">FEARLESS PAST AND</div>

          <div>
            <span ref={fuelRef} className="fuel">
              FUEL UP
            </span>
          </div>

          <div className="scrub-line">YOUR FUTURE WITH EVERY</div>
          <div className="scrub-line">GULP OF PERFECTION PROTEIN</div>
        </h2>
      </section>
    </>
  );
}
