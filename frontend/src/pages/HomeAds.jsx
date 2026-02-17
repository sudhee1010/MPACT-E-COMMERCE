// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { X } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// export default function HomeAds() {
//   const { user, loading } = useAuth();
//   const [banner, setBanner] = useState(null);
//   const [visible, setVisible] = useState(false);

//   // 🔑 Detect LOGIN only (not refresh)
//   useEffect(() => {
//     if (loading) return;

//     // Not logged in → do nothing
//     if (!user) {
//       setBanner(null);
//       setVisible(false);
//       return;
//     }

//     // ✅ LOGIN DETECTED
//     const lastLogin = localStorage.getItem("lastLoginUser");

//     if (lastLogin !== user._id) {
//       // 🔄 New login session
//       sessionStorage.removeItem("bannerClosedAt");
//       localStorage.setItem("lastLoginUser", user._id);
//     }
//   }, [user, loading]);

//   // 🔥 Fetch banner
//   useEffect(() => {
//     if (loading || !user) return;

//     const fetchBanner = async () => {
//       try {
//         const res = await api.get("/api/banners");
//         const data = res.data;

//         if (!data?.image?.url || !data.updatedAt) return;

//         setBanner(data);

//         const bannerUpdatedAt = new Date(data.updatedAt).getTime();
//         const bannerClosedAt = Number(
//           sessionStorage.getItem("bannerClosedAt")
//         );

//         // ✅ Show banner if:
//         // - not closed yet
//         // - OR admin updated banner
//         if (!bannerClosedAt || bannerUpdatedAt > bannerClosedAt) {
//           setVisible(true);
//         } else {
//           setVisible(false);
//         }
//       } catch (err) {
//         console.error("Failed to fetch banner", err);
//       }
//     };

//     fetchBanner();
//   }, [user, loading]);

//   const closeBanner = () => {
//     sessionStorage.setItem("bannerClosedAt", Date.now().toString());
//     setVisible(false);
//   };

//   if (!banner || !visible) return null;

//   return (
//     <div className="fixed bottom-[110px] right-6 z-[950] max-w-[360px] sm:max-w-[420px]">
//       <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-yellow-400/30">

//         {/* Close */}
//         <button
//           onClick={closeBanner}
//           className="absolute top-2 right-2 z-20 bg-black/70 hover:bg-red-600 text-white p-1.5 rounded-full"
//         >
//           <X size={14} />
//         </button>

//         {/* Image */}
//         <img
//           src={banner.image.url}
//           alt={banner.title || "Advertisement"}
//           className="w-full h-[220px] object-cover"
//         />

//         {/* Overlay */}
//         {(banner.title || banner.subtitle) && (
//           <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
//             {banner.title && (
//               <h3 className="text-white font-bold text-lg">
//                 {banner.title}
//               </h3>
//             )}
//             {banner.subtitle && (
//               <p className="text-gray-200 text-sm mt-1">
//                 {banner.subtitle}
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { X } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// export default function HomeAds() {
//   const { user, loading } = useAuth();
//   const [banner, setBanner] = useState(null);
//   const [visible, setVisible] = useState(false);

//   // 🔑 Detect LOGIN only (not refresh)
//   useEffect(() => {
//     if (loading) return;

//     // Not logged in → do nothing
//     if (!user) {
//       setBanner(null);
//       setVisible(false);
//       return;
//     }

//     // ✅ LOGIN DETECTED
//     const lastLogin = localStorage.getItem("lastLoginUser");

//     if (lastLogin !== user._id) {
//       // 🔄 New login session
//       sessionStorage.removeItem("bannerClosedAt");
//       localStorage.setItem("lastLoginUser", user._id);
//     }
//   }, [user, loading]);

//   // 🔥 Fetch banner
//   useEffect(() => {
//     if (loading || !user) return;

//     const fetchBanner = async () => {
//       try {
//         const res = await api.get("/api/banners");
//         const data = res.data;

//         if (!data?.image?.url || !data.updatedAt) return;

//         setBanner(data);

//         const bannerUpdatedAt = new Date(data.updatedAt).getTime();
//         const bannerClosedAt = Number(
//           sessionStorage.getItem("bannerClosedAt")
//         );

