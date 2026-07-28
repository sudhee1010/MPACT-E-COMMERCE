import PDFDocument from "pdfkit";
import Order from "../models/Order.js";
import path from "path";
import fs from "fs";

/* =========================================================
   Shared styling helpers
   ========================================================= */

const COLORS = {
  black: "#1a1a1a",
  gray: "#6b6b6b",
  lightGray: "#9a9a9a",
  line: "#dcdcdc",
  headerFill: "#f4f4f4",
};

// Try to use a unicode font that supports the ₹ symbol.
// Falls back to the built-in Helvetica + "Rs." prefix if not found,
// so the code never breaks even if the font file isn't bundled yet.
const registerRupeeFont = (doc) => {
  const fontPath = path.join(process.cwd(), "public/fonts/NotoSans-Regular.ttf");
  const boldFontPath = path.join(process.cwd(), "public/fonts/NotoSans-Bold.ttf");

  if (fs.existsSync(fontPath)) {
    doc.registerFont("Body", fontPath);
    doc.registerFont("Bold", fs.existsSync(boldFontPath) ? boldFontPath : fontPath);
    return { regular: "Body", bold: "Bold", currency: "₹" };
  }

  return { regular: "Helvetica", bold: "Helvetica-Bold", currency: "Rs. " };
};

const money = (currencySymbol, value) => `${currencySymbol}${Number(value).toFixed(2)}`;

/* =========================================================
   Core drawing routine (shared by both invoice types)
   ========================================================= */

const renderInvoice = (doc, { order, invoiceNumber, statusRows }) => {
  const fonts = registerRupeeFont(doc);
  const pageLeft = doc.page.margins.left;
  const pageRight = doc.page.width - doc.page.margins.right;
  const contentWidth = pageRight - pageLeft;

  /* ---------------- HEADER ---------------- */

  const logoPath = path.join(process.cwd(), "public/logo.png");
  const hasLogo = fs.existsSync(logoPath);

  if (hasLogo) {
    doc.image(logoPath, pageLeft, 40, { width: 44 });
  }

  doc
    .font(fonts.bold)
    .fontSize(26)
    .fillColor(COLORS.black)
    .text("MPACT", pageLeft + (hasLogo ? 55 : 0), 42);

  doc
    .font(fonts.regular)
    .fontSize(11)
    .fillColor(COLORS.gray)
    .text("Official Invoice", pageLeft + (hasLogo ? 55 : 0), 72);

  doc
    .font(fonts.bold)
    .fontSize(30)
    .fillColor(COLORS.black)
    .text("INVOICE", pageLeft, 45, { width: contentWidth, align: "right" });

  doc
    .moveTo(pageLeft, 110)
    .lineTo(pageRight, 110)
    .strokeColor(COLORS.line)
    .lineWidth(1)
    .stroke();

  /* ---------------- ORDER META ROWS ---------------- */

  let y = 128;
  const rowGap = 22;
  const labelWidth = 90;

  statusRows.forEach(({ label, value, bold }) => {
    doc
      .font(fonts.bold)
      .fontSize(11)
      .fillColor(COLORS.black)
      .text(label, pageLeft, y, { width: labelWidth });

    doc
      .font(bold ? fonts.bold : fonts.regular)
      .fontSize(11)
      .fillColor(COLORS.black)
      .text(value, pageLeft + labelWidth, y);

    y += rowGap;
  });

  doc
    .moveTo(pageLeft, y + 4)
    .lineTo(pageRight, y + 4)
    .strokeColor(COLORS.line)
    .stroke();

  y += 22;

  /* ---------------- BILL TO ---------------- */

  doc
    .font(fonts.bold)
    .fontSize(12)
    .fillColor(COLORS.black)
    .text("Bill To:", pageLeft, y, { underline: true });

  y += 18;

  const addr = order.shippingAddress || {};

  const billLines = [
    addr.name,
    addr.address,
    `${addr.city || "—"}, ${addr.state || ""} - ${addr.pincode || "—"}`,
    `Phone: ${addr.phone || "—"}`,
  ].filter(Boolean);

  doc.font(fonts.regular).fontSize(10.5).fillColor(COLORS.black);

  billLines.forEach((line) => {
    doc.text(line, pageLeft, y);
    y += 16;
  });

  y += 8;

  doc
    .moveTo(pageLeft, y)
    .lineTo(pageRight, y)
    .strokeColor(COLORS.line)
    .stroke();

  y += 20;

  /* ---------------- TABLE ---------------- */

  const col = {
    item: { x: pageLeft, width: contentWidth * 0.42 },
    qty: { x: pageLeft + contentWidth * 0.42, width: contentWidth * 0.16 },
    price: { x: pageLeft + contentWidth * 0.58, width: contentWidth * 0.2 },
    total: { x: pageLeft + contentWidth * 0.78, width: contentWidth * 0.22 },
  };

  const headerRowHeight = 28;

  doc
    .rect(pageLeft, y, contentWidth, headerRowHeight)
    .fillColor(COLORS.headerFill)
    .fill();

  doc
    .font(fonts.bold)
    .fontSize(11)
    .fillColor(COLORS.black)
    .text("Item", col.item.x + 10, y + 9, { width: col.item.width - 10 })
    .text("Qty", col.qty.x, y + 9, { width: col.qty.width, align: "center" })
    .text("Price", col.price.x, y + 9, { width: col.price.width, align: "center" })
    .text("Total", col.total.x, y + 9, { width: col.total.width - 10, align: "right" });

  let rowY = y + headerRowHeight;
  const rowHeight = 30;

  doc.font(fonts.regular).fontSize(10.5);

  order.orderItems.forEach((item) => {
    doc
      .fillColor(COLORS.black)
      .text(item.name, col.item.x + 10, rowY + 9, { width: col.item.width - 20 })
      .text(String(item.quantity), col.qty.x, rowY + 9, { width: col.qty.width, align: "center" })
      .text(money(fonts.currency, item.price), col.price.x, rowY + 9, {
        width: col.price.width,
        align: "center",
      })
      .text(money(fonts.currency, item.price * item.quantity), col.total.x, rowY + 9, {
        width: col.total.width - 10,
        align: "right",
      });

    rowY += rowHeight;
  });

  const tableBottom = rowY;
  const tableTop = y;

  // Outer border
  doc
    .rect(pageLeft, tableTop, contentWidth, tableBottom - tableTop)
    .strokeColor(COLORS.line)
    .lineWidth(1)
    .stroke();

  // Horizontal row separators
  for (let lineY = tableTop + headerRowHeight; lineY <= tableBottom; lineY += rowHeight) {
    doc
      .moveTo(pageLeft, lineY)
      .lineTo(pageRight, lineY)
      .strokeColor(COLORS.line)
      .stroke();
  }

  // Vertical column separators
  [col.qty.x, col.price.x, col.total.x].forEach((x) => {
    doc
      .moveTo(x, tableTop)
      .lineTo(x, tableBottom)
      .strokeColor(COLORS.line)
      .stroke();
  });

  /* ---------------- TOTALS ---------------- */

  const subtotal = order.totalAmount - order.taxAmount;
  const tax = order.taxAmount;

  let totalsY = tableBottom + 20;
  const totalsLabelX = col.price.x;
  const totalsValueWidth = col.total.width - 10;

  doc
    .font(fonts.regular)
    .fontSize(11)
    .fillColor(COLORS.black)
    .text("Subtotal:", totalsLabelX, totalsY, { width: col.price.width, align: "left" })
    .text(money(fonts.currency, subtotal), col.total.x, totalsY, {
      width: totalsValueWidth,
      align: "right",
    });

  totalsY += 20;

  doc
    .text("Tax:", totalsLabelX, totalsY, { width: col.price.width, align: "left" })
    .text(money(fonts.currency, tax), col.total.x, totalsY, {
      width: totalsValueWidth,
      align: "right",
    });

  totalsY += 22;

  doc
    .moveTo(totalsLabelX, totalsY)
    .lineTo(pageRight, totalsY)
    .strokeColor(COLORS.black)
    .lineWidth(1)
    .stroke();

  totalsY += 10;

  doc
    .font(fonts.bold)
    .fontSize(14)
    .fillColor(COLORS.black)
    .text("Total:", totalsLabelX, totalsY, { width: col.price.width, align: "left" })
    .text(money(fonts.currency, order.totalAmount), col.total.x, totalsY, {
      width: totalsValueWidth,
      align: "right",
    });

  /* ---------------- FOOTER ---------------- */

  const footerY = doc.page.height - doc.page.margins.bottom - 40;

  doc
    .moveTo(pageLeft, footerY - 12)
    .lineTo(pageRight, footerY - 12)
    .strokeColor(COLORS.line)
    .stroke();

  doc
    .font(fonts.regular)
    .fontSize(10)
    .fillColor(COLORS.gray)
    .text("Thank you for shopping with MPACT!", pageLeft, footerY, {
      width: contentWidth,
      align: "center",
    });
};

