import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
// import { useCart } from "./CartContext";


const AuthContext = createContext();

/* =========================
   PROVIDER
========================= */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    // const { setCartItems } = useCart();


  /* =========================
     AUTO FETCH PROFILE ON APP LOAD
  ========================= */
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await api.get("/api/auth/profile");
  //       setUser(res.data);
  //     } catch (error) {
  //       setUser(null); // not logged in
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);


  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/auth/profile");
      setUser(res.data);
    } catch (error) {
      if (error.response?.status !== 401) {
        console.log("Profile fetch error:", error);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);



const logout = async () => {
  try {
    await api.post("/api/auth/logout");
    setUser(null);

    // 🔥 CLEAR CART IMMEDIATELY
    // setCartItems([]);
  } catch (error) {
    console.log("Logout error", error);
  }
};

useEffect(() => {
  if (!user) return;
}, [user]);



  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/* =========================
   CUSTOM HOOK
========================= */
export const useAuth = () => useContext(AuthContext);
