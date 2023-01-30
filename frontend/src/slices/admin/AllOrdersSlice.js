import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ordersLoadingAdmin: false,
  allOrdersAdmin: [],
  ordersErrorAdmin: "",
};

export const fetchAllOrdersAdmin = createAsyncThunk(
  "adminOrders/fetchAllOrdersAdmin",
  () => {
    return axios
      .get("http://localhost:8000/api/v1/admin/orders", {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  }
);

const AdminOrdersSlice = createSlice({
  name: "adminOrders",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrdersAdmin.pending, (state) => {
      state.ordersLoadingAdmin = true;
    });
    builder.addCase(fetchAllOrdersAdmin.fulfilled, (state, action) => {
      state.ordersLoadingAdmin = false;
      state.allOrdersAdmin = action.payload.orders;
    });
    builder.addCase(fetchAllOrdersAdmin.rejected, (state, action) => {
      state.ordersLoadingAdmin = false;
      state.ordersErrorAdmin = action.payloads;
    });
  },
});

export default AdminOrdersSlice.reducer;
