import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <style>{`
        .privacy-page {
          min-height: 100vh;
          background: #2f2f2f;
          color: white;
          padding: 120px 20px 60px;
          font-family: 'Inter', sans-serif;
        }

        .privacy-container {
          max-width: 700px;
          margin: auto;
          background: #3a3a3a;
          padding: 40px;
          border-radius: 8px;
        }

        .privacy-title {
          font-size: 42px;
          font-weight: 700;
          color: #ffeb3b;
          margin-bottom: 10px;
        }

        .privacy-desc {
          font-size: 15px;
          color: #d0d0d0;
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .privacy-section {
          margin-bottom: 25px;
        }

        .privacy-section h3 {
          font-size: 18px;
          margin-bottom: 8px;
          color: #ffeb3b;
        }

        .privacy-section p {
          font-size: 14px;
          color: #d0d0d0;
          line-height: 1.6;
        }

        @media (max-width: 600px) {
          .privacy-container {
            padding: 30px 20px;
          }

          .privacy-title {
            font-size: 34px;
          }
        }
      `}</style>

      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>

        <p className="privacy-desc">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information.
        </p>

        <div className="privacy-section">
          <h3>Information We Collect</h3>
          <p>
            We collect information such as your name, email address, phone
            number, shipping address, and payment details when you register or
            place an order on our website.
          </p>
        </div>

        <div className="privacy-section">
          <h3>How We Use Your Information</h3>
          <p>
            Your information is used to process orders, manage your account,
            provide customer support, and improve our services.
          </p>
        </div>

        <div className="privacy-section">
          <h3>Payment Security</h3>
          <p>
            Payments are processed securely through trusted third-party payment
            gateways. We do not store your card or UPI details.
          </p>
        </div>

        <div className="privacy-section">
          <h3>Data Protection</h3>
          <p>
            We implement appropriate security measures to protect your personal
            data from unauthorized access or misuse.
          </p>
        </div>

        <div className="privacy-section">
          <h3>Contact Us</h3>
          <p>
            If you have any questions regarding this Privacy Policy, please
            contact us at support@example.com.
          </p>
        </div>
      </div>
    </div>
  );
}
