import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";

export const getUser = createAsyncThunk(
  "users/getUser",
  async (query,thunkApi) => {
    try {
      const response = await axios.get<User[]>(
        `http://localhost:5000/users?username=${query}`
      );
      return response.data
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const createUser = async (user:User) => {
  try {
    await axios.post("http://localhost:5000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user)
    });
  } catch (error: any) {
    return error.message
  }
}

type UserState = {
  loading:boolean,
  error:string | null,
  user:User[] | null,
}

const initialState: UserState = {
  loading: false,
  error:null,
  user:null
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});