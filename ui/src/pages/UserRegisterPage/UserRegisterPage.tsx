import React, { FC } from "react";
import Header from "../../components/Header/Header";
import UserRegisterForm from "../../components/UserRegisterForm/UserRegisterForm";

const UserRegisterPage: FC = () => {
  return (
    <>
      <Header pageName="Create Account" />
      <UserRegisterForm />
    </>
  );
};

export default UserRegisterPage;
