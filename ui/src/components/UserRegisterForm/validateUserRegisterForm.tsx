import React from "react";
import { UserProps } from "../../interfaces";

const validateUserRegisterForm = (userData: UserProps) => {
  let errors = {};

  if (!userData.firstName || userData.firstName.length <= 3) {
    errors = { ...errors, firstName: "Must have more than 3 characters" };
  }

  if (!userData.address || userData.address.length <= 3) {
    errors = { ...errors, address: "Must have more than 3 characters" };
  }

  if (!userData.username || userData.username.length <= 3) {
    errors = { ...errors, username: "Must have more than 3 characters" };
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
