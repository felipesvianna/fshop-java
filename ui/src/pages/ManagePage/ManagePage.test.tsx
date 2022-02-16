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

  it("should show Manage products link", () => {
    const link = wrapper.find("Link").first();
    expect(link.text()).toEqual("Manage products");
    expect(link.prop("to")).toEqual("/admin/manageproducts");
  });

  it("should render wihout errors", () => {
    expect(wrapper.text()).toContain("Manage F-Shop");
  });
});
