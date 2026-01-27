// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Footer from "../components/Footer";

// const ProductPage = () => {
//   const [qty, setQty] = useState(1);
//   const [showReviewPopup, setShowReviewPopup] = useState(false);
  

//   const images = [
//     "/images/stawberry.png",
//     "/images/grapes.png",
//     "/images/pista.png",
//     "/images/mango.png",
//   ];

//   const [activeImage, setActiveImage] = useState(images[0]);

//   const styles = {
//     container: {
//       background: "#2f2f2f",
//       color: "#fff"
//     },
//     productSection: {
//       maxWidth: 1400,
//       margin: "0 auto",
//       marginLeft: "100px",
//       padding: "60px 40px",
//       display: "grid",
//       gridTemplateColumns: "1fr 1fr",
//       gap: 20
//     },
//     mainImageContainer: {
//       border: "2px solid #ffe600",
//       borderRadius: 13,
//       overflow: "hidden",
//       background: "#fff",
//       width: "88%",
//       height: 560,
//       marginLeft: "45px"
//     },
//     mainImage: {
//       width: "90%",
//       height: 570,
//       objectFit: "cover"
//     },
//     thumbnailsContainer: {
//       marginTop: 16,
//       display: "grid",
//       gridTemplateColumns: "repeat(4, 1fr)",
//       gap: 12,
//       marginLeft: "47px",
//       width: "88%"
//     },
//     thumbnailBox: {
//       border: "2px solid transparent",
//       borderRadius: 10,
//       overflow: "hidden",
//       background: "#2b2b2b",
//       cursor: "pointer",
//       transition: "transform 0.25s ease, border 0.25s ease, box-shadow 0.25s ease"
//     },
//     thumbnailBoxActive: {
//       borderColor: "#ffe600"
//     },
//     thumbnailImage: {
//       width: "100%",
//       height: 130,
//       objectFit: "cover",
//       display: "block"
//     },
//     detailsContainer: {
//       maxWidth: 520
//     },
//     title: {
//       fontFamily: "'Jersey 25', sans-serif",
//       fontSize: 44,
//       letterSpacing: 2,
//       lineHeight: "1.1",
//       marginBottom: 16,
//       textTransform: "uppercase"
//     },
//   ratingContainer: {
//     display: "flex",
//     alignItems: "center",   // aligns everything vertically
//     gap: 10,
//     marginBottom: 36,
//   },

//   stars: {
//     color: "#ffc107",
//     fontSize: 18,
//     lineHeight: 1,
//   },

//   separator: {
//     color: "#777",
//     fontSize: 16,
//     marginTop: 1,           // optical centering
//   },

//   reviewCount: {
//     color: "#ccc",
//     fontSize: 14,
//     lineHeight: 1,
//     marginTop: 1,          // 🔑 aligns text with stars
//   },
//     priceContainer: {
//       display: "flex",
//       gap: 14,
//       alignItems: "baseline",
//       marginBottom: 30
//     },
//     price: {
//       fontSize: 36,
//       fontWeight: 800
//     },
//     oldPrice: {
//       color: "#777",
//       textDecoration: "line-through"
//     },
//     discount: {
//       color: "#00ff66",
//       fontWeight: 700
//     },
//     tagsContainer: {
//       display: "grid",
//       gridTemplateColumns: "repeat(3, max-content)",
//       gap: 14,
//       marginBottom: 34,
    
//     },
//     tag: {
//       border: "1.5px solid #ffe600",
//       padding: "10px 16px",
//       fontSize: 17.6,
//       fontWeight: 500,
//       whiteSpace: "nowrap",  
//       fontFamily: "'Jersey 25', sans-serif",
//       borderRadius: 4,
//       height: 46,
//     },
//     quantityContainer: {
//       marginBottom: 34
//     },
//     quantityLabel: {
//       fontSize: 14,
//       marginBottom: 10,
//       color: "#fff"
//     },
//     quantityBox: {
//       display: "flex",
//       alignItems: "center",
//       border: "2px solid #ffe600",
//       borderRadius: 12,
//       overflow: "hidden",
//       height: 52,
//       background: "#2f2f2f",
//       width: "fit-content",
//       height: 62
//     },
//     quantityButton: {
//       width: 56,
//       height: "100%",
//       background: "transparent",
//       border: "none",
//       color: "#fff",
//       fontSize: 22,
//       cursor: "pointer",
//       transition: "all 0.25s ease"
//     },
//     quantityButtonLeft: {
//       borderRight: "1px solid #ffe600"
//     },
//     quantityValue: {
//       width: 56,
//       height: "100%",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: 18,
//       fontWeight: 700,
//       color: "#fff",
//       borderRight: "1px solid #ffe600"
//     },
//     actionButtons: {
//       display: "flex",
//       gap: 16
//     },

// addToCartButton: {
//   flex: 1,
//   height: 67,                 
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: 10,

//   background: "#2f2f2f",
//   color: "#fff",

//   padding: "0 20px",         
//   fontSize: 23,
//   fontWeight: 900,

//   borderRadius: 11,
//   border: "2px solid #ffeb00",

//   cursor: "pointer",
//   textTransform: "uppercase",
//   letterSpacing: 1,
//   transition: "all 0.25s ease",

//   fontFamily: "'Jersey 25', sans-serif",
//   textDecoration: "none",
//   boxSizing: "border-box",
  
// },
// cartIcon: {
//   width: 22,
//   height: 22,
//   filter: "brightness(0) invert(1)", // ✅ WHITE by default
//   transition: "filter 0.25s ease"
// },



// buyNowButton:{
//   flex: 1,
//   height: 67,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",

//   background: "#ffeb00",
//   color: "#000",

//   padding: "0 20px",
//   fontSize: 23,
//   fontWeight: 900,

//   borderRadius: 11,
//   border: "2px solid #ffeb00",

//   cursor: "pointer",
//   textTransform: "uppercase",
//   letterSpacing: 1,

//   fontFamily: "'Jersey 25', sans-serif",
//   textDecoration: "none",
//   boxSizing: "border-box",

//   transition: "transform 0.25s ease, box-shadow 0.25s ease"
// },


//   recommendedSection: {
//     padding: "20px 0" // ⬅️ reduced gap (was 40px)
//   },

//   recommendedTitle: {
//     marginBottom: 12, // ⬅️ reduced (was 24)
//     fontWeight: 700,
//     textAlign: "left",
//     marginLeft: 185
//   },

//   recommendedGrid: {
//     display: "flex",
//     gap: 24,
//     padding: "0 40px",
//     justifyContent: "center",
//     alignItems: "center"
//   },

