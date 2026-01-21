import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCartApi,
  updateCartItemApi,
  removeCartItemApi,
} from "../api/cartApi";
import { useCart } from "../context/CartContext";



export default function SideCart() {

  // const [cartItems, setCartItems] = useState([]);
  const {
    cartItems,
    setCartItems,
    refreshCart,
    openSideCart,
    setOpenSideCart
  } = useCart();


  const packingCharge = 20;

  // const increaseQty = async (productId, currentQty) => {
  //   try {
  //     const res = await updateCartItemApi(productId, currentQty + 1);
  //      console.log("UPDATE RESPONSE:", res.data); 

  //     // 🔥 DIRECTLY UPDATE STATE FROM RESPONSE
  //     setCartItems(res.data.items);

  //   } catch (err) {
  //     console.log("Increase qty error:", err);
  //   }
  // };

  const increaseQty = async (productId, currentQty, stock) => {
      if (currentQty >= stock) return; // 🔥 stop over stock

    try {
      // 🔥 Optimistically update UI first
      setCartItems(prev =>
        prev.map(item =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

      // Then update backend
      await updateCartItemApi(productId, currentQty + 1);
      refreshCart();

    } catch (err) {
      console.log("Increase qty error:", err);
      fetchCart(); // rollback if error
    }
  };


  // const decreaseQty = async (productId, currentQty) => {
  //   try {
  //     const res = await updateCartItemApi(productId, currentQty - 1);
  //      console.log("UPDATE RESPONSE:", res.data); 

  //     // 🔥 DIRECTLY UPDATE STATE FROM RESPONSE
  //     setCartItems(res.data.items);

  //   } catch (err) {
  //     console.log("Decrease qty error:", err);
  //   }
  // };

  const decreaseQty = async (productId, currentQty) => {
    try {
      if (currentQty <= 1) {
        const res = await removeCartItemApi(productId);
        setCartItems(res.data.items);
        return;
      }

      // 🔥 Optimistically update UI
      setCartItems(prev =>
        prev.map(item =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );

      await updateCartItemApi(productId, currentQty - 1);
      refreshCart();

    } catch (err) {
      console.log("Decrease qty error:", err);
      fetchCart(); // rollback
    }
  };





  const removeItem = async (productId) => {
    try {
      const res = await removeCartItemApi(productId);

      // 🔥 UPDATE STATE DIRECTLY
      setCartItems(res.data.items);

    } catch (err) {
      console.log("Remove item error:", err);
    }
  };


  // Total MRP
  const totalMRP = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );

  // Total Selling Price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Discount
  const discount = totalMRP - totalPrice;

  // Final Amount
  const finalAmount = totalPrice + packingCharge;


  // useEffect(() => {
  //   if (open) {
  //     fetchCart();
  //   }
  // }, [open]);

  useEffect(() => {
    if (openSideCart) {
      refreshCart();
    }
  }, [openSideCart]);


  useEffect(() => {
  if (!cartItems.length) {
    setOpenSideCart(false);
  }
}, [cartItems]);



  const fetchCart = async () => {
    try {
      const res = await getCartApi();
      setCartItems(res.data.items || []);
    } catch (error) {
      console.log("Fetch side cart error:", error);
    }
  };


  return (
    <>
      <style>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.6);
          z-index: 999;
          display: ${openSideCart ? "block" : "none"};
        }

        .sidecart {
          position: fixed;
          top: 0;
          right: 0;
          width: 520px;
          height: 100vh;
          background: #2a2a2a;
          transform: translateX(${openSideCart ? "0" : "100%"});
          transition: .35s;
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }

        .header {
          background: #ffeb00;
          color: #000;
          padding: 18px 22px;
          display: flex;
          justify-content: space-between;
          font-weight: 900;
        }

        .body {
          padding: 24px;
          flex: 1;
          overflow-y: auto;
        }

        .item {
          border: 2px solid #ffeb00;
          border-radius: 12px;
          padding: 18px;
          display: flex;
          gap: 16px;
          position: relative;
        }

        .item img {
          width: 90px;
          height: 120px;
          object-fit: cover;
          border-radius: 10px;
        }

        .spec {
          border: 1px solid #ffeb00;
          padding: 3px 7px;
          font-size: 10px;
          border-radius: 4px;
          color: #ffeb00;
          margin-right: 5px;
        }

        .qty {
          display: flex;
          border: 1px solid #ffeb00;
          width: fit-content;
          margin-top: 10px;
        }

        .qty button {
          width: 30px;
          background: none;
          color: #fff;
          border: none;
          cursor: pointer;
        }

        .remove {
          position: absolute;
          right: 16px;
          bottom: 16px;
          color: red;
          cursor: pointer;
        }

        .priceBox {
          border-top: 2px solid #ffeb00;
          padding: 20px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .green {
          color: #00c853;
          font-weight: bold;
        }

        .footer {
          padding: 18px;
        }

        .footer a {
          display: block;
          background: #ffeb00;
          color: #000;
          padding: 16px;
          text-align: center;
          font-weight: 900;
          text-decoration: none;
        }
      `}</style>

      <div className="overlay" onClick={() => setOpenSideCart(false)} />

      <div className="sidecart">
        <div className="header">
          <span>🛒 MY CART ({cartItems.length})</span>
          <span style={{ cursor: "pointer" }} onClick={() => setOpenSideCart(false)}>✕</span>
        </div>

        <div className="body">
          {cartItems.length === 0 && <p>Your cart is empty</p>}

          {cartItems.map(item => (
            <div className="item" key={item.product._id}>
              {/* <img src={item.product.images[0].url || "/placeholder.png"} alt="" /> */}
                 <img
                        src={item.product.images?.[0]?.url || "/images/Product1.png"}
                        alt={item.product.name}
                      />

              <div>
                <h4>{item.product.name}</h4>

                {/* <div>
                  {item.highlights?.map((s, i) => (
                    <span className="spec" key={i}>{s}</span>
                  ))}
                </div> */}

                <p>
                  {/* ₹{item.price} <del>₹{item.orginalPrice}</del> */}
                  ₹{item.price} <del>₹{item.originalPrice}</del>
                </p>

                <div className="qty">
                  <button onClick={() => decreaseQty(item.product._id, item.quantity)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.product._id, item.quantity , item.product.countInStock)}>+</button>
                </div>
              </div>

              <span className="remove" onClick={() => removeItem(item.product._id)}>
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
                <span>Packing</span>
                <span>₹{packingCharge}</span>
              </div>

              <div className="row green">
                <span>Total</span>
                <span>₹{finalAmount}</span>
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
