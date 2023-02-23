import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Auth";
import { usersSlice } from "./Users";
import { objectsSlice } from "./Objects";
import { objectPricesSlice } from "./ObjectPrices";
import { franshisesSlice } from "./Franshises";
import { onjectFilterSlice } from "./ObjectFilter";
import { cityFranshisesSlice } from "./CityFranshises";
import { objectHistorySlice } from "./ObjectHistory";

const appReducer = combineReducers({
  auth: authSlice.reducer,
  users: usersSlice.reducer,
  objects: objectsSlice.reducer,
  objectsPrices: objectPricesSlice.reducer,
  franshises: franshisesSlice.reducer,
  objectFilter: onjectFilterSlice.reducer,
  cityFranshises: cityFranshisesSlice.reducer,
  objectHistory: objectHistorySlice.reducer,
});

export const store = configureStore({
  reducer: appReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({
    serializableCheck: false
  })],
});
