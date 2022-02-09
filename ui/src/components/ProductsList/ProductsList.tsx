import React, { FC } from "react";
import { ProductProps } from "../Product/Product";

interface ProductsListProps {
  listOfProducts?: ProductProps[];
}

const ProductsList: FC<ProductsListProps> = ({
  listOfProducts = [],
}: ProductsListProps) => {
  if (Array.isArray(listOfProducts) && !listOfProducts.length) {
    return <p>There is no product.</p>;
  }

  return <table id="products-list"></table>;
};

export default ProductsList;
