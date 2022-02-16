import { CommonWrapper, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ProductsList from "../../components/ProductsList/ProductsList";
import ManageProducts from "./ManageProducts";

describe("ManageProducts page", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <ManageProducts />
      </MemoryRouter>
    );
  });

  it("should render list of links on header", () => {
    const listOfLinks = [
      { routeName: "/admin/createproduct", pageName: "Create product" },
      { routeName: "/admin/managecategories", pageName: "Manage categories" },
      { routeName: "/admin/manage", pageName: "Manage orders" },
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

  it("should contains ProductsList component", () => {
    expect(wrapper.find(ProductsList)).toHaveLength(1);
  });

  it("should render wihout errors", () => {
    expect(wrapper.text()).toContain("Manage Products");
  });
});
