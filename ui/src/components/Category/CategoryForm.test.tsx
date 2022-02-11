import { shallow, ShallowWrapper } from "enzyme";
import CategoryForm from "./CategoryForm";

describe("CategoryForm component", () => {
  let wrapper: ShallowWrapper;

  it("should show link to delete category if has categoryData", () => {
    wrapper = shallow(
      <CategoryForm categoryData={{ id: 1, name: "Eletronics" }} />
    );
    expect(wrapper.find({ name: "deleteButton" }).text()).toEqual("Delete");
  });

  it("should render a form without errors", () => {
    wrapper = shallow(<CategoryForm />);
    expect(wrapper.find('input[id="name"]').exists()).toEqual(true);
    expect(wrapper.find("button").text()).toEqual("Save");
  });
});
