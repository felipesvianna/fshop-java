import React, { FC } from "react";
import ProductsList from "../../components/ProductsList/ProductsList";

const ManagePage: FC = () => {
  return (
    <>
      <header>
        <p className="font-bold">Manage F-Shop</p>
        <ProductsList />
      </header>
    </>
  );
};

export default ManagePage;
