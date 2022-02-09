import validateCreateProductForm from "./validateCreateProductForm";

describe("validate Create Product Form", () => {
  const validInput = {
    name: "new product",
    category: "category 1",
    quantity: 2,
  };

  const invalidInput = {
    name: "ne",
    category: "",
    quantity: 2,
  };

  it("should return empty object when the form is valid", () => {
    const errors = validateCreateProductForm(validInput);
    expect(errors).toMatchObject({});
  });

  it("should return error with invalid name", () => {
    const errors = validateCreateProductForm(invalidInput);
    expect(errors).toMatchObject({ name: "Must be at least 3 characters" });
  });
});
