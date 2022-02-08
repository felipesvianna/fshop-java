import React, { FC } from "react";

interface CreateProductFormProps {
  handleSubmit?: (e: React.SyntheticEvent) => void;
}

const CreateProductForm: FC<CreateProductFormProps> = ({ handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          className="block border-solid border-2 border-black"
          type="text"
          id="name"
        />

        <div className="block my-4">
          <label htmlFor="category">Category: </label>
          <select id="category">
            <option value={"category1"}>Category 1</option>
            <option value={"category2"}>Category 2</option>
            <option value={"category3"}>Category 3</option>
          </select>
        </div>

        <label htmlFor="quantity">Quantity: </label>
        <select id="quantity">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>

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

export default CreateProductForm;
