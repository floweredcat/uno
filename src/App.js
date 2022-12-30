import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import {store} from './store/store'
import { Route, Routes } from 'react-router-dom';
import { Auth } from './Pages/Auth';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route index element={<div>home</div>} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </Provider>
  );
}

export default App;
