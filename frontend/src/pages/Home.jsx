// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useNavigate } from "react-router-dom";
// // // import api from "../api/axios"
// // // import { ShoppingCart, User, Search, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
// // // import MotivationalSection from "./MotivationalSection";
// // // import VideoShowcaseSection from "./VideoShowcaseSection";
// // // import FeaturesSection from "./FeaturesSection";
// // // import proteinGym from "../assets/rrs/protein-gym.jpg";
// // // import { addToCartApi } from "../api/cartApi";
// // // import { Instagram, Youtube } from 'lucide-react';
// // // import { SiTiktok } from "react-icons/si";
// // // import WhatsAppFloat from '../components/WhatsAppFloat';
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // import Footer from "../components/Footer";
// // // import { useAuth } from "../context/AuthContext";
// // // import HomeAds from './HomeAds';
// // // import HighlightScrollBar from '../components/OfferScrollBar';
// // // import VideoCarouselSection from './Videocarouselsection';
// // // import StickyCircleSection from './RoundVideo'

// // // const MPACTLandingPage = () => {
// // //   const [currentSlide, setCurrentSlide] = useState(0);
// // //   const [scrollY, setScrollY] = useState(0);
// // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// // //   const [hoveredProduct, setHoveredProduct] = useState(null);
// // //   const [hoveredButton, setHoveredButton] = useState(null);

// // //   // Backend States
// // //   const [products, setProducts] = useState([]);
// // //   const [loadingProducts, setLoadingProducts] = useState(false);
// // //   const [productError, setProductError] = useState(null);
// // //   const [showLoginModal, setShowLoginModal] = useState(false);
// // //   const [cartMessage, setCartMessage] = useState("");
// // //   const [heroSlides, setHeroSlides] = useState([]);
// // //   const [loadingBanners, setLoadingBanners] = useState(true);
// // //   const navigate = useNavigate();
// // //   const { user, loading } = useAuth();

// // //   // Refs for scrolling
// // //   const heroRef = useRef(null);
// // //   const motivationalRef = useRef(null);
// // //   const productsRef = useRef(null);
// // //   const aboutRef = useRef(null);
// // //   const blogRef = useRef(null);

// // //   const slideIntervalRef = useRef(null);

// // //   useEffect(() => {
// // //     // ScrollTrigger refresh
// // //     const refreshTimeout = setTimeout(() => {
// // //       ScrollTrigger.refresh();
// // //     }, 100);

// // //     // Hero slider autoplay
// // //     if (heroSlides && heroSlides.length > 0) {
// // //       if (slideIntervalRef.current) {
// // //         clearInterval(slideIntervalRef.current);
// // //       }

// // //       slideIntervalRef.current = setInterval(() => {
// // //         setCurrentSlide(prev =>
// // //           prev === heroSlides.length - 1 ? 0 : prev + 1
// // //         );
// // //       }, 4000);
// // //     }

// // //     // Scroll listener
// // //     const handleScroll = () => {
// // //       setScrollY(window.scrollY);
// // //     };

// // //     // Resize listener
// // //     const handleResize = () => {
// // //       ScrollTrigger.refresh();
// // //     };

// // //     window.addEventListener("scroll", handleScroll, { passive: true });
// // //     window.addEventListener("resize", handleResize);

// // //     // Cleanup
// // //     return () => {
// // //       clearTimeout(refreshTimeout);
// // //       if (slideIntervalRef.current) {
// // //         clearInterval(slideIntervalRef.current);
// // //         slideIntervalRef.current = null;
// // //       }
// // //       window.removeEventListener("scroll", handleScroll);
// // //       window.removeEventListener("resize", handleResize);
// // //     };
// // //   }, [heroSlides]);

// // //   // Fetch products for home page
// // //   const fetchProducts = async () => {
// // //     try {
// // //       setLoadingProducts(true);
// // //       const res = await api.get("/api/products", {
// // //         params: { limit: 8 }
// // //       });
// // //       setProducts(res.data.products || []);
// // //     } catch (error) {
// // //       console.error("Failed to load products:", error);
// // //       setProductError("Failed to load products");
// // //     } finally {
// // //       setLoadingProducts(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchProducts();
// // //   }, []);

// // //   // Fetch hero banners
// // //   useEffect(() => {
// // //     const fetchHeroBanners = async () => {
// // //       try {
// // //         const res = await api.get("/api/hero-banners");
// // //         setHeroSlides(res.data || []);
// // //       } catch (error) {
// // //         console.error("Failed to load hero banners");
// // //       } finally {
// // //         setLoadingBanners(false);
// // //       }
// // //     };
// // //     fetchHeroBanners();
// // //   }, []);

// // //   const scrollToSection = (ref) => {
// // //     ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
// // //   };

// // //   const handlePrevSlide = () => {
// // //     setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));
// // //   };

// // //   const handleNextSlide = () => {
// // //     setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
// // //   };
// // //   useEffect(() => {
// // //   if (!loadingProducts && !loadingBanners) {
// // //     const handleLoad = () => {
// // //       setTimeout(() => {
// // //         ScrollTrigger.refresh();
// // //       }, 400);
// // //     };

// // //     if (document.readyState === "complete") {
// // //       handleLoad();
// // //     } else {
// // //       window.addEventListener("load", handleLoad);
// // //       return () => window.removeEventListener("load", handleLoad);
// // //     }
// // //   }
// // // }, [loadingProducts, loadingBanners]);


// // //   const handleBuyNow = (product) => {
// // //     if (loading) return;
// // //     if (!user) {
// // //       setShowLoginModal(true);
// // //       return;
// // //     }
// // //     navigate("/checkout", {
// // //       state: {
// // //         directBuy: true,
// // //         product: {
// // //           _id: product._id,
// // //           name: product.name,
// // //           price: product.price,
// // //           image: product.images?.[0]?.url,
// // //           qty: 1
// // //         }
// // //       }
// // //     });
// // //   };

// // //   return (
// // //     <div style={{
// // //       minHeight: '100vh',
// // //       backgroundColor: '#171717',
// // //       color: 'white',
// // //       overflowX: 'hidden',
// // //       fontFamily: "'Jersey 25', sans-serif"
// // //     }}>
// // //       {/* Fixed Header */}
// // //       <header style={{
// // //         position: 'fixed',
// // //         top: 0,
// // //         left: 0,
// // //         right: 0,
// // //         zIndex: 50,
// // //         backgroundColor: scrollY > 100 ? 'rgba(250, 204, 21, 0.95)' : 'rgb(250, 204, 21)',
// // //         backdropFilter: scrollY > 100 ? 'blur(10px)' : 'none',
// // //         color: 'black',
// // //         transition: 'all 0.3s'
// // //       }}>
// // //         <div style={{
// // //           maxWidth: '1280px',
// // //           margin: '0 auto',
// // //           padding: '1rem',
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           justifyContent: 'space-between'
// // //         }}>
// // //           <div style={{
// // //             fontSize: '1.875rem',
// // //             fontWeight: 'bold',
// // //             cursor: 'pointer'
// // //           }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
// // //             MPACT
// // //           </div>

// // //           {/* Desktop Navigation */}
// // //           <nav style={{
// // //             display: 'none',
// // //             gap: '2rem',
// // //             fontSize: '0.875rem',
// // //             fontWeight: 'bold',
// // //             '@media (min-width: 768px)': { display: 'flex' }
// // //           }}>
// // //             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>HOME</button>
// // //             <button onClick={() => scrollToSection(productsRef)} style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>PRODUCTS</button>
// // //             <button onClick={() => scrollToSection(aboutRef)} style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>ABOUT US</button>
// // //             <button onClick={() => scrollToSection(blogRef)} style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>BLOG</button>
// // //           </nav>

// // //           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
// // //             <button style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }}>
// // //               <Search size={20} />
// // //             </button>
// // //             <button style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }}>
// // //               <User size={20} />
// // //             </button>
// // //             <button style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }}>
// // //               <ShoppingCart size={20} />
// // //             </button>

// // //             <button
// // //               style={{
// // //                 background: 'none',
// // //                 border: 'none',
// // //                 color: 'inherit',
// // //                 cursor: 'pointer',
// // //                 display: window.innerWidth >= 768 ? 'none' : 'block'
// // //               }}
// // //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// // //             >
// // //               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Mobile Navigation Menu */}
// // //         <div style={{
// // //           display: window.innerWidth >= 768 ? 'none' : 'block',
// // //           overflow: 'hidden',
// // //           maxHeight: mobileMenuOpen ? '384px' : '0',
// // //           opacity: mobileMenuOpen ? 1 : 0,
// // //           transition: 'all 0.3s'
// // //         }}>
// // //           <nav style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
// // //             <button onClick={() => {
// // //               window.scrollTo({ top: 0, behavior: 'smooth' });
// // //               setMobileMenuOpen(false);
// // //             }} style={{
// // //               padding: '0.75rem 1rem',
// // //               textAlign: 'left',
// // //               fontWeight: 'bold',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               borderBottom: '1px solid rgba(0,0,0,0.05)',
// // //               cursor: 'pointer',
// // //               color: 'inherit'
// // //             }}>HOME</button>
// // //             <button onClick={() => {
// // //               scrollToSection(productsRef);
// // //               setMobileMenuOpen(false);
// // //             }} style={{
// // //               padding: '0.75rem 1rem',
// // //               textAlign: 'left',
// // //               fontWeight: 'bold',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               borderBottom: '1px solid rgba(0,0,0,0.05)',
// // //               cursor: 'pointer',
// // //               color: 'inherit'
// // //             }}>PRODUCTS</button>
// // //             <button onClick={() => {
// // //               scrollToSection(aboutRef);
// // //               setMobileMenuOpen(false);
// // //             }} style={{
// // //               padding: '0.75rem 1rem',
// // //               textAlign: 'left',
// // //               fontWeight: 'bold',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               borderBottom: '1px solid rgba(0,0,0,0.05)',
// // //               cursor: 'pointer',
// // //               color: 'inherit'
// // //             }}>ABOUT US</button>
// // //             <button onClick={() => {
// // //               scrollToSection(blogRef);
// // //               setMobileMenuOpen(false);
// // //             }} style={{
// // //               padding: '0.75rem 1rem',
// // //               textAlign: 'left',
// // //               fontWeight: 'bold',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               cursor: 'pointer',
// // //               color: 'inherit'
// // //             }}>BLOG</button>
// // //           </nav>
// // //         </div>
// // //       </header>

// // //       {/* Hero Slider */}
// // //       <section ref={heroRef} style={{ position: 'relative', backgroundColor: 'black', paddingTop: '5rem', overflow: 'hidden' }}>
// // //         <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1rem' }}>
// // //           <div style={{ position: 'relative' }}>
// // //             <div style={{ position: 'relative', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// // //               {heroSlides.map((slide, index) => (
// // //                 <div
// // //                   key={slide.id || index}
// // //                   style={{
// // //                     position: 'absolute',
// // //                     inset: 0,
// // //                     opacity: index === currentSlide ? 1 : 0,
// // //                     transform: index === currentSlide ? 'scale(1)' : 'scale(0.95)',
// // //                     pointerEvents: index === currentSlide ? 'auto' : 'none',
// // //                     transition: 'all 0.7s'
// // //                   }}
// // //                 >
// // //                   <div style={{
// // //                     width: '100%',
// // //                     height: '100%',
// // //                     display: 'flex',
// // //                     alignItems: 'center',
// // //                     justifyContent: 'center',
// // //                     transform: index === currentSlide ? `translateY(${scrollY * 0.3}px)` : 'translateY(0)',
// // //                     transition: 'transform 0.1s linear'
// // //                   }}>
// // //                     <img
// // //                       src={slide.image?.url || proteinGym}
// // //                       alt={`Slide ${index + 1}`}
// // //                       style={{ width: '100%', height: '100%', objectFit: 'contain', maxWidth: '80rem', margin: '0 auto' }}
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
// // //               <button
// // //                 onClick={handlePrevSlide}
// // //                 style={{
// // //                   width: '3rem',
// // //                   height: '3rem',
// // //                   display: 'flex',
// // //                   alignItems: 'center',
// // //                   justifyContent: 'center',
// // //                   backgroundColor: 'rgba(255,255,255,0.1)',
// // //                   border: 'none',
// // //                   borderRadius: '50%',
// // //                   cursor: 'pointer',
// // //                   transition: 'all 0.3s',
// // //                   color: 'white',
// // //                   transform: hoveredButton === 'prev' ? 'scale(1.1)' : 'scale(1)'
// // //                 }}
// // //                 onMouseEnter={() => setHoveredButton('prev')}
// // //                 onMouseLeave={() => setHoveredButton(null)}
// // //               >
// // //                 <ChevronLeft />
// // //               </button>

// // //               <div style={{ display: 'flex', gap: '0.5rem' }}>
// // //                 {heroSlides.map((_, index) => (
// // //                   <button
// // //                     key={index}
// // //                     onClick={() => setCurrentSlide(index)}
// // //                     style={{
// // //                       width: index === currentSlide ? '2rem' : '0.75rem',
// // //                       height: '0.75rem',
// // //                       borderRadius: '9999px',
// // //                       backgroundColor: index === currentSlide ? '#facc15' : 'rgba(255,255,255,0.3)',
// // //                       border: 'none',
// // //                       cursor: 'pointer',
// // //                       transition: 'all 0.3s'
// // //                     }}
// // //                   />
// // //                 ))}
// // //               </div>

// // //               <button
// // //                 onClick={handleNextSlide}
// // //                 style={{
// // //                   width: '3rem',
// // //                   height: '3rem',
// // //                   display: 'flex',
// // //                   alignItems: 'center',
// // //                   justifyContent: 'center',
// // //                   backgroundColor: 'rgba(255,255,255,0.1)',
// // //                   border: 'none',
// // //                   borderRadius: '50%',
// // //                   cursor: 'pointer',
// // //                   transition: 'all 0.3s',
// // //                   color: 'white',
// // //                   transform: hoveredButton === 'next' ? 'scale(1.1)' : 'scale(1)'
// // //                 }}
// // //                 onMouseEnter={() => setHoveredButton('next')}
// // //                 onMouseLeave={() => setHoveredButton(null)}
// // //               >
// // //                 <ChevronRight />
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Home Ads Section */}
// // //       <HomeAds />

// // //       {/* Products Section */}
// // //       <section
// // //         ref={productsRef}
// // //         style={{
// // //           padding: "4rem 0",
// // //           backgroundColor: "#262626",
// // //           position: "relative",
// // //           overflow: "hidden"
// // //         }}
// // //       >
// // //         <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
// // //           <h2
// // //             style={{
// // //               fontSize: "3rem",
// // //               fontWeight: 900,
// // //               color: "#facc15",
// // //               textAlign: "center",
// // //               marginBottom: "2rem"
// // //             }}
// // //           >
// // //             FIND OUR PRODUCTS
// // //           </h2>

// // //           {/* Cart Message */}
// // //           {cartMessage && (
// // //             <p
// // //               style={{
// // //                 textAlign: "center",
// // //                 marginBottom: "1rem",
// // //                 fontWeight: "bold",
// // //                 color: cartMessage.startsWith("✅") ? "#4ade80" : "#f87171"
// // //               }}
// // //             >
// // //               {cartMessage}
// // //             </p>
// // //           )}

// // //           {/* Loading / Error */}
// // //           {loadingProducts && (
// // //             <p style={{ textAlign: "center", color: "#facc15" }}>
// // //               Loading products...
// // //             </p>
// // //           )}
// // //           {productError && (
// // //             <p style={{ textAlign: "center", color: "red" }}>{productError}</p>
// // //           )}

// // //           {/* Products Grid */}
// // //           <div
// // //             style={{
// // //               display: "grid",
// // //               gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
// // //               gap: "1.25rem"
// // //             }}
// // //           >
// // //             {Array.isArray(products) && products.map((product) => (
// // //               <div
// // //                 key={product._id}
// // //                 onClick={() => navigate(`/productspec/${product._id}`)}
// // //                 style={{
// // //                   display: "flex",
// // //                   flexDirection: "column",
// // //                   height: "100%",
// // //                   background: "linear-gradient(to bottom, rgba(120,53,15,0.4), #171717)",
// // //                   border: "2px solid rgba(133,77,14,0.5)",
// // //                   borderRadius: "0.75rem",
// // //                   overflow: "hidden",
// // //                   transition: "all 0.4s ease",
// // //                   transform: hoveredProduct === product._id ? "scale(1.05)" : "scale(1)",
// // //                   opacity: 1,

// // //                   cursor: "pointer"
// // //                 }}
// // //                 onMouseEnter={() => setHoveredProduct(product._id)}
// // //                 onMouseLeave={() => setHoveredProduct(null)}
// // //               >
// // //                 {/* Image */}
// // //                 <div
// // //                   style={{
// // //                     height: "360px",
// // //                     overflow: "hidden",
// // //                     backgroundColor: "#000"
// // //                   }}
// // //                 >
// // //                   <img
// // //                     src={product.images?.[0]?.url || proteinGym}
// // //                     alt={product.name || "product"}
// // //                     loading="lazy"
// // //                     style={{
// // //                       width: "100%",
// // //                       height: "100%",
// // //                       objectFit: "cover",
// // //                       transition: "transform 0.5s ease",
// // //                       transform: hoveredProduct === product._id ? "scale(1.1)" : "scale(1)"
// // //                     }}
// // //                   />
// // //                 </div>

// // //                 {/* Content */}
// // //                 <div
// // //                   style={{
// // //                     padding: "0.75rem",
// // //                     backgroundColor: "#171717",
// // //                     display: "flex",
// // //                     flexDirection: "column",
// // //                     flexGrow: 1
// // //                   }}
// // //                 >
// // //                   {/* Title */}
// // //                   {product.title && (
// // //                     <h3
// // //                       style={{
// // //                         fontSize: "1rem",
// // //                         fontWeight: 900,
// // //                         color: "white",
// // //                         textAlign: "center",
// // //                         marginBottom: "0.25rem",
// // //                         textTransform: "uppercase"
// // //                       }}
// // //                     >
// // //                       {product.title}
// // //                     </h3>
// // //                   )}

// // //                   {/* Name */}
// // //                   <p
// // //                     style={{
// // //                       fontSize: "0.7rem",
// // //                       color: "#9ca3af",
// // //                       textAlign: "center",
// // //                       marginBottom: "0.5rem"
// // //                     }}
// // //                   >
// // //                     {product.name}
// // //                   </p>

// // //                   {/* Description */}
// // //                   <p
// // //                     style={{
// // //                       fontSize: "10px",
// // //                       color: "#9ca3af",
// // //                       marginBottom: "0.5rem"
// // //                     }}
// // //                   >
// // //                     {product.description}
// // //                   </p>

// // //                   {/* Highlights */}
// // //                   <div
// // //                     style={{
// // //                       display: "grid",
// // //                       gridTemplateColumns: "repeat(2, 1fr)",
// // //                       gap: "0.375rem",
// // //                       marginBottom: "0.5rem"
// // //                     }}
// // //                   >
// // //                     {Array.isArray(product.highlights) && product.highlights.map((item, i) => (
// // //                       <div
// // //                         key={i}
// // //                         style={{
// // //                           border: "1px solid rgba(202,138,4,0.5)",
// // //                           borderRadius: "0.25rem",
// // //                           padding: "0.125rem 0.375rem",
// // //                           fontSize: "9px",
// // //                           fontWeight: "bold",
// // //                           textAlign: "center",
// // //                           color: "#facc15"
// // //                         }}
// // //                       >
// // //                         {item}
// // //                       </div>
// // //                     ))}
// // //                   </div>

// // //                   {/* Rating */}
// // //                   <div
// // //                     style={{
// // //                       display: "flex",
// // //                       alignItems: "center",
// // //                       gap: "0.25rem",
// // //                       marginBottom: "0.5rem"
// // //                     }}
// // //                   >
// // //                     <div>
// // //                       {"★".repeat(Math.round(product.rating || 0)).split("").map((_, i) => (
// // //                         <span key={i} style={{ color: "#facc15", fontSize: "0.75rem" }}>★</span>
// // //                       ))}
// // //                       {"☆".repeat(5 - Math.round(product.rating || 0)).split("").map((_, i) => (
// // //                         <span key={i} style={{ color: "#4b5563", fontSize: "0.75rem" }}>☆</span>
// // //                       ))}
// // //                     </div>
// // //                     <span style={{ fontSize: "10px", color: "#9ca3af" }}>
// // //                       {product.numReviews || 0} Reviews
// // //                     </span>
// // //                   </div>

// // //                   {/* Price + Button */}
// // //                   <div style={{ marginTop: "auto" }}>
// // //                     {product.originalPrice > product.price && (
// // //                       <div style={{ marginBottom: "0.25rem" }}>
// // //                         <span
// // //                           style={{
// // //                             fontSize: "10px",
// // //                             color: "#6b7280",
// // //                             textDecoration: "line-through"
// // //                           }}
// // //                         >
// // //                           ₹{product.originalPrice}
// // //                         </span>
// // //                         <span
// // //                           style={{
// // //                             fontSize: "10px",
// // //                             color: "#4ade80",
// // //                             marginLeft: "0.25rem",
// // //                             fontWeight: "bold"
// // //                           }}
// // //                         >
// // //                           {product.discountPercent}% OFF
// // //                         </span>
// // //                       </div>
// // //                     )}

// // //                     <div
// // //                       style={{
// // //                         fontSize: "1.1rem",
// // //                         fontWeight: 900,
// // //                         marginBottom: "0.75rem",
// // //                         color: "white"
// // //                       }}
// // //                     >
// // //                       RS : {product.price}
// // //                     </div>

// // //                     {product.countInStock > 0 ? (
// // //                       <button
// // //                         onClick={(e) => {
// // //                           e.stopPropagation();
// // //                           handleBuyNow(product);
// // //                         }}
// // //                         style={{
// // //                           width: "100%",
// // //                           backgroundColor: "#facc15",
// // //                           color: "black",
// // //                           fontWeight: 900,
// // //                           padding: "0.5rem",
// // //                           borderRadius: "0.25rem",
// // //                           border: "none",
// // //                           cursor: "pointer",
// // //                           transition: "all 0.3s",
// // //                           fontSize: "0.75rem"
// // //                         }}
// // //                       >
// // //                         PLACE ORDER
// // //                       </button>
// // //                     ) : (
// // //                       <button
// // //                         disabled
// // //                         onClick={(e) => e.stopPropagation()}
// // //                         style={{
// // //                           width: "100%",
// // //                           backgroundColor: "#2a2a2a",
// // //                           color: "#9ca3af",
// // //                           fontWeight: 900,
// // //                           padding: "0.5rem",
// // //                           borderRadius: "0.25rem",
// // //                           border: "1px solid #555",
// // //                           cursor: "not-allowed",
// // //                           fontSize: "0.75rem",
// // //                           opacity: 0.7
// // //                         }}
// // //                       >
// // //                         OUT OF STOCK
// // //                       </button>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* See More Button */}
// // //           <div style={{ textAlign: "center" }}>
// // //             <button
// // //               onClick={() => navigate("/product")}
// // //               style={{
// // //                 backgroundColor: hoveredButton === "see-more" ? "#eab308" : "#facc15",
// // //                 color: "black",
// // //                 fontWeight: "bold",
// // //                 padding: "0.75rem 2rem",
// // //                 borderRadius: "0.25rem",
// // //                 marginTop: "20px",
// // //                 border: "none",
// // //                 cursor: "pointer",
// // //                 transition: "all 0.3s",
// // //                 transform: hoveredButton === "see-more" ? "scale(1.05)" : "scale(1)"
// // //               }}
// // //               onMouseEnter={() => setHoveredButton("see-more")}
// // //               onMouseLeave={() => setHoveredButton(null)}
// // //             >
// // //               SEE MORE →
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Highlight Scroll Bar */}
// // //       <HighlightScrollBar />