//         // ✅ Show banner if:
//         // - not closed yet
//         // - OR admin updated banner
//         if (!bannerClosedAt || bannerUpdatedAt > bannerClosedAt) {
//           setVisible(true);
//         } else {
//           setVisible(false);
//         }
//       } catch (err) {
//         console.error("Failed to fetch banner", err);
//       }
//     };

//     fetchBanner();
//   }, [user, loading]);

//   const closeBanner = () => {
//     sessionStorage.setItem("bannerClosedAt", Date.now().toString());
//     setVisible(false);
//   };

//   if (!banner || !visible) return null;

//   return (
//     <div className="fixed bottom-[110px] right-6 z-[950] max-w-[360px] sm:max-w-[420px]">
//       <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-yellow-400/30">

//         {/* Close */}
//         <button
//           onClick={closeBanner}
//           className="absolute top-2 right-2 z-20 bg-black/70 hover:bg-red-600 text-white p-1.5 rounded-full"
//         >
//           <X size={14} />
//         </button>

//         {/* Image */}
//         <img
//           src={banner.image.url}
//           alt={banner.title || "Advertisement"}
//           className="w-full h-[220px] object-cover"
//         />

//         {/* Overlay */}
//         {(banner.title || banner.subtitle) && (
//           <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
//             {banner.title && (
//               <h3 className="text-white font-bold text-lg">
//                 {banner.title}
//               </h3>
//             )}
//             {banner.subtitle && (
//               <p className="text-gray-200 text-sm mt-1">
//                 {banner.subtitle}
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState, useRef } from "react";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";

// export default function HomeAds() {
//   const { user, loading } = useAuth();
//   const [banners, setBanners] = useState([]);
//   const scrollContainerRef = useRef(null);
//   const autoScrollIntervalRef = useRef(null);

//   // 🔥 Fetch banners
//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const res = await api.get("/api/banners");
//         const data = res.data;

//         if (!data) return;

//         let bannersArray = [];
//         if (Array.isArray(data)) {
//           bannersArray = data.filter(b => b?.image?.url);
//         } else if (data?.image?.url) {
//           bannersArray = [data];
//         }

//         setBanners(bannersArray);
//       } catch (err) {
//         console.error("Failed to fetch banners", err);
//       }
//     };

//     fetchBanners();
//   }, []);

//   // 🔄 Auto-scroll effect
//   useEffect(() => {
//     if (banners.length === 0 || !scrollContainerRef.current) return;

//     const container = scrollContainerRef.current;
//     const cardWidth = 352; // 340px card + 12px gap
//     let currentPosition = 0;

//     const autoScroll = () => {
//       if (!container) return;

//       currentPosition += cardWidth;

//       // If we've scrolled past all cards, reset to start
//       if (currentPosition >= container.scrollWidth - container.clientWidth) {
//         currentPosition = 0;
//       }

//       container.scrollTo({
//         left: currentPosition,
//         behavior: 'smooth'
//       });
//     };

//     // Start auto-scroll every 3 seconds
//     autoScrollIntervalRef.current = setInterval(autoScroll, 3000);

//     // Pause on hover
//     const handleMouseEnter = () => {
//       if (autoScrollIntervalRef.current) {
//         clearInterval(autoScrollIntervalRef.current);
//       }
//     };

//     const handleMouseLeave = () => {
//       autoScrollIntervalRef.current = setInterval(autoScroll, 3000);
//     };

//     container.addEventListener('mouseenter', handleMouseEnter);
//     container.addEventListener('mouseleave', handleMouseLeave);

//     // Cleanup
//     return () => {
//       if (autoScrollIntervalRef.current) {
//         clearInterval(autoScrollIntervalRef.current);
//       }
//       if (container) {
//         container.removeEventListener('mouseenter', handleMouseEnter);
//         container.removeEventListener('mouseleave', handleMouseLeave);
//       }
//     };
//   }, [banners]);

//   if (loading || banners.length === 0) return null;

//   return (
//     <>
//       <style>{`
//         .flipkart-ads-container {
//           padding: 20px 0;
//           background-color: #f1f3f6;
//         }

//         .flipkart-ads-scroll {
//           display: flex;
//           gap: 12px;
//           overflow-x: auto;
//           padding: 0 12px 16px 12px;
//           scroll-behavior: smooth;
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }

//         .flipkart-ads-scroll::-webkit-scrollbar {
//           display: none;
//         }

