// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ShoppingCart, User, Search, ChevronLeft, ChevronRight, Play, Menu, X } from 'lucide-react';
// import MotivationalSection from "./MotivationalSection";
// import VideoShowcaseSection from "./VideoShowcaseSection";
// import FeaturesSection from "./FeaturesSection";
// import proteinGym from "../assets/rrs/protein-gym.jpg";
// import { addToCart } from "../services/cartService";
// import { Instagram, Youtube } from 'lucide-react';
// import { SiTiktok } from "react-icons/si";
// import WhatsAppFloat from '../components/WhatsAppFloat';
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Footer from "../components/Footer";





// const MPACTLandingPage = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [scrollY, setScrollY] = useState(0);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [hoveredProduct, setHoveredProduct] = useState(null);
//   const [hoveredButton, setHoveredButton] = useState(null);

//   // 🔥 BACKEND STATES (ONLY ADDITION)
//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(false);
//   const [productError, setProductError] = useState(null);
//   // const [nextCursor, setNextCursor] = useState(null);
//   // const [hasNextPage, setHasNextPage] = useState(true);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [cartMessage, setCartMessage] = useState("");
//   const [heroSlides, setHeroSlides] = useState([]);
//   const [loadingBanners, setLoadingBanners] = useState(true);
//   const navigate = useNavigate();







//   const heroRef = useRef(null);
//   const motivationalRef = useRef(null);
//   const productsRef = useRef(null);
//   const aboutRef = useRef(null);
//   const blogRef = useRef(null);

//   const slideIntervalRef = useRef(null);

// useEffect(() => {
//   /* ===============================
//      ScrollTrigger refresh (safe)
//   =============================== */
//   const refreshTimeout = setTimeout(() => {
//     ScrollTrigger.refresh();
//   }, 100);

//   /* ===============================
//      Hero slider autoplay (ONE ONLY)
//   =============================== */
//   if (heroSlides && heroSlides.length > 0) {
//     if (slideIntervalRef.current) {
//       clearInterval(slideIntervalRef.current);
//     }

//     slideIntervalRef.current = setInterval(() => {
//       setCurrentSlide(prev =>
//         prev === heroSlides.length - 1 ? 0 : prev + 1
//       );
//     }, 4000);
//   }

//   /* ===============================
//      Scroll listener
//   =============================== */
//   const handleScroll = () => {
//     setScrollY(window.scrollY);
//   };

//   /* ===============================
//      Resize → ScrollTrigger refresh
//   =============================== */
//   const handleResize = () => {
//     ScrollTrigger.refresh();
//   };

//   window.addEventListener("scroll", handleScroll, { passive: true });
//   window.addEventListener("resize", handleResize);

//   /* ===============================
//      CLEANUP (VERY IMPORTANT)
//   =============================== */
//   return () => {
//     clearTimeout(refreshTimeout);

//     if (slideIntervalRef.current) {
//       clearInterval(slideIntervalRef.current);
//       slideIntervalRef.current = null;
//     }

//     window.removeEventListener("scroll", handleScroll);
//     window.removeEventListener("resize", handleResize);
//   };
// }, [heroSlides, products]);


//   // 🔥 FETCH PRODUCTS FROM BACKEND (ONLY LOGIC ADDITION)

//   // const fetchProducts = async (cursor = null) => {
//   //   try {
//   //     setLoadingProducts(true);

//   //     const res = await axios.get("http://localhost:5000/api/products", {
//   //       params: {
//   //         limit: 8,
//   //         cursor
//   //       }
//   //     });

//   //     const data = res.data.products;
//   //     const pageInfo = res.data.pageInfo;

//   //     setProducts(prev =>
//   //       cursor ? [...prev, ...data] : data
//   //     );
//   //     setNextCursor(pageInfo?.nextCursor ?? null);
//   //     setHasNextPage(
//   //       typeof pageInfo?.hasNextPage === "boolean"
//   //         ? pageInfo.hasNextPage
//   //         : true
//   //     );
//   //   } catch (error) {
//   //     setProductError("Failed to load products");
//   //   } finally {
//   //     setLoadingProducts(false);
//   //   }
//   // };
//   // useEffect(() => {
//   //   fetchProducts();
//   // }, []);



