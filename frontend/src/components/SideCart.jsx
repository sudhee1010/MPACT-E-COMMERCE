// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   getCartApi,
//   updateCartItemApi,
//   removeCartItemApi,
// } from "../api/cartApi";
// import { useCart } from "../context/CartContext";
// // import toast from "react-hot-toast";

// export default function SideCart() {
//   // const [cartItems, setCartItems] = useState([]);
//   const {
//     cartItems,
//     setCartItems,
//     refreshCart,
//     openSideCart,
//     setOpenSideCart,
//     cartMeta
//   } = useCart();

//   // const packingCharge = 20;

//   // const increaseQty = async (productId, currentQty) => {
//   //   try {
//   //     const res = await updateCartItemApi(productId, currentQty + 1);
//   //      console.log("UPDATE RESPONSE:", res.data); 

//   //     // 🔥 DIRECTLY UPDATE STATE FROM RESPONSE
//   //     setCartItems(res.data.items);

//   //   } catch (err) {
//   //     console.log("Increase qty error:", err);
//   //   }
//   // };

//   const increaseQty = async (productId, currentQty, stock) => {
//     if (currentQty >= stock) return; // 🔥 stop over stock

//     try {
//       // 🔥 Optimistically update UI first
//       setCartItems(prev =>
//         prev.map(item =>
//           item.product._id === productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );

//       // Then update backend
//       await updateCartItemApi(productId, currentQty + 1);
//       refreshCart();

//     } catch (err) {
//       console.log("Increase qty error:", err);
//       fetchCart(); // rollback if error
//     }
//   };

//   // const decreaseQty = async (productId, currentQty) => {
//   //   try {
//   //     const res = await updateCartItemApi(productId, currentQty - 1);
//   //      console.log("UPDATE RESPONSE:", res.data); 

//   //     // 🔥 DIRECTLY UPDATE STATE FROM RESPONSE
//   //     setCartItems(res.data.items);

//   //   } catch (err) {
//   //     console.log("Decrease qty error:", err);
//   //   }
//   // };

//   const decreaseQty = async (productId, currentQty) => {
//     try {
//       if (currentQty <= 1) {
//         const res = await removeCartItemApi(productId);
//         setCartItems(res.data.items);
//         refreshCart();
//         return;
//       }

//       // 🔥 Optimistically update UI
//       setCartItems(prev =>
//         prev.map(item =>
//           item.product._id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//       );

//       await updateCartItemApi(productId, currentQty - 1);
//       refreshCart();

//     } catch (err) {
//       console.log("Decrease qty error:", err);
//       fetchCart(); // rollback
//     }
//   };

//   const removeItem = async (productId) => {
//     try {
//       const res = await removeCartItemApi(productId);

//       // 🔥 UPDATE STATE DIRECTLY
//       setCartItems(res.data.items);
//       refreshCart();

//     } catch (err) {
//       console.log("Remove item error:", err);
//     }
//   };

//   // Total MRP
//   const totalMRP = cartItems.reduce(
//     (sum, item) => sum + item.originalPrice * item.quantity,
//     0
//   );

//   // Total Selling Price
//   const totalPrice = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   // Discount
//   const discount = totalMRP - totalPrice;

//   // Final Amount
//   // const finalAmount = totalPrice + packingCharge;
//   // const finalAmount = totalPrice;

//   // useEffect(() => {
//   //   if (open) {
//   //     fetchCart();
//   //   }
//   // }, [open]);

//   useEffect(() => {
//     if (openSideCart) {
//       refreshCart();
//     }
//   }, [openSideCart]);

//   useEffect(() => {
//     if (!cartItems.length) {
//       setOpenSideCart(false);
//     }

//     //  if (cartItems.length===0) {
//     //   toast.error("Your cart is empty");
//     //  }else{
//     //   setOpenSideCart(true);
//     // }
//   }, [cartItems]);

