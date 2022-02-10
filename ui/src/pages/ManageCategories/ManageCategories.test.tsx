import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import CategoryList from "../../components/CategoryList/CategoryList";
import ManageCategories from "./ManageCategories";

describe("ManageCategories page", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  it("should contains ProductsList component", () => {
    wrapper = mount(
      <MemoryRouter>
        <ManageCategories />
      </MemoryRouter>
    );

    expect(wrapper.find(CategoryList)).toHaveLength(1);
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Manage Categories");
  });
});
