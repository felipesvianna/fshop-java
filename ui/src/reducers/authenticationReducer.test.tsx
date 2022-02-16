import {
  GET_USER_DATA,
  SIGN_OUT,
  SUCCESSFUL_REGISTRATION,
} from "../actionTypes";
import authenticationReducer from "./authenticationReducer";

describe("Authentication Reducer tests", () => {
  const stateMock = {
    token: "tokentoken",
    isAuthenticated: false,
    userData: {
      id: 1,
      firstName: "Airton",
      lastName: "Soares",
      address: "Rua Mocambique 4782",
      email: "asoares@email.com",
      password: "asoares",
    },
  };

  it("should reset state object on SIGN_OUT action type", () => {
    const resetState = {
      ...stateMock,
      token: "",
      isAuthenticated: false,
      userData: undefined,
    };

    const newState = authenticationReducer(stateMock, {
      type: SIGN_OUT,
    });

    expect(newState).toStrictEqual(resetState);
  });

  it("should return userData object on GET_USER_DATA action type", () => {
    const userInstance = stateMock.userData;
    const stateWithoutUserData = { ...stateMock, userData: undefined };

    const newState = authenticationReducer(stateWithoutUserData, {
      type: GET_USER_DATA,
      payload: userInstance,
    });
    expect(newState?.userData).toBe(userInstance);
  });

  it("should return isAuthenticated true on SUCCESSFUL_REGISTRATION action type", () => {
    const newState = authenticationReducer(stateMock, {
      type: SUCCESSFUL_REGISTRATION,
    });
    expect(newState?.isAuthenticated).toBe(true);
  });
});
