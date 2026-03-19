import axios from "axios";

const api = axios.create({
    baseurl:"",
  // baseurl:"https://mpact-e-commerce-2-elbb.onrender.com/api",
  // baseURL: "http://13.48.193.184:5000",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default api;
