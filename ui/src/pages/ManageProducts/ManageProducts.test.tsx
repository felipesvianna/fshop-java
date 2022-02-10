import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ProductsList from "../../components/ProductsList/ProductsList";
import ManageProducts from "./ManageProducts";

describe("ManageProducts page", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  it("should contains ProductsList component", () => {
    wrapper = mount(
      <MemoryRouter>
        <ManageProducts />
      </MemoryRouter>
    );

    expect(wrapper.find(ProductsList)).toHaveLength(1);
  });

  it("should render wihout errors", () => {
    wrapper = shallow(<ManageProducts />);
    expect(wrapper.text()).toContain("Manage Products");
  });
});
