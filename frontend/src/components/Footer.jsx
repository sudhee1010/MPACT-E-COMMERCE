// import { Link } from "react-router-dom";
// import { Instagram, Youtube, Linkedin, Twitter } from "lucide-react";
// import { SiFacebook } from "react-icons/si";
// import OfferScrollBar from "./OfferScrollBar"

// export default function Footer() {
//   return (
//     <>
//       <OfferScrollBar />
//       <footer className="mpact-footer">
//         <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Khand:wght@500;600;700;800&display=swap');
//     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

//     .mpact-footer {
//       background: #3a3a3a;
//       color: #ffffff;
//       padding: 60px 0 0 0;
//       font-family: 'Inter', sans-serif;
//     }

//     .footer-wrapper {
//       max-width: 1400px;
//       margin: auto;
//       padding: 0 60px;
//     }

//     .footer-grid {
//       display: grid;
//       grid-template-columns: repeat(5, 1fr);
//       gap: 50px;
//       padding-bottom: 60px;
//     }

//     /* SECTION STYLING */
//     .footer-section h3 {
//       font-family: 'Khand', sans-serif;
//       font-size: 24px;
//       font-weight: 800;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       margin-bottom: 8px;
//       color: white;
//       padding-bottom: 12px;
//       border-bottom: 3px solid #ffeb3b;
//     }

//     .footer-section ul {
//       list-style: none;
//       padding: 0;
//       margin: 0;
//       margin-top: 24px;
//     }

//     .footer-section ul li {
//       margin-bottom: 14px;
//     }

//     .footer-section ul li a {
//       color: white;
//       text-decoration: none;
//       font-size: 15px;
//       font-weight: 400;
//       transition: opacity 0.3s ease;
//       display: inline-block;
//     }

//     .footer-section ul li a:hover {
//       color:#ffeb3b;
//       opacity: 0.8;
//       text-decoration: underline;
//     }

//     /* SOCIAL ICONS */
//     .footer-social-icons {
//       display: flex;
//       gap: 16px;
//       margin-top: 20px;
//     }

//     .social-circle {
//       width: 48px;
//       height: 48px;
//       border-radius: 50%;
//       background: white;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       color: #E31E24;
//       cursor: pointer;
//       transition: transform 0.3s ease, box-shadow 0.3s ease;
//     }

//     .social-circle:hover {
//       transform: scale(1.1);
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
//     }

//     /* CONTACT INFO */
//     .contact-item {
//       display: flex;
//       align-items: flex-start;
//       gap: 12px;
//       margin-bottom: 18px;
//       font-size: 15px;
//       line-height: 1.6;
//     }

//     .contact-item svg,
//     .contact-item .icon {
//       flex-shrink: 0;
//       margin-top: 2px;
//     }

//     /* BOTTOM BAR */
//     .footer-bottom {
//       background: #3a3a4a;
//       padding: 20px 60px;
//       text-align: center;
//       font-size: 14px;
//       color: white;
//     }

//     /* RESPONSIVE */
//     @media (max-width: 1100px) {
//       .footer-grid {
//         grid-template-columns: repeat(3, 1fr);
//         gap: 40px;
//       }
//     }

//     @media (max-width: 768px) {
//       .footer-wrapper {
//         padding: 0 30px;
//       }

//       .footer-grid {
//         grid-template-columns: repeat(2, 1fr);
//         gap: 35px;
//       }

//       .footer-bottom {
//         padding: 20px 30px;
//       }
//     }

//     @media (max-width: 500px) {
//       .footer-wrapper {
//         padding: 0 20px;
//       }

//       .footer-grid {
//         grid-template-columns: 1fr;
//         gap: 30px;
//       }

//       .footer-section h3 {
//         font-size: 20px;
//       }

//       .footer-bottom {
//         padding: 20px;
//         font-size: 13px;
//       }
//     }
//   `}</style>

//         <div className="footer-wrapper">
//           <div className="footer-grid">
//             {/* SHOP ALL */}
//             <div className="footer-section">
//               <h3>SHOP ALL</h3>
//               <ul>
//                 {/* <li><a href="/">Home</a></li> */}
//                 <li><a href="/product">Products</a></li>
//                 {/* <li><a href="/distributor">Distributor</a></li> */}

//                 {/* <li><a href="/products/protein-bars">Protein Bars</a></li>
//                 <li><a href="/products/pre-workout">Pre-Workout</a></li>
//                 <li><a href="/products/supplements">Supplements</a></li> */}
//               </ul>
//             </div>

//             {/* KNOW MORE */}
//             <div className="footer-section">
//               <h3>KNOW MORE</h3>
//               <ul>
//                 <li><a href="/blog">Blogs</a></li>
//                 <li><a href="/tracking">Tracking Link</a></li>
//                 {/* <li><a href="/pro">MPACT Pro</a></li> */}
//                 <li><a href="/about">About Us</a></li>
//                 <li><a href="/faq">FAQ</a></li>
//                 <li><a href="/connect">Connect Now</a></li>
//               </ul>
//             </div>

//             {/* SUPPORT & POLICY */}
//             <div className="footer-section">
//               <h3>SUPPORT & POLICY</h3>
//               <ul>
//                 {/* <li><a href="/refer">Refer & Earn</a></li> */}
//                 <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
//                 <li><a href="/privacy-policy">Privacy Policy</a></li>
//                 <li><a href="/return-policy">Return Policy</a></li>
//                 <li><a href="/help">Help and Support</a></li>
//                 <li><a href="/contact-us">Contact Us</a></li>
//                 <li><a href="/shipping-policy">Shipping Policy </a></li>
//               </ul>
//             </div>

