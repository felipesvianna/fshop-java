interface ProductProps {
  name?: string;
  category?: string;
  quantity: number;
}

const validateCreateProductForm = (productData: ProductProps) => {
  let errors = {};

  if (!productData.name || productData.name.length < 3) {
    errors = { ...errors, name: "Must be at least 3 characters" };
  }

  if (!productData.category) {
    errors = { ...errors, category: "Category is required" };
  }

  if (productData.quantity === 0) {
    errors = { ...errors, quantity: "Quantity cant be zero" };
  }

  return errors;
};

export default validateCreateProductForm;
