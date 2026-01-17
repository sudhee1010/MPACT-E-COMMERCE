import React, { useState } from "react";
import { Home, Briefcase, User, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [addressType, setAddressType] = useState("home");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter a valid email address";
    if (!form.address1.trim())
      newErrors.address1 = "Address Line 1 is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!/^\d{6}$/.test(form.pincode))
      newErrors.pincode = "Enter a valid 6-digit pincode";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      navigate("/pay");
    }
  };

  return (
    <div className="page">
      {/* STEP INDICATOR */}
      <div className="checkout-steps">
        <div className="step completed">
          <div className="circle green">✓</div>
          <span>Cart</span>
        </div>
        <div className="line yellow" />
        <div className="step active">
          <div className="circle yellow">2</div>
          <span className="active-text">Address</span>
        </div>
        <div className="line gray" />
        <div className="step">
          <div className="circle gray">3</div>
          <span>Payment</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="content">
        <h1>DELIVERY ADDRESS</h1>
        <p className="subtitle">
          Enter your delivery details to proceed with your order
        </p>

        <div className="card">
          {/* Address Type */}
          <p className="label">Address Type</p>
          <div className="row">
            <button
              className={addressType === "home" ? "active" : ""}
              onClick={() => setAddressType("home")}
            >
              <Home size={16} /> Home
            </button>
            <button
              className={addressType === "work" ? "active" : ""}
              onClick={() => setAddressType("work")}
            >
              <Briefcase size={16} /> Work
            </button>
          </div>

          {/* Contact Information */}
          <div className="section-title">
            <User size={14} /> Contact Information
          </div>

          <div className="grid2">
            <div>
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div>
              <label>Phone Number *</label>
              <input name="phone" value={form.phone} onChange={handleChange} />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>

          <label>Email Address *</label>
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}

          {/* Delivery Address */}
          <div className="section-title">
            <MapPin size={14} /> Delivery Address
          </div>

          <label>Address Line 1 *</label>
          <input name="address1" value={form.address1} onChange={handleChange} />
          {errors.address1 && (
            <span className="error">{errors.address1}</span>
          )}

          <label>Address Line 2 (Optional)</label>
          <input name="address2" value={form.address2} onChange={handleChange} />

          <div className="grid3">
            <div>
              <label>City *</label>
              <input name="city" value={form.city} onChange={handleChange} />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>

            <div>
              <label>State *</label>
              <input name="state" value={form.state} onChange={handleChange} />
              {errors.state && <span className="error">{errors.state}</span>}
            </div>

            <div>
              <label>Pincode *</label>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
              />
              {errors.pincode && (
                <span className="error">{errors.pincode}</span>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="actions">
            <button className="outline" onClick={() => navigate("/cart")}>
              Back to Cart
            </button>
            <button className="primary" onClick={handleContinue}>
              CONTINUE TO PAYMENT
            </button>
          </div>
        </div>
      </div>
 {/* INTERNAL CSS */}
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }

        .page {
          background: #3a3a3a;
          min-height: 100vh;
          color: white;
        }

        .checkout-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid #facc15;
          background: #2f2f2f;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #9ca3af;
        }

        .circle {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .green { background: #22c55e; color: white; }
        .yellow { background: #facc15; color: black; }
        .gray { background: #4b5563; color: #d1d5db; }

        .active-text { color: #facc15; font-weight: bold; }
        .line { width: 42px; height: 2px; background: #4b5563; }
        .line.yellow { background: #facc15; }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 16px;
        }

        h1 {
          width: 900px;
          max-width: 100%;
          margin-bottom: 8px;
          text-align: left;
          font-family:'Jersey 25', sans-serif;
          font-weight: 100;
        }

        .subtitle {
          width: 900px;
          max-width: 100%;
          color: #cbd5f5;
          margin-bottom: 24px;
          text-align: left;
        }

        .card {
          width: 900px;
          max-width: 100%;
          background: #1f1f1f;
          border: 2px solid #facc15;
          border-radius: 12px;
          padding: 28px;
        }

        .label { color: #facc15; margin-bottom: 8px; }

        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #facc15;
          font-weight: bold;
          margin: 22px 0 12px;
        }

        label { display: block; margin-bottom: 6px; }

        input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1.5px solid #facc15;
          background: #2b2b2b;
          color: white;
          margin-bottom: 14px;
          font-size: 14px;
        }

        .row {
          display: flex;
          gap: 22px;
          margin-bottom: 16px;
        }

        .row button {
          flex: 1;
          height: 48px;
          border-radius: 10px;
          border: 2px solid #facc15;
          background: transparent;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .row button.active {
          background: #facc15;
          color: black;
        }

        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

        .actions {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 16px;
          margin-top: 28px;
        }

        .outline {
          height: 52px;
          border-radius: 10px;
          border: 2px solid #facc15;
          background: transparent;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .primary {
          height: 52px;
          border-radius: 10px;
          background: #facc15;
          border: none;
          color: black;
          font-weight: bold;
          font-size: 18px;
          cursor: pointer;
        }

         .error {
          color: #ef4444;
          font-size: 12px;
          margin-top: -10px;
          display: block;
          margin-bottom: 10px;

        @media (max-width: 900px) {
          .grid2, .grid3 { grid-template-columns: 1fr; }
          .actions { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
