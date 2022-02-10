import { shallow, ShallowWrapper } from "enzyme";
import LinkButton from "./LinkButton";

describe("LinkButton component", () => {
  let wrapper: ShallowWrapper;

  it("should render without errors", () => {
    wrapper = shallow(<LinkButton routeName="/" pageName="F-Shop" />);
    const link = wrapper.find("Link");
    expect(link.text()).toEqual("F-Shop");
    expect(link.prop("to")).toEqual("/");
  });
});
