import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetCart, fetchRemoveFromCart } from "../../slices/CartSlice";
import "./Cart.css";
import { BsFillTrashFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { loadingCart, messageCart, cartItems, errorCart } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchGetCart());
  }, [dispatch, cartItems]);

  const handleRemove = useCallback(
    (id) => {
      dispatch(fetchRemoveFromCart(id));
      toast.success("Product removed");
      dispatch(fetchGetCart());
    },
    [dispatch]
  );

  return (
    <>
      <>
        <div className="px-4 px-lg-0 mt-4 ">
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
          <div className="pb-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 p-5 bg-white rounded shadow mb-5">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="border-0 bg-light">
                            <div className="p-2 px-3 text-uppercase">
                              Product
                            </div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Price</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Quantity</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Remove</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.length === 0 && (
                          <div
                            className="alert alert-warning mt-2"
                            role="alert"
                          >
                            There are no Products in your cart !
                          </div>
                        )}
                        {cartItems.map((cartItem) => {
                          return (
                            <tr>
                              <th scope="row" className="border-0">
                                <Link to={`/product/${cartItem.product._id}`}>
                                  <div className="p-2">
                                    <img
                                      src={`http://localhost:8000/Images/${cartItem.product.image.data}`}
                                      alt=""
                                      width={70}
                                      className="img-fluid rounded shadow-sm"
                                    />
                                    <div className="mx-3 d-inline-block align-middle">
                                      <h5 className="mb-0">
                                        {" "}
                                        <a
                                          href="0"
                                          className="text-dark d-inline-block align-middle"
                                        >
                                          {cartItem.product.name}
                                        </a>
                                      </h5>
                                      <span className="text-muted font-weight-normal font-italic d-block">
                                        Category: {cartItem.product.category}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </th>
                              <td className="border-0 align-middle">
                                <strong>${cartItem.product.price}</strong>
                              </td>
                              <td className="border-0 align-middle">
                                <strong>{cartItem.quantity}</strong>
                              </td>
                              <td className="border-0 align-middle">
                                <div
                                  className="text-dark removeCart"
                                  onClick={() =>
                                    handleRemove(cartItem.product._id)
                                  }
                                >
                                  <BsFillTrashFill />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      {cartItems.length >= 1 && (
                        <Link
                          to="/checkout"
                          className="btn btn-dark rounded-pill py-2 btn-block mt-4 "
                        >
                          Procceed to checkout
                        </Link>
                      )}
                    </table>
                  </div>
                  {/* End */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Cart;
