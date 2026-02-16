import axios from "axios";

const api = axios.create({
  baseURL: "https://mpact-e-backend.onrender.com",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default api;
