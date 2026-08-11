// import api from "./axios";

// // Get logged-in user's cart
// export const getCartApi = () => {
//   return api.get("/api/cart");
// };

// // Add product to cart
// export const addToCartApi = (productId, quantity = 1) => {
//   return api.post("/api/cart/add", { productId, quantity });
// };

// // Update quantity
// export const updateCartItemApi = (productId, quantity) => {
//   return api.put("/api/cart/update", { productId, quantity });
// };

// // Remove item
// export const removeCartItemApi = (productId) => {
//   return api.delete(`/api/cart/remove/${productId}`);
// };



import api from "./axios";

export const getCartApi = () => api.get("/api/cart");

export const addToCartApi = (productId, quantity = 1) =>
  api.post("/api/cart/add", { productId, quantity });

export const updateCartItemApi = (productId, quantity) =>
  api.put("/api/cart/update", { productId, quantity });

export const removeCartItemApi = (productId) =>
  api.delete(`/api/cart/remove/${productId}`);

export const clearCartCouponApi = () =>
  api.post("/api/coupons/clear-cart");