//         .flipkart-ad-card {
//           min-width: 340px;
//           max-width: 400px;
//           flex: 0 0 auto;
//           background: white;
//           border-radius: 8px;
//           overflow: hidden;
//           box-shadow: 0 1px 2px rgba(0,0,0,0.08);
//           transition: all 0.3s ease;
//           cursor: pointer;
//           position: relative;
//         }

//         .flipkart-ad-card:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0,0,0,0.12);
//         }

//         .flipkart-ad-image {
//           width: 100%;
//           height: 200px;
//           object-fit: cover;
//           display: block;
//         }

//         .flipkart-ad-badge {
//           position: absolute;
//           top: 12px;
//           left: 12px;
//           padding: 4px 10px;
//           border-radius: 4px;
//           font-size: 12px;
//           font-weight: 700;
//           letter-spacing: 0.3px;
//           box-shadow: 0 2px 6px rgba(0,0,0,0.15);
//         }

//         .flipkart-ad-badge.discount {
//           background: linear-gradient(135deg, #ff3e6c 0%, #ff1744 100%);
//           color: white;
//         }

//         .flipkart-ad-badge.new {
//           background: linear-gradient(135deg, #10b981 0%, #059669 100%);
//           color: white;
//         }

//         .flipkart-ad-content {
//           padding: 14px 16px;
//         }

//         .flipkart-ad-title {
//           font-size: 16px;
//           font-weight: 600;
//           color: #212121;
//           margin: 0 0 6px 0;
//           line-height: 1.3;
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }

//         .flipkart-ad-subtitle {
//           font-size: 13px;
//           color: #878787;
//           margin: 0 0 12px 0;
//           line-height: 1.4;
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }

//         .flipkart-ad-link {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           color: #2874f0;
//           font-size: 14px;
//           font-weight: 600;
//           text-decoration: none;
//           transition: gap 0.2s;
//         }

//         .flipkart-ad-link:hover {
//           gap: 10px;
//         }

//         .flipkart-ad-link svg {
//           transition: transform 0.2s;
//         }

//         .flipkart-ad-link:hover svg {
//           transform: translateX(2px);
//         }

//         @media (max-width: 768px) {
//           .flipkart-ad-card {
//             min-width: 280px;
//           }

//           .flipkart-ad-image {
//             height: 160px;
//           }
//         }
//       `}</style>

//       <section className="flipkart-ads-container">
//         <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
//           <div className="flipkart-ads-scroll" ref={scrollContainerRef}>
//             {banners.map((banner, index) => {
//               const bannerId = banner._id || banner.image.url;
              
//               return (
//                 <div key={bannerId} className="flipkart-ad-card">
//                   {/* Banner Link Wrapper */}
//                   <a
//                     href={banner.link || "#"}
//                     style={{ textDecoration: "none", display: "block" }}
//                     onClick={(e) => {
//                       if (!banner.link) e.preventDefault();
//                     }}
//                   >
//                     {/* Image */}
//                     <div style={{ position: "relative" }}>
//                       <img
//                         src={banner.image.url}
//                         alt={banner.title || "Advertisement"}
//                         className="flipkart-ad-image"
//                       />
                      
//                       {/* Badges */}
//                       {banner.discount && (
//                         <div className="flipkart-ad-badge discount">
//                           {banner.discount}% OFF
//                         </div>
//                       )}

//                       {banner.isNew && !banner.discount && (
//                         <div className="flipkart-ad-badge new">
//                           NEW
//                         </div>
//                       )}
//                     </div>

//                     {/* Content */}
//                     <div className="flipkart-ad-content">
//                       {banner.title && (
//                         <h3 className="flipkart-ad-title">
//                           {banner.title}
//                         </h3>
//                       )}
                      
//                       {banner.subtitle && (
//                         <p className="flipkart-ad-subtitle">
//                           {banner.subtitle}
//                         </p>
//                       )}

//                       {banner.link && (
//                         <span className="flipkart-ad-link">
//                           <span>Shop Now</span>
//                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="M5 12h14M12 5l7 7-7 7"/>
//                           </svg>
//                         </span>
//                       )}
//                     </div>
//                   </a>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


// import React, { useEffect, useState, useRef } from "react";
// import api from "../api/axios";