//   // 🔥 FETCH LIMITED PRODUCTS FOR HOME PAGE
// const fetchProducts = async () => {
//   try {
//     setLoadingProducts(true);

//     const res = await axios.get("http://localhost:5000/api/products", {
//       params: { limit: 8 }
//     });

//     setProducts(res.data.products);
//   } catch (error) {
//     setProductError("Failed to load products");
//   } finally {
//     setLoadingProducts(false);
//   }
// };

// useEffect(() => {
//   fetchProducts();
// }, []);




//   // const heroSlides = [
//   //   { id: 1, image: proteinGym },
//   //   { id: 2, image: proteinGym },
//   //   { id: 3, image: proteinGym },
//   // ];

//   // for hero image
//   useEffect(() => {
//     const fetchHeroBanners = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/hero-banners");
//         setHeroSlides(res.data);
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

//   //   const [products] = useState([
//   //   {
//   //     id: 1,
//   //     title: "EXTRA HUNGRY?",
//   //     name: "PROTEIN WAFERS - VARIETY PACK OF 10",
//   //     brand: "SNICKERS",
//   //     price: 2000,
//   //     oldPrice: 2999,
//   //     discount: "26% OFF",
//   //     image: proteinGym,   // ✅ FIXED
//   //     rating: 5,
//   //     reviews: 199,
//   //     specs: [
//   //       "NO PRESERVATIVES",
//   //       "JAGGERY BASED",
//   //       "NO ADDED COLOURS",
//   //       "NO GLUCOSE ADDED",
//   //       "80 % PEANUT",
//   //     ],
//   //   },
//   //   {
//   //     id: 2,
//   //     title: "EXTRA HUNGRY?",
//   //     name: "PROTEIN WAFERS - VARIETY PACK OF 10",
//   //     brand: "SNICKERS",
//   //     price: 2000,
//   //     oldPrice: 2999,
//   //     discount: "26% OFF",
//   //     image: proteinGym,   // ✅ FIXED
//   //     rating: 5,
//   //     reviews: 199,
//   //     specs: [
//   //       "NO PRESERVATIVES",
//   //       "JAGGERY BASED",
//   //       "NO ADDED COLOURS",
//   //       "NO GLUCOSE ADDED",
//   //       "80 % PEANUT",
//   //     ],
//   //   },
//   //   {
//   //     id: 3,
//   //     title: "EXTRA HUNGRY?",
//   //     name: "PROTEIN WAFERS - VARIETY PACK OF 10",
//   //     brand: "SNICKERS",
//   //     price: 2000,
//   //     oldPrice: 2999,
//   //     discount: "26% OFF",
//   //     image: proteinGym,   // ✅ FIXED
//   //     rating: 5,
//   //     reviews: 199,
//   //     specs: [
//   //       "NO PRESERVATIVES",
//   //       "JAGGERY BASED",
//   //       "NO ADDED COLOURS",
//   //       "NO GLUCOSE ADDED",
//   //       "80 % PEANUT",
//   //     ],
//   //   },
//   //   {
//   //     id: 4,
//   //     title: "EXTRA HUNGRY?",
//   //     name: "PROTEIN WAFERS - VARIETY PACK OF 10",
//   //     brand: "SNICKERS",
//   //     price: 2000,
//   //     oldPrice: 2999,
//   //     discount: "26% OFF",
//   //     image: proteinGym,   // ✅ FIXED
//   //     rating: 5,
//   //     reviews: 199,
//   //     specs: [
//   //       "NO PRESERVATIVES",
//   //       "JAGGERY BASED",
//   //       "NO ADDED COLOURS",
//   //       "NO GLUCOSE ADDED",
//   //       "80 % PEANUT",
//   //     ],
//   //   },
//   // ]);


//   const handlePrevSlide = () => {
//     setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));
//   };

//   const handleNextSlide = () => {
//     setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
//   };

