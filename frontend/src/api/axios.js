import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  // baseURL: "https://mpact-e-backend.onrender.com",
  withCredentials: true,
});

export default api;
