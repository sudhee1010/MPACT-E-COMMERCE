import React from "react";
import styles from "./About.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
function About() {
  return (
    <div className={styles.aboutPage}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>TASTY TALKS</h1>
        </div>

        {/* Top Features Banner */}
        <div className={styles.featuresBanner}>
          <div className={styles.featuresTrack}>
            <span>10G PROTEIN</span>
            <span className={styles.divider}>|</span>
            <span>NO PALM OIL</span>
            <span className={styles.divider}>|</span>
            <span>10G PROTEIN</span>
            <span className={styles.divider}>|</span>
            <span>NO ADDED SUGAR</span>
            <span className={styles.divider}>|</span>
             <span>NO PALM OIL</span>
            <span className={styles.divider}>|</span>
            <span>10G PROTEIN</span>
            <span className={styles.divider}>|</span>
            <span>NO ADDED SUGAR</span>
            <span className={styles.divider}>|</span>
            <span>10G PROTEIN</span>
            <span className={styles.divider}>|</span>
            <span>NO PALM OIL</span>
            <span className={styles.divider}>|</span>
            <span>NO ADDED SUGAR</span>
            <span className={styles.divider}>|</span>
            <span>10G PROTEIN</span>
            <span className={styles.divider}>|</span>
            <span>NO ADDED SUGAR</span>
            <span className={styles.divider}>|</span>
            <span>10G PROTEIN</span>
            <span className={styles.divider}>|</span>
            <span>NO PALM OIL</span>
            <span className={styles.divider}>|</span>
            <span>NO ADDED SUGAR</span>
          </div>
        </div>

        {/* Product Cards */}
        <div className={styles.productCards}>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className={styles.productCard}>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>
                  EXTRA<br />HUNGRY?
                </h2>
                <div className={styles.snickersLogo}>SNICKERS</div>
                <div className={styles.playButton}>
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="28" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="2"/>
                    <path d="M24 18L42 30L24 42V18Z" fill="white"/>
                  </svg>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=400&fit=crop"
                  alt="Snickers Bar"
                  className={styles.productImage}
                />
                <div className={styles.peanutsBg}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Features Banner */}
        <div className={styles.featuresBanner}>
          <div className={styles.featuresTrack}>
            <span>10G PROTEIN</span>
            <span className={styles.divider}>|</span>
            <span>NO PALM OIL</span>
            <span className={styles.divider}>|</span>
            <span>10G PROTEIN</span>
            <span className={styles.divider}>|</span>
            <span>NO ADDED SUGAR</span>
            <span className={styles.divider}>|</span>
            <span>NO PALM OIL</span>
            <span className={styles.divider}>|</span>
            <span>10G PROTEIN</span>
            <span className={styles.divider}>|</span>
            <span>NO ADDED SUGAR</span>
            <span className={styles.divider}>|</span>
            <span>10G PROTEIN</span>
            <span className={styles.divider}>|</span>
            <span>NO PALM OIL</span>
            <span className={styles.divider}>|</span>
            <span>NO ADDED SUGAR</span>
            <span className={styles.divider}>|</span>
            <span>10G PROTEIN</span>
            <span className={styles.divider}>|</span>
            <span>NO ADDED SUGAR</span>
            <span className={styles.divider}>|</span>
            <span>10G PROTEIN</span>
            <span className={styles.divider}>|</span>
            <span>NO PALM OIL</span>
            <span className={styles.divider}>|</span>
            <span>NO ADDED SUGAR</span>
          </div>
        </div>
      </section>

      {/* Know More Section */}
      <section className={styles.knowMoreSection}>
        <h2 className={styles.sectionTitle}>KNOW MORE ABOUT MPACT</h2>

        <div className={styles.contentGrid}>
          <div className={styles.productShowcase}>
            <div className={styles.showcaseCard}>
              <h3 className={styles.showcaseTitle}>HUNGRY?</h3>
              <div className={styles.showcaseLogo}>SNICKERS</div>
              <img
                src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=500&fit=crop"
                alt="Snickers Product"
                className={styles.showcaseImage}
              />
              <div className={styles.showcasePeanuts}></div>
            </div>
          </div>

          <div className={styles.descriptionText}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book. Lorem Ipsum is simply dummy text
              of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book.
            </p>
          </div>
        </div>
      </section>

      {/* Get It Now Section */}
      {/* <section className={styles.getItNowSection}>
        <h2 className={styles.getItNowTitle}># GET IT NOW</h2>
      </section> */}
      <Footer />
    </div>
  );
}

export default About;
