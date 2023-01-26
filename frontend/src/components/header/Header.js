import React, { useRef } from "react";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillGooglePlusSquare,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogOut } from "../../slices/AuthSlice";
import "./Header.css";
import logo from "../../assets/logo.png";

const Header = () => {
  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state.userAuth
  );

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(fetchLogOut());
  };

  const searchRef = useRef();

  const navigate = useNavigate();

  const handleSearch = () => {
    const searchval = searchRef.current.value;
    console.log(searchval);
    navigate(`/products/${searchval}`);
  };

  return (
    <div>
      <header>
        <section className="headertop">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="top-left">
                  <Link to="/">Click & Collect</Link>
                </div>
              </div>

              <div className="col-lg-6 top-right">
                {isAuthenticated ? (
                  <div className="top-right-text">
                    Welcome to Our Shop.. Happy Shopping{" "}
                  </div>
                ) : (
                  <>
                    <Link to="/login">Login/Register</Link>
                    <div className="socialIcon">
                      <Link to="0">
                        <AiFillFacebook color="#d1c647" />
                      </Link>{" "}
                      <Link to="0">
                        <AiFillTwitterSquare color="#d1c647" />
                      </Link>
                      <Link to="0">
                        <AiFillGooglePlusSquare color="#d1c647" />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        <nav className="navbar navbar-expand-lg headerNav">
          <div className="container">
            <Link className="navbar-brand logo" to="/">
              <img
                src={logo}
                style={{
                  width: "150px",
                }}
                alt="logo"
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="0">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="0">
                    Offers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="0">
                    Sell
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="0">
                    Contact
                  </Link>
                </li>
                {/* <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="0"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="0">
                        Action
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="0">
                        Another action
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="0">
                        Something else here
                      </Link>
                    </li>
                  </ul>
                </li> */}
                {/* <li className="nav-item">
                  <Link to="0" className="nav-link disabled">
                    Disabled
                  </Link>
                </li> */}
              </ul>
              <form className="d-flex" role="search" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  ref={searchRef}
                />
                <button className="btn btn-success" type="submit">
                  Search
                </button>
              </form>
              <div className="rightSide">
                <Link to="/cart">
                  <AiOutlineShoppingCart />
                  {isAuthenticated && (
                    <span className="badge p-1">{cartItems.length}</span>
                  )}
                </Link>
                <Link to="0">
                  <AiOutlineHeart />
                </Link>
                <Link to="/me">
                  <AiOutlineUser />
                </Link>
                {isAuthenticated && (
                  <AiOutlineLogout
                    className="mx-2 mb-1 logout"
                    color="white"
                    size={26}
                    onClick={handleLogout}
                  />
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
