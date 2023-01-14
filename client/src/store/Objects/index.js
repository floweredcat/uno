import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  entities: [],
  status: "idle",
};

export const objectsSlice = createSlice({
  name: "objects",
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
    addUser: (state) => {   
      state.entities.push(nanoid())

      return state
    },
  },
});

export const objectsSliceActions = objectsSlice.actions;