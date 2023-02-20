import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Route, Routes } from "react-router-dom";
import { Auth } from "./Pages/Auth";
import { Layout } from "../src/Widgets/Layout/Layout";
import { Forgot } from "./Pages/Forgot/Index";
import { ROUTES } from "./assets/constants/Fixtires";
import { Recover } from "./Pages/Recover/Index";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          index
          element={<Auth />}
        />
        <Route
          path={ROUTES.forgot}
          element={<Forgot />}
        />
        <Route
          path={ROUTES.recover}
          element={<Recover />}
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
