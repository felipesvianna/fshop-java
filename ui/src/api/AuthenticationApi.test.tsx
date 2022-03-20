import axios, { AxiosStatic } from "axios";
import AuthenticationApi from "../api/AuthenticationApi";
import createClientAxios from "../util/axios";

jest.mock("../util/axios", () => ({
  post: jest.fn(),
}));

describe("authenticationApi tests", () => {
  it("should register user", async () => {
    const userData = {
      id: 1,
      firstName: "Airton",
      lastName: "Soares",
      address: "Rua Mocambique 4782",
      email: "asoares@email.com",
      password: "asoares",
    };
    const response = {
      id: "1",
      firstName: "felipe",
      lastName: "vianna",
      address: "Rua do Samba 12",
      email: "felipe1@email.com",
      roles: [
        {
          id: "1",
          name: "ROLE_CLIENT",
        },
      ],
    };

    jest
      .spyOn(createClientAxios, "post")
      .mockImplementation(jest.fn(() => Promise.resolve(response)));

    const expectedResponse = await AuthenticationApi.createAccount(userData);

    expect(expectedResponse).toEqual(response);
    expect(createClientAxios.post).toHaveBeenCalledWith(
      "/auth/signup",
      userData
    );
  });
});