//   const handleBuyNow = async (productId) => {
//     try {
//       await addToCart(productId, 1);

//       setCartMessage("✅ Product added to cart");
//       setTimeout(() => setCartMessage(""), 3000);
//     } catch (error) {
//       if (error.response?.status === 401) {
//         setShowLoginModal(true);
//       } else {
//         setCartMessage(
//           error.response?.data?.message || "❌ Failed to add to cart"
//         );
//         setTimeout(() => setCartMessage(""), 3000);
//       }
//     }
//   };



//   const heroParallax = scrollY * 0.5;
//   const productParallax = Math.max(0, (scrollY - 600) * 0.3);
//   const motivationalParallax = Math.max(0, (scrollY - 1200) * 0.4);

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
//               cursor: 'pointer',
//               textDecoration: 'none'
//             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>HOME</button>
//             <button onClick={() => scrollToSection(productsRef)} style={{
//               background: 'none',
//               border: 'none',
//               color: 'inherit',
//               cursor: 'pointer',
//               textDecoration: 'none'
//             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>PRODUCTS</button>
//             <button onClick={() => scrollToSection(aboutRef)} style={{
//               background: 'none',
//               border: 'none',
//               color: 'inherit',
//               cursor: 'pointer',
//               textDecoration: 'none'
//             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>ABOUT US</button>
//             <button onClick={() => scrollToSection(blogRef)} style={{
//               background: 'none',
//               border: 'none',
//               color: 'inherit',
//               cursor: 'pointer',
//               textDecoration: 'none'
//             }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>BLOG</button>
//           </nav>

//           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//             <button style={{
//               background: 'none',
//               border: 'none',
//               color: 'inherit',
//               cursor: 'pointer',
//               opacity: 1,
//               transition: 'opacity 0.3s'
//             }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
//               <Search size={20} />
//             </button>
//             <button style={{
//               background: 'none',
//               border: 'none',
//               color: 'inherit',
//               cursor: 'pointer',
//               opacity: 1,
//               transition: 'opacity 0.3s'
//             }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
//               <User size={20} />
//             </button>
//             <button style={{
//               background: 'none',
//               border: 'none',
//               color: 'inherit',
//               cursor: 'pointer',
//               opacity: 1,
//               transition: 'opacity 0.3s'
//             }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
//               <ShoppingCart size={20} />
//             </button>

//             <button
//               style={{
//                 background: 'none',
//                 border: 'none',
//                 color: 'inherit',
//                 cursor: 'pointer',
//                 display: window.innerWidth >= 768 ? 'none' : 'block',
//                 opacity: 1,
//                 transition: 'opacity 0.3s'
//               }}
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               onMouseEnter={(e) => e.target.style.opacity = '0.7'}
//               onMouseLeave={(e) => e.target.style.opacity = '1'}
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
//               color: 'inherit',
//               transition: 'background-color 0.3s'
//             }} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.05)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
//               HOME
//             </button>
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
//               color: 'inherit',
//               transition: 'background-color 0.3s'
//             }} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.05)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
//               PRODUCTS
//             </button>
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
//               color: 'inherit',
//               transition: 'background-color 0.3s'
//             }} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.05)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
//               ABOUT US
//             </button>
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
//               color: 'inherit',
//               transition: 'background-color 0.3s'
//             }} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.05)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
//               BLOG
//             </button>
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
//                   key={slide.id}
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
//                     {/* <img 
//                       src={slide.image} 
//                       alt={`Slide ${index + 1}`} 
//                       style={{ width: '100%', height: '100%', objectFit: 'contain', maxWidth: '80rem', margin: '0 auto' }}
//                     /> */}

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

//           {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
//             <img src="/api/placeholder/150/60" alt="Mars logo" style={{ height: '4rem', transition: 'transform 0.3s' }} />
//           </div> */}
//         </div>
//       </section>


