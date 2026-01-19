// import { useState } from 'react';
// import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// // CSS Module styles
// const styles = `
// .container {
//   min-height: 100vh;
//   background-color: #404040;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 1rem;
// }

// .wrapper {
//   width: 100%;
//   max-width: 28rem;
// }

// .backButton {
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   color: white;
//   background: none;
//   border: none;
//   margin-bottom: 1.5rem;
//   cursor: pointer;
//   transition: color 0.3s;
// }

// .backButton:hover {
//   color: #facc15;
// }

// .formBox {
//   background-color: #262626;
//   border-radius: 0.5rem;
//   border: 2px solid #facc15;
//   padding: 2rem;
// }

// .title {
//   font-size: 2.25rem;
//   font-weight: bold;
//   color: #facc15;
//   text-align: center;
//   margin-bottom: 0.5rem;
// }

// .subtitle {
//   color: #9ca3af;
//   text-align: center;
//   margin-bottom: 2rem;
// }

// .formContent {
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// }

// .formGroup {
//   display: flex;
//   flex-direction: column;
// }

// .label {
//   display: block;
//   color: white;
//   margin-bottom: 0.5rem;
//   font-weight: 500;
// }

// .inputWrapper {
//   position: relative;
// }

// .icon {
//   position: absolute;
//   left: 0.75rem;
//   top: 50%;
//   transform: translateY(-50%);
//   color: #9ca3af;
//   pointer-events: none;
// }

// .input {
//   width: 100%;
//   background-color: #404040;
//   color: white;
//   border: 2px solid #facc15;
//   border-radius: 0.5rem;
//   padding: 0.75rem 1rem 0.75rem 2.5rem;
//   font-size: 1rem;
// }

// .input::placeholder {
//   color: #9ca3af;
// }

// .input:focus {
//   outline: none;
//   border-color: #fde047;
// }

// .inputWithToggle {
//   padding-right: 3rem;
// }

// .toggleButton {
//   position: absolute;
//   right: 0.75rem;
//   top: 50%;
//   transform: translateY(-50%);
//   background: none;
//   border: none;
//   color: #9ca3af;
//   cursor: pointer;
//   padding: 0.25rem;
//   display: flex;
//   align-items: center;
//   transition: color 0.3s;
// }

// .toggleButton:hover {
//   color: #facc15;
// }

// .submitButton {
//   width: 100%;
//   background-color: #facc15;
//   color: black;
//   font-weight: bold;
//   padding: 0.75rem;
//   border-radius: 0.5rem;
//   border: none;
//   cursor: pointer;
//   transition: background-color 0.3s;
//   font-size: 1rem;
// }

// .submitButton:hover {
//   background-color: #fde047;
// }

// .loginText {
//   text-align: center;
//   color: #9ca3af;
// }

// .loginLink {
//   color: #facc15;
//   text-decoration: none;
//   font-weight: 500;
// }

// .loginLink:hover {
//   text-decoration: underline;
// }

// /* Media Queries */
// @media (max-width: 640px) {
//   .wrapper {
//     max-width: 100%;
//   }

//   .formBox {
//     padding: 1.5rem;
//   }

//   .title {
//     font-size: 1.875rem;
//   }
// }

// @media (min-width: 641px) and (max-width: 1024px) {
//   .wrapper {
//     max-width: 31.25rem;
//   }
// }

// @media (min-width: 1025px) {
//   .wrapper {
//     max-width: 37.5rem;
//   }
// }
// `;

// export default function CreateAccount() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const navigate=useNavigate();
//   function navigatefuntion(){
//     navigate("home")
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = () => {
//     console.log('Form submitted:', formData);
//     alert('Account created successfully!');
//   };

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="container">
//         <div className="wrapper">
//           <button className="backButton" onClick={()=>navigatefuntion("/home")}>
//             <ArrowLeft size={20} />
//             <span>Back to Home</span>
//           </button>

//           <div className="formBox">
//             <h1 className="title">Create Account</h1>
//             <p className="subtitle">Join us today</p>

//             <div className="formContent">
//               {/* Full Name */}
//               <div className="formGroup">
//                 <label className="label">Full Name</label>
//                 <div className="inputWrapper">
//                   <User className="icon" size={20} />
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     placeholder="Enter your full name"
//                     className="input"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="formGroup">
//                 <label className="label">Email</label>
//                 <div className="inputWrapper">
//                   <Mail className="icon" size={20} />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email"
//                     className="input"
//                   />
//                 </div>
//               </div>

//               {/* Phone Number */}
//               <div className="formGroup">
//                 <label className="label">Phone Number (Optional)</label>
//                 <div className="inputWrapper">
//                   <Phone className="icon" size={20} />
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="Enter your phone number"
//                     className="input"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="formGroup">
//                 <label className="label">Password</label>
//                 <div className="inputWrapper">
//                   <Lock className="icon" size={20} />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Create a password"
//                     className="input inputWithToggle"
//                   />
//                   <button
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="toggleButton"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div className="formGroup">
//                 <label className="label">Confirm Password</label>
//                 <div className="inputWrapper">
//                   <Lock className="icon" size={20} />
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     value={formData.confirmData}
//                     onChange={handleChange}
//                     placeholder="Confirm your password"
//                     className="input inputWithToggle"
//                   />
//                   <button
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="toggleButton"
//                   >
//                     {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button onClick={handleSubmit} className="submitButton">
//                 Sign Up
//               </button>

//               {/* Login Link */}
//               <p className="loginText">
//                 Already have an account?{' '}
//                 <a href="#" className="loginLink">
//                   Login
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }




