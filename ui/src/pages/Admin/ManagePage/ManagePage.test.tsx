import { mount, ReactWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ManagePage from "./ManagePage";

describe("ManagePage page", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <ManagePage />
      </MemoryRouter>
    );
  });

  it("should show link to logout", () => {
    const link = wrapper.find("Link[to='/logout']");
    expect(link.text()).toEqual("Logout");
  });

  it("should show Manage products link", () => {
    const link = wrapper.find("Link[to='/admin/manageproducts']");
    expect(link.text()).toEqual("Manage products");
  });

  it("should render wihout errors", () => {
    expect(wrapper.text()).toContain("Manage F-Shop");
  });
});
