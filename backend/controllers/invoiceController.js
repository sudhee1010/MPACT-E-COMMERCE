import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";
import Order from "../models/Order.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================================================
   Shared styling helpers
   ========================================================= */

const COLORS = {
  black: "#111111",
  white: "#ffffff",
  gray: "#555555",
  line: "#111111",
  lightLine: "#d9d9d9",
  yellow: "#FFD400",
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

// Prints a line of text and returns the y-position the next line should
// start at, based on the ACTUAL height the text needs (accounts for
// wrapping when a name/address/item is longer than the column).
const printLine = (doc, { x, y, width, text, font = FONT.regular, size = 8.5, color = COLORS.black, gap = 4 }) => {
  doc.font(font).fontSize(size).fillColor(color);
  const height = doc.heightOfString(text, { width });
  doc.text(text, x, y, { width });
  return y + height + gap;
};

/* ---------------- page border frame (matches provided UI) ---------------- */

const BORDER_INSET = 10;
const BORDER_WIDTH = 3;

const drawPageBorder = (doc) => {
  doc.save();
  doc
    .rect(
      BORDER_INSET,
      BORDER_INSET,
      doc.page.width - BORDER_INSET * 2,
      doc.page.height - BORDER_INSET * 2
    )
    .lineWidth(BORDER_WIDTH)
    .strokeColor(COLORS.black)
    .stroke();
  doc.restore();
};

/* ---------------- MPACT logo (SVG, pulled 1:1 from the supplied artwork) ---------------- */
// public/mpact-logo.svg is the actual logo pixels from the reference image,
// wrapped in an <svg><image .../></svg> so it can be dropped straight into
// the PDF via svg-to-pdfkit — this is what gives the true 1:1 match.
// The viewBox is 0 0 516 167, so height is derived from width to keep the
// exact aspect ratio of the source artwork.

const LOGO_SOURCE_WIDTH = 516;
const LOGO_SOURCE_HEIGHT = 167;
const LOGO_DISPLAY_WIDTH = 120;
const LOGO_DISPLAY_HEIGHT = LOGO_DISPLAY_WIDTH * (LOGO_SOURCE_HEIGHT / LOGO_SOURCE_WIDTH);

const drawSvgLogo = (doc, svgMarkup, x, y) => {
  // Passing an explicit height (not just width) matters here: svg-to-pdfkit
  // otherwise defaults the viewport height to the full page height and
  // vertically centers the artwork inside it, which pushes the logo way
  // down the page instead of anchoring it at (x, y).
  SVGtoPDF(doc, svgMarkup, x, y, {
    width: LOGO_DISPLAY_WIDTH,
    height: LOGO_DISPLAY_HEIGHT,
  });
  return y + LOGO_DISPLAY_HEIGHT;
};

/* ---------------- MPACT wordmark (last-resort vector fallback) ---------------- */
// Only used if neither public/logo.png nor public/mpact-logo.svg exist, so
// invoice generation never breaks even if the logo asset goes missing.

const drawWordmarkLogo = (doc, x, y) => {
  doc.save();
  doc
    .font(FONT.bold)
    .fontSize(34)
    .fillColor(COLORS.yellow)
    .strokeColor(COLORS.black)
    .lineWidth(2.4)
    .lineJoin("round")
    .text("MPACT", x, y, { characterSpacing: 1, fill: true, stroke: true });

  const wordWidth = doc.widthOfString("MPACT", { characterSpacing: 1 });

  doc
    .font(FONT.bold)
    .fontSize(9)
    .fillColor(COLORS.yellow)
    .strokeColor(COLORS.black)
    .lineWidth(0.8)
    .text("TM", x + wordWidth + 2, y - 2, { fill: true, stroke: true });

  doc.restore();

  // Returns the bottom-most y-coordinate the logo occupies, so the caller
  // can lay out whatever comes next without hard-coding offsets.
  return y + doc.heightOfString("MPACT", { width: 300 });
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
  const pageBottom = doc.page.height - doc.page.margins.bottom;

  const col = {
    item: { x: pageLeft, width: contentWidth * 0.42 },
    qty: { x: pageLeft + contentWidth * 0.42, width: contentWidth * 0.15 },
    price: { x: pageLeft + contentWidth * 0.57, width: contentWidth * 0.22 },
    total: { x: pageLeft + contentWidth * 0.79, width: contentWidth * 0.21 },
  };

  const drawTableHeaderRow = (topY) => {
    const headerRowHeight = 22;
    doc.rect(pageLeft, topY, contentWidth, headerRowHeight).fillColor(COLORS.black).fill();
    doc
      .font(FONT.bold)
      .fontSize(9)
      .fillColor(COLORS.white)
      .text("ITEM", col.item.x + 10, topY + 7, { width: col.item.width - 10 })
      .text("QTY", col.qty.x, topY + 7, { width: col.qty.width, align: "center" })
      .text("PRICE", col.price.x, topY + 7, { width: col.price.width, align: "center" })
      .text("TOTAL", col.total.x, topY + 7, { width: col.total.width - 10, align: "right" });
    return topY + headerRowHeight;
  };

  /* ---------------- HEADER ---------------- */

  const logoPngPath = path.join(process.cwd(), "../public/logo.png");
  const logoSvgPath = path.join(process.cwd(), "../public/mpact-logo.svg");
  const hasLogoPng = fs.existsSync(logoPngPath);
  const hasLogoSvg = fs.existsSync(logoSvgPath);

  if (hasLogoPng) {
    doc.image(logoPngPath, pageLeft, 22, { width: LOGO_DISPLAY_WIDTH });
  } else if (hasLogoSvg) {
    const svgMarkup = fs.readFileSync(logoSvgPath, "utf8");
    drawSvgLogo(doc, svgMarkup, pageLeft, 22);
  } else {
    drawWordmarkLogo(doc, pageLeft, 26);
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

  leftY = printLine(doc, { x: pageLeft, y: leftY, width: halfWidth - 12, text: "MPACT", font: FONT.bold, size: 10.5, gap: 6 });

  const infoLine = (icon, text) => {
    if (icon) icon(doc, pageLeft, leftY);
    const textWidth = halfWidth - 12 - (icon ? 15 : 0);
    leftY = printLine(doc, {
      x: pageLeft + (icon ? 15 : 0),
      y: leftY + 1,
      width: textWidth,
      text,
      gap: 4,
    });
  };

  infoLine(null, "GST : 32GRGPM6809G1ZO");
  infoLine(drawPinIcon, "Kerala, India");
  infoLine(drawMailIcon, "Email: support@mpact.in");
  infoLine(drawPhoneIcon, "Phone: 8891413187");

  const addr = order.shippingAddress || {};
  const customerName = addr.name || order.user?.name || "Customer";

  rightY = printLine(doc, {
    x: rightColX,
    y: rightY,
    width: rightColWidth,
    text: "BILL TO:",
    font: FONT.bold,
    size: 9,
    gap: 6,
  });
  // underline "BILL TO:" manually since printLine doesn't support the option
  doc
    .moveTo(rightColX, rightY - 6)
    .lineTo(rightColX + doc.widthOfString("BILL TO:"), rightY - 6)
    .strokeColor(COLORS.black)
    .lineWidth(0.6)
    .stroke();

  rightY = printLine(doc, {
    x: rightColX,
    y: rightY,
    width: rightColWidth,
    text: customerName,
    font: FONT.bold,
    size: 11,
    gap: 5,
  });

  const billLines = [
    addr.address || "—",
    `${addr.city || "—"}, ${addr.state || ""} - ${addr.pincode || "—"}`,
    `Phone: ${addr.phone || "—"}`,
  ];

  billLines.forEach((line) => {
    rightY = printLine(doc, { x: rightColX, y: rightY, width: rightColWidth, text: line, gap: 3 });
  });

  if (extraMeta && extraMeta.length) {
    rightY += 4;
    extraMeta.forEach(({ label, value }) => {
      const labelText = `${label} `;
      doc.font(FONT.bold).fontSize(8.5).fillColor(COLORS.black);
      const labelWidth = doc.widthOfString(labelText);
      const valueWidth = rightColWidth - labelWidth;
      const valueHeight = doc.font(FONT.regular).heightOfString(value, { width: valueWidth });

      // Explicit x-offset positions (rather than pdfkit's `continued` text
      // flow) so measuring the value's height beforehand can't disturb
      // where it actually gets drawn.
      doc.font(FONT.bold).text(labelText, rightColX, rightY, { width: labelWidth });
      doc.font(FONT.regular).text(value, rightColX + labelWidth, rightY, { width: valueWidth });

      rightY += Math.max(14, valueHeight + 4);
    });
  }

  let y = Math.max(leftY, rightY) + 10;

  doc
    .moveTo(pageLeft, y)
    .lineTo(pageRight, y)
    .strokeColor(COLORS.line)
    .lineWidth(1.4)
    .stroke();

  y += 14;

  /* ---------------- TABLE (with pagination for long item lists) ---------------- */

  const MIN_ROW_HEIGHT = 26;
  const ROW_TEXT_PAD = 8;
  const ROW_VERTICAL_PAD = 16;
  const BOTTOM_RESERVE = 20; // breathing room before the page edge while still adding rows

  const drawSegmentBorders = (top, bottom) => {
    doc.rect(pageLeft, top, contentWidth, bottom - top).strokeColor(COLORS.line).lineWidth(1).stroke();
    [col.qty.x, col.price.x, col.total.x].forEach((x) => {
      doc.moveTo(x, top).lineTo(x, bottom).strokeColor(COLORS.lightLine).stroke();
    });
  };

  let tableTop = drawTableHeaderRow(y);
  let segmentTop = y;
  let rowY = tableTop;

  doc.font(FONT.regular).fontSize(9);

  order.orderItems.forEach((item) => {
    const itemTextHeight = doc.heightOfString(item.name, { width: col.item.width - 16 });
    const rowHeight = Math.max(MIN_ROW_HEIGHT, itemTextHeight + ROW_VERTICAL_PAD);

    if (rowY + rowHeight > pageBottom - BOTTOM_RESERVE) {
      // Close out this segment's border *now*, while still on the page it belongs to,
      // then move to a new page for the rest of the table.
      drawSegmentBorders(segmentTop, rowY);
      doc.addPage();
      rowY = doc.page.margins.top;
      segmentTop = rowY;
      rowY = drawTableHeaderRow(rowY);
    }

    doc
      .font(FONT.regular)
      .fontSize(9)
      .fillColor(COLORS.black)
      .text(item.name, col.item.x + 10, rowY + ROW_TEXT_PAD, { width: col.item.width - 16 })
      .text(String(item.quantity), col.qty.x, rowY + ROW_TEXT_PAD, { width: col.qty.width, align: "center" })
      .text(money(item.price), col.price.x, rowY + ROW_TEXT_PAD, { width: col.price.width, align: "center" })
      .text(money(item.price * item.quantity), col.total.x, rowY + ROW_TEXT_PAD, {
        width: col.total.width - 10,
        align: "right",
      });

    rowY += rowHeight;
  });

  drawSegmentBorders(segmentTop, rowY);

  const tableBottom = rowY;

  /* ---------------- TOTALS BOX ---------------- */

  const itemsSubtotal = (order.orderItems || []).reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const subtotal = order.subtotal || itemsSubtotal;
  const discount = order.discount || 0;
  const hasDiscount = discount > 0;
  const cgst = (order.taxAmount || 0) / 2;
  const sgst = (order.taxAmount || 0) / 2;
  const shippingCharge = order.shippingCharge ?? 40;

  const totalsBoxWidth = contentWidth * 0.56;
  const totalsBoxX = pageRight - totalsBoxWidth;
  const totalsLabelX = totalsBoxX + 12;
  const totalsValueWidth = totalsBoxWidth - 24;
  const totalsRowHeight = 22;

  const plainRowsCount = hasDiscount ? 5 : 4;
  const TOTALS_BLOCK_HEIGHT = totalsRowHeight * plainRowsCount + 26; // plain rows + 1 dark grand-total row
  const FOOTER_BLOCK_HEIGHT = 60;
  const GAP_BEFORE_TOTALS = 18;

  let totalsY = tableBottom + GAP_BEFORE_TOTALS;

  // If the totals + footer won't fit on the current page, start a fresh page for them.
  if (totalsY + TOTALS_BLOCK_HEIGHT + FOOTER_BLOCK_HEIGHT > pageBottom) {
    doc.addPage();
    totalsY = doc.page.margins.top + GAP_BEFORE_TOTALS;
  }

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
  if (hasDiscount) {
    const couponLabel = order.appliedCoupon?.code ? `Discount (${order.appliedCoupon.code})` : "Discount";
    totalsRow(couponLabel, `- ${money(discount)}`);
  }
  totalsRow("CGST (2.5%)", money(cgst));
  totalsRow("SGST (2.5%)", money(sgst));
  totalsRow("Shipping Charge", money(shippingCharge));
  totalsRow("GRAND TOTAL", money(order.totalAmount), { bold: true, dark: true });

  const totalsBoxBottom = totalsY;

  doc
    .rect(totalsBoxX, totalsBoxTop, totalsBoxWidth, totalsBoxBottom - totalsBoxTop)
    .strokeColor(COLORS.line)
    .lineWidth(1)
    .stroke();

  for (let i = 1; i <= plainRowsCount - 1; i++) {
    const lineY = totalsBoxTop + totalsRowHeight * i;
    doc.moveTo(totalsBoxX, lineY).lineTo(pageRight, lineY).strokeColor(COLORS.lightLine).stroke();
  }

  /* ---------------- FOOTER ---------------- */

  // Sits near the bottom of whichever page the totals ended up on, but never
  // overlaps the totals box if that box runs long.
  const footerY = Math.max(doc.page.height - doc.page.margins.bottom - 36, totalsBoxBottom + 24);

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

    // Draws the black frame on this page and on every subsequent page the
    // pagination logic adds (long item lists / long totals blocks).
    doc.on("pageAdded", () => drawPageBorder(doc));
    drawPageBorder(doc);

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

    doc.on("pageAdded", () => drawPageBorder(doc));
    drawPageBorder(doc);

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