import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  userDetails: [],
  error: "",
};

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  () => {
    return axios
      .get("http://localhost:8000/api/v1/me", {
        withCredentials: true,
      })
      .then((response) => response.data);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.userDetails = action.payload.user;
    });
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
