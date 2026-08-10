import React from "react";

export default function Contact() {
  return (
    <div className="contact-page">
      <style>{`
        .contact-page {
          min-height: 100vh;
          background: #1b1b1b;
          color: white;
          padding: 120px 20px 60px;
          font-family: 'Inter', sans-serif;
        }

        .contact-container {
          max-width: 800px;
          margin: auto;
          background: #3a3a3a;
          padding: 40px;
          border-radius: 8px;
        }

        .contact-title {
          font-size: 42px;
          font-weight: 700;
          color: #ffeb3b;
          margin-bottom: 10px;
        }

        .contact-subtitle {
          font-size: 16px;
          color: #d0d0d0;
          margin-bottom: 40px;
          font-style: italic;
          border-bottom: 1px solid #4a4a4a;
          padding-bottom: 20px;
        }

        .contact-section {
          margin-bottom: 40px;
        }

        .contact-section h3 {
          font-size: 20px;
          margin-bottom: 20px;
          color: #ffeb3b;
          border-left: 4px solid #ffeb3b;
          padding-left: 15px;
        }

        .contact-info-card {
          background: #4a4a4a;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .contact-info-item {
          display: flex;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .contact-info-item:last-child {
          margin-bottom: 0;
        }

        .contact-label {
          min-width: 100px;
          font-weight: 600;
          color: #ffeb3b;
        }

        .contact-value {
          color: #d0d0d0;
          flex: 1;
        }

        .contact-value p {
          margin: 0 0 5px 0;
        }

        .grievance-card {
          background: #4a4a4a;
          padding: 25px;
          border-radius: 8px;
          border-left: 4px solid #ffeb3b;
        }

        .grievance-title {
          color: #ffeb3b;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .grievance-subtitle {
          color: #d0d0d0;
          font-size: 14px;
          margin-bottom: 20px;
          font-style: italic;
        }

        .address-block {
          background: #4a4a4a;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .address-line {
          color: #d0d0d0;
          line-height: 1.8;
          margin-bottom: 5px;
          font-size: 15px;
        }

        .working-hours {
          background: #4a4a4a;
          padding: 15px 25px;
          border-radius: 8px;
          display: inline-block;
          margin-top: 15px;
        }

        .working-hours p {
          color: #d0d0d0;
          margin: 0;
          font-size: 14px;
        }

        .working-hours strong {
          color: #ffeb3b;
        }

        .divider {
          height: 1px;
          background: #5a5a5a;
          margin: 30px 0;
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

        @media (max-width: 600px) {
          .contact-container {
            padding: 30px 20px;
          }

          .contact-title {
            font-size: 34px;
          }

          .contact-info-item {
            flex-direction: column;
          }

          .contact-label {
            margin-bottom: 5px;
          }

          .contact-section h3 {
            font-size: 18px;
          }
        }
      `}</style>

      <div className="contact-container">
        <h1 className="contact-title">Contact Information</h1>
        <p className="contact-subtitle">
          Get in touch with us. We're here to help!
        </p>

        {/* Business Information Section */}
        <div className="contact-section">
          <h3>BUSINESS DETAILS</h3>
          
          <div className="contact-info-card">
            <div className="contact-info-item">
              <span className="contact-label">Trade Name:</span>
              <span className="contact-value">MPACT</span>
            </div>
            
            <div className="contact-info-item">
              <span className="contact-label">Phone:</span>
              <span className="contact-value">+91 8891413187</span>
            </div>
            
            <div className="contact-info-item">
              <span className="contact-label">Email:</span>
              <span className="contact-value">support@mpact.in</span>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="contact-section">
          <h3>OFFICE ADDRESS</h3>
          
          <div className="address-block">
            <div className="address-line">Floor 1, Building No. TC9/3891/4,</div>
            <div className="address-line">Kariyavattom–Chenkottukonam Road,</div>
            <div className="address-line">Opposite Trivandrum Scottish School, Kariyavattom,</div>
            <div className="address-line">Thiruvananthapuram – 695581,</div>
            <div className="address-line">Kerala, India</div>
          </div>

          <div className="working-hours">
            <p><strong>Working Hours:</strong> 10:00 AM – 6:00 PM IST (Monday to Saturday)</p>
          </div>
        </div>

        <div className="divider"></div>

        {/* Grievance Redressal Officer Section */}
        <div className="contact-section">
          <div className="badge">CONSUMER PROTECTION ACT COMPLIANCE</div>
          <h3>GRIEVANCE REDRESSAL OFFICER</h3>
          
          <div className="grievance-card">
            <div className="grievance-subtitle">
              Under Consumer Protection Act and applicable rules
            </div>
            
            <div className="contact-info-item">
              <span className="contact-label">Name:</span>
              <span className="contact-value">Ms. Pameela</span>
            </div>
            
            <div className="contact-info-item">
              <span className="contact-label">Email:</span>
              <span className="contact-value">pameela.mpact@gmail.com</span>
            </div>
            
            <div className="contact-info-item">
              <span className="contact-label">Phone:</span>
              <span className="contact-value">+91 8891413187</span>
            </div>
            
            <div className="working-hours" style={{ marginTop: '20px' }}>
              <p><strong>Working Hours:</strong> 10:00 AM – 6:00 PM IST (Monday to Saturday)</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="divider"></div>
        
        <div style={{ textAlign: 'center', color: '#a0a0a0', fontSize: '13px', marginTop: '20px' }}>
          <p>For any queries, complaints, or assistance, please don't hesitate to reach out to us.</p>
          <p>We aim to respond to all inquiries within 24-48 business hours.</p>
        </div>
      </div>
    </div>
  );
}