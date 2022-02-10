import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductProps } from "../../components/Product/Product";
import ProductsList from "../../components/ProductsList/ProductsList";

const ManageProducts: FC = () => {
  const storedProducts = [
    {
      name: "Monitor",
      category: "Computers",
      quantity: 5,
    },
    {
      name: "Headphones",
      category: "Eletronics",
      quantity: 10,
    },
    {
      name: "Shelf",
      category: "Home & Kitchen",
      quantity: 2,
    },
  ];

  const [productsList, setProductsList] =
    useState<ProductProps[]>(storedProducts);

  return (
    <>
      <header className="my-4">
        <p className="font-bold">Manage Products</p>
        <div className="mt-4">
          <Link to="/admin/createproduct">
            <span className="text-blue-600 underline">Create product</span>
          </Link>
        </div>
      </header>

      <ProductsList listOfProducts={productsList} />
    </>
  );
};

export default ManageProducts;
