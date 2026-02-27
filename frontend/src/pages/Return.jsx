
import React from "react";

export default function Return() {
  return (
    <div className="refund-page">
      <style>{`
        .refund-page {
          min-height: 100vh;
          background: #2f2f2f;
          color: white;
          padding: 120px 20px 60px;
          font-family: 'Inter', sans-serif;
        }

        .refund-container {
          max-width: 800px;
          margin: auto;
          background: #3a3a3a;
          padding: 40px;
          border-radius: 8px;
        }

        .refund-title {
          font-size: 42px;
          font-weight: 700;
          color: #ffeb3b;
          margin-bottom: 10px;
        }

        .refund-subtitle {
          font-size: 16px;
          color: #d0d0d0;
          margin-bottom: 30px;
          font-style: italic;
        }

        .refund-desc {
          font-size: 15px;
          color: #d0d0d0;
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .refund-section {
          margin-bottom: 30px;
        }

        .refund-section h3 {
          font-size: 18px;
          margin-bottom: 12px;
          color: #ffeb3b;
          border-left: 3px solid #ffeb3b;
          padding-left: 12px;
        }

        .refund-section p {
          font-size: 14px;
          color: #d0d0d0;
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .refund-section ul {
          font-size: 14px;
          color: #d0d0d0;
          line-height: 1.6;
          padding-left: 25px;
          margin: 10px 0;
          list-style-type: disc;
        }

        .refund-section li {
          margin-bottom: 8px;
        }

        .refund-section strong {
          color: #ffeb3b;
          font-weight: 600;
        }

        .refund-highlight {
          background: #4a4a4a;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
          border-left: 3px solid #ffeb3b;
        }

        .refund-highlight p {
          margin-bottom: 5px;
        }

        .refund-highlight ul {
          margin-top: 10px;
        }

        .refund-note {
          background: #4a4a4a;
          padding: 15px;
          border-radius: 6px;
          margin: 15px 0;
          font-size: 14px;
          color: #d0d0d0;
          border: 1px solid #ffeb3b33;
        }

        .contact-info {
          background: #4a4a4a;
          padding: 20px;
          border-radius: 6px;
          margin-top: 20px;
        }

        .contact-info p {
          margin: 8px 0;
          font-size: 15px;
        }

        .warning-text {
          color: #ff6b6b;
          font-weight: 600;
        }

        @media (max-width: 600px) {
          .refund-container {
            padding: 30px 20px;
          }

          .refund-title {
            font-size: 34px;
          }

          .refund-section h3 {
            font-size: 16px;
          }

          .refund-section p,
          .refund-section li {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="refund-container">
        <h1 className="refund-title">Refund & Replacement Policy</h1>
        <p className="refund-subtitle">Last Updated: February 2026</p>

        <p className="refund-desc">
          Purchases made from the MPACT online store are not eligible for return once the order has been successfully placed and delivered.
        </p>

        <div className="refund-highlight">
          <p><strong>However, in case you receive:</strong></p>
          <ul>
            <li>• A defective product</li>
            <li>• A product damaged during transit</li>
            <li>• An expired product</li>
          </ul>
          <p>MPACT will provide a free replacement of the same product, subject to verification.</p>
        </div>

        <div className="refund-section">
          <h3>REPLACEMENT REQUEST PROCESS</h3>
          <p>
            To request a replacement, customers must email clear photographs or video of the damaged or expired product along with the order details to <strong>support@mpact.in</strong> within 7 (seven) days of receiving the order.
          </p>
          <p>
            Our Quality Control team will review the claim and, if approved, a replacement product will be dispatched at no additional cost.
          </p>
          <p>
            If your order is confirmed but not delivered, you may contact us with proof of purchase at <strong>support@mpact.in</strong>, and we will arrange for redelivery.
          </p>
        </div>

        <div className="refund-section">
          <h3>IMPORTANT TIME LIMITS</h3>
          <p>
            <strong>Requests for replacement or complaint must be raised within 7 days from the date of delivery.</strong> Requests made after this period will not be considered.
          </p>
          <p>
            MPACT does not accept third-party claims for replacement or refund.
          </p>
        </div>

        <div className="refund-section">
          <h3>PRODUCTS WILL NOT BE REPLACED OR REFUNDED IF:</h3>
          <ul>
            <li>• The customer does not like the taste or product after delivery</li>
            <li>• The product does not meet personal expectations</li>
            <li>• The product has been opened, used, or tampered with</li>
            <li>• The issue is reported after 7 days of delivery</li>
          </ul>
        </div>

        <div className="refund-section">
          <h3>CANCELLATION & REFUNDS</h3>
          <p>
            <strong>Once an order is placed and processed, it cannot be cancelled.</strong>
          </p>
          <p>
            Refunds will only be initiated in the following situations:
          </p>
          <ul>
            <li>• If the shipping location is not serviceable by our delivery partners</li>
            <li>• If there is an unreasonable delay in delivery</li>
            <li>• If the product is lost in transit and cannot be delivered</li>
          </ul>
          <p>
            <strong>Damaged or expired products will be handled strictly under the Replacement Policy and not refunded.</strong>
          </p>
        </div>

        <div className="refund-section">
          <h3>REFUND PROCESSING TIME</h3>
          <p>
            Once a refund is approved in writing by MPACT, it will be processed within 7 working days to the original mode of payment. Depending on your bank or payment provider, the refund may take an additional 5–7 working days to reflect in your account.
          </p>
        </div>

        <div className="refund-section">
          <h3 className="warning-text">NO REFUNDS WILL BE ISSUED IN THE FOLLOWING CASES:</h3>
          <ul>
            <li>• Incorrect or incomplete delivery address provided by the customer</li>
            <li>• Customer unavailable at the time of delivery</li>
            <li>• Refusal to accept delivery</li>
            <li>• Delivery made as per customer instructions</li>
            <li>• Events beyond our reasonable control (natural calamities, strikes, etc.)</li>
            <li>• Product tampered with or misused by the customer</li>
          </ul>
        </div>

        <div className="refund-note">
          <p><strong>Note:</strong> All replacement and refund decisions are at the sole discretion of MPACT and are subject to verification by our Quality Control team.</p>
        </div>

        <div className="refund-section">
          <h3>CONTACT US</h3>
          <div className="contact-info">
            <p>For any questions or concerns regarding this policy, please contact:</p>
            <p><strong>MPACT Customer Support</strong></p>
            <p><strong>Email:</strong> support@mpact.in</p>
            <p><strong>Working Hours:</strong> 10:00 AM – 6:00 PM IST (Monday to Saturday)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
