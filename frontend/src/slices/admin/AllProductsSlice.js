import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allProductsLoading: false,
  adminProducts: [],
  messageProductAdmin: "",
  error: "",
  allUsers: [],
  usersLoading: false,
  usersError: "",
};

export const fetchAllProductsAdmin = createAsyncThunk(
  "allProductsAdmin/fetchAllProductsAdmin",
  () => {
    return axios
      .get("http://localhost:8000/api/v1/admin/products", {
        withCredentials: true,
      })
      .then((response) => response.data);
  }
);

export const fetchDeleteProduct = createAsyncThunk(
  "allProductsAdmin/fetchDeleteProduct",
  (id) => {
    return axios
      .delete(`http://localhost:8000/api/v1/products/${id}`, {
        withCredentials: true,
      })
      .then((response) => response.data);
  }
);

export const fetchAllUsersAdmin = createAsyncThunk(
  "allProductsAdmin/fetchAllUsersAdmin",
  () => {
    return axios
      .get(`http://localhost:8000/api/v1/admin/users`, {
        withCredentials: true,
      })
      .then((response) => response.data);
  }
);

const AllProductsSlice = createSlice({
  name: "allProductsAdmin",
  initialState,
  reducers: {
    clearMessageProductAdmin: (state) => {
      state.messageProductAdmin = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAdmin.pending, (state) => {
      state.allProductsLoading = true;
    });
    builder.addCase(fetchAllProductsAdmin.fulfilled, (state, action) => {
      state.allProductsLoading = false;
      state.adminProducts = action.payload.products;
    });
    builder.addCase(fetchAllProductsAdmin.rejected, (state, action) => {
      state.allProductsLoading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchDeleteProduct.pending, (state) => {
      state.allProductsLoading = true;
    });
    builder.addCase(fetchDeleteProduct.fulfilled, (state, action) => {
      state.allProductsLoading = false;
      state.messageProductAdmin = action.payload.message;
    });
    builder.addCase(fetchDeleteProduct.rejected, (state, action) => {
      state.allProductsLoading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchAllUsersAdmin.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(fetchAllUsersAdmin.fulfilled, (state, action) => {
      state.usersLoading = false;
      state.allUsers = action.payload.users;
    });
    builder.addCase(fetchAllUsersAdmin.rejected, (state, action) => {
      state.usersLoading = false;
      state.usersError = action.payload;
    });
  },
});

export const { clearMessageProductAdmin } = AllProductsSlice.actions;

export default AllProductsSlice.reducer;
