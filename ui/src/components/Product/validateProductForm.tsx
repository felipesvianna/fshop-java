import { ProductProps } from "../../interfaces";

const validateProductForm = (productData: ProductProps) => {
  let errors = {};
  const regexNameField = /^[0-9a-zA-Z\s]+$/; //alphanumeric and spaces only

  if (!productData.name || productData.name.length < 3) {
    errors = { ...errors, name: "Must have at least 3 characters" };
  }

  if (productData.name && !productData.name.match(regexNameField)) {
    errors = { ...errors, name: "Letters and numbers only" };
  }

  if (!productData.category) {
    errors = { ...errors, category: "Category is required" };
  }

  if (!productData.quantity) {
    errors = { ...errors, quantity: "Quantity cant be zero" };
  }

  if (Object.keys(errors).length === 0) {
    return false;
  }

  return errors;
};

export default validateProductForm;
