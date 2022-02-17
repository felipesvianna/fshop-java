import { mount, ReactWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../../../components/LoginForm/LoginForm";
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
