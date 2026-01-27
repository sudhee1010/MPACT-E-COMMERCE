import { useEffect, useState } from "react";
import { getMyOrdersApi } from "../api/ordersApi";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrdersApi().then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map(order => (
        <div key={order._id}>
          <p>Order #{order._id}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <Link to={`/orders/${order._id}`}>View</Link>
        </div>
      ))}
    </div>
  );
}
