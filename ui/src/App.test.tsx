import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import CreateProductPage from "./pages/CreateProductPage/CreateProductPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";

describe("App component", () => {
  let wrapper: ReactWrapper;

  it('should show LoginPage component for "/admin"', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/admin"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(LoginPage)).toHaveLength(1);
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
    expect(wrapper.find(LoginPage)).toHaveLength(1);
  });

  it('should show CreateProductPage component for "/admin/createproduct"', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={["/admin/createproduct"]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(CreateProductPage)).toHaveLength(1);
  });
});
