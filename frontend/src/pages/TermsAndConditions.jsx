// import React from "react";

// export default function TermsAndConditions() {
//   return (
//     <div className="terms-page">
//       <style>{`
//         .terms-page {
//           min-height: 100vh;
//           background: #2f2f2f;
//           color: white;
//           padding: 120px 20px 60px;
//           font-family: 'Inter', sans-serif;
//         }

//         .terms-container {
//           max-width: 700px;
//           margin: auto;
//           background: #3a3a3a;
//           padding: 40px;
//           border-radius: 8px;
//         }

//         .terms-title {
//           font-size: 42px;
//           font-weight: 700;
//           color: #ffeb3b;
//           margin-bottom: 10px;
//         }

//         .terms-desc {
//           font-size: 15px;
//           color: #d0d0d0;
//           margin-bottom: 25px;
//           line-height: 1.6;
//         }

//         .terms-section {
//           margin-bottom: 25px;
//         }

//         .terms-section h3 {
//           font-size: 18px;
//           margin-bottom: 8px;
//           color: #ffeb3b;
//         }

//         .terms-section p {
//           font-size: 14px;
//           color: #d0d0d0;
//           line-height: 1.6;
//         }

//         @media (max-width: 600px) {
//           .terms-container {
//             padding: 30px 20px;
//           }

//           .terms-title {
//             font-size: 34px;
//           }
//         }
//       `}</style>

//       <div className="terms-container">
//         <h1 className="terms-title">Terms and Conditions</h1>

//         <p className="terms-desc">
//           These Terms and Conditions govern your use of our website and services.
//           By accessing or using our platform, you agree to comply with these
//           terms.
//         </p>

//         <div className="terms-section">
//           <h3>Use of Website</h3>
//           <p>
//             You agree to use this website only for lawful purposes and in a way
//             that does not violate any applicable laws or regulations.
//           </p>
//         </div>

//         <div className="terms-section">
//           <h3>User Accounts</h3>
//           <p>
//             To place an order, users must create an account and provide accurate
//             and complete information. You are responsible for maintaining the
//             confidentiality of your login credentials.
//           </p>
//         </div>

//         <div className="terms-section">
//           <h3>Orders and Payments</h3>
//           <p>
//             All orders placed through this website are subject to availability
//             and acceptance. Payments are processed securely through authorized
//             third-party payment gateways.
//           </p>
//         </div>

//         <div className="terms-section">
//           <h3>Shipping and Delivery</h3>
//           <p>
//             Delivery timelines may vary depending on location and product
//             availability. We are not responsible for delays caused by external
//             factors.
//           </p>
//         </div>

//         <div className="terms-section">
//           <h3>Returns and Refunds</h3>
//           <p>
//             Refunds and returns are processed in accordance with our Refund and
//             Cancellation Policy.
//           </p>
//         </div>

//         <div className="terms-section">
//           <h3>Limitation of Liability</h3>
//           <p>
//             We are not liable for any indirect, incidental, or consequential
//             damages arising from the use of our website or services.
//           </p>
//         </div>

