import { shallow, ShallowWrapper } from "enzyme";
import CategoryForm from "./CategoryForm";

describe("CreateCategoryForm component", () => {
  let wrapper: ShallowWrapper;

  it("should render a form without errors", () => {
    wrapper = shallow(<CategoryForm />);
    expect(wrapper.find('input[id="name"]').exists()).toEqual(true);
    expect(wrapper.find("button").text()).toEqual("Save");
  });

  it("should render a form with values when initial values are populated", () => {
    wrapper = shallow(
      <CategoryForm categoryData={{ id: 1, name: "new category" }} />
    );
    expect(wrapper.find('input[id="name"]').get(0).props.value).toEqual(
      "new category"
    );
  });
});
