import axios from "axios";

const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
};

const api = axios.create({
  baseURL: "https://mpact-e-commerce-2-elbb.onrender.com",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default api;
