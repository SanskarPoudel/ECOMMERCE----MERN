import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Carousel from "react-material-ui-carousel";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../../slices/ProductDetailSlice";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { AiFillHeart } from "react-icons/ai";
import {
  clearError,
  clearMessage,
  fetchAddCart,
  fetchGetCart,
} from "../../slices/CartSlice";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { loading, productDetail, error } = useSelector(
    (state) => state.productDetail
  );

  const { messageCart, errorCart } = useSelector((state) => state.cart);

  const { isAuthenticated, user } = useSelector((state) => state.userAuth);

  const navigate = useNavigate();

  const product = productDetail;

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, []);

  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((prevQuantity) => {
      return prevQuantity - 1;
    });
  };

  const increaseQuantity = () => {
    console.log(product.stock);
    if (product.stock <= quantity) {
      return alert("Product stock is limited");
    } else {
      setQuantity((prevQuantity) => {
        return prevQuantity + 1;
      });
    }
  };

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const cartDetails = {
    productId: id,
    quantity: quantity,
  };
  const handleCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(fetchAddCart(cartDetails));
    }
  };

  useEffect(() => {
    if (errorCart) {
      toast.error(errorCart);
      dispatch(clearError());
    } else if (messageCart === "Product added to cart") {
      toast.success(messageCart);
      dispatch(clearMessage());
    }
  }, [dispatch, errorCart, messageCart]);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="container">
        <div className="card">
          <div className="container-fliud">
            <div className="wrapper row">
              <div className="preview col-md-6">
                <div className="preview-pic tab-content">
                  <Carousel>
                    {product.image && (
                      <img
                        className="CarouselImage"
                        src={`http://localhost:8000/Images/${product.image.data}`}
                        alt={`Slide`}
                      />
                    )}
                  </Carousel>
                </div>
              </div>
              <div className="details col-md-6">
                <h3 className="product-title">{product.name}</h3>
                <div className="rating">
                  <Rating {...options} />
                  <span className="review-no">
                    ( {product.numOfReviews} Reviews )
                  </span>
                </div>

                <h4 className="price">
                  current price: <span>${product.price}</span>
                </h4>
                <p className="font-weight-bold mb-0 qty">Quantity</p>
                <div
                  className="btn-group w-25 mb-3"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <button type="button" className="btn">
                    {quantity}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
                {product.stock > 1 ? (
                  <p className="stock text-primary">InStock</p>
                ) : (
                  <p className="stock text-warning">Out of Stock</p>
                )}

                <p className="product-description">{product.description}</p>

                <div className="action  ">
                  <button
                    className="add-to-cart btn btn-default "
                    type="button"
                    onClick={handleCart}
                  >
                    add to cart
                  </button>
                  <button
                    className="like btn btn-default mx-2 p-2"
                    type="button"
                  >
                    <AiFillHeart size={47} />
                  </button>
                </div>
              </div>
            </div>
            <div className="reviews__heading text-align-center mt-5 ">
              <h1
                className="pb-3"
                style={{
                  textAlign: "center",
                  opacity: 1,
                  borderBottom: "1px solid #999",
                  fontFamily: "Poppins,sans-serif",
                }}
              >
                Reviews
              </h1>
            </div>
            <div>
              {/* Reviews */}
              <div
                style={{
                  padding: "1vmax",
                }}
              >
                {product.reviews && product.reviews[0] ? (
                  <div className="review__option">
                    {/* {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)} */}
                  </div>
                ) : (
                  <p
                    className="noReviews "
                    style={{
                      fontFamily: "Poppins,sans-serif",
                      textAlign: "center",
                    }}
                  >
                    No Reviews Yet *
                  </p>
                )}
                <div
                  style={{
                    padding: "0px 2vmax",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.8vmax",
                      fontWeight: "700",
                      lineHeight: 1,
                      letterSpacing: "-.0125em",
                      color: "#222",
                      fontFamily: "Poppins,sans-serif",
                    }}
                  >
                    Add a Review
                  </span>
                  <div
                    style={{
                      margin: "1vmax 0",
                      flexDirection: "column",
                      display: "flex",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: "#222",
                          fontFamily: "Poppins,sans-serif",
                          padding: "1vmax 0",
                        }}
                      >
                        Your Rating*
                      </span>
                      <Rating
                        //   onChange={(e) => setRating(e.target.value)}
                        //   value={rating}
                        size="large"
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      ></div>
                    </div>
                  </div>
                  <textarea
                    cols="30"
                    rows="6"
                    placeholder="Comment *"
                    //   value={comment}
                    //   onChange={(e) => setComment(e.target.value)}
                    style={{
                      maxWidth: "100%",
                      color: "#111",
                      borderColor: "#e1e1e1",
                      background: "#fff",
                      borderRadius: "0.3rem",
                      outline: "none",
                      padding: "5px",
                      fontSize: "1.2vmax",
                      lineHeight: "1.5",
                      resize: "none",
                      display: "block",
                    }}
                  ></textarea>
                  <button
                    type="submit"
                    style={{
                      width: "12vmax",
                      margin: "1vmax 0px",
                      fontFamily: "sans-serif",
                      padding: "10px 15px",
                      background: "#3BB77E",
                      border: "none",
                      cursor: "pointer",
                      color: "#fff",
                    }}
                    //   onClick={reviewSubmitHandler}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
