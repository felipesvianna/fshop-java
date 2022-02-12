import validateUserRegisterForm from "./validateUserRegisterForm";

describe("validate Create Product Form", () => {
  const validInput = {
    firstName: "Airton",
    lastName: "Soares",
    address: "Rua Mocambique 4782",
    username: "asoares",
    password: "asoares",
  };

  const invalidInput = {
    firstName: "Ai",
    lastName: "",
    address: "Rua",
    username: "aso",
    password: "aso",
  };

  it("should show error message if invalid input is received", () => {
    const errors = validateUserRegisterForm(invalidInput);
    expect(errors).toMatchObject({
      firstName: "Must have more than 3 characters",
      address: "Must have more than 3 characters",
      username: "Must have more than 3 characters",
      password: "Must have more than 3 characters",
    });
  });

  it("should show error message if address is less than 3 characters", () => {
    const errors = validateUserRegisterForm({
      firstName: "Airton",
      lastName: "Soares",
      address: "Rua",
      username: "asoares",
      password: "asoares",
    });
    expect(errors).toMatchObject({
      address: "Must have more than 3 characters",
    });
  });

  it("should show error message if username is less than 3 characters", () => {
    const errors = validateUserRegisterForm({
      firstName: "Airton",
      lastName: "Soares",
      address: "Rua",
      username: "as",
      password: "asoares",
    });
    expect(errors).toMatchObject({
      username: "Must have more than 3 characters",
    });
  });

  it("should show error message if password is less than 3 characters", () => {
    const errors = validateUserRegisterForm({
      firstName: "Airton",
      lastName: "Soares",
      address: "Rua Mocambique 4782",
      username: "asoares",
      password: "as",
    });
    expect(errors).toMatchObject({
      password: "Must have more than 3 characters",
    });
  });

  it("should return false when the form is valid", () => {
    const errors = validateUserRegisterForm(validInput);
    expect(errors).toEqual(false);
  });
});