import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  entities: {},
  ids: [],
  status: "idle",
};

export const objectsSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {
    startLoading: () => {
      return {
        entities: {},
        ids: [],
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
        entities: {},
        ids: [],
        status: "fail",
      };
    },
    addFranshises: (state, action) => {
      const franchises = action.payload
      return {
        ...state,
        franchises,
      }
    }
  },
});

export const objectsSliceActions = objectsSlice.actions;