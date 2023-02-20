import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  IDSRV: "",
  NAME: "",
  CITY: "",
  PHONE: "",
  FRAN_NAME: "",
};

export const onjectFilterSlice = createSlice({
  name: "objectFilter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const [value, name] = action.payload;
      return {
        ...state,
        [name]: value,
      };
    },
    resetFilter: () => {
      return initialState;
    },
  },
});

export const onjectFilterSliceActions = onjectFilterSlice.actions;
