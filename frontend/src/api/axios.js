import axios from "axios";

const api = axios.create({
  baseURL: "",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default api;
