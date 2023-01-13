import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

export const fetchProducts = createAsyncThunk("product/fetchProducts", () => {
  return axios
    .get("http://localhost:8000/api/v1/products")
    .then((response) => response.data);
});

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});

export default productSlice.reducer;
