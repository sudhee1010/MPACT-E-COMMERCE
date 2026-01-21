import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Heart, Share2, Calendar, Clock, UserCircle } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const BlogArticlePage = () => {
  const [liked, setLiked] = useState(false);
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        
        // Fetch single blog by slug
        const res = await api.get(`/blogs/${slug}`);
        setBlog(res.data);

        // Fetch related blogs by category
        if (res.data.category) {
          const relatedRes = await api.get(`/blogs`, {
            params: { category: res.data.category._id }
          });

          // Filter out current blog and limit to 3
          setRelatedBlogs(
            relatedRes.data
              .filter((b) => b.slug !== slug)
              .slice(0, 3)
          );
        }
      } catch (error) {
        console.error("Error loading blog", error);
        toast.error("Failed to load blog article");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="spinner"></div>
        <style>{`
          .spinner {
            border: 4px solid #374151;
            border-top: 4px solid #facc15;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-4">Blog not found</h2>
        <button 
          onClick={() => navigate('/blog')}
          className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300"
        >
          Back to Blog
        </button>
      </div>
    );
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

        /* ARTICLE HEADER SECTION */
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
        }

        .back-link:hover {
          color: #facc15;
        }

        .category-label {
          display: inline-block;
          background-color: #facc15;
          color: #000;
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          letter-spacing: 0.3px;
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

        /* FEATURED IMAGE */
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

        /* ARTICLE BODY */
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

        /* TAGS SECTION */
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

        /* AUTHOR SECTION */
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

        /* RELATED ARTICLES SECTION */
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

        /* TABLET STYLES (641px - 1024px) */
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

        /* DESKTOP STYLES (768px+) */
        @media (min-width: 768px) {
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

        /* LARGE DESKTOP STYLES (1024px+) */
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

        /* EXTRA LARGE DESKTOP (1280px+) */
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
        {/* Main Content */}
        <main className="content-wrapper">
          {/* Article Header */}
          <div className="article-header">
            <button className="back-link" onClick={() => navigate("/blog")}>
              <ArrowLeft size={16} />
              Back to Blog
            </button>

            <span className="category-label">{blog.category?.name || 'Uncategorized'}</span>

            <h1 className="page-title">{blog.title}</h1>

            <div className="article-metadata">
              <span className="meta-info">
                <UserCircle size={16} />
                Admin
              </span>
              <span className="meta-info">
                <Calendar size={16} />
                {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span className="meta-info">
                <Clock size={16} />
                {blog.readTime} min read
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
              <button className="action-button" onClick={handleShare}>
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="hero-image-container">
            <img 
             // src={`http://localhost:5000/${blog.coverImage}`}
               src={blog.coverImage}
              alt={blog.title}
              className="hero-image"
            />
          </div>

          {/* Article Content */}
          <article
            className="article-body"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags Section */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="tags-wrapper">
              <div className="tags-label">Tags:</div>
              <div className="tags-list">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="tag-item">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Card */}
          <div className="author-section">
            <div className="author-icon">
              <UserCircle size={34} color="#000" />
            </div>
            <div className="author-details">
              <h3>Admin</h3>
              <p>Health & Nutrition Expert</p>
            </div>
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="related-articles">
              <h2 className="section-heading">RELATED ARTICLES</h2>
              <div className="related-grid">
                {relatedBlogs.map((item) => (
                  <div
                    key={item._id}
                    className="related-card"
                    onClick={() => navigate(`/blog/${item.slug}`)}
                  >
                    <div className="related-image-box">
                      <img
                       // src={`http://localhost:5000/${item.coverImage}`}
                       src={item.coverImage}
                        alt={item.title}
                        className="related-img"
                      />
                      <span className="related-category">
                        {item.category?.name || 'Uncategorized'}
                      </span>
                    </div>
                    <div className="related-info">
                      <h3 className="related-title">{item.title}</h3>
                      <div className="related-metadata">
                        <span>{item.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BlogArticlePage;