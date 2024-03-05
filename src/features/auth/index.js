import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });
    return response.data;
  }
);

const userEntity = createEntityAdapter({
  selectId: (user) => user.data.id,
});

const userSlice = createSlice({
  name: "user",
  initialState: userEntity.getInitialState({
    isLoading: true,
  }),
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        userEntity.addOne(state, action.payload);
        state.isLoading = false;
      });
  },
});

export const userSelector = userEntity.getSelectors((state) => state.user);

export const selectIsLoading = (state) => state.user.isLoading;
export default userSlice.reducer;
