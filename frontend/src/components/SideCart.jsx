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







import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateCartItemApi, removeCartItemApi } from "../api/cartApi";
import { useCart } from "../context/CartContext";

export default function SideCart() {
  const {
    cartItems,
    setCartItems,
    refreshCart,
    openSideCart,
    setOpenSideCart,
    cartMeta,
  } = useCart();

  // Add state to track stock errors from backend
  const [stockErrors, setStockErrors] = useState({});

  const increaseQty = async (productId, currentQty, stock) => {
    // Prevent increasing quantity beyond available stock
    if (currentQty >= stock) {
      setStockErrors((prev) => ({
        ...prev,
        [productId]: "Max stock reached",
      }));
      return;
    }

    // Clear any previous stock error for this product
    setStockErrors((prev) => ({ ...prev, [productId]: null }));

    try {
      // Optimistic UI update
      setCartItems((prev) =>
        prev.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );

      // Call API to update backend
      await updateCartItemApi(productId, currentQty + 1);
      refreshCart(); // Refresh cart to sync with backend
    } catch (err) {
      console.log("Increase qty error:", err);

      // If error contains stock-related message
      if (
        err.response?.data?.message?.includes("stock") ||
        err.response?.data?.error?.includes("stock") ||
        err.response?.data?.message?.includes("available") ||
        err.response?.data?.error?.includes("available")
      ) {
        console.log("Stock limitation error:", err.response?.data);
        // Set stock error to disable button for this product
        setStockErrors((prev) => ({
          ...prev,
          [productId]: "max stock reached",
        }));
      }

      // Refresh cart to revert optimistic update on error
      refreshCart();
    }
  };

  const decreaseQty = async (productId, currentQty) => {
    try {
      if (currentQty <= 1) {
        const res = await removeCartItemApi(productId);
        setCartItems(res.data.items);
        // Clear any stock errors for this product
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
            : item,
        ),
      );

      // Clear stock error when decreasing quantity
      setStockErrors((prev) => ({ ...prev, [productId]: null }));

      await updateCartItemApi(productId, currentQty - 1);
      refreshCart();
    } catch (err) {
      console.error("Decrease qty error:", err.message);
      refreshCart(); // rollback on error
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await removeCartItemApi(productId);
      setCartItems(res.data.items);

      // Clear stock error for removed item
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

  // Helper to disable + button when at max stock
  const isMaxStock = (productId, currentQty) => {
    const item = cartItems.find((item) => item.product._id === productId);
    if (!item) return false;

    // Check if there's a stock error from backend
    if (stockErrors[productId]) {
      return true;
    }

    // Check local stock count
    return currentQty >= item.product.countInStock;
  };

  const totalMRP = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discount = totalMRP - totalPrice;

  useEffect(() => {
    if (openSideCart) {
      refreshCart();
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

  useEffect(() => {
    if (!cartItems.length) {
      setOpenSideCart(false);
    }
  }, [cartItems]);

  return (
    <>
      <style>{`

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.6);
          z-index: 998;
          opacity: ${openSideCart ? "1" : "0"};
          pointer-events: ${openSideCart ? "auto" : "none"};
          transition: opacity 0.3s ease;
        }

        /* ── Core sidecart shell ──
           Always anchored to the navbar bottom edge via top: var(--navbar-height).
           flex-direction: column lets header / body / priceBox / footer
           stack naturally; body takes all remaining space and scrolls. */
        .sidecart {
          position: fixed;
          top: var(--navbar-height);
          bottom: 0;
          right: 0;
          width: 350px;
          max-width: 100%;
          background: #2a2a2a;
          transform: translateX(${openSideCart ? "0" : "100%"});
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 999;
          display: flex;
          flex-direction: column;
          overscroll-behavior: contain;
        }

        /* ── Header ── */
        .header {
          background: #ffeb00;
          color: #000;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 900;
          flex-shrink: 0;
        }

        .close-btn {
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

        .close-btn:hover {
          transform: scale(1.1);
        }

        /* ── Scrollable item list ──
           flex: 1 + min-height: 0 is the key combo that makes an inner
           flex child shrink and scroll instead of overflowing the parent. */
        .body {
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

        .body::-webkit-scrollbar {
          display: none;
        }

        .empty-cart {
          text-align: center;
          color: #ffeb00;
          padding: 40px 20px;
          font-size: 16px;
        }

        /* ── Cart item card ── */
        .item {
          border: 2px solid #ffeb00;
          border-radius: 12px;
          padding: 6px;
          display: flex;
          gap: 16px;
          position: relative;
          background: #333;
          flex-shrink: 0;
        }

        .item img {
          width: 90px;
          height: 120px;
          object-fit: cover;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }

        .item-details h4 {
          margin: 0;
          font-size: 16px;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .item-details p {
          margin: 0;
          color: #ffeb00;
          font-weight: bold;
        }

        .item-details del {
          color: #999;
          margin-left: 8px;
        }

        .stock-warning {
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

        .qty {
          display: flex;
          border: 1px solid #ffeb00;
          width: fit-content;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 8px;
        }

        .qty button {
          width: 35px;
          height: 35px;
          background: none;
          color: #fff;
          border: none;
          cursor: pointer;
          font-size: 18px;
          transition: background 0.2s;
        }

        .qty button:hover:not(:disabled) {
          background: rgba(255, 235, 0, 0.2);
        }

        .qty button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          color: #999;
          background: rgba(255, 0, 0, 0.1);
        }

        .qty span {
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          border-left: 1px solid #ffeb00;
          border-right: 1px solid #ffeb00;
        }

        .remove {
          position: absolute;
          right: 16px;
          bottom: 16px;
          color: #ff4444;
          cursor: pointer;
          font-size: 13px;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .remove:hover {
          color: #ff6666;
        }

        /* ── Price summary ── */
        .priceBox {
          border-top: 2px solid #ffeb00;
          padding: 10px 14px;
          background: #222;
          flex-shrink: 0;
        }

        .row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
          color: #fff;
          font-size: 15px;
        }

        .row:last-child {
          margin-bottom: 0;
          font-size: 18px;
          font-weight: bold;
          padding-top: 4px;
          border-top: 1px solid #444;
        }

        .green {
          color: #00c853;
          font-weight: bold;
        }

        /* ── Place order button ── */
        .footer {
          padding: 14px;
          background: #2a2a2a;
          flex-shrink: 0;
        }

        .footer a {
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

        .footer a:hover {
          background: #ffed33;
        }

        /* ── Mobile: full-width panel, still anchored below navbar ── */
        @media (max-width: 768px) {
          .sidecart {
            width: 100%;
          }
        }

        /* ── Compact tweaks for smaller phones ── */
        @media (max-width: 480px) {
          .header {
            height: 50px;
            padding: 0 16px;
            font-size: 14px;
          }

          .close-btn {
            width: 40px;
            height: 40px;
            font-size: 24px;
          }

          .body {
            padding: 12px;
          }

          .item {
            padding: 12px;
            gap: 10px;
          }

          .item img {
            width: 60px;
            height: 80px;
          }

          .item-details h4 {
            font-size: 13px;
          }

          .item-details p {
            font-size: 13px;
          }

          .stock-warning {
            font-size: 11px;
          }

          .qty button {
            width: 30px;
            height: 30px;
          }

          .qty span {
            min-width: 30px;
            font-size: 13px;
          }

          /* Remove button moves to top-right on small screens */
          .remove {
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

          .remove:hover {
            background: #ff6666;
            color: white;
          }

          .priceBox {
            padding: 12px;
          }

          .row {
            font-size: 13px;
          }

          .row:last-child {
            font-size: 15px;
          }

          .footer {
            padding: 12px;
          }
        }

        /* ── Very small phones ── */
        @media (max-width: 360px) {
          .item img {
            width: 50px;
            height: 70px;
          }

          .item-details h4 {
            font-size: 12px;
          }

          .qty button {
            width: 28px;
            height: 28px;
            font-size: 14px;
          }

          .qty span {
            min-width: 28px;
          }
        }
      `}</style>

      <div className="overlay" onClick={() => setOpenSideCart(false)} />

      <div className="sidecart">
        <div className="header">
          <span>🛒 MY CART ({cartItems.length})</span>
          <button
            className="close-btn"
            onClick={() => setOpenSideCart(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="body">
          {cartItems.length === 0 && (
            <div className="empty-cart">Your cart is empty</div>
          )}

          {cartItems.map((item) => (
            <div className="item" key={item.product._id}>
              <img
                src={item.product.images?.[0]?.url || "/images/Product1.png"}
                alt={item.product.name}
              />

              <div className="item-details">
                <h4>{item.product.name}</h4>

                <p>
                  ₹{item.price} <del>₹{item.originalPrice}</del>
                </p>

                {/* Display stock error message if exists */}
                {stockErrors[item.product._id] && (
                  <div className="stock-warning">
                    ⚠️ {stockErrors[item.product._id]}
                  </div>
                )}

                {/* Stock warning message when at max but no specific error */}
                {!stockErrors[item.product._id] &&
                  item.quantity >= item.product.countInStock && (
                    <div className="stock-warning">
                      📦 Max stock reached ({item.product.countInStock}{" "}
                      available)
                    </div>
                  )}

                <div className="qty">
                  <button
                    onClick={() => decreaseQty(item.product._id, item.quantity)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      increaseQty(
                        item.product._id,
                        item.quantity,
                        item.product.countInStock,
                      )
                    }
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
                className="remove"
                onClick={() => removeItem(item.product._id)}
              >
                Remove
              </span>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <>
            <div className="priceBox">
              <div className="row">
                <span>Price</span>
                <span>₹{totalMRP}</span>
              </div>

              <div className="row green">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>

              <div className="row">
                <span>Tax</span>
                <span>₹{cartMeta.taxAmount.toFixed(2)}</span>
              </div>

              <div className="row green">
                <span>Total</span>
                <span>₹{cartMeta.totalWithTax.toFixed(2)}</span>
              </div>
            </div>

            <div className="footer">
              <Link to="/cart" onClick={() => setOpenSideCart(false)}>
                PLACE ORDER
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}