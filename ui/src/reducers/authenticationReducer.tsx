import { AuthenticationProps, UserProps } from "../interfaces";
import {
  GET_USER_DATA,
  SIGN_OUT,
  SUCCESSFUL_REGISTRATION,
} from "../actionTypes";

type SuccessRegistrationActionProps = {
  type: "SUCCESSFUL_REGISTRATION";
};

type GetUserDataActionProps = {
  type: "GET_USER_DATA";
  payload: UserProps;
};

type SignOutActionProps = {
  type: "SIGN_OUT";
};

type ActionProps =
  | GetUserDataActionProps
  | SuccessRegistrationActionProps
  | SignOutActionProps;

export default function authenticationReducer(
  state: AuthenticationProps,
  action: ActionProps
) {
  switch (action.type) {
    case SUCCESSFUL_REGISTRATION:
      return { ...state, isAuthenticated: true };
    case GET_USER_DATA:
      return { ...state, userData: action.payload };
    case SIGN_OUT:
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        userData: undefined,
      };
    default:
      return state;
  }
}
