import puppeteer from "puppeteer";
import Order from "../models/Order.js";
import { invoiceTemplate } from "../utils/invoiceTemplate.js";

export const downloadInvoice = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order || order.paymentStatus !== "paid") {
    return res.status(400).json({ message: "Invoice not available" });
  }

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.setContent(invoiceTemplate(order), {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${order._id}.pdf`
  );

  res.send(pdf);
};
