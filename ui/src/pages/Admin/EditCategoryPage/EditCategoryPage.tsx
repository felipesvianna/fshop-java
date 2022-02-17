import React, { FC, useState } from "react";
import Header from "../../../components/Header/Header";
import CategoryForm from "../../../components/Category/CategoryForm";
import { useParams } from "react-router-dom";
import { CategoryProps } from "../../../interfaces";
import LinkButton from "../../../components/LinkButton/LinkButton";

const EditCategoryPage: FC = () => {
  const initialState = {
    id: 0,
    name: "",
  };

  const { idCategory } = useParams();
  const hardcodedCategoryToEdit = { id: 1, name: "HardcodedCategory" };

  const [categoryToEdit, setCategoryToEdit] = useState<CategoryProps>(
    hardcodedCategoryToEdit
  );

  return (
    <>
      <header className="flex justify-between my-4">
        <p className="font-bold my-4">Edit Category</p>
        <div>
          <LinkButton routeName="/logout" linkName="Logout" />
        </div>
      </header>
      <CategoryForm categoryData={categoryToEdit} />
    </>
  );
};

export default EditCategoryPage;