//   recommendedItem: {
//     width: 212,
//     height: 212,
//     borderRadius: 8,
//     border: "2px solid #ffe600",
//     overflow: "hidden",
//     background: "#2b2b2b",
//     flexShrink: 0,
//     transition: "transform 0.35s ease"
//   },

//   recommendedImage: {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     transition: "transform 0.35s ease"
//   },

//   /* ================= REVIEWS SECTION ================= */

//   reviewsSection: {
//     maxWidth: 1200,
//     margin: "0 auto",
//     padding: "20px 40px", // ⬅️ reduced top/bottom (was 40)
//     color: "#fff"
//   },

//   reviewsHeader: {
//     marginBottom: 12, // ⬅️ reduced (was 24)
//     fontWeight: 700,
//     textAlign: "left",
//     marginLeft: -55
//   },

//   reviewsButtons: {
//     display: "flex",
//     gap: 16,
//     marginTop: 10,
//     marginLeft: "auto", // ⬅️ keeps buttons on right
//     alignItems: "center"
//   },

//   writeReviewButton: {
//     background: "#ffe600",
//     width: 190,
//     height: 52,
//     fontWeight: "bold",
//     borderRadius: 8,
//     border: "none",
//     cursor: "pointer",
//     transition: "transform 0.2s ease",
//     fontFamily: "'Jersey 25', sans-serif",
//     fontSize: 18,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },

//   topRatedButton: {
//     background: "transparent",
//     border: "2px solid #ffe600",
//     color: "#ffffff",
//     width: 170,
//     height: 52,
//     borderRadius: 8,
//     cursor: "pointer",
//     transition: "transform 0.2s ease",
//     fontFamily: "'Jersey 25', sans-serif",
//     fontSize: 18,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//     popupOverlay: {
//       position: "fixed",
//       inset: 0,
//       background: "rgba(0,0,0,0.75)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 9999,
//       padding: "16px"
//     },
//     popupContent: {
//       width: "100%",
//       maxWidth: 1200,
//       background: "#3a3a3a",
//       borderRadius: 26,
//       border: "2px solid #ffe600",
//       padding: "clamp(20px, 4vw, 50px)",
//       color: "#fff"
//     },
//     popupTitle: {
//       fontFamily: "'Jersey 25', sans-serif",
//       textAlign: "center",
//       letterSpacing: 2,
//       marginBottom: "clamp(20px, 4vw, 40px)",
//       fontSize: "clamp(20px, 3vw, 28px)"
//     },
//     popupUser: {
//       display: "flex",
//       gap: 16,
//       alignItems: "center",
//       marginBottom: "clamp(20px, 4vw, 40px)"
//     },
//     popupAvatar: {
//       width: 46,
//       height: 46,
//       borderRadius: "50%",
//       background: "#1db954",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: 22,
//       fontWeight: "bold",
//       flexShrink: 0
//     },
//     popupUserName: {
//       fontSize: 18
//     },
//     popupUserSubtext: {
//       fontSize: 14,
//       opacity: 0.8
//     },
//     popupStars: {
//       display: "flex",
//       justifyContent: "center",
//       gap: "clamp(12px, 3vw, 30px)",
//       marginBottom: "clamp(20px, 4vw, 40px)",
//       flexWrap: "wrap"
//     },
//     popupStar: {
//       fontSize: "clamp(30px, 6vw, 46px)",
//       color: "#ffc107"
//     },
//     popupTextareaContainer: {
//       border: "2px solid #ffe600",
//       borderRadius: 20,
//       padding: "clamp(16px, 3vw, 24px)",
//       marginBottom: "clamp(20px, 4vw, 30px)"
//     },
//     popupTextarea: {
//       width: "100%",
//       minHeight: 120,
//       maxHeight: 220,
//       background: "transparent",
//       border: "none",
//       outline: "none",
//       resize: "vertical",
//       color: "#ddd",
//       fontSize: "clamp(14px, 2.5vw, 15px)",
//       lineHeight: 1.7
//     },
//     popupAddPhoto: {
//       textAlign: "center",
//       marginBottom: 30
//     },
//     popupAddPhotoButton: {
//       background: "#4a4a2f",
//       color: "#fff",
//       border: "none",
//       padding: "12px 26px",
//       borderRadius: 30,
//       cursor: "pointer",
//       fontSize: "clamp(14px, 2.5vw, 15px)"
//     },
//     popupActions: {
//       display: "flex",
//       justifyContent: "flex-end",
//       gap: 16,
//       flexWrap: "wrap"
//     },
//     popupButton: {
//       background: "#ffe600",
//       color: "#000",
//       border: "none",
//       padding: "12px 26px",
//       fontWeight: 700,
//       borderRadius: 8,
//       cursor: "pointer",
//       minWidth: 120
//     },
//     popupPostButton: {
//       background: "#ffe600",
//       color: "#000",
//       border: "none",
//       padding: "12px 30px",
//       fontWeight: 700,
//       borderRadius: 8,
//       cursor: "pointer",
//       minWidth: 120 
//     },
//   reviewsGrid: {
//     display: "grid",
//     gridTemplateColumns: "1.3fr 1fr",
//     gap: 10,
//   },

//   /* LEFT COLUMN — IMAGE REVIEWS (UNCHANGED) */
//   reviewsLeftColumn: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 10,
//     marginLeft: -15,
//   },

//   reviewCardWithImage: {
//     border: "1px solid #ffe600",
//     borderRadius: 10,
//     padding: 16,
//     background: "#2f2f2f",
//   },

//   reviewImage: {
//     width: "100%",
//     borderRadius: 10,
//     marginBottom: 12,
//   },

//   reviewStars: {
//     color: "#ffe600",
//     margin: "6px 0",
//   },

//   reviewText: {
//     fontSize: 13,
//     lineHeight: 1.6,
//     color: "#fff",
//   },

//   /* RIGHT COLUMN — CROPPED FROM LEFT */
// reviewsRightColumn: {
//   display: "flex",
//   flexDirection: "column",
//   gap: 10,

//   marginLeft: "-80px",   // existing left alignment
//   paddingLeft: 80,

//   marginRight: "-20px",  // 🔑 EXTENDS to the RIGHT
//   overflow: "visible",   // 🔑 allow extension
// },


//   /* RIGHT REVIEW CARD — MORE HEIGHT */
//   reviewCardText: {
//     border: "1px solid #ffe600",
//     borderRadius: 12,
//     padding: 20,

//     background: "#2f2f2f",
//     width: "100%",
//     color: "#fff",

