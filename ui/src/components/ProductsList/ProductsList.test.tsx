import { shallow, ShallowWrapper } from "enzyme";
import ProductsList from "./ProductsList";

describe("ProductsList component", () => {
  let wrapper: ShallowWrapper;

  const testProductsList = [
    {
      name: "Monitor",
      category: "Computers",
      quantity: 5,
    },
    {
      name: "Headphones",
      category: "Eletronics",
      quantity: 10,
    },
    {
      name: "Shelf",
      category: "Home & Kitchen",
      quantity: 2,
    },
  ];

  beforeEach(() => {
    wrapper = shallow(<ProductsList listOfProducts={testProductsList} />);
  });

  it("should render a table", () => {
    expect(wrapper.find({ id: "products-list" })).toHaveLength(1);
  });

  it("should not render a table if listOfProducts is empty", () => {
    wrapper = shallow(<ProductsList listOfProducts={[]} />);
    expect(wrapper.text()).toContain("There is no product.");
  });
});
