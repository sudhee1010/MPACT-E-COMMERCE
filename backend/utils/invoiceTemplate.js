export const invoiceTemplate = (order) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
      color: #333;
    }
    h1 {
      text-align: right;
    }
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
    .box {
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }
    th {
      background: #f3f3f3;
    }
    .total {
      text-align: right;
      font-weight: bold;
      font-size: 16px;
    }
  </style>
</head>

<body>
  <div class="header">
    <div>
      <h2>MPACT</h2>
      <p>Official Invoice</p>
    </div>
    <h1>INVOICE</h1>
  </div>

  <div class="box">
    <strong>Order ID:</strong> ${order._id}<br/>
    <strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString("en-IN")}<br/>
    <strong>Status:</strong> PAID
  </div>

  <div class="box">
    <strong>Bill To:</strong><br/>
    ${order.shippingAddress.address}<br/>
    ${order.shippingAddress.city} - ${order.shippingAddress.pincode}<br/>
    Phone: ${order.shippingAddress.phone}
  </div>

  <table>
    <tr>
      <th>Item</th>
      <th>Qty</th>
      <th>Price</th>
      <th>Total</th>
    </tr>
    ${order.orderItems.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>₹ ${item.price}</td>
        <td>₹ ${item.price * item.quantity}</td>
      </tr>
    `).join("")}
  </table>

  <p class="total">Subtotal: ₹ ${order.totalAmount - order.taxAmount}</p>
  <p class="total">Tax: ₹ ${order.taxAmount}</p>
  <p class="total">Total: ₹ ${order.totalAmount}</p>

  <p style="text-align:center;margin-top:40px">
    Thank you for shopping with MPACT!
  </p>
</body>
</html>
`;
