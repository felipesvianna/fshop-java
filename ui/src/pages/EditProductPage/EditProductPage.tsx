import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import ProductForm from "../../components/Product/ProductForm";
import { ProductProps } from "../../interfaces";

const EditProductPage: FC = () => {
  const initialState = {
    id: 0,
    name: "",
    category: "",
    quantity: 0,
    price: 0,
  };

  const { idProduct } = useParams();

  const hardcodedProductInstance = {
    id: 1,
    name: "Monitor",
    details: '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)',
    category: "category3",
    quantity: 5,
    price: 2000.57,
  };

  const [productToEdit, setProductToEdit] = useState<ProductProps>(
    hardcodedProductInstance
  );

  return (
    <>
      <Header pageName="Edit Product" />
      <ProductForm productData={productToEdit} />
    </>
  );
};

export default EditProductPage;
