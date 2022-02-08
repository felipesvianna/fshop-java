import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shallow, ShallowWrapper } from "enzyme";
import CreateProductForm from "./CreateProductForm";

import CreateProductPage from "./CreateProductPage";

async function fillAndSubmitForm() {
  const nameField = screen.getByLabelText("Name:");
  const categoryField = screen.getByLabelText("Category:");
  const quantityField = screen.getByLabelText("Quantity:");

  fireEvent.click(nameField, { target: { value: "username" } });
  fireEvent.click(categoryField, { target: { value: 2 } });
  fireEvent.click(quantityField, { target: { value: 2 } });

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

  it("should call handleSubmit on button click", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<CreateProductForm handleSubmit={handleSubmit} />);
    await fillAndSubmitForm();
    expect(handleSubmit).toBeCalled();
  });
});