//       {/* ================= PRODUCTS SECTION ================= */}
// <section
//   ref={productsRef}
//   style={{
//     padding: "4rem 0",
//     backgroundColor: "#262626",
//     position: "relative",
//     overflow: "hidden"
//   }}
// >
//   <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
//     <h2
//       style={{
//         fontSize: "3rem",
//         fontWeight: 900,
//         color: "#facc15",
//         textAlign: "center",
//         marginBottom: "2rem"
//       }}
//     >
//       FIND OUR PRODUCTS
//     </h2>

//     {/* CART MESSAGE */}
//     {cartMessage && (
//       <p
//         style={{
//           textAlign: "center",
//           marginBottom: "1rem",
//           fontWeight: "bold",
//           color: cartMessage.startsWith("✅") ? "#4ade80" : "#f87171"
//         }}
//       >
//         {cartMessage}
//       </p>
//     )}

//     {/* LOADING / ERROR */}
//     {loadingProducts && (
//       <p style={{ textAlign: "center", color: "#facc15" }}>
//         Loading products...
//       </p>
//     )}
//     {productError && (
//       <p style={{ textAlign: "center", color: "red" }}>{productError}</p>
//     )}

//     {/* PRODUCTS GRID */}
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//         gap: "1.25rem"
//       }}
//     >
//       {Array.isArray(products) &&
//         products.map((product) => (
//           <div
//             key={product._id}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               height: "100%",
//               background:
//                 "linear-gradient(to bottom, rgba(120,53,15,0.4), #171717)",
//               border: "2px solid rgba(133,77,14,0.5)",
//               borderRadius: "0.75rem",
//               overflow: "hidden",
//               transition: "all 0.4s ease",
//               transform:
//                 scrollY > 500
//                   ? hoveredProduct === product._id
//                     ? "scale(1.05)"
//                     : "scale(1)"
//                   : "translateY(60px)",
//               opacity: scrollY > 500 ? 1 : 0
//             }}
//             onMouseEnter={() => setHoveredProduct(product._id)}
//             onMouseLeave={() => setHoveredProduct(null)}
//           >
//             {/* IMAGE */}
//             <div
//               style={{
//                 height: "360px",
//                 overflow: "hidden",
//                 backgroundColor: "#000"
//               }}
//             >
//               <img
//                 src={product.images?.[0]?.url || proteinGym}
//                 alt={product.name || "product"}
//                 loading="lazy"
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   transition: "transform 0.5s ease",
//                   transform:
//                     hoveredProduct === product._id
//                       ? "scale(1.1)"
//                       : "scale(1)"
//                 }}
//               />
//             </div>

//             {/* CONTENT */}
//             <div
//               style={{
//                 padding: "0.75rem",
//                 backgroundColor: "#171717",
//                 display: "flex",
//                 flexDirection: "column",
//                 flexGrow: 1
//               }}
//             >
//               {/* TITLE */}
//               {product.title && (
//                 <h3
//                   style={{
//                     fontSize: "1rem",
//                     fontWeight: 900,
//                     color: "white",
//                     textAlign: "center",
//                     marginBottom: "0.25rem",
//                     textTransform: "uppercase"
//                   }}
//                 >
//                   {product.title}
//                 </h3>
//               )}

//               {/* NAME */}
//               <p
//                 style={{
//                   fontSize: "0.7rem",
//                   color: "#9ca3af",
//                   textAlign: "center",
//                   marginBottom: "0.5rem"
//                 }}
//               >
//                 {product.name}
//               </p>

//               {/* DESCRIPTION */}
//               <p
//                 style={{
//                   fontSize: "10px",
//                   color: "#9ca3af",
//                   marginBottom: "0.5rem"
//                 }}
//               >
//                 {product.description}
//               </p>

//               {/* HIGHLIGHTS */}
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(2, 1fr)",
//                   gap: "0.375rem",
//                   marginBottom: "0.5rem"
//                 }}
//               >
//                 {Array.isArray(product.highlights) &&
//                   product.highlights.map((item, i) => (
//                     <div
//                       key={i}
//                       style={{
//                         border: "1px solid rgba(202,138,4,0.5)",
//                         borderRadius: "0.25rem",
//                         padding: "0.125rem 0.375rem",
//                         fontSize: "9px",
//                         fontWeight: "bold",
//                         textAlign: "center",
//                         color: "#facc15"
//                       }}
//                     >
//                       {item}
//                     </div>
//                   ))}
//               </div>

