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

    // Generate Invoice Number
    const invoiceNumber = `INV-${order._id.toString().slice(-6).toUpperCase()}`;

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoiceNumber}.pdf`
    );

    doc.pipe(res);

    /* =======================
       LOGO + HEADER
    ======================== */

    const logoPath = path.join(process.cwd(), "public/logo.png"); // place logo here

    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 40, 40, { width: 120 });
    }

    doc
      .fontSize(22)
      .text("TAX INVOICE", 400, 50, { align: "right" });

    doc
      .fontSize(10)
      .text(`Invoice No: ${invoiceNumber}`, { align: "right" })
      .text(`Date: ${new Date(order.createdAt).toLocaleDateString("en-IN")}`, {
        align: "right",
      });

    doc.moveDown(4);

    /* =======================
       COMPANY DETAILS
    ======================== */

    doc
      .fontSize(11)
      .text("MPACT Pvt Ltd")
      .text("GSTIN: 32ABCDE1234F1Z5")
      .text("Kerala, India")
      .text("Email: support@mpact.com");

    doc.moveDown();

    /* =======================
       BILL TO
    ======================== */

    doc.fontSize(12).text("Bill To:", { underline: true });
    doc
      .fontSize(11)
      .text(order.shippingAddress.name || "Customer")
      .text(order.shippingAddress.address)
      .text(
        `${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`
      )
      .text(`Phone: ${order.shippingAddress.phone}`);

    doc.moveDown(2);

    /* =======================
       TABLE HEADER
    ======================== */

    const tableTop = doc.y;
    const itemX = 40;
    const qtyX = 300;
    const priceX = 350;
    const totalX = 450;

    doc
      .fontSize(11)
      .text("Item", itemX, tableTop)
      .text("Qty", qtyX, tableTop)
      .text("Price", priceX, tableTop)
      .text("Total", totalX, tableTop);

    doc.moveTo(40, tableTop + 15).lineTo(550, tableTop + 15).stroke();

    let position = tableTop + 25;

    /* =======================
       TABLE ROWS
    ======================== */

    order.orderItems.forEach((item) => {
      doc
        .fontSize(10)
        .text(item.name, itemX, position)
        .text(item.quantity, qtyX, position)
        .text(`₹ ${item.price.toFixed(2)}`, priceX, position)
        .text(`₹ ${(item.price * item.quantity).toFixed(2)}`, totalX, position);

      position += 20;
    });

    doc.moveDown(2);

    /* =======================
       GST CALCULATION
    ======================== */

    const subtotal = order.totalAmount - order.taxAmount;
    const gstRate = 18; // example GST %
    const cgst = order.taxAmount / 2;
    const sgst = order.taxAmount / 2;

    position += 20;

    doc
      .fontSize(11)
      .text(`Subtotal: ₹ ${subtotal.toFixed(2)}`, 350, position);

    position += 20;

    doc.text(`CGST (9%): ₹ ${cgst.toFixed(2)}`, 350, position);
    position += 20;

    doc.text(`SGST (9%): ₹ ${sgst.toFixed(2)}`, 350, position);
    position += 20;

    doc
      .fontSize(13)
      .text(`Total: ₹ ${order.totalAmount.toFixed(2)}`, 350, position, {
        underline: true,
      });

    doc.moveDown(4);

    /* =======================
       FOOTER
    ======================== */

    doc
      .fontSize(10)
      .text(
        "This is a computer-generated invoice. No signature required.",
        40,
        750,
        { align: "center" }
      );

    doc.end();
  } catch (error) {
    console.error("Invoice generation error:", error);
    res.status(500).json({ message: "Failed to generate invoice" });
  }
};
