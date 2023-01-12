import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  isAuthenticated: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const userData = action.payload;

      state = {
        userData,
        isAuthenticated: true,
      }
      return state
    },
    logout: (state) => {
      state = initialState;

      return state
    }
  },
});

export const authSliceActions = authSlice.actions;
