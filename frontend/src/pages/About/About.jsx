// import React from "react";
// import styles from "./About.module.css";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// function About() {
//   return (
//     <div className={styles.aboutPage}>
//       {/* Navbar */}
//       <Navbar />

//       {/* Hero Section */}
//       <section className={styles.heroSection}>
//         <div className={styles.heroContent}>
//           <h1 className={styles.heroTitle}>TASTY TALKS</h1>
//         </div>

//         {/* Top Features Banner */}
//         <div className={styles.featuresBanner}>
//           <div className={styles.featuresTrack}>
//             <span>10G PROTEIN</span>
//             <span className={styles.divider}>|</span>
//             <span>NO PALM OIL</span>
//             <span className={styles.divider}>|</span>
//             <span>10G PROTEIN</span>
//             <span className={styles.divider}>|</span>
//             <span>NO ADDED SUGAR</span>
//             <span className={styles.divider}>|</span>
//              <span>NO PALM OIL</span>
//             <span className={styles.divider}>|</span>
//             <span>10G PROTEIN</span>
//             <span className={styles.divider}>|</span>
//             <span>NO ADDED SUGAR</span>
//             <span className={styles.divider}>|</span>
//             <span>10G PROTEIN</span>
//             <span className={styles.divider}>|</span>
//             <span>NO PALM OIL</span>
//             <span className={styles.divider}>|</span>
//             <span>NO ADDED SUGAR</span>
//             <span className={styles.divider}>|</span>
//             <span>10G PROTEIN</span>
//             <span className={styles.divider}>|</span>
//             <span>NO ADDED SUGAR</span>
//             <span className={styles.divider}>|</span>
//             <span>10G PROTEIN</span>
//             <span className={styles.divider}>|</span>
//             <span>NO PALM OIL</span>
//             <span className={styles.divider}>|</span>
//             <span>NO ADDED SUGAR</span>
//           </div>
//         </div>

//         {/* Product Cards */}
//         <div className={styles.productCards}>
//           {[1, 2, 3, 4, 5].map((item) => (
//             <div key={item} className={styles.productCard}>
//               <div className={styles.cardContent}>
//                 <h2 className={styles.cardTitle}>
//                   EXTRA<br />HUNGRY?
//                 </h2>
//                 <div className={styles.snickersLogo}>SNICKERS</div>
//                 <div className={styles.playButton}>
//                   <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
//                     <circle cx="30" cy="30" r="28" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="2"/>
//                     <path d="M24 18L42 30L24 42V18Z" fill="white"/>
//                   </svg>
//                 </div>
//                 <img
//                   src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=400&fit=crop"
//                   alt="Snickers Bar"
//                   className={styles.productImage}
//                 />
//                 <div className={styles.peanutsBg}></div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom Features Banner */}
//         <div className={styles.featuresBanner}>
//           <div className={styles.featuresTrack}>
//             <span>10G PROTEIN</span>
//             <span className={styles.divider}>|</span>
//             <span>NO PALM OIL</span>
//             <span className={styles.divider}>|</span>
//             <span>10G PROTEIN</span>
//             <span className={styles.divider}>|</span>
//             <span>NO ADDED SUGAR</span>
//             <span className={styles.divider}>|</span>
//             <span>NO PALM OIL</span>
//             <span className={styles.divider}>|</span>
//             <span>10G PROTEIN</span>
//             <span className={styles.divider}>|</span>
//             <span>NO ADDED SUGAR</span>
//             <span className={styles.divider}>|</span>
//             <span>10G PROTEIN</span>
//             <span className={styles.divider}>|</span>
//             <span>NO PALM OIL</span>
//             <span className={styles.divider}>|</span>
//             <span>NO ADDED SUGAR</span>
//             <span className={styles.divider}>|</span>
//             <span>10G PROTEIN</span>
//             <span className={styles.divider}>|</span>
//             <span>NO ADDED SUGAR</span>
//             <span className={styles.divider}>|</span>
//             <span>10G PROTEIN</span>
//             <span className={styles.divider}>|</span>
//             <span>NO PALM OIL</span>
//             <span className={styles.divider}>|</span>
//             <span>NO ADDED SUGAR</span>
//           </div>
//         </div>
//       </section>

//       {/* Know More Section */}
//       <section className={styles.knowMoreSection}>
//         <h2 className={styles.sectionTitle}>KNOW MORE ABOUT MPACT</h2>

//         <div className={styles.contentGrid}>
//           <div className={styles.productShowcase}>
//             <div className={styles.showcaseCard}>
//               <h3 className={styles.showcaseTitle}>HUNGRY?</h3>
//               <div className={styles.showcaseLogo}>SNICKERS</div>
//               <img
//                 src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=500&fit=crop"
//                 alt="Snickers Product"
//                 className={styles.showcaseImage}
//               />
//               <div className={styles.showcasePeanuts}></div>
//             </div>
//           </div>

