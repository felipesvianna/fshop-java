import React, { FC } from "react";
import Header from "../../components/Header/Header";
import ProductForm from "../../components/Product/ProductForm";

const CreateProductPage: FC = () => {
  return (
    <>
      <p className="font-bold my-4">Create Product</p>
      <ProductForm />
    </>
  );
};

export default CreateProductPage;
