import React, { FC, useReducer } from "react";
import { LoginCredentialsProps, UserProps } from "../../interfaces";
import authenticationReducer from "../../reducers/authenticationReducer";
import AuthenticationContext from "./";
import { SUCCESSFUL_LOGIN, SUCCESSFUL_REGISTRATION } from "../../actionTypes";
import AuthenticationApi from "../../api/AuthenticationApi";
import { AxiosError } from "axios";

type AuthenticationContextProps = {
  children: React.ReactNode;
};

// import state data to send to provider on value

const AuthenticationContextProvider: FC<AuthenticationContextProps> = ({
  children,
}) => {
  const initialState = {
    token: JSON.parse(localStorage.getItem("token") || "[]"),
    isAuthenticated: false,
  };

  const [state, dispatch] = useReducer(authenticationReducer, initialState);

  async function createAccount(userData: UserProps) {
    try {
      const response = await AuthenticationApi.createAccount(userData);
      // created
      if (response.status === 201) {
        dispatch({ type: SUCCESSFUL_REGISTRATION });
        return response;
      }
    } catch (e: unknown) {}
  }

  async function loginUser(loginCredentials: LoginCredentialsProps) {
    try {
      const response = await AuthenticationApi.initiateUserSession(
        loginCredentials
      );
      if (response.status === 200) {
        dispatch({ type: SUCCESSFUL_LOGIN });

        return response;
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      return error.response?.data;
    }
  }

  return (
    <AuthenticationContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        createAccount,
        loginUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
