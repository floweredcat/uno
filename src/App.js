import React from 'react';
import { Provider } from 'react-redux';
import {store} from './store/store'
import { Route, Routes } from 'react-router-dom';
import { Auth } from './Pages/Auth';
import { Cabinet } from './Pages/Cabinet';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route index element={<Auth />} />
        <Route path='/cabinet' element={<Cabinet />} />
      </Routes>
    </Provider>
  );
}

export default App;
