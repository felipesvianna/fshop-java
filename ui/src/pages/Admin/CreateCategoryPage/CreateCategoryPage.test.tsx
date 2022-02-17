import { mount, ReactWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import CategoryForm from "../../../components/Category/CategoryForm";
import Header from "../../../components/Header/Header";
import CreateCategoryPage from "./CreateCategoryPage";

describe("CreateCategory page", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <CreateCategoryPage />
      </MemoryRouter>
    );
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Create category");
  });

  it("should show link to logout", () => {
    const link = wrapper.find("Link[to='/logout']");
    expect(link.text()).toEqual("Logout");
  });

  it("should contains CreateCategoryForm", () => {
    expect(wrapper.contains(<CategoryForm />)).toBe(true);
  });
});