// // //       {/* Motivational Section */}
// // //       <MotivationalSection />

// // //       {/* Features Section */}
// // //       <FeaturesSection />

// // //       {/* Sticky Circle Section */}
// // //       {/* <StickyCircleSection /> */}

// // //       {/* Video Showcase Section */}
// // //       <VideoShowcaseSection />

// // //       {/* Video Carousel Section - This will now show when videos are added */}
// // //       <VideoCarouselSection />


// // //       {/* Footer */}
// // //       <Footer />

// // //       {/* Login Modal */}
// // //       {showLoginModal && (
// // //         <div
// // //           style={{
// // //             position: "fixed",
// // //             inset: 0,
// // //             backgroundColor: "rgba(0,0,0,0.7)",
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //             zIndex: 1000
// // //           }}
// // //         >
// // //           <div
// // //             style={{
// // //               backgroundColor: "#171717",
// // //               padding: "2rem",
// // //               borderRadius: "0.5rem",
// // //               textAlign: "center",
// // //               width: "90%",
// // //               maxWidth: "400px",
// // //               border: "2px solid #facc15"
// // //             }}
// // //           >
// // //             <h3 style={{ color: "#facc15", marginBottom: "1rem" }}>
// // //               Login Required
// // //             </h3>
// // //             <p style={{ color: "#d1d5db", marginBottom: "1.5rem" }}>
// // //               Please login to purchase this product.
// // //             </p>
// // //             <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
// // //               <button
// // //                 onClick={() => (window.location.href = "/login")}
// // //                 style={{
// // //                   backgroundColor: "#facc15",
// // //                   color: "black",
// // //                   padding: "0.5rem 1.5rem",
// // //                   border: "none",
// // //                   borderRadius: "0.25rem",
// // //                   fontWeight: "bold",
// // //                   cursor: "pointer"
// // //                 }}
// // //               >
// // //                 Login
// // //               </button>
// // //               <button
// // //                 onClick={() => setShowLoginModal(false)}
// // //                 style={{
// // //                   backgroundColor: "transparent",
// // //                   color: "#facc15",
// // //                   padding: "0.5rem 1.5rem",
// // //                   border: "1px solid #facc15",
// // //                   borderRadius: "0.25rem",
// // //                   fontWeight: "bold",
// // //                   cursor: "pointer"
// // //                 }}
// // //               >
// // //                 Cancel
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* WhatsApp Float Button */}
// // //       <WhatsAppFloat />
// // //     </div>
// // //   );
// // // };

// // // export default MPACTLandingPage;



// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useNavigate } from "react-router-dom";
// // // import api from "../api/axios"
// // // import { ShoppingCart, User, Search, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
// // // import MotivationalSection from "./MotivationalSection";
// // // import VideoShowcaseSection from "./VideoShowcaseSection";
// // // import FeaturesSection from "./FeaturesSection";
// // // import proteinGym from "../assets/rrs/protein-gym.jpg";
// // // import { addToCartApi } from "../api/cartApi";
// // // import { Instagram, Youtube } from 'lucide-react';
// // // import { SiTiktok } from "react-icons/si";
// // // import WhatsAppFloat from '../components/WhatsAppFloat';
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // import Footer from "../components/Footer";
// // // import { useAuth } from "../context/AuthContext";
// // // import HomeAds from './HomeAds';
// // // import HighlightScrollBar from '../components/OfferScrollBar';
// // // import VideoCarouselSection from './Videocarouselsection';
// // // import StickyCircleSection from './RoundVideo'
// // // import FuelEarnShareFloat from "../components/FuelEarnShareFloat";

// // // const MPACTLandingPage = () => {
// // //   const [currentSlide, setCurrentSlide] = useState(0);
// // //   const [scrollY, setScrollY] = useState(0);
// // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// // //   const [hoveredProduct, setHoveredProduct] = useState(null);
// // //   const [hoveredButton, setHoveredButton] = useState(null);

// // //   // Backend States
// // //   const [products, setProducts] = useState([]);
// // //   const [loadingProducts, setLoadingProducts] = useState(false);
// // //   const [productError, setProductError] = useState(null);
// // //   const [showLoginModal, setShowLoginModal] = useState(false);
// // //   const [cartMessage, setCartMessage] = useState("");
// // //   const [heroSlides, setHeroSlides] = useState([]);
// // //   const [loadingBanners, setLoadingBanners] = useState(true);
// // //   const navigate = useNavigate();
// // //   const { user, loading } = useAuth();

// // //   // Refs for scrolling
// // //   const heroRef = useRef(null);
// // //   const motivationalRef = useRef(null);
// // //   const productsRef = useRef(null);
// // //   const aboutRef = useRef(null);
// // //   const blogRef = useRef(null);

// // //   const slideIntervalRef = useRef(null);

// // //   useEffect(() => {
// // //     // ScrollTrigger refresh
// // //     const refreshTimeout = setTimeout(() => {
// // //       ScrollTrigger.refresh();
// // //     }, 100);

// // //     // Hero slider autoplay
// // //     if (heroSlides && heroSlides.length > 0) {
// // //       if (slideIntervalRef.current) {
// // //         clearInterval(slideIntervalRef.current);
// // //       }

// // //       slideIntervalRef.current = setInterval(() => {
// // //         setCurrentSlide(prev =>
// // //           prev === heroSlides.length - 1 ? 0 : prev + 1
// // //         );
// // //       }, 4000);
// // //     }

// // //     // Scroll listener
// // //     const handleScroll = () => {
// // //       setScrollY(window.scrollY);
// // //     };

// // //     // Resize listener
// // //     const handleResize = () => {
// // //       ScrollTrigger.refresh();
// // //     };

// // //     window.addEventListener("scroll", handleScroll, { passive: true });
// // //     window.addEventListener("resize", handleResize);

// // //     // Cleanup
// // //     return () => {
// // //       clearTimeout(refreshTimeout);
// // //       if (slideIntervalRef.current) {
// // //         clearInterval(slideIntervalRef.current);
// // //         slideIntervalRef.current = null;
// // //       }
// // //       window.removeEventListener("scroll", handleScroll);
// // //       window.removeEventListener("resize", handleResize);
// // //     };
// // //   }, [heroSlides]);

// // //   // Fetch products for home page
// // //   const fetchProducts = async () => {
// // //     try {
// // //       setLoadingProducts(true);
// // //       const res = await api.get("/api/products", {
// // //         params: { limit: 8 }
// // //       });
// // //       setProducts(res.data.products || []);
// // //     } catch (error) {
// // //       console.error("Failed to load products:", error);
// // //       setProductError("Failed to load products");
// // //     } finally {
// // //       setLoadingProducts(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchProducts();
// // //   }, []);

// // //   // Fetch hero banners
// // //   useEffect(() => {
// // //     const fetchHeroBanners = async () => {
// // //       try {
// // //         const res = await api.get("/api/hero-banners");
// // //         setHeroSlides(res.data || []);
// // //       } catch (error) {
// // //         console.error("Failed to load hero banners");
// // //       } finally {
// // //         setLoadingBanners(false);
// // //       }
// // //     };
// // //     fetchHeroBanners();
// // //   }, []);

// // //   const scrollToSection = (ref) => {
// // //     ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
// // //   };

// // //   const handlePrevSlide = () => {
// // //     setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));
// // //   };

// // //   const handleNextSlide = () => {
// // //     setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
// // //   };
// // //   useEffect(() => {
// // //   if (!loadingProducts && !loadingBanners) {
// // //     const handleLoad = () => {
// // //       setTimeout(() => {
// // //         ScrollTrigger.refresh();
// // //       }, 400);
// // //     };

// // //     if (document.readyState === "complete") {
// // //       handleLoad();
// // //     } else {
// // //       window.addEventListener("load", handleLoad);
// // //       return () => window.removeEventListener("load", handleLoad);
// // //     }
// // //   }
// // // }, [loadingProducts, loadingBanners]);


// // //   const handleBuyNow = (product) => {
// // //     if (loading) return;
// // //     if (!user) {
// // //       setShowLoginModal(true);
// // //       return;
// // //     }
// // //     navigate("/checkout", {
// // //       state: {
// // //         directBuy: true,
// // //         product: {
// // //           _id: product._id,
// // //           name: product.name,
// // //           price: product.price,
// // //           image: product.images?.[0]?.url,
// // //           qty: 1
// // //         }
// // //       }
// // //     });
// // //   };

// // //   return (
// // //     <div style={{
// // //       minHeight: '100vh',
// // //       backgroundColor: '#171717',
// // //       color: 'white',
// // //       overflowX: 'hidden',
// // //       fontFamily: "'Jersey 25', sans-serif"
// // //     }}>
// // //       {/* Fixed Header */}
// // //       <header style={{
// // //         position: 'fixed',
// // //         top: 0,
// // //         left: 0,
// // //         right: 0,
// // //         zIndex: 50,
// // //         backgroundColor: scrollY > 100 ? 'rgba(250, 204, 21, 0.95)' : 'rgb(250, 204, 21)',
// // //         backdropFilter: scrollY > 100 ? 'blur(10px)' : 'none',
// // //         color: 'black',
// // //         transition: 'all 0.3s'
// // //       }}>
// // //         <div style={{
// // //           maxWidth: '1280px',
// // //           margin: '0 auto',
// // //           padding: '1rem',
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           justifyContent: 'space-between'
// // //         }}>
// // //           <div style={{
// // //             fontSize: '1.875rem',
// // //             fontWeight: 'bold',
// // //             cursor: 'pointer'
// // //           }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
// // //             MPACT
// // //           </div>

// // //           {/* Desktop Navigation */}
// // //           <nav style={{
// // //             display: 'none',
// // //             gap: '2rem',
// // //             fontSize: '0.875rem',
// // //             fontWeight: 'bold',
// // //             '@media (min-width: 768px)': { display: 'flex' }
// // //           }}>
// // //             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>HOME</button>
// // //             <button onClick={() => scrollToSection(productsRef)} style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>PRODUCTS</button>
// // //             <button onClick={() => scrollToSection(aboutRef)} style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>ABOUT US</button>
// // //             <button onClick={() => scrollToSection(blogRef)} style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>BLOG</button>
// // //           </nav>

// // //           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
// // //             <button style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }}>
// // //               <Search size={20} />
// // //             </button>
// // //             <button style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }}>
// // //               <User size={20} />
// // //             </button>
// // //             <button style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }}>
// // //               <ShoppingCart size={20} />
// // //             </button>

// // //             <button
// // //               style={{
// // //                 background: 'none',
// // //                 border: 'none',
// // //                 color: 'inherit',
// // //                 cursor: 'pointer',
// // //                 display: window.innerWidth >= 768 ? 'none' : 'block'
// // //               }}
// // //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// // //             >
// // //               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Mobile Navigation Menu */}
// // //         <div style={{
// // //           display: window.innerWidth >= 768 ? 'none' : 'block',
// // //           overflow: 'hidden',
// // //           maxHeight: mobileMenuOpen ? '384px' : '0',
// // //           opacity: mobileMenuOpen ? 1 : 0,
// // //           transition: 'all 0.3s'
// // //         }}>
// // //           <nav style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
// // //             <button onClick={() => {
// // //               window.scrollTo({ top: 0, behavior: 'smooth' });
// // //               setMobileMenuOpen(false);
// // //             }} style={{
// // //               padding: '0.75rem 1rem',
// // //               textAlign: 'left',
// // //               fontWeight: 'bold',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               borderBottom: '1px solid rgba(0,0,0,0.05)',
// // //               cursor: 'pointer',
// // //               color: 'inherit'
// // //             }}>HOME</button>
// // //             <button onClick={() => {
// // //               scrollToSection(productsRef);
// // //               setMobileMenuOpen(false);
// // //             }} style={{
// // //               padding: '0.75rem 1rem',
// // //               textAlign: 'left',
// // //               fontWeight: 'bold',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               borderBottom: '1px solid rgba(0,0,0,0.05)',
// // //               cursor: 'pointer',
// // //               color: 'inherit'
// // //             }}>PRODUCTS</button>
// // //             <button onClick={() => {
// // //               scrollToSection(aboutRef);
// // //               setMobileMenuOpen(false);
// // //             }} style={{
// // //               padding: '0.75rem 1rem',
// // //               textAlign: 'left',
// // //               fontWeight: 'bold',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               borderBottom: '1px solid rgba(0,0,0,0.05)',
// // //               cursor: 'pointer',
// // //               color: 'inherit'
// // //             }}>ABOUT US</button>
// // //             <button onClick={() => {
// // //               scrollToSection(blogRef);
// // //               setMobileMenuOpen(false);
// // //             }} style={{
// // //               padding: '0.75rem 1rem',
// // //               textAlign: 'left',
// // //               fontWeight: 'bold',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               cursor: 'pointer',
// // //               color: 'inherit'
// // //             }}>BLOG</button>
// // //           </nav>
// // //         </div>
// // //       </header>

// // //       {/* Hero Slider */}
// // //    {/* Hero Slider */}
// // // <section ref={heroRef} style={{ 
// // //   position: 'relative', 
// // //   backgroundColor: 'black', 
// // //   paddingTop: '0rem', 
// // //   overflow: 'hidden',
// // //   height: 'calc(100vh - 5rem)', // Full viewport height minus header
// // //   minHeight: '600px' // Minimum height for smaller screens
// // // }}>
// // //   <div style={{ 
// // //     maxWidth: '1280px', 
// // //     margin: '0 auto', 
// // //     padding: '0', // Remove padding to allow full width
// // //     height: '100%'
// // //   }}>
// // //     <div style={{ 
// // //       position: 'relative', 
// // //       height: '100%',
// // //       width: '100%'
// // //     }}>
// // //       <div style={{ 
// // //         position: 'relative', 
// // //         height: '100%', 
// // //         width: '100%',
// // //         display: 'flex', 
// // //         alignItems: 'center', 
// // //         justifyContent: 'center',
// // //         overflow: 'hidden'
// // //       }}>
// // //         {heroSlides.map((slide, index) => (
// // //           <div
// // //             key={slide.id || index}
// // //             style={{
// // //               position: 'absolute',
// // //               inset: 0,
// // //               opacity: index === currentSlide ? 1 : 0,
// // //               transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)', // Slight scale for smoother transition
// // //               pointerEvents: index === currentSlide ? 'auto' : 'none',
// // //               transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out',
// // //               height: '100%',
// // //               width: '100%'
// // //             }}
// // //           >
// // //             <div style={{
// // //               width: '100%',
// // //               height: '100%',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               justifyContent: 'center',
// // //               // Remove or modify the parallax effect
// // //               transform: index === currentSlide ? `translateY(${scrollY * 0.1}px)` : 'translateY(0)',
// // //               transition: 'transform 0.1s linear'
// // //             }}>
// // //               <img
// // //                 src={slide.image?.url || proteinGym}
// // //                 alt={`Slide ${index + 1}`}
// // //                 style={{ 
// // //                   width: '100%', 
// // //                   height: '100%', 
// // //                   objectFit: 'cover', // Changed from 'contain' to 'cover'
// // //                   maxWidth: '100%', // Allow full width
// // //                   margin: '0 auto'
// // //                 }}
// // //               />
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Navigation buttons and indicators */}
// // //       <div style={{ 
// // //         position: 'absolute',
// // //         bottom: '2rem',
// // //         left: '50%',
// // //         transform: 'translateX(-50%)',
// // //         display: 'flex', 
// // //         alignItems: 'center', 
// // //         justifyContent: 'center', 
// // //         gap: '1rem',
// // //         zIndex: 10
// // //       }}>
// // //         <button
// // //           onClick={handlePrevSlide}
// // //           style={{
// // //             width: '3rem',
// // //             height: '3rem',
// // //             display: 'flex',
// // //             alignItems: 'center',
// // //             justifyContent: 'center',
// // //             backgroundColor: 'rgba(0,0,0,0.5)',
// // //             border: '2px solid #facc15',
// // //             borderRadius: '50%',
// // //             cursor: 'pointer',
// // //             transition: 'all 0.3s',
// // //             color: 'white',
// // //             transform: hoveredButton === 'prev' ? 'scale(1.1)' : 'scale(1)'
// // //           }}
// // //           onMouseEnter={() => setHoveredButton('prev')}
// // //           onMouseLeave={() => setHoveredButton(null)}
// // //         >
// // //           <ChevronLeft size={24} />
// // //         </button>

// // //         <div style={{ display: 'flex', gap: '0.5rem' }}>
// // //           {heroSlides.map((_, index) => (
// // //             <button
// // //               key={index}
// // //               onClick={() => setCurrentSlide(index)}
// // //               style={{
// // //                 width: index === currentSlide ? '2rem' : '0.75rem',
// // //                 height: '0.75rem',
// // //                 borderRadius: '9999px',
// // //                 backgroundColor: index === currentSlide ? '#facc15' : 'rgba(255,255,255,0.5)',
// // //                 border: index === currentSlide ? '2px solid #facc15' : '2px solid rgba(255,255,255,0.3)',
// // //                 cursor: 'pointer',
// // //                 transition: 'all 0.3s'
// // //               }}
// // //             />
// // //           ))}
// // //         </div>

// // //         <button
// // //           onClick={handleNextSlide}
// // //           style={{
// // //             width: '3rem',
// // //             height: '3rem',
// // //             display: 'flex',
// // //             alignItems: 'center',
// // //             justifyContent: 'center',
// // //             backgroundColor: 'rgba(0,0,0,0.5)',
// // //             border: '2px solid #facc15',
// // //             borderRadius: '50%',
// // //             cursor: 'pointer',
// // //             transition: 'all 0.3s',
// // //             color: 'white',
// // //             transform: hoveredButton === 'next' ? 'scale(1.1)' : 'scale(1)'
// // //           }}
// // //           onMouseEnter={() => setHoveredButton('next')}
// // //           onMouseLeave={() => setHoveredButton(null)}
// // //         >
// // //           <ChevronRight size={24} />
// // //         </button>
// // //       </div>
// // //     </div>
// // //   </div>
// // // </section>

// // //       {/* Home Ads Section */}
// // //       <HomeAds />

// // //       {/* Products Section */}
// // //       <section
// // //         ref={productsRef}
// // //         style={{
// // //           padding: "4rem 0",
// // //           backgroundColor: "#262626",
// // //           position: "relative",
// // //           overflow: "hidden"
// // //         }}
// // //       >
// // //         <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
// // //           <h2
// // //             style={{
// // //               fontSize: "3rem",
// // //               fontWeight: 900,
// // //               color: "#facc15",
// // //               textAlign: "center",
// // //               marginBottom: "2rem"
// // //             }}
// // //           >
// // //             FIND OUR PRODUCTS
// // //           </h2>

// // //           {/* Cart Message */}
// // //           {cartMessage && (
// // //             <p
// // //               style={{
// // //                 textAlign: "center",
// // //                 marginBottom: "1rem",
// // //                 fontWeight: "bold",
// // //                 color: cartMessage.startsWith("✅") ? "#4ade80" : "#f87171"
// // //               }}
// // //             >
// // //               {cartMessage}
// // //             </p>
// // //           )}

// // //           {/* Loading / Error */}
// // //           {loadingProducts && (
// // //             <p style={{ textAlign: "center", color: "#facc15" }}>
// // //               Loading products...
// // //             </p>
// // //           )}
// // //           {productError && (
// // //             <p style={{ textAlign: "center", color: "red" }}>{productError}</p>
// // //           )}

// // //           {/* Products Grid */}
// // //           <div
// // //             style={{
// // //               display: "grid",
// // //               gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
// // //               gap: "1.25rem"
// // //             }}
// // //           >
// // //             {Array.isArray(products) && products.map((product) => (
// // //               <div
// // //                 key={product._id}
// // //                 onClick={() => navigate(`/productspec/${product._id}`)}
// // //                 style={{
// // //                   display: "flex",
// // //                   flexDirection: "column",
// // //                   height: "100%",
// // //                   background: "linear-gradient(to bottom, rgba(120,53,15,0.4), #171717)",
// // //                   border: "2px solid rgba(133,77,14,0.5)",
// // //                   borderRadius: "0.75rem",
// // //                   overflow: "hidden",
// // //                   transition: "all 0.4s ease",
// // //                   transform: hoveredProduct === product._id ? "scale(1.05)" : "scale(1)",
// // //                   opacity: 1,

// // //                   cursor: "pointer"
// // //                 }}
// // //                 onMouseEnter={() => setHoveredProduct(product._id)}
// // //                 onMouseLeave={() => setHoveredProduct(null)}
// // //               >
// // //                 {/* Image */}
// // //                 <div
// // //                   style={{
// // //                     height: "360px",
// // //                     overflow: "hidden",
// // //                     backgroundColor: "#000"
// // //                   }}
// // //                 >
// // //                   <img
// // //                     src={product.images?.[0]?.url || proteinGym}
// // //                     alt={product.name || "product"}
// // //                     loading="lazy"
// // //                     style={{
// // //                       width: "100%",
// // //                       height: "100%",
// // //                       objectFit: "fill",
// // //                       transition: "transform 0.5s ease",
// // //                       transform: hoveredProduct === product._id ? "scale(1.1)" : "scale(1)"
// // //                     }}
// // //                   />
// // //                 </div>

// // //                 {/* Content */}
// // //                 <div
// // //                   style={{
// // //                     padding: "0.75rem",
// // //                     backgroundColor: "#171717",
// // //                     display: "flex",
// // //                     flexDirection: "column",
// // //                     flexGrow: 1
// // //                   }}
// // //                 >
// // //                   {/* Title */}
// // //                   {product.title && (
// // //                     <h3
// // //                       style={{
// // //                         fontSize: "1rem",
// // //                         fontWeight: 900,
// // //                         color: "white",
// // //                         textAlign: "center",
// // //                         marginBottom: "0.25rem",
// // //                         textTransform: "uppercase"
// // //                       }}
// // //                     >
// // //                       {product.title}
// // //                     </h3>
// // //                   )}

// // //                   {/* Name */}
// // //                   <p
// // //                     style={{
// // //                       fontSize: "0.7rem",
// // //                       color: "#9ca3af",
// // //                       textAlign: "center",
// // //                       marginBottom: "0.5rem"
// // //                     }}
// // //                   >
// // //                     {product.name}
// // //                   </p>

// // //                   {/* Description */}
// // //                   <p
// // //                     style={{
// // //                       fontSize: "10px",
// // //                       color: "#9ca3af",
// // //                       marginBottom: "0.5rem"
// // //                     }}
// // //                   >
// // //                     {product.description}
// // //                   </p>

// // //                   {/* Highlights */}
// // //                   <div
// // //                     style={{
// // //                       display: "grid",
// // //                       gridTemplateColumns: "repeat(2, 1fr)",
// // //                       gap: "0.375rem",
// // //                       marginBottom: "0.5rem"
// // //                     }}
// // //                   >
// // //                     {Array.isArray(product.highlights) && product.highlights.map((item, i) => (
// // //                       <div
// // //                         key={i}
// // //                         style={{
// // //                           border: "1px solid rgba(202,138,4,0.5)",
// // //                           borderRadius: "0.25rem",
// // //                           padding: "0.125rem 0.375rem",
// // //                           fontSize: "9px",
// // //                           fontWeight: "bold",
// // //                           textAlign: "center",
// // //                           color: "#facc15"
// // //                         }}
// // //                       >
// // //                         {item}
// // //                       </div>
// // //                     ))}
// // //                   </div>

