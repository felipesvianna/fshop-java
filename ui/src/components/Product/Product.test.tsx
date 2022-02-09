import { shallow, ShallowWrapper } from "enzyme";
import Product from "./Product";

describe("Product component", () => {
  let wrapper: ShallowWrapper;

  const testProductInstance = {
    name: "Monitor",
    category: "Computers",
    quantity: 5,
  };

  beforeEach(() => {
    wrapper = shallow(<Product {...testProductInstance} />);
  });

  it("should render without errors", () => {
    expect(wrapper.find({ id: "product-name" })).toHaveLength(1);
    expect(wrapper.find({ id: "product-category" })).toHaveLength(1);
    expect(wrapper.find({ id: "product-quantity" })).toHaveLength(1);
  });
});
