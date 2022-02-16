import React, { FC } from "react";
import Header from "../../components/Header/Header";
import { LinkButtonProps } from "../../interfaces";
import ProductCardGrid from "../../components/ProductCardGrid/ProductCardGrid";
import { ProductCardProps } from "../../interfaces";

const HomePage: FC = () => {
  const hardcodedProductCards: ProductCardProps[] = [
    { name: "Monitor", price: 2999.99 },
    { name: "Shelf", price: 127.89 },
  ];

  const headerLinks: LinkButtonProps[] = [
    { routeName: "/userregister", linkName: "Create account" },
  ];

  return (
    <>
      <Header pageName="F-Shop" listOfLinks={headerLinks} />
      <ProductCardGrid cardsList={hardcodedProductCards} />
    </>
  );
};

export default HomePage;
