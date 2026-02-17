// import { Link } from "react-router-dom";
// import { Instagram, Twitter, Youtube } from "lucide-react";
// import { SiFacebook, SiTiktok } from "react-icons/si";

// export default function Footer() {
//   return (
//     <>
//       <footer className="mpact-footer">
//         <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Khand:wght@500;600;700&display=swap');
//     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

//     .mpact-footer {
//       background: #3a3a3a;
//       color: #ffffff;
//       padding-top: 20px;
//       font-family: 'Inter', sans-serif;
//     }
//       .social-icon {
//   transition: 
//     transform 0.25s ease,
//     border-color 0.25s ease,
//     color 0.25s ease,
//     box-shadow 0.25s ease;
// }

// .social-icon:hover {
//   transform: scale(1.08);
//   border-color: #ffeb3b;
//   color: #ffeb3b;
//   box-shadow: 0 0 18px rgba(255, 235, 59, 0.45);
// }


//     .footer-wrapper {
//       max-width: 1400px;
//       margin: auto;
//       padding: 0 60px;
//     }

//     /* MAIN HEADING */
//     .footer-hash {
//       text-align: center;
//       font-size: 76px;
//       font-weight: 700;
//       color: #ffeb3b;
//       letter-spacing: 2px;
//       font-family: 'Khand', sans-serif;
//     }

//     .footer-main {
//       display: grid;
//       grid-template-columns: 1fr 1fr 1fr;
//       align-items: center;
//       gap: 40px;
//     }

//     /* LEFT LINKS */
//     .footer-links {
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 10px 5px;   /* row gap | column gap */
//   font-size: 15px;
//   font-weight: 500;
// }


//     .footer-links a {
//       color: white;
//       text-decoration: none;
//     }

//    .footer-links a {
//   position: relative;
//   color: white;
//   text-decoration: none;
//   transition: color 0.3s ease;
// }

// /* underline animation */
// .footer-links a::after {
//   content: "";
//   position: absolute;
//   left: 0;
//   bottom: -4px;
//   width: 0%;
//   height: 2px;
//   background: #ffeb3b;
//   transition: width 0.3s ease;
// }

// .footer-links a:hover {
//   color: #ffeb3b;
// }

// .footer-links a:hover::after {
//   width: 100%;
// }


//     /* SOCIAL ICONS */
//     .footer-social {
//   display: flex;
//   justify-content: center;
//   gap: 26px;
// }

// .social-icon {
//   width: 76px;
//   height: 76px;
//   border-radius: 50%;
//   border: 1.5px solid rgba(255, 255, 255, 0.8);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
//   background: transparent;
// }


//     /* SUBSCRIBE */
//     .footer-subscribe h3 {
//       color: #ffeb3b;
//       font-size: 28px;
//       margin-bottom: 10px;
//       font-family: 'Khand', sans-serif;
//       font-weight: 600;
//     }

//     .footer-subscribe p {
//       font-size: 14px;
//       color: #d0d0d0;
//       line-height: 1.6;
//       margin-bottom: 18px;
//     }

//     .footer-subscribe input {
//       width: 100%;
//       background: transparent;
//       border: none;
//       border-bottom: 1px solid #ffeb3b;
//       padding: 10px 0;
//       color: white;
//       outline: none;
//       font-size: 14px;
//       margin-bottom: 22px;
//     }

//     .footer-subscribe button {
//       background: #ffeb3b;
//       color: black;
//       border: none;
//       padding: 12px 28px;
//       font-weight: 600;
//       cursor: pointer;
//       font-size: 14px;
//       font-family: 'Khand', sans-serif;
//     }

//     /* DIVIDER */
//     .footer-divider {
//       margin-top: 80px;
//       border-top: 1px solid #555;
//     }

//     /* BOTTOM */
//     .footer-bottom {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       padding: 25px 40px;
//       font-size: 13px;
//       color: #cfcfcf;
//     }

//     .footer-logo {
//       font-size: 22px;
//       color: #ffeb3b;
//       font-weight: 700;
//       font-family: 'Khand', sans-serif;
//     }

//     .footer-icons {
//       display: flex;
//       gap: 14px;
//     }

//     .footer-icons span {
//       width: 36px;
//       height: 36px;
//       border-radius: 50%;
//       border: 1px solid #777;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 14px;
//       cursor: pointer;
//     }

//     @media (max-width: 900px) {
//       .footer-main {
//         grid-template-columns: 1fr;
//         text-align: center;
//       }

