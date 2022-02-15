import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shallow, ShallowWrapper } from "enzyme";
import { UserProps } from "../../interfaces";
import UserRegisterForm from "./UserRegisterForm";

const validInputValues = {
  id: 1,
  firstName: "Airton",
  lastName: "Soares",
  address: "Rua Mocambique 4782",
  email: "asoares@email.com",
  password: "asoares",
};

const invalidInputValues = {
  id: 1,
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

describe("UserRegisterForm component", () => {
  let wrapper: ShallowWrapper;

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

  it("should render a form without errors", () => {
    wrapper = shallow(<UserRegisterForm />);
    expect(wrapper.find('input[id="firstname"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="lastname"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="address"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="email"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="password"]').exists()).toEqual(true);
    expect(wrapper.find("button").text()).toEqual("Register");
  });
});
