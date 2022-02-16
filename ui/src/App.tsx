import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CreateCategoryPage from "./pages/CreateCategoryPage/CreateCategoryPage";
import CreateProductPage from "./pages/CreateProductPage/CreateProductPage";
import EditCategoryPage from "./pages/EditCategoryPage/EditCategoryPage";
import EditProductPage from "./pages/EditProductPage/EditProductPage";
import HomePage from "./pages/HomePage/HomePage";
import AdminLoginPage from "./pages/AdminLoginPage/AdminLoginPage";
import ManageCategories from "./pages/ManageCategories/ManageCategories";
import ManagePage from "./pages/ManagePage/ManagePage";
import ManageProducts from "./pages/ManageProducts/ManageProducts";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import UserRegisterPage from "./pages/UserRegisterPage/UserRegisterPage";
import UserSignInPage from "./pages/UserSignInPage/UserSignInPage";
import AuthenticationContextProvider from "./context/AuthenticationContext/AuthenticationContextProvider";
import CartContextProvider from "./context/CartContext/CartContextProvider";

function App() {
  return (
    <AuthenticationContextProvider>
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/createproduct" element={<CreateProductPage />} />
          <Route path="/userregister" element={<UserRegisterPage />} />
          <Route path="/signin" element={<UserSignInPage />} />
          <Route
            path="/productdetails/:idProduct"
            element={<ProductDetails />}
          />
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
          <Route
            path="/admin/createcategory"
            element={<PrivateRoute component={CreateCategoryPage} />}
          />
          <Route
            path="/admin/editcategory/:idCategory"
            element={<PrivateRoute component={EditCategoryPage} />}
          />
          <Route
            path="/admin/editproduct/:idProduct"
            element={<PrivateRoute component={EditProductPage} />}
          />
        </Routes>
      </CartContextProvider>
    </AuthenticationContextProvider>
  );
}

export default App;
