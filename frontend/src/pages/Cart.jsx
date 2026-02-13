// import React, { useMemo, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Footer from "../components/Footer";
// import {
//   updateCartItemApi,
//   removeCartItemApi,
// } from "../api/cartApi";
// import { useCart } from "../context/CartContext";

// export default function Cart() {
//   const {
//     cartItems,
//     setCartItems,
//     refreshCart,
//     cartMeta
//   } = useCart();

//   // const packingCharges = 20;

//   // 🔥 PRICE CALCULATIONS (SAME AS SIDECART)
//   const totalMRP = cartItems.reduce(
//     (sum, item) => sum + item.originalPrice * item.quantity,
//     0
//   );

//   const totalPrice = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const discount = totalMRP - totalPrice;
//   // const finalAmount = totalPrice + packingCharges;
//     // const finalAmount = totalPrice;
//     const finalAmount = cartMeta.totalWithTax;



//   // 🔥 LOAD CART WHEN PAGE OPENS
//   useEffect(() => {
//     refreshCart();
//   }, []);

//   // 🔥 UPDATE QUANTITY (SYNC WITH CONTEXT)
//   const updateQty = async (productId, quantity) => {
//     try {
//       if (quantity < 1) {
//         const res = await removeCartItemApi(productId);
//         setCartItems(res.data.items);
//         return;
//       }

//       // Optimistic UI update
//       setCartItems(prev =>
//         prev.map(item =>
//           item.product._id === productId
//             ? { ...item, quantity }
//             : item
//         )
//       );

//       await updateCartItemApi(productId, quantity);

//     } catch (err) {
//       console.log("Update qty error:", err);
//       refreshCart(); // rollback
//     }
//   };

//   // 🔥 REMOVE ITEM
//   const removeItem = async (productId) => {
//     try {
//       const res = await removeCartItemApi(productId);
//       setCartItems(res.data.items);
//     } catch (err) {
//       console.log("Remove item error:", err);
//     }
//   };

//   return (
//     <>
//       <style>{`
//       body{background:#2f2f2f;color:#fff}

//       .cart-page{max-width:1600px;margin:auto;padding:40px}
//       h1{color:#ffeb00;margin-bottom:30px}

//       .layout{display:grid;grid-template-columns:2fr 1fr;gap:40px}

//       .item-card{
//         border:2px solid #ffeb00;
//         border-radius:12px;
//         padding:24px;
//         display:flex;
//         gap:24px;
//         margin-bottom:30px;
//         position:relative;
//         background:#262626;
//       }

//       .delete{
//         position:absolute;top:16px;right:16px;
//         cursor:pointer;font-size:18px;color:#ff4d4d
//       }

//       .img{
//         width:160px;height:200px;
//         border-radius:10px;
//         overflow:hidden;
//         background:#111;
//         flex-shrink:0;
//       }

//       .img img{width:100%;height:100%;object-fit:cover}

//       .details{flex:1}
//       .details h3{font-size:16px;margin-bottom:10px}

//       .price{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
//       .price del{color:#aaa}
//       .price span{font-weight:700;font-size:16px}
//       .off{color:#00c853;font-size:13px}

//       .qty-row{
//         display:flex;
//         align-items:center;
//         gap:12px;
//         margin-top:14px;
//       }

//       .qty-box{
//         display:flex;
//         align-items:center;
//         border:2px solid #ffeb00;
//         border-radius:6px;
//         overflow:hidden;
//         height:36px;
//       }

//       .qty-box button{
//         width:36px;
//         height:36px;
//         background:none;
//         border:none;
//         color:#ffeb00;
//         font-size:20px;
//         cursor:pointer;
//       }

//       .qty-box span{
//         width:36px;
//         text-align:center;
//         font-weight:700;
//       }

//       .price-box{
//         border:2px solid #ffeb00;
//         border-radius:12px;
//         padding:24px;
//         background:#262626;
//         height:fit-content;
//       }

//       .row{display:flex;justify-content:space-between;margin-bottom:14px}
//       .green{color:#00c853;font-weight:700}

//       .save{
//         border:1px solid #ffeb00;
//         padding:10px;
//         text-align:center;
//         margin:16px 0;
//       }

//       .order-btn{
//         width:100%;
//         padding:14px;
//         background:#ffeb00;
//         border:none;
//         font-weight:800;
//         cursor:pointer;
//       }
//       `}</style>

//       <div className="cart-page">
//         <h1>SHOPPING CART</h1>

//         <div className="layout">
//           <div>
//             {cartItems.map((item) => (
//               <div className="item-card" key={item.product._id}>
//                 <div className="delete" onClick={() => removeItem(item.product._id)}>
//                   🗑
//                 </div>

