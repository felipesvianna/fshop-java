import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import validateProductForm from "./validateProductForm";
import { ProductProps } from "./Product";

interface ProductFormProps {
  productData?: ProductProps;
  handleSubmit?: (e: React.SyntheticEvent) => void;
}

interface FormErrorsProps {
  name?: string;
  category?: string;
  details?: string;
  quantity?: string;
  price?: string;
}

const ProductForm: FC<ProductFormProps> = ({ productData, handleSubmit }) => {
  const initialValues = {
    id: 0,
    name: "",
    details: "",
    category: "",
    quantity: 0,
    price: 0,
  };

  const [formData, setFormData] = useState<ProductProps>(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrorsProps>({});

  useEffect(() => {
    if (productData) {
      setFormData(productData);
    }
  }, []);

  const onChangeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
          value={formData.name}
        />
        <strong className="text-red-500">
          {formErrors.name ? formErrors.name : null}
        </strong>

        <div className="block my-4">
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            name="category"
            onChange={onChangeForm}
            value={formData.category}
          >
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
          value={formData.quantity}
        />
        <strong className="text-red-500">
          {formErrors.quantity ? formErrors.quantity : null}
        </strong>

        <div className="block my-4">
          <label htmlFor="name">Details: </label>
          <textarea
            className="resize-x rounded-md border border-solid border-black w-full
          px-3
          py-1.5
          text-base
          font-normal"
            id="details"
            name="details"
            onChange={onChangeForm}
            value={formData.details}
          ></textarea>
        </div>

        <strong className="text-red-500">
          {formErrors.name ? formErrors.name : null}
        </strong>

        <div className="block my-4">
          <label htmlFor="price">Price: </label>
          <input
            className="block border-solid border-2 border-black w-24"
            type="text"
            id="price"
            name="price"
            onChange={onChangeForm}
            value={formData.price}
          />
        </div>

        <div className="flex justify-start">
          <button
            className="block mt-4 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Save
          </button>
          {productData ? (
            <button
              name="deleteButton"
              type="button"
              className="block mt-4 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          ) : null}
        </div>
      </form>
    </>
  );
};

export default ProductForm;
