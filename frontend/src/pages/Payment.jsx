import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  /* ================= STATE ================= */
  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [newCard, setNewCard] = useState({
    number: "",
    name: "",
    month: "",
    year: "",
    cvv: "",
    setDefault: false,
  });

  const navigate = useNavigate();

  /* ================= FETCH SAVED CARDS (BACKEND READY) ================= */
  useEffect(() => {
    // 🔗 Replace with real API later
    const mockCards = [
      {
        id: 1,
        bank: "Ziraat Bankası",
        last4: "1234",
        name: "Hızır Kocaman",
        expiry: "12/34",
        isDefault: true,
      },
      {
        id: 2,
        bank: "T. İş Bankası",
        last4: "4321",
        name: "Jane Cooper",
        expiry: "11/26",
        isDefault: false,
      },
    ];

    setCards(mockCards);
    setSelectedCardId(mockCards.find(c => c.isDefault)?.id);
  }, []);

  /* ================= HANDLERS ================= */
  const handleSelectCard = (id) => {
    setSelectedCardId(id);
    // 🔗 API later: PUT /cards/default
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCard({
      ...newCard,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleReviewOrder = () => {
    const payload = {
      selectedCardId,
      newCard,
    };

    console.log("Payment payload →", payload);

    // TEMP FLOW
    navigate("/success");
  };

  return (
    <>
      <style>{`
*{box-sizing:border-box}
body{background:#2f2f2f;color:#fff;font-family:Arial}

/* PAGE */
.payment-page{
  max-width:1100px;
  margin:140px auto;
  padding:0 20px;
}

/* STEPPER */
.stepper{
  display:flex;
  gap:24px;
  margin-bottom:40px;
}
.step{
  display:flex;
  align-items:center;
  gap:8px;
  opacity:.5;
}
.step.active{
  opacity:1;
  color:#ffeb00;
}
.dot{
  width:22px;
  height:22px;
  border-radius:50%;
  border:2px solid #777;
  display:flex;
  align-items:center;
  justify-content:center;
}
.step.active .dot{
  background:#ffeb00;
  border-color:#ffeb00;
  color:#000;
  font-weight:900;
}

/* REGISTERED CARDS */
.box{
  background:#777;
  border-radius:16px;
  padding:26px;
  margin-bottom:30px;
}
.card-row{
  display:grid;
  grid-template-columns:40px 1.2fr 1fr 1.2fr 1fr;
  align-items:center;
  padding:16px 0;
  border-bottom:1px solid rgba(255,255,255,.3);
  cursor:pointer;
}
.card-row:last-child{border:none}

.check{
  width:22px;
  height:22px;
  border-radius:50%;
  border:2px solid #ffeb00;
  display:flex;
  align-items:center;
  justify-content:center;
}
.check.active{
  background:#ffeb00;
  color:#000;
  font-weight:900;
}

/* ADD CARD */
.add-card{
  background:#2f3e36;
  border-radius:16px;
  padding:30px;
}
.add-card h3{
  margin-bottom:20px;
}
input{
  width:100%;
  padding:14px;
  margin-top:6px;
  border:none;
  border-radius:8px;
  background:#9aa3a0;
  font-weight:600;
}
.row{
  display:grid;
  grid-template-columns:1fr 1fr 1fr;
  gap:16px;
}

/* ACTIONS */
.payment-actions{
  margin-top:30px;
  display:flex;
  flex-direction:column;
  gap:20px;
  align-items:flex-start;
}
.default{
  display:flex;
  align-items:center;
  gap:10px;
  font-size:14px;
}

/* BUTTON */
.btn{
  background:#ffeb00;
  border:none;
  padding:16px 30px;
  font-weight:900;
  cursor:pointer;
  border-radius:6px;
}

/* ORDER ITEM */
.order-item{
  display:flex;
  align-items:center;
  gap:16px;
  margin-top:40px;
  opacity:.85;
}
      `}</style>

      <div className="payment-page">

        {/* STEPPER */}
        <div className="stepper">
          <div className="step active">
            <div className="dot">✓</div> Cart
          </div>
          <div className="step active">
            <div className="dot">✓</div> Addresses
          </div>
          <div className="step active">
            <div className="dot">3</div> Payment
          </div>
          <div className="step">
            <div className="dot">4</div> Confirm
          </div>
        </div>

        {/* REGISTERED CARDS */}
        <div className="box">
          <h3>Registered cards</h3>

          {cards.map((c) => (
            <div
              key={c.id}
              className="card-row"
              onClick={() => handleSelectCard(c.id)}
            >
              <div className={`check ${selectedCardId === c.id ? "active" : ""}`}>
                {selectedCardId === c.id && "✓"}
              </div>
              <div>{c.bank}</div>
              <div>{c.last4}</div>
              <div>{c.name}</div>
              <div>{c.expiry}</div>
            </div>
          ))}
        </div>

        {/* ADD NEW CARD */}
        <div className="add-card">
          <h3>Add new card</h3>

          <label>
            Card number
            <input name="number" onChange={handleInputChange} />
          </label>

          <label>
            Card owner
            <input name="name" onChange={handleInputChange} />
          </label>

          <div className="row">
            <input name="month" placeholder="MM" onChange={handleInputChange} />
            <input name="year" placeholder="YY" onChange={handleInputChange} />
            <input name="cvv" placeholder="CVV" onChange={handleInputChange} />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="payment-actions">
          <label className="default">
            <input
              type="checkbox"
              name="setDefault"
              onChange={handleInputChange}
            />
            <span>Set as default</span>
          </label>

          <button className="btn" onClick={handleReviewOrder}>
            Review your order
          </button>
        </div>

        {/* ORDER SUMMARY */}
        <div className="order-item">
          <img src="/images/product.jpg" width="60" alt="Protein Wafers" />
          <div>
            PROTEIN WAFERS – VARIETY PACK (x1) <br />
            <strong>₹15.00</strong>
          </div>
        </div>

      </div>
    </>
  );
}
