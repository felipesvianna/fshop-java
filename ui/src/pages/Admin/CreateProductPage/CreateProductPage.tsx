import React, { FC } from "react";
import LinkButton from "../../../components/LinkButton/LinkButton";
import ProductForm from "../../../components/Product/ProductForm";

const CreateProductPage: FC = () => {
  return (
    <>
      <header className="flex justify-between my-4">
        <p className="font-bold my-4">Create Product</p>
        <div>
          <LinkButton routeName="/logout" linkName="Logout" />
        </div>
      </header>
      <ProductForm />
    </>
  );
};

export default CreateProductPage;
