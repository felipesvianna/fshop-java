import { mount, ReactWrapper } from "enzyme";
import CategoryForm from "../../components/Category/CategoryForm";
import Header from "../../components/Header/Header";
import CreateCategoryPage from "./CreateCategoryPage";

describe("CreateCategory page", () => {
  let wrapper: ReactWrapper;

  it("should render without errors", () => {
    wrapper = mount(<CreateCategoryPage />);
    expect(wrapper.text()).toContain("Create category");
  });

  it("should contains Header component", () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it("should contains CreateCategoryForm", () => {
    expect(wrapper.contains(<CategoryForm />)).toBe(true);
  });
});
