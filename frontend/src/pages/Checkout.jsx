import React, { useState, useEffect } from "react";
import { Home, Briefcase, User, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();

  const [addressType, setAddressType] = useState("home");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isDirectBuy = location.state?.directBuy;
  const directProduct = location.state?.product;



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
  /* ================= FETCH ADDRESS ================= */
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await api.get("/api/address/me");
        const data = res.data;

        setAddressType(data.addressType === "Work" ? "work" : "home");

        setForm({
          name: data.fullName || "",
          phone: data.phoneNumber || "",
          email: data.email || "",
          address1: data.addressLine1 || "",
          address2: data.addressLine2 || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
        });
      } catch (error) {
        // No saved address → do nothing
      }
    };

    fetchAddress();
  }, []);
  /* ================= FORM HANDLING ================= */
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

  /* ================= SAVE & CONTINUE ================= */
  const handleContinue = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const addressPayload = {
        addressType: addressType === "work" ? "Work" : "Home",
        fullName: form.name,
        phoneNumber: form.phone,
        email: form.email,
        addressLine1: form.address1,
        addressLine2: form.address2,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      };

      console.log("Selected Payment Method:", "Pending - payment selection happens on the Payment page");
      console.log("Request Payload:", addressPayload);

      await api.post("/api/address", addressPayload);

      navigate("/pay", {
        state: {
          shippingAddress: {
            address: form.address1,
            city: form.city,
            pincode: form.pincode,
            phone: form.phone,
            state: form.state,
            name: form.name,
            email: form.email,
          },
          directBuy: isDirectBuy,
          product: directProduct,
        },
      });
    } catch (error) {
      toast.error("Failed to save address. Please try again.");
    } finally {
      setLoading(false);
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
            {/* <button className="outline" onClick={() => navigate("/cart")}> */}
            <button
              className="outline"
              onClick={() => navigate(isDirectBuy ? "/" : "/cart")}
            >

              Back to Cart
            </button>
            <button className="primary" onClick={handleContinue} disabled={loading}>
              {loading ? "Processing..." : "CONTINUE TO PAYMENT"}
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
          width: 100%;
          overflow-x: hidden;
        }

        .checkout-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 16px 12px;
          border-bottom: 1px solid #facc15;
          background: #1b1b1b;
          flex-wrap: wrap;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #9ca3af;
          white-space: nowrap;
        }

        .circle {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
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
          width: 100%;
          box-sizing: border-box;
        }
        }

        h1 {
          width: 900px;
          max-width: calc(100% - 0px);
          margin-bottom: 8px;
          text-align: left;
          font-family:'Jersey 25', sans-serif;
          font-weight: 100;
          font-size: 32px;
          line-height: 1.2;
          box-sizing: border-box;
        }

        .subtitle {
          width: 900px;
          max-width: calc(100% - 0px);
          color: #cbd5f5;
          margin-bottom: 24px;
          text-align: left;
          font-size: 14px;
          line-height: 1.5;
          box-sizing: border-box;
        }

        .card {
          width: 900px;
          max-width: calc(100% - 0px);
          background: #1f1f1f;
          border: 2px solid #facc15;
          border-radius: 12px;
          padding: 28px;
          box-sizing: border-box;
        }

        .label { 
          color: #facc15; 
          margin-bottom: 8px;
          font-size: 14px;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #facc15;
          font-weight: bold;
          margin: 22px 0 12px;
          font-size: 14px;
        }

        label { 
          display: block; 
          margin-bottom: 6px;
          font-size: 14px;
        }

        input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1.5px solid #facc15;
          background: #2b2b2b;
          color: white;
          margin-bottom: 14px;
          font-size: 14px;
          min-height: 48px;
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
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
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
          font-size: 14px;
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
        }

        /* Tablet Breakpoint - 768px and below */
        @media (max-width: 768px) {
          .content {
            padding: 28px 12px;
            width: 100%;
          }

          h1 {
            font-size: 26px;
          }

          .subtitle {
            font-size: 13px;
            margin-bottom: 20px;
          }

          .card {
            padding: 20px;
            border-radius: 10px;
            width: 100%;
          }

          .checkout-steps {
            gap: 10px;
            padding: 12px 8px;
          }

          .step {
            font-size: 12px;
            gap: 6px;
          }

          .circle {
            width: 24px;
            height: 24px;
            font-size: 12px;
          }

          .line {
            width: 32px;
          }

          input {
            padding: 12px 14px;
            font-size: 13px;
            margin-bottom: 12px;
          }

          .row {
            gap: 16px;
            margin-bottom: 14px;
          }

          .row button {
            height: 44px;
            font-size: 13px;
          }

          .grid2 { grid-template-columns: 1fr; }
          .grid3 { grid-template-columns: 1fr 1fr; }
          
          .actions { 
            grid-template-columns: 1fr;
            gap: 12px;
            margin-top: 20px;
          }

          .outline, .primary {
            height: 48px;
            font-size: 14px;
          }

          .primary {
            font-size: 16px;
          }

          .label {
            font-size: 13px;
          }

          label {
            font-size: 13px;
          }

          .section-title {
            font-size: 13px;
            margin: 16px 0 10px;
          }
        }

        /* Mobile Breakpoint - 480px and below */
        @media (max-width: 480px) {
          .content {
            padding: 20px 10px;
            width: 100%;
          }

          h1 {
            font-size: 22px;
            margin-bottom: 6px;
          }

          .subtitle {
            font-size: 12px;
            margin-bottom: 16px;
          }

          .card {
            padding: 16px;
            gap: 12px;
            width: 100%;
          }

          .checkout-steps {
            gap: 6px;
            padding: 10px 6px;
          }

          .step {
            font-size: 11px;
            gap: 4px;
          }

          .circle {
            width: 22px;
            height: 22px;
            font-size: 10px;
          }

          .line {
            width: 24px;
            height: 1.5px;
          }

          input {
            padding: 11px 12px;
            font-size: 12px;
            margin-bottom: 10px;
            min-height: 44px;
          }

          .row {
            gap: 10px;
            margin-bottom: 12px;
            flex-direction: column;
          }

          .row button {
            height: 42px;
            font-size: 12px;
          }

          .grid2 { gap: 12px; }
          .grid3 { grid-template-columns: 1fr; gap: 12px; }
          
          .actions { 
            grid-template-columns: 1fr;
            gap: 10px;
            margin-top: 16px;
          }

          .outline, .primary {
            height: 44px;
            font-size: 13px;
          }

          .primary {
            font-size: 14px;
          }

          .label {
            font-size: 12px;
            margin-bottom: 6px;
          }

          label {
            font-size: 12px;
            margin-bottom: 5px;
          }

          .section-title {
            font-size: 12px;
            margin: 14px 0 8px;
            gap: 6px;
          }

          .error {
            font-size: 11px;
            margin-top: -8px;
            margin-bottom: 8px;
          }
        }

        /* Extra small devices - 360px and below */
        @media (max-width: 360px) {
          .content {
            padding: 16px 8px;
            width: 100%;
          }

          h1 {
            font-size: 20px;
          }

          .subtitle {
            font-size: 11px;
          }

          .card {
            padding: 14px;
            width: 100%;
          }

          .checkout-steps {
            gap: 4px;
            padding: 8px 4px;
          }

          .step {
            font-size: 10px;
          }

          .line {
            width: 20px;
          }

          .row button {
            height: 40px;
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;