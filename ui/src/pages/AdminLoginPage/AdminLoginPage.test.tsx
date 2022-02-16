import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mount, ReactWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm/LoginForm";
import AdminLoginPage from "./AdminLoginPage";

describe("LoginPage page", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <AdminLoginPage />
      </MemoryRouter>
    );
  });

  it("should render withour errors", () => {
    expect(wrapper.text()).toContain("Login");
  });

  it("should contains LoginForm", () => {
    expect(wrapper.contains(<LoginForm />)).toBe(true);
  });
});
