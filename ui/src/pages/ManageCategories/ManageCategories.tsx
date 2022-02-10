import React, { FC, useState } from "react";
import { CategoryProps } from "../../components/Category/Category";
import CategoryList from "../../components/CategoryList/CategoryList";
import Header from "../../components/Header/Header";

const ManageCategories: FC = () => {
  const storedCategories = [
    {
      name: "Home and Kitchen",
    },
    {
      name: "Sports",
    },
    {
      name: "Automotive",
    },
  ];

  const [categoriesList, setCategoriesList] =
    useState<CategoryProps[]>(storedCategories);

  return (
    <>
      <Header pageName="Manage Categories" />
      <CategoryList listOfCategories={categoriesList} />
    </>
  );
};

export default ManageCategories;
