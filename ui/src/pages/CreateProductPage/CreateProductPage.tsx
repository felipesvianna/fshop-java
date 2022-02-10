import React, { FC } from "react";
import Header from "../../components/Header/Header";
import CreateProductForm from "./CreateProductForm";

const CreateProductPage: FC = () => {
  return (
    <>
      <Header pageName="Create Product" />
      <CreateProductForm />
    </>
  );
};

export default CreateProductPage;
