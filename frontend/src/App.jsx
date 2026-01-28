import { useState } from "react";
import { Routes, Route, useLocation} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute.jsx";



import Loader from "./components/Loader.jsx";
import Navbar from "./components/Navbar.jsx";

import About from "./pages/About/About.jsx";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Checkout from "./pages/Checkout.jsx";
import Faq from "./pages/faq/Faq.jsx";
import OrderSuccess from "./pages/Ordersuccess.jsx";
import Trackpage from "./pages/Trackpage.jsx";
import ProductPage from "./pages/ProductSpec.jsx";
import Cart from "./pages/Cart.jsx";
import Payment from "./pages/Payment.jsx";
import Review from "./pages/review.jsx";
import Pay from "./pages/Pay.jsx";
import SuccessPopup from "./pages/SuccessPopup.jsx";
import HelpSupport from "./pages/HelpSupport.jsx";
import Nutrition from "./pages/blog/Nutrition.jsx"
import Blog from "./pages/blog/Blog.jsx"
import Profile from "./pages/profile/Profile.jsx";
import Prfle from "./pages/profile/Prfle.jsx";
import SeeMore from "./pages/SeeMore.jsx";
import NewProfile from "./pages/profile/Newprofile.jsx"
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import WishlistPage from "./pages/Wishlist.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";

/* Admin components */
import { AdminLayout } from "./components/AdminLayout.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { Orders } from "./components/Orders.jsx";
import { Products } from "./components/Products.jsx";
import { ProductUpdates } from "./components/ProductUpdates.jsx";
import { Inventory } from "./components/Inventory.jsx";
import { Categories } from "./components/Categories.jsx";
import { Customers } from "./components/Customers.jsx";
import { Reports } from "./components/Reports.jsx";
import { Coupons } from "./components/Coupons.jsx";
import { Inbox } from "./components/Inbox.jsx";
import { Analytics } from "./components/Analytics.jsx";
import { KnowledgeBase } from "./components/KnowledgeBase.jsx";
import CMS from "./components/CMS.jsx";
import { CMSEnhanced } from "./components/CMSEnhanced.jsx";
import { AdsBanner } from "./components/AdsBanner.jsx";
import { Settings } from "./components/Settings.jsx";
import { PersonalSettings } from "./components/PersonalSettings.jsx";

/* UI demo pages */
import { Menubar } from "./components/ui/Menubar.jsx";
import { NavigationMenu } from "./components/ui/Navigation-Menu.jsx";
import { Pagination } from "./components/ui/Pagination.jsx";
import { Popover } from "./components/ui/Popover.jsx";
import { Progress } from "./components/ui/Progress.jsx";
import { RadioGroup } from "./components/ui/Radio-Group.jsx";
import { ScrollArea } from "./components/ui/Scroll-Area.jsx";
import { Select } from "./components/ui/Select.jsx";
import { Separator } from "./components/ui/Separator.jsx";
import { Sheet } from "./components/ui/Sheet.jsx";
import { Sidebar } from "./components/ui/Sidebar.jsx";
import { Checkbox } from "./components/ui/Checkbox.jsx";
import { Collapsible } from "./components/ui/Collapsible.jsx";
import { Command } from "./components/ui/Command.jsx";
import { ContextMenu } from "./components/ui/Context-Menu.jsx";
import { Dialog } from "./components/ui/Dialog.jsx";
import { Drawer } from "./components/ui/Drawer.jsx";
import { Form } from "./components/ui/Form.jsx";
import { HoverCard } from "./components/ui/Hover-Card.jsx";
import { Input } from "./components/ui/Input.jsx";
import { Label } from "./components/ui/Label.jsx";
import { Badge } from "./components/ui/Badge.jsx";
import { Breadcrumb } from "./components/ui/BreadCrumb.jsx";
import { Button } from "./components/ui/Button.jsx";
import { Calendar } from "./components/ui/Calender.jsx";
import { Card } from "./components/ui/Card.jsx";
import { Carousel } from "./components/ui/Carousel.jsx";
import { Accordion } from "./components/ui/Accordion.jsx";
import { Alert } from "./components/ui/Alert.jsx";
import { AlertDialog } from "./components/ui/AlertDialog.jsx";
import { AspectRatio } from "./components/ui/AspectRatio.jsx";
import { Avatar } from "./components/ui/Avatar.jsx";
import { Tooltip } from "./components/ui/Tooltip.jsx";
import { Toggle } from "./components/ui/Toggle.jsx";
import { ToggleGroup } from "./components/ui/Toggle-Group.jsx";
import { Textarea } from "./components/ui/Textarea.jsx";
import { Tabs } from "./components/ui/Tabs.jsx";
import { Table } from "./components/ui/Table.jsx";
import { Switch } from "./components/ui/Switch.jsx";
import { Sonner } from "./components/ui/Sonner.jsx";
import { Slider } from "./components/ui/Slider.jsx";
import { Skeleton } from "./components/ui/Skeleton.jsx";


