import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { Input } from '../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';

const initialOrders = [
  {
    id: '#ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    product: 'Wireless Headphones',
    quantity: 1,
    amount: 129.99,
    status: 'Delivered',
    date: '2026-01-05',
    address: '123 Main St, New York, NY 10001',
  },
  {
    id: '#ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    product: 'Smart Watch',
    quantity: 2,
    amount: 599.98,
    status: 'Processing',
    date: '2026-01-06',
    address: '456 Oak Ave, Los Angeles, CA 90001',
  },
  {
    id: '#ORD-003',
    customer: 'Bob Johnson',
    email: 'bob@example.com',
    product: 'Laptop Stand',
    quantity: 3,
    amount: 149.97,
    status: 'Shipped',
    date: '2026-01-06',
    address: '789 Pine Rd, Chicago, IL 60601',
  },
  {
    id: '#ORD-004',
    customer: 'Alice Brown',
    email: 'alice@example.com',
    product: 'USB-C Cable',
    quantity: 5,
    amount: 99.95,
    status: 'Delivered',
    date: '2026-01-07',
    address: '321 Elm St, Houston, TX 77001',
  },
  {
    id: '#ORD-005',
    customer: 'Charlie Wilson',
    email: 'charlie@example.com',
    product: 'Phone Case',
    quantity: 1,
    amount: 24.99,
    status: 'Pending',
    date: '2026-01-08',
    address: '654 Maple Dr, Phoenix, AZ 85001',
  },
];

export function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

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
            <SelectItem value="all" className="text-white">
              All Orders
            </SelectItem>
            <SelectItem value="Pending" className="text-white">
              Pending
            </SelectItem>
            <SelectItem value="Processing" className="text-white">
              Processing
            </SelectItem>
            <SelectItem value="Shipped" className="text-white">
              Shipped
            </SelectItem>
            <SelectItem value="Delivered" className="text-white">
              Delivered
            </SelectItem>
            <SelectItem value="Cancelled" className="text-white">
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
                <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-sm font-medium text-white">{order.id}</td>
                  <td className="py-3 px-4 text-sm text-white">{order.customer}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{order.product}</td>
                  <td className="py-3 px-4 text-sm text-white">{order.quantity}</td>
                  <td className="py-3 px-4 text-sm font-medium text-yellow-400">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">{order.date}</td>

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
                                <p className="font-medium text-white">{selectedOrder.id}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">Date</p>
                                <p className="font-medium text-white">{selectedOrder.date}</p>
                              </div>
                            </div>

                            <div className="border-t border-gray-700 pt-4">
                              <h4 className="font-semibold text-white mb-2">Customer Information</h4>
                              <div className="space-y-2">
                                <div>
                                  <p className="text-sm text-gray-400">Name</p>
                                  <p className="text-white">{selectedOrder.customer}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-400">Email</p>
                                  <p className="text-white">{selectedOrder.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-400">Shipping Address</p>
                                  <p className="text-white">{selectedOrder.address}</p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-gray-700 pt-4">
                              <h4 className="font-semibold text-white mb-2">Order Items</h4>
                              <div className="bg-[#1a1a1a] p-3 rounded-md border border-gray-800">
                                <div className="flex justify-between mb-1">
                                  <span className="text-white">{selectedOrder.product}</span>
                                  <span className="text-gray-400">×{selectedOrder.quantity}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-white">
                                  <span>Total</span>
                                  <span className="text-yellow-400">
                                    ${selectedOrder.amount.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-gray-700 pt-4">
                              <h4 className="font-semibold text-white mb-2">Update Status</h4>
                              <Select
                                value={selectedOrder.status}
                                onValueChange={(value) => updateOrderStatus(selectedOrder.id, value)}
                              >
                                <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#2a2a2a] border-gray-700">
                                  <SelectItem value="Pending" className="text-white">Pending</SelectItem>
                                  <SelectItem value="Processing" className="text-white">Processing</SelectItem>
                                  <SelectItem value="Shipped" className="text-white">Shipped</SelectItem>
                                  <SelectItem value="Delivered" className="text-white">Delivered</SelectItem>
                                  <SelectItem value="Cancelled" className="text-white">Cancelled</SelectItem>
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
          const count = orders.filter((o) => o.status === status).length;
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
