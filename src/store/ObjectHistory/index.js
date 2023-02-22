import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  entities: {},
  ids: [],
  status: "idle",
};

export const objectHistorySlice = createSlice({
  name: "objectHistory",
  initialState,
  reducers: {
    startLoading: (state) => {
      return {
        ...state,
        status: "loading",
      };
    },
    successLoading: (state, action) => {
      const { entities, ids, id } = action.payload;
      state.entities[id] = {
        entities,
        ids,
      };
      state.status = "success";
      return state;
    },
    failLoading: (err) => {
      return {
        entities: [],
        status: "fail",
        errorMessage: err,
      };
    },
  },
});

export const objectHistorySliceActions = objectHistorySlice.actions;
