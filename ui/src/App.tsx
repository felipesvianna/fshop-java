import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateProductPage from "./pages/CreateProductPage/CreateProductPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ManagePage from "./pages/ManagePage/ManagePage";
import PrivateRoute from "./util/PrivateRoute/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<LoginPage />} />
      <Route path="/admin/createproduct" element={<CreateProductPage />} />
      <Route
        path="/admin/manage"
        element={<PrivateRoute component={ManagePage} />}
      />
    </Routes>
  );
}

export default App;