//     minHeight: 281,   // 🔑 increase height safely
//     boxSizing: "border-box",
//   },
//     rangeSection: {
//       padding: "64px 0",
//       background: "#2f2f2f"
//     },
//     rangeTitle: {
//       fontFamily: "'Jersey 25', sans-serif",
//       fontSize: 56,
//       fontWeight: 900,
//       textTransform: "uppercase",
//       color: "#ffe600",
//       maxWidth: 2100,
//       margin: "0 auto 56px",
//       textAlign: "center",
//       letterSpacing: "1px",
//       lineHeight: "1.00"
//     },
//     rangeGrid: {
//       maxWidth: 1230,
//       margin: "0 auto",
//       display: "grid",
//       gridTemplateColumns: "repeat(4, 1fr)",
//       gap: 28,
//       padding: "0 32px"
//     },
//     rangeCard: {
//       background: "#3a3a3a",
//       border: "2px solid #ffe600",
//       borderRadius: 14,
//       overflow: "hidden",
//       display: "flex",
//       flexDirection: "column",
//       height: 500,
//       transition: "transform 0.35s ease, box-shadow 0.35s ease",
//       willChange: "transform"
//     },
//     rangeCardImage: {
//       height: 330,
//       overflow: "hidden"
//     },
//     rangeCardImg: {
//       width: "100%",
//       height: "100%",
//       objectFit: "cover"
//     },
//     rangeCardContent: {
//       padding: "18px 18px 16px"
//     },
//     rangeCardTitle: {
//       fontWeight: 900,
//       fontSize: 12,
//       letterSpacing: "0.6px",
//       marginBottom: 6,
//       textTransform: "uppercase",
//       color: "#fff",
//       lineHeight: "16px"
//     },
//     rangeCardSubtitle: {
//       fontSize: 12,
//       marginBottom: 10,
//       opacity: 0.85,
//       color: "#fff"
//     },
//     rangeCardPrice: {
//       display: "flex",
//       alignItems: "center",
//       gap: 10,
//       marginBottom: 14,
//       color: "#fff"
//     },
//     rangeCardPriceMain: {
//       fontWeight: 800,
//       fontSize: 14
//     },
//     rangeCardPriceOld: {
//       textDecoration: "line-through",
//       color: "#9a9a9a",
//       fontSize: 13
//     },
//     rangeCardButton: {
//       width: "100%",
//       height: 42,
//       background: "#ffe600",
//       color: "#000",
//       border: "none",
//       fontWeight: 900,
//       cursor: "pointer",
//       borderRadius: 8,
//       fontSize: 14,
//       letterSpacing: "0.5px",
//        fontFamily: "'Jersey 25', sans-serif",
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
//       `}</style>

//       <div style={styles.container}>
//         <section style={styles.productSection}>
//           <div>
//             <div style={styles.mainImageContainer}>
//               <img
//                 src={activeImage}
//                 alt="product"
//                 style={styles.mainImage}
//               />
//             </div>

//             <div style={styles.thumbnailsContainer}>
//               {images.map((src, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     ...styles.thumbnailBox,
//                     ...(activeImage === src ? styles.thumbnailBoxActive : {}),
//                     borderColor: activeImage === src ? "#ffe600" : "transparent"
//                   }}
//                   onClick={() => setActiveImage(src)}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = "#ffe600";
//                     e.currentTarget.style.transform = "scale(1.05)";
//                   }}
//                   onMouseLeave={(e) => {
//                     if (activeImage !== src) {
//                       e.currentTarget.style.borderColor = "transparent";
//                     }
//                     e.currentTarget.style.transform = "scale(1)";
//                   }}
//                 >
//                   <img
//                     src={src}
//                     alt={`thumb-${i}`}
//                     style={styles.thumbnailImage}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div style={styles.detailsContainer}>
//             <h1 style={styles.title}>
//               PROTEIN WAFERS – VARIETY
//               <br />
//               PACK OF 10
//             </h1>

//            <div style={styles.ratingContainer}>
//   <div style={styles.stars}>★★★★★</div>
//   <span style={styles.separator}>|</span>
//   <span style={styles.reviewCount}>198 Reviews</span>
// </div>

//             <div style={styles.priceContainer}>
//               <span style={styles.price}>
//                 RS : 2000
//               </span>
//               <span style={styles.oldPrice}>
//                 RS : 2999
//               </span>
//               <span style={styles.discount}>
//                 25% OFF
//               </span>
//             </div>

//             <div style={styles.tagsContainer}>
//               {[
//                 "NO PRESERVATIVES",
//                 "JAGGERY BASED",
//                 "NO ADDED COLOURS",
//                 "80 % PEANUT",
//                 "NO GLUCOSE ADDED",
//                 "NO PRESERVATIVES",
//               ].map((tag, i) => (
//                 <span key={i} style={styles.tag}>
//                   {tag}
//                 </span>
//               ))}
//             </div>

//             <div style={styles.quantityContainer}>
//               <div style={styles.quantityLabel}>
//                 Quantity
//               </div>

//               <div style={styles.quantityBox}>
//                 <button
//                   onClick={() => setQty(Math.max(1, qty - 1))}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "#ffe600";
//                     e.currentTarget.style.color = "#000";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "transparent";
//                     e.currentTarget.style.color = "#fff";
//                   }}
//                   style={{
//                     ...styles.quantityButton,
//                     ...styles.quantityButtonLeft
//                   }}
//                 >
//                   −
//                 </button>

//                 <div style={styles.quantityValue}>
//                   {qty}
//                 </div>

//                 <button
//                   onClick={() => setQty(qty + 1)}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "#ffe600";
//                     e.currentTarget.style.color = "#000";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "transparent";
//                     e.currentTarget.style.color = "#fff";
//                   }}
//                   style={styles.quantityButton}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
// <div style={styles.actionButtons}>
//   {/* ADD TO CART */}
// <Link
//   to="/cart"
//   style={styles.addToCartButton}
//   onMouseEnter={(e) => {
//     // button hover
//     e.currentTarget.style.background = "#ffeb00";
//     e.currentTarget.style.color = "#000";

//     // icon hover → BLACK
//     const img = e.currentTarget.querySelector("img");
//     if (img) {
//       img.style.filter = "brightness(0)";
//     }
//   }}
//   onMouseLeave={(e) => {
//     // button normal
//     e.currentTarget.style.background = "#2f2f2f";
//     e.currentTarget.style.color = "#fff";

//     // icon normal → WHITE
//     const img = e.currentTarget.querySelector("img");
//     if (img) {
//       img.style.filter = "brightness(0) invert(1)";
//     }
//   }}
// >
//   <img src="/icons/bag.png" alt="cart" style={styles.cartIcon} />
//   ADD TO CART
// </Link>


