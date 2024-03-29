import { AuthenticationProps, UserProps } from "../interfaces";
import {
  SUCCESSFUL_LOGIN,
  SIGN_OUT,
  SUCCESSFUL_REGISTRATION,
  GET_USER_DATA,
} from "../actionTypes";

type SuccessRegistrationActionProps = {
  type: "SUCCESSFUL_REGISTRATION";
};

type SuccessLoginActionProps = {
  type: "SUCCESSFUL_LOGIN";
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
  | SignOutActionProps
  | SuccessLoginActionProps;

export default function authenticationReducer(
  state: AuthenticationProps,
  action: ActionProps
) {
  switch (action.type) {
    case SUCCESSFUL_LOGIN:
    case SUCCESSFUL_REGISTRATION:
      return { ...state, isAuthenticated: true };
    case GET_USER_DATA:
      return { ...state, isAuthenticated: true, userData: action.payload };
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
