import api from "../services/api";

/* ================= GET PRODUCTS (with filters + cursor) ================= */
export const getProductsApi = (params = {}) => {
  return api.get("/products", { params });
};

/* ================= GET ALL PRODUCTS (Admin) ================= */
export const getAllProductsApi = (params = {}) => {
  return api.get("/products/admin/all", { params });  // Admin endpoint
};

/* ================= GET SINGLE PRODUCT ================= */
export const getProductByIdApi = (id) => {
  return api.get(`/products/${id}`);
};

/* ================= ADMIN ================= */
export const createProductApi = (data) => {
  return api.post("/products", data);
};

export const updateProductApi = (id, data) => {
  return api.put(`/products/${id}`, data);
};

export const deleteProductApi = (id) => {
  return api.delete(`/products/${id}`);
};

/* ================= IMAGE ================= */
export const deleteProductImageApi = (productId, imageId) => {
  return api.delete(`/products/${productId}/image/${imageId}`);
};

export const updateProductImageApi = (productId, imageId, formData) => {
  return api.put(
    `/products/${productId}/image/${imageId}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
};
