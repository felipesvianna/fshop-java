import React, { FC } from "react";
import CategoryForm from "../../components/Category/CategoryForm";
import Header from "../../components/Header/Header";

const CreateCategoryPage: FC = () => {
  return (
    <>
      <Header pageName="Create category" />
      <CategoryForm />
    </>
  );
};

export default CreateCategoryPage;
