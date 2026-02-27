import React from "react";

export default function Shipping() {
  return (
    <div className="shipping-page">
      <style>{`
        .shipping-page {
          min-height: 100vh;
          background: #2f2f2f;
          color: white;
          padding: 120px 20px 60px;
          font-family: 'Inter', sans-serif;
        }

        .shipping-container {
          max-width: 800px;
          margin: auto;
          background: #3a3a3a;
          padding: 40px;
          border-radius: 8px;
        }

        .shipping-title {
          font-size: 42px;
          font-weight: 700;
          color: #ffeb3b;
          margin-bottom: 10px;
        }

        .shipping-subtitle {
          font-size: 16px;
          color: #d0d0d0;
          margin-bottom: 30px;
          font-style: italic;
          border-bottom: 1px solid #4a4a4a;
          padding-bottom: 20px;
        }

        .shipping-desc {
          font-size: 15px;
          color: #d0d0d0;
          margin-bottom: 30px;
          line-height: 1.8;
          background: #4a4a4a;
          padding: 20px;
          border-radius: 8px;
          border-left: 3px solid #ffeb3b;
        }

        .shipping-section {
          margin-bottom: 35px;
        }

        .shipping-section h3 {
          font-size: 20px;
          margin-bottom: 15px;
          color: #ffeb3b;
          border-left: 4px solid #ffeb3b;
          padding-left: 15px;
        }

        .shipping-section p {
          font-size: 14px;
          color: #d0d0d0;
          line-height: 1.7;
          margin-bottom: 15px;
        }

        .shipping-section ul {
          font-size: 14px;
          color: #d0d0d0;
          line-height: 1.7;
          padding-left: 25px;
          margin: 15px 0;
          list-style-type: disc;
        }

        .shipping-section li {
          margin-bottom: 10px;
        }

        .shipping-section strong {
          color: #ffeb3b;
          font-weight: 600;
        }

        .policy-card {
          background: #4a4a4a;
          padding: 25px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 3px solid #ffeb3b;
        }

        .policy-card p {
          margin-bottom: 10px;
        }

        .policy-card p:last-child {
          margin-bottom: 0;
        }

        .highlight-box {
          background: #4a4a4a;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
          border: 1px solid #ffeb3b40;
        }

        .badge {
          background: #ffeb3b20;
          color: #ffeb3b;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 15px;
          border: 1px solid #ffeb3b40;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }

        .info-card {
          background: #4a4a4a;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #5a5a5a;
        }

        .info-card h4 {
          color: #ffeb3b;
          font-size: 16px;
          margin-bottom: 10px;
        }

        .contact-info {
          background: #4a4a4a;
          padding: 25px;
          border-radius: 8px;
          margin-top: 20px;
          border-left: 4px solid #ffeb3b;
        }

        .contact-info p {
          margin: 10px 0;
          font-size: 15px;
        }

        .working-hours {
          background: #4a4a4a;
          padding: 15px 20px;
          border-radius: 6px;
          display: inline-block;
          margin-top: 10px;
          border: 1px solid #ffeb3b20;
        }

        .working-hours p {
          margin: 0;
          font-size: 14px;
        }

        @media (max-width: 600px) {
          .shipping-container {
            padding: 30px 20px;
          }

          .shipping-title {
            font-size: 34px;
          }

          .shipping-section h3 {
            font-size: 18px;
          }

          .shipping-section p,
          .shipping-section li {
            font-size: 13px;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="shipping-container">
        <h1 className="shipping-title">Shipping Policy</h1>
        <p className="shipping-subtitle">
          Learn about our shipping process, charges, and delivery timelines
        </p>

        <div className="shipping-desc">
          At MPACT, we strive to deliver your orders using reliable and efficient logistics partners across India. Our products are carefully packed in hygienic, tamper-proof packaging to ensure freshness and safety during transit.
        </div>

        {/* Pan-India Delivery Section */}
        <div className="shipping-section">
          <h3>PAN-INDIA DELIVERY</h3>
          <div className="policy-card">
            <p>
              MPACT delivers products across most locations in India.
              Once your order is shipped, you will receive tracking details via email or SMS to monitor your delivery status in real time.
            </p>
          </div>
          
          <p><strong>Delivery timelines may be affected due to factors beyond our control such as:</strong></p>
          <ul>
            <li>• Courier partner delays</li>
            <li>• Weather conditions</li>
            <li>• Traffic or regional restrictions</li>
            <li>• Stock availability</li>
          </ul>
          
          <div className="highlight-box">
            <p>
              <strong>In case of any delay, we will keep you informed to the best of our ability.</strong>
            </p>
          </div>
        </div>

        {/* Shipping Charges Section */}
        <div className="shipping-section">
          <h3>SHIPPING CHARGES</h3>
          <div className="info-grid">
            <div className="info-card">
              <h4>Taxes Included</h4>
              <p>All product prices displayed on the website are inclusive of applicable taxes (GST).</p>
            </div>
            <div className="info-card">
              <h4>Shipping Fees</h4>
              <p>Shipping charges, if any, will be clearly mentioned at checkout before you complete the payment.</p>
            </div>
            <div className="info-card">
              <h4>Minimum Order</h4>
              <p>For orders below a certain order value, a nominal shipping fee may be applicable and will be shown during checkout.</p>
            </div>
          </div>
        </div>

        {/* Cash on Delivery Section */}
        <div className="shipping-section">
          <h3>CASH ON DELIVERY (COD) POLICY</h3>
          <div className="policy-card">
            <p>
              MPACT offers Cash on Delivery (COD) as a payment option in select locations across India.
            </p>
          </div>
          
          <ul>
            <li><strong>Maximum order value for COD:</strong> ₹4000</li>
            <li><strong>Please keep the exact cash amount ready at the time of delivery</strong> - Our delivery partners may not carry change</li>
          </ul>
          
          <p>
            A COD or shipping fee may be applicable for low-value orders and will be clearly displayed before checkout.
          </p>
        </div>

        {/* Packaging & Handling Section */}
        <div className="shipping-section">
          <h3>PACKAGING & HANDLING</h3>
          <div className="policy-card">
            <p>
              We use food-grade, tamper-proof packaging and sturdy outer boxes to ensure your products reach you in good condition.
            </p>
            <p>
              Any packaging and handling charges are already included in the product price unless otherwise stated.
            </p>
          </div>
        </div>

        {/* Undelivered Orders Section */}
        <div className="shipping-section">
          <h3>UNDELIVERED ORDERS</h3>
          <p>
            If an order cannot be delivered due to:
          </p>
          <ul>
            <li>• Incorrect or incomplete address</li>
            <li>• Customer unavailability</li>
            <li>• Refusal to accept delivery</li>
          </ul>
          <div className="highlight-box">
            <p>
              The order may be returned to us and re-delivery or refund will be handled as per our <strong>Refund & Replacement Policy</strong>.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="shipping-section">
          <h3>CONTACT US</h3>
          <div className="contact-info">
            <p>For any shipping-related queries, please contact:</p>
            <p><strong>MPACT Customer Support</strong></p>
            <p><strong>Email:</strong> support@mpact.in</p>
            
            <div className="working-hours">
              <p><strong>Working Hours:</strong> 10:00 AM – 6:00 PM IST (Monday to Saturday)</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{ marginTop: '30px', textAlign: 'center', color: '#a0a0a0', fontSize: '13px' }}>
          <p>We're committed to delivering your order safely and on time.</p>
        </div>
      </div>
    </div>
  );
}