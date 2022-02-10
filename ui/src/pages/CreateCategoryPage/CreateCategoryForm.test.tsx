import { shallow, ShallowWrapper } from "enzyme";
import CreateCategoryForm from "./CreateCategoryForm";

describe("CreateCategoryForm component", () => {
  let wrapper: ShallowWrapper;

  it("should render a form without errors", () => {
    wrapper = shallow(<CreateCategoryForm />);
    expect(wrapper.find('input[id="name"]').exists()).toEqual(true);
    expect(wrapper.find("button").text()).toEqual("Save");
  });
});
