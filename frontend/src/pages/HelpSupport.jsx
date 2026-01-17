import React from "react";

export default function HelpSupport() {
  return (
    <div className="help-page">
      <style>{`
        .help-page {
          min-height: 100vh;
          background: #2f2f2f;
          color: white;
          padding: 120px 20px 60px;
          font-family: 'Inter', sans-serif;
        }

        .help-container {
          max-width: 700px;
          margin: auto;
          background: #3a3a3a;
          padding: 40px;
          border-radius: 8px;
        }

        .help-title {
          font-size: 42px;
          font-weight: 700;
          color: #ffeb3b;
          margin-bottom: 10px;
        }

        .help-desc {
          font-size: 15px;
          color: #d0d0d0;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .help-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .help-form input,
        .help-form textarea {
          background: transparent;
          border: none;
          border-bottom: 1px solid #777;
          padding: 12px 0;
          color: white;
          outline: none;
          font-size: 14px;
        }

        .help-form textarea {
          resize: none;
          height: 120px;
        }

        .help-form input:focus,
        .help-form textarea:focus {
          border-bottom-color: #ffeb3b;
        }

        .help-form button {
          margin-top: 10px;
          align-self: flex-start;
          background: #ffeb3b;
          color: black;
          border: none;
          padding: 12px 30px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }

        .help-form button:hover {
          opacity: 0.9;
        }

        @media (max-width: 600px) {
          .help-container {
            padding: 30px 20px;
          }

          .help-title {
            font-size: 34px;
          }
        }
      `}</style>

      <div className="help-container">
        <h1 className="help-title">Help & Support</h1>
        <p className="help-desc">
          Need help with your orders, products, payments, or anything else?
          Fill out the form below and our support team will get back to you as
          soon as possible.
        </p>

        <form className="help-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Describe your issue..." required></textarea>
          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
}
