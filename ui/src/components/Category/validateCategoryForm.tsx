import React from "react";
import { CategoryProps } from "./Category";

const validateCreateCategoryForm = (categoryData: CategoryProps) => {
  let errors = {};
  const regexNameField = /^[0-9a-zA-Z\s]+$/; //alphanumeric and spaces only

  if (!categoryData.name || categoryData.name.length < 3) {
    errors = { name: "Must have at least 3 characters" };
  }

  if (!categoryData.name.match(regexNameField)) {
    errors = { name: "Letters and numbers only" };
  }

  if (Object.keys(errors).length === 0) {
    return false;
  }

  return errors;
};

export default validateCreateCategoryForm;
