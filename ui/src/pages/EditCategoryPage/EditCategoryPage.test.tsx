import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import CategoryForm from "../../components/Category/CategoryForm";
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

  it("should contains CategoryForm component", () => {
    expect(wrapper.find(CategoryForm)).toHaveLength(1);
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Edit Category");
  });
});