//       .footer-links {
//         align-items: center;
//       }

//       .footer-bottom {
//         flex-direction: column;
//         gap: 10px;
//       }
//     }

//     /* PHONE: tighten spacing & scale down elements for small screens */
//     @media (max-width: 600px) {
//       .footer-wrapper {
//         padding: 0 20px;
//       }

//       .footer-hash {
//         font-size: 36px;
//       }

//       .footer-main {
//         gap: 20px;
//       }

//       .footer-links {
//         grid-template-columns: 1fr;
//         gap: 8px 0;
//         font-size: 14px;
//         justify-items: center;
//       }

//       .social-icon {
//         width: 56px;
//         height: 56px;
//       }

//       .footer-subscribe {
//         padding: 28px 18px;
//         align-items: center;
//       }

//       .footer-subscribe h2 {
//         font-size: 20px;
//         text-align: center;
//       }

//       .subscribe-divider {
//         max-width: 260px;
//       }

//       .footer-bottom {
//         padding: 18px 20px;
//       }
//     }

//     /* SMALLER PHONES */
//     @media (max-width: 420px) {
//       .footer-hash {
//         font-size: 30px;
//       }

//       .social-icon {
//         width: 48px;
//         height: 48px;
//       }

//       .footer-links {
//         font-size: 13px;
//       }
//     }
//   `}</style>

//         <div className="footer-wrapper">
//           <div className="footer-hash"># GET IT NOW</div>

//           <div className="footer-main">
//             {/* LINKS */}
//             <div className="footer-links">
//               <a href="/">Home</a>
//               <a href="/terms-and-conditions">Terms & Conditions</a>

//               <a href="/product">Products</a>
//               <a href="/privacy-policy">Privacy Policy</a>

//               <a href="/about">About us</a>
//               <a href="#">Return Policy</a>

//               <a href="/blog">Blogs</a>
//               <a href="/help">Help and Support</a>

//               <a href="/faq">FAQ</a>
//             </div>


//             {/* SOCIAL */}
//             <div className="footer-social">
//               <div className="social-icon">
//                 <Instagram size={26} strokeWidth={1.8} />
//               </div>

//               <div className="social-icon">
//                 <SiFacebook size={26} />
//               </div>

//               <div className="social-icon">
//                 <Twitter size={26} strokeWidth={1.8} />
//               </div>
//             </div>


//             {/* SUBSCRIBE */}
//             <div style={{
//   backgroundColor: "#3a3a3a",
//   padding: "50px 40px",
//   color: "#ffffff"
// }}>
//   <h2 style={{
//     color: "#ffeb3b",
//     fontSize: "26px",
//     fontWeight: "800",
//     textTransform: "uppercase",
//     letterSpacing: "1px",
//     marginBottom: "12px"
//   }}>
//     Pure Protein. Real Results.
//   </h2>

//   <p style={{
//     fontSize: "15px",
//     color: "#dcdcdc",
//     maxWidth: "520px",
//     lineHeight: "1.7"
//   }}>
//     Premium whey proteins, mass gainers, and fitness supplements
//     crafted to support muscle growth, recovery, and peak performance.
//   </p>

//   <div style={{
//     width: "350px",
//     height: "3px",
//     backgroundColor: "#ffeb3b",
//     marginTop: "22px"
//   }}></div>
// </div>

//           </div>
//         </div>

//         <div className="footer-divider"></div>

//         <div className="footer-bottom">
//           <div className="footer-logo">MPACT</div>
//           <div>COPYRIGHT © MPACT 2025 – ALL RIGHTS RESERVED</div>
//           <div className="footer-icons">
//             {/* <span>
//               <Instagram size={16} strokeWidth={1.8} />
//             </span>
//             <span><SiTiktok size={16} /></span>
//             <span>
//               <Youtube size={16} strokeWidth={1.8} />
//             </span> */}

//           </div>
//         </div>
//       </footer>

//     </>);
// };



import { Link } from "react-router-dom";
import { Instagram, Youtube } from "lucide-react";
import { SiFacebook } from "react-icons/si";
import OfferScrollBar from "./OfferScrollBar"

