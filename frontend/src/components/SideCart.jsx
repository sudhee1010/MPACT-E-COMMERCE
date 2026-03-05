// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { updateCartItemApi, removeCartItemApi } from "../api/cartApi";
// import { useCart } from "../context/CartContext";

// export default function SideCart() {
//   const {
//     cartItems,
//     setCartItems,
//     refreshCart,
//     openSideCart,
//     setOpenSideCart,
//     cartMeta,
//   } = useCart();

//   // Add state to track stock errors from backend
//   const [stockErrors, setStockErrors] = useState({});

//   const increaseQty = async (productId, currentQty, stock) => {
//     // Prevent increasing quantity beyond available stock
//     if (currentQty >= stock) {
//       setStockErrors(prev => ({ 
//         ...prev, 
//         [productId]: "Max stock reached" 
//       }));
//       return;
//     }

//     // Clear any previous stock error for this product
//     setStockErrors(prev => ({ ...prev, [productId]: null }));

//     try {
//       // Optimistic UI update
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.product._id === productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item,
//         ),
//       );

//       // Call API to update backend
//       await updateCartItemApi(productId, currentQty + 1);
//       refreshCart(); // Refresh cart to sync with backend
//     } catch (err) {
//       console.log("Increase qty error:", err);

//       // If error contains stock-related message
//       if (
//         err.response?.data?.message?.includes("stock") ||
//         err.response?.data?.error?.includes("stock") ||
//         err.response?.data?.message?.includes("available") ||
//         err.response?.data?.error?.includes("available")
//       ) {
//         console.log("Stock limitation error:", err.response?.data);
//         // Set stock error to disable button for this product
//         setStockErrors(prev => ({ 
//           ...prev, 
//           [productId]: "max stock reached" 
//         }));
//       }

//       // Refresh cart to revert optimistic update on error
//       refreshCart();
//     }
//   };

//   const decreaseQty = async (productId, currentQty) => {
//     try {
//       if (currentQty <= 1) {
//         const res = await removeCartItemApi(productId);
//         setCartItems(res.data.items);
//         // Clear any stock errors for this product
//         setStockErrors(prev => {
//           const updated = { ...prev };
//           delete updated[productId];
//           return updated;
//         });
//         refreshCart();
//         return;
//       }

//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.product._id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item,
//         ),
//       );

//       // Clear stock error when decreasing quantity
//       setStockErrors(prev => ({ ...prev, [productId]: null }));

//       await updateCartItemApi(productId, currentQty - 1);
//       refreshCart();
//     } catch (err) {
//       console.error("Decrease qty error:", err.message);
//       refreshCart(); // rollback on error
//     }
//   };

//   const removeItem = async (productId) => {
//     try {
//       const res = await removeCartItemApi(productId);
//       setCartItems(res.data.items);

//       // Clear stock error for removed item
//       setStockErrors(prev => {
//         const updated = { ...prev };
//         delete updated[productId];
//         return updated;
//       });

//       refreshCart();
//     } catch (err) {
//       console.error("Remove item error:", err.message);
//     }
//   };

//   // Helper to disable + button when at max stock
//   const isMaxStock = (productId, currentQty) => {
//     const item = cartItems.find((item) => item.product._id === productId);
//     if (!item) return false;

//     // Check if there's a stock error from backend
//     if (stockErrors[productId]) {
//       return true;
//     }

//     // Check local stock count
//     return currentQty >= item.product.countInStock;
//   };

//   const totalMRP = cartItems.reduce(
//     (sum, item) => sum + item.originalPrice * item.quantity,
//     0,
//   );

//   const totalPrice = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0,
//   );

//   const discount = totalMRP - totalPrice;

//   useEffect(() => {
//     if (openSideCart) {
//       refreshCart();
//     }
//   }, [openSideCart]);

//   useEffect(() => {
//     if (openSideCart) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [openSideCart]);

//   useEffect(() => {
//     if (!cartItems.length) {
//       setOpenSideCart(false);
//     }
//   }, [cartItems]);

//   return (
//     <>
//       <style>{`

//         .overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,.6);
//           z-index: 998;
//           opacity: ${openSideCart ? "1" : "0"};
//           pointer-events: ${openSideCart ? "auto" : "none"};
//           transition: opacity 0.3s ease;
//         }

//         .sidecart {
//           position: fixed;
//           top: var(--navbar-height);
//           bottom: 0;
//           right: 0;
//           width: 350px;
//           background: #2a2a2a;
//           transform: translateX(${openSideCart ? "0" : "100%"});
//           transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
//           z-index: 999;
//           display: flex;
//           flex-direction: column;
//           max-width: 100%;
//           overscroll-behavior: contain;
//         }

//         .header {
//           background: #ffeb00;
//           color: #000;
//           padding: 16px 20px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           font-weight: 900;
//           position: sticky;
//           top: 0;
//           z-index: 10;
//         }

//         .close-btn {
//           cursor: pointer;
//           font-size: 24px;
//           line-height: 1;
//           background: none;
//           border: none;
//           color: #000;
//           padding: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 30px;
//           height: 30px;
//           transition: transform 0.2s;
//         }

//         .close-btn:hover {
//           transform: scale(1.1);
//         }

//         .body {
//           padding: 14px;
//           flex: 1;
//           overflow-y: auto;
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//         }

//         .empty-cart {
//           text-align: center;
//           color: #ffeb00;
//           padding: 40px 20px;
//           font-size: 16px;
//         }

//         .item {
//           border: 2px solid #ffeb00;
//           border-radius: 12px;
//           padding: 6px;
//           display: flex;
//           gap: 16px;
//           position: relative;
//           background: #333;
//         }

//         .item img {
//           width: 90px;
//           height: 120px;
//           object-fit: cover;
//           border-radius: 6px;
//           flex-shrink: 0;
//         }

//         .item-details {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//           min-width: 0;
//         }

//         .item-details h4 {
//           margin: 0;
//           font-size: 16px;
//           color: #fff;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//         }

//         .item-details p {
//           margin: 0;
//           color: #ffeb00;
//           font-weight: bold;
//         }

//         .item-details del {
//           color: #999;
//           margin-left: 8px;
//         }

//         .stock-warning {
//           font-size: 12px;
//           width: fit-content;
//           color: #ff6b6b;
//           background: rgba(255, 107, 107, 0.15);
//           padding: 6px 8px;
//           border-radius: 4px;
//           border-left: 3px solid #ff6b6b;
//           margin-top: 4px;
//           font-weight: 500;
//         }

//         .qty {
//           display: flex;
//           border: 1px solid #ffeb00;
//           width: fit-content;
//           border-radius: 4px;
//           overflow: hidden;
//           margin-top: 8px;
//         }

//         .qty button {
//           width: 35px;
//           height: 35px;
//           background: none;
//           color: #fff;
//           border: none;
//           cursor: pointer;
//           font-size: 18px;
//           transition: background 0.2s;
//         }

//         .qty button:hover:not(:disabled) {
//           background: rgba(255, 235, 0, 0.2);
//         }

//         .qty button:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//           color: #999;
//           background: rgba(255, 0, 0, 0.1);
//         }

//         .qty span {
//           min-width: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #fff;
//           border-left: 1px solid #ffeb00;
//           border-right: 1px solid #ffeb00;
//         }

//         .remove {
//           position: absolute;
//           right: 16px;
//           bottom: 16px;
//           color: #ff4444;
//           cursor: pointer;
//           font-size: 13px;
//           text-decoration: underline;
//           transition: color 0.2s;
//         }

//         .remove:hover {
//           color: #ff6666;
//         }

//         .priceBox {
//           border-top: 2px solid #ffeb00;
//           padding: 10px 14px;
//           background: #222;
//         }

//         .row {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 4px;
//           color: #fff;
//           font-size: 15px;
//         }

//         .row:last-child {
//           margin-bottom: 0;
//           font-size: 18px;
//           font-weight: bold;
//           padding-top: 4px;
//           border-top: 1px solid #444;
//         }

//         .green {
//           color: #00c853;
//           font-weight: bold;
//         }

//         .footer {
//           padding: 14px 14px;
//           background: #2a2a2a;
//         }

//         .footer a {
//           display: block;
//           background: #ffeb00;
//           color: #000;
//           padding: 8px;
//           text-align: center;
//           font-weight: 900;
//           text-decoration: none;
//           border-radius: 8px;
//           transition: background 0.2s;
//         }

//         .footer a:hover {
//           background: #ffed33;
//         }

//         @media (max-width: 480px) {
//           .header {
//             padding: 14px 16px;
//             font-size: 14px;
//           }

//           .body {
//             padding: 12px;
//           }

//           .item {
//             padding: 12px;
//             gap: 10px;
//           }

//           .item img {
//             width: 60px;
//             height: 80px;
//           }

//           .item-details h4 {
//             font-size: 13px;
//           }

//           .item-details p {
//             font-size: 13px;
//           }

//           .stock-warning {
//             font-size: 11px;
//           }

//           .qty button {
//             width: 30px;
//             height: 30px;
//           }

//           .qty span {
//             min-width: 30px;
//             font-size: 13px;
//           }

//           .priceBox {
//             padding: 14px 12px;
//           }

//           .row {
//             font-size: 13px;
//           }

//           .row:last-child {
//             font-size: 15px;
//           }
//         }

//         @media (max-width: 360px) {
//           .item img {
//             width: 50px;
//             height: 70px;
//           }

//           .item-details h4 {
//             font-size: 12px;
//           }

//           .qty button {
//             width: 28px;
//             height: 28px;
//             font-size: 14px;
//           }

//           .qty span {
//             min-width: 28px;
//           }
//         }

//         @media (max-width: 768px) {
//           .sidecart {
//             top: --navbar-height-mobile;
//             bottom: 0;
//             width: 100%;
//             height: 100vh;
//           }

//           .header {
//             position: sticky;
//             top: 0;
//             height: 50px;
//             padding: 0 16px;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             z-index: 1001;
//           }

//           .close-btn {
//             width: 40px;
//             height: 40px;
//             font-size: 24px;
//           }

//           .body {
//             padding-top: 16px;
//           }

//           .remove {
//             position: absolute;
//             height: 30px;
//             right: 12px;
//             top: 12px;
//             font-size: 12px;
//             padding: 4px 8px;
//             background: #ff4444;
//             color: white;
//             border-radius: 4px;
//             text-decoration: none;
//           }

//           .remove:hover {
//             background: #ff6666;
//           }

//           .item {
//             padding: 12px;
//           }
//         }
//       `}</style>

//       <div className="overlay" onClick={() => setOpenSideCart(false)} />

//       <div className="sidecart">
//         <div className="header">
//           <span>🛒 MY CART ({cartItems.length})</span>
//           <button
//             className="close-btn"
//             onClick={() => setOpenSideCart(false)}
//             aria-label="Close cart"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="body">
//           {cartItems.length === 0 && (
//             <div className="empty-cart">Your cart is empty</div>
//           )}

//           {cartItems.map((item) => (
//             <div className="item" key={item.product._id}>
//               <img
//                 src={item.product.images?.[0]?.url || "/images/Product1.png"}
//                 alt={item.product.name}
//               />

//               <div className="item-details">
//                 <h4>{item.product.name}</h4>

//                 <p>
//                   ₹{item.price} <del>₹{item.originalPrice}</del>
//                 </p>

//                 {/* Display stock error message if exists */}
//                 {stockErrors[item.product._id] && (
//                   <div className="stock-warning">
//                     ⚠️ {stockErrors[item.product._id]}
//                   </div>
//                 )}

//                 {/* Stock warning message when at max but no specific error */}
//                 {!stockErrors[item.product._id] &&
//                   item.quantity >= item.product.countInStock && (
//                     <div className="stock-warning">
//                       📦 Max stock reached ({item.product.countInStock} available)
//                     </div>
//                   )}

