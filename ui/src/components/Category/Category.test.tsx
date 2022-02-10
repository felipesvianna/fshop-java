import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Category from "./Category";

describe("Product component", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  const testCategoryInstance = {
    id: 1,
    name: "Luggage",
  };

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <Category {...testCategoryInstance} />
          </tbody>
        </table>
      </MemoryRouter>
    );
  });

  it("should show link to edit category", () => {
    const link = wrapper.find("Link");
    expect(link.text()).toEqual("Edit");
    expect(link.prop("to")).toEqual("/admin/editcategory/1");
  });

  it("should show category name on table", () => {
    expect(wrapper.text()).toContain("Luggage");
  });
});
