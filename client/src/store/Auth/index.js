import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  isAuthenticated: false,
  status: 'idle'
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoadingUser: () => {
      return {
        userData: {},
        isAuthenticated: false,
        status: 'loading'
      }
    },
    login: (state, action) => {
      const userData = action.payload;

      state = {
        userData,
        isAuthenticated: true,
        status: 'successLoading'
      }
      return state
    },
    errorLoading: (state, action) => {
      const {err} = action.payload
      return {
        userData: {},
        isAuthenticated: false,
        status: 'failLoading',
        err
      };
    },
    logout: (state) => {
      state = initialState;

      return state
    }
  },
});

export const authSliceActions = authSlice.actions;
