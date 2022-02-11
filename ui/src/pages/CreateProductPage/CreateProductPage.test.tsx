import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mount, ReactWrapper } from "enzyme";
import { ProductProps } from "../../components/Product/Product";
import ProductForm from "../../components/Product/ProductForm";

import CreateProductPage from "./CreateProductPage";

const validInputValues = {
  id: 1,
  name: "new product",
  details: "new product at the store",
  category: "Category 2",
  quantity: 2,
  price: 5.99,
};

const invalidInputValues = {
  id: 1,
  name: "as",
  details: "little",
  category: "",
  quantity: 0,
  price: 0,
};

async function fillAndSubmitForm(inputValues: ProductProps): Promise<void> {
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
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<CreateProductPage />);
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Create Product");
  });

  it("should contains LoginForm", () => {
    expect(wrapper.contains(<ProductForm />)).toBe(true);
  });

  it("should fill form with valid input and call handleSubmit on submit", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<ProductForm handleSubmit={handleSubmit} />);
    await fillAndSubmitForm(validInputValues);
    expect(handleSubmit).toBeCalled();
  });

  it("should fill form with invalid input and cant call handleSubmit on submit", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<ProductForm handleSubmit={handleSubmit} />);
    await fillAndSubmitForm(invalidInputValues);
    expect(handleSubmit).not.toBeCalled();
  });
});
