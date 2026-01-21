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
          max-width: 700px;
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
          These Terms and Conditions govern your use of our website and services.
          By accessing or using our platform, you agree to comply with these
          terms.
        </p>

        <div className="terms-section">
          <h3>Use of Website</h3>
          <p>
            You agree to use this website only for lawful purposes and in a way
            that does not violate any applicable laws or regulations.
          </p>
        </div>

        <div className="terms-section">
          <h3>User Accounts</h3>
          <p>
            To place an order, users must create an account and provide accurate
            and complete information. You are responsible for maintaining the
            confidentiality of your login credentials.
          </p>
        </div>

        <div className="terms-section">
          <h3>Orders and Payments</h3>
          <p>
            All orders placed through this website are subject to availability
            and acceptance. Payments are processed securely through authorized
            third-party payment gateways.
          </p>
        </div>

        <div className="terms-section">
          <h3>Shipping and Delivery</h3>
          <p>
            Delivery timelines may vary depending on location and product
            availability. We are not responsible for delays caused by external
            factors.
          </p>
        </div>

        <div className="terms-section">
          <h3>Returns and Refunds</h3>
          <p>
            Refunds and returns are processed in accordance with our Refund and
            Cancellation Policy.
          </p>
        </div>

        <div className="terms-section">
          <h3>Limitation of Liability</h3>
          <p>
            We are not liable for any indirect, incidental, or consequential
            damages arising from the use of our website or services.
          </p>
        </div>

        <div className="terms-section">
          <h3>Contact Information</h3>
          <p>
            If you have any questions regarding these Terms and Conditions,
            please contact us at support@example.com.
          </p>
        </div>
      </div>
    </div>
  );
}

