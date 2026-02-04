import React, { useEffect, useState, useMemo } from 'react';
import { Mail, Star, Trash2, Search } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Input } from './ui/Input.jsx';

export default function AdminDistributor() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/distributor/distributor-enquiry');
      setEnquiries(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      setDeletingId(id);
      await api.delete(`/api/distributor/distributor-enquiry/${id}`);
      setEnquiries((prev) => prev.filter((p) => p._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Enquiry deleted');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete enquiry');
    } finally {
      setDeletingId(null);
    }
  };
  useEffect(() => {
    fetchEnquiries();
  }, []);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return enquiries;
    return enquiries.filter((e) => {
      return (
        e.businessName?.toLowerCase().includes(q) ||
        e.fullName?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.phone?.toLowerCase().includes(q) ||
        e.city?.toLowerCase().includes(q) ||
        e.remarks?.toLowerCase().includes(q)
      );
    });
  }, [searchTerm, enquiries]);

  const updateStatus = async (id, status) => {
    try {
      setUpdating(true);
      const { data } = await api.patch(`/api/distributor/distributor-enquiry/${id}`, { status });
      setEnquiries((prev) => prev.map((p) => (p._id === id ? data : p)));
      setSelected(data);
      toast.success('Status updated');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <style>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar{ display:none }
        .message-list{ scroll-behavior: smooth }
      `}</style>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Distributor Enquiries</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full border border-yellow-400/30">
              {enquiries.filter(e => e.status === 'pending').length} pending
            </span>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search enquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-[#2a2a2a] border border-yellow-400/20 rounded-lg overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto scrollbar-hide message-list">
              {loading && (
                <div className="p-4 text-gray-400">Loading...</div>
              )}

              {!loading && filtered.length === 0 && (
                <div className="p-4 text-gray-400">No enquiries found</div>
              )}

              {filtered.map((m) => (
                <div
                  key={m._id}
                  onClick={() => setSelected(m)}
                  className={`p-4 border-b border-gray-800 cursor-pointer transition-colors ${
                    selected?._id === m._id ? 'bg-gray-800' : 'hover:bg-gray-800/50'
                  } ${m.status === 'pending' ? 'bg-yellow-400/5' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className={m.status === 'pending' ? 'text-yellow-400' : 'text-gray-500'} />
                      <div>
                        <p className={`text-sm font-medium ${m.status === 'pending' ? 'text-white' : 'text-gray-400'}`}>{m.fullName}</p>
                        <p className="text-xs text-gray-500">{m.businessName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{new Date(m.createdAt).toLocaleDateString()}</div>
                      <div className="mt-1 text-xs flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          m.status === 'pending' ? 'bg-yellow-400 text-black' : m.status === 'contacted' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                        }`}>{m.status}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteEnquiry(m._id); }}
                          className="p-1 text-gray-400 hover:text-red-400"
                          aria-label="Delete enquiry"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm mb-1 text-white font-medium">{m.email} · {m.phone}</p>
                  <p className="text-xs text-gray-500 truncate">{m.remarks}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
            {selected ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between pb-4 border-b border-gray-700">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{selected.businessName}</h3>
                    <p className="text-sm text-gray-400">Contact: {selected.fullName} • {selected.phone}</p>
                    <p className="text-xs text-gray-500 mt-1">{selected.email} • {selected.city}</p>
                    <p className="text-xs text-gray-500 mt-1">Submitted: {new Date(selected.createdAt).toLocaleString()}</p>
                  </div>
                    <div className="flex gap-2 items-center">
                    <button
                      onClick={() => updateStatus(selected._id, 'contacted')}
                      disabled={updating}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    >
                      Mark Contacted
                    </button>
                    <button
                      onClick={() => updateStatus(selected._id, 'approved')}
                      disabled={updating}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => deleteEnquiry(selected._id)}
                      disabled={deletingId === selected._id}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md ml-2"
                    >
                      {deletingId === selected._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>

                <div className="text-gray-300 leading-relaxed">
                  <h4 className="text-sm text-gray-400">Business Type</h4>
                  <p className="text-white">{selected.businessType}</p>

                  <h4 className="text-sm text-gray-400 mt-4">Remarks</h4>
                  <p className="text-gray-300">{selected.remarks || '—'}</p>
                </div>

                <div className="pt-4 border-t border-gray-700 flex gap-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(selected.email)}
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-md transition-colors"
                  >
                    Copy Email
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(selected.phone)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                  >
                    Copy Phone
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Select an enquiry to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
