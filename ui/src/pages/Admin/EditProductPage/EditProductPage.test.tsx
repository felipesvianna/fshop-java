import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Header from "../../../components/Header/Header";
import ProductForm from "../../../components/Product/ProductForm";
import EditProductPage from "./EditProductPage";

describe("EditProductPage page", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <EditProductPage />
      </MemoryRouter>
    );
  });

  it("should show link to logout", () => {
    const link = wrapper.find("Link[to='/logout']");
    expect(link.text()).toEqual("Logout");
  });

  it("should contains CategoryForm component", () => {
    expect(wrapper.find(ProductForm)).toHaveLength(1);
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Edit Product");
  });
});