function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const isAdminRoute = [
    "/admindashboard",
    "/orders",
    "/products",
    "/productupdates",
    "/inventory",
    "/categories",
    "/customers",
    "/reports",
    "/coupons",
    "/inbox",
    "/analytics",
    "/knowledgebase",
    "/cms",
    "/cmsenhanced",
    "/adsbanner",
    "/settings",
    "/personalsettings",
  ].some((path) => location.pathname.startsWith(path));

  return (
    <>
      {/* NAVBAR IS ALWAYS MOUNTED */}
      {!isAdminRoute && <Navbar />}
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
          <Route path="/product" element={<Product />} />
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
          <Route path="/order-success" element={<OrderSuccess />} />
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
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/orders/:id" element={<OrderDetails />} />


            {/* ADMIN */}
          <Route element={<AdminLayout />}>
          
            <Route path="/admindashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productupdates" element={<ProductUpdates />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/knowledgebase" element={<KnowledgeBase />} />
            <Route path="/cms" element={<CMS />} />
            <Route path="/cmsenhanced" element={<CMSEnhanced />} />
            <Route path="/adsbanner" element={<AdsBanner />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/personalsettings" element={<PersonalSettings />} />
          </Route>

          {/* UI DEMOS */}
          <Route path="/menubar" element={<Menubar />} />
          <Route path="/navigation-menu" element={<NavigationMenu />} />
          <Route path="/paginattion" element={<Pagination />} />
          <Route path="/popover" element={<Popover />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/radio-group" element={<RadioGroup />} />
          <Route path="/scroll-area" element={<ScrollArea />} />
          <Route path="/select" element={<Select />} />
          <Route path="/separator" element={<Separator />} />
          <Route path="/sheet" element={<Sheet />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/checkbox" element={<Checkbox />} />
          <Route path="/collapsible" element={<Collapsible />} />
          <Route path="/command" element={<Command />} />
          <Route path="/context-menu" element={<ContextMenu />} />
          <Route path="/dialog" element={<Dialog />} />
          <Route path="/drawer" element={<Drawer />} />
          <Route path="/form" element={<Form />} />
          <Route path="/hover-card" element={<HoverCard />} />
          <Route path="/input" element={<Input />} />
          <Route path="/label" element={<Label />} />
          <Route path="/badge" element={<Badge />} />
          <Route path="/breadcrumb" element={<Breadcrumb />} />
          <Route path="/button" element={<Button />} />
          <Route path="/calender" element={<Calendar />} />
          <Route path="/card" element={<Card />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/accordion" element={<Accordion />} />
          <Route path="/alert" element={<Alert />} />
          <Route path="/alertdialog" element={<AlertDialog />} />
          <Route path="/aspectratio" element={<AspectRatio />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/tooltip" element={<Tooltip />} />
          <Route path="/toggle" element={<Toggle />} />
          <Route path="/toggle-group" element={<ToggleGroup />} />
          <Route path="/textarea" element={<Textarea />} />
          <Route path="/tabs" element={<Tabs />} />
          <Route path="/table" element={<Table />} />
          <Route path="/switch" element={<Switch />} />
          <Route path="/sonner" element={<Sonner />} />
          <Route path="/slider" element={<Slider />} />
          <Route path="/skeleton" element={<Skeleton />} />

        </Routes>


      </div>


    </>
  );
}

export default App;