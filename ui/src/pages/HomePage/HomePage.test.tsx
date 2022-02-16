import { CommonWrapper, mount, ReactWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import ProductCardGrid from "../../components/ProductCardGrid/ProductCardGrid";
import AuthenticationContextProvider from "../../context/AuthenticationContext/AuthenticationContextProvider";
import HomePage from "./HomePage";

describe("HomePage page", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <AuthenticationContextProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AuthenticationContextProvider>
    );
  });

  it("should render list of links on header", () => {
    const listOfLinks = [
      { routeName: "/userregister", pageName: "Create account" },
      { routeName: "/signin", pageName: "Sign in" },
    ];

    let nodes: CommonWrapper[] = [];

    const links = wrapper.find("Link");
    for (let i = 0; i < listOfLinks.length; i++) {
      // get header links only
      nodes.push(links.at(i));
    }

    nodes.forEach((node, index) => {
      expect(node.text()).toEqual(listOfLinks[index].pageName);
      expect(node.prop("to")).toEqual(listOfLinks[index].routeName);
    });
  });

  it("should contains ProductCardGrid component", () => {
    expect(wrapper.find(ProductCardGrid)).toHaveLength(1);
  });

  it("should contains Header component", () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it("should render withour errors", () => {
    expect(wrapper.text()).toContain("F-Shop");
  });
});
