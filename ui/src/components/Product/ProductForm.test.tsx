import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { ProductProps } from "../../interfaces";
import ProductForm from "./ProductForm";

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

describe("ProductForm component", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  const productInstance = {
    id: 1,
    name: "Monitor",
    category: "Computers",
    details: '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)',
    quantity: 5,
    price: 2000.57,
  };

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

  it("should fill form fields with product data if has productData", () => {
    wrapper = mount(<ProductForm productData={productInstance} />);
    expect(wrapper.find('input[id="name"]').get(0).props.value).toEqual(
      "Monitor"
    );
    expect(wrapper.find('select[id="category"]').props().value).toEqual(
      "Computers"
    );
    expect(wrapper.find('input[id="quantity"]').get(0).props.value).toEqual(5);
    expect(wrapper.find('input[id="price"]').get(0).props.value).toEqual(
      2000.57
    );
  });

  it("should not show link to delete product if has no productData", () => {
    wrapper = shallow(<ProductForm />);
    expect(wrapper.find({ name: "deleteButton" }).exists()).toBe(false);
  });

  it("should show link to delete category if has productData", () => {
    wrapper = shallow(<ProductForm productData={productInstance} />);
    expect(wrapper.find({ name: "deleteButton" }).text()).toEqual("Delete");
  });

  it("should render a form without errors", () => {
    wrapper = shallow(<ProductForm />);
    expect(wrapper.find('input[id="name"]').exists()).toEqual(true);
    expect(wrapper.find('select[id="category"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="quantity"]').exists()).toEqual(true);
    expect(wrapper.find('textarea[id="details"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="price"]').exists()).toEqual(true);
    expect(wrapper.find("button").text()).toEqual("Save");
  });
});
