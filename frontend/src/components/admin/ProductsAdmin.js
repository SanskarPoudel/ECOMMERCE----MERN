import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  clearMessageProductAdmin,
  fetchAllProductsAdmin,
  fetchDeleteProduct,
} from "../../slices/admin/AllProductsSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ProductsAdmin.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
export default function ProductsAdmin() {
  const dispatch = useDispatch();

  const { allProductsLoading, adminProducts, messageProductAdmin, error } =
    useSelector((state) => state.allProductsAdmin);
  console.log(adminProducts);

  const handleDelete = (id) => {
    dispatch(fetchDeleteProduct(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      width: 250,
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/edit/product/${params.getValue(params.id, "id")}`}
              className="editIcon"
            >
              {" "}
              <EditIcon />
            </Link>
            <Button
              onClick={() => handleDelete(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchAllProductsAdmin());
    messageProductAdmin &&
      toast.success(messageProductAdmin) &&
      dispatch(clearMessageProductAdmin());
  }, [dispatch, messageProductAdmin]);

  const rows = [];

  adminProducts &&
    adminProducts.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        price: `$${item.price}`,
        stock: item.stock,
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
