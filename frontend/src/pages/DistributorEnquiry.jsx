// import React, { useState } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// const DistributorEnquiry = () => {
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const [form, setForm] = useState({
//     businessName: "",
//     fullName: "",
//     phone: "",
//     email: "",
//     businessType: "",
//     city: "",
//     remarks: "",
//   });

//   /* ================= HANDLE CHANGE ================= */
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   /* ================= VALIDATION ================= */
//   const validate = () => {
//     const newErrors = {};

//     if (!form.businessName.trim())
//       newErrors.businessName = "Business name is required";

//     if (!form.fullName.trim())
//       newErrors.fullName = "Full name is required";

//     if (!/^\d{10}$/.test(form.phone))
//       newErrors.phone = "Enter a valid 10-digit phone number";

//     if (!/^\S+@\S+\.\S+$/.test(form.email))
//       newErrors.email = "Enter a valid email address";

//     if (!form.businessType)
//       newErrors.businessType = "Select a business type";

//     if (!form.city.trim())
//       newErrors.city = "City is required";

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length > 0) {
//       toast.error("Please fill all required fields correctly");
//       return false;
//     }

//     return true;
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async () => {
//     if (!validate()) return;

//     try {
//       setLoading(true);
//       await api.post("/api/distributor/distributor-enquiry", form);
//       toast.success("Enquiry submitted successfully");

//       setForm({
//         businessName: "",
//         fullName: "",
//         phone: "",
//         email: "",
//         businessType: "",
//         city: "",
//         remarks: "",
//       });
//       setErrors({});
//     } catch {
//       toast.error("Failed to submit enquiry");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="page">
//       <div className="content">
//         <h1>DISTRIBUTOR / BULK ENQUIRY</h1>
//         <p className="subtitle">
//           Fill in the details below and our team will contact you shortly
//         </p>

//         {/* 👇 FLOATING CARD ENABLED */}
//         <div className="card floating-card">
//           <label>Business Name *</label>
//           <input
//             name="businessName"
//             value={form.businessName}
//             onChange={handleChange}
//           />
//           {errors.businessName && (
//             <span className="error">{errors.businessName}</span>
//           )}

//           <div className="grid2">
//             <div>
//               <label>Full Name *</label>
//               <input
//                 name="fullName"
//                 value={form.fullName}
//                 onChange={handleChange}
//               />
//               {errors.fullName && (
//                 <span className="error">{errors.fullName}</span>
//               )}
//             </div>

//             <div>
//               <label>Phone Number *</label>
//               <input
//                 name="phone"
//                 value={form.phone}
//                 onChange={handleChange}
//               />
//               {errors.phone && (
//                 <span className="error">{errors.phone}</span>
//               )}
//             </div>
//           </div>

//           <label>Email Address *</label>
//           <input
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//           />
//           {errors.email && <span className="error">{errors.email}</span>}

//           <div className="grid2">
//             <div>
//               <label>Business Type *</label>
//               <select
//                 name="businessType"
//                 value={form.businessType}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option>Retailer</option>
//                 <option>Wholesaler</option>
//                 <option>Distributor</option>
//                 <option>Manufacturer</option>
//                 <option>Shop Owner</option>
//                 <option>Other</option>
//               </select>
//               {errors.businessType && (
//                 <span className="error">{errors.businessType}</span>
//               )}
//             </div>

//             <div>
//               <label>City *</label>
//               <input
//                 name="city"
//                 value={form.city}
//                 onChange={handleChange}
//               />
//               {errors.city && (
//                 <span className="error">{errors.city}</span>
//               )}
//             </div>
//           </div>

//           <label>Remarks (Optional)</label>
//           <textarea
//             name="remarks"
//             value={form.remarks}
//             onChange={handleChange}
//           />

//           <div className="actions">
//             <button
//               className="primary"
//               onClick={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? "SUBMITTING..." : "SUBMIT ENQUIRY"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ================= CSS ================= */}
//       <style>{`
//         * { box-sizing: border-box; }
//         body { margin: 0; }

//         .page {
//           background: #3a3a3a;
//           min-height: 100vh;
//           color: white;
//         }

//         .content {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           padding: 40px 16px;
//         }

//         h1 {
//           width: 900px;
//           max-width: 100%;
//           font-family: 'Jersey 25', sans-serif;
//           font-weight: 100;
//           margin-bottom: 8px;
//         }

//         .subtitle {
//           width: 900px;
//           max-width: 100%;
//           color: #cbd5f5;
//           margin-bottom: 24px;
//         }

//         .card {
//           width: 900px;
//           max-width: 100%;
//           background: #1f1f1f;
//           border: 2px solid #facc15;
//           border-radius: 12px;
//           padding: 28px;
//         }

//         /* 🌊 FLOATING CARD (ONLY ANIMATION) */
//         .floating-card {
//           animation: floatCard 4s ease-in-out infinite;
//         }

//         @keyframes floatCard {
//           0% { transform: translateY(0); }
//           50% { transform: translateY(-6px); }
//           100% { transform: translateY(0); }
//         }

//         label {
//           display: block;
//           margin-bottom: 6px;
//         }

//         input, select, textarea {
//           width: 100%;
//           padding: 14px 16px;
//           border-radius: 10px;
//           border: 1.5px solid #facc15;
//           background: #2b2b2b;
//           color: white;
//           margin-bottom: 6px;
//           font-size: 14px;
//         }

//         textarea {
//           resize: none;
//           min-height: 90px;
//         }

//         .grid2 {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//         }

//         .error {
//           color: #ef4444;
//           font-size: 12px;
//           margin-bottom: 10px;
//           display: block;
//         }

//         .actions {
//           margin-top: 24px;
//         }

//         .primary {
//           width: 100%;
//           height: 52px;
//           border-radius: 10px;
//           background: #facc15;
//           border: none;
//           color: black;
//           font-weight: bold;
//           font-size: 18px;
//           cursor: pointer;
//         }

//         .primary:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }

//         @media (max-width: 900px) {
//           .grid2 { grid-template-columns: 1fr; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DistributorEnquiry;


import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const DistributorEnquiry = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    businessName: "",
    fullName: "",
    phone: "",
    email: "",
    businessType: "",
    city: "",
    remarks: "",
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    const newErrors = {};

    if (!form.businessName.trim())
      newErrors.businessName = "Business name is required";

    if (!form.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";

    if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter a valid email address";

    if (!form.businessType)
      newErrors.businessType = "Select a business type";

    if (!form.city.trim())
      newErrors.city = "City is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields correctly");
      return false;
    }

    return true;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await api.post("/api/distributor/distributor-enquiry", form);
      toast.success("Enquiry submitted successfully");

      setForm({
        businessName: "",
        fullName: "",
        phone: "",
        email: "",
        businessType: "",
        city: "",
        remarks: "",
      });
      setErrors({});
    } catch {
      toast.error("Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="content">
        <h1>DISTRIBUTOR / BULK ENQUIRY</h1>
        <p className="subtitle">
          Fill in the details below and our team will contact you shortly
        </p>

        {/* FLOATING CARD */}
        <div className="card floating-card">
          <label>Business Name *</label>
          <input
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
          />
          {errors.businessName && (
            <span className="error">{errors.businessName}</span>
          )}

          <div className="grid2">
            <div>
              <label>Full Name *</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <span className="error">{errors.fullName}</span>
              )}
            </div>

            <div>
              <label>Phone Number *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="error">{errors.phone}</span>
              )}
            </div>
          </div>

          <label>Email Address *</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <div className="grid2">
            <div>
              <label>Business Type *</label>
              <select
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Retailer</option>
                <option>Wholesaler</option>
                <option>Distributor</option>
                <option>Manufacturer</option>
                <option>Shop Owner</option>
                <option>Other</option>
              </select>
              {errors.businessType && (
                <span className="error">{errors.businessType}</span>
              )}
            </div>

            <div>
              <label>City *</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
              />
              {errors.city && (
                <span className="error">{errors.city}</span>
              )}
            </div>
          </div>

          <label>Remarks (Optional)</label>
          <textarea
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
          />

          <div className="actions">
            <button
              className="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "SUBMITTING..." : "SUBMIT ENQUIRY"}
            </button>
          </div>
        </div>
      </div>

      {/* ================= CSS ================= */}
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }

        .page {
          background: #3a3a3a;
          min-height: 100vh;
          color: white;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 16px;
        }

        h1 {
          width: 900px;
          max-width: 100%;
          font-family: 'Jersey 25', sans-serif;
          font-weight: 100;
          margin-bottom: 8px;
        }

        .subtitle {
          width: 900px;
          max-width: 100%;
          color: #cbd5f5;
          margin-bottom: 24px;
        }

        .card {
          width: 900px;
          max-width: 100%;
          background: #1f1f1f;
          border: 2px solid #facc15;
          border-radius: 12px;
          padding: 28px;
        }

        /* 🌊 FLOATING CARD */
        .floating-card {
          animation: floatCard 4s ease-in-out infinite;
        }

        @keyframes floatCard {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }

        label {
          display: block;
          margin-bottom: 6px;
        }

        input, select, textarea {
          width: 100%;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1.5px solid #facc15;
          background: #2b2b2b;
          color: white;
          margin-bottom: 6px;
          font-size: 14px;
        }

        textarea {
          resize: none;
          min-height: 90px;
        }

        .grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .error {
          color: #ef4444;
          font-size: 12px;
          margin-bottom: 10px;
          display: block;
        }

        .actions {
          margin-top: 24px;
        }

        /* 🔥 BUTTON WITH HOVER EFFECT */
        .primary {
          width: 100%;
          height: 52px;
          border-radius: 10px;
          background: #facc15;
          border: none;
          color: black;
          font-weight: bold;
          font-size: 18px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .primary:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 10px 22px rgba(250, 204, 21, 0.35);
        }

        .primary:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 5px 12px rgba(250, 204, 21, 0.25);
        }

        .primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @media (max-width: 900px) {
          .grid2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default DistributorEnquiry;
