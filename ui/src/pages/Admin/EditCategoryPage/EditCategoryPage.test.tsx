import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import CategoryForm from "../../../components/Category/CategoryForm";
import Header from "../../../components/Header/Header";
import EditCategoryPage from "./EditCategoryPage";

describe("EditCategoryPage page", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <EditCategoryPage />
      </MemoryRouter>
    );
  });

  it("should show link to logout", () => {
    const link = wrapper.find("Link[to='/logout']");
    expect(link.text()).toEqual("Logout");
  });

  it("should contains CategoryForm component", () => {
    expect(wrapper.find(CategoryForm)).toHaveLength(1);
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Edit Category");
  });
});
