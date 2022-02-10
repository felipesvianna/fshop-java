import { mount, ReactWrapper } from "enzyme";
import CreateCategoryPage from "./CreateCategoryPage";

describe("CreateCategory page", () => {
  let wrapper: ReactWrapper;
  it("should render without errors", () => {
    wrapper = mount(<CreateCategoryPage />);
    expect(wrapper.text()).toContain("Create category");
  });
});