//             {/* FOLLOW ALONG */}
//             {/* FOLLOW ALONG */}
//             <div className="footer-section">
//               <h3>FOLLOW ALONG</h3>
//               <div className="footer-social-icons">

//                 {/* Instagram */}
//                 <a
//                   href="https://www.instagram.com/mpact.in?igsh=MTc5aGRmcmNtc3F0OQ=="
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <div className="social-circle">
//                     <Instagram size={22} strokeWidth={2} />
//                   </div>
//                 </a>

//                 {/* YouTube */}
//                 <a
//                   href="https://www.youtube.com/@mpact_fit"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <div className="social-circle">
//                     <Youtube size={22} strokeWidth={2} />
//                   </div>
//                 </a>

//                 <a
//                   href="https://www.linkedin.com/in/mpact-in-8b5b753b2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <div className="social-circle">
//                     <Linkedin size={22} strokeWidth={2} />
//                   </div>
//                 </a>

//                 <a
//                   href="https://x.com/mpact_in?s=11"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <div className="social-circle">
//                     <Twitter size={22} strokeWidth={2} />
//                   </div>
//                 </a>
//               </div>
//             </div>

//             {/* GET IN TOUCH */}
//             <div className="footer-section">
//               <h3>GET IN TOUCH</h3>
//               <div className="contact-item">
//                 <span className="icon">📱</span>
//                 <span>+91 8075711893</span>
//               </div>
//               <div className="contact-item">
//                 <span className="icon">✉️</span>
//                 <span>support@mpact.in</span>
//               </div>
//               <div className="contact-item">
//                 <span className="icon">🕐</span>
//                 <div>
//                   <div>10AM - 6PM IST</div>
//                   <div>(Monday to Saturday)</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="footer-bottom">
//           COPYRIGHT © MPACT 2025 – ALL RIGHTS RESERVED
//           <h2>Design and Developed by Scipy Technologies</h2>
//         </div>
//       </footer>
//     </>
//   );
// }


import { Link } from "react-router-dom";
import { Instagram, Youtube, Linkedin, Facebook } from "lucide-react";
import OfferScrollBar from "./OfferScrollBar"

// Custom X (Twitter) SVG icon
const XIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

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

    /* SOCIAL ICONS — 3 columns grid for 3+3 layout */
    .footer-social-icons {
      display: grid;
      grid-template-columns: repeat(3, 48px);
      gap: 12px;
      margin-top: 20px;
    }

    .social-circle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #3a3a3a;
      border: 2px solid #ffeb3b;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffeb3b;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .social-circle:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(255, 235, 59, 0.4);
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

      .footer-social-icons {
        grid-template-columns: repeat(3, 48px);
        gap: 10px;
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

      .footer-social-icons {
        grid-template-columns: repeat(3, 44px);
        gap: 10px;
      }

      .social-circle {
        width: 44px;
        height: 44px;
      }
    }
  `}</style>

        <div className="footer-wrapper">
          <div className="footer-grid">
            {/* SHOP ALL */}
            <div className="footer-section">
              <h3>SHOP ALL</h3>
              <ul>
                <li><a href="/product">Products</a></li>
              </ul>
            </div>

            {/* KNOW MORE */}
            <div className="footer-section">
              <h3>KNOW MORE</h3>
              <ul>
                <li><a href="/blog">Blogs</a></li>
                <li><a href="/tracking">Tracking Link</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/connect">Connect Now</a></li>
              </ul>
            </div>

            {/* SUPPORT & POLICY */}
            <div className="footer-section">
              <h3>SUPPORT & POLICY</h3>
              <ul>
                <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/return-policy">Return Policy</a></li>
                <li><a href="/help">Help and Support</a></li>
                <li><a href="/contact-us">Contact Us</a></li>
                <li><a href="/shipping-policy">Shipping Policy</a></li>
              </ul>
            </div>

            {/* FOLLOW ALONG */}
            <div className="footer-section">
              <h3>FOLLOW ALONG</h3>
              <div className="footer-social-icons">

                {/* Row 1: Instagram, YouTube, LinkedIn */}
                <a href="https://www.instagram.com/mpact.in?igsh=MTc5aGRmcmNtc3F0OQ==" target="_blank" rel="noopener noreferrer">
                  <div className="social-circle">
                    <Instagram size={22} strokeWidth={2} />
                  </div>
                </a>

                <a href="https://www.youtube.com/@mpact_fit" target="_blank" rel="noopener noreferrer">
                  <div className="social-circle">
                    <Youtube size={22} strokeWidth={2} />
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/mpact-in-8b5b753b2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
                  <div className="social-circle">
                    <Linkedin size={22} strokeWidth={2} />
                  </div>
                </a>

                {/* Row 2: X, Facebook, (empty slot or future icon) */}
                <a href="https://x.com/mpact_in?s=11" target="_blank" rel="noopener noreferrer">
                  <div className="social-circle">
                    <XIcon size={20} />
                  </div>
                </a>

                <a href="" target="_blank" rel="noopener noreferrer">
                  <div className="social-circle">
                    <Facebook size={20} strokeWidth={2} />
                  </div>
                </a>

              </div>
            </div>

            {/* GET IN TOUCH */}
            <div className="footer-section">
              <h3>GET IN TOUCH</h3>
              <div className="contact-item">
                <span className="icon">📱</span>
                <span>+91 8075711893</span>
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