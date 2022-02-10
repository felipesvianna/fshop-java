import validateCreateCategoryForm from "./validateCreateCategoryForm";

describe("validate Create Category Form", () => {
  const validInput = {
    name: "new category",
  };

  const invalidInput = {
    name: "ne",
  };

  it("should show error message with non alphanumeric name", () => {
    const errors = validateCreateCategoryForm({ name: "***tew//;" });
    expect(errors).toMatchObject({ name: "Letters and numbers only" });
  });

  it("should show error message with invalid name", () => {
    const errors = validateCreateCategoryForm(invalidInput);
    expect(errors).toMatchObject({ name: "Must have at least 3 characters" });
  });

  it("should return false when the form is valid", () => {
    const errors = validateCreateCategoryForm(validInput);
    expect(errors).toEqual(false);
  });
});