//         <div className="terms-section">
//           <h3>Contact Information</h3>
//           <p>
//             If you have any questions regarding these Terms and Conditions,
//             please contact us at support@example.com.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="terms-page">
      <style>{`
        .terms-page {
          min-height: 100vh;
          background: #2f2f2f;
          color: white;
          padding: 120px 20px 60px;
          font-family: 'Inter', sans-serif;
        }

        .terms-container {
          max-width: 800px;
          margin: auto;
          background: #3a3a3a;
          padding: 40px;
          border-radius: 8px;
        }

        .terms-title {
          font-size: 42px;
          font-weight: 700;
          color: #ffeb3b;
          margin-bottom: 10px;
        }

        .terms-desc {
          font-size: 15px;
          color: #d0d0d0;
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .terms-section {
          margin-bottom: 25px;
        }

        .terms-section h3 {
          font-size: 18px;
          margin-bottom: 8px;
          color: #ffeb3b;
        }

        .terms-section p {
          font-size: 14px;
          color: #d0d0d0;
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .terms-section ul {
          font-size: 14px;
          color: #d0d0d0;
          line-height: 1.6;
          padding-left: 20px;
          margin: 8px 0;
        }

        .terms-section li {
          margin-bottom: 4px;
        }

        .terms-highlight {
          background: #4a4a4a;
          padding: 15px;
          border-radius: 6px;
          margin: 15px 0;
          border-left: 3px solid #ffeb3b;
        }

        .contact-info {
          background: #4a4a4a;
          padding: 20px;
          border-radius: 6px;
          margin-top: 20px;
        }

        .contact-info p {
          margin: 5px 0;
        }

        @media (max-width: 600px) {
          .terms-container {
            padding: 30px 20px;
          }

          .terms-title {
            font-size: 34px;
          }
        }
      `}</style>

      <div className="terms-container">
        <h1 className="terms-title">Terms and Conditions</h1>

        <p className="terms-desc">
          This website is operated by MPACT. Throughout the site, the terms "we", "us" and "our" refer to MPACT. MPACT offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
        </p>

        <p className="terms-desc">
          By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
        </p>

        <p className="terms-desc">
          Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
        </p>

        <p className="terms-desc">
          Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
        </p>

        <p className="terms-desc">
          Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.
        </p>

        <div className="terms-section">
          <h3>SECTION 1 - ONLINE STORE TERMS</h3>
          <p>
            By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
            You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
            You must not transmit any worms or viruses or any code of a destructive nature.
            A breach or violation of any of the Terms will result in an immediate termination of your Services.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 2 - GENERAL CONDITIONS</h3>
          <p>
            We reserve the right to refuse service to anyone for any reason at any time.
            You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
            You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
            The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h3>
          <p>
            We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon as the sole basis for making decisions.
            This site may contain certain historical information. Historical information is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information. You agree that it is your responsibility to monitor changes to our site.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES</h3>
          <p>
            Prices for our products are subject to change without notice.
            We reserve the right at any time to modify or discontinue the Service (or any part thereof) without notice.
            We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 5 - PRODUCTS OR SERVICES</h3>
          <p>
            Certain products or services may be available exclusively online through the website. These may have limited quantities and are subject to return or exchange only according to our Return Policy.
            We have made every effort to display product images accurately; however, we cannot guarantee your screen's display of any color will be accurate.
            We reserve the right to limit sales by person, region or jurisdiction and to discontinue any product at any time.
            We do not warrant that the quality of any products or services will meet your expectations or that errors in the Service will be corrected.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION</h3>
          <p>
            We reserve the right to refuse any order you place with us. We may limit or cancel quantities purchased per person or per order.
            If we make changes or cancel an order, we may notify you using the email or phone number provided at the time of purchase.
            You agree to provide current, complete and accurate purchase and account information and promptly update your details.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 7 - OPTIONAL TOOLS</h3>
          <p>
            We may provide access to third-party tools "as is" without warranties.
            We shall have no liability arising from your use of optional third-party tools.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 8 - THIRD-PARTY LINKS</h3>
          <p>
            Certain content, products and services may include materials from third parties.
            We are not responsible for third-party websites or their content.
            Any complaints or concerns regarding third-party products should be directed to the third-party.
          </p>
          <div className="terms-highlight">
            <p><strong>By submitting our webform, you agree to receive promotional calls or messages on the number shared, and such calls or SMS may be from a third-party platform.</strong></p>
          </div>
        </div>

        <div className="terms-section">
          <h3>SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS</h3>
          <p>
            You agree that we may use and publish any comments you submit to us.
            Your comments must not violate any third-party rights or contain unlawful or obscene material.
            You are solely responsible for the accuracy of your comments.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 10 - PERSONAL INFORMATION</h3>
          <p>
            Your submission of personal information through the store is governed by our Privacy Policy.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS</h3>
          <p>
            We reserve the right to correct errors and to update or cancel orders if information is inaccurate at any time without notice.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 12 - PROHIBITED USES</h3>
          <p>
            You are prohibited from using the site for unlawful purposes, violating laws, infringing intellectual property, harassing others, submitting false information, transmitting viruses, or interfering with site security.
            We reserve the right to terminate your use for violating these rules.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</h3>
          <p>
            We do not guarantee uninterrupted or error-free service.
            All products and services are provided "as is" and "as available".
            In no case shall MPACT be liable for any direct or indirect damages arising from your use of the Service or products.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 14 - INDEMNIFICATION</h3>
          <p>
            You agree to indemnify and hold harmless MPACT and its employees and partners from any claim arising from your breach of these Terms.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 15 - SEVERABILITY</h3>
          <p>
            If any provision is found unlawful, the remaining provisions remain valid.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 16 - TERMINATION</h3>
          <p>
            These Terms are effective unless terminated by either you or us.
            We may terminate access if you fail to comply with these Terms.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 17 - ENTIRE AGREEMENT</h3>
          <p>
            These Terms constitute the entire agreement between you and MPACT and govern your use of the Service.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 18 - GOVERNING LAW</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 19 - CHANGES TO TERMS OF SERVICE</h3>
          <p>
            We reserve the right to update or replace any part of these Terms. Continued use of the website constitutes acceptance of changes.
          </p>
        </div>

        <div className="terms-section">
          <h3>SECTION 20 - CONTACT INFORMATION</h3>
          <div className="contact-info">
            <p><strong>Trade Name:</strong> MPACT</p>
            <p><strong>Phone Number:</strong> +91 8075711893</p>
            <p><strong>Email:</strong> support@mpact.in</p>
            <p><strong>Business Address:</strong> Floor 1, Building No. TC9/3891/4, Kariyavattom–Chenkottukonam Road, Opposite Trivandrum Scottish School, Kariyavattom, Thiruvananthapuram – 695581, Kerala, India</p>
            <p><strong>Working Hours:</strong> 10:00 AM – 6:00 PM IST (Monday to Saturday)</p>
          </div>
        </div>
      </div>
    </div>
  );
}