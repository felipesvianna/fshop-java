import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import Header from "../../components/Header/Header";
import EditCategoryPage from "./EditCategoryPage";

describe("EditCategoryPage page", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<EditCategoryPage />);
  });

  it("should contains Header component", () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });
  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Edit Category");
  });
});
