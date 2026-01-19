
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";



import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

import About from "./pages/About/About";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Faq from "./pages/faq/Faq";
import OrderSuccess from "./pages/Ordersuccess";
import Trackpage from "./pages/Trackpage";
import ProductPage from "./pages/ProductSpec";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Review from "./pages/review";
import Pay from "./pages/Pay";
import SuccessPopup from "./pages/SuccessPopup.jsx";
import HelpSupport from "./pages/HelpSupport";
import Nutrition from "./pages/blog/Nutrition.jsx"
import Blog from "./pages/blog/Blog.jsx"
import Profile from "./pages/profile/Profile";
import Prfle from "./pages/profile/Prfle";
import SeeMore from "./pages/SeeMore";
import NewProfile from "./pages/profile/Newprofile.jsx"
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import VerifyEmail from "./pages/VerifyEmail";
import WishlistPage from "./pages/Wishlist.jsx";

function App() {
  const [loading, setLoading] = useState(true);


  return (
    <>
      {/* NAVBAR IS ALWAYS MOUNTED */}
      <Navbar />

      <ScrollToTop />

      {/* LOADER OVERLAY */}
      {loading && <Loader onFinish={() => setLoading(false)} />}


      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#262626",
            color: "#facc15",
            border: "1px solid #facc15",
          },
        }}
      />

      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/seeMore" element={<SeeMore />} />
          <Route path="/productspec/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* <Route path="/profile" element={<NewProfile />} /> */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <NewProfile />
              </PrivateRoute>
            }
          />

          <Route path="/help" element={<HelpSupport />} />


          <Route path="/payment" element={<Payment />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/trackorder" element={<Trackpage />} />
          <Route path="/review" element={<Review />} />
          <Route path="/popup" element={<SuccessPopup />} />




          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/Nutrition" element={<Nutrition />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/wishlist" element={<WishlistPage/>} />




        </Routes>
      </div>


    </>
  );
}

export default App;
