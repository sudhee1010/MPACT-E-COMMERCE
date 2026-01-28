import React from 'react';
import { Gift, Zap, Bug, CheckCircle, Bell, ExternalLink, Sparkles, Download, Star } from 'lucide-react';

const updates = [
  {
    id: 1,
    version: '2.5.0',
    date: '2026-01-05',
    type: 'feature',
    title: 'New Analytics Dashboard',
    description: 'Enhanced analytics with real-time data visualization and custom reports.',
    changes: [
      'Added real-time sales tracking',
      'New customer behavior analytics',
      'Custom report builder',
      'Export to PDF and Excel',
    ],
    status: 'current'
  },
  {
    id: 2,
    version: '2.4.1',
    date: '2025-12-28',
    type: 'improvement',
    title: 'Performance Improvements',
    description: 'Significant speed improvements and UI enhancements.',
    changes: [
      'Faster page load times',
      'Optimized database queries',
      'Improved mobile responsiveness',
      'Better error handling',
    ],
    status: 'recent'
  },
  {
    id: 3,
    version: '2.4.0',
    date: '2025-12-15',
    type: 'feature',
    title: 'Coupon Management System',
    description: 'Create and manage discount coupons for your store.',
    changes: [
      'Percentage and fixed amount discounts',
      'Usage limits and expiry dates',
      'Coupon code generator',
      'Usage analytics',
    ],
    status: 'older'
  },
  {
    id: 4,
    version: '2.3.2',
    date: '2025-12-01',
    type: 'bugfix',
    title: 'Bug Fixes and Security Updates',
    description: 'Critical security patches and bug fixes.',
    changes: [
      'Fixed order status update issue',
      'Security vulnerability patches',
      'Email notification fixes',
      'Minor UI bug fixes',
    ],
    status: 'older'
  },
  {
    id: 5,
    version: '2.3.0',
    date: '2025-11-20',
    type: 'feature',
    title: 'Inventory Management',
    description: 'Advanced inventory tracking and management system.',
    changes: [
      'Low stock alerts',
      'Bulk product updates',
      'Supplier management',
      'Inventory forecasting',
    ],
    status: 'older'
  },
];

const getTypeIcon = (type) => {
  const iconStyle = { width: '20px', height: '20px' };
  switch (type) {
    case 'feature':
      return <Gift style={iconStyle} />;
    case 'improvement':
      return <Zap style={iconStyle} />;
    case 'bugfix':
      return <Bug style={iconStyle} />;
    default:
      return <CheckCircle style={iconStyle} />;
  }
};

const getTypeBadgeStyle = (type) => {
  switch (type) {
    case 'feature':
      return {
        background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.15), rgba(234, 179, 8, 0.1))',
        color: '#facc15',
        border: '1px solid rgba(250, 204, 21, 0.3)',
      };
    case 'improvement':
      return {
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.1))',
        color: '#60a5fa',
        border: '1px solid rgba(59, 130, 246, 0.3)',
      };
    case 'bugfix':
      return {
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.1))',
        color: '#f87171',
        border: '1px solid rgba(239, 68, 68, 0.3)',
      };
    default:
      return {
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.1))',
        color: '#4ade80',
        border: '1px solid rgba(34, 197, 94, 0.3)',
      };
  }
};

const getStatusIndicator = (status) => {
  switch (status) {
    case 'current':
      return {
        background: 'linear-gradient(135deg, #facc15, #eab308)',
        pulse: true
      };
    case 'recent':
      return {
        background: '#3b82f6',
        pulse: false
      };
    default:
      return {
        background: '#6b7280',
        pulse: false
      };
  }
};

