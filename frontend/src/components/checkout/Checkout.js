import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { clearCart, fetchRemoveFromCart } from "../../slices/CartSlice";
import { clearOrderMessage, fetchCreateOrder } from "../../slices/OrderSlice";
import "./Checkout.css";
const Checkout = () => {
  const { loadingCart, messageCart, cartItems, errorCart } = useSelector(
    (state) => state.cart
  );

  const { loading, message, error } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const phoneNoRef = useRef();

  let itemsPrice = 0;
  cartItems.forEach((item) => {
    item.product && (itemsPrice += item.product.price * item.quantity);
  });

  const orderItems = cartItems.map((item) => {
    return {
      name: item.product && item.product.name,
      price: item.product && item.product.price,
      quantity: item.product && item.quantity,
      product: item.product && item.product._id,
    };
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const shippingInfo = {
      address: addressRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      country: countryRef.current.value,
      phoneNo: phoneNoRef.current.value,
    };

    const orderDetails = {
      shippingInfo: shippingInfo,
      orderItems: orderItems.length >= 1 ? orderItems : "",
      paymentInfo: "Cash on Delivery",
      itemsPrice: itemsPrice,
      shippingPrice: 100,
    };

    dispatch(fetchCreateOrder(orderDetails));

    toast.success("Order Placed Successfully");
  };

  return (
    <div>
      <div className="container">
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
        <div className="py-5 text-center">
          <h2>Checkout Form</h2>
        </div>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">
                {cartItems.length}
              </span>
            </h4>
            <ul className="list-group mb-3 sticky-top">
              {cartItems.map((cartItem) => {
                return (
                  cartItem.product && (
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 className="my-0">{cartItem.product.name}</h6>
                        <small className="text-muted">
                          {cartItem.product.category}
                        </small>
                      </div>
                      <span className="text-muted">
                        ${cartItem.product.price}
                      </span>
                    </li>
                  )
                );
              })}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${itemsPrice}</strong>
              </li>
            </ul>
            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Shipping Information</h4>
            <form className="needs-validation" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    ref={addressRef}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">
                    Address 2 <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="address">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  ref={cityRef}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address2">State</label>
                <input
                  type="text"
                  className="form-control"
                  ref={stateRef}
                  id="state"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address2">Country</label>
                <input
                  type="text"
                  className="form-control"
                  ref={countryRef}
                  id="country"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address2">Phone Number</label>
                <input
                  type="Number"
                  ref={phoneNoRef}
                  className="form-control"
                  id="phoneNo"
                />
              </div>
              <hr className="mb-4" />

              <hr className="mb-4" />
              <h4 className="mb-3">Payment</h4>
              <div className="d-block my-3">
                <h1>Cash on Delivery</h1>
              </div>
              <hr className="mb-4" />
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
              >
                Place an Order
              </button>
            </form>
          </div>
        </div>
        <footer className="my-5 pt-5 text-muted text-center text-small">
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#">Privacy</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Support</a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Checkout;