//   {/* BUY NOW — FIXED */}
// <Link
//   to="/checkout"
//   style={styles.buyNowButton}
//   onMouseEnter={(e) => {
//     e.currentTarget.style.transform = "scale(1.08)";
//     e.currentTarget.style.boxShadow =
//       "0 12px 30px rgba(0, 0, 0, 0.55)";
//   }}
//   onMouseLeave={(e) => {
//     e.currentTarget.style.transform = "scale(1)";
//     e.currentTarget.style.boxShadow = "none";
//   }}
// >
//   BUY NOW
// </Link>
// </div>

//           </div>
//         </section>

//         <section style={styles.recommendedSection}>
//           <h2 style={styles.recommendedTitle}>
//             Recommended products
//           </h2>
//           <div style={styles.recommendedGrid}>
//             {[212, 212, 212, 212, 212].map((size, i) => (
//               <div
//                 key={i}
//                 style={styles.recommendedItem}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.transform = "scale(1.08)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.transform = "scale(1)")
//                 }
//               >
//                 <img
//                   src="/images/chocolate.webp"
//                   alt="product"
//                   style={styles.recommendedImage}
//                 />
//               </div>
//             ))}
//           </div>
//         </section>

//         <section style={styles.reviewsSection}>
//           <section style={{ maxWidth: 1200, margin: "0 auto", padding: 40 }}>
//             <div style={styles.reviewsHeader}>
//               <div>
//                 <h2>Customer Reviews</h2>
//                 <div style={{ color: "#ffe600" }}></div>
//               </div>

//               <div style={styles.reviewsButtons}>
//                 <button
//                   onClick={() => setShowReviewPopup(true)}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "scale(1.06)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "scale(1)";
//                   }}
//                   style={styles.writeReviewButton}
//                 >
//                   WRITE A REVIEW
//                 </button>

//                 <button
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "scale(1.06)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "scale(1)";
//                   }}
//                   style={styles.topRatedButton}
//                 >
//                   TOP RATED
//                 </button>
//               </div>
//             </div>
//           </section>

//           {showReviewPopup && (
//             <div
//               onClick={() => setShowReviewPopup(false)}
//               style={styles.popupOverlay}
//             >
//               <div
//                 onClick={(e) => e.stopPropagation()}
//                 style={styles.popupContent}
//               >
//                 <h2 style={styles.popupTitle}>
//                   PROTEIN WAFERS – VARIETY PACK OF 10
//                 </h2>

//                 <div style={styles.popupUser}>
//                   <div style={styles.popupAvatar}>
//                     J
//                   </div>
//                   <div>
//                     <div style={styles.popupUserName}>John</div>
//                     <div style={styles.popupUserSubtext}>
//                       Posting publicaly along this site
//                     </div>
//                   </div>
//                 </div>

//                 <div style={styles.popupStars}>
//                   {[1, 2, 3, 4, 5].map((i) => (
//                     <span key={i} style={styles.popupStar}>
//                       ★
//                     </span>
//                   ))}
//                 </div>

//                 <div style={styles.popupTextareaContainer}>
//                   <textarea
//                     placeholder="Write your review here..."
//                     style={styles.popupTextarea}
//                   />
//                 </div>

//                 <div style={styles.popupAddPhoto}>
//                   <button style={styles.popupAddPhotoButton}>
//                     📷 Add Photos & images
//                   </button>
//                 </div>

//                 <div style={styles.popupActions}>
//                   <button
//                     onClick={() => setShowReviewPopup(false)}
//                     style={styles.popupButton}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     onClick={() => setShowReviewPopup(false)}
//                     style={styles.popupPostButton}
//                   >
//                     Post
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div style={styles.reviewsGrid}>
//             <div style={styles.reviewsLeftColumn}>
//               {[1, 2].map((i) => (
//                 <div key={i} style={styles.reviewCardWithImage}>
//                   <img
//                     src="/images/image2.jpg"
//                     alt="review"
//                     style={styles.reviewImage}
//                   />

//                   <strong>Sanju</strong>
//                   <div style={styles.reviewStars}>★★★★★</div>

//                   <p style={styles.reviewText}>
//                     Lorem Ipsum is simply dummy text of the printing and typesetting
//                     industry. Lorem Ipsum has been the industry's standard dummy text
//                     ever since the 1500s.
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div style={styles.reviewsRightColumn}>
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} style={styles.reviewCardText}>
//                   <strong>Sanju</strong>
//                   <div style={styles.reviewStars}>★★★★★</div>

//                   <p style={styles.reviewText}>
//                     Lorem Ipsum is simply dummy text of the printing and typesetting
//                     industry. Lorem Ipsum has been the industry's standard dummy text
//                     ever since the 1500s.
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         <section style={styles.rangeSection}>
//           <h1 style={styles.rangeTitle}>
//             Explore Our Range
//           </h1>

//           <div style={styles.rangeGrid}>
//             {[1, 2, 3, 4].map((i) => (
//               <div
//                 key={i}
//                 style={styles.rangeCard}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = "scale(1.05)";
//                   e.currentTarget.style.boxShadow = "0 18px 36px rgba(0,0,0,0.45)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "scale(1)";
//                   e.currentTarget.style.boxShadow = "none";
//                 }}
//               >
//                 <div style={styles.rangeCardImage}>
//                   <img
//                     src="/images/chocolate.webp"
//                     alt="Protein Wafer"
//                     style={styles.rangeCardImg}
//                   />
//                 </div>

//                 <div style={styles.rangeCardContent}>
//                   <div style={styles.rangeCardTitle}>
//                     PROTEIN WAFERS – VARIETY PACK OF 10
//                   </div>

//                   <div style={styles.rangeCardSubtitle}>
//                     10
//                   </div>

//                   <div style={styles.rangeCardPrice}>
//                     <span style={styles.rangeCardPriceMain}>
//                       RS : 2000
//                     </span>
//                     <span style={styles.rangeCardPriceOld}>
//                       RS : 2999
//                     </span>
//                   </div>

//                   <Link to="/checkout">
//                     <button style={styles.rangeCardButton}>
//                       BUY NOW
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default ProductPage;









import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
const [reviewsLoading, setReviewsLoading] = useState(true);

