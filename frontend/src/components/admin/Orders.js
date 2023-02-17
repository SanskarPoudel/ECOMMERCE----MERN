import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Users.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { fetchAllOrdersAdmin } from "../../slices/admin/AllOrdersSlice";
export default function Orders() {
  const dispatch = useDispatch();

  const { allOrdersAdmin } = useSelector((state) => state.adminOrders);
  console.log(allOrdersAdmin);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      width: 250,
    },
    {
      field: "name",
      headerName: "Buyer's Name",
      width: 220,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
      field: "price",
      headerName: "Total Price",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link className="editIcon">
              {" "}
              <EditIcon />
            </Link>
            <Button>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchAllOrdersAdmin());
  }, []);

  const rows = [];

  allOrdersAdmin &&
    allOrdersAdmin.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.user.name,
        status: item.orderStatus,
        price: item.itemsPrice,
      });
    });

  return (
    <div className="w-100 m-5 mt-0 ">
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
      <Box sx={{ height: "100%", width: "100%" }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        ></Typography>
        <DataGrid columns={columns} rows={rows} pageSize={11} />
      </Box>
    </div>
  );
}