/* =========================================================
   Exported controllers (same signatures & behavior as before)
   ========================================================= */

export const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order || order.paymentStatus !== "paid") {
      return res.status(400).json({ message: "Invoice not available" });
    }

    const invoiceNumber = `INV-${order._id.toString().slice(-6).toUpperCase()}`;

    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoiceNumber}.pdf`
    );

    doc.pipe(res);

    renderInvoice(doc, {
      order,
      invoiceNumber,
      statusRows: [
        { label: "Order ID:", value: invoiceNumber },
        {
          label: "Date:",
          value: new Date(order.createdAt).toLocaleDateString("en-IN"),
        },
        { label: "Status:", value: "PAID", bold: true },
      ],
    });

    doc.end();
  } catch (error) {
    console.error("Invoice generation error:", error);
    res.status(500).json({ message: "Failed to generate invoice" });
  }
};

export const adminDownloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const invoiceNumber = `INV-${order._id.toString().slice(-6).toUpperCase()}`;

    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoiceNumber}.pdf`
    );

    doc.pipe(res);

    renderInvoice(doc, {
      order,
      invoiceNumber,
      statusRows: [
        { label: "Order ID:", value: invoiceNumber },
        {
          label: "Date:",
          value: new Date(order.createdAt).toLocaleDateString("en-IN"),
        },
        { label: "Order Status:", value: order.orderStatus.toUpperCase(), bold: true },
        { label: "Payment:", value: order.paymentStatus.toUpperCase(), bold: true },
      ],
    });

    doc.end();
  } catch (error) {
    console.error("Admin invoice generation error:", error);
    res.status(500).json({ message: "Failed to generate invoice" });
  }
};