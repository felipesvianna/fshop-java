import { shallow, ShallowWrapper } from "enzyme";
import Product from "./Product";

describe("Product component", () => {
  let wrapper: ShallowWrapper;

  const testProductInstance = {
    name: "Monitor",
    category: "Computers",
    quantity: 5,
    price: 2000.57,
  };

  it("should render without errors", () => {
    wrapper = shallow(<Product {...testProductInstance} />);
    expect(wrapper.text()).toContain("Monitor");
    expect(wrapper.text()).toContain("Computers");
    expect(wrapper.text()).toContain("5");
    expect(wrapper.text()).toContain("2000.57");
  });
});
