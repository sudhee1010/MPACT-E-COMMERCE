import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  // baseURL: "https://mpact-e-commerce-2-elbb.onrender.com/api",
  // baseURL: "http://localhost:5000/api",
  // baseURL: "http://13.48.193.184:5000/api",
  withCredentials: true, // Important: enables cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token from cookies if needed
api.interceptors.request.use(
  (config) => {
    // Cookies are automatically sent with withCredentials: true
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