import { render, screen } from "@testing-library/react";
import { Children, FC } from "react";
import AuthenticationContextProvider from "./AuthenticationContextProvider";
import AuthenticationContext from ".";
import { type } from "@testing-library/user-event/dist/type";
import { ReactWrapper } from "enzyme";
import { AuthenticationProps } from "../../interfaces";

type ContextValueProp = {
  data?: string;
};

const contextValues = {
  data: "A context value passed!",
};

describe("AuthenticationContextProvider context", () => {
  const ComponentMock: FC = () => {
    return (
      <AuthenticationContext.Consumer>
        {(contextValues: ContextValueProp) => {
          return <p>{contextValues.data}</p>;
        }}
      </AuthenticationContext.Consumer>
    );
  };

  it("should render children components", () => {
    render(
      <AuthenticationContext.Provider value={contextValues}>
        <ComponentMock />
      </AuthenticationContext.Provider>
    );
    expect(screen.getByText("A context value passed!")).toBeInTheDocument();
  });
});
