import createClientAxios from "./axios";

export function setHeaderAuthorizationWithToken(token: String) {
  if (token) {
    createClientAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export function removeHeaderAuthorization() {
  delete createClientAxios.defaults.headers.common.Authorization;
}
