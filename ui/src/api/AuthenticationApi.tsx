import { LoginCredentialsProps, UserProps } from "../interfaces";
import createClientAxios from "../util/axios";

const AuthenticationApi = {
  createAccount: async (userData: UserProps) => {
    const response = await createClientAxios.post(`/auth/signup`, userData);
    return response;
  },

  initiateUserSession: async (loginCredentials: LoginCredentialsProps) => {
    const response = await createClientAxios.post(
      `/auth/signin`,
      loginCredentials
    );
    return response;
  },
};

export default AuthenticationApi;
