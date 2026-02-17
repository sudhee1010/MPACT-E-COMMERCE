import React from "react";
import { motion } from "framer-motion";

export default function Return() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Khand:wght@500;600;700;800&display=swap');

        .mpact-policy-wrapper {
          background: linear-gradient(to bottom, #000000, #111111);
          min-height: 100vh;
          padding: 80px 20px;
          display: flex;
          justify-content: center;
        }

        .mpact-policy-container {
          max-width: 900px;
          width: 100%;
          font-family: 'Khand', sans-serif;
          color: #ffffff;
        }

        .mpact-policy-title {
          font-size: 42px;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }

        .mpact-policy-date {
          font-size: 16px;
          margin-bottom: 40px;
          color: #aaaaaa;
        }

        .mpact-policy-section {
          margin-bottom: 40px;
        }

        .mpact-policy-section h3 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 15px;
          border-left: 4px solid #ff3c00;
          padding-left: 10px;
        }

        .mpact-policy-section p {
          font-size: 18px;
          line-height: 1.7;
          margin-bottom: 10px;
        }

        .mpact-policy-section ul,
        .mpact-policy-section ol {
          margin-left: 20px;
          font-size: 18px;
          line-height: 1.7;
        }

        .mpact-policy-section li {
          margin-bottom: 8px;
        }

        .mpact-policy-section strong {
          color: #ff3c00;
        }

        @media (max-width: 768px) {
          .mpact-policy-title {
            font-size: 32px;
          }

          .mpact-policy-section h3 {
            font-size: 20px;
          }

          .mpact-policy-section p,
          .mpact-policy-section li {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="mpact-policy-wrapper">
        <motion.div
          className="mpact-policy-container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mpact-policy-title">Return & Refund Policy</h1>
          <p className="mpact-policy-date">
            Last Updated: February 2026
          </p>

          <section className="mpact-policy-section">
            <h3>1. Eligibility for Returns</h3>
            <p>
              You may request a return if the item is damaged, defective,
              or significantly different from the product description.
            </p>
            <ul>
              <li>Item must be unused and in original condition.</li>
              <li>Original packaging must be intact.</li>
              <li>Return request must be made within 7 days of delivery.</li>
            </ul>
          </section>

          <section className="mpact-policy-section">
            <h3>2. Non-Returnable Items</h3>
            <ul>
              <li>Used or damaged items (not due to delivery issues).</li>
              <li>Items without original packaging.</li>
              <li>Clearance or sale products marked as non-returnable.</li>
            </ul>
          </section>

          <section className="mpact-policy-section">
            <h3>3. How to Request a Return</h3>
            <ol>
              <li>Login to your MPact account.</li>
              <li>Go to "My Orders".</li>
              <li>Select the product you want to return.</li>
              <li>Click on "Request Return".</li>
              <li>Provide a reason and upload images (if applicable).</li>
            </ol>
            <p>
              Our support team will review your request within 48 hours.
            </p>
          </section>

          <section className="mpact-policy-section">
            <h3>4. Refund Process</h3>
            <p>
              Once approved and inspected, refunds will be processed within
              5–7 business days to the original payment method.
            </p>
            <p>
              For <strong>Cash on Delivery (COD)</strong> orders, refunds
              will be transferred to your registered bank account.
            </p>
          </section>

          <section className="mpact-policy-section">
            <h3>5. Exchange Policy</h3>
            <p>
              MPact currently does not support direct exchanges.
              You may return the product and place a new order separately.
            </p>
          </section>

          <section className="mpact-policy-section">
            <h3>6. Late or Missing Refunds</h3>
            <ul>
              <li>Check your bank account again.</li>
              <li>Contact your bank (processing time may vary).</li>
              <li>
                If still not received, contact us at:
                <strong> support@mpact.com</strong>
              </li>
            </ul>
          </section>

          <section className="mpact-policy-section">
            <h3>7. Contact Us</h3>
            <p>
              If you have any questions regarding our Return & Refund Policy,
              please contact our support team.
            </p>
            <p>
              <strong>Email:</strong> support@mpact.com <br />
              <strong>Location:</strong> India
            </p>
          </section>
        </motion.div>
      </div>
    </>
  );
}
