import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  loading: true,
  productDetail: [],
  error: "",
};

export const fetchProductDetail = createAsyncThunk(
  "product/fetchProductDetail",
  (id) => {
    return axios
      .get(`http://localhost:8000/api/v1/products/${id}`)
      .then((response) => response.data);
  }
);

const productDetailSlice = createSlice({
  name: "productDetail",

  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchProductDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      state.productDetail = action.payload.product;
      state.loading = false;
    });

    builder.addCase(fetchProductDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productDetailSlice.reducer;
