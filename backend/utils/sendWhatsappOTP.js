import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const sendWhatsappOTP = async ({ phone, otp }) => {
  try {
    const response = await axios.post(
      `${process.env.HAPPILEE_BASE_URL}/api/v1/sendTemplateMessage`,
      {
        candidate_details: {
          phone_number: phone
        },
        template_message_id: process.env.HAPPILEE_TEMPLATE_ID,
        template_params: [
          {
            name: "otp",
            value: otp
          }
        ]
      },
      {
        headers: {
          "x-api-key": process.env.HAPPILEE_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    console.log("WhatsApp OTP sent successfully");
    console.log(response.data);

    return response.data;
  } catch (err) {
    console.error(
      err.response?.data || err.message
    );
    throw err;
  }
};

export default sendWhatsappOTP;