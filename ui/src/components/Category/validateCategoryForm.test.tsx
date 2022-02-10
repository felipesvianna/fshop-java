import validateCategoryForm from "./validateCategoryForm";

describe("validate Category Form", () => {
  const validInput = {
    id: 1,
    name: "new category",
  };

  const invalidInput = {
    id: 1,
    name: "ne",
  };

  it("should show error message with non alphanumeric name", () => {
    const errors = validateCategoryForm({ id: 1, name: "***tew//;" });
    expect(errors).toMatchObject({ name: "Letters and numbers only" });
  });

  it("should show error message with invalid name", () => {
    const errors = validateCategoryForm(invalidInput);
    expect(errors).toMatchObject({ name: "Must have at least 3 characters" });
  });

  it("should return false when the form is valid", () => {
    const errors = validateCategoryForm(validInput);
    expect(errors).toEqual(false);
  });
});
