export const DELIVERED_STATUS_ERROR =
  "This order has already been delivered. Only Returned or Cancelled status can be selected.";

const allowedTransitions = {
  Pending: ["Processing", "Shipped", "Delivered", "Cancelled"],
  Processing: ["Shipped", "Delivered", "Cancelled"],
  Shipped: ["Delivered", "Cancelled"],
  Delivered: ["Returned", "Cancelled"],
  Cancelled: [],
  Returned: []
};

export const isValidOrderStatusTransition = (currentStatus, nextStatus) =>
  currentStatus === nextStatus ||
  allowedTransitions[currentStatus]?.includes(nextStatus) === true;