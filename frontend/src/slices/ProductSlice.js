import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  ({ keyword, currentPage, category }) => {
    let link = `http://localhost:8000/api/v1/products`;
    keyword &&
      (link = `http://localhost:8000/api/v1/products?keyword=${
        keyword ? keyword : ""
      }&page=${currentPage}`);

    currentPage &&
      (link = `http://localhost:8000/api/v1/products?keyword=${
        keyword ? keyword : ""
      }&page=${currentPage}`);

    category.length >= 2 &&
      (link = `http://localhost:8000/api/v1/products?category=${category}`);
    return axios.get(link).then((response) => response.data);
  }
);

const productSlice = createSlice({
  name: "product",

  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      console.log(action.payload);
      state.productCount = action.payload.productCount;
      state.resultPerPage = action.payload.resultPerPage;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
