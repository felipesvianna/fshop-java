import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mount, ReactWrapper } from "enzyme";
import { CategoryProps } from "../../components/Category/Category";
import CreateCategoryForm from "./CreateCategoryForm";
import CreateCategoryPage from "./CreateCategoryPage";

describe("CreateCategory page", () => {
  let wrapper: ReactWrapper;

  const validInputValue = {
    name: "new category",
  };

  const invalidInputValue = {
    name: "ne",
  };

  async function fillAndSubmitForm(inputValues: CategoryProps): Promise<void> {
    const nameField = screen.getByLabelText("Name:");
    fireEvent.change(nameField, { target: { value: inputValues.name } });
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
  }

  it("should fill form with invalid input and cant call handleSubmit on submit", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<CreateCategoryForm handleSubmit={handleSubmit} />);
    await fillAndSubmitForm(invalidInputValue);
    expect(handleSubmit).not.toBeCalled();
  });

  it("should fill form with valid input and call handleSubmit on submit", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<CreateCategoryForm handleSubmit={handleSubmit} />);
    await fillAndSubmitForm(validInputValue);
    expect(handleSubmit).toBeCalled();
  });

  it("should render without errors", () => {
    wrapper = mount(<CreateCategoryPage />);
    expect(wrapper.text()).toContain("Create category");
  });

  it("should contains CreateCategoryForm", () => {
    expect(wrapper.contains(<CreateCategoryForm />)).toBe(true);
  });
});
