import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const sanitizeTemplateValue = (value) => {
  if (value === null || value === undefined) return "";

  return String(value)
    .replace(/\r/g, "")
    .replace(/\n/g, "")
    .replace(/\t/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
};

// Private helper function for common API request
const sendWhatsAppTemplate = async ({
  phone,
  templateId,
  templateParams
}) => {
  const apiKey = process.env.HAPPILEE_API_KEY || "";
  const maskedApiKey = apiKey
    ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`
    : "";

  const url = `${process.env.HAPPILEE_BASE_URL}/api/v1/sendTemplateMessage`;

  const sanitizedTemplateParams = (templateParams || []).map((param) => ({
    name: sanitizeTemplateValue(param?.name),
    value: sanitizeTemplateValue(param?.value)
  }));

  const payload = {
    candidate_details: {
      phone_number: phone
    },
    template_message_id: templateId,
    template_params: sanitizedTemplateParams
  };

  const headers = {
    "x-api-key": maskedApiKey,
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  console.log("====================================");
  console.log("WHATSAPP REQUEST");
  console.log("====================================");
  console.log("Request URL:", url);
  console.log("HTTP Method:", "POST");
  console.log("Headers:", headers);
  console.log("Request Body:", JSON.stringify(payload, null, 2));
  console.log("Phone Number:", phone);
  console.log("Template ID:", templateId);
  console.log(
    "Template Params:",
    JSON.stringify(templateParams, null, 2)
  );

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "x-api-key": process.env.HAPPILEE_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });

    console.log("====================================");
    console.log("WHATSAPP RESPONSE");
    console.log("====================================");
    console.log("Status Code:", response?.status);
    console.log(
      "Response Body:",
      JSON.stringify(response?.data, null, 2)
    );

    return response.data;
  } catch (error) {
    console.error("====================================");
    console.error("FUNCTION NAME: sendWhatsAppTemplate");
    console.error(
      "Axios Error Message:",
      error?.message || error
    );
    console.error("HTTP Status:", error?.response?.status);
    console.error(
      "Response Data:",
      JSON.stringify(error?.response?.data, null, 2)
    );
    console.error(
      "Request Payload:",
      JSON.stringify(
        {
          url,
          headers,
          payload
        },
        null,
        2
      )
    );
    console.error("Stack Trace:", error?.stack || error);
    console.error("====================================");

    throw error;
  }
};

const normalizePhoneNumber = (phone) => {
  if (!phone) return "";

  return String(phone)
    .replace(/[^\d+]/g, "")
    .trim();
};

const formatCurrency = (value) => {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
};

// Date only - NO TIME
const formatDisplayDate = (value) => {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

// =========================================================
// OTP
// =========================================================

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

// =========================================================
// ORDER CONFIRMATION
// =========================================================

export const sendOrderConfirmation = async (order) => {
  console.log("====================================");
  console.log("ORDER CONFIRMATION START");
  console.log("====================================");

  console.log(
    "Complete order object:",
    JSON.stringify(order, null, 2)
  );

  try {
    // -----------------------------------------------------
    // Validate order
    // -----------------------------------------------------

    if (!order || !order._id) {
      console.error("====================================");
      console.error(
        "FUNCTION NAME: sendOrderConfirmation"
      );
      console.error(
        "Order confirmation failed: missing order data"
      );
      console.error("====================================");

      return false;
    }

    // -----------------------------------------------------
    // Customer information
    // -----------------------------------------------------

    const user = order.user || {};
    const shippingAddress = order.shippingAddress || {};

    const customerName = user.name || "Customer";

    const phone = normalizePhoneNumber(
      user.phone ||
        shippingAddress.phone ||
        order.phone
    );

    console.log("Customer Name:", customerName);
    console.log("Phone Number:", phone);
    console.log(
      "Template ID:",
      process.env.HAPPILEE_ORDER_TEMPLATE_ID
    );

    console.log(
      "Products:",
      JSON.stringify(
        order.orderItems || [],
        null,
        2
      )
    );

    console.log(
      "Grand Total:",
      formatCurrency(order.totalAmount || 0)
    );

    console.log(
      "Payment Status:",
      order.paymentStatus || "Unknown"
    );

    console.log(
      "Delivery Address:",
      JSON.stringify(
        shippingAddress,
        null,
        2
      )
    );

    // -----------------------------------------------------
    // Validate phone
    // -----------------------------------------------------

    if (!phone) {
      console.error("====================================");
      console.error(
        "FUNCTION NAME: sendOrderConfirmation"
      );
      console.error(
        "Order confirmation failed: missing customer phone number"
      );
      console.error("====================================");

      return false;
    }

    // -----------------------------------------------------
    // Product information
    // -----------------------------------------------------

    const productLines = (order.orderItems || [])
      .map((item) => {
        const itemName =
          item.name ||
          item.product?.name ||
          "Product";

        const quantity = item.quantity || 1;

        const price = formatCurrency(
          item.price || 0
        );

        return `${itemName} x ${quantity} @ ${price}`;
      })
      .join(" | ");

    // -----------------------------------------------------
    // Delivery address
    // -----------------------------------------------------

    const deliveryAddress = [
      shippingAddress.address,
      shippingAddress.city,
      shippingAddress.pincode,
      shippingAddress.phone
    ]
      .filter(Boolean)
      .join(", ");

    // -----------------------------------------------------
    // WhatsApp message summary
    //
    // REMOVED:
    // ❌ Second Order ID
    // ❌ Individual Price
    // ❌ Estimated Delivery Date
    //
    // KEPT:
    // ✅ Customer Name
    // ✅ Order Date
    // ✅ Products
    // ✅ Grand Total
    // ✅ Payment Method
    // ✅ Payment Status
    // ✅ Delivery Address
    // -----------------------------------------------------

    const messageSummary = [
      `Customer Name: ${customerName}`,

      `Order Date: ${formatDisplayDate(
        order.createdAt
      )}`,

      `Products: ${
        productLines || "Not available"
      }`,

      `Grand Total: ${formatCurrency(
        order.totalAmount || 0
      )}`,

      `Payment Method: ${
        order.paymentMethod || "Unknown"
      }`,

      `Payment Status: ${
        order.paymentStatus || "Unknown"
      }`,

      `Delivery Address: ${
        deliveryAddress || "Not available"
      }`
    ].join(" | ");

    // -----------------------------------------------------
    // Validate template variables
    // -----------------------------------------------------

    if (
      !productLines ||
      !messageSummary.trim()
    ) {
      console.error("====================================");
      console.error(
        "FUNCTION NAME: sendOrderConfirmation"
      );
      console.error(
        "Order confirmation failed: template variables are empty"
      );
      console.error("====================================");

      return false;
    }

    // -----------------------------------------------------
    // Template parameters
    // -----------------------------------------------------

    const templateParams = [
      {
        name: "1",
        value: customerName
      },
      {
        name: "2",
        value: String(order._id)
      },
      {
        name: "3",
        value: messageSummary
      }
    ];

    console.log(
      "Template Parameters:",
      JSON.stringify(
        templateParams,
        null,
        2
      )
    );

    console.log("====================================");
    console.log(
      "Before sendWhatsAppTemplate()"
    );
    console.log("====================================");

    // -----------------------------------------------------
    // Send WhatsApp message
    // -----------------------------------------------------

    const response =
      await sendWhatsAppTemplate({
        phone,
        templateId:
          process.env
            .HAPPILEE_ORDER_TEMPLATE_ID,
        templateParams
      });

    console.log("====================================");
    console.log(
      "After sendWhatsAppTemplate()"
    );
    console.log(
      "API response:",
      JSON.stringify(
        response,
        null,
        2
      )
    );
    console.log("====================================");

    if (response?.error === true) {
      throw new Error(
        "Happilee WhatsApp order confirmation returned an error response"
      );
    }

    if (response?.error === false) {
      console.log(
        "WhatsApp sent successfully"
      );
    }

    console.log(response);

    return response;
  } catch (error) {
    console.error("====================================");
    console.error(
      "FUNCTION NAME: sendOrderConfirmation"
    );
    console.error(error);
    console.error(error.stack);

    if (error.response) {
      console.error(
        "STATUS:",
        error.response.status
      );

      console.error(
        "DATA:",
        JSON.stringify(
          error.response.data,
          null,
          2
        )
      );
    }

    console.error("====================================");

    return false;
  }
};

// =========================================================
// Backward-compatible export
// =========================================================

export const sendOrderConfirmationWhatsapp = async (
  order
) => {
  return sendOrderConfirmation(order);
};

// =========================================================
// Default export
// =========================================================

export default sendWhatsappOTP;