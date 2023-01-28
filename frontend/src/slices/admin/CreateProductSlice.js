import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  messageCreateProduct: "",
  errorCreateProduct: "",
};

export const fetchCreateProduct = createAsyncThunk(
  "createProduct/fetchCreateProduct",
  (productDetail, { rejectWithValue }) => {
    return axios
      .post("http://localhost:8000/api/v1/products/new", productDetail, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
  }
);

const CreateProductSlice = createSlice({
  name: "createProduct",
  initialState,

  reducers: {
    clearCreateProductMessage: (state) => {
      state.messageCreateProduct = "";
    },
    clearCreateProductError: (state) => {
      state.errorCreateProduct = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateProduct.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.messageCreateProduct = action.payload.message;
    });
    builder.addCase(fetchCreateProduct.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.errorCreateProduct = action.payload.error;
    });
  },
});

export const { clearCreateProductMessage, clearCreateProductError } =
  CreateProductSlice.actions;

export default CreateProductSlice.reducer;