//               {/* RATING */}
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "0.25rem",
//                   marginBottom: "0.5rem"
//                 }}
//               >
//                 <div>
//                   {"★"
//                     .repeat(Math.round(product.rating || 0))
//                     .split("")
//                     .map((_, i) => (
//                       <span
//                         key={i}
//                         style={{ color: "#facc15", fontSize: "0.75rem" }}
//                       >
//                         ★
//                       </span>
//                     ))}
//                   {"☆"
//                     .repeat(5 - Math.round(product.rating || 0))
//                     .split("")
//                     .map((_, i) => (
//                       <span
//                         key={i}
//                         style={{ color: "#4b5563", fontSize: "0.75rem" }}
//                       >
//                         ☆
//                       </span>
//                     ))}
//                 </div>
//                 <span style={{ fontSize: "10px", color: "#9ca3af" }}>
//                   {product.numReviews || 0} Reviews
//                 </span>
//               </div>

//               {/* PRICE + BUTTON (STICKS TO BOTTOM) */}
//               <div style={{ marginTop: "auto" }}>
//                 {product.originalPrice > product.price && (
//                   <div style={{ marginBottom: "0.25rem" }}>
//                     <span
//                       style={{
//                         fontSize: "10px",
//                         color: "#6b7280",
//                         textDecoration: "line-through"
//                       }}
//                     >
//                       ₹{product.originalPrice}
//                     </span>
//                     <span
//                       style={{
//                         fontSize: "10px",
//                         color: "#4ade80",
//                         marginLeft: "0.25rem",
//                         fontWeight: "bold"
//                       }}
//                     >
//                       {product.discountPercent}% OFF
//                     </span>
//                   </div>
//                 )}

//                 <div
//                   style={{
//                     fontSize: "1.1rem",
//                     fontWeight: 900,
//                     marginBottom: "0.75rem",
//                     color: "white"
//                   }}
//                 >
//                   RS : {product.price}
//                 </div>

//                 <button
//                   onClick={() => handleBuyNow(product._id)}
//                   style={{
//                     width: "100%",
//                     backgroundColor: "#facc15",
//                     color: "black",
//                     fontWeight: 900,
//                     padding: "0.5rem",
//                     borderRadius: "0.25rem",
//                     border: "none",
//                     cursor: "pointer",
//                     transition: "all 0.3s",
//                     fontSize: "0.75rem"
//                   }}
//                 >
//                   PLACE ORDER
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//     </div>

//  {/* <div style={{ textAlign: 'center' }}>
//             <button
//               disabled={!hasNextPage || loadingProducts}
//               onClick={() => fetchProducts(nextCursor)}
//               style={{
//                 backgroundColor: hoveredButton === 'see-more' ? '#eab308' : '#facc15',
//                 color: 'black',
//                 fontWeight: 'bold',
//                 padding: '0.75rem 2rem',
//                 borderRadius: '0.25rem',
//                 border: 'none',
//                 cursor: !hasNextPage ? 'not-allowed' : 'pointer',
//                 transition: 'all 0.3s',
//                 transform: hoveredButton === 'see-more' ? 'scale(1.05)' : 'scale(1)',
//                 opacity: !hasNextPage ? 0.6 : 1
//               }}
//               onMouseEnter={() => setHoveredButton('see-more')}
//               onMouseLeave={() => setHoveredButton(null)}
//             >
//               {loadingProducts
//                 ? "LOADING..."
//                 : hasNextPage
//                   ? "SEE MORE →"
//                   : "NO MORE PRODUCTS"}
//             </button>
//           </div> */}

