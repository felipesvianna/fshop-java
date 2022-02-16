import { mount, ReactWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import CategoryForm from "../../components/Category/CategoryForm";
import Header from "../../components/Header/Header";
import CreateCategoryPage from "./CreateCategoryPage";

describe("CreateCategory page", () => {
  let wrapper: ReactWrapper;

  it("should render without errors", () => {
    wrapper = mount(
      <MemoryRouter>
        <CreateCategoryPage />
      </MemoryRouter>
    );
    expect(wrapper.text()).toContain("Create category");
  });

  it("should contains CreateCategoryForm", () => {
    expect(wrapper.contains(<CategoryForm />)).toBe(true);
  });
});
