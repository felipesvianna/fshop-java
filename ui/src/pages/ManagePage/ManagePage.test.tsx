import { shallow, ShallowWrapper } from "enzyme";
import ManagePage from "./ManagePage";

describe("ManagePage page", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ManagePage />);
  });

  it("should render wihout errors", () => {
    expect(wrapper.text()).toContain("ManagePage");
  });
});
