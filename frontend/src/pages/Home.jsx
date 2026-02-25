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

// const MPACTLandingPage = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [scrollY, setScrollY] = useState(0);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [hoveredProduct, setHoveredProduct] = useState(null);
//   const [hoveredButton, setHoveredButton] = useState(null);

//   // Backend States
//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(false);
//   const [productError, setProductError] = useState(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [cartMessage, setCartMessage] = useState("");
//   const [heroSlides, setHeroSlides] = useState([]);
//   const [loadingBanners, setLoadingBanners] = useState(true);
//   const navigate = useNavigate();
//   const { user, loading } = useAuth();

//   // Refs for scrolling
//   const heroRef = useRef(null);
//   const motivationalRef = useRef(null);
//   const productsRef = useRef(null);
//   const aboutRef = useRef(null);
//   const blogRef = useRef(null);

//   const slideIntervalRef = useRef(null);

//   useEffect(() => {
//     // ScrollTrigger refresh
//     const refreshTimeout = setTimeout(() => {
//       ScrollTrigger.refresh();
//     }, 100);

//     // Hero slider autoplay
//     if (heroSlides && heroSlides.length > 0) {
//       if (slideIntervalRef.current) {
//         clearInterval(slideIntervalRef.current);
//       }

//       slideIntervalRef.current = setInterval(() => {
//         setCurrentSlide(prev =>
//           prev === heroSlides.length - 1 ? 0 : prev + 1
//         );
//       }, 4000);
//     }

//     // Scroll listener
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     // Resize listener
//     const handleResize = () => {
//       ScrollTrigger.refresh();
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     window.addEventListener("resize", handleResize);

//     // Cleanup
//     return () => {
//       clearTimeout(refreshTimeout);
//       if (slideIntervalRef.current) {
//         clearInterval(slideIntervalRef.current);
//         slideIntervalRef.current = null;
//       }
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [heroSlides]);

//   // Fetch products for home page
//   const fetchProducts = async () => {
//     try {
//       setLoadingProducts(true);
//       const res = await api.get("/api/products", {
//         params: { limit: 8 }
//       });
//       setProducts(res.data.products || []);
//     } catch (error) {
//       console.error("Failed to load products:", error);
//       setProductError("Failed to load products");
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Fetch hero banners
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

//   const scrollToSection = (ref) => {
//     ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   const handlePrevSlide = () => {
//     setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));
//   };

//   const handleNextSlide = () => {
//     setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//   };
//   useEffect(() => {
//   if (!loadingProducts && !loadingBanners) {
//     const handleLoad = () => {
//       setTimeout(() => {
//         ScrollTrigger.refresh();
//       }, 400);
//     };

//     if (document.readyState === "complete") {
//       handleLoad();
//     } else {
//       window.addEventListener("load", handleLoad);
//       return () => window.removeEventListener("load", handleLoad);
//     }
//   }
// }, [loadingProducts, loadingBanners]);


//   const handleBuyNow = (product) => {
//     if (loading) return;
//     if (!user) {
//       setShowLoginModal(true);
//       return;
//     }
//     navigate("/checkout", {
//       state: {
//         directBuy: true,
//         product: {
//           _id: product._id,
//           name: product.name,
//           price: product.price,
//           image: product.images?.[0]?.url,
//           qty: 1
//         }
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
//       {/* Fixed Header */}
//       <header style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 50,
//         backgroundColor: scrollY > 100 ? 'rgba(250, 204, 21, 0.95)' : 'rgb(250, 204, 21)',
//         backdropFilter: scrollY > 100 ? 'blur(10px)' : 'none',
//         color: 'black',
//         transition: 'all 0.3s'
//       }}>
//         <div style={{
//           maxWidth: '1280px',
//           margin: '0 auto',
//           padding: '1rem',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between'
//         }}>
//           <div style={{
//             fontSize: '1.875rem',
//             fontWeight: 'bold',
//             cursor: 'pointer'
//           }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
//             MPACT
//           </div>

