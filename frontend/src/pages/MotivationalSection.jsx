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
        .motivation {
          background: #000;
          padding: 120px 16px;
          text-align: center;
          overflow: hidden;
        }

        .motivation h2 {
          font-size: clamp(3rem, 6vw, 7rem);
          font-weight: 900;
          line-height: 1.1;
          color: #facc15;
        }

        .scrub-line {
          display: block;
        }

        .fuel {
          display: inline-block;
          background: #ffed23;
          color: #333;
          padding: 16px 40px;
          border-radius: 16px;
          font-size: clamp(2.5rem, 5vw, 5rem);
          margin: 40px 0;
          transform: scaleX(0);
          transform-origin: left center;
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
