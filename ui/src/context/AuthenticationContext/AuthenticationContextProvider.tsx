import React, { createContext, FC } from "react";

type AuthenticationContextProps = {
  children: React.ReactNode;
};

const authenticationContext = createContext(null);

// import state data to send to provider on value

const AuthenticationContextProvider: FC<AuthenticationContextProps> = ({
  children,
}) => {
  return (
    <authenticationContext.Provider value={null}>
      {children}
    </authenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
