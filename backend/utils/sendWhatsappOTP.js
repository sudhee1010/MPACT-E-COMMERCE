import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Private helper function for common API request
const sendWhatsAppTemplate = async ({ phone, templateId, templateParams }) => {
  try {
    const response = await axios.post(
      `${process.env.HAPPILEE_BASE_URL}/api/v1/sendTemplateMessage`,
      {
        candidate_details: {
          phone_number: phone
        },
        template_message_id: templateId,
        template_params: templateParams
      },
      {
        headers: {
          "x-api-key": process.env.HAPPILEE_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    return response.data;
  } catch (err) {
    console.error(
      err.response?.data || err.message
    );
    throw err;
  }
};

export const sendWhatsappOTP = async ({ phone, otp }) => {
  const response = await sendWhatsAppTemplate({
    phone,
    templateId: process.env.HAPPILEE_OTP_TEMPLATE_ID,
    templateParams: [
      {
        name: "otp",
        value: otp
      }
    ]
  });

  console.log("WhatsApp OTP sent successfully");
  console.log(response);

  return response;
};

export const sendOrderConfirmationWhatsapp = async ({
  phone,
  customerName,
  orderId,
  amount
}) => {
  const response = await sendWhatsAppTemplate({
    phone,
    templateId: process.env.HAPPILEE_ORDER_TEMPLATE_ID,
    templateParams: [
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
        value: String(amount)
      }
    ]
  });

  console.log("Order confirmation WhatsApp sent successfully");
  console.log(response);

  return response;
};

export default sendWhatsappOTP;