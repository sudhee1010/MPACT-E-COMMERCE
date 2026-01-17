export const isValidCardNumber = (num) => /^\d{16}$/.test(num);
export const isValidCVV = (cvv) => /^\d{3}$/.test(cvv);
export const isValidExpiry = (m, y) =>
  m >= 1 && m <= 12 && y.length === 2;
