import jsPDF from "jspdf";

export const generateInvoice = (order) => {
  const doc = new jsPDF("p", "mm", "a4");

  /* ===== COLORS ===== */
  const bg = [46, 46, 46];
  const white = [255, 255, 255];
  const grey = [180, 180, 180];

  /* ===== PAGE BG ===== */
  doc.setFillColor(...bg);
  doc.rect(0, 0, 210, 297, "F");

  doc.setDrawColor(255);
  doc.rect(8, 8, 194, 281);

  /* ===== ORDERED BY ===== */
  doc.setFontSize(11);
  doc.setTextColor(...white);
  doc.text("Ordered By", 14, 20);

  doc.setFontSize(16);
  doc.text("Gokul", 14, 28);

  doc.setFontSize(10);
  doc.text("1456 Veltri Drive,", 14, 35);
  doc.text("Anchorage, AK 99502", 14, 41);

  /* ===== BARCODE BOX ===== */
  doc.rect(120, 16, 72, 28);
  doc.setFontSize(9);
  doc.text(order.id, 140, 46);

  /* ===== DIVIDER ===== */
  doc.line(14, 50, 196, 50);

  /* ===== ORDER DETAILS ===== */
  doc.setFontSize(12);
  doc.text("Order Details", 14, 60);

  doc.setFontSize(10);
  doc.text("Name : Product name", 14, 70);
  doc.text("SKU : #" + order.id, 14, 77);
  doc.text("Color : Vivid blue", 14, 84);
  doc.text("Order Date : " + order.date, 14, 91);

  doc.text("Size : Small", 120, 70);
  doc.text("Order ID : #" + order.id, 120, 77);
  doc.text("Quantity : " + order.qty, 120, 84);
  doc.text("Invoice Date : " + order.date, 120, 91);

  /* ===== TABLE HEADER ===== */
  doc.line(14, 98, 196, 98);

  doc.text("Description", 14, 106);
  doc.text("Price", 70, 106);
  doc.text("Qty", 95, 106);
  doc.text("GSTIN", 115, 106);
  doc.text("Discount", 140, 106);
  doc.text("Total", 170, 106);

  /* ===== TABLE ROW 1 ===== */
  doc.text(order.product, 14, 116);
  doc.text("₹" + order.price, 70, 116);
  doc.text(String(order.qty), 95, 116);
  doc.text("18%", 115, 116);
  doc.text("-₹0.00", 140, 116);
  doc.text("₹" + order.price * order.qty, 170, 116);

  /* ===== TABLE ROW 2 ===== */
  doc.text("Other Cost", 14, 126);
  doc.text("₹340", 70, 126);
  doc.text("1", 95, 126);
  doc.text("18%", 115, 126);
  doc.text("-₹0.00", 140, 126);
  doc.text("₹340", 170, 126);

  doc.line(14, 132, 196, 132);

  /* ===== TOTAL ===== */
  doc.setFontSize(14);
  doc.text("Total", 14, 142);
  doc.text("₹1000", 170, 142);

  doc.line(14, 148, 196, 148);

  /* ===== SOLD / DELIVERED ===== */
  doc.setFontSize(11);
  doc.text("Sold By", 14, 158);
  doc.text("Delivered To", 120, 158);

  doc.setFontSize(13);
  doc.text("AJX Cloths", 14, 166);
  doc.text("Suman Modi", 120, 166);

  doc.setFontSize(10);
  doc.text("1456 Veltri Drive,", 14, 173);
  doc.text("Anchorage, AK 99502", 14, 179);

  doc.text("1456 Veltri Drive,", 120, 173);
  doc.text("Anchorage, AK 99502", 120, 179);

  doc.line(14, 186, 196, 186);

  /* ===== NOTE ===== */
  doc.setFontSize(11);
  doc.text("Note", 14, 196);

  doc.setFontSize(9);
  doc.text(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet\n" +
    "justo ipsum. Sed accumsan quam vitae est varius fringilla.\n" +
    "Pellentesque placerat vestibulum lorem sed porta.",
    14,
    204
  );

  /* ===== SAVE ===== */
  doc.save(`Invoice_${order.id}.pdf`);
};
