import { shallow, ShallowWrapper } from "enzyme";
import Category from "./Category";

describe("Product component", () => {
  let wrapper: ShallowWrapper;

  const testCategoryInstance = {
    name: "Luggage",
  };

  it("should render without errors", () => {
    wrapper = shallow(<Category {...testCategoryInstance} />);
    expect(wrapper.text()).toContain("Luggage");
  });
});
