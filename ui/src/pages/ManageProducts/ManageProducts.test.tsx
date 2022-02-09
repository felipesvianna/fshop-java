import { shallow, ShallowWrapper } from "enzyme";
import ManageProducts from "./ManageProducts";

describe("ManageProducts page", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ManageProducts />);
  });

  it("should render wihout errors", () => {
    expect(wrapper.text()).toContain("Manage Products");
  });
});
