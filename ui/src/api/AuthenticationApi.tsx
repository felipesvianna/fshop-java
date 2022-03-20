import { UserProps } from "../interfaces";
import createClientAxios from "../util/axios";

const AuthenticationApi = {
  createAccount: async (userData: UserProps) => {
    const response = await createClientAxios.post(`/auth/signup`, userData);
    return response;
  },
};

export default AuthenticationApi;