//                 <div className="qty">
//                   <button
//                     onClick={() => decreaseQty(item.product._id, item.quantity)}
//                     aria-label="Decrease quantity"
//                   >
//                     −
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() =>
//                       increaseQty(
//                         item.product._id,
//                         item.quantity,
//                         item.product.countInStock,
//                       )
//                     }
//                     // Disable button when either local stock is reached OR backend has stock error
//                     disabled={isMaxStock(item.product._id, item.quantity)}
//                     aria-label="Increase quantity"
//                     title={
//                       isMaxStock(item.product._id, item.quantity)
//                         ? stockErrors[item.product._id] ||
//                           "Maximum stock reached"
//                         : "Add one more"
//                     }
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               <span
//                 className="remove"
//                 onClick={() => removeItem(item.product._id)}
//               >
//                 Remove
//               </span>
//             </div>
//           ))}
//         </div>

//         {cartItems.length > 0 && (
//           <>
//             <div className="priceBox">
//               <div className="row">
//                 <span>Price</span>
//                 <span>₹{totalMRP}</span>
//               </div>

//               <div className="row green">
//                 <span>Discount</span>
//                 <span>-₹{discount}</span>
//               </div>

//               <div className="row">
//                 <span>Tax</span>
//                 <span>₹{cartMeta.taxAmount.toFixed(2)}</span>
//               </div>

//               <div className="row green">
//                 <span>Total</span>
//                 <span>₹{cartMeta.totalWithTax.toFixed(2)}</span>
//               </div>
//             </div>

//             <div className="footer">
//               <Link to="/cart" onClick={() => setOpenSideCart(false)}>
//                 PLACE ORDER
//               </Link>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }







// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { updateCartItemApi, removeCartItemApi } from "../api/cartApi";
// import { useCart } from "../context/CartContext";

// export default function SideCart() {
//   const {
//     cartItems,
//     setCartItems,
//     refreshCart,
//     openSideCart,
//     setOpenSideCart,
//     cartMeta,
//   } = useCart();

//   // Add state to track stock errors from backend
//   const [stockErrors, setStockErrors] = useState({});

//   const increaseQty = async (productId, currentQty, stock) => {
//     // Prevent increasing quantity beyond available stock
//     if (currentQty >= stock) {
//       setStockErrors((prev) => ({
//         ...prev,
//         [productId]: "Max stock reached",
//       }));
//       return;
//     }

//     // Clear any previous stock error for this product
//     setStockErrors((prev) => ({ ...prev, [productId]: null }));

//     try {
//       // Optimistic UI update
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.product._id === productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item,
//         ),
//       );

//       // Call API to update backend
//       await updateCartItemApi(productId, currentQty + 1);
//       refreshCart(); // Refresh cart to sync with backend
//     } catch (err) {
//       console.log("Increase qty error:", err);

//       // If error contains stock-related message
//       if (
//         err.response?.data?.message?.includes("stock") ||
//         err.response?.data?.error?.includes("stock") ||
//         err.response?.data?.message?.includes("available") ||
//         err.response?.data?.error?.includes("available")
//       ) {
//         console.log("Stock limitation error:", err.response?.data);
//         // Set stock error to disable button for this product
//         setStockErrors((prev) => ({
//           ...prev,
//           [productId]: "max stock reached",
//         }));
//       }

//       // Refresh cart to revert optimistic update on error
//       refreshCart();
//     }
//   };

//   const decreaseQty = async (productId, currentQty) => {
//     try {
//       if (currentQty <= 1) {
//         const res = await removeCartItemApi(productId);
//         setCartItems(res.data.items);
//         // Clear any stock errors for this product
//         setStockErrors((prev) => {
//           const updated = { ...prev };
//           delete updated[productId];
//           return updated;
//         });
//         refreshCart();
//         return;
//       }

//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.product._id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item,
//         ),
//       );

//       // Clear stock error when decreasing quantity
//       setStockErrors((prev) => ({ ...prev, [productId]: null }));

//       await updateCartItemApi(productId, currentQty - 1);
//       refreshCart();
//     } catch (err) {
//       console.error("Decrease qty error:", err.message);
//       refreshCart(); // rollback on error
//     }
//   };

//   const removeItem = async (productId) => {
//     try {
//       const res = await removeCartItemApi(productId);
//       setCartItems(res.data.items);

//       // Clear stock error for removed item
//       setStockErrors((prev) => {
//         const updated = { ...prev };
//         delete updated[productId];
//         return updated;
//       });

//       refreshCart();
//     } catch (err) {
//       console.error("Remove item error:", err.message);
//     }
//   };

//   // Helper to disable + button when at max stock
//   const isMaxStock = (productId, currentQty) => {
//     const item = cartItems.find((item) => item.product._id === productId);
//     if (!item) return false;

//     // Check if there's a stock error from backend
//     if (stockErrors[productId]) {
//       return true;
//     }

//     // Check local stock count
//     return currentQty >= item.product.countInStock;
//   };

//   const totalMRP = cartItems.reduce(
//     (sum, item) => sum + item.originalPrice * item.quantity,
//     0,
//   );

//   const totalPrice = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0,
//   );

//   const discount = totalMRP - totalPrice;

//   useEffect(() => {
//     if (openSideCart) {
//       refreshCart();
//     }
//   }, [openSideCart]);

//   useEffect(() => {
//     if (openSideCart) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [openSideCart]);

//   useEffect(() => {
//     if (!cartItems.length) {
//       setOpenSideCart(false);
//     }
//   }, [cartItems]);

//   return (
//     <>
//       <style>{`

//         .overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,.6);
//           z-index: 998;
//           opacity: ${openSideCart ? "1" : "0"};
//           pointer-events: ${openSideCart ? "auto" : "none"};
//           transition: opacity 0.3s ease;
//         }

//         /* ── Core sidecart shell ──
//            Always anchored to the navbar bottom edge via top: var(--navbar-height).
//            flex-direction: column lets header / body / priceBox / footer
//            stack naturally; body takes all remaining space and scrolls. */
//         .sidecart {
//           position: fixed;
//           top: var(--navbar-height);
//           bottom: 0;
//           right: 0;
//           width: 350px;
//           max-width: 100%;
//           background: #2a2a2a;
//           transform: translateX(${openSideCart ? "0" : "100%"});
//           transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
//           z-index: 999;
//           display: flex;
//           flex-direction: column;
//           overscroll-behavior: contain;
//         }

//         /* ── Header ── */
//         .header {
//           background: #ffeb00;
//           color: #000;
//           padding: 16px 20px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           font-weight: 900;
//           flex-shrink: 0;
//         }

//         .close-btn {
//           cursor: pointer;
//           font-size: 24px;
//           line-height: 1;
//           background: none;
//           border: none;
//           color: #000;
//           padding: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 30px;
//           height: 30px;
//           transition: transform 0.2s;
//         }

//         .close-btn:hover {
//           transform: scale(1.1);
//         }

//         /* ── Scrollable item list ──
//            flex: 1 + min-height: 0 is the key combo that makes an inner
//            flex child shrink and scroll instead of overflowing the parent. */
//         .body {
//           padding: 14px;
//           flex: 1;
//           min-height: 0;
//           overflow-y: auto;
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//         }

//         .body::-webkit-scrollbar {
//           display: none;
//         }

//         .empty-cart {
//           text-align: center;
//           color: #ffeb00;
//           padding: 40px 20px;
//           font-size: 16px;
//         }

//         /* ── Cart item card ── */
//         .item {
//           border: 2px solid #ffeb00;
//           border-radius: 12px;
//           padding: 6px;
//           display: flex;
//           gap: 16px;
//           position: relative;
//           background: #333;
//           flex-shrink: 0;
//         }

//         .item img {
//           width: 90px;
//           height: 120px;
//           object-fit: cover;
//           border-radius: 6px;
//           flex-shrink: 0;
//         }

//         .item-details {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//           min-width: 0;
//         }

//         .item-details h4 {
//           margin: 0;
//           font-size: 16px;
//           color: #fff;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//         }

//         .item-details p {
//           margin: 0;
//           color: #ffeb00;
//           font-weight: bold;
//         }

//         .item-details del {
//           color: #999;
//           margin-left: 8px;
//         }

//         .stock-warning {
//           font-size: 12px;
//           width: fit-content;
//           color: #ff6b6b;
//           background: rgba(255, 107, 107, 0.15);
//           padding: 6px 8px;
//           border-radius: 4px;
//           border-left: 3px solid #ff6b6b;
//           margin-top: 4px;
//           font-weight: 500;
//         }

//         .qty {
//           display: flex;
//           border: 1px solid #ffeb00;
//           width: fit-content;
//           border-radius: 4px;
//           overflow: hidden;
//           margin-top: 8px;
//         }

//         .qty button {
//           width: 35px;
//           height: 35px;
//           background: none;
//           color: #fff;
//           border: none;
//           cursor: pointer;
//           font-size: 18px;
//           transition: background 0.2s;
//         }

//         .qty button:hover:not(:disabled) {
//           background: rgba(255, 235, 0, 0.2);
//         }

//         .qty button:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//           color: #999;
//           background: rgba(255, 0, 0, 0.1);
//         }

//         .qty span {
//           min-width: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #fff;
//           border-left: 1px solid #ffeb00;
//           border-right: 1px solid #ffeb00;
//         }

//         .remove {
//           position: absolute;
//           right: 16px;
//           bottom: 16px;
//           color: #ff4444;
//           cursor: pointer;
//           font-size: 13px;
//           text-decoration: underline;
//           transition: color 0.2s;
//         }

//         .remove:hover {
//           color: #ff6666;
//         }

//         /* ── Price summary ── */
//         .priceBox {
//           border-top: 2px solid #ffeb00;
//           padding: 10px 14px;
//           background: #222;
//           flex-shrink: 0;
//         }

//         .row {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 4px;
//           color: #fff;
//           font-size: 15px;
//         }

//         .row:last-child {
//           margin-bottom: 0;
//           font-size: 18px;
//           font-weight: bold;
//           padding-top: 4px;
//           border-top: 1px solid #444;
//         }

//         .green {
//           color: #00c853;
//           font-weight: bold;
//         }

//         /* ── Place order button ── */
//         .footer {
//           padding: 14px;
//           background: #2a2a2a;
//           flex-shrink: 0;
//         }

//         .footer a {
//           display: block;
//           background: #ffeb00;
//           color: #000;
//           padding: 8px;
//           text-align: center;
//           font-weight: 900;
//           text-decoration: none;
//           border-radius: 8px;
//           transition: background 0.2s;
//         }

//         .footer a:hover {
//           background: #ffed33;
//         }

//         /* ── Mobile: full-width panel, still anchored below navbar ── */
//         @media (max-width: 768px) {
//           .sidecart {
//             width: 100%;
//           }
//         }

//         /* ── Compact tweaks for smaller phones ── */
//         @media (max-width: 480px) {
//           .header {
//             height: 50px;
//             padding: 0 16px;
//             font-size: 14px;
//           }

//           .close-btn {
//             width: 40px;
//             height: 40px;
//             font-size: 24px;
//           }

//           .body {
//             padding: 12px;
//           }

//           .item {
//             padding: 12px;
//             gap: 10px;
//           }

//           .item img {
//             width: 60px;
//             height: 80px;
//           }

//           .item-details h4 {
//             font-size: 13px;
//           }

//           .item-details p {
//             font-size: 13px;
//           }

//           .stock-warning {
//             font-size: 11px;
//           }

//           .qty button {
//             width: 30px;
//             height: 30px;
//           }

//           .qty span {
//             min-width: 30px;
//             font-size: 13px;
//           }

