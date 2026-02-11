// import puppeteer from "puppeteer";
// import Order from "../models/Order.js";
// import { invoiceTemplate } from "../utils/invoiceTemplate.js";

// export const downloadInvoice = async (req, res) => {
//   const order = await Order.findById(req.params.id);

//   if (!order || order.paymentStatus !== "paid") {
//     return res.status(400).json({ message: "Invoice not available" });
//   }

//   const browser = await puppeteer.launch({ headless: "new" });
//   const page = await browser.newPage();

//   await page.setContent(invoiceTemplate(order), {
//     waitUntil: "networkidle0",
//   });

//   const pdf = await page.pdf({
//     format: "A4",
//     printBackground: true,
//   });

//   await browser.close();

//   res.setHeader("Content-Type", "application/pdf");
//   res.setHeader(
//     "Content-Disposition",
//     `attachment; filename=invoice-${order._id}.pdf`
//   );

//   res.send(pdf);
// };



import PDFDocument from "pdfkit";
import Order from "../models/Order.js";
import path from "path";
import fs from "fs";

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

    /* ================= HEADER ================= */

    const logoPath = path.join(process.cwd(), "public/logo.png");

    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 40, 40, { width: 100 });
    }

    doc
      .fontSize(18)
      .text("TAX INVOICE", 0, 40, { align: "right" });

    doc
      .fontSize(10)
      .text(`Invoice No: ${invoiceNumber}`, { align: "right" })
      .text(
        `Date: ${new Date(order.createdAt).toLocaleDateString("en-IN")}`,
        { align: "right" }
      );

    doc.moveDown(2);

    /* ================= COMPANY ================= */

    doc
      .fontSize(11)
      .text("MPACT Pvt Ltd")
      .text("GSTIN: 32ABCDE1234F1Z5")
      .text("Kerala, India")
      .text("Email: support@mpact.com");

    doc.moveDown(1.5);

    /* ================= BILL TO ================= */

    doc.fontSize(12).text("Bill To:", { underline: true });

    doc
      .fontSize(10)
      .text(order.shippingAddress.name || "Customer")
      .text(order.shippingAddress.address)
      .text(
        `${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`
      )
      .text(`Phone: ${order.shippingAddress.phone}`);

    doc.moveDown(1.5);

    /* ================= TABLE ================= */

    const tableTop = doc.y + 5;
    const itemX = 40;
    const qtyX = 300;
    const priceX = 360;
    const totalX = 450;

    doc
      .fontSize(11)
      .text("Item", itemX, tableTop)
      .text("Qty", qtyX, tableTop)
      .text("Price", priceX, tableTop)
      .text("Total", totalX, tableTop);

    doc
      .moveTo(40, tableTop + 12)
      .lineTo(550, tableTop + 12)
      .stroke();

    let position = tableTop + 20;

    order.orderItems.forEach((item) => {
      doc
        .fontSize(10)
        .text(item.name, itemX, position, { width: 240 })
        .text(item.quantity, qtyX, position)
        .text(`RS:- ${item.price.toFixed(2)}`, priceX, position)
        .text(
          `RS:- ${(item.price * item.quantity).toFixed(2)}`,
          totalX,
          position
        );

      position += 18;
    });

    /* ================= TOTAL ================= */

    const subtotal = order.totalAmount - order.taxAmount;
    const cgst = order.taxAmount / 2;
    const sgst = order.taxAmount / 2;

    position += 15;

    doc
      .fontSize(10)
      .text(`Subtotal: RS:- ${subtotal.toFixed(2)}`, 350, position);

    position += 16;
    doc.text(`CGST (9%): RS:- ${cgst.toFixed(2)}`, 350, position);

    position += 16;
    doc.text(`SGST (9%): RS:- ${sgst.toFixed(2)}`, 350, position);

    position += 18;
    doc
      .fontSize(12)
      .text(`Grand Total: RS:- ${order.totalAmount.toFixed(2)}`, 350, position, {
        underline: true,
      });

    /* ================= FOOTER ================= */

    const footerY = 760;

    doc
      .fontSize(9)
      .text(
        "This is a computer-generated invoice. No signature required.",
        40,
        footerY,
        { align: "center" }
      );

    doc.end();
  } catch (error) {
    console.error("Invoice generation error:", error);
    res.status(500).json({ message: "Failed to generate invoice" });
  }
};
