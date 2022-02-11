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
      details: '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)',
      category: "Computers",
      quantity: 5,
      price: 2000.99,
    },
    {
      id: 2,
      name: "Headphones",
      details:
        "Unlike other brands that are heavy, bulky and cause fatigue, our ergonomic design optimizes comfort",
      category: "Eletronics",
      quantity: 10,
      price: 499.99,
    },
    {
      id: 3,
      name: "Shelf",
      details: "Two-tiered shelving unit system with modular, stackable design",
      category: "Home & Kitchen",
      quantity: 2,
      price: 120.99,
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
