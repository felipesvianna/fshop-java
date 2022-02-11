import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import CategoryForm from "./CategoryForm";

describe("CategoryForm component", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  const categoryInstance = { id: 1, name: "Eletronics" };

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
