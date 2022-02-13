import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mount, ReactWrapper } from "enzyme";
import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm/LoginForm";
import UserSignInPage from "./UserSignInPage";

describe("UserSignInPage page", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<UserSignInPage />);
  });
  it("should contains LoginForm component", () => {
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });

  it("should render without errors", () => {
    expect(wrapper.text()).toContain("Sign In");
  });

  it("should contains Header component", () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });
});