//           {/* Desktop Navigation */}
//           <nav style={{
//             display: 'none',
//             gap: '2rem',
//             fontSize: '0.875rem',
//             fontWeight: 'bold',
//             '@media (min-width: 768px)': { display: 'flex' }
//           }}>
//             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
//               background: 'none',
//               border: 'none',
//               color: 'inherit',
//               cursor: 'pointer'
//             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>HOME</button>
//             <button onClick={() => scrollToSection(productsRef)} style={{
//               background: 'none',
//               border: 'none',
//               color: 'inherit',
//               cursor: 'pointer'
//             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>PRODUCTS</button>
//             <button onClick={() => scrollToSection(aboutRef)} style={{
//               background: 'none',
//               border: 'none',
//               color: 'inherit',
//               cursor: 'pointer'
//             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>ABOUT US</button>
//             <button onClick={() => scrollToSection(blogRef)} style={{
//               background: 'none',
//               border: 'none',
//               color: 'inherit',
//               cursor: 'pointer'
//             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>BLOG</button>
//           </nav>

//           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//             <button style={{
//               background: 'none',
//               border: 'none',
//               color: 'inherit',
//               cursor: 'pointer'
//             }}>
//               <Search size={20} />
//             </button>
//             <button style={{
//               background: 'none',
//               border: 'none',
//               color: 'inherit',
//               cursor: 'pointer'
//             }}>
//               <User size={20} />
//             </button>
//             <button style={{
//               background: 'none',
//               border: 'none',
//               color: 'inherit',
//               cursor: 'pointer'
//             }}>
//               <ShoppingCart size={20} />
//             </button>

