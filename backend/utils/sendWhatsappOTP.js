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

const normalizePhoneNumber = (phone) => {
  if (!phone) return "";
  return String(phone).replace(/[^\d+]/g, "").trim();
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

// Keep OTP flow unchanged.
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

/*
 * sendOrderConfirmation(order)
 *
 * Reusable helper that builds a single WhatsApp order confirmation message
 * from the order object and sends it using the existing Happilee template
 * configuration. This function is intentionally isolated so the OTP flow and
 * the order flow remain independent.
 */
export const sendOrderConfirmation = async (order) => {
  try {
    if (!order || !order._id) {
      console.error("Order confirmation failed: missing order data");
      return false;
    }

    const user = order.user || {};
    const shippingAddress = order.shippingAddress || {};
    const customerName = user.name || "Customer";
    const phone = normalizePhoneNumber(
      user.phone || shippingAddress.phone || order.phone
    );

    if (!phone) {
      console.error("Order confirmation failed: missing customer phone number");
      return false;
    }

    const productLines = (order.orderItems || [])
      .map((item) => {
        const itemName = item.name || item.product?.name || "Product";
        const quantity = item.quantity || 1;
        const price = formatCurrency(item.price || 0);
        return `${itemName} x ${quantity} @ ${price}`;
      })
      .join(" | ");

    const deliveryAddress = [
      shippingAddress.address,
      shippingAddress.city,
      shippingAddress.pincode,
      shippingAddress.phone
    ]
      .filter(Boolean)
      .join(", ");

    const messageSummary = [
      `Customer Name: ${customerName}`,
      `Order ID: ${String(order._id)}`,
      `Order Date: ${formatDisplayDate(order.createdAt)}`,
      `Products: ${productLines || "Not available"}`,
      `Individual Price: ${formatCurrency(order.subtotal || order.totalAmount || 0)}`,
      `Grand Total: ${formatCurrency(order.totalAmount || 0)}`,
      `Payment Method: ${order.paymentMethod || "Unknown"}`,
      `Payment Status: ${order.paymentStatus || "Unknown"}`,
      `Delivery Address: ${deliveryAddress || "Not available"}`,
      `Estimated Delivery Date: ${
        order.estimatedDeliveryDate
          ? formatDisplayDate(order.estimatedDeliveryDate)
          : "Not available"
      }`
    ].join("\n");

    if (!productLines || !messageSummary.trim()) {
      console.error("Order confirmation failed: template variables are empty");
      return false;
    }

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
          value: String(order._id)
        },
        {
          name: "3",
          value: messageSummary
        }
      ]
    });

    console.log("Order confirmation WhatsApp sent successfully");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Order confirmation WhatsApp failed:", error.message || error);
    return false;
  }
};

// Backward-compatible export name used by older callers.
export const sendOrderConfirmationWhatsapp = async (order) => {
  return sendOrderConfirmation(order);
};

// Keep default export for backward compatibility
export default sendWhatsappOTP;