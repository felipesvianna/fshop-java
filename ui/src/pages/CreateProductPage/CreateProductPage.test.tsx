import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shallow, ShallowWrapper } from "enzyme";
import CreateProductForm from "./CreateProductForm";

import CreateProductPage from "./CreateProductPage";

const validInputValues = {
  name: "new product",
  category: "Category 2",
  quantity: 2,
};

const invalidInputValues = {
  name: "as",
  category: "",
  quantity: 0,
};

interface InputValues {
  name?: string;
  category?: string;
  quantity?: number;
}

async function fillAndSubmitForm(inputValues: InputValues): Promise<void> {
  const nameField = screen.getByLabelText("Name:");
  const categoryField = screen.getByLabelText("Category:");
  const quantityField = screen.getByLabelText("Quantity:");

  fireEvent.change(nameField, { target: { value: inputValues.name } });

  if (inputValues.category) {
    userEvent.selectOptions(
      categoryField,
      screen.getByRole("option", { name: inputValues.category })
    );
  }

  fireEvent.change(quantityField, { target: { value: inputValues.name } });

  await userEvent.click(screen.getByRole("button", { name: "Save" }));
}

describe("CreateProduct page", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<CreateProductPage />);
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("CreateProductPage");
  });

  it("should contains LoginForm", () => {
    expect(wrapper.contains(<CreateProductForm />)).toBe(true);
  });

  it("should fill form with valid input and call handleSubmit on submit", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<CreateProductForm handleSubmit={handleSubmit} />);
    await fillAndSubmitForm(validInputValues);
    expect(handleSubmit).toBeCalled();
  });

  it("should fill form with invalid input and cant call handleSubmit on submit", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<CreateProductForm handleSubmit={handleSubmit} />);
    await fillAndSubmitForm(invalidInputValues);
    expect(handleSubmit).not.toBeCalled();
  });
});
