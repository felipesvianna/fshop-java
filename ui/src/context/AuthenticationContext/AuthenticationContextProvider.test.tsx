import { render, screen } from "@testing-library/react";
import { FC } from "react";
import AuthenticationContext from ".";
import { AuthenticationProps } from "../../interfaces";

const contextValues = {
  token: "tokentoken",
  isAuthenticated: true,
  userData: {
    id: 1,
    firstName: "Airton",
    lastName: "Soares",
    address: "Rua Mocambique 4782",
    email: "asoares@email.com",
    password: "asoares",
  },
};

describe("AuthenticationContextProvider context", () => {
  const ComponentMock: FC = () => {
    return (
      <AuthenticationContext.Consumer>
        {(contextValues: AuthenticationProps) => {
          return <p>{contextValues.token}</p>;
        }}
      </AuthenticationContext.Consumer>
    );
  };

  it("should access provider values on children components", () => {
    render(
      <AuthenticationContext.Provider value={contextValues}>
        <ComponentMock />
      </AuthenticationContext.Provider>
    );
    expect(screen.getByText("tokentoken")).toBeInTheDocument();
  });
});
