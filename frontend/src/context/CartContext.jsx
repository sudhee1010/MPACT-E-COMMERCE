import { createContext, useContext, useState, useEffect } from "react";
import { getCartApi } from "../api/cartApi";
import { useAuth } from "../context/AuthContext";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [openSideCart, setOpenSideCart] = useState(false);
  const { user } = useAuth();


  // 🔥 Fetch cart from backend
//   const refreshCart = async () => {
//     try {
//       const res = await getCartApi();
//       setCartItems(res.data.items || []);
//     } catch (err) {
//       console.log("Refresh cart error", err);
//     }
//   };

// const refreshCart = async () => {
//   try {
//     const res = await getCartApi();
//     setCartItems(res.data.items || []);
//   } catch (err) {
//     // silently fail if not logged in
//     console.log("Refresh cart error", err?.response?.data?.message || err.message);
//   }
// };

const refreshCart = async () => {
  if (!user) return;   // 🔥 STOP UNAUTHORIZED CALL
  try {
    const res = await getCartApi();
    setCartItems(res.data.items || []);
  } catch (err) {
    if (err.response?.status !== 401) {
      console.log("Refresh cart error", err.message);
    }
  }
};




  // 🔥 Auto load cart when user logs in or page refreshes
// useEffect(() => {
//   if (user) {
//     refreshCart();
//   } else {
//     setCartItems([]); // clear cart on logout
//      setOpenSideCart(false);
//   }
// }, [user]);

useEffect(() => {
  if (!user) {
    setCartItems([]);
    setOpenSideCart(false);   // 🔥 FORCE CLOSE SIDECART ON LOGOUT
  } else {
    refreshCart();
  }
}, [user]);


useEffect(() => {
  console.log("USER:", user);
  console.log("CART:", cartItems);
}, [user, cartItems]);




  // Cart count
  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartCount,
        refreshCart,
        openSideCart,
        setOpenSideCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
