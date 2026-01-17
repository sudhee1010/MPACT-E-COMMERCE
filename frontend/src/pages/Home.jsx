import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, User, Search, ChevronLeft, ChevronRight, Play, Menu, X } from 'lucide-react';
import MotivationalSection from "./MotivationalSection";
import VideoShowcaseSection from "./VideoShowcaseSection";
import FeaturesSection from "./FeaturesSection";
import proteinGym from "../assets/rrs/protein-gym.jpg";
import { addToCart } from "../services/cartService";
import { Instagram, Youtube } from 'lucide-react';
import { SiTiktok } from "react-icons/si";
import WhatsAppFloat from '../components/WhatsAppFloat';



const MPACTLandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  // 🔥 BACKEND STATES (ONLY ADDITION)
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productError, setProductError] = useState(null);
  // const [nextCursor, setNextCursor] = useState(null);
  // const [hasNextPage, setHasNextPage] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [heroSlides, setHeroSlides] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const navigate = useNavigate();







  const heroRef = useRef(null);
  const motivationalRef = useRef(null);
  const productsRef = useRef(null);
  const aboutRef = useRef(null);
  const blogRef = useRef(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Jersey+25&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 FETCH PRODUCTS FROM BACKEND (ONLY LOGIC ADDITION)

  // const fetchProducts = async (cursor = null) => {
  //   try {
  //     setLoadingProducts(true);

  //     const res = await axios.get("http://localhost:5000/api/products", {
  //       params: {
  //         limit: 8,
  //         cursor
  //       }
  //     });

  //     const data = res.data.products;
  //     const pageInfo = res.data.pageInfo;

  //     setProducts(prev =>
  //       cursor ? [...prev, ...data] : data
  //     );
  //     setNextCursor(pageInfo?.nextCursor ?? null);
  //     setHasNextPage(
  //       typeof pageInfo?.hasNextPage === "boolean"
  //         ? pageInfo.hasNextPage
  //         : true
  //     );
  //   } catch (error) {
  //     setProductError("Failed to load products");
  //   } finally {
  //     setLoadingProducts(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchProducts();
  // }, []);



  // 🔥 FETCH LIMITED PRODUCTS FOR HOME PAGE
const fetchProducts = async () => {
  try {
    setLoadingProducts(true);

    const res = await axios.get("http://localhost:5000/api/products", {
      params: { limit: 8 }
    });

    setProducts(res.data.products);
  } catch (error) {
    setProductError("Failed to load products");
  } finally {
    setLoadingProducts(false);
  }
};

useEffect(() => {
  fetchProducts();
}, []);




  // const heroSlides = [
  //   { id: 1, image: proteinGym },
  //   { id: 2, image: proteinGym },
  //   { id: 3, image: proteinGym },
  // ];

  // for hero image
  useEffect(() => {
    const fetchHeroBanners = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/hero-banners");
        setHeroSlides(res.data);
      } catch (error) {
        console.error("Failed to load hero banners");
      } finally {
        setLoadingBanners(false);
      }
    };

    fetchHeroBanners();
  }, []);





  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  //   const [products] = useState([
  //   {
  //     id: 1,
  //     title: "EXTRA HUNGRY?",
  //     name: "PROTEIN WAFERS - VARIETY PACK OF 10",
  //     brand: "SNICKERS",
  //     price: 2000,
  //     oldPrice: 2999,
  //     discount: "26% OFF",
  //     image: proteinGym,   // ✅ FIXED
  //     rating: 5,
  //     reviews: 199,
  //     specs: [
  //       "NO PRESERVATIVES",
  //       "JAGGERY BASED",
  //       "NO ADDED COLOURS",
  //       "NO GLUCOSE ADDED",
  //       "80 % PEANUT",
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "EXTRA HUNGRY?",
  //     name: "PROTEIN WAFERS - VARIETY PACK OF 10",
  //     brand: "SNICKERS",
  //     price: 2000,
  //     oldPrice: 2999,
  //     discount: "26% OFF",
  //     image: proteinGym,   // ✅ FIXED
  //     rating: 5,
  //     reviews: 199,
  //     specs: [
  //       "NO PRESERVATIVES",
  //       "JAGGERY BASED",
  //       "NO ADDED COLOURS",
  //       "NO GLUCOSE ADDED",
  //       "80 % PEANUT",
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: "EXTRA HUNGRY?",
  //     name: "PROTEIN WAFERS - VARIETY PACK OF 10",
  //     brand: "SNICKERS",
  //     price: 2000,
  //     oldPrice: 2999,
  //     discount: "26% OFF",
  //     image: proteinGym,   // ✅ FIXED
  //     rating: 5,
  //     reviews: 199,
  //     specs: [
  //       "NO PRESERVATIVES",
  //       "JAGGERY BASED",
  //       "NO ADDED COLOURS",
  //       "NO GLUCOSE ADDED",
  //       "80 % PEANUT",
  //     ],
  //   },
  //   {
  //     id: 4,
  //     title: "EXTRA HUNGRY?",
  //     name: "PROTEIN WAFERS - VARIETY PACK OF 10",
  //     brand: "SNICKERS",
  //     price: 2000,
  //     oldPrice: 2999,
  //     discount: "26% OFF",
  //     image: proteinGym,   // ✅ FIXED
  //     rating: 5,
  //     reviews: 199,
  //     specs: [
  //       "NO PRESERVATIVES",
  //       "JAGGERY BASED",
  //       "NO ADDED COLOURS",
  //       "NO GLUCOSE ADDED",
  //       "80 % PEANUT",
  //     ],
  //   },
  // ]);


  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const handleBuyNow = async (productId) => {
    try {
      await addToCart(productId, 1);

      setCartMessage("✅ Product added to cart");
      setTimeout(() => setCartMessage(""), 3000);
    } catch (error) {
      if (error.response?.status === 401) {
        setShowLoginModal(true);
      } else {
        setCartMessage(
          error.response?.data?.message || "❌ Failed to add to cart"
        );
        setTimeout(() => setCartMessage(""), 3000);
      }
    }
  };



  const heroParallax = scrollY * 0.5;
  const productParallax = Math.max(0, (scrollY - 600) * 0.3);
  const motivationalParallax = Math.max(0, (scrollY - 1200) * 0.4);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#171717',
      color: 'white',
      overflowX: 'hidden',
      fontFamily: "'Jersey 25', sans-serif"
    }}>
      {/* Fixed Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrollY > 100 ? 'rgba(250, 204, 21, 0.95)' : 'rgb(250, 204, 21)',
        backdropFilter: scrollY > 100 ? 'blur(10px)' : 'none',
        color: 'black',
        transition: 'all 0.3s'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            MPACT
          </div>

          {/* Desktop Navigation */}
          <nav style={{
            display: 'none',
            gap: '2rem',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            '@media (min-width: 768px)': { display: 'flex' }
          }}>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              textDecoration: 'none'
            }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>HOME</button>
            <button onClick={() => scrollToSection(productsRef)} style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              textDecoration: 'none'
            }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>PRODUCTS</button>
            <button onClick={() => scrollToSection(aboutRef)} style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              textDecoration: 'none'
            }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>ABOUT US</button>
            <button onClick={() => scrollToSection(blogRef)} style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              textDecoration: 'none'
            }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>BLOG</button>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              opacity: 1,
              transition: 'opacity 0.3s'
            }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
              <Search size={20} />
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              opacity: 1,
              transition: 'opacity 0.3s'
            }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
              <User size={20} />
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              opacity: 1,
              transition: 'opacity 0.3s'
            }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
              <ShoppingCart size={20} />
            </button>

            <button
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                display: window.innerWidth >= 768 ? 'none' : 'block',
                opacity: 1,
                transition: 'opacity 0.3s'
              }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={(e) => e.target.style.opacity = '0.7'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div style={{
          display: window.innerWidth >= 768 ? 'none' : 'block',
          overflow: 'hidden',
          maxHeight: mobileMenuOpen ? '384px' : '0',
          opacity: mobileMenuOpen ? 1 : 0,
          transition: 'all 0.3s'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <button onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }} style={{
              padding: '0.75rem 1rem',
              textAlign: 'left',
              fontWeight: 'bold',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
              cursor: 'pointer',
              color: 'inherit',
              transition: 'background-color 0.3s'
            }} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.05)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
              HOME
            </button>
            <button onClick={() => {
              scrollToSection(productsRef);
              setMobileMenuOpen(false);
            }} style={{
              padding: '0.75rem 1rem',
              textAlign: 'left',
              fontWeight: 'bold',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
              cursor: 'pointer',
              color: 'inherit',
              transition: 'background-color 0.3s'
            }} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.05)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
              PRODUCTS
            </button>
            <button onClick={() => {
              scrollToSection(aboutRef);
              setMobileMenuOpen(false);
            }} style={{
              padding: '0.75rem 1rem',
              textAlign: 'left',
              fontWeight: 'bold',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
              cursor: 'pointer',
              color: 'inherit',
              transition: 'background-color 0.3s'
            }} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.05)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
              ABOUT US
            </button>
            <button onClick={() => {
              scrollToSection(blogRef);
              setMobileMenuOpen(false);
            }} style={{
              padding: '0.75rem 1rem',
              textAlign: 'left',
              fontWeight: 'bold',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
              transition: 'background-color 0.3s'
            }} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.05)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
              BLOG
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Slider */}
      <section ref={heroRef} style={{ position: 'relative', backgroundColor: 'black', paddingTop: '5rem', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1rem' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: index === currentSlide ? 1 : 0,
                    transform: index === currentSlide ? 'scale(1)' : 'scale(0.95)',
                    pointerEvents: index === currentSlide ? 'auto' : 'none',
                    transition: 'all 0.7s'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: index === currentSlide ? `translateY(${scrollY * 0.3}px)` : 'translateY(0)',
                    transition: 'transform 0.1s linear'
                  }}>
                    {/* <img 
                      src={slide.image} 
                      alt={`Slide ${index + 1}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain', maxWidth: '80rem', margin: '0 auto' }}
                    /> */}

                    <img
                      src={slide.image?.url || proteinGym}
                      alt={`Slide ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', maxWidth: '80rem', margin: '0 auto' }}
                    />

                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
              <button
                onClick={handlePrevSlide}
                style={{
                  width: '3rem',
                  height: '3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  color: 'white',
                  transform: hoveredButton === 'prev' ? 'scale(1.1)' : 'scale(1)'
                }}
                onMouseEnter={() => setHoveredButton('prev')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <ChevronLeft />
              </button>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      width: index === currentSlide ? '2rem' : '0.75rem',
                      height: '0.75rem',
                      borderRadius: '9999px',
                      backgroundColor: index === currentSlide ? '#facc15' : 'rgba(255,255,255,0.3)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleNextSlide}
                style={{
                  width: '3rem',
                  height: '3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  color: 'white',
                  transform: hoveredButton === 'next' ? 'scale(1.1)' : 'scale(1)'
                }}
                onMouseEnter={() => setHoveredButton('next')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <img src="/api/placeholder/150/60" alt="Mars logo" style={{ height: '4rem', transition: 'transform 0.3s' }} />
          </div>
        </div>
      </section>


      {/* ================= PRODUCTS SECTION ================= */}
      <section ref={productsRef} style={{ padding: '4rem 0', backgroundColor: '#262626', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#facc15', textAlign: 'center', marginBottom: '2rem' }}>
            FIND OUR PRODUCTS
          </h2>

          {cartMessage && (
            <p
              style={{
                textAlign: "center",
                marginBottom: "1rem",
                fontWeight: "bold",
                color: cartMessage.startsWith("✅") ? "#4ade80" : "#f87171"
              }}
            >
              {cartMessage}
            </p>
          )}


          {/* 🔥 LOADING / ERROR */}
          {loadingProducts && <p style={{ textAlign: "center", color: "#facc15" }}>Loading products...</p>}
          {productError && <p style={{ textAlign: "center", color: "red" }}>{productError}</p>}

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth >= 1024 ? 'repeat(4, 1fr)' : window.innerWidth >= 640 ? 'repeat(2, 1fr)' : '1fr',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {/* {products.map((product, index) => ( */}
            {Array.isArray(products) && products.map((product, index) => (
              <div
                key={product._id}
                style={{
                  background: 'linear-gradient(to bottom, rgba(120, 53, 15, 0.4), #262626)',
                  border: '2px solid rgba(133, 77, 14, 0.5)',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  transform: scrollY > 500 + (index * 50) && hoveredProduct !== product.id ? 'translateY(0) scale(1)' : hoveredProduct === product._id ? 'scale(1.05)' : 'translateY(100px) scale(1)',
                  opacity: scrollY > 500 + (index * 50) ? 1 : 0,
                  transition: 'all 0.5s',
                  transitionDelay: `${index * 100}ms`,
                  boxShadow: hoveredProduct === product._id ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : 'none',
                  borderColor: hoveredProduct === product._id ? '#ca8a04' : 'rgba(133, 77, 14, 0.5)'
                }}
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div style={{ position: 'relative', aspectRatio: '3/4', background: 'linear-gradient(to bottom, #92400e, #a16207, #92400e)', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '0.5rem', left: 0, right: 0, zIndex: 10, textAlign: 'center' }}>
                    {product.title && (
                      <>
                        <h3 style={{ fontSize: window.innerWidth >= 768 ? '1.5rem' : '1.25rem', fontWeight: 900, color: 'white', marginBottom: '0.25rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                          {product.title.split(' ')[0]}
                        </h3>
                        <h3 style={{ fontSize: window.innerWidth >= 768 ? '1.5rem' : '1.25rem', fontWeight: 900, color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                          {product.title.split(' ').slice(1).join(' ')}
                        </h3>
                      </>
                    )}
                    {product.brand && (
                      <div style={{ marginTop: '0.25rem' }}>
                        <span style={{ backgroundColor: '#1d4ed8', color: 'white', padding: '0.125rem 0.5rem', fontSize: '0.75rem', fontWeight: 900, fontStyle: 'italic', display: 'inline-block', transform: 'skewX(-12deg)' }}>
                          {product.brand}
                        </span>
                      </div>
                    )}
                  </div>

                  <img
                    // src={product.image}
                    src={product.images?.[0]?.url || proteinGym}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: hoveredProduct === product._id ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.5s'
                    }}
                  />

                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4rem', background: 'linear-gradient(to top, #78350f, transparent)' }} />
                </div>

                <div style={{ padding: '0.75rem', backgroundColor: '#171717' }}>
                  <h3 style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase', color: 'white' }}>{product.name}</h3>

                  <p
                    style={{
                      fontSize: "10px",
                      color: "#9ca3af",
                      marginBottom: "0.5rem"
                    }}
                  >
                    {product.description}
                  </p>

                  {/* 
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.375rem', marginBottom: '0.5rem' }}>
                    {Array.isArray(product.specs) &&
                      product.specs.map((spec, i) => (
                        <div key={i} style={{ border: '1px solid rgba(202, 138, 4, 0.5)', borderRadius: '0.25rem', padding: '0.125rem 0.375rem', fontSize: '9px', fontWeight: 'bold', textAlign: 'center', color: '#facc15' }}>
                          {spec}
                        </div>
                      ))}

                  </div> */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "0.375rem",
                      marginBottom: "0.5rem"
                    }}
                  >
                    {Array.isArray(product.highlights) &&
                      product.highlights.map((spec, i) => (
                        <div
                          key={i}
                          style={{
                            border: "1px solid rgba(202, 138, 4, 0.5)",
                            borderRadius: "0.25rem",
                            padding: "0.125rem 0.375rem",
                            fontSize: "9px",
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "#facc15"
                          }}
                        >
                          {spec}
                        </div>
                      ))}
                  </div>


                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex' }}>
                      {"★".repeat(Math.round(product.rating || 0)).split('').map((star, i) => (
                        <span key={i} style={{ color: '#facc15', fontSize: '0.75rem' }}>{star}</span>
                      ))}
                      {"☆".repeat(5 - Math.round(product.rating || 0)).split('').map((star, i) => (
                        <span key={i} style={{ color: '#4b5563', fontSize: '0.75rem' }}>{star}</span>
                      ))}
                    </div>
                    <span style={{ fontSize: '10px', color: '#9ca3af' }}>⭐ {product.numReviews || 0} Reviews</span>
                  </div>

                  {/* <div style={{ marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '10px', color: '#6b7280', textDecoration: 'line-through' }}>₹{product.originalPrice}</span>
                    <span style={{ fontSize: '10px', color: '#4ade80', marginLeft: '0.25rem' }}>{product.discountPercent > 0 && (
                      <span>{product.discountPercent}% OFF</span>
                    )}</span>
                  </div> */}

                  {product.originalPrice > product.price && (
                    <div style={{ marginBottom: "0.25rem" }}>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#6b7280",
                          textDecoration: "line-through"
                        }}
                      >
                        ₹{product.originalPrice}
                      </span>

                      <span
                        style={{
                          fontSize: "10px",
                          color: "#4ade80",
                          marginLeft: "0.25rem",
                          fontWeight: "bold"
                        }}
                      >
                        {product.discountPercent}% OFF
                      </span>
                    </div>
                  )}



                  <div style={{ fontSize: '1.125rem', fontWeight: 900, marginBottom: '0.75rem', color: 'white' }}>RS : {product.price}</div>

                  <button
                    onClick={() => handleBuyNow(product._id)}
                    style={{
                      width: '100%',
                      backgroundColor: hoveredButton === `buy-${product._id}` ? '#eab308' : '#facc15',
                      color: 'black',
                      fontWeight: 900,
                      padding: '0.5rem',
                      borderRadius: '0.25rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      fontSize: '0.75rem',
                      transform: hoveredButton === `buy-${product._id}` ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onMouseEnter={() => setHoveredButton(`buy-${product._id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* <div style={{ textAlign: 'center' }}>
            <button
              disabled={!hasNextPage || loadingProducts}
              onClick={() => fetchProducts(nextCursor)}
              style={{
                backgroundColor: hoveredButton === 'see-more' ? '#eab308' : '#facc15',
                color: 'black',
                fontWeight: 'bold',
                padding: '0.75rem 2rem',
                borderRadius: '0.25rem',
                border: 'none',
                cursor: !hasNextPage ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                transform: hoveredButton === 'see-more' ? 'scale(1.05)' : 'scale(1)',
                opacity: !hasNextPage ? 0.6 : 1
              }}
              onMouseEnter={() => setHoveredButton('see-more')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {loadingProducts
                ? "LOADING..."
                : hasNextPage
                  ? "SEE MORE →"
                  : "NO MORE PRODUCTS"}
            </button>
          </div> */}

<div style={{ textAlign: "center" }}>
  <button
    onClick={() => navigate("/products")}
    style={{
      backgroundColor: hoveredButton === "see-more" ? "#eab308" : "#facc15",
      color: "black",
      fontWeight: "bold",
      padding: "0.75rem 2rem",
      borderRadius: "0.25rem",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s",
      transform: hoveredButton === "see-more" ? "scale(1.05)" : "scale(1)"
    }}
    onMouseEnter={() => setHoveredButton("see-more")}
    onMouseLeave={() => setHoveredButton(null)}
  >
    SEE MORE →
  </button>
</div>


        </div>
      </section>

      <MotivationalSection />
      <FeaturesSection />
      <VideoShowcaseSection />

      {/* Store Locator */}
      <section style={{ padding: '4rem 0', backgroundColor: '#facc15', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
          <h2 style={{
            fontSize: window.innerWidth >= 768 ? '3.75rem' : '3rem',
            fontWeight: 900,
            color: 'black',
            marginBottom: '2rem',
            transform: scrollY > 2600 ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
            opacity: scrollY > 2600 ? 1 : 0,
            transition: 'all 0.7s'
          }}>
            FIND OUR NEAREST STORE
          </h2>
          <div style={{
            maxWidth: '48rem',
            margin: '0 auto',
            transform: scrollY > 2700 ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
            opacity: scrollY > 2700 ? 1 : 0,
            transition: 'all 0.7s'
          }}>
            <img
              src="/api/placeholder/800/300"
              alt="Store locator map"
              style={{ width: '100%', borderRadius: '0.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', transition: 'box-shadow 0.3s' }}
            />
          </div>
        </div>
      </section>

      {/* <section ref={blogRef} style={{ padding: '5rem 0', backgroundColor: 'black', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: window.innerWidth >= 768 ? '3.75rem' : '3rem', fontWeight: 900, color: '#facc15', marginBottom: '2rem' }}>BLOG</h2>
          <p style={{ color: '#d1d5db', fontSize: '1.125rem', maxWidth: '48rem', margin: '0 auto 3rem' }}>
            Stay updated with the latest news, recipes, and fitness tips from the MPACT community.
          </p>

          <h2 style={{
            fontSize: window.innerWidth >= 768 ? '6rem' : '3.75rem',
            fontWeight: 900,
            color: '#facc15',
            marginBottom: '2rem',
            transform: scrollY > 3000 ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.8)',
            opacity: scrollY > 3000 ? 1 : 0,
            transition: 'all 0.7s',
            cursor: 'default'
          }}
            onMouseEnter={(e) => e.target.style.transform = scrollY > 3000 ? 'translateY(0) scale(1.1)' : ''}
            onMouseLeave={(e) => e.target.style.transform = scrollY > 3000 ? 'translateY(0) scale(1)' : ''}>
            #GET IT NOW
          </h2>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer style={{ backgroundColor: '#171717', borderTop: '1px solid #262626', padding: '2rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth >= 768 ? 'row' : 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>MPACT</div>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#facc15'} onMouseLeave={(e) => e.target.style.color = 'white'}>PRIVACY POLICY</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#facc15'} onMouseLeave={(e) => e.target.style.color = 'white'}>TERMS OF USE</a>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.color = '#facc15'; e.target.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.target.style.color = 'white'; e.target.style.transform = 'scale(1)'; }}>FB</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.color = '#facc15'; e.target.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.target.style.color = 'white'; e.target.style.transform = 'scale(1)'; }}>TW</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.color = '#facc15'; e.target.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.target.style.color = 'white'; e.target.style.transform = 'scale(1)'; }}>IG</a>
            </div>
          </div>
        </div>
      </footer> */}
      {/* ================= EXACT FOOTER ================= */}
      <footer className="mpact-footer">
        <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Khand:wght@500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

    .mpact-footer {
      background: #3a3a3a;
      color: #ffffff;
      padding-top: 100px;
      font-family: 'Inter', sans-serif;
    }
      .social-icon {
  transition: 
    transform 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease;
}

.social-icon:hover {
  transform: scale(1.08);
  border-color: #ffeb3b;
  color: #ffeb3b;
  box-shadow: 0 0 18px rgba(255, 235, 59, 0.45);
}


    .footer-wrapper {
      max-width: 1400px;
      margin: auto;
      padding: 0 60px;
    }

    /* MAIN HEADING */
    .footer-hash {
      text-align: center;
      font-size: 96px;
      font-weight: 700;
      color: #ffeb3b;
      margin-bottom: 70px;
      letter-spacing: 2px;
      font-family: 'Khand', sans-serif;
    }

    .footer-main {
      display: grid;
      grid-template-columns: 1fr 1fr 1.2fr;
      align-items: center;
      gap: 40px;
    }

    /* LEFT LINKS */
    .footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px 60px;   /* row gap | column gap */
  font-size: 18px;
  font-weight: 500;
}


    .footer-links a {
      color: white;
      text-decoration: none;
    }

   .footer-links a {
  position: relative;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

/* underline animation */
.footer-links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0%;
  height: 2px;
  background: #ffeb3b;
  transition: width 0.3s ease;
}

.footer-links a:hover {
  color: #ffeb3b;
}

.footer-links a:hover::after {
  width: 100%;
}


    /* SOCIAL ICONS */
    .footer-social {
  display: flex;
  justify-content: center;
  gap: 26px;
}

.social-icon {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: transparent;
}


    /* SUBSCRIBE */
    .footer-subscribe h3 {
      color: #ffeb3b;
      font-size: 28px;
      margin-bottom: 10px;
      font-family: 'Khand', sans-serif;
      font-weight: 600;
    }

    .footer-subscribe p {
      font-size: 14px;
      color: #d0d0d0;
      line-height: 1.6;
      margin-bottom: 18px;
    }

    .footer-subscribe input {
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: 1px solid #ffeb3b;
      padding: 10px 0;
      color: white;
      outline: none;
      font-size: 14px;
      margin-bottom: 22px;
    }

    .footer-subscribe button {
      background: #ffeb3b;
      color: black;
      border: none;
      padding: 12px 28px;
      font-weight: 600;
      cursor: pointer;
      font-size: 14px;
      font-family: 'Khand', sans-serif;
    }

    /* DIVIDER */
    .footer-divider {
      margin-top: 80px;
      border-top: 1px solid #555;
    }

    /* BOTTOM */
    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 25px 40px;
      font-size: 13px;
      color: #cfcfcf;
    }

    .footer-logo {
      font-size: 22px;
      color: #ffeb3b;
      font-weight: 700;
      font-family: 'Khand', sans-serif;
    }

    .footer-icons {
      display: flex;
      gap: 14px;
    }

    .footer-icons span {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid #777;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      cursor: pointer;
    }

    @media (max-width: 900px) {
      .footer-main {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .footer-links {
        align-items: center;
      }

      .footer-bottom {
        flex-direction: column;
        gap: 10px;
      }
    }
  `}</style>

        <div className="footer-wrapper">
          <div className="footer-hash"># GET IT NOW</div>

          <div className="footer-main">
            {/* LINKS */}
            <div className="footer-links">
              <a href="/">Home</a>
              <a href="#">Terms & Conditions</a>

              <a href="/products">Products</a>
              <a href="#">Privacy Policy</a>

              <a href="about">About us</a>
              <a href="#">Return Policy</a>

              <a href="#">Blogs</a>
              <a href="/help">Help and Support</a>
            </div>


            {/* SOCIAL */}
            <div className="footer-social">
              <div className="social-icon">
                <Instagram size={26} strokeWidth={1.8} />
              </div>

              <div className="social-icon">
                <SiTiktok size={26} />
              </div>

              <div className="social-icon">
                <Youtube size={26} strokeWidth={1.8} />
              </div>
            </div>


            {/* SUBSCRIBE */}
            <div className="footer-subscribe">
              <h3>ENTER YOUR MAIL</h3>
              <p>
                Get Exclusive Early Access and Stay Informed About Product
                Updates, Events, and More!
              </p>
              <input type="email" placeholder="your@email.com" />
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-logo">MPACT</div>
          <div>COPYRIGHT © MPACT 2025 – ALL RIGHTS RESERVED</div>
          <div className="footer-icons">
            <span>
              <Instagram size={16} strokeWidth={1.8} />
            </span>
            <span><SiTiktok size={16} /></span>
            <span>
              <Youtube size={16} strokeWidth={1.8} />
            </span>

          </div>
        </div>
      </footer>
      {showLoginModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: "#171717",
              padding: "2rem",
              borderRadius: "0.5rem",
              textAlign: "center",
              width: "90%",
              maxWidth: "400px",
              border: "2px solid #facc15"
            }}
          >
            <h3 style={{ color: "#facc15", marginBottom: "1rem" }}>
              Login Required
            </h3>

            <p style={{ color: "#d1d5db", marginBottom: "1.5rem" }}>
              Please login to add items to your cart.
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={() => (window.location.href = "/login")}
                style={{
                  backgroundColor: "#facc15",
                  color: "black",
                  padding: "0.5rem 1.5rem",
                  border: "none",
                  borderRadius: "0.25rem",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Login
              </button>

              <button
                onClick={() => setShowLoginModal(false)}
                style={{
                  backgroundColor: "transparent",
                  color: "#facc15",
                  padding: "0.5rem 1.5rem",
                  border: "1px solid #facc15",
                  borderRadius: "0.25rem",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <WhatsAppFloat />

    </div>
  );
};

export default MPACTLandingPage;