import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  isAuthenticated: false,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoadingUser: () => {
      return {
        userData: {},
        isAuthenticated: false,
        status: "loading",
      };
    },
    login: (state, action) => {
      const userData = action.payload;
      localStorage.setItem("user", userData.NAME);
      localStorage.setItem("userId", userData.ID);
      localStorage.setItem("userIdAccess", userData.IDACCESS);
      state = {
        userData,
        isAuthenticated: true,
        status: "successLoading",
      };
      return state;
    },
    errorLoading: (state, action) => {
      const { err } = action.payload;
      return {
        userData: {},
        isAuthenticated: false,
        status: "failLoading",
        err,
      };
    },
    logout: (state) => {
      state = undefined;

      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      localStorage.removeItem("userIdAccess");

      return state;
    },
    setErrorChangePass: (state, action) => {
      return {
        ...state,
        errorMessage: action.payload,
      };
    },
    successChangePass: (state) => {
      return {
        ...state,
        mess: "123",
      };
    },
  },
});

export const authSliceActions = authSlice.actions;
