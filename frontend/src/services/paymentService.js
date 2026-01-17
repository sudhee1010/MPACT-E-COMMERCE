// services/paymentService.js

export const fetchSavedCards = async () => {
  // BACKEND READY
  // GET /api/payments/cards
  return [
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
      last4: "5678",
      name: "Jane Cooper",
      expiry: "11/26",
      isDefault: false,
    },
  ];
};

export const addNewCard = async (cardData) => {
  // POST /api/payments/add-card
  console.log("📦 Sending card to backend:", cardData);
  return { success: true };
};

export const selectDefaultCard = async (cardId) => {
  // PATCH /api/payments/set-default
  console.log("⭐ Default card:", cardId);
  return { success: true };
};