//   const fetchCart = async () => {
//     try {
//       const res = await getCartApi();
//       setCartItems(res.data.items || []);
//     } catch (error) {
//       console.log("Fetch side cart error:", error);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         .overlay {
//           position: fixed;
//           top: 70px; /* Adjust to match your navbar height */
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0,0,0,.6);
//           z-index: 998; /* Below navbar but above page content */
//           display: ${openSideCart ? "block" : "none"};
//         }

//         .sidecart {
//           position: fixed;
//           top: 92px; /* Same as navbar height */
//           right: 0;
//           width: 520px;
//           height: calc(97.5vh - 70px); /* Subtract navbar height */
//           background: #2a2a2a;
//           transform: translateX(${openSideCart ? "0" : "100%"});
//           transition: .35s;
//           z-index: 999; /* Above overlay */
//           display: flex;
//           flex-direction: column;
//         }

//         .header {
//           background: #ffeb00;
//           color: #000;
//           padding: 18px 22px;
//           display: flex;
//           justify-content: space-between;
//           font-weight: 900;
//         }

//         .body {
//           padding: 24px;
//           flex: 1;
//           overflow-y: auto;
//         }

//         .item {
//           border: 2px solid #ffeb00;
//           border-radius: 12px;
//           padding: 18px;
//           display: flex;
//           gap: 16px;
//           position: relative;
//         }

//         .item img {
//           width: 90px;
//           height: 120px;
//           object-fit: cover;
//           border-radius: 10px;
//         }

//         .spec {
//           border: 1px solid #ffeb00;
//           padding: 3px 7px;
//           font-size: 10px;
//           border-radius: 4px;
//           color: #ffeb00;
//           margin-right: 5px;
//         }

//         .qty {
//           display: flex;
//           border: 1px solid #ffeb00;
//           width: fit-content;
//           margin-top: 10px;
//         }

//         .qty button {
//           width: 30px;
//           background: none;
//           color: #fff;
//           border: none;
//           cursor: pointer;
//         }

//         .remove {
//           position: absolute;
//           right: 16px;
//           bottom: 16px;
//           color: red;
//           cursor: pointer;
//         }

//         .priceBox {
//           border-top: 2px solid #ffeb00;
//           padding: 20px;
//         }

//         .row {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 8px;
//         }

//         .green {
//           color: #00c853;
//           font-weight: bold;
//         }

//         .footer {
//           padding: 18px;
//         }

//         .footer a {
//           display: block;
//           background: #ffeb00;
//           color: #000;
//           padding: 16px;
//           text-align: center;
//           font-weight: 900;
//           text-decoration: none;
//         }
//       `}</style>

//       <div className="overlay" onClick={() => setOpenSideCart(false)} />

//       <div className="sidecart">
//         <div className="header">
//           <span>🛒 MY CART ({cartItems.length})</span>
//           <span style={{ cursor: "pointer" }} onClick={() => setOpenSideCart(false)}>✕</span>
//         </div>

//         <div className="body">
//           {cartItems.length === 0 && <p>Your cart is empty</p>}

//           {cartItems.map(item => (
//             <div className="item" key={item.product._id}>
//               {/* <img src={item.product.images[0].url || "/placeholder.png"} alt="" /> */}
//               <img
//                 src={item.product.images?.[0]?.url || "/images/Product1.png"}
//                 alt={item.product.name}
//               />

//               <div>
//                 <h4>{item.product.name}</h4>

//                 {/* <div>
//                   {item.highlights?.map((s, i) => (
//                     <span className="spec" key={i}>{s}</span>
//                   ))}
//                 </div> */}

//                 <p>
//                   {/* ₹{item.price} <del>₹{item.orginalPrice}</del> */}
//                   ₹{item.price} <del>₹{item.originalPrice}</del>
//                 </p>

//                 <div className="qty">
//                   <button onClick={() => decreaseQty(item.product._id, item.quantity)}>-</button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => increaseQty(item.product._id, item.quantity, item.product.countInStock)}>+</button>
//                 </div>
//               </div>

//               <span className="remove" onClick={() => removeItem(item.product._id)}>
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

//               {/* <div className="row">
//                 <span>Packing</span>
//                 <span>₹{packingCharge}</span>
//               </div> */}

