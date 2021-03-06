import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import CreateCategoryPage from "./pages/Admin/CreateCategoryPage/CreateCategoryPage";
import CreateProductPage from "./pages/Admin/CreateProductPage/CreateProductPage";
import EditCategoryPage from "./pages/Admin/EditCategoryPage/EditCategoryPage";
import EditProductPage from "./pages/Admin/EditProductPage/EditProductPage";

import HomePage from "./pages/HomePage/HomePage";
import AdminLoginPage from "./pages/Admin/AdminLoginPage/AdminLoginPage";
import ManageCategories from "./pages/Admin/ManageCategories/ManageCategories";
import ManageProducts from "./pages/Admin/ManageProducts/ManageProducts";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import UserRegisterPage from "./pages/UserRegisterPage/UserRegisterPage";
import UserSignInPage from "./pages/UserSignInPage/UserSignInPage";
import CartPage from "./pages/CartPage/CartPage";

describe("App component", () => {
  let wrapper: ReactWrapper;

  it('should show CartPage component for "/cart"', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/cart"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(CartPage)).toHaveLength(1);
  });

  it('should show ProductDetails component for "/signin"', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/signin"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(UserSignInPage)).toHaveLength(1);
  });

  it('should show ProductDetails component for "/userregister"', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/userregister"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(UserRegisterPage)).toHaveLength(1);
  });

  it('should show ProductDetails component for "/productdetails/:idProduct"', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/productdetails/:idProduct"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(ProductDetails)).toHaveLength(1);
  });

  it('should show LoginPage component for "/admin"', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/admin"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(AdminLoginPage)).toHaveLength(1);
  });

  it('should show HomePage component for "/"', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(HomePage)).toHaveLength(1);
  });

  it('should show LoginPage component for "/admin/manage" without login', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/admin/manage"]}>
        <App />
      </MemoryRouter>
    );
    //expect(wrapper.find(LoginPage)).toHaveLength(1);
    expect(wrapper.find(AdminLoginPage)).toHaveLength(0);
  });

  it('should show CreateProductPage component for "/admin/createproduct"', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/admin/createproduct"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(CreateProductPage)).toHaveLength(1);
  });

  it('should show ManageProducts page component for "/admin/manageproducts"', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/admin/manageproducts"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(ManageProducts)).toHaveLength(1);
  });

  it('should show ManageCategories page component for "/admin/managecategories"', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/admin/managecategories"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(ManageCategories)).toHaveLength(1);
  });

  it('should show CreateCategory page component for "/admin/createcategory"', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/admin/createcategory"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(CreateCategoryPage)).toHaveLength(1);
  });

  it('should show EditCategory page component for "/admin/editcategory/:idCategory"', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/admin/editcategory/:idCategory"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(EditCategoryPage)).toHaveLength(1);
  });

  it('should show EditProduct page component for "/admin/editproduct/:idProduct"', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/admin/editproduct/:idProduct"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(EditProductPage)).toHaveLength(1);
  });
});
