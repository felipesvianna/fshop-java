import { mount, ReactWrapper, shallow } from "enzyme";
import Header from "../../components/Header/Header";
import ProductCardGrid from "../../components/ProductCardGrid/ProductCardGrid";
import HomePage from "./HomePage";

describe("LoginPage page", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<HomePage />);
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
