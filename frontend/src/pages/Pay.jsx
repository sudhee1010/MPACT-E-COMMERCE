import React, { useState } from "react";
import { Smartphone, CreditCard, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pay = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [method, setMethod] = useState("upi");
  const [upiApp, setUpiApp] = useState("");
  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [error, setError] = useState("");

  /* ================= VALIDATION ================= */
  const handlePay = () => {
    setError("");

    if (method === "upi") {
      if (!upiId || !upiApp) {
        setError("Please enter UPI ID and select a UPI app");
        return;
      }
    }

    if (method === "card") {
      if (
        cardNumber.length !== 16 ||
        !cardName ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) ||
        cvv.length !== 3
      ) {
        setError("Please enter valid card details");
        return;
      }
    }

    // COD → no validation needed
    navigate("/success");
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>SELECT PAYMENT METHOD</h1>

        <div className="payment-layout">
          {/* ================= LEFT ================= */}
          <div className="payment-methods">
            {/* UPI */}
            <div
              className={`method ${method === "upi" ? "active" : ""}`}
              onClick={() => setMethod("upi")}
            >
              <div className="method-title">
                <span className="radio" />
                <Smartphone size={18} />
                UPI Payment
              </div>

              {method === "upi" && (
                <div className="method-body">
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g. yourname@paytm)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />

                  <div className="upi-apps">
                    {["phonepe", "paytm", "gpay"].map((app) => (
                      <button
                        key={app}
                        className={
                          upiApp === app ? "upi-btn active" : "upi-btn"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          setUpiApp(app);
                        }}
                      >
                        {app === "gpay" ? "Google Pay" : app.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CARD */}
            <div
              className={`method ${method === "card" ? "active" : ""}`}
              onClick={() => setMethod("card")}
            >
              <div className="method-title">
                <span className="radio" />
                <CreditCard size={18} />
                Credit / Debit Card
              </div>

              {method === "card" && (
                <div className="method-body">
                  <input
                    type="text"
                    placeholder="Card Number"
                    maxLength={16}
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(e.target.value.replace(/\D/g, ""))
                    }
                  />

                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />

                  <div className="row-inputs">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={3}
                      value={cvv}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* COD */}
            <div
              className={`method ${method === "cod" ? "active" : ""}`}
              onClick={() => setMethod("cod")}
            >
              <div className="method-title">
                <span className="radio" />
                <Truck size={18} />
                Cash on Delivery
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="summary">
            <h3>ORDER SUMMARY</h3>

            <div className="summary-content">
              <div className="row">
                <span>Subtotal</span>
                <span>₹2000</span>
              </div>

              <div className="row green">
                <span>Discount</span>
                <span>-₹200</span>
              </div>

              <div className="row">
                <span>Packing Charges</span>
                <span>₹50</span>
              </div>

              <hr />

              <div className="total">
                <span>Total</span>
                <span>₹1850</span>
              </div>
            </div>

            {error && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "14px",
                  marginBottom: "12px",
                }}
              >
                {error}
              </p>
            )}

            <button className="pay-btn" onClick={handlePay}>
              PROCEED TO PAY
            </button>
          </div>
        </div>
      </div>
            {/* CSS */}
            <style>{`
            /* ================= RESET ================= */
            * {
            box-sizing: border-box;
            }

            /* ================= PAGE ================= */
            .payment-page {
            min-height: 100vh;
            background: #2f2f2f;
            color: white;
            font-family: 'Jersey 25', sans-serif;
            }

            .payment-container {
            max-width: 1300px;
            margin: auto;
            padding: 60px 24px;
            }

            h1 {
            font-size: 32px;
            margin-bottom: 32px;
            }

            /* ================= LAYOUT ================= */
            .payment-layout {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 32px;
            align-items: start; /* 🔑 PREVENTS SUMMARY HEIGHT STRETCH */
            }

            /* ================= METHODS ================= */
            .payment-methods {
            display: flex;
            flex-direction: column;
            gap: 20px;
            }

            .method {
            border: 2px solid #555;
            border-radius: 16px;
            padding: 20px 24px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: #2f2f2f;
            }

            .method.active {
            border-color: #facc15;
            background: #45422c;
            }

            .method-title {
            display: flex;
            align-items: center;
            gap: 14px;
            font-size: 20px;
            }

            .radio {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: 2px solid #aaa;
            }

            .method.active .radio {
            background: #facc15;
            border-color: #facc15;
            }

            .method-body {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            }

            /* ================= INPUTS ================= */
            input {
            width: 100%;
            height: 46px;
            border-radius: 10px;
            border: 2px solid #facc15;
            background: #2f2f2f;
            color: white;
            padding: 0 14px;
            font-size: 14px;
            }

            .row-inputs {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            }

            /* ================= AUTOFILL FIX ================= */
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus {
            -webkit-text-fill-color: white;
            -webkit-box-shadow: 0 0 0px 1000px #2f2f2f inset;
            transition: background-color 9999s ease-in-out 0s;
            }

            /* ================= UPI ================= */
            .upi-apps {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            }

            .upi-btn {
            padding: 10px 18px;
            border-radius: 12px;
            border: 2px solid transparent;
            background: white;
            color: black;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.25s ease;
            }

            .upi-btn:hover,
            .upi-btn.active {
            border-color: #facc15;
            background: #facc15;
            }

            /* ================= SUMMARY ================= */
            .summary {
            border: 2px solid #facc15;
            border-radius: 18px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            }

            .summary h3 {
            margin-bottom: 24px;
            }

            .row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 14px;
            }

            .row.green {
            color: #22c55e;
            }

            hr {
            border: none;
            height: 1px;
            background: #666;
            margin: 18px 0;
            }

            .total {
            display: flex;
            justify-content: space-between;
            font-size: 20px;
            font-weight: bold;
            color: #facc15;
            margin-bottom: 20px;
            }

            .pay-btn {
            width: 100%;
            height: 54px;
            border-radius: 14px;
            border: none;
            background: #facc15;
            font-weight: bold;
            cursor: pointer;
            margin-top: auto; /* 🔑 BUTTON GOES DOWN WITHOUT HEIGHT INCREASE */
            }

            /* ================= STICKY SUMMARY (DESKTOP) ================= */
            @media (min-width: 1025px) {
            .summary {
                position: sticky;
                top: 120px;
                align-self: start;
            }
            }

            /* ================= TABLET ================= */
            @media (max-width: 1024px) {
            .payment-layout {
                grid-template-columns: 1fr;
            }

            h1 {
                text-align: center;
            }
            }

            /* ================= MOBILE ================= */
            @media (max-width: 600px) {
            .payment-container {
                padding: 24px 14px;
            }

            h1 {
                font-size: 22px;
                line-height: 1.3;
                text-align: center;
            }

            .method {
                padding: 16px;
            }

            .method-title {
                font-size: 16px;
                gap: 10px;
            }

            .method-body {
                margin-top: 14px;
                gap: 10px;
            }

            input {
                height: 42px;
                font-size: 13px;
            }

            .row-inputs {
                grid-template-columns: 1fr;
            }

            .upi-btn {
                flex: 1 1 100%;
                padding: 10px;
                font-size: 14px;
                text-align: center;
            }

            .summary {
                padding: 18px;
            }

            .summary h3 {
                font-size: 16px;
            }

            .row {
                font-size: 14px;
            }

            .total {
                font-size: 18px;
            }

            .pay-btn {
                height: 48px;
                font-size: 14px;
            }
            }
`}</style>

        </div>
    );
};

export default Pay;
