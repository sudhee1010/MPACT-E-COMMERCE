import axios from "axios";
import dotenv from "dotenv";
import { formatPhoneNumber } from "./formatPhoneNumber.js";

dotenv.config();

console.log("[WhatsApp Init] HAPPILEE_OTP_TEMPLATE_ID loaded:", process.env.HAPPILEE_OTP_TEMPLATE_ID ? "OK (" + process.env.HAPPILEE_OTP_TEMPLATE_ID + ")" : "UNDEFINED");
console.log("[WhatsApp Init] HAPPILEE_ORDER_TEMPLATE_ID loaded:", process.env.HAPPILEE_ORDER_TEMPLATE_ID ? "OK (" + process.env.HAPPILEE_ORDER_TEMPLATE_ID + ")" : "UNDEFINED");
console.log("[WhatsApp Init] HAPPILEE_BASE_URL loaded:", process.env.HAPPILEE_BASE_URL ? "OK" : "UNDEFINED");
console.log("[WhatsApp Init] HAPPILEE_API_KEY loaded:", process.env.HAPPILEE_API_KEY ? "OK" : "UNDEFINED");

const sendWhatsAppTemplate = async ({ phone, templateId, templateParams }) => {
  try {
    const formattedPhone = formatPhoneNumber(phone);

    if (!formattedPhone) {
      const errorMsg = "[WhatsApp] ABORT: Phone number is missing or invalid after formatting. Raw phone was: " + JSON.stringify(phone);
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    if (!templateId) {
      const errorMsg = "[WhatsApp] ABORT: templateId is undefined. Check that the correct HAPPPILEE env var is set.";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    if (!Array.isArray(templateParams)) {
      const errorMsg = "[WhatsApp] ABORT: templateParams is not an array. Got: " + JSON.stringify(templateParams);
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    const requestBody = {
      candidate_details: {
        phone_number: formattedPhone
      },
      template_message_id: templateId,
      template_params: templateParams
    };

    console.log("[WhatsApp] Sending Happilee API request:", {
      url: `${process.env.HAPPILEE_BASE_URL}/api/v1/sendTemplateMessage`,
      phone: formattedPhone,
      templateId,
      templateParams,
      completeRequestBody: requestBody
    });

    const response = await axios.post(
      `${process.env.HAPPILEE_BASE_URL}/api/v1/sendTemplateMessage`,
      requestBody,
      {
        headers: {
          "x-api-key": process.env.HAPPILEE_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    console.log("[WhatsApp] Happilee Success Response:", JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (err) {
    console.error(
      "[WhatsApp] Happilee Error Response:",
      JSON.stringify(err.response?.data || err.message, null, 2)
    );
    if (err.response?.status) {
      console.error("[WhatsApp] Happilee Error Status Code:", err.response.status);
    }
    if (err.response?.headers) {
      console.error("[WhatsApp] Happilee Error Headers:", JSON.stringify(err.response.headers, null, 2));
    }
    throw err;
  }
};

export const sendWhatsappOTP = async ({ phone, otp }) => {
  console.log("[WhatsApp OTP] sendWhatsappOTP() called with:", {
    phone,
    otpProvided: !!otp
  });

  const templateId = process.env.HAPPILEE_OTP_TEMPLATE_ID;

  if (!templateId) {
    const errorMsg = "[WhatsApp OTP] FAILED: HAPPILEE_OTP_TEMPLATE_ID is undefined in .env";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const templateParams = [
    {
      name: "otp",
      value: otp
    }
  ];

  console.log("[WhatsApp OTP] Preparing to send:", {
    phone,
    templateId,
    templateParams
  });

  const response = await sendWhatsAppTemplate({
    phone,
    templateId,
    templateParams
  });

  console.log("[WhatsApp OTP] sent successfully:", JSON.stringify(response, null, 2));

  return response;
};

export const sendOrderConfirmationWhatsapp = async ({
  phone,
  customerName,
  orderId,
  amount
}) => {
  console.log("[WhatsApp Order] sendOrderConfirmationWhatsapp() CALLED with:", {
    phone,
    customerName,
    orderId,
    amount
  });

  const templateId = process.env.HAPPILEE_ORDER_TEMPLATE_ID;

  if (!templateId) {
    const errorMsg = "[WhatsApp Order] FAILED: HAPPILEE_ORDER_TEMPLATE_ID is UNDEFINED. Check .env file for HAPPILEE_ORDER_TEMPLATE_ID variable.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  console.log("[WhatsApp Order] Using template ID:", templateId);

  if (!phone) {
    const errorMsg = "[WhatsApp Order] FAILED: phone number is MISSING.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  if (!customerName) {
    const errorMsg = "[WhatsApp Order] FAILED: customerName is MISSING. Order may fail.";
    console.error(errorMsg);
  }

  if (!orderId) {
    const errorMsg = "[WhatsApp Order] FAILED: orderId is MISSING.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  if (amount === undefined || amount === null) {
    const errorMsg = "[WhatsApp Order] FAILED: amount is MISSING.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const formattedAmount = typeof amount === "number" ? amount.toFixed(2) : String(amount);

  const templateParams = [
    {
      name: "1",
      value: customerName
    },
    {
      name: "2",
      value: String(orderId)
    },
    {
      name: "3",
      value: formattedAmount
    }
  ];

  console.log("[WhatsApp Order] Preparing payload:", {
    phone,
    customerName,
    orderId: String(orderId),
    amount: formattedAmount,
    templateId,
    templateParams
  });

  const response = await sendWhatsAppTemplate({
    phone,
    templateId,
    templateParams
  });

  console.log("[WhatsApp Order] Order confirmation WhatsApp sent successfully:", JSON.stringify(response, null, 2));

  return response;
};

export default sendWhatsappOTP;
