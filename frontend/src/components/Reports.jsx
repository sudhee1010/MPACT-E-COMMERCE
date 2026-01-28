import React, { useState, useRef } from 'react';
import { Download, TrendingUp, TrendingDown, FileText, Upload } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesData = [
  { month: 'Jan', sales: 12400, orders: 240 },
  { month: 'Feb', sales: 11800, orders: 220 },
  { month: 'Mar', sales: 15600, orders: 310 },
  { month: 'Apr', sales: 14200, orders: 285 },
  { month: 'May', sales: 18900, orders: 378 },
  { month: 'Jun', sales: 21500, orders: 430 },
];

export function Reports() {
  const [showUpload, setShowUpload] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
          Sales Reports
        </h2>
        <button
          onClick={() => setShowUpload(!showUpload)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            backgroundColor: '#facc15',
            color: 'black',
            fontWeight: '500',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            lineHeight: '1.25rem'
          }}
        >
          <Download size={20} style={{ marginRight: '0.5rem' }} />
          Export Report
        </button>
      </div>

      {/* File Upload Section */}
      {showUpload && (
        <div style={{
          backgroundColor: '#2a2a2a',
          border: '1px solid rgba(250, 204, 21, 0.2)',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: '0 0 1rem 0' }}>
            Upload Report File
          </h3>
          <div 
            onClick={() => fileInputRef.current.click()}
            style={{
              border: '2px dashed #4b5563',
              borderRadius: '0.5rem',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: '#1f2937',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#facc15'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = '#4b5563'}
          >
            {selectedFile ? (
              <div style={{ textAlign: 'center' }}>
                <FileText size={48} style={{ color: '#facc15', marginBottom: '1rem', margin: '0 auto' }} />
                <p style={{ color: 'white', fontWeight: '500', marginBottom: '0.25rem' }}>{selectedFile.name}</p>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{(selectedFile.size / 1024).toFixed(2)} KB</p>
                <p style={{ color: '#facc15', fontSize: '0.875rem', marginTop: '0.5rem' }}>Click to change file</p>
              </div>
            ) : (
              <>
                <Upload size={48} style={{ color: '#9ca3af', marginBottom: '1rem' }} />
                <p style={{ color: '#d1d5db', marginBottom: '0.5rem', fontWeight: '500' }}>Click to upload or drag and drop</p>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>CSV, PDF, or Excel files</p>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }} 
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
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#facc15',
              color: 'black',
              fontWeight: '500',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer'
            }}>
              Upload
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
          backgroundColor: '#2a2a2a',
          border: '1px solid rgba(250, 204, 21, 0.2)',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <FileText size={20} style={{ color: '#facc15' }} />
            <TrendingUp size={16} style={{ color: '#4ade80' }} />
          </div>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>Total Sales</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: '0.25rem 0 0 0' }}>$94,400</p>
          <p style={{ fontSize: '0.875rem', color: '#4ade80', margin: '0.25rem 0 0 0' }}>+15.3% this month</p>
        </div>

        <div style={{
          backgroundColor: '#2a2a2a',
          border: '1px solid rgba(250, 204, 21, 0.2)',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <FileText size={20} style={{ color: '#facc15' }} />
            <TrendingUp size={16} style={{ color: '#4ade80' }} />
          </div>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>Total Orders</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: '0.25rem 0 0 0' }}>1,863</p>
          <p style={{ fontSize: '0.875rem', color: '#4ade80', margin: '0.25rem 0 0 0' }}>+12.8% this month</p>
        </div>

        <div style={{
          backgroundColor: '#2a2a2a',
          border: '1px solid rgba(250, 204, 21, 0.2)',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <FileText size={20} style={{ color: '#facc15' }} />
            <TrendingDown size={16} style={{ color: '#f87171' }} />
          </div>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>Avg Order Value</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: '0.25rem 0 0 0' }}>$50.67</p>
          <p style={{ fontSize: '0.875rem', color: '#f87171', margin: '0.25rem 0 0 0' }}>-3.2% this month</p>
        </div>

        <div style={{
          backgroundColor: '#2a2a2a',
          border: '1px solid rgba(250, 204, 21, 0.2)',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <FileText size={20} style={{ color: '#facc15' }} />
            <TrendingUp size={16} style={{ color: '#4ade80' }} />
          </div>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>New Customers</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: '0.25rem 0 0 0' }}>245</p>
          <p style={{ fontSize: '0.875rem', color: '#4ade80', margin: '0.25rem 0 0 0' }}>+8.7% this month</p>
        </div>
      </div>

      {/* Charts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '1.5rem'
      }}>
        <div style={{
          backgroundColor: '#2a2a2a',
          border: '1px solid rgba(250, 204, 21, 0.2)',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: '0 0 1rem 0' }}>
            Sales Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #444', color: '#fff' }} />
              <Line type="monotone" dataKey="sales" stroke="#fbbf24" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{
          backgroundColor: '#2a2a2a',
          border: '1px solid rgba(250, 204, 21, 0.2)',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: '0 0 1rem 0' }}>
            Orders Trend
          </h3>
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

      {/* Detailed Report Table */}
      <div style={{
        backgroundColor: '#2a2a2a',
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
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #374151' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '600', color: '#9ca3af' }}>Month</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '600', color: '#9ca3af' }}>Total Sales</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '600', color: '#9ca3af' }}>Orders</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '600', color: '#9ca3af' }}>Avg Order</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '600', color: '#9ca3af' }}>Growth</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, index) => (
                <tr key={item.month} style={{ borderBottom: '1px solid #1f2937' }}>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '500', color: 'white' }}>
                    {item.month}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: '500', color: '#facc15' }}>
                    ${item.sales.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: 'white' }}>
                    {item.orders}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: 'white' }}>
                    ${(item.sales / item.orders).toFixed(2)}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    {index > 0 && (
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: item.sales > salesData[index - 1].sales ? '#4ade80' : '#f87171'
                      }}>
                        {item.sales > salesData[index - 1].sales ? '+' : ''}
                        {(((item.sales - salesData[index - 1].sales) / salesData[index - 1].sales) * 100).toFixed(1)}%
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>
        {`
          @media (min-width: 640px) {
            .grid-cols-1 {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .grid-cols-1 {
              grid-template-columns: repeat(4, 1fr);
            }
            .grid-cols-1-lg {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          tr:hover {
            background-color: rgba(31, 41, 55, 0.5);
          }
        `}
      </style>
    </div>
  );
}
