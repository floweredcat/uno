import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Route, Routes } from "react-router-dom";
import { Auth } from "./Pages/Auth";
import { Layout } from "../src/Widgets/Layout/Layout";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          index
          element={<Auth />}
        />
        <Route
          path="/*"
          element={<Layout />} // nested routes for folders
        />
      </Routes>
    </Provider>
  );
}

export default App;
