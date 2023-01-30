import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import productDetailReducer from "./slices/ProductDetailSlice";
import userAuthReducer from "./slices/AuthSlice";
import userReducer from "./slices/UserSlice";
import cartReducer from "./slices/CartSlice";
import orderReducer from "./slices/OrderSlice";
import createProductReducer from "./slices/admin/CreateProductSlice";
import allProductReducer from "./slices/admin/AllProductsSlice";
import adminOrdersReducer from "./slices/admin/AllOrdersSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    productDetail: productDetailReducer,
    userAuth: userAuthReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    createProduct: createProductReducer,
    allProductsAdmin: allProductReducer,
    adminOrders: adminOrdersReducer,
  },
});
