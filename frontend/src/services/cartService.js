import axios from "axios";

const API_URL = "https://mpact-e-backend.onrender.com/api";

export const addToCart = async (productId, quantity = 1) => {
  const token = localStorage.getItem("token");

  return axios.post(
    `${API_URL}/cart/add`,
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