// // //                   {/* Rating */}
// // //                   <div
// // //                     style={{
// // //                       display: "flex",
// // //                       alignItems: "center",
// // //                       gap: "0.25rem",
// // //                       marginBottom: "0.5rem"
// // //                     }}
// // //                   >
// // //                     <div>
// // //                       {"★".repeat(Math.round(product.rating || 0)).split("").map((_, i) => (
// // //                         <span key={i} style={{ color: "#facc15", fontSize: "0.75rem" }}>★</span>
// // //                       ))}
// // //                       {"☆".repeat(5 - Math.round(product.rating || 0)).split("").map((_, i) => (
// // //                         <span key={i} style={{ color: "#4b5563", fontSize: "0.75rem" }}>☆</span>
// // //                       ))}
// // //                     </div>
// // //                     <span style={{ fontSize: "10px", color: "#9ca3af" }}>
// // //                       {product.numReviews || 0} Reviews
// // //                     </span>
// // //                   </div>

// // //                   {/* Price + Button */}
// // //                   <div style={{ marginTop: "auto" }}>
// // //                     {product.originalPrice > product.price && (
// // //                       <div style={{ marginBottom: "0.25rem" }}>
// // //                         <span
// // //                           style={{
// // //                             fontSize: "10px",
// // //                             color: "#6b7280",
// // //                             textDecoration: "line-through"
// // //                           }}
// // //                         >
// // //                           ₹{product.originalPrice}
// // //                         </span>
// // //                         <span
// // //                           style={{
// // //                             fontSize: "10px",
// // //                             color: "#4ade80",
// // //                             marginLeft: "0.25rem",
// // //                             fontWeight: "bold"
// // //                           }}
// // //                         >
// // //                           {product.discountPercent}% OFF
// // //                         </span>
// // //                       </div>
// // //                     )}

// // //                     <div
// // //                       style={{
// // //                         fontSize: "1.1rem",
// // //                         fontWeight: 900,
// // //                         marginBottom: "0.75rem",
// // //                         color: "white"
// // //                       }}
// // //                     >
// // //                       RS : {product.price}
// // //                     </div>

// // //                     {product.countInStock > 0 ? (
// // //                       <button
// // //                         onClick={(e) => {
// // //                           e.stopPropagation();
// // //                           handleBuyNow(product);
// // //                         }}
// // //                         style={{
// // //                           width: "100%",
// // //                           backgroundColor: "#facc15",
// // //                           color: "black",
// // //                           fontWeight: 900,
// // //                           padding: "0.5rem",
// // //                           borderRadius: "0.25rem",
// // //                           border: "none",
// // //                           cursor: "pointer",
// // //                           transition: "all 0.3s",
// // //                           fontSize: "0.75rem"
// // //                         }}
// // //                       >
// // //                         PLACE ORDER
// // //                       </button>
// // //                     ) : (
// // //                       <button
// // //                         disabled
// // //                         onClick={(e) => e.stopPropagation()}
// // //                         style={{
// // //                           width: "100%",
// // //                           backgroundColor: "#2a2a2a",
// // //                           color: "#9ca3af",
// // //                           fontWeight: 900,
// // //                           padding: "0.5rem",
// // //                           borderRadius: "0.25rem",
// // //                           border: "1px solid #555",
// // //                           cursor: "not-allowed",
// // //                           fontSize: "0.75rem",
// // //                           opacity: 0.7
// // //                         }}
// // //                       >
// // //                         OUT OF STOCK
// // //                       </button>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* See More Button */}
// // //           <div style={{ textAlign: "center" }}>
// // //             <button
// // //               onClick={() => navigate("/product")}
// // //               style={{
// // //                 backgroundColor: hoveredButton === "see-more" ? "#eab308" : "#facc15",
// // //                 color: "black",
// // //                 fontWeight: "bold",
// // //                 padding: "0.75rem 2rem",
// // //                 borderRadius: "0.25rem",
// // //                 marginTop: "20px",
// // //                 border: "none",
// // //                 cursor: "pointer",
// // //                 transition: "all 0.3s",
// // //                 transform: hoveredButton === "see-more" ? "scale(1.05)" : "scale(1)"
// // //               }}
// // //               onMouseEnter={() => setHoveredButton("see-more")}
// // //               onMouseLeave={() => setHoveredButton(null)}
// // //             >
// // //               SEE MORE →
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Highlight Scroll Bar */}
// // //       <HighlightScrollBar />

// // //       {/* Motivational Section */}
// // //       <MotivationalSection />

// // //       {/* Features Section */}
// // //       <FeaturesSection />

// // //       {/* Sticky Circle Section */}
// // //       {/* <StickyCircleSection /> */}

// // //       {/* Video Showcase Section */}
// // //       <VideoShowcaseSection />

// // //       {/* Video Carousel Section - This will now show when videos are added */}
// // //       <VideoCarouselSection />


// // //       {/* Footer */}
// // //       <Footer />

// // //       {/* Login Modal */}
// // //       {showLoginModal && (
// // //         <div
// // //           style={{
// // //             position: "fixed",
// // //             inset: 0,
// // //             backgroundColor: "rgba(0,0,0,0.7)",
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //             zIndex: 1000
// // //           }}
// // //         >
// // //           <div
// // //             style={{
// // //               backgroundColor: "#171717",
// // //               padding: "2rem",
// // //               borderRadius: "0.5rem",
// // //               textAlign: "center",
// // //               width: "90%",
// // //               maxWidth: "400px",
// // //               border: "2px solid #facc15"
// // //             }}
// // //           >
// // //             <h3 style={{ color: "#facc15", marginBottom: "1rem" }}>
// // //               Login Required
// // //             </h3>
// // //             <p style={{ color: "#d1d5db", marginBottom: "1.5rem" }}>
// // //               Please login to purchase this product.
// // //             </p>
// // //             <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
// // //               <button
// // //                 onClick={() => (window.location.href = "/login")}
// // //                 style={{
// // //                   backgroundColor: "#facc15",
// // //                   color: "black",
// // //                   padding: "0.5rem 1.5rem",
// // //                   border: "none",
// // //                   borderRadius: "0.25rem",
// // //                   fontWeight: "bold",
// // //                   cursor: "pointer"
// // //                 }}
// // //               >
// // //                 Login
// // //               </button>
// // //               <button
// // //                 onClick={() => setShowLoginModal(false)}
// // //                 style={{
// // //                   backgroundColor: "transparent",
// // //                   color: "#facc15",
// // //                   padding: "0.5rem 1.5rem",
// // //                   border: "1px solid #facc15",
// // //                   borderRadius: "0.25rem",
// // //                   fontWeight: "bold",
// // //                   cursor: "pointer"
// // //                 }}
// // //               >
// // //                 Cancel
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <FuelEarnShareFloat />

// // //       {/* WhatsApp Float Button */}
// // //       <WhatsAppFloat />
// // //     </div>
// // //   );
// // // };

// // // export default MPACTLandingPage;



// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useNavigate } from "react-router-dom";
// // // import api from "../api/axios"
// // // import { ShoppingCart, User, Search, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
// // // import MotivationalSection from "./MotivationalSection";
// // // import VideoShowcaseSection from "./VideoShowcaseSection";
// // // import FeaturesSection from "./FeaturesSection";
// // // import proteinGym from "../assets/rrs/protein-gym.jpg";
// // // import { addToCartApi } from "../api/cartApi";
// // // import { Instagram, Youtube } from 'lucide-react';
// // // import { SiTiktok } from "react-icons/si";
// // // import WhatsAppFloat from '../components/WhatsAppFloat';
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // import Footer from "../components/Footer";
// // // import { useAuth } from "../context/AuthContext";
// // // import HomeAds from './HomeAds';
// // // import HighlightScrollBar from '../components/OfferScrollBar';
// // // import VideoCarouselSection from './Videocarouselsection';
// // // import StickyCircleSection from './RoundVideo'
// // // import FuelEarnShareFloat from "../components/FuelEarnShareFloat";

// // // const MPACTLandingPage = () => {
// // //   const [currentSlide, setCurrentSlide] = useState(0);
// // //   const [scrollY, setScrollY] = useState(0);
// // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// // //   const [hoveredProduct, setHoveredProduct] = useState(null);
// // //   const [hoveredButton, setHoveredButton] = useState(null);
// // //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
// // //   const [expandedDesc, setExpandedDesc] = useState({});

// // //   // Backend States
// // //   const [products, setProducts] = useState([]);
// // //   const [loadingProducts, setLoadingProducts] = useState(false);
// // //   const [productError, setProductError] = useState(null);
// // //   const [showLoginModal, setShowLoginModal] = useState(false);
// // //   const [cartMessage, setCartMessage] = useState("");
// // //   const [heroSlides, setHeroSlides] = useState([]);
// // //   const [loadingBanners, setLoadingBanners] = useState(true);
// // //   const navigate = useNavigate();
// // //   const { user, loading } = useAuth();

// // //   // Refs for scrolling
// // //   const heroRef = useRef(null);
// // //   const motivationalRef = useRef(null);
// // //   const productsRef = useRef(null);
// // //   const aboutRef = useRef(null);
// // //   const blogRef = useRef(null);

// // //   const slideIntervalRef = useRef(null);

// // //   useEffect(() => {
// // //     // ScrollTrigger refresh
// // //     const refreshTimeout = setTimeout(() => {
// // //       ScrollTrigger.refresh();
// // //     }, 100);

// // //     // Hero slider autoplay
// // //     if (heroSlides && heroSlides.length > 0) {
// // //       if (slideIntervalRef.current) {
// // //         clearInterval(slideIntervalRef.current);
// // //       }

// // //       slideIntervalRef.current = setInterval(() => {
// // //         setCurrentSlide(prev =>
// // //           prev === heroSlides.length - 1 ? 0 : prev + 1
// // //         );
// // //       }, 4000);
// // //     }

// // //     // Scroll listener
// // //     const handleScroll = () => {
// // //       setScrollY(window.scrollY);
// // //     };

// // //     // Resize listener
// // //     const handleResize = () => {
// // //       setIsMobile(window.innerWidth < 768);
// // //       ScrollTrigger.refresh();
// // //     };

// // //     window.addEventListener("scroll", handleScroll, { passive: true });
// // //     window.addEventListener("resize", handleResize);

// // //     // Cleanup
// // //     return () => {
// // //       clearTimeout(refreshTimeout);
// // //       if (slideIntervalRef.current) {
// // //         clearInterval(slideIntervalRef.current);
// // //         slideIntervalRef.current = null;
// // //       }
// // //       window.removeEventListener("scroll", handleScroll);
// // //       window.removeEventListener("resize", handleResize);
// // //     };
// // //   }, [heroSlides]);

// // //   // Fetch products for home page
// // //   const fetchProducts = async () => {
// // //     try {
// // //       setLoadingProducts(true);
// // //       const res = await api.get("/api/products", {
// // //         params: { limit: 8 }
// // //       });
// // //       setProducts(res.data.products || []);
// // //     } catch (error) {
// // //       console.error("Failed to load products:", error);
// // //       setProductError("Failed to load products");
// // //     } finally {
// // //       setLoadingProducts(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchProducts();
// // //   }, []);

// // //   // Fetch hero banners
// // //   useEffect(() => {
// // //     const fetchHeroBanners = async () => {
// // //       try {
// // //         const res = await api.get("/api/hero-banners");
// // //         setHeroSlides(res.data || []);
// // //       } catch (error) {
// // //         console.error("Failed to load hero banners");
// // //       } finally {
// // //         setLoadingBanners(false);
// // //       }
// // //     };
// // //     fetchHeroBanners();
// // //   }, []);

// // //   const scrollToSection = (ref) => {
// // //     ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
// // //   };

// // //   // const handlePrevSlide = () => {
// // //   //   setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));
// // //   // };

// // //   // const handleNextSlide = () => {
// // //   //   setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
// // //   // };
// // //   useEffect(() => {
// // //     if (!loadingProducts && !loadingBanners) {
// // //       const handleLoad = () => {
// // //         setTimeout(() => {
// // //           ScrollTrigger.refresh();
// // //         }, 400);
// // //       };

// // //       if (document.readyState === "complete") {
// // //         handleLoad();
// // //       } else {
// // //         window.addEventListener("load", handleLoad);
// // //         return () => window.removeEventListener("load", handleLoad);
// // //       }
// // //     }
// // //   }, [loadingProducts, loadingBanners]);


// // //   const handleBuyNow = (product) => {
// // //     if (loading) return;
// // //     if (!user) {
// // //       setShowLoginModal(true);
// // //       return;
// // //     }
// // //     navigate("/checkout", {
// // //       state: {
// // //         directBuy: true,
// // //         product: {
// // //           _id: product._id,
// // //           name: product.name,
// // //           price: product.price,
// // //           image: product.images?.[0]?.url,
// // //           qty: 1
// // //         }
// // //       }
// // //     });
// // //   };

// // //   return (
// // //     <div style={{
// // //       minHeight: '100vh',
// // //       backgroundColor: '#171717',
// // //       color: 'white',
// // //       overflowX: 'hidden',
// // //       // paddingTop: '5rem', // Add padding for fixed header
// // //       fontFamily: "'Jersey 25', sans-serif"
// // //     }}>
// // //       {/* Fixed Header */}
// // //       <header style={{
// // //         position: 'fixed',
// // //         top: 0,
// // //         left: 0,
// // //         right: 0,
// // //         zIndex: 50,
// // //         backgroundColor: isMobile ? 'rgb(250, 204, 21)' : (scrollY > 100 ? 'rgba(250, 204, 21, 0.95)' : 'rgb(250, 204, 21)'),
// // //         backdropFilter: (isMobile || scrollY > 100) ? 'blur(10px)' : 'none',
// // //         color: 'black',
// // //         transition: 'all 0.3s'
// // //       }}>
// // //         <div style={{
// // //           maxWidth: '1280px',
// // //           margin: '0 auto',
// // //           padding: '1rem',
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           justifyContent: 'space-between'
// // //         }}>
// // //           <div style={{
// // //             fontSize: isMobile ? '1.5rem' : '1.875rem',
// // //             fontWeight: 'bold',
// // //             cursor: 'pointer'
// // //           }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
// // //             MPACT
// // //           </div>

// // //           {/* Desktop Navigation */}
// // //           <nav style={{
// // //             display: isMobile ? 'none' : 'flex',
// // //             gap: '2rem',
// // //             fontSize: '0.875rem',
// // //             fontWeight: 'bold'
// // //           }}>
// // //             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>HOME</button>
// // //             <button onClick={() => scrollToSection(productsRef)} style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>PRODUCTS</button>
// // //             <button onClick={() => scrollToSection(aboutRef)} style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>ABOUT US</button>
// // //             <button onClick={() => scrollToSection(blogRef)} style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>BLOG</button>
// // //           </nav>

// // //           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
// // //             <button style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }}>
// // //               <Search size={20} />
// // //             </button>
// // //             <button style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }}>
// // //               <User size={20} />
// // //             </button>
// // //             <button style={{
// // //               background: 'none',
// // //               border: 'none',
// // //               color: 'inherit',
// // //               cursor: 'pointer'
// // //             }}>
// // //               <ShoppingCart size={20} />
// // //             </button>

// // //             <button
// // //               style={{
// // //                 background: 'none',
// // //                 border: 'none',
// // //                 color: 'inherit',
// // //                 cursor: 'pointer',
// // //                 display: isMobile ? 'block' : 'none'
// // //               }}
// // //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// // //             >
// // //               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Mobile Navigation Menu */}
// // //         <div style={{
// // //           display: isMobile ? 'block' : 'none',
// // //           overflow: 'hidden',
// // //           maxHeight: mobileMenuOpen ? '384px' : '0',
// // //           opacity: mobileMenuOpen ? 1 : 0,
// // //           transition: 'all 0.3s'
// // //         }}>
// // //           <nav style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
// // //             <button onClick={() => {
// // //               window.scrollTo({ top: 0, behavior: 'smooth' });
// // //               setMobileMenuOpen(false);
// // //             }} style={{
// // //               padding: '0.75rem 1rem',
// // //               textAlign: 'left',
// // //               fontWeight: 'bold',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               borderBottom: '1px solid rgba(0,0,0,0.05)',
// // //               cursor: 'pointer',
// // //               color: 'inherit'
// // //             }}>HOME</button>
// // //             <button onClick={() => {
// // //               scrollToSection(productsRef);
// // //               setMobileMenuOpen(false);
// // //             }} style={{
// // //               padding: '0.75rem 1rem',
// // //               textAlign: 'left',
// // //               fontWeight: 'bold',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               borderBottom: '1px solid rgba(0,0,0,0.05)',
// // //               cursor: 'pointer',
// // //               color: 'inherit'
// // //             }}>PRODUCTS</button>
// // //             <button onClick={() => {
// // //               scrollToSection(aboutRef);
// // //               setMobileMenuOpen(false);
// // //             }} style={{
// // //               padding: '0.75rem 1rem',
// // //               textAlign: 'left',
// // //               fontWeight: 'bold',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               borderBottom: '1px solid rgba(0,0,0,0.05)',
// // //               cursor: 'pointer',
// // //               color: 'inherit'
// // //             }}>ABOUT US</button>
// // //             <button onClick={() => {
// // //               scrollToSection(blogRef);
// // //               setMobileMenuOpen(false);
// // //             }} style={{
// // //               padding: '0.75rem 1rem',
// // //               textAlign: 'left',
// // //               fontWeight: 'bold',
// // //               background: 'transparent',
// // //               border: 'none',
// // //               cursor: 'pointer',
// // //               color: 'inherit'
// // //             }}>BLOG</button>
// // //           </nav>
// // //         </div>
// // //       </header>

// // //       {/* Hero Slider */}
// // //       {/* Hero Slider */}
// // //       <section ref={heroRef} style={{
// // //         position: 'relative',
// // //         backgroundColor: 'black',
// // //         paddingTop: '0rem',
// // //         overflow: 'hidden',
// // //         height: isMobile ? '50vh' : 'calc(100vh - 5rem)', // Shorter on mobile
// // //         minHeight: isMobile ? '300px' : '600px'
// // //       }}>
// // //         <div style={{
// // //           width: '100%',
// // //           margin: '0',
// // //           padding: '0',
// // //           height: '100%'
// // //         }}>
// // //           <div style={{
// // //             position: 'relative',
// // //             height: '100%',
// // //             width: '100%'
// // //           }}>
// // //             <div style={{
// // //               position: 'relative',
// // //               height: '100%',
// // //               width: '100%',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               justifyContent: 'center',
// // //               overflow: 'hidden'
// // //             }}>
// // //               {heroSlides.map((slide, index) => (
// // //                 <div
// // //                   key={slide.id || index}
// // //                   style={{
// // //                     position: 'absolute',
// // //                     inset: 0,
// // //                     opacity: index === currentSlide ? 1 : 0,
// // //                     transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)', // Slight scale for smoother transition
// // //                     pointerEvents: index === currentSlide ? 'auto' : 'none',
// // //                     transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out',
// // //                     height: '100%',
// // //                     width: '100%'
// // //                   }}
// // //                 >
// // //                   {/* <div style={{
// // //                     width: '100%',
// // //                     height: '100%',
// // //                     display: 'flex',
// // //                     alignItems: 'center',
// // //                     justifyContent: 'center',
// // //                     // Remove or modify the parallax effect
// // //                     transform: index === currentSlide ? `translateY(${scrollY * 0.1}px)` : 'translateY(0)',
// // //                     transition: 'transform 0.1s linear'
// // //                   }}>
// // //                     <img
// // //                       src={slide.image?.url || proteinGym}
// // //                       alt={`Slide ${index + 1}`}
// // //                       style={{
// // //                         width: '100%',
// // //                         height: '100%',
// // //                         objectFit: 'cover',
// // //                         maxWidth: '100%',
// // //                         display: 'block',
// // //                         margin: '0'
// // //                       }}
// // //                     />
// // //                   </div> */}

// // //                   <div style={{
// // //                     width: '100%',
// // //                     height: '100%',
// // //                     display: 'flex',
// // //                     alignItems: 'center',
// // //                     justifyContent: 'center',
// // //                     transform: index === currentSlide ? `translateY(${scrollY * 0.1}px)` : 'translateY(0)',
// // //                     transition: 'transform 0.1s linear'
// // //                   }}>
// // //                     {slide.mediaType === 'video' ? (
// // //                       <video
// // //                         src={slide.video?.url}
// // //                         autoPlay
// // //                         muted
// // //                         loop
// // //                         playsInline
// // //                         style={{
// // //                           width: '100%',
// // //                           height: '100%',
// // //                           objectFit: 'cover',
// // //                           maxWidth: '100%',
// // //                           margin: '0 auto'
// // //                         }}
// // //                       />
// // //                     ) : (
// // //                       <img
// // //                         src={slide.image?.url || proteinGym}
// // //                         alt={`Slide ${index + 1}`}
// // //                         style={{
// // //                           width: '100%',
// // //                           height: '100%',
// // //                           objectFit: 'cover',
// // //                           maxWidth: '100%',
// // //                           margin: '0 auto'
// // //                         }}
// // //                       />
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             {/* Navigation buttons and indicators */}
// // //             {/* <div style={{
// // //               position: 'absolute',
// // //               bottom: isMobile ? '1rem' : '2rem',
// // //               left: '50%',
// // //               transform: 'translateX(-50%)',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               justifyContent: 'center',
// // //               gap: isMobile ? '0.5rem' : '1rem',
// // //               zIndex: 10
// // //             }}>
// // //               <button
// // //                 onClick={handlePrevSlide}
// // //                 style={{
// // //                   width: isMobile ? '2rem' : '3rem',
// // //                   height: isMobile ? '2rem' : '3rem',
// // //                   display: 'flex',
// // //                   alignItems: 'center',
// // //                   justifyContent: 'center',
// // //                   backgroundColor: 'rgba(0,0,0,0.5)',
// // //                   border: '2px solid #facc15',
// // //                   borderRadius: '50%',
// // //                   cursor: 'pointer',
// // //                   transition: 'all 0.3s',
// // //                   color: 'white',
// // //                   transform: hoveredButton === 'prev' ? 'scale(1.1)' : 'scale(1)'
// // //                 }}
// // //                 onMouseEnter={() => setHoveredButton('prev')}
// // //                 onMouseLeave={() => setHoveredButton(null)}
// // //               >
// // //                 <ChevronLeft size={isMobile ? 18 : 24} />
// // //               </button>

// // //               <div style={{ display: 'flex', gap: '0.5rem' }}>
// // //                 {heroSlides.map((_, index) => (
// // //                   <button
// // //                     key={index}
// // //                     onClick={() => setCurrentSlide(index)}
// // //                     style={{
// // //                       width: index === currentSlide ? (isMobile ? '1.5rem' : '2rem') : '0.75rem',
// // //                       height: '0.75rem',
// // //                       borderRadius: '9999px',
// // //                       backgroundColor: index === currentSlide ? '#facc15' : 'rgba(255,255,255,0.5)',
// // //                       border: index === currentSlide ? '2px solid #facc15' : '2px solid rgba(255,255,255,0.3)',
// // //                       cursor: 'pointer',
// // //                       transition: 'all 0.3s'
// // //                     }}
// // //                   />
// // //                 ))}
// // //               </div>

