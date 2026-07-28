import PDFDocument from "pdfkit";
import Order from "../models/Order.js";
import path from "path";
import fs from "fs";

/* =========================================================
   Shared styling helpers
   ========================================================= */

const COLORS = {
  black: "#1a1a1a",
  gray: "#555555",
  line: "#222222",
  lightLine: "#d9d9d9",
  headerFill: "#f4f4f4",
};

const FONT = { regular: "Helvetica", bold: "Helvetica-Bold" };

const money = (value) => `RS: ${Number(value).toFixed(2)}`;

/* =========================================================
   Core drawing routine (shared by both invoice types)
   ========================================================= */

const renderInvoice = (doc, { order, invoiceNumber, extraMeta }) => {
  const pageLeft = doc.page.margins.left;
  const pageRight = doc.page.width - doc.page.margins.right;
  const contentWidth = pageRight - pageLeft;

  /* ---------------- HEADER ---------------- */

  const logoPath = path.join(process.cwd(), "public/logo.png");
  const hasLogo = fs.existsSync(logoPath);
  const brandX = pageLeft + (hasLogo ? 55 : 0);

  if (hasLogo) {
    doc.image(logoPath, pageLeft, 40, { width: 44 });
  }

  doc
    .font(FONT.bold)
    .fontSize(30)
    .fillColor(COLORS.black)
    .text("MPACT", brandX, 40);

  doc
    .font(FONT.bold)
    .fontSize(13)
    .fillColor(COLORS.black)
    .text("Pvt Ltd", brandX, 75);

  doc
    .font(FONT.bold)
    .fontSize(24)
    .fillColor(COLORS.black)
    .text("TAX INVOICE", pageLeft, 42, { width: contentWidth, align: "right" });

  const metaLine = (label, value, top) => {
    const labelText = `${label} `;
    doc.font(FONT.bold).fontSize(10.5).fillColor(COLORS.black);
    const labelWidth = doc.widthOfString(labelText);
    doc.font(FONT.regular);
    const valueWidth = doc.widthOfString(value);
    const totalWidth = labelWidth + valueWidth;
    const startX = pageRight - totalWidth;

    doc.font(FONT.bold).text(labelText, startX, top, { continued: true });
    doc.font(FONT.regular).text(value);
  };

  metaLine("Invoice No:", invoiceNumber, 80);
  metaLine("Date:", new Date(order.createdAt).toLocaleDateString("en-GB"), 98);

  doc
    .moveTo(pageLeft, 128)
    .lineTo(pageRight, 128)
    .strokeColor(COLORS.line)
    .lineWidth(1)
    .stroke();

  /* ---------------- COMPANY BLOCK ---------------- */

  let y = 148;

  doc.font(FONT.bold).fontSize(11).fillColor(COLORS.black).text("MPACT Pvt Ltd", pageLeft, y);
  y += 17;
  doc.font(FONT.regular).fontSize(10.5).fillColor(COLORS.black).text("GSTIN: 32ABCDE1234F1Z5", pageLeft, y);
  y += 16;
  doc.text("Kerala, India", pageLeft, y);
  y += 16;
  doc.text("Email: support@mpact.com", pageLeft, y);

  y += 34;

  /* ---------------- BILL TO (+ optional status column) ---------------- */

  doc
    .font(FONT.bold)
    .fontSize(11)
    .fillColor(COLORS.black)
    .text("BILL TO:", pageLeft, y, { underline: true });

  y += 20;
  const billToTop = y;

  const addr = order.shippingAddress || {};
  const billLines = [
    { text: addr.name || "Customer", bold: true },
    { text: addr.address || "—", bold: false },
    { text: `${addr.city || "—"}, ${addr.state || ""} - ${addr.pincode || "—"}`, bold: false },
    { text: `Phone: ${addr.phone || "—"}`, bold: false },
  ];

  billLines.forEach((line) => {
    doc
      .font(line.bold ? FONT.bold : FONT.regular)
      .fontSize(line.bold ? 11 : 10.5)
      .fillColor(COLORS.black)
      .text(line.text, pageLeft, y);
    y += 17;
  });

  if (extraMeta && extraMeta.length) {
    const metaX = pageLeft + contentWidth * 0.55;
    const metaWidth = contentWidth * 0.45;
    let metaY = billToTop;

    extraMeta.forEach(({ label, value }) => {
      doc.font(FONT.bold).fontSize(10.5).fillColor(COLORS.black);
      doc.text(`${label} `, metaX, metaY, { continued: true, width: metaWidth });
      doc.font(FONT.regular).text(value);
      metaY += 26;
    });

    y = Math.max(y, metaY);
  }

  y += 24;

  /* ---------------- TABLE ---------------- */

  const col = {
    item: { x: pageLeft, width: contentWidth * 0.42 },
    qty: { x: pageLeft + contentWidth * 0.42, width: contentWidth * 0.15 },
    price: { x: pageLeft + contentWidth * 0.57, width: contentWidth * 0.22 },
    total: { x: pageLeft + contentWidth * 0.79, width: contentWidth * 0.21 },
  };

  const headerRowHeight = 30;

  doc.rect(pageLeft, y, contentWidth, headerRowHeight).fillColor(COLORS.headerFill).fill();

  doc
    .font(FONT.bold)
    .fontSize(11)
    .fillColor(COLORS.black)
    .text("Item", col.item.x + 12, y + 10, { width: col.item.width - 12 })
    .text("Qty", col.qty.x, y + 10, { width: col.qty.width, align: "center" })
    .text("Price", col.price.x, y + 10, { width: col.price.width, align: "center" })
    .text("Total", col.total.x, y + 10, { width: col.total.width - 12, align: "right" });

  let rowY = y + headerRowHeight;
  const rowHeight = 32;

  doc.font(FONT.regular).fontSize(10.5);

  order.orderItems.forEach((item) => {
    doc
      .fillColor(COLORS.black)
      .text(item.name, col.item.x + 12, rowY + 10, { width: col.item.width - 20 })
      .text(String(item.quantity), col.qty.x, rowY + 10, { width: col.qty.width, align: "center" })
      .text(money(item.price), col.price.x, rowY + 10, { width: col.price.width, align: "center" })
      .text(money(item.price * item.quantity), col.total.x, rowY + 10, {
        width: col.total.width - 12,
        align: "right",
      });

    rowY += rowHeight;
  });

  const tableTop = y;
  const tableBottom = rowY;

  doc
    .rect(pageLeft, tableTop, contentWidth, tableBottom - tableTop)
    .strokeColor(COLORS.line)
    .lineWidth(1)
    .stroke();

  for (let lineY = tableTop + headerRowHeight; lineY <= tableBottom; lineY += rowHeight) {
    doc.moveTo(pageLeft, lineY).lineTo(pageRight, lineY).strokeColor(COLORS.lightLine).stroke();
  }

  [col.qty.x, col.price.x, col.total.x].forEach((x) => {
    doc.moveTo(x, tableTop).lineTo(x, tableBottom).strokeColor(COLORS.lightLine).stroke();
  });

  /* ---------------- TOTALS BOX ---------------- */

  const subtotal = order.totalAmount - order.taxAmount;
  const cgst = order.taxAmount / 2;
  const sgst = order.taxAmount / 2;

  const totalsBoxWidth = contentWidth * 0.5;
  const totalsBoxX = pageRight - totalsBoxWidth;
  const totalsLabelX = totalsBoxX + 14;
  const totalsValueWidth = totalsBoxWidth - 28;
  const totalsRowHeight = 30;

  let totalsY = tableBottom + 26;
  const totalsBoxTop = totalsY;

  const totalsRow = (label, value, opts = {}) => {
    doc
      .font(opts.bold ? FONT.bold : FONT.regular)
      .fontSize(opts.bold ? 13 : 10.5)
      .fillColor(COLORS.black)
      .text(label, totalsLabelX, totalsY + (opts.bold ? 9 : 10))
      .text(value, totalsLabelX, totalsY + (opts.bold ? 9 : 10), {
        width: totalsValueWidth,
        align: "right",
      });
    totalsY += opts.bold ? 38 : totalsRowHeight;
  };

  totalsRow("Subtotal", money(subtotal));
  totalsRow("CGST (9%)", money(cgst));
  totalsRow("SGST (9%)", money(sgst));

  doc
    .moveTo(totalsBoxX, totalsY)
    .lineTo(pageRight, totalsY)
    .strokeColor(COLORS.line)
    .lineWidth(1)
    .stroke();

  totalsRow("Grand Total", money(order.totalAmount), { bold: true });

  const totalsBoxBottom = totalsY;

  doc
    .rect(totalsBoxX, totalsBoxTop, totalsBoxWidth, totalsBoxBottom - totalsBoxTop)
    .strokeColor(COLORS.line)
    .lineWidth(1)
    .stroke();

  // internal row separators (subtle)
  [totalsBoxTop + totalsRowHeight, totalsBoxTop + totalsRowHeight * 2].forEach((lineY) => {
    doc.moveTo(totalsBoxX, lineY).lineTo(pageRight, lineY).strokeColor(COLORS.lightLine).stroke();
  });

  /* ---------------- FOOTER ---------------- */

  const footerY = doc.page.height - doc.page.margins.bottom - 50;

  doc.moveTo(pageLeft, footerY - 14).lineTo(pageRight, footerY - 14).strokeColor(COLORS.lightLine).stroke();

  doc
    .font(FONT.bold)
    .fontSize(11)
    .fillColor(COLORS.black)
    .text("Thank you for your business!", pageLeft, footerY, { width: contentWidth, align: "center" });

  doc
    .font(FONT.regular)
    .fontSize(9.5)
    .fillColor(COLORS.gray)
    .text("For any queries, contact us at support@mpact.com", pageLeft, footerY + 16, {
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
      extraMeta: null,
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
      extraMeta: [
        { label: "Order Status:", value: order.orderStatus.toUpperCase() },
        { label: "Payment Status:", value: order.paymentStatus.toUpperCase() },
      ],
    });

    doc.end();
  } catch (error) {
    console.error("Admin invoice generation error:", error);
    res.status(500).json({ message: "Failed to generate invoice" });
  }
};