export const formatPhoneNumber = (phone) => {
  if (!phone) return null;

  // Remove everything except digits
  let formatted = phone.toString().replace(/\D/g, "");

  // If it starts with 91, leave it
  if (formatted.startsWith("91")) {
    return formatted;
  }

  // Otherwise prepend 91
  return `91${formatted}`;
};