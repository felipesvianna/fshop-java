import { shallow } from "enzyme";
import ManageCategories from "./ManageCategories";

describe("ManageCategories page", () => {
  let wrapper;

  it("should render without errors", () => {
    wrapper = shallow(<ManageCategories />);
    expect(wrapper.text()).toContain("Manage Categories");
  });
});
