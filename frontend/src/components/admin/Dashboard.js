import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsAdmin,
  fetchAllUsersAdmin,
} from "../../slices/admin/AllProductsSlice.js";
import { fetchAllOrdersAdmin } from "../../slices/admin/AllOrdersSlice.js";

const Dashboard = () => {
  const { adminProducts, allUsers } = useSelector(
    (state) => state.allProductsAdmin
  );

  const { allOrdersAdmin } = useSelector((state) => state.adminOrders);

  const dispatch = useDispatch();

  let outOfStock = 0;

  let totalAmount = 0;

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#3BB77E"],
        hoverBackgroundColor: ["#3BB77E"],
        data: [0, totalAmount],
      },
    ],
  };

  useEffect(() => {
    dispatch(fetchAllProductsAdmin());
    dispatch(fetchAllUsersAdmin());
    dispatch(fetchAllOrdersAdmin());
  }, []);

  return (
    <>
      <div className="dashboardContainer">
        <div className="dashboardSummary">
          <div>
            <p>Dashboard</p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p className="mt-5">Products</p>
              <p>{adminProducts.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{allOrdersAdmin.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{allUsers.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart"></div>
      </div>
    </>
  );
};
export default Dashboard;
