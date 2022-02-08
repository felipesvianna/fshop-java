import { render } from "@testing-library/react";
import { shallow, ShallowWrapper } from "enzyme";
import CreateProductForm from "./CreateProductForm";

describe("CreateProductForm component", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<CreateProductForm />);
  });

  it("should render a form without errors", () => {
    expect(wrapper.find('input[id="name"]').exists()).toEqual(true);
    expect(wrapper.find('select[id="category"]').exists()).toEqual(true);
    expect(wrapper.find('select[id="quantity"]').exists()).toEqual(true);
    expect(wrapper.find("button").text()).toEqual("Save");
  });
});