// // //               <button
// // //                 onClick={handleNextSlide}
// // //                 style={{
// // //                   width: isMobile ? '2rem' : '3rem',
// // //                   height: isMobile ? '2rem' : '3rem',
// // //                   display: 'flex',
// // //                   alignItems: 'center',
// // //                   justifyContent: 'center',
// // //                   backgroundColor: 'rgba(0,0,0,0.5)',
// // //                   border: '2px solid #facc15',
// // //                   borderRadius: '50%',
// // //                   cursor: 'pointer',
// // //                   transition: 'all 0.3s',
// // //                   color: 'white',
// // //                   transform: hoveredButton === 'next' ? 'scale(1.1)' : 'scale(1)'
// // //                 }}
// // //                 onMouseEnter={() => setHoveredButton('next')}
// // //                 onMouseLeave={() => setHoveredButton(null)}
// // //               >
// // //                 <ChevronRight size={isMobile ? 18 : 24} />
// // //               </button>
// // //             </div> */}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Home Ads Section */}
// // //       <HomeAds />

// // //       {/* Products Section */}
// // //       <section
// // //         ref={productsRef}
// // //         style={{
// // //           padding: "4rem 0",
// // //           backgroundColor: "#262626",
// // //           position: "relative",
// // //           overflow: "hidden"
// // //         }}
// // //       >
// // //         <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
// // //           <h2
// // //             style={{
// // //               fontSize: isMobile ? "2rem" : "3rem",
// // //               fontWeight: 900,
// // //               color: "#facc15",
// // //               textAlign: "center",
// // //               marginBottom: "2rem"
// // //             }}
// // //           >
// // //             FIND OUR PRODUCTS
// // //           </h2>

// // //           {/* Cart Message */}
// // //           {cartMessage && (
// // //             <p
// // //               style={{
// // //                 textAlign: "center",
// // //                 marginBottom: "1rem",
// // //                 fontWeight: "bold",
// // //                 color: cartMessage.startsWith("✅") ? "#4ade80" : "#f87171"
// // //               }}
// // //             >
// // //               {cartMessage}
// // //             </p>
// // //           )}

// // //           {/* Loading / Error */}
// // //           {loadingProducts && (
// // //             <p style={{ textAlign: "center", color: "#facc15" }}>
// // //               Loading products...
// // //             </p>
// // //           )}
// // //           {productError && (
// // //             <p style={{ textAlign: "center", color: "red" }}>{productError}</p>
// // //           )}

// // //           {/* Products Grid */}
// // //           <div
// // //             style={{
// // //               display: "grid",
// // //               gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(260px, 1fr))",
// // //               gap: "1.25rem"
// // //             }}
// // //           >
// // //             {Array.isArray(products) && products.map((product) => (
// // //               <div
// // //                 key={product._id}
// // //                 onClick={() => navigate(`/productspec/${product._id}`)}
// // //                 style={{
// // //                   display: "flex",
// // //                   flexDirection: "column",
// // //                   height: "100%",
// // //                   background: "linear-gradient(to bottom, rgba(120,53,15,0.4), #171717)",
// // //                   border: "2px solid rgba(133,77,14,0.5)",
// // //                   borderRadius: "0.75rem",
// // //                   overflow: "hidden",
// // //                   transition: "all 0.4s ease",
// // //                   transform: hoveredProduct === product._id ? "scale(1.05)" : "scale(1)",
// // //                   opacity: 1,

// // //                   cursor: "pointer"
// // //                 }}
// // //                 onMouseEnter={() => setHoveredProduct(product._id)}
// // //                 onMouseLeave={() => setHoveredProduct(null)}
// // //               >
// // //                 {/* Image */}
// // //                 <div
// // //                   style={{
// // //                     height: isMobile ? "150px" : "360px",
// // //                     overflow: "hidden",
// // //                     backgroundColor: "#000"
// // //                   }}
// // //                 >
// // //                   <img
// // //                     src={product.images?.[0]?.url || proteinGym}
// // //                     alt={product.name || "product"}
// // //                     loading="lazy"
// // //                     style={{
// // //                       width: "100%",
// // //                       height: "100%",
// // //                       objectFit: "cover",
// // //                       transition: "transform 0.5s ease",
// // //                       transform: hoveredProduct === product._id ? "scale(1.1)" : "scale(1)"
// // //                     }}
// // //                   />
// // //                 </div>

// // //                 {/* Content */}
// // //                 <div
// // //                   style={{
// // //                     padding: "0.75rem",
// // //                     backgroundColor: "#171717",
// // //                     display: "flex",
// // //                     flexDirection: "column",
// // //                     flexGrow: 1
// // //                   }}
// // //                 >
// // //                   {/* Title */}
// // //                   {product.title && (
// // //                     <h3
// // //                       style={{
// // //                         fontSize: "1rem",
// // //                         fontWeight: 900,
// // //                         color: "white",
// // //                         textAlign: "center",
// // //                         marginBottom: "0.25rem",
// // //                         textTransform: "uppercase"
// // //                       }}
// // //                     >
// // //                       {product.title}
// // //                     </h3>
// // //                   )}

// // //                   {/* Name */}
// // //                   <p
// // //                     style={{
// // //                       fontSize: "0.7rem",
// // //                       color: "#9ca3af",
// // //                       textAlign: "center",
// // //                       marginBottom: "0.5rem"
// // //                     }}
// // //                   >
// // //                     {product.name}
// // //                   </p>

// // //                   {/* Description */}
// // //                   {(() => {
// // //                     const isLong = isMobile && product.description?.length > 60;
// // //                     const isExpanded = expandedDesc[product._id];
// // //                     return (
// // //                       <p style={{ fontSize: "10px", color: "#9ca3af", marginBottom: "0.5rem" }}>
// // //                         {isLong && !isExpanded
// // //                           ? product.description.slice(0, 30) + "..."
// // //                           : product.description}
// // //                         {isLong && (
// // //                           <span
// // //                             onClick={(e) => {
// // //                               e.stopPropagation();
// // //                               setExpandedDesc((prev) => ({
// // //                                 ...prev,
// // //                                 [product._id]: !prev[product._id]
// // //                               }));
// // //                             }}
// // //                             style={{
// // //                               color: "#facc15",
// // //                               cursor: "pointer",
// // //                               fontWeight: "bold",
// // //                               marginLeft: "4px"
// // //                             }}
// // //                           >
// // //                             {isExpanded ? " See less" : " See more"}
// // //                           </span>
// // //                         )}
// // //                       </p>
// // //                     );
// // //                   })()}

// // //                   {/* Highlights */}
// // //                   {!isMobile && (
// // //                     <div
// // //                       style={{
// // //                         display: "grid",
// // //                         gridTemplateColumns: "repeat(2, 1fr)",
// // //                         gap: "0.375rem",
// // //                         marginBottom: "0.5rem"
// // //                       }}
// // //                     >
// // //                       {Array.isArray(product.highlights) && product.highlights.map((item, i) => (
// // //                         <div
// // //                           key={i}
// // //                           style={{
// // //                             border: "1px solid rgba(202,138,4,0.5)",
// // //                             borderRadius: "0.25rem",
// // //                             padding: "0.125rem 0.375rem",
// // //                             fontSize: "9px",
// // //                             fontWeight: "bold",
// // //                             textAlign: "center",
// // //                             color: "#facc15"
// // //                           }}
// // //                         >
// // //                           {item}
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   )}

// // //                   {/* Rating */}
// // //                   <div
// // //                     style={{
// // //                       display: "flex",
// // //                       alignItems: "center",
// // //                       gap: "0.25rem",
// // //                       marginBottom: "0.5rem"
// // //                     }}
// // //                   >
// // //                     <div>
// // //                       {"★".repeat(Math.round(product.rating || 0)).split("").map((_, i) => (
// // //                         <span key={i} style={{ color: "#facc15", fontSize: "0.75rem" }}>★</span>
// // //                       ))}
// // //                       {"☆".repeat(5 - Math.round(product.rating || 0)).split("").map((_, i) => (
// // //                         <span key={i} style={{ color: "#4b5563", fontSize: "0.75rem" }}>☆</span>
// // //                       ))}
// // //                     </div>
// // //                     <span style={{ fontSize: "10px", color: "#9ca3af" }}>
// // //                       {product.numReviews || 0} Reviews
// // //                     </span>
// // //                   </div>

// // //                   {/* Price + Button */}
// // //                   <div style={{ marginTop: "auto" }}>
// // //                     {product.originalPrice > product.price && (
// // //                       <div style={{ marginBottom: "0.25rem" }}>
// // //                         <span
// // //                           style={{
// // //                             fontSize: "10px",
// // //                             color: "#6b7280",
// // //                             textDecoration: "line-through"
// // //                           }}
// // //                         >
// // //                           ₹{product.originalPrice}
// // //                         </span>
// // //                         <span
// // //                           style={{
// // //                             fontSize: "10px",
// // //                             color: "#4ade80",
// // //                             marginLeft: "0.25rem",
// // //                             fontWeight: "bold"
// // //                           }}
// // //                         >
// // //                           {product.discountPercent}% OFF
// // //                         </span>
// // //                       </div>
// // //                     )}

// // //                     <div
// // //                       style={{
// // //                         fontSize: "1.1rem",
// // //                         fontWeight: 900,
// // //                         marginBottom: "0.75rem",
// // //                         color: "white"
// // //                       }}
// // //                     >
// // //                       RS : {product.price}
// // //                     </div>

// // //                     {product.countInStock > 0 ? (
// // //                       <button
// // //                         onClick={(e) => {
// // //                           e.stopPropagation();
// // //                           handleBuyNow(product);
// // //                         }}
// // //                         style={{
// // //                           width: "100%",
// // //                           backgroundColor: "#facc15",
// // //                           color: "black",
// // //                           fontWeight: 900,
// // //                           padding: "0.5rem",
// // //                           borderRadius: "0.25rem",
// // //                           border: "none",
// // //                           cursor: "pointer",
// // //                           transition: "all 0.3s",
// // //                           fontSize: "0.75rem"
// // //                         }}
// // //                       >
// // //                         PLACE ORDER
// // //                       </button>
// // //                     ) : (
// // //                       <button
// // //                         disabled
// // //                         onClick={(e) => e.stopPropagation()}
// // //                         style={{
// // //                           width: "100%",
// // //                           backgroundColor: "#2a2a2a",
// // //                           color: "#9ca3af",
// // //                           fontWeight: 900,
// // //                           padding: "0.5rem",
// // //                           borderRadius: "0.25rem",
// // //                           border: "1px solid #555",
// // //                           cursor: "not-allowed",
// // //                           fontSize: "0.75rem",
// // //                           opacity: 0.7
// // //                         }}
// // //                       >
// // //                         OUT OF STOCK
// // //                       </button>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* See More Button */}
// // //           <div style={{ textAlign: "center" }}>
// // //             <button
// // //               onClick={() => navigate("/product")}
// // //               style={{
// // //                 backgroundColor: hoveredButton === "see-more" ? "#eab308" : "#facc15",
// // //                 color: "black",
// // //                 fontWeight: "bold",
// // //                 padding: "0.75rem 2rem",
// // //                 borderRadius: "0.25rem",
// // //                 marginTop: "20px",
// // //                 border: "none",
// // //                 cursor: "pointer",
// // //                 transition: "all 0.3s",
// // //                 transform: hoveredButton === "see-more" ? "scale(1.05)" : "scale(1)"
// // //               }}
// // //               onMouseEnter={() => setHoveredButton("see-more")}
// // //               onMouseLeave={() => setHoveredButton(null)}
// // //             >
// // //               SEE MORE →
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Highlight Scroll Bar */}
// // //       <HighlightScrollBar />

// // //       {/* Motivational Section */}
// // //       <MotivationalSection />

// // //       {/* Features Section */}
// // //       <FeaturesSection />

// // //       {/* Sticky Circle Section */}
// // //       {/* <StickyCircleSection /> */}

// // //       {/* Video Showcase Section */}
// // //       <VideoShowcaseSection />

// // //       {/* Video Carousel Section - This will now show when videos are added */}
// // //       <VideoCarouselSection />


// // //       {/* Footer */}
// // //       <Footer />

// // //       {/* Login Modal */}
// // //       {showLoginModal && (
// // //         <div
// // //           style={{
// // //             position: "fixed",
// // //             inset: 0,
// // //             backgroundColor: "rgba(0,0,0,0.7)",
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //             zIndex: 1000
// // //           }}
// // //         >
// // //           <div
// // //             style={{
// // //               backgroundColor: "#171717",
// // //               padding: "2rem",
// // //               borderRadius: "0.5rem",
// // //               textAlign: "center",
// // //               width: "90%",
// // //               maxWidth: "400px",
// // //               border: "2px solid #facc15"
// // //             }}
// // //           >
// // //             <h3 style={{ color: "#facc15", marginBottom: "1rem" }}>
// // //               Login Required
// // //             </h3>
// // //             <p style={{ color: "#d1d5db", marginBottom: "1.5rem" }}>
// // //               Please login to purchase this product.
// // //             </p>
// // //             <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
// // //               <button
// // //                 onClick={() => (window.location.href = "/login")}
// // //                 style={{
// // //                   backgroundColor: "#facc15",
// // //                   color: "black",
// // //                   padding: "0.5rem 1.5rem",
// // //                   border: "none",
// // //                   borderRadius: "0.25rem",
// // //                   fontWeight: "bold",
// // //                   cursor: "pointer"
// // //                 }}
// // //               >
// // //                 Login
// // //               </button>
// // //               <button
// // //                 onClick={() => setShowLoginModal(false)}
// // //                 style={{
// // //                   backgroundColor: "transparent",
// // //                   color: "#facc15",
// // //                   padding: "0.5rem 1.5rem",
// // //                   border: "1px solid #facc15",
// // //                   borderRadius: "0.25rem",
// // //                   fontWeight: "bold",
// // //                   cursor: "pointer"
// // //                 }}
// // //               >
// // //                 Cancel
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <FuelEarnShareFloat />

// // //       {/* WhatsApp Float Button */}
// // //       <WhatsAppFloat />
// // //     </div>
// // //   );
// // // };

// // // export default MPACTLandingPage;








// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from "react-router-dom";
// // import api from "../api/axios"
// // import { ShoppingCart, User, Search, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
// // import MotivationalSection from "./MotivationalSection";
// // import VideoShowcaseSection from "./VideoShowcaseSection";
// // import FeaturesSection from "./FeaturesSection";
// // import proteinGym from "../assets/rrs/protein-gym.jpg";
// // import { addToCartApi } from "../api/cartApi";
// // import { Instagram, Youtube } from 'lucide-react';
// // import { SiTiktok } from "react-icons/si";
// // import WhatsAppFloat from '../components/WhatsAppFloat';
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import Footer from "../components/Footer";
// // import { useAuth } from "../context/AuthContext";
// // import HomeAds from './HomeAds';
// // import HighlightScrollBar from '../components/OfferScrollBar';
// // import VideoCarouselSection from './Videocarouselsection';
// // import StickyCircleSection from './RoundVideo'
// // import FuelEarnShareFloat from "../components/FuelEarnShareFloat";

// // /* ================= CAROUSEL HOOK ================= */
// // function useProductCarousel(images = []) {
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [isHovered, setIsHovered] = useState(false);
// //   const intervalRef = useRef(null);

// //   const startCarousel = () => {
// //     if (images.length <= 1) return;
// //     setIsHovered(true);
// //     intervalRef.current = setInterval(() => {
// //       setActiveIndex((prev) => (prev + 1) % images.length);
// //     }, 900);
// //   };

// //   const stopCarousel = () => {
// //     setIsHovered(false);
// //     clearInterval(intervalRef.current);
// //     intervalRef.current = null;
// //     setActiveIndex(0);
// //   };

// //   useEffect(() => {
// //     return () => clearInterval(intervalRef.current);
// //   }, []);

// //   return { activeIndex, isHovered, startCarousel, stopCarousel };
// // }

// // /* ================= HOME PRODUCT CARD ================= */
// // function HomeProductCard({ product, isMobile, handleBuyNow, expandedDesc, setExpandedDesc, navigate }) {
// //   const images = product.images?.length > 0 ? product.images : [{ url: proteinGym }];
// //   const { activeIndex, isHovered, startCarousel, stopCarousel } = useProductCarousel(images);

// //   return (
// //     <div
// //       onClick={() => navigate(`/productspec/${product._id}`)}
// //       onMouseEnter={startCarousel}
// //       onMouseLeave={stopCarousel}
// //       style={{
// //         display: "flex",
// //         flexDirection: "column",
// //         height: "100%",
// //         background: "linear-gradient(to bottom, rgba(120,53,15,0.4), #171717)",
// //         border: "2px solid rgba(133,77,14,0.5)",
// //         borderRadius: "0.75rem",
// //         overflow: "hidden",
// //         transition: "all 0.4s ease",
// //         transform: isHovered ? "scale(1.03)" : "scale(1)",
// //         cursor: "pointer",
// //       }}
// //     >
// //       {/* ── Image + Carousel ── */}
// //       <div style={{
// //         height: isMobile ? "150px" : "360px",
// //         overflow: "hidden",
// //         backgroundColor: "#000",
// //         position: "relative",
// //       }}>
// //         {/* Discount badge */}
// //         {product.discountPercent > 0 && (
// //           <div style={{
// //             position: "absolute", top: 8, left: 8,
// //             background: "#ff0000", color: "white",
// //             padding: isMobile ? "3px 6px" : "4px 8px",
// //             fontSize: isMobile ? "9px" : "13px",
// //             fontWeight: 800, borderRadius: "6px", zIndex: 2,
// //           }}>
// //             {product.discountPercent}% OFF
// //           </div>
// //         )}

// //         {/* Carousel dots */}
// //         {images.length > 1 && isHovered && (
// //           <div style={{
// //             position: "absolute", bottom: 8, left: "50%",
// //             transform: "translateX(-50%)",
// //             display: "flex", gap: 5, zIndex: 5, pointerEvents: "none",
// //           }}>
// //             {images.map((_, i) => (
// //               <span key={i} style={{
// //                 width: i === activeIndex ? 10 : 6,
// //                 height: i === activeIndex ? 10 : 6,
// //                 borderRadius: "50%",
// //                 background: i === activeIndex ? "#facc15" : "rgba(255,255,255,0.45)",
// //                 display: "inline-block",
// //                 transition: "all 0.3s ease",
// //               }} />
// //             ))}
// //           </div>
// //         )}

// //         <img
// //           src={images[activeIndex]?.url || proteinGym}
// //           alt={product.name || "product"}
// //           loading="lazy"
// //           style={{
// //             width: "100%", height: "100%", objectFit: "cover",
// //             transition: "transform 0.5s ease, opacity 0.35s ease",
// //             transform: isHovered ? "scale(1.08)" : "scale(1)",
// //           }}
// //         />
// //       </div>

// //       {/* ── Content ── */}
// //       <div style={{
// //         padding: "0.75rem", backgroundColor: "#171717",
// //         display: "flex", flexDirection: "column", flexGrow: 1,
// //       }}>
// //         {/* Title */}
// //         {product.title && (
// //           <h3 style={{
// //             fontSize: "1rem", fontWeight: 900, color: "white",
// //             textAlign: "center", marginBottom: "0.25rem", textTransform: "uppercase",
// //           }}>
// //             {product.title}
// //           </h3>
// //         )}

// //         {/* Name */}
// //         <p style={{ fontSize: "0.7rem", color: "#9ca3af", textAlign: "center", marginBottom: "0.5rem" }}>
// //           {product.name}
// //         </p>

// //         {/* Description */}
// //         {(() => {
// //           const isLong = isMobile && product.description?.length > 60;
// //           const isExpanded = expandedDesc[product._id];
// //           return (
// //             <p style={{ fontSize: "10px", color: "#9ca3af", marginBottom: "0.5rem" }}>
// //               {isLong && !isExpanded ? product.description.slice(0, 30) + "..." : product.description}
// //               {isLong && (
// //                 <span
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     setExpandedDesc((prev) => ({ ...prev, [product._id]: !prev[product._id] }));
// //                   }}
// //                   style={{ color: "#facc15", cursor: "pointer", fontWeight: "bold", marginLeft: "4px" }}
// //                 >
// //                   {isExpanded ? " See less" : " See more"}
// //                 </span>
// //               )}
// //             </p>
// //           );
// //         })()}

// //         {/* Highlights — desktop only */}
// //         {!isMobile && (
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.375rem", marginBottom: "0.5rem" }}>
// //             {Array.isArray(product.highlights) && product.highlights.map((item, i) => (
// //               <div key={i} style={{
// //                 border: "1px solid rgba(202,138,4,0.5)", borderRadius: "0.25rem",
// //                 padding: "0.125rem 0.375rem", fontSize: "9px",
// //                 fontWeight: "bold", textAlign: "center", color: "#facc15",
// //               }}>
// //                 {item}
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* Rating */}
// //         <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.5rem" }}>
// //           <div>
// //             {"★".repeat(Math.round(product.rating || 0)).split("").map((_, i) => (
// //               <span key={i} style={{ color: "#facc15", fontSize: "0.75rem" }}>★</span>
// //             ))}
// //             {"☆".repeat(5 - Math.round(product.rating || 0)).split("").map((_, i) => (
// //               <span key={i} style={{ color: "#4b5563", fontSize: "0.75rem" }}>☆</span>
// //             ))}
// //           </div>
// //           <span style={{ fontSize: "10px", color: "#9ca3af" }}>
// //             {product.numReviews || 0} Reviews
// //           </span>
// //         </div>

// //         {/* Price + Button */}
// //         <div style={{ marginTop: "auto" }}>
// //           {product.originalPrice > product.price && (
// //             <div style={{ marginBottom: "0.25rem" }}>
// //               <span style={{ fontSize: "10px", color: "#6b7280", textDecoration: "line-through" }}>
// //                 ₹{product.originalPrice}
// //               </span>
// //               <span style={{ fontSize: "10px", color: "#4ade80", marginLeft: "0.25rem", fontWeight: "bold" }}>
// //                 {product.discountPercent}% OFF
// //               </span>
// //             </div>
// //           )}

// //           <div style={{ fontSize: "1.1rem", fontWeight: 900, marginBottom: "0.75rem", color: "white" }}>
// //             RS : {product.price}
// //           </div>

// //           {product.countInStock > 0 ? (
// //             <button
// //               onClick={(e) => { e.stopPropagation(); handleBuyNow(product); }}
// //               style={{
// //                 width: "100%", backgroundColor: "#facc15", color: "black",
// //                 fontWeight: 900, padding: "0.5rem", borderRadius: "0.25rem",
// //                 border: "none", cursor: "pointer", transition: "all 0.3s", fontSize: "0.75rem",
// //               }}
// //             >
// //               PLACE ORDER
// //             </button>
// //           ) : (
// //             <button disabled onClick={(e) => e.stopPropagation()}
// //               style={{
// //                 width: "100%", backgroundColor: "#2a2a2a", color: "#9ca3af",
// //                 fontWeight: 900, padding: "0.5rem", borderRadius: "0.25rem",
// //                 border: "1px solid #555", cursor: "not-allowed", fontSize: "0.75rem", opacity: 0.7,
// //               }}
// //             >
// //               OUT OF STOCK
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ================= MAIN PAGE ================= */
// // const MPACTLandingPage = () => {
// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const [scrollY, setScrollY] = useState(0);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [hoveredButton, setHoveredButton] = useState(null);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
// //   const [expandedDesc, setExpandedDesc] = useState({});

// //   // Backend States
// //   const [products, setProducts] = useState([]);
// //   const [loadingProducts, setLoadingProducts] = useState(false);
// //   const [productError, setProductError] = useState(null);
// //   const [showLoginModal, setShowLoginModal] = useState(false);
// //   const [cartMessage, setCartMessage] = useState("");
// //   const [heroSlides, setHeroSlides] = useState([]);
// //   const [loadingBanners, setLoadingBanners] = useState(true);
// //   const navigate = useNavigate();
// //   const { user, loading } = useAuth();

// //   // Refs
// //   const heroRef = useRef(null);
// //   const motivationalRef = useRef(null);
// //   const productsRef = useRef(null);
// //   const aboutRef = useRef(null);
// //   const blogRef = useRef(null);
// //   const slideIntervalRef = useRef(null);

