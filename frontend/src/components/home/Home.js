import React from "react";
import "./Home.css";
import { toast, ToastContainer } from "react-toastify";
import bg from "../../assets/background.jpg";
import bg2 from "../../assets/background2.jpg";
import Carousel from "react-material-ui-carousel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../slices/ProductSlice";
import ProductCard from "../product/ProductCard";

const Home = () => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = product.products;

  return (
    <div>
      {/* <Header /> */}
      {/* Carousel */}

      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={bg} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={bg2} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="home__content ">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "Segoe Script",
              fontSize: "3em",
              fontWeight: "500",
            }}
          >
            Buy 2 Get
          </h2>
          <span
            style={{
              padding: "10px",
              backgroundColor: "#fff",
              margin: "0px 10px",
              textAlign: "center",
              width: "150px",
              height: "40px",
              color: "#26c",
              fontFamily: "Segoe Script",
              fontSize: "2.4em",
              display: "flex",
              justifyContent: "center",
              lineHeight: ".7",
              alignItems: "center",
            }}
          >
            1 Free
          </span>
        </div>
        <div>
          <h2
            style={{
              fontSize: "4.5em",
              fontFamily: "Poppins,sans-serif",
              color: "#fff",
            }}
          >
            Fashionable
          </h2>
        </div>
        <div>
          <h2
            style={{
              fontSize: "4.5em",
              fontWeight: "400",
              fontFamily: "Poppins,sans-serif",
              color: "#fff",
              lineHeight: ".7",
            }}
          >
            Collection
          </h2>
        </div>
        <div>
          <h2
            style={{
              fontWeight: "400",
              fontFamily: "Poppins,sans-serif",
              color: "#fff",
              fontSize: "1em",
              paddingTop: "10px",
            }}
          >
            Get Free Shipping on all orders over $99.00
          </h2>
        </div>
        <div>
          <a href="#containerHome">
            <button
              type="submit"
              style={{
                width: "135px",
                height: "50px",
                border: "none",
                background: "#3BB77E",
                margin: "10px 0",
                fontSize: "1.2vmax",
                color: "#fff",
                cursor: "pointer",
              }}
              className="Home__button p-2"
            >
              SHOP NOW
            </button>
          </a>
        </div>
      </div>

      <h2 className="homeHeading">Featured Products</h2>
      <div className="containerHome" id="containerHome">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Home;
