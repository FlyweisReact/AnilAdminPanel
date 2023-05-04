/** @format */

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./E-CommerceAdmin/forms/Login";
import Dashboard from "./E-CommerceAdmin/pages/Dashboard";
import ECategory from "./E-CommerceAdmin/pages/ECategory";
import EProduct from "./E-CommerceAdmin/pages/EProduct";
import EVendorLogin from "./E-CommerceVendor/forms/EVendorLogin";
import EVDashboard from "./E-CommerceVendor/pages/EVDashboard";
import EVCategory from "./E-CommerceVendor/pages/EVCategory";
import EVProduct from "./E-CommerceVendor/pages/EVProduct";
import EVendorList from "./E-CommerceAdmin/pages/EVendorList";
import EAdminOrders from "./E-CommerceAdmin/pages/EAdminOrders";
import EAdminProduct from "./E-CommerceAdmin/pages/EAdminProduct";
import EAdminDelivery from "./E-CommerceAdmin/pages/EAdminDelivery";
import EAdminCustomer from "./E-CommerceAdmin/pages/EAdminCustomer";
import EAdmin from "./E-CommerceAdmin/pages/EAdmin";
import ESubCategory from "./E-CommerceAdmin/pages/ESubCategory";
import ESingleProduct from "./E-CommerceAdmin/pages/ESingleProduct";
import EVSubCategory from "./E-CommerceVendor/pages/EVSubCategory";
import EVOrders from "./E-CommerceVendor/pages/EVOrders";
import PushNotification from './E-CommerceAdmin/pages/PushNotification'

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/notification" element={<PushNotification />} />
          <Route path="/E-Commerce/Admin/Customer" element={<EAdminCustomer />} />

        <Route path="/E-Commerce/dashboard" element={<Dashboard />} />
        <Route path="/E-Commerce/Category" element={<ECategory />} />
        <Route path="/E-Commerce/Product" element={<EProduct />} />
        <Route path="/E-Commerce/VendorList" element={<EVendorList />} />
        <Route path="/E-commerce/Admin/Orders" element={<EAdminOrders />} />
        <Route
          path="/E-Commerce/Admin/Product/:id"
          element={<EAdminProduct />}
        />
        <Route path="/E-Commerce/Admin/Delivery" element={<EAdminDelivery />} />
        <Route path="/E-Commerce/Admin" element={<EAdmin />} />
        <Route path="/E-Commerce/Admin/subCat" element={<ESubCategory />} />
        <Route
          path="/E-Commerce/Admin/Sproduct/:id"
          element={<ESingleProduct />}
        />
        <Route path="/E-Commerce/vendor/login" element={<EVendorLogin />} />
        <Route path="/E-Commerce/vendor/dashboard" element={<EVDashboard />} />
        <Route path="/E-Commerce/vendor/category" element={<EVCategory />} />
        <Route path="/E-Commerce/vendor/product" element={<EVProduct />} />
        <Route
          path="/E-Commerce/vendor/subCategory"
          element={<EVSubCategory />}
        />
        <Route path="/E-Commerce/vendor/order" element={<EVOrders />} />
      </Routes>
    </>
  );
}

export default App;
