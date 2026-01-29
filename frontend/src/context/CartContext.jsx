import { createContext, useContext, useState, useEffect } from "react";
import { getCartApi } from "../api/cartApi";
import { useAuth } from "../context/AuthContext";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [openSideCart, setOpenSideCart] = useState(false);
  const [cartMeta, setCartMeta] = useState({
  totalPrice: 0,
  taxAmount: 0,
  totalWithTax: 0
});
  const { user } = useAuth();


  // 🔥 Fetch cart from backend

const refreshCart = async () => {
  if (!user) return;
  try {
    const res = await getCartApi();
    setCartItems(res.data.items || []);
    setCartMeta({
      totalPrice: res.data.totalPrice || 0,
      taxAmount: res.data.taxAmount || 0,
      totalWithTax: res.data.totalWithTax || 0
    });
  } catch (err) {
    if (err.response?.status !== 401) {
      console.log("Refresh cart error", err.message);
    }
  }
};




  // 🔥 Auto load cart when user logs in or page refreshes

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
        setOpenSideCart,
        cartMeta
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