//           /* Remove button moves to top-right on small screens */
//           .remove {
//             top: 12px;
//             bottom: auto;
//             right: 12px;
//             font-size: 12px;
//             padding: 4px 8px;
//             background: #ff4444;
//             color: white;
//             border-radius: 4px;
//             text-decoration: none;
//             height: 30px;
//             display: flex;
//             align-items: center;
//           }

//           .remove:hover {
//             background: #ff6666;
//             color: white;
//           }

//           .priceBox {
//             padding: 12px;
//           }

//           .row {
//             font-size: 13px;
//           }

//           .row:last-child {
//             font-size: 15px;
//           }

//           .footer {
//             padding: 12px;
//           }
//         }

//         /* ── Very small phones ── */
//         @media (max-width: 360px) {
//           .item img {
//             width: 50px;
//             height: 70px;
//           }

//           .item-details h4 {
//             font-size: 12px;
//           }

//           .qty button {
//             width: 28px;
//             height: 28px;
//             font-size: 14px;
//           }

//           .qty span {
//             min-width: 28px;
//           }
//         }
//       `}</style>

//       <div className="overlay" onClick={() => setOpenSideCart(false)} />

//       <div className="sidecart">
//         <div className="header">
//           <span>🛒 MY CART ({cartItems.length})</span>
//           <button
//             className="close-btn"
//             onClick={() => setOpenSideCart(false)}
//             aria-label="Close cart"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="body">
//           {cartItems.length === 0 && (
//             <div className="empty-cart">Your cart is empty</div>
//           )}

//           {cartItems.map((item) => (
//             <div className="item" key={item.product._id}>
//               <img
//                 src={item.product.images?.[0]?.url || "/images/Product1.png"}
//                 alt={item.product.name}
//               />

//               <div className="item-details">
//                 <h4>{item.product.name}</h4>

//                 <p>
//                   ₹{item.price} <del>₹{item.originalPrice}</del>
//                 </p>

//                 {/* Display stock error message if exists */}
//                 {stockErrors[item.product._id] && (
//                   <div className="stock-warning">
//                     ⚠️ {stockErrors[item.product._id]}
//                   </div>
//                 )}

//                 {/* Stock warning message when at max but no specific error */}
//                 {!stockErrors[item.product._id] &&
//                   item.quantity >= item.product.countInStock && (
//                     <div className="stock-warning">
//                       📦 Max stock reached ({item.product.countInStock}{" "}
//                       available)
//                     </div>
//                   )}

//                 <div className="qty">
//                   <button
//                     onClick={() => decreaseQty(item.product._id, item.quantity)}
//                     aria-label="Decrease quantity"
//                   >
//                     −
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() =>
//                       increaseQty(
//                         item.product._id,
//                         item.quantity,
//                         item.product.countInStock,
//                       )
//                     }
//                     disabled={isMaxStock(item.product._id, item.quantity)}
//                     aria-label="Increase quantity"
//                     title={
//                       isMaxStock(item.product._id, item.quantity)
//                         ? stockErrors[item.product._id] ||
//                           "Maximum stock reached"
//                         : "Add one more"
//                     }
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               <span
//                 className="remove"
//                 onClick={() => removeItem(item.product._id)}
//               >
//                 Remove
//               </span>
//             </div>
//           ))}
//         </div>

//         {cartItems.length > 0 && (
//           <>
//             <div className="priceBox">
//               <div className="row">
//                 <span>Price</span>
//                 <span>₹{totalMRP}</span>
//               </div>

//               <div className="row green">
//                 <span>Discount</span>
//                 <span>-₹{discount}</span>
//               </div>

//               <div className="row">
//                 <span>Tax</span>
//                 <span>₹{cartMeta.taxAmount.toFixed(2)}</span>
//               </div>

//               <div className="row green">
//                 <span>Total</span>
//                 <span>₹{cartMeta.totalWithTax.toFixed(2)}</span>
//               </div>
//             </div>

//             <div className="footer">
//               <Link to="/cart" onClick={() => setOpenSideCart(false)}>
//                 PLACE ORDER
//               </Link>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }




// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { updateCartItemApi, removeCartItemApi } from "../api/cartApi";
// import { useCart } from "../context/CartContext";

// export default function SideCart() {
//   const {
//     cartItems,
//     setCartItems,
//     refreshCart,
//     openSideCart,
//     setOpenSideCart,
//     cartMeta,
//   } = useCart();

//   const [stockErrors, setStockErrors] = useState({});

//   // 🔥 ONLY NEW ADDITION (CRASH FIX)
//   const safeCartItems = cartItems.filter(
//     (item) => item && item.product
//   );

//   const increaseQty = async (productId, currentQty, stock) => {
//     if (currentQty >= stock) {
//       setStockErrors((prev) => ({
//         ...prev,
//         [productId]: "Max stock reached",
//       }));
//       return;
//     }

//     setStockErrors((prev) => ({ ...prev, [productId]: null }));

//     try {
//       // ✅ KEEP YOUR OPTIMISTIC UPDATE
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.product?._id === productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );

//       await updateCartItemApi(productId, currentQty + 1);
//       refreshCart();
//     } catch (err) {
//       if (
//         err.response?.data?.message?.includes("stock") ||
//         err.response?.data?.message?.includes("available")
//       ) {
//         setStockErrors((prev) => ({
//           ...prev,
//           [productId]: err.response.data.message,
//         }));
//       }

//       refreshCart();
//     }
//   };

//   const decreaseQty = async (productId, currentQty) => {
//     try {
//       if (currentQty <= 1) {
//         const res = await removeCartItemApi(productId);
//         setCartItems(res.data.items);
//         refreshCart();
//         return;
//       }

//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.product?._id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//       );

//       await updateCartItemApi(productId, currentQty - 1);
//       refreshCart();
//     } catch (err) {
//       refreshCart();
//     }
//   };

//   const removeItem = async (productId) => {
//     try {
//       const res = await removeCartItemApi(productId);
//       setCartItems(res.data.items);
//       refreshCart();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const isMaxStock = (productId, currentQty) => {
//     const item = safeCartItems.find(
//       (item) => item.product?._id === productId
//     );
//     if (!item) return false;

//     if (stockErrors[productId]) return true;

//     return currentQty >= (item.product?.countInStock || 0);
//   };

//   const totalMRP = safeCartItems.reduce(
//     (sum, item) => sum + (item.originalPrice || 0) * item.quantity,
//     0
//   );

//   const totalPrice = safeCartItems.reduce(
//     (sum, item) => sum + (item.price || 0) * item.quantity,
//     0
//   );

//   const discount = totalMRP - totalPrice;

//   useEffect(() => {
//     if (openSideCart) refreshCart();
//   }, [openSideCart]);

//   useEffect(() => {
//     document.body.style.overflow = openSideCart ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [openSideCart]);

//   useEffect(() => {
//     if (!safeCartItems.length) {
//       setOpenSideCart(false);
//     }
//   }, [safeCartItems]);

//   return (
//     <>
//       <style>{`

//         .overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,.6);
//           z-index: 998;
//           opacity: ${openSideCart ? "1" : "0"};
//           pointer-events: ${openSideCart ? "auto" : "none"};
//           transition: opacity 0.3s ease;
//         }

//         /* ── Core sidecart shell ──
//            Always anchored to the navbar bottom edge via top: var(--navbar-height).
//            flex-direction: column lets header / body / priceBox / footer
//            stack naturally; body takes all remaining space and scrolls. */
//         .sidecart {
//           position: fixed;
//           top: var(--navbar-height);
//           bottom: 0;
//           right: 0;
//           width: 350px;
//           max-width: 100%;
//           background: #2a2a2a;
//           transform: translateX(${openSideCart ? "0" : "100%"});
//           transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
//           z-index: 999;
//           display: flex;
//           flex-direction: column;
//           overscroll-behavior: contain;
//         }

//         /* ── Header ── */
//         .header {
//           background: #ffeb00;
//           color: #000;
//           padding: 16px 20px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           font-weight: 900;
//           flex-shrink: 0;
//         }

//         .close-btn {
//           cursor: pointer;
//           font-size: 24px;
//           line-height: 1;
//           background: none;
//           border: none;
//           color: #000;
//           padding: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 30px;
//           height: 30px;
//           transition: transform 0.2s;
//         }

//         .close-btn:hover {
//           transform: scale(1.1);
//         }

//         /* ── Scrollable item list ──
//            flex: 1 + min-height: 0 is the key combo that makes an inner
//            flex child shrink and scroll instead of overflowing the parent. */
//         .body {
//           padding: 14px;
//           flex: 1;
//           min-height: 0;
//           overflow-y: auto;
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//         }

//         .body::-webkit-scrollbar {
//           display: none;
//         }

//         .empty-cart {
//           text-align: center;
//           color: #ffeb00;
//           padding: 40px 20px;
//           font-size: 16px;
//         }

//         /* ── Cart item card ── */
//         .item {
//           border: 2px solid #ffeb00;
//           border-radius: 12px;
//           padding: 6px;
//           display: flex;
//           gap: 16px;
//           position: relative;
//           background: #333;
//           flex-shrink: 0;
//         }

//         .item img {
//           width: 90px;
//           height: 120px;
//           object-fit: cover;
//           border-radius: 6px;
//           flex-shrink: 0;
//         }

//         .item-details {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//           min-width: 0;
//         }

//         .item-details h4 {
//           margin: 0;
//           font-size: 16px;
//           color: #fff;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//         }

//         .item-details p {
//           margin: 0;
//           color: #ffeb00;
//           font-weight: bold;
//         }

//         .item-details del {
//           color: #999;
//           margin-left: 8px;
//         }

//         .stock-warning {
//           font-size: 12px;
//           width: fit-content;
//           color: #ff6b6b;
//           background: rgba(255, 107, 107, 0.15);
//           padding: 6px 8px;
//           border-radius: 4px;
//           border-left: 3px solid #ff6b6b;
//           margin-top: 4px;
//           font-weight: 500;
//         }

//         .qty {
//           display: flex;
//           border: 1px solid #ffeb00;
//           width: fit-content;
//           border-radius: 4px;
//           overflow: hidden;
//           margin-top: 8px;
//         }

//         .qty button {
//           width: 35px;
//           height: 35px;
//           background: none;
//           color: #fff;
//           border: none;
//           cursor: pointer;
//           font-size: 18px;
//           transition: background 0.2s;
//         }

//         .qty button:hover:not(:disabled) {
//           background: rgba(255, 235, 0, 0.2);
//         }

//         .qty button:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//           color: #999;
//           background: rgba(255, 0, 0, 0.1);
//         }

//         .qty span {
//           min-width: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #fff;
//           border-left: 1px solid #ffeb00;
//           border-right: 1px solid #ffeb00;
//         }

//         .remove {
//           position: absolute;
//           right: 16px;
//           bottom: 16px;
//           color: #ff4444;
//           cursor: pointer;
//           font-size: 13px;
//           text-decoration: underline;
//           transition: color 0.2s;
//         }

//         .remove:hover {
//           color: #ff6666;
//         }

//         /* ── Price summary ── */
//         .priceBox {
//           border-top: 2px solid #ffeb00;
//           padding: 10px 14px;
//           background: #222;
//           flex-shrink: 0;
//         }

//         .row {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 4px;
//           color: #fff;
//           font-size: 15px;
//         }

//         .row:last-child {
//           margin-bottom: 0;
//           font-size: 18px;
//           font-weight: bold;
//           padding-top: 4px;
//           border-top: 1px solid #444;
//         }

//         .green {
//           color: #00c853;
//           font-weight: bold;
//         }

//         /* ── Place order button ── */
//         .footer {
//           padding: 14px;
//           background: #2a2a2a;
//           flex-shrink: 0;
//         }

