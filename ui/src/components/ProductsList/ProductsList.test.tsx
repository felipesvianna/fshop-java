import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ProductsList from "./ProductsList";

describe("ProductsList component", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  const testProductsList = [
    {
      id: 1,
      name: "Monitor",
      category: "Computers",
      quantity: 5,
      price: 2000.99,
    },
    {
      id: 2,
      name: "Headphones",
      category: "Eletronics",
      quantity: 10,
      price: 499.99,
    },
    {
      id: 3,
      name: "Shelf",
      category: "Home & Kitchen",
      quantity: 2,
      price: 120.99,
    },
  ];

  it("should fill table with products", () => {
    wrapper = mount(
      <MemoryRouter>
        <ProductsList listOfProducts={testProductsList} />
      </MemoryRouter>
    );
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
