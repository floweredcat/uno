import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  entities: [],
  status: "idle",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    startLoading: () => {
      return {
        entities: [],
        status: "loading",
      };
    },
    successLoading: (state, action) => {
      const { entities, ids } = action.payload;
      return {
        entities,
        ids,
        status: "success",
      };
    },
    failLoading: () => {
      return {
        entities: [],
        status: "fail",
      };
    },
    addUser: (state, action) => {
      const { email, name, phone, city, pass, role, balance } = action.payload;
      const newId = nanoid()

      state.entities[newId] = {
        'EMAIL': email,
        'NAME': name,
        "PHONE": phone,
        'CITY': city,
        'PASS': pass,
        'ROLENAME': role,
        'BALANCE': balance,
      };
      state.ids.push(newId)
      return state;
    },
  },
});

export const usersSliceActions = usersSlice.actions;
