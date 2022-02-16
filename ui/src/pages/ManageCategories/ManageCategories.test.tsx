import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import CategoryList from "../../components/CategoryList/CategoryList";
import Header from "../../components/Header/Header";
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

  it("should show Create category link", () => {
    const link = wrapper.find("Link").first();
    expect(link.text()).toEqual("Create category");
    expect(link.prop("to")).toEqual("/admin/createcategory");
  });

  it("should contains ProductsList component", () => {
    expect(wrapper.find(CategoryList)).toHaveLength(1);
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Manage Categories");
  });
});