const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");
const [reviewImages, setReviewImages] = useState([]);
const [submittingReview, setSubmittingReview] = useState(false);
const [showTopRated, setShowTopRated] = useState(false);
const user = JSON.parse(localStorage.getItem("user"));
const [relatedProducts, setRelatedProducts] = useState([]);




  // const images = [
  //   "/images/stawberry.png",
  //   "/images/grapes.png",
  //   "/images/pista.png",
  //   "/images/mango.png",
  // ];



  // const [activeImage, setActiveImage] = useState(images[0]);
  const [activeImage, setActiveImage] = useState("");


 useEffect(() => {
  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get(`/products/${id}`);

      setProduct(data);
      setActiveImage(data.images?.[0]?.url);
    } catch (err) {
      console.error("Product fetch failed:", err);
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);


useEffect(() => {
  if (!product || !product.category) return;

  const fetchRelatedProducts = async () => {
    try {
      const res = await api.get(
        `/products?category=${product.category._id || product.category}&limit=4`
      );

      const filtered = res.data.products.filter(
        (p) => p._id !== product._id
      );

      setRelatedProducts(filtered);
    } catch (err) {
      console.error("Failed to load related products", err);
    }
  };

  fetchRelatedProducts();
}, [product]);




useEffect(() => {
  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);

      const { data } = await api.get(
        `/reviews/${product._id}`
      );

      setReviews(data); // approved reviews only
    } catch (err) {
      console.error("Failed to load reviews", err);
    } finally {
      setReviewsLoading(false);
    }
  };

  if (product?._id) fetchReviews();
}, [product]);