//             <button
//               style={{
//                 background: 'none',
//                 border: 'none',
//                 color: 'inherit',
//                 cursor: 'pointer',
//                 display: window.innerWidth >= 768 ? 'none' : 'block'
//               }}
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <div style={{
//           display: window.innerWidth >= 768 ? 'none' : 'block',
//           overflow: 'hidden',
//           maxHeight: mobileMenuOpen ? '384px' : '0',
//           opacity: mobileMenuOpen ? 1 : 0,
//           transition: 'all 0.3s'
//         }}>
//           <nav style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
//             <button onClick={() => {
//               window.scrollTo({ top: 0, behavior: 'smooth' });
//               setMobileMenuOpen(false);
//             }} style={{
//               padding: '0.75rem 1rem',
//               textAlign: 'left',
//               fontWeight: 'bold',
//               background: 'transparent',
//               border: 'none',
//               borderBottom: '1px solid rgba(0,0,0,0.05)',
//               cursor: 'pointer',
//               color: 'inherit'
//             }}>HOME</button>
//             <button onClick={() => {
//               scrollToSection(productsRef);
//               setMobileMenuOpen(false);
//             }} style={{
//               padding: '0.75rem 1rem',
//               textAlign: 'left',
//               fontWeight: 'bold',
//               background: 'transparent',
//               border: 'none',
//               borderBottom: '1px solid rgba(0,0,0,0.05)',
//               cursor: 'pointer',
//               color: 'inherit'
//             }}>PRODUCTS</button>
//             <button onClick={() => {
//               scrollToSection(aboutRef);
//               setMobileMenuOpen(false);
//             }} style={{
//               padding: '0.75rem 1rem',
//               textAlign: 'left',
//               fontWeight: 'bold',
//               background: 'transparent',
//               border: 'none',
//               borderBottom: '1px solid rgba(0,0,0,0.05)',
//               cursor: 'pointer',
//               color: 'inherit'
//             }}>ABOUT US</button>
//             <button onClick={() => {
//               scrollToSection(blogRef);
//               setMobileMenuOpen(false);
//             }} style={{
//               padding: '0.75rem 1rem',
//               textAlign: 'left',
//               fontWeight: 'bold',
//               background: 'transparent',
//               border: 'none',
//               cursor: 'pointer',
//               color: 'inherit'
//             }}>BLOG</button>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Slider */}
//       <section ref={heroRef} style={{ position: 'relative', backgroundColor: 'black', paddingTop: '5rem', overflow: 'hidden' }}>
//         <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1rem' }}>
//           <div style={{ position: 'relative' }}>
//             <div style={{ position: 'relative', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               {heroSlides.map((slide, index) => (
//                 <div
//                   key={slide.id || index}
//                   style={{
//                     position: 'absolute',
//                     inset: 0,
//                     opacity: index === currentSlide ? 1 : 0,
//                     transform: index === currentSlide ? 'scale(1)' : 'scale(0.95)',
//                     pointerEvents: index === currentSlide ? 'auto' : 'none',
//                     transition: 'all 0.7s'
//                   }}
//                 >
//                   <div style={{
//                     width: '100%',
//                     height: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     transform: index === currentSlide ? `translateY(${scrollY * 0.3}px)` : 'translateY(0)',
//                     transition: 'transform 0.1s linear'
//                   }}>
//                     <img
//                       src={slide.image?.url || proteinGym}
//                       alt={`Slide ${index + 1}`}
//                       style={{ width: '100%', height: '100%', objectFit: 'contain', maxWidth: '80rem', margin: '0 auto' }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
//               <button
//                 onClick={handlePrevSlide}
//                 style={{
//                   width: '3rem',
//                   height: '3rem',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   backgroundColor: 'rgba(255,255,255,0.1)',
//                   border: 'none',
//                   borderRadius: '50%',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s',
//                   color: 'white',
//                   transform: hoveredButton === 'prev' ? 'scale(1.1)' : 'scale(1)'
//                 }}
//                 onMouseEnter={() => setHoveredButton('prev')}
//                 onMouseLeave={() => setHoveredButton(null)}
//               >
//                 <ChevronLeft />
//               </button>

//               <div style={{ display: 'flex', gap: '0.5rem' }}>
//                 {heroSlides.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentSlide(index)}
//                     style={{
//                       width: index === currentSlide ? '2rem' : '0.75rem',
//                       height: '0.75rem',
//                       borderRadius: '9999px',
//                       backgroundColor: index === currentSlide ? '#facc15' : 'rgba(255,255,255,0.3)',
//                       border: 'none',
//                       cursor: 'pointer',
//                       transition: 'all 0.3s'
//                     }}
//                   />
//                 ))}
//               </div>

//               <button
//                 onClick={handleNextSlide}
//                 style={{
//                   width: '3rem',
//                   height: '3rem',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   backgroundColor: 'rgba(255,255,255,0.1)',
//                   border: 'none',
//                   borderRadius: '50%',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s',
//                   color: 'white',
//                   transform: hoveredButton === 'next' ? 'scale(1.1)' : 'scale(1)'
//                 }}
//                 onMouseEnter={() => setHoveredButton('next')}
//                 onMouseLeave={() => setHoveredButton(null)}
//               >
//                 <ChevronRight />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Home Ads Section */}
//       <HomeAds />

//       {/* Products Section */}
//       <section
//         ref={productsRef}
//         style={{
//           padding: "4rem 0",
//           backgroundColor: "#262626",
//           position: "relative",
//           overflow: "hidden"
//         }}
//       >
//         <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
//           <h2
//             style={{
//               fontSize: "3rem",
//               fontWeight: 900,
//               color: "#facc15",
//               textAlign: "center",
//               marginBottom: "2rem"
//             }}
//           >
//             FIND OUR PRODUCTS
//           </h2>

//           {/* Cart Message */}
//           {cartMessage && (
//             <p
//               style={{
//                 textAlign: "center",
//                 marginBottom: "1rem",
//                 fontWeight: "bold",
//                 color: cartMessage.startsWith("✅") ? "#4ade80" : "#f87171"
//               }}
//             >
//               {cartMessage}
//             </p>
//           )}

//           {/* Loading / Error */}
//           {loadingProducts && (
//             <p style={{ textAlign: "center", color: "#facc15" }}>
//               Loading products...
//             </p>
//           )}
//           {productError && (
//             <p style={{ textAlign: "center", color: "red" }}>{productError}</p>
//           )}

//           {/* Products Grid */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//               gap: "1.25rem"
//             }}
//           >
//             {Array.isArray(products) && products.map((product) => (
//               <div
//                 key={product._id}
//                 onClick={() => navigate(`/productspec/${product._id}`)}
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   height: "100%",
//                   background: "linear-gradient(to bottom, rgba(120,53,15,0.4), #171717)",
//                   border: "2px solid rgba(133,77,14,0.5)",
//                   borderRadius: "0.75rem",
//                   overflow: "hidden",
//                   transition: "all 0.4s ease",
//                   transform: hoveredProduct === product._id ? "scale(1.05)" : "scale(1)",
//                   opacity: 1,

//                   cursor: "pointer"
//                 }}
//                 onMouseEnter={() => setHoveredProduct(product._id)}
//                 onMouseLeave={() => setHoveredProduct(null)}
//               >
//                 {/* Image */}
//                 <div
//                   style={{
//                     height: "360px",
//                     overflow: "hidden",
//                     backgroundColor: "#000"
//                   }}
//                 >
//                   <img
//                     src={product.images?.[0]?.url || proteinGym}
//                     alt={product.name || "product"}
//                     loading="lazy"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       transition: "transform 0.5s ease",
//                       transform: hoveredProduct === product._id ? "scale(1.1)" : "scale(1)"
//                     }}
//                   />
//                 </div>

//                 {/* Content */}
//                 <div
//                   style={{
//                     padding: "0.75rem",
//                     backgroundColor: "#171717",
//                     display: "flex",
//                     flexDirection: "column",
//                     flexGrow: 1
//                   }}
//                 >
//                   {/* Title */}
//                   {product.title && (
//                     <h3
//                       style={{
//                         fontSize: "1rem",
//                         fontWeight: 900,
//                         color: "white",
//                         textAlign: "center",
//                         marginBottom: "0.25rem",
//                         textTransform: "uppercase"
//                       }}
//                     >
//                       {product.title}
//                     </h3>
//                   )}

//                   {/* Name */}
//                   <p
//                     style={{
//                       fontSize: "0.7rem",
//                       color: "#9ca3af",
//                       textAlign: "center",
//                       marginBottom: "0.5rem"
//                     }}
//                   >
//                     {product.name}
//                   </p>

//                   {/* Description */}
//                   <p
//                     style={{
//                       fontSize: "10px",
//                       color: "#9ca3af",
//                       marginBottom: "0.5rem"
//                     }}
//                   >
//                     {product.description}
//                   </p>

//                   {/* Highlights */}
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(2, 1fr)",
//                       gap: "0.375rem",
//                       marginBottom: "0.5rem"
//                     }}
//                   >
//                     {Array.isArray(product.highlights) && product.highlights.map((item, i) => (
//                       <div
//                         key={i}
//                         style={{
//                           border: "1px solid rgba(202,138,4,0.5)",
//                           borderRadius: "0.25rem",
//                           padding: "0.125rem 0.375rem",
//                           fontSize: "9px",
//                           fontWeight: "bold",
//                           textAlign: "center",
//                           color: "#facc15"
//                         }}
//                       >
//                         {item}
//                       </div>
//                     ))}
//                   </div>

//                   {/* Rating */}
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "0.25rem",
//                       marginBottom: "0.5rem"
//                     }}
//                   >
//                     <div>
//                       {"★".repeat(Math.round(product.rating || 0)).split("").map((_, i) => (
//                         <span key={i} style={{ color: "#facc15", fontSize: "0.75rem" }}>★</span>
//                       ))}
//                       {"☆".repeat(5 - Math.round(product.rating || 0)).split("").map((_, i) => (
//                         <span key={i} style={{ color: "#4b5563", fontSize: "0.75rem" }}>☆</span>
//                       ))}
//                     </div>
//                     <span style={{ fontSize: "10px", color: "#9ca3af" }}>
//                       {product.numReviews || 0} Reviews
//                     </span>
//                   </div>

//                   {/* Price + Button */}
//                   <div style={{ marginTop: "auto" }}>
//                     {product.originalPrice > product.price && (
//                       <div style={{ marginBottom: "0.25rem" }}>
//                         <span
//                           style={{
//                             fontSize: "10px",
//                             color: "#6b7280",
//                             textDecoration: "line-through"
//                           }}
//                         >
//                           ₹{product.originalPrice}
//                         </span>
//                         <span
//                           style={{
//                             fontSize: "10px",
//                             color: "#4ade80",
//                             marginLeft: "0.25rem",
//                             fontWeight: "bold"
//                           }}
//                         >
//                           {product.discountPercent}% OFF
//                         </span>
//                       </div>
//                     )}

//                     <div
//                       style={{
//                         fontSize: "1.1rem",
//                         fontWeight: 900,
//                         marginBottom: "0.75rem",
//                         color: "white"
//                       }}
//                     >
//                       RS : {product.price}
//                     </div>

//                     {product.countInStock > 0 ? (
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleBuyNow(product);
//                         }}
//                         style={{
//                           width: "100%",
//                           backgroundColor: "#facc15",
//                           color: "black",
//                           fontWeight: 900,
//                           padding: "0.5rem",
//                           borderRadius: "0.25rem",
//                           border: "none",
//                           cursor: "pointer",
//                           transition: "all 0.3s",
//                           fontSize: "0.75rem"
//                         }}
//                       >
//                         PLACE ORDER
//                       </button>
//                     ) : (
//                       <button
//                         disabled
//                         onClick={(e) => e.stopPropagation()}
//                         style={{
//                           width: "100%",
//                           backgroundColor: "#2a2a2a",
//                           color: "#9ca3af",
//                           fontWeight: 900,
//                           padding: "0.5rem",
//                           borderRadius: "0.25rem",
//                           border: "1px solid #555",
//                           cursor: "not-allowed",
//                           fontSize: "0.75rem",
//                           opacity: 0.7
//                         }}
//                       >
//                         OUT OF STOCK
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* See More Button */}
//           <div style={{ textAlign: "center" }}>
//             <button
//               onClick={() => navigate("/product")}
//               style={{
//                 backgroundColor: hoveredButton === "see-more" ? "#eab308" : "#facc15",
//                 color: "black",
//                 fontWeight: "bold",
//                 padding: "0.75rem 2rem",
//                 borderRadius: "0.25rem",
//                 marginTop: "20px",
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "all 0.3s",
//                 transform: hoveredButton === "see-more" ? "scale(1.05)" : "scale(1)"
//               }}
//               onMouseEnter={() => setHoveredButton("see-more")}
//               onMouseLeave={() => setHoveredButton(null)}
//             >
//               SEE MORE →
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Highlight Scroll Bar */}
//       <HighlightScrollBar />

