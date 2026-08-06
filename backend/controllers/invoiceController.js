import PDFDocument from "pdfkit";
import Order from "../models/Order.js";
import path from "path";
import fs from "fs";

/* =========================================================
   Shared styling helpers
   ========================================================= */

const COLORS = {
  black: "#111111",
  white: "#ffffff",
  gray: "#555555",
  line: "#111111",
  lightLine: "#d9d9d9",
};

const FONT = { regular: "Helvetica", bold: "Helvetica-Bold" };

const money = (value) => `RS: ${Number(value).toFixed(2)}`;

const dashedLine = (doc, x1, y, x2) => {
  doc.save();
  doc.dash(3, { space: 2 });
  doc.moveTo(x1, y).lineTo(x2, y).strokeColor(COLORS.line).lineWidth(1).stroke();
  doc.undash();
  doc.restore();
};

/* ---------------- tiny vector icons (no external font/image needed) ---------------- */

const drawPinIcon = (doc, x, y) => {
  doc.save();
  doc
    .path(
      `M ${x + 4} ${y} C ${x + 6.2} ${y} ${x + 8} ${y + 1.8} ${x + 8} ${y + 4} ` +
        `C ${x + 8} ${y + 7} ${x + 4} ${y + 11} ${x + 4} ${y + 11} ` +
        `C ${x + 4} ${y + 11} ${x} ${y + 7} ${x} ${y + 4} ` +
        `C ${x} ${y + 1.8} ${x + 1.8} ${y} ${x + 4} ${y} Z`
    )
    .fillColor(COLORS.black)
    .fill();
  doc.circle(x + 4, y + 4, 1.4).fillColor(COLORS.white).fill();
  doc.restore();
};

const drawMailIcon = (doc, x, y) => {
  doc.save();
  doc.rect(x, y + 1, 10, 7).strokeColor(COLORS.black).lineWidth(0.8).stroke();
  doc.moveTo(x, y + 1).lineTo(x + 5, y + 5).lineTo(x + 10, y + 1).strokeColor(COLORS.black).stroke();
  doc.restore();
};

const drawPhoneIcon = (doc, x, y) => {
  doc.save();
  doc
    .path(
      `M ${x + 1} ${y} C ${x} ${y} ${x} ${y + 1.5} ${x} ${y + 2} ` +
        `C ${x} ${y + 6.5} ${x + 3.5} ${y + 10} ${x + 8} ${y + 10} ` +
        `C ${x + 8.5} ${y + 10} ${x + 10} ${y + 10} ${x + 10} ${y + 9} ` +
        `L ${x + 10} ${y + 7.3} C ${x + 10} ${y + 6.8} ${x + 9.6} ${y + 6.5} ${x + 9.2} ${y + 6.4} ` +
        `L ${x + 7.2} ${y + 5.9} C ${x + 6.8} ${y + 5.8} ${x + 6.4} ${y + 6} ${x + 6.2} ${y + 6.3} ` +
        `L ${x + 5.4} ${y + 7.3} C ${x + 4} ${y + 6.6} ${x + 2.9} ${y + 5.5} ${x + 2.2} ${y + 4.1} ` +
        `L ${x + 3.2} ${y + 3.3} C ${x + 3.5} ${y + 3.1} ${x + 3.7} ${y + 2.7} ${x + 3.6} ${y + 2.3} ` +
        `L ${x + 3.1} ${y + 0.3} C ${x + 3} ${y - 0.1} ${x + 2.7} ${y} ${x + 2.2} ${y} Z`
    )
    .fillColor(COLORS.black)
    .fill();
  doc.restore();
};

/* =========================================================
   Core drawing routine (shared by both invoice types)
   ========================================================= */

