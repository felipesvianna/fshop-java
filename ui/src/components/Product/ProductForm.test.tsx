import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import ProductForm from "./ProductForm";

describe("ProductForm component", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  const productInstance = {
    id: 1,
    name: "Monitor",
    category: "Computers",
    quantity: 5,
    price: 2000.57,
  };

  it("should fill form fields with product data if has categoryData", () => {
    wrapper = mount(<ProductForm productData={productInstance} />);
    expect(wrapper.find('input[id="name"]').get(0).props.value).toEqual(
      "Monitor"
    );
    expect(wrapper.find('select[id="category"]').props().value).toEqual(
      "Computers"
    );
    expect(wrapper.find('input[id="quantity"]').get(0).props.value).toEqual(5);
    expect(wrapper.find('input[id="price"]').get(0).props.value).toEqual(
      2000.57
    );
  });

  it("should not show link to delete category if has no productData", () => {
    wrapper = shallow(<ProductForm />);
    expect(wrapper.find({ name: "deleteButton" }).exists()).toBe(false);
  });

  it("should show link to delete category if has categoryData", () => {
    wrapper = shallow(<ProductForm productData={productInstance} />);
    expect(wrapper.find({ name: "deleteButton" }).text()).toEqual("Delete");
  });

  it("should render a form without errors", () => {
    wrapper = shallow(<ProductForm />);
    expect(wrapper.find('input[id="name"]').exists()).toEqual(true);
    expect(wrapper.find('select[id="category"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="quantity"]').exists()).toEqual(true);
    expect(wrapper.find('input[id="price"]').exists()).toEqual(true);
    expect(wrapper.find("button").text()).toEqual("Save");
  });
});
