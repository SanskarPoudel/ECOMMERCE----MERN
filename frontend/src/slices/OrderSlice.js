import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  order: {},
  message: "",
  error: "",
};

export const fetchCreateOrder = createAsyncThunk(
  "order/fetchCreateOrder",
  (orderDetails) => {
    return axios
      .post("http://localhost:8000/api/v1/order/new", orderDetails, {
        withCredentials: true,
      })
      .then((response) => response.data);
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCreateOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(fetchCreateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default orderSlice.reducer;
