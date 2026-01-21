// import { useState } from 'react';
// import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// // Module CSS styles
// const styles = {
//   container: {
//     minHeight: '100vh',
//     backgroundColor: '#404040',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '1rem',
//     position: 'relative',
//   },
//   backLink: {
//     position: 'absolute',
//     top: '2rem',
//     // left: '2rem',
//     left:'35%',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     color: 'white',
//     fontSize: '0.875rem',
//     textDecoration: 'none',
//     transition: 'opacity 0.3s',
//     cursor: 'pointer',
//   },
//   loginBox: {
//     width: '100%',
//     maxWidth: '460px',
//     border: '2px solid #facc15',
//     borderRadius: '0.5rem',
//     backgroundColor: '#262626',
//     padding: '3rem 2.5rem',
//   },
//   header: {
//     textAlign: 'center',
//     marginBottom: '2rem',
//   },
//   title: {
//     fontSize: '2.75rem',
//     fontWeight: 'bold',
//     color: '#facc15',
//     marginBottom: '0.5rem',
//   },
//   subtitle: {
//     color: '#a3a3a3',
//     fontSize: '0.875rem',
//   },
//   formGroup: {
//     marginBottom: '1.5rem',
//   },
//   label: {
//     display: 'block',
//     color: 'white',
//     fontSize: '0.875rem',
//     marginBottom: '0.5rem',
//   },
//   inputWrapper: {
//     position: 'relative',
//   },
//   icon: {
//     position: 'absolute',
//     left: '1rem',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     color: '#737373',
//   },
//   input: {
//     width: '100%',
//     backgroundColor: '#404040',
//     color: 'white',
//     border: '2px solid #facc15',
//     borderRadius: '0.5rem',
//     paddingLeft: '3rem',
//     paddingRight: '1rem',
//     paddingTop: '0.75rem',
//     paddingBottom: '0.75rem',
//     fontSize: '0.875rem',
//     outline: 'none',
//     transition: 'border-color 0.3s',
//   },
//   inputPassword: {
//     paddingRight: '3rem',
//   },
//   eyeButton: {
//     position: 'absolute',
//     right: '1rem',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     color: '#737373',
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     padding: 0,
//     display: 'flex',
//     alignItems: 'center',
//     transition: 'color 0.3s',
//   },
//   forgotLink: {
//     textAlign: 'right',
//     marginBottom: '1.5rem',
//   },
//   forgotText: {
//     color: '#facc15',
//     fontSize: '0.875rem',
//     textDecoration: 'none',
//     cursor: 'pointer',
//   },
//   loginButton: {
//     width: '100%',
//     backgroundColor: '#facc15',
//     color: 'black',
//     fontWeight: '600',
//     padding: '0.75rem',
//     borderRadius: '0.5rem',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '1rem',
//     transition: 'all 0.3s',
//     marginBottom: '1.5rem',
//   },
//   signupText: {
//     textAlign: 'center',
//     color: '#a3a3a3',
//     fontSize: '0.875rem',
//   },
//   signupLink: {
//     color: '#facc15',
//     fontWeight: '600',
//     textDecoration: 'none',
//     cursor: 'pointer',
//     marginLeft: '0.25rem',
//   },
// };

// // Media queries in JavaScript
// const mediaStyles = `
//   @media (max-width: 640px) {
//     .login-title {
//       font-size: 2rem !important;
//     }
//     .login-box {
//       padding: 2rem 1.5rem !important;
//     }
//     .back-link {
//       top: 1rem !important;
//       left: 1rem !important;
//     }
//   }

//   @media (min-width: 641px) and (max-width: 1024px) {
//     .login-title {
//       font-size: 2.5rem !important;
//     }
//     .login-box {
//       padding: 3rem 2rem !important;
//     }
//   }

//   .back-link:hover {
//     opacity: 0.8;
//   }

//   .input:focus {
//     border-color: #fbbf24;
//   }

//   .login-button:hover {
//     background-color: #fbbf24;
//     transform: translateY(-1px);
//   }

//   .login-button:active {
//     transform: translateY(0);
//   }

//   .eye-button:hover {
//     color: #a3a3a3;
//   }

//   .forgot-text:hover,
//   .signup-link:hover {
//     text-decoration: underline;
//   }

//   .input::placeholder {
//     color: #737373;
//   }
// `;

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

// const navigate = useNavigate();
//  const navigateToHome = () => {
//   navigate("/home");
// };



//   const handleSubmit = () => {
//     console.log('Login submitted:', { email, password });
//   };
  

//   return (
//     <>
//       <style>{mediaStyles}</style>
//       <div style={styles.container}>
//         {/* Back to Home */}
//         <a href="#"
//           style={styles.backLink} 
//           className="back-link" 
//           onClick={navigateToHome}
//         >
//           <ArrowLeft size={20} />
//           <span>Back to Home</span>
//         </a>

//         {/* Login Box */}
//         <div style={styles.loginBox} className="login-box">
//           {/* Header */}
//           <div style={styles.header}>
//             <h1 style={styles.title} className="login-title">
//               Welcome Back
//             </h1>
//             <p style={styles.subtitle}>Login to your account</p>
//           </div>

//           {/* Email Field */}
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Email</label>
//             <div style={styles.inputWrapper}>
//               <div style={styles.icon}>
//                 <Mail size={20} />
//               </div>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 style={styles.input}
//                 className="input"
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Password</label>
//             <div style={styles.inputWrapper}>
//               <div style={styles.icon}>
//                 <Lock size={20} />
//               </div>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 style={{ ...styles.input, ...styles.inputPassword }}
//                 className="input"
//               />
//               <button
//                 onClick={() => setShowPassword(!showPassword)}
//                 style={styles.eyeButton}
//                 className="eye-button"
//                 type="button"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div>

