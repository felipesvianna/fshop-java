import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import CategoryList from "./CategoryList";

describe("ProductsList component", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  const testCategoyList = [
    {
      id: 1,
      name: "Home and Kitchen",
    },
    {
      id: 2,
      name: "Sports",
    },
    {
      id: 3,
      name: "Automotive",
    },
  ];

  it("should fill table with categories", () => {
    wrapper = mount(
      <MemoryRouter>
        <CategoryList listOfCategories={testCategoyList} />
      </MemoryRouter>
    );
    const rows = wrapper.find("tr");
    expect(rows).toHaveLength(3 + 1); // 1 is for table
  });

  it("should render a table", () => {
    wrapper = mount(
      <MemoryRouter>
        <CategoryList listOfCategories={testCategoyList} />
      </MemoryRouter>
    );
    expect(wrapper.find({ id: "categories-list" })).toHaveLength(1);
  });

  it("should show message if listOfProducts is empty", () => {
    wrapper = mount(
      <MemoryRouter>
        <CategoryList listOfCategories={[]} />
      </MemoryRouter>
    );
    expect(wrapper.text()).toContain("There is no categories.");
  });
});
