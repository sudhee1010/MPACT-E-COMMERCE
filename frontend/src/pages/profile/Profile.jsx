import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const navigate = useNavigate();

  function navigateFunction() {
    navigate("/prfle")
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#3a3a3a',
      padding: isMobile ? '1.5rem 1rem' : isTablet ? '2rem 1.5rem' : '2.5rem 2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    title: {
      fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
      fontWeight: 'bold',
      color: '#ffd93d',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      textShadow: '3px 3px 0px rgba(0,0,0,0.3)',
      WebkitTextStroke: '1.5px #000'
    },
    card: {
      backgroundColor: '#4a4a4a',
      border: '2px solid #a8a850',
      borderRadius: '12px',
      padding: isMobile ? '1.5rem' : isTablet ? '2rem' : '2.5rem',
      maxWidth: '1050px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? '280px 1fr' : '320px 1fr',
      gap: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
      position: 'relative'
    },
    cardActions: {
      position: 'absolute',
      top: isMobile ? '1rem' : '1.5rem',
      right: isMobile ? '1rem' : '1.5rem',
      display: 'flex',
      gap: '0.75rem'
    },
    iconButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#aaa',
      cursor: 'pointer',
      fontSize: isMobile ? '1rem' : '1.1rem',
      padding: '0.25rem',
      transition: 'color 0.2s'
    },
    leftSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      paddingTop: isMobile ? '2rem' : '0',
      paddingleft: '120px',

    },
    profileImage: {
      width: isMobile ? '100px' : '130px',
      height: isMobile ? '100px' : '130px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '1.5rem',
      border: '3px solid #5a5a5a',
      // paddingLeft:'20px'
    },
    userName: {
      color: '#fff',
      fontSize: isMobile ? '1.3rem' : '1.6rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      textAlign: 'left'
    },
    userEmail: {
      color: '#aaa',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textAlign: 'center',
      flexWrap: 'wrap',
      justifyContent: 'left'
    },
    copyIcon: {
      cursor: 'pointer',
      fontSize: '0.9rem'
    },
    menuList: {
      listStyle: 'none',
      padding: 0,
      width: '100%',
      marginBottom: '2rem'
    },
    menuItem: {
      color: '#ddd',
      padding: '0.75rem 1rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      borderRadius: '6px',
      marginBottom: '0.25rem',
      fontSize: isMobile ? '0.9rem' : '0.95rem'
    },
    menuItemActive: {
      backgroundColor: '#5a5a5a'
    },
    socialSection: {
      width: '100%',
      marginTop: 'auto'
    },
    socialTitle: {
      color: '#aaa',
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      marginBottom: '1rem'
    },
    socialIcons: {
      display: 'flex',
      gap: '0.75rem',
      marginBottom: '1rem',
      flexWrap: 'wrap'
    },
    socialIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: 'bold',
      color: '#fff'
    },
    socialButton: {
      backgroundColor: 'transparent',
      color: '#fff',
      border: '1px solid #5a5a5a',
      borderRadius: '20px',
      padding: '0.6rem 1rem',
      cursor: 'pointer',
      fontSize: '0.85rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      width: '100%',
      justifyContent: 'center',
      transition: 'all 0.2s'
    },
    rightSection: {
      display: 'flex',
      flexDirection: 'column'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    sectionTitle: {
      color: '#fff',
      fontSize: isMobile ? '1.3rem' : '1.6rem',
      fontWeight: '600'
    },
    needHelp: {
      color: '#6b7aff',
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem',
      textDecoration: 'none'
    },
    formGroup: {
      marginBottom: isMobile ? '1.25rem' : '1.5rem'
    },
    label: {
      color: '#ddd',
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      fontWeight: '500'
    },
    inputWrapper: {
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: isMobile ? '0.75rem 3rem 0.75rem 1rem' : '0.85rem 3rem 0.85rem 1.2rem',
      backgroundColor: '#7a7a7a',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      boxSizing: 'border-box',
      outline: 'none',
      transition: 'background-color 0.2s'
    },
    eyeIcon: {
      position: 'absolute',
      right: isMobile ? '0.9rem' : '1.2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#ddd',
      fontSize: isMobile ? '1rem' : '1.1rem'
    },
    forgotLink: {
      color: '#6b7aff',
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      marginTop: '0.5rem',
      cursor: 'pointer',
      display: 'inline-block',
      textDecoration: 'none'
    },
    saveButton: {
      width: '100%',
      padding: isMobile ? '0.9rem' : '1rem',
      backgroundColor: '#ffd93d',
      color: '#000',
      border: 'none',
      borderRadius: '8px',
      fontSize: isMobile ? '0.95rem' : '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '0.5rem',
      transition: 'background-color 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Profile</h1>

      <div style={styles.card}>
        <div style={styles.cardActions}>
          {/* <button 
            style={styles.iconButton}
            onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
            onMouseOut={(e) => e.currentTarget.style.color = '#aaa'}
          >
            ✏️
          </button>
          <button 
            style={styles.iconButton}
            onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
            onMouseOut={(e) => e.currentTarget.style.color = '#aaa'}
          >
            📤
          </button> */}
        </div>

        {/* Left Section */}
        <div style={styles.leftSection}>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
            alt="Wade Warren"
            style={styles.profileImage}
          />
          <h2 style={styles.userName}>Wade Warren</h2>
          <div style={styles.userEmail}>
            <span>wade.warren@example.com</span>
            <span style={styles.copyIcon}>📋</span>
          </div>
  
          <ul style={styles.menuList}>
            <li style={styles.menuItem}>Orders</li>
            <li style={styles.menuItem}>Track orders</li>
            <li style={styles.menuItem} onClick={() => navigateFunction("/prfle")}>
              Update Profile</li>
          </ul>
          <div style={styles.socialSection}>
            <p style={styles.socialTitle}>Linked with Social media</p>
            <div style={styles.socialIcons}>
              <div style={{ ...styles.socialIcon, backgroundColor: '#db4437' }}>G</div>
              <div style={{ ...styles.socialIcon, backgroundColor: '#4267B2' }}>f</div>
              <div style={{ ...styles.socialIcon, backgroundColor: '#000' }}>𝕏</div>
              <div style={{ ...styles.socialIcon, backgroundColor: '#0077B5' }}>in</div>
            </div>
            <button
              style={styles.socialButton}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#555';
                e.currentTarget.style.borderColor = '#777';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#5a5a5a';
              }}
            >
              <span>🔗</span> Social media
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div style={styles.rightSection}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Change Password</h3>
            {<a href="#" style={styles.needHelp}>
              Need help?
            </a>}
          </div>

          <div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Current Password</label>
              <div style={styles.inputWrapper}>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter password"
                  style={styles.input}
                  onFocus={(e) => e.target.style.backgroundColor = '#8a8a8a'}
                  onBlur={(e) => e.target.style.backgroundColor = '#7a7a7a'}
                />
                <span
                  style={styles.eyeIcon}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
              <a href="#" style={styles.forgotLink}>Forgot Current Password? Click here</a>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>New Password</label>
              <div style={styles.inputWrapper}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter password"
                  style={styles.input}
                  onFocus={(e) => e.target.style.backgroundColor = '#8a8a8a'}
                  onBlur={(e) => e.target.style.backgroundColor = '#7a7a7a'}
                />
                <span
                  style={styles.eyeIcon}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Re-enter Password</label>
              <div style={styles.inputWrapper}>
                <input
                  type={showReenterPassword ? "text" : "password"}
                  placeholder="Enter password"
                  style={styles.input}
                  onFocus={(e) => e.target.style.backgroundColor = '#8a8a8a'}
                  onBlur={(e) => e.target.style.backgroundColor = '#7a7a7a'}
                />
                <span
                  style={styles.eyeIcon}
                  onClick={() => setShowReenterPassword(!showReenterPassword)}
                >
                  {showReenterPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
            </div>

            <button
              type="button"
              style={styles.saveButton}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5c91f'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffd93d'}
            >
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}