import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import api from '../api/axios';

// CSS Module styles
const styles = `
.container {
  min-height: 100vh;
  background-color: #404040;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.wrapper {
  width: 100%;
  max-width: 28rem;
}

.backButton {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  background: none;
  border: none;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;
}

.backButton:hover {
  color: #facc15;
}

.formBox {
  background-color: #262626;
  border-radius: 0.5rem;
  border: 2px solid #facc15;
  padding: 2rem;
}

.title {
  font-size: 2.25rem;
  font-weight: bold;
  color: #facc15;
  text-align: center;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #9ca3af;
  text-align: center;
  margin-bottom: 2rem;
}

.formContent {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.formGroup {
  display: flex;
  flex-direction: column;
}

.label {
  display: block;
  color: white;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.inputWrapper {
  position: relative;
}

.icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.input {
  width: 100%;
  background-color: #404040;
  color: white;
  border: 2px solid #facc15;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-size: 1rem;
}

.input::placeholder {
  color: #9ca3af;
}

.input:focus {
  outline: none;
  border-color: #fde047;
}

.inputWithToggle {
  padding-right: 3rem;
}

.toggleButton {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  transition: color 0.3s;
}

.toggleButton:hover {
  color: #facc15;
}

.submitButton {
  width: 100%;
  background-color: #facc15;
  color: black;
  font-weight: bold;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1rem;
}

.submitButton:hover {
  background-color: #fde047;
}

.loginText {
  text-align: center;
  color: #9ca3af;
}

.loginLink {
  color: #facc15;
  text-decoration: none;
  font-weight: 500;
}

.loginLink:hover {
  text-decoration: underline;
}

/* Media Queries */
@media (max-width: 640px) {
  .wrapper {
    max-width: 100%;
  }
  
  .formBox {
    padding: 1.5rem;
  }
  
  .title {
    font-size: 1.875rem;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .wrapper {
    max-width: 31.25rem;
  }
}

@media (min-width: 1025px) {
  .wrapper {
    max-width: 37.5rem;
  }
}
`;

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // axios.defaults.withCredentials = true;


  const navigate = useNavigate();
  // function navigatefuntion(){
  //   navigate("/")
  // }
  const goHome = () => navigate("/");


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // const handleSubmit = () => {
  //   console.log('Form submitted:', formData);
  //   alert('Account created successfully!');
  // };

  // const handleSubmit = async () => {
  //   if (formData.password !== formData.confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }


  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/auth/register-user",
  //       {
  //         name: formData.name, 
  //         email: formData.email,
  //         phone: formData.phone,
  //         password: formData.password
  //       }
  //     );

  //     // store token if needed
  //     localStorage.setItem("token", res.data.token);

  //     alert("Account created successfully. Please verify your email.");
  //     navigate("/verify-email"); // optional

  //   } catch (error) {
  //     alert(error.response?.data?.message || "Signup failed");
  //   }
  // };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await api.post("/api/auth/register-user",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }
      );

      toast.success("Account created. Please verify your email.");
      navigate("/verify-email");

    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };



  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="wrapper">
          {/* <button className="backButton" onClick={()=>navigatefuntion("/")}> */}
          <button className="backButton" onClick={goHome}>
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>

          <div className="formBox">
            <h1 className="title">Create Account</h1>
            <p className="subtitle">Join us today</p>

            <div className="formContent">
              {/* Full Name */}
              <div className="formGroup">
                <label className="label">Full Name</label>
                <div className="inputWrapper">
                  <User className="icon" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="input"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="formGroup">
                <label className="label">Email</label>
                <div className="inputWrapper">
                  <Mail className="icon" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="input"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="formGroup">
                <label className="label">Phone Number</label>
                <div className="inputWrapper">
                  <Phone className="icon" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="formGroup">
                <label className="label">Password</label>
                <div className="inputWrapper">
                  <Lock className="icon" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="input inputWithToggle"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggleButton"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="formGroup">
                <label className="label">Confirm Password</label>
                <div className="inputWrapper">
                  <Lock className="icon" size={20} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="input inputWithToggle"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="toggleButton"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              {/* <button onClick={handleSubmit} className="submitButton">
                Sign Up
              </button> */}
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <button type="submit" className="submitButton">Sign Up</button>
              </form>


              {/* Login Link */}
              <p className="loginText">
                Already have an account?{' '}
                <a href="/login" className="loginLink">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}