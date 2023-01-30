import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import WebFont from "webfontloader";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";
import LoginSignup from "./components/authentication/LoginSignup";
import Header1 from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "./slices/UserSlice";
import { authenticatedStatusUpdate, settingUser } from "./slices/AuthSlice";
import Products from "./components/product/Products";
import Support from "./more/Support";
import Cart from "./components/cart/Cart";
import { fetchGetCart } from "./slices/CartSlice";
import Checkout from "./components/checkout/Checkout";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/account/Profile";
import HeaderFooterWrapper from "./more/wrapper/HeaderFooterWrapper";
import AdminWrapper from "./more/wrapper/AdminWrapper";
import CreateProduct from "./components/admin/CreateProduct";
import ProductsAdmin from "./components/admin/ProductsAdmin";
import Users from "./components/admin/Users";

function App() {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);
  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    dispatch(fetchUserDetails());
  }, [isAuthenticated]);

  useEffect(() => {
    userDetails.name && dispatch(authenticatedStatusUpdate());
    userDetails.name && dispatch(settingUser(userDetails));

    dispatch(fetchGetCart());
  }, [userDetails]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HeaderFooterWrapper />}>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/header1" element={<Header1 />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/support" element={<Support />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route element={<ProtectedRoutes allowedRole="user" />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/me" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoutes allowedRole="admin" />}>
            <Route path="/admin" element={<AdminWrapper />}>
              <Route index element={<Dashboard />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/createproduct" element={<CreateProduct />} />
              <Route path="/admin/products" element={<ProductsAdmin />} />
              <Route path="/admin/users" element={<Users />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
