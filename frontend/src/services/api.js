import axios from "axios";

const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
};

const api = axios.create({
  baseURL: "https://mpact-e-commerce-2-elbb.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();

    if (token) {
      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;