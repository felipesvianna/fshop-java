import { shallow, ShallowWrapper } from "enzyme";
import LoginForm from "./LoginForm";

describe("LoginForm component", () => {
  let wrapper: ShallowWrapper;

  it("should render a form without errors", () => {
    wrapper = shallow(<LoginForm />);
    expect(wrapper.find('input[id="username"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="password"]').exists()).toEqual(true);
    expect(wrapper.find("button").text()).toEqual("Sign In");
  });
});
