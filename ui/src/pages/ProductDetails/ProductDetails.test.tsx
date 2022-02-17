import { fireEvent, render, screen } from "@testing-library/react";
import { mount, ReactWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import ProductDetails from "./ProductDetails";

const testProductInstance = {
  id: 1,
  name: "Monitor",
  details: '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)',
  category: "Computers",
  quantity: 5,
  price: 2000.57,
};

describe("ProductDetails test events", () => {
  it("should show message when click on add to cart button", async () => {
    render(
      <MemoryRouter>
        <ProductDetails productData={testProductInstance} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }));

    expect(screen.getByText("This item was added to cart")).toBeInTheDocument();
  });
});

describe("ProductDetails page", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <ProductDetails productData={testProductInstance} />
      </MemoryRouter>
    );
  });

  it("should show link to add product to cart", () => {
    expect(wrapper.find({ name: "addToCart" }).text()).toEqual("Add to Cart");
  });

  it("should render product data when receive productData", () => {
    expect(wrapper.text()).toContain("Monitor");
    expect(wrapper.text()).toContain("Computers");
    expect(wrapper.text()).toContain(
      '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)'
    );
    expect(wrapper.text()).toContain("5");
    expect(wrapper.text()).toContain("2000.57");
  });

  it("should render without errors", () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });
});
