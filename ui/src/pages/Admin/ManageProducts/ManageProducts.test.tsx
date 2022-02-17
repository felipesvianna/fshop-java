import { CommonWrapper, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ProductsList from "../../../components/ProductsList/ProductsList";
import ManageProducts from "./ManageProducts";

describe("ManageProducts page", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <ManageProducts />
      </MemoryRouter>
    );
  });

  it("should show link to logout", () => {
    const link = wrapper.find("Link[to='/logout']");
    expect(link.text()).toEqual("Logout");
  });

  it("should render list of links on header", () => {
    const linkLogout = wrapper.find("Link[to='/logout']");
    const linkCreateProducts = wrapper.find("Link[to='/admin/createproduct']");
    const linkManageCategories = wrapper.find(
      "Link[to='/admin/managecategories']"
    );
    const linkManage = wrapper.find("Link[to='/admin/manage']");

    expect(linkLogout.text()).toEqual("Logout");
    expect(linkCreateProducts.text()).toEqual("Create product");
    expect(linkManageCategories.text()).toEqual("Manage categories");
    expect(linkManage.text()).toEqual("Manage orders");
  });

  it("should contains ProductsList component", () => {
    expect(wrapper.find(ProductsList)).toHaveLength(1);
  });

  it("should render wihout errors", () => {
    expect(wrapper.text()).toContain("Manage Products");
  });
});