// export default function HomeAds() {
//   const [banners, setBanners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const scrollContainerRef = useRef(null);
//   const autoScrollIntervalRef = useRef(null);

//   // 🔥 Fetch banners
//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const res = await api.get("/api/banners");
//         const data = res.data;

//         if (!data) return;

//         let bannersArray = [];
//         if (Array.isArray(data)) {
//           bannersArray = data.filter(b => b?.image?.url);
//         } else if (data?.image?.url) {
//           bannersArray = [data];
//         }

//         setBanners(bannersArray);
//       } catch (err) {
//         console.error("Failed to fetch banners", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBanners();
//   }, []);

//   // 🔄 Auto-scroll effect
//   useEffect(() => {
//     if (banners.length === 0 || !scrollContainerRef.current) return;

//     const container = scrollContainerRef.current;
//     const cardWidth = 352; // 340px card + 12px gap
//     let currentPosition = 0;

//     const autoScroll = () => {
//       if (!container) return;

//       currentPosition += cardWidth;

//       // If we've scrolled past all cards, reset to start
//       if (currentPosition >= container.scrollWidth - container.clientWidth) {
//         currentPosition = 0;
//       }

//       container.scrollTo({
//         left: currentPosition,
//         behavior: 'smooth'
//       });
//     };

//     // Start auto-scroll every 3 seconds
//     autoScrollIntervalRef.current = setInterval(autoScroll, 3000);

//     // Pause on hover
//     const handleMouseEnter = () => {
//       if (autoScrollIntervalRef.current) {
//         clearInterval(autoScrollIntervalRef.current);
//       }
//     };

//     const handleMouseLeave = () => {
//       autoScrollIntervalRef.current = setInterval(autoScroll, 3000);
//     };

//     container.addEventListener('mouseenter', handleMouseEnter);
//     container.addEventListener('mouseleave', handleMouseLeave);

//     // Cleanup
//     return () => {
//       if (autoScrollIntervalRef.current) {
//         clearInterval(autoScrollIntervalRef.current);
//       }
//       if (container) {
//         container.removeEventListener('mouseenter', handleMouseEnter);
//         container.removeEventListener('mouseleave', handleMouseLeave);
//       }
//     };
//   }, [banners]);

//   if (loading || banners.length === 0) return null;

//   return (
//     <>
//       <style>{`
//         .flipkart-ads-container {
//           padding: 20px 0;
//           background-color: #f1f3f6;
//         }

//         .flipkart-ads-scroll {
//           display: flex;
//           gap: 12px;
//           overflow-x: auto;
//           padding: 0 12px 16px 12px;
//           scroll-behavior: smooth;
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }

//         .flipkart-ads-scroll::-webkit-scrollbar {
//           display: none;
//         }

//         .flipkart-ad-card {
//           min-width: 340px;
//           max-width: 400px;
//           flex: 0 0 auto;
//           background: white;
//           border-radius: 8px;
//           overflow: hidden;
//           box-shadow: 0 1px 2px rgba(0,0,0,0.08);
//           transition: all 0.3s ease;
//           cursor: pointer;
//           position: relative;
//         }

//         .flipkart-ad-card:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0,0,0,0.12);
//         }

//         .flipkart-ad-image-wrapper {
//           position: relative;
//           width: 100%;
//           height: 200px;
//           overflow: hidden;
//         }

//         .flipkart-ad-image {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           display: block;
//         }

//         .flipkart-ad-overlay {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-end;
//           padding: 16px;
//         }

//         .flipkart-ad-badge {
//           position: absolute;
//           top: 12px;
//           left: 12px;
//           padding: 6px 12px;
//           border-radius: 6px;
//           font-size: 12px;
//           font-weight: 700;
//           letter-spacing: 0.3px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.2);
//           z-index: 10;
//         }

//         .flipkart-ad-badge.discount {
//           background: linear-gradient(135deg, #ff3e6c 0%, #ff1744 100%);
//           color: white;
//         }

//         .flipkart-ad-badge.new {
//           background: linear-gradient(135deg, #10b981 0%, #059669 100%);
//           color: white;
//         }

//         .flipkart-ad-title-overlay {
//           font-size: 18px;
//           font-weight: 700;
//           color: white;
//           margin: 0 0 6px 0;
//           line-height: 1.3;
//           text-shadow: 0 2px 8px rgba(0,0,0,0.5);
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }

//         .flipkart-ad-subtitle-overlay {
//           font-size: 13px;
//           color: rgba(255,255,255,0.95);
//           margin: 0 0 12px 0;
//           line-height: 1.4;
//           text-shadow: 0 1px 4px rgba(0,0,0,0.5);
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }

//         .flipkart-ad-link-overlay {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           color: #fbbf24;
//           font-size: 14px;
//           font-weight: 600;
//           text-decoration: none;
//           text-shadow: 0 1px 4px rgba(0,0,0,0.5);
//           transition: gap 0.2s;
//         }

//         .flipkart-ad-link-overlay:hover {
//           gap: 10px;
//         }

//         .flipkart-ad-link-overlay svg {
//           transition: transform 0.2s;
//         }

//         .flipkart-ad-link-overlay:hover svg {
//           transform: translateX(2px);
//         }

//         @media (max-width: 768px) {
//           .flipkart-ad-card {
//             min-width: 280px;
//           }

//           .flipkart-ad-image-wrapper {
//             height: 160px;
//           }

//           .flipkart-ad-title-overlay {
//             font-size: 16px;
//           }

//           .flipkart-ad-subtitle-overlay {
//             font-size: 12px;
//           }
//         }
//       `}</style>

//       <section className="flipkart-ads-container">
//         <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
//           <div className="flipkart-ads-scroll" ref={scrollContainerRef}>
//             {banners.map((banner, index) => {
//               const bannerId = banner._id || banner.image.url;
              
//               return (
//                 <div key={bannerId} className="flipkart-ad-card">
//                   {/* Banner Link Wrapper */}
//                   <a
//                     href={banner.link || "#"}
//                     style={{ textDecoration: "none", display: "block" }}
//                     onClick={(e) => {
//                       if (!banner.link) e.preventDefault();
//                     }}
//                   >
//                     {/* Image with Text Overlay - NO WHITE BACKGROUND */}
//                     <div className="flipkart-ad-image-wrapper">
//                       {/* Full-Fit Image */}
//                       <img
//                         src={banner.image.url}
//                         alt={banner.title || "Advertisement"}
//                         className="flipkart-ad-image"
//                       />
                      
//                       {/* Badges */}
//                       {banner.discount && (
//                         <div className="flipkart-ad-badge discount">
//                           {banner.discount}% OFF
//                         </div>
//                       )}

//                       {banner.isNew && !banner.discount && (
//                         <div className="flipkart-ad-badge new">
//                           NEW
//                         </div>
//                       )}

//                       {/* Text Overlay - NO WHITE BACKGROUND */}
//                       <div className="flipkart-ad-overlay">
//                         {banner.title && (
//                           <h3 className="flipkart-ad-title-overlay">
//                             {banner.title}
//                           </h3>
//                         )}
                        
//                         {banner.subtitle && (
//                           <p className="flipkart-ad-subtitle-overlay">
//                             {banner.subtitle}
//                           </p>
//                         )}

//                         {banner.link && (
//                           <span className="flipkart-ad-link-overlay">
//                             <span>Shop Now</span>
//                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <path d="M5 12h14M12 5l7 7-7 7"/>
//                             </svg>
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </a>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

import React, { useEffect, useState, useRef } from "react";
import api from "../api/axios";

