import validateProductForm from "./validateProductForm";

describe("validate Create Product Form", () => {
  const validInput = {
    id: 1,
    name: "new product",
    details: '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)',
    category: "category 1",
    quantity: 2,
    price: 100.99,
  };

  const invalidInput = {
    id: 1,
    name: "ne",
    details: "little",
    category: "",
    quantity: 0,
    price: 0,
  };

  it("should return false when the form is valid", () => {
    const errors = validateProductForm(validInput);
    expect(errors).toEqual(false);
  });

  it("should show error message with non alphanumeric name", () => {
    const errors = validateProductForm({
      id: 1,
      name: "***tew//;",
      details: '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)',
      category: "2",
      quantity: 2,
      price: 5.99,
    });
    expect(errors).toMatchObject({ name: "Letters and numbers only" });
  });

  it("should show error message with invalid inputs", () => {
    const errors = validateProductForm(invalidInput);
    expect(errors).toMatchObject({
      name: "Must have at least 3 characters",
      category: "Category is required",
      quantity: "Quantity cant be zero",
    });
  });

  it("should show error message with invalid category", () => {
    const errors = validateProductForm({
      id: 1,
      name: "new product",
      details: "new product at the store",
      category: "",
      quantity: 2,
      price: 5.99,
    });
    expect(errors).toMatchObject({
      category: "Category is required",
    });
  });

  it("should show error message if quantity is zero", () => {
    const errors = validateProductForm({
      id: 1,
      name: "new product",
      details: "another new product at the store",
      category: "Category 2",
      quantity: 0,
      price: 5.99,
    });
    expect(errors).toMatchObject({
      quantity: "Quantity cant be zero",
    });
  });
});
