import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  entities: {},
  ids: [],
  status: "idle",
};

export const objectPricesSlice = createSlice({
  name: "objectsPrices",
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
        errorMessage: err,
      };
    },
  },
});

export const objectPricesSliceActions = objectPricesSlice.actions;
