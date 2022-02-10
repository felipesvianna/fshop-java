import { shallow, ShallowWrapper } from "enzyme";
import Product from "./Product";

describe("Product component", () => {
  let wrapper: ShallowWrapper;

  const testProductInstance = {
    name: "Monitor",
    category: "Computers",
    quantity: 5,
  };

  it("should render without errors", () => {
    wrapper = shallow(<Product {...testProductInstance} />);
    expect(wrapper.text()).toContain("Monitor");
    expect(wrapper.text()).toContain("Computers");
    expect(wrapper.text()).toContain("5");
  });
});
