import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {},
  ids: [],
  status: "idle",
};

export const userHistorySlice = createSlice({
  name: "userHistory",
  initialState,
  reducers: {
    startLoading: (state) => {
      return {
        ...state,
        status: "loading",
      };
    },
    successLoading: (state, action) => {
      const { entities, id } = action.payload;
      state.entities[id] = entities;

      state.ids = state.ids.concat(id);
      state.status = "success";
      return state;
    },
    failLoading: (err) => {
      return {
        entities: {},
        ids: [],
        status: "fail",
        errorMessage: err,
      };
    },
  },
});

export const userHistorySliceActions = userHistorySlice.actions;
