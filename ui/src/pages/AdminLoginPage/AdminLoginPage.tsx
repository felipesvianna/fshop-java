import React, { FC } from "react";
import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm/LoginForm";

const AdminLoginPage: FC = () => {
  return (
    <>
      <p className="font-bold my-4">Login</p>
      <LoginForm />
    </>
  );
};

export default AdminLoginPage;
