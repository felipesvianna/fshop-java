import React, { FC } from "react";
import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm/LoginForm";

const AdminLoginPage: FC = () => {
  return (
    <>
      <Header pageName="Login" />
      <LoginForm />
    </>
  );
};

export default AdminLoginPage;
