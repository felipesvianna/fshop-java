import React, { FC } from "react";
import Header from "../../components/Header/Header";
import { ProductCardProps } from "../../components/ProductCard/ProductCard";
import ProductCardGrid from "../../components/ProductCardGrid/ProductCardGrid";

const HomePage: FC = () => {
  const hardcodedProductCards: ProductCardProps[] = [
    { name: "Monitor", price: 2999.99 },
    { name: "Shelf", price: 127.89 },
  ];
  return (
    <>
      <Header pageName="F-Shop" />
      <ProductCardGrid cardsList={hardcodedProductCards} />
    </>
  );
};

export default HomePage;
