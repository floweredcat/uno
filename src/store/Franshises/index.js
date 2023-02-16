import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {},
  ids: [],
  status: "idle",
};

export const franshisesSlice = createSlice({
  name: "franshises",
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
    failLoading: (err) => {
      return {
        entities: [],
        status: "fail",
        errorMessage: err
      };
    },
  },
});

export const franshisesSliceActions = franshisesSlice.actions