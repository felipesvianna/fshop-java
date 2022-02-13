import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mount, ReactWrapper } from "enzyme";
import Header from "../../components/Header/Header";
import UserRegisterForm from "../../components/UserRegisterForm/UserRegisterForm";
import { UserProps } from "../../interfaces";
import UserRegisterPage from "./UserRegisterPage";

const validInputValues = {
  firstName: "Airton",
  lastName: "Soares",
  address: "Rua Mocambique 4782",
  email: "asoares",
  password: "asoares",
};

const invalidInputValues = {
  firstName: "Ai",
  lastName: "",
  address: "Rua",
  email: "aso",
  password: "aso",
};

async function fillAndSubmitForm(inputValues: UserProps): Promise<void> {
  const firstNameField = screen.getByLabelText("First Name:");
  const lastNameField = screen.getByLabelText("Last Name:");
  const addressField = screen.getByLabelText("Address:");
  const emailField = screen.getByLabelText("Email:");
  const passwordField = screen.getByLabelText("Password:");

  fireEvent.change(firstNameField, {
    target: { value: inputValues.firstName },
  });
  fireEvent.change(lastNameField, {
    target: { value: inputValues.lastName },
  });
  fireEvent.change(addressField, {
    target: { value: inputValues.address },
  });
  fireEvent.change(emailField, {
    target: { value: inputValues.email },
  });
  fireEvent.change(passwordField, {
    target: { value: inputValues.password },
  });

  await userEvent.click(screen.getByRole("button", { name: "Register" }));
}

describe("UserRegisterPage component", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<UserRegisterPage />);
  });

  it("should fill form with invalid input and cant call handleSubmit on submit", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<UserRegisterForm handleSubmit={handleSubmit} />);
    await fillAndSubmitForm(invalidInputValues);
    expect(handleSubmit).not.toBeCalled();
  });

  it("should fill form with valid input and call handleSubmit on submit", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<UserRegisterForm handleSubmit={handleSubmit} />);
    await fillAndSubmitForm(validInputValues);
    expect(handleSubmit).toBeCalled();
  });

  it("should contains UserRegisterForm component", () => {
    expect(wrapper.find(UserRegisterForm)).toHaveLength(1);
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Create Account");
  });

  it("should contains Header component", () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });
});
