import Order from "../models/Order.js";

/**
 * Calculate the total coupon discount for a set of order items.
 *
 * Rules implemented:
 *  - Iterates ALL cart/order items (no early exit after first match).
 *  - Discount is calculated on  price × quantity  (eligible subtotal).
 *  - If the coupon has applicableProducts restrictions, only those products
 *    are eligible; all others get ₹0 discount.
 *  - Per-product usage limit (rule.usageLimit / rule.usedBy) is enforced.
 *  - Per-product first-order-only flag is enforced.
 *  - Global usage limit (coupon.maxRedemptions / coupon.usedCount) must be
 *    checked BEFORE calling this function.
 *  - For "percentage" coupons: discount = eligibleSubtotal × value / 100
 *  - For "flat" coupons:       discount = min(value, eligibleSubtotal)
 *
 * @param {Object}   coupon      - Mongoose Coupon document (populated).
 * @param {Array}    orderItems  - Array of { product (ObjectId|string), price, quantity }.
 * @param {string}   userId      - The requesting user's _id as a string.
 * @returns {Promise<{
 *   totalDiscount: number,
 *   appliedProducts: Array<{product: string, discount: number}>,
 *   anyEligible: boolean
 * }>}
 */
export async function calculateCouponDiscount(coupon, orderItems, userId) {
  let totalDiscount = 0;
  const appliedProducts = [];

  for (const item of orderItems) {
    const productId = item.product?.toString?.() ?? item.product;
    const eligibleSubtotal = (item.price || 0) * (item.quantity || 1);

    /* ── A. Product-specific restriction ─────────────────────────── */
    if (coupon.applicableProducts && coupon.applicableProducts.length > 0) {
      const rule = coupon.applicableProducts.find(
        (p) => p.product.toString() === productId
      );

      // Product is not in the allowed list → skip, no discount
      if (!rule) continue;

      /* ── B. Per-product usage limit ─────────────────────────────── */
      if (rule.usageLimit > 0) {
        const usedByArray = Array.isArray(rule.usedBy) ? rule.usedBy : [];
        if (usedByArray.length >= rule.usageLimit) {
          // This product's coupon slot is fully used → skip
          appliedProducts.push({ product: productId, discount: 0 });
          continue;
        }
      }

      /* ── C. First-order-only per-product flag ───────────────────── */
      if (rule.isFirstOrderOnly) {
        const previousPaidOrder = await Order.findOne({
          user: userId,
          paymentStatus: "paid"
        });
        if (previousPaidOrder) {
          // User has prior paid orders → not eligible for first-order discount
          appliedProducts.push({ product: productId, discount: 0 });
          continue;
        }
      }
    }

    /* ── D. Calculate per-item discount ─────────────────────────────── */
    let itemDiscount = 0;

    if (coupon.discountType === "percentage") {
      itemDiscount = (eligibleSubtotal * coupon.discountValue) / 100;
    } else {
      // flat discount: cap at the eligible subtotal so discount never goes negative
      itemDiscount = Math.min(coupon.discountValue, eligibleSubtotal);
    }

    // Round to 2 decimal places to avoid floating-point noise
    itemDiscount = Math.round(itemDiscount * 100) / 100;

    totalDiscount += itemDiscount;
    appliedProducts.push({ product: productId, discount: itemDiscount });
  }

  totalDiscount = Math.round(totalDiscount * 100) / 100;

  return {
    totalDiscount,
    appliedProducts,
    anyEligible: appliedProducts.some((p) => p.discount > 0)
  };
}