//         .footer a {
//           display: block;
//           background: #ffeb00;
//           color: #000;
//           padding: 8px;
//           text-align: center;
//           font-weight: 900;
//           text-decoration: none;
//           border-radius: 8px;
//           transition: background 0.2s;
//         }

//         .footer a:hover {
//           background: #ffed33;
//         }

//         /* ── Mobile: full-width panel, still anchored below navbar ── */
//         @media (max-width: 768px) {
//           .sidecart {
//             width: 100%;
//           }
//         }

//         /* ── Compact tweaks for smaller phones ── */
//         @media (max-width: 480px) {
//           .header {
//             height: 50px;
//             padding: 0 16px;
//             font-size: 14px;
//           }

//           .close-btn {
//             width: 40px;
//             height: 40px;
//             font-size: 24px;
//           }

//           .body {
//             padding: 12px;
//           }

//           .item {
//             padding: 12px;
//             gap: 10px;
//           }

//           .item img {
//             width: 60px;
//             height: 80px;
//           }

//           .item-details h4 {
//             font-size: 13px;
//           }

//           .item-details p {
//             font-size: 13px;
//           }

//           .stock-warning {
//             font-size: 11px;
//           }

//           .qty button {
//             width: 30px;
//             height: 30px;
//           }

//           .qty span {
//             min-width: 30px;
//             font-size: 13px;
//           }

//           /* Remove button moves to top-right on small screens */
//           .remove {
//             top: 12px;
//             bottom: auto;
//             right: 12px;
//             font-size: 12px;
//             padding: 4px 8px;
//             background: #ff4444;
//             color: white;
//             border-radius: 4px;
//             text-decoration: none;
//             height: 30px;
//             display: flex;
//             align-items: center;
//           }

//           .remove:hover {
//             background: #ff6666;
//             color: white;
//           }

//           .priceBox {
//             padding: 12px;
//           }

//           .row {
//             font-size: 13px;
//           }

//           .row:last-child {
//             font-size: 15px;
//           }

//           .footer {
//             padding: 12px;
//           }
//         }

//         /* ── Very small phones ── */
//         @media (max-width: 360px) {
//           .item img {
//             width: 50px;
//             height: 70px;
//           }

//           .item-details h4 {
//             font-size: 12px;
//           }

//           .qty button {
//             width: 28px;
//             height: 28px;
//             font-size: 14px;
//           }

//           .qty span {
//             min-width: 28px;
//           }
//         }
//       `}</style>

//       <div className="overlay" onClick={() => setOpenSideCart(false)} />

//       <div className="sidecart">
//         <div className="header">
//           <span>🛒 MY CART ({safeCartItems.length})</span>
//           <button
//             className="close-btn"
//             onClick={() => setOpenSideCart(false)}
//           >
//             ✕
//           </button>
//         </div>

//         <div className="body">
//           {safeCartItems.length === 0 && (
//             <div className="empty-cart">Your cart is empty</div>
//           )}

//           {safeCartItems.map((item) => {
//             const product = item.product;

//             return (
//               <div className="item" key={product._id}>
//                 <img
//                   src={
//                     product.images?.[0]?.url || "/images/Product1.png"
//                   }
//                   alt={product.name || "Product"}
//                 />

//                 <div className="item-details">
//                   <h4>{product.name || "Unavailable product"}</h4>

//                   <p>
//                     ₹{item.price}{" "}
//                     <del>₹{item.originalPrice}</del>
//                   </p>

//                   {stockErrors[product._id] && (
//                     <div className="stock-warning">
//                       ⚠️ {stockErrors[product._id]}
//                     </div>
//                   )}

//                   {!stockErrors[product._id] &&
//                     item.quantity >=
//                     (product.countInStock || 0) && (
//                       <div className="stock-warning">
//                         📦 Max stock reached (
//                         {product.countInStock || 0} available)
//                       </div>
//                     )}

//                   <div className="qty">
//                     <button
//                       onClick={() =>
//                         decreaseQty(product._id, item.quantity)
//                       }
//                     >
//                       −
//                     </button>

//                     <span>{item.quantity}</span>