// //   useEffect(() => {
// //     const refreshTimeout = setTimeout(() => { ScrollTrigger.refresh(); }, 100);

// //     if (heroSlides && heroSlides.length > 0) {
// //       if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
// //       slideIntervalRef.current = setInterval(() => {
// //         setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1);
// //       }, 4000);
// //     }

// //     const handleScroll = () => setScrollY(window.scrollY);
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth < 768);
// //       ScrollTrigger.refresh();
// //     };

// //     window.addEventListener("scroll", handleScroll, { passive: true });
// //     window.addEventListener("resize", handleResize);

// //     return () => {
// //       clearTimeout(refreshTimeout);
// //       if (slideIntervalRef.current) { clearInterval(slideIntervalRef.current); slideIntervalRef.current = null; }
// //       window.removeEventListener("scroll", handleScroll);
// //       window.removeEventListener("resize", handleResize);
// //     };
// //   }, [heroSlides]);

// //   const fetchProducts = async () => {
// //     try {
// //       setLoadingProducts(true);
// //       const res = await api.get("/api/products", { params: { limit: 8 } });
// //       setProducts(res.data.products || []);
// //     } catch (error) {
// //       console.error("Failed to load products:", error);
// //       setProductError("Failed to load products");
// //     } finally {
// //       setLoadingProducts(false);
// //     }
// //   };

// //   useEffect(() => { fetchProducts(); }, []);

// //   useEffect(() => {
// //     const fetchHeroBanners = async () => {
// //       try {
// //         const res = await api.get("/api/hero-banners");
// //         setHeroSlides(res.data || []);
// //       } catch (error) {
// //         console.error("Failed to load hero banners");
// //       } finally {
// //         setLoadingBanners(false);
// //       }
// //     };
// //     fetchHeroBanners();
// //   }, []);

// //   useEffect(() => {
// //     if (!loadingProducts && !loadingBanners) {
// //       const handleLoad = () => setTimeout(() => ScrollTrigger.refresh(), 400);
// //       if (document.readyState === "complete") {
// //         handleLoad();
// //       } else {
// //         window.addEventListener("load", handleLoad);
// //         return () => window.removeEventListener("load", handleLoad);
// //       }
// //     }
// //   }, [loadingProducts, loadingBanners]);

// //   const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

// //   const handleBuyNow = (product) => {
// //     if (loading) return;
// //     if (!user) { setShowLoginModal(true); return; }
// //     navigate("/checkout", {
// //       state: {
// //         directBuy: true,
// //         product: { _id: product._id, name: product.name, price: product.price, image: product.images?.[0]?.url, qty: 1 }
// //       }
// //     });
// //   };

// //   return (
// //     <div style={{
// //       minHeight: '100vh',
// //       backgroundColor: '#171717',
// //       color: 'white',
// //       overflowX: 'hidden',
// //       fontFamily: "'Jersey 25', sans-serif"
// //     }}>

// //       {/* ── Fixed Header ── */}
// //       <header style={{
// //         position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
// //         backgroundColor: isMobile ? 'rgb(250, 204, 21)' : (scrollY > 100 ? 'rgba(250, 204, 21, 0.95)' : 'rgb(250, 204, 21)'),
// //         backdropFilter: (isMobile || scrollY > 100) ? 'blur(10px)' : 'none',
// //         color: 'black', transition: 'all 0.3s'
// //       }}>
// //         <div style={{
// //           maxWidth: '1280px', margin: '0 auto', padding: '1rem',
// //           display: 'flex', alignItems: 'center', justifyContent: 'space-between'
// //         }}>
// //           <div style={{ fontSize: isMobile ? '1.5rem' : '1.875rem', fontWeight: 'bold', cursor: 'pointer' }}
// //             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
// //             MPACT
// //           </div>

// //           <nav style={{ display: isMobile ? 'none' : 'flex', gap: '2rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
// //             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
// //               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>HOME</button>
// //             <button onClick={() => scrollToSection(productsRef)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
// //               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>PRODUCTS</button>
// //             <button onClick={() => scrollToSection(aboutRef)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
// //               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>ABOUT US</button>
// //             <button onClick={() => scrollToSection(blogRef)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
// //               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>BLOG</button>
// //           </nav>

// //           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
// //             <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><Search size={20} /></button>
// //             <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><User size={20} /></button>
// //             <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><ShoppingCart size={20} /></button>
// //             <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: isMobile ? 'block' : 'none' }}
// //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
// //               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Mobile Menu */}
// //         <div style={{
// //           display: isMobile ? 'block' : 'none', overflow: 'hidden',
// //           maxHeight: mobileMenuOpen ? '384px' : '0',
// //           opacity: mobileMenuOpen ? 1 : 0, transition: 'all 0.3s'
// //         }}>
// //           <nav style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
// //             <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
// //               style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', color: 'inherit' }}>HOME</button>
// //             <button onClick={() => { scrollToSection(productsRef); setMobileMenuOpen(false); }}
// //               style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', color: 'inherit' }}>PRODUCTS</button>
// //             <button onClick={() => { scrollToSection(aboutRef); setMobileMenuOpen(false); }}
// //               style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', color: 'inherit' }}>ABOUT US</button>
// //             <button onClick={() => { scrollToSection(blogRef); setMobileMenuOpen(false); }}
// //               style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}>BLOG</button>
// //           </nav>
// //         </div>
// //       </header>

// //       {/* ── Hero Slider ── */}
// //       <section ref={heroRef} style={{
// //         position: 'relative', backgroundColor: 'black', paddingTop: '0rem', overflow: 'hidden',
// //         height: isMobile ? '50vh' : 'calc(100vh - 5rem)',
// //         minHeight: isMobile ? '300px' : '600px'
// //       }}>
// //         <div style={{ width: '100%', margin: '0', padding: '0', height: '100%' }}>
// //           <div style={{ position: 'relative', height: '100%', width: '100%' }}>
// //             <div style={{
// //               position: 'relative', height: '100%', width: '100%',
// //               display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
// //             }}>
// //               {heroSlides.map((slide, index) => (
// //                 <div key={slide.id || index} style={{
// //                   position: 'absolute', inset: 0,
// //                   opacity: index === currentSlide ? 1 : 0,
// //                   transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)',
// //                   pointerEvents: index === currentSlide ? 'auto' : 'none',
// //                   transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out',
// //                   height: '100%', width: '100%'
// //                 }}>
// //                   <div style={{
// //                     width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
// //                     transform: index === currentSlide ? `translateY(${scrollY * 0.1}px)` : 'translateY(0)',
// //                     transition: 'transform 0.1s linear'
// //                   }}>
// //                     {slide.mediaType === 'video' ? (
// //                       <video src={slide.video?.url} autoPlay muted loop playsInline
// //                         style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '100%', margin: '0 auto' }} />
// //                     ) : (
// //                       <img src={slide.image?.url || proteinGym} alt={`Slide ${index + 1}`}
// //                         style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '100%', margin: '0 auto' }} />
// //                     )}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── Home Ads ── */}
// //       <HomeAds />

// //       {/* ── Products Section ── */}
// //       <section ref={productsRef} style={{ padding: "4rem 0", backgroundColor: "#262626", position: "relative", overflow: "hidden" }}>
// //         <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
// //           <h2 style={{ fontSize: isMobile ? "2rem" : "3rem", fontWeight: 900, color: "#facc15", textAlign: "center", marginBottom: "2rem" }}>
// //             FIND OUR PRODUCTS
// //           </h2>

// //           {cartMessage && (
// //             <p style={{ textAlign: "center", marginBottom: "1rem", fontWeight: "bold", color: cartMessage.startsWith("✅") ? "#4ade80" : "#f87171" }}>
// //               {cartMessage}
// //             </p>
// //           )}

// //           {loadingProducts && <p style={{ textAlign: "center", color: "#facc15" }}>Loading products...</p>}
// //           {productError && <p style={{ textAlign: "center", color: "red" }}>{productError}</p>}

// //           {/* Products Grid — carousel cards */}
// //           <div style={{
// //             display: "grid",
// //             gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(260px, 1fr))",
// //             gap: "1.25rem"
// //           }}>
// //             {Array.isArray(products) && products.map((product) => (
// //               <HomeProductCard
// //                 key={product._id}
// //                 product={product}
// //                 isMobile={isMobile}
// //                 handleBuyNow={handleBuyNow}
// //                 expandedDesc={expandedDesc}
// //                 setExpandedDesc={setExpandedDesc}
// //                 navigate={navigate}
// //               />
// //             ))}
// //           </div>

// //           {/* See More */}
// //           <div style={{ textAlign: "center" }}>
// //             <button
// //               onClick={() => navigate("/product")}
// //               style={{
// //                 backgroundColor: hoveredButton === "see-more" ? "#eab308" : "#facc15",
// //                 color: "black", fontWeight: "bold", padding: "0.75rem 2rem",
// //                 borderRadius: "0.25rem", marginTop: "20px", border: "none",
// //                 cursor: "pointer", transition: "all 0.3s",
// //                 transform: hoveredButton === "see-more" ? "scale(1.05)" : "scale(1)"
// //               }}
// //               onMouseEnter={() => setHoveredButton("see-more")}
// //               onMouseLeave={() => setHoveredButton(null)}
// //             >
// //               SEE MORE →
// //             </button>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── Highlight Scroll Bar ── */}
// //       <HighlightScrollBar />

// //       {/* ── Motivational Section ── */}
// //       <MotivationalSection />

// //       {/* ── Features Section ── */}
// //       <FeaturesSection />

// //       {/* ── Video Showcase Section ── */}
// //       <VideoShowcaseSection />

// //       {/* ── Video Carousel Section ── */}
// //       <VideoCarouselSection />

// //       {/* ── Footer ── */}
// //       <Footer />

// //       {/* ── Login Modal ── */}
// //       {showLoginModal && (
// //         <div style={{
// //           position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)",
// //           display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
// //         }}>
// //           <div style={{
// //             backgroundColor: "#171717", padding: "2rem", borderRadius: "0.5rem",
// //             textAlign: "center", width: "90%", maxWidth: "400px", border: "2px solid #facc15"
// //           }}>
// //             <h3 style={{ color: "#facc15", marginBottom: "1rem" }}>Login Required</h3>
// //             <p style={{ color: "#d1d5db", marginBottom: "1.5rem" }}>Please login to purchase this product.</p>
// //             <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
// //               <button onClick={() => (window.location.href = "/login")}
// //                 style={{ backgroundColor: "#facc15", color: "black", padding: "0.5rem 1.5rem", border: "none", borderRadius: "0.25rem", fontWeight: "bold", cursor: "pointer" }}>
// //                 Login
// //               </button>
// //               <button onClick={() => setShowLoginModal(false)}
// //                 style={{ backgroundColor: "transparent", color: "#facc15", padding: "0.5rem 1.5rem", border: "1px solid #facc15", borderRadius: "0.25rem", fontWeight: "bold", cursor: "pointer" }}>
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <FuelEarnShareFloat />
// //       <WhatsAppFloat />
// //     </div>
// //   );
// // };

// // export default MPACTLandingPage;


// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios"
// import { ShoppingCart, User, Search, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
// import MotivationalSection from "./MotivationalSection";
// import VideoShowcaseSection from "./VideoShowcaseSection";
// import FeaturesSection from "./FeaturesSection";
// import proteinGym from "../assets/rrs/protein-gym.jpg";
// import { addToCartApi } from "../api/cartApi";
// import { Instagram, Youtube } from 'lucide-react';
// import { SiTiktok } from "react-icons/si";
// import WhatsAppFloat from '../components/WhatsAppFloat';
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Footer from "../components/Footer";
// import { useAuth } from "../context/AuthContext";
// import HomeAds from './HomeAds';
// import HighlightScrollBar from '../components/OfferScrollBar';
// import VideoCarouselSection from './Videocarouselsection';
// import StickyCircleSection from './RoundVideo'
// import FuelEarnShareFloat from "../components/FuelEarnShareFloat";

// /* ── Lottie (same package already used in VideoShowcaseSection) ── */
// import Lottie from "lottie-react";

// /* ═══════════════════════════════════════════════════════════════════════
//    DRIP ANIMATION — same data as VideoShowcaseSection, reused here
// ═══════════════════════════════════════════════════════════════════════ */
// const DRIP_ANIMATION = { "v": "5.12.1", "fr": 30, "ip": 0, "op": 76, "w": 315, "h": 317, "nm": "!!bttn_hover", "ddd": 0, "assets": [], "layers": [{ "ddd": 0, "ind": 2, "ty": 4, "nm": "Shape Layer 4", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [152.75, 163.25, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [0, 0, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.838, "y": 0.882 }, "o": { "x": 0.333, "y": 0 }, "t": 0, "s": [{ "i": [[11, -0.75], [9, -4], [-12.609, -0.287], [-7.188, 2.312]], "o": [[-11, 0.75], [4.5, -2.375], [8.25, 0.188], [1.919, -0.617]], "v": [[77.75, 23.25], [45.25, 30.375], [76.875, 30.188], [101.938, 28.938]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.619, "y": 0.502 }, "t": 29, "s": [{ "i": [[11, -0.75], [9, -4], [-14.125, 2.312], [-12.812, 4.062]], "o": [[-11, 0.75], [22.875, 4.875], [12.503, -2.047], [1.921, -0.609]], "v": [[77.75, 23.25], [45.25, 30.375], [74.375, 50.688], [102.812, 27.312]], "c": true }] }, { "t": 44, "s": [{ "i": [[11, -0.75], [9, -4], [-12.17, 3.313], [-11.938, 4.062]], "o": [[-11, 0.75], [14.625, 0.25], [11.25, -3.062], [3.101, -1.055]], "v": [[77.75, 23.25], [45.25, 30.875], [75.625, 48.812], [102.688, 26.812]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [1, 0.8352941176, 0, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 137, "st": 0, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 3, "ty": 4, "nm": "Shape Layer 3", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [136.404, 202.688, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [38.654, 39.688, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.68, "y": 0.495 }, "o": { "x": 0.373, "y": 0 }, "t": 16, "s": [{ "i": [[13.625, 0.25], [0.898, -3.253], [-9.49, -0.463], [-5.899, -0.329], [-3.102, -0.039], [-7.938, -0.375], [-2, 0]], "o": [[-13.625, -0.25], [-1, 3.625], [11.781, 0.575], [4.5, 0.251], [4.937, 0.062], [4.755, 0.225], [2, 0]], "v": [[20.125, 26.5], [2.125, 27.875], [20.032, 29.487], [37.625, 29.874], [48.813, 29.75], [66.25, 30.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.3, "y": 0.474 }, "t": 31, "s": [{ "i": [[13.625, 0.25], [0.091, -3.374], [-9.49, -0.463], [-5.868, -0.691], [-1.92, -2.437], [-5.098, 8.855], [-2, 0]], "o": [[-13.625, -0.25], [-0.163, 6.041], [11.781, 0.575], [4.25, 0.5], [3.25, 4.125], [2.375, -4.125], [2, 0]], "v": [[20.125, 26.5], [2.125, 28.625], [20.094, 35.05], [38, 33.374], [46.375, 40.875], [66.125, 38.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 46, "s": [{ "i": [[13.625, 0.25], [0.151, -3.372], [-9.49, -0.463], [-5.437, -2.312], [0.698, -3.023], [3.25, 19.25], [-2, 0]], "o": [[-13.625, -0.25], [7.375, 0.5], [11.781, 0.575], [3.239, 1.378], [-3, 13], [-2.463, -14.586], [2, 0]], "v": [[20.125, 26.5], [1.125, 34.75], [20.969, 42.8], [43.75, 40.875], [47.5, 54.75], [63, 54], [72.5, 27.25]], "c": true }] }, { "t": 59, "s": [{ "i": [[13.625, 0.25], [-3.37, 0.193], [-9.49, -0.463], [-5.437, -2.312], [0.211, -3.095], [1.341, 18.583], [-2, 0]], "o": [[-13.625, -0.25], [8.75, -0.5], [11.781, 0.575], [3.239, 1.378], [-0.75, 11], [-0.875, -12.125], [2, 0]], "v": [[20.125, 26.5], [1.5, 32.375], [21.344, 40.925], [43, 38.75], [45.5, 52], [64.125, 50.125], [72.5, 27.25]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [1, 0.8352941176, 0, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 153, "st": 16, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 4, "ty": 4, "nm": "Shape Layer 2", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [183, 234.377, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.667, "y": 0.32 }, "o": { "x": 0.333, "y": 0 }, "t": 7, "s": [{ "i": [[0, 0.316], [6.837, 0.024], [-0.25, -0.601], [-3.691, -0.402], [-7.5, 0.016], [-4.866, 0.411]], "o": [[-1.5, -0.395], [-7.929, -0.028], [3.25, 0.506], [3.846, 0.419], [5.771, -0.012], [5.115, -0.432]], "v": [[-44.375, 31.881], [-69.125, 31.739], [-95.375, 31.976], [-85.721, 33.336], [-70.5, 33.984], [-54.509, 33.201]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0.68 }, "t": 20.154, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [-3.691, -3.179], [-7.5, 0.125], [-4.866, 3.25]], "o": [[-1.5, -3.125], [-7.929, -0.221], [3.25, 4], [3.846, 3.312], [5.771, -0.096], [5.115, -3.416]], "v": [[-44.125, 32.125], [-68.875, 31], [-95.125, 32.875], [-85.471, 43.625], [-70.25, 48.75], [-54.259, 42.562]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 34.77, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.125, -8.875], [-12.875, -0.25], [-0.25, 8.125]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.127, 9.003], [12.133, 0.236], [0.388, -12.625]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 52.125], [-70.5, 75.75], [-65.875, 51.625]], "c": true }] }, { "t": 56, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.375, -7.25], [-12.5, -0.25], [0.164, 4.872]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.375, 7.25], [12.5, 0.25], [-0.375, -11.125]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 50.625], [-70.5, 69.75], [-65.875, 50.125]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [1, 0.8352941176, 0, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 144, "st": 7, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 5, "ty": 4, "nm": "Shape Layer 1", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [84, 235.877, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.333, "y": 0 }, "t": 15, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.75, 27.526], [-96.375, 28.651], [-80.875, 31.617], [-60.25, 32.604], [-40.5, 31.028]], "c": true }] }, { "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "t": 20.2, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.875, 30.776], [-96.375, 28.651], [-81, 34.117], [-60.125, 35.729], [-40.5, 33.778]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.167, "y": 0.167 }, "t": 34.5, "s": [{ "i": [[-6.75, 6.25], [18, -2.25], [-3.278, -2.217], [-9, -0.805], [-3.5, 2.645]], "o": [[-12.25, -8], [8.883, 8.702], [4, 2.706], [7.346, 0.657], [3.5, -2.645]], "v": [[-23.75, 29], [-96.75, 27.25], [-80.875, 44.044], [-60, 51.305], [-40.375, 42.52]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 54, "s": [{ "i": [[-7.5, -0.25], [18.75, -4.5], [-0.375, -17.419], [-13.5, 0.195], [0.073, 10.144]], "o": [[-12.25, -8], [8.75, 12.25], [0.181, 8.402], [14.375, -0.208], [-0.125, -17.27]], "v": [[-49.125, 34.625], [-94.75, 28.25], [-72.375, 60.544], [-67.625, 88.805], [-62.625, 60.27]], "c": true }] }, { "t": 74, "s": [{ "i": [[-8.625, -2], [18.75, -4.5], [-0.25, -14.669], [-15.5, 0.195], [0.51, 10.132]], "o": [[-12.25, -8], [8.883, 8.702], [0.143, 8.402], [15.5, -0.195], [-0.75, -14.895]], "v": [[-49.125, 35], [-93.25, 29.625], [-74, 59.169], [-67.5, 83.805], [-60.5, 58.395]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [1, 0.8352941176, 0, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 161, "st": 24, "ct": 1, "bm": 0 }], "markers": [], "props": {} };

// /* ═══════════════════════════════════════════════════════════════════════
//    SEE MORE DRIP BUTTON — original button style + Lottie drip on hover
// ═══════════════════════════════════════════════════════════════════════ */
// function SeeMoreDripButton({ onClick, isMobile }) {
//   const lottieRef = useRef(null);
//   const [hovered, setHovered] = useState(false);

//   const handleEnter = () => {
//     setHovered(true);
//     if (!lottieRef.current || isMobile) return;
//     lottieRef.current.goToAndPlay(0, true);
//   };

//   const handleLeave = () => {
//     setHovered(false);
//     if (!lottieRef.current || isMobile) return;
//     lottieRef.current.stop();
//   };

//   return (
    
//     <div
//       style={{ position: "relative", display: "inline-block" }}
//       onMouseEnter={handleEnter}
//       onMouseLeave={handleLeave}
//     >
//     {/* Original button — exact same inline style as before */}
//       <button
//         onClick={onClick}
//         style={{
//           backgroundColor: hovered ? "#ffd500" : "#facc15",
//           color: "black",
//           fontWeight: "bold",
//           padding: "0.75rem 2rem",
//           borderRadius: "0.25rem",
//           marginTop: "20px",
//           border: "none",
//           cursor: "pointer",
//           transition: "all 0.3s",
//           transform: hovered ? "scale(1.05)" : "scale(1)",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//           {/* Drip Lottie — floats above the button, desktop only */}
//           {!isMobile && (
//             <div style={{
//               position: "absolute",
//               /* Centre the drip above the button */
//               width: "160px",
//               height: "172px",
//               top: "-57px",
//               left: "50%",
//               transform: "translateX(-50%)",
//               pointerEvents: "none",
//               zIndex: 10,
//             }}>
//               <Lottie
//                 lottieRef={lottieRef}
//                 animationData={DRIP_ANIMATION}
//                 loop={false}
//                 autoplay={false}
//                 style={{ width: "100%", height: "100%" }}
//               />
//             </div>
//           )}
//         SEE MORE →
//       </button>
//     </div>
//   );
// }

// /* ================= CAROUSEL HOOK ================= */
// function useProductCarousel(images = []) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const intervalRef = useRef(null);

//   const startCarousel = () => {
//     if (images.length <= 1) return;
//     setIsHovered(true);
//     intervalRef.current = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % images.length);
//     }, 900);
//   };

//   const stopCarousel = () => {
//     setIsHovered(false);
//     clearInterval(intervalRef.current);
//     intervalRef.current = null;
//     setActiveIndex(0);
//   };

//   useEffect(() => {
//     return () => clearInterval(intervalRef.current);
//   }, []);

//   return { activeIndex, isHovered, startCarousel, stopCarousel };
// }

// /* ================= HOME PRODUCT CARD ================= */
// function HomeProductCard({ product, isMobile, handleBuyNow, expandedDesc, setExpandedDesc, navigate }) {
//   const images = product.images?.length > 0 ? product.images : [{ url: proteinGym }];
//   const { activeIndex, isHovered, startCarousel, stopCarousel } = useProductCarousel(images);

//   return (
//     <div
//       onClick={() => navigate(`/productspec/${product._id}`)}
//       onMouseEnter={startCarousel}
//       onMouseLeave={stopCarousel}
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         background: "linear-gradient(to bottom, rgba(120,53,15,0.4), #171717)",
//         border: "2px solid rgba(133,77,14,0.5)",
//         borderRadius: "0.75rem",
//         overflow: "hidden",
//         transition: "all 0.4s ease",
//         transform: isHovered ? "scale(1.03)" : "scale(1)",
//         cursor: "pointer",
//       }}
//     >
//       {/* ── Image + Carousel ── */}
//       <div style={{
//         height: isMobile ? "150px" : "360px",
//         overflow: "hidden",
//         backgroundColor: "#000",
//         position: "relative",
//       }}>
//         {product.discountPercent > 0 && (
//           <div style={{
//             position: "absolute", top: 8, left: 8,
//             background: "#ff0000", color: "white",
//             padding: isMobile ? "3px 6px" : "4px 8px",
//             fontSize: isMobile ? "9px" : "13px",
//             fontWeight: 800, borderRadius: "6px", zIndex: 2,
//           }}>
//             {product.discountPercent}% OFF
//           </div>
//         )}