export default function Footer() {
  return (
    <>
      <OfferScrollBar />
      <footer className="mpact-footer">
        <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Khand:wght@500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    .mpact-footer {
      background: #3a3a3a;
      color: #ffffff;
      padding: 60px 0 0 0;
      font-family: 'Inter', sans-serif;
    }

    .footer-wrapper {
      max-width: 1400px;
      margin: auto;
      padding: 0 60px;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 50px;
      padding-bottom: 60px;
    }

    /* SECTION STYLING */
    .footer-section h3 {
      font-family: 'Khand', sans-serif;
      font-size: 24px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
      color: white;
      padding-bottom: 12px;
      border-bottom: 3px solid #ffeb3b;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
      margin-top: 24px;
    }

    .footer-section ul li {
      margin-bottom: 14px;
    }

    .footer-section ul li a {
      color: white;
      text-decoration: none;
      font-size: 15px;
      font-weight: 400;
      transition: opacity 0.3s ease;
      display: inline-block;
    }

    .footer-section ul li a:hover {
      color:#ffeb3b;
      opacity: 0.8;
      text-decoration: underline;
    }

    /* SOCIAL ICONS */
    .footer-social-icons {
      display: flex;
      gap: 16px;
      margin-top: 20px;
    }

    .social-circle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #E31E24;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .social-circle:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    /* CONTACT INFO */
    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 18px;
      font-size: 15px;
      line-height: 1.6;
    }

    .contact-item svg,
    .contact-item .icon {
      flex-shrink: 0;
      margin-top: 2px;
    }

    /* BOTTOM BAR */
    .footer-bottom {
      background: #3a3a4a;
      padding: 20px 60px;
      text-align: center;
      font-size: 14px;
      color: white;
    }

    /* RESPONSIVE */
    @media (max-width: 1100px) {
      .footer-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 40px;
      }
    }

    @media (max-width: 768px) {
      .footer-wrapper {
        padding: 0 30px;
      }

      .footer-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 35px;
      }

      .footer-bottom {
        padding: 20px 30px;
      }
    }

    @media (max-width: 500px) {
      .footer-wrapper {
        padding: 0 20px;
      }

      .footer-grid {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      .footer-section h3 {
        font-size: 20px;
      }

      .footer-bottom {
        padding: 20px;
        font-size: 13px;
      }
    }
  `}</style>

        <div className="footer-wrapper">
          <div className="footer-grid">
            {/* SHOP ALL */}
            <div className="footer-section">
              <h3>SHOP ALL</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/product">Products</a></li>
                {/* <li><a href="/products/protein-bars">Protein Bars</a></li>
                <li><a href="/products/pre-workout">Pre-Workout</a></li>
                <li><a href="/products/supplements">Supplements</a></li> */}
              </ul>
            </div>

            {/* KNOW MORE */}
            <div className="footer-section">
              <h3>KNOW MORE</h3>
              <ul>
                <li><a href="/blog">Blogs</a></li>
                <li><a href="/tracking">Tracking Link</a></li>
                {/* <li><a href="/pro">MPACT Pro</a></li> */}
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Connect Now</a></li>
              </ul>
            </div>

            {/* SUPPORT & POLICY */}
            <div className="footer-section">
              <h3>SUPPORT & POLICY</h3>
              <ul>
                {/* <li><a href="/refer">Refer & Earn</a></li> */}
                <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/returns">Return Policy</a></li>
                <li><a href="/help">Help and Support</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/help">Contact Us</a></li>
              </ul>
            </div>

            {/* FOLLOW ALONG */}
            {/* FOLLOW ALONG */}
            <div className="footer-section">
              <h3>FOLLOW ALONG</h3>
              <div className="footer-social-icons">

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/mpact.in?igsh=MTc5aGRmcmNtc3F0OQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="social-circle">
                    <Instagram size={22} strokeWidth={2} />
                  </div>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@mpact_fit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="social-circle">
                    <Youtube size={22} strokeWidth={2} />
                  </div>
                </a>
              </div>
            </div>

            {/* GET IN TOUCH */}
            <div className="footer-section">
              <h3>GET IN TOUCH</h3>
              <div className="contact-item">
                <span className="icon">📱</span>
                <span>+91 8655450110</span>
              </div>
              <div className="contact-item">
                <span className="icon">✉️</span>
                <span>support@mpact.in</span>
              </div>
              <div className="contact-item">
                <span className="icon">🕐</span>
                <div>
                  <div>10AM - 6PM IST</div>
                  <div>(Monday to Saturday)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          COPYRIGHT © MPACT 2025 – ALL RIGHTS RESERVED
          <h2>Design and Developed by Scipy Technologies</h2>
        </div>
      </footer>
    </>
  );
}