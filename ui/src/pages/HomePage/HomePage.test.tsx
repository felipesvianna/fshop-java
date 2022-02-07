import { shallow } from "enzyme";
import HomePage from "./HomePage";

describe('LoginPage page', () => {
    let wrapper;

    it('should render withour errors', () => {
        wrapper = shallow(<HomePage />);
        expect(wrapper.text()).toEqual('F-Shop');
    });
});