import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {
    "example@mail.ru": {
      firstName: "Danil",
      lastName: "Bugaenko",
      password: "qwerty12345",
      company: "Uno",
      role: "admin",
    },
    "example1@mail.ru": {
      firstName: "Ivan",
      lastName: "Ivanov",
      password: "qwerty12345",
      company: "Umag",
      role: "user",
    },
  },
  authUser: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email } = action.payload;
      console.log(email);

      return {
        ...state,
        authUser: state.entities[email]
      }
    },
  },
});

export const authSliceActions = authSlice.actions;