// <div style={{ textAlign: "center" }}>
//   <button
//     onClick={() => navigate("/products")}
//     style={{
//       backgroundColor: hoveredButton === "see-more" ? "#eab308" : "#facc15",
//       color: "black",
//       fontWeight: "bold",
//       padding: "0.75rem 2rem",
//       borderRadius: "0.25rem",
//       marginTop:"20px",
//       border: "none",
//       cursor: "pointer",
//       transition: "all 0.3s",
//       transform: hoveredButton === "see-more" ? "scale(1.05)" : "scale(1)"
//     }}
//     onMouseEnter={() => setHoveredButton("see-more")}
//     onMouseLeave={() => setHoveredButton(null)}
//   >
//     SEE MORE →
//   </button>
// </div>


//         </div>
//       </section>

//       <MotivationalSection />
//       <FeaturesSection />
//       <VideoShowcaseSection />

//      {/* Store Locator */}
// <section style={{ padding: '4rem 0', backgroundColor: '#facc15', overflow: 'hidden' }}>
//   <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>

//     <h2
//       style={{
//         fontSize: window.innerWidth >= 768 ? '3.75rem' : '3rem',
//         fontWeight: 900,
//         color: 'black',
//         marginBottom: '2rem',
//         transform: scrollY > 2600 ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
//         opacity: scrollY > 2600 ? 1 : 0,
//         transition: 'all 0.7s',
//       }}
//     >
//       FIND OUR NEAREST STORE
//     </h2>

//     <div
//       style={{
//         maxWidth: '48rem',
//         margin: '0 auto',
//         transform: scrollY > 2700 ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
//         opacity: scrollY > 2700 ? 1 : 0,
//         transition: 'all 0.7s',
//         borderRadius: '0.5rem',
//         overflow: 'hidden',
//         boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
//       }}
//     >
//       <iframe
//         title="Gym Store Location"
//         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4685.552562470286!2d76.9388791!3d8.5257209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb4d95185af%3A0x15f1640b53f2c59d!2sScipy%20Technologies%20Pvt%20Ltd!5e1!3m2!1sen!2sin!4v1768902995688!5m2!1sen!2sin"
//         width="100%"
//         height="350"
//         style={{ border: 0 }}
//         allowFullScreen=""
//         loading="lazy"
//       />
//     </div>

//   </div>
// </section>


      
//      <Footer/>
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
//               Please login to add items to your cart.
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

//       <WhatsAppFloat />

//     </div>
//   );
// };

// export default MPACTLandingPage;










