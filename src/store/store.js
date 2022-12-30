import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './Auth';

const rootReducer = combineReducers({
  auth: authSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware()
]
});
