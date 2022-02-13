import React from "react";
import { UserProps } from "../../interfaces";

const validateUserRegisterForm = (userData: UserProps) => {
  let errors = {};
  const regexEmailField = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!userData.firstName || userData.firstName.length <= 3) {
    errors = { ...errors, firstName: "Must have more than 3 characters" };
  }

  if (!userData.address || userData.address.length <= 3) {
    errors = { ...errors, address: "Must have more than 3 characters" };
  }

  if (
    !userData.email ||
    userData.email.length <= 3 ||
    (userData.email && !userData.email.match(regexEmailField))
  ) {
    errors = { ...errors, email: "Invalid email address" };
  }

  if (!userData.password || userData.password.length <= 3) {
    errors = { ...errors, password: "Must have more than 3 characters" };
  }

  if (Object.keys(errors).length === 0) {
    return false;
  }

  return errors;
};

export default validateUserRegisterForm;