//                     <button
//                       onClick={() =>
//                         increaseQty(
//                           product._id,
//                           item.quantity,
//                           product.countInStock || 0
//                         )
//                       }
//                       disabled={isMaxStock(product._id, item.quantity)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <span
//                   className="remove"
//                   onClick={() => removeItem(product._id)}
//                 >
//                   Remove
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         {safeCartItems.length > 0 && (
//           <>
//             <div className="priceBox">
//               <div className="row">
//                 <span>Price</span>
//                 <span>₹{totalMRP}</span>
//               </div>

//               <div className="row green">
//                 <span>Discount</span>
//                 <span>-₹{discount}</span>
//               </div>

//               <div className="row">
//                 <span>Tax</span>
//                 <span>₹{cartMeta.taxAmount.toFixed(2)}</span>
//               </div>

//               <div className="row green">
//                 <span>Total</span>
//                 <span>₹{cartMeta.totalWithTax.toFixed(2)}</span>
//               </div>
//             </div>

//             <div className="footer">
//               <Link
//                 to="/cart"
//                 onClick={() => setOpenSideCart(false)}
//               >
//                 PLACE ORDER
//               </Link>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }






// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { updateCartItemApi, removeCartItemApi } from "../api/cartApi";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function SideCart() {
//   const {
//     cartItems,
//     setCartItems,
//     refreshCart,
//     openSideCart,
//     setOpenSideCart,
//     cartMeta,
//   } = useCart();

//   const [navbarHeight, setNavbarHeight] = useState(80);
//   const [stockErrors, setStockErrors] = useState({});
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   // Dynamically measure the full header height (announcement bar + navbar combined)
//   // using getBoundingClientRect().bottom so we always get the true bottom edge
//   // of whatever fixed header stack is at the top of the page.
//   useEffect(() => {
//     const measureNavbar = () => {
//       // Try specific selectors first, then fall back to broader ones.
//       // Priority: a wrapping header element that contains both the
//       // announcement bar and the nav, then just the nav itself.
//       const candidates = [
//         "[class*='header-wrapper']",
//         "[class*='HeaderWrapper']",
//         "[class*='site-header']",
//         "[class*='SiteHeader']",
//         "header",
//         "nav",
//         ".navbar",
//         "[class*='navbar']",
//       ];

//       let best = null;
//       for (const sel of candidates) {
//         const el = document.querySelector(sel);
//         if (el) {
//           const rect = el.getBoundingClientRect();
//           // Pick the element whose bottom edge is furthest down the viewport
//           if (!best || rect.bottom > best) {
//             best = rect.bottom;
//           }
//         }
//       }

//       if (best !== null && best > 0) {
//         setNavbarHeight(best);
//       }
//     };

//     measureNavbar();
//     window.addEventListener("resize", measureNavbar);
//     window.addEventListener("scroll", measureNavbar, { passive: true });
//     return () => {
//       window.removeEventListener("resize", measureNavbar);
//       window.removeEventListener("scroll", measureNavbar);
//     };
//   }, []);

//   const increaseQty = async (productId, currentQty, stock) => {
//     if (currentQty >= stock) {
//       setStockErrors((prev) => ({
//         ...prev,
//         [productId]: "Max stock reached",
//       }));
//       return;
//     }

//     setStockErrors((prev) => ({ ...prev, [productId]: null }));

//     try {
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.product._id === productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item,
//         ),
//       );

//       await updateCartItemApi(productId, currentQty + 1);
//       refreshCart();
//     } catch (err) {
//       console.log("Increase qty error:", err);

//       if (
//         err.response?.data?.message?.includes("stock") ||
//         err.response?.data?.error?.includes("stock") ||
//         err.response?.data?.message?.includes("available") ||
//         err.response?.data?.error?.includes("available")
//       ) {
//         setStockErrors((prev) => ({
//           ...prev,
//           [productId]: "max stock reached",
//         }));
//       }

//       refreshCart();
//     }
//   };


//   const handleProceed = () => {

//     if (!user) {
//       setShowLoginModal(true);
//       return;
//     }

//     setOpenSideCart(false);
//     navigate("/cart");

//   };


//   const decreaseQty = async (productId, currentQty) => {
//     try {
//       if (currentQty <= 1) {
//         const res = await removeCartItemApi(productId);
//         setCartItems(res.data.items);
//         setStockErrors((prev) => {
//           const updated = { ...prev };
//           delete updated[productId];
//           return updated;
//         });
//         refreshCart();
//         return;
//       }

//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.product._id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item,
//         ),
//       );

//       setStockErrors((prev) => ({ ...prev, [productId]: null }));

//       await updateCartItemApi(productId, currentQty - 1);
//       refreshCart();
//     } catch (err) {
//       console.error("Decrease qty error:", err.message);
//       refreshCart();
//     }
//   };

//   const removeItem = async (productId) => {
//     try {
//       const res = await removeCartItemApi(productId);
//       setCartItems(res.data.items);

//       setStockErrors((prev) => {
//         const updated = { ...prev };
//         delete updated[productId];
//         return updated;
//       });

//       refreshCart();
//     } catch (err) {
//       console.error("Remove item error:", err.message);
//     }
//   };

//   const isMaxStock = (productId, currentQty) => {
//     const item = cartItems.find((item) => item.product._id === productId);
//     if (!item) return false;
//     if (stockErrors[productId]) return true;
//     return currentQty >= item.product.countInStock;
//   };

//   const totalMRP = cartItems.reduce(
//     (sum, item) => sum + item.originalPrice * item.quantity,
//     0,
//   );

//   const totalPrice = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0,
//   );

//   const discount = totalMRP - totalPrice;

//   useEffect(() => {
//     if (openSideCart) {
//       refreshCart();
//     }
//   }, [openSideCart]);

//   useEffect(() => {
//     if (openSideCart) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [openSideCart]);

//   useEffect(() => {
//     if (!cartItems.length) {
//       setOpenSideCart(false);
//     }
//   }, [cartItems]);

//   return (
//     <>
//       <style>{`
//         .overlay {
//           position: fixed;
//           top: ${navbarHeight}px;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0,0,0,.6);
//           z-index: 1099;
//           opacity: ${openSideCart ? "1" : "0"};
//           pointer-events: ${openSideCart ? "auto" : "none"};
//           transition: opacity 0.3s ease;
//         }

//         /* ── Core sidecart shell ──
//            top is set dynamically via JS to always match the real navbar height.
//            z-index: 1100 ensures it renders above the navbar (typically z-index: 1000).
//            flex-direction: column lets header / body / priceBox / footer stack naturally. */
//         .sidecart {
//           position: fixed;
//           top: ${navbarHeight}px;
//           bottom: 0;
//           right: 0;
//           width: 350px;
//           max-width: 100%;
//           background: #2a2a2a;
//           transform: translateX(${openSideCart ? "0" : "100%"});
//           transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
//           z-index: 1100;
//           display: flex;
//           flex-direction: column;
//           overscroll-behavior: contain;
//         }

//         /* ── Header ── */
//         .sc-header {
//           background: #ffeb00;
//           color: #000;
//           padding: 16px 20px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           font-weight: 900;
//           flex-shrink: 0;
//         }

//         .sc-close-btn {
//           cursor: pointer;
//           font-size: 24px;
//           line-height: 1;
//           background: none;
//           border: none;
//           color: #000;
//           padding: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 30px;
//           height: 30px;
//           transition: transform 0.2s;
//         }

//         .sc-close-btn:hover {
//           transform: scale(1.1);
//         }

//         /* ── Scrollable item list ──
//            flex: 1 + min-height: 0 is the key combo that makes an inner
//            flex child shrink and scroll instead of overflowing the parent. */
//         .sc-body {
//           padding: 14px;
//           flex: 1;
//           min-height: 0;
//           overflow-y: auto;
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//         }

//         .sc-body::-webkit-scrollbar {
//           display: none;
//         }

//         .sc-empty-cart {
//           text-align: center;
//           color: #ffeb00;
//           padding: 40px 20px;
//           font-size: 16px;
//         }

//         /* ── Cart item card ── */
//         .sc-item {
//           border: 2px solid #ffeb00;
//           border-radius: 12px;
//           padding: 6px;
//           display: flex;
//           gap: 16px;
//           position: relative;
//           background: #333;
//           flex-shrink: 0;
//         }

//         .sc-item img {
//           width: 90px;
//           height: 120px;
//           object-fit: cover;
//           border-radius: 6px;
//           flex-shrink: 0;
//         }

//         .sc-item-details {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//           min-width: 0;
//         }

//         .sc-item-details h4 {
//           margin: 0;
//           font-size: 16px;
//           color: #fff;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//         }

//         .sc-item-details p {
//           margin: 0;
//           color: #ffeb00;
//           font-weight: bold;
//         }

//         .sc-item-details del {
//           color: #999;
//           margin-left: 8px;
//         }

//         .sc-stock-warning {
//           font-size: 12px;
//           width: fit-content;
//           color: #ff6b6b;
//           background: rgba(255, 107, 107, 0.15);
//           padding: 6px 8px;
//           border-radius: 4px;
//           border-left: 3px solid #ff6b6b;
//           margin-top: 4px;
//           font-weight: 500;
//         }

//         .sc-qty {
//           display: flex;
//           border: 1px solid #ffeb00;
//           width: fit-content;
//           border-radius: 4px;
//           overflow: hidden;
//           margin-top: 8px;
//         }

//         .sc-qty button {
//           width: 35px;
//           height: 35px;
//           background: none;
//           color: #fff;
//           border: none;
//           cursor: pointer;
//           font-size: 18px;
//           transition: background 0.2s;
//         }

//         .sc-qty button:hover:not(:disabled) {
//           background: rgba(255, 235, 0, 0.2);
//         }

//         .sc-qty button:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//           color: #999;
//           background: rgba(255, 0, 0, 0.1);
//         }

//         .sc-qty span {
//           min-width: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #fff;
//           border-left: 1px solid #ffeb00;
//           border-right: 1px solid #ffeb00;
//         }

//         .sc-remove {
//           position: absolute;
//           right: 16px;
//           bottom: 16px;
//           color: #ff4444;
//           cursor: pointer;
//           font-size: 13px;
//           text-decoration: underline;
//           transition: color 0.2s;
//         }

//         .sc-remove:hover {
//           color: #ff6666;
//         }

//         /* ── Price summary ── */
//         .sc-price-box {
//           border-top: 2px solid #ffeb00;
//           padding: 10px 14px;
//           background: #222;
//           flex-shrink: 0;
//         }

//         .sc-row {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 4px;
//           color: #fff;
//           font-size: 15px;
//         }

//         .sc-row:last-child {
//           margin-bottom: 0;
//           font-size: 18px;
//           font-weight: bold;
//           padding-top: 4px;
//           border-top: 1px solid #444;
//         }

//         .sc-green {
//           color: #00c853;
//           font-weight: bold;
//         }

//         /* ── Place order button ── */
//         .sc-footer {
//           padding: 14px;
//           background: #2a2a2a;
//           flex-shrink: 0;
//         }

//         .sc-footer a {
//           display: block;
//           background: #ffeb00;
//           color: #000;
//           padding: 8px;
//           text-align: center;
//           font-weight: 900;
//           text-decoration: none;
//           border-radius: 8px;
//           transition: background 0.2s;
//         }

//         .sc-footer a:hover {
//           background: #ffed33;
//         }

//         /* ── Mobile: full-width panel, still anchored below navbar ── */
//         @media (max-width: 768px) {
//           .sidecart {
//             width: 100%;
//           }
//         }

//         /* ── Compact tweaks for smaller phones ── */
//         @media (max-width: 480px) {
//           .sc-header {
//             height: 50px;
//             padding: 0 16px;
//             font-size: 14px;
//           }

//           .sc-close-btn {
//             width: 40px;
//             height: 40px;
//             font-size: 24px;
//           }

//           .sc-body {
//             padding: 12px;
//           }

//           .sc-item {
//             padding: 12px;
//             gap: 10px;
//           }

//           .sc-item img {
//             width: 60px;
//             height: 80px;
//           }

//           .sc-item-details h4 {
//             font-size: 13px;
//           }

//           .sc-item-details p {
//             font-size: 13px;
//           }

//           .sc-stock-warning {
//             font-size: 11px;
//           }

//           .sc-qty button {
//             width: 30px;
//             height: 30px;
//           }

//           .sc-qty span {
//             min-width: 30px;
//             font-size: 13px;
//           }

//           .sc-remove {
//             top: 12px;
//             bottom: auto;
//             right: 12px;
//             font-size: 12px;
//             padding: 4px 8px;
//             background: #ff4444;
//             color: white;
//             border-radius: 4px;
//             text-decoration: none;
//             height: 30px;
//             display: flex;
//             align-items: center;
//           }

//           .sc-remove:hover {
//             background: #ff6666;
//             color: white;
//           }

//           .sc-price-box {
//             padding: 12px;
//           }

//           .sc-row {
//             font-size: 13px;
//           }

//           .sc-row:last-child {
//             font-size: 15px;
//           }

//           .sc-footer {
//             padding: 12px;
//           }
//         }

//         /* ── Very small phones ── */
//         @media (max-width: 360px) {
//           .sc-item img {
//             width: 50px;
//             height: 70px;
//           }

//           .sc-item-details h4 {
//             font-size: 12px;
//           }

//           .sc-qty button {
//             width: 28px;
//             height: 28px;
//             font-size: 14px;
//           }

//           .sc-qty span {
//             min-width: 28px;
//           }
//         }
//       `}</style>

//       <div className="overlay" onClick={() => setOpenSideCart(false)} />

//       <div className="sidecart">
//         <div className="sc-header">
//           <span>🛒 MY CART ({cartItems.length})</span>
//           <button
//             className="sc-close-btn"
//             onClick={() => setOpenSideCart(false)}
//             aria-label="Close cart"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="sc-body">
//           {cartItems.length === 0 && (
//             <div className="sc-empty-cart">Your cart is empty</div>
//           )}

//           {cartItems.map((item) => (
//             <div className="sc-item" key={item.product._id} style={{ cursor: "pointer" }}
//               onClick={() => {
//                 navigate(`/productspec/${item.product._id}`);
//                 setOpenSideCart(false);
//               }}
//             >
//               <img
//                 src={item.product.images?.[0]?.url || "/images/Product1.png"}
//                 alt={item.product.name}
//               />

//               <div className="sc-item-details">
//                 <h4>{item.product.name}</h4>

//                 <p>
//                   ₹{item.price} <del>₹{item.originalPrice}</del>
//                 </p>

//                 {stockErrors[item.product._id] && (
//                   <div className="sc-stock-warning">
//                     ⚠️ {stockErrors[item.product._id]}
//                   </div>
//                 )}

//                 {!stockErrors[item.product._id] &&
//                   item.quantity >= item.product.countInStock && (
//                     <div className="sc-stock-warning">
//                       📦 Max stock reached ({item.product.countInStock}{" "}
//                       available)
//                     </div>
//                   )}

//                 <div className="sc-qty">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       decreaseQty(item.product._id, item.quantity)
//                     }}
//                     aria-label="Decrease quantity"
//                   >
//                     −
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       increaseQty(
//                         item.product._id,
//                         item.quantity,
//                         item.product.countInStock,
//                       )
//                     }}
//                     disabled={isMaxStock(item.product._id, item.quantity)}
//                     aria-label="Increase quantity"
//                     title={
//                       isMaxStock(item.product._id, item.quantity)
//                         ? stockErrors[item.product._id] ||
//                         "Maximum stock reached"
//                         : "Add one more"
//                     }
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               <span
//                 className="sc-remove"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   removeItem(item.product._id)
//                 }}
//               >
//                 Remove
//               </span>
//             </div>
//           ))}
//         </div>

//         {cartItems.length > 0 && (
//           <>
//             <div className="sc-price-box">
//               <div className="sc-row">
//                 <span>Price</span>
//                 <span>₹{totalMRP}</span>
//               </div>

//               <div className="sc-row sc-green">
//                 <span>Discount</span>
//                 <span>-₹{discount}</span>
//               </div>

//               <div className="sc-row">
//                 <span>Tax</span>
//                 <span>₹{cartMeta.taxAmount.toFixed(2)}</span>
//               </div>

//               <div className="sc-row sc-green">
//                 <span>Total</span>
//                 <span>₹{cartMeta.totalWithTax.toFixed(2)}</span>
//               </div>
//             </div>

//             <div className="sc-footer">
//               <button
//                 onClick={handleProceed}
//                 style={{
//                   width: "100%",
//                   background: "#ffeb00",
//                   color: "#000",
//                   padding: "12px",
//                   fontWeight: "900",
//                   borderRadius: "8px",
//                   border: "none",
//                   cursor: "pointer"
//                 }}
//               >
//                 PLACE ORDER
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//       {showLoginModal && (
//   <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
//     <div className="login-modal" onClick={(e) => e.stopPropagation()}>
//       <h2>Login Required</h2>
//       <p>Please login to continue.</p>

//       <div className="modal-actions">
//         <button
//           className="buy-btn"
//           onClick={() => navigate("/login")}
//         >
//           LOGIN
//         </button>

//         <button
//           className="add-to-cart-btn"
//           onClick={() => setShowLoginModal(false)}
//         >
//           CANCEL
//         </button>
//       </div>
//     </div>
//   </div>
// )}
//     </>
//   );
// }




// import { useEffect, useState } from "react";
// import { updateCartItemApi, removeCartItemApi } from "../api/cartApi";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function SideCart() {
//   const {
//     cartItems,
//     setCartItems,
//     refreshCart,
//     openSideCart,
//     setOpenSideCart,
//     cartMeta,
//   } = useCart();

//   const [navbarHeight, setNavbarHeight] = useState(80);
//   const [stockErrors, setStockErrors] = useState({});
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   // ── GUEST CART STATE ──
//   const [guestCartItems, setGuestCartItems] = useState([]);

//   // Load guest cart from localStorage when side cart opens and user is not logged in
//   useEffect(() => {
//     if (!user && openSideCart) {
//       const stored = JSON.parse(localStorage.getItem("guestCart")) || [];
//       setGuestCartItems(stored);
//     }
//   }, [user, openSideCart]);

//   // ── UNIFIED DISPLAY ITEMS ──
//   const displayItems = user ? cartItems : guestCartItems;

//   // ── GUEST CART HANDLERS ──
//   const guestIncreaseQty = (productId) => {
//     const updated = guestCartItems.map((item) =>
//       item.productId === productId
//         ? { ...item, quantity: item.quantity + 1 }
//         : item
//     );
//     setGuestCartItems(updated);
//     localStorage.setItem("guestCart", JSON.stringify(updated));
//   };

//   const guestDecreaseQty = (productId, currentQty) => {
//     let updated;
//     if (currentQty <= 1) {
//       updated = guestCartItems.filter((item) => item.productId !== productId);
//     } else {
//       updated = guestCartItems.map((item) =>
//         item.productId === productId
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       );
//     }
//     setGuestCartItems(updated);
//     localStorage.setItem("guestCart", JSON.stringify(updated));
//     if (!updated.length) setOpenSideCart(false);
//   };

//   const guestRemoveItem = (productId) => {
//     const updated = guestCartItems.filter(
//       (item) => item.productId !== productId
//     );
//     setGuestCartItems(updated);
//     localStorage.setItem("guestCart", JSON.stringify(updated));
//     if (!updated.length) setOpenSideCart(false);
//   };

//   // Dynamically measure the full header height
//   useEffect(() => {
//     const measureNavbar = () => {
//       const candidates = [
//         "[class*='header-wrapper']",
//         "[class*='HeaderWrapper']",
//         "[class*='site-header']",
//         "[class*='SiteHeader']",
//         "header",
//         "nav",
//         ".navbar",
//         "[class*='navbar']",
//       ];

//       let best = null;
//       for (const sel of candidates) {
//         const el = document.querySelector(sel);
//         if (el) {
//           const rect = el.getBoundingClientRect();
//           if (!best || rect.bottom > best) {
//             best = rect.bottom;
//           }
//         }
//       }

//       if (best !== null && best > 0) {
//         setNavbarHeight(best);
//       }
//     };

//     measureNavbar();
//     window.addEventListener("resize", measureNavbar);
//     window.addEventListener("scroll", measureNavbar, { passive: true });
//     return () => {
//       window.removeEventListener("resize", measureNavbar);
//       window.removeEventListener("scroll", measureNavbar);
//     };
//   }, []);

//   // ── LOGGED-IN CART HANDLERS ──
//   const increaseQty = async (productId, currentQty, stock) => {
//     if (currentQty >= stock) {
//       setStockErrors((prev) => ({
//         ...prev,
//         [productId]: "Max stock reached",
//       }));
//       return;
//     }

//     setStockErrors((prev) => ({ ...prev, [productId]: null }));

//     try {
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.product._id === productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );

//       await updateCartItemApi(productId, currentQty + 1);
//       refreshCart();
//     } catch (err) {
//       console.log("Increase qty error:", err);

//       if (
//         err.response?.data?.message?.includes("stock") ||
//         err.response?.data?.error?.includes("stock") ||
//         err.response?.data?.message?.includes("available") ||
//         err.response?.data?.error?.includes("available")
//       ) {
//         setStockErrors((prev) => ({
//           ...prev,
//           [productId]: "max stock reached",
//         }));
//       }

//       refreshCart();
//     }
//   };

//   const handleProceed = () => {
//     if (!user) {
//       setShowLoginModal(true);
//       return;
//     }

//     setOpenSideCart(false);
//     navigate("/cart");
//   };

//   const decreaseQty = async (productId, currentQty) => {
//     try {
//       if (currentQty <= 1) {
//         const res = await removeCartItemApi(productId);
//         setCartItems(res.data.items);
//         setStockErrors((prev) => {
//           const updated = { ...prev };
//           delete updated[productId];
//           return updated;
//         });
//         refreshCart();
//         return;
//       }

//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.product._id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//       );

//       setStockErrors((prev) => ({ ...prev, [productId]: null }));

//       await updateCartItemApi(productId, currentQty - 1);
//       refreshCart();
//     } catch (err) {
//       console.error("Decrease qty error:", err.message);
//       refreshCart();
//     }
//   };

//   const removeItem = async (productId) => {
//     try {
//       const res = await removeCartItemApi(productId);
//       setCartItems(res.data.items);

//       setStockErrors((prev) => {
//         const updated = { ...prev };
//         delete updated[productId];
//         return updated;
//       });

//       refreshCart();
//     } catch (err) {
//       console.error("Remove item error:", err.message);
//     }
//   };

//   const isMaxStock = (productId, currentQty) => {
//     const item = cartItems.find((item) => item.product._id === productId);
//     if (!item) return false;
//     if (stockErrors[productId]) return true;
//     return currentQty >= item.product.countInStock;
//   };

//   // ── UNIFIED PRICE CALCULATIONS ──
//   const totalMRP = user
//     ? cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
//     : guestCartItems.reduce(
//         (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
//         0
//       );

//   const totalPrice = user
//     ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
//     : guestCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const discount = totalMRP - totalPrice;

//   const taxAmount = user ? cartMeta?.taxAmount || 0 : 0;
//   const totalWithTax = user ? cartMeta?.totalWithTax || totalPrice : totalPrice;

//   // ── SIDE EFFECTS ──
//   useEffect(() => {
//     if (openSideCart) {
//       if (user) refreshCart();
//     }
//   }, [openSideCart]);

//   useEffect(() => {
//     if (openSideCart) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [openSideCart]);

//   // Close side cart when cart becomes empty
//   useEffect(() => {
//     const isEmpty = user ? !cartItems.length : !guestCartItems.length;
//     if (isEmpty && openSideCart) {
//       // Don't auto-close immediately, let the empty state show
//     }
//   }, [cartItems, guestCartItems, user]);

//   const isEmpty = user ? cartItems.length === 0 : guestCartItems.length === 0;

//   return (
//     <>
//       <style>{`
//         .overlay {
//           position: fixed;
//           top: ${navbarHeight}px;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0,0,0,.6);
//           z-index: 1099;
//           opacity: ${openSideCart ? "1" : "0"};
//           pointer-events: ${openSideCart ? "auto" : "none"};
//           transition: opacity 0.3s ease;
//         }

//         .sidecart {
//           position: fixed;
//           top: ${navbarHeight}px;
//           bottom: 0;
//           right: 0;
//           width: 350px;
//           max-width: 100%;
//           background: #2a2a2a;
//           transform: translateX(${openSideCart ? "0" : "100%"});
//           transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
//           z-index: 1100;
//           display: flex;
//           flex-direction: column;
//           overscroll-behavior: contain;
//         }

//         .sc-header {
//           background: #ffeb00;
//           color: #000;
//           padding: 16px 20px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           font-weight: 900;
//           flex-shrink: 0;
//         }

//         .sc-close-btn {
//           cursor: pointer;
//           font-size: 24px;
//           line-height: 1;
//           background: none;
//           border: none;
//           color: #000;
//           padding: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 30px;
//           height: 30px;
//           transition: transform 0.2s;
//         }

//         .sc-close-btn:hover {
//           transform: scale(1.1);
//         }

//         .sc-body {
//           padding: 14px;
//           flex: 1;
//           min-height: 0;
//           overflow-y: auto;
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//         }

//         .sc-body::-webkit-scrollbar {
//           display: none;
//         }

//         .sc-empty-cart {
//           text-align: center;
//           color: #ffeb00;
//           padding: 40px 20px;
//           font-size: 16px;
//         }

//         .sc-item {
//           border: 2px solid #ffeb00;
//           border-radius: 12px;
//           padding: 6px;
//           display: flex;
//           gap: 16px;
//           position: relative;
//           background: #333;
//           flex-shrink: 0;
//         }

//         .sc-item img {
//           width: 90px;
//           height: 120px;
//           object-fit: cover;
//           border-radius: 6px;
//           flex-shrink: 0;
//         }

//         .sc-item-details {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//           min-width: 0;
//         }

//         .sc-item-details h4 {
//           margin: 0;
//           font-size: 16px;
//           color: #fff;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//         }

//         .sc-item-details p {
//           margin: 0;
//           color: #ffeb00;
//           font-weight: bold;
//         }

//         .sc-item-details del {
//           color: #999;
//           margin-left: 8px;
//         }

//         .sc-stock-warning {
//           font-size: 12px;
//           width: fit-content;
//           color: #ff6b6b;
//           background: rgba(255, 107, 107, 0.15);
//           padding: 6px 8px;
//           border-radius: 4px;
//           border-left: 3px solid #ff6b6b;
//           margin-top: 4px;
//           font-weight: 500;
//         }

//         .sc-qty {
//           display: flex;
//           border: 1px solid #ffeb00;
//           width: fit-content;
//           border-radius: 4px;
//           overflow: hidden;
//           margin-top: 8px;
//         }

//         .sc-qty button {
//           width: 35px;
//           height: 35px;
//           background: none;
//           color: #fff;
//           border: none;
//           cursor: pointer;
//           font-size: 18px;
//           transition: background 0.2s;
//         }

//         .sc-qty button:hover:not(:disabled) {
//           background: rgba(255, 235, 0, 0.2);
//         }

//         .sc-qty button:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//           color: #999;
//           background: rgba(255, 0, 0, 0.1);
//         }

//         .sc-qty span {
//           min-width: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #fff;
//           border-left: 1px solid #ffeb00;
//           border-right: 1px solid #ffeb00;
//         }

//         .sc-remove {
//           position: absolute;
//           right: 16px;
//           bottom: 16px;
//           color: #ff4444;
//           cursor: pointer;
//           font-size: 13px;
//           text-decoration: underline;
//           transition: color 0.2s;
//         }

//         .sc-remove:hover {
//           color: #ff6666;
//         }

//         .sc-price-box {
//           border-top: 2px solid #ffeb00;
//           padding: 10px 14px;
//           background: #222;
//           flex-shrink: 0;
//         }

//         .sc-row {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 4px;
//           color: #fff;
//           font-size: 15px;
//         }

//         .sc-row:last-child {
//           margin-bottom: 0;
//           font-size: 18px;
//           font-weight: bold;
//           padding-top: 4px;
//           border-top: 1px solid #444;
//         }

//         .sc-green {
//           color: #00c853;
//           font-weight: bold;
//         }

//         .sc-footer {
//           padding: 14px;
//           background: #2a2a2a;
//           flex-shrink: 0;
//         }

//         .sc-footer a {
//           display: block;
//           background: #ffeb00;
//           color: #000;
//           padding: 8px;
//           text-align: center;
//           font-weight: 900;
//           text-decoration: none;
//           border-radius: 8px;
//           transition: background 0.2s;
//         }

//         .sc-footer a:hover {
//           background: #ffed33;
//         }

//         /* ── Modal ── */
//         .sc-modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0, 0, 0, 0.85);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 9999;
//           padding: 16px;
//         }

//         .sc-login-modal {
//           background: #151515;
//           border: 2px solid #ffeb00;
//           border-radius: 20px;
//           padding: 32px;
//           width: 90%;
//           max-width: 420px;
//           text-align: center;
//           animation: scPopIn 0.3s ease;
//         }

//         .sc-login-modal h2 {
//           color: #ffeb00;
//           font-family: "Jersey 25", cursive;
//           font-size: 32px;
//           margin-bottom: 12px;
//         }

//         .sc-login-modal p {
//           color: #ffffff;
//           font-size: 14px;
//           margin-bottom: 24px;
//         }

//         .sc-modal-actions {
//           display: flex;
//           gap: 12px;
//         }

//         .sc-modal-btn {
//           flex: 1;
//           height: 48px;
//           font-size: 16px;
//           font-weight: 700;
//           border-radius: 10px;
//           cursor: pointer;
//           border: 2px solid #ffeb00;
//           font-family: "Jersey 25", sans-serif;
//         }

//         .sc-modal-btn-login {
//           background: #ffeb00;
//           color: #000;
//         }

//         .sc-modal-btn-cancel {
//           background: transparent;
//           color: #fff;
//         }

//         @keyframes scPopIn {
//           from { transform: scale(0.85); opacity: 0; }
//           to   { transform: scale(1);    opacity: 1; }
//         }

//         /* ── Mobile: full-width panel ── */
//         @media (max-width: 768px) {
//           .sidecart {
//             width: 100%;
//           }
//         }

//         @media (max-width: 480px) {
//           .sc-header {
//             height: 50px;
//             padding: 0 16px;
//             font-size: 14px;
//           }

//           .sc-close-btn {
//             width: 40px;
//             height: 40px;
//             font-size: 24px;
//           }

//           .sc-body {
//             padding: 12px;
//           }

//           .sc-item {
//             padding: 12px;
//             gap: 10px;
//           }

//           .sc-item img {
//             width: 60px;
//             height: 80px;
//           }

//           .sc-item-details h4 {
//             font-size: 13px;
//           }

//           .sc-item-details p {
//             font-size: 13px;
//           }

//           .sc-stock-warning {
//             font-size: 11px;
//           }

//           .sc-qty button {
//             width: 30px;
//             height: 30px;
//           }

//           .sc-qty span {
//             min-width: 30px;
//             font-size: 13px;
//           }

//           .sc-remove {
//             top: 12px;
//             bottom: auto;
//             right: 12px;
//             font-size: 12px;
//             padding: 4px 8px;
//             background: #ff4444;
//             color: white;
//             border-radius: 4px;
//             text-decoration: none;
//             height: 30px;
//             display: flex;
//             align-items: center;
//           }

//           .sc-remove:hover {
//             background: #ff6666;
//             color: white;
//           }

//           .sc-price-box {
//             padding: 12px;
//           }

//           .sc-row {
//             font-size: 13px;
//           }

//           .sc-row:last-child {
//             font-size: 15px;
//           }

//           .sc-footer {
//             padding: 12px;
//           }

//           .sc-modal-actions {
//             flex-direction: column;
//           }
//         }

//         @media (max-width: 360px) {
//           .sc-item img {
//             width: 50px;
//             height: 70px;
//           }

//           .sc-item-details h4 {
//             font-size: 12px;
//           }

//           .sc-qty button {
//             width: 28px;
//             height: 28px;
//             font-size: 14px;
//           }

//           .sc-qty span {
//             min-width: 28px;
//           }
//         }
//       `}</style>

//       <div className="overlay" onClick={() => setOpenSideCart(false)} />

//       <div className="sidecart">
//         <div className="sc-header">
//           <span>🛒 MY CART ({displayItems.length})</span>
//           <button
//             className="sc-close-btn"
//             onClick={() => setOpenSideCart(false)}
//             aria-label="Close cart"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="sc-body">
//           {isEmpty && (
//             <div className="sc-empty-cart">Your cart is empty</div>
//           )}

//           {/* ── LOGGED-IN USER CART ITEMS ── */}
//           {user &&
//             cartItems.map((item) => (
//               <div
//                 className="sc-item"
//                 key={item.product._id}
//                 style={{ cursor: "pointer" }}
//                 onClick={() => {
//                   navigate(`/productspec/${item.product._id}`);
//                   setOpenSideCart(false);
//                 }}
//               >
//                 <img
//                   src={item.product.images?.[0]?.url || "/images/Product1.png"}
//                   alt={item.product.name}
//                 />

//                 <div className="sc-item-details">
//                   <h4>{item.product.name}</h4>

//                   <p>
//                     ₹{item.price}{" "}
//                     {item.originalPrice && item.originalPrice !== item.price && (
//                       <del>₹{item.originalPrice}</del>
//                     )}
//                   </p>

//                   {stockErrors[item.product._id] && (
//                     <div className="sc-stock-warning">
//                       ⚠️ {stockErrors[item.product._id]}
//                     </div>
//                   )}

//                   {!stockErrors[item.product._id] &&
//                     item.quantity >= item.product.countInStock && (
//                       <div className="sc-stock-warning">
//                         📦 Max stock reached ({item.product.countInStock}{" "}
//                         available)
//                       </div>
//                     )}

//                   <div className="sc-qty">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         decreaseQty(item.product._id, item.quantity);
//                       }}
//                       aria-label="Decrease quantity"
//                     >
//                       −
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         increaseQty(
//                           item.product._id,
//                           item.quantity,
//                           item.product.countInStock
//                         );
//                       }}
//                       disabled={isMaxStock(item.product._id, item.quantity)}
//                       aria-label="Increase quantity"
//                       title={
//                         isMaxStock(item.product._id, item.quantity)
//                           ? stockErrors[item.product._id] ||
//                             "Maximum stock reached"
//                           : "Add one more"
//                       }
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <span
//                   className="sc-remove"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     removeItem(item.product._id);
//                   }}
//                 >
//                   Remove
//                 </span>
//               </div>
//             ))}

//           {/* ── GUEST CART ITEMS ── */}
//           {!user &&
//             guestCartItems.map((item) => (
//               <div className="sc-item" key={item.productId}>
//                 <img
//                   src={item.image || "/images/Product1.png"}
//                   alt={item.name}
//                 />

//                 <div className="sc-item-details">
//                   <h4>{item.name}</h4>

//                   <p>
//                     ₹{item.price}{" "}
//                     {item.originalPrice && item.originalPrice !== item.price && (
//                       <del>₹{item.originalPrice}</del>
//                     )}
//                   </p>

//                   <div className="sc-qty">
//                     <button
//                       onClick={() =>
//                         guestDecreaseQty(item.productId, item.quantity)
//                       }
//                       aria-label="Decrease quantity"
//                     >
//                       −
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button
//                       onClick={() => guestIncreaseQty(item.productId)}
//                       aria-label="Increase quantity"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <span
//                   className="sc-remove"
//                   onClick={() => guestRemoveItem(item.productId)}
//                 >
//                   Remove
//                 </span>
//               </div>
//             ))}
//         </div>

//         {!isEmpty && (
//           <>
//             <div className="sc-price-box">
//               <div className="sc-row">
//                 <span>Price (MRP)</span>
//                 <span>₹{totalMRP}</span>
//               </div>

//               {discount > 0 && (
//                 <div className="sc-row sc-green">
//                   <span>Discount</span>
//                   <span>-₹{discount}</span>
//                 </div>
//               )}

//               <div className="sc-row">
//                 <span>Tax</span>
//                 <span>₹{taxAmount.toFixed(2)}</span>
//               </div>

//               <div className="sc-row sc-green">
//                 <span>Total</span>
//                 <span>₹{totalWithTax.toFixed(2)}</span>
//               </div>
//             </div>

//             <div className="sc-footer">
//               <button
//                 onClick={handleProceed}
//                 style={{
//                   width: "100%",
//                   background: "#ffeb00",
//                   color: "#000",
//                   padding: "12px",
//                   fontWeight: "900",
//                   borderRadius: "8px",
//                   border: "none",
//                   cursor: "pointer",
//                   fontSize: "16px",
//                   fontFamily: "'Jersey 25', sans-serif",
//                 }}
//               >
//                 PLACE ORDER
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* ── LOGIN MODAL ── */}
//       {showLoginModal && (
//         <div
//           className="sc-modal-overlay"
//           onClick={() => setShowLoginModal(false)}
//         >
//           <div
//             className="sc-login-modal"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2>Login Required</h2>
//             <p>Please login to place your order.</p>

//             <div className="sc-modal-actions">
//               <button
//                 className="sc-modal-btn sc-modal-btn-login"
//                 onClick={() => {
//                   setShowLoginModal(false);
//                   setOpenSideCart(false);
//                   navigate("/login");
//                 }}
//               >
//                 LOGIN
//               </button>

//               <button
//                 className="sc-modal-btn sc-modal-btn-cancel"
//                 onClick={() => setShowLoginModal(false)}
//               >
//                 CANCEL
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }




import { useEffect, useState } from "react";
import { updateCartItemApi, removeCartItemApi } from "../api/cartApi";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SideCart() {
  const {
    cartItems,
    setCartItems,
    refreshCart,
    openSideCart,
    setOpenSideCart,
    cartMeta,
  } = useCart();

  const [navbarHeight, setNavbarHeight] = useState(80);
  const [stockErrors, setStockErrors] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // ── GUEST CART STATE ──
  const [guestCartItems, setGuestCartItems] = useState([]);

  // Load guest cart from localStorage when side cart opens and user is not logged in
  useEffect(() => {
    if (!user && openSideCart) {
      const stored = JSON.parse(localStorage.getItem("guestCart")) || [];
      setGuestCartItems(stored);
    }
  }, [user, openSideCart]);

  // ── UNIFIED DISPLAY ITEMS ──
  const displayItems = user ? cartItems : guestCartItems;

  // ── GUEST CART HANDLERS ──
  const guestIncreaseQty = (productId) => {
    const updated = guestCartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setGuestCartItems(updated);
    localStorage.setItem("guestCart", JSON.stringify(updated));
  };

  const guestDecreaseQty = (productId, currentQty) => {
    let updated;
    if (currentQty <= 1) {
      updated = guestCartItems.filter((item) => item.productId !== productId);
    } else {
      updated = guestCartItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
    setGuestCartItems(updated);
    localStorage.setItem("guestCart", JSON.stringify(updated));
    if (!updated.length) setOpenSideCart(false);
  };

  const guestRemoveItem = (productId) => {
    const updated = guestCartItems.filter(
      (item) => item.productId !== productId
    );
    setGuestCartItems(updated);
    localStorage.setItem("guestCart", JSON.stringify(updated));
    if (!updated.length) setOpenSideCart(false);
  };

  // Dynamically measure the full header height
  useEffect(() => {
    const measureNavbar = () => {
      const candidates = [
        "[class*='header-wrapper']",
        "[class*='HeaderWrapper']",
        "[class*='site-header']",
        "[class*='SiteHeader']",
        "header",
        "nav",
        ".navbar",
        "[class*='navbar']",
      ];

      let best = null;
      for (const sel of candidates) {
        const el = document.querySelector(sel);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (!best || rect.bottom > best) {
            best = rect.bottom;
          }
        }
      }

      if (best !== null && best > 0) {
        setNavbarHeight(best);
      }
    };

    measureNavbar();
    window.addEventListener("resize", measureNavbar);
    window.addEventListener("scroll", measureNavbar, { passive: true });
    return () => {
      window.removeEventListener("resize", measureNavbar);
      window.removeEventListener("scroll", measureNavbar);
    };
  }, []);

  // ── LOGGED-IN CART HANDLERS ──
  const increaseQty = async (productId, currentQty, stock) => {
    if (currentQty >= stock) {
      setStockErrors((prev) => ({
        ...prev,
        [productId]: "Max stock reached",
      }));
      return;
    }

    setStockErrors((prev) => ({ ...prev, [productId]: null }));

    try {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

      await updateCartItemApi(productId, currentQty + 1);
      refreshCart();
    } catch (err) {
      console.log("Increase qty error:", err);

      if (
        err.response?.data?.message?.includes("stock") ||
        err.response?.data?.error?.includes("stock") ||
        err.response?.data?.message?.includes("available") ||
        err.response?.data?.error?.includes("available")
      ) {
        setStockErrors((prev) => ({
          ...prev,
          [productId]: "max stock reached",
        }));
      }

      refreshCart();
    }
  };

  const handleProceed = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setOpenSideCart(false);
    navigate("/cart");
  };

  const decreaseQty = async (productId, currentQty) => {
    try {
      if (currentQty <= 1) {
        const res = await removeCartItemApi(productId);
        setCartItems(res.data.items);
        setStockErrors((prev) => {
          const updated = { ...prev };
          delete updated[productId];
          return updated;
        });
        refreshCart();
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );

      setStockErrors((prev) => ({ ...prev, [productId]: null }));

      await updateCartItemApi(productId, currentQty - 1);
      refreshCart();
    } catch (err) {
      console.error("Decrease qty error:", err.message);
      refreshCart();
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await removeCartItemApi(productId);
      setCartItems(res.data.items);

      setStockErrors((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });

      refreshCart();
    } catch (err) {
      console.error("Remove item error:", err.message);
    }
  };

  const isMaxStock = (productId, currentQty) => {
    const item = cartItems.find((item) => item.product._id === productId);
    if (!item) return false;
    if (stockErrors[productId]) return true;
    return currentQty >= item.product.countInStock;
  };

  // ── UNIFIED PRICE CALCULATIONS ──
  const totalMRP = user
    ? cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
    : guestCartItems.reduce(
        (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
        0
      );

  const totalPrice = user
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : guestCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount = totalMRP - totalPrice;

  // Guest tax: 18% GST on the discounted price (same rate your backend uses)
  const GUEST_TAX_RATE = 0.18;
  const taxAmount = user
    ? cartMeta?.taxAmount || 0
    : totalPrice * GUEST_TAX_RATE;

  const totalWithTax = user
    ? cartMeta?.totalWithTax || totalPrice
    : totalPrice + taxAmount;

  // ── SIDE EFFECTS ──
  useEffect(() => {
    if (openSideCart) {
      if (user) refreshCart();
    }
  }, [openSideCart]);

  useEffect(() => {
    if (openSideCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openSideCart]);

  // Close side cart when cart becomes empty
  useEffect(() => {
    const isEmpty = user ? !cartItems.length : !guestCartItems.length;
    if (isEmpty && openSideCart) {
      // Don't auto-close immediately, let the empty state show
    }
  }, [cartItems, guestCartItems, user]);

  const isEmpty = user ? cartItems.length === 0 : guestCartItems.length === 0;

  return (
    <>
      <style>{`
        .overlay {
          position: fixed;
          top: ${navbarHeight}px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,.6);
          z-index: 1099;
          opacity: ${openSideCart ? "1" : "0"};
          pointer-events: ${openSideCart ? "auto" : "none"};
          transition: opacity 0.3s ease;
        }

        .sidecart {
          position: fixed;
          top: ${navbarHeight}px;
          bottom: 0;
          right: 0;
          width: 350px;
          max-width: 100%;
          background: #2a2a2a;
          transform: translateX(${openSideCart ? "0" : "100%"});
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1100;
          display: flex;
          flex-direction: column;
          overscroll-behavior: contain;
        }

        .sc-header {
          background: #ffeb00;
          color: #000;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 900;
          flex-shrink: 0;
        }

        .sc-close-btn {
          cursor: pointer;
          font-size: 24px;
          line-height: 1;
          background: none;
          border: none;
          color: #000;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          transition: transform 0.2s;
        }

        .sc-close-btn:hover {
          transform: scale(1.1);
        }

        .sc-body {
          padding: 14px;
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .sc-body::-webkit-scrollbar {
          display: none;
        }

        .sc-empty-cart {
          text-align: center;
          color: #ffeb00;
          padding: 40px 20px;
          font-size: 16px;
        }

        .sc-item {
          border: 2px solid #ffeb00;
          border-radius: 12px;
          padding: 6px;
          display: flex;
          gap: 16px;
          position: relative;
          background: #333;
          flex-shrink: 0;
        }

        .sc-item img {
          width: 90px;
          height: 120px;
          object-fit: cover;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .sc-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }

        .sc-item-details h4 {
          margin: 0;
          font-size: 16px;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .sc-item-details p {
          margin: 0;
          color: #ffeb00;
          font-weight: bold;
        }

        .sc-item-details del {
          color: #999;
          margin-left: 8px;
        }

        .sc-stock-warning {
          font-size: 12px;
          width: fit-content;
          color: #ff6b6b;
          background: rgba(255, 107, 107, 0.15);
          padding: 6px 8px;
          border-radius: 4px;
          border-left: 3px solid #ff6b6b;
          margin-top: 4px;
          font-weight: 500;
        }

        .sc-qty {
          display: flex;
          border: 1px solid #ffeb00;
          width: fit-content;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 8px;
        }

        .sc-qty button {
          width: 35px;
          height: 35px;
          background: none;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 18px;
          transition: background 0.2s;
        }

        .sc-qty button:hover:not(:disabled) {
          background: rgba(255, 235, 0, 0.2);
        }

        .sc-qty button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          color: #999;
          background: rgba(255, 0, 0, 0.1);
        }

        .sc-qty span {
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          border-left: 1px solid #ffeb00;
          border-right: 1px solid #ffeb00;
        }

        .sc-remove {
          position: absolute;
          right: 16px;
          bottom: 16px;
          color: #ff4444;
          cursor: pointer;
          font-size: 13px;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .sc-remove:hover {
          color: #ff6666;
        }

        .sc-price-box {
          border-top: 2px solid #ffeb00;
          padding: 10px 14px;
          background: #222;
          flex-shrink: 0;
        }

        .sc-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
          color: #fff;
          font-size: 15px;
        }

        .sc-row:last-child {
          margin-bottom: 0;
          font-size: 18px;
          font-weight: bold;
          padding-top: 4px;
          border-top: 1px solid #444;
        }

        .sc-green {
          color: #00c853;
          font-weight: bold;
        }

        .sc-footer {
          padding: 14px;
          background: #2a2a2a;
          flex-shrink: 0;
        }

        .sc-footer a {
          display: block;
          background: #ffeb00;
          color: #000;
          padding: 8px;
          text-align: center;
          font-weight: 900;
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .sc-footer a:hover {
          background: #ffed33;
        }

        /* ── Modal ── */
        .sc-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
        }

        .sc-login-modal {
          background: #151515;
          border: 2px solid #ffeb00;
          border-radius: 20px;
          padding: 32px;
          width: 90%;
          max-width: 420px;
          text-align: center;
          animation: scPopIn 0.3s ease;
        }

        .sc-login-modal h2 {
          color: #ffeb00;
          font-family: "Jersey 25", cursive;
          font-size: 32px;
          margin-bottom: 12px;
        }

        .sc-login-modal p {
          color: #ffffff;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .sc-modal-actions {
          display: flex;
          gap: 12px;
        }

        .sc-modal-btn {
          flex: 1;
          height: 48px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
          border: 2px solid #ffeb00;
          font-family: "Jersey 25", sans-serif;
        }

        .sc-modal-btn-login {
          background: #ffeb00;
          color: #000;
        }

        .sc-modal-btn-cancel {
          background: transparent;
          color: #fff;
        }

        @keyframes scPopIn {
          from { transform: scale(0.85); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }

        /* ── Mobile: full-width panel ── */
        @media (max-width: 768px) {
          .sidecart {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .sc-header {
            height: 50px;
            padding: 0 16px;
            font-size: 14px;
          }

          .sc-close-btn {
            width: 40px;
            height: 40px;
            font-size: 24px;
          }

          .sc-body {
            padding: 12px;
          }

          .sc-item {
            padding: 12px;
            gap: 10px;
          }

          .sc-item img {
            width: 60px;
            height: 80px;
          }

          .sc-item-details h4 {
            font-size: 13px;
          }

          .sc-item-details p {
            font-size: 13px;
          }

          .sc-stock-warning {
            font-size: 11px;
          }

          .sc-qty button {
            width: 30px;
            height: 30px;
          }

          .sc-qty span {
            min-width: 30px;
            font-size: 13px;
          }

          .sc-remove {
            top: 12px;
            bottom: auto;
            right: 12px;
            font-size: 12px;
            padding: 4px 8px;
            background: #ff4444;
            color: white;
            border-radius: 4px;
            text-decoration: none;
            height: 30px;
            display: flex;
            align-items: center;
          }

          .sc-remove:hover {
            background: #ff6666;
            color: white;
          }

          .sc-price-box {
            padding: 12px;
          }

          .sc-row {
            font-size: 13px;
          }

          .sc-row:last-child {
            font-size: 15px;
          }

          .sc-footer {
            padding: 12px;
          }

          .sc-modal-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 360px) {
          .sc-item img {
            width: 50px;
            height: 70px;
          }

          .sc-item-details h4 {
            font-size: 12px;
          }

          .sc-qty button {
            width: 28px;
            height: 28px;
            font-size: 14px;
          }

          .sc-qty span {
            min-width: 28px;
          }
        }
      `}</style>

      <div className="overlay" onClick={() => setOpenSideCart(false)} />

      <div className="sidecart">
        <div className="sc-header">
          <span>🛒 MY CART ({displayItems.length})</span>
          <button
            className="sc-close-btn"
            onClick={() => setOpenSideCart(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="sc-body">
          {isEmpty && (
            <div className="sc-empty-cart">Your cart is empty</div>
          )}

          {/* ── LOGGED-IN USER CART ITEMS ── */}
          {user &&
            cartItems.map((item) => (
              <div
                className="sc-item"
                key={item.product._id}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/productspec/${item.product._id}`);
                  setOpenSideCart(false);
                }}
              >
                <img
                  src={item.product.images?.[0]?.url || "/images/Product1.png"}
                  alt={item.product.name}
                />

                <div className="sc-item-details">
                  <h4>{item.product.name}</h4>

                  <p>
                    ₹{item.price}{" "}
                    {item.originalPrice && item.originalPrice !== item.price && (
                      <del>₹{item.originalPrice}</del>
                    )}
                  </p>

                  {stockErrors[item.product._id] && (
                    <div className="sc-stock-warning">
                      ⚠️ {stockErrors[item.product._id]}
                    </div>
                  )}

                  {!stockErrors[item.product._id] &&
                    item.quantity >= item.product.countInStock && (
                      <div className="sc-stock-warning">
                        📦 Max stock reached ({item.product.countInStock}{" "}
                        available)
                      </div>
                    )}

                  <div className="sc-qty">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        decreaseQty(item.product._id, item.quantity);
                      }}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        increaseQty(
                          item.product._id,
                          item.quantity,
                          item.product.countInStock
                        );
                      }}
                      disabled={isMaxStock(item.product._id, item.quantity)}
                      aria-label="Increase quantity"
                      title={
                        isMaxStock(item.product._id, item.quantity)
                          ? stockErrors[item.product._id] ||
                            "Maximum stock reached"
                          : "Add one more"
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <span
                  className="sc-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.product._id);
                  }}
                >
                  Remove
                </span>
              </div>
            ))}

          {/* ── GUEST CART ITEMS ── */}
          {!user &&
            guestCartItems.map((item) => (
              <div className="sc-item" key={item.productId}>
                <img
                  src={item.image || "/images/Product1.png"}
                  alt={item.name}
                />

                <div className="sc-item-details">
                  <h4>{item.name}</h4>

                  <p>
                    ₹{item.price}{" "}
                    {item.originalPrice && item.originalPrice !== item.price && (
                      <del>₹{item.originalPrice}</del>
                    )}
                  </p>

                  <div className="sc-qty">
                    <button
                      onClick={() =>
                        guestDecreaseQty(item.productId, item.quantity)
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => guestIncreaseQty(item.productId)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <span
                  className="sc-remove"
                  onClick={() => guestRemoveItem(item.productId)}
                >
                  Remove
                </span>
              </div>
            ))}
        </div>

        {!isEmpty && (
          <>
            <div className="sc-price-box">
              <div className="sc-row">
                <span>Price (MRP)</span>
                <span>₹{totalMRP}</span>
              </div>

              {discount > 0 && (
                <div className="sc-row sc-green">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="sc-row">
                <span>Tax</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>

              <div className="sc-row sc-green">
                <span>Total</span>
                <span>₹{totalWithTax.toFixed(2)}</span>
              </div>
            </div>

            <div className="sc-footer">
              <button
                onClick={handleProceed}
                style={{
                  width: "100%",
                  background: "#ffeb00",
                  color: "#000",
                  padding: "12px",
                  fontWeight: "900",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "'Jersey 25', sans-serif",
                }}
              >
                PLACE ORDER
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── LOGIN MODAL ── */}
      {showLoginModal && (
        <div
          className="sc-modal-overlay"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="sc-login-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Login Required</h2>
            <p>Please login to place your order.</p>

            <div className="sc-modal-actions">
              <button
                className="sc-modal-btn sc-modal-btn-login"
                onClick={() => {
                  setShowLoginModal(false);
                  setOpenSideCart(false);
                  navigate("/login");
                }}
              >
                LOGIN
              </button>

              <button
                className="sc-modal-btn sc-modal-btn-cancel"
                onClick={() => setShowLoginModal(false)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}