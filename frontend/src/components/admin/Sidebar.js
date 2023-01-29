import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Sidebar.css";
export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { userDetails } = useSelector((state) => state.user);

  const handleToggle = () => {
    setSidebarOpen((prevSidebarOpen) => {
      return !prevSidebarOpen;
    });
  };
  return (
    <div>
      <nav className={`sidebar ${sidebarOpen ? `open` : "close"}`}>
        <header>
          <div className="image-text">
            <span className="image">{/*<img src="logo.png" alt="">*/}</span>
            <div className="text logo-text">
              <span className="name">Admin Panel</span>
              <span className="profession">
                {userDetails.name.charAt(0).toUpperCase() +
                  userDetails.name.slice(1)}
              </span>
            </div>
          </div>
          <i className="bx bx-chevron-right toggle" onClick={handleToggle} />
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <Link to="/admin/dashboard">
                  <i className="bx bx-home-alt icon" />
                  <span className="text nav-text">Dashboard</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/admin/products">
                  <i class="bx bx-package icon" />{" "}
                  <span className="text nav-text">All Products</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/admin/createproduct">
                  <i className="bx bx-plus icon" />
                  <span className="text nav-text">Create Product</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/admin/orders">
                  <i className="bx bx-list-ul icon" />
                  <span className="text nav-text">Orders</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/admin/users">
                  <i class="bx bxs-user-account icon" />{" "}
                  <span className="text nav-text">Users</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/admin/reviews">
                  <i class="bx bx-chat icon" />{" "}
                  <span className="text nav-text">Reviews</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="bottom-content">
            <li className>
              <Link to="/">
                <i className="bx bx-log-out icon" />
                <span className="text nav-text">Logout</span>
              </Link>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
}
