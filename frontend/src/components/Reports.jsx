import React, { useState, useRef, useEffect } from 'react';
import { Download, TrendingUp, TrendingDown, FileText, Upload } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export function Reports() {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    newCustomers: 0
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch reports data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [summaryRes, monthlyRes] = await Promise.all([
          axios.get('http://localhost:5000/api/reports/summary', config),
          axios.get('http://localhost:5000/api/reports/monthly', config)
        ]);

        setSummary(summaryRes.data);
        setSalesData(monthlyRes.data);
      } catch (error) {
        console.error('Error fetching reports:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setUploading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      await axios.post('http://localhost:5000/api/reports/upload', formData, config);
      alert('Report uploaded successfully');
      setSelectedFile(null);
      setShowUpload(false);
    } catch (error) {
      console.error('Upload failed:', error.response?.data || error.message);
      alert(`Upload failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      };

      const response = await axios.get('http://localhost:5000/api/reports/export/csv', config);
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `sales-report-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      alert('CSV exported successfully');
    } catch (error) {
      console.error('Export failed:', error.response?.data || error.message);
      alert(`Export failed: ${error.response?.data?.message || error.message}`);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  // Calculate growth percentage (mock calculation - update with actual if needed)
  const calculateGrowthPercentage = (currentIndex) => {
    if (currentIndex === 0) return null;
    const current = salesData[currentIndex];
    const previous = salesData[currentIndex - 1];
    if (!previous || !previous.sales || previous.sales === 0) return 0;
    return ((current.sales - previous.sales) / previous.sales) * 100;
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        color: 'white'
      }}>
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem' }}>
      {/* Header with buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
          Sales Reports
        </h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleExport}
            disabled={salesData.length === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem 1rem',
              backgroundColor: '#facc15',
              color: 'black',
              fontWeight: '500',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: salesData.length > 0 ? 'pointer' : 'not-allowed',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              opacity: salesData.length > 0 ? 1 : 0.5
            }}
          >
            <Download size={20} style={{ marginRight: '0.5rem' }} />
            Export CSV
          </button>
          <button
            onClick={() => setShowUpload(!showUpload)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem 1rem',
              backgroundColor: '#374151',
              color: 'white',
              fontWeight: '500',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              lineHeight: '1.25rem'
            }}
          >
            <Upload size={20} style={{ marginRight: '0.5rem' }} />
            Upload Report
          </button>
        </div>
      </div>

      {/* File Upload Section */}
      {showUpload && (
        <div style={{
          backgroundColor: '#1f2937',
          border: '1px solid #374151',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          animation: 'slideDown 0.3s ease-out'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: '0 0 1rem 0' }}>
            Upload Report File
          </h3>
          <div 
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed #4b5563',
              borderRadius: '0.5rem',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: '#111827',
              transition: 'all 0.2s',
              minHeight: '150px'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#facc15'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = '#4b5563'}
          >
            {selectedFile ? (
              <div style={{ textAlign: 'center' }}>
                <FileText size={48} style={{ color: '#facc15', marginBottom: '1rem' }} />
                <p style={{ color: 'white', fontWeight: '500', marginBottom: '0.25rem' }}>{selectedFile.name}</p>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
                <p style={{ color: '#facc15', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Click to change file
                </p>
              </div>
            ) : (
              <>
                <Upload size={48} style={{ color: '#9ca3af', marginBottom: '1rem' }} />
                <p style={{ color: '#d1d5db', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Click to upload or drag and drop
                </p>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                  CSV, PDF, or Excel files (max 5MB)
                </p>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept=".pdf,.csv,.xls,.xlsx"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', gap: '1rem' }}>
            <button 
              onClick={() => {
                setShowUpload(false);
                setSelectedFile(null);
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'transparent',
                color: '#9ca3af',
                border: '1px solid #4b5563',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Cancel
            </button>
            <button 
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: uploading ? '#6b7280' : '#facc15',
                color: 'black',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: selectedFile && !uploading ? 'pointer' : 'not-allowed',
                opacity: selectedFile ? 1 : 0.5,
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '1rem'
      }}>
        <div style={{
          backgroundColor: '#1f2937',
          border: '1px solid rgba(250, 204, 21, 0.2)',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <FileText size={20} style={{ color: '#facc15' }} />
            <TrendingUp size={16} style={{ color: '#10b981' }} />
          </div>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>Total Sales</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: '0.25rem 0 0 0' }}>
            {formatCurrency(summary.totalSales)}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#10b981', margin: '0.25rem 0 0 0' }}>+15.3% this month</p>
        </div>

        <div style={{
          backgroundColor: '#1f2937',
          border: '1px solid rgba(250, 204, 21, 0.2)',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <FileText size={20} style={{ color: '#facc15' }} />
            <TrendingUp size={16} style={{ color: '#10b981' }} />
          </div>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>Total Orders</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: '0.25rem 0 0 0' }}>
            {summary.totalOrders.toLocaleString()}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#10b981', margin: '0.25rem 0 0 0' }}>+12.8% this month</p>
        </div>

        <div style={{
          backgroundColor: '#1f2937',
          border: '1px solid rgba(250, 204, 21, 0.2)',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <FileText size={20} style={{ color: '#facc15' }} />
            <TrendingDown size={16} style={{ color: '#ef4444' }} />
          </div>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>Avg Order Value</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: '0.25rem 0 0 0' }}>
            ${summary.avgOrderValue.toFixed(2)}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#ef4444', margin: '0.25rem 0 0 0' }}>-3.2% this month</p>
        </div>

        <div style={{
          backgroundColor: '#1f2937',
          border: '1px solid rgba(250, 204, 21, 0.2)',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <FileText size={20} style={{ color: '#facc15' }} />
            <TrendingUp size={16} style={{ color: '#10b981' }} />
          </div>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>New Customers</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: '0.25rem 0 0 0' }}>
            {summary.newCustomers}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#10b981', margin: '0.25rem 0 0 0' }}>+8.7% this month</p>
        </div>
      </div>

      {/* Charts Section */}
      {salesData.length > 0 ? (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '1.5rem'
          }}>
            <div style={{
              backgroundColor: '#1f2937',
              border: '1px solid rgba(250, 204, 21, 0.2)',
              borderRadius: '0.5rem',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: '0 0 1rem 0' }}>
                Sales Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={12}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      borderRadius: '6px',
                      color: '#fff'
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#facc15" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{
              backgroundColor: '#1f2937',
              border: '1px solid rgba(250, 204, 21, 0.2)',
              borderRadius: '0.5rem',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: '0 0 1rem 0' }}>
                Orders Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      borderRadius: '6px',
                      color: '#fff'
                    }}
                  />
                  <Bar 
                    dataKey="orders" 
                    fill="#fbbf24" 
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Report Table */}
          <div style={{
            backgroundColor: '#1f2937',
            border: '1px solid rgba(250, 204, 21, 0.2)',
            borderRadius: '0.5rem',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #374151' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: 0 }}>
                Monthly Breakdown
              </h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead style={{ backgroundColor: '#111827', borderBottom: '1px solid #374151' }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '600', color: '#9ca3af' }}>Month</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '600', color: '#9ca3af' }}>Total Sales</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '600', color: '#9ca3af' }}>Orders</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '600', color: '#9ca3af' }}>Avg Order</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '600', color: '#9ca3af' }}>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((item, index) => {
                    const growth = calculateGrowthPercentage(index);
                    return (
                      <tr key={item.month || index} style={{ borderBottom: '1px solid #111827' }}>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '500', color: 'white' }}>
                          {item.month}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '500', color: '#facc15' }}>
                          ${(item.sales || 0).toLocaleString()}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: 'white' }}>
                          {item.orders || 0}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: 'white' }}>
                          ${(item.avgOrder || (item.sales && item.orders ? (item.sales / item.orders) : 0)).toFixed(2)}
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          {growth !== null && (
                            <span style={{
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              color: growth >= 0 ? '#10b981' : '#ef4444'
                            }}>
                              {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div style={{
          backgroundColor: '#1f2937',
          border: '1px solid #374151',
          borderRadius: '0.5rem',
          padding: '3rem 1.5rem',
          textAlign: 'center'
        }}>
          <p style={{ color: '#9ca3af', margin: 0 }}>No sales data available</p>
        </div>
      )}

      {/* CSS Styles */}
      <style jsx="true">{`
        @media (min-width: 640px) {
          .grid-cols-1 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .grid-cols-1 {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        
        table tr:hover {
          background-color: rgba(17, 24, 39, 0.5);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}