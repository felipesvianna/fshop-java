import { mount, ReactWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Cart from "./Cart";

describe("Cart component", () => {
  let wrapper: ReactWrapper;
  const testItemsList = [
    {
      id: 1,
      name: "Monitor",
      details: '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)',
      category: "Computers",
      quantity: 5,
      price: 2000.99,
    },
    {
      id: 2,
      name: "Headphones",
      details:
        "Unlike other brands that are heavy, bulky and cause fatigue, our ergonomic design optimizes comfort",
      category: "Eletronics",
      quantity: 10,
      price: 499.99,
    },
    {
      id: 3,
      name: "Shelf",
      details: "Two-tiered shelving unit system with modular, stackable design",
      category: "Home & Kitchen",
      quantity: 2,
      price: 120.99,
    },
  ];

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Cart itemsList={testItemsList} />
      </MemoryRouter>
    );
  });

  it("should show link to remove item from list", () => {
    const link = wrapper.find("Link[to='/cart/2']");
    expect(link.text()).toEqual("Remove");
  });

  it("should render without errors", () => {
    const textWrapper = wrapper.text();
    testItemsList.forEach((item) => {
      expect(textWrapper).toContain(item.name);
      expect(textWrapper).toContain(item.details);
      expect(textWrapper).toContain(item.category);
      expect(textWrapper).toContain(item.quantity.toString());
      expect(textWrapper).toContain(item.price.toString());
    });
  });
});
