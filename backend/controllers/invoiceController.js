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

function numberToWords(amount) {
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  if (amount < 20) return a[amount];
  if (amount < 100) return b[Math.floor(amount / 10)] + " " + a[amount % 10];
  if (amount < 1000)
    return a[Math.floor(amount / 100)] + " Hundred " + numberToWords(amount % 100);

  return amount;
}

export const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order || order.paymentStatus !== "paid") {
      return res.status(400).json({ message: "Invoice not available" });
    }

    const invoiceNumber = `MP-${new Date().getFullYear()}-${order._id
      .toString()
      .slice(-5)
      .toUpperCase()}`;

    const doc = new PDFDocument({ margin: 40 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoiceNumber}.pdf`
    );
    doc.pipe(res);

    /* ================= HEADER ================= */

    doc.fontSize(18).text("TAX INVOICE", { align: "center" });
    doc.moveDown();

    doc.fontSize(11)
      .text("MPACT Pvt Ltd")
      .text("GSTIN: 32ABCDE1234F1Z5")
      .text("Kerala, India")
      .text("Email: support@mpact.com");

    doc.moveDown();

    doc.text(`Invoice No: ${invoiceNumber}`, { align: "right" });
    doc.text(`Invoice Date: ${new Date(order.createdAt).toLocaleDateString("en-IN")}`, { align: "right" });

    doc.moveDown();

    /* ================= BILL TO ================= */

    doc.text("Bill To:", { underline: true });
    doc.text(order.shippingAddress.name || "Customer");
    doc.text(order.shippingAddress.address);
    doc.text(
      `${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`
    );
    doc.moveDown(2);

    /* ================= TABLE ================= */

    const tableTop = doc.y;
    const col = {
      item: 40,
      hsn: 200,
      qty: 260,
      rate: 310,
      taxable: 360,
      cgst: 430,
      sgst: 490,
      total: 550
    };

    doc.fontSize(9)
      .text("Item", col.item, tableTop)
      .text("HSN", col.hsn, tableTop)
      .text("Qty", col.qty, tableTop)
      .text("Rate", col.rate, tableTop)
      .text("Taxable", col.taxable, tableTop)
      .text("CGST", col.cgst, tableTop)
      .text("SGST", col.sgst, tableTop)
      .text("Total", col.total, tableTop);

    doc.moveTo(40, tableTop + 15).lineTo(580, tableTop + 15).stroke();

    let position = tableTop + 25;

    const cgst = order.taxAmount / 2;
    const sgst = order.taxAmount / 2;

    order.orderItems.forEach((item) => {
      const taxable = item.price * item.quantity;
      const itemCGST = cgst / order.orderItems.length;
      const itemSGST = sgst / order.orderItems.length;

      doc.fontSize(8)
        .text(item.name, col.item, position)
        .text("1905", col.hsn, position) // example HSN
        .text(item.quantity, col.qty, position)
        .text(item.price.toFixed(2), col.rate, position)
        .text(taxable.toFixed(2), col.taxable, position)
        .text(itemCGST.toFixed(2), col.cgst, position)
        .text(itemSGST.toFixed(2), col.sgst, position)
        .text((taxable + itemCGST + itemSGST).toFixed(2), col.total, position);

      position += 20;
    });

    doc.moveDown(2);

    /* ================= TOTAL ================= */

    doc.fontSize(11);
    doc.text(`Subtotal: ₹ ${(order.totalAmount - order.taxAmount).toFixed(2)}`, { align: "right" });
    doc.text(`CGST (9%): ₹ ${cgst.toFixed(2)}`, { align: "right" });
    doc.text(`SGST (9%): ₹ ${sgst.toFixed(2)}`, { align: "right" });
    doc.fontSize(12).text(`Grand Total: ₹ ${order.totalAmount.toFixed(2)}`, { align: "right" });

    doc.moveDown();

    doc.text(
      `Amount in Words: ${numberToWords(
        Math.floor(order.totalAmount)
      )} Rupees Only`
    );

    doc.moveDown(2);

    /* ================= DECLARATION ================= */

    doc.fontSize(9).text(
      "Declaration: We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct."
    );

    doc.moveDown(4);

    doc.text("For MPACT Pvt Ltd", { align: "right" });
    doc.text("Authorized Signatory", { align: "right" });

    doc.end();
  } catch (error) {
    console.error("Invoice generation error:", error);
    res.status(500).json({ message: "Failed to generate invoice" });
  }
};
