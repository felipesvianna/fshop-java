import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import ProductsList from "./ProductsList";

describe("ProductsList component", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

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

  it("should fill table with products", () => {
    wrapper = mount(<ProductsList listOfProducts={testProductsList} />);
    const rows = wrapper.find("tr");
    expect(rows).toHaveLength(3 + 1); // 1 is for table
  });

  it("should render a table", () => {
    wrapper = shallow(<ProductsList listOfProducts={testProductsList} />);
    expect(wrapper.find({ id: "products-list" })).toHaveLength(1);
  });

  it("should show message if listOfProducts is empty", () => {
    wrapper = shallow(<ProductsList listOfProducts={[]} />);
    expect(wrapper.text()).toContain("There is no products.");
  });
});