//                 <div className="img">
//                   <img 
//                   // src={item.product.images[0].url} alt="" 
//                    src={item.product.images?.[0]?.url || "/images/Product1.png"}
//                         alt={item.product.name}
//                   />
//                 </div>

//                 <div className="details">
//                   <h3>{item.product.name}</h3>

//                   <div className="price">
//                     <del>₹{item.originalPrice}</del>
//                     <span>₹{item.price}</span>
//                     <span className="off">
//                       {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
//                     </span>
//                   </div>

//                   <div className="qty-row">
//                     <span>Quantity:</span>
//                     <div className="qty-box">
//                       <button onClick={() => updateQty(item.product._id, item.quantity - 1)}>
//                         -
//                       </button>
//                       <span>{item.quantity}</span>
//                       <button onClick={() => updateQty(item.product._id, item.quantity + 1)}>
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="price-box">
//             <h2>PRICE DETAILS</h2>

//             <div className="row">
//               <span>Price ({cartItems.length} items)</span>
//               <span>₹{totalMRP}</span>
//             </div>

//             <div className="row green">
//               <span>Discount</span>
//               <span>-₹{discount}</span>
//             </div>

//             {/* <div className="row">
//               <span>Packing & other charges</span>
//               <span>₹{packingCharges}</span>
//             </div> */}

//             <div className="row">
//   <span>Tax</span>
//   <span>₹{cartMeta.taxAmount.toFixed(2)}</span>
// </div>


//             <hr />

//             {/* <div className="row green">
//               <span>Total Amount</span>
//               <span>₹{finalAmount}</span>
//             </div> */}
//             <div className="row green">
//   <span>Total Amount</span>
//   <span>₹{finalAmount.toFixed(2)}</span>
// </div>


//             <div className="save">
//               You will save ₹{discount} on this order
//             </div>

//             <Link to="/checkout">
//               <button className="order-btn">PLACE ORDER</button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }



