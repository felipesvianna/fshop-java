import { mount } from "enzyme";
import { FC } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";

type ComponentMockProps = {
  testProp?: React.Component;
};

const ComponentMock: FC<ComponentMockProps> = ({ testProp }) => (
  <div>A mock with '{testProp}' passed!</div>
);

describe("PrivateRoute component", () => {
  it("should redirect unauthenticated users to login page", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route
            path="/private"
            element={<PrivateRoute component={ComponentMock} />}
          />
          <Route path="/admin" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find(LoginPage)).toHaveLength(1);
  });
});
