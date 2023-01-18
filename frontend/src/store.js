import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import productDetailReducer from "./slices/ProductDetailSlice";
import userAuthReducer from "./slices/AuthSlice";
import userReducer from "./slices/UserSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    productDetail: productDetailReducer,
    userAuth: userAuthReducer,
    user: userReducer,
  },
});