const submitReviewHandler = async () => {
  try {
    setSubmittingReview(true);

    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);

    reviewImages.forEach((img) => {
      formData.append("images", img);
    });

    await api.post(
      `/reviews/${product._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // ✅ SHOW SUCCESS MESSAGE
toast.success(
  "Review submitted successfully! It will be visible after admin approval."
);


    setShowReviewPopup(false);
    setRating(0);
    setComment("");
    setReviewImages([]);

  } catch (error) {
    console.error(error);
  } finally {
    setSubmittingReview(false);
  }
};



  const styles = {
    container: {
      background: "#2f2f2f",
      color: "#fff"
    },
    productSection: {
      maxWidth: 1400,
      margin: "0 auto",
      marginLeft: "100px",
      padding: "60px 40px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 60
    },
    mainImageContainer: {
      border: "2px solid #ffe600",
      borderRadius: 13,
      overflow: "hidden",
      background: "#fff",
      width: "95%",
      height: 560,
      marginLeft: "45px"
    },
    mainImage: {
      width: "90%",
      height: 570,
      objectFit: "cover"
    },
    thumbnailsContainer: {
      marginTop: 16,
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 12,
      marginLeft: "47px",
      width: "95%"
    },
    thumbnailBox: {
      border: "2px solid transparent",
      borderRadius: 10,
      overflow: "hidden",
      background: "#2b2b2b",
      cursor: "pointer",
      transition: "transform 0.25s ease, border 0.25s ease, box-shadow 0.25s ease"
    },
    thumbnailBoxActive: {
      borderColor: "#ffe600"
    },
    thumbnailImage: {
      width: "100%",
      height: 130,
      objectFit: "cover",
      display: "block"
    },
    detailsContainer: {
      maxWidth: 520
    },
    title: {
      fontFamily: "'Jersey 25', sans-serif",
      fontSize: 44,
      letterSpacing: 2,
      lineHeight: "1.1",
      marginBottom: 16,
      textTransform: "uppercase"
    },
    ratingContainer: {
      display: "flex",
      gap: 10,
      marginBottom: 26
    },
    stars: {
      color: "#ffc107",
      fontSize: 18
    },
    reviewCount: {
      color: "#ccc",
      fontSize: 14
    },
    priceContainer: {
      display: "flex",
      gap: 14,
      alignItems: "baseline",
      marginBottom: 30
    },
    price: {
      fontSize: 36,
      fontWeight: 800
    },
    oldPrice: {
      color: "#777",
      textDecoration: "line-through"
    },
    discount: {
      color: "#00ff66",
      fontWeight: 700
    },
    tagsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(3, max-content)",
      gap: 14,
      marginBottom: 34
    },
    tag: {
      border: "1.5px solid #ffe600",
      padding: "10px 16px",
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: "nowrap"
    },
    quantityContainer: {
      marginBottom: 34
    },
    quantityLabel: {
      fontSize: 14,
      marginBottom: 10,
      color: "#fff"
    },
    quantityBox: {
      display: "flex",
      alignItems: "center",
      border: "2px solid #ffe600",
      borderRadius: 12,
      overflow: "hidden",
      height: 52,
      background: "#2f2f2f",
      width: "fit-content"
    },
    quantityButton: {
      width: 56,
      height: "100%",
      background: "transparent",
      border: "none",
      color: "#fff",
      fontSize: 22,
      cursor: "pointer",
      transition: "all 0.25s ease"
    },
    quantityButtonLeft: {
      borderRight: "1px solid #ffe600"
    },
    quantityValue: {
      width: 56,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      fontWeight: 700,
      color: "#fff",
      borderRight: "1px solid #ffe600"
    },
    actionButtons: {
      display: "flex",
      gap: 16
    },

    addToCartButton: {
      flex: 1,
      height: 67,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,

      background: "#2f2f2f",
      color: "#fff",

      padding: "0 20px",
      fontSize: 23,
      fontWeight: 900,

      borderRadius: 11,
      border: "2px solid #ffeb00",

      cursor: "pointer",
      textTransform: "uppercase",
      letterSpacing: 1,
      transition: "all 0.25s ease",

      fontFamily: "'Jersey 25', sans-serif",
      textDecoration: "none",
      boxSizing: "border-box"
    },

    buyNowButton: {
      flex: 1,
      height: 67,                 // 🔑 SAME height
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      background: "#ffeb00",
      color: "#000",

      padding: "0 20px",          // 🔑 SAME padding
      fontSize: 23,
      fontWeight: 900,

      borderRadius: 11,
      border: "2px solid #ffeb00",

      cursor: "pointer",
      textTransform: "uppercase",
      letterSpacing: 1,
      transition: "all 0.25s ease",

      fontFamily: "'Jersey 25', sans-serif",
      textDecoration: "none",
      boxSizing: "border-box"
    },

    cartIcon: {
      width: 26,
      height: 26
    }
    ,

    recommendedSection: {
      padding: "20px 0" // ⬅️ reduced gap (was 40px)
    },

    recommendedTitle: {
      marginBottom: 12, // ⬅️ reduced (was 24)
      fontWeight: 700,
      textAlign: "left",
      marginLeft: 185
    },

    recommendedGrid: {
      display: "flex",
      gap: 24,
      padding: "0 40px",
      justifyContent: "center",
      alignItems: "center"
    },

    recommendedItem: {
      width: 212,
      height: 212,
      borderRadius: 8,
      border: "2px solid #ffe600",
      overflow: "hidden",
      background: "#2b2b2b",
      flexShrink: 0,
      transition: "transform 0.35s ease"
    },

    recommendedImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.35s ease"
    },

    /* ================= REVIEWS SECTION ================= */

    reviewsSection: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "20px 40px", // ⬅️ reduced top/bottom (was 40)
      color: "#fff"
    },

    reviewsHeader: {
      marginBottom: 12, // ⬅️ reduced (was 24)
      fontWeight: 700,
      textAlign: "left",
      marginLeft: -55
    },

    reviewsButtons: {
      display: "flex",
      gap: 16,
      marginTop: 10,
      marginLeft: "auto", // ⬅️ keeps buttons on right
      alignItems: "center"
    },

    writeReviewButton: {
      background: "#ffe600",
      width: 190,
      height: 52,
      fontWeight: "bold",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      transition: "transform 0.2s ease",
      fontFamily: "'Jersey 25', sans-serif",
      fontSize: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },

    topRatedButton: {
      background: "transparent",
      border: "2px solid #ffe600",
      color: "#ffffff",
      width: 170,
      height: 52,
      borderRadius: 8,
      cursor: "pointer",
      transition: "transform 0.2s ease",
      fontFamily: "'Jersey 25', sans-serif",
      fontSize: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    popupOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.75)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "16px"
    },
    popupContent: {
      width: "100%",
      maxWidth: 900,
      background: "#3a3a3a",
      borderRadius: 26,
      border: "2px solid #ffe600",
      padding: "clamp(20px, 4vw, 50px)",
      boxSizing: "border-box"
    },
    popupTitle: {
      fontFamily: "'Jersey 25', sans-serif",
      textAlign: "center",
      letterSpacing: 2,
      marginBottom: "clamp(20px, 4vw, 40px)",
      fontSize: "clamp(20px, 3vw, 28px)"
    },
    popupUser: {
      display: "flex",
      gap: 16,
      alignItems: "center",
      marginBottom: "clamp(20px, 4vw, 40px)"
    },
    popupAvatar: {
      width: 46,
      height: 46,
      borderRadius: "50%",
      background: "#1db954",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      fontWeight: "bold",
      flexShrink: 0
    },
    popupUserName: {
      fontSize: 18
    },
    popupUserSubtext: {
      fontSize: 14,
      opacity: 0.8
    },
    popupStars: {
      display: "flex",
      justifyContent: "center",
      gap: "clamp(12px, 3vw, 30px)",
      marginBottom: "clamp(20px, 4vw, 40px)",
      flexWrap: "wrap"
    },
    popupStar: {
      fontSize: "clamp(30px, 6vw, 46px)",
      color: "#ffc107"
    },
    popupTextareaContainer: {
      border: "2px solid #ffe600",
      borderRadius: 20,
      padding: "clamp(16px, 3vw, 24px)",
      marginBottom: "clamp(20px, 4vw, 30px)"
    },
    popupTextarea: {
      width: "100%",
      minHeight: 120,
      maxHeight: 220,
      background: "transparent",
      border: "none",
      outline: "none",
      resize: "vertical",
      color: "#ddd",
      fontSize: "clamp(14px, 2.5vw, 15px)",
      lineHeight: 1.7
    },
    popupAddPhoto: {
      textAlign: "center",
      marginBottom: 30
    },
    popupAddPhotoButton: {
      background: "#4a4a2f",
      color: "#fff",
      border: "none",
      padding: "12px 26px",
      borderRadius: 30,
      cursor: "pointer",
      fontSize: "clamp(14px, 2.5vw, 15px)"
    },
    popupActions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 16,
      flexWrap: "wrap"
    },
    popupButton: {
      background: "#ffe600",
      color: "#000",
      border: "none",
      padding: "12px 26px",
      fontWeight: 700,
      borderRadius: 8,
      cursor: "pointer",
      minWidth: 120
    },
    popupPostButton: {
      background: "#ffe600",
      color: "#000",
      border: "none",
      padding: "12px 30px",
      fontWeight: 700,
      borderRadius: 8,
      cursor: "pointer",
      minWidth: 120
    },
    reviewsGrid: {
      display: "grid",
      gridTemplateColumns: "1.3fr 1fr",
      gap: 10
    },
    reviewsLeftColumn: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      // marginLeft: -15
    },
    reviewCardWithImage: {
      border: "1px solid #ffe600",
      borderRadius: 16,
      padding: 16,
       background: "#2f2f2f",
        width: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: 10,
    },
    
reviewHeader: {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "8px",
},

reviewAvatar: {
   width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "#22c55e",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  color: "#000",
  flexShrink: 0,
},

reviewUserName: {
  fontSize: "14px",
  fontWeight: 600,
  color: "#fff",
},
    reviewImage: {
     width: "100%",
      borderRadius: 10,
      marginBottom: 12,
  maxHeight: 200,
  objectFit: "cover",
    },

    reviewStars: {
      color: "#ffe600",
      // margin: "6px 0"
         fontSize: 18,
        marginBottom: 8,
    },
    reviewText: {
      // fontSize: 13,
      // lineHeight: 1.6
       color: "#ddd",
       fontSize: 15,
       lineHeight: "1.5",
    },
    reviewsRightColumn: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    },
    reviewCardText: {
      border: "1px solid #ffe600",
      borderRadius: 12,
      padding: 20,
      background: "#2f2f2f",
      width: "100%",
      boxSizing: "border-box"
    },
    rangeSection: {
      padding: "64px 0",
      background: "#2f2f2f"
    },
    rangeTitle: {
      fontFamily: "'Jersey 25', sans-serif",
      fontSize: 56,
      fontWeight: 900,
      textTransform: "uppercase",
      color: "#ffe600",
      maxWidth: 2100,
      margin: "0 auto 56px",
      textAlign: "center",
      letterSpacing: "1px",
      lineHeight: "1.00"
    },
    rangeGrid: {
      maxWidth: 1230,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 28,
      padding: "0 32px"
    },
    rangeCard: {
      background: "#3a3a3a",
      border: "2px solid #ffe600",
      borderRadius: 14,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      height: 500,
      transition: "transform 0.35s ease, box-shadow 0.35s ease",
      willChange: "transform"
    },
    rangeCardImage: {
      height: 330,
      overflow: "hidden"
    },
    rangeCardImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    rangeCardContent: {
      padding: "18px 18px 16px"
    },
    rangeCardTitle: {
      fontWeight: 900,
      fontSize: 12,
      letterSpacing: "0.6px",
      marginBottom: 6,
      textTransform: "uppercase",
      color: "#fff",
      lineHeight: "16px"
    },
    rangeCardSubtitle: {
      fontSize: 12,
      marginBottom: 10,
      opacity: 0.85,
      color: "#fff"
    },
    rangeCardPrice: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 14,
      color: "#fff"
    },
    rangeCardPriceMain: {
      fontWeight: 800,
      fontSize: 14
    },
    rangeCardPriceOld: {
      textDecoration: "line-through",
      color: "#9a9a9a",
      fontSize: 13
    },
    rangeCardButton: {
      width: "100%",
      height: 42,
      background: "#ffe600",
      color: "#000",
      border: "none",
      fontWeight: 900,
      cursor: "pointer",
      borderRadius: 8,
      fontSize: 14,
      letterSpacing: "0.5px"
    },

    highlightsTitle: {
  fontSize: 16,
  fontWeight: 700,
  marginBottom: 14,
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  color: "#fff"
},

highlightsContainer: {
  display: "flex",
  flexWrap: "wrap",
  gap: 14,
  marginBottom: 34
},

highlightTag: {
  border: "2px solid #ffe600",
  padding: "10px 18px",
  borderRadius: 10,
  fontSize: 12,
  fontWeight: 700,
  whiteSpace: "nowrap",
  color: "#fff",
  textTransform: "uppercase"
},
 
priceBlock: {
  display: "flex",
  alignItems: "center",
  gap: 14,
  marginBottom: 20
},

currentPrice: {
  fontSize: 28,
  fontWeight: 800,
  color: "#fff"
},

originalPrice: {
  fontSize: 16,
  color: "#aaa",
  textDecoration: "line-through"
},

discountText: {
  fontSize: 14,
  fontWeight: 700,
  color: "#00ff88"
}


    

  };


  if (loading) {
    return (
      <div style={{ color: "#ffeb00", textAlign: "center", marginTop: 120 }}>
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: 120 }}>
        {error || "Product not found"}
      </div>
    );
  }

  // const images = product.images?.map(img => img.url) || [];

  const images = Array.isArray(product.images)
    ? product.images.map(img => img.url)
    : [];
    
    const filteredReviews = showTopRated
  ? reviews.filter(r => r.rating >= 4)
  : reviews;


    // 🔹 Split reviews for layout
const imageReviews = filteredReviews.filter(r => r.images?.length > 0);
const textReviews = filteredReviews.filter( r => !r.images || r.images.length === 0
);


  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
      `}</style>

      <div style={styles.container}>
        <section style={styles.productSection}>
          <div>
            <div style={styles.mainImageContainer}>
              {/* <img
                src={activeImage}
                alt="product"
                style={styles.mainImage}
              /> */}
              <img
                src={activeImage || images[0] || "/images/Product1.png"}
                alt={product.name}
                style={styles.mainImage}
              />

            </div>

            <div style={styles.thumbnailsContainer}>
              {images.map((src, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.thumbnailBox,
                    ...(activeImage === src ? styles.thumbnailBoxActive : {}),
                    borderColor: activeImage === src ? "#ffe600" : "transparent"
                  }}
                  onClick={() => setActiveImage(src)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#ffe600";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    if (activeImage !== src) {
                      e.currentTarget.style.borderColor = "transparent";
                    }
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <img
                    src={src}
                    alt={`thumb-${i}`}
                    style={styles.thumbnailImage}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={styles.detailsContainer}>
            <h1 style={styles.title}>
              {product.name}
            </h1>

            <div style={styles.ratingContainer}>
              <div style={styles.stars}></div>
              <span style={styles.numReviews}>
                {"★".repeat(Math.round(product.rating || 0))}
                {"☆".repeat(5 - Math.round(product.rating || 0))}
                <span style={styles.reviewCount}>
                  | {product.numReviews || 0} Reviews
                </span>
              </span>
            </div>

            {/* <div style={styles.priceContainer}> */}
              {/* <span style={styles.price}>
                RS : 2000
              </span>
              <span style={styles.oldPrice}>
                RS : 2999
              </span>
              <span style={styles.discount}>
                25% OFF
              </span> */}
              {/* RS : {product.price}
              {product.originalPrice && (
                <span style={styles.originalPrice}>RS : {product.originalPrice}</span>
              )}
              {product.discountPercent && (
                <span style={styles.discountPercent}>{product.discountPercent}</span>
              )}

            </div> */}

          <div style={styles.priceBlock}>
  {/* Current Price */}
  <span style={styles.currentPrice}>
    ₹{product.price}
  </span>

  {/* Original Price (cut) */}
  {product.originalPrice > product.price && (
    <span style={styles.originalPrice}>
      ₹{product.originalPrice}
    </span>
  )}

  {/* Discount */}
  {product.discountPercent > 0 && (
    <span style={styles.discountText}>
      {product.discountPercent}% OFF
    </span>
  )}
</div>




            {/* <div style={styles.tagsContainer}> */}
              {/* {[
                "NO PRESERVATIVES",
                "JAGGERY BASED",
                "NO ADDED COLOURS",
                "80 % PEANUT",
                "NO GLUCOSE ADDED",
                "NO PRESERVATIVES",
              ].map((tag, i) => (
                <span key={i} style={styles.tag}>
                  {tag}
                </span>
              ))} */}
              {/* {product.specs?.map((tag, i) => (
                <span key={i} style={styles.tag}>
                  {tag}
                </span>
              ))}

            </div> */}


          <div>
  {/* <div style={styles.highlightsTitle}>
    Highlights
  </div> */}

  <div style={styles.highlightsContainer}>
    {product.highlights?.map((item, i) => (
      <span key={i} style={styles.highlightTag}>
        {item}
      </span>
    ))}
  </div>
</div>



            <div style={styles.quantityContainer}>
              <div style={styles.quantityLabel}>
                Quantity
              </div>

              <div style={styles.quantityBox}>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ffe600";
                    e.currentTarget.style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#fff";
                  }}
                  style={{
                    ...styles.quantityButton,
                    ...styles.quantityButtonLeft
                  }}
                >
                  −
                </button>

                <div style={styles.quantityValue}>
                  {qty}
                </div>

                <button
                  onClick={() => setQty(qty + 1)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ffe600";
                    e.currentTarget.style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#fff";
                  }}
                  style={styles.quantityButton}
                >
                  +
                </button>
              </div>
            </div>
            <div style={styles.actionButtons}>
              {/* ADD TO CART */}
              {/* <Link
    to="/cart"
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#ffeb00";
      e.currentTarget.style.color = "#000";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#2f2f2f";
      e.currentTarget.style.color = "#fff";
    }}
    style={styles.addToCartButton}
  >
    <img src="/icons/bag.png" alt="cart" style={styles.cartIcon} />
    ADD TO CART
  </Link> */}

              <button
                style={styles.addToCartButton}
                onClick={async () => {
                  try {
                    await api.post( "/cart",
                      { productId: product._id, quantity: qty },
                      { withCredentials: true }
                    );
                    alert("Added to cart");
                  } catch (err) {
                    alert("Please login to add items to cart");
                  }
                }}
              >
                <img src="/icons/bag.png" alt="cart" style={styles.cartIcon} />
                ADD TO CART
              </button>


              {/* BUY NOW — FIXED */}
              <Link
                to="/checkout"
                style={styles.buyNowButton}
              >
                BUY NOW
              </Link>
            </div>

          </div>
        </section>
{/* 
        <section style={styles.recommendedSection}>
          <h2 style={styles.recommendedTitle}>
            Recommended products
          </h2>
          <div style={styles.recommendedGrid}>
            {[212, 212, 212, 212, 212].map((size, i) => (
              <div
                key={i}
                style={styles.recommendedItem}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src="/images/chocolate.webp"
                  alt="product"
                  style={styles.recommendedImage}
                />
              </div>
            ))}
          </div>
        </section> */}

        <section style={styles.reviewsSection}>
          <section style={{ maxWidth: 1200, margin: "0 auto", padding: 40 }}>
            <div style={styles.reviewsHeader}>
              <div>
                <h2>Customer Reviews</h2>
                <div style={{ color: "#ffe600" }}></div>
              </div>

              <div style={styles.reviewsButtons}>
                <button
                  onClick={() => setShowReviewPopup(true)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  style={styles.writeReviewButton}
                >
                  WRITE A REVIEW
                </button>

                <button
                onClick={() => setShowTopRated(prev => !prev)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  style={{
    ...styles.topRatedButton,
    background: showTopRated ? "#ffe600" : "#4a4a2f",
    color: showTopRated ? "#000" : "#fff",
  }}
                >
                  TOP RATED
                </button>
              </div>
            </div>
          </section>

          {showReviewPopup && (
            <div
              onClick={() => setShowReviewPopup(false)}
              style={styles.popupOverlay}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={styles.popupContent}
              >
                <h2 style={styles.popupTitle}>
                  PROTEIN WAFERS – VARIETY PACK OF 10
                </h2>

                <div style={styles.popupUser}>
                  <div style={styles.popupUser}>
  <div style={styles.popupAvatar}>
    {user?.name?.charAt(0).toUpperCase()}
  </div>
  <div>
    <div style={styles.popupUserName}>
      {user?.name}
    </div>
    <div style={styles.popupUserSubtext}>
      Posting publicly on this site
    </div>
  </div>
</div>

                </div>

                <div style={styles.popupStars}>

                  {[1, 2, 3, 4, 5].map((i) => (
                   <span key={i}  style={{
...styles.popupStar,
      cursor: "pointer",
      color: i <= rating ? "#ffc107" : "#555",
    }}
    onClick={() => setRating(i)}
  >
    ★
  </span>
))}
                  
                </div>

                <div style={styles.popupTextareaContainer}>
                  <textarea
                    placeholder="Write your review here..."
                    style={styles.popupTextarea}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div style={styles.popupAddPhoto}>
  <label style={styles.popupAddPhotoButton}>
    📷 Add Photos & images
    <input
      type="file"
      multiple
      accept="image/*"
      style={{ display: "none" }}
      onChange={(e) => setReviewImages([...e.target.files])}
    />
  </label>

  {reviewImages.length > 0 && (
    <p style={{ color: "#aaa", marginTop: 8 }}>
      {reviewImages.length} image(s) selected
    </p>
  )}
</div>


                <div style={styles.popupActions}>
                  <button
                    onClick={() => setShowReviewPopup(false)}
                    style={styles.popupButton}
                  >
                    Cancel
                  </button>

                  <button
  onClick={submitReviewHandler}
  disabled={submittingReview}
  style={styles.popupPostButton}
>
  {submittingReview ? "Posting..." : "Post"}
</button>


                </div>
              </div>
            </div>
          )}

          <div style={styles.reviewsGrid}>
  <div style={styles.reviewsLeftColumn}>

    {reviewsLoading && <p>Loading reviews...</p>}

    {!reviewsLoading && reviews.length === 0 && (
      <p>No reviews yet.</p>
    )}

  {imageReviews.map((review) => (
    <div key={review._id} style={styles.reviewCardWithImage}>

      {/* Header */}
      <div style={styles.reviewHeader}>
        <div style={styles.reviewAvatar}>
          {review.user?.name?.charAt(0).toUpperCase()}
        </div>
        <div style={styles.reviewUserName}>
          {review.user?.name}
        </div>
      </div>

      {/* Image */}
      <img
        src={review.images[0].url}
        alt="Review"
        style={styles.reviewImage}
      />

      {/* Stars */}
      <div style={styles.reviewStars}>
        {"★".repeat(review.rating)}
        {"☆".repeat(5 - review.rating)}
      </div>

      {/* Comment */}
      <p style={styles.reviewText}>
        {review.comment}
      </p>

    </div>
  ))}

</div>
<div style={styles.reviewsRightColumn}>

  {textReviews.map((review) => (
    <div key={review._id} style={styles.reviewCardText}>

      <div style={styles.reviewHeader}>
        <div style={styles.reviewAvatar}>
          {review.user?.name?.charAt(0).toUpperCase()}
        </div>
        <div style={styles.reviewUserName}>
          {review.user?.name}
        </div>
      </div>

      <div style={styles.reviewStars}>
        {"★".repeat(review.rating)}
        {"☆".repeat(5 - review.rating)}
      </div>

      <p style={styles.reviewText}>
        {review.comment}
      </p>

    </div>
  ))}

</div>

</div>


        </section>

        <section style={styles.rangeSection}>
          <h1 style={styles.rangeTitle}>
            Explore Our Range
          </h1>
   
         <div style={styles.rangeGrid}>
  {relatedProducts.map((item) => (
    <div
      key={item._id}
      style={styles.rangeCard}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 18px 36px rgba(0,0,0,0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={styles.rangeCardImage}>
        <img
          src={item.images?.[0]?.url || "/images/chocolate.webp"}
          alt={item.name}
          style={styles.rangeCardImg}
        />
      </div>

      <div style={styles.rangeCardContent}>
        <div style={styles.rangeCardTitle}>
          {item.name}
        </div>

        <div style={styles.rangeCardSubtitle}>
          {/* {item.weight || ""} */}
           {item.countInStock} available
        </div>

        <div style={styles.rangeCardPrice}>
          <span style={styles.rangeCardPriceMain}>
            RS : {item.price}
          </span>

          {/* {item.oldPrice && (
            <span style={styles.rangeCardPriceOld}>
              RS : {item.oldPrice}
            </span>
          )} */}
          <span style={styles.rangeCardPriceOld}>
        RS : {item.originalPrice}
      </span>
        </div>

        <Link to={`/product/${item.id}`}>
          <button style={styles.rangeCardButton}>
            BUY NOW
          </button>
        </Link>
      </div>
    </div>
  ))}
</div>


        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProductPage;