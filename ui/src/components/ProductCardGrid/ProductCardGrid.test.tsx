import { mount } from "enzyme";
import { ProductCardProps } from "../ProductCard/ProductCard";
import ProductCardGrid from "./ProductCardGrid";

describe("ProductCardGrid component", () => {
  let wrapper;
  const cardListInstance: ProductCardProps[] = [
    { name: "Monitor", price: 2999.99 },
    { name: "Shelf", price: 127.89 },
  ];
  it("should render cards without errors", () => {
    wrapper = mount(<ProductCardGrid cardsList={cardListInstance} />);
    expect(wrapper.text()).toContain("Monitor");
    expect(wrapper.text()).toContain("2999.99");
    expect(wrapper.text()).toContain("Shelf");
    expect(wrapper.text()).toContain("127.89");
  });
});
