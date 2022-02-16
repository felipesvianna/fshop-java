import React, { FC } from "react";
import AuthenticationContext from "./";

type AuthenticationContextProps = {
  children: React.ReactNode;
};

// import state data to send to provider on value

const AuthenticationContextProvider: FC<AuthenticationContextProps> = ({
  children,
}) => {
  const providerValues = {
    isAuthenticated: false,
  };
  return (
    <AuthenticationContext.Provider value={providerValues}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
