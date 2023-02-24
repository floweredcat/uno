import { createSlice } from "@reduxjs/toolkit";

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
    failLoading: () => {
      return {
        entities: [],
        status: "fail",
      };
    },
  },
});

export const objectHistorySliceActions = objectHistorySlice.actions;
