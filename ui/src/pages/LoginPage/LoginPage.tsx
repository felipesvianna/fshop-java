import React, { FC } from "react";
import Header from "../../components/Header/Header";
import LoginForm from "./LoginForm";

const LoginPage: FC = () => {
  return (
    <>
      <Header pageName="Login" />
      <LoginForm />
    </>
  );
};

export default LoginPage;
