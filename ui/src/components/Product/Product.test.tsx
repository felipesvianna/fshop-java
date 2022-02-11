import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Product from "./Product";

describe("Product component", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  const testProductInstance = {
    id: 1,
    name: "Monitor",
    details: '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)',
    category: "Computers",
    quantity: 5,
    price: 2000.57,
  };

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <Product {...testProductInstance} />
          </tbody>
        </table>
      </MemoryRouter>
    );
  });

  it("should show link to edit product", () => {
    const link = wrapper.find("Link");
    expect(link.text()).toEqual("Edit");
    expect(link.prop("to")).toEqual("/admin/editproduct/1");
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Monitor");
    expect(wrapper.text()).toContain("Computers");
    expect(wrapper.text()).toContain("5");
    expect(wrapper.text()).toContain("2000.57");
  });
});
