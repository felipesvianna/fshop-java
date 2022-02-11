import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { CategoryProps } from "./Category";
import validateCategoryForm from "./validateCategoryForm";

interface CategoryFormProps {
  categoryData?: CategoryProps;
  handleSubmit?: (e: React.SyntheticEvent) => void;
}

interface FormErrorsProps {
  name?: string;
}

const CategoryForm: FC<CategoryFormProps> = ({
  categoryData,
  handleSubmit,
}) => {
  const initialState = {
    id: 0,
    name: "",
  };

  const [formData, setFormData] = useState<CategoryProps>(initialState);
  const [formErrors, setFormErrors] = useState<FormErrorsProps>({});

  useEffect(() => {
    if (categoryData) {
      setFormData({ id: 1, name: "Computer" });
    }
  }, []);

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
    const errors = validateCategoryForm(formData);

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

        <div className="flex justify-start">
          <button
            className="block mt-4 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Save
          </button>
          {categoryData ? (
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

export default CategoryForm;