//               <div className="row">
//                 <span>Tax</span>
//                 <span>₹{cartMeta.taxAmount.toFixed(2)}</span>
//               </div>

//               <div className="row green">
//                 <span>Total</span>
//                 <span>₹{cartMeta.totalWithTax.toFixed(2)}</span>
//               </div>

//               {/* <div className="row green">
//                 <span>Total</span>
//                 <span>₹{finalAmount}</span>
//               </div> */}
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




import { useEffect } from "react";
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

  const increaseQty = async (productId, currentQty, stock) => {
    if (currentQty >= stock) return;

    try {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );

      await updateCartItemApi(productId, currentQty + 1);
      refreshCart();
    } catch (err) {
      console.log("Increase qty error:", err);
    }
  };

  const decreaseQty = async (productId, currentQty) => {
    try {
      if (currentQty <= 1) {
        const res = await removeCartItemApi(productId);
        setCartItems(res.data.items);
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

      await updateCartItemApi(productId, currentQty - 1);
      refreshCart();
    } catch (err) {
      console.log("Decrease qty error:", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await removeCartItemApi(productId);
      setCartItems(res.data.items);
      refreshCart();
    } catch (err) {
      console.log("Remove item error:", err);
    }
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

        .sidecart {
          position: fixed;
          top: var(--navbar-height);
          bottom: 0;
          right: 0;
          width: 520px;
          background: #2a2a2a;
          transform: translateX(${openSideCart ? "0" : "100%"});
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 999;
          display: flex;
          flex-direction: column;
          max-width: 100%;
          overscroll-behavior: contain;
        }

        .header {
          background: #ffeb00;
          color: #000;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 900;
          position: sticky;
          top: 0;
          z-index: 10;
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

        .body {
          padding: 24px;
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .empty-cart {
          text-align: center;
          color: #ffeb00;
          padding: 40px 20px;
          font-size: 16px;
        }

        .item {
          border: 2px solid #ffeb00;
          border-radius: 12px;
          padding: 18px;
          display: flex;
          gap: 16px;
          position: relative;
          background: #333;
        }

        .item img {
          width: 90px;
          height: 120px;
          object-fit: cover;
          border-radius: 10px;
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

        .qty {
          display: flex;
          border: 1px solid #ffeb00;
          width: fit-content;
          border-radius: 4px;
          overflow: hidden;
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

        .qty button:hover {
          background: rgba(255, 235, 0, 0.2);
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

        .priceBox {
          border-top: 2px solid #ffeb00;
          padding: 20px 24px;
          background: #222;
        }

        .row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          color: #fff;
          font-size: 15px;
        }

        .row:last-child {
          margin-bottom: 0;
          font-size: 18px;
          font-weight: bold;
          padding-top: 12px;
          border-top: 1px solid #444;
        }

        .green {
          color: #00c853;
          font-weight: bold;
        }

        .footer {
          padding: 18px 24px;
          background: #2a2a2a;
        }

        .footer a {
          display: block;
          background: #ffeb00;
          color: #000;
          padding: 16px;
          text-align: center;
          font-weight: 900;
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .footer a:hover {
          background: #ffed33;
        }

  @media (max-width: 768px) 

  .sidecart {
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
  }

  .header {
    position: sticky;
    top: 0;
    height: 60px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1001;
  }

  .close-btn {
    width: 40px;
    height: 40px;
    font-size: 24px;
  }

  .body {
    padding-top: 16px; /* NO offset needed now */
  }
}


        @media (max-width: 480px) {
          .header {
            padding: 14px 16px;
            font-size: 14px;
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

          .qty button {
            width: 30px;
            height: 30px;
          }

          .qty span {
            min-width: 30px;
            font-size: 13px;
          }

          .priceBox {
            padding: 14px 12px;
          }

          .row {
            font-size: 13px;
          }

          .row:last-child {
            font-size: 15px;
          }
        }

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

                <div className="qty">
                  <button
                    onClick={() => decreaseQty(item.product._id, item.quantity)}
                    aria-label="Decrease quantity"
                  >
                    -
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
                    aria-label="Increase quantity"
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