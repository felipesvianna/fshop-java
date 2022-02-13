import React, { FC, FormEvent } from "react";
import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm/LoginForm";

const UserSignInPage: FC = () => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit sign in form");
  };
  return (
    <>
      <Header pageName="Sign In" />
      <LoginForm handleSubmit={handleSubmit} />
    </>
  );
};

export default UserSignInPage;
