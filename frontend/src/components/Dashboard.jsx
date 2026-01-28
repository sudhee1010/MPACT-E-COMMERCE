import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Package } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const statsData = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-blue-500',
  },
  {
    title: 'Orders',
    value: '2,345',
    change: '+15.3%',
    trend: 'up',
    icon: ShoppingBag,
    color: 'bg-green-500',
  },
  {
    title: 'Customers',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'bg-purple-500',
  },
  {
    title: 'Products',
    value: '567',
    change: '-2.4%',
    trend: 'down',
    icon: Package,
    color: 'bg-orange-500',
  },
];

const salesData = [
  { month: 'Jan', sales: 4000, orders: 240 },
  { month: 'Feb', sales: 3000, orders: 180 },
  { month: 'Mar', sales: 5000, orders: 300 },
  { month: 'Apr', sales: 4500, orders: 270 },
  { month: 'May', sales: 6000, orders: 360 },
  { month: 'Jun', sales: 7000, orders: 420 },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', product: 'Wireless Headphones', amount: '$129.99', status: 'Completed' },
  { id: '#ORD-002', customer: 'Jane Smith', product: 'Smart Watch', amount: '$299.99', status: 'Processing' },
  { id: '#ORD-003', customer: 'Bob Johnson', product: 'Laptop Stand', amount: '$49.99', status: 'Shipped' },
  { id: '#ORD-004', customer: 'Alice Brown', product: 'USB-C Cable', amount: '$19.99', status: 'Completed' },
  { id: '#ORD-005', customer: 'Charlie Wilson', product: 'Phone Case', amount: '$24.99', status: 'Pending' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp size={16} className="text-yellow-400" />
                    ) : (
                      <TrendingDown size={16} className="text-red-400" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-yellow-400' : 'text-red-400'
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500">from last month</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #444', color: '#fff' }} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#fbbf24"
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Chart */}
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Orders Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #444', color: '#fff' }} />
              <Bar dataKey="orders" fill="#fbbf24" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Product</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-sm text-white">{order.id}</td>
                  <td className="py-3 px-4 text-sm text-white">{order.customer}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{order.product}</td>
                  <td className="py-3 px-4 text-sm font-medium text-yellow-400">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'Completed'
                          ? 'bg-green-900/50 text-green-400 border border-green-700'
                          : order.status === 'Processing'
                          ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-700'
                          : order.status === 'Shipped'
                          ? 'bg-blue-900/50 text-blue-400 border border-blue-700'
                          : 'bg-orange-900/50 text-orange-400 border border-orange-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}