export default function HomeAds() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  // 🔥 Fetch banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get("/api/banners");
        const data = res.data;

        if (!data) return;

        let bannersArray = [];
        if (Array.isArray(data)) {
          bannersArray = data.filter(b => b?.image?.url);
        } else if (data?.image?.url) {
          bannersArray = [data];
        }

        setBanners(bannersArray);
      } catch (err) {
        console.error("Failed to fetch banners", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // 🔄 Auto-scroll effect - Flipkart style (move, pause, move)
  useEffect(() => {
    if (banners.length === 0 || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = 352; // 340px card + 12px gap
    let isPaused = false;
    let intervalId;

    const smoothScrollToPosition = (targetPosition) => {
      const startPosition = container.scrollLeft;
      const distance = targetPosition - startPosition;
      const duration = 500; // 500ms for smooth animation
      let startTime = null;

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function for smooth animation
        const easeInOutCubic = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        container.scrollLeft = startPosition + distance * easeInOutCubic;

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    const autoScroll = () => {
      if (!container || isPaused) return;

      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth / 2; // Half because we duplicate banners
      const nextPosition = currentScroll + cardWidth;

      // If we've reached the end of original banners, reset to start
      if (nextPosition >= maxScroll) {
        container.scrollLeft = 0;
      } else {
        smoothScrollToPosition(nextPosition);
      }
    };

    // Start auto-scroll every 3 seconds
    intervalId = setInterval(autoScroll, 3000);

    // Pause on hover
    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [banners]);

  if (loading || banners.length === 0) return null;

  return (
    <>
      <style>{`
        .flipkart-ads-container {
          padding: 20px 0;
          background-color: #232323;
        }

        .flipkart-ads-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding: 0 12px 16px 12px;
          scroll-behavior: smooth;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .flipkart-ads-scroll::-webkit-scrollbar {
          display: none;
        }

        .flipkart-ad-card {
          min-width: 340px;
          max-width: 400px;
          flex: 0 0 auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .flipkart-ad-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }

        .flipkart-ad-image-wrapper {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .flipkart-ad-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .flipkart-ad-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px;
        }

        .flipkart-ad-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.3px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          z-index: 10;
        }

        .flipkart-ad-badge.discount {
          background: linear-gradient(135deg, #ff3e6c 0%, #ff1744 100%);
          color: white;
        }

        .flipkart-ad-badge.new {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .flipkart-ad-title-overlay {
          font-size: 18px;
          font-weight: 700;
          color: white;
          margin: 0 0 6px 0;
          line-height: 1.3;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .flipkart-ad-subtitle-overlay {
          font-size: 13px;
          color: rgba(255,255,255,0.95);
          margin: 0 0 12px 0;
          line-height: 1.4;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .flipkart-ad-link-overlay {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #fbbf24;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
          transition: gap 0.2s;
        }

        .flipkart-ad-link-overlay:hover {
          gap: 10px;
        }

        .flipkart-ad-link-overlay svg {
          transition: transform 0.2s;
        }

        .flipkart-ad-link-overlay:hover svg {
          transform: translateX(2px);
        }

        @media (max-width: 768px) {
          .flipkart-ad-card {
            min-width: 280px;
          }

          .flipkart-ad-image-wrapper {
            height: 160px;
          }

          .flipkart-ad-title-overlay {
            font-size: 16px;
          }

          .flipkart-ad-subtitle-overlay {
            font-size: 12px;
          }
        }
      `}</style>

      <section className="flipkart-ads-container">
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="flipkart-ads-scroll" ref={scrollContainerRef}>
            {/* Render banners twice for infinite loop effect */}
            {[...banners, ...banners].map((banner, index) => {
              const bannerId = `${banner._id || banner.image.url}-${index}`;
              
              return (
                <div key={bannerId} className="flipkart-ad-card">
                  {/* Banner Link Wrapper */}
                  <a
                    href={banner.link || "#"}
                    style={{ textDecoration: "none", display: "block" }}
                    onClick={(e) => {
                      if (!banner.link) e.preventDefault();
                    }}
                  >
                    {/* Image with Text Overlay - NO WHITE BACKGROUND */}
                    <div className="flipkart-ad-image-wrapper">
                      {/* Full-Fit Image */}
                      <img
                        src={banner.image.url}
                        alt={banner.title || "Advertisement"}
                        className="flipkart-ad-image"
                      />
                      
                      {/* Badges */}
                      {banner.discount && (
                        <div className="flipkart-ad-badge discount">
                          {banner.discount}% OFF
                        </div>
                      )}

                      {banner.isNew && !banner.discount && (
                        <div className="flipkart-ad-badge new">
                          NEW
                        </div>
                      )}

                      {/* Text Overlay - NO WHITE BACKGROUND */}
                      <div className="flipkart-ad-overlay">
                        {banner.title && (
                          <h3 className="flipkart-ad-title-overlay">
                            {banner.title}
                          </h3>
                        )}
                        
                        {banner.subtitle && (
                          <p className="flipkart-ad-subtitle-overlay">
                            {banner.subtitle}
                          </p>
                        )}

                        {banner.link && (
                          <span className="flipkart-ad-link-overlay">
                            <span>Shop Now</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}