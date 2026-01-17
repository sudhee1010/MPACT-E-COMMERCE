import API from "./api";

export const fetchProducts = (params = {}) =>
  API.get("/products", { params });
