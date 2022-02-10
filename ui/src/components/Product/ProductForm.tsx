import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import validateProductForm from "./validateProductForm";
import { ProductProps } from "./Product";

interface ProductFormProps {
  handleSubmit?: (e: React.SyntheticEvent) => void;
}

interface FormErrorsProps {
  name?: string;
  category?: string;
  quantity?: string;
  price?: string;
}

const ProductForm: FC<ProductFormProps> = ({ handleSubmit }) => {
  const initialValues = {
    name: "",
    category: "",
    quantity: 0,
    price: 0,
  };

  const [formData, setFormData] = useState<ProductProps>(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrorsProps>({});

  const onChangeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateProductForm(formData);
    if (typeof handleSubmit === "function" && !errors) {
      handleSubmit(e);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          className="block border-solid border-2 border-black"
          type="text"
          id="name"
          name="name"
          onChange={onChangeForm}
        />
        <strong className="text-red-500">
          {formErrors.name ? formErrors.name : null}
        </strong>
        <div className="block my-4">
          <label htmlFor="category">Category: </label>
          <select id="category" name="category" onChange={onChangeForm}>
            <option value={"category1"}>Category 1</option>
            <option value={"category2"}>Category 2</option>
            <option value={"category3"}>Category 3</option>
          </select>
          <br />
          <strong className="text-red-500">
            {formErrors.category ? formErrors.category : null}
          </strong>
        </div>
        <label htmlFor="quantity">Quantity: </label>
        <input
          className="block border-solid border-2 border-black w-24"
          type="text"
          id="quantity"
          name="quantity"
          onChange={onChangeForm}
        />
        <strong className="text-red-500">
          {formErrors.quantity ? formErrors.quantity : null}
        </strong>

        <div className="block my-4">
          <label htmlFor="price">Price: </label>
          <input
            className="block border-solid border-2 border-black w-24"
            type="text"
            id="price"
            name="price"
            onChange={onChangeForm}
          />
        </div>

        <button
          className="block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default ProductForm;