//           {/* Forgot Password */}
//           <div style={styles.forgotLink}>
//             <a href="#" style={styles.forgotText} className="forgot-text">
//               Forgot Password?
//             </a>
//           </div>

//           {/* Login Button */}
//           <button
//             onClick={handleSubmit}
//             style={styles.loginButton}
//             className="login-button"
//           >
//             Login
//           </button>

//           {/* Sign Up Link */}
//           <div style={styles.signupText}>
//             Don't have an account?
//             <a href="#" style={styles.signupLink} className="signup-link">
//               Sign Up
//             </a>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }






import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

// Module CSS styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#404040',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    position: 'relative',
  },
  backLink: {
    position: 'absolute',
    top: '2rem',
    left:'35%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'white',
    fontSize: '0.875rem',
    textDecoration: 'none',
    transition: 'opacity 0.3s',
    cursor: 'pointer',
  },
  loginBox: {
    width: '100%',
    maxWidth: '460px',
    border: '2px solid #facc15',
    borderRadius: '0.5rem',
    backgroundColor: '#262626',
    padding: '3rem 2.5rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.75rem',
    fontWeight: 'bold',
    color: '#facc15',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#a3a3a3',
    fontSize: '0.875rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    color: 'white',
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
  },
  inputWrapper: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#737373',
  },
  input: {
    width: '100%',
    backgroundColor: '#404040',
    color: 'white',
    border: '2px solid #facc15',
    borderRadius: '0.5rem',
    paddingLeft: '3rem',
    paddingRight: '1rem',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputPassword: {
    paddingRight: '3rem',
  },
  eyeButton: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#737373',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.3s',
  },
  forgotLink: {
    textAlign: 'right',
    marginBottom: '1.5rem',
  },
  forgotText: {
    color: '#facc15',
    fontSize: '0.875rem',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#facc15',
    color: 'black',
    fontWeight: '600',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s',
    marginBottom: '1.5rem',
  },
  signupText: {
    textAlign: 'center',
    color: '#a3a3a3',
    fontSize: '0.875rem',
  },
  signupLink: {
    color: '#facc15',
    fontWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer',
    marginLeft: '0.25rem',
  },
};

// Media queries in JavaScript
// const mediaStyles = `

// `;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();


  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!email || !password) {
  //     alert("Please fill all fields");
  //     return;
  //   }

  //   console.log("Login submitted:", { email, password });
  //   // navigate("/home"); // enable after auth
  // };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    const res = await api.post("/api/auth/login", { email, password });

    // 🔥 SAVE USER TO CONTEXT
    setUser(res.data.user);

    toast.success("Login successful");
    navigate("/");

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login failed"
    );
  }
};



// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!email || !password) {
//     toast.error("Please fill all fields");
//     return;
//   }

//   try {
//     await api.post("/api/auth/login", { email, password });

//     toast.success("Login successful");
//     navigate("/");

//   } catch (error) {
//     toast.error(
//       error.response?.data?.message || "Login failed"
//     );
//   }
// };




const mediaStyles = `


  @media (max-width: 640px) {
    .login-title {
      font-size: 2rem !important;
    }
    .login-box {
      padding: 2rem 1.5rem !important;
    }
    .back-link {
      top: 1rem !important;
      left: 1rem !important;
    }
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    .login-title {
      font-size: 2.5rem !important;
    }
    .login-box {
      padding: 3rem 2rem !important;
    }
  }

  .back-link:hover {
    opacity: 0.8;
  }

  .input:focus {
    border-color: #fbbf24;
  }

  .login-button:hover {
    background-color: #fbbf24;
    transform: translateY(-1px);
  }

  .login-button:active {
    transform: translateY(0);
  }

  .eye-button:hover {
    color: #a3a3a3;
  }

  .forgot-text:hover,
  .signup-link:hover {
    text-decoration: underline;
  }

  .input::placeholder {
    color: #737373;
  }


  @media (max-width: 640px) {
    .login-title { font-size: 2rem !important; }
    .login-box { padding: 2rem 1.5rem !important; }
    .back-link { top: 1rem !important; left: 1rem !important; }
  }
  @media (min-width: 641px) and (max-width: 1024px) {
    .login-title { font-size: 2.5rem !important; }
    .login-box { padding: 3rem 2rem !important; }
  }
  .back-link:hover { opacity: 0.8; }
  .input:focus { border-color: #fbbf24; }
  .login-button:hover { background-color: #fbbf24; transform: translateY(-1px); }
  .login-button:active { transform: translateY(0); }
  .eye-button:hover { color: #a3a3a3; }
  .forgot-text:hover,
  .signup-link:hover { text-decoration: underline; }
  .input::placeholder { color: #737373; }
`;



  return (
    <>
      <style>{mediaStyles}</style>

      <div style={styles.container}>
        {/* Back to Home */}
        <Link to="/" style={styles.backLink} className="back-link">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        {/* Login Box */}
        <div style={styles.loginBox} className="login-box">
          <div style={styles.header}>
            <h1 style={styles.title} className="login-title">
              Welcome Back
            </h1>
            <p style={styles.subtitle}>Login to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <div style={styles.inputWrapper}>
                <div style={styles.icon}>
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={styles.input}
                  className="input"
                />
              </div>
            </div>

            {/* Password */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <div style={styles.icon}>
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{ ...styles.input, ...styles.inputPassword }}
                  className="input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  className="eye-button"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div style={styles.forgotLink}>
              <Link to="/forgot-password" style={styles.forgotText}>
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              style={styles.loginButton}
              className="login-button"
            >
              Login
            </button>
          </form>

          {/* Signup */}
          <div style={styles.signupText}>
            Don&apos;t have an account?
            <Link to="/signup" style={styles.signupLink} className="signup-link">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}