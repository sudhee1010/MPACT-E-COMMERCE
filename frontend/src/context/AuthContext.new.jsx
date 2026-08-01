import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
};

const setStoredToken = (token) => {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
  }
};

const clearStoredToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getStoredToken();

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/api/auth/profile");
        setUser(res.data?.user || res.data);
      } catch (error) {
        if (error.response?.status !== 401) {
          console.log("Profile fetch error:", error);
        }
        clearStoredToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setStoredToken(token);
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      console.log("Logout error", error);
    } finally {
      clearStoredToken();
      setUser(null);
      toast.success("Logged out successfully");
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
