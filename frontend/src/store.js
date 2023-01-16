import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import productDetailReducer from "./slices/ProductDetailSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    productDetail: productDetailReducer,
  },
});
