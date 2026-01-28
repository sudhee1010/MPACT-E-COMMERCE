import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '../components/ui/Input';

const initialCustomers = [
  {
    id: 'C001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    orders: 12,
    totalSpent: 1459.88,
    joinDate: '2025-03-15',
    status: 'Active',
  },
  {
    id: 'C002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 (555) 234-5678',
    location: 'Los Angeles, CA',
    orders: 8,
    totalSpent: 892.50,
    joinDate: '2025-04-22',
    status: 'Active',
  },
  {
    id: 'C003',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    orders: 15,
    totalSpent: 2134.75,
    joinDate: '2025-02-10',
    status: 'Active',
  },
  {
    id: 'C004',
    name: 'Alice Brown',
    email: 'alice@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Houston, TX',
    orders: 5,
    totalSpent: 523.99,
    joinDate: '2025-06-05',
    status: 'Active',
  },
  {
    id: 'C005',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    phone: '+1 (555) 567-8901',
    location: 'Phoenix, AZ',
    orders: 3,
    totalSpent: 234.97,
    joinDate: '2025-08-12',
    status: 'Inactive',
  },
];

export function Customers() {
  const [customers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <p className="text-sm text-gray-400">Total Customers</p>
          <p className="text-2xl font-bold text-white mt-1">{customers.length}</p>
          <p className="text-sm text-yellow-400 mt-2">+12% from last month</p>
        </div>
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <p className="text-sm text-gray-400">Active Customers</p>
          <p className="text-2xl font-bold text-white mt-1">
            {customers.filter((c) => c.status === 'Active').length}
          </p>
          <p className="text-sm text-yellow-400 mt-2">+8% from last month</p>
        </div>
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <p className="text-sm text-gray-400">Average Orders</p>
          <p className="text-2xl font-bold text-white mt-1">
            {(customers.reduce((acc, c) => acc + c.orders, 0) / customers.length).toFixed(1)}
          </p>
          <p className="text-sm text-yellow-400 mt-2">+5% from last month</p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a1a] border-b border-gray-700">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Contact</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Location</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Orders</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Total Spent</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Join Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-white">{customer.name}</p>
                        <p className="text-sm text-gray-400">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Mail size={14} />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Phone size={14} />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin size={14} />
                      <span>{customer.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-white">{customer.orders}</td>
                  <td className="py-3 px-4 text-sm font-medium text-yellow-400">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">{customer.joinDate}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        customer.status === 'Active'
                          ? 'bg-green-900/50 text-green-400 border border-green-700'
                          : 'bg-gray-900/50 text-gray-400 border border-gray-700'
                      }`}
                    >
                      {customer.status}
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