import React, { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import {
  updateCartItemApi,
  removeCartItemApi,
} from "../api/cartApi";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cartItems,
    setCartItems,
    refreshCart,
    cartMeta
  } = useCart();

  // Add state to track stock errors from backend
  const [stockErrors, setStockErrors] = useState({});

  // const packingCharges = 20;

  // 🔥 PRICE CALCULATIONS (SAME AS SIDECART)
  const totalMRP = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = totalMRP - totalPrice;
  // const finalAmount = totalPrice + packingCharges;
    // const finalAmount = totalPrice;
    const finalAmount = cartMeta.totalWithTax;

  // 🔥 LOAD CART WHEN PAGE OPENS
  useEffect(() => {
    refreshCart();
  }, []);

  // 🔥 UPDATE QUANTITY (SYNC WITH CONTEXT)
  const updateQty = async (productId, quantity, stock, isIncreasing) => {
    // Only check stock when increasing quantity
    if (isIncreasing && quantity > (stock || 0)) {
      setStockErrors(prev => ({ 
        ...prev, 
        [productId]: "Max stock reached" 
      }));
      return;
    }

    // Clear any previous stock error for this product when decreasing
    if (!isIncreasing) {
      setStockErrors(prev => ({ ...prev, [productId]: null }));
    }

    try {
      if (quantity < 1) {
        const res = await removeCartItemApi(productId);
        setCartItems(res.data.items);
        // Clear stock errors for this product
        setStockErrors(prev => {
          const updated = { ...prev };
          delete updated[productId];
          return updated;
        });
        return;
      }

      // Optimistic UI update
      setCartItems(prev =>
        prev.map(item =>
          item.product._id === productId
            ? { ...item, quantity }
            : item
        )
      );

      await updateCartItemApi(productId, quantity);

    } catch (err) {
      console.log("Update qty error:", err);
      
      // If error contains stock-related message
      if (
        err.response?.data?.message?.includes("stock") ||
        err.response?.data?.error?.includes("stock") ||
        err.response?.data?.message?.includes("available") ||
        err.response?.data?.error?.includes("available")
      ) {
        console.log("Stock limitation error:", err.response?.data);
        // Set stock error to disable button for this product
        setStockErrors(prev => ({ 
          ...prev, 
          [productId]: "max stock reached" 
        }));
      }
      
      refreshCart(); // rollback
    }
  };

  // 🔥 REMOVE ITEM
  const removeItem = async (productId) => {
    try {
      const res = await removeCartItemApi(productId);
      setCartItems(res.data.items);
      
      // Clear stock error for removed item
      setStockErrors(prev => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
    } catch (err) {
      console.log("Remove item error:", err);
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

  return (
    <>
      <style>{`
      body{background:#2f2f2f;color:#fff}

      .cart-page{max-width:1600px;margin:auto;padding:40px}
      h1{color:#ffeb00;margin-bottom:30px}

      .layout{display:grid;grid-template-columns:2fr 1fr;gap:40px}

      .item-card{
        border:2px solid #ffeb00;
        border-radius:12px;
        padding:24px;
        display:flex;
        gap:24px;
        margin-bottom:30px;
        position:relative;
        background:#262626;
      }

      .delete{
        position:absolute;top:16px;right:16px;
        cursor:pointer;font-size:18px;color:#ff4d4d
      }

      .img{
        width:160px;height:200px;
        border-radius:10px;
        overflow:hidden;
        background:#111;
        flex-shrink:0;
      }

      .img img{width:100%;height:100%;object-fit:cover}

      .details{flex:1}
      .details h3{font-size:16px;margin-bottom:10px}

      .price{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
      .price del{color:#aaa}
      .price span{font-weight:700;font-size:16px}
      .off{color:#00c853;font-size:13px}

      .qty-row{
        display:flex;
        align-items:center;
        gap:12px;
        margin-top:14px;
      }

      .qty-box{
        display:flex;
        align-items:center;
        border:2px solid #ffeb00;
        border-radius:6px;
        overflow:hidden;
        height:36px;
      }

      .qty-box button{
        width:36px;
        height:36px;
        background:none;
        border:none;
        color:#ffeb00;
        font-size:20px;
        cursor:pointer;
      }

      .qty-box button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        color: #999;
        background: rgba(255, 0, 0, 0.1);
      }

      .qty-box span{
        width:36px;
        text-align:center;
        font-weight:700;
      }

      .stock-warning {
        font-size: 13px;
        width: fit-content;
        color: #ff6b6b;
        background: rgba(255, 107, 107, 0.15);
        padding: 6px 12px;
        border-radius: 4px;
        border-left: 3px solid #ff6b6b;
        margin-top: 10px;
        font-weight: 500;
      }

      .price-box{
        border:2px solid #ffeb00;
        border-radius:12px;
        padding:24px;
        background:#262626;
        height:fit-content;
      }

      .row{display:flex;justify-content:space-between;margin-bottom:14px}
      .green{color:#00c853;font-weight:700}

      .save{
        border:1px solid #ffeb00;
        padding:10px;
        text-align:center;
        margin:16px 0;
      }

      .order-btn{
        width:100%;
        padding:14px;
        background:#ffeb00;
        border:none;
        font-weight:800;
        cursor:pointer;
      }
      `}</style>

      <div className="cart-page">
        <h1>SHOPPING CART</h1>

        <div className="layout">
          <div>
            {cartItems.map((item) => (
              <div className="item-card" key={item.product._id}>
                <div className="delete" onClick={() => removeItem(item.product._id)}>
                  🗑
                </div>

                <div className="img">
                  <img 
                   src={item.product.images?.[0]?.url || "/images/Product1.png"}
                        alt={item.product.name}
                  />
                </div>

                <div className="details">
                  <h3>{item.product.name}</h3>

                  <div className="price">
                    <del>₹{item.originalPrice}</del>
                    <span>₹{item.price}</span>
                    <span className="off">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </span>
                  </div>

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
                        📦 Max stock reached ({item.product.countInStock} available)
                      </div>
                    )}

                  <div className="qty-row">
                    <span>Quantity:</span>
                    <div className="qty-box">
                      <button 
                        onClick={() => updateQty(item.product._id, item.quantity - 1, item.product.countInStock, false)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQty(item.product._id, item.quantity + 1, item.product.countInStock, true)}
                        disabled={isMaxStock(item.product._id, item.quantity)}
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
                </div>
              </div>
            ))}
          </div>

          <div className="price-box">
            <h2>PRICE DETAILS</h2>

            <div className="row">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{totalMRP}</span>
            </div>

            <div className="row green">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>

            {/* <div className="row">
              <span>Packing & other charges</span>
              <span>₹{packingCharges}</span>
            </div> */}

            <div className="row">
              <span>Tax</span>
              <span>₹{cartMeta.taxAmount.toFixed(2)}</span>
            </div>

            <hr />

            {/* <div className="row green">
              <span>Total Amount</span>
              <span>₹{finalAmount}</span>
            </div> */}
            <div className="row green">
              <span>Total Amount</span>
              <span>₹{finalAmount.toFixed(2)}</span>
            </div>

            <div className="save">
              You will save ₹{discount} on this order
            </div>

            <Link to="/checkout">
              <button className="order-btn">PLACE ORDER</button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}