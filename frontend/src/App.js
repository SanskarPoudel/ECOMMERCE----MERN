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
import { authenticatedStatusUpdate } from "./slices/AuthSlice";
import Products from "./components/product/Products";
import Support from "./more/Support";
import Cart from "./components/cart/Cart";
import { fetchGetCart } from "./slices/CartSlice";
import Checkout from "./components/checkout/Checkout";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";

function App() {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    dispatch(fetchUserDetails());
  }, []);

  useEffect(() => {
    userDetails.name && dispatch(authenticatedStatusUpdate());
    dispatch(fetchGetCart());
  }, [userDetails]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/header1" element={<Header1 />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/support" element={<Support />} />
          <Route element={<ProtectedRoutes allowedRole="user" />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
