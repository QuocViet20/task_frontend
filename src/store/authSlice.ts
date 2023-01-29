import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";

export const getUser = createAsyncThunk(
  "users/getUser",
  async (query, thunkApi) => {
    try {
      const response = await axios.get<User[]>(
        `http://localhost:5000/users?username=${query}`
      );
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (user: User) => {
    try {
      await axios.post("http://localhost:5000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      });
    } catch (error: any) {
      return error.message;
    }
  }
);

type UserState = {
  isLoading: boolean;
  error: string | null;
  user: User[] | null;
  isAuthenticated: boolean;
};

const initialState: UserState = {
  isLoading: false,
  error: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
