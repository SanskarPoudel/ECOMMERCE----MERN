import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loadingCart: false,
  cartItems: [],
  messageCart: "",
  errorCart: "",
};

export const fetchAddCart = createAsyncThunk(
  "fetchAddCart/cart",
  (cartDetails, { rejectWithValue }) => {
    return axios
      .post(`http://localhost:8000/api/v1/addToCart`, cartDetails, {
        withCredentials: true,
      })
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
  }
);

export const fetchGetCart = createAsyncThunk("fetchGetCart/cart", () => {
  return axios
    .get(`http://localhost:8000/api/v1/getCart`, {
      withCredentials: true,
    })
    .then((response) => response.data);
});

export const fetchRemoveFromCart = createAsyncThunk(
  "fetchRemoveFromCart/cart",
  (id, { rejectWithValue }) => {
    return axios
      .delete(`http://localhost:8000/api/v1/removeFromCart/${id}`, {
        withCredentials: true,
      })
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    clearMessage: (state) => {
      state.messageCart = "";
    },
    clearError: (state) => {
      state.errorCart = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddCart.pending, (state) => {
      state.loadingCart = true;
    });
    builder.addCase(fetchAddCart.fulfilled, (state, action) => {
      state.messageCart = action.payload.data.message;
      state.loadingCart = false;
    });
    builder.addCase(fetchAddCart.rejected, (state, action) => {
      state.errorCart = action.payload.message;
      state.loadingCart = false;
    });

    builder.addCase(fetchGetCart.pending, (state) => {
      state.loadingCart = true;
    });
    builder.addCase(fetchGetCart.fulfilled, (state, action) => {
      state.cartItems = action.payload.cart;
      state.loadingCart = false;
    });
    builder.addCase(fetchGetCart.rejected, (state, action) => {
      state.errorCart = action.payload.message;
      state.loadingCart = false;
    });

    builder.addCase(fetchRemoveFromCart.pending, (state) => {
      state.loadingCart = true;
    });
    builder.addCase(fetchRemoveFromCart.fulfilled, (state, action) => {
      state.messageCart = action.payload.data.message;
      state.loadingCart = false;
    });
    builder.addCase(fetchRemoveFromCart.rejected, (state, action) => {
      state.errorCart = action.payload.message;
      state.loadingCart = false;
    });
  },
});

export const { clearCart, clearMessage, clearError } = cartSlice.actions;
export default cartSlice.reducer;