const renderInvoice = (doc, { order, invoiceNumber, extraMeta }) => {
  const pageLeft = doc.page.margins.left;
  const pageRight = doc.page.width - doc.page.margins.right;
  const contentWidth = pageRight - pageLeft;
  const halfWidth = contentWidth / 2;
  const rightColX = pageLeft + halfWidth + 12;
  const rightColWidth = halfWidth - 12;

  /* ---------------- HEADER ---------------- */

  const logoPath = path.join(process.cwd(), "public/logo.png");
  const hasLogo = fs.existsSync(logoPath);

  if (hasLogo) {
    doc.image(logoPath, pageLeft, 26, { width: 110 });
  } else {
    doc.font(FONT.bold).fontSize(22).fillColor(COLORS.black).text("MPACT", pageLeft, 28);
    doc.font(FONT.bold).fontSize(7).text("TM", pageLeft + 84, 26);
    doc.font(FONT.bold).fontSize(10).text("Pvt Ltd", pageLeft, 52);
  }

  doc
    .font(FONT.bold)
    .fontSize(16)
    .fillColor(COLORS.black)
    .text("TAX INVOICE", pageLeft, 28, { width: contentWidth, align: "right" });

  const metaLine = (label, value, top) => {
    const labelText = `${label} `;
    doc.font(FONT.bold).fontSize(8.5).fillColor(COLORS.black);
    const labelWidth = doc.widthOfString(labelText);
    doc.font(FONT.regular);
    const valueWidth = doc.widthOfString(value);
    const startX = pageRight - (labelWidth + valueWidth);

    doc.font(FONT.bold).text(labelText, startX, top, { continued: true });
    doc.font(FONT.regular).text(value);
  };

  metaLine("Invoice No:", invoiceNumber, 50);
  metaLine("Date:", new Date(order.createdAt).toLocaleDateString("en-GB"), 63);

  dashedLine(doc, pageLeft, 84, pageRight);

  /* ---------------- COMPANY BLOCK (left) + BILL TO (right) ---------------- */

  let leftY = 98;
  let rightY = 98;

  doc.font(FONT.bold).fontSize(10.5).fillColor(COLORS.black).text("MPACT", pageLeft, leftY);
  leftY += 16;

  const infoLine = (icon, text) => {
    if (icon) icon(doc, pageLeft, leftY);
    doc
      .font(FONT.regular)
      .fontSize(8.5)
      .fillColor(COLORS.black)
      .text(text, pageLeft + (icon ? 15 : 0), leftY + 1);
    leftY += 15;
  };

  infoLine(null, "GST : 32GRGPM6809G1ZO");
  infoLine(drawPinIcon, "Kerala, India");
  infoLine(drawMailIcon, "Email: support@mpact.in");
  infoLine(drawPhoneIcon, "Phone: 8075711893");

  const addr = order.shippingAddress || {};
  const customerName = addr.name || "Customer";

  doc.font(FONT.bold).fontSize(9).fillColor(COLORS.black).text(`BILL TO: ${customerName}`, rightColX, rightY, { underline: true });
  rightY += 18;

  const billLines = [
    addr.address || "—",
    `${addr.city || "—"}, ${addr.state || ""} - ${addr.pincode || "—"}`,
    `Phone: ${addr.phone || "—"}`,
  ];

  doc.font(FONT.regular).fontSize(8.5).fillColor(COLORS.black);
  billLines.forEach((line) => {
    doc.text(line, rightColX, rightY, { width: rightColWidth });
    rightY += 14;
  });

  if (extraMeta && extraMeta.length) {
    rightY += 4;
    extraMeta.forEach(({ label, value }) => {
      doc.font(FONT.bold).fontSize(8.5).fillColor(COLORS.black);
      doc.text(`${label} `, rightColX, rightY, { continued: true, width: rightColWidth });
      doc.font(FONT.regular).text(value);
      rightY += 14;
    });
  }

  let y = Math.max(leftY, rightY) + 14;

  doc
    .moveTo(pageLeft, y)
    .lineTo(pageRight, y)
    .strokeColor(COLORS.line)
    .lineWidth(1.4)
    .stroke();

  y += 14;

  /* ---------------- TABLE ---------------- */

  const col = {
    item: { x: pageLeft, width: contentWidth * 0.42 },
    qty: { x: pageLeft + contentWidth * 0.42, width: contentWidth * 0.15 },
    price: { x: pageLeft + contentWidth * 0.57, width: contentWidth * 0.22 },
    total: { x: pageLeft + contentWidth * 0.79, width: contentWidth * 0.21 },
  };

  const headerRowHeight = 22;

  doc.rect(pageLeft, y, contentWidth, headerRowHeight).fillColor(COLORS.black).fill();

  doc
    .font(FONT.bold)
    .fontSize(9)
    .fillColor(COLORS.white)
    .text("ITEM", col.item.x + 10, y + 7, { width: col.item.width - 10 })
    .text("QTY", col.qty.x, y + 7, { width: col.qty.width, align: "center" })
    .text("PRICE", col.price.x, y + 7, { width: col.price.width, align: "center" })
    .text("TOTAL", col.total.x, y + 7, { width: col.total.width - 10, align: "right" });

  let rowY = y + headerRowHeight;
  const rowHeight = 26;

  doc.font(FONT.regular).fontSize(9);

  order.orderItems.forEach((item) => {
    doc
      .fillColor(COLORS.black)
      .text(item.name, col.item.x + 10, rowY + 8, { width: col.item.width - 16 })
      .text(String(item.quantity), col.qty.x, rowY + 8, { width: col.qty.width, align: "center" })
      .text(money(item.price), col.price.x, rowY + 8, { width: col.price.width, align: "center" })
      .text(money(item.price * item.quantity), col.total.x, rowY + 8, {
        width: col.total.width - 10,
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

  const totalsBoxWidth = contentWidth * 0.56;
  const totalsBoxX = pageRight - totalsBoxWidth;
  const totalsLabelX = totalsBoxX + 12;
  const totalsValueWidth = totalsBoxWidth - 24;
  const totalsRowHeight = 22;

  let totalsY = tableBottom + 18;
  const totalsBoxTop = totalsY;

  const totalsRow = (label, value, opts = {}) => {
    if (opts.dark) {
      doc.rect(totalsBoxX, totalsY, totalsBoxWidth, 26).fillColor(COLORS.black).fill();
    }
    doc
      .font(opts.bold ? FONT.bold : FONT.regular)
      .fontSize(opts.bold ? 11 : 9)
      .fillColor(opts.dark ? COLORS.white : COLORS.black)
      .text(label, totalsLabelX, totalsY + (opts.dark ? 8 : 7))
      .text(value, totalsLabelX, totalsY + (opts.dark ? 8 : 7), {
        width: totalsValueWidth,
        align: "right",
      });
    totalsY += opts.dark ? 26 : totalsRowHeight;
  };

  totalsRow("Subtotal", money(subtotal));
  totalsRow("CGST (5%)", money(cgst));
  totalsRow("SGST (5%)", money(sgst));
  totalsRow("GRAND TOTAL", money(order.totalAmount), { bold: true, dark: true });

  const totalsBoxBottom = totalsY;

  doc
    .rect(totalsBoxX, totalsBoxTop, totalsBoxWidth, totalsBoxBottom - totalsBoxTop)
    .strokeColor(COLORS.line)
    .lineWidth(1)
    .stroke();

  [totalsBoxTop + totalsRowHeight, totalsBoxTop + totalsRowHeight * 2].forEach((lineY) => {
    doc.moveTo(totalsBoxX, lineY).lineTo(pageRight, lineY).strokeColor(COLORS.lightLine).stroke();
  });

  /* ---------------- FOOTER ---------------- */

  const footerY = doc.page.height - doc.page.margins.bottom - 36;

  dashedLine(doc, pageLeft, footerY - 12, pageRight);

  doc
    .font(FONT.bold)
    .fontSize(10)
    .fillColor(COLORS.black)
    .text("Thank you for choosing MPACT!", pageLeft, footerY, { width: contentWidth, align: "center" });

  doc
    .font(FONT.regular)
    .fontSize(8.5)
    .fillColor(COLORS.gray)
    .text("For any queries, contact us at support@mpact.in", pageLeft, footerY + 14, {
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
      size: "A5",
      margin: 28,
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
      size: "A5",
      margin: 28,
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