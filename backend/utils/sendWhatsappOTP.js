import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const maskApiKey = (value) => {
  if (!value) return "<missing>";
  if (value.length <= 8) return "****";
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
};

const logHappileeConfig = () => {
  console.log("======== HAPPILEE CONFIG ========");
  console.log("HAPPILEE_BASE_URL:", process.env.HAPPILEE_BASE_URL || "<missing>");
  console.log("HAPPILEE_API_KEY:", maskApiKey(process.env.HAPPILEE_API_KEY));
  console.log("HAPPILEE_ORDER_TEMPLATE_ID:", process.env.HAPPILEE_ORDER_TEMPLATE_ID || "<missing>");
  console.log("HAPPILEE_OTP_TEMPLATE_ID:", process.env.HAPPILEE_OTP_TEMPLATE_ID || "<missing>");
};

const normalizePhoneNumber = (phone) => {
  if (!phone) return "";

  const cleaned = String(phone).replace(/[^\d+]/g, "").trim();

  if (!cleaned) return "";

  if (cleaned.startsWith("+")) {
    return cleaned;
  }

  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return `+${cleaned}`;
  }

  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }

  return cleaned;
};

const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
};

const formatDisplayDate = (value) => {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const validateOrder = (order) => {
  console.log("======== VALIDATE ORDER ========");

  if (!order || !order._id) {
    console.error("Order confirmation failed: missing order data");
    return null;
  }

  const user = order.user || {};
  const shippingAddress = order.shippingAddress || {};
  const customerName = user.name || "Customer";
  const originalPhone = user.phone || shippingAddress.phone || order.phone;
  const normalizedPhone = normalizePhoneNumber(originalPhone);

  console.log("Customer Name:", customerName);
  console.log("Original phone:", originalPhone || "<missing>");
  console.log("Normalized phone:", normalizedPhone || "<missing>");
  console.log("Order ID:", String(order._id));
  console.log("Products:", (order.orderItems || []).map((item) => ({
    name: item.name || item.product?.name || "Product",
    quantity: item.quantity || 1,
    price: item.price || 0
  })));
  console.log("Quantity:", (order.orderItems || []).reduce((sum, item) => sum + (item.quantity || 1), 0));
  console.log("Total:", formatCurrency(order.totalAmount || order.subtotal || 0));
  console.log("Payment Status:", order.paymentStatus || "Unknown");
  console.log("Payment Method:", order.paymentMethod || "Unknown");
  console.log("Shipping Address:", shippingAddress);

  if (!customerName || !normalizedPhone) {
    console.error("Order confirmation failed: missing required customer fields");
    return null;
  }

  return {
    customerName,
    orderId: String(order._id),
    normalizedPhone,
    paymentStatus: order.paymentStatus || "Unknown",
    paymentMethod: order.paymentMethod || "Unknown",
    createdAt: order.createdAt,
    totalAmount: order.totalAmount || order.subtotal || 0,
    shippingAddress,
    orderItems: order.orderItems || []
  };
};

const buildOrderTemplateParams = (validatedOrder) => {
  console.log("======== BUILD TEMPLATE PARAMS ========");

  const productSummary = validatedOrder.orderItems
    .map((item) => {
      const itemName = item.name || item.product?.name || "Product";
      const quantity = item.quantity || 1;
      return `${itemName} x ${quantity}`;
    })
    .join(" | ");

  const templateParams = [
    {
      name: "1",
      value: validatedOrder.customerName
    },
    {
      name: "2",
      value: validatedOrder.orderId
    },
    {
      name: "3",
      value: productSummary || "Not available"
    },
    {
      name: "4",
      value: formatCurrency(validatedOrder.totalAmount || 0)
    }
  ];

  console.log("template_params:", templateParams);

  if (templateParams.length !== 4) {
    throw new Error("Order WhatsApp template must contain exactly four params");
  }

  return templateParams;
};

const sendWhatsAppTemplate = async ({ phone, templateId, templateParams }) => {
  const url = `${process.env.HAPPILEE_BASE_URL}/api/v1/sendTemplateMessage`;
  const payload = {
    candidate_details: {
      phone_number: phone
    },
    template_message_id: templateId,
    template_params: templateParams
  };

  const headers = {
    "x-api-key": process.env.HAPPILEE_API_KEY,
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  console.log("======== HAPPILEE REQUEST ========");
  console.log("URL:", url);
  console.log("Headers:", headers);
  console.log("Body:", JSON.stringify(payload, null, 2));
  console.log("template_message_id:", templateId);
  console.log("template_params:", templateParams);
  console.log("candidate_details:", payload.candidate_details);

  try {
    const response = await axios.post(url, payload, { headers });

    console.log("======== HAPPILEE RESPONSE ========");
    console.log(response?.data);
    return response.data;
  } catch (error) {
    console.error("======== HAPPILEE ERROR ========");
    console.error("error.response.status:", error?.response?.status);
    console.error("error.response.data:", error?.response?.data);
    console.error("error.response.headers:", error?.response?.headers);
    console.error("axios request payload:", { url, headers, payload });
    console.error("stack trace:", error?.stack || error);
    throw error;
  }
};

// Keep OTP flow unchanged.
export const sendWhatsappOTP = async ({ phone, otp }) => {
  logHappileeConfig();

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

/*
 * sendOrderConfirmation(order)
 *
 * Reusable helper that builds a single WhatsApp order confirmation message
 * from the order object and sends it using the existing Happilee template
 * configuration. This function is intentionally isolated so the OTP flow and
 * the order flow remain independent.
 */
export const sendOrderConfirmation = async (order) => {
  console.log("======== CALLING ORDER WHATSAPP ========");
  logHappileeConfig();

  try {
    const validatedOrder = validateOrder(order);
    if (!validatedOrder) {
      return false;
    }

    const templateParams = buildOrderTemplateParams(validatedOrder);

    const response = await sendWhatsAppTemplate({
      phone: validatedOrder.normalizedPhone,
      templateId: process.env.HAPPILEE_ORDER_TEMPLATE_ID,
      templateParams
    });

    console.log("Order confirmation WhatsApp sent successfully");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Order confirmation WhatsApp failed:", error?.message || error);
    console.error("stack trace:", error?.stack || error);
    return false;
  }
};

// Backward-compatible export name used by older callers.
export const sendOrderConfirmationWhatsapp = async (order) => {
  return sendOrderConfirmation(order);
};

// Keep default export for backward compatibility
export default sendWhatsappOTP;