//         {images.length > 1 && isHovered && (
//           <div style={{
//             position: "absolute", bottom: 8, left: "50%",
//             transform: "translateX(-50%)",
//             display: "flex", gap: 5, zIndex: 5, pointerEvents: "none",
//           }}>
//             {images.map((_, i) => (
//               <span key={i} style={{
//                 width: i === activeIndex ? 10 : 6,
//                 height: i === activeIndex ? 10 : 6,
//                 borderRadius: "50%",
//                 background: i === activeIndex ? "#facc15" : "rgba(255,255,255,0.45)",
//                 display: "inline-block",
//                 transition: "all 0.3s ease",
//               }} />
//             ))}
//           </div>
//         )}

//         <img
//           src={images[activeIndex]?.url || proteinGym}
//           alt={product.name || "product"}
//           loading="lazy"
//           style={{
//             width: "100%", height: "100%", objectFit: "cover",
//             transition: "transform 0.5s ease, opacity 0.35s ease",
//             transform: isHovered ? "scale(1.08)" : "scale(1)",
//           }}
//         />
//       </div>

//       {/* ── Content ── */}
//       <div style={{
//         padding: "0.75rem", backgroundColor: "#171717",
//         display: "flex", flexDirection: "column", flexGrow: 1,
//       }}>
//         {product.title && (
//           <h3 style={{
//             fontSize: "1rem", fontWeight: 900, color: "white",
//             textAlign: "center", marginBottom: "0.25rem", textTransform: "uppercase",
//           }}>
//             {product.title}
//           </h3>
//         )}

//         <p style={{ fontSize: "0.7rem", color: "#9ca3af", textAlign: "center", marginBottom: "0.5rem" }}>
//           {product.name}
//         </p>

//         {(() => {
//           const isLong = isMobile && product.description?.length > 60;
//           const isExpanded = expandedDesc[product._id];
//           return (
//             <p style={{ fontSize: "10px", color: "#9ca3af", marginBottom: "0.5rem" }}>
//               {isLong && !isExpanded ? product.description.slice(0, 30) + "..." : product.description}
//               {isLong && (
//                 <span
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setExpandedDesc((prev) => ({ ...prev, [product._id]: !prev[product._id] }));
//                   }}
//                   style={{ color: "#facc15", cursor: "pointer", fontWeight: "bold", marginLeft: "4px" }}
//                 >
//                   {isExpanded ? " See less" : " See more"}
//                 </span>
//               )}
//             </p>
//           );
//         })()}

//         {!isMobile && (
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.375rem", marginBottom: "0.5rem" }}>
//             {Array.isArray(product.highlights) && product.highlights.map((item, i) => (
//               <div key={i} style={{
//                 border: "1px solid rgba(202,138,4,0.5)", borderRadius: "0.25rem",
//                 padding: "0.125rem 0.375rem", fontSize: "9px",
//                 fontWeight: "bold", textAlign: "center", color: "#facc15",
//               }}>
//                 {item}
//               </div>
//             ))}
//           </div>
//         )}

//         <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.5rem" }}>
//           <div>
//             {"★".repeat(Math.round(product.rating || 0)).split("").map((_, i) => (
//               <span key={i} style={{ color: "#facc15", fontSize: "0.75rem" }}>★</span>
//             ))}
//             {"☆".repeat(5 - Math.round(product.rating || 0)).split("").map((_, i) => (
//               <span key={i} style={{ color: "#4b5563", fontSize: "0.75rem" }}>☆</span>
//             ))}
//           </div>
//           <span style={{ fontSize: "10px", color: "#9ca3af" }}>
//             {product.numReviews || 0} Reviews
//           </span>
//         </div>

//         <div style={{ marginTop: "auto" }}>
//           {product.originalPrice > product.price && (
//             <div style={{ marginBottom: "0.25rem" }}>
//               <span style={{ fontSize: "10px", color: "#6b7280", textDecoration: "line-through" }}>
//                 ₹{product.originalPrice}
//               </span>
//               <span style={{ fontSize: "10px", color: "#4ade80", marginLeft: "0.25rem", fontWeight: "bold" }}>
//                 {product.discountPercent}% OFF
//               </span>
//             </div>
//           )}

//           <div style={{ fontSize: "1.1rem", fontWeight: 900, marginBottom: "0.75rem", color: "white" }}>
//             RS : {product.price}
//           </div>

//           {product.countInStock > 0 ? (
//             <button
//               onClick={(e) => { e.stopPropagation(); handleBuyNow(product); }}
//               style={{
//                 width: "100%", backgroundColor: "#facc15", color: "black",
//                 fontWeight: 900, padding: "0.5rem", borderRadius: "0.25rem",
//                 border: "none", cursor: "pointer", transition: "all 0.3s", fontSize: "0.75rem",
//               }}
//             >
//               PLACE ORDER
//             </button>
//           ) : (
//             <button disabled onClick={(e) => e.stopPropagation()}
//               style={{
//                 width: "100%", backgroundColor: "#2a2a2a", color: "#9ca3af",
//                 fontWeight: 900, padding: "0.5rem", borderRadius: "0.25rem",
//                 border: "1px solid #555", cursor: "not-allowed", fontSize: "0.75rem", opacity: 0.7,
//               }}
//             >
//               OUT OF STOCK
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= MAIN PAGE ================= */
// const MPACTLandingPage = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [scrollY, setScrollY] = useState(0);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [hoveredButton, setHoveredButton] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [expandedDesc, setExpandedDesc] = useState({});

//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(false);
//   const [productError, setProductError] = useState(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [cartMessage, setCartMessage] = useState("");
//   const [heroSlides, setHeroSlides] = useState([]);
//   const [loadingBanners, setLoadingBanners] = useState(true);
//   const navigate = useNavigate();
//   const { user, loading } = useAuth();

//   const heroRef = useRef(null);
//   const motivationalRef = useRef(null);
//   const productsRef = useRef(null);
//   const aboutRef = useRef(null);
//   const blogRef = useRef(null);
//   const slideIntervalRef = useRef(null);

//   useEffect(() => {
//     const refreshTimeout = setTimeout(() => { ScrollTrigger.refresh(); }, 100);

//     if (heroSlides && heroSlides.length > 0) {
//       if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
//       slideIntervalRef.current = setInterval(() => {
//         setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1);
//       }, 4000);
//     }

//     const handleScroll = () => setScrollY(window.scrollY);
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       ScrollTrigger.refresh();
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     window.addEventListener("resize", handleResize);

//     return () => {
//       clearTimeout(refreshTimeout);
//       if (slideIntervalRef.current) { clearInterval(slideIntervalRef.current); slideIntervalRef.current = null; }
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [heroSlides]);

//   const fetchProducts = async () => {
//     try {
//       setLoadingProducts(true);
//       const res = await api.get("/api/products", { params: { limit: 8 } });
//       setProducts(res.data.products || []);
//     } catch (error) {
//       console.error("Failed to load products:", error);
//       setProductError("Failed to load products");
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   useEffect(() => { fetchProducts(); }, []);

//   useEffect(() => {
//     const fetchHeroBanners = async () => {
//       try {
//         const res = await api.get("/api/hero-banners");
//         setHeroSlides(res.data || []);
//       } catch (error) {
//         console.error("Failed to load hero banners");
//       } finally {
//         setLoadingBanners(false);
//       }
//     };
//     fetchHeroBanners();
//   }, []);

//   useEffect(() => {
//     if (!loadingProducts && !loadingBanners) {
//       const handleLoad = () => setTimeout(() => ScrollTrigger.refresh(), 400);
//       if (document.readyState === "complete") {
//         handleLoad();
//       } else {
//         window.addEventListener("load", handleLoad);
//         return () => window.removeEventListener("load", handleLoad);
//       }
//     }
//   }, [loadingProducts, loadingBanners]);

//   const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

//   const handleBuyNow = (product) => {
//     if (loading) return;
//     if (!user) { setShowLoginModal(true); return; }
//     navigate("/checkout", {
//       state: {
//         directBuy: true,
//         product: { _id: product._id, name: product.name, price: product.price, image: product.images?.[0]?.url, qty: 1 }
//       }
//     });
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       backgroundColor: '#171717',
//       color: 'white',
//       overflowX: 'hidden',
//       fontFamily: "'Jersey 25', sans-serif"
//     }}>

//       {/* ── Fixed Header ── */}
//       <header style={{
//         position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
//         backgroundColor: isMobile ? 'rgb(250, 204, 21)' : (scrollY > 100 ? 'rgba(250, 204, 21, 0.95)' : 'rgb(250, 204, 21)'),
//         backdropFilter: (isMobile || scrollY > 100) ? 'blur(10px)' : 'none',
//         color: 'black', transition: 'all 0.3s'
//       }}>
//         <div style={{
//           maxWidth: '1280px', margin: '0 auto', padding: '1rem',
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between'
//         }}>
//           <div style={{ fontSize: isMobile ? '1.5rem' : '1.875rem', fontWeight: 'bold', cursor: 'pointer' }}
//             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
//             MPACT
//           </div>

//           <nav style={{ display: isMobile ? 'none' : 'flex', gap: '2rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
//             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
//               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>HOME</button>
//             <button onClick={() => scrollToSection(productsRef)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
//               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>PRODUCTS</button>
//             <button onClick={() => scrollToSection(aboutRef)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
//               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>ABOUT US</button>
//             <button onClick={() => scrollToSection(blogRef)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
//               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>BLOG</button>
//           </nav>

//           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//             <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><Search size={20} /></button>
//             <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><User size={20} /></button>
//             <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><ShoppingCart size={20} /></button>
//             <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: isMobile ? 'block' : 'none' }}
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div style={{
//           display: isMobile ? 'block' : 'none', overflow: 'hidden',
//           maxHeight: mobileMenuOpen ? '384px' : '0',
//           opacity: mobileMenuOpen ? 1 : 0, transition: 'all 0.3s'
//         }}>
//           <nav style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
//             <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
//               style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', color: 'inherit' }}>HOME</button>
//             <button onClick={() => { scrollToSection(productsRef); setMobileMenuOpen(false); }}
//               style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', color: 'inherit' }}>PRODUCTS</button>
//             <button onClick={() => { scrollToSection(aboutRef); setMobileMenuOpen(false); }}
//               style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', color: 'inherit' }}>ABOUT US</button>
//             <button onClick={() => { scrollToSection(blogRef); setMobileMenuOpen(false); }}
//               style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}>BLOG</button>
//           </nav>
//         </div>
//       </header>

//       {/* ── Hero Slider ── */}
//       <section ref={heroRef} style={{
//         position: 'relative', backgroundColor: 'black', paddingTop: '0rem', overflow: 'hidden',
//         height: isMobile ? '50vh' : 'calc(100vh - 5rem)',
//         minHeight: isMobile ? '300px' : '600px'
//       }}>
//         <div style={{ width: '100%', margin: '0', padding: '0', height: '100%' }}>
//           <div style={{ position: 'relative', height: '100%', width: '100%' }}>
//             <div style={{
//               position: 'relative', height: '100%', width: '100%',
//               display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
//             }}>
//               {heroSlides.map((slide, index) => (
//                 <div key={slide.id || index} style={{
//                   position: 'absolute', inset: 0,
//                   opacity: index === currentSlide ? 1 : 0,
//                   transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)',
//                   pointerEvents: index === currentSlide ? 'auto' : 'none',
//                   transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out',
//                   height: '100%', width: '100%'
//                 }}>
//                   <div style={{
//                     width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     transform: index === currentSlide ? `translateY(${scrollY * 0.1}px)` : 'translateY(0)',
//                     transition: 'transform 0.1s linear'
//                   }}>
//                     {slide.mediaType === 'video' ? (
//                       <video src={slide.video?.url} autoPlay muted loop playsInline
//                         style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '100%', margin: '0 auto' }} />
//                     ) : (
//                       <img src={slide.image?.url || proteinGym} alt={`Slide ${index + 1}`}
//                         style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '100%', margin: '0 auto' }} />
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── Home Ads ── */}
//       <HomeAds />

//       {/* ── Products Section ── */}
//       <section ref={productsRef} style={{ padding: "4rem 0", backgroundColor: "#262626", position: "relative", overflow: "hidden" }}>
//         <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
//           <h2 style={{ fontSize: isMobile ? "2rem" : "3rem", fontWeight: 900, color: "#facc15", textAlign: "center", marginBottom: "2rem" }}>
//             FIND OUR PRODUCTS
//           </h2>

//           {cartMessage && (
//             <p style={{ textAlign: "center", marginBottom: "1rem", fontWeight: "bold", color: cartMessage.startsWith("✅") ? "#4ade80" : "#f87171" }}>
//               {cartMessage}
//             </p>
//           )}

//           {loadingProducts && <p style={{ textAlign: "center", color: "#facc15" }}>Loading products...</p>}
//           {productError && <p style={{ textAlign: "center", color: "red" }}>{productError}</p>}

//           <div style={{
//             display: "grid",
//             gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(260px, 1fr))",
//             gap: "1.25rem"
//           }}>
//             {Array.isArray(products) && products.map((product) => (
//               <HomeProductCard
//                 key={product._id}
//                 product={product}
//                 isMobile={isMobile}
//                 handleBuyNow={handleBuyNow}
//                 expandedDesc={expandedDesc}
//                 setExpandedDesc={setExpandedDesc}
//                 navigate={navigate}
//               />
//             ))}
//           </div>

//           {/* ── SEE MORE — original style + drip ── */}
//           <div style={{ textAlign: "center", paddingTop: "1.5rem", overflow: "visible" }}>
//             <SeeMoreDripButton
//               isMobile={isMobile}
//               onClick={() => navigate("/product")}
//             />
//           </div>

//         </div>
//       </section>

//       {/* ── Highlight Scroll Bar ── */}
//       <HighlightScrollBar />

//       {/* ── Motivational Section ── */}
//       <MotivationalSection />

//       {/* ── Features Section ── */}
//       <FeaturesSection />

//       {/* ── Video Showcase Section ── */}
//       <VideoShowcaseSection />

//       {/* ── Video Carousel Section ── */}
//       <VideoCarouselSection />

//       {/* ── Footer ── */}
//       <Footer />

//       {/* ── Login Modal ── */}
//       {showLoginModal && (
//         <div style={{
//           position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)",
//           display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
//         }}>
//           <div style={{
//             backgroundColor: "#171717", padding: "2rem", borderRadius: "0.5rem",
//             textAlign: "center", width: "90%", maxWidth: "400px", border: "2px solid #facc15"
//           }}>
//             <h3 style={{ color: "#facc15", marginBottom: "1rem" }}>Login Required</h3>
//             <p style={{ color: "#d1d5db", marginBottom: "1.5rem" }}>Please login to purchase this product.</p>
//             <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
//               <button onClick={() => (window.location.href = "/login")}
//                 style={{ backgroundColor: "#facc15", color: "black", padding: "0.5rem 1.5rem", border: "none", borderRadius: "0.25rem", fontWeight: "bold", cursor: "pointer" }}>
//                 Login
//               </button>
//               <button onClick={() => setShowLoginModal(false)}
//                 style={{ backgroundColor: "transparent", color: "#facc15", padding: "0.5rem 1.5rem", border: "1px solid #facc15", borderRadius: "0.25rem", fontWeight: "bold", cursor: "pointer" }}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <FuelEarnShareFloat />
//       <WhatsAppFloat />
//     </div>
//   );
// };

// export default MPACTLandingPage;

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios"
// import { ShoppingCart, User, Search, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
// import MotivationalSection from "./MotivationalSection";
// import VideoShowcaseSection from "./VideoShowcaseSection";
// import FeaturesSection from "./FeaturesSection";
// import proteinGym from "../assets/rrs/protein-gym.jpg";
// import { addToCartApi } from "../api/cartApi";
// import { Instagram, Youtube } from 'lucide-react';
// import { SiTiktok } from "react-icons/si";
// import WhatsAppFloat from '../components/WhatsAppFloat';
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Footer from "../components/Footer";
// import { useAuth } from "../context/AuthContext";
// import HomeAds from './HomeAds';
// import HighlightScrollBar from '../components/OfferScrollBar';
// import VideoCarouselSection from './Videocarouselsection';
// import StickyCircleSection from './RoundVideo'
// import FuelEarnShareFloat from "../components/FuelEarnShareFloat";

// /* ── Lottie (same package already used in VideoShowcaseSection) ── */
// import Lottie from "lottie-react";

// /* ═══════════════════════════════════════════════════════════════════════
//    DRIP ANIMATION — same data as VideoShowcaseSection, reused here
// ═══════════════════════════════════════════════════════════════════════ */
// const DRIP_ANIMATION = { "v": "5.12.1", "fr": 30, "ip": 0, "op": 76, "w": 315, "h": 317, "nm": "!!bttn_hover", "ddd": 0, "assets": [], "layers": [{ "ddd": 0, "ind": 2, "ty": 4, "nm": "Shape Layer 4", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [152.75, 163.25, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [0, 0, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.838, "y": 0.882 }, "o": { "x": 0.333, "y": 0 }, "t": 0, "s": [{ "i": [[11, -0.75], [9, -4], [-12.609, -0.287], [-7.188, 2.312]], "o": [[-11, 0.75], [4.5, -2.375], [8.25, 0.188], [1.919, -0.617]], "v": [[77.75, 23.25], [45.25, 30.375], [76.875, 30.188], [101.938, 28.938]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.619, "y": 0.502 }, "t": 29, "s": [{ "i": [[11, -0.75], [9, -4], [-14.125, 2.312], [-12.812, 4.062]], "o": [[-11, 0.75], [22.875, 4.875], [12.503, -2.047], [1.921, -0.609]], "v": [[77.75, 23.25], [45.25, 30.375], [74.375, 50.688], [102.812, 27.312]], "c": true }] }, { "t": 44, "s": [{ "i": [[11, -0.75], [9, -4], [-12.17, 3.313], [-11.938, 4.062]], "o": [[-11, 0.75], [14.625, 0.25], [11.25, -3.062], [3.101, -1.055]], "v": [[77.75, 23.25], [45.25, 30.875], [75.625, 48.812], [102.688, 26.812]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [1, 0.8352941176, 0, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 137, "st": 0, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 3, "ty": 4, "nm": "Shape Layer 3", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [136.404, 202.688, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [38.654, 39.688, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.68, "y": 0.495 }, "o": { "x": 0.373, "y": 0 }, "t": 16, "s": [{ "i": [[13.625, 0.25], [0.898, -3.253], [-9.49, -0.463], [-5.899, -0.329], [-3.102, -0.039], [-7.938, -0.375], [-2, 0]], "o": [[-13.625, -0.25], [-1, 3.625], [11.781, 0.575], [4.5, 0.251], [4.937, 0.062], [4.755, 0.225], [2, 0]], "v": [[20.125, 26.5], [2.125, 27.875], [20.032, 29.487], [37.625, 29.874], [48.813, 29.75], [66.25, 30.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.3, "y": 0.474 }, "t": 31, "s": [{ "i": [[13.625, 0.25], [0.091, -3.374], [-9.49, -0.463], [-5.868, -0.691], [-1.92, -2.437], [-5.098, 8.855], [-2, 0]], "o": [[-13.625, -0.25], [-0.163, 6.041], [11.781, 0.575], [4.25, 0.5], [3.25, 4.125], [2.375, -4.125], [2, 0]], "v": [[20.125, 26.5], [2.125, 28.625], [20.094, 35.05], [38, 33.374], [46.375, 40.875], [66.125, 38.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 46, "s": [{ "i": [[13.625, 0.25], [0.151, -3.372], [-9.49, -0.463], [-5.437, -2.312], [0.698, -3.023], [3.25, 19.25], [-2, 0]], "o": [[-13.625, -0.25], [7.375, 0.5], [11.781, 0.575], [3.239, 1.378], [-3, 13], [-2.463, -14.586], [2, 0]], "v": [[20.125, 26.5], [1.125, 34.75], [20.969, 42.8], [43.75, 40.875], [47.5, 54.75], [63, 54], [72.5, 27.25]], "c": true }] }, { "t": 59, "s": [{ "i": [[13.625, 0.25], [-3.37, 0.193], [-9.49, -0.463], [-5.437, -2.312], [0.211, -3.095], [1.341, 18.583], [-2, 0]], "o": [[-13.625, -0.25], [8.75, -0.5], [11.781, 0.575], [3.239, 1.378], [-0.75, 11], [-0.875, -12.125], [2, 0]], "v": [[20.125, 26.5], [1.5, 32.375], [21.344, 40.925], [43, 38.75], [45.5, 52], [64.125, 50.125], [72.5, 27.25]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [1, 0.8352941176, 0, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 153, "st": 16, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 4, "ty": 4, "nm": "Shape Layer 2", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [183, 234.377, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.667, "y": 0.32 }, "o": { "x": 0.333, "y": 0 }, "t": 7, "s": [{ "i": [[0, 0.316], [6.837, 0.024], [-0.25, -0.601], [-3.691, -0.402], [-7.5, 0.016], [-4.866, 0.411]], "o": [[-1.5, -0.395], [-7.929, -0.028], [3.25, 0.506], [3.846, 0.419], [5.771, -0.012], [5.115, -0.432]], "v": [[-44.375, 31.881], [-69.125, 31.739], [-95.375, 31.976], [-85.721, 33.336], [-70.5, 33.984], [-54.509, 33.201]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0.68 }, "t": 20.154, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [-3.691, -3.179], [-7.5, 0.125], [-4.866, 3.25]], "o": [[-1.5, -3.125], [-7.929, -0.221], [3.25, 4], [3.846, 3.312], [5.771, -0.096], [5.115, -3.416]], "v": [[-44.125, 32.125], [-68.875, 31], [-95.125, 32.875], [-85.471, 43.625], [-70.25, 48.75], [-54.259, 42.562]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 34.77, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.125, -8.875], [-12.875, -0.25], [-0.25, 8.125]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.127, 9.003], [12.133, 0.236], [0.388, -12.625]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 52.125], [-70.5, 75.75], [-65.875, 51.625]], "c": true }] }, { "t": 56, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.375, -7.25], [-12.5, -0.25], [0.164, 4.872]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.375, 7.25], [12.5, 0.25], [-0.375, -11.125]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 50.625], [-70.5, 69.75], [-65.875, 50.125]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [1, 0.8352941176, 0, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 144, "st": 7, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 5, "ty": 4, "nm": "Shape Layer 1", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [84, 235.877, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.333, "y": 0 }, "t": 15, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.75, 27.526], [-96.375, 28.651], [-80.875, 31.617], [-60.25, 32.604], [-40.5, 31.028]], "c": true }] }, { "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "t": 20.2, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.875, 30.776], [-96.375, 28.651], [-81, 34.117], [-60.125, 35.729], [-40.5, 33.778]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.167, "y": 0.167 }, "t": 34.5, "s": [{ "i": [[-6.75, 6.25], [18, -2.25], [-3.278, -2.217], [-9, -0.805], [-3.5, 2.645]], "o": [[-12.25, -8], [8.883, 8.702], [4, 2.706], [7.346, 0.657], [3.5, -2.645]], "v": [[-23.75, 29], [-96.75, 27.25], [-80.875, 44.044], [-60, 51.305], [-40.375, 42.52]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 54, "s": [{ "i": [[-7.5, -0.25], [18.75, -4.5], [-0.375, -17.419], [-13.5, 0.195], [0.073, 10.144]], "o": [[-12.25, -8], [8.75, 12.25], [0.181, 8.402], [14.375, -0.208], [-0.125, -17.27]], "v": [[-49.125, 34.625], [-94.75, 28.25], [-72.375, 60.544], [-67.625, 88.805], [-62.625, 60.27]], "c": true }] }, { "t": 74, "s": [{ "i": [[-8.625, -2], [18.75, -4.5], [-0.25, -14.669], [-15.5, 0.195], [0.51, 10.132]], "o": [[-12.25, -8], [8.883, 8.702], [0.143, 8.402], [15.5, -0.195], [-0.75, -14.895]], "v": [[-49.125, 35], [-93.25, 29.625], [-74, 59.169], [-67.5, 83.805], [-60.5, 58.395]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [1, 0.8352941176, 0, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 161, "st": 24, "ct": 1, "bm": 0 }], "markers": [], "props": {} };

// /* ═══════════════════════════════════════════════════════════════════════
//    SEE MORE DRIP BUTTON — original button style + Lottie drip on hover
// ═══════════════════════════════════════════════════════════════════════ */
// function SeeMoreDripButton({ onClick, isMobile }) {
//   const lottieRef = useRef(null);
//   const [hovered, setHovered] = useState(false);

//   const handleEnter = () => {
//     setHovered(true);
//     if (!lottieRef.current || isMobile) return;
//     lottieRef.current.goToAndPlay(0, true);
//   };

//   const handleLeave = () => {
//     setHovered(false);
//     if (!lottieRef.current || isMobile) return;
//     lottieRef.current.stop();
//   };

//   return (
    
//     <div
//       style={{ position: "relative", display: "inline-block" }}
//       onMouseEnter={handleEnter}
//       onMouseLeave={handleLeave}
//     >
//     {/* Original button — exact same inline style as before */}
//       <button
//         onClick={onClick}
//         style={{
//           backgroundColor: hovered ? "#ffd500" : "#facc15",
//           color: "black",
//           fontWeight: "bold",
//           padding: "0.75rem 2rem",
//           borderRadius: "25px",
//           marginTop: "20px",
//           border: "none",
//           cursor: "pointer",
//           transition: "all 0.3s",
//           transform: hovered ? "scale(1.05)" : "scale(1)",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//           {/* Drip Lottie — floats above the button, desktop only */}
//           {!isMobile && (
//             <div style={{
//               position: "absolute",
//               /* Centre the drip above the button */
//               width: "160px",
//               height: "172px",
//               top: "-57px",
//               left: "50%",
//               transform: "translateX(-50%)",
//               pointerEvents: "none",
//               zIndex: 10,
//             }}>
//               <Lottie
//                 lottieRef={lottieRef}
//                 animationData={DRIP_ANIMATION}
//                 loop={false}
//                 autoplay={false}
//                 style={{ width: "100%", height: "100%" }}
//               />
//             </div>
//           )}
//         SEE MORE →
//       </button>
//     </div>
//   );
// }

// /* ================= CAROUSEL HOOK ================= */
// function useProductCarousel(images = []) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const intervalRef = useRef(null);

//   const startCarousel = () => {
//     setIsHovered(true);
//     if (images.length > 1) {
//       // Start from the second image immediately when hovered
//       setActiveIndex(1);
//       intervalRef.current = setInterval(() => {
//         setActiveIndex((prev) => (prev + 1) % images.length);
//       }, 3000);
//     } else {
//       setActiveIndex(0);
//     }
//   };

//   const stopCarousel = () => {
//     setIsHovered(false);
//     clearInterval(intervalRef.current);
//     intervalRef.current = null;
//     // Reset to first image when hover ends
//     setActiveIndex(0);
//   };

//   useEffect(() => {
//     return () => clearInterval(intervalRef.current);
//   }, []);

//   return { activeIndex, isHovered, startCarousel, stopCarousel };
// }

// /* ================= HOME PRODUCT CARD ================= */
// function HomeProductCard({ product, isMobile, handleBuyNow, expandedDesc, setExpandedDesc, navigate }) {
//   const images = product.images?.length > 0 ? product.images : [{ url: proteinGym }];
//   const { activeIndex, isHovered, startCarousel, stopCarousel } = useProductCarousel(images);

//   return (
//     <div
//       onClick={() => navigate(`/productspec/${product._id}`)}
//       onMouseEnter={startCarousel}
//       onMouseLeave={stopCarousel}
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         background: "linear-gradient(to bottom, rgba(120,53,15,0.4), #171717)",
//         border: "2px solid rgba(133,77,14,0.5)",
//         borderRadius: "0.75rem",
//         overflow: "hidden",
//         transition: "all 0.4s ease",
//         transform: isHovered ? "translateY(-6px)" : "scale(1)",
//         boxShadow: isHovered ? "0 4px 18px rgba(0, 0, 0, 0.25)" : "none",
//         cursor: "pointer",
//       }}
//     >
//       {/* ── Image + Carousel ── */}
//       <div style={{
//         height: isMobile ? "150px" : "360px",
//         overflow: "hidden",
//         backgroundColor: "#000",
//         position: "relative",
//       }}>
//         {product.discountPercent > 0 && (
//           <div style={{
//             position: "absolute", top: 8, left: 8,
//             background: "#ff0000", color: "white",
//             padding: isMobile ? "3px 6px" : "4px 8px",
//             fontSize: isMobile ? "9px" : "13px",
//             fontWeight: 800, borderRadius: "6px", zIndex: 2,
//           }}>
//             {product.discountPercent}% OFF
//           </div>
//         )}

//         {/* Carousel dots - only show when hovering and multiple images */}
//         {/* {images.length > 1 && isHovered && (
//           <div style={{
//             position: "absolute", bottom: 8, left: "50%",
//             transform: "translateX(-50%)",
//             display: "flex", gap: 5, zIndex: 5, pointerEvents: "none",
//           }}>
//             {images.map((_, i) => (
//               <span key={i} style={{
//                 width: i === activeIndex ? (isMobile ? 8 : 10) : (isMobile ? 5 : 6),
//                 height: i === activeIndex ? (isMobile ? 8 : 10) : (isMobile ? 5 : 6),
//                 borderRadius: "50%",
//                 background: i === activeIndex ? "#facc15" : "rgba(255,255,255,0.45)",
//                 display: "inline-block",
//                 transition: "all 0.3s ease",
//                 transform: i === activeIndex ? "scale(1.4)" : "scale(1)",
//               }} />
//             ))}
//           </div>
//         )} */}

//         <img
//           src={images[activeIndex]?.url || proteinGym}
//           alt={product.name || "product"}
//           loading="lazy"
//           style={{
//             width: "100%", height: "100%", objectFit: "cover",
//             transition: "transform 0.5s ease, opacity 0.35s ease",
//             transform: isHovered ? "scale(1.08)" : "scale(1)",
//             animation: isHovered && images.length > 1 ? "carouselFade 0.5s ease-in-out" : "none",
//           }}
//         />
//       </div>

//       {/* ── Content ── */}
//       <div style={{
//         padding: "0.75rem", backgroundColor: "#171717",
//         display: "flex", flexDirection: "column", flexGrow: 1,
//       }}>
//         {product.title && (
//           <h3 style={{
//             fontSize: "1rem", fontWeight: 900, color: "white",
//             textAlign: "center", marginBottom: "0.25rem", textTransform: "uppercase",
//           }}>
//             {product.title}
//           </h3>
//         )}

//         <p style={{ fontSize: "0.7rem", color: "#9ca3af", textAlign: "center", marginBottom: "0.5rem" }}>
//           {product.name}
//         </p>

//         {(() => {
//           const isLong = isMobile && product.description?.length > 60;
//           const isExpanded = expandedDesc[product._id];
//           return (
//             <p style={{ fontSize: "10px", color: "#9ca3af", marginBottom: "0.5rem" }}>
//               {isLong && !isExpanded ? product.description.slice(0, 30) + "..." : product.description}
//               {isLong && (
//                 <span
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setExpandedDesc((prev) => ({ ...prev, [product._id]: !prev[product._id] }));
//                   }}
//                   style={{ color: "#facc15", cursor: "pointer", fontWeight: "bold", marginLeft: "4px" }}
//                 >
//                   {isExpanded ? " See less" : " See more"}
//                 </span>
//               )}
//             </p>
//           );
//         })()}

//         {!isMobile && (
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.375rem", marginBottom: "0.5rem" }}>
//             {Array.isArray(product.highlights) && product.highlights.map((item, i) => (
//               <div key={i} style={{
//                 border: "1px solid rgba(202,138,4,0.5)", borderRadius: "0.25rem",
//                 padding: "0.125rem 0.375rem", fontSize: "9px",
//                 fontWeight: "bold", textAlign: "center", color: "#facc15",
//               }}>
//                 {item}
//               </div>
//             ))}
//           </div>
//         )}

//         <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.5rem" }}>
//           <div>
//             {"★".repeat(Math.round(product.rating || 0)).split("").map((_, i) => (
//               <span key={i} style={{ color: "#facc15", fontSize: "0.75rem" }}>★</span>
//             ))}
//             {"☆".repeat(5 - Math.round(product.rating || 0)).split("").map((_, i) => (
//               <span key={i} style={{ color: "#4b5563", fontSize: "0.75rem" }}>☆</span>
//             ))}
//           </div>
//           <span style={{ fontSize: "10px", color: "#9ca3af" }}>
//             {product.numReviews || 0} Reviews
//           </span>
//         </div>

//         <div style={{ marginTop: "auto" }}>
//           {product.originalPrice > product.price && (
//             <div style={{ marginBottom: "0.25rem" }}>
//               <span style={{ fontSize: "10px", color: "#6b7280", textDecoration: "line-through" }}>
//                 ₹{product.originalPrice}
//               </span>
//               <span style={{ fontSize: "10px", color: "#4ade80", marginLeft: "0.25rem", fontWeight: "bold" }}>
//                 {product.discountPercent}% OFF
//               </span>
//             </div>
//           )}

//           <div style={{ fontSize: "1.1rem", fontWeight: 900, marginBottom: "0.75rem", color: "white" }}>
//             RS : {product.price}
//           </div>

//           {product.countInStock > 0 ? (
//             <button
//               onClick={(e) => { e.stopPropagation(); handleBuyNow(product); }}
//               style={{
//                 width: "100%", backgroundColor: "#facc15", color: "black",
//                 fontWeight: 900, padding: "0.5rem", borderRadius: "0.25rem",
//                 border: "none", cursor: "pointer", transition: "all 0.3s", fontSize: "0.75rem",
//               }}
//               onMouseEnter={(e) => e.target.style.backgroundColor = "#ffd500"}
//               onMouseLeave={(e) => e.target.style.backgroundColor = "#facc15"}
//             >
//               PLACE ORDER
//             </button>
//           ) : (
//             <button disabled onClick={(e) => e.stopPropagation()}
//               style={{
//                 width: "100%", backgroundColor: "#2a2a2a", color: "#9ca3af",
//                 fontWeight: 900, padding: "0.5rem", borderRadius: "0.25rem",
//                 border: "1px solid #555", cursor: "not-allowed", fontSize: "0.75rem", opacity: 0.7,
//               }}
//             >
//               OUT OF STOCK
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Carousel fade animation */}
//       <style>{`
//         @keyframes carouselFade {
//           0% { opacity: 0.4; transform: scale(1.04); }
//           100% { opacity: 1; transform: scale(1.08); }
//         }
//       `}</style>
//     </div>
//   );
// }