import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axios"
import { ShoppingCart, User, Search, ChevronLeft, ChevronRight, Play, Menu, X } from 'lucide-react';
import MotivationalSection from "./MotivationalSection";
import VideoShowcaseSection from "./VideoShowcaseSection";
import FeaturesSection from "./FeaturesSection";
import proteinGym from "../assets/rrs/protein-gym.jpg";
// import { addToCart } from "../services/cartService";
import { addToCartApi } from "../api/cartApi";
import { Instagram, Youtube } from 'lucide-react';
import { SiTiktok } from "react-icons/si";
import WhatsAppFloat from '../components/WhatsAppFloat';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";





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

  const slideIntervalRef = useRef(null);

  useEffect(() => {
    /* ===============================
       ScrollTrigger refresh (safe)
    =============================== */
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    /* ===============================
       Hero slider autoplay (ONE ONLY)
    =============================== */
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

    /* ===============================
       Scroll listener
    =============================== */
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    /* ===============================
       Resize → ScrollTrigger refresh
    =============================== */
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    /* ===============================
       CLEANUP (VERY IMPORTANT)
    =============================== */
    return () => {
      clearTimeout(refreshTimeout);

      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
        slideIntervalRef.current = null;
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [heroSlides, products]);


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

      const res = await api.get("/api/products", {
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
        const res = await api.get("/api/hero-banners");
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


  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };




// const handleBuyNow = async (productId) => {
//   try {
//     await addToCartApi(productId, 1);

//     setCartMessage("✅ Product added to cart");
//     setTimeout(() => setCartMessage(""), 3000);

//     // 🔥 THIS WAS MISSING
//     navigate("/checkout"); // or "/checkout"
//   } catch (error) {
//     if (error.response?.status === 401) {
//       setShowLoginModal(true);
//     } else {
//       setCartMessage("❌ Failed to add to cart");
//       setTimeout(() => setCartMessage(""), 3000);
//     }
//   }
// };


const handleBuyNow = (product) => {
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

        {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <img src="/api/placeholder/150/60" alt="Mars logo" style={{ height: '4rem', transition: 'transform 0.3s' }} />
          </div> */}
      </div>
    </section>


    {/* ================= PRODUCTS SECTION ================= */}
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

        {/* CART MESSAGE */}
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

        {/* LOADING / ERROR */}
        {loadingProducts && (
          <p style={{ textAlign: "center", color: "#facc15" }}>
            Loading products...
          </p>
        )}
        {productError && (
          <p style={{ textAlign: "center", color: "red" }}>{productError}</p>
        )}

        {/* PRODUCTS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem"
          }}
        >
          {Array.isArray(products) &&
            products.map((product) => (
              <div
                key={product._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, rgba(120,53,15,0.4), #171717)",
                  border: "2px solid rgba(133,77,14,0.5)",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  transition: "all 0.4s ease",
                  transform:
                    scrollY > 500
                      ? hoveredProduct === product._id
                        ? "scale(1.05)"
                        : "scale(1)"
                      : "translateY(60px)",
                  opacity: scrollY > 500 ? 1 : 0
                }}
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* IMAGE */}
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
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                      transform:
                        hoveredProduct === product._id
                          ? "scale(1.1)"
                          : "scale(1)"
                    }}
                  />
                </div>

                {/* CONTENT */}
                <div
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#171717",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1
                  }}
                >
                  {/* TITLE */}
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

                  {/* NAME */}
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

                  {/* DESCRIPTION */}
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#9ca3af",
                      marginBottom: "0.5rem"
                    }}
                  >
                    {product.description}
                  </p>

                  {/* HIGHLIGHTS */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "0.375rem",
                      marginBottom: "0.5rem"
                    }}
                  >
                    {Array.isArray(product.highlights) &&
                      product.highlights.map((item, i) => (
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

                  {/* RATING */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      marginBottom: "0.5rem"
                    }}
                  >
                    <div>
                      {"★"
                        .repeat(Math.round(product.rating || 0))
                        .split("")
                        .map((_, i) => (
                          <span
                            key={i}
                            style={{ color: "#facc15", fontSize: "0.75rem" }}
                          >
                            ★
                          </span>
                        ))}
                      {"☆"
                        .repeat(5 - Math.round(product.rating || 0))
                        .split("")
                        .map((_, i) => (
                          <span
                            key={i}
                            style={{ color: "#4b5563", fontSize: "0.75rem" }}
                          >
                            ☆
                          </span>
                        ))}
                    </div>
                    <span style={{ fontSize: "10px", color: "#9ca3af" }}>
                      {product.numReviews || 0} Reviews
                    </span>
                  </div>

                  {/* PRICE + BUTTON (STICKS TO BOTTOM) */}
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

                    <button
                      onClick={() => handleBuyNow(product)}
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
                  </div>
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

    <MotivationalSection />
    <FeaturesSection />
    <VideoShowcaseSection />

    {/* Store Locator */}
    <section style={{ padding: '4rem 0', backgroundColor: '#facc15', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>

        <h2
          style={{
            fontSize: window.innerWidth >= 768 ? '3.75rem' : '3rem',
            fontWeight: 900,
            color: 'black',
            marginBottom: '2rem',
            transform: scrollY > 2600 ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
            opacity: scrollY > 2600 ? 1 : 0,
            transition: 'all 0.7s',
          }}
        >
          FIND OUR NEAREST STORE
        </h2>

        <div
          style={{
            maxWidth: '48rem',
            margin: '0 auto',
            transform: scrollY > 2700 ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
            opacity: scrollY > 2700 ? 1 : 0,
            transition: 'all 0.7s',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          }}
        >
          <iframe
            title="Gym Store Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4685.552562470286!2d76.9388791!3d8.5257209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb4d95185af%3A0x15f1640b53f2c59d!2sScipy%20Technologies%20Pvt%20Ltd!5e1!3m2!1sen!2sin!4v1768902995688!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>

      </div>
    </section>



    <Footer />
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