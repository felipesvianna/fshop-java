import React, { FC, useState } from "react";
import CategoryList from "../../../components/CategoryList/CategoryList";
import LinkButton from "../../../components/LinkButton/LinkButton";
import { CategoryProps } from "../../../interfaces";

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
      <header className="flex justify-between my-4">
        <p className="font-bold my-4">Manage Categories</p>
        <div>
          <LinkButton routeName="/logout" linkName="Logout" />
        </div>
      </header>
      <LinkButton
        routeName={"/admin/createcategory"}
        linkName={"Create category"}
      />
      <CategoryList listOfCategories={categoriesList} />
    </>
  );
};

export default ManageCategories;
