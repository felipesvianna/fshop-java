import React, { FC, useState } from "react";
import Header from "../../components/Header/Header";
import { LinkButtonProps } from "../../components/LinkButton/LinkButton";
import { ProductProps } from "../../components/Product/Product";
import ProductsList from "../../components/ProductsList/ProductsList";

const ManageProducts: FC = () => {
  const storedProducts = [
    {
      id: 1,
      name: "Monitor",
      category: "Computers",
      quantity: 5,
      price: 2000.99,
    },
    {
      id: 2,
      name: "Headphones",
      category: "Eletronics",
      quantity: 10,
      price: 489.99,
    },
    {
      id: 3,
      name: "Shelf",
      category: "Home & Kitchen",
      quantity: 2,
      price: 120.9,
    },
  ];

  const headerLinks: LinkButtonProps[] = [
    { routeName: "/admin/createproduct", pageName: "Create product" },
    { routeName: "/admin/managecategories", pageName: "Manage categories" },
  ];

  const [productsList, setProductsList] =
    useState<ProductProps[]>(storedProducts);

  return (
    <>
      <Header pageName="Manage Products" listOfLinks={headerLinks} />
      <ProductsList listOfProducts={productsList} />
    </>
  );
};

export default ManageProducts;
