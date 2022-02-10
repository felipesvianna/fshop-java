import { shallow, ShallowWrapper } from "enzyme";
import ProductForm from "./ProductForm";

describe("CreateProductForm component", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductForm />);
  });

  it("should render a form without errors", () => {
    expect(wrapper.find('input[id="name"]').exists()).toEqual(true);
    expect(wrapper.find('select[id="category"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="quantity"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="price"]').exists()).toEqual(true);
    expect(wrapper.find("button").text()).toEqual("Save");
  });
});
