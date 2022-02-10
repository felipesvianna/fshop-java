import React, { FC } from "react";
import { CategoryProps } from "../../components/Category/Category";
import Header from "../../components/Header/Header";
import CreateCategoryForm from "./CreateCategoryForm";

const CreateCategoryPage: FC = () => {
  return (
    <>
      <Header pageName="Create category" />
      <CreateCategoryForm />
    </>
  );
};

export default CreateCategoryPage;
