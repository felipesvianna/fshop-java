import React, { FC } from "react";
import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm/LoginForm";

const UserSignInPage: FC = () => {
  return (
    <>
      <Header pageName="Sign In" />
      <LoginForm />
    </>
  );
};

export default UserSignInPage;
