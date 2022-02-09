import { shallow, ShallowWrapper } from "enzyme";
import ProductsList from "../../components/ProductsList/ProductsList";
import ManagePage from "./ManagePage";

describe("ManagePage page", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<ManagePage />);
  });

  it("should render wihout errors", () => {
    expect(wrapper.text()).toContain("Manage F-Shop");
  });

  it("should contains Products List component", () => {
    expect(wrapper.contains(<ProductsList />)).toBe(true);
  });
});
