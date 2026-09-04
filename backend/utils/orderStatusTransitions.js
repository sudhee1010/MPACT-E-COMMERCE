export const DELIVERED_STATUS_ERROR =
  "This order has already been delivered. Only Returned or Cancelled status can be selected.";

const allowedTransitions = {
  initiated: ["placed", "shipped", "delivered", "cancelled"],
  placed: ["shipped", "delivered", "cancelled"],
  packed: ["shipped", "delivered", "cancelled"],
  shipped: ["delivered", "cancelled"],
  delivered: ["returned", "cancelled"],
  cancelled: [],
  returned: [],
  return_requested: []
};

export const isValidOrderStatusTransition = (currentStatus, nextStatus) =>
  currentStatus === nextStatus ||
  allowedTransitions[currentStatus]?.includes(nextStatus) === true;