import { shallow, ShallowWrapper } from "enzyme";
import ProductCard from "./ProductCard";

describe("ProductCard component", () => {
  let wrapper: ShallowWrapper;

  it("should render without errors when receive name and price props", () => {
    wrapper = shallow(<ProductCard name={"Monitor"} price={2000.57} />);
    expect(wrapper.text()).toContain("Monitor");
  });
});
