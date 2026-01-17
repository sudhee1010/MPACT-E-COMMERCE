import  Navbar  from "../../components/Navbar";
// import Footer from "../../components/Footer";
import React from 'react'
import { useNavigate } from "react-router-dom";

import  { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Calendar, Clock, UserCircle } from 'lucide-react';

const MPACTBlog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  
  const navigate=useNavigate();

  function navigateFunction() {
    navigate("/Nutrition");
  }

  
  const filters = ['All', 'Nutrition', 'Recipes', 'Wellness', 'Ingredients', 'Fitness', 'Sustainability'];

  const featuredArticles = [
    {
      id: 1,
      tag: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
      title: 'The Science Behind Protein Absorption: What You Need to Know',
      description: 'Understanding how your body processes protein can help you maximize your fitness gains and overall health.',
      tags: ['#Protein', '#Health', '#Science'],
      date: 'Dec 8, 2025',
      author: 'Mike Chen',
      readTime: '7 min read'
    },
    {
      id: 2,
      tag: 'Recipes',
      image: 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&h=600&fit=crop',
      title: '10 Quick and Healthy Breakfast Ideas for Busy Mornings',
      description: 'Start your day right with these nutritious breakfast options that take less than 15 minutes to prepare.',
      tags: ['#Breakfast', '#Healthy Eating', '#Quick Meals'],
      date: 'Dec 5, 2025',
      author: 'Mike Chen',
      readTime: '7 min read'
    }
  ];

  const latestArticles = [
    {
      id: 3,
      tag: 'Wellness',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
      title: 'How Natural Ingredients Boost Wellness',
      description: 'Discover the power of natural, whole-food ingredients and their impact on sustained energy throughout the day.',
      tags: ['#Energy', '#Nutrition', '#Ingredients'],
      date: 'Dec 1, 2025',
      author: 'Emily Rodriguez',
      readTime: '5 min read'
    },
    {
      id: 4,
      tag: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop',
      title: 'The Ultimate Guide to Reading Nutrition Labels',
      description: 'Learn how to decode nutrition labels and make informed choices about the food you eat.',
      tags: ['#Education', '#Health', '#Nutrition'],
      date: 'Dec 28, 2025',
      author: 'Dr. Sarah Lee',
      readTime: '6 min read'
    },
    {
      id: 5,
      tag: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1523251451807-aab9b844ed3f?w=400&h=300&fit=crop',
      title: 'Peanut Butter Power: Benefits Beyond Protein',
      description: 'Peanut butter is more than just a protein source. Explore its hidden health benefits and creative uses.',
      tags: ['#Peanut Butter', '#Protein', '#Health Benefits'],
      date: 'Dec 26, 2025',
      author: 'Mike Chen',
      readTime: '5 min read'
    },
    {
      id: 6,
      tag: 'Fitness',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
      title: 'Pre-Workout vs Post-Workout Nutrition: What\'s Best?',
      description: 'Timing is everything when it comes to fueling your workouts. Here\'s what science says about meal timing.',
      tags: ['#Pre-Workout', '#Nutrition', '#Fitness'],
      date: 'Dec 23, 2025',
      author: 'Emily Rodriguez',
      readTime: '6 min read'
    },
    {
      id: 7,
      tag: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop',
      title: 'Sustainable Snacking: How We Source Our Ingredients',
      description: 'Take a behind-the-scenes look at our commitment to sustainable and ethically-sourced ingredient sourcing.',
      tags: ['#Sustainability', '#Ingredients', '#Ethics'],
      date: 'Dec 20, 2025',
      author: 'Dr. Sarah Lee',
      readTime: '7 min read'
    },
    {
      id: 8,
      tag: 'Recipes',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
      title: '5 Creative Ways to Use Protein Wafers in Your Recipes',
      description: 'Think protein wafers are just a snack? Think again! Here are some delicious recipes that might surprise your meals.',
      tags: ['#Recipes', '#Creative', '#Protein Wafers'],
      date: 'Dec 18, 2025',
      author: 'Mike Chen',
      readTime: '5 min read'
    },
    {
      id: 9,
      tag: 'Ingredients',
      image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&h=300&fit=crop',
      title: 'Understanding Jaggery: The Ancient Sweetener Making a Comeback',
      description: 'Why jaggery is becoming the go-to natural sweetener and how it compares to refined sugar.',
      tags: ['#Jaggery', '#Natural', '#Sweeteners'],
      date: 'Dec 15, 2025',
      author: 'Emily Rodriguez',
      readTime: '5 min read'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <style>{`
        /* Mobile First - Base Styles (0-640px) */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
        }

        .container {
          width: 100%;
          padding-left: 1rem;
          padding-right: 1rem;
          margin: 0 auto;
        }

        /* Featured Article Card - Mobile */
        .featured-article-card {
          display: flex;
          flex-direction: column;
          border: 2px solid #facc15;
          border-radius: 12px;
          overflow: hidden;
          background-color: #1f2937;
          transition: all 0.3s ease;
        }

        .featured-article-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(250, 204, 21, 0.3);
        }

        .featured-image-wrapper {
          position: relative;
          width: 100%;
          height: 250px;
        }

        .featured-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .article-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background-color: #facc15;
          color: #000;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 700;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        .featured-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .article-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          color: #9ca3af;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .article-title {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 1rem;
          color: #fff;
        }

        .article-description {
          color: #d1d5db;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .article-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tag {
          background-color: transparent;
          border: 1px solid #4b5563;
          padding: 0.375rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tag:hover {
          background-color: #facc15;
          color: #000;
          border-color: #facc15;
        }

        .read-more-btn {
          color: #facc15;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          align-self: flex-start;
        }

        .read-more-btn:hover {
          color: #fde047;
          transform: translateX(4px);
        }

        /* Latest Articles Grid - Mobile */
        .latest-articles-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .latest-article-card {
          border: 2px solid #facc15;
          border-radius: 12px;
          overflow: hidden;
          background-color: #1f2937;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .latest-article-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(250, 204, 21, 0.3);
          border-color: #fde047;
        }

        .latest-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .latest-content {
          padding: 1.25rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .latest-title {
          font-size: 1.125rem;
          font-weight: 700;
          line-height: 1.4;
          margin-bottom: 0.75rem;
          color: #fff;
        }

        .latest-description {
          color: #d1d5db;
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        /* Filter Buttons */
        .filter-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .filter-btn {
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid #4b5563;
          background-color: transparent;
          color: #fff;
        }

        .filter-btn.active {
          background-color: #facc15;
          color: #000;
          border-color: #facc15;
          box-shadow: 0 4px 6px rgba(250, 204, 21, 0.3);
          transform: scale(1.05);
        }

        .filter-btn:hover:not(.active) {
          border-color: #facc15;
          color: #facc15;
        }

        /* Tablet Styles (641px - 1024px) */
        @media (min-width: 641px) {
          .container {
            padding-left: 2rem;
            padding-right: 2rem;
            max-width: 1280px;
          }

          .featured-image-wrapper {
            height: 300px;
          }

          .article-title {
            font-size: 1.75rem;
          }

          .featured-content {
            padding: 2rem;
          }

          .latest-articles-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .latest-image {
            height: 220px;
      }
        }

        /* Desktop Styles (768px+) for Featured Cards */
        @media (min-width: 768px) {
          .featured-article-card {
            flex-direction: row;
          }

          .featured-image-wrapper {
            width: 50%;
            height: auto;
            min-height: 400px;
          }

          .featured-content {
            width: 50%;
            padding: 2.5rem;
          }

          .article-title {
            font-size: 2rem;
          }

          .article-description {
            font-size: 1rem;
          }
        }

        /* Large Desktop (1025px+) */
        @media (min-width: 1025px) {
          .latest-articles-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }

          .article-title {
            font-size: 2.25rem;
          }

          .featured-content {
            padding: 3rem;
          }

          .latest-title {
            font-size: 1.25rem;
          }
        }

        /* Extra Large Desktop (1280px+) */
        @media (min-width: 1280px) {
          .container {
            max-width: 1280px;
          }

          .latest-articles-grid {
            gap: 2rem;
          }
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .nav-desktop {
          display: none;
          gap: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .nav-link {
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          color: inherit;
        }

        .nav-link:hover {
          text-decoration: underline;
        }

        .nav-link.active {
          font-weight: 700;
          border-bottom: 2px solid #000;
        }

        .header-icons {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .icon-btn {
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .icon-btn:hover {
          transform: scale(1.1);
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #000;
        }

        .mobile-menu.open {
          display: flex;
        }

        @media (min-width: 768px) {
          .logo {
            font-size: 1.875rem;
          }

          .nav-desktop {
            display: flex;
          }

          .mobile-menu-btn {
            display: none;
          }

          .header-icons .icon-mobile {
            display: none;
          }

          .header-container {
            padding: 1rem 2rem;
          }
        }

        /* Search Bar */
        .search-wrapper {
          position: relative;
          max-width: 42rem;
          margin: 0 auto;
          margin-bottom: 1.5rem;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-input {
          width: 100%;
          background-color: #1f2937;
          border: 2px solid #4b5563;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem 0.75rem 3rem;
          color: #fff;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .search-input::placeholder {
          color: #6b7280;
        }

        .search-input:focus {
          border-color: #facc15;
        }

        /* Section Titles */
        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          letter-spacing: -0.025em;
        }

        @media (min-width: 768px) {
          .section-title {
            font-size: 1.875rem;
          }
        }

        @media (min-width: 1024px) {
          .section-title {
            font-size: 2.25rem;
          }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="header-container container">
        
          
          {/* Desktop Navigation */}

          <div className="header-icons">
            {/*  */}
            <button 
              className="mobile-menu-btn icon-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
             <a href="#" className="nav-link">HOME</a>
            <a href="#" className="nav-link">PRODUCTS</a>
            <a href="#" className="nav-link">ABOUT US</a>
            <a href="#" className="nav-link active">BLOG</a>
            <a href="#" className="nav-link">WISHLIST</a>
          </nav> 
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '700', marginBottom: '1rem', letterSpacing: '-0.025em' }}>
          MPACT BLOG
        </h1>
        <p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: 'clamp(0.875rem, 2vw, 1.125rem)', maxWidth: '48rem', margin: '0 auto 2rem' }}>
          Discover insights on nutrition, wellness, and healthy living from our team of experts.
        </p>

        {/* Search Bar */}
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search articles, topics, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>9 articles found</p>
      </section>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        {/* Featured Articles */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 className="section-title">FEATURED ARTICLES</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {featuredArticles.map((article) => (
              <div key={article.id} className="featured-article-card">
                <div className="featured-image-wrapper">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="featured-image"
                  />
                  <span className="article-tag">{article.tag}</span>
                </div>
                <div className="featured-content">
                  <div className="article-meta">
                    <span className="meta-item">
                      <Calendar size={16} />
                      {article.date}
                    </span>
                    <span className="meta-item">
                      <UserCircle size={16} />
                      {article.author}
                    </span>
                    <span className="meta-item">
                      <Clock size={16} />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-description">{article.description}</p>
                  <div className="article-tags">
                    {article.tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="read-more-btn" onClick={()=> navigateFunction("/Nutrition")}>Read More <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Articles */}
        <section>
          <h2 className="section-title">LATEST ARTICLES</h2>
          <div className="latest-articles-grid">
            {latestArticles.map((article) => (
              <div key={article.id} className="latest-article-card">
                <div style={{ position: 'relative' }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="latest-image"
                  />
                  <span className="article-tag">{article.tag}</span>
                </div>
                <div className="latest-content">
                  <div className="article-meta" style={{ fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                    <span className="meta-item">
                      <Calendar size={14} />
                      {article.date}
                    </span>
                    <span className="meta-item">
                      <UserCircle size={14} />
                      {article.author}
                    </span>
                    <span className="meta-item">
                      <Clock size={14} />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="latest-title">{article.title}</h3>
                  <p className="latest-description">{article.description}</p>
                  <div className="article-tags" style={{ marginBottom: '1rem' }}>
                    {article.tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="read-more-btn" style={{ fontSize: '0.875rem' }}   onClick={()=> navigateFunction("/Nutrition")}>
                    Read More <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MPACTBlog;