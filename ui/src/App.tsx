import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CreateCategoryPage from "./pages/Admin/CreateCategoryPage/CreateCategoryPage";
import CreateProductPage from "./pages/Admin/CreateProductPage/CreateProductPage";
import EditCategoryPage from "./pages/Admin/EditCategoryPage/EditCategoryPage";
import EditProductPage from "./pages/Admin/EditProductPage/EditProductPage";
import HomePage from "./pages/HomePage/HomePage";
import AdminLoginPage from "./pages/Admin/AdminLoginPage/AdminLoginPage";
import ManageCategories from "./pages/Admin/ManageCategories/ManageCategories";
import ManagePage from "./pages/Admin/ManagePage/ManagePage";
import ManageProducts from "./pages/Admin/ManageProducts/ManageProducts";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import UserRegisterPage from "./pages/UserRegisterPage/UserRegisterPage";
import UserSignInPage from "./pages/UserSignInPage/UserSignInPage";
import AuthenticationContextProvider from "./context/AuthenticationContext/AuthenticationContextProvider";
import CartContextProvider from "./context/CartContext/CartContextProvider";
import CartPage from "./pages/CartPage/CartPage";

import { setHeaderAuthorizationWithToken } from "./util/httpHeaderHelper";

const token = localStorage.getItem("token");

if (token) {
  setHeaderAuthorizationWithToken(token);
}

function App() {
  return (
    <AuthenticationContextProvider>
      <CartContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
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
