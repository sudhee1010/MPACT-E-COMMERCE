// import { createContext, useContext, useState, useEffect } from "react";
// import { getCartApi } from "../api/cartApi";
// import { useAuth } from "../context/AuthContext";


// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [openSideCart, setOpenSideCart] = useState(false);
//   const [cartMeta, setCartMeta] = useState({
//     totalPrice: 0,
//     taxAmount: 0,
//     totalWithTax: 0
//   });
//   const { user } = useAuth();


//   // 🔥 Fetch cart from backend

//   const refreshCart = async () => {
//     if (!user) return;
//     try {
//       const res = await getCartApi();
//       // setCartItems(res.data.items || []);
//       const safeItems = (res.data.items || []).filter(
//         (item) => item && item.product
//       );

//       setCartItems(safeItems);
//       setCartMeta({
//         totalPrice: res.data.totalPrice || 0,
//         taxAmount: res.data.taxAmount || 0,
//         totalWithTax: res.data.totalWithTax || 0
//       });
//     } catch (err) {
//       if (err.response?.status !== 401) {
//         console.log("Refresh cart error", err.message);
//       }
//     }
//   };




//   // 🔥 Auto load cart when user logs in or page refreshes

//   useEffect(() => {
//     if (!user) {
//       setCartItems([]);
//       setOpenSideCart(false);   // 🔥 FORCE CLOSE SIDECART ON LOGOUT
//     } else {
//       refreshCart();
//     }
//   }, [user]);


//   useEffect(() => {
//     // console.log("USER:", user);
//     // console.log("CART:", cartItems);
//   }, [user, cartItems]);




//   // Cart count
//   const cartCount = cartItems.reduce(
//     (sum, item) => sum + item.quantity,
//     0
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         setCartItems,
//         cartCount,
//         refreshCart,
//         openSideCart,
//         setOpenSideCart,
//         cartMeta
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


import { createContext, useContext, useState, useEffect } from "react";
import { getCartApi, addToCartApi, clearCartCouponApi } from "../api/cartApi";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [openSideCart, setOpenSideCart] = useState(false);

  const [cartMeta, setCartMeta] = useState({
    totalPrice: 0,
    taxAmount: 0,
    totalWithTax: 0,
    appliedCoupon: null
  });

  const clearCouponInCart = async () => {
    try {
      await clearCartCouponApi();
    } catch (error) {
      console.log("Clear coupon error", error);
    } finally {
      setCartMeta((prev) => ({
        ...prev,
        appliedCoupon: null
      }));
    }
  };


  /* =====================================================
     LOAD CART (GUEST OR LOGGED USER)
  ===================================================== */

  const refreshCart = async () => {

    try {

      /* -----------------------------
         GUEST USER CART
      ------------------------------*/

      if (!user) {

        const guestCart =
          JSON.parse(localStorage.getItem("guestCart")) || [];

        if (guestCart.length === 0) {
          setCartItems([]);
          return;
        }

        try {

          const itemsWithProduct = await Promise.all(

            guestCart.map(async (item) => {

              const res = await api.get(`/api/products/${item.productId}`);

              return {
                product: res.data,
                quantity: item.quantity
              };

            })

          );

          setCartItems(itemsWithProduct);

        } catch (error) {

          console.log("Guest cart load error", error);

        }

        return;
      }

      /* -----------------------------
         LOGGED USER CART
      ------------------------------*/

      const res = await getCartApi();

      const safeItems = (res.data.items || []).filter(
        (item) => item && item.product
      );

      setCartItems(safeItems);

      setCartMeta({
        totalPrice: res.data.totalPrice || 0,
        taxAmount: res.data.taxAmount || 0,
        totalWithTax: res.data.totalWithTax || 0,
        appliedCoupon: res.data.appliedCoupon || null
      });

    } catch (err) {

      if (err.response?.status !== 401) {
        console.log("Refresh cart error", err.message);
      }

    }

  };

  /* =====================================================
     MERGE GUEST CART AFTER LOGIN
  ===================================================== */

  const mergeGuestCart = async () => {

    if (!user) return;

    const guestCart =
      JSON.parse(localStorage.getItem("guestCart")) || [];

    if (guestCart.length === 0) return;

    try {

      for (const item of guestCart) {

        await addToCartApi(
          item.productId,
          item.quantity
        );

      }

      localStorage.removeItem("guestCart");

      refreshCart();

    } catch (error) {

      console.log("Guest cart merge error", error);

    }

  };

  /* =====================================================
     LOAD CART WHEN USER CHANGES
  ===================================================== */

  useEffect(() => {

    refreshCart();

    if (!user) {
      setOpenSideCart(false);
    }

  }, [user]);

  /* =====================================================
     MERGE CART AFTER LOGIN
  ===================================================== */

  useEffect(() => {

    if (user) {

      mergeGuestCart();

    }

  }, [user]);

  /* =====================================================
     FAST OPTIMISTIC ADD TO CART
  ===================================================== */
  const addToCart = async (product, quantity = 1) => {
    // 1. Open side cart drawer instantly (0ms latency)
    setOpenSideCart(true);

    const productId = typeof product === "object" ? product._id : product;
    const prodObj = typeof product === "object" ? product : { _id: productId };

    // 2. GUEST USER CART
    if (!user) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const existingIndex = guestCart.findIndex((i) => i.productId === productId);
      let updated;
      if (existingIndex > -1) {
        updated = guestCart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [
          ...guestCart,
          {
            productId,
            product: prodObj,
            price: prodObj.price || 0,
            originalPrice: prodObj.originalPrice || prodObj.price || 0,
            quantity
          }
        ];
      }
      localStorage.setItem("guestCart", JSON.stringify(updated));
      window.dispatchEvent(new Event("guestCartUpdated"));
      setCartItems(
        updated.map((i) => ({
          product: i.product || { _id: i.productId },
          price: i.price || 0,
          quantity: i.quantity
        }))
      );
      return;
    }

    // 3. LOGGED-IN USER: Optimistically update cartItems in state immediately
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => (i.product?._id || i.product) === productId
      );
      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          { product: prodObj, price: prodObj.price || 0, quantity }
        ];
      }
    });

    // 4. Background Sync: use response directly to avoid double-fetch flicker
    try {
      const res = await addToCartApi(productId, quantity);
      if (res.data && res.data.items) {
        const safeItems = res.data.items.filter((item) => item && item.product);
        setCartItems(safeItems);
        setCartMeta({
          totalPrice: res.data.totalPrice || 0,
          taxAmount: res.data.taxAmount || 0,
          totalWithTax: res.data.totalWithTax || 0,
          appliedCoupon: res.data.appliedCoupon || null
        });
      }
    } catch (error) {
      console.warn("Background cart sync failed, preserving local item state:", error);
      try {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const existingIndex = guestCart.findIndex((i) => i.productId === productId);
        let updated;
        if (existingIndex > -1) {
          updated = guestCart.map((item, idx) =>
            idx === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          updated = [
            ...guestCart,
            {
              productId,
              product: prodObj,
              price: prodObj.price || 0,
              quantity
            }
          ];
        }
      } catch (e) {}
    }
  };

  /* =====================================================
     CART COUNT
  ===================================================== */

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  return (

    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartCount,
        refreshCart,
        addToCart,
        openSideCart,
        setOpenSideCart,
        cartMeta,
        setCartMeta,
        clearCouponInCart
      }}
    >

      {children}

    </CartContext.Provider>

  );

};

export const useCart = () => useContext(CartContext);