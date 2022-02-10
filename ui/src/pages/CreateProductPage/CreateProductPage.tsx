import React, { FC } from "react";
import Header from "../../components/Header/Header";
import ProductForm from "../../components/Product/ProductForm";

const CreateProductPage: FC = () => {
  return (
    <>
      <Header pageName="Create Product" />
      <ProductForm />
    </>
  );
};

export default CreateProductPage;
