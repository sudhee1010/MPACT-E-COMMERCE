// import React from "react";

// export default function HelpSupport() {
//   return (
//     <div className="help-page">
//       <style>{`
//         .help-page {
//           min-height: 100vh;
//           background: #1b1b1b;
//           color: white;
//           padding: 120px 20px 60px;
//           font-family: 'Inter', sans-serif;
//         }

//         .help-container {
//           max-width: 700px;
//           margin: auto;
//           background: #3a3a3a;
//           padding: 40px;
//           border-radius: 8px;
//         }

//         .help-title {
//           font-size: 42px;
//           font-weight: 700;
//           color: #ffeb3b;
//           margin-bottom: 10px;
//         }

//         .help-desc {
//           font-size: 15px;
//           color: #d0d0d0;
//           margin-bottom: 30px;
//           line-height: 1.6;
//         }

//         .help-form {
//           display: flex;
//           flex-direction: column;
//           gap: 20px;
//         }

//         .help-form input,
//         .help-form textarea {
//           background: transparent;
//           border: none;
//           border-bottom: 1px solid #777;
//           padding: 12px 0;
//           color: white;
//           outline: none;
//           font-size: 14px;
//         }

//         .help-form textarea {
//           resize: none;
//           height: 120px;
//         }

//         .help-form input:focus,
//         .help-form textarea:focus {
//           border-bottom-color: #ffeb3b;
//         }

//         .help-form button {
//           margin-top: 10px;
//           align-self: flex-start;
//           background: #ffeb3b;
//           color: black;
//           border: none;
//           padding: 12px 30px;
//           font-weight: 600;
//           cursor: pointer;
//           font-size: 14px;
//         }

//         .help-form button:hover {
//           opacity: 0.9;
//         }

//         @media (max-width: 600px) {
//           .help-container {
//             padding: 30px 20px;
//           }

//           .help-title {
//             font-size: 34px;
//           }
//         }
//       `}</style>

//       <div className="help-container">
//         <h1 className="help-title">Help & Support</h1>
//         <p className="help-desc">
//           Need help with your orders, products, payments, or anything else?
//           Fill out the form below and our support team will get back to you as
//           soon as possible.
//         </p>

//         <form className="help-form">
//           <input type="text" placeholder="Your Name" required />
//           <input type="email" placeholder="Your Email" required />
//           <textarea placeholder="Describe your issue..." required></textarea>
//           <button type="submit">Submit Request</button>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import api from "../api/axios";

export default function HelpSupport() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post("/api/help", form); // ✅ correct path
      setForm({ name: "", email: "", message: "" });
      setShowSuccess(true); // ✅ open modal
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="help-page">
      <style>{`
        .help-page {
          min-height: 100vh;
          background: #1b1b1b;
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

        .help-form button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* SUCCESS MODAL */
        .success-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .success-modal {
          background: #3a3a3a;
          padding: 30px 40px;
          border-radius: 8px;
          text-align: center;
          max-width: 400px;
        }

        .success-modal h2 {
          color: #ffeb3b;
          margin-bottom: 10px;
        }

        .success-modal p {
          color: #d0d0d0;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .success-modal button {
          background: #ffeb3b;
          border: none;
          padding: 10px 24px;
          font-weight: 600;
          cursor: pointer;
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

      {/* ✅ SUCCESS MODAL */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <h2>Success 🎉</h2>
            <p>
              Your support request has been submitted.
              Our team will contact you soon.
            </p>
            <button onClick={() => setShowSuccess(false)}>
              OK
            </button>
          </div>
        </div>
      )}

      <div className="help-container">
        <h1 className="help-title">Help & Support</h1>
        <p className="help-desc">
          Need help with your orders, products, payments, or anything else?
          Fill out the form below and our support team will get back to you as
          soon as possible.
        </p>

        <form className="help-form" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Describe your issue..."
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