// /* ================= MAIN PAGE ================= */
// const MPACTLandingPage = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [scrollY, setScrollY] = useState(0);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [hoveredButton, setHoveredButton] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [expandedDesc, setExpandedDesc] = useState({});

//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(false);
//   const [productError, setProductError] = useState(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [cartMessage, setCartMessage] = useState("");
//   const [heroSlides, setHeroSlides] = useState([]);
//   const [loadingBanners, setLoadingBanners] = useState(true);
//   const navigate = useNavigate();
//   const { user, loading } = useAuth();

//   const heroRef = useRef(null);
//   const motivationalRef = useRef(null);
//   const productsRef = useRef(null);
//   const aboutRef = useRef(null);
//   const blogRef = useRef(null);
//   const slideIntervalRef = useRef(null);

//   useEffect(() => {
//     const refreshTimeout = setTimeout(() => { ScrollTrigger.refresh(); }, 100);

//     if (heroSlides && heroSlides.length > 0) {
//       if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
//       slideIntervalRef.current = setInterval(() => {
//         setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1);
//       }, 4000);
//     }

//     const handleScroll = () => setScrollY(window.scrollY);
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       ScrollTrigger.refresh();
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     window.addEventListener("resize", handleResize);

//     return () => {
//       clearTimeout(refreshTimeout);
//       if (slideIntervalRef.current) { clearInterval(slideIntervalRef.current); slideIntervalRef.current = null; }
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [heroSlides]);

//   const fetchProducts = async () => {
//     try {
//       setLoadingProducts(true);
//       const res = await api.get("/api/products", { params: { limit: 8 } });
//       setProducts(res.data.products || []);
//     } catch (error) {
//       console.error("Failed to load products:", error);
//       setProductError("Failed to load products");
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   useEffect(() => { fetchProducts(); }, []);

//   useEffect(() => {
//     const fetchHeroBanners = async () => {
//       try {
//         const res = await api.get("/api/hero-banners");
//         setHeroSlides(res.data || []);
//       } catch (error) {
//         console.error("Failed to load hero banners");
//       } finally {
//         setLoadingBanners(false);
//       }
//     };
//     fetchHeroBanners();
//   }, []);

//   useEffect(() => {
//     if (!loadingProducts && !loadingBanners) {
//       const handleLoad = () => setTimeout(() => ScrollTrigger.refresh(), 400);
//       if (document.readyState === "complete") {
//         handleLoad();
//       } else {
//         window.addEventListener("load", handleLoad);
//         return () => window.removeEventListener("load", handleLoad);
//       }
//     }
//   }, [loadingProducts, loadingBanners]);

//   const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

//   const handleBuyNow = (product) => {
//     if (loading) return;
//     if (!user) { setShowLoginModal(true); return; }
//     navigate("/checkout", {
//       state: {
//         directBuy: true,
//         product: { _id: product._id, name: product.name, price: product.price, image: product.images?.[0]?.url, qty: 1 }
//       }
//     });
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       backgroundColor: '#171717',
//       color: 'white',
//       overflowX: 'hidden',
//       fontFamily: "'Jersey 25', sans-serif"
//     }}>

//       {/* ── Fixed Header ── */}
//       <header style={{
//         position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
//         backgroundColor: isMobile ? 'rgb(250, 204, 21)' : (scrollY > 100 ? 'rgba(250, 204, 21, 0.95)' : 'rgb(250, 204, 21)'),
//         backdropFilter: (isMobile || scrollY > 100) ? 'blur(10px)' : 'none',
//         color: 'black', transition: 'all 0.3s'
//       }}>
//         <div style={{
//           maxWidth: '1280px', margin: '0 auto', padding: '1rem',
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between'
//         }}>
//           <div style={{ fontSize: isMobile ? '1.5rem' : '1.875rem', fontWeight: 'bold', cursor: 'pointer' }}
//             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
//             MPACT
//           </div>

//           <nav style={{ display: isMobile ? 'none' : 'flex', gap: '2rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
//             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
//               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>HOME</button>
//             <button onClick={() => scrollToSection(productsRef)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
//               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>PRODUCTS</button>
//             <button onClick={() => scrollToSection(aboutRef)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
//               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>ABOUT US</button>
//             <button onClick={() => scrollToSection(blogRef)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
//               onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>BLOG</button>
//           </nav>