//           <div className={styles.descriptionText}>
//             <p>
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry. Lorem Ipsum has been the industry's standard dummy text
//               ever since the 1500s, when an unknown printer took a galley of
//               type and scrambled it to make a type specimen book. Lorem Ipsum is
//               simply dummy text of the printing and typesetting industry. Lorem
//               Ipsum has been the industry's standard dummy text ever since the
//               1500s, when an unknown printer took a galley of type and scrambled
//               it to make a type specimen book. Lorem Ipsum is simply dummy text
//               of the printing and typesetting industry. Lorem Ipsum has been the
//               industry's standard dummy text ever since the 1500s, when an
//               unknown printer took a galley of type and scrambled it to make a
//               type specimen book.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Get It Now Section */}
//       {/* <section className={styles.getItNowSection}>
//         <h2 className={styles.getItNowTitle}># GET IT NOW</h2>
//       </section> */}
//       <Footer />
//     </div>
//   );
// }

// export default About;


// import React, { useEffect, useState } from "react";
// import styles from "./About.module.css";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import api from "../../api/axios";

// function About() {
//   const [about, setAbout] = useState(null);

//   useEffect(() => {
//     api.get("/api/aboutus").then(res => setAbout(res.data));
//   }, []);

//   if (!about) return null;

//   return (
//     <div className={styles.aboutPage}>
//       <Navbar />

//       {/* ================= HERO ================= */}
//       <section className={styles.heroSection}>
//         <h1 className={styles.heroTitle}>{about.heroTitle}</h1>

//         {/* TOP SCROLL */}
//         <div className={styles.featuresBanner}>
//           <div className={styles.marquee}>
//             <div className={styles.marqueeTrack}>
//               {[...about.highlights, ...about.highlights].map((h, i) => (
//                 <span key={i} className={styles.marqueeItem}>
//                   {h.text}
//                   <span className={styles.divider}>|</span>
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* VIDEO CARDS */}
//      <div className={styles.productCards}>
//   {about.videos.map((v) => (
//     <div key={v._id} className={styles.productCard}>
//       <video
//         src={v.videoUrl}
//         autoPlay
//         loop
//         muted
//         playsInline
//         className={styles.productVideo}
//       />
//     </div>
//   ))}
// </div>


//         {/* BOTTOM SCROLL */}
//         <div className={styles.featuresBanner}>
//           <div className={styles.marquee}>
//             <div className={`${styles.marqueeTrack} ${styles.marqueeReverse}`}>
//               {[...about.highlights, ...about.highlights].map((h, i) => (
//                 <span key={i} className={styles.marqueeItem}>
//                   {h.text}
//                   <span className={styles.divider}>|</span>
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= KNOW MORE ================= */}
//       <section className={styles.knowMoreSection}>

//         <h2 className={styles.sectionTitle}>
//           {about.knowMore?.heading}
//         </h2>

//         <div className={styles.contentGrid}>
//            <div className={styles.showcaseCard}>
//           {about.knowMore?.image && (
//             <img 
//               src={about.knowMore.image}
//               alt="Know more"
//               className={styles.showcaseImage}
//             />
//           )}
// </div>
//           <p className={styles.descriptionText}>
//             {about.knowMore?.description}
//           </p>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

// export default About;


import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../api/axios";

function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/aboutus")
      .then((res) => {
        setAbout(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch about page:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (!about) return null;

  return (
    <div className={styles.aboutPage}>
      <Navbar />

      {/* ================= HERO ================= */}
      <section className={styles.heroSection}>
        {/* HERO TITLE (MANDATORY) */}
        <h1 className={styles.heroTitle}>
          {about.heroTitle}
        </h1>

        {/* ================= TOP HIGHLIGHT SCROLL ================= */}
        {about.highlights?.length > 0 && (
          <div className={styles.featuresBanner}>
            <div className={styles.marquee}>
              <div className={styles.marqueeTrack}>
                {[...about.highlights, ...about.highlights].map((h, i) => (
                  <span key={i} className={styles.marqueeItem}>
                    {h.text}
                    <span className={styles.divider}>|</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= VIDEO CARDS ================= */}
        {about.videos?.length > 0 && (
          <div className={styles.productCards}>
            {about.videos.map((video) => (
              <div key={video._id} className={styles.productCard}>
                <video
                  src={video.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  controls={false}
                  className={styles.productVideo}
                />
              </div>
            ))}
          </div>
        )}

        {/* ================= BOTTOM HIGHLIGHT SCROLL ================= */}
        {about.highlights?.length > 0 && (
          <div className={styles.featuresBanner}>
            <div className={styles.marquee}>
              <div
                className={`${styles.marqueeTrack} ${styles.marqueeReverse}`}
              >
                {[...about.highlights, ...about.highlights].map((h, i) => (
                  <span key={i} className={styles.marqueeItem}>
                    {h.text}
                    <span className={styles.divider}>|</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ================= KNOW MORE ================= */}
      <section className={styles.knowMoreSection}>
        <h2 className={styles.sectionTitle}>
          {about.knowMore?.sectionTitle}
        </h2>

        <div className={styles.contentGrid}>

          <div className={styles.showcaseCard}>

            {about.knowMore?.imageHeading && (
              <div className={styles.imageHeading}>
                {about.knowMore.imageHeading}
              </div>
            )}

            {about.knowMore?.image && (
              <img
                src={about.knowMore.image}
                alt="Know more"
                className={styles.showcaseImage}
              />
            )}
          </div>

          <p className={styles.descriptionText}>
            {about.knowMore?.description}
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
