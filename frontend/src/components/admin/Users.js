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
import { fetchAllUsersAdmin } from "../../slices/admin/AllProductsSlice";
export default function Users() {
  const dispatch = useDispatch();

  const { allUsers } = useSelector((state) => state.allProductsAdmin);

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      width: 250,
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "role",
      headerName: "Role",
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
    dispatch(fetchAllUsersAdmin());
  }, []);

  const rows = [];

  allUsers &&
    allUsers.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
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
