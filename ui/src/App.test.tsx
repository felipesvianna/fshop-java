import { shallow } from "enzyme";
import App from "./App";

describe('App component', () => {
  let wrapper;

  it('should render withour errors', () => {
    wrapper = shallow(<App/>);
    expect(wrapper.text()).toEqual('F-Shop');
  });
});


