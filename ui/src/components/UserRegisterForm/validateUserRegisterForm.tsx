import React from "react";
interface UserDataProps {
  firstName?: string;
  lastName: string;
  address?: string;
  username?: string;
  password?: string;
}

const validateUserRegisterForm = (userData: UserDataProps) => {
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
