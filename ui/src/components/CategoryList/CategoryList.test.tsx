import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import CategoryList from "./CategoryList";

describe("ProductsList component", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  const testCategoyList = [
    {
      name: "Home and Kitchen",
    },
    {
      name: "Sports",
    },
    {
      name: "Automotive",
    },
  ];

  it("should fill table with categories", () => {
    wrapper = mount(<CategoryList listOfCategories={testCategoyList} />);
    const rows = wrapper.find("tr");
    expect(rows).toHaveLength(3 + 1); // 1 is for table
  });

  it("should render a table", () => {
    wrapper = shallow(<CategoryList listOfCategories={testCategoyList} />);
    expect(wrapper.find({ id: "categories-list" })).toHaveLength(1);
  });

  it("should show message if listOfProducts is empty", () => {
    wrapper = shallow(<CategoryList listOfCategories={[]} />);
    expect(wrapper.text()).toContain("There is no categories.");
  });
});
