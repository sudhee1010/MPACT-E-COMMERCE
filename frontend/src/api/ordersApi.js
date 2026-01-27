// import api from "./axios";

// export const placeOrderApi = () => {
//   return api.post("/api/orders");
// };

// export const getMyOrdersApi = () => {
//   return api.get("/api/orders/my-orders");
// };

// export const getOrderByIdApi = (id) => {
//   return api.get(`/api/orders/${id}`);
// };


import api from "./axios";

// Place order with required data
export const placeOrderApi = (orderData) => {
  return api.post("/api/orders", orderData);
};

export const getMyOrdersApi = () => {
  return api.get("/api/orders/my-orders");
};

export const getOrderByIdApi = (id) => {
  return api.get(`/api/orders/${id}`);
};

