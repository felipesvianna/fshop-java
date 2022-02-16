import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import AuthenticationContext from "../../context/AuthenticationContext";
import { AuthenticationProps } from "../../interfaces";
import Header from "./Header";

describe("Header component", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

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
    expect(wrapper.text()).toContain("Sign in");
  });

  it("should show Logout link if user is authenticated", () => {
    wrapper = customRender(stateTest);
    expect(wrapper.text()).toContain("Logout");
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