//           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//             <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><Search size={20} /></button>
//             <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><User size={20} /></button>
//             <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><ShoppingCart size={20} /></button>
//             <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: isMobile ? 'block' : 'none' }}
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div style={{
//           display: isMobile ? 'block' : 'none', overflow: 'hidden',
//           maxHeight: mobileMenuOpen ? '384px' : '0',
//           opacity: mobileMenuOpen ? 1 : 0, transition: 'all 0.3s'
//         }}>
//           <nav style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
//             <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
//               style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', color: 'inherit' }}>HOME</button>
//             <button onClick={() => { scrollToSection(productsRef); setMobileMenuOpen(false); }}
//               style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', color: 'inherit' }}>PRODUCTS</button>
//             <button onClick={() => { scrollToSection(aboutRef); setMobileMenuOpen(false); }}
//               style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', color: 'inherit' }}>ABOUT US</button>
//             <button onClick={() => { scrollToSection(blogRef); setMobileMenuOpen(false); }}
//               style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}>BLOG</button>
//           </nav>
//         </div>
//       </header>

//       {/* ── Hero Slider ── */}
//       <section ref={heroRef} style={{
//         position: 'relative', backgroundColor: 'black', paddingTop: '0rem', overflow: 'hidden',
//         height: isMobile ? '50vh' : 'calc(100vh - 5rem)',
//         minHeight: isMobile ? '300px' : '600px'
//       }}>
//         <div style={{ width: '100%', margin: '0', padding: '0', height: '100%' }}>
//           <div style={{ position: 'relative', height: '100%', width: '100%' }}>
//             <div style={{
//               position: 'relative', height: '100%', width: '100%',
//               display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
//             }}>
//               {heroSlides.map((slide, index) => (
//                 <div key={slide.id || index} style={{
//                   position: 'absolute', inset: 0,
//                   opacity: index === currentSlide ? 1 : 0,
//                   transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)',
//                   pointerEvents: index === currentSlide ? 'auto' : 'none',
//                   transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out',
//                   height: '100%', width: '100%'
//                 }}>
//                   <div style={{
//                     width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     transform: index === currentSlide ? `translateY(${scrollY * 0.1}px)` : 'translateY(0)',
//                     transition: 'transform 0.1s linear'
//                   }}>
//                     {slide.mediaType === 'video' ? (
//                       <video src={slide.video?.url} autoPlay muted loop playsInline
//                         style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '100%', margin: '0 auto' }} />
//                     ) : (
//                       <img src={slide.image?.url || proteinGym} alt={`Slide ${index + 1}`}
//                         style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '100%', margin: '0 auto' }} />
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── Home Ads ── */}
//       <HomeAds />

//       {/* ── Products Section ── */}
//       <section ref={productsRef} style={{ padding: "4rem 0", backgroundColor: "#262626", position: "relative", overflow: "hidden" }}>
//         <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
//           <h2 style={{ fontSize: isMobile ? "2rem" : "3rem", fontWeight: 900, color: "#facc15", textAlign: "center", marginBottom: "2rem" }}>
//             FIND OUR PRODUCTS
//           </h2>

//           {cartMessage && (
//             <p style={{ textAlign: "center", marginBottom: "1rem", fontWeight: "bold", color: cartMessage.startsWith("✅") ? "#4ade80" : "#f87171" }}>
//               {cartMessage}
//             </p>
//           )}

//           {loadingProducts && <p style={{ textAlign: "center", color: "#facc15" }}>Loading products...</p>}
//           {productError && <p style={{ textAlign: "center", color: "red" }}>{productError}</p>}

//           <div style={{
//             display: "grid",
//             gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(260px, 1fr))",
//             gap: "1.25rem"
//           }}>
//             {Array.isArray(products) && products.map((product) => (
//               <HomeProductCard
//                 key={product._id}
//                 product={product}
//                 isMobile={isMobile}
//                 handleBuyNow={handleBuyNow}
//                 expandedDesc={expandedDesc}
//                 setExpandedDesc={setExpandedDesc}
//                 navigate={navigate}
//               />
//             ))}
//           </div>

//           {/* ── SEE MORE — original style + drip ── */}
//           <div style={{ textAlign: "center", paddingTop: "1.5rem", overflow: "visible" }}>
//             <SeeMoreDripButton
//               isMobile={isMobile}
//               onClick={() => navigate("/product")}
//             />
//           </div>

//         </div>
//       </section>

//       {/* ── Highlight Scroll Bar ── */}
//       <HighlightScrollBar />

//       {/* ── Motivational Section ── */}
//       <MotivationalSection />

//       {/* ── Features Section ── */}
//       <FeaturesSection />

//       {/* ── Video Showcase Section ── */}
//       <VideoShowcaseSection />

//       {/* ── Video Carousel Section ── */}
//       <VideoCarouselSection />

//       {/* ── Footer ── */}
//       <Footer />

//       {/* ── Login Modal ── */}
//       {showLoginModal && (
//         <div style={{
//           position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)",
//           display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
//         }}>
//           <div style={{
//             backgroundColor: "#171717", padding: "2rem", borderRadius: "0.5rem",
//             textAlign: "center", width: "90%", maxWidth: "400px", border: "2px solid #facc15"
//           }}>
//             <h3 style={{ color: "#facc15", marginBottom: "1rem" }}>Login Required</h3>
//             <p style={{ color: "#d1d5db", marginBottom: "1.5rem" }}>Please login to purchase this product.</p>
//             <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
//               <button onClick={() => (window.location.href = "/login")}
//                 style={{ backgroundColor: "#facc15", color: "black", padding: "0.5rem 1.5rem", border: "none", borderRadius: "0.25rem", fontWeight: "bold", cursor: "pointer" }}>
//                 Login
//               </button>
//               <button onClick={() => setShowLoginModal(false)}
//                 style={{ backgroundColor: "transparent", color: "#facc15", padding: "0.5rem 1.5rem", border: "1px solid #facc15", borderRadius: "0.25rem", fontWeight: "bold", cursor: "pointer" }}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <FuelEarnShareFloat />
//       <WhatsAppFloat />
//     </div>
//   );
// };

// export default MPACTLandingPage;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axios"
import { ShoppingCart, User, Search, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import MotivationalSection from "./MotivationalSection";
import VideoShowcaseSection from "./VideoShowcaseSection";
import FeaturesSection from "./FeaturesSection";
import proteinGym from "../assets/rrs/protein-gym.jpg";
import { addToCartApi } from "../api/cartApi";
import { Instagram, Youtube } from 'lucide-react';
import { SiTiktok } from "react-icons/si";
import WhatsAppFloat from '../components/WhatsAppFloat';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import HomeAds from './HomeAds';
import HighlightScrollBar from '../components/OfferScrollBar';
import VideoCarouselSection from './Videocarouselsection';
import StickyCircleSection from './RoundVideo'
import FuelEarnShareFloat from "../components/FuelEarnShareFloat";

/* ── Lottie (same package already used in VideoShowcaseSection) ── */
import Lottie from "lottie-react";

/* ═══════════════════════════════════════════════════════════════════════
   DRIP ANIMATION — same data as VideoShowcaseSection, reused here
═══════════════════════════════════════════════════════════════════════ */
const DRIP_ANIMATION = { "v": "5.12.1", "fr": 30, "ip": 0, "op": 76, "w": 315, "h": 317, "nm": "!!bttn_hover", "ddd": 0, "assets": [], "layers": [{ "ddd": 0, "ind": 2, "ty": 4, "nm": "Shape Layer 4", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [152.75, 163.25, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [0, 0, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.838, "y": 0.882 }, "o": { "x": 0.333, "y": 0 }, "t": 0, "s": [{ "i": [[11, -0.75], [9, -4], [-12.609, -0.287], [-7.188, 2.312]], "o": [[-11, 0.75], [4.5, -2.375], [8.25, 0.188], [1.919, -0.617]], "v": [[77.75, 23.25], [45.25, 30.375], [76.875, 30.188], [101.938, 28.938]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.619, "y": 0.502 }, "t": 29, "s": [{ "i": [[11, -0.75], [9, -4], [-14.125, 2.312], [-12.812, 4.062]], "o": [[-11, 0.75], [22.875, 4.875], [12.503, -2.047], [1.921, -0.609]], "v": [[77.75, 23.25], [45.25, 30.375], [74.375, 50.688], [102.812, 27.312]], "c": true }] }, { "t": 44, "s": [{ "i": [[11, -0.75], [9, -4], [-12.17, 3.313], [-11.938, 4.062]], "o": [[-11, 0.75], [14.625, 0.25], [11.25, -3.062], [3.101, -1.055]], "v": [[77.75, 23.25], [45.25, 30.875], [75.625, 48.812], [102.688, 26.812]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [1, 0.8352941176, 0, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 137, "st": 0, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 3, "ty": 4, "nm": "Shape Layer 3", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [136.404, 202.688, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [38.654, 39.688, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.68, "y": 0.495 }, "o": { "x": 0.373, "y": 0 }, "t": 16, "s": [{ "i": [[13.625, 0.25], [0.898, -3.253], [-9.49, -0.463], [-5.899, -0.329], [-3.102, -0.039], [-7.938, -0.375], [-2, 0]], "o": [[-13.625, -0.25], [-1, 3.625], [11.781, 0.575], [4.5, 0.251], [4.937, 0.062], [4.755, 0.225], [2, 0]], "v": [[20.125, 26.5], [2.125, 27.875], [20.032, 29.487], [37.625, 29.874], [48.813, 29.75], [66.25, 30.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.3, "y": 0.474 }, "t": 31, "s": [{ "i": [[13.625, 0.25], [0.091, -3.374], [-9.49, -0.463], [-5.868, -0.691], [-1.92, -2.437], [-5.098, 8.855], [-2, 0]], "o": [[-13.625, -0.25], [-0.163, 6.041], [11.781, 0.575], [4.25, 0.5], [3.25, 4.125], [2.375, -4.125], [2, 0]], "v": [[20.125, 26.5], [2.125, 28.625], [20.094, 35.05], [38, 33.374], [46.375, 40.875], [66.125, 38.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 46, "s": [{ "i": [[13.625, 0.25], [0.151, -3.372], [-9.49, -0.463], [-5.437, -2.312], [0.698, -3.023], [3.25, 19.25], [-2, 0]], "o": [[-13.625, -0.25], [7.375, 0.5], [11.781, 0.575], [3.239, 1.378], [-3, 13], [-2.463, -14.586], [2, 0]], "v": [[20.125, 26.5], [1.125, 34.75], [20.969, 42.8], [43.75, 40.875], [47.5, 54.75], [63, 54], [72.5, 27.25]], "c": true }] }, { "t": 59, "s": [{ "i": [[13.625, 0.25], [-3.37, 0.193], [-9.49, -0.463], [-5.437, -2.312], [0.211, -3.095], [1.341, 18.583], [-2, 0]], "o": [[-13.625, -0.25], [8.75, -0.5], [11.781, 0.575], [3.239, 1.378], [-0.75, 11], [-0.875, -12.125], [2, 0]], "v": [[20.125, 26.5], [1.5, 32.375], [21.344, 40.925], [43, 38.75], [45.5, 52], [64.125, 50.125], [72.5, 27.25]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [1, 0.8352941176, 0, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 153, "st": 16, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 4, "ty": 4, "nm": "Shape Layer 2", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [183, 234.377, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.667, "y": 0.32 }, "o": { "x": 0.333, "y": 0 }, "t": 7, "s": [{ "i": [[0, 0.316], [6.837, 0.024], [-0.25, -0.601], [-3.691, -0.402], [-7.5, 0.016], [-4.866, 0.411]], "o": [[-1.5, -0.395], [-7.929, -0.028], [3.25, 0.506], [3.846, 0.419], [5.771, -0.012], [5.115, -0.432]], "v": [[-44.375, 31.881], [-69.125, 31.739], [-95.375, 31.976], [-85.721, 33.336], [-70.5, 33.984], [-54.509, 33.201]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0.68 }, "t": 20.154, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [-3.691, -3.179], [-7.5, 0.125], [-4.866, 3.25]], "o": [[-1.5, -3.125], [-7.929, -0.221], [3.25, 4], [3.846, 3.312], [5.771, -0.096], [5.115, -3.416]], "v": [[-44.125, 32.125], [-68.875, 31], [-95.125, 32.875], [-85.471, 43.625], [-70.25, 48.75], [-54.259, 42.562]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 34.77, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.125, -8.875], [-12.875, -0.25], [-0.25, 8.125]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.127, 9.003], [12.133, 0.236], [0.388, -12.625]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 52.125], [-70.5, 75.75], [-65.875, 51.625]], "c": true }] }, { "t": 56, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.375, -7.25], [-12.5, -0.25], [0.164, 4.872]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.375, 7.25], [12.5, 0.25], [-0.375, -11.125]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 50.625], [-70.5, 69.75], [-65.875, 50.125]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [1, 0.8352941176, 0, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 144, "st": 7, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 5, "ty": 4, "nm": "Shape Layer 1", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [84, 235.877, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.333, "y": 0 }, "t": 15, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.75, 27.526], [-96.375, 28.651], [-80.875, 31.617], [-60.25, 32.604], [-40.5, 31.028]], "c": true }] }, { "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "t": 20.2, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.875, 30.776], [-96.375, 28.651], [-81, 34.117], [-60.125, 35.729], [-40.5, 33.778]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.167, "y": 0.167 }, "t": 34.5, "s": [{ "i": [[-6.75, 6.25], [18, -2.25], [-3.278, -2.217], [-9, -0.805], [-3.5, 2.645]], "o": [[-12.25, -8], [8.883, 8.702], [4, 2.706], [7.346, 0.657], [3.5, -2.645]], "v": [[-23.75, 29], [-96.75, 27.25], [-80.875, 44.044], [-60, 51.305], [-40.375, 42.52]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 54, "s": [{ "i": [[-7.5, -0.25], [18.75, -4.5], [-0.375, -17.419], [-13.5, 0.195], [0.073, 10.144]], "o": [[-12.25, -8], [8.75, 12.25], [0.181, 8.402], [14.375, -0.208], [-0.125, -17.27]], "v": [[-49.125, 34.625], [-94.75, 28.25], [-72.375, 60.544], [-67.625, 88.805], [-62.625, 60.27]], "c": true }] }, { "t": 74, "s": [{ "i": [[-8.625, -2], [18.75, -4.5], [-0.25, -14.669], [-15.5, 0.195], [0.51, 10.132]], "o": [[-12.25, -8], [8.883, 8.702], [0.143, 8.402], [15.5, -0.195], [-0.75, -14.895]], "v": [[-49.125, 35], [-93.25, 29.625], [-74, 59.169], [-67.5, 83.805], [-60.5, 58.395]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [1, 0.8352941176, 0, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 161, "st": 24, "ct": 1, "bm": 0 }], "markers": [], "props": {} };

/* ═══════════════════════════════════════════════════════════════════════
   SEE MORE DRIP BUTTON — original button style + Lottie drip on hover
═══════════════════════════════════════════════════════════════════════ */
function SeeMoreDripButton({ onClick, isMobile }) {
  const lottieRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    if (!lottieRef.current || isMobile) return;
    lottieRef.current.goToAndPlay(0, true);
  };

  const handleLeave = () => {
    setHovered(false);
    if (!lottieRef.current || isMobile) return;
    lottieRef.current.stop();
  };

    const handleButtonEnter = () => {
    if (!lottieRef.current || isTouchDev) return;
  lottieRef.current.setSpeed(5); 
  lottieRef.current.goToAndPlay(0, true);
};

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Original button — exact same inline style as before */}
      <button
        onClick={onClick}
        onMouseEnter={handleButtonEnter}
        style={{
          backgroundColor: hovered ? "#ffd500" : "#facc15",
          color: "black",
          fontWeight: "bold",
          padding: "0.75rem 2rem",
          borderRadius: "25px",
          marginTop: "20px",
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Drip Lottie — floats above the button, desktop only */}
        {!isMobile && (
          <div style={{
            position: "absolute",
            /* Centre the drip above the button */
            width: "160px",
            height: "172px",
            top: "-57px",
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
            zIndex: 10,
          }}>
            <Lottie
              lottieRef={lottieRef}
              animationData={DRIP_ANIMATION}
              loop={false}
              autoplay={false}
              speed={5}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
        SEE MORE →
      </button>
    </div>
  );
}
/* ================= CAROUSEL HOOK ================= */
function useProductCarousel(images = []) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const startCarousel = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);

      if (images.length > 1) {
        setActiveIndex(1);

        intervalRef.current = setInterval(() => {
          setActiveIndex((prev) => {
            if (prev >= images.length - 1) {
              clearInterval(intervalRef.current); // stop at last image
              return prev;
            }
            return prev + 1;
          });
        }, 30000);
      }

    }, 1000);
  };
  const stopCarousel = () => {
    setIsHovered(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    // Reset to first image when hover ends
    setActiveIndex(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { activeIndex, isHovered, startCarousel, stopCarousel };
}

/* ================= HOME PRODUCT CARD ================= */
function HomeProductCard({ product, isMobile, handleBuyNow, expandedDesc, setExpandedDesc, navigate }) {
  const images = product.images?.length > 0 ? product.images : [{ url: proteinGym }];
  const { activeIndex, isHovered, startCarousel, stopCarousel } = useProductCarousel(images);

  return (
    <div
      onClick={() => navigate(`/productspec/${product._id}`)}
      onMouseEnter={startCarousel}
      onMouseLeave={stopCarousel}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "linear-gradient(to bottom, rgba(120,53,15,0.4), #171717)",
        border: "2px solid rgba(133,77,14,0.5)",
        borderRadius: "0.75rem",
        overflow: "hidden",
        transition: "all 0.4s ease",
        transform: isHovered ? "translateY(-6px)" : "scale(1)",
        boxShadow: isHovered ? "0 4px 18px rgba(0, 0, 0, 0.25)" : "none",
        cursor: "pointer",
      }}
    >
      {/* ── Image + Carousel ── */}
      <div style={{
        height: isMobile ? "150px" : "360px",
        overflow: "hidden",
        backgroundColor: "#000",
        position: "relative",
      }}>
        {product.discountPercent > 0 && (
          <div style={{
            position: "absolute", top: 8, left: 8,
            background: "#ff0000", color: "white",
            padding: isMobile ? "3px 6px" : "4px 8px",
            fontSize: isMobile ? "13px" : "15px",
            fontWeight: 800, borderRadius: "6px", zIndex: 2,
          }}>
            {product.discountPercent}% OFF
          </div>
        )}

        {/* Carousel dots - only show when hovering and multiple images */}
        {/* {images.length > 1 && isHovered && (
          <div style={{
            position: "absolute", bottom: 8, left: "50%",
            transform: "translateX(-50%)",
            display: "flex", gap: 5, zIndex: 5, pointerEvents: "none",
          }}>
            {images.map((_, i) => (
              <span key={i} style={{
                width: i === activeIndex ? (isMobile ? 8 : 10) : (isMobile ? 5 : 6),
                height: i === activeIndex ? (isMobile ? 8 : 10) : (isMobile ? 5 : 6),
                borderRadius: "50%",
                background: i === activeIndex ? "#facc15" : "rgba(255,255,255,0.45)",
                display: "inline-block",
                transition: "all 0.3s ease",
                transform: i === activeIndex ? "scale(1.4)" : "scale(1)",
              }} />
            ))}
          </div>
        )} */}

        <img
          src={images[activeIndex]?.url || proteinGym}
          alt={product.name || "product"}
          loading="lazy"
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 1.2s ease, opacity 0.6s ease",
            transform: isHovered ? "scale(1.08)" : "scale(1)",
            animation: isHovered && images.length > 1 ? "carouselFade 0.5s ease-in-out" : "none",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div style={{
        padding: "0.75rem", backgroundColor: "#171717",
        display: "flex", flexDirection: "column", flexGrow: 1,
      }}>
        {product.title && (
          <h3 style={{
            fontSize: "1rem", fontWeight: 900, color: "white",
            textAlign: "center", marginBottom: "0.25rem", textTransform: "uppercase",
          }}>
            {product.title}
          </h3>
        )}

        <p style={{ fontSize: "1.5rem", color: "white", textAlign: "center", marginBottom: "0.5rem",fontSize: isMobile ? "17px" : "23px" }}>
          {product.name}
        </p>

        {(() => {
          const isLong = isMobile && product.description?.length > 60;
          const isExpanded = expandedDesc[product._id];
          return (
            <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "0.5rem" }}>
              {isLong && !isExpanded ? product.description.slice(0, 30) + "..." : product.description}
              {isLong && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedDesc((prev) => ({ ...prev, [product._id]: !prev[product._id] }));
                  }}
                  style={{ color: "#facc15", cursor: "pointer", fontWeight: "bold", marginLeft: "4px" }}
                >
                  {isExpanded ? " See less" : " See more"}
                </span>
              )}
            </p>
          );
        })()}

        {!isMobile && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.375rem", marginBottom: "0.5rem" }}>
            {Array.isArray(product.highlights) && product.highlights.map((item, i) => (
              <div key={i} style={{
                border: "1px solid rgba(202,138,4,0.5)", borderRadius: "0.25rem",
                padding: "0.125rem 0.375rem", fontSize: "12px",
                fontWeight: "bold", textAlign: "center", color: "#facc15",
              }}>
                {item}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.5rem" }}>
          <div>
            {"★".repeat(Math.round(product.rating || 0)).split("").map((_, i) => (
              <span key={i} style={{ color: "#facc15", fontSize: "1rem" }}>★</span>
            ))}
            {"☆".repeat(5 - Math.round(product.rating || 0)).split("").map((_, i) => (
              <span key={i} style={{ color: "#4b5563", fontSize: "1rem" }}>☆</span>
            ))}
          </div>
          <span style={{ fontSize: "13px", color: "#9ca3af" }}>
            {product.numReviews || 0} Reviews
          </span>
        </div>

        <div style={{ marginTop: "auto" }}>
          {product.originalPrice > product.price && (
            <div style={{ marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "25px", color: "#6b7280", textDecoration: "line-through" }}>
                ₹{product.originalPrice}
              </span>
              <span style={{ fontSize: "20px", color: "#4ade80", marginLeft: "0.25rem", fontWeight: "bold",fontSize: isMobile ? "13px" : "23px" }}>
                {product.discountPercent}% OFF
              </span>
            </div>
          )}

          <div style={{ fontSize: "1.4rem", fontWeight: 900, marginBottom: "0.75rem", color: "white" }}>
            RS : {product.price}
          </div>

          {product.countInStock > 0 ? (
            <button
              onClick={(e) => { e.stopPropagation(); handleBuyNow(product); }}
              style={{
                width: "100%", backgroundColor: "#facc15", color: "black",
                fontWeight: 900, padding: "0.5rem", borderRadius: "0.25rem",
                border: "none", cursor: "pointer", transition: "all 0.3s", fontSize: "0.75rem",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#ffd500"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#facc15"}
            >
              PLACE ORDER
            </button>
          ) : (
            <button disabled onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%", backgroundColor: "#2a2a2a", color: "#9ca3af",
                fontWeight: 900, padding: "0.5rem", borderRadius: "0.25rem",
                border: "1px solid #555", cursor: "not-allowed", fontSize: "0.75rem", opacity: 0.7,
              }}
            >
              OUT OF STOCK
            </button>
          )}
        </div>
      </div>

      {/* Carousel fade animation */}
      <style>{`
        @keyframes carouselFade {
          0% { opacity: 0.4; transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}

/* ================= MAIN PAGE ================= */
const MPACTLandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedDesc, setExpandedDesc] = useState({});

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productError, setProductError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [heroSlides, setHeroSlides] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const heroRef = useRef(null);
  const motivationalRef = useRef(null);
  const productsRef = useRef(null);
  const aboutRef = useRef(null);
  const blogRef = useRef(null);
  const slideIntervalRef = useRef(null);

  useEffect(() => {
    const refreshTimeout = setTimeout(() => { ScrollTrigger.refresh(); }, 100);

    if (heroSlides && heroSlides.length > 0) {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = setInterval(() => {
        setCurrentSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1);
      }, 4000);
    }

    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      ScrollTrigger.refresh();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(refreshTimeout);
      if (slideIntervalRef.current) { clearInterval(slideIntervalRef.current); slideIntervalRef.current = null; }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [heroSlides]);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await api.get("/api/products", { params: { limit: 8 } });
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Failed to load products:", error);
      setProductError("Failed to load products");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => {
    const fetchHeroBanners = async () => {
      try {
        const res = await api.get("/api/hero-banners");
        setHeroSlides(res.data || []);
      } catch (error) {
        console.error("Failed to load hero banners");
      } finally {
        setLoadingBanners(false);
      }
    };
    fetchHeroBanners();
  }, []);

  useEffect(() => {
    if (!loadingProducts && !loadingBanners) {
      const handleLoad = () => setTimeout(() => ScrollTrigger.refresh(), 400);
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, [loadingProducts, loadingBanners]);

  const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const handleBuyNow = (product) => {
    if (loading) return;
    if (!user) { setShowLoginModal(true); return; }
    navigate("/checkout", {
      state: {
        directBuy: true,
        product: { _id: product._id, name: product.name, price: product.price, image: product.images?.[0]?.url, qty: 1 }
      }
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#171717',
      color: 'white',
      overflowX: 'hidden',
      fontFamily: "'Jersey 25', sans-serif"
    }}>

      {/* ── Fixed Header ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: isMobile ? 'rgb(250, 204, 21)' : (scrollY > 100 ? 'rgba(250, 204, 21, 0.95)' : 'rgb(250, 204, 21)'),
        backdropFilter: (isMobile || scrollY > 100) ? 'blur(10px)' : 'none',
        color: 'black', transition: 'all 0.3s'
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: isMobile ? '1.5rem' : '1.875rem', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            MPACT
          </div>

          <nav style={{ display: isMobile ? 'none' : 'flex', gap: '2rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>HOME</button>
            <button onClick={() => scrollToSection(productsRef)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>PRODUCTS</button>
            <button onClick={() => scrollToSection(aboutRef)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>ABOUT US</button>
            <button onClick={() => scrollToSection(blogRef)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>BLOG</button>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><Search size={20} /></button>
            <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><User size={20} /></button>
            <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><ShoppingCart size={20} /></button>
            <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: isMobile ? 'block' : 'none' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div style={{
          display: isMobile ? 'block' : 'none', overflow: 'hidden',
          maxHeight: mobileMenuOpen ? '384px' : '0',
          opacity: mobileMenuOpen ? 1 : 0, transition: 'all 0.3s'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
              style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', color: 'inherit' }}>HOME</button>
            <button onClick={() => { scrollToSection(productsRef); setMobileMenuOpen(false); }}
              style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', color: 'inherit' }}>PRODUCTS</button>
            <button onClick={() => { scrollToSection(aboutRef); setMobileMenuOpen(false); }}
              style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', color: 'inherit' }}>ABOUT US</button>
            <button onClick={() => { scrollToSection(blogRef); setMobileMenuOpen(false); }}
              style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 'bold', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}>BLOG</button>
          </nav>
        </div>
      </header>

      {/* ── Hero Slider ── */}
      <section ref={heroRef} style={{
        position: 'relative', backgroundColor: 'black', paddingTop: '0rem', overflow: 'hidden',
        height: isMobile ? '50vh' : 'calc(100vh - 5rem)',
        minHeight: isMobile ? '300px' : '600px'
      }}>
        <div style={{ width: '100%', margin: '0', padding: '0', height: '100%' }}>
          <div style={{ position: 'relative', height: '100%', width: '100%' }}>
            <div style={{
              position: 'relative', height: '100%', width: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
            }}>
              {heroSlides.map((slide, index) => (
                <div key={slide.id || index} style={{
                  position: 'absolute', inset: 0,
                  opacity: index === currentSlide ? 1 : 0,
                  transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)',
                  pointerEvents: index === currentSlide ? 'auto' : 'none',
                  transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out',
                  height: '100%', width: '100%'
                }}>
                  <div style={{
                    width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transform: index === currentSlide ? `translateY(${scrollY * 0.1}px)` : 'translateY(0)',
                    transition: 'transform 0.1s linear'
                  }}>
                    {slide.mediaType === 'video' ? (
                      <video src={slide.video?.url} autoPlay muted loop playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '100%', margin: '0 auto' }} />
                    ) : (
                      <img src={slide.image?.url || proteinGym} alt={`Slide ${index + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '100%', margin: '0 auto' }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Home Ads ── */}
      <HomeAds />

      {/* ── Products Section ── */}
      <section ref={productsRef} style={{ padding: "4rem 0", backgroundColor: "#262626", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
          <h2 style={{ fontSize: isMobile ? "2rem" : "3rem", fontWeight: 900, color: "#facc15", textAlign: "center", marginBottom: "2rem" }}>
            FIND OUR PRODUCTS
          </h2>

          {cartMessage && (
            <p style={{ textAlign: "center", marginBottom: "1rem", fontWeight: "bold", color: cartMessage.startsWith("✅") ? "#4ade80" : "#f87171" }}>
              {cartMessage}
            </p>
          )}

          {loadingProducts && <p style={{ textAlign: "center", color: "#facc15" }}>Loading products...</p>}
          {productError && <p style={{ textAlign: "center", color: "red" }}>{productError}</p>}

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem"
          }}>
            {Array.isArray(products) && products.map((product) => (
              <HomeProductCard
                key={product._id}
                product={product}
                isMobile={isMobile}
                handleBuyNow={handleBuyNow}
                expandedDesc={expandedDesc}
                setExpandedDesc={setExpandedDesc}
                navigate={navigate}
              />
            ))}
          </div>

          {/* ── SEE MORE — original style + drip ── */}
          <div style={{ textAlign: "center", paddingTop: "1.5rem", overflow: "visible" }}>
            <SeeMoreDripButton
              isMobile={isMobile}
              onClick={() => navigate("/product")}
            />
          </div>

        </div>
      </section>

      {/* ── Highlight Scroll Bar ── */}
      <HighlightScrollBar />

      {/* ── Motivational Section ── */}
      <MotivationalSection />

      {/* ── Features Section ── */}
      <FeaturesSection />

      {/* ── Video Showcase Section ── */}
      <VideoShowcaseSection />

      {/* ── Video Carousel Section ── */}
      <VideoCarouselSection />

      {/* ── Footer ── */}
      <Footer />

      {/* ── Login Modal ── */}
      {showLoginModal && (
        <div style={{
          position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "#171717", padding: "2rem", borderRadius: "0.5rem",
            textAlign: "center", width: "90%", maxWidth: "400px", border: "2px solid #facc15"
          }}>
            <h3 style={{ color: "#facc15", marginBottom: "1rem" }}>Login Required</h3>
            <p style={{ color: "#d1d5db", marginBottom: "1.5rem" }}>Please login to purchase this product.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button onClick={() => (window.location.href = "/login")}
                style={{ backgroundColor: "#facc15", color: "black", padding: "0.5rem 1.5rem", border: "none", borderRadius: "0.25rem", fontWeight: "bold", cursor: "pointer" }}>
                Login
              </button>
              <button onClick={() => setShowLoginModal(false)}
                style={{ backgroundColor: "transparent", color: "#facc15", padding: "0.5rem 1.5rem", border: "1px solid #facc15", borderRadius: "0.25rem", fontWeight: "bold", cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <FuelEarnShareFloat />
      <WhatsAppFloat />
    </div>
  );
};

export default MPACTLandingPage;