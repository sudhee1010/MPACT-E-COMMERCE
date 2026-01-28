import React from 'react';
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const monthlyData = [
  { month: 'Jan', revenue: 12400, orders: 240, customers: 180 },
  { month: 'Feb', revenue: 11800, orders: 220, customers: 165 },
  { month: 'Mar', revenue: 15600, orders: 310, customers: 220 },
  { month: 'Apr', revenue: 14200, orders: 285, customers: 195 },
  { month: 'May', revenue: 18900, orders: 378, customers: 268 },
  { month: 'Jun', revenue: 21500, orders: 430, customers: 305 },
];

const categoryData = [
  { name: 'Electronics', value: 45, color: '#fbbf24' },
  { name: 'Accessories', value: 30, color: '#60a5fa' },
  { name: 'Clothing', value: 15, color: '#34d399' },
  { name: 'Home & Garden', value: 10, color: '#a78bfa' },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 234, revenue: 30386.66 },
  { name: 'Smart Watch', sales: 189, revenue: 56681.11 },
  { name: 'Phone Case', sales: 167, revenue: 4173.33 },
  { name: 'Laptop Stand', sales: 145, revenue: 7248.55 },
  { name: 'USB-C Cable', sales: 123, revenue: 2458.77 },
];

const trafficSources = [
  { source: 'Direct', visitors: 4200, color: '#fbbf24' },
  { source: 'Organic Search', visitors: 3800, color: '#60a5fa' },
  { source: 'Social Media', visitors: 2400, color: '#34d399' },
  { source: 'Referral', visitors: 1600, color: '#a78bfa' },
  { source: 'Email', visitors: 1200, color: '#f472b6' },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-white mt-2">$94,400</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} className="text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">+24.5%</span>
              </div>
            </div>
            <div className="bg-yellow-400 p-3 rounded-lg">
              <DollarSign size={24} className="text-black" />
            </div>
          </div>
        </div>

        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-white mt-2">1,863</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} className="text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">+18.2%</span>
              </div>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <ShoppingCart size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Customers</p>
              <p className="text-2xl font-bold text-white mt-2">1,333</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} className="text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">+15.8%</span>
              </div>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg. Order Value</p>
              <p className="text-2xl font-bold text-white mt-2">$50.67</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} className="text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">+5.3%</span>
              </div>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="revenue"
                stroke="#fbbf24"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders & Customers */}
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Orders & Customers</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #444', color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#fbbf24" strokeWidth={2} />
              <Line type="monotone" dataKey="customers" stroke="#60a5fa" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #444', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trafficSources}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="source" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #444', color: '#fff' }} />
              <Bar dataKey="visitors" radius={[8, 8, 0, 0]}>
                {trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Top Performing Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Product Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Sales</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Revenue</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Performance</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={product.name} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-400/20 text-yellow-400 font-semibold rounded-full border border-yellow-400/30">
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-white">{product.name}</td>
                  <td className="py-3 px-4 text-sm text-white">{product.sales}</td>
                  <td className="py-3 px-4 text-sm font-medium text-yellow-400">
                    ${product.revenue.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2 max-w-[200px]">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${(product.sales / 234) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-400">
                        {((product.sales / 234) * 100).toFixed(0)}%
                      </span>
                    </div>
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