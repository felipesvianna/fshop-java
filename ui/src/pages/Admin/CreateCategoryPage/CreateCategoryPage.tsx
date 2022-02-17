import React, { FC } from "react";
import CategoryForm from "../../../components/Category/CategoryForm";
import LinkButton from "../../../components/LinkButton/LinkButton";

const CreateCategoryPage: FC = () => {
  return (
    <>
      <header className="flex justify-between my-4">
        <p className="font-bold my-4">Create category</p>
        <div>
          <LinkButton routeName="/logout" linkName="Logout" />
        </div>
      </header>
      <CategoryForm />
    </>
  );
};

export default CreateCategoryPage;
