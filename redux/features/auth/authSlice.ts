import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Business, LoginResponse } from "../../query/auth/type";

interface AuthState {
  token: string | null;
  userInfo: {
    userId: string;
    username: string;
    email: string;
    role: string;
    businesses: Business[] | null;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  userInfo: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const saveAuthData = createAsyncThunk(
  "auth/saveAuthData",
  async (authData: LoginResponse) => {
    return authData;
  }
);

export const clearAuthData = createAsyncThunk(
  "auth/clearAuthData",
  async () => {
    return;
  }
);

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { getState }) => {
    const state = getState() as { auth: AuthState };
    const { token, userInfo, isAuthenticated } = state.auth;

    if (token && userInfo && isAuthenticated) {
      return {
        token,
        userInfo: {
          userId: userInfo.userId,
          username: userInfo.username,
          email: userInfo.email,
          role: userInfo.role,
          businesses: userInfo.businesses,
        },
      };
    }

    throw new Error("No valid authentication data found");
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveAuthData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveAuthData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userInfo = action.payload.userInfo;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(saveAuthData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ?? "Failed to save authentication data";
      })
      .addCase(clearAuthData.fulfilled, (state) => {
        state.token = null;
        state.userInfo = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userInfo = action.payload.userInfo;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError, logout } = authSlice.actions;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export default authSlice.reducer;
