import React, { useState, useEffect } from 'react';

export default function UpdateProfilePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '1rem' : '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    wrapper: {
      width: '100%',
      maxWidth: '1000px'
    },
    title: {
      fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
      fontWeight: 'bold',
      color: '#ffd93d',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      textShadow: '3px 3px 0px rgba(0,0,0,0.3)',
      WebkitTextStroke: '2px #000'
    },
    card: {
      backgroundColor: '#4a4a4a',
      border: '3px solid #5bc0de',
      borderRadius: '12px',
      padding: isMobile ? '1.5rem' : isTablet ? '2rem' : '2.5rem',
      boxShadow: '0 0 20px rgba(91, 192, 222, 0.3)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    headerTitle: {
      color: '#fff',
      fontSize: isMobile ? '1.2rem' : '1.5rem',
      fontWeight: '600'
    },
    editButton: {
      backgroundColor: 'transparent',
      color: '#fff',
      border: '1px solid #666',
      borderRadius: '6px',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s'
    },
    profileSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      flexWrap: isMobile ? 'wrap' : 'nowrap'
    },
    profileImage: {
      width: isMobile ? '70px' : '90px',
      height: isMobile ? '70px' : '90px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3px solid #666'
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap'
    },
    uploadButton: {
      backgroundColor: '#ffd93d',
      color: '#000',
      border: 'none',
      borderRadius: '6px',
      padding: isMobile ? '0.6rem 1rem' : '0.65rem 1.25rem',
      cursor: 'pointer',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      fontWeight: '600',
      transition: 'background-color 0.2s'
    },
    deleteButton: {
      backgroundColor: 'transparent',
      color: '#fff',
      border: '1px solid #666',
      borderRadius: '6px',
      padding: isMobile ? '0.6rem 1rem' : '0.65rem 1.25rem',
      cursor: 'pointer',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      transition: 'all 0.2s'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '1.25rem' : '1.5rem',
      marginBottom: isMobile ? '1.25rem' : '1.5rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    formGroupFull: {
      gridColumn: isMobile ? '1' : '1 / -1'
    },
    label: {
      color: '#ddd',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      marginBottom: '0.5rem',
      fontWeight: '500'
    },
    input: {
      backgroundColor: '#5a5a5a',
      border: 'none',
      borderRadius: '8px',
      padding: isMobile ? '0.7rem 0.9rem' : '0.75rem 1rem',
      color: '#fff',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      outline: 'none',
      transition: 'background-color 0.2s'
    },
    inputWrapper: {
      position: 'relative'
    },
    eyeIcon: {
      position: 'absolute',
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#aaa',
      fontSize: '1.1rem'
    },
    phoneInput: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      backgroundColor: '#5a5a5a',
      borderRadius: '8px',
      padding: isMobile ? '0.7rem 0.9rem' : '0.75rem 1rem'
    },
    flagIcon: {
      fontSize: '1.2rem'
    },
    phoneNumber: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#fff',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      outline: 'none',
      flex: 1
    },
    dropdown: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#aaa',
      cursor: 'pointer',
      fontSize: '0.9rem'
    },
    dateInput: {
      backgroundColor: '#5a5a5a',
      border: 'none',
      borderRadius: '8px',
      padding: isMobile ? '0.7rem 0.9rem' : '0.75rem 1rem',
      color: '#fff',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      outline: 'none',
      colorScheme: 'dark'
    },
    creditCardInput: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      backgroundColor: '#5a5a5a',
      borderRadius: '8px',
      padding: isMobile ? '0.7rem 0.9rem' : '0.75rem 1rem'
    },
    cardIcon: {
      fontSize: '1.5rem'
    },
    cardNumber: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#fff',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      outline: 'none',
      flex: 1
    },
    textarea: {
      backgroundColor: '#5a5a5a',
      border: 'none',
      borderRadius: '8px',
      padding: isMobile ? '0.7rem 0.9rem' : '0.75rem 1rem',
      color: '#fff',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      outline: 'none',
      minHeight: '100px',
      resize: 'vertical',
      fontFamily: 'inherit'
    },
    textareaActions: {
      position: 'absolute',
      bottom: '0.75rem',
      right: '0.75rem',
      display: 'flex',
      gap: '0.5rem'
    },
    iconButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#aaa',
      cursor: 'pointer',
      fontSize: '1rem',
      padding: '0.25rem'
    },
    saveButton: {
      width: '100%',
      backgroundColor: '#ffd93d',
      color: '#000',
      border: 'none',
      borderRadius: '8px',
      padding: isMobile ? '0.85rem' : '1rem',
      fontSize: isMobile ? '0.95rem' : '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '1rem',
      transition: 'background-color 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>UPDATE PROFILE</h1>

        <div style={styles.card}>
          <div style={styles.header}>
            <h2 style={styles.headerTitle}>Profile Update</h2>
            <button 
              style={styles.editButton}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#555';
                e.currentTarget.style.borderColor = '#777';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#666';
              }}
            >
              <span>✏️</span> Edit
            </button>
          </div>

          <div style={styles.profileSection}>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
              alt="Profile"
              style={styles.profileImage}
            />
            <div style={styles.buttonGroup}>
              <button 
                style={styles.uploadButton}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5c91f'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffd93d'}
              >
                Upload New
              </button>
              <button 
                style={styles.deleteButton}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#555';
                  e.currentTarget.style.borderColor = '#777';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = '#666';
                }}
              >
                Delete
              </button>
            </div>
          </div>
  
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>First Name</label>
              <input 
                type="text" 
                defaultValue="Wade"
                style={styles.input}
                onFocus={(e) => e.target.style.backgroundColor = '#666'}
                onBlur={(e) => e.target.style.backgroundColor = '#5a5a5a'}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name</label>
              <input 
                type="text" 
                defaultValue="Warren"
                style={styles.input}
                onFocus={(e) => e.target.style.backgroundColor = '#666'}
                onBlur={(e) => e.target.style.backgroundColor = '#5a5a5a'}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <input 
                  type={showPassword ? "text" : "password"}
                  defaultValue="••••••••••"
                  style={styles.input}
                  onFocus={(e) => e.target.style.backgroundColor = '#666'}
                  onBlur={(e) => e.target.style.backgroundColor = '#5a5a5a'}
                />
                <span 
                  style={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number</label>
              <div style={styles.phoneInput}>
                <span style={styles.flagIcon}>🇺🇸</span>
                <input 
                  type="tel" 
                  defaultValue="(406) 555-0120"
                  style={styles.phoneNumber}
                />
                <select style={styles.dropdown}>
                  <option>▼</option>
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>E-mail</label>
              <input 
                type="email" 
                defaultValue="wade.warren@example.com"
                style={styles.input}
                onFocus={(e) => e.target.style.backgroundColor = '#666'}
                onBlur={(e) => e.target.style.backgroundColor = '#5a5a5a'}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Date of Birth</label>
              <input 
                type="date" 
                defaultValue="1999-01-12"
                style={styles.dateInput}
              />
            </div>

            <div style={{...styles.formGroup, ...styles.formGroupFull}}>
              <label style={styles.label}>Location</label>
              <input 
                type="text" 
                defaultValue="2972 Westheimer Rd. Santa Ana, Illinois 85486"
                style={styles.input}
                onFocus={(e) => e.target.style.backgroundColor = '#666'}
                onBlur={(e) => e.target.style.backgroundColor = '#5a5a5a'}
              />
            </div>

            <div style={{...styles.formGroup, ...styles.formGroupFull}}>
              <label style={styles.label}>Credit Card</label>
              <div style={styles.creditCardInput}>
                <span style={styles.cardIcon}>💳</span>
                <input 
                  type="text" 
                  defaultValue="943-4359-4444"
                  style={styles.cardNumber}
                />
                <select style={styles.dropdown}>
                  <option>▼</option>
                </select>
              </div>
            </div>

            <div style={{...styles.formGroup, ...styles.formGroupFull}}>
              <label style={styles.label}>Biography</label>
              <div style={{position: 'relative'}}>
                <textarea 
                  placeholder="Enter a biography about you"
                  style={styles.textarea}
                  onFocus={(e) => e.target.style.backgroundColor = '#666'}
                  onBlur={(e) => e.target.style.backgroundColor = '#5a5a5a'}
                />
                { <div style={styles.textareaActions}>
                  <button style={styles.iconButton}>✏️</button>
                  <button style={styles.iconButton}>📎</button>
                </div> }
              </div>
            </div>
          </div>

          <button 
            style={styles.saveButton}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5c91f'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffd93d'}
          >
            Save Change
          </button>
        </div>
      </div>
    </div>
  );
}