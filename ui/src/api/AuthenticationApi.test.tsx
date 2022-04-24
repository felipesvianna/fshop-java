import AuthenticationApi from "../api/AuthenticationApi";
import createClientAxios from "../util/axios";

describe("authenticationApi tests", () => {
  const mockClientAxiosPost = jest.spyOn(createClientAxios, "post");

  beforeAll(() => {
    jest.clearAllMocks();
  });
  it("should initiate user session at api", async () => {
    const loginCredentials = { email: "felipe1@email.com", password: "felipe" };

    const loginResponse = {
      id: "1",
      email: "felipe1@email.com",
      roles: ["ROLE_CLIENT"],
      accessToken: "tokentoken",
      tokenType: "Bearer",
    };

    mockClientAxiosPost.mockImplementation(
      jest.fn(() => Promise.resolve(loginResponse))
    );

    const expectedResponse = await AuthenticationApi.initiateUserSession(
      loginCredentials
    );

    expect(expectedResponse).toEqual(loginResponse);
    expect(createClientAxios.post).toHaveBeenCalledWith(
      "/auth/signin",
      loginCredentials
    );
  });

  it("should create new user account at api", async () => {
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

    mockClientAxiosPost.mockImplementation(
      jest.fn(() => Promise.resolve(response))
    );

    const expectedResponse = await AuthenticationApi.createAccount(userData);

    expect(expectedResponse).toEqual(response);
    expect(createClientAxios.post).toHaveBeenCalledWith(
      "/auth/signup",
      userData
    );
  });
});
