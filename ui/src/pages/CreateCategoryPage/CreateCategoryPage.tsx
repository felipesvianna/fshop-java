import React, { FC } from "react";
import CategoryForm from "../../components/Category/CategoryForm";
import Header from "../../components/Header/Header";

const CreateCategoryPage: FC = () => {
  return (
    <>
      <p className="font-bold my-4">Create category</p>
      <CategoryForm />
    </>
  );
};

export default CreateCategoryPage;
