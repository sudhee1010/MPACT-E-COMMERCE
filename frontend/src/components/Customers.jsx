import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, MapPin, Ban, CheckCircle } from 'lucide-react';
import { Input } from '../components/ui/Input';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [banLoading, setBanLoading] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!user || user.role !== 'admin') {
        setError('Admin access required. Please log in as an admin.');
        console.log(user, "user");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/api/admin/users');

        const mappedCustomers = response.data.map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || 'N/A',
          location: user.address || 'N/A',
          orders: user.orders || 0,
          totalSpent: user.totalSpent || 0,
          joinDate: new Date(user.createdAt).toISOString().split('T')[0],
          status: user.isEmailVerified ? 'Active' : 'Inactive',
          isBanned: !!user.isBanned,
          banReason: user.banReason || '',
        }));

        setCustomers(mappedCustomers);
      } catch (err) {
        console.error('Failed to fetch customers:', err);

        if (err.response?.status === 403) {
          if (err.response?.data?.message === 'Admin access only') {
            setError('You do not have admin privileges to access this page.');
          } else if (err.response?.data?.message?.includes('verify your email')) {
            setError('Please verify your email before accessing admin features.');
          } else {
            setError('Access denied. Admin privileges required.');
          }
        } else if (err.response?.status === 401) {
          setError('Please log in to access this page.');
        } else {
          setError(err.response?.data?.message || 'Failed to load customers. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [user]);

  const handleBanToggle = async (customerId, shouldBan) => {
    const action = shouldBan ? 'ban' : 'unban';
    const message = shouldBan
      ? 'Are you sure you want to BAN this customer?'
      : 'Are you sure you want to UNBAN this customer?';

    if (!window.confirm(message)) return;

    let banReason = '';
    if (shouldBan) {
      banReason = window.prompt('Please enter the ban reason:');
      if (banReason === null) return; // User cancelled the prompt
      if (banReason.trim() === '') {
        alert('Ban reason cannot be empty');
        return;
      }
    }

    const originalCustomers = [...customers];

    // Optimistic update
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId ? { ...c, isBanned: shouldBan, banReason: shouldBan ? banReason : '' } : c
      )
    );

    setBanLoading(customerId);

    try {
      const payload = shouldBan ? { banReason } : {};
      await api.post(`/api/admin/users/${customerId}/${action}`, payload);
    } catch (err) {
      console.error(`Failed to ${action} customer:`, err);
      alert(
        `Failed to ${action} customer. ${
          err.response?.data?.message || 'Please try again.'
        }`
      );
      // Rollback on error
      setCustomers(originalCustomers);
    } finally {
      setBanLoading(null);
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    const name = (customer.name || '').toLowerCase();
    const email = (customer.email || '').toLowerCase();
    const location = (customer.location || '').toLowerCase();

    return (
      name.includes(searchLower) ||
      email.includes(searchLower) ||
      location.includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading customers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-red-400 text-center">{error}</p>
        {error.includes('log in') && (
          <a
            href="/login"
            className="text-yellow-400 hover:text-yellow-300 underline"
          >
            Go to Login
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <p className="text-sm text-gray-400">Total Customers</p>
          <p className="text-2xl font-bold text-white mt-1">{customers.length}</p>
          <p className="text-sm text-yellow-400 mt-2">+12% from last month</p>
        </div>
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <p className="text-sm text-gray-400">Active Customers</p>
          <p className="text-2xl font-bold text-white mt-1">
            {customers.filter((c) => c.status === 'Active' && !c.isBanned).length}
          </p>
          <p className="text-sm text-yellow-400 mt-2">+8% from last month</p>
        </div>
        <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          <p className="text-sm text-gray-400">Average Orders</p>
          <p className="text-2xl font-bold text-white mt-1">
            {customers.length > 0
              ? (
                  customers.reduce((acc, c) => acc + (c.orders || 0), 0) /
                  customers.length
                ).toFixed(1)
              : '0'}
          </p>
          <p className="text-sm text-yellow-400 mt-2">+5% from last month</p>
        </div>
      </div>

      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a1a] border-b border-gray-700">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                  Contact
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                  Location
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                  Orders
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                  Total Spent
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                  Join Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                  Ban Reason
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-gray-400">
                    No customers found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className={`border-b border-gray-800 hover:bg-gray-800/50 ${
                      customer.isBanned ? 'bg-red-950/20' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                          {(customer.name || '')
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .substring(0, 2) || 'NA'}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {customer.name || 'N/A'}
                            {customer.isBanned && (
                              <span className="ml-2 text-xs text-red-400">
                                (banned)
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-gray-400">
                            {(customer.id || '').substring(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Mail size={14} />
                          <span>{customer.email || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Phone size={14} />
                          <span>{customer.phone || 'N/A'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin size={14} />
                        <span>{customer.location || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-white">
                      {customer.orders || 0}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-yellow-400">
                      ${(customer.totalSpent || 0).toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-400">
                      {customer.joinDate || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          customer.isBanned
                            ? 'bg-red-900/70 text-red-300 border border-red-700'
                            : customer.status === 'Active'
                            ? 'bg-green-900/50 text-green-400 border border-green-700'
                            : 'bg-gray-900/50 text-gray-400 border border-gray-700'
                        }`}
                      >
                        {customer.isBanned ? 'Banned' : customer.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-400 max-w-xs">
                        {customer.isBanned && customer.banReason ? (
                          <div title={customer.banReason} className="truncate">
                            {customer.banReason}
                          </div>
                        ) : (
                          <span className="text-gray-600">-</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {customer.isBanned ? (
                        <button
                          onClick={() => handleBanToggle(customer.id, false)}
                          disabled={banLoading === customer.id}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded bg-green-900/50 text-green-400 border border-green-700 hover:bg-green-900/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <CheckCircle size={14} />
                          {banLoading === customer.id ? 'Processing...' : 'Unban'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBanToggle(customer.id, true)}
                          disabled={banLoading === customer.id}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded bg-red-900/50 text-red-400 border border-red-700 hover:bg-red-900/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Ban size={14} />
                          {banLoading === customer.id ? 'Processing...' : 'Ban'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}