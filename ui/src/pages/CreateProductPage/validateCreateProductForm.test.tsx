import validateCreateProductForm from "./validateCreateProductForm";

describe("validate Create Product Form", () => {
  const validInput = {
    name: "new product",
    category: "category 1",
    quantity: 2,
    price: 100.99,
  };

  const invalidInput = {
    name: "ne",
    category: "",
    quantity: 0,
    price: 0,
  };

  it("should return false when the form is valid", () => {
    const errors = validateCreateProductForm(validInput);
    expect(errors).toEqual(false);
  });

  it("should show error message with non alphanumeric name", () => {
    const errors = validateCreateProductForm({
      name: "***tew//;",
      category: "2",
      quantity: 2,
      price: 5.99,
    });
    expect(errors).toMatchObject({ name: "Letters and numbers only" });
  });

  it("should show error message with invalid inputs", () => {
    const errors = validateCreateProductForm(invalidInput);
    expect(errors).toMatchObject({
      name: "Must have at least 3 characters",
      category: "Category is required",
      quantity: "Quantity cant be zero",
    });
  });

  it("should show error message with invalid category", () => {
    const errors = validateCreateProductForm({
      name: "new product",
      category: "",
      quantity: 2,
      price: 5.99,
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
      price: 5.99,
    });
    expect(errors).toMatchObject({
      quantity: "Quantity cant be zero",
    });
  });
});
