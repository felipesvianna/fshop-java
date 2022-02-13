import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { CategoryProps } from "../../interfaces";
import CategoryForm from "./CategoryForm";

const validInputValue = {
  id: 1,
  name: "new category",
};

const invalidInputValue = {
  id: 1,
  name: "ne",
};

async function fillAndSubmitForm(inputValues: CategoryProps): Promise<void> {
  const nameField = screen.getByLabelText("Name:");
  fireEvent.change(nameField, { target: { value: inputValues.name } });
  await userEvent.click(screen.getByRole("button", { name: "Save" }));
}

describe("CategoryForm component", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  const categoryInstance = { id: 1, name: "Eletronics" };

  it("should fill form with invalid input and cant call handleSubmit on submit", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<CategoryForm handleSubmit={handleSubmit} />);
    await fillAndSubmitForm(invalidInputValue);
    expect(handleSubmit).not.toBeCalled();
  });

  it("should fill form with valid input and call handleSubmit on submit", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<CategoryForm handleSubmit={handleSubmit} />);
    await fillAndSubmitForm(validInputValue);
    expect(handleSubmit).toBeCalled();
  });

  it("should show name of category in name field if has categoryData", () => {
    wrapper = mount(<CategoryForm categoryData={categoryInstance} />);
    expect(wrapper.find('input[id="name"]').get(0).props.value).toEqual(
      "Eletronics"
    );
  });

  it("should show link to delete category if has categoryData", () => {
    wrapper = shallow(<CategoryForm categoryData={categoryInstance} />);
    expect(wrapper.find({ name: "deleteButton" }).text()).toEqual("Delete");
  });

  it("should not show link to delete category if has no categoryData", () => {
    wrapper = shallow(<CategoryForm />);
    expect(wrapper.find({ name: "deleteButton" }).exists()).toBe(false);
  });

  it("should render a form without errors", () => {
    wrapper = shallow(<CategoryForm />);
    expect(wrapper.find('input[id="name"]').exists()).toEqual(true);
    expect(wrapper.find("button").text()).toEqual("Save");
  });
});
