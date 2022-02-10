import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CreateProductPage from "./pages/CreateProductPage/CreateProductPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ManageCategories from "./pages/ManageCategories/ManageCategories";
import ManagePage from "./pages/ManagePage/ManagePage";
import ManageProducts from "./pages/ManageProducts/ManageProducts";

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
      <Route
        path="/admin/manageproducts"
        element={<PrivateRoute component={ManageProducts} />}
      />
      <Route
        path="/admin/managecategories"
        element={<PrivateRoute component={ManageCategories} />}
      />
    </Routes>
  );
}

export default App;
