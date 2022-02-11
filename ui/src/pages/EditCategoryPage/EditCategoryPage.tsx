import React, { FC, useState } from "react";
import Header from "../../components/Header/Header";
import CategoryForm from "../../components/Category/CategoryForm";
import { CategoryProps } from "../../components/Category/Category";
import { useParams } from "react-router-dom";

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
      <Header pageName="Edit Category" />
      <CategoryForm categoryData={categoryToEdit} />
    </>
  );
};

export default EditCategoryPage;