//       {/* Motivational Section */}
//       <MotivationalSection />

//       {/* Features Section */}
//       <FeaturesSection />

//       {/* Sticky Circle Section */}
//       {/* <StickyCircleSection /> */}

//       {/* Video Showcase Section */}
//       <VideoShowcaseSection />

//       {/* Video Carousel Section - This will now show when videos are added */}
//       <VideoCarouselSection />


//       {/* Footer */}
//       <Footer />

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             backgroundColor: "rgba(0,0,0,0.7)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1000
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "#171717",
//               padding: "2rem",
//               borderRadius: "0.5rem",
//               textAlign: "center",
//               width: "90%",
//               maxWidth: "400px",
//               border: "2px solid #facc15"
//             }}
//           >
//             <h3 style={{ color: "#facc15", marginBottom: "1rem" }}>
//               Login Required
//             </h3>
//             <p style={{ color: "#d1d5db", marginBottom: "1.5rem" }}>
//               Please login to purchase this product.
//             </p>
//             <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
//               <button
//                 onClick={() => (window.location.href = "/login")}
//                 style={{
//                   backgroundColor: "#facc15",
//                   color: "black",
//                   padding: "0.5rem 1.5rem",
//                   border: "none",
//                   borderRadius: "0.25rem",
//                   fontWeight: "bold",
//                   cursor: "pointer"
//                 }}
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => setShowLoginModal(false)}
//                 style={{
//                   backgroundColor: "transparent",
//                   color: "#facc15",
//                   padding: "0.5rem 1.5rem",
//                   border: "1px solid #facc15",
//                   borderRadius: "0.25rem",
//                   fontWeight: "bold",
//                   cursor: "pointer"
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* WhatsApp Float Button */}
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

const MPACTLandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Backend States
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productError, setProductError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [heroSlides, setHeroSlides] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Refs for scrolling
  const heroRef = useRef(null);
  const motivationalRef = useRef(null);
  const productsRef = useRef(null);
  const aboutRef = useRef(null);
  const blogRef = useRef(null);

  const slideIntervalRef = useRef(null);

  useEffect(() => {
    // ScrollTrigger refresh
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Hero slider autoplay
    if (heroSlides && heroSlides.length > 0) {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }

      slideIntervalRef.current = setInterval(() => {
        setCurrentSlide(prev =>
          prev === heroSlides.length - 1 ? 0 : prev + 1
        );
      }, 4000);
    }

    // Scroll listener
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Resize listener
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      clearTimeout(refreshTimeout);
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
        slideIntervalRef.current = null;
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [heroSlides]);

  // Fetch products for home page
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await api.get("/api/products", {
        params: { limit: 8 }
      });
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Failed to load products:", error);
      setProductError("Failed to load products");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch hero banners
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

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };
  useEffect(() => {
  if (!loadingProducts && !loadingBanners) {
    const handleLoad = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }
}, [loadingProducts, loadingBanners]);


  const handleBuyNow = (product) => {
    if (loading) return;
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    navigate("/checkout", {
      state: {
        directBuy: true,
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0]?.url,
          qty: 1
        }
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
              cursor: 'pointer'
            }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>HOME</button>
            <button onClick={() => scrollToSection(productsRef)} style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer'
            }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>PRODUCTS</button>
            <button onClick={() => scrollToSection(aboutRef)} style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer'
            }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>ABOUT US</button>
            <button onClick={() => scrollToSection(blogRef)} style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer'
            }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>BLOG</button>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer'
            }}>
              <Search size={20} />
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer'
            }}>
              <User size={20} />
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer'
            }}>
              <ShoppingCart size={20} />
            </button>

            <button
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                display: window.innerWidth >= 768 ? 'none' : 'block'
              }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
              color: 'inherit'
            }}>HOME</button>
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
              color: 'inherit'
            }}>PRODUCTS</button>
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
              color: 'inherit'
            }}>ABOUT US</button>
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
              color: 'inherit'
            }}>BLOG</button>
          </nav>
        </div>
      </header>

      {/* Hero Slider */}
   {/* Hero Slider */}
