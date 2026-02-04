import React, { useEffect, useState } from 'react';
import api from "../api/axios";
import { Search, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { Input } from '../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';
import toast from "react-hot-toast";

export function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  const normalizeStatus = (status) => {
    const map = {
      initiated: "Pending",
      placed: "Processing",
      packed: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled"
    };
    return map[status] || status;
  };

  const formatINR = (num) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(num);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderItems.some(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      filterStatus === "all" ||
      normalizeStatus(order.orderStatus) === filterStatus;


    return matchesSearch && matchesStatus;
  });


  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-900/50 text-green-400 border border-green-700';
      case 'Shipped':
        return 'bg-blue-900/50 text-blue-400 border border-blue-700';
      case 'Processing':
        return 'bg-yellow-900/50 text-yellow-400 border border-yellow-700';
      case 'Pending':
        return 'bg-orange-900/50 text-orange-400 border border-orange-700';
      case 'Cancelled':
        return 'bg-red-900/50 text-red-400 border border-red-700';
      default:
        return 'bg-gray-900/50 text-gray-400 border border-gray-700';
    }
  };


  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/api/admin/orders");
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const denormalizeStatus = (status) => {
    const map = {
      Pending: "initiated",
      Processing: "placed",
      Shipped: "shipped",
      Cancelled: "cancelled"
    };
    return map[status];
  };


  // const updateOrderStatus = async (orderId, newStatus) => {
  //   if (newStatus === "Delivered") return;
  //   try {
  //     await api.put(`/api/admin/orders/${orderId}/status`, {
  //       status: denormalizeStatus(newStatus)
  //     });

  //     fetchOrders();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


const updateOrderStatus = async (orderId, newStatus) => {
  const backendStatus = denormalizeStatus(newStatus);

  // 🔥 Optimistic UI update
  setOrders((prev) =>
    prev.map((o) =>
      o._id === orderId
        ? { ...o, orderStatus: backendStatus }
        : o
    )
  );

  try {
    await api.put(`/api/admin/orders/${orderId}/status`, {
      status: backendStatus
    });

    toast.success(`Order marked as ${newStatus}`);
  } catch (err) {
    toast.error("Failed to update order status");

    // ❌ rollback on error
    fetchOrders();
  }
};







  if (loading) {
    return <div className="text-white">Loading orders...</div>;
  }
  if (!orders.length) {
    return <div className="text-gray-400">No orders found</div>;
  }




  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48 bg-[#2a2a2a] border-gray-700 text-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-[#2a2a2a] border-gray-700">
            <SelectItem value="all" className="text-white hover:cursor-pointer">
              All Orders
            </SelectItem>
            <SelectItem value="Pending" className="text-white hover:cursor-pointer">
              Pending
            </SelectItem>
            <SelectItem value="Processing" className="text-white hover:cursor-pointer">
              Processing
            </SelectItem>
            <SelectItem value="Shipped" className="text-white hover:cursor-pointer">
              Shipped
            </SelectItem>
            <SelectItem value="Delivered" className="text-white hover:cursor-pointer">
              Delivered
            </SelectItem>
            <SelectItem value="Cancelled" className="text-white hover:cursor-pointer">
              Cancelled
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a1a] border-b border-gray-700">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Product</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Quantity</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-sm font-medium text-white">{order._id}</td>
                  <td className="py-3 px-4 text-sm text-white">{order.user?.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{order.orderItems[0]?.name}</td>
                  <td className="py-3 px-4 text-sm text-white">{order.orderItems.reduce((s, i) => s + i.quantity, 0)}</td>
                  <td className="py-3 px-4 text-sm font-medium text-yellow-400">
                    {formatINR(order.totalAmount)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        normalizeStatus(order.orderStatus)
                      )}`}
                    >
                      {normalizeStatus(order.orderStatus)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>

                  <td className="py-3 px-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-md transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                      </DialogTrigger>

                      <DialogContent className="max-w-lg bg-[#2a2a2a] border-gray-700 text-white">
                        <DialogHeader>
                          <DialogTitle className="text-white">Order Details</DialogTitle>
                        </DialogHeader>

                        {selectedOrder && (
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-400">Order ID</p>
                                <p className="font-medium text-white">{selectedOrder._id}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">Date</p>
                                <p className="font-medium text-white">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                              </div>
                            </div>

                            <div className="border-t border-gray-700 pt-4">
                              <h4 className="font-semibold text-white mb-2">Customer Information</h4>
                              <div className="space-y-2">
                                <div>
                                  <p className="text-sm text-gray-400">Name</p>
                                  <p className="text-white">{selectedOrder.user?.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-400">Email</p>
                                  <p className="text-white">{selectedOrder.user?.email}</p>
                                </div>
                                {/* <div>
                                  <p className="text-sm text-gray-400">Shipping Address</p>
                                  <p className="text-white">{selectedOrder.shippingAddress.address}</p>
                                </div> */}
                                <div className="space-y-2">
                                  <div>
                                    <p className="text-sm text-gray-400">Address</p>
                                    <p className="text-white">
                                      {selectedOrder.shippingAddress?.address || "—"}
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-gray-400">City</p>
                                      <p className="text-white">
                                        {selectedOrder.shippingAddress?.city || "—"}
                                      </p>
                                    </div>

                                    <div>
                                      <p className="text-sm text-gray-400">Pincode</p>
                                      <p className="text-white">
                                        {selectedOrder.shippingAddress?.pincode || "—"}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <p className="text-sm text-gray-400">Phone</p>
                                    <p className="text-white">
                                      {selectedOrder.shippingAddress?.phone || "—"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-gray-700 pt-4">
                              <h4 className="font-semibold text-white mb-2">Order Items</h4>
                              <div className="bg-[#1a1a1a] p-3 rounded-md border border-gray-800">
                                {/* <div className="flex justify-between mb-1">
                                  <span className="text-white">{selectedOrder.product}</span>
                                  <span className="text-gray-400">×{selectedOrder.quantity}</span>
                                </div> */}
                                {selectedOrder.orderItems.map((item) => (
                                  <div key={item._id} className="flex justify-between">
                                    <span>{item.name}</span>
                                    <span>×{item.quantity}</span>
                                  </div>
                                ))}


                                <div className="flex justify-between font-semibold text-white">
                                  <span>Total</span>
                                  <span className="text-yellow-400">
                                    {formatINR(selectedOrder.totalAmount)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-gray-700 pt-4">
                              <h4 className="font-semibold text-white mb-2">Update Status</h4>
                              <Select
                                value={normalizeStatus(selectedOrder.orderStatus)}
                                onValueChange={(value) =>
                                  updateOrderStatus(selectedOrder._id, value)
                                }
                              >

                                <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#2a2a2a] border-gray-700">
                                  <SelectItem value="Pending" className="text-white hover:cursor-pointer">Pending</SelectItem>
                                  <SelectItem value="Processing" className="text-white hover:cursor-pointer">Processing</SelectItem>
                                  <SelectItem value="Shipped" className="text-white hover:cursor-pointer">Shipped</SelectItem>
                                  <SelectItem value="Delivered" className="text-white hover:cursor-pointer" disabled>Delivered</SelectItem>
                                  <SelectItem value="Cancelled" className="text-white hover:cursor-pointer">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => {
          // const count = orders.filter((o) => o.status === status).length;
          const count = orders.filter(
            (o) => normalizeStatus(o.orderStatus) === status
          ).length;


          return (
            <div key={status} className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-4">
              <p className="text-sm text-gray-400">{status}</p>
              <p className="text-2xl font-bold text-white mt-1">{count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
