import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function DistributorEnquiry() {
  const [form, setForm] = useState({
    businessName: "",
    fullName: "",
    phone: "",
    businessType: "",
    city: "",
    email: "",
    remarks: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/distributor-enquiry", form); // cookies auto included
    toast.success("Enquiry submitted successfully");

    setForm({
      businessName: "",
      fullName: "",
      phone: "",
      businessType: "",
      city: "",
      email: "",
      remarks: "",
    });
  };

  return (
    <>
      {/* ================== INLINE CSS ================== */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
          background: #f4f6fb;
        }

        .enquiry-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .enquiry-card {
          width: 100%;
          max-width: 720px;
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
        }

        .enquiry-title {
          text-align: center;
          font-size: 26px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .enquiry-subtitle {
          text-align: center;
          color: #6b7280;
          margin-bottom: 30px;
          font-size: 14px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 13px;
          margin-bottom: 6px;
          color: #374151;
          font-weight: 500;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 14px;
          outline: none;
          transition: border 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #2563eb;
        }

        textarea {
          resize: none;
          min-height: 90px;
        }

        .full-width {
          grid-column: span 2;
        }

        .submit-btn {
          margin-top: 20px;
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .full-width {
            grid-column: span 1;
          }

          .enquiry-card {
            padding: 24px;
          }
        }
      `}</style>

      {/* ================== UI ================== */}
      <div className="enquiry-wrapper">
        <div className="enquiry-card">
          <h2 className="enquiry-title">Distributor / Bulk Enquiry</h2>
          <p className="enquiry-subtitle">
            Fill the form below and our team will contact you shortly
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Business Name</label>
                <input
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Your Full Name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Business Type</label>
                <select
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select business type</option>
                  <option>Retailer</option>
                  <option>Wholesaler</option>
                  <option>Distributor</option>
                  <option>Manufacturer</option>
                  <option>Shop Owner</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Remarks</label>
                <textarea
                  name="remarks"
                  value={form.remarks}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="submit-btn" type="submit">
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
