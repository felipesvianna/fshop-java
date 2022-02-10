import React, { FC, useState } from "react";
import { CategoryProps } from "../../components/Category/Category";
import CategoryList from "../../components/CategoryList/CategoryList";
import Header from "../../components/Header/Header";
import { LinkButtonProps } from "../../components/LinkButton/LinkButton";

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

  const headerLinks: LinkButtonProps[] = [
    { routeName: "/admin/createcategory", pageName: "Create category" },
  ];

  const [categoriesList, setCategoriesList] =
    useState<CategoryProps[]>(storedCategories);

  return (
    <>
      <Header pageName="Manage Categories" listOfLinks={headerLinks} />
      <CategoryList listOfCategories={categoriesList} />
    </>
  );
};

export default ManageCategories;
