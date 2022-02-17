import { mount, ReactWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ProductForm from "../../../components/Product/ProductForm";

import CreateProductPage from "./CreateProductPage";

describe("CreateProduct page", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <CreateProductPage />
      </MemoryRouter>
    );
  });

  it("should show link to logout", () => {
    const link = wrapper.find("Link[to='/logout']");
    expect(link.text()).toEqual("Logout");
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Create Product");
  });

  it("should contains LoginForm", () => {
    expect(wrapper.contains(<ProductForm />)).toBe(true);
  });
});
