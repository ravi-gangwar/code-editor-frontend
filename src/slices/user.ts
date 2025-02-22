import { createSlice } from "@reduxjs/toolkit";
import { api } from "./rtk-query/apis";
import { RootState } from "@/app/store";

interface UserState {
  token: string | null;
  userInfo: {
    name: string;
    email: string;
  } | null;
}

const initialState: UserState = {
  token: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.userInfo = payload.data;
        state.token = payload.token;
      }
    );

    builder.addMatcher(
      api.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.userInfo = payload.data;
      }
    );
  },
});

// 🔹 Export Actions & Reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.userInfo;
export const selectToken = (state: RootState) => state.user.token;
