import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, ShoppingBag, Users, Package } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import api from "../api/axios";

// Small Rupee icon component (keeps same API as lucide icons)
const RupeeIcon = ({ size = 24, className = '' }) => (
  <span style={{ fontSize: size }} className={className} aria-hidden>
    &#8377;
  </span>
);

// initial placeholders (until API responds)
const initialStats = {
  totalRevenue: 0,
  totalOrders: 0,
  totalUsers: 0,
  totalProducts: 0
};

const initialSales = [];
const initialRecentOrders = [];

export function Dashboard() {
  const [stats, setStats] = useState(initialStats);
  const [salesData, setSalesData] = useState(initialSales);
  const [recentOrders, setRecentOrders] = useState(initialRecentOrders);
  const [loading, setLoading] = useState(true);

  const currency = (num) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(num);

  const normalizeStatus = (status) => {
    const map = {
      initiated: 'Pending',
      placed: 'Processing',
      packed: 'Processing',
      shipped: 'Shipped',
      delivered: 'Completed',
      cancelled: 'Cancelled'
    };
    return map[status] || status;
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [dashboardRes, analyticsRes, ordersRes] = await Promise.all([
          api.get('/api/admin/dashboard'),
          api.get('/api/admin/analytics/monthly'),
          api.get('/api/admin/orders/recent')
        ]);

        setStats(dashboardRes.data || initialStats);
        setSalesData(analyticsRes.data || initialSales);

        const mappedOrders = (ordersRes.data || []).map(o => ({
          id: `#${o._id.slice(-6)}`,
          customer: o.user?.name || o.user?.email || '—',
          product: o.orderItems?.[0]?.product?.name || o.orderItems?.[0]?.name || '—',
          amount: currency(o.totalAmount || o.totalPrice || 0),
          status: normalizeStatus(o.orderStatus)
        }));

        setRecentOrders(mappedOrders);
      } catch (err) {
        console.error('Dashboard load error', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const statsData = [
    { title: 'Total Revenue', value: currency(stats.totalRevenue || 0), change: '', trend: 'up', icon: RupeeIcon, color: 'bg-blue-500' },
    { title: 'Orders', value: stats.totalOrders || 0, change: '', trend: 'up', icon: ShoppingBag, color: 'bg-green-500' },
    { title: 'Customers', value: stats.totalUsers || 0, change: '', trend: 'up', icon: Users, color: 'bg-purple-500' },
    { title: 'Products', value: stats.totalProducts || 0, change: '', trend: 'down', icon: Package, color: 'bg-orange-500' }
  ];

  if (loading) return <div className="text-gray-300">Loading dashboard...</div>;

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