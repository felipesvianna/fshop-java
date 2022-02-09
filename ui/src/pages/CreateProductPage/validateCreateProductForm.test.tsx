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
    quantity: 0,
  };

  it("should return empty object when the form is valid", () => {
    const errors = validateCreateProductForm(validInput);
    expect(errors).toMatchObject({});
  });

  it("should show error message with with invalid name", () => {
    const errors = validateCreateProductForm(invalidInput);
    expect(errors).toMatchObject({ name: "Must be at least 3 characters" });
  });

  it("should show error message with invalid category", () => {
    const errors = validateCreateProductForm({
      name: "new product",
      category: "",
      quantity: 2,
    });
    expect(errors).toMatchObject({
      category: "Category is required",
    });
  });

  it("should show error message if quantity is zero", () => {
    const errors = validateCreateProductForm({
      name: "new product",
      category: "Category 2",
      quantity: 0,
    });
    expect(errors).toMatchObject({
      quantity: "Quantity cant be zero",
    });
  });
});
