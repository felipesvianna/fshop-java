import React, { FC, useState } from "react";
import CategoryList from "../../components/CategoryList/CategoryList";
import LinkButton from "../../components/LinkButton/LinkButton";
import { CategoryProps } from "../../interfaces";

const ManageCategories: FC = () => {
  const storedCategories = [
    {
      id: 1,
      name: "Home and Kitchen",
    },
    {
      id: 2,
      name: "Sports",
    },
    {
      id: 3,
      name: "Automotive",
    },
  ];

  const [categoriesList, setCategoriesList] =
    useState<CategoryProps[]>(storedCategories);

  return (
    <>
      <p className="font-bold my-4">Manage Categories</p>
      <LinkButton
        routeName={"/admin/createcategory"}
        linkName={"Create category"}
      />
      <CategoryList listOfCategories={categoriesList} />
    </>
  );
};

export default ManageCategories;
