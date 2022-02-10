import { shallow, ShallowWrapper } from "enzyme";
import Header from "./Header";

describe("Header component", () => {
  let wrapper: ShallowWrapper;

  const testLinksList = [
    { routeName: "/admin", pageName: "Login Admin" },
    { routeName: "/admin/manage", pageName: "F-Shop Management" },
    { routeName: "/", pageName: "F-Shop" },
  ];

  it("should render list of links", () => {
    wrapper = shallow(<Header pageName="F-Shop" listOfLinks={testLinksList} />);
    const links = wrapper.find("Link");
    links.forEach((node, index) => {
      expect(node.text()).toEqual(testLinksList[index].pageName);
      expect(node.prop("to")).toEqual(testLinksList[index].routeName);
    });
  });

  it("should render without errors", () => {
    wrapper = shallow(<Header pageName="F-Shop" />);
    expect(wrapper.find("p")).toHaveLength(1);
  });
});
