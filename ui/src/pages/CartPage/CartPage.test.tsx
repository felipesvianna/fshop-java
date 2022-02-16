import { mount, ReactWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Cart from "../../components/Cart/Cart";
import Header from "../../components/Header/Header";
import CartContext from "../../context/CartContext";
import CartPage from "./CartPage";

describe("CartPage component", () => {
  let wrapper: ReactWrapper;

  const testItemList = [
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

  it("should render Cart component when the items list is not empty", () => {
    wrapper = mount(
      <CartContext.Provider value={{ itemsList: testItemList }}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </CartContext.Provider>
    );
    expect(wrapper.find(Cart)).toHaveLength(1);
  });

  it("should not show message when the items list is not empty", () => {
    wrapper = mount(
      <CartContext.Provider value={{ itemsList: testItemList }}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </CartContext.Provider>
    );
    expect(wrapper.find("p[id='empty-message']")).not.toContain(
      "Your cart is empty."
    );
  });

  it("should show message when the items list is empty", () => {
    wrapper = mount(
      <CartContext.Provider value={{ itemsList: [] }}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </CartContext.Provider>
    );
    expect(wrapper.find("p[id='empty-message']").text()).toContain(
      "Your cart is empty."
    );
  });

  it("should contains Header component", () => {
    wrapper = mount(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );
    expect(wrapper.find(Header)).toHaveLength(1);
  });
});
