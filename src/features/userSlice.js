import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, login, logout, signup } from "../appwrite/userService";

const initialState = {
  user: null,
  session: null,
  loading: false,
  error: null,
};

// Thunk for signing up a new user
export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      await signup(email, password, name);
    } catch (error) {
      return rejectWithValue(error.message || "Signup failed");
    }
  }
);

// Thunk for logging in an existing user
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const session = await login(email, password);
      const user = await getCurrentUser();
      return { session, user };
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Thunk for logging out the user
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await logout();
  return null;
});

// Thunk to fetch the current user
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch {
      return rejectWithValue(null); // Return null if no user is logged in
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null; // Reset error state
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload.session;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.session = null;
        state.user = null;
      })
      // Handle fetching the current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { resetError } = authSlice.actions; // Export resetError action
export default authSlice.reducer;
