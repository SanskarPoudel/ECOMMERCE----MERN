import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  cartItems: [],
  error: "",
};

export const fetchAddCart = createAsyncThunk("fetchAddCart/cart", (id) => {
  return axios.post(
    `http://localhost:8000/api/v1/addToCart`,
    { productId: id },
    { withCredentials: true }
  );
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAddCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAddCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(fetchAddCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(action.payload);
    });
  },
});

export default cartSlice.reducer;
