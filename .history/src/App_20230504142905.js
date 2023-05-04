/** @format */

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./E-CommerceAdmin/forms/Login";
import Dashboard from "./E-CommerceAdmin/pages/Dashboard";
import ECategory from "./E-CommerceAdmin/pages/ECategory";
import EProduct from "./E-CommerceAdmin/pages/EProduct";
import EAdminOrders from "./E-CommerceAdmin/pages/EAdminOrders";
import EAdminDelivery from "./E-CommerceAdmin/pages/EAdminDelivery";
import EAdminCustomer from "./E-CommerceAdmin/pages/EAdminCustomer";
import EAdmin from "./E-CommerceAdmin/pages/EAdmin";
import ESubCategory from "./E-CommerceAdmin/pages/ESubCategory";
import PushNotification from "./E-CommerceAdmin/pages/PushNotification";
import Transaction from "./E-CommerceAdmin/pages/Transaction";
import Banner from "./E-CommerceAdmin/pages/Banner";
import About from "./E-CommerceAdmin/pages/About";
import WholesOffer from "./E-CommerceAdmin/pages/WholesOffer";
import GiftBox from "./E-CommerceAdmin/pages/GiftBox";
import Subscription from "./E-CommerceAdmin/pages/Subscription";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Customer" element={<EAdminCustomer />} />
        <Route path="/Product" element={<EProduct />} />
        <Route path="/Brands" element={<EAdmin />} />
        <Route path="/Category" element={<ECategory />} />
        <Route path="/Coupon" element={<EAdminDelivery />} />
        <Route path="/Orders" element={<EAdminOrders />} />
        <Route path="/Transation" element={<Transaction />} />
        <Route path="/Banner" element={<Banner />} />
        <Route path="/About" element={<About />} />
        <Route path="/Notification" element={<PushNotification />} />
        <Route path="/Faqs" element={<ESubCategory />} />
        <Route path="/wholeSale" element={<WholesOffer />} />
        <Route path="/gift" element={<GiftBox />} />
        <Route path="/subs" element={<Subscription />} />
      </Routes>
    </>
  );
}

export default App;
