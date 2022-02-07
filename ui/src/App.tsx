import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/admin" element={<LoginPage/>}/>
    </Routes>
  );
}

export default App;
