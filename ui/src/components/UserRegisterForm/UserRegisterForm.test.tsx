import { shallow, ShallowWrapper } from "enzyme";
import UserRegisterForm from "./UserRegisterForm";

describe("UserRegisterForm component", () => {
  let wrapper: ShallowWrapper;

  // TODO: Implement fill and submit function

  it("should render a form without errors", () => {
    wrapper = shallow(<UserRegisterForm />);
    expect(wrapper.find('input[id="firstname"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="lastname"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="address"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="username"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="password"]').exists()).toEqual(true);
    expect(wrapper.find("button").text()).toEqual("Register");
  });
});
