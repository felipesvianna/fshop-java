import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mount, ReactWrapper } from "enzyme";
import ProductForm from "../../components/Product/ProductForm";
import { ProductProps } from "../../interfaces";

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
});
