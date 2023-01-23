import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: {},
  isAuthenticated: false,
  error: "",
};

export const fetchLogin = createAsyncThunk(
  "userAuth/fetchLogin",
  (loginInfo) => {
    return axios
      .post("http://localhost:8000/api/v1/login", loginInfo, {
        withCredentials: true,
      })
      .then((response) => response.data);
  }
);

export const fetchSignup = createAsyncThunk(
  "userAuth/fetchSignup",
  (signupInfo) => {
    return axios
      .post("http://localhost:8000/api/v1/registration", signupInfo, {
        withCredentials: true,
      })
      .then((response) => response.data);
  }
);

export const fetchLogOut = createAsyncThunk("userAuth/fetchLogout", () => {
  return axios
    .get("http://localhost:8000/api/v1/logout", { withCredentials: true })
    .then((response) => response.data);
});

const authSlice = createSlice({
  name: "userAuth",
  initialState,

  reducers: {
    authenticatedStatusUpdate: (state) => {
      state.isAuthenticated = true;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchSignup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSignup.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchSignup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchLogOut.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLogOut.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(fetchLogOut.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { authenticatedStatusUpdate } = authSlice.actions;

export default authSlice.reducer;
