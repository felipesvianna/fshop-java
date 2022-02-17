import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import CategoryList from "../../../components/CategoryList/CategoryList";
import ManageCategories from "./ManageCategories";

describe("ManageCategories page", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <ManageCategories />
      </MemoryRouter>
    );
  });

  it("should show link to logout", () => {
    const link = wrapper.find("Link[to='/logout']");
    expect(link.text()).toEqual("Logout");
  });

  it("should show Create category link", () => {
    const link = wrapper.find("Link[to='/admin/createcategory']");
    expect(link.text()).toEqual("Create category");
  });

  it("should contains ProductsList component", () => {
    expect(wrapper.find(CategoryList)).toHaveLength(1);
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Manage Categories");
  });
});