export function ProductUpdates() {
  const [showAllUpdates, setShowAllUpdates] = React.useState(false);
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState('all');
  
  const displayedUpdates = showAllUpdates 
    ? updates 
    : updates.filter(update => update.status === 'current' || update.status === 'recent');
  
  const filteredUpdates = selectedType === 'all' 
    ? displayedUpdates 
    : displayedUpdates.filter(update => update.type === selectedType);

  const updateTypes = [
    { id: 'all', label: 'All Updates', count: displayedUpdates.length },
    { id: 'feature', label: 'Features', count: displayedUpdates.filter(u => u.type === 'feature').length },
    { id: 'improvement', label: 'Improvements', count: displayedUpdates.filter(u => u.type === 'improvement').length },
    { id: 'bugfix', label: 'Bug Fixes', count: displayedUpdates.filter(u => u.type === 'bugfix').length },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.2), rgba(234, 179, 8, 0.1))',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(250, 204, 21, 0.3)'
            }}>
              <Sparkles style={{ width: '24px', height: '24px', color: '#facc15' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #ffffff, #facc15)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                Product Updates
              </h1>
              <p style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                margin: '0.25rem 0 0 0'
              }}>
                Stay up to date with the latest features and improvements
              </p>
            </div>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setIsSubscribed(!isSubscribed)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: isSubscribed 
                ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.1))'
                : 'linear-gradient(135deg, rgba(250, 204, 21, 0.15), rgba(234, 179, 8, 0.1))',
              color: isSubscribed ? '#4ade80' : '#facc15',
              border: `1px solid ${isSubscribed ? 'rgba(34, 197, 94, 0.3)' : 'rgba(250, 204, 21, 0.3)'}`,
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Bell style={{ width: '16px', height: '16px' }} />
            {isSubscribed ? 'Subscribed ✓' : 'Subscribe to Updates'}
          </button>
          
          <button
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #facc15, #eab308)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Download style={{ width: '16px', height: '16px' }} />
            Download Release Notes
          </button>
        </div>
      </div>

      {/* Current Version Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.1), rgba(234, 179, 8, 0.05))',
        border: '1px solid rgba(250, 204, 21, 0.2)',
        borderRadius: '16px',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(250, 204, 21, 0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #facc15, #eab308)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Star style={{ width: '32px', height: '32px', color: '#000' }} />
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '0.5rem',
              flexWrap: 'wrap'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#ffffff',
                margin: 0
              }}>
                Version 2.5.0
              </h3>
              <span style={{
                padding: '0.25rem 0.75rem',
                background: 'rgba(34, 197, 94, 0.2)',
                color: '#4ade80',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                Current Version
              </span>
            </div>
            
            <p style={{
              fontSize: '1rem',
              color: '#d1d5db',
              margin: '0 0 1rem 0',
              maxWidth: '600px'
            }}>
              The latest release includes an enhanced Analytics Dashboard with real-time data visualization, 
              custom reports, and improved performance metrics.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCircle style={{ width: '16px', height: '16px', color: '#4ade80' }} />
                Released on January 5, 2026
              </span>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  background: 'transparent',
                  color: '#facc15',
                  border: '1px solid rgba(250, 204, 21, 0.3)',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
              >
                View Release Notes
                <ExternalLink style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        {updateTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            style={{
              padding: '0.75rem 1.25rem',
              background: selectedType === type.id 
                ? 'rgba(250, 204, 21, 0.15)'
                : 'transparent',
              color: selectedType === type.id ? '#facc15' : '#9ca3af',
              border: `1px solid ${selectedType === type.id ? 'rgba(250, 204, 21, 0.3)' : 'rgba(156, 163, 175, 0.2)'}`,
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            {type.label}
            <span style={{
              padding: '0.125rem 0.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              fontSize: '0.75rem',
              color: selectedType === type.id ? '#ffffff' : '#9ca3af'
            }}>
              {type.count}
            </span>
          </button>
        ))}
      </div>

      {/* Update Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredUpdates.map((update) => {
          const statusIndicator = getStatusIndicator(update.status);
          const badgeStyle = getTypeBadgeStyle(update.type);
          
          return (
            <div
              key={update.id}
              style={{
                background: 'linear-gradient(135deg, rgba(42, 42, 42, 0.8), rgba(26, 26, 26, 0.8))',
                border: '1px solid rgba(250, 204, 21, 0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
                position: 'relative',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                ':hover': {
                  borderColor: 'rgba(250, 204, 21, 0.3)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 30px rgba(250, 204, 21, 0.1)'
                }
              }}
            >
              {/* Status Indicator */}
              <div style={{
                position: 'absolute',
                top: '-4px',
                right: '1.5rem',
                width: '8px',
                height: '8px',
                background: statusIndicator.background,
                borderRadius: '50%',
                animation: statusIndicator.pulse ? 'pulse 2s infinite' : 'none'
              }} />
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: `linear-gradient(135deg, ${badgeStyle.background.split(',')[1]}, ${badgeStyle.background.split(',')[2]})`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {getTypeIcon(update.type)}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#ffffff',
                        margin: '0 0 0.25rem 0'
                      }}>
                        {update.title}
                      </h3>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#9ca3af',
                        margin: '0 0 0.75rem 0'
                      }}>
                        {update.description}
                      </p>
                    </div>
                    
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      ...badgeStyle,
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}>
                      {update.type}
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: badgeStyle.color
                    }}>
                      v{update.version}
                    </span>
                    <span style={{ color: '#6b7280' }}>•</span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#9ca3af'
                    }}>
                      {update.date}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Changes List */}
              <div style={{
                background: 'rgba(26, 26, 26, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '1rem'
              }}>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#d1d5db',
                  margin: '0 0 0.75rem 0'
                }}>
                  What's New:
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {update.changes.map((change, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: badgeStyle.color,
                        borderRadius: '50%',
                        marginTop: '0.5rem',
                        flexShrink: 0
                      }} />
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#9ca3af',
                        lineHeight: '1.5'
                      }}>
                        {change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => setShowAllUpdates(!showAllUpdates)}
          style={{
            padding: '0.875rem 2rem',
            background: 'transparent',
            color: '#facc15',
            border: '1px solid rgba(250, 204, 21, 0.3)',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          {showAllUpdates ? 'Show Less Updates' : 'Show All Updates'}
          <span style={{
            padding: '0.125rem 0.5rem',
            background: 'rgba(250, 204, 21, 0.1)',
            borderRadius: '12px',
            fontSize: '0.75rem',
            color: '#facc15'
          }}>
            {updates.length}
          </span>
        </button>
      </div>

      {/* Additional Resources */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '16px',
          padding: '1.5rem'
        }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#ffffff',
            margin: '0 0 1rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <ExternalLink style={{ width: '18px', height: '18px', color: '#60a5fa' }} />
            Documentation
          </h4>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '0 0 1rem 0' }}>
            Read detailed documentation for all features and updates
          </p>
          <button style={{
            padding: '0.5rem 1rem',
            background: 'transparent',
            color: '#60a5fa',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            View Docs
          </button>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.05))',
          border: '1px solid rgba(34, 197, 94, 0.2)',
          borderRadius: '16px',
          padding: '1.5rem'
        }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#ffffff',
            margin: '0 0 1rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Bug style={{ width: '18px', height: '18px', color: '#4ade80' }} />
            Report Issues
          </h4>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '0 0 1rem 0' }}>
            Found a bug? Report it to our development team
          </p>
          <button style={{
            padding: '0.5rem 1rem',
            background: 'transparent',
            color: '#4ade80',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Report Bug
          </button>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(147, 51, 234, 0.05))',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: '16px',
          padding: '1.5rem'
        }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#ffffff',
            margin: '0 0 1rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Sparkles style={{ width: '18px', height: '18px', color: '#a855f7' }} />
            Request Feature
          </h4>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: '0 0 1rem 0' }}>
            Suggest new features for future updates
          </p>
          <button style={{
            padding: '0.5rem 1rem',
            background: 'transparent',
            color: '#a855f7',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Suggest Feature
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(250, 204, 21, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(250, 204, 21, 0);
            }
          }
          
          @media (max-width: 768px) {
            .grid-cols-2 {
              grid-template-columns: 1fr;
            }
          }
          
          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: #111111;
            color: white;
          }
        `}
      </style>
    </div>
  );
}