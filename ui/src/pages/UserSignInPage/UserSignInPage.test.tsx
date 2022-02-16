import { mount, ReactWrapper } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import UserSignInPage from "./UserSignInPage";

describe("UserSignInPage page", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <UserSignInPage />
      </MemoryRouter>
    );
  });
  it("should contains LoginForm component", () => {
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Sign In");
  });
});
