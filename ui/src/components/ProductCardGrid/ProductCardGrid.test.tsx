import { mount, ReactWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { ProductCardProps } from "../../interfaces";
import ProductCardGrid from "./ProductCardGrid";

describe("ProductCardGrid component", () => {
  let wrapper: ReactWrapper;
  const cardListInstance: ProductCardProps[] = [
    { id: 1, name: "Monitor", price: 2999.99 },
    { id: 2, name: "Shelf", price: 127.89 },
  ];

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <ProductCardGrid cardsList={cardListInstance} />
      </MemoryRouter>
    );
  });

  it("should show link to product details page", () => {
    wrapper = mount(
      <MemoryRouter>
        <ProductCardGrid
          cardsList={[{ id: 1, name: "Monitor", price: 2999.99 }]}
        />
      </MemoryRouter>
    );
    const link = wrapper.find("Link");
    expect(link.prop("to")).toEqual("/productdetails/1");
  });

  it("should render cards without errors", () => {
    expect(wrapper.text()).toContain("Monitor");
    expect(wrapper.text()).toContain("2999.99");

    expect(wrapper.text()).toContain("Shelf");
    expect(wrapper.text()).toContain("127.89");
  });
});
