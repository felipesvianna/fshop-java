import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shallow, ShallowWrapper } from "enzyme";
import LoginForm from "./LoginForm";

async function fillAndSubmitLoginForm(): Promise<void> {
  const emailField = screen.getByLabelText("Email:");
  const passwordField = screen.getByLabelText("Password:");

  fireEvent.change(emailField, { target: { value: "Email" } });
  fireEvent.change(passwordField, { target: { value: "password" } });

  await userEvent.click(screen.getByRole("button", { name: "Sign In" }));
}

describe("LoginForm component", () => {
  let wrapper: ShallowWrapper;

  it("should call handleSubmit on button click", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<LoginForm handleSubmit={handleSubmit} />);
    await fillAndSubmitLoginForm();
    expect(handleSubmit).toBeCalled();
  });

  it("should render a form without errors", () => {
    wrapper = shallow(<LoginForm />);
    expect(wrapper.find('input[id="email"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="password"]').exists()).toEqual(true);
    expect(wrapper.find("button").text()).toEqual("Sign In");
  });
});
