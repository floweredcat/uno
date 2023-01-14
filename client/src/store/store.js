import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Auth";
import { usersSlice } from "./Users";
import { objectsSlice } from "./Objects";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  users: usersSlice.reducer,
  objects: objectsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});
