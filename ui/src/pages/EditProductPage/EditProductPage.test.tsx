import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import Header from "../../components/Header/Header";
import ProductForm from "../../components/Product/ProductForm";
import EditProductPage from "./EditProductPage";
describe("EditProductPage page", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<EditProductPage />);
  });

  it("should contains Header component", () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it("should contains CategoryForm component", () => {
    expect(wrapper.find(ProductForm)).toHaveLength(1);
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Edit Product");
  });
});
