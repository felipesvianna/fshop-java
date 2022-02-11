import { mount, ReactWrapper } from "enzyme";
import Header from "../../components/Header/Header";
import ProductDetails from "./ProductDetails";

describe("ProductDetails page", () => {
  const testProductInstance = {
    id: 1,
    name: "Monitor",
    details: '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)',
    category: "Computers",
    quantity: 5,
    price: 2000.57,
  };

  let wrapper: ReactWrapper;

  it("should show link to add product to cart", () => {
    wrapper = mount(<ProductDetails productData={testProductInstance} />);
    expect(wrapper.find({ name: "addToCart" }).text()).toEqual("Add to Cart");
  });

  it("should render product data when receive productData", () => {
    wrapper = mount(<ProductDetails productData={testProductInstance} />);
    expect(wrapper.text()).toContain("Monitor");
    expect(wrapper.text()).toContain("Computers");
    expect(wrapper.text()).toContain(
      '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)'
    );
    expect(wrapper.text()).toContain("5");
    expect(wrapper.text()).toContain("2000.57");
  });

  it("should render without errors", () => {
    wrapper = mount(<ProductDetails productData={testProductInstance} />);
    expect(wrapper.find(Header)).toHaveLength(1);
  });
});
