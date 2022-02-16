import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import AuthenticationContext from "../../context/AuthenticationContext";
import CartContext from "../../context/CartContext";
import { AuthenticationProps, CartProps } from "../../interfaces";
import Header from "./Header";

let wrapper: ShallowWrapper | ReactWrapper;

describe("Header component with Cart Context", () => {
  const startState = {
    itemsList: [
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
        details:
          "Two-tiered shelving unit system with modular, stackable design",
        category: "Home & Kitchen",
        quantity: 2,
        price: 120.99,
      },
    ],
  };

  const customRender = (state: CartProps) => {
    return mount(
      <CartContext.Provider value={state}>
        <MemoryRouter>
          <Header pageName="F-Shop" />
        </MemoryRouter>
      </CartContext.Provider>
    );
  };

  it("should show cart link with the number of items when the itemsList is not empty", () => {
    wrapper = customRender(startState);
    const expectedLength = startState.itemsList.length;
    const link = wrapper.find("Link[to='/1/cart']");
    expect(link.text()).toEqual("Cart(" + expectedLength + ")"); // ex: Cart(3)
  });

  it("should show cart link with 0 items when the itemsList is empty", () => {
    wrapper = customRender({ itemsList: [] });
    const link = wrapper.find("Link[to='/1/cart']");
    expect(link.text()).toEqual("Cart(0)");
  });
});

describe("Header component with Authentication Context", () => {
  const stateTest = {
    token: "tokentoken",
    isAuthenticated: true,
    userData: {
      id: 1,
      firstName: "Airton",
      lastName: "Soares",
      address: "Rua Mocambique 4782",
      email: "asoares@email.com",
      password: "asoares",
    },
  };

  const customRender = (state: AuthenticationProps) => {
    return mount(
      <AuthenticationContext.Provider value={state}>
        <MemoryRouter>
          <Header pageName="F-Shop" />
        </MemoryRouter>
      </AuthenticationContext.Provider>
    );
  };

  it("should show Sign in link if user is not authenticated", () => {
    const state = {
      ...stateTest,
      isAuthenticated: false,
    };

    wrapper = customRender(state);
    const link = wrapper.find("Link").first();
    expect(link.text()).toEqual("Sign in");
    expect(link.prop("to")).toEqual("/signin");
  });

  it("should show Logout link if user is authenticated", () => {
    wrapper = customRender(stateTest);
    const link = wrapper.find("Link").first();
    expect(link.text()).toEqual("Logout");
    expect(link.prop("to")).toEqual("/logout");
  });

  it("should render list of links", () => {
    const testLinksList = [
      { routeName: "/admin", linkName: "Login Admin" },
      { routeName: "/admin/manage", linkName: "F-Shop Management" },
      { routeName: "/", linkName: "F-Shop" },
    ];

    wrapper = shallow(<Header pageName="F-Shop" listOfLinks={testLinksList} />);
    const links = wrapper.find("Link");
    links.forEach((node, index) => {
      expect(node.text()).toEqual(testLinksList[index].linkName);
      expect(node.prop("to")).toEqual(testLinksList[index].routeName);
    });
  });

  it("should render without errors", () => {
    wrapper = shallow(<Header pageName="F-Shop" />);
    expect(wrapper.find("p").text()).toEqual("F-Shop");
  });
});
