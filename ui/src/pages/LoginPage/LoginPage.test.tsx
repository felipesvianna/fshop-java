import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import LoginForm from "./LoginForm";
import LoginPage from "./LoginPage";

async function fillAndSubmitLoginForm(): Promise<void> {
  const usernameField = screen.getByLabelText("Username:");
  const passwordField = screen.getByLabelText("Password:");

  fireEvent.change(usernameField, { target: { value: "username" } });
  fireEvent.change(passwordField, { target: { value: "password" } });

  await userEvent.click(screen.getByRole("button", { name: "Sign In" }));
}

describe("LoginPage page", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  });

  it("should contains Header component", () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it("should render withour errors", () => {
    expect(wrapper.text()).toContain("Login");
  });

  it("should contains LoginForm", () => {
    expect(wrapper.contains(<LoginForm />)).toBe(true);
  });

  it("should call handleSubmit on button click", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<LoginForm handleSubmit={handleSubmit} />);
    await fillAndSubmitLoginForm();
    expect(handleSubmit).toBeCalled();
  });
});