<section ref={heroRef} style={{ 
  position: 'relative', 
  backgroundColor: 'black', 
  paddingTop: '0rem', 
  overflow: 'hidden',
  height: 'calc(100vh - 5rem)', // Full viewport height minus header
  minHeight: '600px' // Minimum height for smaller screens
}}>
  <div style={{ 
    maxWidth: '1280px', 
    margin: '0 auto', 
    padding: '0', // Remove padding to allow full width
    height: '100%'
  }}>
    <div style={{ 
      position: 'relative', 
      height: '100%',
      width: '100%'
    }}>
      <div style={{ 
        position: 'relative', 
        height: '100%', 
        width: '100%',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id || index}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: index === currentSlide ? 1 : 0,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)', // Slight scale for smoother transition
              pointerEvents: index === currentSlide ? 'auto' : 'none',
              transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out',
              height: '100%',
              width: '100%'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // Remove or modify the parallax effect
              transform: index === currentSlide ? `translateY(${scrollY * 0.1}px)` : 'translateY(0)',
              transition: 'transform 0.1s linear'
            }}>
              <img
                src={slide.image?.url || proteinGym}
                alt={`Slide ${index + 1}`}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', // Changed from 'contain' to 'cover'
                  maxWidth: '100%', // Allow full width
                  margin: '0 auto'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons and indicators */}
      <div style={{ 
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '1rem',
        zIndex: 10
      }}>
        <button
          onClick={handlePrevSlide}
          style={{
            width: '3rem',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            border: '2px solid #facc15',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.3s',
            color: 'white',
            transform: hoveredButton === 'prev' ? 'scale(1.1)' : 'scale(1)'
          }}
          onMouseEnter={() => setHoveredButton('prev')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <ChevronLeft size={24} />
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
                backgroundColor: index === currentSlide ? '#facc15' : 'rgba(255,255,255,0.5)',
                border: index === currentSlide ? '2px solid #facc15' : '2px solid rgba(255,255,255,0.3)',
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
            backgroundColor: 'rgba(0,0,0,0.5)',
            border: '2px solid #facc15',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.3s',
            color: 'white',
            transform: hoveredButton === 'next' ? 'scale(1.1)' : 'scale(1)'
          }}
          onMouseEnter={() => setHoveredButton('next')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  </div>
</section>

      {/* Home Ads Section */}
      <HomeAds />

      {/* Products Section */}
      <section
        ref={productsRef}
        style={{
          padding: "4rem 0",
          backgroundColor: "#262626",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: 900,
              color: "#facc15",
              textAlign: "center",
              marginBottom: "2rem"
            }}
          >
            FIND OUR PRODUCTS
          </h2>

          {/* Cart Message */}
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

          {/* Loading / Error */}
          {loadingProducts && (
            <p style={{ textAlign: "center", color: "#facc15" }}>
              Loading products...
            </p>
          )}
          {productError && (
            <p style={{ textAlign: "center", color: "red" }}>{productError}</p>
          )}

          {/* Products Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.25rem"
            }}
          >
            {Array.isArray(products) && products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/productspec/${product._id}`)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  background: "linear-gradient(to bottom, rgba(120,53,15,0.4), #171717)",
                  border: "2px solid rgba(133,77,14,0.5)",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  transition: "all 0.4s ease",
                  transform: hoveredProduct === product._id ? "scale(1.05)" : "scale(1)",
                  opacity: 1,

                  cursor: "pointer"
                }}
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image */}
                <div
                  style={{
                    height: "360px",
                    overflow: "hidden",
                    backgroundColor: "#000"
                  }}
                >
                  <img
                    src={product.images?.[0]?.url || proteinGym}
                    alt={product.name || "product"}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                      transition: "transform 0.5s ease",
                      transform: hoveredProduct === product._id ? "scale(1.1)" : "scale(1)"
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#171717",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1
                  }}
                >
                  {/* Title */}
                  {product.title && (
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 900,
                        color: "white",
                        textAlign: "center",
                        marginBottom: "0.25rem",
                        textTransform: "uppercase"
                      }}
                    >
                      {product.title}
                    </h3>
                  )}

                  {/* Name */}
                  <p
                    style={{
                      fontSize: "0.7rem",
                      color: "#9ca3af",
                      textAlign: "center",
                      marginBottom: "0.5rem"
                    }}
                  >
                    {product.name}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#9ca3af",
                      marginBottom: "0.5rem"
                    }}
                  >
                    {product.description}
                  </p>

                  {/* Highlights */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "0.375rem",
                      marginBottom: "0.5rem"
                    }}
                  >
                    {Array.isArray(product.highlights) && product.highlights.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          border: "1px solid rgba(202,138,4,0.5)",
                          borderRadius: "0.25rem",
                          padding: "0.125rem 0.375rem",
                          fontSize: "9px",
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "#facc15"
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Rating */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      marginBottom: "0.5rem"
                    }}
                  >
                    <div>
                      {"★".repeat(Math.round(product.rating || 0)).split("").map((_, i) => (
                        <span key={i} style={{ color: "#facc15", fontSize: "0.75rem" }}>★</span>
                      ))}
                      {"☆".repeat(5 - Math.round(product.rating || 0)).split("").map((_, i) => (
                        <span key={i} style={{ color: "#4b5563", fontSize: "0.75rem" }}>☆</span>
                      ))}
                    </div>
                    <span style={{ fontSize: "10px", color: "#9ca3af" }}>
                      {product.numReviews || 0} Reviews
                    </span>
                  </div>

                  {/* Price + Button */}
                  <div style={{ marginTop: "auto" }}>
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

                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 900,
                        marginBottom: "0.75rem",
                        color: "white"
                      }}
                    >
                      RS : {product.price}
                    </div>

                    {product.countInStock > 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyNow(product);
                        }}
                        style={{
                          width: "100%",
                          backgroundColor: "#facc15",
                          color: "black",
                          fontWeight: 900,
                          padding: "0.5rem",
                          borderRadius: "0.25rem",
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.3s",
                          fontSize: "0.75rem"
                        }}
                      >
                        PLACE ORDER
                      </button>
                    ) : (
                      <button
                        disabled
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: "100%",
                          backgroundColor: "#2a2a2a",
                          color: "#9ca3af",
                          fontWeight: 900,
                          padding: "0.5rem",
                          borderRadius: "0.25rem",
                          border: "1px solid #555",
                          cursor: "not-allowed",
                          fontSize: "0.75rem",
                          opacity: 0.7
                        }}
                      >
                        OUT OF STOCK
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See More Button */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => navigate("/product")}
              style={{
                backgroundColor: hoveredButton === "see-more" ? "#eab308" : "#facc15",
                color: "black",
                fontWeight: "bold",
                padding: "0.75rem 2rem",
                borderRadius: "0.25rem",
                marginTop: "20px",
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

      {/* Highlight Scroll Bar */}
      <HighlightScrollBar />

      {/* Motivational Section */}
      <MotivationalSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Sticky Circle Section */}
      {/* <StickyCircleSection /> */}

      {/* Video Showcase Section */}
      <VideoShowcaseSection />

      {/* Video Carousel Section - This will now show when videos are added */}
      <VideoCarouselSection />


      {/* Footer */}
      <Footer />

      {/* Login Modal */}
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
              Please login to purchase this product.
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

      <FuelEarnShareFloat />
      
      {/* WhatsApp Float Button */}
      <WhatsAppFloat />
    </div>
  );
};

export default MPACTLandingPage;