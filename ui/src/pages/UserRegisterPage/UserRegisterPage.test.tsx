import { mount, ReactWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import UserRegisterForm from "../../components/UserRegisterForm/UserRegisterForm";
import UserRegisterPage from "./UserRegisterPage";

describe("UserRegisterPage component", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <UserRegisterPage />
      </MemoryRouter>
    );
  });

  it("should contains UserRegisterForm component", () => {
    expect(wrapper.find(UserRegisterForm)).toHaveLength(1);
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Create Account");
  });

  it("should contains Header component", () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });
});
