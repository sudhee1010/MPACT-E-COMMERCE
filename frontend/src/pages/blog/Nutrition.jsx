import  Navbar  from "../../components/Navbar";
import Footer from "../../components/Footer";
import React from 'react'

import  { useState } from 'react';
import { Search, ShoppingCart, User, ArrowLeft, Heart, Share2, Calendar, Clock, UserCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const BlogArticlePage = () => {
  const [liked, setLiked] = useState(false);

  const navigate=useNavigate();
    function navigateFunction() {
      navigate("/Blog")
      
    }
  

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <style>{`
        /* Global Styles - Mobile First (0-640px) */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        .page-container {
          min-height: 100vh;
          background-color: #111827;
          color: #fff;
        }

        .content-wrapper {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        /* ============================================
           HEADER STYLES
        ============================================ */

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          max-width: 1280px;
          margin: 0 auto;
        }

        .site-logo {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          cursor: pointer;
        }

        .main-nav {
          display: none;
          gap: 2rem;
        }

        .nav-item {
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s ease;
          text-decoration: none;
          color: inherit;
          letter-spacing: 0.5px;
        }

        .nav-item:hover {
          opacity: 0.7;
        }

        .nav-item.active {
          font-weight: 700;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .header-icon {
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .header-icon:hover {
          transform: scale(1.1);
        }

        /* ============================================
           ARTICLE HEADER SECTION
        ============================================ */
        .article-header {
          padding: 2rem 0;
        
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #9ca3af;
          font-size: 0.875rem;
          cursor: pointer;
          transition: color 0.2s ease;
          margin-bottom: 1.5rem;
          background: none;
          border: none;
          font-family: inherit;
          top:10%;
        }

        .back-link:hover {
          color: #facc15;
        }

        .category-label {
          display: inline-block;
          background-color: #facc15;
          color: #000;
          padding: 0.2rem 1.135rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 700;
          margin-bottom: 2rem;
          letter-spacing: 0.3px;
          top:10px;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: 1.5rem;
          letter-spacing: -0.5px;
          color: #fff;
        }

        .article-metadata {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          color: #9ca3af;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }

        .meta-info {
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .action-bar {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid #facc15;
          background-color: transparent;
          color: #facc15;
          font-family: inherit;
        }

        .action-button:hover {
          background-color: #facc15;
          color: #000;
        }

        .action-button.active {
          background-color: #facc15;
          color: #000;
        }

        /* ============================================
           FEATURED IMAGE
        ============================================ */
        .hero-image-container {
          width: 100%;
          margin-bottom: 2.5rem;
        }

        .hero-image {
          width: 100%;
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          display: block;
        }

        /* ============================================
           ARTICLE BODY
        ============================================ */
        .article-body {
          color: #d1d5db;
          line-height: 1.8;
          font-size: 1rem;
        }

        .article-body h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin: 2.5rem 0 1rem;
          letter-spacing: -0.5px;
          line-height: 1.3;
        }

        .article-body h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #fff;
          margin: 2rem 0 1rem;
          letter-spacing: -0.3px;
        }

        .article-body p {
          margin-bottom: 1.25rem;
          color: #d1d5db;
        }

        .article-body ul {
          margin: 1.25rem 0;
          padding-left: 1.5rem;
        }

        .article-body li {
          margin-bottom: 0.75rem;
          color: #d1d5db;
        }

        .article-body strong {
          color: #fff;
          font-weight: 600;
        }

        /* ============================================
           TAGS SECTION
        ============================================ */
        .tags-wrapper {
          margin: 3rem 0;
          padding-top: 2rem;
          border-top: 1px solid #374151;
        }

        .tags-label {
          font-size: 0.875rem;
          color: #9ca3af;
          margin-bottom: 0.875rem;
          font-weight: 600;
        }

        .tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.625rem;
        }

        .tag-item {
          background-color: transparent;
          border: 1.5px solid #4b5563;
          color: #facc15;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tag-item:hover {
          background-color: #facc15;
          color: #000;
          border-color: #facc15;
        }

        /* ============================================
           AUTHOR SECTION
        ============================================ */
        .author-section {
          border: 2px solid #facc15;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin: 3rem 0;
          background-color: #1f2937;
        }

        .author-icon {
          width: 60px;
          height: 60px;
          background-color: #facc15;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .author-details h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.25rem;
        }

        .author-details p {
          color: #9ca3af;
          font-size: 0.875rem;
          margin: 0;
        }

        /* ============================================
           RELATED ARTICLES SECTION
        ============================================ */
        .related-articles {
          margin: 4rem 0;
        }

        .section-heading {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          letter-spacing: -0.5px;
          color: #fff;
        }

        .related-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .related-card {
          border: 2px solid #facc15;
          border-radius: 12px;
          overflow: hidden;
          background-color: #1f2937;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .related-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(250, 204, 21, 0.25);
        }

        .related-image-box {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .related-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .related-category {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background-color: #facc15;
          color: #000;
          padding: 0.375rem 0.875rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .related-info {
          padding: 1.25rem;
        }

        .related-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .related-metadata {
          display: flex;
          gap: 0.5rem;
          color: #9ca3af;
          font-size: 0.75rem;
        }

        /* ============================================
           TABLET STYLES (641px - 1024px)
        ============================================ */
        @media (min-width: 641px) {
          .content-wrapper {
            padding: 0 2rem;
          }

          .article-header {
            padding: 2.5rem 0;
          }

          .page-title {
            font-size: 2.75rem;
          }

          .hero-image {
            max-width: 800px;
          }

          .related-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .related-image-box {
            height: 220px;
          }
        }

        /* ============================================
           DESKTOP STYLES (768px+)
        ============================================ */
        @media (min-width: 768px) {
          .site-logo {
            font-size: 1.875rem;
          }

          .main-nav {
            display: flex;
          }

          .header-inner {
            padding: 1rem 2rem;
          }

          .page-title {
            font-size: 3.25rem;
          }

          .article-body {
            font-size: 1.0625rem;
          }

          .article-body h2 {
            font-size: 1.875rem;
            margin: 3rem 0 1.25rem;
          }

          .article-body h3 {
            font-size: 1.375rem;
          }

          .section-heading {
            font-size: 1.875rem;
          }

          .author-section {
            padding: 2rem;
          }

          .author-icon {
            width: 70px;
            height: 70px;
          }

          .author-details h3 {
            font-size: 1.25rem;
          }
        }

        /* ============================================
           LARGE DESKTOP STYLES (1024px+)
        ============================================ */
        @media (min-width: 1024px) {
          .article-header {
            padding: 3rem 0;
          }

          .page-title {
            font-size: 3.75rem;
          }

          .related-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }

          .related-image-box {
            height: 240px;
          }
        }

        /* ============================================
           EXTRA LARGE DESKTOP (1280px+)
        ============================================ */
        @media (min-width: 1280px) {
          .content-wrapper {
            padding: 0 3rem;
          }

          .related-grid {
            gap: 2rem;
          }
        }
      `}</style>

      <div className="page-container">
        {/* Header */}
        <header className="site-header">
          <div className="header-inner">
        
          </div>
        </header>

        {/* Main Content */}
        <main className="content-wrapper">
          {/* Article Header */}
          <div className="article-header">
            <button className="back-link" onClick={()=>navigateFunction("/Blog")}>
              <ArrowLeft size={16} />
              Back to Blog
            </button>

            <span className="category-label">Nutrition</span>

            <h1 className="page-title">
              The Science Behind Protein Absorption: What You Need to Know
            </h1>

            <div className="article-metadata">
              <span className="meta-info">
                <UserCircle size={16} />
                Dr. Sarah Johnson
              </span>
              <span className="meta-info">
                <Calendar size={16} />
                January 8, 2025
              </span>
              <span className="meta-info">
                <Clock size={16} />
                5 min read
              </span>
            </div>

            <div className="action-bar">
              <button 
                className={`action-button ${liked ? 'active' : ''}`}
                onClick={() => setLiked(!liked)}
              >
                <Heart size={16} fill={liked ? '#000' : 'none'} />
                Like
              </button>
              <button className="action-button">
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="hero-image-container">
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=800&fit=crop" 
              alt="Protein rich meal with eggs, avocado, and vegetables"
              className="hero-image"
            />
          </div>

          {/* Article Content */}
          <article className="article-body">
            <h2>Understanding Protein Absorption</h2>
            <p>
              Protein is essential for muscle growth, recovery, and overall health. But did you know that not all protein is absorbed 
              equally? The rate and efficiency of protein absorption depend on several factors, including the type of protein, your 
              digestive health, and the timing of consumption.
            </p>

            <h3>The Digestive Process</h3>
            <p>
              When you consume protein, it undergoes a complex digestive process. Proteins are broken down into amino acids in 
              your stomach and small intestine. These amino acids are then absorbed into your bloodstream and transported to 
              various cells throughout your body.
            </p>

            <h3>Types of Protein</h3>
            <p>Different protein sources have different absorption rates:</p>
            <ul>
              <li><strong>Whey Protein:</strong> Absorbs quickly (approximately 8-10 grams per hour)</li>
              <li><strong>Casein Protein:</strong> Absorbs slowly, providing sustained amino acid release</li>
              <li><strong>Plant-Based Proteins:</strong> Absorption varies depending on the source and processing</li>
              <li><strong>Whole Food Proteins:</strong> Generally absorb more slowly than isolated proteins</li>
            </ul>

            <h3>Maximizing Protein Absorption</h3>
            <p>Here are some strategies to optimize protein absorption:</p>
            <ul>
              <li>Distribute protein intake throughout the day (20-30g per meal)</li>
              <li>Combine protein with digestive enzymes or probiotics</li>
              <li>Stay hydrated to support digestive processes</li>
              <li>Don't exceed your body's absorption capacity in one sitting</li>
            </ul>

            <h3>The Role of Timing</h3>
            <p>
              While protein timing isn't as critical as once thought, consuming protein within a few hours after exercise can support 
              muscle recovery and growth. The key is meeting your daily protein requirements consistently while maintaining your overall protein intake.
            </p>

            <h3>Quality Matters</h3>
            <p>
              At MPACT, we prioritize using high-quality protein sources that are easily digestible and bioavailable. Our products are 
              designed to provide optimal nutrition without unnecessary additives or preservatives.
            </p>

            <h2>Conclusion</h2>
            <p>
              Understanding protein absorption helps you make informed choices about your nutrition. Focus on consuming quality 
              protein sources throughout the day, and your body will thank you with improved performance, recovery, and overall 
              health.
            </p>
          </article>

          {/* Tags Section */}
          <div className="tags-wrapper">
            <div className="tags-label">Tags:</div>
            <div className="tags-list">
              <span className="tag-item">#Protein</span>
              <span className="tag-item">#Health</span>
              <span className="tag-item">#Science</span>
            </div>
          </div>

          {/* Author Card */}
          <div className="author-section">
            <div className="author-icon">
              <UserCircle size={34} color="#000" />
            </div>
            <div className="author-details">
              <h3>Dr. Sarah Johnson</h3>
              <p>Health & Nutrition Expert</p>
            </div>
          </div>

          {/* Related Articles */}
          <section className="related-articles">
            <h2 className="section-heading">RELATED ARTICLES</h2>
            <div className="related-grid">
              <div className="related-card">
                <div className="related-image-box">
                  <img 
                    src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&h=300&fit=crop" 
                    alt="Nutrition labels guide"
                    className="related-img"
                  />
                  <span className="related-category">Nutrition</span>
                </div>
                <div className="related-info">
                  <h3 className="related-title">The Ultimate Guide to Reading Nutrition Labels</h3>
                  <div className="related-metadata">
                    <span>Dec 28</span>
                    <span>•</span>
                    <span>8 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default BlogArticlePage;