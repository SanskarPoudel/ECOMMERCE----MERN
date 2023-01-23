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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
